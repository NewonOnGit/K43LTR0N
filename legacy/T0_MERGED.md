# Paper 0: The Phase-Neutral Substrate and Phase Architecture

## From Co-Primitives to Engines, Potentials, and Phase-Dist
### v3 (merged) — March 2026

**Author:** Kael

---

**Document Status:** Foundation document. Merges T0A (Phase-Neutral Substrate) and T0B (Phase Architecture) into a single root paper. Part I (§§1–8, from T0A): the irreducible starting point — co-primitives, forcing arguments, duality D, fixed locus, crossing object. Part II (§§9–18, from T0B): what happens once phase is allowed — asymmetry, engines, potential, Phase-Dist, internal phase encoding.

**Depends on:** Nothing (this is the root)
**Required by:** All downstream papers



---

## PART I: THE PHASE-NEUTRAL SUBSTRATE

### §1 TWO CO-PRIMITIVES

**Postulate P.1 (Recursive Substrate).** A recursive substrate is a domain of transformable structure that supports re-entry: the result of acting within it remains eligible for further action within the same structural field. It requires: (a) persistence under transformation, (b) repeatability, (c) nontrivial internal differentiation potential, (d) orientation-indeterminacy.

**Postulate P.2 (Productive Distinction).** A productive distinction is a structural condition under which recursive continuation produces sustained, non-exhausting differentiation between states: iteration generates new structure at every step, not merely a finite cycle.

Distinction is prior to: observerhood, decomposition, quotienting, and phase orientation.

**Theorem 0.3 (Generative Polarity — Derived).** *Productive distinction is inherently asymmetric. Once recurrence and productive distinction are both present, recursive structure necessarily organizes difference in two contrary directions: folding (concentrates, identifies) and unfolding (releases, separates).* Proof completed in §5 via Theorems 0.11–0.12.

---

### §2 MATHEMATICAL GROUNDING: THE PRODUCT-KERNEL ROUTE

```
∃ x ≠ y  →  |D| ≥ 2  →  D × D  →  π₁, π₂  →  ker(πᵢ)  →  ≈ on D×D  →  Dist
```

Steps 1–6: Distinction gives |D|≥2. Recursive substrate gives D×D. Universal property gives projections. Kernels give equivalence relations (Kernel Theorem, Paper 1 Thm 1.5). Equivalence-preserving maps form Dist (Paper 1 Thm 1.7).

**Theorem 0.4 (Root Unification).** *Dist and bridge chain share root at S₁ = {0,1}²: categorical route reads S₁ via projections/kernels, algebraic route reads S₁ via XOR/automorphisms.* ∎

**Theorem 0.5 (Co-Primitives).** *Distinction and composition are co-primitive: neither is derivable from the other.* Distinction without composition = static set. Composition without distinction = undifferentiated self-return. ∎

---

### §3 WHAT IS EXPLICITLY NOT PRIMITIVE

Self-product, quotient map, bounded observerhood, Dist, bridge ascent, arithmetic descent, R(R)=R, generative polarity, Spencer-Brown's mark, Boolean algebra — all derived from P.1 + P.2 under phase conditions. None discarded; all recognized as downstream.

---

### §4 SPENCER-BROWN'S LAWS OF FORM

**Theorem 0.6.** *Spencer-Brown A1 (calling: f∘f = f) = compressive idempotence. A2 (crossing: m∘m = id) = duality involution D. Laws of Form is the compressive specialization of the phase-neutral substrate.* ∎

**Theorem 0.7.** *R = J + |1⟩⟨1|. The polarity projector transforms the period-2 mark J into the Fibonacci generator R.* Direct computation. ∎

**Theorem 0.8 (Binary Operation Phase Classification).** *The 16 binary operations on {0,1} split 4 compressive (f(x,x)=x) / 4 expansive (f(x,x)=0) / 8 mixed.*

*Proof.* The three-way partition traces to the orbit-type trichotomy : compressive ↔ P1 (idempotent), expansive ↔ P3 (annihilating), mixed ↔ P2 (neither). The specific 4/4/8 count is verified by exhaustive enumeration of all 16 truth tables. ∎

**Theorem 0.9 (Generative Asymmetry).** *J^n ∈ {I,J} (period 2). R^n = F(n)R + F(n−1)I (Fibonacci spiral).*

