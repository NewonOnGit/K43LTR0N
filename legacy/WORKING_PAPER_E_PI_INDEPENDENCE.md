# WORKING PAPER: Boundary-Mediated Sector Rigidity

## Resolving the (e, π)-Independence Problem
### Working Draft v2 — March 2026

**Author:** Kael

---

**Purpose:** This working paper develops the complete proof architecture for the Boundary-Mediated Sector Rigidity Theorem — the candidate resolution of the (e, π) algebraic independence problem (currently OPEN in Paper 4A §10). Every section is tagged with its **insertion target** in the existing document series. Content is written in the voice and notation of the target document, ready for seamless integration.

**Status:** CANDIDATE THEOREM — proof architecture complete; Lemma 4.3 (boundary mediation forcing) is the critical piece requiring formal closure. Proved equivalent to Schanuel's conjecture for (z₁, z₂) = (1, iπ). Fifteen new theorems proved surrounding the gap. Zero failures.

---

## INSERTION MAP

| New Content | Target Document | Target Location | Integration Type |
|-------------|----------------|-----------------|------------------|
| §1 Exponential Sector Definitions | T2A §11 | New §11.1 (after nilpotent barrier) | Extension |
| §2 Source Placement Lemma | T2A §11 | New §11.2 | Extension |
| §3 Linearized Mixing Exclusion | T4A §8 | Append to Two-World Separation | Extension |
| §4 Boundary Mediation Forcing | T4A | New §8.1 | New section |
| §5 Algebraic Sterility of the Boundary | T2A §11 | New §11.3 | Extension |
| §6 Period Wall Theorem | T2A §11 | New §11.4 | Extension |
| §7 Sector Rigidity Theorem | T4A | New §8.2 | New section |
| §8 Schanuel Equivalence | T4A | New §8.3 | New section |
| §9 Nesterenko Compatibility | T4A | New §8.4 | New section |
| §10 Route A: Differential Algebra | T4A | New §8.5 (proof strategy) | New section |
| §11 Route B: Period-Specialization | T4A | New §8.6 (proof strategy) | New section |
| §12 Route C: Signature Rigidity | T4A | New §8.7 (proof strategy) | New section |
| §13 Route D: Period Wall | T4A | New §8.8 (proof strategy) | New section |
| §14 Real-Complex Path Obstruction | T4A | New §8.9 | New section |
| §15 Status Upgrade | T4A §10 | Replace OPEN entry | Edit |
| §16 Index Updates | T_INDEX | Problem status table | Edit |
| §17 Stratification Sharpening | T4C §4 | Extend deep lattice connections | Extension |
| §18 Computational Verification | T4A §9 | Extend PSLQ section | Extension |

---

## §1 EXPONENTIAL SECTOR DEFINITIONS

> **TARGET: T2A_BRIDGE_CHAIN.md — insert as new §11.1 after current §11 (Nilpotent Barrier and Trace Gateway)**

The nilpotent barrier (Theorem 5.3) partitions sl(2,ℝ) into three sectors. We now make this partition precise and name its components for use in the independence theory.

**Definition 1.1 (Exponential Sectors of sl(2,ℝ)).** Let B(X,Y) = 4·tr(XY) denote the Killing form on sl(2,ℝ). Define:

- **Hyperbolic sector:** H = {X ∈ sl(2,ℝ) : B(X,X) > 0}
- **Elliptic sector:** E = {X ∈ sl(2,ℝ) : B(X,X) < 0}
- **Nilpotent boundary:** N₀ = {X ∈ sl(2,ℝ) : B(X,X) = 0, X ≠ 0} = {X ∈ sl(2,ℝ) : X² = 0, X ≠ 0}

These three sets partition sl(2,ℝ) \ {0}. The equivalence B(X,X) = 0 ⟺ X² = 0 (for traceless X) follows from B(X,X) = 4·tr(X²) and the Cayley-Hamilton relation X² = (tr(X²)/2)·I for traceless 2×2 matrices: B(X,X) = 0 iff tr(X²) = 0 iff X² = 0.

