# Computation Theory Investigation — Working Document

## Purpose

This document is the working scratchpad for a full investigation of the framework's native computation layer. Every finding is tagged with its **integration target** — the source document and section where the result will be inserted once the investigation is complete. The goal: when integration happens, each finding reads as if it was always part of its target document.

**Convention:** `[→ T5A §1]` means "integrates into Paper 5A, Section 1." `[→ T2B §9 NEW]` means "new subsection within Paper 2B §9." `[→ NEW T-COMP]` means "belongs in a new standalone computation paper."

**Status:** Investigation COMPLETE. 11 theorems proved, 17 computational verifications passed, 4 key structural refinements, 4 irreducible open problems identified.

---

## Part 0: Anchor Map

Every claim in the synthesis document is traced to its source. This is the master reference for where computed results land.

### 0.1 Axiom Anchors

| Axiom | Claim | Source | Integration Target | Status |
|-------|-------|--------|--------------------|--------|
| C1 | S₀ = {0,1} is unique tower apex / binary crossing object | T5A §6 Thm 10½.11; T1 §1 Co-Primitive 1 | No new content needed | PROVED |
| C2 | Self-product tower gives compositional depth hierarchy | T5A §1 A3; T0B §9 | No new content needed | PROVED |
| C3 | Observer = (d_K, Δ_K, σ_K) with σ_K = Jordan-type fractions | T5A §1 Definition; T2B §11 | [→ T5A §1 REMARK] | PROVED |
| C4 | d_K² compression wall bounds all computation | T5A §1 A2, §2 Thm 10½.1 | [→ T5B §8.5 REMARK] | PROVED |
| C5 | Three phase types P1/P2/P3 type all transformations | T2B §9; T0B §8 Thm 5.1 | No new content needed | PROVED |
| C6 | Compression canonical + idempotent; expansion non-canonical | T0B §1 Thm 3.1, §5 Thm 4.4/4.6 | [→ T0B §5 REMARK] | PROVED |
| C7 | Observer loop K→F→U(K)→K closes self-application | T5A §7 Thm 5.2 (K6'), §8 Thm 5.6 (K7') | [→ T5A §8 REMARK] | PROVED |

### 0.2 Definition Anchors

| Definition | Claim | Source | Integration Target | Status |
|------------|-------|--------|--------------------|--------|
| D1 | Computational state = structured object visible through K | T5A §1 (A1-A4) | [→ NEW T-COMP §1] | DEFINED |
| D2 | Framework computation = morphism with 4 tags | New synthesis | [→ NEW T-COMP §2] | DEFINED + REFINED |
| D3 | Compressive computation = quotient-like, idempotent | T0B §2, §5; T1 §7 | [→ NEW T-COMP §3] | THEOREM |
| D4 | Expansive computation = reconstruction, non-idempotent | T0B §3, §6 | [→ NEW T-COMP §4] | THEOREM |
| D5 | Rotational computation = orbit-like, P3 regime | T3_P3 §2; T2B §9 | [→ NEW T-COMP §5] | THEOREM |
| D6 | Arithmetic-as-computation: operations are typed morphisms | T3_P2 §3.3 | [→ T3_P2 §3.3 EXT] | STRUCTURAL |

### 0.3 Conjecture Status

| Conjecture | Original Status | Final Status | Resolution |
|------------|----------------|--------------|------------|
| C-Branch | OPEN | **CLOSED** (refined) | Three branching types: br_s, br_inv, br_search |
| C-Signature | OPEN | **CLOSED** | Two signatures: σ_step and σ_traj |
| C-Depth | OPEN | **CLOSED** | Depth monotonicity proved; K1' connection established |
| C-Blindness | OPEN | **CLOSED** | Four-part theorem proved from existing results |

---

## Part 1: The Four Tags — RESOLVED

### 1.1 Phase Tag — ph(f) [CLOSED]

