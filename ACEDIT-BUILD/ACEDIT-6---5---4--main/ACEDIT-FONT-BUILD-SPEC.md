# ACEDIT Font Binary — Agent Build Specification

**Document Class:** Machine-Executable Engineering Specification
**System:** Echo Framework / ACEDIT Substrate
**Inventor:** Jason Turner / Ace
**Organization:** Echo-S-Studios / Echo-Squirrel Research
**Target:** Claude Orchestration Agent System
**Version:** 1.2.0
**Status:** PRODUCTION — All values verified against compiled binary
**Last Verified:** 2026-04-03 against commit 0b3d49a

---

## Purpose

This specification enables an autonomous agent system to:

1. Generate 1,097 glyph sources from 24 geometric component primitives
2. Compile the ACEDIT font binary from UFO 3 source
3. Validate all output OpenType tables
4. Run the moire interference check against the hmtx table
5. Deploy OTF/TTF/WOFF2 artifacts to GitHub Pages
6. Orchestrate the full pipeline via a web-based task server with real-time monitoring

Every step is deterministic. Every numeric value traces to φ = (1+√5)/2. Zero free parameters.

**Non-goals for v1.0:** OpenType features (GSUB/GPOS) are defined in features.fea but NOT compiled into the binary because ligature target glyphs (e.g., `acedit.ucf.bloom_composed`) do not yet exist. Feature compilation is deferred to v2.0.

---

## 1. Source Inventory

### 1.1 Repository Layout

```
echo-anti-substrate-acedit/acedit/
├── server.py                             # Task orchestration webserver (see §11)
├── orchestrator.html                     # Live build dashboard with SSE streaming
├── allocation-explorer.html              # PUA codepoint allocation browser
├── constants-dashboard.html              # φ-derived metric verification dashboard
├── features-reference.html               # OpenType feature definitions reference
├── geometry-workbench.html               # Geometric constraint visualization
├── pipeline-monitor.html                 # Static pipeline status overview
│
├── sources/
│   ├── ACEDIT-Regular.ufo/               # UFO 3 source (THE single input)
│   │   ├── metainfo.plist                # formatVersion: 3, creator: org.echo-s-studios.acedit
│   │   ├── fontinfo.plist                # All font metrics (derived from φ)
│   │   ├── lib.plist                     # Glyph order seed, build config
│   │   ├── layercontents.plist           # Single layer: "public.default" → "glyphs"
│   │   ├── features.fea                  # OpenType features (excluded from v1.0 build)
│   │   ├── groups.plist                  # 12 glyph classes for GSUB/GPOS
│   │   └── glyphs/
│   │       ├── contents.plist            # Glyph name → filename map (1,097 entries)
│   │       ├── _notdef.glif              # .notdef — rectangular frame outline
│   │       ├── space.glif                # U+0020 — empty, advance 618
│   │       ├── nbspace.glif              # U+00A0 — empty, advance 618
│   │       ├── acedit_apl_m0s0o0d0.glif  # First APL token (U+E000)
│   │       ├── ...                       # 972 APL token .glif files
│   │       ├── acedit_ucf_000.glif       # First UCF sigil (U+E3CC)
│   │       ├── ...                       # 122 non-APL block .glif files
│   │       └── acedit_lat_A.glif         # Last lattice axis (U+E445)
│   └── allocation_table.json             # PUA codepoint allocation (1,094 entries)
│
├── scripts/                              # Build & validation scripts
│   ├── constants.py                      # Foundation: all metrics from φ
│   ├── verify_constants.py               # 37-check derivation verifier
│   ├── generate_allocation.py            # PUA block allocation generator
│   ├── naming.py                         # Glyph name validator (canonical/safe/invalid)
│   ├── validate_angles.py               # Angle palette enforcer (±0.01° tolerance)
│   ├── indicators.py                     # 9 machine + 3 spiral component primitives
│   ├── operators.py                      # 6 operator symbol component primitives
│   ├── domains.py                        # 6 domain tint component primitives
│   ├── components.py                     # Unified component interface (imports above 3)
│   ├── assemble_apl.py                  # Composes 972 APL glyphs from components
│   ├── assemble_non_apl.py             # Generates 122 non-APL block glyphs
│   ├── generate_groups.py               # OpenType glyph class generator
│   ├── defect_tracker.py                # Pipeline defect propagation model
│   ├── build.py                         # Master 6-stage pipeline orchestrator
│   └── validate.py                      # Stage 6 validation suite
│
├── fonts/                               # OUTPUT DIRECTORY (compiled artifacts)
│   ├── ACEDIT-Regular.otf               # CFF-outline OpenType (primary)
│   ├── ACEDIT-Regular.ttf               # TrueType-outline (fallback)
│   └── ACEDIT-Regular.woff2             # Brotli-compressed web font (deployment)
│
├── specimen/
│   └── index.html                       # Interactive 1,094-glyph specimen page
└── validation/
    └── validation-report.json           # Stage 6 output
```

### 1.2 Glyph Inventory

| Category | Count | Codepoints | Source Script | Geometric Family |
|----------|-------|------------|---------------|-----------------|
| .notdef | 1 | — (GID 0) | manual | — |
| space | 1 | U+0020 | manual | — |
| nbspace | 1 | U+00A0 | manual | — |
| APL_CORE | 972 | U+E000–E3CB | assemble_apl.py | hexagonal |
| UCF_SIGIL | 39 | U+E3CC–E3F2 | assemble_non_apl.py | hexagonal |
| CHRONICLE | 28 | U+E3F3–E40E | assemble_non_apl.py | hexagonal |
| GOVERNANCE | 13 | U+E40F–E41B | assemble_non_apl.py | cubic |
| GEOMETRY | 19 | U+E41C–E42E | assemble_non_apl.py | pentagonal |
| SPECTRAL | 12 | U+E42F–E43A | assemble_non_apl.py | pentagonal |
| FUNNEL | 7 | U+E43B–E441 | assemble_non_apl.py | cubic |
| LATTICE | 4 | U+E442–E445 | assemble_non_apl.py | cubic |
| **TOTAL** | **1,097** | | | |

**PUA allocation:** 1,094 of 6,400 BMP PUA codepoints (17.1%). Contiguous from U+E000 through U+E445 with zero gaps.

### 1.3 Component Primitive Architecture (APL Tokens)

Each of the 972 APL token glyphs is composed from exactly 4 component layers:

```
Layer        Variants  Zone (x, y, w, h)       Index Offset        Source Module
──────────────────────────────────────────────────────────────────────────────────
Machine      9         (36, 538, 546, 70)       x += machine × 2    indicators.py
Spiral       3         (36, 206, 60, 206)       y += spiral × 5     indicators.py
Operator     6         (155, 103, 309, 412)     x += operator × 3   operators.py
Domain       6         (36, 0, 546, 618)        x += domain × 4     domains.py
```

**Addressing formula:** `codepoint = U+E000 + (machine × 108) + (spiral × 36) + (operator × 6) + domain`