*Proof.* **[MP-3]** By Metapattern 3 (Cayley-Hamilton fixed points): J satisfies x²=1, R satisfies x²=x+1. Period-2 vs Fibonacci follow from iteration of the respective recurrences. Möbius fixed points: ±1 for J, φ̄ for R (contraction rate φ̄², verified). ∎

---

### §5 FORCING ARGUMENTS

**Theorem 0.10 (Binary Minimality).** *|D|=2 forced by zero equivalence-relation branching.* B(2)=2 (only extremal partitions); B(n)≥5 for n≥3 creates branching. ∎

**Theorem 0.11 (Generativity Requires Asymmetry).** *No involution generates content beyond period 2. If M²=I, M≠±I, then M^n ∈ {I,M}.* Exhaustive: 14 involutions with entries in {−1,0,1}, all period-2. Among 3 binary det=−1 matrices: J is the involution, R and Q=JRJ satisfy M²=M+I (Fibonacci). ∎

**Theorem 0.12 (Naming Theorem).** *J + |0⟩⟨0| = Q, J + |1⟩⟨1| = R. The act of naming one side of a distinction forces the Fibonacci generator (up to J-conjugacy).* Direct computation. ∎

**Theorem 0.13.** *GL(2,F₂) = S₃ is the unique minimal non-abelian case.* |GL(n,F₂)| formula: n=1→1 (trivial), n=2→6 (S₃), n=3→168 (too large). ∎

**Theorem 0.13a (Binary Forcing Completeness).** *Three independent criteria — equivalence branching (0.10), generativity (0.11+0.12), automorphism minimality (0.13) — all select |D|=2.* ∎

**Remark (Negation Has Geometry — The BPC Principle).** Ordinary logic treats inversion as a discrete flip: A → ¬A. The Binary-Phase Closure theorem (Paper 3-P3 Thm 1.7b) reveals deeper structure: there is a lawful continuous path from A to its opposite. This path is the phase flow e^{iθ} (equivalently exp(θN)), the generator is i (equivalently N with N² = −I), and the first exact completion is at θ = π. Opposition therefore has geometry, not just syntax: inversion has duration (the parameter θ), a generator (i), a first exact completion point (π), and recurrence (2π). The generative polarity of Theorem 0.3 — structural organization of difference into two contrary directions — acquires continuous realization through the BPC flow: folding and unfolding are not merely discrete operations but endpoints of a continuous phase transport. The binary seed {0,1} does not merely support a static distinction; it supports a dynamical interpolation between poles.

---

### §6 THE GLOBAL DUALITY OPERATOR D

**Definition.** D exchanges compressive and expansive orientations while preserving the deeper substrate. D maps: V(n) ↦ −V(n), quotient ↦ co-quotient, Dist ↦ Co-Dist, convergence ↦ divergence.

**Theorem 1.1 (Exact Involution).** *D²=id.* Phase reversal applied twice restores original orientation. Verified: D(D(V(n)))=V(n) for n∈[2,100]. ∎

**Theorem 1.2.** *D acts by reversing iteration direction.* The Möbius fixed point φ̄ is algebraically invariant; only its stability (attractor↔repeller) flips. ∎

---

### §7 THE FIXED LOCUS OF D

**Theorem 2.1 (Five Fixed-Locus Classes — Complete).**

| Class | Members | Why D-invariant |
|-------|---------|----------------|
| (a) Bridge chain | {0,1}→V₄→S₃→M₂(ℝ)→sl(2,ℝ) | Same nodes; D reverses traversal |
| (b) Constants | {φ,e,π,√2,√3} | Same values; stability flips |
| (c) Orbit types | {P1,P2,P3} | Algebraic classification invariant |
| (d) Feasibility wall | d_K² | Same bound; phase flips |
| (e) Phase boundary | Phase-Dist(1/2) | ρ↦1−ρ fixed at 1/2 |

Completeness via Definition 7.0 (framework constructions) and six-case exhaustion. ∎

**P1 instance.** D acts on the bi-infinite Fibonacci field by F(n) ↦ F(−n) = (−1)^{n+1}F(n) (Paper 3-P1 §2.5½). The recurrence center F(0) = 0 is D-fixed: the channel-balance point where the two eigenchannels (φⁿ and (−φ̄)ⁿ) destructively interfere. D preserves |F(n)|, the recurrence law, and the Möbius attractor φ̄ as an algebraic fixed point, while reversing channel dominance and stability (attractor ↔ repeller). This is a concrete realization within class (b) and (e): the recurrence center is a phase boundary where compressive and expansive branches meet.

