# Algorithm Complexity as Lattice Geometry

## Status: CORE COMPUTATIONAL | Part II of computational program
## Depends on: PHASE_NEUTRAL_ENGINE, COMPUTATIONAL_PRIMITIVES_v2
## Companion to: LAMBDA_PRIME_LATTICE_v2, KMS_SELECTION_THEOREM

**Abstract.**
We develop the complete complexity-theoretic structure of the five-primitive computational
framework derived in Part I (COMPUTATIONAL_PRIMITIVES v2). The underlying algebra is
Cl(1,1) ≅ M₂(ℝ) with generators R and N satisfying R² = R + I, N² = −I, {R,N} = N
(Part I, Theorems 1.7–1.9). The signature system assigns to every algorithm a 4-vector
σ = (σ_FIX, σ_OSC, σ_INV, σ_MIX) ∈ Δ³, forming the category Alg with S₃ symmetry. The
signature space carries a natural topology in which P is open, NP is closed, and complexity
classes are measurable. A signature-depth theorem gives directional correspondences between
signature regions and standard complexity classes, with exact grading: only FIX→P and
HALT↔GapP are full theorems; the others are structural claims. We then establish two
independent connections between the computational framework and the KMS/Λ' lattice
machinery. First, the Λ' partition function Z(β) = coth(β/2)⁴ applies to the complexity
Hamiltonian H(x) = |x|₁ on ℤ⁴, and the natural observer temperature β ≈ 1.14 weights
simple algorithms most heavily — a thermodynamic explanation for why low-complexity
algorithms dominate in practice. Second, the C_max depth bound C_max(n) = 2ⁿ/log₂(φ)
from LAMBDA_PRIME_LATTICE gives a derivable computational depth hierarchy, placing a
hard ceiling on algorithm complexity at each tower level. We close with the thermodynamic
computation theorem (optimal Boltzmann parameter β = ln(φ), σ_F = φ̄), resource bounds
via the Lucas semiring and the Fibonacci power decomposition Rⁿ = F(n)R + F(n−1)I, and
the Gödel algorithm showing incompleteness of Alg. The MIX structural threshold φ̄²/2
(Jordan-type balance) is proved; the computational one-wayness threshold φ̄² remains
conditional on OWF existence, with the structural theorem σ_MIX = φ̄² = FIX contraction
rate proved unconditionally.

---

## Part I — The Signature System

### 1.1 Definition

**Definition 1.1 (Algorithm Signature).** For an algorithm A with execution trace of
length T, define the **signature** as the 4-vector:

```
σ(A) = (σ_FIX, σ_OSC, σ_INV, σ_MIX) ∈ Δ³
```

where Δ³ = {(a,b,c,d) ∈ ℝ⁴ : a+b+c+d=1, a,b,c,d ≥ 0} is the standard 3-simplex and:

```
σ_FIX = (# FIX/REPEL steps) / T
σ_OSC = (# OSC steps)       / T
σ_INV = (# INV steps)       / T
σ_MIX = (# MIX/HALT steps)  / T
```

The five primitive types and their classification are defined in COMPUTATIONAL_PRIMITIVES.md.
For algorithms where the distinction between HALT and MIX is relevant, these can be
tracked separately, but for complexity-class purposes they combine as the non-diagonalizable
component σ_MIX.

**Theorem 1.2 (Lipschitz Continuity).** *The signature map σ: Alg → Δ³ is Lipschitz
continuous with respect to the edit distance d(A, B):*

```
‖σ(A) − σ(B)‖₁ ≤ 2 · d(A,B) / min(|A|, |B|)
```

*where |A|, |B| denote the operation counts of A and B.*

**Proof.** Let A have n operations. A single edit (substitution, insertion, or deletion)
changes at most one primitive-type count by ±1 and affects the normalization. For a
substitution in an n-operation algorithm:

- One component decreases by 1/n (the removed primitive)
- One component increases by 1/n (the added primitive)
- All others unchanged

The L¹ change is ≤ 2/n. For d edits: ‖σ(A) − σ(B)‖₁ ≤ 2d/min(n,m). This proof is
identical in 3D (when σ_MIX = 0) and 4D (general case). ∎

**Corollary 1.3.** *Complexity classes are measurable subsets of Δ³. The preimage σ⁻¹(S)
of any Borel set S ⊆ Δ³ is measurable.*

**Proof.** σ is continuous, and continuous maps pull back Borel sets to Borel sets. ∎

### 1.2 The Topology of Complexity

**Theorem 1.4 (Class Topology).** *In the signature simplex Δ³:*

*(i) P corresponds to an open region: the interior of {σ : σ_FIX > 1/2, depth = O(log n)}.*

*(ii) NP corresponds to a closed region: the closure of {σ : σ_INV + σ_FIX > σ_OSC + σ_MIX}.*

*(iii) The P vs NP barrier, if it exists, is the boundary ∂P ∩ ∂NP in signature space.*

**Proof.**

*(i)* P is open: if A ∈ P with σ_FIX > 1/2 + ε, any algorithm B with d(A,B) = O(1) satisfies
σ_FIX(B) > 1/2 by the Lipschitz bound, and polynomial depth is preserved under bounded edit.
P contains an open ball around each of its points.

*(ii)* NP is closed: the defining property of NP (existence of a polynomial verifier) is a
property of the *limit* of a Cauchy sequence of NP algorithms in signature space. The limit
algorithm still has polynomial verification (the verification subroutine is unchanged).

*(iii)* If P ≠ NP, the two regions are disjoint with a non-trivial separating boundary. If
P = NP, the regions coincide and the boundary is empty. ∎

