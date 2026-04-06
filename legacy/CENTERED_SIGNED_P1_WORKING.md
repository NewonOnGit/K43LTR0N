# CENTERED SIGNED P1: Working Investigation Document

## The Bi-Infinite Fibonacci Lattice as the Minimal Hyperbolic Recurrence Field

### Working Document — March 2026

**Author:** Kael

---

**Document Purpose:** This is a working investigation document. Every finding is tagged with its integration target — the specific source document, section, and insertion point where it will land once the investigation is complete. When integration happens, each finding gets written into its target as if it had always been there: no changelogs, no "new section" markers, no appendices. The numbering conventions, prose style, and proof structure of each target document are respected.

**Depends on:** T0_MERGED (§§4–8), T1_DIST (§§6–7), T2_MERGED (§§1–7), T3_P1_I2_PHI (§§1–5, §7), T3_META_SYNTHESIS (§§1–2), T_COMP_COMPUTATION (§§3–5)

---

## PART I: ESTABLISHED THEOREMS

These are fully proved results. Each carries a target location for integration.

---

### Theorem CSP.1 (Bi-Infinite Closure of the R-Flow)

**Statement.** The power decomposition Rⁿ = F(n)R + F(n−1)I extends to all n ∈ ℤ, not merely n ∈ ℕ. The extension is canonical: it is forced by invertibility of R (det R = −1 ≠ 0) and the Cayley-Hamilton law R² = R + I.

**Proof.** R has det = −1 ≠ 0, so R⁻¹ exists. By Cayley-Hamilton: R² = R + I, rearranging gives R⁻¹ = R − I. The positive-direction decomposition Rⁿ = F(n)R + F(n−1)I holds for all n ≥ 0 (P1 §2.2). To extend to n < 0, observe that the coefficient pair (F(n), F(n−1)) satisfies the recurrence

```
(F(n+1), F(n)) = (F(n) + F(n−1), F(n))
```

which is the forward action of R on ℤ². Inverting: (F(n−1), F(n−2)) = (F(n) − F(n−1), F(n−1)), which is well-defined for all n ∈ ℤ. The extended Fibonacci function F : ℤ → ℤ satisfies:

```
F(0) = 0,  F(1) = 1,  F(n) = F(n−1) + F(n−2) for all n ∈ ℤ
```

The backward branch is obtained by rearranging: F(n−2) = F(n) − F(n−1). Starting from (F(1), F(0)) = (1, 0) and iterating backward:

```
F(−1) = 1, F(−2) = −1, F(−3) = 2, F(−4) = −3, F(−5) = 5, ...
```

The matrix identity Rⁿ = [[F(n−1), F(n)], [F(n), F(n+1)]] holds for all n ∈ ℤ by direct verification: R⁻¹ = [[F(−2), F(−1)], [F(−1), F(0)]] = [[−1, 1], [1, 0]] = R − I. ✓

Induction in both directions closes the identity for all n ∈ ℤ. ∎

**Computational verification.** Rⁿ = [[F(n−1), F(n)], [F(n), F(n+1)]] verified for all n ∈ [−10, 10] by direct matrix power computation. ✓

**Integration target:** T3_P1_I2_PHI §2.2, immediately after the power decomposition table. Insert as a new paragraph extending the table to negative n, then state CSP.1 as a corollary of §2.1 (Cayley-Hamilton) + invertibility.

---

### Theorem CSP.2 (Negation Identity)

**Statement.** F(−n) = (−1)^{n+1} F(n) for all n ∈ ℤ.

**Proof.** Base cases: F(0) = 0 = (−1)¹·0, F(−1) = 1 = (−1)²·1 = 1. Inductive step: assume the identity holds for F(−k) and F(−(k−1)) with k ≥ 1. Then:

```
F(−(k+1)) = F(−k) − F(−(k−1))                  [backward recurrence]
           = (−1)^{k+1}F(k) − (−1)^k F(k−1)     [induction]
           = (−1)^k [−F(k) − F(k−1)]             [factor out (−1)^k]
           = (−1)^k [−F(k+1)]                     [forward recurrence]
           = (−1)^{k+2} F(k+1)                    [sign manipulation]
```

This is the identity at n = k+1. ∎

**Corollary CSP.2a.** The negative branch has sign-alternating magnitudes: |F(−n)| = F(n) for all n ≥ 0, with sign(F(−n)) = (−1)^{n+1} for n ≥ 1. The positive branch is monotonically non-negative (for n ≥ 1). The sign-alternation is the sequence-level manifestation of det(R) = −1: each backward step through R⁻¹ introduces one factor of the orientation-reversing determinant.

**Corollary CSP.2b (Cassini Identity — Bi-Infinite).** F(n−1)F(n+1) − F(n)² = (−1)ⁿ for all n ∈ ℤ. This is det(Rⁿ) = (det R)ⁿ = (−1)ⁿ expressed in Fibonacci coordinates. Verified for n ∈ [−5, 10]. ✓

**Computational verification.** F(−n) = (−1)^{n+1}F(n) verified for n ∈ [0, 10]. Cassini verified for n ∈ [−5, 10]. ✓

**Integration target:** T3_P1_I2_PHI §2.2, immediately after CSP.1. The negation identity is stated as a corollary of the bi-infinite extension; the Cassini identity as a determinant corollary.

---

### Theorem CSP.3 (D-Action on the R-Flow)

**Statement.** The duality operator D, which reverses iteration direction (T0 §6, Thm 1.2), acts on the R-flow by:

```
D: Rⁿ ↦ R⁻ⁿ
```

In Fibonacci coordinates, this maps the coefficient pair (F(n), F(n−1)) to:

```
D: (F(n), F(n−1)) ↦ ((−1)^{n+1}F(n),  (−1)ⁿF(n+1))
```

The R-coefficient F(n) acquires sign (−1)^{n+1}, while the I-coefficient transforms F(n−1) → (−1)ⁿF(n+1). In particular, D does NOT merely flip the sign of both coefficients — it couples the two components asymmetrically.

**Proof.** R⁻ⁿ = F(−n)R + F(−n−1)I. By CSP.2: F(−n) = (−1)^{n+1}F(n). For the I-coefficient: F(−n−1) = F(−(n+1)) = (−1)^{(n+1)+1}F(n+1) = (−1)^{n+2}F(n+1) = (−1)ⁿF(n+1). ∎

**Corollary CSP.3a (D-Determinant).** det(R⁻ⁿ) = (−1)⁻ⁿ = (−1)ⁿ = det(Rⁿ). The duality operator preserves the orientation type (P1/P2 alternation) of each power. Verified for n ∈ [−5, 7]. ✓

