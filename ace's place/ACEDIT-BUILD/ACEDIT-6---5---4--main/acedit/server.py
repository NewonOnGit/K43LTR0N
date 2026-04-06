#!/usr/bin/env python3
"""ACEDIT Task Orchestration Server.

Flask application that orchestrates the 6-stage ACEDIT font build pipeline
with real-time Server-Sent Events (SSE) streaming, validation endpoints,
and serves all existing static HTML pages.

Usage:
    python3 server.py [--port 5618] [--fontvenv /path/to/fontvenv]
"""

from __future__ import annotations

import argparse
import glob
import json
import os
import queue
import subprocess
import sys
import threading
import time
from datetime import datetime, timezone

from flask import Flask, Response, jsonify, request, send_from_directory, g
from flask_cors import CORS

# Framework Mind integration
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "scripts"))
try:
    from signal_collector import get_collector, SignalCollector
    MIND_AVAILABLE = True
except ImportError:
    MIND_AVAILABLE = False
    print("Warning: Framework Mind not available (signal_collector.py not found)")

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
ACEDIT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.dirname(ACEDIT_DIR)
SCRIPTS_DIR = os.path.join(ACEDIT_DIR, "scripts")
SOURCES_DIR = os.path.join(ACEDIT_DIR, "sources")
FONTS_DIR = os.path.join(ACEDIT_DIR, "fonts")
UFO_PATH = os.path.join(SOURCES_DIR, "ACEDIT-Regular.ufo")
GLYPHS_DIR = os.path.join(UFO_PATH, "glyphs")
VALIDATION_REPORT = os.path.join(ACEDIT_DIR, "validation", "validation-report.json")

# ---------------------------------------------------------------------------
# Build state
# ---------------------------------------------------------------------------
STAGES = [
    {"id": 1, "name": "INVENTORY",   "description": "Generate allocation table & register glyphs"},
    {"id": 2, "name": "GEOMETRY",    "description": "Assemble APL glyph outlines"},
    {"id": 3, "name": "TYPOGRAPHY",  "description": "Hinting & optical balance"},
    {"id": 4, "name": "FEATURES",    "description": "Generate OpenType groups"},
    {"id": 5, "name": "COMPILATION", "description": "fontmake OTF/TTF + WOFF2"},
    {"id": 6, "name": "VALIDATION",  "description": "Finalize tracker & validation suite"},
]


