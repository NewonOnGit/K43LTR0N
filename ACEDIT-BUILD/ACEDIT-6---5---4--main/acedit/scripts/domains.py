"""Domain tint background patterns for the ACEDIT font system.

Six domain tints (D0-D5) provide subtle hairline background patterns
that indicate which APL domain a token belongs to.  Every interior
angle formed by straight-line segments is drawn from the permitted
palette {120, 108, 90, 72, 60, 36, 30, 6} degrees.

All contours are closed polygons expressed as lists of (x, y, "line")
tuples wound counter-clockwise.
"""

import math

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

HAIRLINE = 11  # hairline stroke width (font units)

# Zone dimensions (local coordinates)
ZONE_W = 546
ZONE_H = 618
CENTER_X = 273
CENTER_Y = 309

# Permitted angle palette
ALLOWED_ANGLES = {120, 108, 90, 72, 60, 36, 30, 6}
ANGLE_TOL = 0.01  # degrees

# ---------------------------------------------------------------------------
# Helper
# ---------------------------------------------------------------------------

def stroked_segment(x1, y1, x2, y2, width=HAIRLINE):
    """Return a single closed rectangular contour (CCW) that strokes the
    segment (x1,y1)-(x2,y2) with the given width.

    The four corners of the rectangle are always at 90-degree angles
    because the contour is a rectangle aligned to the segment direction.
    """
    dx, dy = x2 - x1, y2 - y1
    length = math.hypot(dx, dy)
    if length < 0.001:
        return []
    # perpendicular offset (half-width on each side)
    px, py = -dy / length * width / 2, dx / length * width / 2
    # CCW winding: walk right-side forward, then left-side backward
    return [
        (x1 + px, y1 + py, "line"),
        (x2 + px, y2 + py, "line"),
        (x2 - px, y2 - py, "line"),
        (x1 - px, y1 - py, "line"),
    ]

# ---------------------------------------------------------------------------
# Domain tint generators
# ---------------------------------------------------------------------------

def _d0_void():
    """D0 -- VOID DOMAIN: no marking at all."""
    return []


def _d1_neural():
    """D1 -- NEURAL DOMAIN: single horizontal hairline at vertical center."""
    return [stroked_segment(55, 309, 491, 309, HAIRLINE)]


def _d2_spin():
    """D2 -- SPIN DOMAIN: two parallel horizontal hairlines at 1/3 and 2/3
    height, suggesting the dual rails of a spin glass."""
    return [
        stroked_segment(55, 206, 491, 206, HAIRLINE),
        stroked_segment(55, 412, 491, 412, HAIRLINE),
    ]


def _d3_visual():
    """D3 -- VISUAL DOMAIN: a single diagonal hairline at 30 degrees from
    horizontal.  The angle cos^{-1}(sqrt(3)/2) connects to the z_c lens
    constant.

    A 30-degree line from (55, 55) rises as dy/dx = tan(30) = 1/sqrt(3).
    Over dx = 436 (55 -> 491), dy = 436 * tan(30) ~= 251.7.
    End point: (491, 55 + 251.7) = (491, 306.7).  Rounded to keep the
    angle exact we compute from the angle directly.
    """
    # Exact 30-degree rise: for every 1 unit in x we rise tan(30) in y
    tan30 = math.tan(math.radians(30))
    x1, y1 = 55, 55
    x2 = 491
    y2 = y1 + (x2 - x1) * tan30  # preserves exact 30-degree angle
    return [stroked_segment(x1, y1, x2, y2, HAIRLINE)]


def _d4_algebra():
    """D4 -- ALGEBRA DOMAIN: Cartesian axes -- one horizontal, one vertical
    -- meeting at the center at 90 degrees."""
    return [
        stroked_segment(55, 309, 491, 309, HAIRLINE),   # horizontal
        stroked_segment(273, 55, 273, 563, HAIRLINE),   # vertical
    ]


