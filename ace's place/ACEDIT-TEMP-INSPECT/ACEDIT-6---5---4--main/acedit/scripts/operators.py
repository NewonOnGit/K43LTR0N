#!/usr/bin/env python3
"""ACEDIT operator symbol glyphs -- the 6 fundamental APL operations.

Each operator is a collection of closed-polygon contours expressed as
lists of (x, y, "line") tuples in local zone coordinates (0,0 to 309,412).

Every interior angle formed by consecutive straight-line segments belongs
to the permitted palette: {120, 108, 90, 72, 60, 36, 30, 6} degrees.

Stroke widths derived from phi (see constants.py):
    PRIMARY   = 73   (main structural strokes)
    SECONDARY = 28   (lighter accents)
    HAIRLINE  = 11   (whisper-weight marks)
"""

import math
import os
import sys

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

PRIMARY = 73
SECONDARY = 28
HAIRLINE = 11

ZONE_W = 309
ZONE_H = 412
CX = 154.5          # horizontal center
CY = 206.0          # vertical center

ANGLE_PALETTE = {120, 108, 90, 72, 60, 36, 30, 6}
ANGLE_TOLERANCE = 0.01  # degrees


# ---------------------------------------------------------------------------
# Geometry helpers
# ---------------------------------------------------------------------------

def stroked_segment(x1, y1, x2, y2, width):
    """Return a rectangular contour (CCW) that strokes the segment (x1,y1)-(x2,y2).

    The rectangle has four 90-degree corners.  All angles in palette.
    """
    dx, dy = x2 - x1, y2 - y1
    length = math.hypot(dx, dy)
    if length < 0.001:
        return []
    px, py = -dy / length * width / 2, dx / length * width / 2
    # CCW winding when viewed with y-up
    return [
        (x1 + px, y1 + py, "line"),
        (x2 + px, y2 + py, "line"),
        (x2 - px, y2 - py, "line"),
        (x1 - px, y1 - py, "line"),
    ]


def filled_regular_polygon(cx, cy, radius, n, rotation_deg=0):
    """Return a single CCW contour for a filled regular n-gon."""
    pts = []
    for i in range(n):
        a = math.radians(rotation_deg + 360.0 * i / n)
        pts.append((cx + radius * math.cos(a),
                     cy + radius * math.sin(a), "line"))
    return pts


def stroked_regular_polygon(cx, cy, radius, n, rotation_deg=0, width=PRIMARY):
    """Return [outer_ccw, inner_cw] contours for a stroked regular n-gon.

    Interior angles of regular n-gon = (n-2)*180/n.
    For n=6 -> 120 deg, n=5 -> 108 deg, n=3 -> 60 deg.  All in palette.
    """
    outer, inner = [], []
    r_out = radius + width / 2.0
    r_in = max(1.0, radius - width / 2.0)
    for i in range(n):
        a = math.radians(rotation_deg + 360.0 * i / n)
        outer.append((cx + r_out * math.cos(a),
                       cy + r_out * math.sin(a), "line"))
        inner.append((cx + r_in * math.cos(a),
                       cy + r_in * math.sin(a), "line"))
    inner.reverse()  # CW for hole
    return [outer, inner]


# ---------------------------------------------------------------------------
# O0 -- GROUP (Hexagonal Enclosure)
# ---------------------------------------------------------------------------

def _make_group():
    """Stroked regular hexagon with a small filled equilateral-triangle kernel.

    Hexagon interior angles: 120 deg.
    Triangle interior angles: 60 deg.
    Stroked-segment corners: 90 deg.
    All in palette.
    """
    contours = []

    # -- Stroked hexagon, flat-bottom orientation (rotation = 30 deg) --
    hex_contours = stroked_regular_polygon(CX, CY, radius=120, n=6,
                                           rotation_deg=30, width=PRIMARY)
    contours.extend(hex_contours)

    # -- Kernel: small filled equilateral triangle at dead center --
    #    Rotation = 90 so one vertex points straight up.
    kernel = filled_regular_polygon(CX, CY, radius=20, n=3, rotation_deg=90)
    contours.append(kernel)

    return contours


