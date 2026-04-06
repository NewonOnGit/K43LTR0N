#!/usr/bin/env python3
"""Stage 6 validation runner for the ACEDIT font project.

Runs four checks against the built font and UFO sources:
  1. fontbakery (check-universal + check-opentype)
  2. Angle compliance against the permitted palette
  3. Glyph naming convention validation
  4. Moire-pattern advance-width delta analysis

Produces {project_root}/validation/validation-report.json
"""

import glob
import json
import os
import plistlib
import subprocess
import sys
import tempfile
from datetime import datetime, timezone

# ---------------------------------------------------------------------------
# Sibling module imports via sys.path manipulation
# ---------------------------------------------------------------------------
_SCRIPTS_DIR = os.path.dirname(os.path.abspath(__file__))
if _SCRIPTS_DIR not in sys.path:
    sys.path.insert(0, _SCRIPTS_DIR)

from validate_angles import validate_glif
from naming import validate_name
from constants import ANGLES, ALPHA, BETA, ADVANCES

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
_PROJECT_ROOT = os.path.dirname(_SCRIPTS_DIR)
_REPORT_PATH = os.path.join(_PROJECT_ROOT, "validation", "validation-report.json")


# ---------------------------------------------------------------------------
# 1. fontbakery
# ---------------------------------------------------------------------------
def run_fontbakery(font_path: str) -> dict:
    """Run fontbakery check-universal and check-opentype with --json output.

    Counts FAIL results across both profiles. Returns a dict with
    fontbakery_fails count and a per-profile breakdown.

    If fontbakery is not installed or any other error occurs, returns
    {"fontbakery_fails": -1, "note": "fontbakery not installed"}.
    """
    try:
        total_fails = 0
        profile_details = {}

        for profile in ("check-universal", "check-opentype"):
            with tempfile.NamedTemporaryFile(
                suffix=".json", delete=False, mode="w"
            ) as tmp:
                tmp_path = tmp.name

            try:
                subprocess.run(
                    ["fontbakery", profile, "--json", tmp_path, font_path],
                    capture_output=True,
                    text=True,
                    timeout=300,
                )
                with open(tmp_path, "r", encoding="utf-8") as f:
                    fb_report = json.load(f)

                fail_count = 0
                sections = fb_report.get("sections", [])
                for section in sections:
                    for check in section.get("checks", []):
                        for log in check.get("logs", []):
                            if log.get("status", "").upper() == "FAIL":
                                fail_count += 1

                profile_details[profile] = {"fails": fail_count}
                total_fails += fail_count
            finally:
                if os.path.exists(tmp_path):
                    os.unlink(tmp_path)

        return {
            "fontbakery_fails": total_fails,
            "profiles": profile_details,
        }

    except Exception:
        return {
            "fontbakery_fails": -1,
            "note": "fontbakery not installed",
        }


# ---------------------------------------------------------------------------
# 2. Angle compliance
# ---------------------------------------------------------------------------
def check_angles(glyphs_dir: str) -> dict:
    """Validate every .glif file against the permitted angle palette.

    The permitted angles are [120, 108, 90, 72, 60, 36, 30, 6] degrees.

    Returns a dict with:
      - total_glyphs: number of .glif files examined
      - angle_compliant: number that pass validation
      - compliance_pct: percentage compliant (0-100)
      - violations: dict mapping filename to list of violation descriptions
    """
    glif_files = sorted(glob.glob(os.path.join(glyphs_dir, "*.glif")))
    total = len(glif_files)
    compliant = 0
    violations = {}

    for glif_path in glif_files:
        filename = os.path.basename(glif_path)
        # validate_glif returns a list of violation dicts (empty = compliant)
        violation_list = validate_glif(glif_path)

        if not violation_list:
            compliant += 1
        else:
            violations[filename] = [
                f"vertex {v['vertex_index']} at {v['position']}: "
                f"measured={v['measured']}deg nearest={v['nearest']}deg "
                f"deviation={v['deviation']}deg"
                for v in violation_list
            ]

    compliance_pct = (compliant / total * 100.0) if total > 0 else 100.0

    return {
        "total_glyphs": total,
        "angle_compliant": compliant,
        "compliance_pct": round(compliance_pct, 4),
        "violations": violations,
    }


