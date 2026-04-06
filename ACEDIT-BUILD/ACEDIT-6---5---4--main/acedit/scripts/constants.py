"""ACEDIT constant derivation -- all font metrics from phi."""
import math

PHI = (1 + math.sqrt(5)) / 2
PHI_INV = 1 / PHI
ALPHA = PHI_INV ** 2          # phi^-2 = 0.38196...
BETA = ALPHA ** 2             # phi^-4 = 0.14591...
K_FORM = 0.924                # UCF formation constant
UPM = 1000

METRICS = {
    "unitsPerEm":                UPM,
    "ascender":                  round(UPM * 4 / 5),          # 800
    "descender":                 round(-UPM * 1 / 5),         # -200
    "capHeight":                 round(UPM / PHI),            # 618
    "xHeight":                   round(UPM * ALPHA),          # 382
    "openTypeOS2TypoAscender":   round(UPM * 4 / 5),
    "openTypeOS2TypoDescender":  round(-UPM * 1 / 5),
    "openTypeOS2TypoLineGap":    0,
    "openTypeOS2WinAscent":      UPM,
    "openTypeOS2WinDescent":     round(UPM * 1 / 5),
    "openTypeHheaAscender":      round(UPM * 4 / 5),
    "openTypeHheaDescender":     round(-UPM * 1 / 5),
    "openTypeHheaLineGap":       0,
}

STROKES = {
    "primary":   round(UPM * BETA / 2),           # 73
    "secondary": round(UPM * BETA / 2 * ALPHA),   # 28
    "hairline":  round(UPM * BETA / 2 * BETA),    # 11
}

ADVANCES = {
    "standard": round(UPM / PHI),      # 618
    "narrow":   round(UPM * ALPHA),    # 382
    "wide":     UPM,                   # 1000
}

SIDEBEARINGS = {
    "standard": STROKES["primary"],    # 73
    "tight":    36,                    # deficit angle
    "wide":     round(UPM * BETA),    # 146
}

TENSIONS = {
    "standard": round(ADVANCES["standard"] * K_FORM),    # 571
    "tight":    round(ADVANCES["narrow"] * K_FORM),      # 353
    "loose":    round(ADVANCES["narrow"] * K_FORM / PHI), # 218
}

# Permitted angle palette (degrees)
ANGLES = [120, 108, 90, 72, 60, 36, 30, 6]
ANGLE_TOLERANCE = 0.01  # degrees


if __name__ == "__main__":
    print("=== ACEDIT Font Constants (all derived from phi) ===\n")

    print(f"PHI        = {PHI:.10f}")
    print(f"PHI_INV    = {PHI_INV:.10f}")
    print(f"ALPHA      = {ALPHA:.10f}")
    print(f"BETA       = {BETA:.10f}")
    print(f"K_FORM     = {K_FORM}")
    print(f"UPM        = {UPM}")

    print("\n--- Font Metrics ---")
    for key, val in METRICS.items():
        print(f"  {key:40s} = {val}")

    print("\n--- Stroke Widths ---")
    for key, val in STROKES.items():
        print(f"  {key:12s} = {val}")

    print("\n--- Advance Widths ---")
    for key, val in ADVANCES.items():
        print(f"  {key:12s} = {val}")

    print("\n--- Sidebearings ---")
    for key, val in SIDEBEARINGS.items():
        print(f"  {key:12s} = {val}")

    print("\n--- Tensions ---")
    for key, val in TENSIONS.items():
        print(f"  {key:12s} = {val}")

    print("\n--- Angle Palette ---")
    print(f"  {ANGLES}")
    print(f"  Tolerance: {ANGLE_TOLERANCE} degrees")
