# The Three Projections — Series Index v3

## The 3+2 Structure: Forced by Discriminant Orbit-Type Classification

**Author:** Kael
**Date:** March 2026
**Layer 0:** PHASE_NEUTRAL_ENGINE.md (phase-neutral substrate, axioms)
**Layer 0.5:** METAPATTERNS.md (four meta-theorems unifying ~21 theorems)
**Layer 1:** RRR_DERIVATION_v3.md + RRR_CLOSURE_v3.md (the "+2" center)
**Layer 2:** P1, P2, P3 (the "3" projections)
**Support:** Computational, lattice, and extension documents

---

## Why This Organization

The framework's own categorical principles force the document partition. The discriminant
form Δ = 5b² − 4c² − 4cd + 4d² classifies every non-scalar element of M₂(ℝ) into
exactly three orbit types: det < 0 (P1/I²/φ), det > 0 with Δ > 0 (P2/TDL/e), det > 0
with Δ < 0 (P3/LoMI/π). No fourth orbit type exists (Theorem 1.3). The fixed locus
(identity I, center of the algebra) is unique (Theorem 4.1). This gives 3 + 1 = 4
equivalence classes on the space of theorems.

Document organization IS a Dist morphism: sorting theorems into files is a quotient map
q: (Theorems, ≈_orbit) → (Files, ≈_trivial). The framework predicts this partition has
zero free parameters, and it does.

The "+1" (R(R)=R center) is not a fourth projection. It is the center — simultaneously the
source (bridge chain derives the algebra) and the terminus (central collapse re-unifies
the projections). The center naturally splits into two companion documents:

- **DERIVATION** (Parts I–VII): The covariant direction — from {0,1} outward to sl(2,ℝ) and the three orbit types. Contains the categorical ground, bridge chain, and constant forcing.

- **CLOSURE** (Parts VIII–XIV): The contravariant direction — from the three projections back to their unity. Contains folding, anti-projections, arithmetic V(n), and the observer loop.

This split is categorically natural: the idempotent loop q∘q = q has both an "outward"
phase (from identity to quotient) and a "return" phase (re-quotienting returns to same).
Together the two documents satisfy the fixed-point equation at the document level.

---

## The Five Documents (3+1+1 = 3+2)

The "+1" is split into two companion documents: **Derivation** (the outward chain from {0,1} to the three orbit types) and **Closure** (the return, where the three projections reunify). This split is categorically natural: Derivation contains Parts I–VII (covariant direction), Closure contains Parts VIII–XIV (contravariant direction / synthesis).

| Document | Algebraic Role | Constant | Canonical Name | Content |
|----------|---------------|----------|----------------|---------|
| **R(R)=R: The Derivation** | I (center, outward) | √3 | The Derivation | Dist derivation, bridge chain {0,1}→sl(2,ℝ), orbit types, forced constants |
| **R(R)=R: The Closure** | I (center, return) | √3 | The Closure | Folding theorem, anti-projections, arithmetic V(n), observer loop, central collapse |
| **P1: I²** | R-direction (det < 0) | φ | Identity-Squared | Fibonacci matrix, Möbius dynamics, I²-dominance, Zeckendorf, baryon asymmetry |
| **P2: TDL** | h-direction (det > 0, Δ > 0) | e | Trans-Dimensional Logic | Exponential flow, level transitions, tower saturation, theory complexity |
| **P3: LoMI** | N-direction (det > 0, Δ < 0) | π | Law of Mutual Identity | Rotation closure, observer/quotient, GCD/LCM, totient ratio, AGM |

### Supporting Documents

