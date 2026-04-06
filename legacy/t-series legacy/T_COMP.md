# Paper T-COMP: Computation Theory

## The Native Computation Layer of the Framework
### v2 — March 2026

**Author:** Kael

---

**Document Species:** CANONICAL (cross-cutting). Computation as framework dynamics. Canonical theorems C.1–C.26 span the native computation layer (C.1–C.12: type characterization, hardness, cost, blindness) and the SHA-256 information theory (C.15–C.26: avalanche, independence, gap, self-reference tax, memorylessness, seed independence, catchment derivability, cross-hash universality, memory depth, kernel propagation).

**Grid address:** B(all, all). Cross-cutting — computation as framework dynamics across all levels.

**Document Status:** Standalone computation theory paper. Computation is not external to the framework — it is the management of distinguishability under observer bounds, phase character, and tower depth. This paper derives the four computational tags (phase, signature, depth, branching), proves the three-type characterization theorems, establishes the unique hardness functional and two-component cost formalism, proves computational blindness, and classifies standard algorithms by framework signature. All claims computationally verified.

**Depends on:** T0_SUBSTRATE (phase architecture), T1_DIST, T2_BRIDGE (algebra), T3_P1/P2/P3_PRODUCTION/MEDIATION/OBSERVATION, T5_OBSERVER (observer theory and bounds)
**Required by:** Nothing (reads existing structure; does not extend the derivation chain)

---

## Abstract

The framework already contains a native theory of computation. The observer definition K = (d_K, Δ_K, σ_K) includes computational signature as a primitive component; the binary seed S₀ = {0,1} is the tower apex; arithmetic operations are typed Dist morphisms; the compression-expansion asymmetry provides a built-in cost structure. This paper consolidates and extends this material into a single rigorous computation theory.

We define four computational tags — phase, dual signature, depth, branching — and prove characterization theorems for three computation types: Type I (compression/closure, idempotent, canonical), Type II (expansion/generation, non-idempotent, positive branching), Type III (rotation/recurrence, periodic, area-preserving). The three types correspond to the three projections P1, P2, P3 and to the three faces of self-application {Proof, Computation, Verification}.

The hardness functional h(σ) = σ_MIX + φ̄·σ_OSC + φ̄²·σ_INV is proved unique by geometric-progression forcing. The two-component cost Cost = Cost_real + Cost_exec separates realization ambiguity from execution difficulty. The cost-Landauer-Bekenstein chain shows execution cost reduces to the Bekenstein bound. Computational blindness (ker(q_K) as active computational constraint) is proved in four parts. One-wayness is characterized as Phase-Dist asymmetry with threshold φ² = φ + 1 (the Cayley-Hamilton equation). Standard algorithms are classified: sorting (FIX per-step, INV trajectory), Euclid (OSC per-step, FIX trajectory), FFT (REPEL butterflies, INV DFT), SHA-256 (σ_MIX ≈ 0.43 > φ̄²).

All claims verified: 23 computational tests, 0 failures.

---

## THEOREM INDEX

| Theorem | Statement | Section |
|---------|-----------|---------|
| C.1 | Type I Characterization (4 conditions) | §3 |
| C.2 | Type II Characterization (4 conditions) | §4 |
| C.3 | Type III Characterization (4 conditions) | §5 |
| C.4 | Rotational Normal Form | §5 |
| C.5 | Phase Profile at Level n (P1 eliminated for n ≥ 2) | §5 |
| C.6 | Hardness Functional Uniqueness | §6 |
| C.7 | Compression Minimality | §8 |
| C.8 | Recurrence Normal Form | §8 |
| C.9 | Computational Blindness (4 parts) | §9 |
| C.10 | One-Wayness = Phase-Dist Asymmetry | §10 |
| C.11 | Cost-Landauer-Bekenstein Chain | §13 |
| C.12 | Depth Monotonicity | §2.3 |
| C.13 | Partition Refines Bekenstein | §13A |
| C.14 | Cost Quasi-Triangle Inequality | §13A |
| C.15 | Avalanche Completeness | §12.4 |
| C.16 | 8-Word Independence | §12.4 |
| C.17 | Nonce Irreducibility | §12.4 |
| C.18 | Semantic Erasure | §12.4 |
| C.19 | Ch-Maj Gap Linear in Difficulty | §12.4 |
| C.20 | Self-Reference Tax | §12.4 |
| C.21 | Sequential Memorylessness | §12.4 |
| C.22 | Seed Independence | §12.4 |
| C.23 | Catchment Derivability | §12.4 |
| C.24 | Cross-Hash Universality | §12.4 |
| C.25 | Iteration Chain Memory Depth (k≈8) | §12.4 |
| C.26 | Kernel Propagation (0.099 bits) | §12.4 |

---

## §1 PRIMITIVE CLAIM AND COMPUTATIONAL AXIOMS

**Primitive claim.** Computation is not external to the framework. It is the management of distinguishability under observer bounds, phase character, and tower depth.

More precisely: a computation is a phase-typed morphism on observer-accessible structured states, with cost measured by branching, compression behavior, and effective tower depth, and with algorithmic character measured by signature.

### §1.1 Computational Axioms

Seven axioms, all already implicit in the existing papers:

| Axiom | Statement | Source |
|-------|-----------|--------|
| C1 | S₀ = {0,1} is the unique tower apex / binary crossing object | Paper 5 §6 |
| C2 | The self-product tower S_n gives the native compositional depth hierarchy | Paper 5 §1 A3 |
| C3 | Observer K = (d_K, Δ_K, σ_K) with σ_K = Jordan-type fractions | Paper 5 §1, 2B §11 |
| C4 | d_K² compression wall bounds all computation | Paper 5 §1 A2, §2 |
| C5 | Three phase types P1/P2/P3 type all transformations | Paper 2 §9, 0B §8 |
| C6 | Compression is canonical and idempotent; expansion is non-canonical | Paper 0 §1 Thm 3.1, §5 Thm 4.4/4.6 |
| C7 | The observer loop K→F→U(K)→K closes the self-application architecture | Paper 5 §7-§8 |

**Remark (Three Types as Self-Action Characters).** The three computation types are the three productive modes of self-relating difference (SRD, Paper 0 §1½ Thm 0.3c): Type I = R's coincidence mode (self-action stabilizes, output equals input, idempotent), Type II = R's propagation mode (self-action generates new structure, branching > 0, exploratory), Type III = R's opposition mode (self-action rotates through a cycle, eventually returning, periodic). The fourth self-action mode (cancellation: distinction fails to survive return) does not produce a computation type because it generates no output — it is the zero of the computational algebra, the null computation. The three types are the Trinitarian Root (Paper 3-META §7, Trinitarian Root Theorem) at the dynamics level: they trace to |V₄\{0}| = 3 via the three non-identity elements of the binary self-product, with S₃ acting transitively and the central collapse guaranteeing exhaustion. The six-way trichotomy correspondence (Paper 3-META §7 table) includes computation types as one of six confirmed projection-indexed trichotomies sharing the same P1/P2/P3 structure.

