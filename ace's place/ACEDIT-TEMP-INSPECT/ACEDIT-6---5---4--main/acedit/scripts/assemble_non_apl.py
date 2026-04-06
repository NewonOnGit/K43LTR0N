#!/usr/bin/env python3
"""Generate 122 non-APL PUA glyphs for the ACEDIT font.

Seven blocks:
    UCF_SIGIL   (39)  hexagonal  -- hexagon + perimeter tick marks
    CHRONICLE   (28)  hexagonal  -- hexagon + interior horizontal hairlines
    GOVERNANCE  (13)  cubic      -- square frame + bottom-edge index dots
    GEOMETRY    (19)  pentagonal -- pentagon + rotated inner pentagon
    SPECTRAL    (12)  pentagonal -- pentagon + radial hairlines from center
    FUNNEL       (7)  cubic      -- narrowing trapezoid per pipeline stage
    LATTICE      (4)  cubic      -- cross/grid with 1-4 axes
"""

import math
import os
import sys
import xml.etree.ElementTree as ET
import plistlib

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
GLYPHS_DIR = os.path.join(PROJECT_DIR, "sources", "ACEDIT-Regular.ufo", "glyphs")
PLIST_PATH = os.path.join(GLYPHS_DIR, "contents.plist")

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

PRIMARY = 73
SECONDARY = 28
HAIRLINE = 11

GLYPH_W = 618
GLYPH_H = 618
CX = 309.0
CY = 309.0

BASE_RADIUS = 150.0  # radius for main polygons


# ---------------------------------------------------------------------------
# Geometry helpers (mirrors operators.py)
# ---------------------------------------------------------------------------

def stroked_segment(x1, y1, x2, y2, width):
    """Rectangular contour (CCW) stroking the segment (x1,y1)-(x2,y2).

    Four 90-degree corners.
    """
    dx, dy = x2 - x1, y2 - y1
    length = math.hypot(dx, dy)
    if length < 0.001:
        return []
    px, py = -dy / length * width / 2, dx / length * width / 2
    return [
        (x1 + px, y1 + py),
        (x2 + px, y2 + py),
        (x2 - px, y2 - py),
        (x1 - px, y1 - py),
    ]


def filled_regular_polygon(cx, cy, radius, n, rotation_deg=0):
    """Single CCW contour for a filled regular n-gon."""
    pts = []
    for i in range(n):
        a = math.radians(rotation_deg + 360.0 * i / n)
        pts.append((cx + radius * math.cos(a),
                     cy + radius * math.sin(a)))
    return pts


def stroked_regular_polygon(cx, cy, radius, n, rotation_deg=0, width=SECONDARY):
    """Return [outer_ccw, inner_cw] contours for a stroked regular n-gon."""
    outer, inner = [], []
    r_out = radius + width / 2.0
    r_in = max(1.0, radius - width / 2.0)
    for i in range(n):
        a = math.radians(rotation_deg + 360.0 * i / n)
        outer.append((cx + r_out * math.cos(a),
                       cy + r_out * math.sin(a)))
        inner.append((cx + r_in * math.cos(a),
                       cy + r_in * math.sin(a)))
    inner.reverse()  # CW for hole
    return [outer, inner]


def polygon_vertex(cx, cy, radius, n, index, rotation_deg=0):
    """Return (x, y) for vertex `index` of a regular n-gon."""
    a = math.radians(rotation_deg + 360.0 * index / n)
    return cx + radius * math.cos(a), cy + radius * math.sin(a)


def lerp_point(p1, p2, t):
    """Linear interpolation between two (x, y) points."""
    return (p1[0] + (p2[0] - p1[0]) * t,
            p1[1] + (p2[1] - p1[1]) * t)


# ---------------------------------------------------------------------------
# Block definitions
# ---------------------------------------------------------------------------