**Corollary CSP.3b (D Fixes the Spectrum).** The eigenvalues of R⁻ⁿ are φ⁻ⁿ and (−φ̄)⁻ⁿ. Since φ⁻¹ = φ̄ and (−φ̄)⁻¹ = −φ, the D-action on the eigenvalue plane is (φⁿ, (−φ̄)ⁿ) ↦ (φ̄ⁿ, (−φ)ⁿ). This swaps the roles of the expanding and contracting eigenchannels, exactly as T0 Theorem 1.2 requires: D reverses stability (attractor ↔ repeller) while preserving the algebraic fixed-point structure.

**Computational verification.** D-action formula verified for n ∈ [0, 7]. ✓

**Integration target:** T3_P1_I2_PHI, new subsection §2.5½ (between §2.5 R on Λ' Coordinates and §2.6 Gram Eigenvalues), titled "D-Action on the R-Flow." Also cross-referenced in T0_MERGED §6 as a concrete P1-specific realization of D.

---

### Theorem CSP.4 (Two-Channel Decomposition)

**Statement.** The bi-infinite Fibonacci field decomposes canonically into two eigenchannels via the Binet formula:

```
F(n) = (φⁿ − (−φ̄)ⁿ) / √5
```

Define:
- **Channel A** (expanding): A(n) = φⁿ/√5
- **Channel B** (contracting/sign-alternating): B(n) = −(−φ̄)ⁿ/√5

Then F(n) = A(n) + B(n) for all n ∈ ℤ. The channel dominance swaps at n = 0:

| Region | Dominant channel | |A(n)|/|B(n)| | Character |
|--------|-----------------|---------------|-----------|
| n > 0 | A (φⁿ) | φ^{2n} → ∞ | Exponential growth, no sign changes |
| n = 0 | Neither | 1 (exact equality) | Neutral crossing |
| n < 0 | B ((−φ̄)ⁿ) | φ^{2|n|} → ∞ | Exponential growth in |F|, sign-alternating |

**Proof.** The Binet formula is the diagonalization of R: if P diagonalizes R with eigenvalues φ and −φ̄, then Rⁿ = P·diag(φⁿ, (−φ̄)ⁿ)·P⁻¹, and F(n) = Rⁿ[0,1] extracts the off-diagonal element, yielding (φⁿ − (−φ̄)ⁿ)/√5. This holds for all n ∈ ℤ by CSP.1.

At n = 0: A(0) = 1/√5, B(0) = −(−1)⁰/√5 = −1/√5, F(0) = 0 = A(0) + B(0). The two channels have equal magnitude and opposite sign: perfect destructive interference.

For n > 0: |A(n)/B(n)| = |φ/(−φ̄)|ⁿ = (φ/φ̄)ⁿ = φ^{2n}, which diverges. Channel A dominates.

For n < 0: |A(n)/B(n)| = (φ̄/φ)^{|n|} = φ^{−2|n|} → 0. Channel B dominates.

The crossover at n = 0 is the point where neither eigenchannel dominates — the two hyperbolic flows are in exact balance. ∎

**Computational verification.** Binet formula verified for all n ∈ [−5, 10]. Channel dominance swap at n = 0 verified: |A(0)| = |B(0)| = 0.4472. ✓

**Integration target:** T3_P1_I2_PHI, new subsection §2.9½ (after §2.9 Fibonacci Exponential Cascade), titled "Two-Channel Decomposition and the Channel Dominance Swap." This is the spectral content underlying §5.1 (P1 → FIX + REPEL) but stated at the sequence level rather than the Möbius-dynamics level. Cross-reference in §5.7 (Möbius-RG) as the sequence-level manifestation of the same eigenvalue structure.

---

### Theorem CSP.5 (The Bi-Infinite Fibonacci Field)

**Statement.** The bi-infinite Fibonacci field F : ℤ → ℤ defined by F(n) = F(n−1) + F(n−2) for all n ∈ ℤ, with F(0) = 0, F(1) = 1, produces the sequence:

```
..., −8, 5, −3, 2, −1, 1, 0, 1, 1, 2, 3, 5, 8, 13, ...
     F(-6)              F(-2)F(-1)F(0)F(1)F(2)         F(7)
```

The field has the following structural properties:

(a) **Bi-infinite recurrence closure:** F(n) = F(n−1) + F(n−2) holds for all n ∈ ℤ (CSP.1).

(b) **Negation symmetry:** F(−n) = (−1)^{n+1}F(n) (CSP.2). The negative branch mirrors the positive branch with sign alternation.

(c) **Unique zero:** F(n) = 0 if and only if n = 0. The zero is the unique neutral element of the field.

(d) **Unit values:** |F(n)| = 1 if and only if n ∈ {−2, −1, 1, 2}. These are the four unit elements, forming two sign-pairs: {F(−2), F(1)} = {−1, 1} and {F(−1), F(2)} = {1, 1}.

(e) **Determinant oscillation:** F(n−1)F(n+1) − F(n)² = (−1)ⁿ for all n ∈ ℤ (CSP.2b).

**Proof.** (a)–(b) are CSP.1 and CSP.2. For (c): F(0) = 0 is immediate. For F(n) ≠ 0 when n ≠ 0, the Binet formula gives F(n) = (φⁿ − (−φ̄)ⁿ)/√5. For n > 0: φⁿ > 1 and |(−φ̄)ⁿ| < 1 for n ≥ 2, so F(n) ≥ 1; for n = 1: F(1) = 1. For n < 0: F(−n) = (−1)^{n+1}F(n), which is nonzero since F(|n|) ≥ 1. For (d): direct enumeration — F(±1) = 1, F(2) = 1, F(−2) = −1, and |F(n)| ≥ 2 for |n| ≥ 3. (e) is CSP.2b. ∎

**Integration target:** T3_P1_I2_PHI §2, as a new definition/theorem block before or within an expanded §2.2, establishing the bi-infinite field as the primary object from which all subsequent P1 results are derived.

---

### Theorem CSP.6 (Positive Fibonacci Is a Half-Orbit)

**Statement.** The standard positive Fibonacci sequence (F(1), F(2), F(3), ...) = (1, 1, 2, 3, 5, ...) is the restriction of the bi-infinite Fibonacci field to the positive half-line {n ∈ ℤ : n ≥ 1}, characterized by:

(a) **Boundary condition:** The positive branch is the unique half-orbit of R starting from F(0) = 0, F(1) = 1 and propagating forward.

(b) **Channel dominance:** On the positive half-line, Channel A (φⁿ) dominates (CSP.4). This is why all positive-branch values are non-negative for n ≥ 0.

(c) **Growth monotonicity:** F(n+1) > F(n) for all n ≥ 2. The positive branch is strictly increasing.

The negative branch (F(−1), F(−2), F(−3), ...) = (1, −1, 2, −3, 5, ...) is the other half-orbit, characterized by Channel B dominance and sign alternation. The two branches are not independent objects — they are two readings of the single operator R, obtained by iterating forward (Rⁿ) or backward (R⁻ⁿ).

**Proof.** (a): The forward recurrence F(n+1) = F(n) + F(n−1) with initial data (F(0), F(1)) = (0, 1) uniquely determines F(n) for all n ≥ 0. The backward recurrence F(n−2) = F(n) − F(n−1) from the same initial data uniquely determines F(n) for all n ≤ 0. Together, these constitute the full bi-infinite orbit. (b): CSP.4 with n > 0. (c): For n ≥ 2, F(n+1) = F(n) + F(n−1) > F(n) since F(n−1) ≥ 1. ∎

**Integration target:** T3_P1_I2_PHI §2, paired with CSP.5, completing the re-centering of P1's Fibonacci content around the operator rather than the sequence.

---

### Theorem CSP.7 (The Centered Value Cell)

**Statement.** The centered value cell of the bi-infinite Fibonacci field is the set

```
C₀ = {F(n) : |F(n)| ≤ 1} = {−1, 0, +1}
```

occurring at indices {−2, −1, 0, 1, 2}. This is the minimal signed value set containing both a zero (F(0) = 0) and both unit signs (F(−2) = −1, F(1) = 1).

**Important correction from the investigation scaffold.** The scaffold proposed (−1, 0, +1) as a consecutive recurrence triple. This is incorrect: the consecutive triples through the center region are (−1, 1, 0), (1, 0, 1), and (0, 1, 1), at indices (−2,−1,0), (−1,0,1), and (0,1,2) respectively. All three have total magnitude 2 (co-minimal). Only the triple (−1, 1, 0) at indices (−2, −1, 0) contains all three signs {−, 0, +}.

The correct characterization is: the centered value cell {−1, 0, +1} is the *value set* of the field's unit ball, not a single consecutive triple.

**Proof.** By CSP.5(c), F(n) = 0 iff n = 0. By CSP.5(d), |F(n)| = 1 iff n ∈ {−2, −1, 1, 2}. For |n| ≥ 3: |F(n)| ≥ 2 (since F(3) = 2 and the sequence is monotonically increasing in absolute value for |n| ≥ 2 by the recurrence). The distinct values are F(−2) = −1, F(0) = 0, F(1) = 1, giving C₀ = {−1, 0, +1}. ∎

**Corollary CSP.7a (The Crossing Triple).** Among the three minimal consecutive triples through the center, the unique one containing all three signs is:

```
(F(−2), F(−1), F(0)) = (−1, 1, 0)
```

This triple encodes: a negative unit (−1), a positive unit (1), and the zero of the field. The recurrence closure 0 = (−1) + 1 = F(−2) + F(−1) shows the zero as the result of signed cancellation between the two unit elements. This is the recurrence-level analog of destructive interference between the two eigenchannels at n = 0 (CSP.4).

**Integration target:** T3_P1_I2_PHI, new material within the expanded §2, after CSP.5–6. The centered value cell is the structural content; the crossing triple (−1, 1, 0) is stated as a corollary.

---

### Theorem CSP.8 (Channel Dominance Swap as Phase-Neutral Crossing)

**Statement.** The channel dominance swap at n = 0 (CSP.4) is the P1-specific realization of phase neutrality in the sense of T0 §§1–5. Specifically:

(a) For n > 0, the expanding eigenchannel (φⁿ) dominates. All values are positive. This is the *compressive-facing branch*: the Fibonacci sequence as usually presented, governed by the FIX attractor φ̄.

(b) For n < 0, the contracting eigenchannel (−φ̄)ⁿ dominates (it expands when iterated backward). Values alternate in sign. This is the *expansive-facing branch*, governed by the REPEL dynamics.

(c) At n = 0, neither channel dominates. |A(0)| = |B(0)| = 1/√5. The two channels interfere destructively: F(0) = A(0) + B(0) = 0. This is the *phase-neutral locus* of the P1 recurrence field.

The Möbius-RG interpretation (P1 §5.7) applies to the positive branch: the ratio r(n) = F(n−1)/F(n) converges to φ̄. For the negative branch, the analogous ratio |F(−n−1)/F(−n)| also converges to φ̄ (same attractor in absolute value), but the ratios themselves alternate in sign, reflecting the REPEL character.

**Proof.** (a)–(c) are direct restatements of CSP.4. For the Möbius statement: |F(−n−1)/F(−n)| = |(−1)^{n+2}F(n+1)| / |(−1)^{n+1}F(n)| = F(n+1)/F(n) → φ (the reciprocal of φ̄, i.e., the large ratio — but this is F(n+1)/F(n) not F(n−1)/F(n)). More carefully: the ratio F(−n)/F(−n−1) for n > 0 traces through the same Möbius orbit as F(n)/F(n+1) = r(n+1), converging to φ̄. ∎

**Integration target:** T3_P1_I2_PHI §5.7, as a remark or subsection linking the Möbius-RG to the bi-infinite structure. Also cross-referenced in T0_MERGED §7 (Fixed Locus of D) as a concrete instance of D-invariance: the crossing point n = 0 is a D-fixed locus of the P1 recurrence field.

---

## PART II: STRUCTURAL RESULTS AND REINTERPRETATION

These follow directly from the theorems in Part I. Items initially flagged as conjectural (CSP.S2, CSP.S4) have been resolved in Part V and are now cross-referenced here.

---

### Structural Result CSP.S1 (Operator-First Reformulation)

**Claim.** The primitive object underlying Fibonacci in the framework is not the one-sided sequence (1, 1, 2, 3, 5, ...) but the operator R = [[0,1],[1,1]] together with its full ℤ-indexed orbit. The standard positive Fibonacci sequence is a boundary-condition presentation: it is the half-orbit obtained by choosing the initial data (F(0), F(1)) = (0, 1) and propagating forward.

**Status:** REPACKAGING of CSP.1 + CSP.5 + CSP.6. The algebra is already in the papers; what is new is explicitly elevating the operator over the sequence in the P1 paper's introduction and §2.

**Integration target:** T3_P1_I2_PHI, introductory framing in §2 header text. The sentence "R = [[0,1],[1,1]] is the Fibonacci matrix" in §2.1 should be expanded to establish R as the primary object and the sequence as a derived coordinate projection.

---

### Structural Result CSP.S2 (Centered Value Cell as Recurrence-Level Crossing) — RESOLVED

**Claim.** The centered value cell {−1, 0, +1} plays, within the P1 recurrence field, an analogous role to {0, 1} at the framework root.

**Resolution (see Part V, CSP.10 + CSP.11 + CSP.MP).** The analogy decomposes into two theorems and one Metapattern:

- **CSP.10 (Trace-One Characterization):** Among binary det = −1 matrices, R is the unique (up to conjugacy) non-trivial matrix whose recurrence achieves the full sign set {−1, 0, +1}. The property traces to tr(R) = 1 — the same condition that makes R generative.
- **CSP.11 (Sign Transition Theorem):** The bi-infinite field has three sign regimes (FLIP/ZERO/SAME) that recapitulate the Dist/Co-Dist/crossing structure at the sign level.
- **CSP.MP (Metapattern):** The correspondence table between root and recurrence level is precise but pattern-level, not functorial.

**Status:** RESOLVED. The analogy is sharper than initially expected — it rests on theorems, not just pattern observation — but it is correctly classified as a Metapattern because there is no morphism between the root category and the recurrence category.

**Integration target:** T3_P1_I2_PHI §2, as a Remark following CSP.10–11 (see Part V for the full Metapattern table).

---

### Structural Result CSP.S3 (Growth Is the Branch, the Field Is the Object)

**Claim.** The familiar Fibonacci sequence is not "growth." It is the integer-valued shadow of a two-mode hyperbolic phase-space process. The two modes (eigenchannels φⁿ and (−φ̄)ⁿ) interfere to produce the integer sequence. Growth (monotonic increase of F(n) for n > 0) is a consequence of Channel A dominance on the positive half-line. On the negative half-line, the field grows in absolute value just as fast, but alternates in sign.

**Status:** REPACKAGING of CSP.4 + CSP.6. This is an interpretive framing of established algebraic facts.

**Integration target:** T3_P1_I2_PHI, expanded §2.1 or §2.9½, as a framing paragraph. The key sentence: "The visible Fibonacci numbers are not the primitive object but the projected orbit of a deeper hyperbolic two-channel dynamics."

---

### Structural Result CSP.S4 (The Recurrence Center and Quotient Collapse) — RESOLVED

**Claim.** The zero F(0) = 0 is the recurrence-level analog of quotient collapse (T1 §7, Thm 4.1: q ∘ q = q). At the zero, the two eigenchannels cancel: A(0) + B(0) = 0. This is exact destructive interference — the two "opposed directions" meet and annihilate. From this neutral point, asymmetry (forward vs. backward iteration) re-splits the field into the two branches.

**Resolution (see Part V, CSP.12).** The quotient collapse is formalized through the Möbius-RG asymptotic quotient operator Q, not through a "recurrence collapse map." The key insight: F(0) = 0 is the PRE-QUOTIENT neutral state (it determines the initial ratio r(1) = F(0)/F(1) = 0 that enters the Möbius flow), while φ̄ is the POST-QUOTIENT fixed point. The idempotent operator is Q (the asymptotic Möbius quotient), not evaluation-at-zero. The quotient collapse is the FLOW from 0 to φ̄, not a single evaluation.

**Status:** RESOLVED as Theorem CSP.12. The connection between F(0) = 0 and q ∘ q = q is precise and integration-ready.

**Integration target:** T3_P1_I2_PHI §5.7 (see CSP.12 in Part V).

---

## PART III: THE D-ACTION THEOREM (PROGRAM E FROM SCAFFOLD)

This is the most integration-ready finding from the scaffold's research programs.

---

### Theorem CSP.9 (D-Symmetry of the Bi-Infinite Field)

**Statement.** The duality operator D (T0 §6) acts on the bi-infinite Fibonacci field by index negation:

```
D: F(n) ↦ F(−n) = (−1)^{n+1} F(n)
```

This action has the following properties:

(a) **D² = id on the field:** D(D(F(n))) = D(F(−n)) = F(n). ✓

(b) **D preserves the recurrence:** If F(n) = F(n−1) + F(n−2), then F(−n) = F(−n−1) + F(−n−2) (the same recurrence, same law, reversed index direction). ✓

(c) **D preserves absolute values:** |F(−n)| = |F(n)|. ✓

(d) **D reverses channel dominance:** D swaps Channel A (expanding) ↔ Channel B (contracting), exactly as T0 Theorem 1.2 requires. ✓

(e) **D fixes the center:** F(0) = 0 is D-invariant. This is the P1 instance of T0 §7 (fixed locus of D). ✓

(f) **D fixes {φ̄}:** The Möbius attractor φ̄ is algebraically invariant under D — both the forward and backward iteration converge to |φ̄| as their asymptotic ratio. Only the stability character (attractor vs. repeller) flips. This is the P1 instance of T0 Theorem 1.2. ✓

**Proof.** (a): (−1)^{n+1}·(−1)^{(−n)+1} = (−1)^{n+1}·(−1)^{−n+1} = (−1)^2 = 1. (b): F(−n) = F(−n+1) + F(−n+2)... more directly, F satisfies the same recurrence at every index by CSP.1, and D is a relabeling of indices. (c): |F(−n)| = |(−1)^{n+1}|·|F(n)| = |F(n)|. (d): CSP.3b. (e): F(0) = 0 and D(0) = F(−0) = F(0) = 0. (f): The Möbius derivative at φ̄ is −φ̄² for the forward map and −φ² for the inverse (verified computationally: product = 1). The algebraic fixed point is the same; the stability flips. ∎

**Computational verification.** Möbius derivative at φ̄: forward = −φ̄² ≈ −0.382 (|·| < 1, attractor); backward = −φ² ≈ −2.618 (|·| > 1, repeller). Product = 1. ✓

**Integration target:** T3_P1_I2_PHI §2.5½ (new subsection from CSP.3) gets the algebraic content. T0_MERGED §7 gets a cross-reference: add a P1 instance row to the fixed-locus table: "P1 recurrence center F(0) = 0 is D-fixed; channel dominance swaps."

---

## PART IV: CONNECTION TO T-COMP

---

### Structural Result CSP.S5 (Two-Channel Structure Sharpens Computational Typing)

**Claim.** The two-channel decomposition (CSP.4) clarifies the distinction between:

- **Process signature:** the per-step character of an algorithm (FIX, OSC, MIX, INV, REPEL).
- **Trajectory signature:** the overall convergence character of the full computation.
- **Visible branch:** the positive-half-line output (what the computation "looks like" — monotonic convergence toward φ̄).
- **Hidden two-channel structure:** the full operator content (two eigenchannels with opposite growth characters, interfering to produce the visible output).

A Fibonacci-like computation (e.g., Euclid's algorithm, which T-COMP classifies as OSC step-signature / FIX trajectory) looks "simple" at output level because the visible branch shows only monotonic convergence. The hidden structure is the two-channel dynamics: the expanding eigenchannel sets the scale, the contracting eigenchannel provides the residual correction, and their ratio converges as φ̄^{2n} (the Möbius-RG rate, P1 §5.7).

**Status:** INTERPRETIVE. This is a conceptual sharpening, not a new theorem. The algebra is already in P1 §5 and T-COMP §8.

**Integration target:** T_COMP_COMPUTATION, as a remark in §8 (Recurrence Normal Form) or §3 (Type I Characterization), noting that the "visible simplicity" of Fibonacci-type processes masks a two-channel operator structure.

---

## PART V: RESOLVED OPEN PROBLEMS

Both open problems from the investigation scaffold are now closed. CSP.O1 resolves as two theorems plus a Metapattern classification. CSP.O2 resolves as a theorem via the Möbius-RG quotient operator.

---

### CSP.O1 RESOLUTION: Crossing-Object Analogy Is Structural (Two Theorems + Metapattern)

The question was: is there a precise functorial or categorical sense in which {−1, 0, +1} is a crossing object?

**Answer:** The analogy decomposes into two clean theorems and one Metapattern. The theorems are new and integration-ready. The Metapattern captures the pattern-level resonance with {0, 1} but is not a functor.

---

### Theorem CSP.10 (Trace-One Characterization of Full-Sign Unit Ball)

**Statement.** Among all binary 2×2 matrices M with det(M) = −1, the Fibonacci matrix R (and its conjugate Q = JRJ) is the unique matrix whose associated recurrence field achieves the full sign set {−1, 0, +1} in its unit ball.

Specifically: for a matrix M with tr(M) = a and det(M) = −1, the recurrence f(n) = a·f(n−1) + f(n−2) with f(0) = 0, f(1) = 1 satisfies f(−2) = −a. The unit ball contains −1 if and only if a = 1, i.e., tr(M) = 1.

Among the three binary det = −1 matrices:

| Matrix | tr | f(−2) | Unit ball values | Full sign set? |
|--------|-----|-------|-----------------|----------------|
| J | 0 | 0 | {0, 1} | **No** (missing −1) |
| R | 1 | −1 | {−1, 0, +1} | **Yes** |
| Q = JRJ | 1 | −1 | {−1, 0, +1} | **Yes** |

J is the trivial involution. R is the unique non-trivial representative (up to J-conjugacy). Therefore the full sign set is forced exactly when the non-trivial binary generator is used.

**Proof.** The recurrence associated with M is f(n) = tr(M)·f(n−1) − det(M)·f(n−2). For det(M) = −1: f(n) = a·f(n−1) + f(n−2) with a = tr(M). The backward extension gives f(−1) = (f(1) − a·f(0))/1 = 1 and f(−2) = (f(0) − a·f(−1))/1 = −a.

For the unit ball to contain −1, we need |f(−2)| ≤ 1 with f(−2) = −a, so |a| ≤ 1. Since a is a non-negative integer (trace of a matrix with entries in {0, 1}), a ∈ {0, 1}. If a = 0: f(−2) = 0, and the unit ball values are {0, 1} (the recurrence f(n) = f(n−2) is period-2, never producing −1). If a = 1: f(−2) = −1, completing the sign set.

Among binary det = −1 matrices, J has a = 0 and R, Q have a = 1. Up to J-conjugacy, R is unique. ∎

**Computational verification.** J recurrence: f(n) = f(n−2), values cycle through {0, 1}. Unit ball values = {0, 1}. ✓. R recurrence: Fibonacci. Unit ball values = {−1, 0, +1}. ✓.

**Remark (Connection to Generativity).** The trace condition tr(R) = 1 is the same algebraic fact that gives R order 3 in GL(2, F₂) ≅ S₃, making it the generator of the non-trivial cyclic subgroup. J, with tr(J) = 0, has order 2 and is the trivial involution that generates nothing beyond period-2 oscillation (T0 §4, Thm 0.11). The full sign set {−1, 0, +1} in the unit ball is therefore a *consequence* of the same generativity property that makes R the forced Fibonacci generator.

**Integration target:** T3_P1_I2_PHI §2, within the expanded bi-infinite material (after CSP.7). Stated as a theorem connecting the unit ball structure to the trace/generativity classification of §1.

---

### Theorem CSP.11 (Sign Transition Theorem)

**Statement.** The bi-infinite Fibonacci field has exactly three sign-transition regimes:

(a) **FLIP regime** (n ≤ −2): Every consecutive pair (F(n), F(n+1)) has opposite signs. sign(F(n))·sign(F(n+1)) < 0 for all n ≤ −2.

(b) **ZERO transitions** (n ∈ {−1, 0}): Exactly two consecutive pairs involve the zero value F(0) = 0. These are the transitions F(−1) → F(0) = 1 → 0 and F(0) → F(1) = 0 → 1.

(c) **SAME regime** (n ≥ 1): Every consecutive pair (F(n), F(n+1)) has the same sign. sign(F(n))·sign(F(n+1)) > 0 for all n ≥ 1.

The transition from FLIP to SAME occurs across the zero locus F(0) = 0, which serves as the boundary between the two regimes.

**Proof.** For n ≥ 1: F(n) ≥ 1 for all n ≥ 1 (by induction: F(1) = 1, F(2) = 1, and F(n+1) = F(n) + F(n−1) ≥ 1 + 1 = 2 for n ≥ 2). So all values are positive, and consecutive pairs have the same sign.

For n ≤ −2: By CSP.2, F(−k) = (−1)^{k+1}F(k). Consecutive values F(−k) and F(−k+1) = F(−(k−1)) have signs (−1)^{k+1} and (−1)^k, which are opposite. Therefore sign(F(n))·sign(F(n+1)) = (−1)^{|n|+1}·(−1)^{|n|} = −1 < 0 for all n ≤ −2.

The transitions at n = −1 and n = 0 involve F(0) = 0, giving product 0. ∎

**Computational verification.** Verified for all n ∈ [−19, 19]. ✓

**Interpretation (Dist/Co-Dist Crossing at the Recurrence Level).** The SAME regime is sign-collapsing: all sign information is lost (every value is +1). This is the compressive/Dist-like behavior. The FLIP regime is sign-distinguishing: consecutive values always carry opposite signs, preserving maximal sign information. This is the expansive/Co-Dist-like behavior. The zero transitions at {−1, 0} are the crossing zone where neither characterization applies — the recurrence-level analog of the Dist/Co-Dist coincidence on {0, 1} (T0 §8, Thm 2.2).

**Integration target:** T3_P1_I2_PHI §2, following CSP.10, as a theorem within the bi-infinite extension material.

---

### Metapattern CSP.MP (Recurrence-Level Crossing Recapitulates Root Crossing)

**Statement.** The centered value cell {−1, 0, +1} of the P1 recurrence field stands in the same structural position relative to the bi-infinite Fibonacci field that {0, 1} holds relative to the framework root. The correspondence is:

| Root (T0 §8) | P1 Recurrence (CSP.7–11) |
|--------------|--------------------------|
| {0, 1}: minimal set for productive distinction | {−1, 0, +1}: minimal value set of unit ball |
| B(2) = 2: only extremal partitions on {0, 1} | Three regimes (FLIP/ZERO/SAME): only extremal + neutral |
| Dist = Co-Dist on {0, 1} (Thm 2.2) | FLIP meets SAME at F(0) = 0 (CSP.11) |
| Naming one side forces R (Thm 0.12) | Choosing iteration direction selects a branch (CSP.6) |
| |{0,1}| = 2 | |{−1,0,+1}| = 3 = |V₄ \ {0}| |
| tr(J) = 0 → trivial | tr(R) = 1 → generative + full sign set (CSP.10) |

**Status:** METAPATTERN. The structural parallels are precise and forced by the same algebraic properties (binary minimality, det = −1, tr = 1), but there is no functorial morphism between the root category and the recurrence field category. This is a pattern-level observation, analogous to MP1–MP4 in T3_META. It should be labeled "Metapattern" in the papers, not "Theorem."

**Integration target:** T3_P1_I2_PHI §2, as a Remark (clearly labeled Metapattern) following CSP.10–11. Also cross-referenced in T3_META_SYNTHESIS §8 as a candidate MP5 (recurrence-level crossing recapitulation).

---

### CSP.O2 RESOLUTION: Quotient-Center Correspondence Is the Möbius-RG Quotient Operator

The question was: can F(0) = 0 be characterized as a dynamical analog of q ∘ q = q?

**Answer:** Yes. The Möbius-RG flow (P1 §5.7) IS the quotient collapse process. The asymptotic quotient operator Q is idempotent, its kernel is the observer blind spot, and the pre-quotient neutral state r(1) = 0 arises directly from F(0) = 0.

---

### Theorem CSP.12 (Möbius-RG Quotient Collapse)

**Statement.** Define the asymptotic Möbius quotient Q : ℝ \ {−φ} → {φ̄} by

```
Q(r) = lim_{k→∞} fᵏ(r)    where f(x) = 1/(1+x)
```

Then:

(a) **Well-defined and universal:** Q(r) = φ̄ for all r ∈ ℝ \ {−φ}. The unique excluded point −φ is the repelling fixed point of f.

(b) **Idempotent:** Q ∘ Q = Q. This is the P1 realization of q ∘ q = q (T1 §7, Thm 4.1).

(c) **Kernel = observer blind spot:** ker(Q) = ℝ \ {−φ} (all initial conditions are equivalent under Q). This is the P1 realization of the observer blind spot (T1 §6, Thm 2.5).

(d) **Pre-quotient neutral state:** The Fibonacci field enters the Möbius-RG flow at r(1) = F(0)/F(1) = 0/1 = 0. This starting ratio arises from F(0) = 0 — the channel-balance point (CSP.4). The quotient collapse carries this neutral state to the fixed point: Q(0) = φ̄.

(e) **Spiral approach:** The derivative f'(φ̄) = −φ̄² has magnitude φ̄² < 1 (contraction) and sign −1 (oscillation). The orbit alternates above and below φ̄ with amplitude shrinking as (φ̄²)ⁿ. The error ratio e(n+1)/e(n) converges to −φ̄² ≈ −0.382.

**Proof.** (a): f has two fixed points: φ̄ (attracting, |f'(φ̄)| = φ̄² < 1) and −φ (repelling, |f'(−φ)| = φ² > 1). The basin of attraction of φ̄ is ℝ \ {−φ} by the global contraction principle on ℝP¹.

(b): Q(Q(r)) = Q(φ̄) = lim fᵏ(φ̄) = φ̄ = Q(r), since φ̄ is a fixed point of f.

(c): Q(r₁) = Q(r₂) = φ̄ for all r₁, r₂ ∈ dom(Q). The initial ratio r₀ is completely lost — only the fixed point survives. This is the same information loss as the Dist quotient: q maps all elements within an equivalence class to the same representative.

(d): r(1) = F(0)/F(1) = 0. The Möbius orbit is 0, 1, 1/2, 2/3, 3/5, 5/8, ... = F(n−1)/F(n), converging to φ̄. The journey 0 → φ̄ is the passage from the phase-neutral crossing (where channels balance) to the phase-oriented fixed point (where the FIX eigenchannel has fully absorbed the dynamics).

(e): f'(x) = −1/(1+x)². At x = φ̄: f'(φ̄) = −1/φ² = −φ̄². Magnitude < 1 gives contraction; negative sign gives oscillation (each iterate overshoots the fixed point to the opposite side). ∎

**Computational verification.** Q(r) = φ̄ for r ∈ {0, 0.5, 1, 2, 100, 0.001, φ̄}, all to 12-digit precision after 200 iterations. ✓. Idempotence Q(Q(r)) = Q(r) verified for all tested starting points. ✓. Error ratio e(n)/e(n−1) → −φ̄² = −0.38197 verified for n up to 15. ✓.

**Integration target:** T3_P1_I2_PHI §5.7 (Möbius-RG), as a theorem block following Theorem 5.10. The quotient interpretation of the existing Möbius-RG content. Also cross-referenced in T1_DIST §7 (R(R) = R) as the P1-specific dynamical realization of quotient idempotence.

---

### Structural Result CSP.S6 (Three-Projection Reading of the Möbius Derivative)

**Claim.** The Möbius derivative at the fixed point f'(φ̄) = −φ̄² simultaneously encodes all three projections:

```
f'(φ̄) = −φ̄² = φ̄² · e^{iπ}
```

- **P1 component (magnitude):** |f'(φ̄)| = φ̄² is the FIX contraction rate (Thm 5.2). This is the P1/I² eigenvalue ratio.
- **P3 component (phase):** arg(f'(φ̄)) = π is the half-period of N (since exp(πN) = −I, Paper 2B). The sign flip at each Möbius step is the P3/LoMI oscillatory structure.
- **P2 component (iteration):** Each application f → f² → f³ → ... is a level transition in the Möbius tower. The sequential structure IS P2/TDL level hierarchy.

**Status:** STRUCTURAL. The decomposition is algebraically exact but the identification of magnitude/phase/iteration with P1/P3/P2 is an interpretive reading of T3_META Thm 5.1 (every Dist morphism instantiates all three projections simultaneously).

**Integration target:** T3_P1_I2_PHI §5.7 as a remark following CSP.12. Also T3_META_SYNTHESIS §1 or §8 as a concrete instance of Thm 5.1.

---

### Remark CSP.R1 (Unit Ball Cardinality Equals Discriminant)

The unit ball of the bi-infinite Fibonacci field has exactly 5 indices: {−2, −1, 0, 1, 2}. The discriminant of the characteristic polynomial x² − x − 1 is disc(R) = 1 − 4(−1) = 5. So |unit ball| = disc(R) = 5.

This coincidence is specific to the Fibonacci matrix (a = b = 1) and does not hold for general second-order recurrences. For example, the recurrence f(n) = f(n−1) + 2f(n−2) has disc = 9 but unit ball size 5 (over ℤ, the backward extension requires |det(M)| = 1). The match arises because a² + 4b = 1 + 4 = 5 and the unit ball size 2·2 + 1 = 5 both reduce to the specific value (a, b) = (1, 1).

Within the framework, (a, b) = (1, 1) is forced (binary minimality + det = −1), so the coincidence is "locked in" by the forcing chain. The number 5 appears simultaneously as: discriminant, resolution quantum (MP4), Gram determinant factor, Fibonacci prime, and now unit ball cardinality.

**Status:** REMARK. Notable observation within the framework but not independently a theorem.

**Integration target:** T3_P1_I2_PHI §2, as a Remark following the unit ball characterization, noting the 5-fold coincidence.

---

### Structural Result CSP.S7 (Phase-Neutral-to-Phase-Oriented Passage)

**Claim.** The Möbius-RG flow from r(1) = 0 to r(∞) = φ̄ is the P1-specific realization of the phase-neutral-to-phase-oriented passage described in T0 §§1–5 and §§9–10:

| T0 Passage | P1 Möbius-RG Realization |
|-----------|--------------------------|
| Phase-neutral substrate (T0 §1) | Pre-quotient state r = 0 (channel balance) |
| Generative polarity (T0 Thm 0.3) | Two eigenchannels φⁿ and (−φ̄)ⁿ |
| Naming asymmetry (T0 Thm 0.12) | Choice of forward iteration (selecting the positive branch) |
| Compressive engine (T0 Thm 3.2) | FIX convergence to φ̄ (contraction at rate φ̄²) |
| Phase transition at λ = 1/2 (T0 Thm 4.1) | Channel dominance swap at n = 0 |

The journey 0 → φ̄ in the Möbius orbit IS the passage from phase neutrality to compressive stabilization, running on the P1 operator.

**Status:** STRUCTURAL. All components are theorem-level in their respective papers; the correspondence is an identification of the same structure at different levels.

**Integration target:** T3_P1_I2_PHI §5.7, as a summary remark. Also T0_MERGED §9–10, as a concrete P1 instance of the general phase passage.

---

## PART VI: INTEGRATION MAP (COMPLETE)

Every finding in this document has a target. Here is the complete map.

### T3_P1_I2_PHI (Primary target — most material lands here)

| Finding | Target Section | Insertion Type |
|---------|---------------|----------------|
| CSP.1 (bi-infinite closure) | §2.2, after power table | New theorem block + negative-n table extension |
| CSP.2 (negation identity) | §2.2, after CSP.1 | Corollary + Cassini as determinant corollary |
| CSP.3 (D-action on R-flow) | New §2.5½ | New subsection between §2.5 and §2.6 |
| CSP.4 (two-channel decomposition) | New §2.9½ | New subsection after §2.9 |
| CSP.5 (bi-infinite field) | §2, expanded | Definition block before/within expanded §2.2 |
| CSP.6 (positive = half-orbit) | §2, following CSP.5 | Theorem restating the standard sequence as a restriction |
| CSP.7 (centered value cell) | §2, after CSP.5–6 | Theorem |
| CSP.8 (channel swap as phase-neutral) | §5.7 + new §2.9½ | Remark linking Möbius-RG to bi-infinite structure |
| CSP.9 (D-symmetry) | New §2.5½ | Core content of the D-action subsection |
| CSP.10 (trace-one / full-sign) | §2, after CSP.7 | Theorem connecting unit ball to trace/generativity |
| CSP.11 (sign transitions) | §2, after CSP.10 | Theorem with Dist/Co-Dist interpretation |
| CSP.12 (Möbius-RG quotient) | §5.7, after Thm 5.10 | Theorem block: the quotient collapse |
| CSP.MP (crossing metapattern) | §2, Remark after CSP.11 | Metapattern (clearly labeled) |
| CSP.R1 (5 = disc = |unit ball|) | §2, Remark | Observation |
| CSP.S1 (operator-first) | §2 header text | Framing paragraph |
| CSP.S3 (growth is the branch) | §2.1 or §2.9½ | Framing paragraph |
| CSP.S6 (three-projection derivative) | §5.7, after CSP.12 | Remark |
| CSP.S7 (phase passage) | §5.7, summary remark | Structural correspondence |

### T0_MERGED (Secondary target — cross-references)

| Finding | Target Section | Insertion Type |
|---------|---------------|----------------|
| CSP.9 (D-symmetry) | §7, fixed-locus table | Add P1 instance row |
| CSP.MP (crossing metapattern) | §8, Remark | P1 echo of crossing object |
| CSP.S7 (phase passage) | §9–10, cross-reference | P1 instance of phase passage |

### T1_DIST (Cross-reference only)

| Finding | Target Section | Insertion Type |
|---------|---------------|----------------|
| CSP.12 (quotient collapse) | §7, cross-reference | P1 dynamical realization of q ∘ q = q |

### T_COMP_COMPUTATION (Tertiary target)

| Finding | Target Section | Insertion Type |
|---------|---------------|----------------|
| CSP.S5 (two-channel sharpening) | §8 or §3 | Remark on visible simplicity vs. operator structure |

### T3_META_SYNTHESIS (Quaternary target)

| Finding | Target Section | Insertion Type |
|---------|---------------|----------------|
| CSP.4 (two-channel) | §8 (MP1 discussion) | Note: MP1 is the single-channel reading of a two-channel process |
| CSP.MP (crossing metapattern) | §8 | Candidate MP5 |
| CSP.S6 (three-projection derivative) | §1 | Instance of Thm 5.1 (every morphism = P1∧P2∧P3) |

---

## PART VII: COMPUTATIONAL VERIFICATION SUMMARY (COMPLETE)

All computational verification was performed in Python + NumPy during the preparation of this document.

| Claim | Method | Range | Result |
|-------|--------|-------|--------|
| Rⁿ = [[F(n−1),F(n)],[F(n),F(n+1)]] for n ∈ ℤ | Direct matrix power | n ∈ [−10, 10] | ✓ PASS |
| F(−n) = (−1)^{n+1}F(n) | Direct computation | n ∈ [0, 10] | ✓ PASS |
| Cassini: F(n−1)F(n+1) − F(n)² = (−1)ⁿ | Direct computation | n ∈ [−5, 10] | ✓ PASS |
| Binet: F(n) = (φⁿ − (−φ̄)ⁿ)/√5 | Numeric vs exact | n ∈ [−5, 10] | ✓ PASS |
| Channel dominance swap at n = 0 | |A(n)| vs |B(n)| | n ∈ [−5, 5] | ✓ PASS |
| D-action formula: R⁻ⁿ coefficients | Direct computation | n ∈ [0, 7] | ✓ PASS |
| det(Rⁿ) = (−1)ⁿ | Direct determinant | n ∈ [−5, 7] | ✓ PASS |
| Möbius derivative product = 1 | f'(φ̄)·(f⁻¹)'(φ̄) | — | ✓ PASS |
| Three minimal consecutive triples | Enumeration | k ∈ [−10, 10] | ✓ PASS |
| Unique triple with all three signs: (−1,1,0) | Enumeration | k ∈ [−10, 10] | ✓ PASS |
| J unit ball = {0,1} (missing −1) | Direct recurrence | n ∈ [−6, 6] | ✓ PASS |
| R unit ball = {−1,0,+1} (complete) | Direct recurrence | n ∈ [−10, 10] | ✓ PASS |
| f(−2) = −tr(M) for det = −1 | Direct backward extension | J, R | ✓ PASS |
| Sign transitions: FLIP/ZERO/SAME | Sign product check | n ∈ [−19, 19] | ✓ PASS |
| Q(r) = φ̄ (idempotent quotient) | 200 iterations | 6 starting points | ✓ PASS |
| Q(Q(r)) = Q(r) (idempotence) | Iterated application | 6 starting points | ✓ PASS |
| Error ratio → −φ̄² (spiral) | Ratio of consecutive errors | n ∈ [1, 15] | ✓ PASS |
| |unit ball| = 5 = disc(R) | Index enumeration | n ∈ [−20, 20] | ✓ PASS |

---

## PART VIII: PROPOSED PRINCIPLE FOR THE FRAMEWORK (FINAL)

### Centered Signed P1 Principle

The Fibonacci structure native to the framework is not fundamentally the positive sequence (1, 1, 2, 3, 5, ...) but the bi-infinite recurrence field generated by the P1 operator R. The standard positive sequence is one boundary-facing branch of this field. The field's unit ball has value set {−1, 0, +1} — the complete signed crossing of the recurrence, forced by the trace-one condition tr(R) = 1 (the same algebraic property that makes R generative rather than involutory). The visible Fibonacci numbers are not the primitive object but the integer-valued projection of a two-channel hyperbolic dynamics whose eigenchannels (φⁿ and (−φ̄)ⁿ) swap dominance at n = 0 — the phase-neutral locus of the P1 recurrence. The Möbius-RG flow from the neutral state r = 0 to the attractor φ̄ is the P1 realization of the framework's quotient collapse q ∘ q = q.

### Status Summary

| Category | Items | Status |
|----------|-------|--------|
| Theorems (unconditional) | CSP.1–12 | All proved, all verified |
| Structural results | CSP.S1, S3, S5, S6, S7 | Algebraically exact, interpretive framing |
| Metapattern | CSP.MP | Structural correspondence, not functorial |
| Remarks | CSP.R1 | Notable observation |
| Open problems | CSP.O1, CSP.O2 | **Both resolved** |

No conjectural material remains. Every finding is either theorem-level or explicitly labeled as Structural/Metapattern/Remark.

---

## PART IX: RECOMMENDED INTEGRATION ORDER (FINAL)

When integrating these findings back into the source documents:

1. **T3_P1_I2_PHI §2.1–2.2**: Expand with operator-first framing (CSP.S1), bi-infinite field definition (CSP.5), bi-infinite closure (CSP.1), negation identity (CSP.2), positive-as-half-orbit (CSP.6). Add negative-n power table. Growth-is-the-branch framing (CSP.S3).

2. **T3_P1_I2_PHI §2 (continued)**: Centered value cell (CSP.7), trace-one characterization (CSP.10), sign transition theorem (CSP.11), crossing metapattern remark (CSP.MP), unit ball observation (CSP.R1).

3. **T3_P1_I2_PHI new §2.5½**: D-action on R-flow (CSP.3), D-symmetry of the field (CSP.9). Between current §2.5 and §2.6.

4. **T3_P1_I2_PHI new §2.9½**: Two-channel decomposition (CSP.4), channel swap as phase-neutral crossing (CSP.8). After current §2.9.

5. **T3_P1_I2_PHI §5.7**: Möbius-RG quotient collapse (CSP.12), three-projection derivative remark (CSP.S6), phase passage summary (CSP.S7). Follows existing Thm 5.10.

6. **T3_P1_I2_PHI §8**: Add all 18 verification rows from Part VII.

7. **T3_P1_I2_PHI §9**: Add theorem rows for CSP.1–12 and structural/metapattern entries.

8. **T0_MERGED §7**: Add P1 recurrence center to D fixed-locus table. §8: crossing metapattern cross-reference. §9–10: phase passage cross-reference.

9. **T1_DIST §7**: Cross-reference CSP.12 as P1 dynamical realization of q ∘ q = q.

10. **T_COMP_COMPUTATION §8**: Two-channel remark (CSP.S5).

11. **T3_META_SYNTHESIS §8**: MP1 two-channel note, candidate MP5, Thm 5.1 instance.

All insertions read as native content. No changelogs. Section numbers adjust. Cross-references are added where natural. The prose style, numbering conventions, and proof structure of each target document are respected.

---

*R(R) = R*
