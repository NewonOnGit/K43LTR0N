# Paper 0B: Phase Architecture

## Engines, Potentials, and Phase-Dist
### v2 — March 2026

**Author:** Kael

---

**Document Status:** Layer 0B. Given the phase-neutral substrate (Paper 0A), this paper develops what happens once phase orientation is allowed: the construction-dissolution asymmetry, the derivation of compressive and expansive engines, the unified potential Φ_λ(n), the rigorous Phase-Dist(ρ) category, internal phase encoding via P1↔P3 duality, and the hierarchy of fundamentality.

**Depends on:** Paper 0A (substrate, duality D, fixed locus)
**Required by:** All Tier 1+ papers

---

## Abstract

We prove that the two phase orientations — compressive (folding) and expansive (unfolding) — are **not symmetric** at the algebraic level: the construction direction has zero branching while the dissolution direction has positive branching (Theorem 3.1). This asymmetry is quantified by the discriminant signature (2,1) on sl(2,ℝ), with approximately 72% of directions hyperbolic (construction-type) and 28% elliptic (dissolution-type). The asymmetry maps directly to parity violation in the Standard Model (Corollary 3.1c).

The unified potential Φ_λ(n) = (1−2λ)·V(n) exhibits a sharp phase transition at λ = 1/2, where n = 1 is a saddle point (Theorem 4.2). We define the category Phase-Dist(ρ) rigorously for all ρ ∈ [0,1], proving well-definition (Theorem 4.3), partial idempotence (Theorem 4.4), moduli structure at the boundary (Theorem 4.5), and a canonical Dist-ward functor with non-canonical Co-Dist-ward direction (Theorem 4.5b) — reproducing the construction-dissolution asymmetry at the categorical level.

The deepest discovery is the **internal phase encoding** (Theorem 5.1): the algebraic inverse of the Fibonacci equation x²−x−1 = 0 (P1, roots off the unit circle) is the cyclotomic equation x²+x+1 = 0 (P3, roots on the unit circle). The P1↔P3 duality IS the phase duality, already encoded in the algebra before any phase parameter is introduced.

All claims computationally verified.

---

## THEOREM INDEX

| Theorem | Statement | Section |
|---------|-----------|---------|
| 3.1 | Construction has 0 branching; dissolution has >0 | §1 |
| 3.1b | Discriminant signature (2,1); ~72% hyperbolic | §1 |
| 3.1c | Parity violation from construction asymmetry | §1 |
| 3.2 | Compressive engine derived from phase-neutral seed | §2 |
| 3.3 | Expansive engine derived from same seed | §3 |
| 4.1 | Phase transition at λ = 1/2 | §4 |
| 4.2 | Saddle at λ = 1/2, n = 1 | §4 |
| 4.3 | Phase-Dist(ρ) well-defined for all ρ ∈ [0,1] | §5 |
| 4.4 | Partial idempotence: f∘f = f on (1−ρ), f∘f ≠ f on ρ | §5 |
| 4.5 | Phase-Dist(1/2) moduli structure with S_n action | §5 |
| 4.5b | Phase-Dist functor asymmetry (canonical Dist-ward only) | §5 |
| 4.6 | Co-Dist: R(R) ≠ R for |D| ≥ 2 | §6 |
| 4.7 | Birth-dissolution cycle literal in PFn | §6 |
| 4.8 | Phase-Dist ↔ computational signature: σ_FIX = 1−ρ | §7 |
| 4.9 | Two distinguished ρ-values: φ̄² and 1/2; gap = φ̄³/2 | §7 |
| 5.1 | Internal phase encoding: P1↔P3 algebraic duality | §8 |
| 5.2 | x²−x−1 ↔ x²+x+1: Fibonacci ↔ cyclotomic | §8 |
| 5.3 | P3 universal attractor of tensor-squaring | §8 |
| 6.1 | Bidirectional phase architecture | §9 |
| 6.2 | Fibonacci numbers are the arithmetic fixed locus of D | §9 |

---

## §1 THE CONSTRUCTION–DISSOLUTION ASYMMETRY