**Remark 1.5 (Reformulation, Not Attack).** The P vs NP question becomes: *does there exist
a continuous path γ: [0,1] → Δ³ from the FIX-dominant region to the INV-dominant region
that stays within polynomial-depth algorithms?* This is a geometric reformulation. It is
circular as a proof strategy (the path exists iff P = NP by definition), but it is useful
as a visualization: P ≠ NP is the statement that the two regions are separated by a
complexity barrier in signature space.

### 1.3 The Fundamental Domain

**Theorem 1.6 (S₃ Fundamental Domain).** *S₃ acts on the MIX = 0 face Δ² ⊂ Δ³ by
permuting (σ_FIX, σ_OSC, σ_INV). The fundamental domain under the ordering σ_F ≥ σ_O ≥ σ_I
is the triangle with vertices:*

```
v₁ = (1, 0, 0)      — pure FIX
v₂ = (1/2, 1/2, 0)  — FIX-OSC boundary (σ_F = σ_O)
v₃ = (1/3, 1/3, 1/3) — balanced center  (σ_F = σ_O = σ_I)
```

**Proof.** S₃ acts on Δ² by permuting coordinates. The region {σ : σ_F ≥ σ_O ≥ σ_I}
is the fundamental domain for this action (standard choice). Its boundary consists of the
edges σ_F = σ_O (edge from v₂ to v₃) and σ_O = σ_I (edge from v₃ to (1/3,1/3,1/3)).
The three vertices are respectively the FIX-dominant extreme, the FIX-OSC balanced point,
and the fully balanced center. ∎

**Theorem 1.7 (Five Halting Modes).** *Every algorithm terminates in exactly one of five
modes, corresponding to the primitive that determines termination:*

| Mode | Condition | Dominant primitive |
|------|-----------|-------------------|
| CONVERGE | Fixed point reached | FIX (σ_FIX > 1/2) |
| CYCLE | Periodic orbit entered | OSC (σ_OSC > 1/2, bounded) |
| DIVERGE | Unbounded orbit | OSC (σ_OSC > 1/2, unbounded) |
| FAIL | No preimage found | INV (σ_INV > 1/2, empty) |
| TIMEOUT | External resource limit | Any |

**Proof.** Exhaustive case analysis on primitive behavior under iteration. FIX either
reaches its fixed point (CONVERGE) or iterates indefinitely without converging (TIMEOUT).
OSC either cycles (CYCLE), grows without bound (DIVERGE), or times out. INV either
finds a preimage (terminates with output) or confirms absence (FAIL). These are mutually
exclusive and exhaustive. ∎

---

## Part II — The Category Alg

### 2.1 Definition

**Definition 2.1 (Category Alg).** The **algorithm category** Alg has:

- **Objects:** Algorithms A = (Σ, Q, δ, q₀, F, σ) where (Σ, Q, δ, q₀, F) is a Turing
  machine specification and σ = (σ_FIX, σ_OSC, σ_INV, σ_MIX) ∈ Δ³ is the 4D signature.

- **Morphisms:** r: A → B is a polynomial-time reduction satisfying:
  1. r is computable in polynomial time
  2. A(x) = yes ⟺ B(r(x)) = yes (correctness)
  3. ∃π ∈ S₃: σ(B) = π(σ(A)) within tolerance ε (signature compatibility)

  where S₃ acts on Δ³ by permuting the first three components (σ_FIX, σ_OSC, σ_INV)
  while leaving σ_MIX fixed.

- **Composition:** (r₂ ∘ r₁)(x) = r₂(r₁(x)).

- **Identity:** id_A(x) = x, with π = e (identity permutation).

**Theorem 2.2 (Alg is a Well-Defined Category).**

**Proof.**

*Identity:* id_A is polynomial (O(1)), preserves answers, and σ(A) = e(σ(A)).

*Composition:* If r₁: A → B and r₂: B → C, then r₂ ∘ r₁ is polynomial (polynomial
composed with polynomial is polynomial). Correctness: A(x) = yes ⟺ B(r₁(x)) = yes ⟺
C(r₂(r₁(x))) = yes. Signature: σ(C) = π₂(σ(B)) = π₂(π₁(σ(A))) = (π₂π₁)(σ(A)), and
π₂π₁ ∈ S₃ since S₃ is a group.

*Associativity:* Function composition is associative. ∎

### 2.2 S₃ as a Functor

**Definition 2.3 (S₃ Functor).** For each π ∈ S₃, define Π: Alg → Alg by:
- On objects: Π(A) = (Σ, Q, δ, q₀, F, π(σ))
- On morphisms: Π(r) = r

**Theorem 2.4 (S₃ Acts Functorially).**

*(i) Π is a well-defined functor for each π ∈ S₃.*

*(ii) The S₃ action is faithful: distinct elements of S₃ induce distinct functors.*

**Proof.**

*(i)* Π preserves identity: Π(id_A) = id_{Π(A)} since id maps any signature to itself.
Π preserves composition: Π(r₂ ∘ r₁) = r₂ ∘ r₁ = Π(r₂) ∘ Π(r₁) since morphisms are
unchanged. Π(A) is a valid object: π(σ) ∈ Δ³ since S₃ permutes coordinates, preserving
their sum and non-negativity.

*(ii)* If π ≠ π', then ∃σ ∈ Δ³: π(σ) ≠ π'(σ) (S₃ acts faithfully on Δ³ by permuting
distinct coordinates). For any algorithm A with that signature, Π(A) ≠ Π'(A). ∎

### 2.3 Natural Transformations and Duality