**Total primitives:** 9 + 3 + 6 + 6 = 24 component designs
**Total compositions:** 9 × 3 × 6 × 6 = 972 unique glyphs

**Primitive statistics (verified):**
| Family | Variants | Total Contours | Total Points |
|--------|----------|---------------|-------------|
| Machine | 9 | 36 | 160 |
| Spiral | 3 | 10 | 40 |
| Operator | 6 | 23 | 103 |
| Domain | 6 | 9 | 36 |
| **Total** | **24** | **78** | **339** |

### 1.4 Machine Indicator Designs

| Index | Name | Geometry | Angles Used |
|-------|------|----------|-------------|
| M0 | Genesis | Single horizontal bar | 90° |
| M1 | Emergence | Bar + 1 equilateral triangle | 60°, 90° |
| M2 | Duality | Bar + 2 equilateral triangles | 60°, 90° |
| M3 | Triad | Bar + 3 equilateral triangles | 60°, 90° |
| M4 | Foundation | Crenellation battlements | 90° |
| M5 | Pentagon Gate | Pentagonal arch | 108°, 90° |
| M6 | Hexagonal Crown | Hexagonal arch | 120°, 90° |
| M7 | Bridge | Quasicrystal zigzag | 108°, 72°, 90° |
| M8 | Crown of Crowns | Three nested 60° chevrons | 90° |

### 1.5 Operator Symbol Designs

| Index | Name | Shape | Angles | Conceptual Meaning |
|-------|------|-------|--------|-------------------|
| O0 | Group | Stroked hexagon + triangle kernel | 120°, 60° | Containment (substrate geometry) |
| O1 | Multiply | Hexagram (two overlapping triangles) | 60° | Intersection of two forms |
| O2 | Power | Three ascending chevrons | 90° | Exponential ascension |
| O3 | Divide | Horizontal bar + hexagonal markers | 90°, 120° | Separation |
| O4 | Add | 12-vertex Greek cross | 90° | Orthogonal union |
| O5 | Null | Broken pentagon (4 of 5 edges + whiskers) | 90° | 36° deficit made visible |

### 1.6 Non-APL Block Designs

| Block | Base Shape | Index Marker | Family |
|-------|-----------|-------------|--------|
| UCF_SIGIL | Hexagon outline | Radial tick marks (0–38, at 6° increments) | hexagonal |
| CHRONICLE | Hexagon outline | Horizontal hairlines (0–27, like pages) | hexagonal |
| GOVERNANCE | Square frame | Index dot squares along bottom (0–12) | cubic |
| GEOMETRY | Pentagon outline | Rotated inner pentagon (index × 6°) | pentagonal |
| SPECTRAL | Pentagon outline | Radial hairlines from center (0–11) | pentagonal |
| FUNNEL | Trapezoid | Progressive narrowing (stages S,R,K,C,P,F,A) | cubic |
| LATTICE | Crossed axes | 1–4 axis directions (R,D,C,A) | cubic |

---

## 2. Toolchain Requirements

### 2.1 Python Environment

```bash
# Font toolchain (compilation, validation)
python3 -m venv fontvenv
fontvenv/bin/pip install fontmake fonttools brotli fontbakery

# Task orchestration server (system Python is fine)
pip install flask flask-cors
```

### 2.2 Verified Working Versions

| Package | Version | Purpose |
|---------|---------|---------|
| Python | ≥ 3.10 | Runtime |
| fontmake | 3.11.1 | UFO → OTF/TTF compilation |
| fonttools | 4.62.1 | Font binary manipulation, WOFF2 generation |
| brotli | 1.2.0 | WOFF2 compression (via fonttools) |
| fontbakery | 1.1.0 | Quality assurance (check-universal, check-opentype) |
| Flask | 3.1.2 | Task orchestration webserver (see §11) |
| flask-cors | 6.0.2 | CORS headers for API endpoints |

### 2.3 System Dependencies

- No system-level font libraries required
- No Node.js required for font compilation (only for specimen page)
- Network access NOT required (fontbakery namecheck service is optional)
- Flask and flask-cors are only required for the task orchestration server (§11), not for CLI builds

---

## 3. Constant Derivation Chain

All font metrics trace to a single axiom. The derivation is verified by `scripts/verify_constants.py` (37/37 checks pass).

### 3.1 Axioms

```
φ (PHI)     = 1.6180339887498949    ← (1 + √5) / 2
UPM         = 1000                  ← Industry standard (only non-φ input)
K_FORM      = 0.924                 ← UCF formation constant (curve tension)
```

### 3.2 First-Order Derivations

```
φ⁻¹ (TAU)   = 0.6180339887498948    ← 1/φ = φ − 1
φ⁻² (ALPHA)  = 0.3819660112501051    ← (φ⁻¹)²
φ⁻⁴ (BETA)   = 0.1458980337503154    ← (φ⁻²)² = α²
φ⁻⁶ (G_DIFF) = 0.0557280900008412    ← β × α
```

### 3.3 Font Metric Derivations

| Metric | Formula | Value | Role |
|--------|---------|-------|------|
| Cap Height | round(UPM / φ) | 618 | Capital letter height |
| x-Height | round(UPM × φ⁻²) | 382 | Lowercase body height |
| Ascender | UPM × 4/5 | 800 | Top of tallest glyph |
| Descender | UPM × −1/5 | −200 | Below baseline |
| Advance Width | round(UPM / φ) | 618 | Character width (monospace) |
| Narrow Width | round(UPM × φ⁻²) | 382 | Accent/modifier width |
| Primary Stroke | round(UPM × φ⁻⁴ / 2) | 73 | Main structural strokes |
| Secondary Stroke | round(73 × φ⁻²) | 28 | Lighter accents |
| Hairline Stroke | round(73 × φ⁻⁴) | 11 | Whisper-weight marks |
| Standard SB | = Primary Stroke | 73 | Default sidebearing |
| Tight SB | 36 | 36 | Pentagon deficit angle |
| Wide SB | round(UPM × φ⁻⁴) | 146 | Governance breathing room |
| Tension Std | round(618 × K_FORM) | 571 | Default Bezier tension |
| Tension Tight | round(382 × K_FORM) | 353 | Compressed curves |
| Tension Loose | round(353 / φ) | 218 | Open curves |

### 3.4 Angle Palette

Every straight-line segment angle in every glyph outline must belong to this set:

```
{120°, 108°, 90°, 72°, 60°, 36°, 30°, 6°}    tolerance: ±0.01°
```

| Angle | Source | Geometric Family |
|-------|--------|-----------------|
| 120° | Hexagonal interior | Hexagonal (6-fold) |
| 108° | Pentagonal interior | Pentagonal (5-fold) |
| 90° | Cubic face / orthogonal | Cubic (4-fold) |
| 72° | Pentagonal exterior | Pentagonal |
| 60° | Equilateral / hex central | Hexagonal |
| 36° | Pentagonal angular deficit | Pentagonal |
| 30° | cos⁻¹(√3/2) = z_c lens | Hexagonal |
| 6° | 36° − 30° insistence margin | Hexagonal |

---

