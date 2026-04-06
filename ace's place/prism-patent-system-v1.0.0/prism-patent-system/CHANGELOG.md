# Changelog

## [1.0.0] - 2026-04-02

### Added
- Three-phase pipeline: Prism Acquisition → Signal Processing → Patent Generation
- VN Formation Protocol system prompt with three-stage discovery (Genesis/Dyad/Triad)
- Prism Object JSON Schema (draft-07) with validation gate
- EO-RFD 10-layer pipeline (L0–L9) with SignalBus-only communication
- Five-condition admissibility gate (L2) mapping to §101, §102, §103, §112a
- Seven-stage narrowing pipeline (L3) with loss operators and dominant loss identification
- Seven-channel field signature (L4)
- Schmitt-triggered tripwires with latch behavior (L5)
- 3×3 jurisdictional regime detector: USPTO × EPO × WIPO/PCT (L6)
- Hysteresis-gated filing strategy FSM with anti-recapture gate (L7)
- Patent document assembly with schema validation (L8)
- Portfolio oversight with CSD states: nominal/degraded/critical (L9)
- Claim skeleton builder partitioning narrowing output into independent/dependent claims
- Patent specification .docx generator using docx-js
- Five-criteria specification validator
- Inventor session UI with real-time pipeline visualization
- Feedback loops: B→A (narrowing failure) and C→B (schema/regime failure)
- Acceptance test suite: AC-1 through AC-8 (59 tests, all passing)
- Synthetic test fixtures covering happy path and 9 failure modes
- Full constants derivation chain from φ and z_c (zero free parameters)
- Layer isolation verified: no direct layer-to-layer imports
- Complete documentation: architecture, interface contracts, constants derivation