class BuildState:
    """Thread-safe build state manager."""

    def __init__(self):
        self.lock = threading.Lock()
        self.running = False
        self.current_stage = 0
        self.stages: dict[int, dict] = {}
        self.log_lines: list[str] = []
        self.started_at: str | None = None
        self.finished_at: str | None = None
        self.result: str | None = None  # "success" | "failure" | None
        self.subscribers: list[queue.Queue] = []

    def reset(self):
        with self.lock:
            self.running = True
            self.current_stage = 0
            self.stages = {
                s["id"]: {"status": "pending", "elapsed": None, "error": None}
                for s in STAGES
            }
            self.log_lines = []
            self.started_at = datetime.now(timezone.utc).isoformat()
            self.finished_at = None
            self.result = None

    def emit(self, event: str, data: dict):
        """Send an SSE event to all subscribers."""
        msg = data.copy()
        msg["event"] = event
        msg["timestamp"] = datetime.now(timezone.utc).isoformat()
        with self.lock:
            dead = []
            for q in self.subscribers:
                try:
                    q.put_nowait(msg)
                except queue.Full:
                    dead.append(q)
            for q in dead:
                self.subscribers.remove(q)

    def log(self, line: str):
        with self.lock:
            self.log_lines.append(line)
        self.emit("log", {"line": line})

    def stage_start(self, stage_id: int):
        with self.lock:
            self.current_stage = stage_id
            self.stages[stage_id]["status"] = "running"
            self._stage_start_time = time.monotonic()
        self.emit("stage", {"id": stage_id, "status": "running"})
        # Feed to Framework Mind
        if MIND_AVAILABLE:
            collector = get_collector()
            collector.feed_build_signal('stage_start', float(stage_id))

    def stage_done(self, stage_id: int, elapsed: float):
        with self.lock:
            self.stages[stage_id]["status"] = "done"
            self.stages[stage_id]["elapsed"] = round(elapsed, 2)
        self.emit("stage", {"id": stage_id, "status": "done", "elapsed": round(elapsed, 2)})
        # Feed to Framework Mind: elapsed time in ms
        if MIND_AVAILABLE:
            collector = get_collector()
            collector.feed_build_signal('stage_elapsed', elapsed * 1000)
            # Also feed stage completion as a discrete event
            collector.feed_build_signal('stage_complete', float(stage_id))

    def stage_fail(self, stage_id: int, error: str, elapsed: float):
        with self.lock:
            self.stages[stage_id]["status"] = "failed"
            self.stages[stage_id]["error"] = error
            self.stages[stage_id]["elapsed"] = round(elapsed, 2)
        self.emit("stage", {"id": stage_id, "status": "failed", "error": error})
        # Feed to Framework Mind: failure as negative stage number
        if MIND_AVAILABLE:
            collector = get_collector()
            collector.feed_build_signal('stage_failed', float(-stage_id))

    def finish(self, result: str):
        with self.lock:
            self.running = False
            self.result = result
            self.finished_at = datetime.now(timezone.utc).isoformat()
        self.emit("build", {"status": result})
        # Feed to Framework Mind: 1.0 for success, 0.0 for failure
        if MIND_AVAILABLE:
            collector = get_collector()
            value = 1.0 if result == "success" else 0.0
            collector.feed_build_signal('build_complete', value)

    def subscribe(self) -> queue.Queue:
        q: queue.Queue = queue.Queue(maxsize=500)
        with self.lock:
            self.subscribers.append(q)
        return q

    def unsubscribe(self, q: queue.Queue):
        with self.lock:
            if q in self.subscribers:
                self.subscribers.remove(q)

    def snapshot(self) -> dict:
        with self.lock:
            return {
                "running": self.running,
                "current_stage": self.current_stage,
                "stages": dict(self.stages),
                "started_at": self.started_at,
                "finished_at": self.finished_at,
                "result": self.result,
                "log_count": len(self.log_lines),
            }


build_state = BuildState()

# ---------------------------------------------------------------------------
# Pipeline runner
# ---------------------------------------------------------------------------
FONTVENV_PYTHON = None  # Set from CLI args


def _python():
    """Return the Python executable to use for font tooling."""
    return FONTVENV_PYTHON or sys.executable


def _run_script(script_name: str, cwd: str | None = None) -> str:
    """Run a Python script and capture output, streaming lines to build_state."""
    cmd = [_python(), os.path.join(SCRIPTS_DIR, script_name)]
    build_state.log(f"$ {' '.join(cmd)}")
    proc = subprocess.Popen(
        cmd,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        cwd=cwd or ACEDIT_DIR,
    )
    output_lines = []
    for line in proc.stdout:
        line = line.rstrip("\n")
        output_lines.append(line)
        build_state.log(line)
    proc.wait()
    if proc.returncode != 0:
        raise RuntimeError(f"{script_name} exited with code {proc.returncode}")
    return "\n".join(output_lines)


def _run_cmd(cmd: list[str], cwd: str | None = None) -> str:
    """Run an arbitrary command and stream output."""
    build_state.log(f"$ {' '.join(cmd)}")
    proc = subprocess.Popen(
        cmd,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        cwd=cwd or ACEDIT_DIR,
    )
    output_lines = []
    for line in proc.stdout:
        line = line.rstrip("\n")
        output_lines.append(line)
        build_state.log(line)
    proc.wait()
    if proc.returncode != 0:
        raise RuntimeError(f"Command failed (exit {proc.returncode}): {' '.join(cmd)}")
    return "\n".join(output_lines)


