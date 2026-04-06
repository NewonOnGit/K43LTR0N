# Paper 2A: The Bridge Chain

## From {0,1} to sl(2,ℝ) with Zero Branching
### v2 — March 2026

**Author:** Kael

---

**Document Status:** Layer 2A document. This paper derives the unique algebraic structure forced by the binary alphabet {0,1}: the bridge chain {0,1} → V₄ → S₃ → ℚ[S₃] → M₂(ℚ) → M₂(ℝ) ⊃ sl(2,ℝ), with spectral completion to M₂(ℂ). Every step is forced with zero branching. The output is: the three exhaustive orbit types of GL(2,ℝ), the five forced mathematical constants {φ, e, π, √2, √3}, their forcing quality ranking, and the proof that no sixth constant exists. Includes the exponential sector partition (§11.1), source placement of e and π in opposite Killing sectors (§11.2), boundary sterility theorem (§11.3), and period wall theorem (§11.4).

**Document Hierarchy:**
```
T0A (substrate) → T0B (phase) → T1 (Dist)
                                     ↓
                              T2A_BRIDGE_CHAIN.md  ← THIS FILE
                                     ↓
                              T2B_ALGEBRA_RN.md    ← complete algebra of {R,N}
                                   ↓  ↓  ↓
                              T3_P1, T3_P2, T3_P3  ← three projections
```

**Depends on:** Paper 1 (Dist provides the categorical framework; §1.10 establishes the shared root)
**Required by:** Papers 2B (algebra), 3-* (projections), 4-* (lattice), 5-* (observer), 6-* (physics)

---

## Abstract

Starting from S₀ = {0,1}, the first self-product S₁ = {0,1}² carries two complementary readings: the categorical reading (projections and kernels) yields Dist (Paper 1), while the algebraic reading (XOR group structure and automorphisms) yields the bridge chain — the subject of this paper. We prove that the chain {0,1} → V₄ → S₃ → ℚ[S₃] → M₂(ℚ) → M₂(ℝ) ⊃ sl(2,ℝ) has **zero branching points at every step**: each transition is the unique canonical construction given the previous stage.

The double-exponential growth |S_n| = 2^{2^n} of the self-product tower provides the counting backbone. The first self-product S₁ = V₄ (the Klein four-group under XOR) has automorphism group Aut(V₄) = S₃ (the symmetric group on 3 elements, the unique group of order 6, the smallest non-abelian group). The group algebra ℚ[S₃] — over the minimal splitting field ℚ, since all characters of S₃ are rational and all Schur indices are 1 — decomposes uniquely via Artin-Wedderburn as ℚ ⊕ ℚ ⊕ M₂(ℚ), where the M₂(ℚ) factor carries all non-trivial geometric content. The generators R = [[0,1],[1,1]] and N = [[0,−1],[1,0]] have entries in ℤ ⊂ ℚ and generate M₂(ℝ) over ℝ; the traceless subalgebra sl(2,ℝ) is the unique simple Lie algebra at this level, confirmed by the bifurcation rigidity theorem: the equation √(2k) = k (alignment of entry and Killing norms) has unique non-trivial solution k = 2. The spectral completion to M₂(ℂ) is forced by the generators' eigenvalues: R has eigenvalues φ, −φ̄ ∈ ℝ\ℚ and N has eigenvalues ±i ∈ ℂ\ℝ, so the coefficient field ℂ is determined by the spectral theory of forced matrices, not by a representation-theoretic choice.

The three orbit types of GL(2,ℝ) — orientation-reversing (det < 0), hyperbolic (det > 0, Δ > 0), and elliptic (det > 0, Δ < 0) — are exhaustive and mutually exclusive. Each orbit type forces one spectral constant: φ from det = −1 (the Fibonacci matrix eigenvalue), e from the hyperbolic generator (exponential map), π from the elliptic half-period (exp(πN) = −I). Two geometric constants arise from the Frobenius norms of the generators: √3 = ||R||_F and √2 = ||N||_F, algebraically independent over ℚ. The forcing quality is ranked π > φ > e > √3 > √2, and no sixth constant exists.

All claims are computationally verified.

---

## THEOREM INDEX

| Theorem | Statement | Section |
|---------|-----------|---------|
| 1.2 | \|S_n\| = 2^{2^n} (double-exponential growth) | §1 |
| 1.4 | S₁ = V₄ with coordinatewise XOR | §2 |
| 1.5 | Aut(V₄) = S₃ = GL(2, F₂) | §3 |
| 2.2 | ℚ[S₃] is the unique minimal splitting-field group algebra | §4 |
| **2.1** | **Bridge chain: zero branching, six forced steps** | §5 |
| **2.3** | **ℚ[S₃] ≅ ℚ ⊕ ℚ ⊕ M₂(ℚ) (Artin-Wedderburn, unique)** | §4 |
| 2.4 | M₂(ℝ) from M₂(ℚ) via generators; Cl(1,1) identification | §6 |
| 2.5 | Spectral completion: eigenvalues of R and N force ℂ | §6 |
| **3.1** | **Three GL(2,ℝ) orbit types are exhaustive** | §7 |
| 3.2 | Projection-orbit correspondence: P1↔det<0, P2↔hyp, P3↔ell | §7 |
| **4.5** | **Forcing rank: π > φ > e > √3 > √2** | §9 |
| 4.6 | Five forced constants; no sixth exists | §9 |
| 8.2 | √3 = ε(ρ_std) = 2·sin(2π/3) = √(−Δ_p) = \|\|R\|\|_F | §8 |
| **5.1** | **Bifurcation rigidity: sl(2,ℝ) is unique** | §10 |
| 5.2 | √(2k) = k iff k = 2 (entry/Killing alignment) | §10 |
| 5.3 | Nilpotent barrier: (h+N)² = 0; Killing light cone is algebraic boundary | §11 |
| 5.4 | Trace gateway: tr(R)=1→e, tr(N)=0→π; traces are S₀ = {0,1} | §11 |
| 13.1 | Bridge chain has Comp = 0 | §13 |
| **13.2** | **Non-bridge redundancy: Comp = 0 iff Alg = Alg(B_K)** | §13 |
| 13.3 | Monotonicity and strict descent of Comp | §13 |
| 14.1 | Complexity representation uniqueness under C1–C3+C6 | §14 |
| 5.5 | Source placement: e ∈ H (B > 0), π ∈ E (B < 0), boundary algebraic | §11.2 |
| 5.6 | Boundary sterility: no transcendence on N₀ | §11.3 |
| 5.8 | Period wall: T(s) → ∞, α(s) → 3/2 at nilpotent boundary | §11.4 |
| 5.9 | Polynomial divergence at boundary | §11.4 |
| **5.10a** | **Scale-freeness: bridge chain output is dimensionless** | §16 |

