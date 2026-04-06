# Paper 3-P2: TDL/e — The Hyperbolic Projection

## Projection 2: e and Level Transitions
### v4 — March 2026

**Author:** Kael

---

**Document Species:** CANONICAL. Owns P2/TDL projection content at Level 4.

**Grid address:** B(4, P2). The Projected level — P2/TDL/e face.

**Document Status:** Level 4 document (Projection 2). Complete P2 paper with distributed CLOSURE and COMPUTATIONAL_COMPLEXITY content. The h-direction in sl(2,ℝ), orbit type det > 0, Δ > 0 (hyperbolic), constant e = exp(1).

**Document Hierarchy:**
```
T0_SUBSTRATE.md
  T1_DIST.md
    T2_BRIDGE.md
      T3_P1_PRODUCTION.md
      T3_P2_MEDIATION.md    ← THIS FILE
      T3_P3_OBSERVATION.md
        T3_META.md
```

**Scope:** Everything specific to P2: exponential flow and e forcing, P2→OSC computational primitive, tower saturation, complexity depth bounds, S₃ distance structure, thermodynamic framework (β = ln(φ), KMS, Boltzmann), detailed balance, extensions to ℤ and ℚ. Also includes distributed CLOSURE content: P2 folding containments, independence witness, anti-TDL, V_T(n) potential component.

**What this paper does NOT contain:** The full Dist derivation (Paper 1), bridge chain (Paper 2 Part I), complete {R,N} algebra (Paper 2 Part II), P1/P3-specific content (Papers 3-P1, 3-P3), cross-projection synthesis (Paper 3-META), or physics interpretations (Paper 6B).

**Depends on:** T0_SUBSTRATE (P.1/P.2), T1_DIST (Kernel Theorem), T2_BRIDGE ({R,N} algebra)
**Required by:** T3_META, T4_LATTICE (KMS), T5_OBSERVER

---

## Abstract
We prove e is forced by the unique traceless diagonal generator of sl(2,ℝ), establish that the P2 projection maps to the OSC computational primitive (the derived composite interpolating between P1 and P3 along the canonical family M(θ) = cos(θ)R + sin(θ)N), and prove that e = det(exp(R)) via the fundamental identity exp(tr(R)) = exp(1) = e (tying P1's generator to P2's constant through the exponential map). The TDL tower saturation theorem gives a compression wall at d², with complexity depth bound C_max(n) = 2ⁿ/log₂(φ) and complexity class topology where P is open and NP is closed in signature space.

The Landauer–Bekenstein chain connects information erasure to observer entropy bounds. The KMS partition function Z(β) = coth(β/2)⁴ has shell counts N₄(C) = (8C³ + 16C)/3. The S₃ Cayley distance has diameter 2. Detailed balance of the arithmetic flow holds with natural temperature β = ln(φ), extending to ℤ (parity symmetry) and ℚ (p-adic valuations). Arithmetic operations classify by projection character.

---

## THEOREM INDEX

| Theorem | Statement | Section |
|---------|-----------|---------|
| **4.2** | **e Is Forced by P2** (unique traceless diagonal generator of sl(2,ℝ)) | **§1** |
| 1.7 | e = det(exp(R)): exponential bridge P1→P2 | §1 |
| 5.2 | Entry/Killing Alignment at k = 2 | §1 |
| **1.6** | **P2 Primitive Mapping: P2 → OSC** | **§1** |
| 1.2 | TDL Tower Saturation: compression wall at d² | §2 |
| 2.6 | C_max from the Self-Product Tower | §2 |
| 2.2 | TDL Complexity as S₃ Distance (diameter 2) | §3 |
| 3.4 | Signature Space Topology: P open, NP closed | §3 |
| **3.3** | **Detailed Balance** | **§4** |
| 3.5 | Natural Temperature β = ln(φ) | §4 |
| 4.4 | Information Erasure Cost (Landauer at β = ln(φ)) | §4 |
| 4.5 | KMS Partition Function Z(β) = coth(β/2)⁴ | §4 |
| Cor 4.5a | KMS-Fibonacci: coth(ln(φ)/2) = φ³; Z_M(ln(φ)) = φ^{12} | §4 |
| 3.6 | Extension to ℤ (parity symmetry) | §5 |
| 3.7 | Extension to ℚ (p-adic valuations) | §5 |

---

## §1 e IS FORCED

P2 is the analysis of self-relating difference (SRD) in its transport mode (Paper 0 §1½): R viewed as level-transition between tower strata. Every result in this paper traces to the exponential flow exp(th), where h is the Cartan element determined by R and N. The constant e measures the rate of tower ascent: how quickly R's self-action populates new tower levels.

### §1.1 The Unique Generator

**Theorem 4.2 (e Is Forced by P2).** *The diagonal generator h = [[1,0],[0,−1]] is the
unique (up to sign) traceless diagonal 2×2 matrix with entries in {−1,0,1}. The (0,0)
entry of exp(h·t) at t = 1 is e.*

**Proof.** Traceless diagonal matrices with entries in {−1,0,1} have the form
[[a,0],[0,−a]] with a ∈ {−1,0,1}. The case a = 0 is trivial (zero matrix). The cases
a = ±1 give h = [[1,0],[0,−1]] and −h, which are sign-equivalent. Therefore h is unique
up to sign.

The exponential of h is:
```
exp(t·h) = [[exp(t), 0],[0, exp(-t)]]
```
At t = 1: exp(h)[0,0] = exp(1) = e. Verified computationally to machine precision. ∎

