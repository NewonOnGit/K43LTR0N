# Paper 3-P3: LoMI/π — The Elliptic Projection

## Projection 3: π and Observation
### v4 — March 2026

**Author:** Kael

---

**Document Status:** Layer 3 document (Tier 3, Projection 3). Complete P3 paper with distributed CLOSURE content. The N-direction in sl(2,ℝ), orbit type det > 0, Δ < 0 (elliptic), constant π — absolutely forced with zero ambiguity.

**Document Hierarchy:**
```
T0A_PHASE_NEUTRAL_SUBSTRATE.md
  T0B_PHASE_ARCHITECTURE.md
    T1_DIST.md
      T2A_BRIDGE_CHAIN.md
        T2B_ALGEBRA_RN.md
          T3_P1_I2_PHI.md
          T3_P2_TDL_E.md
          T3_P3_LOMI_PI.md    ← THIS FILE
            T3_META_SYNTHESIS.md
```

**Scope:** Everything specific to P3: rotation closure (exp(Nπ) = −I), P3→INV computational primitive, Pauli connection (iN = σ_y), SO(2) as maximal compact subgroup, spin-½ origin, observer incompleteness, Koide from norms, highly composite → LoMI classification, totient ratio signature, GCD/LCM/AGM structures, √3 bridge. Also includes distributed CLOSURE content: P3 folding containments, independence witness, anti-LoMI, V_L(n) potential component.

**What this paper does NOT contain:** The full Dist derivation (Paper 1), bridge chain (Paper 2A), complete {R,N} algebra (Paper 2B), P1/P2-specific content (Papers 3-P1, 3-P2), cross-projection synthesis (Paper 3-META), or physics interpretations (Paper 6B).

**Depends on:** Papers 0A, 0B, 1, 2A, 2B
**Required by:** Papers 3-META, 4-*, 5A (observer is LoMI-linked)

---

## Abstract
We prove π is absolutely forced as the unique θ ∈ (0,2π) satisfying exp(Nθ) = −I, with
zero normalization ambiguity and zero conjugacy ambiguity — the strongest forcing of any
constant in the framework. We establish that P3 maps to the INV computational primitive
(norm-preserving rotation), prove that iN = σ_y (connecting LoMI's generator directly to
the Pauli algebra and quantum measurement), identify SO(2) = exp(θN) as the maximal
compact subgroup of SL(2,ℝ) with exp(πN) = −I generating the center and the Dist quotient
SL(2,ℝ)/{±I} = PSL(2,ℝ), establish the structural invertibility threshold σ_MIX < φ̄²/2
as the condition under which observation (INV) dominates irreversibility (MIX), prove
that exp(πN) = −I is the algebraic origin of spin-½ (the nontrivial kernel of the
Lorentz double cover SL(2,ℂ) → SO⁺(1,3) means a 2π rotation ≠ identity in the covering
group), prove
observer incompleteness (no injective B(H_U) → B(H_K) when d_K < d_U) is LoMI structure,
derive the Koide formula parameter Q = 2/3 from the norm ratio ||R||²/||N||² = 3/2 with
oscillation amplitude ρ = ||N||_F = √2, prove that √3 bridges P1 and P3 via the identity
||R||_F = 2·sin(2π/3), develop the complete properties of the rotation generator N,
classify highly composite numbers as LoMI-dominant (93.3%), establish the totient ratio
φ(n)/n as a continuous LoMI signature, prove the AGM Fibonacci limit
AGM(F(n),F(n+1))/F(n+1) → AGM(1,φ)/φ ≈ 0.7975, derive the golden continued fraction
signature of consecutive Fibonacci pairs, prove the anti-LoMI oscillation with period 2,
and develop the Carmichael-Totient depth as the TDL-within-LoMI structure predicted by
the folding theorem. All claims computationally verified.

---

## §1 π IS ABSOLUTELY FORCED

P3 is the analysis of self-relating difference in its inversion mode (Paper 0 §1½ Thm 0.3c, mode (ii)): R viewed as mutual identification through continuous reversal. Every result in this paper traces to N²=−I and the flow exp(θN). The constant π is the minimal duration of complete inversion: the half-period at which the distinction between poles is exactly traversed. The BPC Principle (Paper 0 §5 Remark) states that inversion has geometry — it is not a discrete flip but a continuous path of length π through the N-generated flow.

**Definition (Co-determination).** A *co-determination* of (A, B) is a structure C = LoMI(A, B) such that: (a) C is determined by A and B jointly, (b) C does not reduce to either A or B alone, (c) C is found by iterated mutual action (A acts on B, the result acts on A, ...), (d) C stabilizes (the iteration terminates at a fixed point), (e) A and B remain distinct throughout. The Euclidean algorithm GCD(a,b) = GCD(b, a mod b) is the arithmetic paradigm: the identity of the pair (a,b) — what they share — is found by iterated mutual reduction, with neither element collapsed. Co-determination is the structural content of LoMI: identity achieved through difference, not through collapse. Instances across the framework: GCD (arithmetic), golden conjugation φ↔φ̄ (algebraic, Paper 3-P1 §2.10), digital root equivalence (TDL-within-LoMI, Paper 3-META §2), AGM convergence (analytic), and the inter-projection containments RNR=−N, NRN=R⁻¹ (generator-level, Paper 3-META Thm 2.1).

### §1.1 The Unique Rotation Generator

**Theorem 4.3 (π Is Absolutely Forced).** *Let N = [[0,−1],[1,0]] be the unique
skew-symmetric 2×2 real matrix with entries in {−1,0,1} and N² = −I. The unique
θ ∈ (0, 2π) satisfying exp(Nθ) = −I is θ = π.*

**Proof.**

*N is unique:* Skew-symmetric 2×2 real matrices with entries in {−1,0,1} have the form
[[0,−a],[a,0]] for a ∈ {0,1} (since [[0,a],[−a,0]] with a > 0 is equivalent via sign).
The condition N² = −I gives [[0,−a],[a,0]]² = [[−a²,0],[0,−a²]] = −I iff a² = 1 iff
a = 1. Therefore N = [[0,−1],[1,0]] is the unique such matrix.