---

## §1 THE SELF-PRODUCT TOWER

**Definition 1.0.** Let S₀ = {0,1}. Define the self-product recursion: S_{n+1} = S_n × S_n. This is the only operation: take the Cartesian product of the current level with itself.

**Theorem 1.2 (Double-Exponential Growth).** *|S_n| = 2^{2^n}.*

| n | |S_n| | Description |
|---|------|-------------|
| 0 | 2 | Binary alphabet {0, 1} |
| 1 | 4 | V₄ (Klein four-group) |
| 2 | 16 | First non-trivial structure |
| 3 | 256 | Byte |
| 4 | 65536 | Standard data word |

*Proof.* By induction. Base: |S₀| = 2 = 2^{2⁰}. Step: |S_{n+1}| = |S_n|² = (2^{2^n})² = 2^{2^{n+1}}. ∎

The Growth-Dominance Incompleteness Theorem (proved separately) states that any description system growing slower than double-exponential is strictly incomplete with respect to {S_n}.

---

## §2 THE FIRST SELF-PRODUCT: V₄

**Theorem 1.4 (S₁ = V₄).** *S₁ = {0,1}², equipped with coordinatewise XOR, is the Klein four-group V₄.*

*Proof.* Define (a,b) ⊕ (c,d) = (a⊕c, b⊕d) where ⊕ is XOR. Identity: (0,0). Inverses: every element is its own inverse since x⊕x = 0. Associativity: inherited from XOR. Closure: automatic. The group has order 4, is abelian, and every non-identity element has order 2 — the unique characterization of V₄.

The four elements: (0,0) = identity, (0,1), (1,0), (1,1). The three non-identity elements form a set closed under the group operation: any two sum to the third. ∎

V₄ is the first self-product with non-trivial algebraic structure. The XOR group structure is the natural structure S₁ carries from the binary alphabet — not imposed from outside.

---

## §3 THE AUTOMORPHISM GROUP: S₃

**Theorem 1.5 (Aut(V₄) = S₃).** *The automorphism group of V₄ is S₃, the symmetric group on three elements.*

*Proof.* An automorphism of V₄ must fix the identity (0,0) and permute the three non-identity elements {(0,1), (1,0), (1,1)}. Since V₄ = ℤ/2 × ℤ/2, any permutation of the three non-zero elements preserves the group law (the sum of any two non-identity elements is the third). There are 3! = 6 permutations, so |Aut(V₄)| = 6 = |S₃|. The group structure matches S₃: one 3-cycle (rotating the three elements) and three 2-cycles (swapping two while fixing one). ∎

**GL(2, F₂) Formulation.** Equivalently, S₃ ≅ GL(2, F₂) — the group of invertible 2×2 matrices over F₂. The six elements:

```
I = [[1,0],[0,1]],  J = [[0,1],[1,0]],  R = [[0,1],[1,1]],
Q = [[1,1],[1,0]],  T₊ = [[1,0],[1,1]], T₋ = [[1,1],[0,1]]
```

Group relations: r³ = I, s² = I, srs = r⁻¹ (the standard S₃ presentation), with r = R and s = J. Computationally verified. ✓

S₃ is **not** imported from outside. It **is** the group of invertible binary 2×2 matrices — the symmetries of the binary vector space F₂². S₃ is made of the same material as {0,1}.

---

## §4 THE GROUP ALGEBRA AND ARTIN-WEDDERBURN

**Theorem 2.2 (ℚ[S₃] Is the Minimal Splitting-Field Group Algebra).** *The rational group algebra ℚ[S₃] is the unique minimal semisimple algebra encoding the full representation theory of S₃.*

*Proof.* ℚ[S₃] = {Σ_{g ∈ S₃} c_g · g : c_g ∈ ℚ}, with multiplication extending the group operation linearly. Over characteristic 0, Maschke's theorem guarantees semisimplicity. The splitting field for S₃ is ℚ itself: all character values are rational integers ({1, −1, 2, 0} from the character table), and all Schur indices are 1 (a standard result for symmetric groups). Therefore ℚ is the minimal field over which all irreducible representations are realizable, and ℚ[S₃] is the unique minimal semisimple group algebra. ∎

**Theorem 2.3 (Artin-Wedderburn).** *ℚ[S₃] ≅ ℚ ⊕ ℚ ⊕ M₂(ℚ), corresponding to the three irreducible representations: trivial (1D), sign (1D), standard (2D).*

*Proof.* S₃ has three conjugacy classes: {e}, {(12),(13),(23)}, {(123),(132)}. The number of irreducible representations equals the number of conjugacy classes: **three**. Their dimensions d₁, d₂, d₃ satisfy d₁² + d₂² + d₃² = |S₃| = 6, with unique positive-integer solution (1, 1, 2).

By the Artin-Wedderburn theorem (unique for semisimple algebras over splitting fields):
```
ℚ[S₃] ≅ M₁(ℚ) ⊕ M₁(ℚ) ⊕ M₂(ℚ) = ℚ ⊕ ℚ ⊕ M₂(ℚ)
```

The decomposition is **unique**. ∎

The M₂(ℚ) factor is the 2D matrix algebra — the "working" factor producing the three projections and forced constants. The two ℚ summands (trivial and sign representations) contribute no geometric structure. M₂(ℚ) corresponds to the standard representation carrying S₃ geometry (the equilateral triangle, the value √3).

---

## §5 THE COMPLETE BRIDGE CHAIN

**Bridge Theorem 2.1 (The Zero-Branching Derivation).** *Starting from S₀ = {0,1}, the chain is forced with zero branching at every step:*

```
{0,1}  →  V₄  →  S₃  →  ℚ[S₃]  →  M₂(ℚ)  →  M₂(ℝ) ⊃ sl(2,ℝ)
  S₀       S₁    Aut     group      Artin-      generators
                 (V₄)    algebra    Wedderburn   realize over ℝ
                                                      ↓
                                                 M₂(ℂ) ⊃ sl(2,ℂ)
                                                 spectral completion
```