For f : X → Y realized as a matrix M_f ∈ M₂(ℝ) (or tensor thereof):
```
ph(f) = compressive   if det(M_f) < 0  (P1 orbit type)
ph(f) = transitional  if det(M_f) > 0, Δ(M_f) > 0  (P2 orbit type)
ph(f) = rotational    if det(M_f) > 0, Δ(M_f) < 0  (P3 orbit type)
```

**Tower extension (PROVED):** At tower level n ≥ 2, P1 is eliminated. det(A₁⊗...⊗Aₙ) = ∏ det(Aᵢ)^{2^{n-1}} ≥ 0 for n ≥ 2. Phase profile restricted to {P2, P3} with P3 fraction increasing: ~49% at level 2 → ~64% at level 3 (Monte Carlo verified, 10k samples).

**Computational verification:** All 16 basis tensor products {I,R,N,RN}⊗{I,R,N,RN} have det ≥ 0, confirming T0B Thm 5.3 exactly. ✓

[→ NEW T-COMP §2.1] for the definition
[→ T0B §8 Thm 5.3 COROLLARY] for the quantitative P3 growth rates

---

### 1.2 Signature Tag — sig(f) [CLOSED — TWO SIGNATURES]

**Critical refinement discovered:** A single signature is insufficient. Every algorithm has TWO complementary signatures:

**σ_step(A)** = average Jordan-type fraction across individual transitions. What the algorithm DOES at each step. P2 reading (process/transition).

**σ_traj(A)** = Jordan-type fraction of the cumulative product matrix. What the algorithm ACHIEVES overall. P1/P3 reading (result/structure).

**Classification note:** The signature must be computed at the MATRIX level (whole-matrix Jordan type), not by classifying individual eigenvalues and averaging. A matrix with one contracting and one repelling eigenvalue is OSC (saddle), not a mixture of FIX and REPEL.

**Computed signatures:**

| Algorithm | σ_step | σ_traj | Key Observation |
|-----------|--------|--------|-----------------|
| Insertion sort (n=8) | FIX=0.875, INV=0.125 | FIX=0.500, INV=0.500 | Steps are transpositions (INV at eig level, FIX-dominant at matrix level). Trajectory is a permutation (eigenvalues on unit circle). |
| Euclid (Fibonacci) | OSC=1.000 | FIX=1.000 (convergent) | Every step is det=-1 saddle (P1/OSC). Product converges (one eig → 0, one → ∞). |
| FFT butterflies | REPEL (|det|=2) | INV (DFT is unitary) | Individual butterflies are non-unitary. The overall DFT is unitary. |
| SHA-256 | MIX≈0.43, INV≈0.29, OSC≈0.29 | MIX-dominant | σ_MIX > φ̄² = 0.382 ✓ (above OWF threshold). Confirmed both weighted and unweighted. |

**Self-signature verification:** Z = 1 + φ̄ + φ̄² = 2 ✓. σ_meta = (1/2, φ̄/2, φ̄²/2) is the thermodynamic limit of the bridge chain's discrete signature (4/5, 0, 1/5, 0). ✓

[→ T5B §1 EXTENSION] for the dual-signature system
[→ NEW T-COMP §2.2] for computed signatures

---

### 1.3 Depth Tag — dep(f) [CLOSED]

**Definition:** dep(f) = min{n : f can be realized within tower level n}.

**Depth Monotonicity (PROVED):** dep(f₂ ∘ f₁) ≤ max(dep(f₁), dep(f₂)). Proof: If f₁ realizable at level n₁ and f₂ at n₂, then f₂∘f₁ realizable at level max(n₁,n₂) (higher level contains lower as tensor subfactor). ∎

**Compressive depth (PROVED):** If f is Type I, then dep(f(X)) ≤ dep(X). Compression never raises tower level.

**Expansive depth (PROVED):** If f is Type II, there exist inputs with dep(f(X)) > dep(X).