| Document | Core Result |
|----------|-------------|
| **PHASE_NEUTRAL_ENGINE** | Layer 0: phase-neutral substrate, distinction, polarity, duality D, fixed locus |
| **METAPATTERNS** | Layer 0.5: four meta-theorems (φ̄-filtration, trichotomy, CH fixed points, resolution quantum) |
| **COMPUTATIONAL_PRIMITIVES v2** | Cl(1,1) ≅ M₂(ℝ); {R,N}=N; Koide from norms; five Jordan types |
| **COMPUTATIONAL_COMPLEXITY v2** | Signature system; thermodynamic β = ln(φ); Landauer→Bekenstein |
| **LAMBDA_PRIME_LATTICE v2** | Structured lattice Λ' ≅ ℤ⁴; 25 forced relations; Two-World Separation Theorem (§IV.6): V₄ Galois, Ext¹=0, dilogarithm bridge, nilpotent barrier |
| **KMS_SELECTION_THEOREM** | C*-dynamical system on Λ'; generator selection via KMS states |
| **BINARY_SEED_INVESTIGATION** | Complete {0,1} → Cl(1,1); Gram eigenvalues √5·φ, √5·φ̄; Clifford identification |
| **K1_DEPTH_GAP** | Observer spectral gap Δ_max(n) = d_K²·φ̄^{2^{n+1}}; cortical depth prediction |
| **LATTICE_STRATIFICATION** | Orbit type → dominant coordinate mapping; physical assignment |
| **LATTICE_DEEP_INVESTIGATION** | Unified connections between lattice layers |
| **FRAMEWORK_EXTENSIONS v2** | Speculative applications: consciousness, cryptography, self-application |
| **NN_EXPERIMENT_RESULTS** | Neural network validation of framework predictions (Machine Learning/) |

---

## The Reading Orders

### For external readers (most accessible first):

```
P1 (I²/φ)  →  P3 (LoMI/π)  →  P2 (TDL/e)  →  DERIVATION  →  CLOSURE
```

P1 requires only matrix algebra and number theory. P3 requires complex exponentials.
P2 requires Lie algebra basics. DERIVATION requires category theory. CLOSURE synthesizes all.

### For internal coherence (logical dependency):

```
PNE  →  DERIVATION (derives the algebra)  →  P1, P2, P3 (three readings)
                                                     |
                                              (central collapse)
                                                     ↓
                                                  CLOSURE
```

PNE establishes axioms. DERIVATION derives the bridge chain and defines the orbit-type
split. The three P-files develop each projection. CLOSURE contains the central collapse
theorem (I²∘TDL∘LoMI = Dist) and the observer loop — completing the cycle.

### For focused work on specific topics:

**If working on categorical foundations / algebraic derivation:**
→ Read DERIVATION alone (Parts I–VII are self-contained for this purpose)

**If working on arithmetic, folding, or observer loop:**
→ Read CLOSURE alone (prerequisites from DERIVATION are summarized in §Prerequisite)

---

## The Loop Topology

```
         DERIVATION
           ╱  │  ╲
     derives  │  derives
        ╱     │     ╲
      P1      P2      P3
        ╲     │     ╱
     collapse │  collapse
           ╲  │  ╱
          CLOSURE
              │
         synthesizes
              │
              ↓
      (returns to DERIVATION
       via shared √3 constant
       and Dist = I²∘TDL∘LoMI)
```

The two R(R)=R documents form a complementary pair:
- **DERIVATION** contains the outward chain (how you get from {0,1} to three orbit types)
- **CLOSURE** contains the return (how the three projections compose back to Dist)

Together they satisfy the fixed-point equation: applying the derivation-closure cycle
twice equals applying it once. The document split mirrors the categorical structure:
covariant (DERIVATION) vs contravariant (CLOSURE).

---

## Cross-Document Theorem Index

### R(R)=R: The Derivation (Parts I–VII½)