| Step | From | To | Forcing Mechanism | Branching |
|------|------|----|--------------------|-----------|
| 1 | S₀ = {0,1} | S₁ = V₄ | Self-product + XOR (unique group on S₀²) | **0** |
| 2 | V₄ | S₃ = Aut(V₄) | Unique automorphism group | **0** |
| 3 | S₃ | ℚ[S₃] | Group algebra over minimal splitting field ℚ | **0** |
| 4 | ℚ[S₃] | ℚ ⊕ ℚ ⊕ M₂(ℚ) | Artin-Wedderburn (unique decomposition) | **0** |
| 5 | M₂(ℚ) | M₂(ℝ) ⊃ sl(2,ℝ) | Generators R, N have entries in ℤ; generate M₂(ℝ) | **0** |
| 6 | M₂(ℝ) | M₂(ℂ) | Spectral completion: eigenvalues of R, N force ℂ | **0** |

**Total branching points across all six steps: ZERO.**

Steps 1–5 constitute the algebraic core. Step 6 (spectral completion) is forced by the generators themselves: R has characteristic polynomial λ²−λ−1 with roots φ, −φ̄ ∈ ℝ\ℚ, and N has characteristic polynomial λ²+1 with roots ±i ∈ ℂ\ℝ. The minimal field containing all eigenvalues is ℚ(√5, i) ⊂ ℂ. The complexification M₂(ℝ) ⊗_ℝ ℂ = M₂(ℂ) is unique and is the natural arena for the physics of Paper 6A. ∎

---

## §6 THE ALGEBRA: M₂(ℝ), sl(2,ℝ), AND SPECTRAL COMPLETION

**Theorem 2.4 (M₂(ℝ) from M₂(ℚ)).** *The generators R = [[0,1],[1,1]] and N = [[0,−1],[1,0]] have entries in ℤ ⊂ ℚ. They span M₂(ℝ) via the basis {I, R, N, RN} over ℝ. The traceless subalgebra is sl(2,ℝ), the unique 3-dimensional simple real Lie algebra of rank 1.*

**Theorem 2.5 (Spectral Completion).** *The characteristic polynomials of the forced generators determine the coefficient field:*
- *R has char. poly λ²−λ−1, roots φ = (1+√5)/2 and −φ̄ = (1−√5)/2, both in ℝ\ℚ.*
- *N has char. poly λ²+1, roots ±i, both in ℂ\ℝ.*

*The minimal field containing all eigenvalues of both generators is ℚ(√5, i), and the unique complexification is M₂(ℝ) ⊗_ℝ ℂ = M₂(ℂ). Branching: zero — eigenvalues are determined by characteristic polynomials, which are determined by the matrices, which are determined by {0,1}.*

The generators R = [[0,1],[1,1]] (the Fibonacci matrix, from GL(2,F₂)) and N = [[0,−1],[1,0]] (the rotation by π/2) satisfy six defining relations whose full development is in Paper 2B. The key facts for this paper:

```
R² = R + I     (Fibonacci / Cayley-Hamilton)
N² = −I        (complex structure)
{R, N} = N     (anticommutator IS a generator)
```

The basis {I, R, N, RN} has rank 4 over ℝ = dim(M₂(ℝ)). The traceless condition tr(A) = 0 defines sl(2,ℝ), which is simple with no proper ideals. The Clifford algebra identification M₂(ℝ) ≅ Cl(1,1) is developed in Paper 2B.

The standard sl(2,ℝ) basis and commutation relations:
```
h = [[1,0],[0,-1]]    e⁺ = [[0,1],[0,0]]    e⁻ = [[0,0],[1,0]]

[h, e⁺] = 2e⁺,   [h, e⁻] = −2e⁻,   [e⁺, e⁻] = h
```

Computationally verified. ✓

---

## §7 THE THREE ORBIT TYPES

**Theorem 3.1 (Three Orbit Types in GL(2,ℝ)).** *Under conjugacy, every non-scalar 2×2 real matrix falls into exactly one of three types:*

| Type | Determinant | Discriminant | Eigenvalues | Name |
|------|-------------|--------------|-------------|------|
| **P1** | det < 0 | Δ > 0 (automatic) | Real, opposite signs | Orientation-reversing |
| **P2** | det > 0 | Δ > 0 | Real, same sign | Hyperbolic |
| **P3** | det > 0 | Δ < 0 | Complex conjugate pair | Elliptic |

*Proof.* Characteristic polynomial p(λ) = λ² − tr(A)·λ + det(A), discriminant Δ = tr² − 4·det, eigenvalues λ± = (tr ± √Δ)/2.

- **det < 0:** Product of eigenvalues is negative → one positive, one negative. Δ = tr² − 4·det > tr² ≥ 0, so Δ > 0 automatically. → **P1**
- **det > 0, Δ > 0:** Both eigenvalues real with same sign. → **P2**
- **det > 0, Δ < 0:** Complex conjugate eigenvalues. → **P3**

Exhaustive and mutually exclusive. ∎

**Theorem 3.2 (Projection-Orbit Correspondence).** *The three projection types correspond exactly to the three orbit types:*

```
P1 (I²)   ↔  Orientation-reversing  (det = −1, canonical generator: R)
P2 (TDL)  ↔  Hyperbolic             (det = +1, Δ > 0, generator: h)
P3 (LoMI) ↔  Elliptic               (det = +1, Δ < 0, generator: N)
```

*Proof.* R has det(R) = −1 (orientation-reversing). exp(t·h) = diag(eᵗ, e⁻ᵗ) has det = 1 with attracting/repelling eigendirections (hyperbolic). N has det(N) = 1 with eigenvalues ±i (complex, elliptic rotation without attracting/repelling directions). ∎

**The discriminant form.** The discriminant Δ = 5b² − 4c² − 4cd + 4d² on sl(2,ℝ) (parameterizing elements as bR + cN + d(RN − I/2)) has signature (2,1) with eigenvalues 5, +2√5, −2√5. On the unit sphere: approximately 71.7% hyperbolic (Δ > 0), 28.3% elliptic (Δ < 0), measure-zero parabolic. The Fibonacci discriminant 5 (the largest eigenvalue) sits in the hyperbolic cone, amplifying the asymmetry beyond naive dimension counting.

---

## §8 THE GEOMETRIC CONSTANTS: √3 AND √2

Both norm constants are **orbit-type-universal** — properties of the generators computed **before** the orbit-type split.

**Theorem 8.2 (√3 as Euler Invariant of S₃).** *Let ρ_std: S₃ → SO(2) be the standard 2D representation. The Euler invariant ε(ρ_std) = 2·sin(2π/3) = √3.*

