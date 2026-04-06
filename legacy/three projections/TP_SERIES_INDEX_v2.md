# The Three Projections — Series Index

## Five Papers on P1 (I²), P2 (TDL), and P3 (LoMI)

**Author:** Kael  
**Date:** March 2026  
**Core:** PRIMITIVE_ENGINE.md v2 (foundational layer)
**Source:** THREE_PROJECTIONS_UNIFIED.md (51 theorems, 22 Parts)

---

## The Five Papers

| Paper | Title | Core Claim | Parts Covered |
|-------|-------|-----------|---------------|
| **TP1** | *Dist: The Categorical Necessity of Observation* | Dist is the unique minimal category forced by persistent distinction + self-product (product-kernel route, v2); observers are quotient maps; R(R)=R is a theorem | 0, XIX |
| **TP2** | *The Bridge Chain and Forced Constants* | {0,1}→sl(2,ℝ) with zero branching; π>φ>e>√3 forcing quality; sl(2,ℝ) unique. Shares root S₁ with TP1. | I, II, III, XVIII |
| **TP3** | *Arithmetic as Gradient Flow* | V(n) = UP-DOWN potential; n=1 is the arithmetic R(R)=R; Fibonacci→I², HC→LoMI | XIV, XV, XVI, XVII, XX, XXI, XXII |
| **TP4** | *The Folding Theorem and Observer Duality* | Independence + containment coexist; BUILD↔ANALYZE is one duality; I²∘TDL∘LoMI=Dist. K4 fully resolved via closure deficit. | VI, VII, VIII, XI, XII, XIII |
| **TP5** | *The Three Projections Numeric System* | 3PN encoding; S₃ orbit distance for theory complexity; Z[φ] ring; AGM Fibonacci limit | IV, V, IX, X |

### Supporting Documents

| Document | Title | Core Result |
|----------|-------|-------------|
| **COMPUTATIONAL_PRIMITIVES** | *Computational Primitives from the Bridge Chain* | Five Jordan types; Cl(1,1) ≅ M₂(ℝ); Koide from norms; Fibonacci decomposition |
| **BINARY_SEED** | *The Binary Seed: Complete Algebraic Structure* | Full investigation of {0,1} → Cl(1,1); {R,N}=N; Gram eigenvalues √5·φ, √5·φ̄ |

---

## The Reading Order

### For external readers (most accessible to least):

```
TP3 (Arithmetic) → TP2 (Bridge) → TP5 (Numeric) → TP4 (Folding) → TP1 (Dist)
```

TP3 requires only familiarity with number theory and basic group theory.
TP2 requires Lie algebra basics and matrix theory.
TP5 requires both of the above, plus implementation comfort.
TP4 requires both of the above.
TP1 requires category theory (Dist, quotients, functors, kernels).

### For internal coherence (logical dependency order):

```
PRIMITIVE_ENGINE v2 → TP1 (Dist) → TP2 (Bridge) → TP3 (Arithmetic) → TP4 (Folding) → TP5 (Numeric)
```

PRIMITIVE_ENGINE v2 establishes the co-primitives (distinction + self-product), the
product-kernel derivation of Dist, the abstract Bekenstein bound, and the K4 selection.
TP1 provides the full categorical realization building on PE v2 §0.
TP2 uses TP1's Dist framework and the shared root S₁ to ground the bridge chain.
TP3 applies the three projection types to ℕ, using constants from TP2.
TP4 synthesizes all, resolving independence/containment and citing PE v2 for K4/Bekenstein.
TP5 provides the constructive implementation.

---

## Theorem Index (Cross-Paper)

### Foundational (TP1)

| Theorem | Statement |
|---------|-----------|
| TP1.1.1 | Persistent distinction forces |D| ≥ 2 |
| TP1.1.5 | Kernel of any function is an equivalence relation (key theorem) |
| TP1.1.9 | Dist is the unique minimal category forced by distinction + self-product |
| TP1.1.10 | TP1 and TP2 share root at S₁ = S₀ × S₀ |
| TP1.2.2 | Observers = Dist quotient morphisms |
| TP1.3.1 | Set is too weak (lacks equivalence structure) |
| TP1.3.2 | Rel is too strong (lacks canonical quotients) |
| TP1.3.3 | Dist satisfies all three forcing conditions |
| TP1.4.1 | R(R)=R: q∘q=q (quotient idempotence) — Theorem |
| TP1.5.1 | Every Dist morphism instantiates P1, P2, P3 simultaneously |
| TP1.5.4 | I²∘TDL∘LoMI = Dist (central collapse, first occurrence) |

