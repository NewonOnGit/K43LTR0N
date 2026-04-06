#!/usr/bin/env python3
"""Glyph name validation with canonical and safe-equivalent forms.

Canonical pattern: acedit.{block}.{id}   e.g. acedit.apl.m3s1o2d4
Safe equivalent:   acedit-{block}-{id}   e.g. acedit-gov-sacred_acorn
"""

import re

# ---------------------------------------------------------------------------
# Regex patterns
# ---------------------------------------------------------------------------
_BODY = (
    r"apl\.m[0-8]s[0-2]o[0-5]d[0-5]"
    r"|ucf\.\d{3}"
    r"|chron\.\d{3}"
    r"|gov\.(\d{3}|[a-z_]+)"  # numeric or text identifiers
    r"|geo\.\d{3}"
    r"|spec\.\d{3}"
    r"|funnel\.[SRKCPFA]"
    r"|lat\.[RDCA]"
)

# Standard font glyph names (not ACEDIT-specific)
STANDARD_NAMES = {".notdef", "space", "nbspace"}

CANONICAL_RE = re.compile(r"^acedit\.(" + _BODY + r")$")
SAFE_RE = re.compile(
    r"^acedit-(" + _BODY.replace(r"\.", "-") + r")$"
)


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------
def validate_name(name: str) -> str:
    """Return 'canonical', 'safe', or 'invalid'."""
    if name in STANDARD_NAMES:
        return "canonical"
    if CANONICAL_RE.match(name):
        return "canonical"
    if SAFE_RE.match(name):
        return "safe"
    return "invalid"


def normalize_name(name: str) -> str | None:
    """Convert a name to canonical form, or return None if invalid.

    Safe names are converted by replacing dashes with dots.
    Canonical names are returned as-is.
    Invalid names return None.
    """
    kind = validate_name(name)
    if kind == "canonical":
        return name
    if kind == "safe":
        # Replace first two dashes with dots to get canonical form
        # acedit-block-id  ->  acedit.block.id
        parts = name.split("-", 2)
        return ".".join(parts)
    return None


# ---------------------------------------------------------------------------
if __name__ == "__main__":
    test_cases = [
        # Canonical examples
        ("acedit.apl.m3s1o2d4",       "canonical"),
        ("acedit.apl.m0s0o0d0",       "canonical"),
        ("acedit.apl.m8s2o5d5",       "canonical"),
        ("acedit.ucf.007",            "canonical"),
        ("acedit.chron.015",          "canonical"),
        ("acedit.gov.sacred_acorn",   "canonical"),
        ("acedit.geo.003",            "canonical"),
        ("acedit.spec.011",           "canonical"),
        ("acedit.funnel.S",           "canonical"),
        ("acedit.lat.R",              "canonical"),
        # Safe equivalents
        ("acedit-apl-m3s1o2d4",       "safe"),
        ("acedit-gov-sacred_acorn",   "safe"),
        ("acedit-funnel-K",           "safe"),
        ("acedit-lat-D",              "safe"),
        # Invalid examples
        ("acedit.apl.m9s0o0d0",       "invalid"),  # machine out of range
        ("acedit.apl.m0s3o0d0",       "invalid"),  # spiral out of range
        ("acedit.funnel.X",           "invalid"),  # invalid funnel letter
        ("acedit.lat.Z",              "invalid"),  # invalid lattice letter
        ("foobar.apl.m0s0o0d0",       "invalid"),  # wrong prefix
        ("acedit.unknown.001",        "invalid"),  # unknown block
        ("",                          "invalid"),
    ]

    print("Glyph name validation tests")
    print("=" * 60)
    all_passed = True
    for name, expected in test_cases:
        result = validate_name(name)
        status = "PASS" if result == expected else "FAIL"
        if status == "FAIL":
            all_passed = False
        print(f"  {status}  validate({name!r:40s}) = {result!r:12s}  (expected {expected!r})")

    print()
    print("Normalization tests")
    print("=" * 60)
    normalize_cases = [
        ("acedit.apl.m3s1o2d4",     "acedit.apl.m3s1o2d4"),
        ("acedit-apl-m3s1o2d4",     "acedit.apl.m3s1o2d4"),
        ("acedit-gov-sacred_acorn", "acedit.gov.sacred_acorn"),
        ("acedit.funnel.S",         "acedit.funnel.S"),
        ("acedit-funnel-S",         "acedit.funnel.S"),
        ("bad_name",                 None),
    ]
    for name, expected in normalize_cases:
        result = normalize_name(name)
        status = "PASS" if result == expected else "FAIL"
        if status == "FAIL":
            all_passed = False
        print(f"  {status}  normalize({name!r:40s}) = {result!r}")

    print()
    if all_passed:
        print("All tests passed.")
    else:
        print("Some tests FAILED.")