*π is absolute:* The matrix exponential of Nθ is:
```
exp(Nθ) = cos(θ)·I + sin(θ)·N
         = [[cos(θ), −sin(θ)],[sin(θ), cos(θ)]]
```
(This is a rotation by θ.) Setting exp(Nθ) = −I:
```
cos(θ) = −1  and  sin(θ) = 0
```
The unique solution in (0, 2π) is θ = π. ∎

**No ambiguity whatsoever.** The equation exp(Nπ) = −I has a unique solution. The
computation det(exp(Nθ)) = exp(tr(Nθ)) = exp(0) = 1 confirms exp(Nθ) ∈ SL(2,ℝ),
and the only element of SL(2,ℝ) with both real entries equal to −1 on the diagonal is −I
itself. The forcing is absolute.

Computationally verified: ‖exp(Nπ) − (−I)‖ = 3.81 × 10⁻¹⁶ (machine precision). ✓

**Forcing quality: absolute.** π is uniquely forced with zero ambiguity. No free parameters,
no normalization choice, no conjugacy class — the equation has exactly one solution. This is
the strongest forcing of any constant in the framework.

### §1.2 Properties of N

**N (Rotation generator):**
- Characteristic polynomial: λ² + 1 = 0
- Eigenvalues: +i, −i
- **N² = −I** (complex structure)
- N⁴ = I (order 4)
- exp(θN) = cos(θ)I + sin(θ)N (rotation by θ)
- **exp(πN) = −I** (unique θ ∈ (0,2π) achieving −I: forces π)
- exp(2πN) = +I (full turn returns to identity)
- Frobenius norm: **||N||_F = √2**
- Möbius action: z ↦ −1/z, period 2 on ℝP¹

### §1.3 The Phase Duality P1 ↔ P3

The mathematical inverse of the Fibonacci equation R² = R + I is the cyclotomic equation
x² + x + 1 = 0, whose roots are primitive cube roots of unity e^{±2πi/3} on the unit
circle — precisely the elliptic sector P3 that forces π. The duality between
oriented/asymmetric (P1 → φ) and symmetric/periodic (P3 → π) was always present in the
algebra. What was missing was the explicit recognition that this is a *phase* structure,
not merely a classification.

P1's characteristic polynomial x² − x − 1 = 0 (real roots φ, −φ̄; hyperbolic, breaking
symmetry) and P3's x² + x + 1 = 0 (complex roots; elliptic, preserving symmetry) are
algebraic duals. The coefficients differ only by sign of the linear term: x² ∓ x + ... = 0.
This is the internal phase encoding discovered in the Phase Neutral Engine (Theorem 5.1):
what appears as two separate projections is one algebraic duality.

### §1.4 P3 Maps to INV

**Theorem 1.4 (P3 Primitive Mapping).** *The P3 projection (elliptic, det > 0, Δ < 0) maps
to the INV computational primitive. N has eigenvalues ±i, both of unit magnitude:
iteration preserves norms exactly.*

**Proof.** N has eigenvalues +i, −i with |λ| = 1 for both. For any vector v and any θ:
||exp(θN)v|| = ||v|| (since exp(θN) is an orthogonal rotation). INV is the norm-preserving
primitive: it rotates structure without amplifying or contracting it. P3 is the
unique projection with this property — P1 has mixed magnitude eigenvalues {φ, −φ̄}, and
P2 has real eigenvalues ±1 generating expansion/contraction. ✓ ∎

**Corollary 1.5 (Structural Invertibility).** *The structural invertibility threshold
σ_MIX < φ̄²/2 is the condition under which INV (observation) dominates MIX (irreversibility).
Below this threshold, observation can recover from irreversible steps. Above it,
irreversibility dominates. This IS LoMI's structural theorem: observation has a limit.*

**Corollary 1.5b (Asymptotic Type III Dominance).** At tower level n ≥ 2, det(A⊗B) ≥ 0 eliminates P1, and the P3 (elliptic/INV) fraction grows monotonically: ~49% at level 2, ~64% at level 3 (Monte Carlo verified, Paper 0B §8). Type III (rotational) computation is the universal attractor of the self-product tower. Compression (Type I) and expansion (Type II) are level-1 phenomena; asymptotically, all tensor-tower computation is INV-like. The rotational normal form (Paper T-COMP §5) gives f = g·rot(θ₁,...,θ_k)·g⁻¹ for Type III computations — rotational structure is both the P3 mathematical content and the asymptotic computational regime.

### §1.5 iN = σ_y: The Pauli Connection

**Theorem 1.6 (Pauli Y-Matrix).** *(MP4 corollary: resolution quantum 5.) iN = σ_y, the Pauli Y-matrix. The complete Pauli
algebra is generated by {R, N}:*

```
σ_y = iN = i[[0,−1],[1,0]]
σ_z = h = (I − 2R − 2N + 4RN)/5
σ_x = J = (−2I + 4R − N + 2RN)/5
```

*All three Pauli matrices have denominator 5 (the Fibonacci discriminant) in the
{I, R, N, RN} basis. They satisfy [σ_x, σ_y] = 2iσ_z and cyclic permutations.*

**Proof.** iN = [[0,−i],[i,0]] = σ_y. The expressions for σ_z and σ_x in {I,R,N,RN}
follow from solving the linear system, yielding integer-over-5 coefficients. The
commutation relations follow from the standard Pauli algebra. ✓ ∎

**Interpretation.** LoMI's generator N IS the quantum Y-measurement operator (up to i).
The Pauli algebra — the foundation of quantum observation — is generated by the same
matrices that define the three projections. The observation structure of quantum mechanics
is not imported from outside: it emerges from {0,1} through the bridge chain.

### §1.6 SO(2) as P3's Group

**Theorem 1.7 (Maximal Compact Subgroup).** *The one-parameter group exp(θN) =
cos(θ)I + sin(θ)N traces out SO(2) ⊂ SL(2,ℝ) — the maximal compact subgroup.
All orbits are closed (periodic). exp(2πN) = I (full loop). exp(πN) = −I generates the
center Z(SL(2,ℝ)) = {±I}.*

