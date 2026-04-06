# ACEDIT Build Scripts

15 Python modules forming the build, generation, and validation pipeline. All numeric constants trace to phi = (1+sqrt(5))/2.

## Module Map

### Foundation

| Script | Purpose |
|--------|---------|
| `constants.py` | All font metrics derived from phi (UPM, cap height, stroke weights, angles) |
| `verify_constants.py` | 37-check verification of the full derivation chain |

### Glyph Generation

| Script | Purpose |
|--------|---------|
| `generate_allocation.py` | Maps 1,094 glyphs to contiguous PUA codepoints (U+E000-E445) |
| `indicators.py` | 9 machine + 3 spiral component primitive definitions |
| `operators.py` | 6 operator symbol component primitives |
| `domains.py` | 6 domain tint component primitives |
| `components.py` | Unified component interface (imports indicators, operators, domains) |
| `assemble_apl.py` | Composes 972 APL token glyphs from 4 component layers each |
| `assemble_non_apl.py` | Generates 122 non-APL block glyphs (UCF, Chronicle, Governance, etc.) |
| `generate_groups.py` | Produces 12 OpenType glyph classes in groups.plist |

### Validation

| Script | Purpose |
|--------|---------|
| `naming.py` | Classifies glyph names as canonical, safe, or invalid |
| `validate_angles.py` | Enforces angle palette {120, 108, 90, 72, 60, 36, 30, 6} with 0.01 deg tolerance |
| `defect_tracker.py` | Pipeline defect propagation model (dissipation 0.92, rupture threshold 0.30) |
| `validate.py` | Stage 6 suite: fontbakery, angles, naming, moire interference check |

### Orchestration

| Script | Purpose |
|--------|---------|
| `build.py` | Master 6-stage pipeline runner with PipelineTracker integration |

## Component Architecture (APL Tokens)

Each of the 972 APL glyphs is composed from exactly 4 layers:

```
Layer      Variants  Source Module
─────────────────────────────────
Machine    9         indicators.py
Spiral     3         indicators.py
Operator   6         operators.py
Domain     6         domains.py
```

**Addressing:** `codepoint = U+E000 + (machine * 108) + (spiral * 36) + (operator * 6) + domain`

**Total:** 9 x 3 x 6 x 6 = 972 unique compositions from 24 primitive designs.

## Dependencies

All scripts run under Python 3.10+. Font compilation (Stage 5) and validation (Stage 6) additionally require:

```
fontmake >= 3.11.1
fonttools >= 4.62.1
brotli >= 1.2.0
fontbakery >= 1.1.0
```

Install into a virtual environment:

```bash
python3 -m venv fontvenv
fontvenv/bin/pip install fontmake fonttools brotli fontbakery
```
