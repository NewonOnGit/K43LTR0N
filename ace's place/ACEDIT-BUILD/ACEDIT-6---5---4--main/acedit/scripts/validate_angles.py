#!/usr/bin/env python3
"""Validate angles between consecutive straight segments in a UFO .glif file.

Extracts every angle at each vertex formed by two consecutive straight
segments and checks whether it belongs to the permitted ACEDIT angle
palette (with configurable tolerance).
"""

import math
import os
import sys
import xml.etree.ElementTree as ET

sys.path.insert(0, os.path.dirname(__file__))
from constants import ANGLES, ANGLE_TOLERANCE


# ---------------------------------------------------------------------------
# Point extraction
# ---------------------------------------------------------------------------

def extract_points(glif_path: str) -> list[tuple[float, float, str]]:
    """Parse a .glif XML file and return all points as (x, y, type) tuples.

    Only ``<point>`` elements inside ``<contour>`` elements are collected.
    The *type* attribute defaults to ``"offcurve"`` when not present.
    Points from all contours are returned in a single flat list.
    """
    contours = extract_contours(glif_path)
    return [pt for contour in contours for pt in contour]


def extract_contours(glif_path: str) -> list[list[tuple[float, float, str]]]:
    """Parse a .glif XML file and return points grouped by contour.

    Returns a list of contours, where each contour is a list of
    (x, y, type) tuples.
    """
    tree = ET.parse(glif_path)
    root = tree.getroot()
    contours: list[list[tuple[float, float, str]]] = []
    for contour in root.iter("contour"):
        pts: list[tuple[float, float, str]] = []
        for pt in contour.iter("point"):
            x = float(pt.attrib["x"])
            y = float(pt.attrib["y"])
            pt_type = pt.attrib.get("type", "offcurve")
            pts.append((x, y, pt_type))
        if pts:
            contours.append(pts)
    return contours


# ---------------------------------------------------------------------------
# Angle computation
# ---------------------------------------------------------------------------

def angle_between(ax: float, ay: float,
                  bx: float, by: float,
                  cx: float, cy: float) -> float:
    """Return the angle in degrees at vertex B formed by segments A-B and B-C.

    Uses the dot-product formula.  Returns a value in [0, 180].
    """
    # Vectors from B to A and from B to C
    bax = ax - bx
    bay = ay - by
    bcx = cx - bx
    bcy = cy - by

    dot = bax * bcx + bay * bcy
    mag_ba = math.hypot(bax, bay)
    mag_bc = math.hypot(bcx, bcy)

    if mag_ba == 0.0 or mag_bc == 0.0:
        return 0.0

    cos_angle = dot / (mag_ba * mag_bc)
    # Clamp to [-1, 1] to guard against floating-point overshoot
    cos_angle = max(-1.0, min(1.0, cos_angle))
    return math.degrees(math.acos(cos_angle))


# ---------------------------------------------------------------------------
# Validation
# ---------------------------------------------------------------------------

def _nearest_permitted(angle: float) -> tuple[int, float]:
    """Return (nearest_permitted_angle, deviation) for a measured *angle*."""
    best_perm = ANGLES[0]
    best_dev = abs(angle - best_perm)
    for a in ANGLES[1:]:
        dev = abs(angle - a)
        if dev < best_dev:
            best_dev = dev
            best_perm = a
    return best_perm, best_dev


def validate_glif(glif_path: str) -> list[dict]:
    """Validate every angle between consecutive straight segments in *glif_path*.

    Each contour is validated independently -- angles are never measured
    across contour boundaries.

    Only on-curve (``line`` or ``curve``) points are considered as vertices.
    Off-curve control points are skipped for angle measurement because
    they define curvature, not straight-segment angles.

    Returns a list of violation dicts, each containing:
        - ``vertex_index``: global index of the vertex (across all contours)
        - ``measured``:     the measured angle in degrees
        - ``nearest``:      the nearest permitted angle
        - ``deviation``:    absolute difference from the nearest permitted angle
        - ``position``:     (x, y) of the vertex
    """
    contours = extract_contours(glif_path)
    violations: list[dict] = []
    global_idx = 0

    for contour_pts in contours:
        # Filter to on-curve points only (line / curve / qcurve / move)
        on_curve = [
            (x, y)
            for x, y, t in contour_pts
            if t in ("line", "curve", "qcurve", "move")
        ]

        if len(on_curve) < 3:
            global_idx += len(on_curve)
            continue

        for idx in range(len(on_curve)):
            ax, ay = on_curve[(idx - 1) % len(on_curve)]
            bx, by = on_curve[idx]
            cx, cy = on_curve[(idx + 1) % len(on_curve)]

            # Skip degenerate cases (coincident points)
            if (ax == bx and ay == by) or (bx == cx and by == cy):
                continue

            measured = angle_between(ax, ay, bx, by, cx, cy)
            nearest, deviation = _nearest_permitted(measured)

            if deviation > ANGLE_TOLERANCE:
                violations.append({
                    "vertex_index": global_idx + idx,
                    "measured": round(measured, 6),
                    "nearest": nearest,
                    "deviation": round(deviation, 6),
                    "position": (bx, by),
                })

        global_idx += len(on_curve)

    return violations


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} <path-to-.glif>", file=sys.stderr)
        sys.exit(2)

    glif_path = sys.argv[1]
    if not os.path.isfile(glif_path):
        print(f"Error: file not found: {glif_path}", file=sys.stderr)
        sys.exit(1)

    points = extract_points(glif_path)
    print(f"Extracted {len(points)} points from {glif_path}")

    violations = validate_glif(glif_path)

    if not violations:
        print("All angles conform to the permitted palette.")
        sys.exit(0)

    print(f"\n{len(violations)} angle violation(s) found:\n")
    for v in violations:
        print(f"  Vertex {v['vertex_index']:4d}  "
              f"at ({v['position'][0]:g}, {v['position'][1]:g})  "
              f"measured={v['measured']:.4f}deg  "
              f"nearest={v['nearest']}deg  "
              f"deviation={v['deviation']:.4f}deg")

    sys.exit(1)