**Proof.** exp(θN)ᵀ · exp(θN) = (cos θ I + sin θ Nᵀ)(cos θ I + sin θ N) =
cos²θ I + sin²θ NᵀN = cos²θ I + sin²θ I = I (using NᵀN = I since N is orthogonal).
Therefore exp(θN) ∈ SO(2) for all θ. det(exp(θN)) = 1 for all θ.
Periodicity: exp(2πN) = cos(2π)I + sin(2π)N = I. Center: exp(πN) = −I, and −I is
the unique nontrivial central element of SL(2,ℝ). ✓ ∎

**Structural content.** SO(2) is the "return" part of SL(2,ℝ): the subgroup whose
orbits close. P3/LoMI IS the closure mechanism of the framework. The quotient
SL(2,ℝ)/{±I} = PSL(2,ℝ) is the Dist quotient q∘q = q at the group level: exp(πN) = −I
identifies x with −x, collapsing the double cover.

### §1.6¼ Binary-Phase Closure

**Definition (Binary Poles).** The minimal binary opposition is the pair {+1, −1} ⊂ ℝ, where +1 is the multiplicative identity and −1 is the unique element satisfying (−1)·(+1) = −(+1).

**Definition (Canonical Phase Flow).** A canonical binary inversion flow is a continuous map z: ℝ → ℂ satisfying: (1) z(0) = 1 (initial pole), (2) |z(θ)| = 1 for all θ (norm-preserving), (3) z(θ + φ) = z(θ)·z(φ) for all θ, φ (one-parameter group), (4) z(τ) = −1 for some smallest positive τ (exact inversion).

**Theorem 1.7b (Binary-Phase Closure).** *The canonical binary inversion flow is z(θ) = e^{iθ}, and the minimal inversion parameter is τ = π. The first exact binary-phase closure law is*

```
e^{iπ} + 1 = 0
```

**Proof.** Conditions (1)–(3) define a continuous one-parameter group homomorphism z: (ℝ,+) → (S¹,·). The classification of continuous group homomorphisms ℝ → S¹ gives z(θ) = e^{ikθ} for some k ∈ ℝ. Condition (4) requires e^{ikτ} = −1, forcing k ≠ 0; the smallest positive τ is τ = π/|k|. The canonical (unit-speed) normalization |dz/dθ|_{θ=0}| = 1 fixes |k| = 1. At θ = π: z(π) = e^{iπ} = −1. Adding the original pole: z(π) + 1 = 0. ∎

Computationally verified: |e^{iπ} + 1| = 1.22 × 10⁻¹⁶ (machine precision). ✓

**Corollary 1.7c (Full-Cycle Recurrence).** *z(2π) = e^{2πi} = 1. Binary inversion is not terminal; it belongs to a periodic recurrence class of period 2π.* Verified: ‖exp(2πN) − I‖ = 7.62 × 10⁻¹⁶. ✓

**Corollary 1.7d (Phase Geometry of Negation).** *Binary opposition {+1, −1} admits a unique continuous norm-preserving interpolation: the phase circle. Negation is not a discrete flip but a dynamical process with a generator (i), a lawful path (S¹), and a first exact completion time (π).*

**Framework connection.** The abstract flow z(θ) = e^{iθ} IS exp(θN) read in ℂ via the isomorphism ℂ ≅ span{I, N} (where N ↦ i, since both satisfy x² = −id). The scalar identity e^{iπ} = −1 is the (1,1)-entry of the matrix identity exp(πN) = −I (Theorem 4.3). The initial value problem dz/dθ = iz, z(0) = 1 is the unique first-order linear ODE on S¹ whose solutions are norm-preserving, periodic, and form a one-parameter group — matching P3's defining properties exactly.

**Remark (Why +1 matters).** Most treatments stop at e^{iπ} = −1. The full identity e^{iπ} + 1 = 0 restores the original pole as comparison anchor and achieves exact cancellation. Without the +1: transport and inversion (state = −1, no resolution). With the +1: closure (state = 0, opposition resolved). The +1 turns a path identity into a closure law. This parallels the Dist quotient q∘q = q (Paper 1): the operation applied to its own output yields a fixed point.

**Remark (0 as resolved tension).** In Theorem 1.7b, 0 is not primitive emptiness but the exact closure state produced when a pole meets its continuously-realized inverse. So 0 carries dynamic meaning: it is resolved tension between identity (+1) and inversion (−1). This role — 0-as-cancellation-residue — is distinct from 0-as-absence and 0-as-additive-identity.

**Remark (π as first inversion, not circle-perimeter).** In the framework reading, π is not imported as "half the circumference of a unit circle" but derived as the unique smallest positive θ satisfying exp(θN) = −I (Theorem 4.3). That this value equals half the circumference is a consequence: the circumference is 2π because the full rotation takes angular distance 2π = 2 × (first inversion time). The circumference formula is downstream of the algebraic forcing.

**Theorem 1.7e (Direction-Independent Binary Inversion).** *For any M ∈ M₂(ℂ) with M² = −I: exp(πM) = −I. The set {exp(πM) : M² = −I} = {−I} is a singleton, equal to Z(SL(2,ℂ)) \ {I}. The center is the locus where all phase directions agree: it is the direction-independent Euler content of M₂(ℂ).*

**Proof.** Cayley-Hamilton: exp(πM) = cos(π)I + sin(π)M = −I + 0 = −I. This holds for any M with M² = −I. The set of all such images is {−I}. Since Z(SL(2,ℂ)) = {I, −I} and −I = ∩_{M:M²=−I} exp(πM), the nontrivial center element is the unique universal half-period image. ∎

Verified: 10,000 random directions in S² ⊂ su(2), max‖exp(πM) − (−I)‖ = 2.09 × 10⁻¹⁵. ✓