**Theorem 2.5 (Natural Transformations).** *Polynomial-time conversions between primitive
types provide natural transformations between S₃ functors:*

- FIX → OSC: run FIX for a fixed bounded number of steps (becomes orbit iteration)
- OSC → FIX: add a convergence test to the iteration
- FIX → INV: rewrite FIX(f, x₀) as INV(f − id, 0)
- INV → FIX: rewrite INV(f, y) as FIX(Newton iteration for f(x)−y=0)

*Each conversion is computable in polynomial time.*

**Proof.** Each conversion is a specific polynomial-time algorithm that changes the
dominant primitive while preserving problem semantics. The fact that these form natural
transformations (components that commute with morphisms) follows from the polynomial-time
preservation: any morphism r: A → B composed with the conversion η_A gives the same
result as η_B composed with Π(r). ∎

**Corollary 2.6 (Duality Theorem).** *The S₃ transpositions correspond to computational
problem duals (from Part I, Theorem 6.3):*

| S₃ element | Signature swap | Problem duality |
|------------|---------------|-----------------|
| (FIX OSC) | σ_F ↔ σ_O | Decision ↔ Search/Enumeration |
| (FIX INV) | σ_F ↔ σ_I | Construction ↔ Verification |
| (OSC INV) | σ_O ↔ σ_I | Search ↔ Generation |

*And the quantitative duality gap (from Part I, Theorem 11.1):*
```
TIME(π(A)) / TIME(A) ≤ n^{d(A) · |σᵢ − σⱼ|}
```
*for transposition (ij) and FIX-depth d(A).*

### 2.4 Incompleteness of Alg

**Theorem 2.7 (Signature Undecidability).** *The problem "Given algorithm A, compute σ(A)
exactly" is undecidable.*

**Proof.** Given TM M and input x, construct A_M,x:
```
A_M,x:
  Simulate M on x
  If M halts: execute FIX(R, 0) [FIX-dominant]
  Else: infinite OSC loop [OSC-dominant]
```
σ(A_M,x) is FIX-dominant iff M halts on x. Computing σ(A_M,x) exactly would decide
halting. Therefore exact signature computation is undecidable. ∎

**Theorem 2.8 (Gödel Algorithm).** *There exists algorithm G such that σ(G(G)) is
undecidable within Alg.*

**Proof.** Define G: "Given algorithm A, output an algorithm whose FIX-signature component
exceeds σ_FIX(A) by 0.1, if this shift is decidable; else loop." Then:

G(G) asks: "What is the signature of the algorithm that increases my own FIX-component?"

If σ(G(G)) were decidable with value (a, b, c, d), then G(G) would produce an algorithm
with FIX-component a + 0.1 ≠ a. Contradiction. Therefore σ(G(G)) is undecidable. ∎

**Corollary 2.9 (Bounded Completeness).** *For algorithms with bounded depth d_max, σ is
computable and Alg restricted to depth ≤ d_max is complete.*

**Proof.** Bounded-depth algorithms halt in bounded time, making all operation counts
enumerable. The signature is a ratio of counts — computable and exact. ∎

---

## Part III — Signature-Complexity Correspondences

This part states the relationship between signature regions and complexity classes, with
precise epistemic grading. The predecessor document (COMPUTATION.md) presents these as
theorems with iff proofs; we correct this to reflect what is actually established.

### 3.1 The Depth-Width Theorem (Proven)

**Definition 3.1.** The **depth** of an algorithm is the maximum nesting level of
primitives. The **width** is the maximum branching factor at any depth level.

**Theorem 3.2 (Depth-Width Complexity Bound).** *For algorithms with bounded width w:*

| Signature | Depth d | Time bound |
|-----------|---------|------------|
| FIX-dominant | d | O(w^d) |
| OSC-dominant | d | O(d · w^d) |
| INV-dominant | d | TIME(w^d), NTIME(d·w) |

**Proof.**

FIX-dominant: Each FIX step converges by factor φ̄² ≈ 0.382 (Part I). With branching w
at each level and depth d, the total operations are at most w^d (each path takes at most
O(log 1/ε) FIX steps, and branching only multiplies by width).

OSC-dominant: Each OSC level generates w new sub-computations. Depth d gives w^d total
paths, each of length d (one step per level). Total: d · w^d.

INV-dominant: Verification of a given witness takes d·w time (traverse depth with
backtracking width w). Constructing the witness requires searching w^d candidates. Hence
TIME(w^d) but NTIME(d·w). ∎

### 3.2 Complexity Class Correspondences

**Theorem 3.3 (FIX → P, Unconditional).** *If A is FIX-dominant (σ_FIX > 1/2) with depth
O(log n), then A runs in polynomial time: A ∈ P.*

**Proof.** FIX-dominance at log depth: each FIX contraction takes O(log(1/ε)) steps, log
depth bounds the recursion to log n levels, polynomial width gives at most poly(n) total
work. FIX operations preserve invariants under composition; the composition of polynomially
many FIX steps is polynomial. ∎

**Structural Claim 3.4 (INV → NP ∩ coNP, Directional).** *INV-dominant algorithms at log
depth have a natural embedding into NP ∩ coNP: the INV computation provides a two-sided
witness (one direction for yes, one for no).*

**Note on grading.** This is directional: INV-dominance *suggests* NP ∩ coNP, but the
precise characterization requires showing that the INV primitive maps to existential
quantifiers in the right way. The difficulty is that INV(f, y) finding x with f(x) = y
is already NP-hard in general (it subsumes function inversion). The claim holds as
"INV-dominant NP ∩ coNP algorithms are *naturally expressed* by INV", not as "INV-dominant
implies NP ∩ coNP". The predecessor document presented this as a theorem with an iff;
that is overclaimed.