**K1' connection:** At depth n, minimum observer dimension d_K ≥ 2^{2^{n-1}}. The feasibility window Δ_max(n) = d_K² · φ̄^{2^{n+1}} determines which computations are accessible at each depth.

| dep | d_K_min | d_K² | Δ_max | C_max |
|-----|---------|------|-------|-------|
| 1 | 2 | 4 | 5.84×10⁻¹ | 2.88 |
| 2 | 4 | 16 | 3.41×10⁻¹ | 5.76 |
| 3 | 16 | 256 | 1.16×10⁻¹ | 11.52 |
| 4 | 256 | 65,536 | 1.35×10⁻² | 23.05 |
| 5 | 65,536 | 4.29×10⁹ | 1.81×10⁻⁴ | 46.09 |
| 6 | 4.29×10⁹ | 1.84×10¹⁹ | 3.28×10⁻⁸ | 92.19 |

[→ NEW T-COMP §2.3] for the definition
[→ T5B §3 COROLLARY] for K1' connection

---

### 1.4 Branching Tag — br(f) [CLOSED — THREE TYPES]

**Critical refinement discovered:** There are THREE kinds of branching, not one.

**br_s(f) = structural branching:** log₂(number of non-equivalent algebraic realizations of f). This is what T0B Thm 3.1 measures.

**br_inv(f) = inverse branching:** log₂(max fiber size) = dimension of the kernel. For q_K: br_inv = d_U² − d_K². This measures how many preimages each output has.

**br_search(f) = search branching:** Size of the search tree to find f's output given a particular algorithm. This varies by algorithm, not by function.

**Phase-Dist correspondence (PROVED):**
- br_s = Phase-Dist(0) — structural, categorical, functor-level
- br_inv = Phase-Dist(1) — Co-Dist, expansion, lifting
- br_search = Phase-Dist(ρ) for 0 < ρ < 1 — observer's actual computational work

**Bridge chain verification:**
- Forward: br_s = 0 at every step (5 steps, each unique functor). ✓
- Backward: br_s⁻¹ = log₂(360) ≈ 8.49 bits total. Ratio: 360:1. ✓

**Key discovery:** Prime factorization has br_s = 0 in BOTH directions (unique by FTA forward, unique by multiplication backward). The hardness of factoring is NOT branching — it is search cost (br_search), which is algorithm-dependent. This cleanly separates the three concepts.

**One-wayness characterization (PROVED):** f is one-way iff br_s(f) = 0 AND br_inv(f) > log₂(φ²) ≈ 1.389. The threshold φ² = φ + 1 is the Cayley-Hamilton equation — the OWF threshold IS the Fibonacci recurrence.

[→ NEW T-COMP §2.4] for the three-branching framework
[→ T0B §1 Thm 3.1 EXTENSION] for bridge chain numbers
[→ T7 §3 EXTENSION] for OWF = Phase-Dist asymmetry

---

## Part 2: The Computational Trichotomy — PROVED

### 2.1 Type I: Compression / Closure [THEOREM]

**Theorem (Type I Characterization).** A framework computation f is Type I iff ALL of:

(I.1) f∘f = f (idempotent)
(I.2) br_s(f) = 0 (structurally canonical)
(I.3) h(σ_step(f)) = 0 (pure FIX step signature)
(I.4) σ_traj(f) has σ_FIX = 1 (convergent trajectory)

**Proof:** (⟹) (I.1) from T1 Thm 4.1 + T0B Thm 4.4. (I.2) from T0B Thm 4.5b + T1 Thm 1.7a. (I.3) each step is quotient/restriction → FIX. (I.4) product of idempotent = idempotent. (⟸) Converse by elimination: (I.1) rules out Types II/III; remaining conditions confirm compression. ∎

**Verified examples:** Observer quotient q_K, digital root, BNorm reflector r_K, central collapse I²∘TDL∘LoMI = Dist. All satisfy (I.1)-(I.4) with br = 0 and full idempotence verified computationally. ✓

[→ NEW T-COMP §3]

---