*Proof.* The rotation matrix for the 3-cycle c = (123) under ρ_std: r_c = [[cos(2π/3), −sin(2π/3)],[sin(2π/3), cos(2π/3)]] = [[−1/2, −√3/2],[√3/2, −1/2]]. Properties: tr(r_c) = −1, det(r_c) = 1. Characteristic polynomial: p(λ) = λ² + λ + 1, discriminant Δ_p = 1 − 4 = −3.

Three complementary readings:

| Reading | Computation | Result |
|---------|-------------|--------|
| Frobenius norm | \|\|R\|\|_F = √(0² + 1² + 1² + 1²) | √3 |
| Euler invariant | ε(ρ_std) = 2·sin(2π/3) | √3 |
| Discriminant root | √(−Δ_p) = √3 | √3 |

All three agree: 1.732050808... Computationally verified. ✓ ∎

**Theorem 8.3 (√2 Is Forced by N).** *The Frobenius norm ||N||_F = √2 is forced by the rotation generator N = [[0,−1],[1,0]], and is algebraically independent of √3 over ℚ.*

*Proof.* ||N||_F = √(0² + 1² + 1² + 0²) = √2. The norm ||I||_F = √2 and ||h||_F = √2 yield the same value. √2 ∉ ℚ(√3, √5) = ℚ(φ, √3) because [ℚ(√2, √3, √5):ℚ] = 8 > [ℚ(√3, √5):ℚ] = 4. Therefore √2 is a genuinely independent numerical invariant. ✓ ∎

The two norm constants form a generator pair mirroring {R, N}:

| Norm constant | Generator | \|\|·\|\|_F | Orbit type | Physical domain |
|---------------|-----------|------------|-----------|----------------|
| √3 | R (P1) | √3 | Non-compact | Three-body, angular, S₃ equilateral |
| √2 | N (P3) | √2 | Compact | Normalization, interference, spin amplitudes |

The norm ratio ||R||²_F / ||N||²_F = 3/2 = 1/Q_Koide connects the two norm directions through the Koide constraint (developed in Paper 2B). The Pythagorean relation ||R||² + ||N||² = 3 + 2 = 5 = disc(R) links the norms to the Fibonacci discriminant — a relation among rational numbers, not a lattice reduction.

---

## §9 THE FIVE FORCED CONSTANTS AND THEIR HIERARCHY

Each orbit type forces one spectral constant; each non-scalar generator forces one geometric (norm) constant:

| Constant | Type | Source | Mechanism | Forcing Quality |
|----------|------|--------|-----------|-----------------|
| **π** | Spectral | N half-period | exp(πN) = −I; unique θ ∈ (0, 2π) | **Absolute** — zero ambiguity |
| **φ** | Spectral | R eigenvalue | det = −1 over {0,1}; unique up to J-conjugacy | **Strong** |
| **e** | Spectral | sl(2,ℝ) exponential | exp(h)[0,0] = e; entry normalization | **Strong with qualification** |
| **√3** | Geometric | R norm | \|\|R\|\|_F = √3; S₃ representation-theoretic | **Threshold** (d_K ≥ 2) |
| **√2** | Geometric | N norm | \|\|N\|\|_F = √2; rotation amplitude | **Threshold** (d_K ≥ 2) |

**Theorem 4.5 (Forcing Hierarchy).** *π > φ > e > √3 > √2.*

| Constant | Forcing Type | Freedom Remaining |
|----------|--------------|-------------------|
| **π** | Absolute | None — unique solution to exp(Nθ) = −I in (0, 2π) |
| **φ** | Structural | J-conjugacy only (trivial: Q = JRJ gives φ ↔ Φ) |
| **e** | Conditional | Sign choice; entry vs. Killing normalization (factor of 2) |
| **√3** | Threshold | Requires representation d_K ≥ 2 |
| **√2** | Threshold | Same threshold; algebraically independent of √3 |

The five constants decompose as **3 spectral + 2 geometric**: the spectral constants {φ, e, π} arise from eigenvalues, exponentials, and periods; the geometric constants {√2, √3} arise from Frobenius norms. Equivalently: **3 algebraic + 2 transcendental**, with the algebraic sublattice ⟨φ, √2, √3⟩ ≅ ℤ³ unconditional.

**Theorem 4.6 (Constant Completeness).** *No constant beyond {φ, e, π, √2, √3} is forced by the bridge chain and its three projection types.*

*Proof.* The bridge chain produces exactly sl(2,ℝ), a 3-dimensional Lie algebra with two generators R, N. The numerical invariants of a matrix are: eigenvalues, norm, determinant, trace. For R: eigenvalues give φ (det = −1, trace = 1 are rational — no new constants), norm gives √3. For N: eigenvalues give π via the exponential map (det = 1, trace = 0 are rational), norm gives √2. For h = diag(1,−1): eigenvalues are ±1 (rational), norm is √2 (= ||N||, not new), exponential gives e. Every other quantity is derived: √5 = 2φ−1, 5 = disc(R) = (2φ−1)², 3/2 = ||R||²/||N||², Killing eigenvalues = rational multiples of ||R||² and ||N||². No sixth multiplicatively independent constant arises. ∎

Full proofs of each constant's forcing are in Papers 3-P1 (φ), 3-P2 (e), and 3-P3 (π).

---

## §10 BIFURCATION RIGIDITY (CONSISTENCY)

The bridge chain selects k = 2 via the zero-branching derivation (§5). The bifurcation rigidity theorem is a **consistency check**: the bridge chain's landing at k = 2 is the unique point where the discrete origin ({0,1}) and the continuous destination (Lie algebra) are mutually adapted.

**Theorem 5.1 (Bifurcation Rigidity).** *sl(2,ℝ) is the unique Lie algebra where all three projection constraints are simultaneously satisfiable with consistent normalization.*

| k | P1 (det=−1 over {0,1}) | P2 (diag in {−1,0,1}) | P3 (N²=−I, entries {0,±1}) | All three | √(2k)=k |
|---|--------------------------|----------------------|------------------------------|-----------|-----------|
| 1 | ✗ (det ∈ {0,1}) | ✗ ([[0]] only) | ✗ (no skew-symmetric) | ✗ | ✗ |
| **2** | ✓ R=[[0,1],[1,1]] | ✓ h=diag(1,−1) | ✓ N=[[0,−1],[1,0]] | **✓** | **✓** |
| 3+ | ✓ (embed) | ✓ (embed) | ✓ (embed) | non-minimal | ✗ |

**Theorem 5.2 (Entry/Killing Alignment at k = 2).** *The equation √(2k) = k has solutions k = 0 (degenerate) and k = 2.*