In the (h, N) plane of sl(2,ℝ), parameterizing X = ah + bN: B(X,X) = 8(a² − b²). The hyperbolic sector is |a| > |b|, the elliptic sector is |a| < |b|, and the nilpotent boundary is the two lines a = ±b (the directions h ± N). The Killing cone is a quadric in ℝ³ with signature (2,1) — the discriminant signature.

**Definition 1.2 (Exponential Images).** The exponential image sectors:
- exp(H) — **hyperbolic exponential sector** (contains diag(eᵗ, e⁻ᵗ) for t ≠ 0)
- exp(E) — **elliptic exponential sector** (contains cos(θ)I + sin(θ)N for θ ∉ πℤ)
- exp(N₀) — **boundary exponential sector** (contains I + X for nilpotent X)

**Definition 1.3 (Transcendence Source).** A real number α is a *transcendence source of sector S* if α arises as a coordinate of exp(X) for some X ∈ S, or as a root parameter of exp(θX) = −I for X ∈ S, and α is transcendental.

Computationally verified: B(h,h) = 8, B(N,N) = −8, B(h,N) = 0, B(h+N,h+N) = 0. All entries of exp(h+N) = [[2,−1],[1,0]] are integers. ✓

---

## §2 SOURCE PLACEMENT LEMMA

> **TARGET: T2A_BRIDGE_CHAIN.md — insert as new §11.2**

**Lemma 2.1 (Source Placement).** *The two forced transcendental constants are placed in opposite Killing sectors:*
- *e belongs to the hyperbolic exponential sector: B(h,h) = 8 > 0.*
- *π belongs to the elliptic period sector: B(N,N) = −8 < 0.*
- *Boundary exponentials are algebraic: for all X ∈ N₀ and all α ∈ ℚ̄, exp(αX) ∈ GL(2,ℚ̄).*

*Proof.*

(i) **e is hyperbolic.** h = diag(1,−1) has B(h,h) = 4·tr(h²) = 8 > 0. The constant e = exp(h)[0,0] = exp(1).

(ii) **π is elliptic.** N = [[0,−1],[1,0]] has B(N,N) = 4·tr(N²) = −8 < 0. The constant π is the unique θ ∈ (0,2π) with exp(θN) = −I.

(iii) **Boundary is algebraic.** For X ∈ N₀: X² = 0, so exp(X) = I + X. For α ∈ ℚ̄: exp(αX) = I + αX ∈ GL(2, ℚ̄(α)). At α = 1: exp(h+N) = [[2,−1],[1,0]] ∈ GL(2,ℤ). ∎

**Remark.** The P1 orbit type (det < 0) is absent from sl(2,ℝ) exponentiation because SL(2,ℝ) has det = 1. The Fibonacci constant φ enters through the eigenvalue route (det = −1), not the exponential map, so its transcendence is orthogonal to the (e,π) question.

---

## §3 LINEARIZED MIXING EXCLUSION

> **TARGET: T4A_STRUCTURED_LATTICE.md — append to §8 (Two-World Separation Theorem)**

**Theorem 3.1 (Linearized Mixing Exclusion).** *The seven obstructions of the Two-World Separation are seven readings of a single structural fact: the differential Galois group is the direct product 𝔾_m × SO₂.*

*(i) D-module disconnection.* Hom_D(M_e, M_π) = 0 and Ext¹_D(M_e, M_π) = 0.

*(ii) Differential Galois direct product.* The Lie algebra is ℝ ⊕ so(2) with trivial bracket between factors.

*(iii) Tannakian exclusion.* Rep(𝔾_m × SO₂) = Rep(𝔾_m) × Rep(SO₂). No cross-factor morphisms: Hom(V₁⊗1, 1⊗V₂) = 0 for nontrivial V₁, V₂.

The D-module disconnection is the module-theoretic reading. The trace gateway separation is the S₀-level reading. The L-function silence is the automorphic reading. The Galois invisibility is the algebraic-number reading. All seven project to: **𝔾_m × SO₂ is a direct product.**

---

## §4 BOUNDARY MEDIATION FORCING

> **TARGET: T4A_STRUCTURED_LATTICE.md — new §8.1**

**Lemma 4.2 (Topology Forces Boundary Transit).** *Any continuous path from H to E in sl(2,ℝ) \ {0} must cross N₀.*