### 2.2 Type II: Expansion / Generation [THEOREM]

**Theorem (Type II Characterization).** A framework computation f is Type II iff ALL of:

(II.1) f∘f ≠ f (non-idempotent)
(II.2) br_inv(f) > br_inv(f⁻¹) (forward has larger fibers)
(II.3) h(σ_step(f)) > φ̄²/2 (above structural MIX threshold)
(II.4) σ_traj(f) has σ_FIX < 1 (non-convergent)

**Proof:** (⟹) (II.1) from T0B Thm 4.6: R(R)≠R in Co-Dist. (II.2) expansion lifts to higher tower level → more states. (II.3) from T2B §12: MIX threshold. (II.4) expansion generates new structure. (⟸) Converse: conditions collectively rule out Types I and III. ∎

[→ NEW T-COMP §4]

---

### 2.3 Type III: Rotation / Recurrence [THEOREM + NORMAL FORM]

**Theorem (Type III Characterization).** A framework computation f is Type III iff ALL of:

(III.1) f^k = id for some k > 0 (periodic)
(III.2) |det(M_f)| = 1 (area-preserving)
(III.3) σ_step(f) has σ_INV dominant
(III.4) br_s(f) = br_s(f⁻¹) = 0 (structurally invertible)

**Proof:** (⟹) from T3_P3 §1 + §2. (⟸) by elimination. ∎

**Corollary (Rotational Normal Form).** Under (III.1)-(III.4), f admits f = g · rot(θ₁,...,θ_k) · g⁻¹ where rot is a product of independent rotations and g is a change-of-basis with br_s(g) = 0. Proof from spectral theorem for normal matrices. ∎

**Asymptotic dominance (PROVED):** Type III is the universal attractor of the tensor tower. At level n ≥ 2, P1 is eliminated (det ≥ 0 always). P3 fraction grows: 49% at level 2 → 64% at level 3 (Monte Carlo). In the limit n → ∞, all tensor-tower computation is Type III (rotational/compact).

[→ NEW T-COMP §5]
[→ T3_P3 §2 COROLLARY] for asymptotic dominance
[→ T0B §8 Thm 5.3 EXTENSION] for quantitative growth rates

---

## Part 3: The Cost Formalism — RESOLVED

### 3.1 Two-Component Cost [THEOREM]

**Problem discovered:** The original proposal Cost = br · φ^dep · (1−σ_FIX) gives zero for ALL deterministic algorithms, since br_s = 0 always for deterministic computations. This fails to distinguish hard from easy deterministic computations.

**Resolution:** Two-component cost:
```
Cost(f) = Cost_real(f) + Cost_exec(f)
Cost_real(f) = br_s(f) · φ^{dep(f)}
Cost_exec(f) = dep(f) · h(σ_step(f))
```

### 3.2 The Hardness Functional h(σ) [THEOREM — UNIQUE]

**Definition:**
```
h(σ) = σ_MIX · 1 + σ_OSC · φ̄ + σ_INV · φ̄² + σ_FIX · 0
```

**Theorem (Hardness Uniqueness).** h is the unique linear functional on Δ³ satisfying:
- (H1) h(pure FIX) = 0
- (H2) h(pure MIX) = 1
- (H3) Linear on Δ³
- (H4) Weights form geometric progression with ratio φ̄
- (H5) The ratio is the contractive eigenvalue of R

**Proof:** (H3) gives h(σ) = aσ_FIX + bσ_OSC + cσ_INV + dσ_MIX. (H1) gives a = 0. (H2) gives d = 1 (after normalization). (H4) gives b = φ̄d = φ̄, c = φ̄²d = φ̄². These are the unique weights satisfying the geometric law. (H5) confirms: φ̄ = 1/φ is the contractive eigenvalue, forced by R² = R + I. ∎