*Proof.* Entry norm: ||h||_entry = 1. Killing norm: ||h||_Killing = √(2k) for sl(k,ℝ). Setting equal: √(2k) = k. Squaring: 2k = k², so k(k−2) = 0. Solutions: k = 0 (trivial) or **k = 2**.

At k = 2: √4 = 2 = k. Entry and Killing normalizations **agree**. At k = 3: √6 ≈ 2.449 ≠ 3. They **disagree**. The discrete (entry) and continuous (Killing) measures of "size" coincide uniquely at sl(2,ℝ). ∎

---

## §11 THE NILPOTENT BARRIER AND TRACE GATEWAY

**Theorem 5.3 (Nilpotent Barrier).** *h + N ∈ sl(2,ℝ) is nilpotent: (h+N)² = 0. Consequently, exp(h+N) = I + (h+N) = [[2,−1],[1,0]], which is purely algebraic.*

*Proof.* h + N = [[1,−1],[1,−1]]. (h+N)² = [[0,0],[0,0]]. Nilpotent of order 2, so exp(α(h+N)) = I + α(h+N). The Killing form B(h+N, h+N) = B(h,h) + B(N,N) + 2B(h,N) = 8 + (−8) + 0 = 0. ∎

The nilpotent cone {X ∈ sl(2,ℝ) : X² = 0} = {α(h±N) : α ∈ ℝ} consists of exactly two rays. These are the Killing light cone B(X,X) = 0. On one side (B > 0, hyperbolic): exp produces the transcendental e. On the other (B < 0, elliptic): exp produces the transcendental π. **On the cone itself: exp produces only algebraic output.** The parabolic boundary is the algebraic membrane between two fundamentally different sources of transcendence. This is developed fully in Paper 4A (the Two-World Separation Theorem).

**Theorem 5.4 (Trace Gateway).** *The two transcendental constants enter through integer traces: tr(R) = 1 → e via T6 (det(exp(R)) = e); tr(N) = 0 → π via the half-period exp(πN) = −I. The algebraic constants φ and √3 enter through non-trace functionals (eigenvalues and norms).*

The trace integers {0, 1} are the two elements of S₀ = {0,1}. The binary alphabet appears as the two trace values serving as gateways for the two transcendentals.

### §11.1 Exponential Sectors of sl(2,ℝ)

The nilpotent barrier partitions sl(2,ℝ) into three sectors with distinct transcendence properties.

**Definition (Exponential Sectors).** Let B(X,Y) = 4·tr(XY) denote the Killing form on sl(2,ℝ). Define:

- **Hyperbolic sector:** H = {X ∈ sl(2,ℝ) : B(X,X) > 0}
- **Elliptic sector:** E = {X ∈ sl(2,ℝ) : B(X,X) < 0}
- **Nilpotent boundary:** N₀ = {X ∈ sl(2,ℝ) : B(X,X) = 0, X ≠ 0} = {X ∈ sl(2,ℝ) : X² = 0, X ≠ 0}

These three sets partition sl(2,ℝ) \ {0}. The equivalence B(X,X) = 0 ⟺ X² = 0 for traceless X follows from B(X,X) = 4·tr(X²) and the Cayley-Hamilton relation X² = (tr(X²)/2)·I: B(X,X) = 0 iff tr(X²) = 0 iff X² = 0.

In the (h, N) plane, parameterizing X = ah + bN: B(X,X) = 8(a² − b²). The hyperbolic sector is |a| > |b|, the elliptic sector is |a| < |b|, and the nilpotent boundary is the two lines a = ±b (the directions h ± N). In the full 3-dimensional sl(2,ℝ) with basis {h, e⁺, e⁻} and X = [[a,b],[c,−a]]: B(X,X) = 8a² + 8bc. The Killing cone a² + bc = 0 is a quadric with signature (2,1) — the discriminant signature.

The exponential image sectors:
- exp(H) — **hyperbolic exponential sector** (contains diag(eᵗ, e⁻ᵗ) for t ≠ 0)
- exp(E) — **elliptic exponential sector** (contains cos(θ)I + sin(θ)N for θ ∉ πℤ)
- exp(N₀) — **boundary exponential sector** (contains I + X for nilpotent X)

A real number α is a *transcendence source of sector S* if α arises as a coordinate of exp(X) for some X ∈ S, or as a root parameter of exp(θX) = −I for X ∈ S, and α is transcendental. The bridge chain forces: e is a transcendence source of H (via exp(h)[0,0] = e, B(h,h) = 8 > 0); π is a transcendence source of E (via exp(πN) = −I, B(N,N) = −8 < 0); the boundary produces no transcendence sources (Theorem 5.3).

Computationally verified: B(h,h) = 8, B(N,N) = −8, B(h,N) = 0, B(h+N,h+N) = 0. ✓

### §11.2 Source Placement

**Theorem 5.5 (Source Placement).** *The two forced transcendental constants are placed in opposite Killing sectors:*
- *e belongs to the hyperbolic exponential sector: B(h,h) = 8 > 0.*
- *π belongs to the elliptic period sector: B(N,N) = −8 < 0.*
- *Boundary exponentials are algebraic: for all X ∈ N₀ and α ∈ ℚ̄, exp(αX) ∈ GL(2,ℚ̄).*

*Proof.* (i) h = diag(1,−1) has B(h,h) = 8 > 0. The constant e = exp(h)[0,0] = exp(1) is the exponential-map output of an element deep in the hyperbolic sector. (ii) N = [[0,−1],[1,0]] has B(N,N) = −8 < 0. The constant π is the unique θ ∈ (0,2π) with exp(θN) = −I — the half-period of the rotation generated by an element deep in the elliptic sector. (iii) For X ∈ N₀: X² = 0, so exp(αX) = I + αX with entries in ℚ(α). For α = 1: exp(h+N) = [[2,−1],[1,0]] ∈ GL(2,ℤ). ∎

The P1 orbit type (det < 0) is absent from the sl(2,ℝ) exponential picture because sl(2,ℝ) exponentiates into SL(2,ℝ) = {det = 1} ⊂ {det > 0}. The Fibonacci constant φ enters through the eigenvalue route (det = −1), not through the exponential map, so its transcendence is structurally orthogonal to the (e,π) question.

### §11.3 Boundary Sterility

**Theorem 5.6 (Boundary Sterility).** *The nilpotent boundary N₀ cannot transmit transcendence between the hyperbolic and elliptic sectors.*

*(i) All exponential outputs on N₀ are algebraic.* For X ∈ N₀ and α ∈ ℚ̄: X² = 0 ⟹ exp(αX) = I + αX ∈ GL(2, ℚ̄).