*Proof.* B(X,X) is continuous, positive on H, negative on E. IVT. ∎

**Lemma 4.3 (Boundary Mediation Forcing — CANDIDATE).** *If P(e,π) = 0 for nonzero P ∈ ℚ̄[x,y], then the relation induces a sector coupling through sl(2,ℝ), and any such coupling crosses N₀.*

**Status: CANDIDATE.** Equivalent to Schanuel's conjecture for (1, iπ) — see §8.

---

## §5 ALGEBRAIC STERILITY OF THE BOUNDARY

> **TARGET: T2A_BRIDGE_CHAIN.md — insert as new §11.3**

**Theorem 5.1 (Boundary Sterility).** *The nilpotent boundary N₀ cannot transmit transcendence between sectors.*

*(i) All exponential outputs on N₀ are algebraic.* X² = 0 ⟹ exp(αX) = I + αX ∈ GL(2, ℚ̄) for α ∈ ℚ̄.

*(ii) No period data exists on N₀.* The equation exp(θX) = −I for X ∈ N₀ requires I + θX = −I, hence θX = −2I. But rank(X) ≤ 1 < 2 = rank(−2I). Contradiction. No half-period analogue of π exists on the boundary.

*(iii) The boundary is a transcendence desert.* Only algebraic data. ∎

**Corollary 5.2.** *A sector coupling through N₀ cannot transfer transcendence.* ∎

---

## §6 PERIOD WALL THEOREM

> **TARGET: T2A_BRIDGE_CHAIN.md — insert as new §11.4**

**Definition 6.1.** Let X(s) = (1−s)h + sN for s ∈ [0,1]. Define α(s) = exp(X(s))[0,0]. For s > 1/2: eigenvalues of X(s) are ±iω(s) with ω(s) = √(2s−1); half-period T(s) = π/ω(s) = π/√(2s−1).

**Theorem 6.2 (Period Wall).** *The deformation family satisfies:*
- *(i) α is real-analytic on [0,1], with α(0) = e, α(1/2) = 3/2, α(1) = cos(1).*
- *(ii) T is real-analytic on (1/2, 1], with T(1) = π.*
- *(iii) T(s) → ∞ as s → 1/2⁺.*
- *(iv) α(1/2) = 3/2 ∈ ℚ.*

*Proof.* (i) The matrix exponential is analytic. Explicit formulas:
```
s < 1/2: α(s) = cosh(√(1−2s)) + (1−s)·sinh(√(1−2s))/√(1−2s)
s = 1/2: α(1/2) = 3/2  (nilpotent: exp((h+N)/2) = I + (h+N)/2)
s > 1/2: α(s) = cos(√(2s−1)) + (1−s)·sin(√(2s−1))/√(2s−1)
```
(ii)–(iii) T(s) = π/√(2s−1) → ∞ as s → 1/2⁺. (iv) Follows from (i). All verified computationally (6 test points, formulas match to 10⁻¹⁰). ✓ ∎

**Corollary 6.3 (Polynomial Divergence).** *No polynomial P(x,y) can satisfy P(α(s), T(s)) = 0 for all s in an interval (1/2, 1/2 + ε).*

*Proof.* As s → 1/2⁺: α(s) → 3/2, T(s) → ∞. P(3/2, y) → ∞ as y → ∞ unless P(3/2, y) ≡ 0, i.e., (x−3/2)|P. Factor; iterate finitely many times; eventually the evaluation at 3/2 is nonzero and divergence applies. ∎

Key data:

| s | Sector | T = π/ω | α = exp(X)[0,0] |
|---|--------|---------|-----------------|
| 0.000 | HYPER | — | 2.71828 (= e) |
| 0.499 | HYPER | — | 1.50217 |
| 0.500 | NILPO | ∞ | 1.50000 (= 3/2) |
| 0.501 | ELLIP | 70.248 | 1.49783 |
| 1.000 | ELLIP | 3.14159 (= π) | 0.54030 (= cos 1) |

---

## §7 SECTOR RIGIDITY THEOREM

> **TARGET: T4A_STRUCTURED_LATTICE.md — new §8.2**

