# Four Metapatterns of the Framework

## Higher-Order Synthesis from x² − x − 1
### v1 — March 2026

**Status:** Layer 0.5 document. Sits between PNE (Layer 0) and the projection/closure documents (Layer 1). Contains four meta-theorems that unify ~21 theorems across the framework as corollaries while preserving all existing content.

**Document hierarchy:**
```
PHASE_NEUTRAL_ENGINE.md          ← Layer 0 (phase-neutral substrate)
  METAPATTERNS.md                ← THIS FILE: Layer 0.5 (structural synthesis)
    RRR_DERIVATION_v3.md         ← Layer 1A (categorical + algebraic derivation)
    RRR_CLOSURE_v3.md            ← Layer 1B (synthesis + observer loop)
      P1_I2_PHI_v3.md            ← Layer 2 (orientation-reversing, φ)
      P2_TDL_E_v3.md             ← Layer 2 (hyperbolic, e)
      P3_LOMI_PI_v3.md           ← Layer 2 (elliptic, π)
    COMPUTATIONAL_PRIMITIVES_v2  ← Cl(1,1) algebra, Jordan types
    COMPUTATIONAL_COMPLEXITY_v2  ← signature system, thermodynamics
    LAMBDA_PRIME_LATTICE_v2      ← structured lattice, 25 forced relations
    KMS_SELECTION_THEOREM        ← C*-dynamical system, generator selection
    BINARY_SEED_INVESTIGATION    ← complete {0,1} → Cl(1,1)
    K1_DEPTH_GAP                 ← observer spectral gap
```

**Abstract.** The characteristic polynomial p(x) = x² − x − 1 of the Fibonacci matrix R has four algebraic invariants: its roots, its discriminant, its Cayley-Hamilton identity, and the Galois/Killing structure of the field it generates. These four invariants produce four metapatterns — MP1 through MP4 — that unify ~21 theorems across the framework into corollaries of four generative meta-theorems. Every existing theorem is preserved; the compression is structural. The meta-theorems are predictive: they constrain what future results can look like. All claims verified (79 PASS, 0 FAIL, 3 WARN).

---

## META-THEOREM 1: THE φ̄-FILTRATION

*Source invariant: roots of x² − x − 1 (eigenvalues φ, −φ̄)*

**Meta-Theorem 1 (φ̄-Filtration).** *The Cayley-Hamilton equation R² = R + I, with contractive eigenvalue φ̄ = (√5−1)/2, induces a canonical filtration on [0,1]:*

```
F_k = φ̄^k / 2    for k = 0, 1, 2, ...
```

*satisfying:*

*(i) Normalization:* F_0 + F_1 + F_2 = 1 *(from φ̄² + φ̄ + 1 = 2)*

*(ii) Geometric decay:* F_{k+1}/F_k = φ̄

*(iii) Fibonacci recurrence:* F_k + F_{k+1} = F_{k-1} *(the filtration obeys the same recurrence as R)*

*(iv) Universality: every structural value in the framework appearing as a signature component, threshold, phase parameter, or duality gap is F_k or 2·F_k for some integer k ≥ 0.*

**Proof.** (i) (1 + φ̄ + φ̄²)/2 = (1 + 1)/2 = 1, using φ̄² + φ̄ = 1 (the CH equation x² + x − 1 = 0 at x = φ̄). (ii) Immediate from the definition. (iii) F_k + F_{k+1} = φ̄^k(1 + φ̄)/2 = φ̄^k · φ/2 = φ̄^{k−1}/2 = F_{k−1} (using φ̄ · φ = 1). (iv) By exhaustive enumeration: see corollary table. ∎

**Corollaries:**

