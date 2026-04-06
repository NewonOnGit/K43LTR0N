#!/usr/bin/env python3
"""ACEDIT font glyph component primitives -- machine and spiral indicators.

Twelve indicator designs (M0-M8, S0-S2) that encode computational complexity
and rotational state as visual strip patterns at the edges of glyphs.

Every interior angle formed by straight-line segments belongs to the
permitted palette: {120, 108, 90, 72, 60, 36, 30, 6} degrees (+-0.01 deg).

Machine indicators occupy a 546 x 70 zone (top edge of glyph).
Spiral indicators occupy a 60 x 206 zone (side of glyph).
"""

import math

# ---------------------------------------------------------------------------
# Stroke widths (font units, derived from phi in constants.py)
# ---------------------------------------------------------------------------

PRIMARY = 73
SECONDARY = 28
HAIRLINE = 11

# ---------------------------------------------------------------------------
# Contour helpers
# ---------------------------------------------------------------------------


def stroked_segment(x1, y1, x2, y2, width):
    """Rectangular contour around a line segment.  CCW winding.

    Returns a single closed contour (list of 4 vertices), or an empty list
    if the segment is degenerate.
    """
    dx, dy = x2 - x1, y2 - y1
    length = math.hypot(dx, dy)
    if length < 0.001:
        return []
    px, py = -dy / length * width / 2, dx / length * width / 2
    # CCW winding (positive signed area in y-up coordinates):
    # bottom-left -> bottom-right -> top-right -> top-left
    return [
        (x1 - px, y1 - py, "line"),
        (x2 - px, y2 - py, "line"),
        (x2 + px, y2 + py, "line"),
        (x1 + px, y1 + py, "line"),
    ]


def filled_regular_polygon(cx, cy, radius, n, rotation_deg=0):
    """Filled regular *n*-gon centred at (*cx*, *cy*).  CCW winding."""
    pts = []
    for i in range(n):
        a = math.radians(rotation_deg + 360 * i / n)
        pts.append((
            cx + radius * math.cos(a),
            cy + radius * math.sin(a),
            "line",
        ))
    return pts


def stroked_regular_polygon(cx, cy, radius, n, rotation_deg=0, width=PRIMARY):
    """Stroked *n*-gon: outer CCW contour + inner CW hole.

    Returns a list of two contours ``[outer, inner]``.
    """
    outer, inner = [], []
    r_out = radius + width / 2
    r_in = max(1, radius - width / 2)
    for i in range(n):
        a = math.radians(rotation_deg + 360 * i / n)
        outer.append((
            cx + r_out * math.cos(a),
            cy + r_out * math.sin(a),
            "line",
        ))
        inner.append((
            cx + r_in * math.cos(a),
            cy + r_in * math.sin(a),
            "line",
        ))
    inner.reverse()  # CW for hole
    return [outer, inner]


# ---------------------------------------------------------------------------
# Equilateral-triangle helper (all interior angles = 60 deg)
# ---------------------------------------------------------------------------

def _equilateral_triangle(cx, base_y, base_w):
    """Return CCW contour for an equilateral triangle with base centred at
    *cx* on *base_y*, base width *base_w*, peak pointing upward.

    All three interior angles are exactly 60 degrees.
    """
    half = base_w / 2
    height = half * math.sqrt(3)  # = half * tan(60)
    return [
        (cx - half, base_y, "line"),       # base left
        (cx + half, base_y, "line"),       # base right
        (cx, base_y + height, "line"),     # peak
    ]


# ===================================================================
# Machine indicators  (zone 546 x 70, local coords 0,0 at bottom-left)
# ===================================================================

def _m0_genesis():
    """M0 -- Genesis (The Baseline).

    A single horizontal bar spanning the zone at y=14, secondary stroke.
    """
    return [stroked_segment(28, 14, 518, 14, SECONDARY)]


def _m1_emergence():
    """M1 -- Emergence (Single Tooth).

    Baseline bar plus one equilateral triangle (60 deg angles) rising from
    its centre.
    """
    contours = [stroked_segment(28, 14, 518, 14, SECONDARY)]
    contours.append(_equilateral_triangle(273, 28, 40))
    return contours


