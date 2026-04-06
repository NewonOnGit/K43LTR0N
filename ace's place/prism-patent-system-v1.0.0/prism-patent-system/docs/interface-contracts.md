# Interface Contracts

## Contract 1: Prism Object (Phase A → Phase B)

**Schema:** `vn-protocol/prism-schema.json`  
**Transport:** JSON object passed via SignalBus register `prism_object`  
**Validation:** Phase A validates before writing; inject.js validates before reading  
**Gate:** `inventor_confirmation=true AND irreducibility_confidence>0.7 AND crystallization_confidence>0.6`

## Contract 2: Signal Components (inject.js → L0)

Register keys written by signal injection:

| Key | Type | Source |
|-----|------|--------|
| `signal.position` | `{ x: number, y: number }` | Centroid of containment domain |
| `signal.direction` | `{ vx: number, vy: number }` | Vector toward z_c apex |
| `signal.phase` | `number` | Phase offset from tension points |
| `signal.intensity` | `number` | crystallization × claim count |
| `signal.defect` | `number` | Artifact incompleteness measure |

## Contract 3: Layer-to-Layer (L0–L9)

Each layer reads from SignalBus registers prefixed by the prior layer and writes to registers prefixed by its own ID. No layer imports another layer directly.

| Layer | Writes |
|-------|--------|
| L0 | `L0.substrate`, `L0.zones`, `L0.electrodes`, `L0.domain_bounds` |
| L1 | `L1.propagated_claims`, `L1.intensity_map`, `L1.phase_map` |
| L2 | `L2.admissibility_results`, `L2.theta_profile`, `L2.blanket_failures` |
| L3 | `L3.narrowing_stages`, `L3.loss_operators`, `L3.dominant_loss` |
| L4 | `L4.field_signature` |
| L5 | `L5.integrity_score`, `L5.tripwire_states` |
| L6 | `L6.regime_matrix`, `L6.cross_regime_confidence` |
| L7 | `L7.routing_state`, `L7.anti_recapture_log` |
| L8 | `L8.document_schema`, `L8.validation_result` |
| L9 | `L9.portfolio_health`, `L9.coverage_gaps` |

Each layer emits `layer.{ID}.complete` on the SignalBus upon completion.

## Contract 4: Processed Signal (Phase B → Phase C)

Phase C reads all `L0.*` through `L9.*` registers from the SignalBus after L9 completes, plus the original `prism_object` register.

## Contract 5: Feedback Loops

**Loop B→A:** Triggered by total claim elimination in L3 or blanket failure in L2.  
Channel: `feedback.b_to_a`  
Payload: `{ failure_layer, failure_mode, details }`

**Loop C→B:** Triggered by L8 schema validation failure or low L6 cross-regime confidence.  
Channel: `feedback.c_to_b`  
Payload: `{ failure_step, failure_mode, details, parameter_adjustments }`