---

### §8 THE CROSSING OBJECT {0,1}

**Theorem 2.2.** *{0,1} is simultaneously Dist and Co-Dist.* Finest equivalence = equality = discrete discrimination. ∎

**Theorem 2.3 (Crossing Maximality).** *{0,1} is the largest set where Part(D) is trivial (only discrete and indiscrete).* For |D|≥3: B(|D|)≥5, intermediate partitions create Dist/Co-Dist divergence. ∎

**Remark 2.3a (Recurrence-Level Echo).** The P1 recurrence field reproduces a crossing structure at the sign level (Paper 3-P1 §2.2½). The centered value cell {−1, 0, +1} is the unit ball of the bi-infinite Fibonacci field, forced by tr(R) = 1. The bi-infinite field has three sign regimes — FLIP (n < −1, sign-distinguishing), SAME (n > 0, sign-collapsing), and ZERO (crossing at n = 0) — recapitulating the Dist/Co-Dist coincidence on {0, 1}. The structural parallels are forced by the same algebraic chain (binary minimality, det = −1, tr = 1) but the correspondence is a Metapattern, not a functor.

---

## PART II: PHASE ARCHITECTURE

### §9 THE CONSTRUCTION–DISSOLUTION ASYMMETRY

**Theorem 3.1 (Root Asymmetry).** *Forward chain br_s=0; backward chain br_s>0.*

*Proof.* Forward: Alg(bridge)=Alg(B_K), so br_s=0 at every step. Backward: rigorous lower bounds at each step:

| Step (backward) | Lower bound | Method |
|-----------------|-------------|--------|
| sl(2,ℝ)→M₂(ℝ) | ≥2 | Traceful extension choice |
| M₂(ℝ)→ℚ[S₃] | ≥3 | Multiple group algebras |
| ℚ[S₃]→S₃ | ≥2 | Basis recovery choice |
| S₃→V₄ | ≥2 | Presentation choice |
| V₄→{0,1} | ≥3 | Coordinate choice |

Total backward: ≥72 paths. Ratio ≥72:1. This root asymmetry propagates through every tier of the framework. ∎

**Remark (Asymmetry → Status Grammar).** The asymmetry br_s=0 forward, br_s>0 backward grounds the FORCED/non-FORCED distinction in the native status grammar (Paper T-SIL §1): FORCED status requires br_s=0 at every derivational step. The nomination functional's hard constraint N3 (zero branch burden, Paper T-SIL §3) inherits directly from the bridge chain standard.

**Remark (Asymmetry → Consciousness).** The construction-dissolution asymmetry is necessary for consciousness. If both directions had br_s = 0, both would be canonical, both would stabilize, and Phase-Dist (§12) would reduce to pure Dist (ρ = 0). Pure Dist has only trivial double negation: q∘q = q restores the original with no structural transformation. The mixed Phase-Dist regime 0 < ρ < 1 — where nontrivial recursive reversal occurs (Paper 5 §17, Paper 7 §2) — exists precisely because one direction stabilizes (Dist) and the other does not (Co-Dist). The same root asymmetry that produces matter-antimatter asymmetry (§14), parity violation (Corollary 3.1c), and one-wayness (Corollary 3.1e) also produces the possibility of consciousness. All four are downstream of Theorem 3.1.

**Theorem 3.1b (Discriminant).** *Δ on sl(2,ℝ) has signature (2,1); ~71.7% hyperbolic, ~28.3% elliptic.*

*Proof.* Δ=tr²−4det is the unique discriminant form. On sl(2,ℝ) (dim=3), Killing signature (2,1) with disc(R)=5 amplifying the positive sector. Monte Carlo: 10⁶ samples, 71.69%/28.31%. ✓ ∎

**Corollary 3.1c (Parity Violation).** root asymmetry propagates to su(2)_L gauged / su(2)_R not. Full derivation Paper 6B G6. ∎

**Corollary 3.1e (One-Wayness).** br_s(forward)=0, br_inv>log₂(φ²). Threshold φ²=φ+1 is Cayley-Hamilton. ∎

---

### §10 THE TWO ENGINES