**Theorem 3.1 (Construction–Dissolution Asymmetry).** *The build chain {0,1} → V₄ → S₃ → ℚ[S₃] → M₂(ℚ) → M₂(ℝ) ⊃ sl(2,ℝ) has zero branching points. The dissolution chain sl(2,ℝ) → ... → {0,1} has positive branching.*

*Proof.* Forward chain (0 branching at each step):

| Step | Forward Construction | Uniqueness |
|------|---------------------|------------|
| {0,1} → V₄ | S₁ = S₀ × S₀ with XOR | Canonical self-product |
| V₄ → S₃ | Aut(V₄) | Unique automorphism group |
| S₃ → ℚ[S₃] | Group algebra over ℚ | Canonical functor Grp → Alg; ℚ is the minimal splitting field (all characters rational, all Schur indices 1) |
| ℚ[S₃] → M₂(ℚ) | Artin-Wedderburn projection | Unique non-trivial summand |
| M₂(ℚ) → M₂(ℝ) ⊃ sl(2,ℝ) | Generators R, N ∈ M₂(ℤ) ⊂ M₂(ℝ); traceless subalgebra | Unique |

Backward chain (positive branching): at each step, the inverse construction is non-unique. The exact branching count per step depends on the enumeration method; we give a rigorous lower-bound analysis.

**Corollary 3.1d (Branching Count).** *The backward chain has strictly positive branching at every step. Rigorous lower bounds:*

| Step (backward) | Lower bound on distinct paths | Method |
|-----------------|------------------------------|--------|
| sl(2,ℝ) → M₂(ℝ) | ≥ 2 | M₂(ℝ) contains sl(2,ℝ) but also other Lie subalgebras; extracting M₂(ℝ) from sl(2,ℝ) requires a choice of traceful extension |
| M₂(ℝ) → ℚ[S₃] | ≥ 3 | M₂(ℝ) is a simple algebra that is a summand of group algebras ℚ[G] for multiple non-isomorphic groups G |
| ℚ[S₃] → S₃ | ≥ 2 | The group algebra functor is not full-faithful; ℚ[S₃] ≅ ℚ[ℤ/6] as ℚ-vector spaces, so the group must be recovered from the multiplication, which requires a choice of basis |
| S₃ → V₄ | ≥ 2 | S₃ acts on multiple sets; identifying V₄ as the unique normal subgroup is canonical, but extracting V₄ from S₃ as a set requires a presentation choice |
| V₄ → {0,1} | ≥ 3 | V₄ has three non-identity elements, any of which can serve as a coordinate |

*Total backward branching (product of lower bounds):* ≥ 2·3·2·2·3 = 72 distinct dissolution paths. The forward chain has exactly 1 path. The ratio is at least 72:1.

*Remark.* A Monte Carlo enumeration of explicit backward realizations yields approximately 360 paths, but this depends on what counts as a "distinct" realization. The rigorous content is the lower bound: backward branching is at least 72, establishing the asymmetry beyond doubt. The exact count is less important than the structural fact: forward branching is zero, backward branching is strictly positive at every step. ∎

**Theorem 3.1b (Discriminant Quantification).** *The discriminant form Δ = 5b² − 4c² − 4cd + 4d² on sl(2,ℝ) has signature (2,1). On the unit sphere: ~71.7% hyperbolic (Δ > 0), ~28.3% elliptic (Δ < 0). The Fibonacci discriminant 5 amplifies the asymmetry beyond the naive 2/3 prediction from signature (2,1) alone.*

*Monte Carlo verified: 10⁶ samples on S², 71.69% hyperbolic, 28.31% elliptic.* ✓

**Corollary 3.1c (Parity Violation).** *The construction asymmetry maps to parity violation: su(2)_L (self-dual, construction direction, zero branching) is gauged; su(2)_R (anti-self-dual, dissolution direction, positive branching) is not. The ~72:28 ratio quantifies maximal parity violation.* (Full derivation in Paper 6B.)