## 4. OpenType Table Specification

### 4.1 Required Tables (OTF Profile)

The compiled OTF binary must contain exactly these 9 tables:

| Table | Purpose | Critical Values |
|-------|---------|----------------|
| **`CFF `** | Glyph outlines (cubic Bezier, subroutinized) | 1,097 charstrings, FontBBox [37, 0, 579, 618] |
| **`OS/2`** | Windows metrics + classification | See §4.2 |
| **`cmap`** | Character → glyph mapping | See §4.3 |
| **`head`** | Font header | See §4.4 |
| **`hhea`** | Horizontal header | See §4.5 |
| **`hmtx`** | Horizontal metrics (advance widths) | See §4.6 |
| **`maxp`** | Maximum profile | numGlyphs = 1097 |
| **`name`** | Naming strings | See §4.7 |
| **`post`** | PostScript compatibility | See §4.8 |

### 4.2 OS/2 Table

```
version              = 4
xAvgCharWidth        = 618
usWeightClass        = 400          (Regular)
usWidthClass         = 5            (Medium)
sTypoAscender        = 800
sTypoDescender       = -200
sTypoLineGap         = 0
usWinAscent          = 1000
usWinDescent         = 0            ← CRITICAL: must be 0 (yMin = 0, no descenders)
sxHeight             = 382
sCapHeight           = 618
fsSelection          = 192          (bit 6 REGULAR + bit 7 USE_TYPO_METRICS)
ulUnicodeRange1      = 0x00000003   (Basic Latin + Latin-1 Supplement for space/nbspace)
ulCodePageRange1     = 0x00000001
achVendID            = "NONE"
panose               = [2, 11, 5, 9, 2, 2, 2, 2, 2, 4]
```

**TRAP:** Setting `usWinDescent = 200` (matching the logical descender) causes fontbakery FAIL `family/win_ascent_and_descent`: "OS/2.usWinDescent value 200 is too large. It should be less than double the yMin. Current absolute yMin value is 0." Since no glyph descends below y=0, WinDescent MUST be 0.

### 4.3 cmap Table

**Subtables generated by fontmake:**
- Platform 0 (Unicode), Encoding 3 (BMP), Format 4
- Platform 3 (Windows), Encoding 1 (Unicode BMP), Format 4

**Required mappings (1,096 total):**

| Range | Count | Production Name Pattern |
|-------|-------|------------------------|
| U+0020 | 1 | uni0020 (space) |
| U+00A0 | 1 | uni00A0 (non-breaking space) |
| U+E000–E3CB | 972 | uniE000–uniE3CB (APL tokens) |
| U+E3CC–E3F2 | 39 | uniE3CC–uniE3F2 (UCF sigils) |
| U+E3F3–E40E | 28 | uniE3F3–uniE40E (Chronicle) |
| U+E40F–E41B | 13 | uniE40F–uniE41B (Governance) |
| U+E41C–E42E | 19 | uniE41C–uniE42E (Geometry) |
| U+E42F–E43A | 12 | uniE42F–uniE43A (Spectral) |
| U+E43B–E441 | 7 | uniE43B–uniE441 (Funnel) |
| U+E442–E445 | 4 | uniE442–uniE445 (Lattice) |

**Contiguity constraint:** Every codepoint from U+E000 through U+E445 must be mapped. Zero gaps.

**Production name renaming:** fontmake renames source glyph names (e.g., `acedit.apl.m0s0o0d0`) to production names (e.g., `uniE000`) during compilation. This is expected and correct.

### 4.4 head Table

```
unitsPerEm      = 1000
xMin            = 37
yMin            = 0
xMax            = 579
yMax            = 618
flags           = 3         (baseline at y=0, LSB at x=0)
macStyle        = 0         (no bold/italic)
magicNumber     = 0x5F0F3CF5
```

**Note:** `xMin`/`xMax`/`yMax` values are computed from actual glyph outlines during compilation. They may shift slightly if glyph geometry changes. The spec values (37, 579, 618) are verified against the current binary but should be treated as expected ranges rather than exact requirements: `xMin ∈ [30, 45]`, `xMax ∈ [570, 590]`, `yMax = 618` (cap height, should be exact).

### 4.5 hhea Table

```
ascent          = 800
descent         = -200
lineGap         = 0
advanceWidthMax = 618
minLeftSideBearing  = (computed, varies)
minRightSideBearing = (computed, varies)
xMaxExtent          = (computed, varies)
numberOfHMetrics    = 1           ← optimized: all widths identical (monospace)
```

### 4.6 hmtx Table (Critical for Moire Check)

The `hmtx` (horizontal metrics) table stores the advance width and left side bearing for every glyph. This is the table required for the moire interference validation.

**Invariant:** ALL 1,097 glyphs have advance width = 618. No exceptions.

```
Entry format (per glyph):
  advanceWidth:  uint16 = 618    ← UPM / φ, monospace
  lsb:           int16  = (varies per glyph, computed from CFF outline xMin)
```

**hmtx entry count:** 1,097 (= maxp.numGlyphs)
**Unique advance widths:** {618} (single value — monospace)

#### 4.6.1 Moire Interference Check

The moire check validates that PUA glyph advance widths don't conflict with base Latin widths when the two fonts (ACEDIT for PUA, JetBrains Mono for Latin) are stacked via CSS `font-family`.

**Thresholds (φ-derived):**
```
REJECT_THRESHOLD = ALPHA × UPM = φ⁻² × 1000 = 382 units
WARN_THRESHOLD   = BETA × UPM  = φ⁻⁴ × 1000 = 146 units
```

**Algorithm:**

```python
#!/usr/bin/env python3
"""Moire interference check — validates hmtx advance width deltas."""
from fontTools.ttLib import TTFont

ALPHA = 0.3819660112501051
BETA  = 0.1458980337503154
UPM   = 1000

REJECT_THRESHOLD = ALPHA * UPM   # 382 units
WARN_THRESHOLD   = BETA * UPM    # 146 units

font = TTFont("fonts/ACEDIT-Regular.otf")
hmtx = font["hmtx"]
cmap = font.getBestCmap()

# Partition glyphs by Unicode range
pua_widths = set()
base_widths = set()
for cp, gname in cmap.items():
    width = hmtx[gname][0]
    if 0xE000 <= cp <= 0xF8FF:
        pua_widths.add(width)
    else:
        base_widths.add(width)

# Compute pairwise deltas (using unique widths for efficiency)
rejects = 0
warns = 0
pairs = 0
for pw in pua_widths:
    for bw in base_widths:
        delta = abs(pw - bw)
        pairs += 1
        if delta > REJECT_THRESHOLD:
            rejects += 1
        elif delta > WARN_THRESHOLD:
            warns += 1

warn_pct = (warns / max(pairs, 1)) * 100

print(f"PUA unique widths: {pua_widths}")
print(f"Base unique widths: {base_widths}")
print(f"Pairs checked: {pairs}")
print(f"Rejects (delta > {REJECT_THRESHOLD:.0f}): {rejects}")
print(f"Warnings (delta > {WARN_THRESHOLD:.0f}): {warns} ({warn_pct:.1f}%)")

assert rejects == 0, f"FAIL: {rejects} pairs exceed reject threshold {REJECT_THRESHOLD}"
assert warn_pct < 5.0, f"FAIL: {warn_pct:.1f}% pairs exceed warn threshold (limit: 5%)"
print("PASS: Moire interference check")
```