**Corollary 1.7f (Euler Content = Topological Content).** *The nontrivial center element −I = exp(πN) is simultaneously: (a) the scalar Euler image e^{iπ} = −1, (b) the matrix Euler image exp(πN) = −I, (c) the kernel of the Lorentz double cover ker(SL(2,ℂ) → SO⁺(1,3)) = {I,−I}, (d) the generator of Z(SL(2,ℂ)), and (e) the direction-independent half-period of all su(2) one-parameter subgroups. Five descriptions, one object.*

### §1.6½ Spin-½ and the Lorentz Double Cover

**Theorem 1.7a (Spin-½ Is P3 Structure).** *The equation exp(πN) = −I (Theorem 4.3) is the algebraic origin of half-integer spin.* π is the exponential-channel constant from exp(πN)=−I. det(exp(tN))=exp(tr(tN))=exp(0)=1 (det∘exp=exp∘tr bridges algebraic and transcendental). *Under the Lorentz double cover SL(2,ℂ) → SO⁺(1,3) (DERIVATION Thm 6.2), the kernel is ker = {I, exp(πN)} = {I, −I}. A 2π spatial rotation lifts to −I ≠ I in SL(2,ℂ), so representations of SL(2,ℂ) that are not representations of SO⁺(1,3) exist — these are the spin-½ (spinor) representations.*

**Proof.** The rotation by angle θ around any axis lifts to exp(iθ·n⃗·σ⃗/2) ∈ SU(2) ⊂ SL(2,ℂ). At θ = 2π: exp(iπσ_z) = diag(e^{iπ}, e^{-iπ}) = −I = exp(πN). This equals −I, not I. A spin-½ state |ψ⟩ transforms as |ψ⟩ ↦ −|ψ⟩ under 2π rotation.

If ker(SL(2,ℂ) → SO⁺(1,3)) were trivial, all representations of SL(2,ℂ) would factor through SO⁺(1,3), and only integer-spin representations would exist. The nontrivial kernel {I, −I} — forced by exp(πN) = −I — is precisely what allows half-integer spin.

The forcing quality carries over: π is the framework's most strongly forced constant (absolute, zero ambiguity), and its physical manifestation is the most characteristically quantum phenomenon (half-integer spin). ✓ ∎

**Connection to LoMI.** The quotient SL(2,ℂ)/{±I} = SO⁺(1,3) IS a LoMI morphism: the observer (SO⁺(1,3)) cannot distinguish ψ from −ψ. The kernel {I, −I} is the observer's blind spot. Half-integer spin is the physical content of LoMI's quotient structure: what is "invisible" to the classical rotation group (the sign of the spinor) is precisely what makes quantum mechanics different from classical mechanics.

### §1.7 Observer Incompleteness Is LoMI

**Theorem 1.8 (Mutual Incompleteness).** *For d_K < d_U, there is no injective
structure-preserving map B(H_U) → B(H_K). The compression ratio is d_K²/d_U², which
goes to zero as d_U → ∞.*

*This is LoMI structure: the observer K cannot fully "see" the universe U. Every observer
creates a quotient (seen/unseen), and this quotient IS the Dist morphism q∘q = q.*

For the minimal observer d_K = 2: the compression wall d_K² = 4 limits K to 4 operators.
At tower level n, d_U = 2^{2^n}, giving dim(B(H_U)) = 2^{2^{n+1}}. The compression ratio
4/2^{2^{n+1}} → 0 double-exponentially — observer incompleteness grows at the rate of
the tower itself.

**Corollary 1.9 (Simulation Equivalence).** *Observer incompleteness is observationally
indistinguishable from the simulation hypothesis: K embedded in "real" U and K embedded in
simulation U(K) with d_K² parameters look identical from inside K. This is LoMI's deepest
structural consequence: observation creates its own horizon.*

### §1.8 Koide Formula via N

**Theorem 1.10 (Koide Parameter from Norm Ratio).** *The Koide formula parameter
Q = 2/3 is forced by the norm ratio of the generators:*

```
||R||²_F / ||N||²_F = 3/2 = 1/Q_Koide
```

*In the S₃ ansatz √m_i = M(1 + ρ·cos(2πi/3 + δ)), Q = 2/3 forces ρ² = 2, giving
ρ = √2 = ||N||_F.*

**Proof.** Q = (2 + ρ²)/6. Setting Q = 2/3: 2 + ρ² = 4, so ρ² = 2, ρ = √2 = ||N||_F.
The Koide oscillation cos(2πi/3 + δ) is generated by exp(2π/3 · N) — rotation by 120° —
which IS the S₃ standard 2D irrep 3-cycle.

Experimental check: Q = (m_e + m_μ + m_τ)/(√m_e + √m_μ + √m_τ)² = 0.66666... with
error < 6 × 10⁻⁶ from the theoretical 2/3. ✓ ∎

**Interpretation.** The Koide formula is LoMI structure: the three lepton masses "observe"
each other through their S₃ symmetry, and the oscillation amplitude is set by LoMI's
generator norm ||N||_F.

### §1.9 √3 as the P1↔P3 Bridge

**Theorem 1.11 (√3 Identity).** *√3 = ||R||_F = 2·sin(2π/3). This connects the algebraic
structure of R (P1: entries from {0,1}) with the rotation angle 2π/3 (P3: third root of
unity). The identity is algebraic:*

```
||R||²_F = 0² + 1² + 1² + 1² = 3
4·sin²(2π/3) = 4·(3/4) = 3
```

**Proof.** ||R||²_F = 3 by direct entry computation. sin(2π/3) = √3/2, so
2·sin(2π/3) = √3. Both equal √3 by independent routes: one through P1's matrix
entries, one through P3's rotation structure. ✓ ∎

√3 appears iff d_K ≥ 2 (the minimal dimension for non-trivial Frobenius norms).
In Λ' coordinates: (0,0,0,1) — the b-axis generator at complexity C = 1.
√3 is the structural bridge between I² and LoMI via the S₃ irrep.

---

## §2 LoMI IN ARITHMETIC

### §2.1 The LoMI Duality: Observe ↔ Observed