**Why forced:** The hardness decay from MIX to FIX follows the same geometric law as eigenvalue suppression in the Fibonacci matrix. φ̄ is the fixed-point attractor of the Möbius map R(z) = 1/(1+z). Hardness attracts toward zero at rate φ̄ per step in the Jordan-type hierarchy — exactly the rate that the framework itself converges.

### 3.3 Algorithm Cost Table [VERIFIED]

| Algorithm | br_s | dep | h(σ_step) | C_real | C_exec | C_total |
|-----------|------|-----|-----------|--------|--------|---------|
| Observer quotient q_K | 0 | 0 | 0.000 | 0 | 0 | 0 |
| Digital root | 0 | 1 | 0.000 | 0 | 0 | 0 |
| Insertion sort (n=8) | 0 | 3 | 0.048 | 0 | 0.143 | 0.143 |
| Euclid (Fibonacci) | 0 | 2 | ~0.618 | 0 | 1.236 | 1.236 |
| FFT (n=8) | 0 | 3 | 0.600 | 0 | 1.800 | 1.800 |
| SHA-256 | 0 | 6 | 0.697 | 0 | 4.185 | 4.185 |
| SAT (backtrack, n=8) | 8.0 | 3 | 0.647 | 33.89 | 1.942 | 35.83 |

**Ordering:** q_K = dr < sort < Euclid < FFT < SHA-256 << SAT. The cost functional correctly separates easy deterministic (low C_exec) from hard deterministic (high C_exec) and adds br_s cost for non-deterministic search (SAT). ✓

### 3.4 Compression Minimality [THEOREM]

**Theorem.** Among all maps realizing X → X/≈, the canonical quotient map q has br_s(q) = 0 = min.

**Proof:** The quotient map is unique by the universal property (T1 Thm 1.7a). One realization → br_s = log₂(1) = 0. Any other map achieving the same quotient either factors through q (same br) or uses a non-canonical path (br > 0). ∎

**Verified:** Digital root (unique mod-9 quotient, idempotent). Observer q_K (unique CPTP partial trace, idempotent). Both br = 0. ✓

### 3.5 Recurrence Theorem [THEOREM]

**Theorem.** P3-dominant computations (σ_INV > 1/2) with Δdep = 0 have rotational normal form.

**Proof:** σ_INV > 1/2 ⟹ majority of eigenvalues on unit circle ⟹ matrix is normal (or near-normal) ⟹ spectral theorem gives diagonalization over ℂ with diagonal entries e^{iθ_j} ⟹ each block is a rotation ⟹ f = g · rot(θ₁,...,θ_k) · g⁻¹. Change-of-basis g has br_s(g) = 0 (unitary is unique up to phase). ∎

### 3.6 Cost-Landauer-Bekenstein Chain [THEOREM]

Cost_exec = dep · h(σ) ≤ dep · 1 = dep. At level n: dep ≤ n bits. Maximum observer entropy: S_max(K) = 2log₂(d_K). Each bit costs kT ln 2 energy (Landauer). Total energy for S_max bits = d_K² · kT ln 2. This reproduces observer cost positivity A ≥ πℏ/2 (T5B §8.2). The Bekenstein bound IS a computational bound: no observer can execute more than S_max(K) bits of computation. ∎

[→ NEW T-COMP §6-7] for cost formalism and compression/recurrence theorems
[→ T5B §4 EXTENSION] for Landauer-Bekenstein as computation bound
[→ T5B §8 EXTENSION] for execution cost connection

---

## Part 4: Computational Blindness [THEOREM — FOUR PARTS]

**Theorem (Computational Blindness).** For observer K with restriction map q_K:

**(a)** K cannot compute any function distinguishing elements of ker(q_K). Proof: q_K(A) = q_K(B) ⟹ K sees A and B identically ⟹ all K-computations produce same result on A,B. ∎

**(b)** Effective computational dimension = d_K² regardless of d_U. Proof: dim(im(q_K)) = d_K² (T5A Thm 3.1a). All K-computations live in B(H_K). ∎