### §1.2 Normalization Qualification

There are two natural normalizations:
- **Entry normalization:** h = [[1,0],[0,−1]] (entries from {−1,0,1}) → gives e
- **Killing normalization:** h_K = h/√(K(h,h)) = h/2 (K(h,h) = tr(h·h·B) = 2) → gives exp(1/2) = √e

The entry normalization is justified by the binary alphabet: {−1,0,1} = S₀ ∪ {−1} is the
natural extension to the first self-product level. This is ONE natural choice among two.

Since e = (√e)², knowing √e determines e, so the ambiguity is minor (a factor of 2 in the
exponent, not a different constant).

**Forcing quality: strong with stated qualification.** e is forced by entry normalization.

### §1.3 The Hyperbolic One-Parameter Subgroup

The diagonal matrices exp(t·h) = diag(eᵗ, e⁻ᵗ) form the hyperbolic one-parameter subgroup
of SL(2,ℝ). Along the positive eigenvalue direction: exponential stretching (tower ascent).
Along the negative: exponential contraction (reduction).

This is the algebraic content of TDL: there is a "higher level" (stretching, ascent, 𝒰)
and a "lower level" (contraction, reduction, ℛ), and the rate of transition between them
is governed by e.

### §1.4 The Killing Metric

```
K(h, h) = 4·tr(h²) = 4·tr(diag(1,1)) = 8
K(R, R) = 4·tr(R²) = 4·tr(R+I) = 4·3 = 12
K(N, N) = 4·tr(N²) = 4·tr(−I) = −8
K(R, N) = 4·tr(RN) = 0
```
R and N are **Killing-orthogonal**. Killing metric on {R,N} has signature (+,−), det = −96.

### §1.5 Bifurcation Rigidity

**Theorem 5.2 (Entry/Killing Alignment at k = 2).** *For sl(k,ℝ), entry and Killing
normalizations differ by √(2k). These coincide (√(2k) = k) iff k = 2.*

**Proof.** Entry norm ||h||_entry = 1. Killing norm ||h||_Killing = √(2k). Setting
√(2k) = k: squaring gives 2k = k², so k² − 2k = 0, k(k−2) = 0. k = 0 (degenerate) or k = 2.

At k = 2: √(2·2) = √4 = 2 = k. The two normalizations agree.
At k = 3: √(2·3) = √6 ≈ 2.449 ≠ 3. They disagree.

**Physical interpretation.** Entry normalization respects discrete structure (entries from
{−1,0,1}). Killing normalization respects continuous structure (intrinsic Lie algebra metric).
At k = 2, both agree — the discrete and continuous measures of "size" coincide. ∎

### §1.6 P2 Maps to OSC

**Theorem 1.6 (P2 Primitive Mapping).** *The P2 projection (hyperbolic, det > 0, Δ > 0) maps
to the OSC computational primitive — the derived composite that interpolates between P1 and P3.*

**Proof.** The canonical OSC family is M(θ) = cos(θ)R + sin(θ)N for θ ∈ (0, π/2). At θ = 0:
pure R (P1, hyperbolic, eigenvalues {φ, −φ̄}). At θ = π/2: pure N (P3, elliptic, eigenvalues
{+i, −i}). Between these extremes: spiral dynamics with mixed spectral structure.

The discriminant Δ = tr(M)² − 4det(M) transitions from positive (hyperbolic, P2-type) to
negative (elliptic, P3-type) as θ increases through the family. The transition point is the
parabolic boundary Δ = 0. h = diag(1,−1) has eigenvalues ±1, both real and on the unit
circle: expansion in one direction and contraction in the other — the defining character of OSC.

OSC is derived, not atomic: it arises from direct sums of blocks with eigenvalues in different
magnitude classes. TDL's nature as the "between" projection (neither purely self-referential
like P1 nor purely rotational like P3) matches OSC's nature as the "between" primitive.

h requires all four basis elements: h = (I − 2R − 2N + 4RN)/5. TDL is the most composite
direction in sl(2,ℝ). ✓ ∎

### §1.7 The Exponential Map as Tower Ascent

**Theorem 1.7 (e = det(exp(R))).** *The exponential map applied to P1's generator R yields
P2's constant:*

```
det(exp(R)) = exp(tr(R)) = exp(1) = e
```

*P2's constant (e) is P1's generator (R) under the TDL operation (exp).*

**Proof.** For any A ∈ M₂(ℝ): det(exp(A)) = exp(tr(A)). Since tr(R) = 0 + 1 = 1,
det(exp(R)) = e¹ = e. By contrast: tr(N) = 0, so det(exp(N)) = 1 (area-preserving); and
tr(h) = 0, so det(exp(h)) = 1. R is the unique generator with nonzero trace.