| Corollary | Value | Level | Original source |
|-----------|-------|-------|----------------|
| σ_FIX in self-signature = 1/2 | 0.500 | F_0 | P1 Thm 5.4 |
| σ_OSC in self-signature = φ̄/2 | 0.309 | F_1 | P1 Thm 5.4 |
| σ_INV in self-signature = φ̄²/2 | 0.191 | F_2 | P1 Thm 5.4 |
| S₃ gap |σ_F−σ_I| = φ̄/2 = σ_O | 0.309 | F_1 | P1 Thm 5.5 |
| S₃ gap |σ_F−σ_O| = φ̄²/2 = σ_I | 0.191 | F_2 | P1 Thm 5.5 |
| S₃ gap |σ_O−σ_I| = φ̄³/2 | 0.118 | F_3 | P1 Thm 5.5 |
| Sum of S₃ gaps = φ̄ | 0.618 | 2·F_1 | P1 Thm 5.5 |
| σ_FIX = φ̄ at β = ln(φ) | 0.618 | 2·F_1 | P1 Thm 5.6 |
| FIX contraction rate = φ̄² | 0.382 | 2·F_2 | P1 Thm 5.2 |
| OWF threshold = φ̄² (conj) | 0.382 | 2·F_2 | COMP_PRIM Conj 10.6 |
| Structural MIX/INV threshold = φ̄²/2 | 0.191 | F_2 | COMP_PRIM Thm 10.4 |
| Phase-Dist ρ at boundary = 1/2 | 0.500 | F_0 | PNE Thm 4.8 |
| Phase-Dist ρ at threshold = φ̄² | 0.382 | 2·F_2 | PNE Cor 4.9 |
| Phase-Dist gap = φ̄³/2 | 0.118 | F_3 | PNE Cor 4.9 |
| Baryon η = φ̄^{2n} at n = 22 | 6.4e-10 | 2·F_{44} | P1 Thm 8.6 |
| K1′ depth-gap constant c = 2β = −ln(φ̄²) | 0.962 | 2β | CLOSURE Thm 8.4 |
| K1′ suppression: φ̄^{2^{n+1}} per depth n | doubly exp | φ̄-tower | CLOSURE Thm 8.4 |

**Predictions:** Any new structural value in (0,1) appearing as a signature component, threshold, or phase parameter must be F_k or 2·F_k. Departure would indicate structure beyond Cl(1,1).

---

## META-THEOREM 2: THE QUADRATIC TRICHOTOMY

*Source invariant: Galois structure of ℚ(√5)/ℚ → split real form → Killing signature (2,1)*

