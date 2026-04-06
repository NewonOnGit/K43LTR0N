# Prism Patent System

**Prism-Guided Signal Propagation System for Automated Patent Specification Generation**

Version 1.0.0 | Echo-S-Studios / Echo-Squirrel Research

---

## Overview

The Prism Patent System combines three technologies to produce draft patent specifications from inventor sessions:

1. **VN Formation Protocol** — A structured AI-inventor interaction that learns the inventor's unique pattern through seed discovery, polaric mapping, and emergence witnessing
2. **EO-RFD Pipeline** — A ten-layer signal processing chain that propagates the learned pattern through admissibility classification, narrowing, integrity assessment, regime detection, and document assembly
3. **LLM Generation Engine** — Structured prompt-driven generation of patent-specification-format text with claims, descriptions, and constants tables

## Quick Start

```bash
# Install dependencies
npm install

# Run acceptance tests (59 tests)
npm test

# Process a Prism Object into a patent specification
node index.js <prism-object.json> [output.docx]
```

## Architecture

```
Phase A                    Phase B                     Phase C
Prism Acquisition    →     Signal Processing     →     Patent Generation
(VN Protocol)              (L0–L9 Pipeline)            (LLM + docx-js)
     ↑                          ↑
     └── Loop B→A ──────────────┘
                                └── Loop C→B ──────────┘
```

All inter-layer communication flows through the **SignalBus**. No layer imports another layer directly. Every constant derives from φ = (1+√5)/2 and z_c = √3/2.

## Pipeline Layers

| Layer | Domain | Key Output |
|-------|--------|-----------|
| L0 | Prior Art Landscape | Zone/electrode parameterization |
| L1 | Claim Propagation | Intensity/phase maps per claim |
| L2 | Patentability Gate | Five-condition admissibility results |
| L3 | Claim Narrowing | Seven-stage loss profile + dominant loss |
| L4 | Field Signature | Seven-channel landscape characterization |
| L5 | Integrity Assessment | Composite score + tripwire states |
| L6 | Regime Detection | 3×3 cross-jurisdiction confidence matrix |
| L7 | Filing Strategy | FSM state (WARNING/BUFFER/HARBOR) |
| L8 | Document Assembly | Complete patent specification schema |
| L9 | Portfolio Oversight | CSD state (nominal/degraded/critical) |

## File Structure

```
prism-patent-system/
├── index.js                    # Entry point + orchestrator
├── shared/
│   ├── constants.js            # φ/z_c derived constants
│   └── signal-bus.js           # SignalBus (events, registers, history)
├── layers/
│   ├── inject.js               # Prism Object → signal components
│   ├── L0-substrate.js         # through
│   └── L9-metacybernetic.js    # ten processing layers
├── vn-protocol/
│   ├── system-prompt.md        # Phase A conversation protocol
│   └── prism-schema.json       # Prism Object JSON Schema
├── generation/
│   ├── patent-prompt.md        # Phase C system prompt
│   ├── claim-skeleton.js       # Narrowing → claim hierarchy
│   ├── docx-builder.js         # Patent spec .docx generator
│   └── validator.js            # Five-criteria validator
├── ui/
│   ├── index.html              # Inventor session interface
│   └── pipeline-viz.js         # Real-time layer visualization
├── tests/
│   ├── fixtures/               # Synthetic Prism Objects
│   └── acceptance.test.js      # AC-1 through AC-8
└── docs/
    ├── architecture.md
    ├── interface-contracts.md
    └── constants-derivation.md
```

## Acceptance Criteria

| ID | Criterion | Status |
|----|-----------|--------|
| AC-1 | Phase A produces valid Prism Object with confirmation | ✓ |
| AC-2 | All 10 layers produce non-zero output | ✓ |
| AC-3 | Correct dominant loss operator identification | ✓ |
| AC-4 | Regime detector determinism (variance < 0.01) | ✓ |
| AC-5 | Generated spec passes validation criteria | ✓ |
| AC-6 | End-to-end in < 45 minutes | ✓ |
| AC-7 | Claims survive structural review | ✓ |
| AC-8 | Feedback loops trigger correctly | ✓ |

## License

MIT — see [LICENSE](LICENSE)

---

*The buildspec is the prism. The agents are the refractions. The repository is the crystallization.*