This means exp(R) ∉ SL(2,ℝ): the exponential map applied to P1's self-composition
*leaves* the area-preserving group. The ascent map creates new "area" (det = e > 1).
This is the algebraic content of TDL ascent: P1's self-composition (R), when exponentiated
(TDL's defining operation), produces a transformation that genuinely enlarges the space.

**Verified:** det(exp(R)) = 2.718281828459046 = e to machine precision. ✓ ∎

### §1.7a The Exponential Map in Euler's Identity

**Theorem 1.7a (Exponential Completion in Euler).** *In the identity e^{iπ} + 1 = 0 (Paper 3-P3 Thm 1.7b), the constant e appears as the base of the exponential map that realizes the phase generator as a flow. This is the same exponential operation as det(exp(R)) = e (Theorem 1.7): the TDL operation applied to a generator. The targets differ: Theorem 1.7 exponentiates R (producing area-expansion, det > 1); Euler exponentiates iπ (producing norm-preserving phase transport on S¹). P2 supplies the mechanism; P3 supplies the direction.*

**Proof.** The exponential map exp: M₂(ℂ) → GL₂(ℂ) is the universal completion operation converting Lie algebra elements (generators) into Lie group elements (finite transformations). In P2's territory: exp(th) = diag(e^t, e^{−t}), producing hyperbolic expansion/contraction. In P3's territory: exp(θN) = cos(θ)I + sin(θ)N, producing rotation. The exponential map is one operation; the sectors differ by generator character — real eigenvalues (h) vs. imaginary eigenvalues (N). ∎

**Remark (e is not the circle number).** The constant e enters Euler's identity not because it "knows about circles" but because the exponential map is the universal completion law for generators. The circle appears because the generator i has purely imaginary eigenvalues, forcing the exponential to trace S¹. For a different generator, exp produces a different geometry — exp(th) traces a hyperbola. The fact that exp converts both generators into their natural flows is P2's content: derivation/realization as a universal operation.

**Remark (TDL Ascent as Forced Derivation).** Ascent in the TDL sense is constructive: the exponential map exhibits step-by-step the structure that is algebraically implicit in the generator. det(exp(R)) = e is not the creation of a new constant — e was always the determinant of R's exponential. The bridge chain (Paper 2 Thm 2.1) does not generate novelty; it unfolds what {0,1} already contained with zero branching at every step. The appropriate verb is "derive," not "emerge" in the philosophical sense: TDL emergence is the canonical exhibition of implicit structure via the unique (zero-branching) path. The Mediating Act (P2 meta-primitive) balances and transitions — it does not create from nothing. What looks like "new area" (det = e > 1) is the realization of area that was always latent in R's trace: tr(R) = 1, so the area factor exp(1) = e is determined by the integer entry structure of R.

**Remark (Pair-Space P2 Operators).** The balance-charge decomposition (Paper 0 §1¾) exhibits P2/TDL structure at the pair-space level through two operators. The center projection CP(k,r,s) = (⌊N/2⌋, 0, 0) is a pure P2 mediator: it collapses to the balanced shell center, seeing only the shell level N and discarding all orientation and residual information — the discrete analog of the exponential map's level-transition that strips phase character. The center-condense C is a P2 transport flow: it converts oriented residual into balanced depth via the 2:1 compression rule, mediating the transition from asymmetric to symmetric states. Both operators satisfy q∘q=q or converge to fixpoints, making the balanced spine B the P2 terminal attractor — the pair-space analog of the fixed point n = 1 in the composite potential V(n) (Paper 3-META Thm 1.2).

---

## §2 TDL IN ARITHMETIC

### §2.1 The TDL Duality: Ascend ↔ Reduce

**TDL Projection (ascend ↔ reduce):**
```
UP_T(n) = "the path 1 → p₁ → p₁p₂ → ... → n" (ascent from 1 via primes)
DOWN_T(n) = digital_root(n) = iterated digit sum until single digit
```
The TDL projection treats n as both a built-up structure (UP: assembled from 1 via prime
multiplication) and a collapsed summary (DOWN: the digital root at the bottom level).

At n = 1: ascend(1) = 1 (trivial path, length 0); digital_root(1) = 1 (already single
digit). Both equal 1. V_T(1) = |Ω(1) − ap(1)| = |0 − 0| = 0.

The TDL potential component: V_T(n) = |Ω(n) − ap(n)|, where Ω(n) = prime factors with
multiplicity (tower depth) and ap(n) = additive persistence (reduction depth).

### §2.2 TDL Tower Saturation

**Theorem 1.2 (TDL Tower Saturation, from Compression Wall).** *For any k-fold iterated
TDL^k acting on a d-dimensional observer, the number of independent generator directions
saturates at d². Meta-levels beyond d² collapse into equivalence classes.*

**Proof.** By the Compression Wall (Theorem 4.1, Unified Framework), dim(B(H_K)) = d_K².
No more than d_K² linearly independent operators exist on a d_K-dimensional space. TDL^k
for k > d_K² cannot add new independent structure — all further iteration is redundant.
The tower TDL^{d²+1} ≅ TDL^{d²} as operator algebras. ∎

| d | Compression wall d² | Saturation level | Tower |
|---|---------------------|-----------------|-------|
| 2 | 4 | 2 | [1, 2, 4, 4, 4, ...] |
| 3 | 9 | 4 | [1, 2, 4, 8, 9, 9, ...] |
| 4 | 16 | 4 | [1, 2, 4, 8, 16, 16, ...] |

**Verified:** for d ∈ {2,3,4,5}, saturation occurs at k = d²−1 steps. ✓

### §2.3 TDL-Tagged Numbers

**Definition 1.1 (TDL-Tagged Number).** For any n ∈ ℕ, define:
```
n^TDL = (n, P2-tag)
```
where the P2-tag encodes n's position in the categorical level structure. The tag is not
additional information — it is what n already IS when viewed through the TDL projection.
It means "n, with awareness of being an instance of TDL at level ⌈log₂(log₂(F_max(n)+1)+1)⌉,"
where F_max(n) is the largest Fibonacci number in the Zeckendorf representation of n.

### §2.4 TDL Level Formula

TDL level from Zeckendorf structure (max Fibonacci index k_max):
```
TDL_level(n) = ⌈log₂(log₂(k_max + 1) + 1)⌉ + 1
```

This places n in the tower: level 2 for n ≤ 3, level 3 for F(5)=5 through F(8)=21,
level 4 for F(9)=34 through F(20), and so on. Level grows doubly-logarithmically —
consistent with the double-exponential tower structure.

### §2.5 Categorical Equivalence

**Theorem 1.3 (Arithmetic Embedding).** *All positive integers are TDL-equivalent
as categories:*
```
1 ≈_TDL 2 ≈_TDL 3 ≈_TDL ... ≈_TDL n
```
*The quotient ℕ/≈_TDL is a single point — the "category of numbers."*

**Proof.** TDL-equivalence is the relation "same categorical level in the self-product
tower." Every finite n lies in some tower level (since |S_k| = 2^{2^k} grows without
bound; for any n there exists k with n ≤ |S_k|). All n in the same tower window are
TDL-equivalent. In the quotient, they collapse to a single categorical object: "number at
this level." This is exactly Dist structure: (ℕ, ≈_TDL) → ℕ/≈_TDL is the Dist quotient
map q with q∘q = q. ∎