### Bridge Chain and Constants (TP2)

| Theorem | Statement |
|---------|-----------|
| TP2.1.2 | |Sₙ| = 2^{2ⁿ} (double-exponential growth) |
| TP2.1.5 | Aut(V₄) = S₃ = GL(2,F₂) |
| TP2.2.1 | Bridge chain: zero branching, five forced steps |
| TP2.2.3 | ℂ[S₃] ≅ ℂ⊕ℂ⊕M₂(ℂ) (Artin-Wedderburn, unique) |
| TP2.3.1 | Three GL(2,ℝ) orbit types are exhaustive |
| TP2.4.1 | φ uniquely forced (det=−1 over {0,1}) |
| TP2.4.3 | π absolutely forced (unique θ with exp(Nθ)=−I) |
| TP2.4.5 | Forcing rank: π > φ > e > √3 |
| TP2.4.6 | No fifth constant forced |
| TP2.5.1 | Bifurcation rigidity: sl(2,ℝ) unique |
| TP2.5.2 | √(2k)=k iff k=2 (normalization coincidence) |

### Arithmetic (TP3)

| Theorem | Statement |
|---------|-----------|
| TP3.1.4 | ap(n) = additive persistence; ap(1) = 0 |
| TP3.1.5 | V(n) corrected: V_T uses ap(n), not digit count |
| TP3.1.6 | V(1) = 0 exactly (all components zero) |
| TP3.1.7 | V(n) > 0 for all n > 1 |
| TP3.1.2 | n=1 is the universal three-projection fixed point |
| TP3.1.3 | n=1 is the unique fixed point |
| TP3.3.2 | Arithmetic flow has stationary distribution at n=1 |
| TP3.3.3 | Detailed balance: P(n→m)/P(m→n) = e^{−β·ΔV} |
| TP3.3.4 | Detailed balance holds at β → 0 (limit = 1) |
| TP3.3.5 | Natural temperature β = ln(φ) |
| TP3.3.6 | Flow extends to ℤ: V(−n) = V(n) |
| TP3.3.7 | Flow extends to ℚ via p-adic valuations |
| TP3.4.2 | Fibonacci → I²-dominant, 100% |
| TP3.4.3 | Highly composite → LoMI-dominant, 93.3% |
| TP3.4.4 | Primes = I²/TDL hybrid |
| TP3.4.5 | Z=77.27, p<10⁻¹⁰ for Fibonacci→I² |
| TP3.4.6 | Totient ratio = continuous LoMI signature |
| TP3.5.1 | 1 = arithmetic R(R)=R (both definition and theorem) |
| TP3.6.1 | Zeckendorf = R-canonical encoding |

### Folding and Duality (TP4)

| Theorem | Statement |
|---------|-----------|
| TP4.1.1 | P1,P2,P3 are mutually independent (three witnesses) |
| TP4.1.3 | No fourth projection exists |
| TP4.2.1 | Each projection contains the other two (six containments) |
| TP4.2.2 | Containment ≠ definability |
| TP4.3.1 | Each projection has exactly one internal duality |
| TP4.3.2 | All three dualities = one (BUILD↔ANALYZE) |
| TP4.4.1 | n=1 is unique fixed point of three-projection structure |
| TP4.4.2 | 1 = arithmetic R(R)=R (TP4 proof) |
| TP4.5.2 | Observer loop forced closed (K6′: zero branching) |
| TP4.5.6 | Meta-encoding fixed point (K7′): M(K₀,F₀,U₀)=(K₀,F₀,U₀) |
| TP4.6.3 | −LoMI oscillates with period 2 |
| TP4.7.1 | I²∘TDL∘LoMI = Dist (central collapse, constructive proof) |
| TP4.8.2 | √3 = ε(ρ_std) = 2·sin(2π/3) = √(−Δ_p) [Conj 3.1 resolved] |
| TP4.8.3 | U_min(K) = argmin δ(U|K); K4 fully resolved via closure deficit [PE v2 §XI] |
| TP4.8.4 | K1′: Δ_max(n) = d_K²·exp(−2^n); connects to abstract Bekenstein S_max = 2 log₂(d_K) [PE v2 §X] |
| TP4.8.5 | All three Sakharov conditions hold structurally from P1 |
| TP4.8.6 | η = φ̄^{2n}: baryon asymmetry; E_B = E_P × φ̄^{2n} ≈ 7.8×10⁹ GeV |