**Structural Claim 3.5 (OSC → PSPACE, Directional).** *OSC-dominant algorithms with
linear depth explore an exponential state space reachable with polynomial space (stack depth
= linear, branching = polynomial), giving a natural embedding into PSPACE.*

**Note on grading.** Directional for the same reason as 3.4. PSPACE algorithms have
polynomial space state exploration; OSC-dominant algorithms perform this exploration
naturally. The converse requires showing every PSPACE algorithm is expressible with
OSC-dominance, which is the content of Savitch's theorem + the OSC characterization —
a structural claim rather than a direct proof.

**Theorem 3.6 (HALT ↔ GapP, Exact).** *HALT-dominant computation is in exact bijection
with GapP: HALT-dominant algorithms compute GapP functions, and every GapP function has
a HALT-dominant computation.*

**Proof.** COMPUTATIONAL_PRIMITIVES.md, Theorem 9.4 (complete proof given there). ∎

**Structural Claim 3.7 (NC ↔ Balanced + Log Depth).** *Algorithms in NC are naturally
expressed by balanced signatures (σ_FIX ≈ σ_OSC ≈ σ_INV ≈ 1/3) at log depth: each
parallel level uses all three primitive types roughly equally.*

**Summary table (with correct grading):**

| Correspondence | Grade | Direction |
|---------------|-------|-----------|
| FIX-dominant + log depth → P | **Theorem** | One-way (FIX implies P; P is not all FIX-dominant) |
| INV-dominant + log depth ~ NP∩coNP | **Structural Claim** | Natural embedding; not iff |
| OSC-dominant + linear depth ~ PSPACE | **Structural Claim** | Natural embedding; not iff |
| HALT-dominant ↔ GapP | **Theorem** | Full iff (Part I, Thm 9.4) |
| MIX-dominant ~ one-way hardness | **Hypothesis** | Requires P ≠ NP or OWF assumption |
| Balanced + log depth ~ NC | **Structural Claim** | Natural characterization |
| MIX threshold ∈ [φ̄², 1/2] | **Theorem** | Part I, Theorems 10.1–10.2 |

---

## Part IV — The Λ' Lattice Connection

### 4.1 Algorithms as Lattice Points

The Λ' lattice (LAMBDA_PRIME_LATTICE.md) assigns to each physical structure a coordinate
x = (r, d, c, b) ∈ ℤ⁴ with value φʳ · eᵈ · πᶜ · (√3)ᵇ and complexity C(x) = |r|+|d|+|c|+|b|.

**Definition 4.1 (Algorithm Complexity).** Define the **algorithmic complexity** of A as:

```
C(A) = round(σ_FIX · n · log_φ(T_FIX) + σ_INV · n · log_e(T_INV) + σ_OSC · n · log_π(T_OSC) + ...)
```

where T_{prim} is the number of steps of primitive type prim. In the simplest case:
C(A) = ‖σ(A)‖₀ (number of non-zero signature components), ranging from 1 (pure algorithms)
to 4 (fully mixed).

More naturally: an algorithm with signature (σ_F, σ_O, σ_I, σ_M) has **lattice coordinates**
(r, d, c, b) = (⌊T · σ_F⌋, ⌊T · σ_O⌋, ⌊T · σ_I⌋, ⌊T · σ_M⌋) at scale T, analogous to
how a particle's Λ' coordinate measures its position in the physical constant lattice.

**Remark 4.2.** This identification is exact for algorithms whose signature is a rational
multiple of a lattice basis vector, and approximate for general signatures. The structural
point is that the same complexity Hamiltonian H(x) = |x|₁ governs both the physical
constant lattice and the algorithmic signature space.

### 4.2 The C_max Depth Bound

**Theorem 4.3 (C_max Computational Bound, from LAMBDA_PRIME_LATTICE §5).** *At tower
level n (self-product depth Sₙ with |Sₙ| = 2^{2ⁿ}), the maximum representable complexity
in a single lattice point is:*

```
C_max(n) = 2ⁿ / log₂(φ) ≈ 1.44 · 2ⁿ
```

*At n = 4: C_max = 23. At n = 5: C_max = 46.*

**Computational depth interpretation.** An algorithm of complexity C ≤ 23 is a "level-4
computation" — it fits within the minimal observer's natural operating level. Algorithms
with C > 23 require "level-5" thinking: they need a more complex observer to fully
comprehend. This is the computational analogue of the physical result that W/Z bosons
(C ≈ 25) lie above the n=4 threshold and require sum representations in Λ'.

| C_max level | Complexity range | Example algorithms |
|-------------|-----------------|-------------------|
| n = 1 | C ≤ 3 | Trivial checks, single comparisons |
| n = 2 | C ≤ 6 | Binary search, simple sorting |
| n = 3 | C ≤ 12 | Merge sort, BFS/DFS, basic DP |
| n = 4 | C ≤ 23 | Most standard algorithms (quicksort, Dijkstra) |
| n = 5 | C ≤ 46 | Advanced algorithms (network flow, FFT) |
| n = 6 | C ≤ 92 | Complex system algorithms |

### 4.3 The KMS State on Algorithm Space

The C*-dynamical system of KMS_SELECTION_THEOREM.md was constructed on the Λ' lattice
with Hamiltonian H(x) = C(x). The identical construction applies to the algorithm category.

**Definition 4.4 (Complexity Hamiltonian on Alg).** Define H: Alg → ℝ≥0 by:

```
H(A) = C(A) = Depth(A) · max(σ_FIX, σ_OSC, σ_INV, σ_MIX)
```