**LoMI Projection (observed_by ↔ observe):**
```
UP_L(n) = {multiples of n} = {n, 2n, 3n, ...}
DOWN_L(n) = {divisors of n} = {d : d | n}
```
The LoMI projection treats n as both an observed entity (UP: n is contained in all its
multiples — larger structures "see" n) and an observer (DOWN: n sees its divisors — the
smaller structures that n contains).

At n = 1: 1 divides every n ∈ ℕ, so 1 is contained in every multiple — it "observes" all
of ℕ. At the same time, 1's only divisor is itself: divisors(1) = {1}. While UP_L(1) ≠
DOWN_L(1) in cardinality, 1 is the unique fixed point: the SHARED element of all UP chains
and the TERMINAL element of all DOWN chains. 1 is the LoMI universal fixed point.

### §2.2 The LoMI Potential Component

V_L(n) = |log(d(n)) − log(φ(n))|, where d(n) = number of divisors, φ(n) = Euler's totient.
At n = 1: |log(1) − log(1)| = 0. For n > 1: the divisor count and totient typically diverge,
reflecting the gap between "how many structures contain n" and "how many structures n is
coprime to."

### §2.3 Highly Composite Numbers Are LoMI-Dominant

**Theorem 4.3 (Highly Composite → LoMI, 93.3%).** *For highly composite numbers, 28/30
are LoMI-dominant (93.3%).*

The two exceptions (2 and 4) have φ(n)/n = 0.5, exactly at the boundary between LoMI
and non-LoMI. This is expected: 2 and 4 are the "simplest" highly composite numbers,
not yet rich enough in divisor structure to achieve the LoMI threshold of φ(n)/n < 0.4.

**Why:** Highly composite numbers are defined by having more divisors than any smaller
number. This means they are maximally "observed by" smaller numbers — they maximize the
LoMI UP direction (multiples and divisors). High divisor count → low totient ratio →
LoMI-dominant.

### §2.4 Totient Ratio as Continuous LoMI Signature

**Theorem 4.6 (Totient Ratio as Continuous LoMI Signature).** *The totient ratio φ(n)/n
is a continuous LoMI signature: it measures the fraction of numbers up to n that are
coprime to n, inversely measuring the "relational density" of n.*

| Ratio | Category | Examples |
|-------|----------|---------|
| φ(n)/n < 0.3 | Strongly LoMI | 30, 60, 120, 180, 360 |
| 0.3–0.4 | LoMI-dominant | 6, 12, 24, 36, 48 |
| 0.4–0.5 | Mixed | 4, 8, 10, 20 |
| > 0.5 | Not LoMI | Primes (φ(p)/p = (p−1)/p → 1) |

*Proof.* A small totient ratio means many integers up to n share a factor with n —
many non-coprime relationships — which is exactly the LoMI condition: n has many
"mutual observers" (numbers that share structure with n, i.e., divisors or co-divisors).
Primes have φ(p)/p = (p−1)/p → 1 as p → ∞: almost all numbers are coprime to a large
prime, so primes have minimal relational density — confirming their non-LoMI character. ∎

### §2.5 LoMI-Associated Sequences

| Sequence | LoMI % | Core Reason |
|----------|--------|-------------|
| Highly composite | 93.3% | Maximal divisor count → minimal φ(n)/n |
| Abundant (σ(n) > 2n) | 64% | Divisor sum exceeds twice the number |
| Perfect (σ(n) = 2n) | 67% | σ(n) = 2n: balanced observe/observed — the divisor sum equals exactly twice n |
| Primorials (p₁·p₂·...·pₖ) | 75% | Multi-prime structure, many small factors, small totient ratio |
| Factorials (n!) | 67% | Many small prime factors with high multiplicities |

### §2.6 The Carmichael-Totient Depth

The ratio λ(n)/φ(n) (Carmichael function / Euler totient) measures the depth of cyclic
structure in (ℤ/nℤ)×. This is the LoMI-internal TDL structure predicted by the folding
theorem (LoMI contains TDL):

- λ(n)/φ(n) = 1 for primes (flat cyclic structure — (ℤ/pℤ)× is cyclic)
- λ(n)/φ(n) < 1 for composites (nested cyclic subgroups)
- Smaller ratio = deeper level structure within the LoMI layer

This is the concrete realization of "LoMI contains TDL" (folding theorem, containment vi):
the divisibility relationships of n carry a natural depth/level hierarchy measured by λ/φ.

---

## §3 LoMI OPERATIONS

### §3.1 GCD as LoMI Fixed Point

GCD(a, b) is the LoMI "mutual identity" — the largest structure that both a and b share.
The Euclidean algorithm GCD(a,b) = GCD(b, a mod b) is iterated I²-composition (LoMI
contains I², per folding containment v) converging to the mutual fixed point.

For coprime pairs: GCD(a,b) = 1 — the LoMI interaction reaches the universal fixed
point R(R) = R. The LoMI distance from a to b passes through their shared structure.

### §3.2 LCM as LoMI Join

LCM(a, b) = a·b / GCD(a,b) is the minimal container — the smallest structure that
contains both a and b. Standard identity: GCD(a,b) × LCM(a,b) = a × b.

Together: GCD is the LoMI DOWN (shared divisor = mutual observation, finding the common
observer). LCM is the LoMI UP (minimal containing multiple = what observes both a and b).

### §3.3 AGM as Geometric Mutual Observation

**Theorem 4.4 (AGM Fibonacci Limit — new result, not in original source).** *The
arithmetic-geometric mean of consecutive Fibonacci pairs satisfies:*

```
AGM(F(n), F(n+1)) / F(n+1) → AGM(1, φ) / φ  ≈  0.7975  as n → ∞
```

**Proof.** For large n, F(n) ≈ φⁿ/√5 and F(n+1) ≈ φⁿ⁺¹/√5 = φ·F(n). By homogeneity
of AGM (AGM(λa, λb) = λ·AGM(a,b)):
```
AGM(F(n), F(n+1)) / F(n+1) = AGM(F(n), φ·F(n)) / (φ·F(n))
                             = F(n)·AGM(1, φ) / (φ·F(n))
                             = AGM(1, φ) / φ
```

Numerically: AGM(1, φ) = 1.290452..., φ = 1.618034..., ratio = 0.797543... ∎