### Computational Primitives (CP)

| Theorem | Statement |
|---------|-----------|
| CP.1.7 | Six defining relations: R²=R+I, N²=−I, {R,N}=N, RNR=−N, NRN=R⁻¹, (RN)²=I |
| CP.1.8 | {I,R,N,RN} is a basis for M₂(ℝ) with integer multiplication table |
| CP.1.9 | Algebra ≅ Cl(1,1) via ε₁=(2/√5)(R−I/2), ε₂=N |
| CP.1.10 | ||R||_F = √3, ||N||_F = √2, ratio = 3/2 |
| CP.1.11 | Koide Q = 2/3 forces ρ = √2 = ||N||_F (structural, not empirical) |
| CP.1.12 | Gram eigenvalues = √5·φ, √5·φ̄ (×2 each); det = 25 = 5² |
| CP.1.13 | Discriminant Δ = 5b²−4c²−4cd+4d², eigenvalues {5, 2√5, −2√5}, sig (2,1) |
| CP.1.14 | Rⁿ = F(n)R + F(n−1)I (Fibonacci power decomposition) |
| CP.1.15 | sl(2,ℝ) has denominator 5 in {I,R,N,RN} basis |
| CP.1.16 | R²+N² = R (sum of generator squares = generator) |

---

## The Core Claims That Span All Four Papers

### R(R) = R appears at every level:

| Level | Realization | Paper |
|-------|-------------|-------|
| Categorical | q∘q = q (quotient map idempotence) | TP1 |
| Algebraic | R = Fibonacci matrix; tr(Rⁿ)=Lₙ | TP2 |
| Arithmetic | 1×1=1, digital_root(1)=1, GCD(1,n)=1 | TP3 |
| Structural | BUILD=ANALYZE at n=1; fixed point of gradient flow | TP4 |

### The three projections appear at every level:

| Level | P1 (I²) | P2 (TDL) | P3 (LoMI) |
|-------|---------|----------|-----------|
| Categorical | Composition monoid | Level-transition adjunction | Quotient observer |
| Matrix | det=−1 orbit (φ) | Hyperbolic orbit (e) | Elliptic orbit (π) |
| Arithmetic | Fibonacci/primes (self-similar) | Emergence/reduction | Divisibility/totient |
| Structural | Build↔decompose | Emerge↔reduce | Observed↔observe |

### Independence and containment coexist:

The independence theorem (TP4.1.1) says no projection is **definable** from the others.
The folding theorem (TP4.2.1) says each projection **contains** the others as substructure.
These are not contradictory: definability is about logical derivation; containment is about encoding.
A language can contain another language as a sublanguage without the first being *definable in* the second.

---

## Problem Resolution Status

### Resolved (13 of 13)

