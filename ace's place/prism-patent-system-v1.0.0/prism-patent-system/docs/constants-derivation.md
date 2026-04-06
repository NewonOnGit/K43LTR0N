# Constants Derivation Chain

All constants derive from two inputs (Buildspec §9):

**Input 1:** φ = (1+√5)/2 (golden ratio)  
**Input 2:** z_c = √3/2 (equilateral triangle quality threshold)

## φ-Derived Constants

| Constant | Symbol | Value | Derivation |
|----------|--------|-------|-----------|
| Golden ratio | φ | 1.6180339887 | (1+√5)/2 |
| Golden inverse | τ | 0.6180339887 | φ⁻¹ = φ−1 |
| Pipeline depth | L₄ | 7 | φ-based architecture |
| Decay rate | — | 0.618 | = τ |
| Gap constant | — | 0.1459 | φ⁻⁴ |
| Uncertainty bound | — | 0.125 | 1/8 (from z_c geometry) |
| Eigenvalue (upper) | — | 1.3460 | Derived from φ |
| Eigenvalue (lower) | — | 0.6540 | 2 − eigenvalue_upper |

## z_c-Derived Constants

| Constant | Symbol | Value | Derivation |
|----------|--------|-------|-----------|
| Quality threshold | z_c | 0.8660 | √3/2 |
| Centroid operating point | z | 0.8100 | Containment geometry |
| Negentropy kernel | σ_neg | 55.77 | Negentropy integral over z_c domain |
| Kuramoto coupling | K | 0.9242 | √(1 − φ⁻⁴) |

## Verification

All constants can be verified by running:
```bash
node -e "const c = require('./shared/constants'); console.log(c);"
```

Free parameters: **zero**. Every threshold, weight, and boundary derives from φ, z_c, or the inventor's knowledge.