# ---------------------------------------------------------------------------
# O1 -- MULTIPLY (Hexagram / Star of David)
# ---------------------------------------------------------------------------

def _make_multiply():
    """Two stroked equilateral triangles forming a hexagram.

    Upward triangle   (rotation 90 deg): vertices at 90, 210, 330 deg.
    Downward triangle (rotation -90 deg): vertices at 270, 30, 150 deg.

    Each triangle contour (outer and inner) has interior angles of 60 deg.
    All in palette.
    """
    contours = []

    # Upward-pointing triangle
    up = stroked_regular_polygon(CX, CY, radius=110, n=3,
                                 rotation_deg=90, width=PRIMARY)
    contours.extend(up)

    # Downward-pointing triangle
    down = stroked_regular_polygon(CX, CY, radius=110, n=3,
                                   rotation_deg=-90, width=PRIMARY)
    contours.extend(down)

    return contours


# ---------------------------------------------------------------------------
# O2 -- POWER (Ascending Chevrons)
# ---------------------------------------------------------------------------

def _make_power():
    """Three nested V-chevrons ascending vertically.

    Each chevron is two stroked segments meeting at a 60-degree vertex.
    Each stroked segment is a rectangle with 90-degree corners.
    All angles in palette.

    The chevrons open upward (vertex at bottom, arms rising).
    Vertex angle = 60 deg; each arm makes 30 deg with the vertical bisector.
    """
    contours = []

    # Chevron specs: (vertex_y, top_y)
    # dy determines arm length and half-width via tan(30 deg)
    specs = [
        (100, 220),   # large  (bottom) -- dy=120
        (180, 280),   # medium (middle) -- dy=100
        (250, 330),   # small  (top)    -- dy=80
    ]

    tan30 = math.tan(math.radians(30))

    for vy, top_y in specs:
        dy = top_y - vy
        half_w = dy * tan30   # horizontal spread of each arm tip

        # Left arm: from vertex to upper-left
        left = stroked_segment(CX, vy, CX - half_w, top_y, SECONDARY)
        if left:
            contours.append(left)

        # Right arm: from vertex to upper-right
        right = stroked_segment(CX, vy, CX + half_w, top_y, SECONDARY)
        if right:
            contours.append(right)

    return contours


# ---------------------------------------------------------------------------
# O3 -- DIVIDE (Separation Bar with Hexagonal Markers)
# ---------------------------------------------------------------------------

def _make_divide():
    """Horizontal bar flanked by two small filled hexagons (above and below).

    Bar contour: rectangle with 90-degree corners.
    Hexagons: interior angles 120 deg.
    All in palette.
    """
    contours = []

    # -- Central horizontal bar --
    bar = stroked_segment(30, CY, 279, CY, PRIMARY)
    contours.append(bar)

    # -- Upper hexagonal marker (flat-bottom, rotation 30 deg) --
    upper_hex = filled_regular_polygon(CX, 310, radius=25, n=6,
                                       rotation_deg=30)
    contours.append(upper_hex)

    # -- Lower hexagonal marker --
    lower_hex = filled_regular_polygon(CX, 102, radius=25, n=6,
                                       rotation_deg=30)
    contours.append(lower_hex)

    return contours


# ---------------------------------------------------------------------------
# O4 -- ADD (Greek Cross)
# ---------------------------------------------------------------------------

def _make_add():
    """12-vertex Greek cross (plus sign).  All interior angles = 90 deg.

    Arm width matches PRIMARY stroke (73 units).
    Arm length = 150 units from center in each cardinal direction.
    The cross is a single closed CCW contour with 12 vertices.
    Six convex corners (90 deg measured interior) and six reflex corners
    whose measured angle via dot-product is also 90 deg.  All in palette.
    """
    hw = PRIMARY / 2.0       # half arm width = 36.5
    arm = 150.0              # arm extent from center

    # 12 vertices, CCW winding (y-up), starting at top-right of top arm
    # and proceeding counterclockwise (leftward along top edge first).
    pts = [
        (CX - hw, CY + arm),    # v0  top-left of top arm
        (CX - hw, CY + hw),     # v1  inner top-left
        (CX - arm, CY + hw),    # v2  left-top of left arm
        (CX - arm, CY - hw),    # v3  left-bottom of left arm
        (CX - hw, CY - hw),     # v4  inner bottom-left
        (CX - hw, CY - arm),    # v5  bottom-left of bottom arm
        (CX + hw, CY - arm),    # v6  bottom-right of bottom arm
        (CX + hw, CY - hw),     # v7  inner bottom-right
        (CX + arm, CY - hw),    # v8  right-bottom of right arm
        (CX + arm, CY + hw),    # v9  right-top of right arm
        (CX + hw, CY + hw),     # v10 inner top-right
        (CX + hw, CY + arm),    # v11 top-right of top arm
    ]

    contour = [(x, y, "line") for x, y in pts]
    return [contour]