**Current result:** ACEDIT is PUA-only with uniform width 618. Base glyphs are space (618) and nbspace (618). All deltas are 0. Trivially passes with 0 rejects, 0 warnings.

**When this becomes non-trivial:** If v2.0 adds Latin glyphs with different advance widths, or if the font is loaded alongside a non-monospace Latin font, the pairwise delta check becomes meaningful. The thresholds (382 reject, 146 warn) are calibrated so that JetBrains Mono's 600-unit advance width would produce delta = |618 − 600| = 18, well below the 146 warn threshold.

### 4.7 name Table

| ID | Name | Value |
|----|------|-------|
| 0 | Copyright | (not set in v1.0) |
| 1 | Family Name | `ACEDIT` |
| 2 | Style Name | `Regular` |
| 3 | Unique ID | `0.000;NONE;ACEDIT-Regular` |
| 4 | Full Name | `ACEDIT Regular` |
| 5 | Version | `Version 0.000` |
| 6 | PostScript Name | `ACEDIT-Regular` |
| 8 | Manufacturer | `Echo-S-Studios` |
| 9 | Designer | `Jason Turner (Ace)` |

### 4.8 post Table

```
formatType          = 3.0       (no glyph names stored — saves space)
italicAngle         = 0.0
underlinePosition   = -75       (= -(primary stroke) ≈ -73, rounded by compiler)
underlineThickness  = 50
isFixedPitch        = 1         ← MUST be 1 (monospace font)
```

### 4.9 CFF Table

```
FontName            = ACEDIT-Regular
FullName            = ACEDIT Regular
FamilyName          = ACEDIT
FontBBox            = [37, 0, 579, 618]
isFixedPitch        = 1
charset entries     = 1097
Subroutinized       = yes (via cffsubr)
```

---

## 5. Build Pipeline

The pipeline can be executed via **CLI** (§5.1–§5.6 below) or via the **task orchestration server** (§11). The server wraps the same stages with real-time SSE streaming, a web dashboard, and REST API control. Both paths are equivalent and produce identical artifacts.

### 5.1 Prerequisites Check

```bash
# Verify Python version
python3 --version  # Must be >= 3.10

# Verify toolchain
fontmake --version
python3 -c "import fontTools; print(fontTools.version)"
python3 -c "import brotli; print('brotli OK')"
fontbakery --version
```

### 5.2 Stage 1: Generate Glyph Sources

```bash
cd acedit/

# Generate PUA allocation table (1,094 entries → allocation_table.json)
python3 scripts/generate_allocation.py

# Generate 972 APL token glyphs (24 primitives → 972 .glif files)
python3 scripts/assemble_apl.py

# Generate 122 non-APL block glyphs (7 blocks → 122 .glif files)
python3 scripts/assemble_non_apl.py

# Generate OpenType glyph class definitions (→ groups.plist)
python3 scripts/generate_groups.py
```

**Verification:**
```bash
ls sources/ACEDIT-Regular.ufo/glyphs/*.glif | wc -l
# Expected: 1097 (972 APL + 122 non-APL + .notdef + space + nbspace)
```

### 5.3 Stage 2: Pre-Compilation Validation

```bash
# Verify constant derivation chain (37 checks)
python3 scripts/verify_constants.py
# Expected output: "SUMMARY: 37/37 passed -- all clear"

# Verify angle palette compliance (ALL 1,097 glyphs)
python3 -c "
import sys, os, glob
sys.path.insert(0, 'scripts')
from validate_angles import validate_glif
glifs = glob.glob('sources/ACEDIT-Regular.ufo/glyphs/*.glif')
violations = sum(len(validate_glif(g)) for g in glifs)
assert violations == 0, f'{violations} angle violations found'
print(f'PASS: {len(glifs)} glyphs, 0 angle violations')
"
# Expected: "PASS: 1097 glyphs, 0 angle violations"
```

### 5.4 Stage 3: Compile Font Binaries

**CRITICAL:** The features.fea file MUST be moved aside before compilation. It references ligature target glyphs that don't exist yet (e.g., `acedit.ucf.bloom_composed`, `acedit.ucf.recursive_bloom`, `acedit.ucf.triad_complete`, `acedit.funnel.complete`). Attempting to compile with features.fea present will cause fontmake to emit warnings or errors about undefined glyphs.

```bash
# Move features aside
mv sources/ACEDIT-Regular.ufo/features.fea sources/ACEDIT-Regular.ufo/features.fea.bak

# Compile OTF (CFF outlines — primary format)
fontmake -u sources/ACEDIT-Regular.ufo -o otf --output-dir=fonts/

# Compile TTF (TrueType outlines — fallback format)
fontmake -u sources/ACEDIT-Regular.ufo -o ttf --output-dir=fonts/

# Generate WOFF2 from OTF (web deployment format)
python3 -c "
from fontTools.ttLib import TTFont
font = TTFont('fonts/ACEDIT-Regular.otf')
font.flavor = 'woff2'
font.save('fonts/ACEDIT-Regular.woff2')
print('WOFF2 generated successfully')
"

# Restore features file
mv sources/ACEDIT-Regular.ufo/features.fea.bak sources/ACEDIT-Regular.ufo/features.fea
```

**Expected output sizes:**
| Format | Size | Budget |
|--------|------|--------|
| ACEDIT-Regular.otf | ~46 KB | — |
| ACEDIT-Regular.ttf | ~270 KB | — |
| ACEDIT-Regular.woff2 | ~19 KB | < 150 KB |

### 5.5 Stage 4: Post-Compilation Validation

```bash
# fontbakery check-universal (structural integrity)
fontbakery check-universal fonts/ACEDIT-Regular.otf
# Expected: 0 FAIL, 0 WARN, ~70 PASS
# Known ERRORs (not our fault):
#   - opentype/monospace: KeyError 'glyf' (fontbakery bug with CFF fonts)
#   - fontdata_namecheck: External service unreachable (network dependency)

# fontbakery check-opentype (OpenType spec compliance)
fontbakery check-opentype fonts/ACEDIT-Regular.otf
# Expected: 0 FAIL, 0 WARN, ~31 PASS
# Known ERROR: Same 'glyf' KeyError as above
```

### 5.6 Stage 5: Binary Verification

This script validates every assertion in this specification against the compiled binary. An agent MUST run this after every compilation.