def _m2_duality():
    """M2 -- Duality (Twin Peaks).

    Baseline bar plus two equilateral triangles at x=182 and x=364.
    """
    contours = [stroked_segment(28, 14, 518, 14, SECONDARY)]
    contours.append(_equilateral_triangle(182, 28, 40))
    contours.append(_equilateral_triangle(364, 28, 40))
    return contours


def _m3_triad():
    """M3 -- Triad (Three Peaks).

    Baseline bar plus three equilateral triangles at x=137, 273, 409.
    """
    contours = [stroked_segment(28, 14, 518, 14, SECONDARY)]
    for cx in (137, 273, 409):
        contours.append(_equilateral_triangle(cx, 28, 40))
    return contours


def _m4_foundation():
    """M4 -- Foundation (Battlements).

    A crenellation / battlement outline -- one closed polygon with every
    angle at exactly 90 degrees.  Four rectangular teeth (40 x 36) rise
    from a baseline bar (28 tall).
    """
    base_l, base_r = 28, 518
    bar_top = 28
    tooth_w, tooth_h = 40, 36
    n_teeth = 4
    gap = (base_r - base_l - n_teeth * tooth_w) / (n_teeth + 1)  # 66.0

    # Trace CCW starting at bottom-left
    pts = [(base_l, 0, "line"), (base_r, 0, "line"), (base_r, bar_top, "line")]

    for i in range(n_teeth - 1, -1, -1):
        tl = base_l + gap * (i + 1) + tooth_w * i
        tr = tl + tooth_w
        pts.append((tr, bar_top, "line"))
        pts.append((tr, bar_top + tooth_h, "line"))
        pts.append((tl, bar_top + tooth_h, "line"))
        pts.append((tl, bar_top, "line"))

    pts.append((base_l, bar_top, "line"))
    return [pts]


def _m5_pentagon_gate():
    """M5 -- Pentagon Gate.

    Baseline bar plus a stroked regular pentagon (108 deg interior angles)
    with its flat edge sitting on the bar.

    Rotation = -126 deg places the bottom edge horizontal; the apex points
    upward at 90 deg.
    """
    contours = [stroked_segment(28, 14, 518, 14, SECONDARY)]

    # Radius sized so the stroked pentagon fits 0..70 vertically.
    # With SECONDARY stroke: r * (1 + sin(90-deg)) + r + w/2 constrained.
    # Solved: r = 42 / (1 + sin(54 deg)) ≈ 23.22
    r = 42 / (1 + math.sin(math.radians(54)))
    cy = 14 + r * math.sin(math.radians(54))  # bottom of pentagon at y≈14
    cx = 273

    contours.extend(
        stroked_regular_polygon(cx, cy, r, 5, rotation_deg=-126, width=SECONDARY)
    )
    return contours


def _m6_hexagonal_crown():
    """M6 -- Hexagonal Crown.

    Baseline bar plus a stroked regular hexagon (120 deg interior angles)
    centred in the zone.  Rotation = 0 gives flat top and bottom edges.
    """
    contours = [stroked_segment(28, 14, 518, 14, SECONDARY)]

    # Fit hexagon so outer boundary reaches near y=0 and y=70.
    # Centre at (273, 35).  With SECONDARY/2=14 offset:
    # top = 35 + r + 14 ≤ 70  =>  r ≤ 21
    # bottom = 35 - r*sin(60) - 14 ≥ 0  =>  r ≤ (35-14)/sin(60) ≈ 24.2
    r = 21
    cx, cy = 273, 35

    contours.extend(
        stroked_regular_polygon(cx, cy, r, 6, rotation_deg=0, width=SECONDARY)
    )
    return contours