# ---------------------------------------------------------------------------
# O5 -- NULL (Broken Pentagon)
# ---------------------------------------------------------------------------

def _make_null():
    """Pentagon outline with the top edge removed -- the deficit made visible.

    Four of five edges drawn as stroked segments (rectangles, 90-deg corners).
    The missing fifth edge spans 36 deg of arc -- the angular deficit that
    prevents pentagonal tiling.

    Two short HAIRLINE whiskers extend from the gap endpoints at the angle
    that would complete the pentagon (forming 108 deg with the adjacent edge),
    hinting at the absent connection.

    Pentagon interior angles: 108 deg (not directly in contours, but encoded
    in whisker angles relative to edges).
    All contour angles: 90 deg (rectangles).  In palette.
    """
    contours = []

    # Pentagon vertices: rotation = 90 deg places v0 at the top (12 o'clock)
    radius = 120
    verts = []
    for i in range(5):
        a = math.radians(90 + 360.0 * i / 5)
        verts.append((CX + radius * math.cos(a),
                      CY + radius * math.sin(a)))

    # Draw edges: v0->v1, v1->v2, v2->v3, v3->v4   (skip v4->v0)
    for i in range(4):
        x1, y1 = verts[i]
        x2, y2 = verts[i + 1]
        seg = stroked_segment(x1, y1, x2, y2, PRIMARY)
        if seg:
            contours.append(seg)

    # Whiskers: short hairline stubs from v0 toward v4 and from v4 toward v0
    # These lie along the direction of the missing edge, creating 108-deg
    # angles with their respective adjacent edges.
    whisker_len = 20
    v0x, v0y = verts[0]
    v4x, v4y = verts[4]
    gap_dx = v4x - v0x
    gap_dy = v4y - v0y
    gap_len = math.hypot(gap_dx, gap_dy)
    ux, uy = gap_dx / gap_len, gap_dy / gap_len   # unit vector v0 -> v4

    # Whisker from v0 toward v4
    w0 = stroked_segment(v0x, v0y,
                         v0x + ux * whisker_len,
                         v0y + uy * whisker_len,
                         HAIRLINE)
    if w0:
        contours.append(w0)

    # Whisker from v4 toward v0
    w4 = stroked_segment(v4x, v4y,
                         v4x - ux * whisker_len,
                         v4y - uy * whisker_len,
                         HAIRLINE)
    if w4:
        contours.append(w4)

    return contours


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

_BUILDERS = [
    _make_group,      # O0
    _make_multiply,   # O1
    _make_power,      # O2
    _make_divide,     # O3
    _make_add,        # O4
    _make_null,       # O5
]

_NAMES = [
    "GROUP    (Hexagonal Enclosure)",
    "MULTIPLY (Hexagram / Star of David)",
    "POWER    (Ascending Chevrons)",
    "DIVIDE   (Separation Bar + Hex Markers)",
    "ADD      (Greek Cross)",
    "NULL     (Broken Pentagon)",
]


def get_operator_contours(index: int) -> list[list[tuple[float, float, str]]]:
    """Return contours for operator symbol 0-5 in local zone coordinates.

    Each contour is a list of (x, y, "line") tuples forming a closed polygon.
    Outer contours wind CCW; holes wind CW.
    """
    if not 0 <= index <= 5:
        raise ValueError(f"Operator index must be 0-5, got {index}")
    return _BUILDERS[index]()


# ---------------------------------------------------------------------------
# Verification
# ---------------------------------------------------------------------------