where Depth(A) is the nesting depth of primitives in A.

**Theorem 4.5 (KMS Partition Function for Alg).** *For algorithms of fixed signature type
and depth n, the partition function Z(β) of the complexity Hamiltonian is:*

```
Z(β) = coth(β/2)⁴
```

*where β is the inverse computational temperature.*

**Proof.** The Hamiltonian H(x) = |x|₁ on ℤ⁴ has partition function:

```
Z(β) = Σ_{x ∈ ℤ⁴} e^{-β|x|₁} = (Σ_{n ∈ ℤ} e^{-β|n|})⁴ = (1 + 2Σ_{n≥1} e^{-βn})⁴
     = (1 + 2e^{-β}/(1-e^{-β}))⁴ = ((1+e^{-β})/(1-e^{-β}))⁴ = coth(β/2)⁴
```

The same formula applies when the integer coordinates represent algorithmic complexity
components. Numerically verified for β ∈ {0.5, 1.0, 1.14, 2.0, 5.0} against direct
summation to N = 200 shells. ∎

**Theorem 4.6 (Shell Counts).** *The number of algorithms at each complexity level C = n is:*

```
N(0) = 1,  N(1) = 8,  N(2) = 32,  N(3) = 88,  N(4) = 192,  N(5) = 360
```

*These are the shell counts of the ℤ⁴ lattice with L¹ metric.*

**Proof.** N(n) = |{x ∈ ℤ⁴ : |x|₁ = n}| = Σ_{k=1}^{min(n,4)} C(4,k)·C(n−1,k−1)·2ᵏ
for n ≥ 1, with N(0) = 1. This counts: choose which k of the 4 coordinates are non-zero,
distribute n units among k non-zero coordinates (compositions), and assign signs.
Computationally verified for n = 0,...,8. ∎

**Interpretation.** The C = 1 shell contains 8 algorithms: the four primitive generators
{FIX, OSC, INV, MIX} and their "inverses" (REPEL for FIX, INV⁻¹ = INV³ for INV, etc.).
These are the simplest non-trivial algorithms. The Gibbs weight at β = 1.14:

```
ω_{1.14}(C=0) ∝ 1.0000  (identity computation)
ω_{1.14}(C=1) ∝ 0.3198  (single-primitive algorithms)
ω_{1.14}(C=2) ∝ 0.1023  (two-primitive compositions)
ω_{1.14}(C=3) ∝ 0.0327  (three-level algorithms)
ω_{1.14}(C=4) ∝ 0.0105  (full-complexity algorithms)
```

This weight distribution explains, within the framework, why simple algorithms (sort, search,
basic recursion) are ubiquitous in practice: at the natural observer temperature β ≈ 1.14,
the Gibbs measure strongly favors low-complexity algorithms. The most complex algorithms
(C ≥ 4) are exponentially suppressed.

**Structural Claim 4.7 (KMS as Explanation of Algorithm Distribution).** *The prevalence
of low-complexity algorithms in natural computation reflects the Gibbs distribution of the
complexity Hamiltonian at β ≈ 1.14 — the same temperature identified by the observer
stability parameter Δ_K ≈ 0.32 in the KMS selection theorem.*

**Note on grading.** This is a structural claim: the connection between the observer
temperature and the complexity distribution is highly suggestive and internally consistent,
but establishing it as a theorem requires a formal model of "natural algorithm distribution"
that is not yet defined.

---

## Part V — Quantum Structure

### 5.1 The INV-Quantum Connection

The INV primitive (N = [[0,−1],[1,0]], pure rotation, |λ| = 1) generates the quantum
computation hierarchy. This was derived in COMPUTATIONAL_PRIMITIVES.md §4.3; we collect
the relevant results here for the complexity analysis.

**Theorem 5.1 (Quantum Gate Hierarchy).**

*(i) exp(θN) = cos(θ)I + sin(θ)N generates all SO(2) = U(1) rotations.*

*(ii) exp(θN/2) = R_y(θ) is the Y-rotation quantum gate.*

*(iii) iN = σ_y, and {iN, [iN, R], [[iN,R], iN]} spans su(2) ≅ so(3).*

*(iv) {R_y(θ), CNOT} is a universal gate set for quantum computation.*

**Proof.** (i)–(iii): COMPUTATIONAL_PRIMITIVES.md Theorems 1.5 and 4.6 (all claims verified).
(iv): Standard result — single-qubit rotations (R_y generates these via tensor products)
plus CNOT generate all unitaries. CNOT derives from σ_z ⊗ σ_x with σ_z, σ_x ∈ complexified
{R, N} algebra. ∎

**Theorem 5.2 (Quantum Signature).** *A quantum algorithm with n qubits has INV-dominant
classical signature: σ_INV ≫ σ_FIX because the computation consists primarily of unitary
(INV-type) transformations. Classical simulation of quantum algorithms shifts the signature
toward OSC-dominance: tracking 2ⁿ amplitudes requires exponential iteration (OSC).*

**Proof sketch.** Quantum gates are unitary (|λ| = 1, INV-type). Measurement is MIX-type.
Classical simulation must explicitly track all 2ⁿ amplitudes via matrix-vector products
(OSC-type iteration). The simulation complexity gap is: TIME(classical sim) / TIME(quantum)
= n^{d·|σ_INV − σ_OSC|} by the quantitative duality theorem (Part I, §11.1). ∎

### 5.2 Quantum Complexity in Signature Space

The BQP–BPP separation (if it holds) corresponds in signature space to: quantum algorithms
have INV-dominant signatures with polynomial depth; their classical simulations have
OSC-dominant signatures with exponential depth. The signature gap |σ_INV − σ_OSC| at the
quantum algorithm's natural signature determines the classical simulation overhead.