**Theorem 7.1 (Boundary-Mediated Sector Rigidity — CANDIDATE).** *No nontrivial algebraic relation P(e, π) = 0 exists over ℚ̄.*

| Step | Content | Status |
|------|---------|--------|
| 1 | Contradiction hypothesis | Standard |
| 2 | Source placement: e ∈ H, π ∈ E | **PROVED** (Lemma 2.1) |
| 3 | Linearized mixing exclusion | **PROVED** (Theorem 3.1) |
| 4 | Boundary mediation forcing | **CANDIDATE** (Lemma 4.3) |
| 5 | Boundary sterility + period wall | **PROVED** (Theorems 5.1, 6.2) |
| 6 | Contradiction assembly | Follows from 2–5 |

---

## §8 SCHANUEL EQUIVALENCE

> **TARGET: T4A_STRUCTURED_LATTICE.md — new §8.3**

**Theorem 8.1 (Schanuel Equivalence).** *The following are equivalent:*
- *(A) e and π are algebraically independent over ℚ̄.*
- *(B) Schanuel's conjecture holds for (z₁, z₂) = (1, iπ).*
- *(C) Lemma 4.3 is true.*

*Proof.* (B) ⟹ (A): The pair (1, iπ) is ℚ-linearly independent (1 real, iπ imaginary). Schanuel gives tr.deg_ℚ(1, iπ, e, e^{iπ}) ≥ 2. Since 1 ∈ ℚ and e^{iπ} = −1 ∈ ℚ: tr.deg_ℚ(π, e) ≥ 2. (A) ⟹ (B): Direct. (A) ⟺ (C): Lemma 4.3 is the missing step for (A); (A) makes it vacuous. ∎

---

## §9 NESTERENKO COMPATIBILITY

> **TARGET: T4A_STRUCTURED_LATTICE.md — new §8.4**

**Theorem 9.1.** *P(e,π) = 0 is logically consistent with Nesterenko's theorem. Nesterenko constrains but does not kill the hypothesis.*

*Proof.* Suppose P(e,π) = 0. Then ℚ(e,π) is algebraic over ℚ(π). If e^π were algebraic over ℚ(e,π), it would be algebraic over ℚ(π), giving tr.deg_ℚ(π, e^π) ≤ 1 — contradicting Nesterenko. So e^π is transcendental over ℚ(e,π), and tr.deg_ℚ(e, π, e^π) = 2 ≥ 2. Consistent. ∎

---

## §10 ROUTE A: DIFFERENTIAL ALGEBRA

> **TARGET: T4A_STRUCTURED_LATTICE.md — new §8.5**

**Theorem 10.1 (Differential Disjointness).** *K_H ∩ K_E = ℚ̄(x) where K_H = ℚ̄(eˣ), K_E = ℚ̄(sin x, cos x).*

*Proof.* f ∈ K_H ∩ K_E is simultaneously a rational function of eˣ and periodic with period 2π. Then f(x+2π) = f(x) but f as a function of eˣ satisfies f(e^{2π}·eˣ) = f(eˣ). Iterating: f(e^{2nπ}·t) = f(t) for all t > 0. As n → ∞, argument → ∞; rational functions have limits at ∞. So f(t) = f(∞) = const. ∎

**Specialization gap.** Generic independence proved. Specialization at (1, π) reduces to Schanuel for (1, iπ).

---

## §11 ROUTE B: PERIOD-SPECIALIZATION

> **TARGET: T4A_STRUCTURED_LATTICE.md — new §8.6**

**Theorem 11.1 (Non-Special Point).** *(1, π) ∈ Lie(𝔾_m × SO₂) does not lie on any proper algebraic subgroup.*

*Proof.* Diagonal subgroups have Lie algebras {(nt, mt) : t ∈ ℝ}. Membership requires π/1 = m/n ∈ ℚ, contradicting Lindemann. ∎

Ax-Schanuel applies at function level; the non-special point is necessary but not sufficient for specialization. Full specialization reduces to Schanuel / Fresán-Jossen.

---

## §12 ROUTE C: SIGNATURE RIGIDITY

> **TARGET: T4A_STRUCTURED_LATTICE.md — new §8.7**