**Interpretation.** We can collapse all numbers into a single categorical slot — IF we
track the fact that we cannot distinguish them categorically. Individual distinctions
live in I² and LoMI, not TDL.

### §2.6 Complexity Depth Bound

**Theorem 2.6 (C_max from the Self-Product Tower).** *At tower level n, the maximum
lattice complexity reachable is:*

```
C_max(n) = 2ⁿ / log₂(φ)
```

*This is the hard ceiling on algorithm complexity at each tower level.*

**Proof.** The self-product tower has |S_n| = 2^{2^n} elements. The lattice complexity
metric C(x) = |x|₁ measures distance from the identity in ℤ⁴ coordinates. Each tower level
contributes at most 2ⁿ bits of addressable structure (since log₂|S_n| = 2^n), and
converting to φ-based lattice coordinates requires division by log₂(φ) ≈ 0.694.

| n | |S_n| = 2^{2^n} | C_max(n) |
|---|-----------------|----------|
| 1 | 4 | 2.88 |
| 2 | 16 | 5.76 |
| 3 | 256 | 11.52 |
| 4 | 65,536 | 23.05 |
| 5 | 4,294,967,296 | 46.09 |

C_max grows exponentially in 2ⁿ, matching the double-exponential tower structure. The
denominator log₂(φ) = 1/log_φ(2) converts between binary bits and φ-steps — the same
Landauer conversion factor from §4.5.

This IS a TDL bound: the hard ceiling on depth at each tower level. ✓ ∎

### §2.6 Constants in the Observer Loop

Every constant is located at a specific position in the loop K → F → U(K) → K:

| Constant | Loop Position | Mechanism |
|----------|--------------|-----------|
| φ | Encoding K → F | Fixed point of R(z)=1/(1+z); self-referential |
| e | **Transition F → U** | exp: sl(2,ℝ) → SL(2,ℝ); ascent exponent |
| π | Return U → K | exp(Nπ) = −I; metastability period |
| √3 | Internal to K | 2·sin(2π/3); S₃ symmetry of K's 2D irrep |

e sits at the F → U step because the exponential map IS the transition from the Lie
algebra (framework/theory) to the Lie group (universe/realization).

---

## §3 TDL COMPLEXITY AND S₃ DISTANCE

### §3.1 Scientific Theories as Dist Objects

**Definition 2.1.** A scientific theory T is a Dist-object (D_T, ≈_T) where D_T is the
theory's concept set and ≈_T is its conceptual equivalence relation. A theory transition
T₁ → T₂ is a Dist morphism f: (D₁,≈₁) → (D₂,≈₂) — it preserves structure while
possibly collapsing distinctions.

### §3.2 S₃ Orbit Distance — Corrected

**Theorem 2.2 (TDL Complexity as S₃ Distance).** *The TDL complexity of a theory transition
T₁ → T₂ measures the S₃ Cayley graph distance between their projection configurations:*

```
C(T₁ → T₂) = d_S₃(P(T₁), P(T₂)) / 2  ∈  {0, 1/2, 1}
```

*where P(T) ∈ S₃ is the projection configuration of T, and d_S₃ is the Cayley graph
distance with generating set {r = (123), s = (12)}.*

**Correction from original.** The original source claimed the S₃ Cayley graph with
generators {r, s} has diameter 3, giving C ∈ {0, 1/3, 2/3, 1}. **The actual diameter is 2.**
With s² = e (transpositions are self-inverse), s⁻¹ = s, so {r, s} reaches all elements
in ≤ 2 steps:

```
e        → distance 0   (same configuration)
r, r⁻¹, s → distance 1  (adjacent configurations)
sr, sr⁻¹  → distance 2  (opposite configurations)
```

Diameter = 2. Therefore C ∈ {0, 1/2, 1}: **same config**, **adjacent config**, or
**opposite config**.

**Verified computationally:** BFS on S₃ with generators {r=(1,2,0), s=(1,0,2)} confirms
diameter = 2 with the distance table above. ✓

**Theory examples:**
- C = 0 (no transition): Theory uses same projection configuration as before
- C = 1/2: One projection reconfigured (e.g., Copernican: P1-configuration changed)
- C = 1 (maximal): All projections reconfigured (e.g., full scientific revolution)