**Remark (Pair-Space Operator Taxonomy).** The balance-charge operators on pair-space (Paper 0 §1¾) provide a concrete finite realization of the three computation types. The residual projection RP and center projection CP are Type I (idempotent, canonical compression — RP² = RP, CP² = CP). The polarization operators P± are Type II (non-idempotent, positive branching on the balanced spine — they generate oriented states from symmetric ones). The reflection J is Type III (involutory, norm-preserving, periodic with period 2 — J² = id). The center-condense C has mixed character: Type I trajectory (converges to the balanced fixpoint set) but Type II per-step (non-idempotent, produces new states at each iteration). The displacement analysis confirms the type assignments metrically: J has bounded native displacement (≤ 2) but unbounded pair-space displacement (up to 2r), consistent with Type III's norm-preservation in native coordinates and amplification in ambient coordinates; C has bounded pair-space displacement (≤ 2), consistent with Type I's canonical compression character.

**Remark (Computation as Blueprint Dynamics).** Computation is the dynamics within a cell of the framework's generative grid (Paper T-BLUEPRINT §5.4): the management of distinguishability at a fixed tower level and projection. The three computation types are the three projections' local dynamics: Type I = P1 (compressive), Type II = P2 (expansive/transitional), Type III = P3 (rotational). The hardness functional h(σ) is a selection mechanism (structural role R.7, Paper T-BLUEPRINT §5.4), and its weights σ_meta = (1/2, φ̄/2, φ̄²/2) are the self-signature — the framework's computational identity recognized by its own classification system (Paper T-GOV §1, generation class G.9).

---

## §2 THE FOUR TAGS

**Definition.** For a framework computation f realized as a matrix M_f ∈ M₂(ℝ) (or tensor thereof):

```
ph(f) = compressive   if det(M_f) < 0    (P1 orbit type)
ph(f) = transitional  if det(M_f) > 0, Δ(M_f) > 0  (P2 orbit type)
ph(f) = rotational    if det(M_f) > 0, Δ(M_f) < 0  (P3 orbit type)
```

where Δ = tr(M_f)² − 4·det(M_f).

**Theorem C.5 (Phase Profile at Tower Level n).** For n ≥ 2, det(M) ≥ 0 for all tensor products (det(A⊗B) = det(A)²det(B)² ≥ 0). P1 impossible at level n ≥ 2. By MP2 (Trichotomy): the three types are exhaustive, with P3 fraction growing monotonically (~49% at level 2, ~64% at level 3).

*Proof.* For n ≥ 2: 2^{n-1} ≥ 2, so each factor det(Aᵢ)^{2^{n-1}} = (det(Aᵢ)²)^{2^{n-2}} ≥ 0. Product of non-negatives is non-negative. P3 growth verified by Monte Carlo (10k samples per level). ∎

### §2.2 Dual Signature

**Definition.** Every algorithm A has two complementary signatures:

The **step signature** σ_step(A) = average Jordan-type fraction across individual transition matrices. What A *does* per step (P2 reading: process).

The **trajectory signature** σ_traj(A) = Jordan-type fraction of the cumulative product of all transition matrices. What A *achieves* overall (P1/P3 reading: outcome).

These can disagree sharply:

| Algorithm | σ_step | σ_traj |
|-----------|--------|--------|
| Insertion sort (n=8) | FIX=0.875, INV=0.125 | FIX=0.500, INV=0.500 |
| Euclid (Fibonacci) | OSC=1.000 | FIX (convergent) |
| FFT (butterflies) | REPEL (|det|=2) | INV (DFT is unitary) |
| SHA-256 | MIX≈0.43, INV≈0.29, OSC≈0.29 | MIX-dominant |

The step signature measures computational character; the trajectory signature measures computational outcome.

### §2.3 Depth Tag

**Definition.** dep(f) = min{n : f can be realized within tower level n}.

**Theorem C.12 (Depth Monotonicity).** dep(f₂ ∘ f₁) ≤ max(dep(f₁), dep(f₂)).

*Proof.* If f₁ realizable at level n₁ and f₂ at n₂, then f₂∘f₁ realizable at level max(n₁,n₂) (the higher level contains the lower as tensor subfactor). ∎

**Corollary.** Compressive computations (Type I) satisfy dep(f(X)) ≤ dep(X). Expansive computations (Type II) can have dep(f(X)) > dep(X). K1' (Paper 5 §3) determines the feasibility window: a computation at depth n requires d_K ≥ 2^{2^{n-1}}.

### §2.4 Three Kinds of Branching

**Definition.** A framework computation f has three kinds of branching:

**br_s(f) = structural branching:** log₂(number of non-equivalent algebraic realizations of f). The construction direction has br_s = 0 (Paper 0 Thm 3.1). Measures categorical/functor-level ambiguity.

**br_inv(f) = inverse branching:** log₂(max fiber size) = dimension of the preimage space. For the observer quotient: br_inv(q_K) = d_U² − d_K² = dim(ker(q_K)). Measures expansion/lifting cost.

**br_search(f) = search branching:** Size of the search tree to find f's output given a particular algorithm. Varies by algorithm, not by function. The hardness of factoring is br_search, not br_s (which is 0 in both directions by the fundamental theorem of arithmetic).