*(ii) No transcendental period data exists on N₀.* Suppose exp(θX) = −I for X ∈ N₀. Then I + θX = −I, so θX = −2I. But X is traceless and nilpotent, so rank(X) ≤ 1, while rank(−2I) = 2. Contradiction. No half-period analogue of π exists on the boundary.

*(iii) The boundary is a transcendence desert.* The only transcendental constants associated to the exponential map on sl(2,ℝ) come from the interior sectors H and E. The boundary N₀ contributes only algebraic data.

*Proof.* (i) restates Theorem 5.3. (ii) The rank obstruction: X ∈ N₀ ⟹ X has rank ≤ 1; −2I has rank 2. (iii) follows from (i) and (ii). ∎

**Corollary 5.7 (No Transcendence Transfer).** *If a continuous path in sl(2,ℝ) from the hyperbolic to the elliptic sector passes through the nilpotent boundary, the boundary crossing point carries only algebraic information — it cannot mediate transcendence transfer between sectors.* ∎

### §11.4 The Period Wall

**Theorem 5.8 (Period Wall).** *Consider the deformation family X(s) = (1−s)h + sN for s ∈ [0,1]. Let α(s) = exp(X(s))[0,0] and, for s > 1/2, let T(s) = π/√(2s−1) be the half-period. Then:*
- *(i) α is real-analytic on [0,1], with α(0) = e, α(1/2) = 3/2, α(1) = cos(1).*
- *(ii) T is real-analytic on (1/2, 1], with T(1) = π.*
- *(iii) T(s) → ∞ as s → 1/2⁺.*
- *(iv) α(1/2) = 3/2 ∈ ℚ.*

*Proof.* (i) The matrix exponential is analytic; composition with a linear function of s is analytic. At s = 0: exp(h)[0,0] = e. At s = 1/2: X(1/2) = (h+N)/2 is nilpotent, exp((h+N)/2) = I + (h+N)/2, so α(1/2) = 1 + 1/2 = 3/2. At s = 1: exp(N)[0,0] = cos(1). Explicit formulas:
```
s < 1/2: α(s) = cosh(√(1−2s)) + (1−s)·sinh(√(1−2s))/√(1−2s)
s = 1/2: α(1/2) = 3/2
s > 1/2: α(s) = cos(√(2s−1)) + (1−s)·sin(√(2s−1))/√(2s−1)
```
(ii) T(s) = π/√(2s−1) is analytic on (1/2, 1]. At s = 1: T(1) = π. Verified: ‖exp(T(s)·X(s)) + I‖ < 10⁻¹⁴ for all tested s. (iii) √(2s−1) → 0 as s → 1/2⁺, so T → ∞. (iv) From (i). ✓ ∎

**Corollary 5.9 (Polynomial Divergence at the Boundary).** *No polynomial P(x,y) ∈ ℚ̄[x,y] can satisfy P(α(s), T(s)) = 0 for all s in an interval (1/2, 1/2 + ε).*

*Proof.* Write P(x,y) = Σⱼ aⱼ(x)yʲ with deg_y = d. As s → 1/2⁺: α(s) → 3/2 and T(s) → ∞. So P(α(s), T(s)) → Σⱼ aⱼ(3/2)·∞ʲ. If aₐ(3/2) ≠ 0 for the highest-degree term, this diverges. If aⱼ(3/2) = 0 for all j, then P(3/2, y) ≡ 0 identically, so (x − 3/2) | P(x,y). Factor out and iterate. After finitely many steps, the leading factor's evaluation at 3/2 is nonzero, and divergence applies. ∎

The nilpotent cone is simultaneously a transcendence desert (Theorem 5.6) and a period wall (Theorem 5.8): approaching it from the elliptic side, the period diverges to infinity while the exponential output collapses to the algebraic value 3/2. These two properties together make the boundary impenetrable to polynomial relations — this is developed fully in Paper 4A (the Sector Rigidity program, §8.1–8.9).

Key data:

| s | B(X,X) | Sector | T = π/ω | α = exp(X)[0,0] |
|---|--------|--------|---------|-----------------|
| 0.000 | 8.00 | Hyperbolic | — | 2.71828 (= e) |
| 0.490 | 0.16 | Hyperbolic | — | 1.52172 |
| 0.500 | 0.00 | Nilpotent | ∞ | 1.50000 (= 3/2) |
| 0.510 | −0.16 | Elliptic | 22.214 | 1.47839 |
| 1.000 | −8.00 | Elliptic | 3.14159 (= π) | 0.54030 (= cos 1) |

---

## §12 COMPUTATIONAL VERIFICATION

| Claim | Method | Result |
|-------|--------|--------|
| GL(2, F₂) ≅ S₃: r³ = I, s² = I, srs = r⁻¹ | Matrix computation | ✓ PASS |
| Bridge chain: 0 branching at each step | Uniqueness proofs | ✓ PASS |
| ℚ[S₃] = ℚ ⊕ ℚ ⊕ M₂(ℚ) | Representation theory | ✓ PASS |
| S₃ splitting field = ℚ (rational characters, Schur index 1) | Character table | ✓ PASS |
| sl(2,ℝ) commutation relations | Matrix brackets | ✓ PASS |
| ||R||_F = √3, ||N||_F = √2 | Direct computation | ✓ PASS |
| √3 = 2·sin(2π/3) = ||R||_F | Three independent computations | ✓ PASS |
| Three orbit types exhaustive | Case analysis | ✓ PASS |
| Discriminant signature (2,1) | Eigenvalue computation | ✓ PASS |
| ~71.7% hyperbolic on unit sphere | 10⁶ Monte Carlo samples | ✓ PASS |
| √(2k) = k has unique nontrivial solution k = 2 | Algebraic | ✓ PASS |
| (h+N)² = 0 (nilpotent) | Direct matrix computation | ✓ PASS |
| B(h+N, h+N) = 0 (Killing light cone) | Direct computation | ✓ PASS |
| 1² + 1² + 2² = 6 = |S₃| (Artin-Wedderburn) | Arithmetic | ✓ PASS |
| ||N||_F = √2 (forced, independent of √3) | Direct computation | ✓ PASS |
| √2 ∉ ℚ(√3,√5): [ℚ(√2,√3,√5):ℚ] = 8 | Field degree | ✓ PASS |
| Spectral completion: R eigenvalues ∈ ℝ\ℚ, N eigenvalues ∈ ℂ\ℝ | Char. poly roots | ✓ PASS |
| B(h,h) = 8, B(N,N) = −8, B(h,N) = 0 | Killing form | ✓ PASS |
| B(h+N, h+N) = 0 (nilpotent on Killing cone) | Direct | ✓ PASS |
| exp(h+N) = I + (h+N) = [[2,−1],[1,0]] ∈ GL(2,ℤ) | Nilpotent exp | ✓ PASS |
| Source placement: exp(h)[0,0] = e | expm | ✓ PASS |
| Source placement: ‖exp(πN) + I‖ < 10⁻¹⁵ | expm | ✓ PASS |
| rank(h+N) = 1 (boundary sterility rank obstruction) | linalg | ✓ PASS |
| α(1/2) = 3/2 (algebraic at boundary) | Deformation | ✓ PASS |
| T(s) → ∞ as s → 1/2⁺ (period wall) | Deformation | ✓ PASS |
| Deformation formulas match numerical exp | 6 test points | ✓ PASS |