def _m7_bridge():
    """M7 -- Bridge (Quasicrystal Strip).

    A zigzag of 13 stroked segments whose *visual* peaks form exact 108 deg
    angles (pentagonal interior angle).  Each segment contour is a rectangle
    with 90 deg corners.  The segment count and amplitude are chosen so the
    stroked rectangles stay within the 546 x 70 zone.
    """
    n_segs = 13
    x_start, x_end = 28, 518
    dx = (x_end - x_start) / n_segs  # ≈ 37.69

    # Exact dy for 108 deg angle at every zigzag vertex:
    #   cos(108) = (dx^2 - dy^2) / (dx^2 + dy^2)
    cos108 = math.cos(math.radians(108))
    dy = dx * math.sqrt((1 - cos108) / (1 + cos108))  # ≈ 51.88

    # Centre the zigzag vertically; perpendicular stroke offset in y is
    # constant = (SECONDARY/2) / sqrt(1 + K^2) where K = dy/dx.
    y_mid = 35.0
    y_lo = y_mid - dy / 2
    y_hi = y_mid + dy / 2

    # Build zigzag path points
    path = []
    for i in range(n_segs + 1):
        x = x_start + i * dx
        y = y_hi if i % 2 == 0 else y_lo
        path.append((x, y))

    contours = []
    for i in range(n_segs):
        seg = stroked_segment(path[i][0], path[i][1],
                              path[i + 1][0], path[i + 1][1],
                              SECONDARY)
        if seg:
            contours.append(seg)
    return contours


def _m8_crown_of_crowns():
    """M8 -- Crown of Crowns.

    Three nested chevrons at 60 deg from horizontal, decreasing in size.
    Each chevron = two stroked segments meeting at a vertex, creating a
    V-shape.  All contour angles are 90 deg (stroked-segment rectangles).
    """
    # Tip of every chevron at zone centre-bottom
    tip_x, tip_y = 273, 8

    # Arm lengths chosen so stroked rectangles stay within 546 x 70 zone.
    # Perpendicular y-offset = (SECONDARY/2) * cos(60) = 7.  Max y for
    # arm length L = tip_y + L*sin(60) + 7, so L_max ≈ 63.5 at tip_y=8.
    arm_lengths = [60, 40, 20]
    # Each arm goes at 60 deg from horizontal
    angle_rad = math.radians(60)

    contours = []
    for arm_len in arm_lengths:
        dx = arm_len * math.cos(angle_rad)
        dy = arm_len * math.sin(angle_rad)

        # Left arm: tip → upper-left
        seg_l = stroked_segment(tip_x, tip_y,
                                tip_x - dx, tip_y + dy,
                                SECONDARY)
        # Right arm: tip → upper-right
        seg_r = stroked_segment(tip_x, tip_y,
                                tip_x + dx, tip_y + dy,
                                SECONDARY)
        if seg_l:
            contours.append(seg_l)
        if seg_r:
            contours.append(seg_r)
    return contours


# ===================================================================
# Spiral indicators  (zone 60 x 206, local coords 0,0 at bottom-left)
# ===================================================================

def _s0_still():
    """S0 -- Still (Identity).

    A single vertical bar at x=30, full height, secondary stroke.
    """
    return [stroked_segment(30, 14, 30, 192, SECONDARY)]


def _s1_turn():
    """S1 -- Turn (Single Spiral).

    A three-segment zigzag at 60 deg from horizontal.  Each segment is a
    stroked rectangle (90 deg contour angles).  The visual zigzag vertex
    angle is 120 deg.
    """
    # Symmetric zigzag: amplitude dx = 34 (x ranges 13..47 in 60-wide zone)
    # At 60 deg from horizontal: dy = dx * tan(60) = dx * sqrt(3)
    dx = 34
    dy = dx * math.sqrt(3)  # ≈ 58.88

    y0 = 14.0
    # 3 segments, 4 path points alternating x = 13, 47
    path = [
        (13, y0),
        (47, y0 + dy),
        (13, y0 + 2 * dy),
        (47, y0 + 3 * dy),
    ]

    contours = []
    for i in range(3):
        seg = stroked_segment(path[i][0], path[i][1],
                              path[i + 1][0], path[i + 1][1],
                              SECONDARY)
        if seg:
            contours.append(seg)
    return contours