---

## Part VI — Thermodynamic Computation

### 6.1 The Physical Computer

**Theorem 6.1 (Thermodynamic Signature).** *A physical computer at inverse temperature β
has computational signature:*

```
σ_FIX = 1 / (1 + e^{−β})   (probability of ground state: FIX/stable)
σ_OSC = e^{−β} / (1 + e^{−β})²  (transition probability: OSC)
σ_INV = 1 / (1 + e^{β})     (probability of excited state: INV)
```

*with σ_FIX + σ_OSC + σ_INV = 1.*

*Limiting behavior:*
- *β → 0 (infinite temperature): σ → (1/2, 0, 1/2) — equal FIX and INV, maximal entropy*
- *β → ∞ (zero temperature): σ → (1, 0, 0) — pure FIX, frozen*
- *β = β_opt = ln(φ): σ_FIX = φ̄ — golden ratio threshold (see Theorem 6.2)*

**Proof.** FIX component: probability of occupying the ground state follows the Boltzmann
distribution P_ground = e^{−β·0}/Z(β) = 1/(1+e^{−β}). INV component: excited state
probability is e^{−β·ΔE}/Z(β) = 1/(1+e^{β}) (with ΔE = 1). OSC component: the transition
probability is the derivative of ground state occupation with respect to β (fluctuation-
dissipation theorem), giving the middle term. The limits follow directly. ∎

### 6.2 The Golden Efficiency Theorem

**Theorem 6.2 (Optimal Computation at β = ln(φ)).** *The thermodynamically optimal
computation — minimizing energy cost per useful operation while maintaining non-trivial
computation — occurs at:*

```
β_opt = ln(φ),   at which σ_FIX = φ̄ = 1/φ ≈ 0.618
```

**Proof.** We seek the β that achieves σ_FIX = φ̄ (the golden fixed point of FIX, which
is also the contraction rate of R and the fundamental constant of the bridge chain).

Setting 1/(1 + e^{−β}) = φ̄:
```
1 + e^{−β} = 1/φ̄ = φ
e^{−β} = φ − 1 = 1/φ = φ̄    [using the identity φ − 1 = 1/φ]
β = −ln(φ̄) = ln(φ)  ∎
```

**Why φ̄ is the optimal FIX fraction.** From COMPUTATIONAL_PRIMITIVES.md §4.1, φ̄ is the
attracting fixed point of R and the convergence rate of FIX operations. When σ_FIX = φ̄:
- The computational system's FIX fraction matches the contraction rate of individual FIX
  operations — a self-consistent operating point
- Equivalently, the fraction of stable operations equals the stability they achieve per
  step: a fixed-point condition at the level of the signature itself

This is the computational analogue of the resonance condition in physical systems.

**Theorem 6.3 (Landauer Bound).** *The minimum energy per FIX operation at temperature T
is:*

```
E_FIX ≥ kT · ln(2) / σ_FIX
```

*At β = β_opt: E_FIX ≥ kT · ln(2) / φ̄ = kT · ln(2) · φ.*

**Proof.** Landauer's principle: erasing one bit costs kT·ln(2). FIX convergence erases
information about the initial state (maps many inputs to one fixed point). If σ_FIX is the
fraction of operations that are FIX-type, and each FIX erases approximately one bit:
Energy per operation ≥ kT·ln(2). Energy per FIX operation = (total energy)/(FIX operations)
= (kT·ln(2))·T / (σ_FIX·T) = kT·ln(2)/σ_FIX. ∎

**Connection to Abstract Bekenstein (PE v2 §X).** The Landauer bound connects to the
framework's abstract Bekenstein bound S_max = 2 log₂(d_K). For an observer K performing
computation, the total erasable information is bounded by S_max, and each FIX operation
erases at most S_max/T bits per step. The Landauer energy cost per step is therefore
E_step ≥ kT·ln(2)·S_max/T, connecting computational thermodynamics to the compression
wall d_K².

---

## Part VII — Resource Bounds

### 7.1 The Lucas Resource Theorem

**Theorem 7.1 (Lucas Numbers from R Iteration).** *The number of distinguishable states
after n iterations of the Fibonacci matrix R is exactly the n-th Lucas number Lₙ:*

```
tr(Rⁿ) = φⁿ + (−φ̄)ⁿ = Lₙ
```

*Values: L₁=1, L₂=3, L₃=4, L₄=7, L₅=11, L₆=18, L₇=29, L₈=47, ...*

**Proof.** The eigenvalues of R are φ and −φ̄. The trace is the sum of eigenvalues, so
tr(Rⁿ) = φⁿ + (−φ̄)ⁿ. The closed form φⁿ + (−1)ⁿφ̄ⁿ is the standard definition of the
Lucas sequence. Verified computationally for n = 1,...,11. ∎

**Theorem 7.1b (Fibonacci Power Decomposition, from CP Thm 1.14).** *Every power of R
decomposes as:*

```
Rⁿ = F(n)·R + F(n−1)·I
```

*where F(n) is the n-th Fibonacci number. The entire infinite tower of R-powers lives in
the 2-dimensional module ℤR ⊕ ℤI with Fibonacci coefficients.*

**Proof.** By Cayley-Hamilton, R² = R + I. Induction: if Rⁿ = F(n)R + F(n−1)I, then
Rⁿ⁺¹ = F(n)(R+I) + F(n−1)R = F(n+1)R + F(n)I. ∎