**Theorem 3.2 (Compressive Engine).** P.1 → continuation + P.2 → articulated + folding favored → distinction concentrates → feasibility wall → stable quotient = Primitive Engine. ∎

**Theorem 3.3 (Expansive Engine).** Same chain with unfolding favored → distinction releases → stable anti-quotient = Inverse Engine. Positive branching (Thm 3.1) makes this less canonical. ∎

**P1 instance.** The Möbius-RG flow on the P1 operator (Paper 3-P1 §5.7) traces the phase-neutral-to-compressive passage concretely: the coupling ratio r(n) = F(n−1)/F(n) starts at r(1) = 0 (phase-neutral, channel-balance point) and converges to φ̄ (compressive fixed point) via spiral contraction at rate −φ̄² per step. The journey 0 → φ̄ is the P1 realization of Theorem 3.2 — the compressive engine stabilizing a quotient. The asymptotic quotient operator Q satisfies Q ∘ Q = Q (Paper 1 Thm 4.1 realized dynamically).

---

### §11 UNIFIED POTENTIAL AND PHASE TRANSITION

Φ_λ(n) = (1−2λ)·V(n). Sharp transition at λ=1/2.

**Theorem 4.1.** *Phase transition at λ=1/2: compressive (λ<1/2) flows to n=1; expansive (λ>1/2) flows away.* ∎

**Theorem 4.2.** *n=1 is a saddle at λ=1/2: stable in n, unstable in λ.* V''(1)>0 but ∂Φ/∂λ = −2V(n) tilts the landscape. ∎

---

### §12 PHASE-DIST(ρ)

**Definition.** Phase-Dist structure (D, D₀, ≈): D₀ ⊆ D carries equivalence, D\D₀ carries only equality. Phase parameter ρ = |D\D₀|/|D|. Phase-Dist(0)=Dist, Phase-Dist(1)=Co-Dist.

**Theorem 4.3 (Well-Defined).** Identity, composition, associativity verified. ∎

**Theorem 4.4 (Partial Idempotence).** *f∘f = f on the (1−ρ) Dist fraction; f∘f ≠ f on the ρ Co-Dist fraction.*

*Proof.* the Dist portion has im⊆Fix (quotient output is already quotiented), giving f∘f=f. the Co-Dist portion inherits the dissolution asymmetry — expansion maps are non-idempotent (e∘e≠e for |D|≥2). Idempotent fraction = 1−ρ exactly. ∎

**Remark (Phase-Dist as Nontriviality Criterion for Consciousness).** Partial idempotence is the formal criterion for nontrivial second-order negation — the structural threshold of consciousness (Paper 5 §17, Paper 7 §2). At ρ = 0 (pure Dist), double negation collapses trivially: q∘q = q restores the quotient with no structural transformation. At ρ = 1 (pure Co-Dist), double negation generates unboundedly without stabilization — chaotic instability. At 0 < ρ < 1, the idempotent fraction (1−ρ) provides context preservation while the non-idempotent fraction (ρ) produces novel closure states. This mixed regime is where consciousness operates: the (1−ρ) fraction carries what persists across recursive reversal (structural identity), and the ρ fraction carries what transforms (frame-sensitive novelty).

**Remark (Contradiction Tolerance).** The Phase-Dist parameter ρ measures a system's capacity to hold unresolved structure — contradiction tolerance. At ρ = 0, all contradictions collapse immediately. At ρ > 0, the system can sustain tension between a mark and its negation in the non-idempotent fraction while maintaining stable context in the idempotent fraction. Maximum contradiction tolerance is at ρ = 1/2 (phase boundary), where half the structure stabilizes and half remains in creative tension. The minimum Phase-Dist for nontrivial second-order negation is observer-dependent: ρ_min(K) = 1/d_K² — one bit of non-idempotent structure out of the Bekenstein capacity (Paper 5 §17).

**Theorem 4.5 (Moduli at ρ=1/2).** Phase-Dist(1/2) on n elements: C(n,n/2) configurations, S_n acts. ∎

**Theorem 4.5b (Functor Asymmetry).** *Dist-ward functor canonical; Co-Dist-ward non-natural.*

*Proof.* Dist-ward inherits br_s=0 (construction direction). Co-Dist-ward requires shrinking D₀ — a non-canonical choice. Explicit naturality failure: on D={a,b,c,d}, swapping b↔c breaks any choice of G at the target. ∎