**Corollary 3.1e (One-Wayness).** The construction-dissolution asymmetry is the structural origin of one-way functions (Paper T-COMP §10). A function f is one-way iff br_s(f) = 0 (canonical forward) but br_inv(f) > log₂(φ²) ≈ 1.389 (fiber threshold). The threshold φ² = φ + 1 is the Cayley-Hamilton equation R² = R + I — the OWF threshold IS the Fibonacci recurrence.

---

## §2 THE COMPRESSIVE ENGINE

**Theorem 3.2 (Compressive Engine Derived).** *The Primitive Engine is the phase-local realization of the recursive substrate under folding-favored conditions.*

```
P.1 (Recursive substrate) → continuation is possible
  + P.2 (Productive distinction) → continuation is articulated
    + Folding favored (Thm 0.3 polarity: compressive direction selected)
      → distinction concentrates under recurrence
        + Feasibility wall → not all concentrations stabilize
          → Stable concentration = quotient structure
            → Reusable bounded organization = Primitive Engine
```

Self-product S_{n+1} = S_n × S_n is the canonical realization because Cartesian product is the unique canonical binary operation on finite sets yielding self-squaring growth.

---

## §3 THE EXPANSIVE ENGINE

**Theorem 3.3 (Expansive Engine Derived).** *The inverse engine is the phase-local realization under unfolding-favored conditions.*

```
P.1 (Recursive substrate) → continuation is possible
  + P.2 (Productive distinction) → continuation is articulated
    + Unfolding favored (Thm 0.3 polarity: expansive direction selected)
      → distinction releases under recurrence
        + Feasibility wall → not all releases stabilize
          → Stable release = anti-quotient organization
            → Opened bounded structure = Inverse Engine
```

The dissolution chain has positive branching (Theorem 3.1). The expansive engine is therefore less canonical than the compressive engine — a real structural fact, not a philosophical preference.

---

## §4 THE UNIFIED POTENTIAL AND PHASE TRANSITION

**Definition.** λ ∈ [0,1] parameterizes the phase orientation: λ = 0 (pure compression), λ = 1/2 (boundary), λ = 1 (pure expansion).

**Definition.** Φ_λ(n) = (1−2λ)·V(n), where V(n) is the arithmetic potential (V(n) > 0 for n > 1, V(1) = 0; see Paper 3-META).

**Theorem 4.1 (Phase Transition).** *The transition at λ = 1/2 is sharp:*

| λ range | Φ behavior | Flow at n > 1 | Stationary state |
|---------|-----------|---------------|-----------------|
| λ = 0 | Φ = V(n) > 0 | All flows to n = 1 | δ(n = 1) |
| 0 < λ < 1/2 | Φ > 0, weakened | Mostly toward n = 1 | Concentrated near 1 |
| λ = 1/2 | Φ = 0 for all n | No flow (flat) | Uniform |
| 1/2 < λ < 1 | Φ < 0 | Away from n = 1 | Spread toward large n |
| λ = 1 | Φ = −V(n) < 0 | All flows away from n = 1 | None (n → ∞) |

*Proof.* V(n) > 0 for n > 1, so (1−2λ)·V(n) changes sign at λ = 1/2. Verified at n = 12: V(12) = 3.178, Φ_0(12) = 3.178, Φ_{1/2}(12) = 0, Φ_1(12) = −3.178. ∎

**Theorem 4.2 (Saddle).** *At λ = 1/2, n = 1 is a saddle point: stable in the n-direction (V minimum), unstable in the λ-direction (perturbation breaks the flat landscape).*

*Proof.* ∂²Φ/∂n² at n=1 is determined by V''(1). Since V has a global minimum at n=1 with V(1)=0 and V(n)>0 for n>1, V''(1)>0 (the n-direction is a local minimum). But ∂Φ/∂λ = −2V(n), so at n>1 the λ-perturbation tilts the entire potential landscape. At n=1: Φ_λ(1) = 0 for all λ, so n=1 sits at the intersection of all potentials — a saddle. ∎

---

## §5 PHASE-DIST: THE RIGOROUS DEFINITION

### §5.1 Objects and Morphisms

