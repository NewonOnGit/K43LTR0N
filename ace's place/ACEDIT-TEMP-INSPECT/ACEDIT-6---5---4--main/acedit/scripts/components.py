#!/usr/bin/env python3
"""Unified component interface for ACEDIT glyph assembly.

Imports from the three component modules (indicators, operators, domains)
and provides a single function that returns contours translated from local
zone coordinates into glyph coordinates.
"""

import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from indicators import get_machine_contours, get_spiral_contours
from operators import get_operator_contours
from domains import get_domain_contours

# ---------------------------------------------------------------------------
# Zone origins: where local (0, 0) maps to in glyph space
# ---------------------------------------------------------------------------

ZONE_ORIGINS = {
    "machine":  (36, 538),
    "spiral":   (36, 206),
    "operator": (155, 103),
    "domain":   (36, 0),
}

# ---------------------------------------------------------------------------
# Dispatch table
# ---------------------------------------------------------------------------

_GETTERS = {
    "machine":  get_machine_contours,
    "spiral":   get_spiral_contours,
    "operator": get_operator_contours,
    "domain":   get_domain_contours,
}


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def get_component(kind: str, index: int) -> list[list[tuple[float, float, str]]]:
    """Get contours for a component in GLYPH coordinates (already translated).

    Parameters
    ----------
    kind : str
        One of "machine", "spiral", "operator", "domain".
    index : int
        Component index (0-8 for machine, 0-2 for spiral, 0-5 for operator/domain).

    Returns
    -------
    list[list[tuple[float, float, str]]]
        Contours with coordinates translated to glyph space.
        Each contour is a list of (x, y, "line") tuples.
    """
    if kind not in _GETTERS:
        raise ValueError(f"Unknown component kind {kind!r}; "
                         f"expected one of {sorted(_GETTERS)}")

    local_contours = _GETTERS[kind](index)
    x_off, y_off = ZONE_ORIGINS[kind]

    translated = []
    for contour in local_contours:
        translated.append([
            (x + x_off, y + y_off, tag)
            for x, y, tag in contour
        ])
    return translated