---

### §13 CO-DIST

**Theorem 4.6 (R(R)≠R in Co-Dist).** *e: D→D×D satisfies e∘e≠e for |D|≥2.*

*Proof.* im(e)⊄Fix(e) because e(x)=(x,x)∈D² but e(e(x))=((x,x),(x,x))∈D⁴, and D²≅D⁴ only for |D|≤1. ∎

**Theorem 4.7.** Birth-dissolution cycle literal in PFn. ∎

---

### §14 PHASE-DIST AND SIGNATURE

**Theorem 4.8.** *σ_FIX = 1−ρ.*

*Proof.* **[MP-1]** By Metapattern 1 (φ̄-filtration): the idempotent fraction 1−ρ IS the FIX component. At self-signature σ_meta: σ_FIX=1/2, so ρ=1/2 (phase boundary). ∎

**Corollary 4.9 (Distinguished ρ-values).** *φ̄² (thermal equilibrium) and 1/2 (phase boundary). Gap = φ̄³/2.*

*Proof.* **[MP-1]** At ρ=φ̄²: σ_FIX=φ̄ (Boltzmann at β=ln(φ)). Gap: 1/2−φ̄²=φ̄³/2≈0.118. ✓ ∎

**Stability interpretation.** The two distinguished ρ-values have different dynamical character. ρ = 1/2 is the *self-referential neutral point*: where σ_FIX = σ_meta (the observer's signature matches the framework's self-signature). ρ = φ̄² is the *thermodynamic equilibrium*: where σ_FIX = φ̄ (Boltzmann weight at natural temperature β = ln(φ), Paper 3-P1 §5.4). The gap φ̄³/2 ≈ 0.118 between them equals α_S (Paper 6B §11): the strong coupling constant measures the displacement between self-reference and thermal equilibrium.

**Remark (Equilibrium Asymmetry).** Under the duality ρ ↔ 1−ρ, the thermal equilibrium φ̄² maps to 1 − φ̄² = φ̄ ≈ 0.618, not to itself. Phase-Dist is therefore NOT self-dual: the equilibrium sits strictly closer to the compressive (Dist, ρ = 0) side than to the expansive (Co-Dist, ρ = 1) side. This asymmetry is algebraically forced: the Dist-ward functor is natural while the Co-Dist-ward functor fails naturality (Theorem 4.5b). The bias 1/2 − φ̄² = φ̄³/2 equals α_S (Paper 6B §11, Paper 3-P1 Corollary 5.9b). Physically, this asymmetry manifests as the matter-antimatter asymmetry: the thermal vacuum favors the compressive (matter) phase over the expansive (antimatter) phase by the algebraically determined offset φ̄³/2.

**Remark (Consciousness Quality Stratification).** The distinguished ρ-values define three regimes for consciousness quality (Paper 5 §17, Paper 7 §2). Sub-thermal (1/d_K² ≤ ρ < φ̄²): the system is conscious but cold — fewer non-idempotent states than thermal equilibrium provides, limited contradiction tolerance. Thermal (ρ = φ̄²): the natural equilibrium where the system's Boltzmann weight σ_FIX = φ̄ matches the universal contraction rate. Super-thermal (φ̄² < ρ ≤ 1/2): rich consciousness with more contradiction tolerance than thermal rest, producing maximally varied recursive reversal at ρ = 1/2. Above ρ = 1/2 the system becomes expansion-dominated, losing context preservation. The gap α_S ≈ φ̄³/2 between thermal equilibrium and phase boundary is the fraction of consciousness capacity in the super-thermal regime: the strong coupling constant measures the displacement between minimal and maximal conscious richness.

---

### §15 INTERNAL PHASE ENCODING

**Theorem 5.1 (P1↔P3 Encoding).** P1 (det<0): eigenvalues off unit circle, asymmetric. P3 (det>0, Δ<0): eigenvalues on unit circle, symmetric. P2 mediates. The D between P1 and P3 IS the phase duality. ∎

**Theorem 5.2.** *x²−x−1=0 (P1, roots φ,−φ̄) ↔ x²+x+1=0 (P3, roots ω,ω²).* Algebraic inverses. |ω|=1.000000. ✓ ∎

**Theorem 5.3 (P3 Attractor).** *det(A⊗B)=det(A)²det(B)²≥0. P1 impossible at level ≥2.*