| Theorem | Statement | Document Location |
|---------|-----------|-------------------|
| 1.5 | Kernel of any function is equivalence relation | DERIVATION §1.2 |
| 1.7 | Morphism Forcing: preserving is the unique forced morphism class | DERIVATION §1.2 |
| 1.9 | Dist is the unique forced category | DERIVATION §1.3 |
| 2.2 | Observer = Dist quotient morphism | DERIVATION §3 |
| 3.1–3.5 | Set too weak; Rel too strong; Co-Dist wrong direction; Exact too restrictive; Dist forced | DERIVATION §2 |
| 4.1 | R(R)=R: q∘q=q is forced | DERIVATION §4 |
| 5.1 | Every Dist morphism instantiates P1, P2, P3 | DERIVATION §5 |
| 2.1 | Bridge chain: zero branching, five forced steps | DERIVATION §6 |
| 2.3 | ℂ[S₃] ≅ ℂ⊕ℂ⊕M₂(ℂ) (Artin-Wedderburn) | DERIVATION §6 |
| 3.1 | Three GL(2,ℝ) orbit types are exhaustive | DERIVATION §7 |
| 4.5 | Forcing rank: π > φ > e > √3 | DERIVATION §7 |
| 4.6 | No fifth constant forced | DERIVATION §7 |
| 5.1 | Bifurcation rigidity: sl(2,ℝ) unique | DERIVATION §6 |
| **6.1** | **Herm(M₂(ℂ)) ≅ ℝ^{1,3}: spacetime dim 4 and signature (1,3) forced** | **DERIVATION §7.8** |
| **6.2** | **SL(2,ℂ) → SO⁺(1,3): Lorentz group as double cover** | **DERIVATION §7.9** |
| 6.2a | Lorentz algebra so(1,3) ≅ sl(2,ℂ): 3 rotations + 3 boosts | DERIVATION §7.9 |
| **6.3** | **Spin-½ forced: exp(πN)=−I ⟹ 2π rotation ≠ identity** | **DERIVATION §7.9b** |
| **6.4** | **Poincaré group = SL(2,ℂ) ⋉ ℝ^{1,3}** | **DERIVATION §7.10** |
| **6.5** | **Complex Hilbert spaces forced (ℂ[S₃] + N²=−I + Dist→Hilb)** | **DERIVATION §7.11** |
| **6.6** | **Born rule forced by Gleason's theorem at dim ≥ 3** | **DERIVATION §7.11** |

### R(R)=R: The Closure (Parts VIII–XIV)

| Theorem | Statement | Document Location |
|---------|-----------|-------------------|
| 1.1 | P1, P2, P3 mutually independent (3 witnesses) | CLOSURE §8.1 |
| 1.3 | No fourth projection exists | CLOSURE §8.3 |
| 2.1 | Each projection contains the other two (6 containments) | CLOSURE §8.2 |
| 3.2 | All dualities are one (BUILD↔ANALYZE) | CLOSURE §8.3 |
| 7.1 | I²∘TDL∘LoMI = Dist (central collapse) | CLOSURE §8.4 |
| 6.3 | Anti-LoMI oscillates with period 2 | CLOSURE §9 |
| 1.2–1.3 | n=1 universal fixed point; unique | CLOSURE §10 |
| 1.6–1.7 | V(1)=0 exactly; V(n)>0 for n>1 | CLOSURE §10 |
| 3.2 | Stationary distribution at n=1 | CLOSURE §10 |
| 5.1 | 1 = arithmetic R(R)=R | CLOSURE §10 |
| 5.2 | Observer loop forced closed (K6′) | CLOSURE §11 |
| 5.6 | Meta-encoding fixed point (K7′) | CLOSURE §11 |
| 8.2 | √3 = 2·sin(2π/3) = √(−Δ_p) | CLOSURE §12 |
| 8.3 | K4 resolved via closure deficit | CLOSURE §12 |
| 8.4 | K1′: Δ_max(n) = d_K²·φ̄^{2^{n+1}}, c = 2β derived | CLOSURE §11.5 |
| **10½.7b** | **su(3) selection: exchange P on S₁×S₁ forces Sym²⊕Alt², stabilizer = SU(3)×U(1)** | **CLOSURE §10½.2** |
| 10½.7c | Standard Model gauge group su(3)⊕su(2)⊕u(1) from tower levels 1–2 | CLOSURE §10½.2 |
| **10½.7d** | **Three generations = 3 irreps of S₃ (Plancherel completeness)** | **CLOSURE §10½.2** |
| **10½.7e** | **Parity violation: construction asymmetry → su(2)_L gauged, su(2)_R not** | **CLOSURE §10½.2** |

### P1: I² / φ

| Theorem | Statement | Origin |
|---------|-----------|--------|
| 4.1 | φ uniquely forced (det=−1 over {0,1}) | TP2 |
| — | R²=R+I; Rⁿ=F(n)R+F(n−1)I | CP/BS |
| — | φ̄ = universal Möbius attractor | BS |
| 4.2 | Fibonacci → I², 100% | TP3 |
| 4.4 | Primes = I²/TDL hybrid | TP3 |
| 4.5 | Z=77.27, p<10⁻¹⁰ | TP3 |
| 4.8 | 167 non-Fibonacci I²-dominant | TP3 |
| 6.1 | Zeckendorf = R-canonical | TP3 |
| 8.5 | All three Sakharov conditions from P1 | TP4 |
| 8.6 | η = φ̄^{2n}; E_B ≈ 7.8×10⁹ GeV | TP4 |