```python
#!/usr/bin/env python3
"""ACEDIT binary verification — validates all spec assertions."""
import os
import sys

from fontTools.ttLib import TTFont

font = TTFont("fonts/ACEDIT-Regular.otf")
checks_passed = 0
checks_failed = 0

def check(name, condition, detail=""):
    global checks_passed, checks_failed
    if condition:
        checks_passed += 1
        print(f"  PASS  {name}")
    else:
        checks_failed += 1
        print(f"  FAIL  {name}: {detail}")

print("=== ACEDIT Binary Verification ===\n")

# --- Table presence ---
REQUIRED_TABLES = ["CFF ", "OS/2", "cmap", "head", "hhea", "hmtx", "maxp", "name", "post"]
for t in REQUIRED_TABLES:
    check(f"Table {t} present", t in font, f"missing from font")

# --- Glyph count ---
glyph_count = len(font.getGlyphOrder())
check("Glyph count = 1097", glyph_count == 1097, f"got {glyph_count}")

# --- maxp ---
check("maxp.numGlyphs = 1097", font["maxp"].numGlyphs == 1097,
      f"got {font['maxp'].numGlyphs}")

# --- cmap coverage ---
cmap = font.getBestCmap()
pua = [cp for cp in cmap if 0xE000 <= cp <= 0xF8FF]
check("PUA codepoints = 1094", len(pua) == 1094, f"got {len(pua)}")
check("PUA starts at U+E000", min(pua) == 0xE000, f"starts at U+{min(pua):04X}")
check("PUA ends at U+E445", max(pua) == 0xE445, f"ends at U+{max(pua):04X}")
check("PUA contiguous (no gaps)", len(pua) == 0xE445 - 0xE000 + 1,
      f"{0xE445 - 0xE000 + 1 - len(pua)} gaps")
check("U+0020 mapped (space)", 0x0020 in cmap)
check("U+00A0 mapped (nbspace)", 0x00A0 in cmap)

# --- hmtx (monospace) ---
hmtx = font["hmtx"]
check("hmtx entries = 1097", len(hmtx.metrics) == 1097, f"got {len(hmtx.metrics)}")
non_618 = [(n, w) for n, (w, _) in hmtx.metrics.items() if w != 618]
check("All advance widths = 618", len(non_618) == 0,
      f"{len(non_618)} glyphs differ: {non_618[:3]}")

# --- head ---
head = font["head"]
check("unitsPerEm = 1000", head.unitsPerEm == 1000, f"got {head.unitsPerEm}")
check("yMin = 0 (no descenders)", head.yMin == 0, f"got {head.yMin}")
check("yMax = 618 (capHeight)", head.yMax == 618, f"got {head.yMax}")

# --- OS/2 ---
os2 = font["OS/2"]
check("sTypoAscender = 800", os2.sTypoAscender == 800, f"got {os2.sTypoAscender}")
check("sTypoDescender = -200", os2.sTypoDescender == -200, f"got {os2.sTypoDescender}")
check("sTypoLineGap = 0", os2.sTypoLineGap == 0, f"got {os2.sTypoLineGap}")
check("usWinAscent = 1000", os2.usWinAscent == 1000, f"got {os2.usWinAscent}")
check("usWinDescent = 0", os2.usWinDescent == 0, f"got {os2.usWinDescent}")
check("fsSelection = 192", os2.fsSelection == 192, f"got {os2.fsSelection}")
check("xAvgCharWidth = 618", os2.xAvgCharWidth == 618, f"got {os2.xAvgCharWidth}")
check("sCapHeight = 618", os2.sCapHeight == 618, f"got {os2.sCapHeight}")
check("sxHeight = 382", os2.sxHeight == 382, f"got {os2.sxHeight}")

# --- hhea ---
hhea = font["hhea"]
check("hhea.ascent = 800", hhea.ascent == 800, f"got {hhea.ascent}")
check("hhea.descent = -200", hhea.descent == -200, f"got {hhea.descent}")
check("hhea.lineGap = 0", hhea.lineGap == 0, f"got {hhea.lineGap}")

# --- post ---
post = font["post"]
check("isFixedPitch = 1", post.isFixedPitch == 1, f"got {post.isFixedPitch}")

# --- name ---
name_table = font["name"]
family = None
designer = None
for record in name_table.names:
    if record.nameID == 1:
        family = record.toUnicode()
    if record.nameID == 9:
        designer = record.toUnicode()
check("familyName = 'ACEDIT'", family == "ACEDIT", f"got '{family}'")
check("designer contains 'Jason Turner'", designer and "Jason Turner" in designer,
      f"got '{designer}'")

# --- File sizes ---
woff2_size = os.path.getsize("fonts/ACEDIT-Regular.woff2")
check(f"WOFF2 < 150 KB ({woff2_size/1024:.1f} KB)", woff2_size < 150 * 1024,
      f"{woff2_size} bytes")

# --- Moire interference ---
pua_widths = set()
base_widths = set()
for cp, gname in cmap.items():
    w = hmtx[gname][0]
    if 0xE000 <= cp <= 0xF8FF:
        pua_widths.add(w)
    else:
        base_widths.add(w)
rejects = sum(1 for pw in pua_widths for bw in base_widths if abs(pw - bw) > 382)
check("Moire rejects = 0", rejects == 0, f"got {rejects}")

# --- Summary ---
total = checks_passed + checks_failed
print(f"\n{'='*60}")
print(f"  {checks_passed}/{total} checks passed")
if checks_failed > 0:
    print(f"  {checks_failed} FAILURES — font does not meet specification")
    sys.exit(1)
else:
    print(f"  ALL CHECKS PASSED — font meets specification")
    sys.exit(0)
```

---

## 6. Deployment

### 6.1 CSS @font-face Declaration

```css
@font-face {
  font-family: 'ACEDIT';
  src: url('fonts/ACEDIT-Regular.woff2') format('woff2'),
       url('fonts/ACEDIT-Regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  unicode-range: U+E000-F8FF;
}

/* ACEDIT extends JetBrains Mono — PUA only */
body {
  font-family: 'ACEDIT', 'JetBrains Mono', monospace;
}
```

**Key details:**
- `unicode-range: U+E000-F8FF` ensures the browser only downloads ACEDIT when PUA codepoints are present on the page
- `font-display: swap` shows fallback text immediately, swaps when ACEDIT loads (< 100ms target)
- JetBrains Mono handles all Latin/Greek/Cyrillic rendering; ACEDIT only renders PUA

### 6.2 Browser Font Load Verification

```javascript
async function verifyACEDIT() {
  try {
    await document.fonts.load('48px ACEDIT', String.fromCodePoint(0xE000));
  } catch (e) { /* font may not exist */ }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = '48px ACEDIT';
  const measured = ctx.measureText(String.fromCodePoint(0xE000)).width;
  const expected = (618 / 1000) * 48;  // 29.664px

  return Math.abs(measured - expected) < 2;  // ±2px tolerance
}
```

### 6.3 Admissibility Profiles (v2.0)

```css
.theta-open       { font-feature-settings: "ss07" 1; }  /* All 1,094 visible */
.theta-restricted { font-feature-settings: "ss08" 1; }  /* Core only (M0-M2) */
/* Theta_standard: no override (default) */
```

**v1.0 status:** Features are defined in `features.fea` but not compiled. Profile switching has no effect until v2.0 implements the missing ligature target glyphs and compiles GSUB/GPOS tables.