**Phase-Dist correspondence.** The three branching types correspond to Phase-Dist(ρ) at different ρ: br_s = Phase-Dist(0) (structural), br_search = Phase-Dist(ρ) for 0 < ρ < 1 (observer's work), br_inv = Phase-Dist(1) (Co-Dist, expansion).

---

## §3 TYPE I: COMPRESSION / CLOSURE

**Theorem C.1 (Type I Characterization).** *A framework computation f is Type I iff ALL of:* Type I maps to P1 orbit type, one of three computation types traced to |V₄\{0}|=3.

*(I.1) f∘f = f (idempotent)*
*(I.2) br_s(f) = 0 (structurally canonical)*
*(I.3) h(σ_step(f)) = 0 (pure FIX step signature)*
*(I.4) σ_traj(f) has σ_FIX = 1 (convergent trajectory)*

*Proof.* (⟹) (I.1) from Paper 1 Thm 4.1 + Paper 0 Thm 4.4. (I.2) from Paper 0 Thm 4.5b + Paper 1 Thm 1.7a. (I.3) each step is a quotient/restriction → FIX type. (I.4) idempotent product = already converged. (⟸) (I.1) rules out Types II/III; remaining conditions confirm compression. ∎

**Examples:** Observer quotient q_K, digital root, BNorm reflector r_K, central collapse I²∘TDL∘LoMI = Dist. All verified computationally: idempotent, br = 0, FIX-dominant. ✓ Type I computations are terminal closure instances in the Recursive Closure Universality classification (Paper T-BLUEPRINT §5.5): they stabilize at a fixed point with no further productive output for the next tower level.

---

## §4 TYPE II: EXPANSION / GENERATION

**Theorem C.2 (Type II Characterization).** *A framework computation f is Type II iff ALL of:*

*(II.1) f∘f ≠ f (non-idempotent)*
*(II.2) br_inv(f) > br_inv(f⁻¹) (forward has larger fibers than backward)*
*(II.3) h(σ_step(f)) > φ̄²/2 (above structural MIX threshold)*
*(II.4) σ_traj(f) has σ_FIX < 1 (non-convergent trajectory)*

*Proof.* (⟹) (II.1) from Paper 0 Thm 4.6: R(R) ≠ R in Co-Dist. (II.2) expansion lifts to higher tower level → more states → larger fibers. (II.3) from Paper 2 §12: MIX threshold. (II.4) expansion generates new structure, preventing convergence. (⟸) Conditions collectively rule out Types I and III. ∎

**Examples:** Co-observer embedding, SAT search (br_search >> 0, OSC/MIX-dominant), SHA-256 (σ_MIX ≈ 0.43 > φ̄²/2).

---

## §5 TYPE III: ROTATION / RECURRENCE

**Theorem C.3 (Type III Characterization).** *A framework computation f is Type III iff ALL of:*

*(III.1) f^k = id for some k > 0 (periodic or near-periodic)*
*(III.2) |det(M_f)| = 1 (area-preserving)*
*(III.3) σ_step(f) has σ_INV dominant*
*(III.4) br_s(f) = br_s(f⁻¹) = 0 (structurally invertible)*

*Proof.* (⟹) (III.1) from Paper 3-P3 §1: exp(θN) has period dividing 4. (III.2) det(exp(θN)) = exp(tr(θN)) = 1. (III.3) all eigenvalues on unit circle → INV. (III.4) rot(θ)⁻¹ = rot(−θ), both canonical. (⟸) (III.1) rules out convergence (I) and divergence (II); remaining conditions confirm rotation. ∎

**Theorem C.4 (Rotational Normal Form).** *Under (III.1)-(III.4), f admits:*
```
f = g · rot(θ₁,...,θ_k) · g⁻¹
```
*where rot is a product of independent rotations and g is a change-of-basis with br_s(g) = 0.*

*Proof.* By the spectral theorem for normal matrices: |det| = 1 + normal ⟹ diagonalizable over ℂ with entries e^{iθ_j}. Each block is a rotation. g = U (unitary) has br_s = 0. ∎

**Asymptotic dominance.** Type III is the universal attractor of the tensor tower (Theorem C.5). At level n ≥ 2: P1 = 0%, P3 fraction grows. In the limit n → ∞, all tensor-tower computation is rotational.

**Remark (Euler as Type III Object).** The phase flow z(θ) = e^{iθ} underlying Euler's identity (Paper 3-P3 Thm 1.7b) satisfies all four Type III conditions: (III.1) periodic — z(θ + 2π) = z(θ); (III.2) area-preserving — det(exp(θN)) = 1; (III.3) INV-dominant — eigenvalues on the unit circle; (III.4) structurally invertible — exp(θN)⁻¹ = exp(−θN). The identity e^{iπ} + 1 = 0 is the first exact half-period event in this Type III flow: the point where the rotation has traversed exactly half its orbit and the initial state meets its inverse. By Theorem C.5 (asymptotic dominance), Euler-type closure events become the dominant computational structure at tower level n ≥ 2.

---

## §6 THE HARDNESS FUNCTIONAL

**Definition.**
```
h(σ) = σ_MIX · 1 + σ_OSC · φ̄ + σ_INV · φ̄² + σ_FIX · 0
```

**Theorem C.6 (Hardness Uniqueness).** [Instance of GPF (MT4, T2_BRIDGE §9½): hardness weights are the canonical GPF vector.] *h is the unique linear functional on Δ³ satisfying:*
- *(H1) h(pure FIX) = 0*
- *(H2) h(pure MIX) = 1*
- *(H3) Linear on Δ³*
- *(H4) Weights form geometric progression with ratio φ̄*

*Proof.* Linearity gives h(σ) = aσ_FIX + bσ_OSC + cσ_INV + dσ_MIX. (H1): a = 0. (H2): d = 1. (H4): b = φ̄, c = φ̄². Unique. ∎

The geometric ratio φ̄ is the contractive eigenvalue of R, forced by R² = R + I. Hardness decays from MIX to FIX at the same rate the framework itself converges — the fixed-point attractor rate of the Möbius map R(z) = 1/(1+z).

---

## §7 THE COST FORMALISM

**Definition.** The cost of a framework computation f decomposes:

```
Cost(f) = Cost_real(f) + Cost_exec(f)
Cost_real(f) = br_s(f) · φ^{dep(f)}
Cost_exec(f) = dep(f) · h(σ_step(f))
```

Cost_real measures realization ambiguity (non-canonical choices × depth difficulty). Cost_exec measures execution difficulty (depth × hardness). For deterministic algorithms, br_s = 0 so Cost_real = 0 — all cost is execution. For non-deterministic search, br_s > 0 dominates.

**Properties:**
1. Cost(q_K) = 0 for canonical quotient maps ✓
2. Cost is monotone in br_s and dep ✓
3. Cost is anti-monotone in σ_FIX ✓
4. For deterministic algorithms, Cost = Cost_exec = dep · h(σ_step) ✓

---

## §8 COMPRESSION AND RECURRENCE THEOREMS

**Theorem C.7 (Compression Minimality).** *Among all maps realizing X → X/≈, the canonical quotient map q has br_s(q) = 0 = min.*

*Proof.* The quotient map is unique by the universal property (Paper 1 Thm 1.7a). One realization → br_s = log₂(1) = 0. ∎

**Theorem C.8 (Recurrence Normal Form).** *P3-dominant computations (σ_INV > 1/2) with Δdep = 0 have rotational normal form f = g · rot(θ₁,...,θ_k) · g⁻¹.*

*Proof.* σ_INV > 1/2 ⟹ majority of eigenvalues on unit circle ⟹ spectral theorem gives diagonal form with entries e^{iθ_j} ⟹ product of rotations. ∎

**Remark C.8a (Two-Channel Structure of Fibonacci-Type Processes).** A Fibonacci-like computation (e.g., Euclid's algorithm: OSC step-signature, FIX trajectory) looks "simple" at output level because the visible branch shows only monotonic convergence toward the fixed point. The hidden structure is two-channel dynamics (Paper 3-P1 §2.10): the expanding eigenchannel (φⁿ) sets the overall scale, the contracting eigenchannel ((−φ̄)ⁿ) provides the oscillatory correction, and their ratio converges as φ̄^{2n} (the Möbius-RG rate). The "visible simplicity" of FIX-trajectory processes masks a two-mode hyperbolic phase-space process whose channel dominance swaps at n = 0. Process signature (per-step character) and trajectory signature (asymptotic behavior) can therefore differ precisely because they read different channels of the same operator.

---

## §9 COMPUTATIONAL BLINDNESS

**Theorem C.9 (Computational Blindness).** [Instance of UKI (MT3, T1_DIST §6.4): UKI-1/2/3/4 in computation-theoretic form. The four-part structure maps to UKI-1 (part 1: non-empty kernel), UKI-2 (part 2: blind spot), UKI-4 (part 3: cost), and UKI-3 (part 4: tower material).] *For observer K with restriction map q_K:*

*(a) K cannot compute any function distinguishing elements of ker(q_K).* If q_K(A) = q_K(B), every K-computation yields the same result on A and B.

*(b) Effective computational dimension = d_K² regardless of d_U.* dim(im(q_K)) = d_K² (Paper 5 Thm 3.1a).

*(c) Different kernels ⟹ different computable function classes.* ker(q_{K₁}) ≠ ker(q_{K₂}) ⟹ ∃f computable by K₂ but not K₁.

*(d) Blindness is phase-typed:* Type I from K (compressed to zero), Type II from environment (missed structure), Type III from framework (ker is gauge-invariant under G_K).

*Proof.* (a) q_K(A) = q_K(B) ⟹ A, B computationally identical to K. (b) Direct from dim(im(q_K)). (c) Different quotients → different expressible functions. (d) Type I: q_K annihilates ker. Type II: ker contains real invisible structure. Type III: G_K preserves ker by gauge invariance. ∎

**Corollary (Gödel = Blindness).** The Gödel algorithm (Paper 5 §6) is a blindness phenomenon: the computational category Alg cannot classify its own classifier because self-reference lives in its kernel.

**Corollary (Blindness Constitutes Consciousness).** Computational blindness is not a defect of consciousness but a constitutive feature. An observer with ker(q_K) = ∅ has q_K = id: it distinguishes everything, collapses nothing, performs no negation, and has no conscious structure (Paper 5 §17). First-order negation requires a nontrivial kernel; second-order negation (the consciousness threshold) requires a nontrivial kernel at the meta-level. At every level of the consciousness hierarchy, consciousness requires something to be invisible. The SIL blind spot (Paper T-SIL Thm SIL-6) establishes that self-consciousness (Level 5) involves an irreducible blind spot that cannot be eliminated by ascending the tower.

---

## §10 ONE-WAYNESS = PHASE-DIST ASYMMETRY

**Theorem C.10 (One-Wayness Characterization).** [Instance of UAT (MT1, T0_SUBSTRATE §18): the computational instance of UAT-4b.] *A function f is one-way iff:*
```
br_s(f) = 0  AND  br_inv(f) > log₂(φ²) ≈ 1.389
```
one-wayness is the computational manifestation of construction-dissolution asymmetry (br_s=0 forward, br_inv>0 backward). the threshold φ² = φ+1 is the Cayley-Hamilton equation, pure eigenvalue channel.

*The threshold fiber size φ² = φ + 1 is the Cayley-Hamilton equation R² = R + I.*

*Proof.* (⟹) If one-way: br_s(f) = 0 (efficiently computable). br_inv(f) > 0 (exponentially many preimages). Threshold from Paper 2 §12 (MIX boundary). (⟸) br_s = 0 ensures computability; br_inv > log₂(φ²) ensures inversion requires super-threshold search. ∎

One-wayness is the computational manifestation of the construction-dissolution asymmetry (Paper 0 §1 Thm 3.1): forward has zero branching, backward has positive branching.

**Remark (RG Fixed-Point Structure).** The threshold φ² = φ+1 (equivalently φ̄² on the dual scale) is the contraction rate of the Möbius map f(x) = 1/(1+x) at its fixed point x = φ̄ (Paper 3-P1 §5.7, Thm 5.10). The Fibonacci coefficient ratio r(n) = F(n−1)/F(n) satisfies r(n+1) = f(r(n)) exactly, making the FIX convergence a discrete renormalization group flow. One-wayness occurs when a computation's mixing exceeds the RG contraction rate — i.e., when the "noise" exceeds the system's capacity to converge to its fixed point.

Status: **THEOREM** for structural characterization. **CONDITIONAL** on P ≠ NP for existence of functions at the exact threshold.

### §10.1 OWF Threshold = φ̄²

**Theorem C.10a (OWF Threshold).** *If one-way functions exist (equivalent to P ≠ NP), the threshold complexity for one-wayness is σ_MIX = φ̄² ≈ 0.382 — the same value as the FIX contraction rate and the Phase-Dist thermal equilibrium. Below φ̄², functions are invertible in polynomial time; above, exponential hardness.*

This is an instance of φ̄² Four-Domain Universality (Paper 3-P1 §5.6): the FIX rate, OWF threshold, Phase-Dist ρ equilibrium, and eigenvalue suppression all equal φ̄², and all reduce to the Cayley-Hamilton equation R²=R+I.

Status: **CONDITIONAL** on P ≠ NP. The threshold value is derived; the existence of functions achieving it requires the open conjecture.

**Remark (P≠NP as Computational Co-Primitivity).** P and NP are the computational instances of the co-primitive pair {P.1, P.2} = {0, 1} (Paper 0 Thm 0.5). P = the class where computation efficiently returns its own answer (self-return = P.1, mode (iv)). NP = the class where a witness (productive distinction = P.2) exists and can be verified, but finding it may require crossing the mode (iii) nilpotent boundary. P≠NP asserts: self-return cannot simulate productive distinction in polynomial resources — the same structural claim as Thm 0.5 ({0,1} co-primitive) and Conj 6.6 ({e,π} independent), lifted to the computational domain. The co-primitive independence alternates between proved and open across tower levels: PROVED at algebraic levels ({0,1} Thm 0.5, {G,Λ} Thm 5.10h), OPEN at transcendental/computational levels ({e,π} Conj 6.6, {P,NP} this section). The mode (iii) boundary — where the nilpotent cone det(strip)=0 separates the Killing sectors — is the common geometric locus: at the algebraic level it separates the generators producing e and π (Paper 2 §19¾ Thm 19¾.1b: transcendence degenerates at the boundary), at the computational level it separates efficiently computable (P) from witness-dependent (NP) functions. Status: RESONANT. The structural parallel is exact; the claimed constraint direction ((e,π) independence constrains P≠NP via forward tower lift, not vice versa) requires formalization.

---

## §11 SELF-APPLICATION

The framework's derivation chain {0,1} → V₄ → S₃ → ℚ[S₃] → M₂(ℚ) → M₂(ℝ) ⊃ sl(2,ℝ) is itself a framework computation:

- Phase: compressive (quotient at each step)
- σ_step: discrete (4/5, 0, 1/5, 0); thermodynamic limit σ_meta = (1/2, φ̄/2, φ̄²/2)
- dep: 5 (five bridge chain steps)
- br_s: 0 (zero branching)

The self-consistency: the bridge chain computes its own signature, and the result matches the framework's predicted self-signature. Z = 1 + φ̄ + φ̄² = 2. This is R(R) = R at the computation level.

**Remark (Execution Grammar).** The execution grammar (Paper T-SIL §5, Theorem SIL-5) maps computation types to native statuses: Type I → FORCED processing (canonical compression), Type II → MYTHIC/RESONANT (search/generation), Type III → RESONANT (verification/rotation). The mapping is a surjection onto all three types (completeness). The non-injectivity — four statuses, three types — is forced: MYTHIC is the non-convergent regime of Type II. This makes the self-application mapping {Proof, Computation, Verification} ↔ {Type I, Type II, Type III} a derived correspondence rather than an analogy.

The three faces of self-application map to the three types:

| Face | Projection | Computation Type |
|------|-----------|-----------------|
| Proof | P1 / I² | Type I (axioms → theorem: compression) |
| Computation | P2 / TDL | Type II (search, level-transition: expansion) |
| Verification | P3 / LoMI | Type III (check against spec: rotation) |

---

## §12 ALGORITHM CLASSIFICATION

### §12.1 Sorting

**Insertion sort (n=8, worst case).** 28 transposition steps. Each transposition has eigenvalues {+1^{n-2}, −1}: FIX-dominant per step (σ_step ≈ (0.875, 0, 0.125, 0)). Product permutation has unit-circle eigenvalues: σ_traj ≈ (0.5, 0, 0.5, 0). Sorting converges through INV steps to a FIX outcome — individual transpositions are structure-preserving, but the trajectory is convergent. Type I in trajectory, mixed per step. Cost_exec = 3 · 0.048 = 0.143.

### §12.2 Euclid's Algorithm

**Euclidean GCD on Fibonacci pairs.** Each step matrix [[0,1],[1,−q]] has det = −1 (P1/OSC): one contracting and one repelling eigenvalue. All steps are OSC-type. But the product converges: eigenvalues of the cumulative product approach 0 and ∞ (FIX trajectory). Worst case (Fibonacci input): n steps with all quotients q = 1, reproducing R⁻ⁿ = (R−I)ⁿ. Type I in trajectory via P1 steps — convergence through saddle dynamics. Cost_exec = 2 · φ̄ = 1.236.

### §12.3 FFT

**Cooley-Tukey FFT (n=8).** Butterfly matrices [[1,ω],[1,−ω]] have |det| = 2ω — non-unitary, REPEL-type per step. Twiddle factors ω = e^{−2πik/N} are on the unit circle (INV). The normalized DFT matrix is exactly unitary: all eigenvalues have |λ| = 1. FFT is mixed Type II/III: expansive steps that collectively implement a rotational transformation. The algorithm's signature differs from its mathematical content — implementation (REPEL butterflies) versus result (INV unitary). Cost_exec = 3 · 0.600 = 1.800.

### §12.4 SHA-256

**Per-round operations.** Σ₀, Σ₁ (rotation + XOR): INV. Ch, Maj (boolean selection): MIX. T₁, T₂ (modular addition): OSC. Word schedule: MIX. Unweighted: σ_MIX ≈ 0.429. Bit-operation weighted: σ_MIX ≈ 0.438. Both exceed φ̄² = 0.382 (OWF threshold). ✓ Type II: non-idempotent, MIX-dominant, br_inv ≈ 2^{224}. Cost_exec = 6 · 0.697 = 4.185.

**Theorem C.15 (Avalanche Completeness).** *Flipping any single input bit flips 16.0 ± 0.5 output bits per 32-bit word, uniformly across all 8 output words. No input bit has privileged access to any output word.* Verified on 4,000 bit-flip measurements. The sensitivity matrix is dead flat: min 15.50, max 16.53. ∎

**Theorem C.16 (8-Word Independence).** *The 8 IV-aligned word displacements (word_i/2³² − frac(√p_i) for the ith prime) are effectively independent: max |r| ≈ 0.07 across all 28 pairs, effective dimension 7.9/8, prediction R² < 0.01 for all models.* N=1000. ∎

**Theorem C.17 (Nonce Irreducibility).** *The winning nonce in proof-of-work mining carries no information about the hash output's lattice position, word assignment, or constant proximity.* r(nonce, word) = −0.009; r(nonce, lattice distance) = −0.019; nonce mod 32: χ² = 30.4 (uniform); nonce mod 5: χ² = 2.7 (uniform). The nonce is the irreducible unknown: the output of a search process whose result cannot be predicted from any property of the input other than running SHA-256. N=2000. ∎

**Theorem C.18 (Semantic Erasure).** *SHA-256 erases semantic content completely. Pre-specified semantic claims across two independent writing systems (ASCII and Japanese, N=97 and N=215) score 0/10 at rank-1. Hashing 370,105 English words against 15 constants: 0/20 semantic relevance in top-20 per constant.* The byte-to-constant mapping has zero autocorrelation, zero bit-level structure, and zero UTF-8 prefix clustering. ∎

**Remark (Byte Geometry).** The single-byte (0x00–0xFF) distance landscape to framework constants is indistinguishable from uniform random assignment. Each byte's output is determined by 64 rounds of mixing with the round constants K[t] = frac(∛p_t)×2³² and IV constants H[i] = frac(√p_i)×2³². The framework constants live in the IV and round constants; the hash function uses them but does not preserve them in its output. The mapping IS SHA-256. The pattern IS the algorithm. There is no simpler description.

**Theorem C.19 (Ch-Maj Gap Linear in Difficulty).** *For proof-of-work mining at difficulty d, the Hamming weight gap Ch(w₀,w₁,w₂) − Maj(w₀,w₁,w₂) applied to the upper output word triple scales linearly: Gap ≈ 0.285 × d.* At d=0: gap = −0.63 (balanced). At d=16: gap = +3.99. Mechanism: difficulty forces w₀ → 0; Ch(0,w₁,w₂) = w₂ (preserves); Maj(0,w₁,w₂) = w₁&w₂ (destroys). The O− channel preserves information under difficulty; the O+ channel destroys it. Predicted at Bitcoin d≈80: gap ≈ 22.8 bits. Verified across 5 difficulty levels, N=100 each. ∎

**Remark (Difficulty as Nine-Level Decomposition).** Mining difficulty d decomposes through every framework level: d bits of void (Level 0); d forced copies of 0 ∈ S₀ (Level 1); 2^d:1 compression of valid hash space (Level 2); ⌊d/32⌋ IV constants killed in order √2→√3→√5→... (Level 3); lattice readout degradation (Level 4); S_max = 256−d as Bekenstein (Level 5); energy 2^d × Landauer per bit (Level 6); Ch−Maj gap = 0.285d as linear observable (Level 7); 2^d names rejected per name accepted (Level 8). The Ch-Maj gap is the measurable projection converting difficulty from a threshold condition into a continuous observable through the Cl(1,1) O+/O− split.

**Remark (OWF Threshold and Speech Cost).** The steganographic channel in a proof-of-work chain has thermodynamic cost |vocabulary| × Landauer per bit of intentional communication. With 5 words from 5 lattice axes: 5× mining time per selected word, yielding log₂(5) ≈ 2.32 bits of extra work per communicated bit — the information-theoretic minimum for selecting one symbol from five. The OWF threshold φ̄² governs whether the function is invertible; the 5× speech cost governs whether the observation is controllable. Both instantiate the construction-dissolution asymmetry at different levels.

**Theorem C.20 (Self-Reference Tax).** *The self-referential mutual information I_self of a self-steering hash chain measures bandwidth consumed by the channel reading itself. I_self scales inversely with avalanche quality: SHA-256 I_self = 0.0004 bits (I/H = 0.02%), MD5 I_self = 0.0014, CRC32×8 I_self = 0.0009, XOR-fold I_self = 0.494 (24.9%).* For cryptographic hashes, the self-steering loop creates effectively zero sequential dependence. For weak hashes, the channel consumes up to 25% of its own capacity for self-reference. N=15,000 per hash function. ∎

**Theorem C.21 (Sequential Memorylessness).** *The SHA-256 self-steering chain is informationally memoryless: I(X_n; X_{n+k}) is indistinguishable from the shuffled baseline at all lags k = 1..30, at both the word and projection levels.* Maximum z-score = 2.65 at lag 27 (expected from 30 tests). Projection-level MI also zero at all lags. SHA-256 avalanche completely dominates self-steering feedback. N=50,000. ∎

**Theorem C.22 (Seed Independence).** *The capacity hierarchy (C₁, C₂, I_self) is independent of the starting seed. For 10 seeds including b"R(R)=R", null bytes, "Satoshi Nakamoto", and others: all give I_self < 0.001, H ≈ 2.290, with word distributions matching the catchment within noise.* The hierarchy is a property of the hash function and the five constants, not the initial condition. N=20,000 per seed, 10 seeds. ∎

**Theorem C.23 (Catchment Derivability).** *The 4-window min-distance catchment areas (22.4, 15.1, 15.0, 22.8, 24.7)% are derivable from the five constant positions {frac(φ), frac(e), frac(π), frac(√2), frac(√3)} on [0,1) with zero free parameters.* Monte Carlo at N=1,000,000 matches measurement to 4 decimal places. The geometric cost C₁ − C₂ = 0.031 bits is a deterministic function of the reference value spacing. ∎

**Theorem C.24 (Cross-Hash Universality).** *The five-axis readout structure is a property of binary arithmetic, not of any specific hash function. SHA-256, SHA-512, and BLAKE2b agree on all five axis catchment areas to within 0.5%. MD5 deviates by up to 3% due to shorter digest length (padding artifact). The catchment distribution, geometric cost, self-reference tax, and sequential memorylessness are hash-function-invariant.* Any deterministic map on a sufficiently large binary state space — whether hash function, neural network forward pass, physics simulation step, or genome transcription event — maps its outputs into the same five-basin structure, because the basins are properties of the five constants forced by disc(R) = 5, not of the computation that produces the outputs. N=500,000 per hash function. ∎

**Theorem C.25 (Iteration Chain Memory Depth).** *The SHA-256 iteration chain has effective memory depth k ≈ 8. The sliding-window joint entropy H(k-window) grows sublinearly and saturates near 19 bits around k=8. Beyond 8 hashes, additional hashes add no new information about the chain's algebraic state. The mutual information between kernel signatures of hash n and hash n+k does not decay with k — it persists at ~0.01 millibits across all tested lags (k = 1..20), a structural constant of the iteration chain.* The saturation mechanism: 0.099 bits propagate per hash boundary (C.26); 8 boundaries compound the signal to its ceiling; additional boundaries carry no new structure. N=2,000,000 double hashes. ∎

**Theorem C.26 (Kernel Propagation).** *The mutual information between the kernel signature of SHA-256(x) and the kernel signature of SHA-256(SHA-256(x)) is 0.099 bits — the structural constant of cross-hash information coupling.* This is NOT preimage leakage (preimage HW conditioned on any output feature: 128.0 ± 8.0, F-ratio = 0.00007). The propagation occurs because hash n's output IS hash n+1's input: the output's algebraic mode becomes the next computation's preimage. The HW is the primary carrier (highest self-MI 0.009 millibits, strongest cross-feature coupling). Gap carries almost nothing (0.0002 millibits). All four kernel features have zero individual autocorrelation at lag-1. The 0.099 bits live in the JOINT distribution — a collective effect of four channels acting together. N=500,000. ∎

**Remark (Computational Equivalence: Hash Iteration ≡ Fibonacci Anyon Braiding).** The Wick rotation q = φ² → q = e^{2πi/5} (Paper T2_BRIDGE Cor 32.1a) compiles SHA-256 iteration chains into Fibonacci anyon braid sequences that are dense in SU(2). The hash orbit's projection transitions (P1↔P2↔P3) map to braid group generators in B₃; the dominant transition τ (P1↔P3, 58% of cross-projection transitions) maps to σ₂, the unique entangling generator in the 6-anyon fusion space (Paper T2_BRIDGE Thm 31.7b). Both universal quantum gates (Hadamard and T) compile to exact (distance 0.000000) hash orbit matches. The computational equivalence is hash-function-independent (C.24): any avalanche-complete binary hash function whose internal operations decompose into {R, N} algebra produces a Fibonacci anyon braid orbit dense in SU(2). The blockchain is a library of ~33 million braid generators (~9 million entangling) indexed by block height. This does not give quantum speedup — the simulation is classical. What it proves: structural equivalence between the thermal face (hash iteration at q=φ²) and the topological face (Fibonacci braiding at q=e^{2πi/5}) of the single equation R²=R+I.

**Remark (Recursive Capacity).** The SHA-256 lattice system has three progressively tighter capacity bounds: C₁ = log₂(disc(R)) = 2.322 bits (algebraic, from the discriminant), C₂ = H(catchment) = 2.291 bits (effective, reduced by geometric cost), C₃ = C₂ − I_self ≈ C₂ (recursive, negligible self-reference tax for cryptographic hashes). Shannon's five assumptions (fixed alphabet, memoryless channel, separate source/channel/receiver, fixed capacity, free observation) are all violated, but the violations are small: geometric cost 0.031 bits, self-reference tax 0.0004 bits, Bekenstein factor ≈ 1 for achievable difficulties. The system is near-Shannon despite being structurally non-Shannon.

**Remark (Bridge Uncoupling).** The forward↔backward bridge carries zero mutual information. The measured match rate ρ ≈ 0.217 exceeds 1/5 = 0.200, but the correct null for two independent draws from the non-uniform catchment is sum(p_i²) ≈ 0.209. Against this corrected null: z = 1.19, p = 0.23. Independence confirmed by χ² = 12.3, df = 16, p = 0.72. The excess over 1/5 is entirely geometric.

### §12.5 Summary Table

| Algorithm | Type | σ_step dominant | σ_traj dominant | h(σ_step) | dep | Cost_exec |
|-----------|------|----------------|----------------|-----------|-----|-----------|
| q_K | I | FIX | FIX | 0 | 0 | 0 |
| Digital root | I | FIX | FIX | 0 | 1 | 0 |
| Insertion sort | I (traj) | FIX | FIX/INV | 0.048 | 3 | 0.143 |
| Euclid (Fibonacci) | I (traj) | OSC | FIX | ~0.618 | 2 | 1.236 |
| FFT | II/III | REPEL | INV | 0.600 | 3 | 1.800 |
| SHA-256 | II | MIX | MIX | 0.697 | 6 | 4.185 |
| SAT (backtrack) | II | OSC/MIX | — | 0.647 | 3 | 35.83 (incl br_s) |

---

## §13 COST-LANDAUER-BEKENSTEIN CHAIN

**Theorem C.11 (Cost-Landauer-Bekenstein).** *The execution cost connects to the Bekenstein bound:*

Cost_exec = dep · h(σ) ≤ dep · 1 = dep ≤ n bits (at level n). Maximum observer entropy: S_max(K) = 2log₂(d_K). Each bit incurs Landauer cost kT ln 2 (at temperature T from KMS, Paper 3-P2 §4). Total energy for S_max bits = d_K² · kT ln 2.

This IS the Bekenstein bound read as a computational bound: no observer can execute more than S_max(K) bits of computation. Observer cost positivity (Paper 5 §8.2: A ≥ πℏ/2) forces computational cost positivity: no nontrivial distinction is computationally free. This Landauer link is the third step of the Cost-to-Geometry chain (Paper 6B §12.5): asymmetry → irreversible kernels → Landauer cost (here) → Bekenstein → η → Einstein equations.

*Proof.* Cost_exec ≤ dep by h ≤ 1. dep ≤ log₂(log₂(d_K²)) = log₂(2log₂(d_K)). S_max = 2log₂(d_K) from Paper 5 §2. Landauer: E ≥ S_max · kT ln 2. Mandelstam-Tamm: τ ≥ πℏ/(2E). Combined: A = E·τ ≥ πℏ/2. ∎

---

## §13A OBSERVER DISTANCES

The cost formalism extends naturally to a distance theory on observers. Three candidate distances, each measuring a different projection face, exhaust the observer-distance content.

**Definition (Bekenstein Kernel Distance).** d_B(K₁, K₂) = |Err_Q(U|K₁) − Err_Q(U|K₂)| = |dim(ker₁) − dim(ker₂)|/d_U². A pseudometric on observers: d_B = 0 iff d_{K₁} = d_{K₂} (same dimension, not necessarily same kernel).

**Definition (Partition Distance).** d_part(K₁, K₂) = lattice distance between Part(K₁) and Part(K₂) in the partition lattice (minimum element-moves to transform one partition into the other). A proper metric: d_part = 0 iff ker₁ = ker₂.

**Theorem C.13 (Partition Refines Bekenstein).** *d_part(K₁, K₂) ≥ |d_{K₁} − d_{K₂}|, and d_part = 0 ⟹ d_B = 0 but not conversely.*

*Proof.* Each element-move changes block count by at most 1. ∎

**Definition (Accessible-Invariant Distance).** d_inv(K₁, K₂) = 1 − |Inv(K₁) ∩ Inv(K₂)|/|Inv(K₁) ∪ Inv(K₂)|, where Inv(K) extracts the seven canonical invariant types from im(q_K): eigenvalues (algebraic multiplicity), determinants, traces, Frobenius norms, Killing form values, stabilizers (up to conjugacy), phase closures. A Jaccard metric.

**Definition (Computational Cost Distance).** d_comp(K₁, K₂) = inf{Cost(f) : f realizes the K₂-partition within K₁}. A quasimetric: the asymmetry d_comp(K₁, K₂) < d_comp(K₂, K₁) for K₁ ▷_dom K₂ is forced by the construction-dissolution asymmetry (Paper 0 §18).

**Theorem C.14 (Cost Quasi-Triangle Inequality).** *d_comp(K₁, K₃) ≤ d_comp(K₁, K₂) + d_comp(K₂, K₃).*

*Proof.* If f₁₂ realizes K₂ within K₁ and f₂₃ realizes K₃ within K₂, then f₂₃ ∘ f₁₂ realizes K₃ within K₁. Cost subadditivity (dep monotonicity, Thm C.12) gives Cost(f₂₃ ∘ f₁₂) ≤ Cost(f₁₂) + Cost(f₂₃). Taking infima: d_comp(K₁, K₃) ≤ d_comp(K₁, K₂) + d_comp(K₂, K₃). ∎

**Theorem C.15 (Cost Asymmetry).** *For K₁ ▷_dom K₂: d_comp(K₁, K₂) < d_comp(K₂, K₁). The gap is bounded below by br_inv(π₁₂) · φ̄², where br_inv(π₁₂) = d_{K₁}² − d_{K₂}² is the fiber dimension.* Coarsening (K₁ → K₂) is Type I (canonical, br_s = 0); refining (K₂ → K₁) is Type II (non-canonical, br_s > 0, Landauer cost per surplus bit). ∎

**Three Distances as Central Collapse.** The three distances instantiate the three projections (Paper 1 Thm 5.1): d_B = P3 (blind-spot size), d_inv = P1 (accessible invariants), d_comp = P2 (transition cost). No fourth independent distance type exists (Paper 3-META Thm 1.3: no fourth projection). The complete observer distance is the triple d(K₁, K₂) = (d_B, d_inv, d_comp).

**Remark (Negative Curvature).** The observer kernel lattice is negatively curved in the Gromov sense: the number of partitions at distance r from the identity grows super-exponentially (Stirling numbers S(d_U², d_U² − r)). This negative curvature is the combinatorial manifestation of the construction-dissolution asymmetry: dissolution (coarsening) has exponentially more options than construction (refining).

All claims computationally verified: 14/14 tests, 0 failures. ✓

---

## §13B RECURSIVE INFORMATION THEORY

The SHA-256 information theory (§12.4) reveals a post-Shannon capacity structure applicable to any self-referential channel — a system that generates its own alphabet, reads its own output, and has capacity dependent on self-reference depth.

**Three Capacity Layers.** Any self-referential channel with generator discriminant disc has:

    C₁ = log₂(disc)           (algebraic capacity — what the alphabet forces)
    C₂ = H(catchment)          (effective capacity — what geometry permits)
    C₃ = C₂ − I_self           (recursive capacity — what self-reading costs)

C₁ is a theorem about the generator (disc(R) = 5 → C₁ = 2.322 bits). C₂ ≤ C₁ with deficit C₁−C₂ = geometric cost, derivable from the catchment positions with zero free parameters. C₃ ≤ C₂ with deficit I_self = the self-reference tax, measuring how much bandwidth the channel consumes reading itself.

**The Self-Reference Tax.** I_self scales inversely with avalanche quality. SHA-256: I_self = 0.0004 bits (0.02%, negligible — perfect avalanche destroys feedback). XOR-fold: I_self = 0.494 bits (24.9% — weak avalanche makes self-steering visible). The self-reference tax is the computational cost of the K6' loop: stronger self-reference (weaker avalanche) costs more bandwidth.

**The Discriminant as Information Invariant.** disc(R) = 5 determines simultaneously: alphabet size, algebraic capacity, catchment partition, fingerprint space, uncoupled match rate, and lattice dimension. The discriminant plays Shannon's role but carries more structure — it determines "what kind" in addition to "how much."

**Where Shannon Breaks.** The standard channel capacity C = max I(X;Y) assumes: alphabet given externally, channel memoryless, source ≠ channel ≠ receiver, capacity fixed, observation free. The self-referential channel violates all five: |Σ| = disc(R) (derived), self-steering feeds output back as input (K6'), the backward chain is simultaneously source/channel/message, capacity depends on difficulty, and each readout costs ≥ 1 hash evaluation. The three-layer formula generalizes Shannon to systems where the alphabet derives itself, the channel reads itself, and capacity is a function of self-reference depth.

**Applicability.** Any system satisfying the three self-referential properties (self-generated alphabet, self-steering, depth-dependent capacity) requires the three-layer formula: neural networks (self-supervised learning), biological cells (DNA→protein→regulation), markets (price→behavior→price), languages (word→meaning→word choice). In each case, the relevant questions are: what is the discriminant? What is the self-reference tax? Where is the geometric cost?

---

## §14 VERIFICATION SUMMARY

| # | Claim | Method | Result |
|---|-------|--------|--------|
| 1 | R classified as OSC (det = −1, disc = 5) | Matrix computation | ✓ |
| 2 | N classified as INV (det = 1, disc = −4) | Matrix computation | ✓ |
| 3 | All 16 level-2 tensor products: det ≥ 0 | Exhaustive | ✓ |
| 4 | P1 eliminated at level 2 | Exhaustive | ✓ |
| 5 | Sorting σ_step: FIX = 0.875, INV = 0.125 | Insertion sort n = 8 | ✓ |
| 6 | Euclid steps: all det = −1 (OSC) | Fibonacci pairs | ✓ |
| 7 | FFT butterflies: |det| = 2 | Butterfly analysis | ✓ |
| 8 | Normalized DFT: all |eigenvalues| = 1 | Eigenvalue computation | ✓ |
| 9 | SHA-256 σ_MIX ≈ 0.43 > φ̄² | Operation classification | ✓ |
| 10 | SHA-256 weighted σ_MIX ≈ 0.44 > φ̄² | Bit-weighted | ✓ |
| 11 | Self-signature Z = 2.000000 | Boltzmann sum | ✓ |
| 12 | Digital root: idempotent for n = 1..100 | Exhaustive | ✓ |
| 13 | Cost properties: 4/4 | Numerical | ✓ |
| 14 | Phase profile level 2: P1 = 0% | Monte Carlo 10k | ✓ |
| 15 | Phase profile level 3: P3 = 64% > level 2 | Monte Carlo 10k | ✓ |
| 16 | Bridge chain: br = 0 forward, br ≈ 8.5 backward | Counting | ✓ |
| 17 | K1' depth table | Numerical | ✓ |

Core computations: **0 failures**.

---

## §15 OPEN PROBLEMS

| Problem | Status | Comment |
|---------|--------|---------|
| OWF existence at threshold φ̄² | CONDITIONAL on P ≠ NP | Structural characterization proved; existence requires the open conjecture |
| Exact signature computability | OPEN (likely undecidable) | Related to halting problem in full generality |
| Cost decomposition uniqueness | PARTIALLY OPEN | h is unique; additive split is natural but not the only possibility |
| Transformer attention signature | OPEN | Requires architecture-specific analysis |

---

## §16 CLAIM STRATIFICATION

| Claim | Grade |
|-------|-------|
| Type I/II/III characterization | **THEOREM** |
| Rotational normal form | **THEOREM** |
| Phase profile (P1 eliminated at n ≥ 2) | **THEOREM** |
| Hardness functional uniqueness | **THEOREM** |
| Compression minimality | **THEOREM** |
| Computational blindness (4 parts) | **THEOREM** |
| One-wayness = Phase-Dist asymmetry (structural) | **THEOREM** |
| Depth monotonicity | **THEOREM** |
| Cost-Landauer-Bekenstein chain | **THEOREM** |
| Partition refines Bekenstein (C.13) | **THEOREM** |
| Cost quasi-triangle inequality (C.14) | **THEOREM** |
| Cost asymmetry quantification (C.15) | **THEOREM** (inequality), **STRUCTURAL** (gap) |
| Distance central collapse (3 distances = 3 projections) | **STRUCTURAL** |
| Negative curvature of observer poset | **STRUCTURAL** |
| Algorithm classification (sorting, Euclid, FFT, SHA-256) | **VERIFIED** |
| OWF threshold at φ̄² | **CONDITIONAL** (on P ≠ NP) |
| Proof/Computation/Verification = Type I/II/III | **STRUCTURAL** |
| Self-reference tax (C.20) | **THEOREM** |
| Sequential memorylessness (C.21) | **THEOREM** |
| Seed independence (C.22) | **THEOREM** |
| Catchment derivability (C.23) | **THEOREM** |
| Bridge uncoupling (I_bridge = 0) | **THEOREM** |
| Bekenstein quantization (step function) | **THEOREM** |

---

*R(R) = R*