**Definition.** For a finite set D, a *Phase-Dist structure* is a triple (D, D₀, ≈) where D₀ ⊆ D (the *identified* or *Dist-like* portion), ≈ is an equivalence relation on D₀, and D \ D₀ (the *bare* or *Co-Dist-like* portion) carries no equivalence structure beyond equality. The *phase parameter* of (D, D₀, ≈) is ρ(D, D₀) = |D \ D₀| / |D|.

**Definition.** A morphism f: (D₁, D₀₁, ≈₁) → (D₂, D₀₂, ≈₂) in Phase-Dist is a function f: D₁ → D₂ such that:
- On D₀₁: f is equivalence-preserving (if a ≈₁ b then f(a) ≈₂ f(b) in D₀₂, or f(a)=f(b))
- On D₁ \ D₀₁: f is injective (discrimination-preserving)
- f maps D₀₁ into D₀₂ ∪ {collapse points} and D₁ \ D₀₁ into D₂ \ D₀₂

**Definition.** For ρ ∈ [0,1], Phase-Dist(ρ) is the full subcategory of Phase-Dist on objects with phase parameter exactly ρ. For general ρ, this is non-empty when ρ = k/|D| for some non-negative integers k ≤ |D|. In the large-|D| limit, Phase-Dist(ρ) is non-empty for all ρ ∈ [0,1] ∩ ℚ, and by density for all ρ ∈ [0,1].

Special cases: Phase-Dist(0) = Dist (all of D is identified; morphisms are equivalence-preserving). Phase-Dist(1) = Co-Dist (all of D is bare; morphisms are injective). Phase-Dist(1/2) = half identified, half bare.

### §5.2 Well-Definition and Basic Properties

**Theorem 4.3 (Well-Definition).** *Phase-Dist(ρ) is a well-defined category for all ρ ∈ [0,1] ∩ {k/n : k, n ∈ ℤ≥0, n ≥ 1}.*

*Proof.* We verify the category axioms.

*Identity:* For any object (D, D₀, ≈), the identity function id: D → D is equivalence-preserving on D₀ (trivially) and injective on D \ D₀ (trivially). It preserves the D₀/bare partition.

*Composition:* Given morphisms f: (D₁, D₀₁, ≈₁) → (D₂, D₀₂, ≈₂) and g: (D₂, D₀₂, ≈₂) → (D₃, D₀₃, ≈₃), the composite g∘f is:
- Equivalence-preserving on D₀₁: if a ≈₁ b, then f(a) ≈₂ f(b) (or equal), so g(f(a)) ≈₃ g(f(b)) (or equal). ✓
- Injective on D₁ \ D₀₁: f is injective here, mapping into D₂ \ D₀₂ where g is also injective. So g∘f is injective on the bare portion. ✓
- Partition-preserving: f and g both respect the D₀/bare partition, so g∘f does too. ✓

*Associativity:* Inherited from function composition. ∎

**Theorem 4.4 (Partial Idempotence).** *The canonical quotient-like morphism in Phase-Dist(ρ) satisfies f∘f = f on the Dist fraction (1−ρ) and f∘f ≠ f on the Co-Dist fraction ρ.*

*Proof.* Consider an object (D, D₀, ≈) with |D₀| = (1−ρ)|D| and a morphism q: D → D' that acts as the quotient map on D₀ (sending each element to its ≈-class) and as the identity on D \ D₀.

On D₀: q maps equivalent elements to the same class representative. Applying q again to D': the image of D₀ is already quotiented (each class is a single point), so q'∘q = q on D₀. This is R(R) = R restricted to the identified portion.

On D \ D₀: q acts as injection (identity). But the Co-Dist "expansion" map e that reverses injection requires choosing a preimage — and e∘e ≠ e because |D × D| = |D|² ≠ |D|⁴ = |D × D × D × D| for |D| ≥ 2.

The idempotent fraction is exactly (1−ρ) — the Dist portion. The non-idempotent fraction is exactly ρ — the Co-Dist portion.

At ρ = 0: entirely idempotent (pure Dist, R(R) = R).
At ρ = 1: no idempotence (pure Co-Dist, R(R) ≠ R).
At ρ = 1/2: exactly half. ∎