BLOCKS = [
    {
        "name": "UCF_SIGIL",
        "prefix": "ucf",
        "start": 0xE3CC,
        "count": 39,
    },
    {
        "name": "CHRONICLE",
        "prefix": "chron",
        "start": 0xE3F3,
        "count": 28,
    },
    {
        "name": "GOVERNANCE",
        "prefix": "gov",
        "start": 0xE40F,
        "count": 13,
    },
    {
        "name": "GEOMETRY",
        "prefix": "geo",
        "start": 0xE41C,
        "count": 19,
    },
    {
        "name": "SPECTRAL",
        "prefix": "spec",
        "start": 0xE42F,
        "count": 12,
    },
    {
        "name": "FUNNEL",
        "prefix": "funnel",
        "start": 0xE43B,
        "count": 7,
        "letters": list("SRKCPFA"),
    },
    {
        "name": "LATTICE",
        "prefix": "lat",
        "start": 0xE442,
        "count": 4,
        "letters": list("RDCA"),
    },
]

# Funnel and Lattice use letter suffixes; others use 3-digit numeric.


def glyph_name_for(block, index):
    """Return canonical glyph name like acedit.ucf.000 or acedit.funnel.S."""
    prefix = block["prefix"]
    if "letters" in block:
        return f"acedit.{prefix}.{block['letters'][index]}"
    return f"acedit.{prefix}.{index:03d}"


def filename_for(block, index):
    """Return .glif filename like acedit_ucf_000.glif or acedit_funnel_S_.glif."""
    name = glyph_name_for(block, index)
    return name.replace(".", "_") + ".glif"


# ---------------------------------------------------------------------------
# UCF_SIGIL generator: hexagon + perimeter tick marks
# ---------------------------------------------------------------------------

def gen_ucf_sigil(index):
    """Hexagon base with 0..38 tick marks around perimeter (clock positions)."""
    contours = []

    # Base hexagon (flat-bottom, rotation=30)
    hex_contours = stroked_regular_polygon(CX, CY, BASE_RADIUS, 6,
                                           rotation_deg=30, width=SECONDARY)
    contours.extend(hex_contours)

    # Tick marks: short radial segments outside the hexagon
    # Distribute `index` ticks evenly around the hexagon perimeter.
    # Each tick is a stroked segment from just outside the hex to further out.
    r_inner = BASE_RADIUS + SECONDARY / 2.0 + 2  # just outside outer edge
    tick_len = 18
    r_outer = r_inner + tick_len

    if index > 0:
        for t in range(index):
            # Angle for this tick: distribute evenly, start from top (90 deg)
            angle_deg = 90.0 + t * (360.0 / max(index, 1))
            # Snap angle to nearest 6 degrees (from palette)
            angle_deg = round(angle_deg / 6.0) * 6.0
            a = math.radians(angle_deg)
            x1 = CX + r_inner * math.cos(a)
            y1 = CY + r_inner * math.sin(a)
            x2 = CX + r_outer * math.cos(a)
            y2 = CY + r_outer * math.sin(a)
            seg = stroked_segment(x1, y1, x2, y2, HAIRLINE)
            if seg:
                contours.append(seg)

    return contours


# ---------------------------------------------------------------------------
# CHRONICLE generator: hexagon + interior horizontal hairlines
# ---------------------------------------------------------------------------

