#!/usr/bin/env python3
"""Compose 972 APL token glyphs from reusable component primitives.

Each glyph is written as a UFO .glif file into the ACEDIT-Regular UFO
source.  The 972 tokens are indexed by four axes:

    9 machines * 3 spirals * 6 operators * 6 domains = 972

Each glyph is assembled from four real component layers (machine,
spiral, operator, domain) with parameter-dependent offsets for
visual distinctness.
"""

import os
import sys
import xml.etree.ElementTree as ET

sys.path.insert(0, os.path.dirname(__file__))
from constants import ADVANCES, STROKES, SIDEBEARINGS, METRICS
from generate_allocation import apl_codepoint, apl_glyph_name
import components

# ---------------------------------------------------------------------------
# Derived layout constants
# ---------------------------------------------------------------------------

GLYPH_WIDTH = ADVANCES["standard"]      # 618
GLYPH_HEIGHT = METRICS["capHeight"]     # 618

# Bounding zones for the four component layers (x, y, w, h)
ZONES = {
    "machine":  (36, GLYPH_HEIGHT - 80, GLYPH_WIDTH - 72, 70),
    "spiral":   (36, GLYPH_HEIGHT // 3, 60, GLYPH_HEIGHT // 3),
    "operator": (GLYPH_WIDTH // 4, GLYPH_HEIGHT // 6, GLYPH_WIDTH // 2, GLYPH_HEIGHT * 2 // 3),
    "domain":   (36, 0, GLYPH_WIDTH - 72, GLYPH_HEIGHT),
}

GLYPHS_DIR = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "sources", "ACEDIT-Regular.ufo", "glyphs",
)

_STROKE = STROKES["primary"]  # 73 -- used for placeholder outline inset


# ---------------------------------------------------------------------------
# Contour helpers
# ---------------------------------------------------------------------------

def translate_contours_3(contours: list[list[tuple[float, float, str]]],
                         dx: float, dy: float
                         ) -> list[list[tuple[float, float, str]]]:
    """Return *contours* shifted by (*dx*, *dy*).

    Each contour is a list of (x, y, tag) triples.
    """
    return [
        [(x + dx, y + dy, tag) for x, y, tag in contour]
        for contour in contours
    ]


def strip_tags(contours: list[list[tuple[float, float, str]]]
               ) -> list[list[tuple[float, float]]]:
    """Strip the "line" tag from contours, returning (x, y) pair lists.

    This converts from the component module format to the write_glif format.
    """
    return [
        [(x, y) for x, y, _tag in contour]
        for contour in contours
    ]


# ---------------------------------------------------------------------------
# .glif writer
# ---------------------------------------------------------------------------

def _sanitize_filename(name: str) -> str:
    """Convert a glyph name to a safe filename (replace dots with underscores)."""
    return name.replace(".", "_") + ".glif"


def write_glif(name: str, codepoint: int,
               contours: list[list[tuple[float, float]]],
               width: int) -> str:
    """Write a UFO .glif XML file and return the filename.

    Parameters
    ----------
    name : str
        Glyph name (e.g. ``acedit.apl.m0s0o0d0``).
    codepoint : int
        Unicode codepoint.
    contours : list of contour lists
        Each contour is a list of (x, y) tuples (all on-curve line points).
    width : int
        Advance width.

    Returns
    -------
    str
        The filename that was written (relative to the glyphs directory).
    """
    glyph = ET.Element("glyph", attrib={"name": name, "format": "2"})

    advance = ET.SubElement(glyph, "advance", attrib={"width": str(width)})

    unicode_elem = ET.SubElement(
        glyph, "unicode", attrib={"hex": f"{codepoint:04X}"}
    )

    outline = ET.SubElement(glyph, "outline")
    for contour_pts in contours:
        contour_elem = ET.SubElement(outline, "contour")
        for i, (x, y) in enumerate(contour_pts):
            # Round to 4 decimal places to preserve angle precision
            # within the 0.01-degree tolerance.  UFO .glif supports
            # decimal values; coarser rounding would break non-90-deg
            # angles on hexagons, pentagons, and triangles.
            rx = round(x, 4)
            ry = round(y, 4)
            # Format: use integer string if value is whole, else decimal
            x_str = str(int(rx)) if rx == int(rx) else f"{rx:g}"
            y_str = str(int(ry)) if ry == int(ry) else f"{ry:g}"
            pt_attrib = {
                "x": x_str,
                "y": y_str,
                "type": "line",
            }
            ET.SubElement(contour_elem, "point", attrib=pt_attrib)

    # Indent for readability
    ET.indent(glyph, space="  ")

    filename = _sanitize_filename(name)
    filepath = os.path.join(GLYPHS_DIR, filename)
    tree = ET.ElementTree(glyph)
    tree.write(filepath, encoding="unicode", xml_declaration=True)
    # Append trailing newline
    with open(filepath, "a", encoding="utf-8") as f:
        f.write("\n")

    return filename


# ---------------------------------------------------------------------------
# Assembly
# ---------------------------------------------------------------------------

def _build_contours(machine: int, spiral: int,
                    operator: int, domain: int
                    ) -> list[list[tuple[float, float]]]:
    """Build real contours for one APL glyph from component primitives.

    Retrieves contours from each component module (already in glyph
    coordinates) and applies parameter-dependent offsets for visual
    distinctness.  Returns contours as (x, y) pair lists suitable for
    write_glif.
    """
    all_contours: list[list[tuple[float, float, str]]] = []

    # Machine contours: shift x by (m * 2) units
    mc = components.get_component("machine", machine)
    mc = translate_contours_3(mc, machine * 2, 0)
    all_contours.extend(mc)

    # Spiral contours: shift y by (s * 5) units
    sc = components.get_component("spiral", spiral)
    sc = translate_contours_3(sc, 0, spiral * 5)
    all_contours.extend(sc)

    # Operator contours: shift x by (o * 3) units
    oc = components.get_component("operator", operator)
    oc = translate_contours_3(oc, operator * 3, 0)
    all_contours.extend(oc)

    # Domain contours: shift x by (d * 4) units
    dc = components.get_component("domain", domain)
    dc = translate_contours_3(dc, domain * 4, 0)
    all_contours.extend(dc)

    return strip_tags(all_contours)


def assemble_all() -> dict[str, str]:
    """Generate all 972 APL token .glif files and return a manifest.

    Returns
    -------
    dict
        Mapping of glyph name -> filename for every generated glyph.
    """
    os.makedirs(GLYPHS_DIR, exist_ok=True)

    manifest: dict[str, str] = {}
    count = 0

    for m in range(9):
        for s in range(3):
            for o in range(6):
                for d in range(6):
                    cp = apl_codepoint(m, s, o, d)
                    name = apl_glyph_name(m, s, o, d)

                    contours = _build_contours(m, s, o, d)
                    filename = write_glif(name, cp, contours, GLYPH_WIDTH)
                    manifest[name] = filename
                    count += 1

    print(f"Assembled {count} APL glyphs in {GLYPHS_DIR}")
    return manifest


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    manifest = assemble_all()
    print(f"\nManifest contains {len(manifest)} entries.")
    # Show first few
    for i, (name, fname) in enumerate(manifest.items()):
        if i >= 5:
            print(f"  ... ({len(manifest) - 5} more)")
            break
        print(f"  {name:30s} -> {fname}")