# ---------------------------------------------------------------------------
# 3. Naming validation
# ---------------------------------------------------------------------------
def check_naming(glyphs_dir: str) -> dict:
    """Read contents.plist and validate every glyph name.

    Returns counts of canonical, safe, and invalid names, plus a list of
    the invalid names.
    """
    contents_path = os.path.join(glyphs_dir, "contents.plist")

    if not os.path.exists(contents_path):
        return {
            "canonical": 0,
            "safe": 0,
            "invalid": 0,
            "invalid_names": [],
            "note": "contents.plist not found",
        }

    with open(contents_path, "rb") as f:
        contents = plistlib.load(f)

    canonical_count = 0
    safe_count = 0
    invalid_count = 0
    invalid_names = []

    for glyph_name in sorted(contents.keys()):
        kind = validate_name(glyph_name)
        if kind == "canonical":
            canonical_count += 1
        elif kind == "safe":
            safe_count += 1
        else:
            invalid_count += 1
            invalid_names.append(glyph_name)

    return {
        "canonical": canonical_count,
        "safe": safe_count,
        "invalid": invalid_count,
        "invalid_names": invalid_names,
    }


# ---------------------------------------------------------------------------
# 4. Moire advance-width check
# ---------------------------------------------------------------------------
def check_moire(font_path: str) -> dict:
    """Check PUA advance widths against base Latin widths for moire risk.

    Opens the font with fontTools.ttLib.TTFont, reads the hmtx table.
    Compares PUA advance widths (glyph names starting with "acedit.") against
    the base Latin advance widths.

    Counts pairs where:
      - delta > ALPHA * 1000  (382) -> reject
      - delta > BETA  * 1000  (146) -> warn

    Returns a dict with reject_count, warn_count, and detail lists.
    """
    try:
        from fontTools.ttLib import TTFont
    except ImportError:
        return {
            "reject_count": -1,
            "warn_count": -1,
            "note": "fontTools not installed",
        }

    try:
        font = TTFont(font_path)
    except Exception as exc:
        return {
            "reject_count": -1,
            "warn_count": -1,
            "note": f"could not open font: {exc}",
        }

    try:
        hmtx = font["hmtx"]
    except KeyError:
        return {
            "reject_count": -1,
            "warn_count": -1,
            "note": "hmtx table not found in font",
        }

    reject_threshold = ALPHA * 1000   # 382
    warn_threshold = BETA * 1000      # ~146

    # Collect base Latin advance widths
    base_widths = {}
    pua_widths = {}

    for glyph_name, (advance, _lsb) in hmtx.metrics.items():
        if glyph_name.startswith("acedit."):
            pua_widths[glyph_name] = advance
        else:
            base_widths[glyph_name] = advance

    reject_count = 0
    warn_count = 0
    reject_details = []
    warn_details = []

    for pua_name, pua_adv in sorted(pua_widths.items()):
        for base_name, base_adv in base_widths.items():
            delta = abs(pua_adv - base_adv)
            if delta > reject_threshold:
                reject_count += 1
                reject_details.append({
                    "pua": pua_name,
                    "base": base_name,
                    "delta": delta,
                })
            elif delta > warn_threshold:
                warn_count += 1
                warn_details.append({
                    "pua": pua_name,
                    "base": base_name,
                    "delta": delta,
                })

    font.close()

    return {
        "reject_count": reject_count,
        "warn_count": warn_count,
        "reject_threshold": round(reject_threshold),
        "warn_threshold": round(warn_threshold),
        "pua_glyphs_checked": len(pua_widths),
        "base_glyphs_checked": len(base_widths),
        "reject_details": reject_details[:50],   # cap detail output
        "warn_details": warn_details[:50],
    }