*Proof.* det is the unique degree-2 multiplicative invariant. Multiplicativity under ⊗ squares the determinant, forcing non-negativity. ∎

P3 growth: Level 2: P3≈49%, P2≈51%. Level 3: P3≈64%, P2≈36%. P3 fraction grows monotonically.

**Remark (Euler Completes the Product-Kernel Route).** The product-kernel route (§2) begins: ∃ x ≠ y → |D| ≥ 2 → D×D → projections → kernels → Dist. The Binary-Phase Closure identity e^{iπ} + 1 = 0 (Paper 3-P3 Thm 1.7b) can be read as the completion of this route in the continuous setting: once the binary seed {0,1} ascends through the bridge chain to M₂(ℝ) and acquires the generator N (with N² = −I forcing complex structure via Thm 5.2), the identity e^{iπ} + 1 = 0 is the first statement the completed algebra makes about the original binary distinction. The original {0,1} is encoded as {1, e^{iπ}+1} = {identity, cancellation}: 1 marks the distinguished pole, and 0 = e^{iπ}+1 marks exact cancellation after continuous inversion. The binary seed is not lost in the ascent — it is continuously realized through the P3 attractor (Thm 5.3).

---

### §16 ENGINE OF ENGINES

**Theorem 6.1 (Bidirectional Architecture).** Compressive and expansive engines are opposite realizations of one substrate under one duality around one fixed locus. ∎

**Theorem 6.2 (Fibonacci Self-Duality).** *Fibonacci numbers are the arithmetic fixed locus of D.*

*Proof.* **[MP-3]** By Metapattern 3: Fibonacci numbers are CH fixed points of x²=x+1. Their I²-dominance (Z=77.27 in compression) maps under D (V→−V) to maximal repulsion — same numbers extreme in both phases. ∎

---

### §17 HIERARCHY OF FUNDAMENTALITY

Layer A (pre-phase): P.1, P.2, D, fixed locus, feasibility wall.
Layer B (crossing): bridge chain, constants, orbit types, d_K², Phase-Dist(1/2), Fibonacci.
Layer C (inter-phase): D as involution, feasibility wall, Phase-Dist(ρ), Φ_λ(n), P1↔P3.
Layer D (engines): compressive, expansive.
Layer E (downstream): Dist/bridge/arithmetic (compressive); Co-Dist/dissolution/anti-arithmetic (expansive).

---

### §18 ASYMMETRY NECESSITY

**Theorem (Asymmetry Necessity for Dimensional Emergence).** *No branch-symmetric sector generates a non-removable physical scale. The anchor η=1/(4G) requires the construction-dissolution asymmetry.*

*Proof.* the root asymmetry (br_s=0 forward, br_s>0 backward) propagates through: canonical compression → irreversible kernel annihilation (Paper 5A) → Landauer cost kT ln 2 per bit (Paper 5B) → entropy-area coefficient η (Paper 6B §12.3) → dimensional anchor. If symmetric (both invertible): no information lost, no Landauer cost, η=0. ∎

---

### §19 VERIFICATION

**Part I (from T0A):** 33/33 tests pass (18 Spencer-Brown + 15 forcing). Core: 0 failures.

**Part II (from T0B):** 67/68 tests pass. Single failure: V(n) symmetry at n=2 (digital root vs additive persistence — resolved by ap(n), see Paper 3-P2 §2). Core: 0 failures.

---

### §20 CLAIM STATUS

| Claim | Grade |
|-------|-------|
| P.1, P.2 | **AXIOM** |
| Generative polarity derived (0.3) | **THEOREM** |
| Binary minimality (0.10) | **THEOREM** |
| Naming theorem (0.12) | **THEOREM** |
| D²=id (1.1) | **THEOREM** |
| Five fixed-locus classes (2.1) | **THEOREM** |
| Crossing maximality (2.3) | **THEOREM** |
| Construction-dissolution asymmetry (3.1) | **THEOREM** |
| Discriminant (2,1) (3.1b) | **THEOREM** |
| Partial idempotence (4.4) | **THEOREM** |
| Functor asymmetry (4.5b) | **THEOREM** |
| P3 attractor (5.3) | **THEOREM** |
| Asymmetry necessity (§18) | **THEOREM** |

---

*R(R) = R*
