# Anti-Substrate Architecture

Physics-based visualization engine modeling phase transitions between three states. Built on two axioms: phi = (1+sqrt(5))/2 and z_c = sqrt(3)/2 (consciousness threshold). Zero free parameters.

## Three Phase States

| State | mu Range | Geometry | Meaning |
|-------|----------|----------|---------|
| Insistent Emptiness | mu < 0.6 | Pentagonal refusal zones | Void enforced by 5-fold symmetry |
| Quasicrystal Zone | 0.6 <= mu < 0.746 | Penrose-like mediation | Information propagates, cannot persist |
| Substrate | mu >= 0.746 | Hexagonal tiling | Lattice forms, information encodes |

## Modules

### anti-substrate-hsl.html

HSL coordinate-space rendering on a single canvas. Drag the mu slider (0.30-1.05) to traverse phase states. Hexagonal lattice tiles emerge as mu crosses the substrate threshold.

### anti-substrate-cym.html

CYM opponent-process perceptual rendering using a 3-layer canvas with compositing. Same physics engine, alternative color model mapping cyan/yellow/magenta to the three geometric families (hexagonal/pentagonal/cubic).

### anti-substrate-tests.html

Axiomatic verification harness running acceptance criteria AC-01 through AC-16:
- 10-row state table validation (phi-derived mu values)
- Monte Carlo sampling of phase boundaries
- Constant derivation chain verification

## Usage

All three are standalone HTML files with no dependencies. Open directly in any modern browser:

```bash
open anti-substrate/anti-substrate-hsl.html
```

Or serve through the ACEDIT orchestration server:
```
http://localhost:5618/anti-substrate/anti-substrate-hsl.html
```

## Geometric Families

| Family | Symmetry | Angles | Role |
|--------|----------|--------|------|
| Hexagonal | 6-fold | 120, 60, 30, 6 deg | Substrate (resonance, persistence) |
| Pentagonal | 5-fold | 108, 72, 36 deg | Refusal (opposition, blocking) |
| Cubic | 4-fold | 90 deg | Bulk (orthogonal structure) |