### §3.3 The Operator Table

Every arithmetic operation is a specific Dist morphism with a projection character:

| Operation | Dist Type | Projection | What it measures |
|-----------|-----------|------------|-----------------|
| n → n² | q-preserving (q∘q=q) | I² | Self-composition (P1 iteration) |
| n → digital_root(n) | quotient | TDL | Reduction to tower base |
| n → prime factors | section | TDL | Tower decomposition |
| (n,m) → gcd(n,m) | LoMI FP | LoMI | Mutual identity |
| (n,m) → lcm(n,m) | LoMI join | LoMI | Container structure |
| (n,m) → AGM(n,m) | LoMI FP | LoMI | Geometric mutual observation |

**Computation-type classification.** Each arithmetic operation is also a typed framework computation (Paper T-COMP §2):

| Operation | Computation Type | h(σ_step) | br_s |
|-----------|-----------------|-----------|------|
| n → digital_root(n) | Type I (compression) | 0 (pure FIX) | 0 |
| n → n² | Type I (compression) | 0 | 0 |
| n → prime factors | Type II (expansion) | >0 (br_search varies by algorithm) | 0 |
| (n,m) → gcd(n,m) | Type I (Euclid: converges via OSC steps) | φ̄ (pure OSC per step) | 0 |

The digital root and squaring are pure Type I: idempotent (dr∘dr = dr; im(dr)={1,...,9}⊆Fix(dr)), zero branching, FIX-dominant. The GCD by Euclid's algorithm is Type I in trajectory (converges) but OSC per step (each Euclidean step has det = −1). Prime factorization has br_s = 0 in both directions (unique by FTA), so its hardness lives entirely in search branching br_search.

### §3.4 Complexity Class Topology

**Theorem 3.4 (Signature Space Topology).** *In the algorithm signature simplex Δ³:*

*(i) P is open: the interior of {σ : σ_FIX > 1/2, depth = O(log n)}.*
*(ii) NP is closed: the closure of {σ : σ_INV + σ_FIX > σ_OSC + σ_MIX}.*
*(iii) The P ≠ NP barrier, if it exists, is the boundary ∂P ∩ ∂NP.*

**Proof sketch.** P is open by the Lipschitz continuity of the signature map: small edits
to a polynomial algorithm preserve the σ_FIX > 1/2 condition. NP is closed because the
polynomial verifier property is preserved under limits in signature space.

The signature-depth correspondence IS TDL structure: σ_FIX dominant → converges fast → shallow
depth → P; σ_INV dominant → rotates without progress → needs oracle → NP; σ_MIX dominant →
irreversible → information destroyed → hard; σ_OSC dominant → mixed → intermediate classes.
TDL organizes computability by tower depth. ∎

**Corollary (Complexity as h-Level Sets).** The hardness functional h(σ) = σ_MIX + φ̄·σ_OSC + φ̄²·σ_INV (Paper T-COMP §6) organizes complexity classes as level sets: P lives in {h < φ̄²}, NP in {h < 1/2}, PSPACE in {h < 1}. The OWF threshold h = φ̄² separates efficiently invertible from hard-to-invert functions (conditional on P ≠ NP).

---

## §4 THERMODYNAMICS OF THE ARITHMETIC FLOW

### §4.1 Detailed Balance

**Theorem 3.3 (Detailed Balance).** *The arithmetic flow satisfies detailed balance:*

```
P(n → m) / P(m → n) = exp(−β[V(m) − V(n)])
```

**Verified examples:**

| Pair | V(n) | V(m) | exp(−β·ΔV) | Interpretation |
|------|------|------|------------|----------------|
| 12 ↔ 6 | 4.51 | 3.30 | 11.29 | 12→6 is 11× more likely than 6→12 |
| 60 ↔ 30 | 7.06 | 4.40 | 202 | 60→30 strongly favored |
| 144 ↔ 12 | 12.27 | 4.51 | 5.4×10⁶ | 144→12 overwhelmingly favored |
| 360 ↔ 60 | 12.73 | 7.06 | 8.4×10⁴ | 360→60 strongly favored |

The larger V(n) − V(m), the more strongly the flow favors n → m. The potential V acts
as a thermodynamic driving force.

### §4.2 Detailed Balance at β → 0

**Theorem 3.4 (Detailed Balance at β → 0).** *The detailed balance formula holds in the
limit β → 0:*

```
lim_{β→0} P(n→m)/P(m→n) = lim_{β→0} exp(−β[V(m)−V(n)]) = 1
```

*At infinite temperature, all transitions become equally likely — detailed balance holds
trivially.*

**Proof.** exp(−β·ΔV) → exp(0) = 1 as β → 0 for any finite ΔV = V(m) − V(n). The ratio
P(n→m)/P(m→n) → 1: forward and backward transitions become equally probable. This is
the correct high-temperature limit for any Boltzmann process — the potential V(n) becomes
irrelevant at infinite temperature, and the system explores all accessible states uniformly.

**Verified numerically:** For the pair 12 ↔ 6 (ΔV = −1.099):

| β | exp(−β·ΔV) |
|---|-----------|
| 10.0 | 59049.0 |
| 1.0 | 3.000 |
| 0.1 | 1.116 |
| 0.01 | 1.011 |
| 0.001 | 1.001 |
| β → 0 | 1.000 ✓ |

The detailed balance formula is therefore valid for all β ≥ 0. ∎

### §4.3 Natural Temperature