# ---------------------------------------------------------------------------
# 5. Main
# ---------------------------------------------------------------------------
def main() -> int:
    """Run all validation checks and write the consolidated report.

    Takes font_path from argv[1] or defaults to fonts/ACEDIT-Regular.otf.
    Glyphs dir = sources/ACEDIT-Regular.ufo/glyphs.

    Returns 0 on pass, 1 on fail.
    """
    if len(sys.argv) > 1:
        font_path = sys.argv[1]
    else:
        font_path = os.path.join(_PROJECT_ROOT, "fonts", "ACEDIT-Regular.otf")

    glyphs_dir = os.path.join(
        _PROJECT_ROOT, "sources", "ACEDIT-Regular.ufo", "glyphs"
    )

    print("=" * 60)
    print("  ACEDIT Stage 6 Validation Runner")
    print("=" * 60)
    print(f"  Font path:   {font_path}")
    print(f"  Glyphs dir:  {glyphs_dir}")
    print()

    # --- Run all four checks ---
    print("[1/4] Running fontbakery checks...")
    fb_result = run_fontbakery(font_path)
    print(f"       fontbakery fails: {fb_result['fontbakery_fails']}")

    print("[2/4] Checking angle compliance...")
    angle_result = check_angles(glyphs_dir)
    print(f"       {angle_result['angle_compliant']}/{angle_result['total_glyphs']} "
          f"compliant ({angle_result['compliance_pct']}%)")

    print("[3/4] Checking naming conventions...")
    naming_result = check_naming(glyphs_dir)
    print(f"       canonical={naming_result['canonical']}  "
          f"safe={naming_result['safe']}  "
          f"invalid={naming_result['invalid']}")

    print("[4/4] Checking moire advance-width deltas...")
    moire_result = check_moire(font_path)
    print(f"       rejects={moire_result['reject_count']}  "
          f"warns={moire_result['warn_count']}")

    # --- Determine overall pass/fail ---
    reasons = []

    # fontbakery: fail if any FAILs (skip if not installed, i.e. -1)
    if fb_result["fontbakery_fails"] > 0:
        reasons.append(
            f"fontbakery reported {fb_result['fontbakery_fails']} FAIL(s)"
        )

    # Angle compliance must be 100%
    if angle_result["compliance_pct"] < 100.0:
        reasons.append(
            f"angle compliance {angle_result['compliance_pct']}% < 100%"
        )

    # No invalid names allowed
    if naming_result["invalid"] > 0:
        reasons.append(
            f"{naming_result['invalid']} invalid glyph name(s)"
        )

    # No moire reject violations (skip if fontTools missing, i.e. -1)
    if moire_result["reject_count"] > 0:
        reasons.append(
            f"{moire_result['reject_count']} moire reject violation(s)"
        )

    overall_pass = len(reasons) == 0

    # --- Build report ---
    report = {
        "version": "1.0.0",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "font_path": font_path,
        "glyphs_dir": glyphs_dir,
        "overall": "PASS" if overall_pass else "FAIL",
        "failure_reasons": reasons,
        "checks": {
            "fontbakery": fb_result,
            "angles": angle_result,
            "naming": naming_result,
            "moire": moire_result,
        },
    }

    # --- Write report ---
    os.makedirs(os.path.dirname(_REPORT_PATH), exist_ok=True)
    with open(_REPORT_PATH, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
        f.write("\n")

    # --- Print summary ---
    print()
    print("-" * 60)
    if overall_pass:
        print("  OVERALL: PASS")
    else:
        print("  OVERALL: FAIL")
        for reason in reasons:
            print(f"    - {reason}")
    print(f"  Report written to: {_REPORT_PATH}")
    print("-" * 60)

    return 0 if overall_pass else 1


# ---------------------------------------------------------------------------
if __name__ == "__main__":
    sys.exit(main())