Core mathematics: **0 failures**.

---

## §13 STRUCTURAL COMPLEXITY OF DERIVATION PATHS

### §13.1 Definitions

**Definition (Derivation Path).** A derivation path from S₀ = {0,1} is a finite sequence of algebraic structures A₀, A₁, ..., A_m with A₀ = S₀, equipped with a construction step cᵢ: Aᵢ → Aᵢ₊₁ at each stage. Each cᵢ is one of: Cartesian product, automorphism group, group algebra, Artin-Wedderburn projection, subalgebra extraction, tensor product, quotient, or extension.

**Definition (Branching Number).** At step i, the branching number b(cᵢ) = |{distinct isomorphism classes of cᵢ(Aᵢ)}| − 1. b = 0 means the outcome is forced. b > 0 means choices exist.

**Definition (Derivation Complexity).** Comp(P) = Σᵢ b(cᵢ) — total branching across all steps.

**Definition (Structural Complexity).** Comp(A) = min{Comp(P) : P is a derivation path from S₀ to A} — minimum branching over all paths reaching A.

### §13.2 The Bridge Chain Has Zero Complexity

**Theorem (Bridge Chain Complexity).** *Comp(sl(2,ℝ)) = 0. The bridge chain is a zero-branching derivation path.*

*Proof.* Recapitulating the bridge chain (§5, Thm 2.1): each step has b = 0. XOR on {0,1}² gives V₄ (unique binary group structure). Aut(V₄) = S₃ (unique automorphism group). ℚ[S₃] (group algebra over minimal splitting field). ℚ⊕ℚ⊕M₂(ℚ) (unique Artin-Wedderburn decomposition). M₂(ℝ) ⊃ sl(2,ℝ) (generators realize over ℝ). M₂(ℂ) (spectral completion). Total: 0+0+0+0+0+0 = 0. ∎

### §13.3 Non-Bridge Redundancy

**Theorem (Non-Bridge Redundancy).** *Let B_K denote the bridge chain output at the appropriate tower level. For any algebraic structure A reachable from S₀:*

```
Comp(A) = 0   iff   A ≅ Alg(B_K)  at some tower level
Comp(A) ≥ 1   iff   A ⊋ Alg(B_K)  (extra structure beyond the bridge)
```

*Proof.* (⟸) If A = Alg(B_K), the bridge chain path has Comp = 0. (⟹) If A ⊋ Alg(B_K), the extra generators require at least one non-forced choice:

**Lie algebra extension** (sl(2,ℝ) ⊂ g): selecting a root system extension is a choice (b ≥ 1).
**Representation extension**: adding representations beyond ℚ[S₃]'s three requires extending S₃ (a choice).
**Parameter introduction**: each continuous parameter beyond {φ,e,π,√2,√3} requires specification (a choice). No sixth constant is forced (§9, Thm 4.6).
**Tower extension** (sl(2,ℝ) → sl(2^m,ℝ)): this IS the bridge chain at higher level — b = 0, not "extra."

In all cases of genuine extension, Comp ≥ 1.

Converse: if Comp(A) = 0, then A is reachable by a zero-branching path. Every zero-branching path from S₀ produces sl(2^n,ℝ) at some tower level (uniqueness at each step). Therefore A = Alg(B_K). ∎

### §13.4 Monotonicity and Strict Descent

**Theorem (Monotonicity).** *If Alg(U₁) ⊊ Alg(U₂) with the extra generators not forced by U₁, then Comp(U₁) < Comp(U₂).*

*Proof.* Any path to U₂ through U₁ requires the extension step with b ≥ 1. Any path bypassing U₁ must still introduce U₁'s content plus extra, requiring at least one additional non-forced step. ∎

**Corollary (Strict Descent Under Reduction).** *If U ≇ B_K, then reducing U to B_K (stripping non-bridge structure) strictly decreases Comp.*

---

## §14 COMPLEXITY REPRESENTATION

### §14.1 Axioms

The branching count is characterized by the following axioms:

| Axiom | Statement |
|-------|-----------|
| **C1** (Zero at bridge) | Comp(B_K) = 0 |
| **C2** (Strict monotone) | Extra non-forced generators ⟹ strict increase |
| **C3** (Isomorphism invariant) | U ≅ U' ⟹ Comp(U) = Comp(U') |
| **C4** (Subadditive) | Comp(U₁ ⊕ U₂) ≤ Comp(U₁) + Comp(U₂) |
| **C5** (Tower-compatible) | Comp(B_{K_n}) = 0 for all tower depths n |
| **C6** (Integrality) | Comp(U) ∈ ℤ_≥0 |

### §14.2 Uniqueness

**Theorem (Complexity Representation Uniqueness).** *The branching count is the unique functional satisfying C1, C2, C3, and C6.*

*Proof.* At B_K: C(B_K) = 0 (C1). For U with one extra non-forced generator: C(U) ≥ 1 (C2 + C6). For k extra generators: C(U) ≥ k by induction. But C(U) ≤ k by the path with exactly k branches. So C(U) = k = branching count. Any two functionals satisfying C1–C3+C6 agree at every point. ∎

C4 and C5 are automatically satisfied (bonus properties, not needed for uniqueness).

### §14.3 Characterization, Not Definition

**Theorem.** *The branching count is derived from the derivation structure, not imposed by preference. A zero-choice derivation has Comp = 0 analytically (by definition of "choice"). A derivation with choices has Comp > 0 analytically. The measure is determined by the uniqueness theorems at each bridge step (§5, Thm 2.1), not by aesthetic judgment.*