### P2: TDL / e

| Theorem | Statement | Origin |
|---------|-----------|--------|
| 4.2 | e forced by entry normalization | TP2 |
| 5.2 | √(2k)=k iff k=2 | TP2 |
| 1.2 | TDL tower saturates at d² | TP5/TP3 |
| 1.3 | ℕ/≈_TDL = single point | TP5 |
| 2.2 | S₃ Cayley distance; C ∈ {0,1/2,1} | TP5 |
| 3.3–3.5 | Detailed balance; β=ln(φ) | TP3 |
| 3.6–3.7 | Extension to ℤ and ℚ | TP3 |

### P3: LoMI / π

| Theorem | Statement | Origin |
|---------|-----------|--------|
| 4.3 | π absolutely forced (zero ambiguity) | TP2 |
| 4.3 | HC → LoMI, 93.3% | TP3 |
| 4.6 | Totient ratio = continuous LoMI signature | TP3 |
| 4.4 | AGM Fibonacci limit ≈ 0.7975 (new) | TP5 |
| 6.2 | Fibonacci CF = [0;1,...,1,2] | TP5 |
| 6.3 | −LoMI oscillates with period 2 | TP4 |

---

## R(R)=R Appears at Every Level

| Level | Realization | Document |
|-------|-------------|----------|
| Categorical | q∘q = q (quotient idempotence) | DERIVATION §4 |
| Algebraic | R = Fibonacci matrix; Möbius attractor φ̄ | P1 |
| Physical | Herm(M₂(ℂ)) = Minkowski spacetime; SL(2,ℂ)/{±I} = Lorentz group; spin-½ = ker ≠ {I} | DERIVATION §7½ |
| Arithmetic | 1×1=1; digital_root(1)=1; GCD(1,n)=1 | CLOSURE §10 |
| Structural | BUILD=ANALYZE at n=1 | CLOSURE §8.3 |
| Meta | M(K₀,F₀,U₀) = (K₀,F₀,U₀) | CLOSURE §11 |
| Document | DERIVATION → P1,P2,P3 → CLOSURE → (returns) | This index |

---

## Problem Resolution Status

### All Resolved (13 of 13)

| Problem | Resolution | Document |
|---------|-----------|----------|
| V(n) boundary: V(1)=0 | ap(n) not digit count | CLOSURE §10 |
| Detailed balance at β→0 | Trivially valid | CLOSURE §10 / P2 §4 |
| ℤ and ℚ extension | V(−n)=V(n); p-adic | CLOSURE §10 / P2 §4 |
| Conj 3.1: √3 | 2·sin(2π/3) = √(−Δ_p) | DERIVATION §7 |
| K1′: exact Δ_max | d_K²·φ̄^{2^{n+1}}; c = 2β from MIX threshold | CLOSURE §11.5 |
| P1/Baryon: Sakharov | All three conditions proved | P1 §3 |
| MIX threshold | φ̄²/2 from Jordan-type balance | CP v2 |
| TP1 foundation | Product-kernel route (zero philosophical steps) | DERIVATION §1 |
| Bekenstein from A1–A4 | S_max = 2log₂(d_K) from compression wall | PNE §V |
| K4: Indexical Selection | δ = Err+Comp; argmin = bridge chain | CLOSURE §12 |
| n_baryon → energy | E_B = E_P × φ̄^{2n} ≈ 7.8×10⁹ GeV | P1 §3 |
| 3-way independence | Baker's theorem (unconditional) | Λ' v2 |
| 4-way: two of three cases | Baker + Lindemann; PSLQ to 10²⁵ (2000 digits) | Λ' v2 |

### Remaining Open (3)

| Problem | Status | Notes | Document |
|---------|--------|-------|----------|
| (e, π) algebraic independence | OPEN (gap narrowed) | 7 structural obstructions proved (Two-World Separation Thm). Gap = Ax-Schanuel specialization for 𝔾ₘ × SO₂. Closest route: Fresán-Jossen Exp. Period Conj. No P(e,π)=0 through deg 6 at 800 digits. | Λ' v2 §IV.6 |
| OWF threshold = φ̄² | OPEN (conditional) | Requires OWF existence | CP v2 |
| Exact particle lattice coordinates | OPEN | Orbit type determined; integer coords undetermined | LATTICE_STRATIFICATION |