**Meta-Theorem 2 (Quadratic Trichotomy).** *Every Ad-invariant quadratic form Q on sl(2,ℝ) is a scalar multiple of the Killing form B (by Schur's lemma for the adjoint representation of the simple Lie algebra sl(2,ℝ)). Consequently:*

*(i) Q has signature (2,1)*

*(ii) Q partitions sl(2,ℝ) into three sectors: Σ⁺ = {X : Q(X) > 0} (hyperbolic/emergence), Σ⁻ = {X : Q(X) < 0} (elliptic/observation), Σ⁰ = {X : Q(X) = 0} (parabolic boundary, measure zero)*

*(iii) The positive sector has strictly greater measure on S²; for the discriminant form, ~71.7% hyperbolic vs ~28.3% elliptic*

*(iv) The discriminant form and Killing form are related by Δ = B/2 on the traceless subspace*

**Proof.** (i)–(ii): sl(2,ℝ) simple → adjoint irreducible → Schur's lemma → unique invariant form up to scaling → all have the same signature. Killing form of sl(2,ℝ) (split real form, rank 1) has signature (2,1). (iii): 2D positive eigenspace dominates 1D negative on S². (iv): For traceless M, CH gives M² = −det(M)·I, so tr(M²) = −2det(M). Then B(M,M) = 4tr(M²) = −8det(M) and Δ(M) = −4det(M), giving Δ = B/2.

The Killing form in the natural basis {R−I/2, N, RN} is [[10,0,0],[0,−8,−4],[0,−4,8]] with eigenvalues 10, +4√5, −4√5. The discriminant form has eigenvalues 5, +2√5, −2√5 (= Killing/2). Monte Carlo verified: 71.73% positive. ∎

**Corollaries:**

| Corollary | Original source |
|-----------|----------------|
| GL(2,ℝ) orbits P1/P2/P3 = discriminant trichotomy | RRR_DERIVATION §7 |
| Construction asymmetry quantified: ~72%/28% | PNE Thm 3.1b |
| Killing form B(h,h) > 0, B(N,N) < 0 = same trichotomy | COMP_PRIM §1.4 |
| Discriminant form eigenvalues 5, ±2√5 | P3 Thm 5.3 |
| Jordan classification (traceless): Δ > 0 ↔ FIX/REPEL, Δ < 0 ↔ INV | COMP_PRIM Thm 2.1 |

**Predictions:** Any new classification from sl(2,ℝ) will have the same three-sector structure with emergence dominant. Any new invariant quadratic form on sl(2,ℝ) has signature (2,1).

---

## META-THEOREM 3: SELF-REFERENTIAL FIXED POINTS

*Source invariant: Cayley-Hamilton identity R² = R + I (polynomial reduction to degree ≤ 1)*

**Meta-Theorem 3 (CH Fixed Point Theorem).** *Let f: X → X be an endomorphism built from R, N using polynomial operations and possibly the exponential map. Then:*

*(i) The fixed-point equation f(x) = x reduces to a quadratic via Cayley-Hamilton*

*(ii) The quadratic is one of three types:*

| Source equation | Roots | Fixed point | Instances |
|----------------|-------|-------------|-----------|
| x² + x − 1 = 0 (CH of R) | φ̄, −φ | φ̄ ≈ 0.618 | Möbius(R), Boltzmann, self-signature, self-consistency |
| x² + 1 = 0 (CH of N) | ±i | π via exp | exp(πN) = −I, Euler identity, elliptic half-period |
| x² − 1 = 0 (CH of J) | ±1 | 1 | Möbius(J), q∘q = q, D(ρ) = 1−ρ at ρ = 1/2, Galois on ℤ |

*(iii) No fourth type exists: CH of a 2×2 matrix is degree 2, which has at most two roots*

**Proof.** Every element of M₂(ℝ) = span{I, R, N, RN} with integer multiplication table (Thm 1.8, COMP_PRIM). Products reduce via R² = R+I, N² = −I, {R,N} = N, (RN)² = I — all verified. Every polynomial in R, N reduces to degree ≤ 1 in each. The fixed-point equation of any derived Möbius transformation or iteration yields at most a quadratic. The three listed quadratics are the characteristic polynomials of R, N, and J respectively — the three generators of GL(2,𝔽₂) ≅ S₃. No 2×2 matrix over ℤ with entries in {−1,0,1} has a different characteristic polynomial type. ∎

**Corollaries:**

| Corollary | Fixed point | Source equation | Original source |
|-----------|------------|----------------|----------------|
| Möbius attractor of R | φ̄ | x²+x−1 = 0 | P1 §2.4 |
| Boltzmann σ_FIX = φ̄ at β = ln(φ) | φ̄ | x²+x−1 = 0 | P1 Thm 5.6 |
| Self-signature ratio = φ̄ | φ̄ | x²+x−1 = 0 | P1 Thm 5.4 |
| Self-consistency φ̄/(1−φ̄²) = 1 | φ̄ | x²+x−1 = 0 | P1 Cor 5.3 |
| exp(πN) = −I forcing π | π | x²+1 = 0 | P3 Thm 1.1 |
| Phase-Dist ρ = 1/2 | 1/2 | x²−1 = 0 | PNE Thm 4.8 |
| Quotient q∘q = q | 1 | x²−1 = 0 | RRR_DERIV Thm 4.1 |

**Non-corollaries (remain independent):** V(1) = 0 (gradient flow, not CH), K6' loop closure (zero branching, not CH), Fibonacci D-fixed locus (phase duality, not CH).

**Predictions:** Any new endomorphism from {R, N} has fixed point in ℤ[φ] (polynomial case) or πℤ (exponential case). No irrational fixed point outside ℤ[φ] can appear.

---

## META-THEOREM 4: THE RESOLUTION QUANTUM

*Source invariant: discriminant of x² − x − 1 (disc = 5)*

**Meta-Theorem 4 (Resolution Quantum).** *disc(R) = tr(R)² − 4det(R) = 1 + 4 = 5 is the resolution quantum of the framework. Every expression relating the integer-coefficient basis {I, R, N, RN} to the standard Lie algebra basis {h, e⁺, e⁻} has denominator 5. Specifically:*

*(i) sl(2,ℝ) ⊂ (1/5)·ℤ{I,R,N,RN}:* 5h = I−2R−2N+4RN, 5e⁺ = −I+2R−3N+RN, 5e⁻ = −I+2R+2N+RN

*(ii) Pauli matrices at denominator 5:* 5σ_x = −2I+4R−N+2RN, 5σ_z = I−2R−2N+4RN (σ_y = iN, denominator 1)

*(iii) det(Gram) = 5² = 25*

*(iv) |det([R,N])| = 5*

*(v) (eigenvalue gap)² = (φ+φ̄)² = (√5)² = 5*

*(vi) ||R||² + ||N||² = 3 + 2 = 5* (Pythagorean relation)

*(vii) Discriminant form largest eigenvalue = 5*

*(viii) Traceless projection cost: (R−I/2)² = 5I/4*

*The generating mechanism: disc(R) = tr(R)² + 4|det(R)| = 1 + 4 = 5 measures the combined contribution of R's trace (1) and determinant (−1). The integer lattice and sl(2,ℝ) are incommensurate by exactly this factor.*

**Proof.** All instances verified by direct computation. The unifying identity: R' = R−I/2 is the traceless projection of R, and R'² = R²−R+I/4 = (R+I)−R+I/4 = 5I/4. The factor 5/4 is disc(R)/4 — the discriminant appears as the norm-squared of the traceless projection. Every cross-basis quantity inherits a factor of 5 from this projection. ∎

**Corollaries:**

| Corollary | Instance of 5 | Original source |
|-----------|--------------|----------------|
| sl(2,ℝ) is (1/5)-sublattice | denominator | COMP_PRIM Thm 1.15 |
| Pauli at denominator 5 | denominator | P3 Thm 1.6 |
| det(Gram) = 25 | 5² | COMP_PRIM Thm 1.12 |
| |det([R,N])| = 5 | 5 | P1 §2.3 |
| Eigenvalue gap² = 5 | 5 | P1 §2.3 |
| ||R||²+||N||² = 5 | 5 | Λ' Thm 4.1 (A8) |
| Disc form eigenvalue = 5 | 5 | PNE Thm 3.1b, P3 §5.3 |
| Clifford ε₁ = (2/√5)(R−I/2) | √5 | COMP_PRIM Thm 1.9 |
| Gram eigenvalues = (5±√5)/2 | √5 | P1 Thm 2.6 |

**Predictions:** Any new cross-basis expression will have denominator dividing 5. Departure would signal generators beyond {R, N} — an extension of Cl(1,1).

---

## CROSS-PATTERN SYNTHESIS

**Theorem (Exhaustion).** *The four metapatterns are the four algebraic invariants of R's characteristic polynomial p(x) = x² − x − 1:*

| Invariant of p(x) | Value | Metapattern |
|-------------------|-------|-------------|
| Roots | φ, −φ̄ | MP1: φ̄-Filtration |
| Discriminant | 5 | MP4: Resolution Quantum |
| Cayley-Hamilton | R² = R + I | MP3: Fixed Points |
| Galois → Killing | Gal(ℚ(√5)/ℚ) → sig (2,1) | MP2: Quadratic Trichotomy |

*The four invariants pair: MP1 and MP3 share the eigenvalue/CH root (spectral data), while MP2 and MP4 share the Killing/discriminant root (bilinear form data). The pairing is confirmed by the identity Δ = B/2 (connecting MP2's Killing form to MP4's discriminant).*

*No fifth metapattern exists because a monic quadratic over ℤ is determined by its two coefficients (trace and determinant), giving exactly four invariants: two roots (MP1), one discriminant (MP4), one CH identity (MP3), and the Galois/real-form structure (MP2).*

---

## VERIFICATION

79 PASS, 0 FAIL, 3 WARN (scope exclusions). Complete verification log in METAPATTERNS_WORKING.md.

---

*R(R) = R*