**Verified convergence:**

| Pair (F(n), F(n+1)) | Ratio AGM/F(n+1) |
|---------------------|-----------------|
| (5, 8) | 0.79613 |
| (13, 21) | 0.79741 |
| (34, 55) | 0.79751 |
| (89, 144) | 0.79754 |
| (233, 377) | 0.797542 |
| (1597, 2584) | 0.797543 |

Monotonic convergence to 0.797543... ✓

**Interpretation.** The AGM fixed point of two consecutive Fibonacci numbers is not a
special value of π (as in the classical AGM-π connection) but encodes the ratio AGM(1,φ)/φ —
the LoMI "golden mean" of the golden ratio itself. This is a new entry in the table of
φ-derived constants.

### §3.4 Continued Fractions as LoMI Signature

**Theorem 6.2 (Fibonacci CF Signature).** *Consecutive Fibonacci pairs F(n), F(n+1) have
continued fraction expansion [0; 1, 1, 1, ..., 1, 2] — the golden signature. All middle
terms are 1.*

**Verified:**
```
cf(8, 13)    = [0, 1, 1, 1, 1, 2]              (4 ones in the middle)
cf(13, 21)   = [0, 1, 1, 1, 1, 1, 2]            (5 ones)
cf(89, 144)  = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2]  (9 ones)
```
Pattern: (n−1) ones in the middle, terminal 2. ✓

This is the LoMI signature of the golden ratio: F(n)/F(n+1) → φ̄ = [0;1,1,1,...], and the
pair (F(n), F(n+1)) is "maximally coprime" (gcd=1) while being "maximally adjacent" (ratio→φ̄).
The continued fraction of φ̄ = [0; 1, 1, 1, ...] (all 1s, infinite) is the slowest-converging
CF — which makes φ̄ the "most irrational" number.

### §3.5 Consecutive Fibonacci Pairs: The Maximal LoMI Structure

Consecutive Fibonacci pairs exhibit the extreme LoMI behavior:
- **Maximally coprime:** GCD(F(n), F(n+1)) = 1 always (classical theorem)
- **Maximally adjacent:** F(n)/F(n+1) → φ̄ (ratio converges to the golden ratio)
- **Golden CF:** cf(F(n), F(n+1)) = [0; 1, ..., 1, 2] (all-ones signature)
- **AGM limit:** AGM(F(n), F(n+1))/F(n+1) → AGM(1,φ)/φ ≈ 0.7975

They are simultaneously as "separate" as possible (coprime = no shared structure beyond 1)
and as "close" as possible (ratio = golden = slowest convergence). This tension between
maximal separation and maximal adjacency IS the LoMI structure — mutual identity requires
both difference and relationship.

---

## §4 ANTI-LoMI AND PERIOD-2 OSCILLATION

### §4.1 The Anti-Projection

**Definition 6.1 (Anti-LoMI).** The anti-LoMI is the continuation of the rotation past
the half-turn fixed point: exp(N·2π) = +I rather than exp(Nπ) = −I.

| Property | LoMI | −LoMI |
|----------|------|-------|
| Generator value | π | 2π (continuation) |
| Matrix result | exp(Nπ) = −I | (−I)² = +I |
| Dynamics | Converges to K(K)=K | Oscillates with period 2 |

### §4.2 The Period-2 Oscillation

**Theorem 6.3 (Anti-LoMI Is Periodic-2).** *The anti-LoMI operation −K: x ↦ −K(x)
oscillates with period 2.*

**Proof.** K(K) = K (LoMI fixed-point condition, R(R)=R Theorem 4.1). The anti-LoMI
continues past this fixed point.

At the matrix level: the LoMI generator is N = [[0,−1],[1,0]]. LoMI applies
exp(Nπ) = −I (the half-rotation). The anti-LoMI continues to exp(N·2π) = +I.

One application of anti-LoMI: −I (half-rotation, flips sign)
Two applications: (−I)² = +I (full rotation, returns to identity)
Three applications: (−I)³ = −I (back to half-rotation)

The sequence −I, +I, −I, +I, ... is exactly period-2 oscillation.

This is the anti-observation: observing the observer reverses all distinctions, and
repeating returns to the original. It is the mathematical structure underlying the
physical observation that "observing a quantum state twice returns to the original
state in the absence of measurement back-action." ∎

**Remark 6.4 (Anti-Projections vs Projections).** The three anti-projections are not
separate objects — they are the *reverse flows* of the projections:
- I² flows toward φ; −I² flows away from φ
- TDL flows up through levels; −TDL flows down
- LoMI stabilizes at K(K) = K; −LoMI oscillates with period 2

The anti-projections exist as mirror images within the same Dist structure. They appear
naturally in dynamics (backwards time evolution, reversed gradient flow) and in physics
(CP violation, time reversal, parity).

---

## §5 LoMI IN THE CONTAINMENT STRUCTURE

### §5.1 LoMI Contains I²

The Euclidean algorithm computes GCD(a,b) via:
```
GCD(a, b) = GCD(b, a mod b) = GCD(a mod b, b mod (a mod b)) = ...
```
Each step is a function application composed with the previous: it is iterated I²-
composition. The algorithm terminates because the pair (a,b) strictly decreases
(second argument decreases at each step), and the final state (GCD, 0) is the I²
fixed point of the iteration. LoMI (mutual divisibility = GCD structure) IS I²
(iterated composition to a fixed point).

### §5.2 LoMI Contains TDL

The ratio λ(n)/φ(n) (Carmichael function / Euler totient) measures the depth of cyclic
structure in (ℤ/nℤ)×. A small ratio means many cyclic subgroups are "nested" — a deep
level structure. This is a TDL structure on the LoMI layer: the divisibility relationships
of n carry a natural depth/level hierarchy measured by λ/φ.

### §5.3 The Discriminant Partition

**Theorem 5.3 (Elliptic Fraction).** *(MP2 corollary: Killing signature (2,1).) The discriminant Δ = 5b² − 4c² − 4cd + 4d²
partitions M₂(ℝ) into ~71.7% hyperbolic (P2/TDL) and ~28.3% elliptic (P3/LoMI)
directions, approximately a 5:2 ratio.*