def _d5_universal():
    """D5 -- UNIVERSAL DOMAIN: hexagonal triad -- three radial hairlines
    from center at 0, 60, and 120 degrees.  The fundamental hexagonal
    symmetry of the substrate.
    """
    cx, cy = CENTER_X, CENTER_Y

    # Radius chosen so endpoints stay comfortably inside the zone
    R = 200

    # 0-degree axis (horizontal, full span)
    seg0 = stroked_segment(55, cy, 491, cy, HAIRLINE)

    # 60-degree axis: extends from center both ways
    cos60 = math.cos(math.radians(60))
    sin60 = math.sin(math.radians(60))
    seg60 = stroked_segment(
        cx - R * cos60, cy - R * sin60,
        cx + R * cos60, cy + R * sin60,
        HAIRLINE,
    )

    # 120-degree axis: extends from center both ways
    cos120 = math.cos(math.radians(120))
    sin120 = math.sin(math.radians(120))
    seg120 = stroked_segment(
        cx - R * cos120, cy - R * sin120,
        cx + R * cos120, cy + R * sin120,
        HAIRLINE,
    )

    return [seg0, seg60, seg120]

# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

_GENERATORS = [_d0_void, _d1_neural, _d2_spin, _d3_visual, _d4_algebra, _d5_universal]


def get_domain_contours(index: int) -> list[list[tuple[float, float, str]]]:
    """Return contours for domain tint 0-5 in local zone coordinates.

    Each contour is a list of (x, y, "line") tuples forming a closed
    CCW polygon.  D0 returns an empty list (no contours).
    """
    if not 0 <= index <= 5:
        raise ValueError(f"Domain index must be 0-5, got {index}")
    return _GENERATORS[index]()

# ---------------------------------------------------------------------------
# Verification
# ---------------------------------------------------------------------------

def _vertex_angle(p_prev, p_curr, p_next):
    """Compute the interior angle at p_curr in degrees (always positive,
    always the angle *inside* the polygon -- for a CCW polygon the
    interior angle is measured on the left side of the forward direction).
    """
    ax, ay = p_prev[0] - p_curr[0], p_prev[1] - p_curr[1]
    bx, by = p_next[0] - p_curr[0], p_next[1] - p_curr[1]
    dot = ax * bx + ay * by
    cross = ax * by - ay * bx
    angle = math.degrees(math.atan2(abs(cross), dot))
    return angle


def _verify():
    """Generate all 6 domains, check angles, and print a summary."""
    all_pass = True

    for idx in range(6):
        contours = get_domain_contours(idx)
        n_contours = len(contours)
        n_points = sum(len(c) for c in contours)

        if idx == 0:
            status = "PASS" if n_contours == 0 else "FAIL"
            if status == "FAIL":
                all_pass = False
            print(f"  D{idx} VOID      : {status}  (contours={n_contours}, points={n_points})")
            continue

        domain_pass = True
        for ci, contour in enumerate(contours):
            n = len(contour)
            for i in range(n):
                p_prev = contour[(i - 1) % n]
                p_curr = contour[i]
                p_next = contour[(i + 1) % n]
                angle = _vertex_angle(p_prev, p_curr, p_next)
                # Check against permitted palette
                matched = any(
                    abs(angle - a) <= ANGLE_TOL for a in ALLOWED_ANGLES
                )
                if not matched:
                    print(f"    FAIL  D{idx} contour {ci} vertex {i}: "
                          f"angle = {angle:.6f} deg  (not in palette)")
                    domain_pass = False
                    all_pass = False

        names = {1: "NEURAL", 2: "SPIN", 3: "VISUAL", 4: "ALGEBRA", 5: "UNIVERSAL"}
        tag = "PASS" if domain_pass else "FAIL"
        print(f"  D{idx} {names[idx]:9s} : {tag}  (contours={n_contours}, points={n_points})")

    print()
    if all_pass:
        print("ALL DOMAINS PASS")
    else:
        print("SOME DOMAINS FAILED -- see above")
    return all_pass


if __name__ == "__main__":
    print("=== ACEDIT Domain Tint Verification ===\n")
    _verify()