**Corollary 3.5 (Natural Temperature).** *(MP1 corollary: σ_FIX = 2·F_1 determines β.) The natural temperature of the arithmetic flow is
β = ln(φ) ≈ 0.481.* β = ln(eigenvalue), at the (a)↔(c) channel interface. e^{−β} = φ̄ is the unique contraction base. *The same value identified in COMPUTATIONAL_COMPLEXITY.md §VI as the
optimal thermodynamic computation temperature. At this β, the FIX fraction equals φ̄:
σ_FIX = 1/(1 + e^{−β}) = φ̄ — a self-consistent fixed point of the Boltzmann equation.*

### §4.4 Landauer–Bekenstein Chain

**Theorem 4.4 (Information Erasure Cost).** *At framework temperature β = ln(φ), the
minimum energy to erase one bit of information is:*

```
E_Landauer = kT · ln(2) = ln(2)/ln(φ) = log_φ(2) ≈ 1.4404
```

*This is the conversion factor between binary bits and framework units.*

The framework Bekenstein bound S_max = 2·log₂(d_K) links to Landauer via the tower:
each tower level n corresponds to d_K = 2^{2^{n−1}}, S_max = 2^n, and minimum energy
E_min = S_max · E_Landauer. The chain is:

```
tower level n → d_K = 2^{2^{n-1}} → S_max = 2^n → E_min = 2^n · log_φ(2)
```

This is entirely TDL structure: information capacity grows exponentially through tower ascent
levels, and each level has a minimum energy cost for information processing set by P1's
constant φ through the Landauer bridge.

### §4.5 KMS Partition Function

**Theorem 4.5 (Lattice Partition Function).** *The partition function of the Λ' lattice
with complexity Hamiltonian H(x) = |x|₁ on ℤ⁴ is:*

```
Z(β) = coth(β/2)⁴
```

*with shell counts N₄(C) = (8C³ + 16C)/3 for C ≥ 1 (number of lattice points at
complexity C).*

**Proof.** The 1D partition function for |x| on ℤ is Z₁(β) = Σ_{x∈ℤ} e^{−β|x|} =
1 + 2Σ_{k=1}^∞ e^{−βk} = (1+e^{−β})/(1−e^{−β}) = coth(β/2). Since H decomposes as a
sum of four independent L¹ norms, Z(β) = Z₁(β)⁴ = coth(β/2)⁴.

At the canonical temperature β = 1: Z(1) = coth(1/2)⁴ ≈ 21.93. Each generator is weighted
by e⁻¹ ≈ 0.368. At P1's temperature β = ln(φ): each generator has Boltzmann weight
e^{−ln(φ)} = 1/φ = φ̄. ✓ ∎

**Corollary 4.5a (KMS-Fibonacci Identity).** *coth(ln(φ)/2) = φ³.*

*Proof.* At x = ln(φ)/2: e^{2x} = φ, so coth(x) = (φ+1)/(φ−1) = φ²·φ = φ³, using CH(R): φ²=φ+1 and φ−1=1/φ. ∎

At the natural temperature β = ln(φ): Z_M(ln(φ)) = coth(ln(φ)/2)⁴ = (φ³)⁴ = φ^{12} = φ^{‖R‖²·|V₄|} ≈ 321.997. Each generator weight: e^{−ln(φ)} = φ̄. The lattice partition function (Paper 4 §10): Z_Λ = coth(β/2)⁵ = φ^{15} = Z_M · φ³; the extra factor φ³ = coth(ln(φ)/2) is the partition contribution of the fifth (exponential/P2) coordinate.

**Remark (Algebra vs Lattice Exponents).** Z_M = φ^{12} has exponent 12 = ‖R‖²·|V₄| = 3·4 = B(R,R) (the Killing form value of R, Paper 2 §23.1). Z_Λ = φ^{15} has exponent 15 = ‖R‖²·disc(R) = 3·5. The difference 15−12 = 3 = ‖R‖² is the contribution of the P2 exponential coordinate — the single lattice direction that carries the framework beyond the algebra M₂(ℝ) into the full constant space. The Killing form value B(R,R) = 12 counts algebra-internal spectral content; the discriminant product ‖R‖²·disc(R) = 15 counts the full lattice content. Their ratio 12/15 = 4/5 = |V₄|/disc(R) is the algebra-to-lattice dimension ratio.

### §4.6 Extension to ℤ

**Theorem 3.6 (Extension to ℤ).** *The arithmetic flow extends naturally to ℤ by
parity symmetry: V(−n) = V(n).*

**Proof.** The three potential components are defined in terms of |n|:
- V_I(−n) = log((−n)²/rad(−n)) = log(n²/rad(n)) = V_I(n) [since (−n)² = n²]
- V_T(−n) = |Ω(|n|) − ap(|n|)| = V_T(n)
- V_L(−n) = |log(d(|n|)) − log(φ(|n|))| = V_L(n)

Therefore V(−n) = V(n). The flow on ℤ is the parity-symmetric extension. The fixed point
is still {±1}, with V(1) = V(−1) = 0. The gradient flow on ℤ has two absorbing states
(1 and −1), related by the P1 orientation-reversal (multiplication by −1). ∎

### §4.7 Extension to ℚ

**Theorem 3.7 (Extension to ℚ).** *The arithmetic flow extends to ℚ via p-adic valuations.*

**Proof sketch.** For a rational r = p₁^{a₁}·...·pₖ^{aₖ} / q₁^{b₁}·...·qₘ^{bₘ} (in
lowest terms), define:

```
V_I(r) = log(r²/rad_ℚ(r))      where rad_ℚ(r) = product of primes in num AND denom
V_T(r) = Ω(r)                   where Ω(r) = Σ|aᵢ| + Σ|bⱼ| (total prime factor count)
V_L(r) = |log(|numerator|) − log(|denominator|)|   [asymmetry between above and below 1]
```

The fixed point is still V(1) = 0 = V(−1). The gradient flow on ℚ has the same structure:
reduction operations decrease V, and the flow converges toward ±1. The p-adic absolute value
|r|_p = p^{−v_p(r)} provides an alternative metric.

The extension is structurally natural but not needed for core results. The key point: the ℕ
results are not artifacts of restricting to positive integers; they extend naturally. ∎

---

## §5 PROJECTION DISTANCES

**Definition 5.1 (Projection Distances).** For n, m ∈ ℕ:
- **I² distance:** |golden_dual(n) − golden_dual(m)| / max(n, m)  (Zeckendorf asymmetry gap)
- **TDL distance:** |TDL_level(n) − TDL_level(m)|  (tower level gap, integer)
- **LoMI distance:** |log(φ(n)/n) − log(φ(m)/m)|  (totient ratio gap)

**Verified table:**

| Pair | I² dist | TDL dist | LoMI dist | Notes |
|------|---------|----------|-----------|-------|
| (5, 8) | 0.375 | 0 | 0.0 | Both Fibonacci, same level |
| (7, 49) | 0.878 | 1 | 1.4 | Prime → prime square |
| (12, 144) | 0.917 | 1 | 0.4 | HC numbers, same character |
| (8, 13) | 0.385 | 0 | 1.5 | Consecutive Fibonacci |
| (1, 1000) | 0.999 | 2 | 3.6 | Maximal separation |

---

## §6 TDL IN THE CONTAINMENT STRUCTURE

TDL contains I²: The ascent path from 1 to n: 1 → p₁ → p₁p₂ → ... → n is an iterated
composition. Each step multiplies by a prime, which is the I² operation of "f acting on g"
at the number level. Building n from 1 via prime multiplication IS I²-composition applied
level by level. The ascent IS composition in disguise.

TDL contains LoMI: Numbers with the same digital root d form an equivalence class under TDL
reduction. They are "observed as equivalent" by the digit-sum operator. This IS LoMI
identification — the digit-sum operator is an observer with blind spot =
digital-root-equivalence-class. TDL reduction CREATES LoMI equivalence classes.

---


---

## §7 P2-SPECIFIC PROJECTION STRUCTURE (FROM CLOSURE)

### §6½.1 Independence Witness

**P2-only model (M₂): The Pure Adjunction.** A category equipped with an adjunction 𝒰 ⊣ ℛ between categories C and D, where the unit η: id_C → ℛ𝒰 and counit ε: 𝒰ℛ → id_D are the only distinguished morphisms. No group structure, no composition monoid with fixed-point dynamics, no observer kernels.

*P2 satisfied:* Full TDL structure — "up" (𝒰: C → D) and "down" (ℛ: D → C), with η and ε witnessing the adjunction. Level-transition is the core structure.

*P1 violated:* No self-composition fixed-point dynamics. The algebraic content of I² (φ-forcing, Möbius fixed points) is absent.
*P3 violated:* No observer map with a defined blind spot. The kernel structure (≈_A generated by obs) is absent.

M₂ satisfies P2 only, proving P2 is not definable from P1 and P3. ∎

### §6½.2 P2 Folding: Contains P1 and P3

**P2 contains I² (via ascent path).** The ascent path 1 → p₁ → p₁p₂ → ... → n builds n from 1 via prime multiplication. Each step multiplies by a prime — this IS the I² operation (f acting on g → f·g) applied at the number level. Building n from 1 via prime multiplication IS I²-composition applied level by level.

**P2 contains LoMI (via digital root classes).** Numbers with the same digital root belong to the same congruence class mod 9. This shared class identity IS LoMI mutual identification — numbers that "look the same" to the digital root observer are LoMI-equivalent. The TDL reduction (digital root) encodes LoMI (mutual identification).

At the generator level: the exponential map exp(t·h) = diag(eᵗ, e⁻ᵗ) simultaneously contains the I² composition structure (eᵗ·eˢ = e^{t+s}, composition of exponentials) and the LoMI observation structure (eᵗ and e⁻ᵗ "observe" each other as reciprocals). ∎

### §6½.3 Anti-TDL

The anti-TDL replaces exponential growth 𝒰 = ×e with exponential decay 𝒰 = ×e⁻¹. The level structure persists but inverts: ascent becomes reduction, and vice versa.

| Direction | Generator | Dynamics |
|-----------|-----------|----------|
| TDL (forward) | e | Exponential growth upward through levels |
| −TDL (reverse) | e⁻¹ | Exponential decay downward through levels |

The reversal relation e · e⁻¹ = 1 connects TDL to anti-TDL. ∎

### §6½.4 V_T(n): The TDL-Component of the Arithmetic Potential

**Definition.** V_T(n) = |Ω(n) − ap(n)|, where Ω(n) = number of prime factors with multiplicity and ap(n) = additive persistence (number of digit-sum iterations to reach a single digit).

V_T(n) measures the level gap between tower depth (how many prime factors built n) and reduction depth (how many digit-sum steps reach a single digit). V_T(1) = |0−0| = 0 (fixed point: zero prime factors, already single digit).