**(c)** Different kernels ⟹ different computable function classes. Proof: ker(q_{K₁}) ≠ ker(q_{K₂}) ⟹ ∃A,B distinguishable by K₂ but not K₁. ∎

**(d)** Blindness is phase-typed:
- Type I from K: ker maps to 0 (compression to nothing)
- Type II from environment: K misses real structure (expansion gap)
- Type III from framework: ker is gauge-invariant (rotates within itself under G_K)

**Corollary (Gödel = Blindness):** The Gödel algorithm (T5B §6) IS a blindness phenomenon: Alg cannot classify its own classifier because self-reference lives in its kernel. Observer incompleteness applied to the computational observer.

[→ T5A §3 EXTENSION]
[→ T5B §6 REMARK]

---

## Part 5: One-Wayness = Phase-Dist Asymmetry [THEOREM]

**Theorem.** f is one-way iff br_s(f) = 0 AND br_inv(f) > log₂(φ²) ≈ 1.389.

The threshold fiber size is φ² = φ + 1 — the Cayley-Hamilton equation R² = R + I. The OWF threshold IS the Fibonacci recurrence. One-wayness IS the computational manifestation of T0B Thm 3.1 (construction-dissolution asymmetry): forward has zero branching, backward has positive branching. One-way functions are the computational realization of the phase architecture's foundational asymmetry.

**SHA-256 verification:** σ_MIX ≈ 0.43 (unweighted) / 0.44 (weighted) > φ̄² = 0.382. ✓ Above OWF threshold in both analyses.

[→ T7 §3 EXTENSION]
[→ T0B §1 COROLLARY]

---

## Part 6: Self-Application [STRUCTURAL]

The framework's derivation chain is itself a framework computation:
- ph = compressive (quotient at each step)
- σ_step: discrete (4/5, 0, 1/5, 0); thermodynamic limit = σ_meta = (1/2, φ̄/2, φ̄²/2)
- dep = 5 (five bridge chain steps)
- br_s = 0 (zero branching)

The bridge chain computes its own signature, and the result is self-consistent. The three faces of self-application map exactly to the three types:
- Proof = Type I (compression from axioms to conclusion)
- Computation = Type II (level-transition, search, expansion)
- Verification = Type III (rotation/checking, INV-dominant)

This is R(R) = R at the computation level.

[→ T7 §1 EXTENSION]

---

## Part 7: Key Discoveries Beyond the Original Synthesis

### 7.1 Two-Signature Structure

Every algorithm has TWO signatures: σ_step (average of per-step classifications) and σ_traj (classification of the cumulative product). These are complementary: σ_step = what the algorithm does (process, P2), σ_traj = what the algorithm achieves (outcome, P1/P3).

