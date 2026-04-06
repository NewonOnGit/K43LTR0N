"""Verify every ACEDIT constant computes correctly."""
import math
import sys

from constants import (
    PHI, PHI_INV, ALPHA, BETA, K_FORM, UPM,
    METRICS, STROKES, ADVANCES, SIDEBEARINGS, TENSIONS,
    ANGLES, ANGLE_TOLERANCE,
)

passed = 0
failed = 0


def check(name, computed, expected, tol=1e-6):
    """Compare computed vs expected; print result and update counters."""
    global passed, failed
    if isinstance(expected, float):
        ok = abs(computed - expected) < tol
    else:
        ok = computed == expected
    mark = "\u2713" if ok else "\u2717"
    status = "PASS" if ok else "FAIL"
    print(f"  {mark} {status}  {name:45s}  computed={computed}  expected={expected}")
    if ok:
        passed += 1
    else:
        failed += 1


# ------------------------------------------------------------------
# 1. Core mathematical constants
# ------------------------------------------------------------------
print("=== Core Constants ===")

phi_exact = (1 + math.sqrt(5)) / 2
check("phi",            PHI,     phi_exact)
check("phi_inv",        PHI_INV, 1 / phi_exact)
check("alpha (phi^-2)", ALPHA,   (1 / phi_exact) ** 2)
check("beta  (phi^-4)", BETA,    (1 / phi_exact) ** 4)

# z_c: Feigenbaum-related critical point  z_c = phi^-1
z_c = PHI_INV
check("z_c  (phi^-1)",  z_c,     1 / phi_exact)

# (5/3)^4
ratio_5_3_pow4 = (5 / 3) ** 4
check("(5/3)^4",        ratio_5_3_pow4, (5 / 3) ** 4)

# ------------------------------------------------------------------
# 2. Font Metrics
# ------------------------------------------------------------------
print("\n=== Font Metrics ===")

check("capHeight",  METRICS["capHeight"],  618)
check("xHeight",    METRICS["xHeight"],    382)
check("ascender",   METRICS["ascender"],   800)
check("descender",  METRICS["descender"],  -200)
check("unitsPerEm", METRICS["unitsPerEm"], 1000)

check("openTypeOS2TypoAscender",  METRICS["openTypeOS2TypoAscender"],  800)
check("openTypeOS2TypoDescender", METRICS["openTypeOS2TypoDescender"], -200)
check("openTypeOS2TypoLineGap",   METRICS["openTypeOS2TypoLineGap"],   0)
check("openTypeOS2WinAscent",     METRICS["openTypeOS2WinAscent"],     1000)
check("openTypeOS2WinDescent",    METRICS["openTypeOS2WinDescent"],    200)
check("openTypeHheaAscender",     METRICS["openTypeHheaAscender"],     800)
check("openTypeHheaDescender",    METRICS["openTypeHheaDescender"],    -200)
check("openTypeHheaLineGap",      METRICS["openTypeHheaLineGap"],      0)

# ------------------------------------------------------------------
# 3. Stroke Widths
# ------------------------------------------------------------------
print("\n=== Stroke Widths ===")

check("stroke primary",   STROKES["primary"],   73)
check("stroke secondary", STROKES["secondary"], 28)
check("stroke hairline",  STROKES["hairline"],  11)

# ------------------------------------------------------------------
# 4. Advance Widths
# ------------------------------------------------------------------
print("\n=== Advance Widths ===")

check("advance standard", ADVANCES["standard"], 618)
check("advance narrow",   ADVANCES["narrow"],   382)
check("advance wide",     ADVANCES["wide"],     1000)

# ------------------------------------------------------------------
# 5. Sidebearings
# ------------------------------------------------------------------
print("\n=== Sidebearings ===")

check("sidebearing standard", SIDEBEARINGS["standard"], 73)
check("sidebearing tight",    SIDEBEARINGS["tight"],    36)
check("sidebearing wide",     SIDEBEARINGS["wide"],     146)

# ------------------------------------------------------------------
# 6. Tensions
# ------------------------------------------------------------------
print("\n=== Tensions ===")

check("tension standard", TENSIONS["standard"], 571)
check("tension tight",    TENSIONS["tight"],    353)
check("tension loose",    TENSIONS["loose"],    218)

# ------------------------------------------------------------------
# 7. APL Block Size
# ------------------------------------------------------------------
print("\n=== APL Block Size ===")

apl_block = 9 * 3 * 6 * 6
check("APL block (9*3*6*6)", apl_block, 972)

# ------------------------------------------------------------------
# 8. Pipeline Constants
# ------------------------------------------------------------------
print("\n=== Pipeline Constants ===")

transfer_coeff = K_FORM  # 0.924
check("transfer coefficient (K_FORM)", transfer_coeff, 0.924)

# Defect after 6 stages: residual = (1 - K_FORM)^6
stages = 6
defect_after_6 = (1 - K_FORM) ** stages
expected_defect = (1 - 0.924) ** 6
check("defect after 6 stages", defect_after_6, expected_defect)

# Also verify the defect is very small (< 1e-5)
check("defect < 1e-5", defect_after_6 < 1e-5, True)

# ------------------------------------------------------------------
# 9. Angle Palette
# ------------------------------------------------------------------
print("\n=== Angle Palette ===")

expected_angles = [120, 108, 90, 72, 60, 36, 30, 6]
check("angle palette", ANGLES, expected_angles)
check("angle tolerance", ANGLE_TOLERANCE, 0.01)

# ------------------------------------------------------------------
# Summary
# ------------------------------------------------------------------
total = passed + failed
print(f"\n{'=' * 60}")
print(f"  SUMMARY: {passed}/{total} passed", end="")
if failed:
    print(f"  ({failed} FAILED)")
else:
    print("  -- all clear")
print(f"{'=' * 60}")

sys.exit(0 if failed == 0 else 1)