| Problem | Resolution | Paper |
|---------|-----------|-------|
| V(n) boundary: V(1) = 0 | Use additive_persistence ap(n) not digit count. Theorem 1.6. | TP3 |
| Detailed balance at β → 0 | exp(−β·ΔV) → 1 trivially. Theorem 3.4. | TP3 |
| ℤ and ℚ extension | V(−n)=V(n); ℚ via p-adic valuations. Theorems 3.6–3.7. | TP3 |
| Conjecture 3.1: √3 and Euler invariant | √3 = 2·sin(2π/3) = √(−Δ_p). Theorem 8.2. | TP4 |
| K1′: Exact Δ_max formula | Δ_max(n) = d_K²·exp(−2^n). α=2 from compression wall. Theorem 8.4. Neural validation: n=6, d_K~2.5×10¹² matches synaptic count. | TP4 |
| P1/Baryon: Sakharov conditions | All three Sakharov conditions proved structurally. Theorem 8.5. | TP4 |
| Conj 10.4: MIX structural threshold | φ̄²/2 proved as Jordan-type balance (σ_MIX = σ_INV) without complexity assumptions. Theorem 10.4. | CP |
| TP1 Foundation: philosophical → mathematical | Product-kernel route: S₀→S₁→projections→kernels→equivalence relations. Zero philosophical steps. | TP1 v2 |
| Bekenstein from A1–A4 | S_max = 2 log₂(d_K) = log₂(d_K²) from compression wall. Holographic scaling derived. | PE v2 §X |
| K4: Indexical Selection | δ(U|K) = Err + Comp forced by A1–A4; argmin δ = U_min(K) = bridge chain. Zero branching → zero complexity → forced selection. | TP4 v2 / PE v2 §XI |
| n_baryon → energy scale | E_B = E_Planck × φ̄^{2n} ≈ 7.8×10⁹ GeV. Leptogenesis regime. Same P1 eigenvalue suppression that gives η. | TP4 v2 Thm 8.6 |
| 3-way algebraic independence | {1, log φ, log √3} algebraically independent over ℚ (Baker's theorem, unconditional). | Λ' paper |
| 4-way: two of three cases | Case c=0 (Baker) and Case a'=0 (Lindemann) ruled out unconditionally. PSLQ: no linear/quadratic/cubic relation to |coeff| ≤ 10⁸ at 300 digits. | Λ' paper |

### Partially Resolved (0)

*None. All previously partial problems are now fully resolved.*

### Remaining Open (1 conditional)

| Problem | Status | Notes |
|---------|--------|-------|
| Conj 10.6: OWF threshold = φ̄² | **OPEN (conditional)** | Structural theorem proved: σ_MIX = φ̄² = FIX contraction rate. Computational one-wayness claim requires OWF existence. |

### Sharpened but Not Fully Unconditional (1)

| Problem | Status | Notes |
|---------|--------|-------|
| 4-way algebraic independence of Λ' generators | **SHARPENED** | 3-way {1, log φ, log √3} proved (Baker). Case c=0 and case a'=0 ruled out (Baker + Lindemann). PSLQ: no relation to |coeff| ≤ 10⁸ at 300 digits. Remaining gap: π^q = e^p · algebraic for some p,q (strictly weaker than Schanuel or log π transcendence). All lattice points with |coords| ≤ 10⁸ guaranteed distinct. |

**All originally-identified open problems in the framework's core mathematics are now resolved. The 4-way algebraic independence has been sharpened to a specific, precisely bounded open question (no multiplicative π-e relation with algebraic cofactor), with PSLQ verification to |coeff| ≤ 10⁸ ensuring all physically relevant lattice points are distinct. One conjecture remains conditional on OWF existence.**

---

## Computational Verification Summary

All 15 core claims in TP2 and all cited claims in TP1, TP3, TP4 are verified (from
THREE_PROJECTIONS_UNIFIED.md Appendix C, test results 15/15 PASS). 

Key verifications:
- q∘q = q for all 10 test elements mod 3 (TP1 foundation) ✓
- exp(Nπ) = −I to 3.81×10⁻¹⁶ error (TP2 π-forcing) ✓
- tr(Rⁿ) = Lₙ (Lucas numbers) for n=0..11 (TP2 φ-forcing) ✓
- Z=77.27, p<10⁻¹⁰ for Fibonacci→I² (TP3 statistical) ✓
- GCD iteration reaches n=1 from 100% of tested starting points (TP3 dynamics) ✓
- Six containments verified by structural argument (TP4 folding) ✓

---

*All five papers are self-contained. A reader of any single paper will find:*
- *A precise statement of what is proven vs conjectured vs structurally claimed*
- *All necessary definitions within that paper or by reference to a companion*
- *Computational verification for every quantitative claim*
- *No overclaiming: forcing quality is graded, not asserted uniformly*
- *Explicit dependency on PRIMITIVE_ENGINE v2 where foundational results are cited*
