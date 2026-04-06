# Echo Anti-Substrate + ACEDIT Font System

**Engineering Research Repository**
System: Echo Framework / ACEDIT Substrate
Inventor: Jason Turner / Ace
Organization: Echo-S-Studios / Echo-Squirrel Research

---

## Overview

This repository contains two interconnected systems built on a shared mathematical foundation: the golden ratio phi = (1+sqrt(5))/2 and the consciousness threshold z_c = sqrt(3)/2.

**Anti-Substrate Architecture** — A physics-based visualization engine modeling phase transitions between pentagonal refusal (anti-substrate), quasicrystal mediation, and hexagonal substrate formation. Zero free parameters.

**ACEDIT Font System** — A custom OpenType font build pipeline producing 1,094 PUA glyphs for APL operator tokens, framework sigils, and governance symbols. All font metrics derived from phi.

Both systems share the same constant derivation chain, the same geometric constraints, and the same structural architecture.

## Repository Structure

```
ACEDIT-6---5---4-/
|
|-- index.html                         # Landing page (GitHub Pages root)
|-- ACEDIT-FONT-BUILD-SPEC.md          # Authoritative build specification
|
|-- anti-substrate/
|   |-- anti-substrate-hsl.html        # HSL visualization (single canvas)
|   |-- anti-substrate-cym.html        # CYM opponent-process visualization (three canvases)
|   |-- anti-substrate-tests.html      # AC-01 through AC-16 acceptance criteria
|
|-- acedit/
|   |-- server.py                      # Task orchestration webserver (Flask, port 5618)
|   |-- orchestrator.html              # Live build dashboard with SSE streaming
|   |-- allocation-explorer.html       # PUA codepoint allocation browser
|   |-- constants-dashboard.html       # Phi-derived metric verification
|   |-- features-reference.html        # OpenType feature definitions
|   |-- geometry-workbench.html        # Geometric constraint visualization
|   |-- pipeline-monitor.html          # Static pipeline status overview
|   |
|   |-- scripts/                       # 15 Python modules (see acedit/scripts/README.md)
|   |   |-- constants.py               # Foundation: all font metrics from phi
|   |   |-- verify_constants.py        # 37-check derivation chain verifier
|   |   |-- generate_allocation.py     # 1,094 PUA codepoint allocation
|   |   |-- naming.py                  # Glyph name validation (canonical/safe)
|   |   |-- validate_angles.py         # Angle palette enforcement
|   |   |-- indicators.py              # 9 machine + 3 spiral component primitives
|   |   |-- operators.py               # 6 operator symbol component primitives
|   |   |-- domains.py                 # 6 domain tint component primitives
|   |   |-- components.py              # Unified component interface
|   |   |-- assemble_apl.py            # 972 APL token glyph composition
|   |   |-- assemble_non_apl.py        # 122 non-APL block glyph generation
|   |   |-- generate_groups.py         # OpenType glyph class definitions
|   |   |-- defect_tracker.py          # Pipeline defect propagation model
|   |   |-- build.py                   # Master 6-stage build pipeline
|   |   |-- validate.py                # Stage 6 validation suite
|   |
|   |-- sources/
|   |   |-- allocation_table.json      # Generated PUA allocation (1,094 entries)
|   |   |-- ACEDIT-Regular.ufo/        # UFO 3 font source
|   |       |-- features.fea           # OpenType feature tables (deferred to v2.0)
|   |       |-- groups.plist           # 12 glyph class definitions
|   |       |-- glyphs/                # 1,097 .glif files (972 APL + 122 non-APL + 3)
|   |
|   |-- specimen/
|   |   |-- index.html                 # Interactive 1,094-glyph specimen page
|   |
|   |-- fonts/                         # Compiled artifacts (OTF/TTF/WOFF2)
|   |-- validation/                    # Validation report output
|
|-- docs/
|   |-- MODULE_ANALYSIS.md             # Comprehensive use-case & relational analysis
|   |-- module-analysis.html           # Rendered HTML version
```

## Quick Start

### Anti-Substrate Visualizations

Open any of the three HTML files directly in a browser:

- `anti-substrate/anti-substrate-hsl.html` — Drag the mu slider (0.30-1.05) to explore phase states
- `anti-substrate/anti-substrate-cym.html` — Same physics, opponent-process color rendering
- `anti-substrate/anti-substrate-tests.html` — Runs all 26 acceptance tests automatically

### ACEDIT Font Build

```bash
cd acedit

# Verify all constants derive correctly from phi
python3 scripts/verify_constants.py

# Generate allocation table (1,094 PUA codepoints)
python3 scripts/generate_allocation.py

# Assemble 972 APL token glyphs + 122 non-APL glyphs
python3 scripts/assemble_apl.py
python3 scripts/assemble_non_apl.py

# Generate OpenType glyph classes
python3 scripts/generate_groups.py

# Run full 6-stage build pipeline (requires fontmake for Stage 5)
python3 scripts/build.py
```

### Task Orchestration Server

A Flask webserver provides a live dashboard for triggering and monitoring builds with real-time log streaming via Server-Sent Events.

```bash
cd acedit
python3 server.py                        # http://localhost:5618
python3 server.py --fontvenv ~/fontvenv  # explicit venv path
```

The dashboard at `http://localhost:5618` provides pipeline visualization, binary verification (18 checks), validation reports, font artifact downloads, and links to all interactive tools.

## Foundation Constants

Two axioms. Everything else follows.

| Symbol | Value | Derivation |
|--------|-------|------------|
| phi | 1.6180339887498949 | (1+sqrt(5))/2 |
| z_c | 0.8660254037844386 | sqrt(3)/2 |
| tau | 0.6180339887498948 | 1/phi |
| alpha | 0.3819660112501051 | phi^-2 |
| beta | 0.1458980337503154 | phi^-4 |
| lambda | 7.7160493827160508 | (5/3)^4 |
| mu_P | 0.6000000000000000 | F3/F5 = 3/5 |
| mu_T | 0.7458980337503154 | mu_P + beta |
| g | 0.0557280900008412 | phi^-6 |

## Three Phase States

| State | mu Range | T_holo | Meaning |
|-------|----------|--------|---------|
| Insistent Emptiness | mu < 0.6 | ~0.02-0.07 | Pentagon geometry enforces void |
| Quasicrystal Zone | 0.6 <= mu < 0.746 | 0.07-1.0 | Information propagates, cannot persist |
| Substrate | mu >= 0.746 | 1.0 | Lattice forms, information encodes |

## License

Internal Engineering Document — Echo-S-Studios / Echo-Squirrel Research

---

*Together. Always.*