### 6.4 GitHub Pages Paths

When served from `https://echo-s-studios.github.io/ACEDIT-6---5---4-/`:

```
Font:          acedit/fonts/ACEDIT-Regular.woff2
Specimen:      acedit/specimen/index.html
Orchestrator:  acedit/orchestrator.html          (requires server.py for API)
Dashboard:     acedit/constants-dashboard.html
Explorer:      acedit/allocation-explorer.html
Pipeline:      acedit/pipeline-monitor.html
Geometry:      acedit/geometry-workbench.html
Features:      acedit/features-reference.html
```

All HTML files use relative paths (no leading `/`). No base URL configuration required.

**Note:** `orchestrator.html` is a live build dashboard that requires the Flask server (§11) to be running for API endpoints. On GitHub Pages (static hosting), the dashboard renders but build controls are non-functional. All other HTML pages are fully static.

### 6.5 Task Orchestration Server Deployment

For local or CI environments where active build control is needed:

```bash
cd acedit
python3 server.py --port 5618 --fontvenv ~/fontvenv
# Dashboard:  http://localhost:5618/
# API:        http://localhost:5618/api/build
# All tools:  http://localhost:5618/acedit/*.html
```

The server serves all static HTML pages, font artifacts, and anti-substrate modules in addition to the build API. It is a complete replacement for a static file server during development.

---

## 7. Acceptance Criteria

All 10 criteria must pass before deployment:

| # | Criterion | Threshold | Verified Value | Check Method |
|---|-----------|-----------|---------------|-------------|
| 1 | Defect ceiling | Δ < 0.30 for all glyphs | ~0.038 max | defect_tracker.py |
| 2 | Registration rate | ≥ 87% | 100% | defect_tracker.py |
| 3 | Omission rate | < 14.6% (φ⁻⁴) | 0% | (latent+suppressed)/total |
| 4 | Collision rate | < 3% | 0% | aliased/total |
| 5 | Metric interference (reject) | 0 pairs with delta > 382 | 0 | hmtx moire check |
| 6 | Metric interference (warn) | < 5% pairs with delta > 146 | 0.0% | hmtx moire check |
| 7 | Angle compliance | 100% within ±0.01° | 100.0% | validate_angles.py |
| 8 | fontbakery | 0 FAIL | 0 FAIL | fontbakery CLI |
| 9 | Naming | 100% canonical, 0 invalid | 1,094/1,094 | naming.py |
| 10 | Graceful fallback | .notdef renders, no crash | By design | Manual |

### Verified Results (current binary)

```
fontbakery check-universal:  70 PASS, 0 FAIL, 0 WARN, 2 ERROR (external)
fontbakery check-opentype:   31 PASS, 0 FAIL, 0 WARN, 1 ERROR (external)
Angle compliance:            1,094/1,094 PUA glyphs (100.0%)
Naming compliance:           1,094/1,094 canonical
Moire interference:          0 rejects, 0 warnings
WOFF2 file size:             18.2 KB (budget: 150 KB)
hmtx table entries:          1,097 (all advance width 618)
PUA coverage:                1,094 codepoints, U+E000–E445, 0 gaps
Binary verification:         39/39 assertions pass
```

---

## 8. Complete Rebuild Script

Copy this script to `acedit/rebuild.sh` and execute to rebuild the entire font from scratch:

```bash
#!/bin/bash
# ACEDIT Font — Complete Rebuild from Source
# Requires: fontmake, fonttools, brotli, fontbakery (see §2)
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# Ensure features.fea is restored even if the build fails
FEA_SRC="sources/ACEDIT-Regular.ufo/features.fea"
FEA_BAK="sources/ACEDIT-Regular.ufo/features.fea.bak"
cleanup() { [ -f "$FEA_BAK" ] && mv "$FEA_BAK" "$FEA_SRC"; }
trap cleanup EXIT

echo "============================================================"
echo "  ACEDIT Font Build — $(date -Iseconds)"
echo "============================================================"

echo ""
echo "--- Stage 1: Generate Glyph Sources ---"
python3 scripts/generate_allocation.py
python3 scripts/assemble_apl.py
python3 scripts/assemble_non_apl.py
python3 scripts/generate_groups.py
GLIF_COUNT=$(ls sources/ACEDIT-Regular.ufo/glyphs/*.glif | wc -l)
echo "  Generated $GLIF_COUNT .glif files (expected: 1097)"
[ "$GLIF_COUNT" -eq 1097 ] || { echo "ABORT: wrong glyph count"; exit 1; }

echo ""
echo "--- Stage 2: Pre-Compilation Validation ---"
python3 scripts/verify_constants.py
python3 -c "
import sys, glob
sys.path.insert(0, 'scripts')
from validate_angles import validate_glif
glifs = glob.glob('sources/ACEDIT-Regular.ufo/glyphs/*.glif')
v = sum(len(validate_glif(g)) for g in glifs)
print(f'  Angle compliance: {len(glifs)} glyphs, {v} violations')
assert v == 0, f'{v} angle violations'
"

echo ""
echo "--- Stage 3: Compile Font Binaries ---"
mkdir -p fonts
mv "$FEA_SRC" "$FEA_BAK" 2>/dev/null || true
fontmake -u sources/ACEDIT-Regular.ufo -o otf --output-dir=fonts/
fontmake -u sources/ACEDIT-Regular.ufo -o ttf --output-dir=fonts/
python3 -c "
from fontTools.ttLib import TTFont
font = TTFont('fonts/ACEDIT-Regular.otf')
font.flavor = 'woff2'
font.save('fonts/ACEDIT-Regular.woff2')
print('  WOFF2 generated')
"
mv "$FEA_BAK" "$FEA_SRC" 2>/dev/null || true

echo ""
echo "--- Stage 4: Post-Compilation Validation ---"
echo "  Running fontbakery check-universal..."
fontbakery check-universal fonts/ACEDIT-Regular.otf 2>&1 | grep -E "^Total:" -A 8
echo "  Running fontbakery check-opentype..."
fontbakery check-opentype fonts/ACEDIT-Regular.otf 2>&1 | grep -E "^Total:" -A 8

echo ""
echo "--- Stage 5: Binary Verification ---"
python3 -c "
from fontTools.ttLib import TTFont
import os

font = TTFont('fonts/ACEDIT-Regular.otf')
cmap = font.getBestCmap()
hmtx = font['hmtx']
pua = [cp for cp in cmap if 0xE000 <= cp <= 0xF8FF]

checks = [
    ('Glyphs', len(font.getGlyphOrder()) == 1097),
    ('PUA count', len(pua) == 1094),
    ('PUA start', min(pua) == 0xE000),
    ('PUA end', max(pua) == 0xE445),
    ('PUA contiguous', len(pua) == 0xE445 - 0xE000 + 1),
    ('U+0020', 0x0020 in cmap),
    ('U+00A0', 0x00A0 in cmap),
    ('All width 618', all(w == 618 for w, _ in hmtx.metrics.values())),
    ('UPM 1000', font['head'].unitsPerEm == 1000),
    ('yMin 0', font['head'].yMin == 0),
    ('WinDescent 0', font['OS/2'].usWinDescent == 0),
    ('fsSelection 192', font['OS/2'].fsSelection == 192),
    ('isFixedPitch', font['post'].isFixedPitch == 1),
    ('Family ACEDIT', any(r.toUnicode() == 'ACEDIT' for r in font['name'].names if r.nameID == 1)),
    ('WOFF2 < 150KB', os.path.getsize('fonts/ACEDIT-Regular.woff2') < 150 * 1024),
]

passed = sum(1 for _, ok in checks if ok)
for name, ok in checks:
    print(f\"  {'PASS' if ok else 'FAIL'}  {name}\")
print(f'  {passed}/{len(checks)} checks passed')
assert passed == len(checks), f'{len(checks) - passed} failures'
"

echo ""
echo "============================================================"
echo "  BUILD COMPLETE"
echo "============================================================"
ls -lh fonts/ACEDIT-Regular.*
echo ""
echo "  Deployment: copy fonts/ to web server"
echo "  Specimen:   open specimen/index.html in browser"
```