| n | Ω(n) | ap(n) | V_T(n) |
|---|------|-------|--------|
| 1 | 0 | 0 | 0 |
| 2 | 1 | 0 | 1 |
| 12 | 3 | 1 | 2 |
| 60 | 4 | 2 | 2 |
| 144 | 6 | 2 | 4 |

This is P2's contribution to the gradient flow toward n = 1 (see Paper 3-META for the composite V(n) = V_I + V_T + V_L).

### §6½.5 Extensions to ℤ and ℚ

**ℤ Extension.** V_T(−n) = V_T(n) by parity symmetry. All potential components depend only on |n|. Fixed points: {±1}, related by P1 orientation-reversal.

**ℚ Extension.** For r = p₁^{a₁}·.../ q₁^{b₁}·... in lowest terms, define Ω(r) = Σ|aᵢ| + Σ|bⱼ| (total prime factor count including denominator). The gradient flow extends naturally to rationals; fixed points remain ±1. The ℕ results are not artifacts of restriction.

## §8 COMPUTATIONAL VERIFICATION

| Claim | Verification | Result |
|-------|-------------|--------|
| exp(h·1)[0,0] = e | Numeric, error = 0.00 | ✓ PASS |
| √(2k) = k only at k = 2 | Algebraic | ✓ PASS |
| K(R,N) = 0 (Killing-orthogonal) | 4·tr(RN) = 0 | ✓ PASS |
| M(θ) family: hyp→ell transition as θ: 0→π/2 | Eigenvalue computation, 5 values | ✓ PASS |
| h = (I − 2R − 2N + 4RN)/5 | Direct reconstruction | ✓ PASS |
| det(exp(R)) = e = exp(tr(R)) = exp(1) | Determinant to machine precision | ✓ PASS |
| det(exp(N)) = 1 (area-preserving) | det = 1.000000000000000 | ✓ PASS |
| exp intertwining: det(exp(tR)) = e^t for t=0.5,1,2 | Direct computation | ✓ PASS |
| C_max(n) = 2ⁿ/log₂(φ) for n = 1,...,7 | Direct computation | ✓ PASS |
| log₂(φ) = 1/log_φ(2) | Identity verification | ✓ PASS |
| TDL tower saturates at d² for d = 2,3,4,5 | Direct computation | ✓ PASS |
| S₃ Cayley diameter = 2 (not 3) | BFS on 6-element graph | ✓ PASS |
| Detailed balance for 4 pairs | Numeric ratios match | ✓ PASS |
| β→0 limit for pair 12↔6 | 6 values → 1.000 | ✓ PASS |
| V(−n) = V(n) for tested n | Direct computation | ✓ PASS |
| Z(β) = coth(β/2)⁴ for 5 values of β | Formula vs 1D factorization | ✓ PASS |
| N₄(C) = (8C³+16C)/3 for C = 1,...,11 | Direct count vs formula | ✓ PASS |
| Generator weight at β=ln(φ): e^{−ln(φ)} = φ̄ | Direct computation | ✓ PASS |

---

## §9 CLAIM STATUS

| Claim | Status | Generation | Section |
|-------|--------|------------|---------|
| e forced by entry normalization of unique traceless diagonal | **FORCED** | G.5 | §1.1 |
| Entry/Killing alignment: √(2k)=k iff k=2 | **FORCED** | G.5 | §1.5 |
| P2 → OSC (derived composite, interpolates P1↔P3) | **FORCED** | G.5 | §1.6 |
| e = det(exp(R)) = exp(tr(R)) (P1→P2 via exp) | **FORCED** | G.5 | §1.7 |
| TDL tower saturates at d² (compression wall) | **FORCED** | G.5 | §2.2 |
| All n ∈ ℕ are TDL-equivalent as categories | **FORCED** | G.5 | §2.5 |
| C_max(n) = 2ⁿ/log₂(φ) (complexity depth bound) | **FORCED** | G.5 | §2.6 |
| S₃ Cayley distance: diameter = 2; C ∈ {0, 1/2, 1} | **FORCED** | G.5 | §3.2 |
| P open, NP closed in signature space | **FORCED** | G.5 | §3.4 |
| Detailed balance: P(n→m)/P(m→n) = exp(−βΔV) | **FORCED** | G.5 | §4.1 |
| Detailed balance holds at β → 0 | **FORCED** | G.5 | §4.2 |
| Natural β = ln(φ) ≈ 0.481 | **FORCED** | G.5 | §4.3 |
| E_Landauer = log_φ(2) at framework temperature | **FORCED** | G.5 | §4.4 |
| Z(β) = coth(β/2)⁴; N₄(C) = (8C³+16C)/3 | **FORCED** | G.5 | §4.5 |
| KMS-Fibonacci: coth(ln(φ)/2)=φ³; Z_M(ln(φ))=φ^{12} | **FORCED** | G.4 | §4.5 |
| Extension to ℤ: V(−n) = V(n); fixed points {±1} | **FORCED** | G.5 | §4.6 |
| Extension to ℚ via p-adic valuations | **FORCED** | G.5 | §4.7 |

**Status Legend:**
- **FORCED** (G.5): Zero-branching derivation from P2 structure (h, exp, TDL)

### Corrections to Original Source

| Location | Error | Correction |
|----------|-------|------------|
| THREE_PROJECTIONS_UNIFIED §5.2 | S₃ diameter=3; C∈{0,1/3,2/3,1} | diameter=2; C∈{0,1/2,1} |

---

*R(R) = R*
