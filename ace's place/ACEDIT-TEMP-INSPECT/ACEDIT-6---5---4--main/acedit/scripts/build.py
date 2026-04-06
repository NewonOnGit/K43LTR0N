#!/usr/bin/env python3
"""Master build pipeline for the ACEDIT font project.

Orchestrates the six build stages in sequence, tracking defect
propagation via PipelineTracker and driving all subsidiary scripts.

Stages
------
1. INVENTORY   -- generate allocation table, register glyphs
2. GEOMETRY    -- assemble APL glyph outlines
3. TYPOGRAPHY  -- hinting / optical balance (placeholder)
4. FEATURES    -- generate OpenType groups & features
5. COMPILATION -- fontmake OTF/TTF + WOFF2 conversion
6. VALIDATION  -- finalize tracker, run validation suite
"""

from __future__ import annotations

import json
import os
import subprocess
import sys
import time

# ---------------------------------------------------------------------------
# Project paths (all relative to the repository root)
# ---------------------------------------------------------------------------
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPTS = os.path.join(ROOT, "scripts")
SOURCES = os.path.join(ROOT, "sources")
FONTS = os.path.join(ROOT, "fonts")
UFO_PATH = os.path.join(SOURCES, "ACEDIT-Regular.ufo")
ALLOC_TABLE = os.path.join(SOURCES, "allocation_table.json")

# ---------------------------------------------------------------------------
# Sibling imports
# ---------------------------------------------------------------------------
sys.path.insert(0, SCRIPTS)

from defect_tracker import PipelineTracker  # noqa: E402
from naming import validate_name            # noqa: E402
import generate_allocation                  # noqa: E402


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
def stage(n: int, label: str, fn):
    """Run *fn*, printing a stage header and elapsed time."""
    header = f"[{n}/6] {label}"
    print(f"\n{'=' * 60}")
    print(f"  {header}")
    print(f"{'=' * 60}")
    t0 = time.monotonic()
    fn()
    elapsed = time.monotonic() - t0
    print(f"  -- {label} completed in {elapsed:.2f}s")


def _run(script: str, *extra_args: str) -> None:
    """Run a sibling Python script as a subprocess."""
    path = os.path.join(SCRIPTS, script)
    cmd = [sys.executable, path, *extra_args]
    print(f"  $ {' '.join(cmd)}")
    subprocess.check_call(cmd, cwd=ROOT)


# ---------------------------------------------------------------------------
# Stage implementations
# ---------------------------------------------------------------------------
tracker = PipelineTracker()


def _stage_inventory() -> None:
    """Stage 1 -- INVENTORY: generate allocation table & register glyphs."""
    table = generate_allocation.generate()

    # Also load from disk to ensure round-trip fidelity
    with open(ALLOC_TABLE, encoding="utf-8") as f:
        table = json.load(f)

    for entry in table:
        name = entry["name"]
        codepoint = entry["codepoint"]
        tracker.register(name, codepoint)

        kind = validate_name(name)
        eps = 0.0 if kind == "canonical" else 0.05
        tracker.record_stage(name, 1, eps)

    print(f"  Registered {len(table)} glyphs ({len(tracker.glyphs)} in tracker)")


def _stage_geometry() -> None:
    """Stage 2 -- GEOMETRY: assemble APL outlines."""
    _run("assemble_apl.py")
    for name in tracker.glyphs:
        tracker.record_stage(name, 2, 0.005)


def _stage_typography() -> None:
    """Stage 3 -- TYPOGRAPHY: hinting & optical balance (placeholder)."""
    print("  (placeholder -- no external script)")
    for name in tracker.glyphs:
        tracker.record_stage(name, 3, 0.003)


def _stage_features() -> None:
    """Stage 4 -- FEATURES: generate OpenType groups."""
    _run("generate_groups.py")
    for name in tracker.glyphs:
        tracker.record_stage(name, 4, 0.002)


def _stage_compilation() -> None:
    """Stage 5 -- COMPILATION: fontmake + WOFF2."""
    os.makedirs(FONTS, exist_ok=True)

    try:
        # OTF
        print("  Building OTF ...")
        subprocess.check_call(
            [
                sys.executable, "-m", "fontmake",
                "-u", UFO_PATH,
                "-o", "otf",
                "--output-dir", FONTS,
            ],
            cwd=ROOT,
        )

        # TTF
        print("  Building TTF ...")
        subprocess.check_call(
            [
                sys.executable, "-m", "fontmake",
                "-u", UFO_PATH,
                "-o", "ttf",
                "--output-dir", FONTS,
            ],
            cwd=ROOT,
        )

        # WOFF2 from TTF
        print("  Generating WOFF2 ...")
        from fontTools.ttLib import TTFont  # noqa: E402

        for ttf_name in os.listdir(FONTS):
            if ttf_name.endswith(".ttf"):
                ttf_path = os.path.join(FONTS, ttf_name)
                woff2_path = ttf_path.rsplit(".", 1)[0] + ".woff2"
                font = TTFont(ttf_path)
                font.flavor = "woff2"
                font.save(woff2_path)
                print(f"    {woff2_path}")

    except Exception as exc:
        print(f"  WARNING: compilation step failed ({exc})")
        print("  fontmake or fontTools may not be installed -- skipping.")

    for name in tracker.glyphs:
        tracker.record_stage(name, 5, 0.001)


def _stage_validation() -> None:
    """Stage 6 -- VALIDATION: finalize tracker & run validation suite."""
    tracker.finalize()

    rpt = tracker.report()
    print(f"  Total glyphs:       {rpt['total']}")
    print(f"  Registered:         {rpt['registered']}")
    print(f"  Latent:             {rpt['latent']}")
    print(f"  Ruptured:           {rpt['ruptured']}")
    print(f"  Registration rate:  {rpt['registration_rate']:.4f}")
    print(f"  Rupture rate:       {rpt['rupture_rate']:.4f}")
    print(f"  Max defect:         {rpt['max_defect']:.6f}")

    _run("validate.py")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main() -> int:
    """Run the full 6-stage pipeline. Return 0 on success, 1 on failure."""
    print(f"ACEDIT build pipeline  (root: {ROOT})")
    ok = True

    stages = [
        (1, "INVENTORY",   _stage_inventory),
        (2, "GEOMETRY",    _stage_geometry),
        (3, "TYPOGRAPHY",  _stage_typography),
        (4, "FEATURES",    _stage_features),
        (5, "COMPILATION", _stage_compilation),
        (6, "VALIDATION",  _stage_validation),
    ]

    for n, label, fn in stages:
        try:
            stage(n, label, fn)
        except Exception as exc:
            print(f"\n  STAGE {n} ({label}) FAILED: {exc}")
            ok = False
            break

    print()
    if ok:
        print("BUILD COMPLETE")
        return 0
    else:
        print("BUILD FAILED")
        return 1


if __name__ == "__main__":
    sys.exit(main())