def _angle_at(pts, idx):
    """Measure interior angle at vertex *idx* of a closed polygon.

    Returns degrees in [0, 180] via dot-product formula.
    """
    n = len(pts)
    ax, ay = pts[(idx - 1) % n][:2]
    bx, by = pts[idx][:2]
    cx, cy = pts[(idx + 1) % n][:2]

    bax, bay = ax - bx, ay - by
    bcx, bcy = cx - bx, cy - by

    mag_ba = math.hypot(bax, bay)
    mag_bc = math.hypot(bcx, bcy)
    if mag_ba < 1e-9 or mag_bc < 1e-9:
        return 0.0

    cos_a = (bax * bcx + bay * bcy) / (mag_ba * mag_bc)
    cos_a = max(-1.0, min(1.0, cos_a))
    return math.degrees(math.acos(cos_a))


def _nearest_permitted(angle):
    """Return (nearest_palette_angle, deviation)."""
    best = min(ANGLE_PALETTE, key=lambda a: abs(angle - a))
    return best, abs(angle - best)


def _validate_contour(contour):
    """Return list of (vertex_index, measured_angle, nearest, deviation) for violations."""
    violations = []
    n = len(contour)
    if n < 3:
        return violations
    for i in range(n):
        measured = _angle_at(contour, i)
        nearest, dev = _nearest_permitted(measured)
        if dev > ANGLE_TOLERANCE:
            violations.append((i, measured, nearest, dev))
    return violations


# ---------------------------------------------------------------------------
# Main -- exhaustive angle validation
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    total_contours = 0
    total_points = 0
    all_pass = True

    print("=" * 72)
    print("ACEDIT Operator Symbol Angle Validation")
    print("=" * 72)
    print(f"Permitted angles: {sorted(ANGLE_PALETTE, reverse=True)}")
    print(f"Tolerance: {ANGLE_TOLERANCE} deg")
    print()

    for idx in range(6):
        contours = get_operator_contours(idx)
        nc = len(contours)
        np_ = sum(len(c) for c in contours)
        total_contours += nc
        total_points += np_

        print(f"--- O{idx}: {_NAMES[idx]} ---")
        print(f"    Contours: {nc}   Points: {np_}")

        op_pass = True
        angle_summary = {}  # angle -> count

        for ci, contour in enumerate(contours):
            for i in range(len(contour)):
                measured = _angle_at(contour, i)
                nearest, dev = _nearest_permitted(measured)
                bucket = nearest if dev <= ANGLE_TOLERANCE else measured
                angle_summary[nearest] = angle_summary.get(nearest, 0) + 1

            violations = _validate_contour(contour)
            if violations:
                op_pass = False
                all_pass = False
                for vi, meas, near, dev in violations:
                    x, y = contour[vi][:2]
                    print(f"    FAIL  contour {ci} vertex {vi} "
                          f"at ({x:.2f}, {y:.2f}): "
                          f"measured={meas:.6f} deg  "
                          f"nearest={near} deg  "
                          f"deviation={dev:.6f} deg")

        # Print angle distribution
        dist_str = ", ".join(f"{a}deg x{c}" for a, c in
                             sorted(angle_summary.items(), reverse=True))
        print(f"    Angles: {dist_str}")

        # Validate expected angle types per operator
        expected = {
            0: {120, 60},           # hex outer/inner(120) + triangle kernel(60)
            1: {60},                # equilateral triangle outer/inner(60)
            2: {90},                # stroked segments -> rectangles(90)
            3: {90, 120},           # bar(90) + hexagons(120)
            4: {90},                # cross(90)
            5: {90},                # stroked segments -> rectangles(90)
        }
        found = set(angle_summary.keys())
        exp = expected[idx]
        if not exp.issubset(found):
            missing = exp - found
            print(f"    NOTE   Expected angle(s) {missing} not found")

        status = "PASS" if op_pass else "FAIL"
        print(f"    Result: {status}")
        print()

    print("=" * 72)
    print(f"Total contours: {total_contours}   Total points: {total_points}")
    overall = "ALL PASS" if all_pass else "FAILURES DETECTED"
    print(f"Overall: {overall}")
    print("=" * 72)