def _s2_vortex():
    """S2 -- Vortex (Double Spiral).

    Two interleaved zigzag paths (a double-helix visual) at 60 deg from
    horizontal.  Each path uses hairline stroke so both fit in the narrow
    zone.  All contour angles are 90 deg (stroked rectangles).
    """
    dx = 34
    dy = dx * math.sqrt(3)
    y0 = 14.0

    # Path A: starts lower-left, goes right-up
    path_a = [
        (13, y0),
        (47, y0 + dy),
        (13, y0 + 2 * dy),
        (47, y0 + 3 * dy),
    ]
    # Path B: starts lower-right, goes left-up (mirror of A)
    path_b = [
        (47, y0),
        (13, y0 + dy),
        (47, y0 + 2 * dy),
        (13, y0 + 3 * dy),
    ]

    contours = []
    for path in (path_a, path_b):
        for i in range(3):
            seg = stroked_segment(path[i][0], path[i][1],
                                  path[i + 1][0], path[i + 1][1],
                                  HAIRLINE)
            if seg:
                contours.append(seg)
    return contours


# ===================================================================
# Public API
# ===================================================================

_MACHINE_BUILDERS = [
    _m0_genesis,
    _m1_emergence,
    _m2_duality,
    _m3_triad,
    _m4_foundation,
    _m5_pentagon_gate,
    _m6_hexagonal_crown,
    _m7_bridge,
    _m8_crown_of_crowns,
]

_SPIRAL_BUILDERS = [
    _s0_still,
    _s1_turn,
    _s2_vortex,
]


def get_machine_contours(index: int) -> list[list[tuple[float, float, str]]]:
    """Return contours for machine indicator *index* (0-8) in local zone
    coordinates (546 x 70 zone)."""
    if not 0 <= index < len(_MACHINE_BUILDERS):
        raise ValueError(f"machine indicator index must be 0-8, got {index}")
    return _MACHINE_BUILDERS[index]()


def get_spiral_contours(index: int) -> list[list[tuple[float, float, str]]]:
    """Return contours for spiral indicator *index* (0-2) in local zone
    coordinates (60 x 206 zone)."""
    if not 0 <= index < len(_SPIRAL_BUILDERS):
        raise ValueError(f"spiral indicator index must be 0-2, got {index}")
    return _SPIRAL_BUILDERS[index]()


# ===================================================================
# Self-test
# ===================================================================

if __name__ == "__main__":
    PALETTE = {120, 108, 90, 72, 60, 36, 30, 6}
    TOL = 0.01  # degrees

    def _angle_at(pts, idx):
        """Interior angle at vertex *idx* in a closed polygon."""
        n = len(pts)
        ax, ay, _ = pts[(idx - 1) % n]
        bx, by, _ = pts[idx]
        cx, cy, _ = pts[(idx + 1) % n]
        bax, bay = ax - bx, ay - by
        bcx, bcy = cx - bx, cy - by
        dot = bax * bcx + bay * bcy
        m1 = math.hypot(bax, bay)
        m2 = math.hypot(bcx, bcy)
        if m1 < 1e-9 or m2 < 1e-9:
            return None
        cos_a = max(-1.0, min(1.0, dot / (m1 * m2)))
        return math.degrees(math.acos(cos_a))

    def _nearest(angle):
        best = min(PALETTE, key=lambda a: abs(a - angle))
        return best, abs(best - angle)

    total_contours = 0
    total_points = 0
    all_pass = True

    names = (
        [(f"M{i}", get_machine_contours, i) for i in range(9)]
        + [(f"S{i}", get_spiral_contours, i) for i in range(3)]
    )

    for label, getter, idx in names:
        contours = getter(idx)
        n_contours = len(contours)
        n_points = sum(len(c) for c in contours)
        total_contours += n_contours
        total_points += n_points

        violations = []
        for ci, contour in enumerate(contours):
            if len(contour) < 3:
                continue
            for vi in range(len(contour)):
                angle = _angle_at(contour, vi)
                if angle is None:
                    continue
                nearest, dev = _nearest(angle)
                if dev > TOL:
                    violations.append(
                        f"  contour {ci} vertex {vi}: "
                        f"{angle:.6f} deg (nearest {nearest}, dev {dev:.6f})"
                    )

        status = "PASS" if not violations else "FAIL"
        if violations:
            all_pass = False
        print(f"{label:4s}  {status}  contours={n_contours:2d}  points={n_points:3d}")
        for v in violations:
            print(v)

    print(f"\nTotal contours: {total_contours}")
    print(f"Total points:   {total_points}")
    print(f"\nOverall: {'ALL PASS' if all_pass else 'SOME FAILURES'}")