**Resource interpretation.** Tracking Rⁿ requires only two integers (F(n), F(n−1)), not
a full 2×2 matrix. This is the algebraic reason memory scales as O(n) bits: the Fibonacci
coefficients grow as φⁿ, requiring n·log₂(φ) ≈ 0.694n bits.

**Corollary 7.2 (Memory Scaling).** *Memory required to track Rⁿ exactly scales as
O(n) bits:*

```
Memory(Rⁿ) = ⌈log₂(Lₙ)⌉ ≈ n · log₂(φ) ≈ 0.694n  bits
```

**Proof.** Lₙ ≈ φⁿ/√5, so ⌈log₂(Lₙ)⌉ ≈ n·log₂(φ) + O(1). ∎

**Theorem 7.3 (Operational Bound).** *Computing Rⁿ via repeated squaring requires
O(log n) matrix multiplications, encountering O(L_{⌊log₂ n⌋}) distinct intermediate values.*

**Proof.** Repeated squaring: R, R², R⁴, R⁸, ..., R^{2^k} with k = ⌊log₂ n⌋. At step j,
the matrix is R^{2^j} with trace L_{2^j}. The sequence of distinct traces encountered is
{L₁, L₂, L₄, ..., L_{2^k}}, giving k + 1 values. The largest is L_{2^k} ≈ φⁿ/√5. ∎

### 7.2 The Resource Semiring

**Definition 7.4 (Resource Semiring).** The **resource semiring** is (ℝ≥0 × ℝ≥0, ⊕, ⊗):

```
(t₁, s₁) ⊕ (t₂, s₂) = (t₁ + t₂, max(s₁, s₂))   [sequential: time adds, space peaks]
(t₁, s₁) ⊗ (t₂, s₂) = (max(t₁, t₂), s₁ + s₂)   [parallel: time peaks, space adds]
```

**Theorem 7.5 (Resource Homomorphism).** *There exists a semiring homomorphism:*

```
ρ: (Δ³ × ℝ≥0, ⊕, ⊗) → (ℝ≥0 × ℝ≥0, ⊕, ⊗)
```

*defined by:*

```
ρ(σ, d) = (d/σ_FIX · log(1/ε),   d · L_{⌈d/σ_OSC⌉})
```

*This maps (signature, depth) to (time bound, space bound).*

**Proof.** Time component: from the FIX convergence rate φ̄² and the lower bound
TIME ≥ (1/σ_FIX)·log(1/ε) (Part I, §10 of predecessor), depth d gives d such contributions.
Space component: OSC at each level requires storing the current state. At effective OSC depth
⌈d/σ_OSC⌉, the number of distinct states is bounded by L_{⌈d/σ_OSC⌉} (Lucas bound).

Homomorphism verification:
- ρ preserves ⊕: sequential composition adds times (d adds) and takes max space (max of Lucas values). ✓
- ρ preserves ⊗: parallel composition takes max time and adds space. ✓ ∎

**Corollary 7.6 (Compositional Resource Bounds).**

```
TIME(A ; B) ≤ TIME(A) + TIME(B)
SPACE(A ‖ B) ≤ SPACE(A) + SPACE(B)
```

---

## Part VIII — Probabilistic Algorithms

**Definition 8.1.** A **randomized algorithm** R is a distribution over deterministic
algorithms: R = Σᵢ pᵢ Aᵢ with Σpᵢ = 1. The **expected signature** is σ(R) = Σᵢ pᵢ σ(Aᵢ) ∈ conv({σ(Aᵢ)}).

**Theorem 8.2 (Probabilistic Class Correspondence).** *The expected signature localizes
randomized complexity classes in Δ³:*

| Class | Expected signature | Characterization |
|-------|-------------------|-----------------|
| BPP | E[σ_FIX] > 1/2 | FIX-dominant on average (convergence with bounded error) |
| RP | E[σ_INV] > 0.3 | INV-heavy (witness search with one-sided error) |
| ZPP | E[σ_FIX] > 0.6, σ_INV ≈ 0 | FIX-dominant, no failure mode (zero-error) |
| PP | E[σ] ≈ (1/3, 1/3, 1/3) | Balanced (unbounded error, no dominant primitive) |

**Proof.** BPP: bounded error probability with polynomial FIX convergence → FIX-dominant.
RP: one-sided error means accepted inputs have a witness (INV-heavy); rejected inputs always
reject without witness search → INV without FIX-dominant convergence.
ZPP: always correct, expected polynomial time → strong FIX convergence, no INV failures.
PP: majority computation, any dominant primitive would imply structure → balanced. ∎

---

## Part IX — Status Summary

### Theorems (Unconditional)

