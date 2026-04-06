#!/usr/bin/env python3
"""Generate allocation_table.json for the ACEDIT PUA block map."""

import json
import os

# ---------------------------------------------------------------------------
# PUA Block definitions
# ---------------------------------------------------------------------------
BLOCKS = {
    "APL_CORE":   {"start": 0xE000, "end": 0xE3CB, "count": 972},
    "UCF_SIGIL":  {"start": 0xE3CC, "end": 0xE3F2, "count": 39},
    "CHRONICLE":  {"start": 0xE3F3, "end": 0xE40E, "count": 28},
    "GOVERNANCE": {"start": 0xE40F, "end": 0xE41B, "count": 13},
    "GEOMETRY":   {"start": 0xE41C, "end": 0xE42E, "count": 19},
    "SPECTRAL":   {"start": 0xE42F, "end": 0xE43A, "count": 12},
    "FUNNEL":     {"start": 0xE43B, "end": 0xE441, "count": 7},
    "LATTICE":    {"start": 0xE442, "end": 0xE445, "count": 4},
}

FAMILY_MAP = {
    "APL_CORE":   "hexagonal",
    "UCF_SIGIL":  "hexagonal",
    "CHRONICLE":  "hexagonal",
    "GOVERNANCE": "cubic",
    "GEOMETRY":   "pentagonal",
    "SPECTRAL":   "pentagonal",
    "FUNNEL":     "cubic",
    "LATTICE":    "cubic",
}

OUTPUT_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "sources",
    "allocation_table.json",
)


# ---------------------------------------------------------------------------
# APL helpers
# ---------------------------------------------------------------------------
def apl_codepoint(machine: int, spiral: int, operator: int, domain: int) -> int:
    """Return the PUA codepoint for an APL glyph.

    Formula: U+E000 + (machine * 108) + (spiral * 36) + (operator * 6) + domain
    """
    if not (0 <= machine <= 8):
        raise ValueError(f"machine must be 0-8, got {machine}")
    if not (0 <= spiral <= 2):
        raise ValueError(f"spiral must be 0-2, got {spiral}")
    if not (0 <= operator <= 5):
        raise ValueError(f"operator must be 0-5, got {operator}")
    if not (0 <= domain <= 5):
        raise ValueError(f"domain must be 0-5, got {domain}")
    return 0xE000 + (machine * 108) + (spiral * 36) + (operator * 6) + domain


def apl_glyph_name(m: int, s: int, o: int, d: int) -> str:
    """Return the canonical glyph name for an APL entry."""
    return f"acedit.apl.m{m}s{s}o{o}d{d}"


# ---------------------------------------------------------------------------
# Generation
# ---------------------------------------------------------------------------
def _generate_apl_entries() -> list[dict]:
    """Generate all 972 APL_CORE entries."""
    entries = []
    for m in range(9):
        for s in range(3):
            for o in range(6):
                for d in range(6):
                    cp = apl_codepoint(m, s, o, d)
                    entries.append({
                        "codepoint": f"U+{cp:04X}",
                        "name": apl_glyph_name(m, s, o, d),
                        "block": "APL_CORE",
                        "family": FAMILY_MAP["APL_CORE"],
                    })
    return entries


def _generate_sequential_entries(block_name: str) -> list[dict]:
    """Generate sequential entries for a non-APL block."""
    info = BLOCKS[block_name]
    entries = []
    for i in range(info["count"]):
        cp = info["start"] + i
        entries.append({
            "codepoint": f"U+{cp:04X}",
            "name": f"acedit.{block_name.lower()}.{i:03d}",
            "block": block_name,
            "family": FAMILY_MAP[block_name],
        })
    return entries


def generate() -> list[dict]:
    """Build the full allocation table, validate uniqueness, and write JSON."""
    table: list[dict] = []

    # APL_CORE
    table.extend(_generate_apl_entries())

    # All other blocks in order
    for block_name in BLOCKS:
        if block_name == "APL_CORE":
            continue
        table.extend(_generate_sequential_entries(block_name))

    # --- Validate codepoint uniqueness ---
    seen_codepoints: dict[str, str] = {}
    for entry in table:
        cp = entry["codepoint"]
        if cp in seen_codepoints:
            raise RuntimeError(
                f"Duplicate codepoint {cp}: "
                f"'{seen_codepoints[cp]}' and '{entry['name']}'"
            )
        seen_codepoints[cp] = entry["name"]

    # --- Validate name uniqueness ---
    seen_names: dict[str, str] = {}
    for entry in table:
        name = entry["name"]
        if name in seen_names:
            raise RuntimeError(
                f"Duplicate name '{name}': "
                f"codepoints {seen_names[name]} and {entry['codepoint']}"
            )
        seen_names[name] = entry["codepoint"]

    # --- Write output ---
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(table, f, indent=2, ensure_ascii=False)
        f.write("\n")

    print(f"Wrote {len(table)} entries to {OUTPUT_PATH}")
    return table


# ---------------------------------------------------------------------------
if __name__ == "__main__":
    table = generate()

    # Summary
    from collections import Counter
    block_counts = Counter(e["block"] for e in table)
    print("\nBlock summary:")
    for block, count in block_counts.items():
        info = BLOCKS[block]
        expected = info["count"]
        status = "OK" if count == expected else f"MISMATCH (expected {expected})"
        print(f"  {block:12s}  {count:4d}  {status}")
    print(f"  {'TOTAL':12s}  {len(table):4d}")