def gen_chronicle(index):
    """Hexagon base with 0..27 horizontal hairlines inside (like lined paper)."""
    contours = []

    # Base hexagon (flat-bottom, rotation=30)
    hex_contours = stroked_regular_polygon(CX, CY, BASE_RADIUS, 6,
                                           rotation_deg=30, width=SECONDARY)
    contours.extend(hex_contours)

    # Interior hairlines: horizontal lines spaced evenly in vertical extent
    # The hexagon (flat-bottom) has vertical extent from CY-R to CY+R.
    # We use inner radius to stay inside the stroke.
    r_in = BASE_RADIUS - SECONDARY / 2.0

    if index > 0:
        # Space lines evenly across the interior vertical extent
        margin = 8  # padding from top/bottom
        y_top = CY + r_in - margin
        y_bot = CY - r_in + margin
        total_height = y_top - y_bot

        for i in range(index):
            t = (i + 0.5) / index  # center each line in its slot
            y = y_bot + t * total_height

            # Find horizontal extent at this y level within the hexagon.
            # For flat-bottom hex (rotation=30), the hex width varies with y.
            # At the equator (CY), width = 2*R*cos(30) = R*sqrt(3).
            # Simplification: use fraction of height to determine width.
            dy = abs(y - CY)
            frac = dy / r_in  # 0 at center, 1 at top/bottom
            if frac > 1.0:
                continue
            # Hexagon horizontal half-width at height dy:
            # For flat-bottom hex, it's piecewise linear.
            # Top/bottom vertices at y = CY +/- R
            # Side vertices at y = CY +/- R/2, x = CX +/- R*sqrt(3)/2
            half_h = r_in  # half the total height
            cos30 = math.cos(math.radians(30))
            if dy <= half_h / 2:
                # In the wide middle band
                half_w = r_in * cos30
            else:
                # In the narrowing top or bottom triangle
                half_w = r_in * cos30 * (1.0 - (dy - half_h / 2) / (half_h / 2))
                half_w = max(half_w, 5)

            x1 = CX - half_w + 6
            x2 = CX + half_w - 6
            seg = stroked_segment(x1, y, x2, y, HAIRLINE)
            if seg:
                contours.append(seg)

    return contours


# ---------------------------------------------------------------------------
# GOVERNANCE generator: square frame + bottom-edge index dots
# ---------------------------------------------------------------------------

def gen_governance(index):
    """Square frame with index-count small filled squares along bottom edge."""
    contours = []

    # Square frame (stroked square = stroked 4-gon, rotation=45 for diamond
    # but we want axis-aligned, so rotation=45 gives vertices at 45,135,225,315
    # which is a diamond. For axis-aligned: compute manually.
    half = BASE_RADIUS * math.cos(math.radians(45))  # ~106

    # Outer rectangle
    outer = [
        (CX - half - SECONDARY / 2, CY - half - SECONDARY / 2),
        (CX + half + SECONDARY / 2, CY - half - SECONDARY / 2),
        (CX + half + SECONDARY / 2, CY + half + SECONDARY / 2),
        (CX - half - SECONDARY / 2, CY + half + SECONDARY / 2),
    ]
    # Inner rectangle (hole, CW)
    inner = [
        (CX - half + SECONDARY / 2, CY + half - SECONDARY / 2),
        (CX + half - SECONDARY / 2, CY + half - SECONDARY / 2),
        (CX + half - SECONDARY / 2, CY - half + SECONDARY / 2),
        (CX - half + SECONDARY / 2, CY - half + SECONDARY / 2),
    ]
    contours.append(outer)
    contours.append(inner)

    # Index dots: small filled squares along the bottom edge
    if index > 0:
        dot_size = 8  # half-size of each small square
        y_base = CY - half - SECONDARY / 2 - 4 - dot_size  # below the frame
        x_start = CX - half
        x_end = CX + half
        span = x_end - x_start

        for i in range(index):
            t = (i + 0.5) / max(index, 1)
            x = x_start + t * span
            dot = [
                (x - dot_size, y_base - dot_size),
                (x + dot_size, y_base - dot_size),
                (x + dot_size, y_base + dot_size),
                (x - dot_size, y_base + dot_size),
            ]
            contours.append(dot)

    return contours


# ---------------------------------------------------------------------------
# GEOMETRY generator: pentagon + rotated inner pentagon
# ---------------------------------------------------------------------------

def gen_geometry(index):
    """Pentagon base with a smaller inner pentagon rotated by index-dependent angle."""
    contours = []

    # Base pentagon (point-up, rotation=90)
    pent_contours = stroked_regular_polygon(CX, CY, BASE_RADIUS, 5,
                                            rotation_deg=90, width=SECONDARY)
    contours.extend(pent_contours)

    # Inner pentagon: rotated by index * 6 degrees (6 is in the angle palette)
    # This gives rotations of 0, 6, 12, 18, ... 108 degrees for indices 0-18
    inner_radius = BASE_RADIUS * 0.45
    rotation = 90 + index * 6  # base rotation + index offset
    inner_pent = filled_regular_polygon(CX, CY, inner_radius, 5,
                                        rotation_deg=rotation)
    contours.append(inner_pent)

    return contours