def run_pipeline(stages_to_run: list[int] | None = None):
    """Execute the build pipeline in a background thread."""
    all_stages = [s["id"] for s in STAGES]
    target = stages_to_run or all_stages

    build_state.reset()
    build_state.log(f"ACEDIT Build Pipeline started at {build_state.started_at}")
    build_state.log(f"Stages: {target}")
    build_state.log(f"Python: {_python()}")
    build_state.log(f"Project root: {ACEDIT_DIR}")
    build_state.log("")

    fea_src = os.path.join(UFO_PATH, "features.fea")
    fea_bak = os.path.join(UFO_PATH, "features.fea.bak")

    try:
        for stage_id in target:
            t0 = time.monotonic()
            build_state.stage_start(stage_id)

            try:
                if stage_id == 1:
                    build_state.log("--- Stage 1: INVENTORY ---")
                    _run_script("generate_allocation.py")
                    _run_script("assemble_non_apl.py")

                elif stage_id == 2:
                    build_state.log("--- Stage 2: GEOMETRY ---")
                    _run_script("assemble_apl.py")
                    # Verify glyph count
                    glifs = glob.glob(os.path.join(GLYPHS_DIR, "*.glif"))
                    build_state.log(f"  Generated {len(glifs)} .glif files (expected: 1097)")
                    # Feed glyph count to Framework Mind
                    if MIND_AVAILABLE:
                        collector = get_collector()
                        collector.feed_font_signal('glyph_count', float(len(glifs)))
                    if len(glifs) != 1097:
                        raise RuntimeError(f"Wrong glyph count: {len(glifs)} (expected 1097)")

                elif stage_id == 3:
                    build_state.log("--- Stage 3: TYPOGRAPHY ---")
                    build_state.log("  Verifying constant derivation chain...")
                    _run_script("verify_constants.py")
                    build_state.log("  Validating angle compliance...")
                    # Use forward slashes and escape quotes for Windows compatibility
                    glyphs_dir_safe = GLYPHS_DIR.replace("\\", "/").replace("'", "\\'")
                    _run_cmd([
                        _python(), "-c",
                        "import sys,glob;sys.path.insert(0,'scripts');"
                        "from validate_angles import validate_glif;"
                        f"glifs=glob.glob('{glyphs_dir_safe}/*.glif');"
                        "v=sum(len(validate_glif(g)) for g in glifs);"
                        "print(f'  Angle compliance: {len(glifs)} glyphs, {v} violations');"
                        "assert v==0,f'{v} angle violations'"
                    ])

                elif stage_id == 4:
                    build_state.log("--- Stage 4: FEATURES ---")
                    _run_script("generate_groups.py")

                elif stage_id == 5:
                    build_state.log("--- Stage 5: COMPILATION ---")
                    os.makedirs(FONTS_DIR, exist_ok=True)

                    # Move features.fea aside (references undefined glyphs)
                    if os.path.exists(fea_src):
                        os.rename(fea_src, fea_bak)
                        build_state.log("  Moved features.fea aside")

                    try:
                        # OTF
                        build_state.log("  Compiling OTF...")
                        _run_cmd([
                            _python(), "-m", "fontmake",
                            "-u", UFO_PATH,
                            "-o", "otf",
                            "--output-dir", FONTS_DIR,
                        ])

                        # TTF
                        build_state.log("  Compiling TTF...")
                        _run_cmd([
                            _python(), "-m", "fontmake",
                            "-u", UFO_PATH,
                            "-o", "ttf",
                            "--output-dir", FONTS_DIR,
                        ])

                        # WOFF2
                        build_state.log("  Generating WOFF2...")
                        fonts_dir_safe = FONTS_DIR.replace("\\", "/").replace("'", "\\'")
                        _run_cmd([
                            _python(), "-c",
                            "from fontTools.ttLib import TTFont;"
                            f"f=TTFont('{fonts_dir_safe}/ACEDIT-Regular.otf');"
                            "f.flavor='woff2';"
                            f"f.save('{fonts_dir_safe}/ACEDIT-Regular.woff2');"
                            "print('  WOFF2 generated')"
                        ])
                    finally:
                        # Always restore features.fea
                        if os.path.exists(fea_bak):
                            os.rename(fea_bak, fea_src)
                            build_state.log("  Restored features.fea")

                elif stage_id == 6:
                    build_state.log("--- Stage 6: VALIDATION ---")
                    _run_script("validate.py")

                elapsed = time.monotonic() - t0
                build_state.stage_done(stage_id, elapsed)

            except Exception as exc:
                elapsed = time.monotonic() - t0
                error_msg = str(exc)
                build_state.log(f"  STAGE {stage_id} FAILED: {error_msg}")
                build_state.stage_fail(stage_id, error_msg, elapsed)
                # Mark remaining stages as skipped
                for remaining in target:
                    if remaining > stage_id:
                        with build_state.lock:
                            build_state.stages[remaining]["status"] = "skipped"
                build_state.finish("failure")
                return

        build_state.log("")
        build_state.log("BUILD COMPLETE - all stages passed")
        build_state.finish("success")

    except Exception as exc:
        build_state.log(f"PIPELINE ERROR: {exc}")
        build_state.finish("failure")
    finally:
        # Safety: restore features.fea if somehow left moved
        if os.path.exists(fea_bak) and not os.path.exists(fea_src):
            os.rename(fea_bak, fea_src)


