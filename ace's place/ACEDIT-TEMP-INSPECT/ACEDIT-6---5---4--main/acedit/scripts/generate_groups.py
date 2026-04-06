#!/usr/bin/env python3
"""Generate glyph class definitions (groups.plist) from allocation_table.json.

Reads the allocation table and produces OpenType glyph groups:
  - public.kern1.PUA_ALL         : every PUA glyph name
  - public.kern1.GOV_GLYPHS      : GOVERNANCE block glyphs
  - public.kern1.GEOMETRY_PENT   : GEOMETRY block pentagonal glyphs
  - APL_M0 .. APL_M8             : per-machine APL glyph classes

Writes groups.plist into the ACEDIT-Regular UFO source.
"""

import json
import os
import plistlib
import re

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
_SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
_PROJECT_ROOT = os.path.dirname(_SCRIPT_DIR)

ALLOCATION_TABLE_PATH = os.path.join(
    _PROJECT_ROOT, "sources", "allocation_table.json"
)
GROUPS_PLIST_PATH = os.path.join(
    _PROJECT_ROOT, "sources", "ACEDIT-Regular.ufo", "groups.plist"
)

# Regex to extract the machine index from an APL glyph name.
# Canonical form: acedit.apl.m{M}s{S}o{O}d{D}
_APL_MACHINE_RE = re.compile(r"^acedit\.apl\.m(\d)s\d")


# ---------------------------------------------------------------------------
# Core logic
# ---------------------------------------------------------------------------
def load_allocation_table(path: str) -> list[dict]:
    """Load and return the allocation table JSON."""
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def build_groups(table: list[dict]) -> dict[str, list[str]]:
    """Derive all glyph groups from the allocation table.

    Returns a dict suitable for plistlib serialization:
        group_name -> [glyph_name, ...]
    """
    pua_all: list[str] = []
    gov_glyphs: list[str] = []
    geometry_pent: list[str] = []
    apl_machines: dict[int, list[str]] = {m: [] for m in range(9)}

    for entry in table:
        name = entry["name"]
        block = entry["block"]
        family = entry.get("family", "")

        # Every PUA entry belongs to the master class.
        pua_all.append(name)

        # GOVERNANCE block.
        if block == "GOVERNANCE":
            gov_glyphs.append(name)

        # GEOMETRY block -- only pentagonal-family glyphs.
        if block == "GEOMETRY" and family == "pentagonal":
            geometry_pent.append(name)

        # APL per-machine classes.
        if block == "APL_CORE":
            match = _APL_MACHINE_RE.match(name)
            if match:
                machine_idx = int(match.group(1))
                apl_machines[machine_idx].append(name)

    # Assemble the final groups dict.
    groups: dict[str, list[str]] = {
        "public.kern1.PUA_ALL": pua_all,
        "public.kern1.GOV_GLYPHS": gov_glyphs,
        "public.kern1.GEOMETRY_PENT": geometry_pent,
    }

    for m in range(9):
        groups[f"APL_M{m}"] = apl_machines[m]

    return groups


def write_groups_plist(groups: dict[str, list[str]], path: str) -> None:
    """Write the groups dictionary as a plist file."""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "wb") as f:
        plistlib.dump(groups, f, sort_keys=True)
    print(f"Wrote groups.plist to {path}")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main() -> None:
    table = load_allocation_table(ALLOCATION_TABLE_PATH)
    groups = build_groups(table)
    write_groups_plist(groups, GROUPS_PLIST_PATH)

    # Print summary of group sizes.
    print("\nGroup sizes:")
    total_memberships = 0
    for name in sorted(groups.keys()):
        size = len(groups[name])
        total_memberships += size
        print(f"  {name:40s}  {size:5d} glyphs")
    print(f"  {'(total memberships)':40s}  {total_memberships:5d}")


if __name__ == "__main__":
    main()