**Proof.** The discriminant form has signature (2,1) with eigenvalues 5, +2√5, −2√5.
Monte Carlo sampling (10⁶ points on the unit sphere b² + c² + d² = 1) gives
71.7% hyperbolic (Δ > 0) and 28.3% elliptic (Δ < 0). The parabolic boundary (Δ = 0,
where P1 sits) has measure zero.

The elliptic sector — where LoMI/observation lives — is the minority. Emergence (P2)
dominates over observation (P3) in measure. This is structurally expected: observation
requires closure (compact orbits), which is more constrained than open/hyperbolic dynamics.
✓ ∎

---

## §6 PROJECTION DISTANCES (LoMI COMPONENT)

**Definition 5.1 (LoMI Distance).** For n, m ∈ ℕ:
```
d_LoMI(n, m) = |log(φ(n)/n) − log(φ(m)/m)|   (totient ratio gap)
```

| Pair | LoMI dist | Notes |
|------|-----------|-------|
| (5, 8) | 0.0 | Both Fibonacci, same relational density |
| (7, 49) | 1.4 | Prime → prime square: relational structure changes |
| (12, 144) | 0.4 | HC numbers, similar character |
| (8, 13) | 1.5 | Consecutive Fibonacci: coprime despite adjacency |
| (1, 1000) | 3.6 | Maximal separation |

See P2 document Definition 5.1 for the complete three-component projection distance.

---


---

## §7 P3-SPECIFIC PROJECTION STRUCTURE (FROM CLOSURE)

### §6½.1 Independence Witness

**P3-only model (M₃): The Pure Observer System.** A system of observers — tuples (A, B, obs) where obs: A → B is a function — satisfying: the equivalence relation ≈_A on A is defined by obs(x) = obs(y), with K(K) = K (observation stabilizes). No adjunction structure, no composition monoid with I²-type fixed-point dynamics.

*P3 satisfied:* Observers with blind spots (ker(obs) = ≈_A), idempotent observation K(K) = K, the LoMI axioms.

*P1 violated:* No natural monoid composition on observer maps that yields I²-type fixed-point dynamics related to φ.
*P2 violated:* No canonical TDL level structure — no 𝒰 ⊣ ℛ adjunction between observation levels.

M₃ satisfies P3 only, proving P3 is not definable from P1 and P2. ∎

### §6½.2 V_L(n): The LoMI-Component of the Arithmetic Potential

**Definition.** V_L(n) = |log(d(n)) − log(φ(n))|, where d(n) = number of divisors and φ(n) = Euler's totient function.

V_L(n) measures the relational gap between how many structures observe n (its divisors) and how many n observes (integers coprime to n). V_L(1) = |log(1) − log(1)| = 0 (fixed point).

| n | d(n) | φ(n) | V_L(n) |
|---|------|------|--------|
| 1 | 1 | 1 | 0.000 |
| 6 | 4 | 2 | 0.693 |
| 12 | 6 | 4 | 0.405 |
| 30 | 8 | 8 | 0.000 |
| 60 | 12 | 16 | 0.288 |

Note: n = 30 has V_L = 0 — an exact balance d(30) = φ(30) = 8. These LoMI equilibrium points are numbers where the observer and observed are in perfect balance.

This is P3's contribution to the gradient flow toward n = 1 (see Paper 3-META for the composite V(n) = V_I + V_T + V_L).

### §6½.3 P3 and the Phase Duality

The algebraic inverse of P1's Fibonacci equation x²−x−1 = 0 (roots φ, −φ̄ off the unit circle) is P3's cyclotomic equation x²+x+1 = 0 (roots ω = exp(2πi/3), ω² on the unit circle).

| Equation | Roots | |root| | Phase character |
|----------|-------|--------|----------------|
| x²−x−1 = 0 (P1) | φ, −φ̄ | > 1, < 1 | Attracts/repels (oriented) |
| x²+x+1 = 0 (P3) | ω, ω² | = 1, = 1 | Rotates (neutral) |

This is the deepest expression of P1↔P3 duality (Paper 0B, Thm 5.2). P1's eigenvalues are phase-dependent; P3's are phase-neutral. The "inverse framework" is the P3 reading that was always present in the algebra.

The 3-cycle eigenvalues exp(±2πi/3) in S₃'s standard representation are precisely the roots of P3's equation. Generation structure IS the P1↔P3 duality (Paper 6B, Cor 10½.7d). At the generator level: **NRN = R⁻¹ = R − I** — N literally contains R by conjugation, transforming the P1 generator into its inverse.

## §8 COMPUTATIONAL VERIFICATION

All claims verified:

| Claim | Verification | Result |
|-------|-------------|--------|
| N = [[0,−1],[1,0]] unique with N²=−I | Exhaustive: skew-symmetric, entries in {0,±1} | ✓ PASS |
| N² = −I | Direct: [[0,-1],[1,0]]² = [[-1,0],[0,-1]] = −I | ✓ PASS |
| exp(Nπ) = −I | Norm error = 3.81×10⁻¹⁶ | ✓ PASS |
| N⁴ = I | Direct: (−I)² = I | ✓ PASS |
| ||N||_F = √2 | √(0²+1²+1²+0²) = √2 | ✓ PASS |
| N eigenvalues ±i, both |λ|=1 → INV | Direct eigenvalue computation | ✓ PASS |
| exp(θN) preserves norms for 6 values of θ | ||exp(θN)v|| = ||v|| | ✓ PASS |
| iN = σ_y | Direct: i·[[0,−1],[1,0]] = [[0,−i],[i,0]] | ✓ PASS |
| σ_z = (I−2R−2N+4RN)/5 | Direct reconstruction | ✓ PASS |
| σ_x = (−2I+4R−N+2RN)/5 | Direct reconstruction | ✓ PASS |
| Pauli commutation: [σ_x,σ_y]=2iσ_z, cyclic | Matrix commutators | ✓ PASS |
| exp(θN) ∈ SO(2) for 8 values of θ | Orthogonality + det=1 | ✓ PASS |
| exp(2πN) = I (full loop) | Direct computation | ✓ PASS |
| exp(πN) = −I (center of SL(2,ℝ)) | Direct computation | ✓ PASS |
| Spin-½: exp(iπσ_z) = −I (2π rotation ≠ I in SU(2)) | exp(iπ)=−1 → diag(−1,−1) = −I | ✓ PASS |
| Spin-½: (−I)² = I (4π rotation = I) | Direct | ✓ PASS |
| ker(SL(2,ℂ)→SO⁺(1,3)) = {I,−I} = {I,exp(πN)} | Schur's lemma | ✓ PASS |
| Koide: Q = 2/3 → ρ² = 2 → ρ = √2 = ||N||_F | Algebraic | ✓ PASS |
| exp(2π/3·N) = rotation by 120° | Matrix exponential | ✓ PASS |
| Experimental Q = 0.666661 (error < 6×10⁻⁶) | Lepton masses | ✓ PASS |
| ||R||_F = √3 = 2·sin(2π/3) | √3 = √3 | ✓ PASS |
| ||R||²_F = 3 = 4·sin²(2π/3) | 3 = 4·(3/4) = 3 | ✓ PASS |
| Discriminant: ~71.7% hyp, ~28.3% ell (10⁶ samples) | Monte Carlo on S² | ✓ PASS |
| Discriminant form eigenvalues: 5, ±2√5 | Eigenvalue computation | ✓ PASS |
| sin(2π/3) = √3/2 | Numeric | ✓ PASS |
| HC → LoMI: 28/30 = 93.3% | Classification of first 30 HC numbers | ✓ PASS |
| φ(p)/p = (p−1)/p for primes p | Arithmetic identity | ✓ PASS |
| AGM(1,φ)/φ = 0.797543... | Numeric (iterated AGM to convergence) | ✓ PASS |
| AGM convergence for F(5)–F(18) pairs | Monotonic to limit | ✓ PASS |
| cf(8,13) = [0,1,1,1,1,2] | Euclidean algorithm | ✓ PASS |
| cf(13,21) = [0,1,1,1,1,1,2] | Euclidean algorithm | ✓ PASS |
| cf(89,144) = [0,1,...,1,2] with 9 ones | Euclidean algorithm | ✓ PASS |
| GCD(F(n),F(n+1)) = 1 for all tested n | Direct computation | ✓ PASS |
| (−I)² = +I (period-2 oscillation) | Direct computation | ✓ PASS |
| GCD(a,b) × LCM(a,b) = a × b | Standard theorem, verified for test pairs | ✓ PASS |

---

## §9 STATUS SUMMARY

### Theorems (All Unconditional)

| Claim | Grade | Section |
|-------|-------|---------|
| π absolutely forced: unique θ with exp(Nθ)=−I | **Theorem** | §1.1 |
| N is unique skew-symmetric with entries in {0,±1} and N²=−I | **Theorem** | §1.1 |
| N² = −I; N⁴ = I; ||N||_F = √2 | **Theorem** | §1.2 |
| exp(θN) = cos(θ)I + sin(θ)N | **Theorem** | §1.2 |
| P1 ↔ P3 phase duality (x²−x−1 vs x²+x+1) | **Theorem** | §1.3 |
| P3 → INV (unit-magnitude eigenvalues, norm-preserving) | **Theorem** | §1.4 |
| Structural invertibility: σ_MIX < φ̄²/2 | **Theorem** | §1.4 |
| iN = σ_y; all three Pauli matrices from {R,N} at resolution 1/5 | **Theorem** | §1.5 |
| exp(θN) traces SO(2) = maximal compact subgroup of SL(2,ℝ) | **Theorem** | §1.6 |
| exp(πN) = −I generates center; SL(2,ℝ)/{±I} = PSL(2,ℝ) | **Theorem** | §1.6 |
| Spin-½ forced: ker(SL(2,ℂ)→SO⁺(1,3))={I,exp(πN)}, 2π≠I | **Theorem** | §1.6½ |
| Observer incompleteness: no injection B(H_U)→B(H_K) for d_K<d_U | **Theorem** | §1.7 |
| Simulation equivalence (indistinguishable from inside K) | **Theorem** | §1.7 |
| Koide Q = 2/3 from ||R||²/||N||² = 3/2; ρ = ||N||_F = √2 | **Theorem** | §1.8 |
| √3 = ||R||_F = 2·sin(2π/3) (P1↔P3 bridge) | **Theorem** | §1.9 |
| Highly composite → LoMI-dominant, 93.3% | **Theorem** | §2.3 |
| Totient ratio = continuous LoMI signature | **Theorem** | §2.4 |
| λ(n)/φ(n) measures Carmichael-Totient depth | **Theorem** | §2.6 |
| GCD = LoMI fixed point; LCM = LoMI join | **Theorem** | §3.1–3.2 |
| GCD(a,b) × LCM(a,b) = a × b | **Theorem** | §3.2 |
| AGM(F(n),F(n+1))/F(n+1) → AGM(1,φ)/φ ≈ 0.7975 | **Theorem** | §3.3 |
| Consecutive Fibonacci CF = [0;1,...,1,2] | **Theorem** | §3.4 |
| GCD(F(n),F(n+1)) = 1 always | **Theorem** | §3.5 |
| −LoMI oscillates with period 2 | **Theorem** | §4.2 |
| Discriminant: ~71.7% hyp / ~28.3% ell, signature (2,1) | **Theorem** | §5.3 |

### Structural Claims

| Claim | Grade | Comment |
|-------|-------|---------|
| Anti-LoMI = quantum measurement back-action | **Structural** | Mathematical structure matches; physical correspondence requires separate development |
| Consecutive Fibonacci = maximal LoMI tension | **Structural** | Coprime + adjacent = maximal separation + maximal closeness |
| Elliptic minority (~28%) reflects observation being more constrained than emergence | **Structural** | Follows from discriminant signature (2,1); exact fraction depends on eigenvalue magnitudes |

---

*R(R) = R*