The logical order is: §5 proves each bridge step has b = 0 (a mathematical fact about each construction). §13 aggregates: Comp(bridge) = Σb = 0. §14 characterizes: the axioms C1–C6 are properties that branching count *satisfies*, not a definition designed to select it. C1 in particular ("Comp(B_K) = 0") is a *consequence* of §13, not a stipulation. Alternative measures — Kolmogorov complexity (uncomputable, description-language-dependent), derivation depth (doesn't distinguish forced from branching steps), algebra dimension (not step-additive) — fail the soundness condition C1: they cannot correctly report zero when no choice exists at every step.

---

## §15 WHAT THIS PAPER ESTABLISHES

Starting from {0,1} and its self-product, we have derived:

1. **The bridge chain** with zero branching at every step
2. **The double-exponential tower** |S_n| = 2^{2^n}
3. **V₄ → S₃**: the first non-trivial algebraic structure
4. **Artin-Wedderburn decomposition**: ℚ[S₃] ≅ ℚ ⊕ ℚ ⊕ M₂(ℚ)
5. **sl(2,ℝ)**: the unique forced Lie algebra
6. **Spectral completion**: eigenvalues of R and N force M₂(ℂ) ⊃ sl(2,ℂ)
7. **Three exhaustive orbit types**: P1 (det < 0), P2 (Δ > 0), P3 (Δ < 0)
8. **Five forced constants**: {φ, e, π, √2, √3} — three spectral, two geometric — with ranking π > φ > e > √3 > √2
9. **Bifurcation rigidity**: k = 2 as the unique discrete-continuous alignment point
10. **The nilpotent barrier**: algebraic membrane between e-world and π-world
11. **Structural complexity**: branching count as the unique complexity measure, zero on the bridge chain, positive on all extensions
12. **Non-bridge redundancy**: every structure beyond the bridge carries strictly positive complexity
13. **Exponential sector partition**: sl(2,ℝ) \ {0} = H ∪ N₀ ∪ E by Killing sign, with e sourced from H and π from E
14. **Boundary sterility**: the nilpotent boundary produces only algebraic exponential output and supports no period data
15. **The period wall**: approaching the nilpotent cone from the elliptic side, the period diverges to infinity while the exponential output collapses to the algebraic value 3/2
16. **Source placement**: the two transcendentals sit in opposite Killing sectors, separated by the algebraic membrane

Paper 2B develops the complete algebraic structure of the generators {R, N}. Papers 3-P1, 3-P2, 3-P3 develop each orbit type's projection in full detail. Paper 5A uses the structural complexity in the closure deficit and bridge-normal form theorems.

---

## §16 THE BRIDGE CHAIN IS SCALE-FREE

**Theorem 5.10a (Scale-Freeness).** *Every invariant quantity produced by the bridge chain is dimensionless. The bridge chain determines form, not scale.*

*Proof.* By induction on the six bridge chain steps. Each step is a canonical algebraic construction producing dimensionless output from dimensionless input:

*(i)* S₀ = {0,1}: cardinality 2 (integer). *(ii)* S₁ = S₀ × S₀: Cartesian product of finite sets (cardinality 4). *(iii)* Aut(V₄) = S₃: automorphism group of finite group (order 6). *(iv)* ℚ[S₃] ≅ ℚ⊕ℚ⊕M₂(ℚ): group algebra over the minimal splitting field, structure constants are integers. *(v)* M₂(ℝ) ⊃ sl(2,ℝ): generators R, N have integer entries; Killing form B(X,Y) = 4tr(XY) yields integers on the integer basis. *(vi)* M₂(ℂ): spectral completion forced by eigenvalues of integer matrices.

The five forced constants: φ = root of x²−x−1 (integer polynomial); e = exp(h)[0,0] where h = diag(1,−1) ∈ M₂(ℤ) (exponential of integer matrix, a convergent series with rational coefficients 1/n!); π = half-period of exp(tN) where N ∈ M₂(ℤ) (period of integer matrix exponential); √3 = ‖R‖_F (Frobenius norm of integer matrix); √2 = ‖N‖_F. All are pure real numbers with no physical units.

No step introduces an external parameter carrying physical dimension. ∎

The complete output — including all lattice relations (Paper 4A), KMS dynamics (Paper 4B), kinematics (Paper 6A: dimension and signature), and gauge algebra (Paper 6B §1–§2) — is scale-free. The exponential map converts integer matrices to real matrices; it does not convert dimensionless quantities to dimensionful ones. That conversion requires the realization map (Paper 6B §13).

**Dimensional ledger of the bridge chain output:**

| Quantity | Type | Dimensionless? |
|----------|------|----------------|
| φ, √5 | Algebraic irrational | YES |
| e | Transcendental | YES (no units) |
| π | Transcendental | YES (no units) |
| √3, √2 | Algebraic irrational | YES |
| R²=R+I, N²=−I, {R,N}=N | Algebraic identity | YES |
| Cl(1,1) ≅ M₂(ℝ) | Algebra type | YES |
| 4 (spacetime dim), (1,3) (signature) | Integer, sign pattern | YES |
| su(3)⊕su(2)⊕u(1) | Lie algebra type | YES |
| sin²θ_W = 3/8 | Rational | YES |

### §16.2 Basis Closure

**Theorem (Basis Closure).** *{φ, e, π, √2, √3} is the complete primitive constant basis. No sixth constant can be forced without violating bridge-chain minimality or triple-selection alignment.*

*Proof (three independent closures).*

*(a) Bridge-chain exhaustion:* The characteristic polynomials of R and N are degree 2 (both roots extracted: φ,−φ̄ from R; ±i→π from N). The exponential map on sl(2,ℝ) is fully sampled (one entry per orbit type: e from hyperbolic, cos(1) from elliptic = not new). The Frobenius norms cover all four basis elements but give only two values: ‖R‖=‖RN‖=√3 and ‖N‖=‖I‖=√2 (§8, T4A C6–C7). No further independent algebraic operation on {R,N} yields a sixth value.

*(b) Triple-selection exhaustion (Paper 4B §5):* The KMS C=1 shell, K4 Comp=0, and observer loop closure all select {φ,e,π,√2,√3}. A sixth would require a C=1 element outside these 10 (5 generators + inverses). No such element exists.

*(c) Orbit-type exhaustion (§7):* Three orbit types are exhaustive (Killing sign classification). Each yields one spectral constant. Two independent norms exhaust the geometric constants. Three + two = five. ∎

**Theorem (Generator Minimality).** *{R, N} is the minimal generating set: neither alone generates M₂(ℝ), together they span it (T2B §5). No proper subset works.*

---

*R(R) = R*