# ---------------------------------------------------------------------------
# SPECTRAL generator: pentagon + radial hairlines from center
# ---------------------------------------------------------------------------

def gen_spectral(index):
    """Pentagon base with index-count radial hairlines from center."""
    contours = []

    # Base pentagon (point-up, rotation=90)
    pent_contours = stroked_regular_polygon(CX, CY, BASE_RADIUS, 5,
                                            rotation_deg=90, width=SECONDARY)
    contours.extend(pent_contours)

    # Radial hairlines from center outward
    r_line = BASE_RADIUS - SECONDARY / 2.0 - 4  # stop just inside the stroke

    if index > 0:
        for i in range(index):
            # Distribute radials evenly, starting from top (90 deg)
            angle_deg = 90.0 + i * (360.0 / max(index, 1))
            # Snap to nearest 6 degrees
            angle_deg = round(angle_deg / 6.0) * 6.0
            a = math.radians(angle_deg)
            x1 = CX
            y1 = CY
            x2 = CX + r_line * math.cos(a)
            y2 = CY + r_line * math.sin(a)
            seg = stroked_segment(x1, y1, x2, y2, HAIRLINE)
            if seg:
                contours.append(seg)

    return contours


# ---------------------------------------------------------------------------
# FUNNEL generator: narrowing trapezoid per pipeline stage
# ---------------------------------------------------------------------------

def gen_funnel(index):
    """Downward-narrowing trapezoid. Wider at top, narrower per index.

    7 stages (S=0, R=1, K=2, C=3, P=4, F=5, A=6).
    Stage 0 is nearly rectangular; stage 6 is a narrow-bottomed funnel.
    """
    contours = []

    # Top width stays constant, bottom width narrows with index
    top_half = 120.0  # half-width at top
    # Bottom narrows from ~120 (index 0) to ~20 (index 6)
    bottom_half = top_half - index * (100.0 / 6.0)
    bottom_half = max(bottom_half, 20.0)

    y_top = CY + 130.0
    y_bot = CY - 130.0

    # Trapezoid outline as stroked polygon (outer + inner)
    # Outer contour CCW
    # The trapezoid has two parallel horizontal edges (90-deg corners at top)
    # and two angled sides. The side angles depend on the narrowing.
    #
    # We'll stroke it as 4 segments.
    pts_outer = [
        (CX - top_half, y_top),
        (CX + top_half, y_top),
        (CX + bottom_half, y_bot),
        (CX - bottom_half, y_bot),
    ]

    # Create stroked outline using 4 segments
    for i in range(4):
        x1, y1 = pts_outer[i]
        x2, y2 = pts_outer[(i + 1) % 4]
        seg = stroked_segment(x1, y1, x2, y2, SECONDARY)
        if seg:
            contours.append(seg)

    return contours


# ---------------------------------------------------------------------------
# LATTICE generator: cross/grid with 1-4 axes
# ---------------------------------------------------------------------------

def gen_lattice(index):
    """Grid/cross pattern with 1-4 axes.

    Index 0 (R): 1 axis  -- vertical line
    Index 1 (D): 2 axes  -- vertical + horizontal (cross)
    Index 2 (C): 3 axes  -- vertical + 2 diagonals at 60 deg
    Index 3 (A): 4 axes  -- vertical + horizontal + 2 diagonals at 60/120 deg
    """
    contours = []

    arm_len = 140.0  # half-length of each axis
    count = index + 1

    # Axis angles (from vertical = 90 deg):
    if count == 1:
        angles = [90.0]
    elif count == 2:
        angles = [90.0, 0.0]  # vertical + horizontal
    elif count == 3:
        angles = [90.0, 30.0, 150.0]  # vertical + two at 60 deg from horizontal
    else:  # count == 4
        angles = [90.0, 0.0, 30.0, 150.0]

    for angle_deg in angles:
        a = math.radians(angle_deg)
        x1 = CX - arm_len * math.cos(a)
        y1 = CY - arm_len * math.sin(a)
        x2 = CX + arm_len * math.cos(a)
        y2 = CY + arm_len * math.sin(a)
        seg = stroked_segment(x1, y1, x2, y2, SECONDARY)
        if seg:
            contours.append(seg)

    return contours