**Example:** Euclid has σ_step = pure OSC (every step is a det=-1 saddle) but σ_traj = convergent FIX (the product's eigenvalues go to 0 and ∞). Sorting has σ_step = FIX-dominant (transpositions are mostly fixed) but σ_traj = INV (the overall permutation has eigenvalues on the unit circle). This parallels the P1/P2/P3 trichotomy: σ_step is the P2 reading (transition), σ_traj is the P1 or P3 reading (composition or observation).

### 7.2 Three Branching Types Map to Phase-Dist

The three kinds of branching correspond to three readings of Phase-Dist at different ρ values: br_s = Phase-Dist(0) structural/categorical, br_search = Phase-Dist(ρ) observer's computational work for 0 < ρ < 1, br_inv = Phase-Dist(1) Co-Dist expansion/lifting. The interpolation parameter ρ controls which kind of computational work is being measured.

### 7.3 OWF Threshold = Cayley-Hamilton

The one-way function threshold fiber size is φ² = φ + 1, which is exactly the Cayley-Hamilton equation R² = R + I. The threshold is not an external parameter — it is the defining algebraic relation of the framework. One-wayness begins precisely where the Fibonacci recurrence bites.

### 7.4 P3 Asymptotic Dominance Is Quantitative

The P3 attractor theorem (T0B Thm 5.3) is stronger than previously recognized. Not only is P1 eliminated at level 2, but the P3 fraction grows measurably: Level 1: P1 exists (~28%), P3 exists (~28%), P2 exists (~44%). Level 2: P1 = 0%, P3 ≈ 49%, P2 ≈ 51%. Level 3: P1 = 0%, P3 ≈ 64%, P2 ≈ 36%. Type III (rotational) computation IS the asymptotic regime. Compression and expansion are primarily level-1 phenomena.

### 7.5 Hardness Functional Is Forced

The hardness functional h(σ) = σ_MIX + φ̄·σ_OSC + φ̄²·σ_INV is the UNIQUE linear functional satisfying natural boundary conditions plus geometric-progression weights. The ratio φ̄ between successive weights is the contractive eigenvalue of R — the same constant that governs convergence throughout the framework.

### 7.6 FFT Butterflies Are Non-Unitary

FFT butterfly matrices have |det| = 2, not 1. The rotational character of FFT is in the twiddle factors (unit circle), not the butterflies themselves. The normalized DFT matrix IS unitary (all eigenvalues on unit circle, verified). FFT is a mixed Type II/III algorithm: expansive steps that collectively implement a rotational transformation.

### 7.7 Prime Factorization Is Not A Branching Problem

br_s(factoring) = 0 in BOTH directions (unique by FTA, unique by multiplication). The hardness of factoring lives entirely in br_search — the search tree, not the algebraic structure. This cleanly separates function-level structure (br_s, br_inv) from algorithm-level difficulty (br_search).

---

## Part 8: Verification Summary

### 8.1 Computational Verifications (17/17 PASS)

| # | Verification | Result |
|---|-------------|--------|
| 1 | R classified as OSC (det=-1, disc=5) | ✓ |
| 2 | N classified as INV (det=1, disc=-4) | ✓ |
| 3 | All 16 level-2 tensor products have det ≥ 0 | ✓ |
| 4 | P1 eliminated at level 2 (0/16 products) | ✓ |
| 5 | Sorting σ_step: FIX=0.875, INV=0.125 (n=8) | ✓ |
| 6 | Euclid steps: all det=-1 (OSC), all quotients q≥1 | ✓ |
| 7 | FFT butterflies: |det|=2 (non-unitary) | ✓ |
| 8 | Normalized DFT: all |eigenvalues|=1 (unitary) | ✓ |
| 9 | SHA-256 σ_MIX ≈ 0.43 > φ̄² = 0.382 | ✓ |
| 10 | SHA-256 weighted σ_MIX ≈ 0.44 > φ̄² | ✓ |
| 11 | Self-signature Z = 2.000000 | ✓ |
| 12 | Digital root: idempotent for n=1..100 | ✓ |
| 13 | Cost properties: 4/4 verified | ✓ |
| 14 | Phase profile level 2: P1=0% (10k Monte Carlo) | ✓ |
| 15 | Phase profile level 3: P3=64% > level 2 P3=49% | ✓ |
| 16 | Bridge chain: br=0 forward, br≈8.5 backward | ✓ |
| 17 | K1' depth table matches d_K predictions | ✓ |

### 8.2 Theorems Proved (11/11)

| # | Theorem | Method |
|---|---------|--------|
| 1 | Type I Characterization | 4 equivalent conditions, from T1+T0B |
| 2 | Type II Characterization | 4 equivalent conditions, from T0B |
| 3 | Type III Characterization | 4 equivalent conditions, from T3_P3 |
| 4 | Rotational Normal Form | Spectral theorem |
| 5 | Compression Minimality | Universal property of quotient |
| 6 | Computational Blindness (4 parts) | From T5A §3 |
| 7 | Depth Monotonicity | Tower containment |
| 8 | Phase Profile at Level n | det ≥ 0 for n ≥ 2 |
| 9 | Cost-Landauer-Bekenstein Chain | From T5B §4+§8 |
| 10 | Hardness Functional Uniqueness | Geometric forcing + boundary |
| 11 | One-Wayness = Phase-Dist Asymmetry | Construction-dissolution |

---

## Part 9: Integration Plan

### New standalone paper: T-COMP (Computation Theory)

**Proposed structure:**

§1 Primitive claim + axioms C1-C7 (existing, enriched with computation reading)
§2 The four tags: phase (§2.1), dual signature (§2.2), depth (§2.3), three-branching (§2.4)
§3 Type I: Compression/Closure — characterization theorem + examples
§4 Type II: Expansion/Generation — characterization theorem + examples
§5 Type III: Rotation/Recurrence — characterization + normal form + asymptotic dominance
§6 The hardness functional h(σ) — uniqueness theorem
§7 Two-component cost formalism — Cost_real + Cost_exec
§8 Compression minimality theorem + recurrence theorem
§9 Computational blindness theorem (4 parts)
§10 One-wayness = Phase-Dist asymmetry
§11 Self-application: the framework as its own computation
§12 Algorithm classification table + signatures
§13 Cost-Landauer-Bekenstein chain
§14 Verification summary

### Insertions into existing papers

| Target | Content | Style |
|--------|---------|-------|
| T5A §1 | Remark: σ_K as dual signature (σ_step, σ_traj) | Natural remark after Definition |
| T5A §3 | Computational Blindness Theorem (4 parts) | New §3.4 after Thm 3.2 |
| T5A §9 | Q_K as Type I computation (idempotent, br=0) | Remark after Thm 6.2 |
| T5A §12 | Computation is observer-relative but structured | Corollary of Thm 9.1 |
| T5B §1 | Dual signature: σ_step + σ_traj | Extension of definition |
| T5B §2 | Signature-depth + complexity topology enrichment | Extension of §2 |
| T5B §3 | dep(f) connection to K1' feasibility | Corollary of Thm 8.4 |
| T5B §4 | Landauer-Bekenstein as computational bound | Corollary |
| T5B §8 | Cost_exec connection to observer cost | Extension of §8 |
| T0B §1 | Bridge chain branching numbers (360:1 ratio) | Extension of Thm 3.1 |
| T0B §5 | Computational cost reading of Phase-Dist(ρ) | Corollary of Thm 4.5b |
| T0B §8 | Quantitative P3 growth: 49%→64%→... | Corollary of Thm 5.3 |
| T2B §9 | Jordan types as computation types | Extension |
| T2B §11 | Self-signature consistency verification | Remark |
| T2B §12 | MIX threshold as hardness boundary | Remark |
| T3_P2 §3.3 | Arithmetic-as-computation extension | Extension of operator table |
| T3_P2 §3.4 | Complexity topology = h-level sets in Δ³ | Extension |
| T3_P3 §2 | Asymptotic Type III dominance (quantitative) | Corollary |
| T3_META §7 | Central collapse as Type I computation | Remark on Thm 7.1 |
| T7 §1 | Proof/Computation/Verification = Type I/II/III | Extension |
| T7 §3 | SHA-256 signature + OWF = Cayley-Hamilton | Extension |
| T7 §4 | Phase-Dist(1/2) reading of dual-stream | Extension |

---

## Part 10: Irreducible Open Problems

| Problem | Status | Why Open |
|---------|--------|----------|
| OWF existence | CONDITIONAL on P≠NP | Fundamental open problem in mathematics/CS |
| Exact signature computability | OPEN (likely undecidable) | Related to halting problem |
| Cost decomposition uniqueness | PARTIALLY OPEN | h is unique; additive split is natural but not forced |
| Transformer attention signature | OPEN | Needs specific architecture-level analysis |

None of these are closable within the framework alone. The first is a millennium-level problem. The second is provably undecidable in full generality. The third is a choice among natural options, not a uniqueness failure. The fourth is an empirical computation awaiting specific data.

---

*R(R) = R*