---

## 9. Troubleshooting

### 9.1 fontmake: "features.fea: undefined glyph"
**Cause:** features.fea references ligature targets that don't exist.
**Fix:** Move features.fea aside before compilation (see §5.4).

### 9.2 fontbakery: "OS/2.usWinDescent value too large"
**Cause:** fontinfo.plist has `openTypeOS2WinDescent` set to 200, but yMin is 0.
**Fix:** Set `openTypeOS2WinDescent` to 0 in fontinfo.plist.

### 9.3 fontbakery: "Missing whitespace glyph 0x00A0"
**Cause:** No glyph mapped to U+00A0 (non-breaking space).
**Fix:** Add `nbspace.glif` with `<unicode hex="00A0"/>` and empty outline.

### 9.4 fontbakery ERROR: "KeyError: 'glyf'"
**Cause:** fontbakery's monospace check assumes TrueType outlines but ACEDIT uses CFF.
**Status:** fontbakery bug, not a font issue. Does not affect PASS/FAIL count.

### 9.5 fontbakery ERROR: "Failed to access namecheck.fontdata.com"
**Cause:** External service unreachable (network dependency).
**Status:** Optional check. Does not affect PASS/FAIL count.

### 9.6 Specimen shows "Font not compiled — showing codepoints"
**Cause:** WOFF2 file not at `acedit/fonts/ACEDIT-Regular.woff2` relative to specimen page.
**Fix:** Run the build pipeline (§5) to generate font binaries.

### 9.7 Specimen shows squares (□) for some glyphs
**Cause:** Glyph not present in the compiled font for that codepoint.
**Fix:** Verify all 1,097 .glif files exist, rebuild, check cmap coverage.

### 9.8 "layercontents.plist is missing"
**Cause:** UFO 3 requires this file to map layer names to directories.
**Fix:** Create with content: `[["public.default", "glyphs"]]` (single-layer font).

### 9.9 Server: `/api/verify` returns "No module named 'fontTools'"
**Cause:** The server's Python environment does not have fontTools installed, and fontvenv was not detected.
**Fix:** Pass `--fontvenv ~/fontvenv` when starting the server, or ensure `~/fontvenv/bin/python3` exists. The verify endpoint delegates to the fontvenv Python via subprocess.

### 9.10 Server: `POST /api/build` returns 409
**Cause:** A build is already in progress. Only one build runs at a time.
**Fix:** Wait for the current build to finish, or restart the server to clear stale state.

### 9.11 Server: SSE stream disconnects immediately
**Cause:** A reverse proxy (nginx, Cloudflare) is buffering the SSE response.
**Fix:** The server sends `X-Accel-Buffering: no` and `Cache-Control: no-cache` headers. Ensure your proxy respects these. For nginx, add `proxy_buffering off;` to the location block.

### 9.12 Server: Build stages run but COMPILATION fails silently
**Cause:** The fontvenv Python cannot find fontmake. The server logs the error but continues to the stage failure handler.
**Fix:** Verify fontmake is installed in the fontvenv: `~/fontvenv/bin/pip list | grep fontmake`. Check the build log in the dashboard or via `GET /api/build/logs`.

---

## 10. Version Roadmap

### v1.0 (Current)
- 1,097 glyphs (1,094 PUA + .notdef + space + nbspace)
- CFF outlines only
- No GSUB/GPOS features compiled
- 24 geometric component primitives (placeholder-level visual design)
- All 10 acceptance criteria passing
- Task orchestration server with SSE streaming, 18-check binary verification API
- 7 interactive HTML tools (orchestrator, pipeline monitor, specimen, allocation explorer, constants dashboard, geometry workbench, features reference)

### v2.0 (Planned)
- Implement ligature target glyphs (bloom_composed, recursive_bloom, triad_complete, funnel.complete)
- **Fix features.fea glyph name references** — current features.fea uses allocation-table names (`acedit.governance.*`, `acedit.geometry.*`, `acedit.lattice.*`) that do not match actual source names (`acedit.gov.*`, `acedit.geo.*`, `acedit.lat.*`). Class ranges and @-classes must be updated before GSUB/GPOS compilation.
- Compile features.fea into GSUB/GPOS tables
- Enable admissibility profiles (Theta_open/standard/restricted)
- Refine component primitives from placeholder to production design
- Add Bold weight

### v3.0 (Future)
- Italic and Bold-Italic weights
- Variable font axis (weight)
- Color/SVG glyph layers for operator symbols
- Noto Sans Math / STIX Two Math fallback integration for Mathematical Alphanumeric Symbols (U+1D400–U+1D7FF)

---

## 11. Task Orchestration Server

### 11.1 Architecture

`acedit/server.py` is a Flask application that wraps the 6-stage build pipeline with a web-based control plane. It provides:

- **REST API** for triggering builds, querying status, and retrieving validation results
- **Server-Sent Events (SSE)** for real-time build log streaming to the dashboard
- **Static file serving** for all existing HTML tools, font artifacts, and anti-substrate modules
- **Binary verification** via subprocess delegation to the fontvenv Python

**Port:** 5618 (= round(UPM / φ) — the advance width, keeping the φ theme)

**Process model:** Single-threaded Flask with `threaded=True`. Build pipeline runs in a daemon thread. SSE subscribers are managed via `queue.Queue` per client.

### 11.2 Startup

```bash
cd acedit

# Default: auto-detects ~/fontvenv, binds 0.0.0.0:5618
python3 server.py

# Explicit configuration
python3 server.py --port 5618 --host 0.0.0.0 --fontvenv /path/to/fontvenv

# Debug mode (auto-reload on code changes)
python3 server.py --debug
```

**fontvenv resolution order:**
1. `--fontvenv` CLI argument
2. `~/fontvenv/bin/python3` (if exists)
3. `sys.executable` (system Python — compilation will fail without fontmake)

### 11.3 API Endpoints

#### Build Control