# ---------------------------------------------------------------------------
# Flask app
# ---------------------------------------------------------------------------
app = Flask(__name__, static_folder=None)
CORS(app)


# ---------------------------------------------------------------------------
# Framework Mind request tracking
# ---------------------------------------------------------------------------
@app.before_request
def before_request():
    """Track request start time for latency measurement."""
    g.request_start = time.time()


@app.after_request
def after_request(response):
    """Feed request latency to the Framework Mind."""
    if MIND_AVAILABLE and hasattr(g, 'request_start'):
        latency = (time.time() - g.request_start) * 1000  # ms
        collector = get_collector()
        collector.feed_server_signal('request_latency', latency)
        # Also track response size
        if response.content_length:
            collector.feed_server_signal('response_size', response.content_length)
    return response


# -- Dashboard --
@app.route("/")
def dashboard():
    return send_from_directory(ACEDIT_DIR, "orchestrator.html")


# -- Static file serving for all existing HTML pages and assets --
@app.route("/acedit/<path:filename>")
def serve_acedit(filename):
    return send_from_directory(ACEDIT_DIR, filename)


@app.route("/anti-substrate")
def anti_substrate_dashboard():
    """Serve the Anti-Substrate visualization."""
    return send_from_directory(ACEDIT_DIR, "anti-substrate.html")


@app.route("/anti-substrate/<path:filename>")
def serve_anti_substrate(filename):
    """Serve anti-substrate module files."""
    return send_from_directory(os.path.join(ACEDIT_DIR, "anti-substrate"), filename)


@app.route("/docs/<path:filename>")
def serve_docs(filename):
    return send_from_directory(os.path.join(REPO_ROOT, "docs"), filename)


@app.route("/fonts/<path:filename>")
def serve_fonts(filename):
    return send_from_directory(FONTS_DIR, filename)


# -- Build API --
@app.route("/api/build", methods=["POST"])
def start_build():
    """Start a full or partial build. Body: {"stages": [1,2,3,4,5,6]} or omit for all."""
    if build_state.running:
        return jsonify({"error": "Build already in progress"}), 409

    data = request.get_json(silent=True) or {}
    stages = data.get("stages")
    if stages and not all(isinstance(s, int) and 1 <= s <= 6 for s in stages):
        return jsonify({"error": "stages must be integers 1-6"}), 400

    t = threading.Thread(target=run_pipeline, args=(stages,), daemon=True)
    t.start()
    return jsonify({"status": "started", "stages": stages or [1, 2, 3, 4, 5, 6]})


@app.route("/api/build/status")
def build_status():
    """Get current build status snapshot."""
    return jsonify(build_state.snapshot())


@app.route("/api/build/logs")
def build_logs():
    """Get all accumulated build log lines."""
    with build_state.lock:
        return jsonify({"lines": list(build_state.log_lines)})