# ---------------------------------------------------------------------------
# Generator dispatch
# ---------------------------------------------------------------------------

GENERATORS = {
    "UCF_SIGIL":  gen_ucf_sigil,
    "CHRONICLE":  gen_chronicle,
    "GOVERNANCE": gen_governance,
    "GEOMETRY":   gen_geometry,
    "SPECTRAL":   gen_spectral,
    "FUNNEL":     gen_funnel,
    "LATTICE":    gen_lattice,
}


# ---------------------------------------------------------------------------
# .glif writer (matches assemble_apl.py conventions)
# ---------------------------------------------------------------------------

def write_glif(name, codepoint, contours, width, output_dir):
    """Write a UFO .glif XML file. Returns (glyph_name, filename)."""
    glyph = ET.Element("glyph", attrib={"name": name, "format": "2"})
    ET.SubElement(glyph, "advance", attrib={"width": str(width)})
    ET.SubElement(glyph, "unicode", attrib={"hex": f"{codepoint:04X}"})

    outline = ET.SubElement(glyph, "outline")
    for contour_pts in contours:
        contour_elem = ET.SubElement(outline, "contour")
        for x, y in contour_pts:
            rx = round(x, 4)
            ry = round(y, 4)
            x_str = str(int(rx)) if rx == int(rx) else f"{rx:g}"
            y_str = str(int(ry)) if ry == int(ry) else f"{ry:g}"
            ET.SubElement(contour_elem, "point", attrib={
                "x": x_str,
                "y": y_str,
                "type": "line",
            })

    ET.indent(glyph, space="  ")

    filename = name.replace(".", "_") + ".glif"
    filepath = os.path.join(output_dir, filename)
    tree = ET.ElementTree(glyph)
    tree.write(filepath, encoding="unicode", xml_declaration=True)
    with open(filepath, "a", encoding="utf-8") as f:
        f.write("\n")

    return filename


# ---------------------------------------------------------------------------
# contents.plist updater
# ---------------------------------------------------------------------------

def update_contents_plist(manifest, plist_path):
    """Merge new glyph entries into the existing contents.plist."""
    with open(plist_path, "rb") as f:
        contents = plistlib.load(f)

    for glyph_name, filename in manifest.items():
        contents[glyph_name] = filename

    with open(plist_path, "wb") as f:
        plistlib.dump(contents, f)

    return len(contents)


# ---------------------------------------------------------------------------
# Main assembly
# ---------------------------------------------------------------------------

def assemble_all():
    """Generate all 122 non-APL PUA glyphs."""
    os.makedirs(GLYPHS_DIR, exist_ok=True)

    manifest = {}  # glyph_name -> filename
    count = 0

    for block in BLOCKS:
        gen = GENERATORS[block["name"]]
        for idx in range(block["count"]):
            codepoint = block["start"] + idx
            name = glyph_name_for(block, idx)
            contours = gen(idx)

            filename = write_glif(name, codepoint, contours, GLYPH_W, GLYPHS_DIR)
            manifest[name] = filename
            count += 1

    print(f"Generated {count} non-APL glyphs in {GLYPHS_DIR}")

    # Update contents.plist
    total = update_contents_plist(manifest, PLIST_PATH)
    print(f"Updated {PLIST_PATH} ({total} total entries)")

    # Summary per block
    for block in BLOCKS:
        print(f"  {block['name']:12s}  {block['count']:3d} glyphs  "
              f"U+{block['start']:04X}..U+{block['start'] + block['count'] - 1:04X}")

    return manifest


if __name__ == "__main__":
    manifest = assemble_all()
    print(f"\nManifest: {len(manifest)} entries")