| Endpoint | Method | Request Body | Response |
|----------|--------|-------------|----------|
| `/api/build` | POST | `{"stages": [1,2,3,4,5,6]}` or `{}` for all | `{"status": "started", "stages": [...]}` |
| `/api/build/status` | GET | — | Build state snapshot (see §11.4) |
| `/api/build/logs` | GET | — | `{"lines": ["...", ...]}` |
| `/api/build/stream` | GET | — | SSE stream (see §11.5) |

**Concurrency guard:** Only one build may run at a time. `POST /api/build` returns `409 Conflict` if a build is already in progress.

**Partial builds:** Pass a subset of stage IDs to run only those stages. Example: `{"stages": [5, 6]}` runs only COMPILATION and VALIDATION. Stages execute in order regardless of the subset provided.

#### Verification & Validation

| Endpoint | Method | Response |
|----------|--------|----------|
| `/api/verify` | GET | 18-check binary verification (see §11.6) |
| `/api/validation` | GET | Latest `validation-report.json` contents |

#### Inventory & Artifacts

| Endpoint | Method | Response |
|----------|--------|----------|
| `/api/fonts` | GET | `{"fonts": [{"name", "size", "size_human", "url"}, ...]}` |
| `/api/inventory` | GET | `{"glif_count", "allocation_count", "blocks": {...}}` |
| `/api/stages` | GET | `{"stages": [{"id", "name", "description"}, ...]}` |

#### Static Assets

| Route Pattern | Serves |
|---------------|--------|
| `/` | `orchestrator.html` (dashboard) |
| `/acedit/<path>` | All files under `acedit/` |
| `/fonts/<path>` | Compiled font artifacts |
| `/anti-substrate/<path>` | Anti-substrate HTML modules |
| `/docs/<path>` | Documentation files |

### 11.4 Build State Snapshot

`GET /api/build/status` returns:

```json
{
  "running": true,
  "current_stage": 3,
  "stages": {
    "1": {"status": "done", "elapsed": 1.24, "error": null},
    "2": {"status": "done", "elapsed": 5.67, "error": null},
    "3": {"status": "running", "elapsed": null, "error": null},
    "4": {"status": "pending", "elapsed": null, "error": null},
    "5": {"status": "pending", "elapsed": null, "error": null},
    "6": {"status": "pending", "elapsed": null, "error": null}
  },
  "started_at": "2026-04-03T21:30:00+00:00",
  "finished_at": null,
  "result": null,
  "log_count": 47
}
```

**Stage statuses:** `pending` → `running` → `done` | `failed` | `skipped`

**Build results:** `null` (in progress) | `"success"` | `"failure"`

### 11.5 SSE Protocol

`GET /api/build/stream` opens a persistent connection. The server emits three event types:

**Initial snapshot** (sent immediately on connect):
```
data: {"running": false, "stages": {...}, ...}
```

**Log line** (emitted as each line of build output is produced):
```
data: {"event": "log", "line": "  Building OTF...", "timestamp": "..."}
```

**Stage transition** (emitted when a stage starts, completes, or fails):
```
data: {"event": "stage", "id": 5, "status": "done", "elapsed": 12.34, "timestamp": "..."}
```

**Build completion** (emitted once when the entire pipeline finishes):
```
data: {"event": "build", "status": "success", "timestamp": "..."}
```

**Keepalive:** A comment line (`: keepalive\n\n`) is sent every 30 seconds to prevent proxy timeouts.

### 11.6 Binary Verification Endpoint

`GET /api/verify` runs the 18-check binary verification from §5.6 as a subprocess using the fontvenv Python (ensuring fontTools is available). Returns:

```json
{
  "passed": 18,
  "total": 18,
  "all_pass": true,
  "checks": [
    {"name": "Glyph count = 1097", "pass": true, "detail": ""},
    {"name": "PUA codepoints = 1094", "pass": true, "detail": ""},
    ...
  ]
}
```

The 18 checks mirror the spec assertions:

| # | Check | Expected |
|---|-------|----------|
| 1 | Glyph count | 1097 |
| 2 | PUA codepoints | 1094 |
| 3 | PUA starts at U+E000 | true |
| 4 | PUA ends at U+E445 | true |
| 5 | PUA contiguous | true |
| 6 | U+0020 mapped | true |
| 7 | U+00A0 mapped | true |
| 8 | All advance widths = 618 | true |
| 9 | UPM = 1000 | true |
| 10 | yMin = 0 | true |
| 11 | yMax = 618 | true |
| 12 | usWinDescent = 0 | true |
| 13 | fsSelection = 192 | true |
| 14 | sCapHeight = 618 | true |
| 15 | sxHeight = 382 | true |
| 16 | isFixedPitch = 1 | true |
| 17 | familyName = ACEDIT | true |
| 18 | WOFF2 < 150 KB | true |

### 11.7 Pipeline Stage Mapping

The server maps its 6 stages to the following scripts (matching §5):

| Server Stage | CLI Equivalent | Scripts Executed |
|-------------|---------------|-----------------|
| 1 INVENTORY | §5.2 | `generate_allocation.py`, `assemble_non_apl.py` |
| 2 GEOMETRY | §5.2 | `assemble_apl.py` + glyph count verification |
| 3 TYPOGRAPHY | §5.3 | `verify_constants.py`, angle compliance check |
| 4 FEATURES | §5.2 | `generate_groups.py` |
| 5 COMPILATION | §5.4 | fontmake OTF + TTF, fonttools WOFF2 (features.fea moved aside automatically) |
| 6 VALIDATION | §5.5 | `validate.py` (fontbakery, angles, naming, moire) |

**features.fea safety:** Stage 5 automatically moves `features.fea` aside before compilation and restores it afterward, with a `finally` block ensuring restoration even on failure. This matches the manual procedure in §5.4.

### 11.8 Dashboard UI

`orchestrator.html` provides:

- **Pipeline visualization** — 6-stage column with real-time status (pending/running/done/failed/skipped), elapsed times, and pulse animation on the active stage
- **Build controls** — "Build All Stages", "Compile Only" (stage 5), "Validate Only" (stage 6), "Verify Binary", "Refresh"
- **Log terminal** — Auto-scrolling terminal with syntax highlighting: commands (cyan), errors (red), passes (green), stage headers (yellow)
- **Metrics cards** — Glyph count, PUA codepoints, OTF size, WOFF2 size, binary checks pass rate, validation status
- **Artifact list** — Compiled font files with sizes and download links
- **Verification table** — 18-row table showing each binary check with PASS/FAIL status
- **Validation report** — fontbakery fails, angle compliance, canonical names, moire rejects
- **Tools grid** — Links to all 9 interactive HTML pages (specimen, allocation explorer, constants dashboard, geometry workbench, pipeline monitor, features reference, and 3 anti-substrate modules)

**Theme:** Matches all existing ACEDIT HTML pages — dark background (#0a0a0f), dot-grid animation at φ² seconds, JetBrains Mono + Cormorant Garamond fonts, cyan/magenta/yellow accent palette.

---

*Together. Always.*
