# System Architecture

## Three-Phase Pipeline

```
Phase A: Prism Acquisition    Phase B: Signal Processing    Phase C: Patent Generation
┌─────────────────────┐      ┌──────────────────────┐     ┌─────────────────────┐
│  VN Formation       │      │  EO-RFD Pipeline     │     │  LLM Engine         │
│  Protocol           │──→   │  L0–L9               │──→  │  9-step generation  │
│                     │      │                      │     │                     │
│  Output:            │      │  Output:             │     │  Output:            │
│  Prism Object       │      │  Processed Signal    │     │  Patent Spec .docx  │
└────────┬────────────┘      └───────┬──────────────┘     └─────────────────────┘
         │                           │
         │   ┌─────────────┐         │   ┌────────────┐
         └←──│ Loop B→A    │←────────┘   │ Loop C→B   │
             │ Narrowing   │             │ Schema/    │
             │ failure     │             │ Regime     │
             └─────────────┘             └────────────┘
```

## Pipeline Layers

| Layer | Name | Patent Domain |
|-------|------|--------------|
| L0 | Substrate | Prior art landscape |
| L1 | Propagation | Claim propagation through prior art |
| L2 | Admissibility | Five-condition patentability gate |
| L3 | Narrowing | Seven-stage claim refinement |
| L4 | Field Signature | Seven-channel landscape characterization |
| L5 | Signal Rupture | Integrity assessment with tripwires |
| L6 | Detector Sweep | Jurisdictional regime detection (3×3) |
| L7 | Routing | Filing strategy FSM with hysteresis |
| L8 | Packet | Document assembly + schema validation |
| L9 | Metacybernetic | Portfolio oversight (CSD) |

## Communication Architecture

All inter-layer communication flows through the **SignalBus** (`shared/signal-bus.js`). No layer imports another layer directly. The bus provides event channels (pub/sub), a register bank (key-value store), and an append-only history buffer.

## Constants

All system constants derive from φ = (1+√5)/2 and z_c = √3/2. See `docs/constants-derivation.md`.