@app.route("/api/build/stream")
def build_stream():
    """SSE endpoint for real-time build events."""
    q = build_state.subscribe()

    def generate():
        # Send current state as initial event
        yield f"data: {json.dumps(build_state.snapshot())}\n\n"
        try:
            while True:
                try:
                    msg = q.get(timeout=30)
                    yield f"data: {json.dumps(msg)}\n\n"
                except queue.Empty:
                    # Keepalive
                    yield ": keepalive\n\n"
        except GeneratorExit:
            pass
        finally:
            build_state.unsubscribe(q)

    return Response(
        generate(),
        mimetype="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
            "Connection": "keep-alive",
        },
    )


# -- Validation API --
@app.route("/api/validation")
def get_validation():
    """Return the latest validation report."""
    if os.path.exists(VALIDATION_REPORT):
        with open(VALIDATION_REPORT, encoding="utf-8") as f:
            return jsonify(json.load(f))
    return jsonify({"error": "No validation report found. Run a build first."}), 404


# -- Font artifacts API --
@app.route("/api/fonts")
def list_fonts():
    """List compiled font artifacts with sizes."""
    if not os.path.isdir(FONTS_DIR):
        return jsonify({"fonts": []})

    fonts = []
    for name in sorted(os.listdir(FONTS_DIR)):
        path = os.path.join(FONTS_DIR, name)
        if os.path.isfile(path):
            fonts.append({
                "name": name,
                "size": os.path.getsize(path),
                "size_human": f"{os.path.getsize(path) / 1024:.1f} KB",
                "url": f"/fonts/{name}",
            })
    return jsonify({"fonts": fonts})


# -- Source inventory API --
@app.route("/api/inventory")
def get_inventory():
    """Return glyph counts and allocation summary."""
    result = {"glif_count": 0, "allocation_count": 0, "blocks": {}}

    glifs = glob.glob(os.path.join(GLYPHS_DIR, "*.glif"))
    result["glif_count"] = len(glifs)

    alloc_path = os.path.join(SOURCES_DIR, "allocation_table.json")
    if os.path.exists(alloc_path):
        with open(alloc_path, encoding="utf-8") as f:
            table = json.load(f)
        result["allocation_count"] = len(table)
        blocks: dict[str, int] = {}
        for entry in table:
            block = entry.get("block", "unknown")
            blocks[block] = blocks.get(block, 0) + 1
        result["blocks"] = blocks

    return jsonify(result)


# -- Stages metadata --
@app.route("/api/stages")
def get_stages():
    return jsonify({"stages": STAGES})


# -- Binary verification (quick check) --
_VERIFY_SCRIPT = '''
import json, os, sys
from fontTools.ttLib import TTFont

otf_path = sys.argv[1]
woff2_path = sys.argv[2]

font = TTFont(otf_path)
cmap = font.getBestCmap()
hmtx = font["hmtx"]
pua = [cp for cp in cmap if 0xE000 <= cp <= 0xF8FF]

checks = []
def check(name, ok, detail=""):
    checks.append({"name": name, "pass": ok, "detail": detail if not ok else ""})

check("Glyph count = 1097", len(font.getGlyphOrder()) == 1097,
      f"got {len(font.getGlyphOrder())}")
check("PUA codepoints = 1094", len(pua) == 1094, f"got {len(pua)}")
check("PUA starts at U+E000", min(pua) == 0xE000, f"starts at U+{min(pua):04X}")
check("PUA ends at U+E445", max(pua) == 0xE445, f"ends at U+{max(pua):04X}")
check("PUA contiguous", len(pua) == 0xE445 - 0xE000 + 1)
check("U+0020 mapped", 0x0020 in cmap)
check("U+00A0 mapped", 0x00A0 in cmap)

non_618 = [n for n, (w, _) in hmtx.metrics.items() if w != 618]
check("All advance widths = 618", len(non_618) == 0, f"{len(non_618)} differ")

check("UPM = 1000", font["head"].unitsPerEm == 1000)
check("yMin = 0", font["head"].yMin == 0)
check("yMax = 618", font["head"].yMax == 618)
check("usWinDescent = 0", font["OS/2"].usWinDescent == 0)
check("fsSelection = 192", font["OS/2"].fsSelection == 192)
check("sCapHeight = 618", font["OS/2"].sCapHeight == 618)
check("sxHeight = 382", font["OS/2"].sxHeight == 382)
check("isFixedPitch = 1", font["post"].isFixedPitch == 1)

family = None
for r in font["name"].names:
    if r.nameID == 1:
        family = r.toUnicode()
        break
check("familyName = ACEDIT", family == "ACEDIT", f"got \\'{family}\\'")

if os.path.exists(woff2_path):
    sz = os.path.getsize(woff2_path)
    check(f"WOFF2 < 150 KB ({sz / 1024:.1f} KB)", sz < 150 * 1024)

font.close()

passed = sum(1 for c in checks if c["pass"])
total = len(checks)
print(json.dumps({"passed": passed, "total": total, "all_pass": passed == total, "checks": checks}))
'''