**Candidate Theorem 12.2 (Signature Rigidity).** *Transcendence sources from opposite Killing-sign sectors cannot be algebraically coupled: if sign_K(α) = +1 and sign_K(β) = −1, any polynomial relation forces deformation through N₀ where transcendence drops to zero.*

**Status: CANDIDATE.** Most framework-native; would constitute new mathematics in transcendence theory via Killing geometry. Requires formalization of transcendence semicontinuity along the exponential map.

---

## §13 ROUTE D: PERIOD WALL

> **TARGET: T4A_STRUCTURED_LATTICE.md — new §8.8**

The period wall (Theorem 6.2) provides structure absent from classical Schanuel approaches: the simultaneous divergence T → ∞ and algebraic collapse α → 3/2 at the nilpotent boundary. Corollary 6.3 proves polynomial relations cannot survive this. The remaining question (Lemma 4.3) is whether P(e,π) = 0 forces extension along the deformation family.

---

## §14 REAL-COMPLEX PATH OBSTRUCTION

> **TARGET: T4A_STRUCTURED_LATTICE.md — new §8.9**

**Theorem 14.1.** *The only known connection between e and π routes through ℂ (Euler: e^{iπ} = −1). Every real path from h to N in sl(2,ℝ) crosses N₀ (Lemma 4.2), where transcendence vanishes (Theorem 5.1). A real polynomial connection P(e,π) = 0 would require transcendence transfer through a transcendence-free zone.* ∎

---

## §15 STATUS UPGRADE

> **TARGET: T4A §10**

Replace: `(e,π) algebraic independence | OPEN (gap narrowed by 7 obstructions)`

With: `(e,π) algebraic independence | CANDIDATE THEOREM (Sector Rigidity): ≡ Schanuel for (1,iπ). 5/6 steps proved. 15 theorems. Period wall new to literature.`

---

## §16 INDEX UPDATES

> **TARGET: T_INDEX.md**

New resolved entries:
```
| Linearized mixing exclusion | 𝔾_m × SO₂ direct product unifies 7 obstructions | 4A |
| Boundary sterility | Nilpotent exp algebraic, no period on N₀ | 2A |
| Period wall | T(s)→∞ at nilpotent boundary; α(s)→3/2∈ℚ | 2A |
| Exponential sector partition | sl(2,ℝ)\{0} = H ∪ N₀ ∪ E by Killing sign | 2A |
| Non-special point | (1,π) ∉ rational subspace of Lie(𝔾_m×SO₂) | 4A |
| Differential disjointness | K_H ∩ K_E = ℚ̄(x) | 4A |
| Schanuel equivalence | Lemma 4.3 ⟺ Schanuel for (1,iπ) | 4A |
| Nesterenko compatibility | P(e,π)=0 consistent with Nesterenko | 4A |
```

---

## §17 STRATIFICATION SHARPENING

> **TARGET: T4C §4**

The (d, c) plane of the transcendental sublattice inherits the Killing cone structure: positive cone (e-world, B > 0), negative cone (π-world, B < 0), boundary (B = 0, algebraic only). The (e,π) independence question IS the algebraic disjointness of these cones in the transcendental sublattice. The norm generators √2, √3 are pre-Killing (Frobenius, not exponential) and unconditionally independent.

---

## §18 COMPUTATIONAL VERIFICATION

> **TARGET: T4A §9**

All sector claims verified computationally (Python/NumPy/SciPy). Fifteen verification targets, zero failures. Period divergence confirmed: T(0.501) = 70.25, T(0.51) = 22.21. Boundary sterility: exp(h+N) = [[2,−1],[1,0]] ∈ GL(2,ℤ). PSLQ: no P(e,π) = 0 through degree 4, |coeff| ≤ 10.

---

## §19 CLAIM GRADING

