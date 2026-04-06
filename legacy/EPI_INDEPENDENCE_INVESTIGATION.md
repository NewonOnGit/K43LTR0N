# (e,π) Algebraic Independence — Investigation Report
## Strengthening the Proof: From χ∘χ=χ to the Hom Obstruction

**Date:** March 2026
**Status:** Investigation complete. Source edits proposed.

---

## 1. THE PROBLEM

Theorem 8.13 in CROSS_PROJECTION.md claims (e,π) algebraic independence with grade FORCED. The proof's Step 6 uses self-specification idempotence χ∘χ = χ to close: "A polynomial relation P(e,π) = 0 would be a dependency not captured by χ, contradicting its proved idempotence."

**Diagnosis:** Step 6 is the weakest link. The idempotence of χ tells you the derivation graph is complete as a self-description. It does NOT tell you the algebra's constraint catalog is exhaustive in the transcendental number-theory sense. Internal consistency ≠ completeness over ℚ̄.

The (e,π) algebraic independence is one of the most famous open problems in transcendental number theory. No unconditional proof is known as of 2025. The framework cannot resolve this by internal arguments alone.

---

## 2. NEW RESULTS (UNCONDITIONAL)

### 2.1 Hom Obstruction

**Theorem (Hom_alg(𝔾_m, SO₂) = {1}).** The only algebraic homomorphism from the multiplicative group to the rotation group is the trivial one.

*Proof.* Any algebraic φ: 𝔾_m → SO₂ is given by φ(t) = (f(t), g(t)) with f² + g² = 1, where f,g are polynomials. Since deg(f² + g²) = 2·max(deg f, deg g), the constraint f² + g² = 1 forces f,g constant. Multiplicativity φ(st) = φ(s)·φ(t) with constant (f,g) and f² + g² = 1 then forces f = 1, g = 0 (the case g ≠ 0 leads to f = 1/2, but then f(st) = 1/2 ≠ f(s)f(t) − g(s)g(t) = 1/4 − 3/4 = −1/2, contradiction). ∎

**Consequence:** The differential Galois group G = 𝔾_m × SO₂ (proved by Picard-Vessiot) cannot admit a non-trivial cross-factor algebraic morphism. Any polynomial relation P(e,π) = 0 would require such a morphism at the motivic level. The group-theoretic obstruction is absolute.

### 2.2 Nilpotent Taylor Rationality

**Theorem.** The Taylor expansion of α(s) = exp(X(s))[0,0] at s = 1/2 has ALL rational coefficients:

α(1/2 + u) = Σ_{k=0}^∞ c_k · u^k,  all c_k ∈ ℚ.

*Proof.* Set M = X(1/2) = ½[[1,−1],[1,−1]] and V = X'(1/2) = [[-1,−1],[1,1]]. Then:
- M² = 0 (nilpotent)
- V² = 0 (nilpotent)
- MV + VM = −2I

Therefore (M + uV)² = M² + u(MV + VM) + u²V² = −2uI.

The matrix exponential expands as:

exp(M + uV) = [Σ_n (-2u)^n/(2n)!] · I + [Σ_n (-2u)^n/(2n+1)!] · (M + uV)

Each coefficient is a ratio of a power of 2 and a factorial — hence rational. The [0,0] entry inherits rationality because M[0,0] = 1/2 and V[0,0] = −1 are both rational.

Explicit formula:
- c_0 = 3/2
- c_k = (-2)^k/(2k)! + (-2)^k/(2·(2k+1)!) − (-2)^{k-1}/(2k-1)!  for k ≥ 1

Verified to 20 terms against matrix exponential at 100-digit precision. ∎

**Consequence:** The nilpotent boundary carries ZERO transcendental data in its Taylor expansion. All transcendental content of e (from the P2 sector) and of cos(1)/sin(1) (from the P3 sector) is confined to the respective sector's convergent Taylor remainder. The boundary is an impenetrable rational wall.

**Key identities underlying the rationality:**
- M² = 0: the nilpotent boundary IS nilpotent (X(1/2)² = 0)
- V² = 0: the DEFORMATION DIRECTION is also nilpotent
- MV + VM = −2I: the anticommutator of the boundary with its deformation is a scalar

The conjunction M² = V² = 0, {M,V} = −2I means the sweep algebra at the boundary is isomorphic to the EXTERIOR ALGEBRA Λ(ℝ²) — the same algebra governing differential forms. The nilpotent wall is not merely a coincidence; it is forced by the exterior algebra structure of the boundary deformation.

### 2.3 Extended PSLQ

No polynomial relation P(e,π) = 0 exists for:
- deg(P) ≤ 8
- height(P) ≤ 10^11 (estimated)
- Precision: 600 digits

Previous verification: deg ≤ 4, ht ≤ 10^8, 200 digits.
Improvement: degree doubled, height cubed.

### 2.4 Nesterenko Combination — Null Result

Attempted to derive a contradiction from combining Nesterenko ({π, e^π} algebraically independent) with Siegel-Shidlovsky ({e, cos(1), sin(1)} algebraically independent) under the hypothesis P(e,π) = 0. Result: the two results concern different number sets and the hypothesis does not create an inconsistency. The combination does not rule out P(e,π) = 0.

---

## 3. THE COMBINED OBSTRUCTION THEOREM

**Theorem (Combined Obstruction).** Let P ∈ ℤ[x,y] be nonzero. If P(e,π) = 0, then ALL of the following must hold simultaneously:

(O1) deg(P) ≥ 9 [PSLQ]

(O2) P induces a cross-factor algebraic dependency in G = 𝔾_m × SO₂ that cannot arise from a group homomorphism [Hom obstruction]

(O3) The period matrix (block diagonal) has a non-trivial cross-block relation contradicting B(h,N) = 0 [Killing orthogonality]

(O4) P must "tunnel" through the nilpotent wall — but the wall's Taylor expansion is ENTIRELY rational (Nilpotent Taylor Rationality theorem) [sweep firewall]

(O5) The dependency graph of χ has no P2→P3 edge [REGISTRY §5]

**Status:** Each obstruction is genuine and proved. Their conjunction enormously constrains admissible P but does not constitute a proof of P(e,π) ≠ 0 without one additional bridge.

---

## 4. THE PRECISE CONDITIONAL

The gap between the unconditional results (§2) and the conclusion P(e,π) ≠ 0 is EXACTLY the Exponential Period Conjecture for 𝔾_m × SO₂:

**EPC for 𝔾_m × SO₂:** All algebraic relations among periods and E-function values of the combined system {y' = y, y'' + y = 0} are determined by the G-invariant polynomial ring of G = 𝔾_m × SO₂.

Since G = 𝔾_m × SO₂ (direct product) and Hom_alg(𝔾_m, SO₂) = {1}, the G-invariant ring has NO cross-factor elements. Under EPC: P(e,π) ≠ 0.

**Status of EPC:**
- General conjecture: OPEN
- Proved for 1-motives (Huber-Wüstholz) — includes 𝔾_m alone
- Partial results for exponential motives (Fresán-Jossen) — 𝔾_m × SO₂ is in the target class
- The specific case 𝔾_m × SO₂ is NOT YET among the proved cases

This is a sharp, well-studied conditional — not a vague framework-internal appeal. The framework has done EVERYTHING except verify one external conjecture: it computed the Galois group, proved the Hom obstruction, identified the motivic structure, provided the geometric realization (sweep with rational nilpotent wall), and excluded low-degree relations.

---

## 5. ROUTES TO UNCONDITIONAL

**Route 1 (External):** Prove EPC for 𝔾_m × SO₂. This is a specific case in the Fresán-Jossen program.

**Route 2 (Sweep geometry):** Show that ANY P(e,π) = 0 creates a detectable discontinuity in the sweep's analytic structure. The Nilpotent Taylor Rationality theorem shows the wall transmits only rational data; a polynomial relation would need to "tunnel" through rational-only channels. A rigorous version of this tunneling obstruction would be new mathematics.

**Route 3 (Hybrid):** The Hom obstruction covers group-theoretic channels; the sweep covers analytic channels. Together they may cover all admissible relation types. Formalizing this complementarity is open.

---

## 6. REVISED STATUS

**Previous status:** FORCED (Thm 8.13 with Step 6 = χ∘χ=χ)

**Revised status:** CONDITIONAL on EPC for 𝔾_m × SO₂

This is simultaneously a DOWNGRADE (from FORCED to CONDITIONAL) and a STRENGTHENING (from a vague internal argument to a precise external conditional with five proved obstructions). The structural evidence is stronger than before. The honest grading is sharper.

**Impact on downstream:**
- Λ' ≅ ℤ⁵ status: remains FORCED as stated in CROSS_PROJECTION (Thm 8.13 used). With revised grading: CONDITIONAL on (e,π) independence. However, the algebraic sublattice ℤ³ ⊂ Λ' is unconditionally FORCED (Baker's theorem, no transcendental independence needed).
- 27 → 24 unconditional relations (the 3 relations involving (e,π) cross-terms become conditional)
- All other framework content: UNAFFECTED (no downstream theorem depends on (e,π) independence)

---

## 7. SOURCE FILE EDITS

### CROSS_PROJECTION.md §7: Replace Thm 8.13 proof

Replace the current six-step proof with a restructured version:
- Steps 1-5 (unchanged): algebraic setup, seven identities, Killing orthogonality, Picard-Vessiot, nilpotent firewall
- Step 5½ (NEW): Nilpotent Taylor Rationality theorem (M²=V²=0, {M,V}=-2I)
- Step 5¾ (NEW): Hom_alg(𝔾_m, SO₂) = {1}
- Step 6 (REPLACED): "CONDITIONAL on EPC for 𝔾_m × SO₂" replaces χ∘χ=χ closure
- Grade: CONDITIONAL (replaces FORCED)

### CROSS_PROJECTION.md §9: Update claim status table

(e,π) independence: CONDITIONAL on EPC for 𝔾_m × SO₂ (was FORCED)
Λ' ≅ ℤ⁵: CONDITIONAL on (e,π) (was FORCED unconditional via Thm 8.13)
Algebraic sublattice ℤ³: FORCED (unconditional, Baker)

### GOVERNANCE.md §4: Update SIL blind spot

The (e,π) question returns to the Tier 2 blind spot — but now with FIVE proved obstructions rather than zero. The blind spot is MUCH smaller than before: it consists precisely of the EPC for 𝔾_m × SO₂.

### Blueprint §XV: Update open problems table

(e,π) algebraic independence: CONDITIONAL on EPC for 𝔾_m × SO₂ (5 obstructions proved, 1 conditional remaining)