### Sharpened (1)

| Problem | Status | Notes | Document |
|---------|--------|-------|----------|
| 4-way algebraic independence | SHARPENED → GAP NARROWED | Reduces to π^q ≠ e^p · (algebraic). Seven obstructions proved: V₄ Galois (Thm 4.10), dilogarithm (Thm 4.7a), D-module Ext¹=0 (Thm 4.7b), diff. Galois 𝔾ₘ×SO₂ (Thm 4.7f), nilpotent barrier (Thm 4.7e), L-function (Thm 4.7a), trace gateway (Thm 4.7c). | Λ' v2 §IV.3, §IV.6 |

### Empirically Validated (1)

| Prediction | Status | Notes | Document |
|-----------|--------|-------|----------|
| Dual-stream neural architecture | CONFIRMED | Pool−CLS remainder, decoupled gate | NN_EXPERIMENT_RESULTS |

### Newly Resolved — Physics from the Algebra (7)

| Result | Status | Notes | Document |
|--------|--------|-------|----------|
| **Spacetime dim=4, signature (1,3)** | **PROVED** | Herm(M₂(ℂ)) with det = Minkowski metric | DERIVATION §7.8 |
| **Lorentz group** | **PROVED** | SL(2,ℂ) → SO⁺(1,3) by conjugation on Herm | DERIVATION §7.9 |
| **Spin-½** | **PROVED** | ker = {I, exp(πN)} ≠ {I}; 2π ≠ I | DERIVATION §7.9b |
| **Poincaré group** | **PROVED** | SL(2,ℂ) ⋉ Herm(M₂(ℂ)) | DERIVATION §7.10 |
| **Born rule** | **PROVED** | Gleason at dim ≥ 3 (tower level ≥ 1) | DERIVATION §7.11 |
| **su(3) selection** | **PROVED** | Exchange P: Sym²⊕Alt² stabilizer = SU(3)×U(1) | CLOSURE §10½.2 |
| **Three generations** | **PROVED** | S₃ Plancherel: 1²+1²+2²=6; all 3 irreps required | CLOSURE §10½.2 |

### Structural Physics Connections (4)

| Result | Status | Notes | Document |
|--------|--------|-------|----------|
| Parity violation | STRUCTURAL | Construction asymmetry (0 vs >0 branching) → SU(2)_L only | CLOSURE §10½.2, PNE §III |
| Higgs-like mechanism | STRUCTURAL | Phase transition at λ=1/2; VEV at φ̄²; offset = φ̄³/2 | PNE §IV, EXTENSIONS §2.6c |
| Gravity (Jacobson route) | STRUCTURAL | Framework provides all 3 Jacobson ingredients | EXTENSIONS §2.6d |
| α_S ≈ φ̄³/2 | OBSERVATION (0.03%) | Strong coupling = S₃ duality gap = MP1 F₃ | EXTENSIONS §2.6b |

---

## Sorting Criterion

Every theorem T in the framework belongs to exactly one of five files:

**If T is orbit-type-specific** (involves only one of P1/P2/P3): → that P-file.

**If T is orbit-type-universal AND concerns derivation** (the algebra before the split,
the categorical ground, the bridge chain, the forcing of constants): → DERIVATION.

**If T is orbit-type-universal AND concerns synthesis** (the fixed point where all three
agree, the relationship between projections, folding, arithmetic, observer loop): → CLOSURE.

This criterion has zero free parameters. It is the Dist quotient of the theorem space
by the discriminant equivalence relation, with the center further split by the
covariant/contravariant distinction.

---

*All five documents are self-contained. A reader of any single document will find:*
- *Precise grading of what is proved vs conjectured*
- *All necessary definitions or explicit references*
- *Computational verification for every quantitative claim*
- *No overclaiming: forcing quality is graded, not asserted uniformly*
- *Explicit dependency on PHASE_NEUTRAL_ENGINE.md where foundational results are cited*

---

*R(R) = R*