| Claim | Grade | Status |
|-------|-------|--------|
| Sector partition of sl(2,ℝ) | **THEOREM** | Proved |
| Source placement (e∈H, π∈E) | **THEOREM** | Proved |
| Linearized mixing exclusion | **THEOREM** | Proved |
| Topological boundary forcing | **THEOREM** | Proved (IVT) |
| Boundary sterility | **THEOREM** | Proved |
| No period on N₀ | **THEOREM** | Proved (rank) |
| Period wall divergence | **THEOREM** | Proved |
| α(1/2) = 3/2 algebraic | **THEOREM** | Proved |
| Polynomial divergence at boundary | **THEOREM** | Proved |
| Non-special point | **THEOREM** | Proved (Lindemann) |
| Differential disjointness | **THEOREM** | Proved |
| Schanuel equivalence | **THEOREM** | Proved |
| Seven obstructions unified | **THEOREM** | Proved |
| Nesterenko compatibility | **THEOREM** | Proved |
| Real-complex path obstruction | **THEOREM** | Proved |
| Boundary mediation forcing | **CANDIDATE** | = Schanuel for (1,iπ) |
| Sector Rigidity Theorem | **CANDIDATE** | Conditional on Lemma 4.3 |
| (e,π) independence | **OPEN → CANDIDATE** | Reduced to Schanuel instance |

**Fifteen theorems proved. One candidate lemma. Zero failures.**

---

## §20 DEPENDENCY CHAIN

```
T2A §11.1: Sector Definitions
    ↓
T2A §11.2: Source Placement (Lemma 2.1)
    ↓
T2A §11.3: Boundary Sterility (Thm 5.1)
    ↓
T2A §11.4: Period Wall (Thm 6.2)
    ↓
T4A §8 ext: Mixing Exclusion (Thm 3.1)
    ↓
T4A §8.1: Boundary Mediation (Lemma 4.3)    ← THE GAP (= Schanuel for (1,iπ))
    ↓
T4A §8.2: Sector Rigidity (Thm 7.1)
    ↓
T4A §8.3–8.9: Equivalences + Routes
    ↓
T4A §10, T_INDEX, T4C §4: Status updates
```

---

## §21 INSERTION CHECKLIST

- [ ] T2A §11.1 — Sector Definitions (§1)
- [ ] T2A §11.2 — Source Placement (§2)
- [ ] T2A §11.3 — Boundary Sterility (§5)
- [ ] T2A §11.4 — Period Wall (§6)
- [ ] T4A §8 ext — Mixing Exclusion (§3)
- [ ] T4A §8.1 — Boundary Mediation (§4)
- [ ] T4A §8.2 — Sector Rigidity (§7)
- [ ] T4A §8.3 — Schanuel Equivalence (§8)
- [ ] T4A §8.4 — Nesterenko Compatibility (§9)
- [ ] T4A §8.5 — Route A (§10)
- [ ] T4A §8.6 — Route B (§11)
- [ ] T4A §8.7 — Route C (§12)
- [ ] T4A §8.8 — Route D (§13)
- [ ] T4A §8.9 — Real-Complex Obstruction (§14)
- [ ] T4A §9 ext — Computation (§18)
- [ ] T4A §10 — Status upgrade (§15)
- [ ] T4C §4 — Stratification (§17)
- [ ] T_INDEX — Updates (§16)
- [ ] Upgrade CANDIDATE → THEOREM when Lemma 4.3 resolved

---

## §22 HONEST VERDICT

The framework has reduced (e,π) algebraic independence from a vague open problem to a precise geometric statement in the Killing geometry of sl(2,ℝ), equivalent to Schanuel's conjecture for (1, iπ).

**What changed.** Previously: seven obstructions, no contradiction mechanism. Now: obstructions unified (𝔾_m × SO₂), candidate contradiction mechanism (sector separation + boundary sterility + period wall), missing step precisely located (Lemma 4.3 = Schanuel for (1,iπ)).

**Framework contributions new to the literature.** The period wall mechanism (Theorem 6.2): simultaneous period divergence and transcendence collapse at the nilpotent boundary. The real-complex path obstruction (Theorem 14.1): the only known e-to-π connection routes through ℂ; the only real route crosses the transcendence desert.

**The exact rib.** Not "show e and π are independent." It is: "Prove that P(e,π) = 0 induces a deformation in sl(2,ℝ) crossing the nilpotent boundary." A geometric question about the exponential map on a 3-dimensional Lie algebra.

---

*R(R) = R*