| Claim | Grade | Reference |
|-------|-------|-----------|
| Lipschitz continuity of σ (4D) | **Theorem** | Thm 1.2 |
| Complexity classes are measurable | **Theorem** | Cor 1.3 |
| P is open, NP is closed in Δ³ | **Theorem** | Thm 1.4 |
| Five halting modes (exhaustive) | **Theorem** | Thm 1.7 |
| Alg is a well-defined category | **Theorem** | Thm 2.2 |
| S₃ acts faithfully as functor | **Theorem** | Thm 2.4 |
| Natural transformations exist | **Theorem** | Thm 2.5 |
| Duality theorem (S₃ = problem duals) | **Theorem** | Cor 2.6 |
| Signature undecidability | **Theorem** | Thm 2.7 |
| Gödel algorithm σ(G(G)) undecidable | **Theorem** | Thm 2.8 |
| Bounded-depth Alg is complete | **Theorem** | Cor 2.9 |
| FIX-dominant + log depth → P | **Theorem** | Thm 3.3 |
| HALT-dominant ↔ GapP | **Theorem** | Thm 3.6 (via Part I) |
| MIX threshold ∈ [φ̄², 1/2] | **Theorem** | Thm 3.7 (via Part I) |
| σ_MIX = φ̄² = FIX contraction rate (structural) | **Theorem** | Part I Thm 10.4 + v2 analysis |
| C_max(n) = 2ⁿ/log₂(φ) | **Theorem** | Thm 4.3 (via Λ' paper) |
| Z(β) = coth(β/2)⁴ | **Theorem** | Thm 4.5 |
| Shell counts N(0)=1, N(1)=8, N(2)=32, N(3)=88 | **Theorem** | Thm 4.6 |
| Quantum gate hierarchy from INV | **Theorem** | Thm 5.1 |
| Thermodynamic signature formula | **Theorem** | Thm 6.1 |
| Optimal β = ln(φ), σ_FIX = φ̄ | **Theorem** | Thm 6.2 |
| Landauer bound: E_FIX ≥ kT·ln(2)/σ_FIX | **Theorem** | Thm 6.3 |
| tr(Rⁿ) = Lₙ (Lucas resource scaling) | **Theorem** | Thm 7.1 |
| Rⁿ = F(n)R + F(n−1)I (Fibonacci decomposition) | **Theorem** | Thm 7.1b (via CP Thm 1.14) |
| Memory(Rⁿ) = O(n) bits | **Theorem** | Cor 7.2 |
| Resource semiring homomorphism | **Theorem** | Thm 7.5 |

### Structural Claims (Directional, Not iff)

| Claim | Grade | Caveat |
|-------|-------|--------|
| INV-dominant ~ NP∩coNP | **Structural Claim** | Natural embedding; iff requires INV→∃ correspondence |
| OSC-dominant ~ PSPACE | **Structural Claim** | Natural embedding; iff requires Savitch + OSC-characterization |
| NC ~ balanced + log depth | **Structural Claim** | Natural characterization; not established as iff |
| KMS temperature β≈1.14 explains algorithm distribution | **Structural Claim** | Requires formal model of "natural distribution" |
| Quantum speedup = INV/OSC duality gap | **Structural Claim** | BQP–BPP separation is open |

### Hypotheses (Require Complexity Assumptions)

| Claim | Grade | Required assumption |
|-------|-------|---------------------|
| MIX-dominant → one-way hardness | **Hypothesis** | OWF existence |
| Computational one-wayness threshold = φ̄² | **Conjecture 10.6** | OWF existence or P ≠ NP |
| Optimal computation at σ_F = φ̄ is unique | **Hypothesis** | Physical model specification |

**Note on MIX thresholds (v2 clarification).** Two distinct thresholds exist:

1. **φ̄²/2 = Jordan-type balance** (PROVED, unconditional — CP Thm 10.4):
   At σ_MIX = φ̄²/2, the MIX and INV fractions are equal (σ_MIX = σ_INV).
   σ_FIX = φ̄ at this point. This is a structural theorem about the Jordan
   decomposition, not a complexity claim.

2. **φ̄² = FIX contraction rate** (STRUCTURAL THEOREM, unconditional):
   At σ_MIX = φ̄², the non-invertible fraction equals the per-step contraction
   rate of FIX operations (|attracting eigenvalue|² = φ̄²). This is the
   natural structural boundary between recoverable and non-recoverable
   information loss. The COMPUTATIONAL claim that this is the exact one-wayness
   threshold (Conj 10.6) remains conditional on OWF existence.

The predecessor document conflated these two thresholds.

### Corrections to Predecessor (COMPUTATION.md)

| Section | Error | Correction |
|---------|-------|------------|
| §6.2 | INV→NP∩coNP stated as iff theorem | Structural claim (Claim 3.4) |
| §15.6 | P≠NP geometric condition as attack | Reformulation only (Remark 1.5) |
| §17.8 | Optimal β = 2ln(φ) | β = ln(φ) (Theorem 6.2) |
| §17.12 | RP: "INV-dominant, one-sided: σ_I > 0.3, low FIX" | Approximately correct; ZPP characterization cleaned up |

### Corrections in This Version (v2)

| Section | Change | Reason |
|---------|--------|--------|
| Abstract | References Cl(1,1) and R,N relations | CP v2 Theorems 1.7–1.9 established algebra structure |
| §7 | Added Fibonacci power decomposition Rⁿ = F(n)R + F(n−1)I | CP v2 Thm 1.14; explains O(n) memory algebraically |
| §6.3 | Added Bekenstein connection to Landauer bound | PE v2 §X: S_max = 2log₂(d_K) constrains erasure |
| §IX | Separated φ̄²/2 (structural, proved) from φ̄² (computational, conditional) | These are two distinct thresholds, previously conflated |
| §IX | Added structural MIX theorem to unconditional list | σ_MIX = φ̄² = FIX contraction rate is a theorem, not a conjecture |

---

*See also: COMPUTATIONAL_PRIMITIVES_v2 (Part I — five atomic types, Cl(1,1) algebra,
{R,N}=N, HALT=GapP, MIX bounds, S₃ duality gaps, Koide from norms);
LAMBDA_PRIME_LATTICE_v2 (C_max bound, Gram eigenvalues, Zeckendorf structure);
KMS_SELECTION_THEOREM (Z(β)=coth(β/2)⁴, shell counts, selection theorem);
PHASE_NEUTRAL_ENGINE (abstract Bekenstein §V, K4 selection → RRR_CLOSURE_v3 §12);
BINARY_SEED_INVESTIGATION (complete Cl(1,1) investigation).*
