# ACEDIT Font System

Custom OpenType font build pipeline producing 1,097 glyphs (1,094 PUA + `.notdef` + space + nbspace) for APL operator tokens, UCF sigils, governance symbols, and geometric primitives. All font metrics derived from a single axiom: phi = (1+sqrt(5))/2.

## Directory Layout

```
acedit/
├── scripts/               15 Python modules — build, generation, validation
├── sources/               UFO 3 source + allocation table
│   ├── allocation_table.json
│   └── ACEDIT-Regular.ufo/
├── fonts/                 Compiled artifacts (OTF, TTF, WOFF2)
├── specimen/              Interactive glyph specimen page
├── server.py              Task orchestration webserver (Flask, port 5618)
├── orchestrator.html      Live build dashboard with SSE streaming
├── allocation-explorer.html
├── constants-dashboard.html
├── features-reference.html
├── geometry-workbench.html
└── pipeline-monitor.html
```

## Quick Start

### Full Build (6 stages)

Requires Python 3.10+ and a virtual environment with fontmake, fonttools, brotli, and fontbakery.

```bash
python3 -m venv fontvenv
fontvenv/bin/pip install fontmake fonttools brotli fontbakery

cd acedit
../fontvenv/bin/python scripts/build.py
```

### Orchestration Server

The task orchestration server provides a web dashboard for triggering and monitoring builds with real-time log streaming.

```bash
cd acedit
python3 server.py                    # http://localhost:5618
python3 server.py --fontvenv ~/fontvenv  # explicit venv path
```

**API endpoints:**

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/` | GET | Live orchestrator dashboard |
| `/api/build` | POST | Start build (`{"stages": [1,2,3,4,5,6]}`) |
| `/api/build/status` | GET | Build state snapshot |
| `/api/build/stream` | GET | SSE real-time event stream |
| `/api/verify` | GET | 18 binary verification checks |
| `/api/validation` | GET | Latest validation report |
| `/api/fonts` | GET | Compiled artifacts with sizes |
| `/api/inventory` | GET | Glyph counts and block allocation |

### Interactive Tools

All HTML pages work as static files or served through the orchestration server:

| Page | Purpose |
|------|---------|
| `orchestrator.html` | Live build dashboard with pipeline control |
| `pipeline-monitor.html` | Static pipeline status overview |
| `specimen/index.html` | Interactive 1,094-glyph specimen |
| `allocation-explorer.html` | PUA codepoint allocation browser |
| `constants-dashboard.html` | Phi-derived metric verification |
| `geometry-workbench.html` | Geometric constraint visualization |
| `features-reference.html` | OpenType feature definitions |

## Build Pipeline Stages

| Stage | Name | Script | Purpose |
|-------|------|--------|---------|
| 1 | INVENTORY | `generate_allocation.py`, `assemble_non_apl.py` | Allocation table + non-APL glyphs |
| 2 | GEOMETRY | `assemble_apl.py` | 972 APL token glyphs from 24 primitives |
| 3 | TYPOGRAPHY | `verify_constants.py`, `validate_angles.py` | Constant chain + angle compliance |
| 4 | FEATURES | `generate_groups.py` | OpenType glyph class definitions |
| 5 | COMPILATION | fontmake + fonttools | OTF, TTF, WOFF2 binaries |
| 6 | VALIDATION | `validate.py` | fontbakery, naming, angles, moire check |

## Glyph Blocks

| Block | Count | Codepoints | Geometric Family |
|-------|-------|------------|-----------------|
| APL_CORE | 972 | U+E000-E3CB | hexagonal |
| UCF_SIGIL | 39 | U+E3CC-E3F2 | hexagonal |
| CHRONICLE | 28 | U+E3F3-E40E | hexagonal |
| GOVERNANCE | 13 | U+E40F-E41B | cubic |
| GEOMETRY | 19 | U+E41C-E42E | pentagonal |
| SPECTRAL | 12 | U+E42F-E43A | pentagonal |
| FUNNEL | 7 | U+E43B-E441 | cubic |
| LATTICE | 4 | U+E442-E445 | cubic |

## Acceptance Criteria

All 10 must pass before deployment. See `ACEDIT-FONT-BUILD-SPEC.md` for thresholds and verification methods.