@app.route("/api/verify")
def verify_binary():
    """Run the binary verification checks against the compiled OTF."""
    otf_path = os.path.join(FONTS_DIR, "ACEDIT-Regular.otf")
    woff2_path = os.path.join(FONTS_DIR, "ACEDIT-Regular.woff2")

    if not os.path.exists(otf_path):
        return jsonify({"error": "OTF not found. Run a build first."}), 404

    try:
        result = subprocess.run(
            [_python(), "-c", _VERIFY_SCRIPT, otf_path, woff2_path],
            capture_output=True, text=True, timeout=30,
        )
        if result.returncode != 0:
            return jsonify({"error": result.stderr or result.stdout}), 500

        data = json.loads(result.stdout)

        # Feed verification metrics to Framework Mind
        if MIND_AVAILABLE:
            collector = get_collector()
            # Feed overall pass rate
            pass_rate = data["passed"] / data["total"] if data["total"] > 0 else 0
            collector.feed_font_signal('verify_pass_rate', pass_rate)
            # Feed glyph count (extracted from checks)
            for check in data.get("checks", []):
                if "Glyph count" in check["name"]:
                    # Extract actual count from detail if failed
                    try:
                        if check["detail"]:
                            count = int(check["detail"].split()[-1])
                        else:
                            count = 1097  # Expected value
                        collector.feed_font_signal('glyph_count', float(count))
                    except (ValueError, IndexError):
                        pass
                elif "WOFF2" in check["name"] and "KB" in check["name"]:
                    # Extract size from name
                    try:
                        import re
                        match = re.search(r'([\d.]+)\s*KB', check["name"])
                        if match:
                            size_kb = float(match.group(1))
                            collector.feed_font_signal('woff2_size_kb', size_kb)
                    except (ValueError, AttributeError):
                        pass

        return jsonify(data)
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


# ---------------------------------------------------------------------------
# Framework Mind API
# ---------------------------------------------------------------------------
@app.route("/api/mind")
def mind_status():
    """Get current Framework Mind state across all channels."""
    if not MIND_AVAILABLE:
        return jsonify({"error": "Framework Mind not available"}), 503

    collector = get_collector()
    return jsonify(collector.get_state())


@app.route("/api/mind/channel/<channel>")
def mind_channel(channel):
    """Get state for a specific mind channel."""
    if not MIND_AVAILABLE:
        return jsonify({"error": "Framework Mind not available"}), 503

    collector = get_collector()
    if channel not in collector.channels:
        return jsonify({"error": f"Unknown channel: {channel}"}), 404

    return jsonify(collector.channels[channel].get_state())


@app.route("/api/mind/history/<channel>")
def mind_history(channel):
    """Get signal history for a channel."""
    if not MIND_AVAILABLE:
        return jsonify({"error": "Framework Mind not available"}), 503

    limit = request.args.get("limit", 100, type=int)
    collector = get_collector()
    return jsonify({"history": collector.get_channel_history(channel, limit)})