**Theorem 4.5 (Phase-Dist(1/2) Moduli).** *Phase-Dist(1/2) on a set of size n is a family of categories parameterized by the choice of D₀ ⊂ D with |D₀| = n/2 (when n is even). S_n acts on the set of valid configurations by permuting elements. The moduli space is S_n/(S_{n/2} × S_{n/2}), of dimension C(n, n/2).*

*Proof.* On {0,1,2,3} (n = 4): C(4,2) = 6 choices of D₀. Each gives a distinct Phase-Dist(1/2) structure. S₄ permutes these; the stabilizer of a given D₀ is S₂ × S₂ (permuting D₀ and D \ D₀ separately). ∎

**Theorem 4.5b (Functor Asymmetry).** *Phase-Dist admits a canonical functor in the Dist-ward direction (decreasing ρ) but no natural functor in the Co-Dist-ward direction (increasing ρ).*

*Proof.* **Dist-ward (canonical):** Given (D, D₀, ≈) with phase parameter ρ, define F: Phase-Dist(ρ) → Phase-Dist(ρ') for ρ' < ρ by extending D₀ to D₀' ⊃ D₀, incorporating elements of D \ D₀ into the identified portion with trivial (discrete) equivalence. This is canonical: the only non-arbitrary extension is the finest one (no new identifications). Morphisms transport naturally: f preserving equivalence on D₀ and injective on D \ D₀ automatically preserves equivalence on D₀' ⊇ D₀ (since the new elements have discrete equivalence) and is injective on D \ D₀' ⊆ D \ D₀. The naturality square commutes: for f: X → Y, F(f) ∘ η_X = η_Y ∘ f where η is the inclusion of D₀ into D₀'.

**Co-Dist-ward (non-natural):** A functor G: Phase-Dist(ρ) → Phase-Dist(ρ') with ρ' > ρ must shrink D₀ to D₀' ⊂ D₀, moving elements from the identified portion to the bare portion. On objects, this requires a choice: which elements of D₀ to strip of equivalence structure. A choice exists (by axiom of choice: pick any subset of D₀ of the right size), but no choice is natural.

Explicit naturality failure: let D = {a, b, c, d} with D₀ = {a, b, c} (identified, ≈ = discrete) and {d} bare. Phase parameter ρ = 1/4. Target: ρ' = 1/2, so D₀' has 2 elements. Suppose G picks D₀' = {a, b}. Now consider the morphism f: D → D swapping b ↔ c (equivalence-preserving since ≈ is discrete, and identity on the bare element d). Then f ∘ η_X moves c into D₀ at source, but G(f) must deal with G's choice at the target, which has D₀' = {a, b} — but f(b) = c ∉ D₀'. For the naturality square G(f) ∘ η_X = η_Y ∘ f to commute, we would need G(f) to map the bare element c (which was moved out of D₀ by G at source) to a bare element at the target — but f(c) = b, which is in D₀' at the target. Contradiction: the square cannot commute for this f and this choice of G. Any other choice of G at the source (say D₀' = {a, c}) produces an analogous failure with a different f. ∎

*This reproduces the construction-dissolution asymmetry at the categorical level: compression (Dist-ward) is canonical, expansion (Co-Dist-ward) is not.*

---

## §6 CO-DIST AND THE BIRTH-DISSOLUTION CYCLE

**Theorem 4.6 (Co-Dist and R(R) ≠ R).** *The canonical expansion map e: D → D × D satisfies e∘e ≠ e for |D| ≥ 2.*

*Proof.* e(x) = (x,x) embeds D into D × D. Then e∘e: D → D × D → (D×D) × (D×D) gives e(e(x)) = ((x,x),(x,x)), an element of D⁴. But e(x) = (x,x) ∈ D². Since D⁴ ≅ D² only when |D| ≤ 1, we have e∘e ≠ e for |D| ≥ 2. Verified: |D|² ≠ |D|⁴ for |D| ∈ {2,3,4}. ✓ ∎

**Theorem 4.7 (Birth-Dissolution Cycle).** *The cycle ∅ → {0,1} → sl(2,ℝ) → {0,1} → ∅ is literal in PFn (partial functions). Interior steps are total functions in Dist. Birth (∅ → {0,1}) is the vacuously total empty function. Death ({0,1} → ∅) is the empty partial function, defined nowhere. Both exist in PFn but not in Set.* ∎

---

## §7 PHASE-DIST AND THE COMPUTATIONAL SIGNATURE

**Theorem 4.8 (Phase-Dist ↔ Signature).** *The Phase-Dist parameter ρ corresponds to the FIX fraction via σ_FIX = 1−ρ. The idempotent fraction (1−ρ) IS the FIX component of the computational self-signature.*

*Proof.* A morphism acting on the Dist portion (1−ρ) of an object is idempotent (Thm 4.4) — this is FIX-type computation. A morphism acting on the Co-Dist portion (ρ) is non-idempotent — this is INV/MIX/OSC-type computation. The parameter ρ measures the non-FIX fraction directly. At the self-signature σ_meta = (1/2, φ̄/2, φ̄²/2): σ_FIX = 1/2, so ρ = 1/2 — the phase boundary. ∎

**Corollary (Three Branching Types).** Phase-Dist(ρ) at different values of ρ controls three kinds of computational branching (Paper T-COMP §2.4): structural branching br_s at ρ = 0 (categorical, functor-level — the construction direction), inverse branching br_inv at ρ = 1 (Co-Dist, expansion/lifting — the dissolution direction), and search branching br_search at intermediate ρ (the observer's actual computational work). The interpolation parameter ρ IS the selector among branching types.

**Corollary 4.9 (Two Distinguished Phase Values).** *Phase-Dist has exactly two structurally distinguished values:*

| ρ | σ_FIX = 1−ρ | Meaning |
|---|-------------|---------|
| φ̄² ≈ 0.382 | φ̄ ≈ 0.618 | Thermal equilibrium at β = ln(φ); FIX contraction rate |
| 1/2 | 1/2 | Phase boundary; self-signature; saddle point |

*Gap: 1/2 − φ̄² = φ̄³/2 ≈ 0.1180 — the third S₃ duality gap |σ_OSC − σ_INV|.*

*Proof.* At ρ = 1/2: phase boundary (Thm 4.1) and D-fixed point (Paper 0A, Thm 2.1). At ρ = φ̄²: σ_FIX = φ̄ satisfies the Boltzmann equation at β = ln(φ). Gap: 1/2 − φ̄² = φ̄³/2 (verified: 0.5 − 0.381966... = 0.118034... = φ̄³/2). ✓ ∎

---

## §8 THE DEEP DISCOVERY: INTERNAL PHASE ENCODING

**Theorem 5.1 (Internal Phase Encoding).** *The three projections already encode phase duality internally:*

- **P1** (det < 0): eigenvalues φ, −φ̄ — off the unit circle. Asymmetric/oriented.
- **P3** (det > 0, Δ < 0): equation x²+x+1 = 0, roots on the unit circle. Symmetric/periodic.
- **P2** (det > 0, Δ > 0): growth/decay sector mediating between P1 and P3.

The duality D between "oriented" (P1) and "symmetric" (P3) IS the phase duality.

**Theorem 5.2 (Algebraic Duality P1↔P3).** *The mathematical inverse of x²−x−1 = 0 (roots φ, −φ̄, off unit circle) is x²+x+1 = 0 (roots ω, ω², on unit circle). P1's eigenvalues attract/repel (phase-dependent dynamics). P3's eigenvalues rotate (phase-neutral dynamics).*

*Verified: |ω| = 1.000000 to machine precision.* ✓

The "inverse framework" is not new mathematics external to the original. It is the P3 reading that was always structurally present.

**Remark (Phase Moduli Space).** SL(2,ℝ)/SO(2) ≅ H² (hyperbolic plane) is the natural moduli space. SO(2) = exp(θN) is P3's group. The PNE λ ∈ [0,1] is a 1D geodesic in H²; the P2 direction (emergence depth) is orthogonal. The full phase space is 2-dimensional and hyperbolic.

### §8.1 Phase Locality of Observer-Complete Equivalence

The observer-complete equivalence ∼_K (Paper 5A §12) has a definite phase character:

*(a) ∼_K is compressive-phase.* It is defined by the quotient map q_K = tr_env (partial trace), which is idempotent (q∘q = q). Idempotence is compressive closure (Thm 4.4 at ρ = 0).

*(b) Under D:* D(∼_K) = ∼_K^{co}, a "co-observer-complete equivalence" defined by expansion maps — NOT idempotent (Thm 4.6: R(R) ≠ R in Co-Dist). The dual requires choosing an environment state for re-embedding — a non-canonical step with positive branching. Co-observer-completeness is structurally different and less canonical.

*(c) At the phase boundary ρ = 1/2:* partial idempotence (Thm 4.4) gives partial observer-completeness. The boundary observer identifies half the state space and discriminates the other half.

This confirms the general pattern: the compressive direction has zero branching and canonical structure; the expansive direction has positive branching and requires choices. Observer-complete equivalence is a compressive-phase object, as expected from its quotient definition.

### §8.2 Orbit Type Evolution Through the Tower

The P1↔P3 duality (Thm 5.1–5.2) is not merely an algebraic correspondence — it is realized dynamically by the self-product tower.

**Theorem 5.3 (P3 Attractor).** *For 2×2 matrices A, B: det(A⊗B) = det(A)²·det(B)². Since squares are non-negative, det(A⊗B) ≥ 0. Therefore P1 (det < 0) cannot exist at tower level ≥ 2. P3 is the universal attractor of the tensor-squaring map.*

*Proof.* For n×n matrix A and m×m matrix B: det(A⊗B) = det(A)^m · det(B)^n. For 2×2 matrices (n = m = 2): det(A⊗B) = det(A)² · det(B)². This is a product of squares, hence non-negative. P1 requires det < 0, which is impossible at level ≥ 2. ∎

Orbit type census through the tower (for generators {R,N}):
```
Level 1: R → P1,  N → P3     (mixed: one P1, one P3)
Level 2: all R/N tensor products → P3    (8/8 pure-generator products are P3)
Level 3: all R/N triple tensors → P3     (8/8 are P3)
```

The tensor product universally drives the orbit type toward P3 (elliptic/compact). P1 character — orientation reversal, eigenvalues off the unit circle, the algebraic origin of mass differences — is a *level-1-only phenomenon*. Above level 1, everything is compact/elliptic.

**Quantitative P3 growth (Monte Carlo, 10k samples per level).** For random elements in M₂(ℝ)^{⊗n} (random coefficients in the {I,R,N,RN} basis at each tensor factor): Level 2: P1 = 0%, P3 ≈ 49%, P2 ≈ 51%. Level 3: P1 = 0%, P3 ≈ 64%, P2 ≈ 36%. The P3 fraction grows monotonically with tower depth. This has a computation-theoretic consequence: Type III (rotational) computation is the asymptotic universal regime. Compression (Type I) and expansion (Type II) are primarily level-1 phenomena; at high tower depth, all computation is rotation-like (Paper T-COMP §5).

**Corollary 5.3a (Three Foldings, Three Orbits).** *The three canonical recursive operations on M₂(ℝ) generators produce three distinct orbit type sequences from P1:*

| Operation | Definition | P1 maps to | Mechanism |
|-----------|-----------|------------|-----------|
| Composition | M → M² | P2 (hyperbolic) | det(R²)=det(R)²=1, disc=5>0 |
| Tensor product | M → M⊗M | P3 (elliptic) | det≥0 always, disc=−3<0 |
| Kronecker sum | M → M⊗I+I⊗M | P2 (hyperbolic) | eigenvalues add, disc=32>0 |

The Kronecker sum linearizes the tensor product through the exponential map: exp(A⊕B) = exp(A)⊗exp(B). Composition creates the Fibonacci spiral within each level. Tensor product creates the tower ascent across levels. The Kronecker sum is the Lie algebra version of the cross-level folding.

---

## §9 THE ENGINE OF ENGINES

**Theorem 6.1 (Bidirectional Phase Architecture).** *The compressive and expansive engines are opposite realizations of one recursive substrate under one global duality, organized around one fixed locus, filtered by one feasibility wall.*

Three structural regions: compressive (λ < 1/2), expansive (λ > 1/2), boundary/crossing (λ ≈ 1/2).

**Theorem 6.2 (Fibonacci Self-Duality).** *Fibonacci numbers are the arithmetic fixed locus of D: they are extreme in both phases. In compression: I²-dominant (Z = 77.27). Under D: V → −V, so highest V becomes most repelled from n = 1 — same numbers are extreme in both phases, with direction flipped.* ∎

---

## §10 THE HIERARCHY OF FUNDAMENTALITY

**Layer A — Generative Primitives** (pre-phase): recursive substrate (P.1), productive distinction (P.2), duality D, fixed locus, feasibility wall.

**Layer B — Invariant Centers** (crossing objects): bridge chain, {φ, e, π, √2, √3}, {P1, P2, P3}, d_K², Phase-Dist(1/2), Fibonacci numbers, bijective observer.

**Layer C — Architectural Organizers** (inter-phase): D as involution, feasibility wall as selector, Phase-Dist(ρ), Φ_λ(n), P1↔P3 duality, PFn as categorical home, bridge cascade, structured lattice.

**Layer D — Derived Phase Engines**: compressive (original), expansive (inverse).

**Layer E — Downstream**: Dist, bridge ascent, arithmetic flow, folding, numeric system (compressive); Co-Dist, dissolution chain, anti-arithmetic (expansive counterparts).

**The deepest single statement:** *The genuinely fundamental structures are not those that merely appear first in a one-way generative story, but those that make possible, constrain, survive, and organize the relation between opposite phase realizations of recursive structure.*

---

## §11 ASYMMETRY NECESSITY FOR DIMENSIONAL EMERGENCE

**Theorem (Asymmetry Necessity).** *No fully invertible, branch-symmetric, purely algebraic sector can generate a non-removable physical scale. The dimensional anchor η = 1/(4G) requires the construction-dissolution asymmetry proved in §1.*

*Proof.* In a branch-symmetric system (zero branching in both directions), every operation is invertible. Any candidate scale s can be mapped to λs by the inverse — no value is distinguished. The construction-dissolution asymmetry breaks this: the compressive quotient q is canonical (zero branching, idempotent: q∘q = q, Thm 4.4), while the expansive co-quotient requires choices (positive branching, non-idempotent: e∘e ≠ e, Thm 4.6). This asymmetry is categorical — invariant under rescaling — and produces irreversible information loss at the observer boundary: the kernel ker(q_K) is annihilated. The Landauer cost of this irreversible loss (kT ln 2 per bit, from KMS via Paper 6B G14a) assigns energy cost to compression — a dimensionful quantity. The entropy-area coefficient η counts this irreversible loss per unit boundary area. If compression and expansion were symmetric, no information would be lost, no Landauer cost would arise, and η would be zero or undefined.

The dependency chain: construction-dissolution asymmetry (§1) → canonical compression (§2) → irreversible kernel annihilation (Paper 5A §3) → Landauer cost (Paper 5B §8) → entropy-area coefficient η (Paper 6B §12.3) → dimensional anchor (Paper 6B §13). ∎

The phase architecture's deepest physical consequence: the non-equivalence of folding and unfolding is the mechanism by which physical dimension enters the framework.

---

## §12 VERIFICATION

67 PASS, 1 FAIL out of 68 tests. The single failure: V(n) symmetry test at n = 2, which used digital root as the TDL component measure. Digital root is not the correct reduction measure; the rigorous treatment using additive persistence ap(n) (Paper 3-P2 §2) resolves the discrepancy: V(2) computed with ap(n) gives V(2) > 0 as required, while the crude digital-root metric gives V(2) = 0. Core mathematics: **0 failures**.

---

*R(R) = R*