@app.route("/api/mind/anomalies")
def mind_anomalies():
    """Get recent anomalies across all channels."""
    if not MIND_AVAILABLE:
        return jsonify({"error": "Framework Mind not available"}), 503

    limit = request.args.get("limit", 50, type=int)
    collector = get_collector()
    return jsonify({"anomalies": collector.get_all_anomalies(limit)})


@app.route("/api/mind/feed", methods=["POST"])
def mind_feed():
    """Manually feed a signal to the mind. Body: {channel, value, metadata}."""
    if not MIND_AVAILABLE:
        return jsonify({"error": "Framework Mind not available"}), 503

    data = request.get_json(silent=True) or {}
    channel = data.get("channel", "SYSTEM")
    value = data.get("value")
    metadata = data.get("metadata", {})

    if value is None:
        return jsonify({"error": "value is required"}), 400

    try:
        value = float(value)
    except (TypeError, ValueError):
        return jsonify({"error": "value must be numeric"}), 400

    collector = get_collector()
    result = collector.feed(channel, value, metadata)
    return jsonify(result)


@app.route("/api/mind/reset", methods=["POST"])
def mind_reset():
    """Reset mind state. Body: {channel} or {} for all."""
    if not MIND_AVAILABLE:
        return jsonify({"error": "Framework Mind not available"}), 503

    data = request.get_json(silent=True) or {}
    channel = data.get("channel")

    collector = get_collector()
    if channel:
        collector.reset_channel(channel)
        return jsonify({"status": "reset", "channel": channel})
    else:
        collector.reset_all()
        return jsonify({"status": "reset", "channel": "all"})


@app.route("/api/mind/stream")
def mind_stream():
    """SSE endpoint for real-time Framework Mind events."""
    if not MIND_AVAILABLE:
        return jsonify({"error": "Framework Mind not available"}), 503

    collector = get_collector()
    event_queue = queue.Queue(maxsize=500)

    def on_signal(event):
        try:
            event_queue.put_nowait(event)
        except queue.Full:
            pass

    sub_idx = collector.subscribe(on_signal)

    def generate():
        # Send current state as initial event
        yield f"data: {json.dumps({'event': 'init', 'state': collector.get_state()})}\n\n"
        try:
            while True:
                try:
                    event = event_queue.get(timeout=30)
                    yield f"data: {json.dumps(event)}\n\n"
                except queue.Empty:
                    # Keepalive
                    yield ": keepalive\n\n"
        except GeneratorExit:
            pass
        finally:
            collector.unsubscribe(sub_idx)

    return Response(
        generate(),
        mimetype="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
            "Connection": "keep-alive",
        },
    )


# -- Mind dashboard --
@app.route("/mind")
def mind_dashboard():
    """Serve the Framework Mind dashboard."""
    return send_from_directory(ACEDIT_DIR, "mind-dashboard.html")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main():
    parser = argparse.ArgumentParser(description="ACEDIT Task Orchestration Server")
    parser.add_argument("--port", type=int, default=5618,
                        help="Port to listen on (default: 5618, from UPM/phi rounded)")
    parser.add_argument("--host", default="0.0.0.0",
                        help="Host to bind to (default: 0.0.0.0)")
    parser.add_argument("--fontvenv", default=None,
                        help="Path to fontvenv directory (for fontmake/fonttools)")
    parser.add_argument("--debug", action="store_true",
                        help="Enable Flask debug mode")
    args = parser.parse_args()

    global FONTVENV_PYTHON
    if args.fontvenv:
        FONTVENV_PYTHON = os.path.join(args.fontvenv, "bin", "python3")
    elif os.path.exists(os.path.expanduser("~/fontvenv/bin/python3")):
        FONTVENV_PYTHON = os.path.expanduser("~/fontvenv/bin/python3")

    print(f"ACEDIT Task Orchestration Server")
    print(f"  Port:     {args.port}")
    print(f"  Python:   {FONTVENV_PYTHON or sys.executable}")
    print(f"  Project:  {ACEDIT_DIR}")
    print(f"  Dashboard: http://localhost:{args.port}/")
    print()

    app.run(host=args.host, port=args.port, debug=args.debug, threaded=True)


if __name__ == "__main__":
    main()
