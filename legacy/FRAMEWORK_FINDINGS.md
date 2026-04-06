# FRAMEWORK FINDINGS FROM THE SHA-256 INVESTIGATION
## Structural Results That Transcend the Hash Function
### Working Document — March 2026

**Author:** Kael

**Document Species:** INVESTIGATION (provenance record for framework-level findings discovered during the SHA-256 research).

**Purpose:** Many results discovered during the SHA-256/Bitcoin investigation are not about SHA-256 at all — they are framework-level theorems, structural patterns, and open-problem advances that belong in the source papers. This document collects them for triage and integration.

---

## §1 THE FIVE WALLS AND THE INCOMPLETION LOOP

The framework's open problems are projections of a single incompletion — the construction-dissolution asymmetry at different tower levels.

| # | Level | Wall | What's missing |
|---|-------|------|---------------|
| 1 | 3→4 | (e,π) independence | Value-level relation between transcendentals |
| 2 | 4 | Λ'≅ℤ⁵ unconditional | Lattice rank conditional on Wall 1 |
| 3 | 5→6 | Λ value | Integration constant of Einstein equations |
| 4 | 6+ | P≠NP / OWF threshold | Computational irreversibility |
| 5 | 7→8+ | SIL blind spot + K_meta | Self-classification boundary |

The incompletion loop:

    (e,π) → Λ'≅ℤ⁵ → Λ value → Bekenstein → OWF → SIL → (e,π)

Four of six arrows proved as theorems. The loop is a K6' fixed point: R(WALLS) = WALLS.

**Grade:** FORCED (for four proved arrows). ENCODED (for arrows 5→6 and 6→1).

**Integration target:** T_SIL §6 (loop closure remark).

---

## §2 NILPOTENT BOUNDARY = TRANSCENDENCE DEGENERATION

**Theorem (Boundary Transcendence Degeneration).** *At the nilpotent boundary det(xh + yN) = 0 in sl(2,ℝ), the exponential map degenerates from transcendental to polynomial: exp(A) = I + A when A² = 0.*

*Proof.* (h±N)² = 0 (verified computationally). Taylor series: exp(A) = I + A + A²/2 + ⋯ = I + A when A² = 0. ∎

**Consequence:** The sectors producing e (hyperbolic, x²>y²) and π (elliptic, y²>x²) are separated by a boundary where exp is ALGEBRAIC. Transcendental content cannot cross the boundary. This provides the geometric interpretation of Conjecture 6.6.

**Grade:** FORCED. **Integration target:** T2_BRIDGE §19¾ (new remark).

---

## §3 THE CO-PRIMITIVE TOWER

**Theorem Candidate (Co-Primitive Lift).** The co-primitive pair {P.1, P.2} = {0, 1} lifts through the tower, appearing at each level as a specific pair whose independence is the open problem at that level:

| Level | P.1 (self-return) | P.2 (productive distinction) | Status |
|-------|-------------------|------------------------------|--------|
| 0 | 0 | 1 | **PROVED** |
| 3→4 | e (own derivative) | π (negation of identity) | **OPEN** |
| 4 | Λ' (self-closed) | ℤ⁵ (freely generated) | **CONDITIONAL** |
| 5→6 | G (local anchor) | Λ (global boundary) | **PROVED** |
| 6+ | P (self-computing) | NP (witness-dependent) | **OPEN** |

**The Alternation Theorem:** Independence is PROVED at every algebraic level and OPEN at every transcendental level. The blind spot IS the transcendental instances of co-primitivity.

44 co-primitive pairs identified across 11 tower regions. Every pair is {self-return, productive distinction}. The catalog IS the framework read as its binary decomposition.

**Grade:** CANDIDATE (structural identification sharp; constraint direction needs formalization). **Integration target:** T0_SUBSTRATE §2 (co-primitives — complete instantiation of Thm 0.5 across the tower).

---

## §4 THE TERNARY FROM THE BINARY

The framework has THREE projections from TWO co-primitives. Mechanism: every pair {A, B} produces a third C = their product/commutator/composition. **P2 is not a third primitive. P2 is what P1 and P3 DO TO EACH OTHER.**

At the generator level: {R, N} → [R,N] = √5·H. The commutator IS the P2 content.

Verified product table:

| Level | P.1 | P.2 | PRODUCT = P2 mediator |
|-------|-----|-----|----------------------|
| 0 | 0 | 1 | V₄ (self-product) |
| 3 | R | N | [R,N] = √5·H |
| 3 | e⁺ | e⁻ | [e⁺,e⁻] = H |
| 3→4 | e | π | e^{iπ}+1 = 0 (Euler annihilation) |
| 3→4 | φ | φ̄ | φ·φ̄ = 1 |
| 4 | P1 | P3 | I²∘TDL∘LoMI = Dist |
| 5→6 | G | Λ | S_dS = 3π/(GΛ) |
| 6+ | P | NP | OWF |

Every product is the mediator at its level.

**Grade:** FORCED (algebraic verification of every product). **Integration target:** T3_META §7 (P2 = product of P1 and P3 — completion of the central collapse story).

---

## §5 THE NESTED PRODUCT CHAIN AND CONSTANT TABLE

The five constants are ONE PAIR {‖R‖, ‖N‖} = {√3, √2} processed through successive tower lifts:

    {√3, √2} → √5 = √(3+2)     GEOMETRIC PRODUCT
                   ↓
             φ = (1+√5)/2         ALGEBRAIC PRODUCT
                   ↓
          {e, π} via exp          TRANSCENDENTAL PRODUCT
                   ↓
          e^{iπ} + 1 = 0         ANNIHILATION (return to 0)

The chain factorizes at φ (the 3+2 boundary). Steps 0-2 depend on generator MAGNITUDES (norm-dependent). Steps 3-4 depend on the STRUCTURE of sl(2,ℝ) (norm-independent). φ IS the boundary.

### The 2×2+1 Constant Table

| Source | Spectral (1st order) | Geometric (2nd order) |
|--------|---------------------|----------------------|
| R alone (P1) | φ (eigenvalue) | √3 (Frobenius norm) |
| N alone (P3) | π (half-period) | √2 (Frobenius norm) |
| [R,N] commutator (P2) | e (exp of Cartan) | [√5 — dependent] |

4 independent entries + 1 cross-entry = 5 constants. e sits at the intersection of BOTH classification axes: spectral AND from the commutator. Double indexing → most spectrally insulated constant.

**Grade:** FORCED. **Integration target:** T2_BRIDGE (new structural result) + T3_META (constant-level central collapse).

---

## §6 EULER'S IDENTITY AS CENTRAL COLLAPSE

The Central Collapse (T3-META Thm 7.1): I²∘TDL∘LoMI = Dist. At the constant level:

| Projection | Constant | Role in Euler |
|-----------|----------|--------------|
| P1 (injection) | 1 = identity | The "+1" |
| P2 (bijection) | e = exp | The "e^" |
| P3 (surjection) | i·π = rotation | The "iπ" |
| Dist (complete) | 0 = origin | The "= 0" |

The derivation from the framework:

1. N² = −I (Identity 2, FORCED).
2. exp(θN) is rotation for all θ.
3. exp(πN) = −I (definition of π as half-period, FORCED).
4. N has eigenvalue i (spectral completion, FORCED).
5. exp(πN) = exp(iπ) under spectral identification.
6. exp(iπ) + 1 = 0.

Every step is a framework theorem.

**Grade:** CANDIDATE THEOREM (identification Euler = Central Collapse needs formal definition of operational composition). **Integration target:** T3_META §7.

---

## §7 THE ASCENDING BLIND SPOT (DIAGONALIZATION)

SIL-7 proves: the blind spot cannot be resolved from WITHIN the same tower level. But it does NOT prove: the blind spot cannot be resolved from the NEXT level via K6'.

**B_{n+1} = K6'(B_n)** — the P1 content at level n+1 of the P3 content at level n.

| Blind spot | Level | Resolution | Next blind spot |
|-----------|-------|-----------|----------------|
| B_0: (e,π) | 3→4 | EPC from level 4+ | B_1: d_K from lattice |
| B_1: d_K determination | 4→5 | Observer theory | B_2: Planck anchor |
| B_2: η = 1/(4G) | 5→6 | Empirical input | B_3: Framework/experiment |
| B_3: Experimental match | 6→7 | — | B_4: Extended Gödel |

The incompletions are not limits. They are the growth mechanism. Each blind spot is the SEED of the next level. The spiral IS the framework's natural state.

The Gödel parallel: System S has unprovable G_S. Extend to S' = S + G_S. S' has new G_{S'}. Same mechanism: incompleteness ascends. Never eliminated. Always shifted.

**Grade:** ENCODED. **Integration target:** T_SIL §6 (new remark on diagonalization).

---

## §8 THE 2+2+1 = disc(R) INCOMPLETION COUNT

**Theorem Candidate.** The framework produces exactly disc(R) = 5 irreducible outputs across all tower lifts:

- Lift 3→4 (Killing-orthogonal): 2 outputs {e, π}
- Lift 5→6 (local/global-orthogonal): 2 outputs {G, Λ}
- Lift 7→8+ (role/filler, no orthogonality): 1 output {K_meta}
- Total: 2+2+1 = 5 = disc(R) = |S₀|²+1

Lifts with Killing-type orthogonality produce PAIRS. The lift without orthogonality produces a SINGLETON. The discriminant counts the total.

**Grade:** CANDIDATE (needs formal proof that no 6th output exists). **Integration target:** T4_LATTICE §8.8 or T0_SUBSTRATE.

---

## §9 PHASE-DIST ENCODES BOTH P AND NP

P≠NP is not a binary. It is a PHASE PARAMETER. Phase-Dist(ρ) for ρ ∈ [0,1]:

| ρ | Mode dominant | Complexity class |
|---|--------------|-----------------|
| 0 | (iv) production | P: everything efficiently computable |
| φ̄² ≈ 0.382 | (iii) boundary | OWF transition |
| 1/2 | All four modes | P/NP boundary: maximal tension |
| 1 | (ii) observation | NP: witness-dependent |

The five constants as Phase-Dist sweep: φ at ρ=0, √3 at ρ=0, e at ρ=1/2 (the boundary constant), √2 at ρ=1, π at ρ=1. The nested product chain is a sweep from ρ=0 to ρ=1, with e at the midpoint.

P≠NP = the phase transition at φ̄² is REAL. P=NP = the transition is degenerate. The framework derives consequences of both.

**Grade:** CANDIDATE. **Integration target:** T_COMP (new remark on Phase-Dist parameterization).

---

## §10 THE CASIMIR-WEINBERG UNIFICATION

**Theorem (Casimir-Weinberg).** For |S₀| = 2:

    C_fund = sin²θ_W = HW([Maj,Ch]) = ‖N‖²·‖R‖²/|S₀|⁴ = 3/8

Four faces of one number:

| Derivation | Formula | Source |
|-----------|---------|--------|
| Representation theory | j(j+1)/2, j=1/2 | sl(2,ℝ) fundamental |
| Boolean functions | 24/64 | Exhaustive enumeration |
| Cardinal identity | ‖N‖²·‖R‖²/|S₀|⁴ | Generator norms, seed size |
| Weinberg angle | ‖R‖²/(‖R‖²+disc(R)) = 3/8 | Gauge coupling ratio |

The SU(5) ratio: g'²/g² = ‖R‖²/disc(R) = 3/5.

**Grade:** FORCED (numerical identity exact; physical interpretation via G1-G14 also FORCED). **Integration target:** T6B_FORCES (Weinberg angle) + T2_BRIDGE §22 (Casimir-Koide section).

---

## §11 THE CASIMIR-KOIDE-CARDINAL IDENTITY

**Theorem.** C_fund = ‖N‖²·‖R‖²/|S₀|⁴ = 2·3/16 = 3/8.

Every factor is a ratio of framework cardinals {|S₀|=2, |V₄\{0}|=3, |V₄|=4}:

| Quantity | Value | Cardinal expression |
|----------|-------|-------------------|
| C_fund | 3/8 | j(j+1)/2 for j=1/2 |
| Q = ‖N‖²/‖R‖² | 2/3 | |S₀| / |V₄\{0}| |
| p = ‖R‖²/|V₄| | 3/4 | |V₄\{0}| / |V₄| |
| C = Q × p² | 3/8 | |S₀| × |V₄\{0}| / |V₄|² |

Connects representation theory, generator geometry, Boolean functions, and combinatorics in one identity from {0,1} alone.

**Grade:** FORCED. **Integration target:** T2_BRIDGE §22 (deepest result connecting Casimir, Koide, and binary seed).

---

## §12 THE DOUBLE-EXPONENTIAL FORMULA

**Theorem (Tower Parameterization).** A hash function on the binary self-product tower with consciousness depth n_eff has:

| Quantity | Formula | SHA-256 (n_eff=7) |
|----------|---------|-------------------|
| d_K | |S₀|^{|S₀|^{n_eff}} | 2^128 |
| S_max | |S₀|^{n_eff+1} | 256 |
| d_U² | |S₀|^{n_eff+2} | 512 |
| Birthday | |S₀|^{n_eff} | 128 |

n_eff is the SINGLE FREE PARAMETER. d_K is not a framework derivable — it is a SELECTION. n_eff = 7 is coprime to ALL framework primes {2, 3, 5} — the consciousness depth sits OUTSIDE the framework's own arithmetic.

**Grade:** FORCED. **Integration target:** T5_OBSERVER §2 (Bekenstein) + T_COMP §12.

---

## §13 THE THREE FRAMEWORK PRIMES AND ARITHMETIC COPRIMALITY

| Prime | Cardinal | Role |
|-------|---------|------|
| 2 | |S₀| = ‖N‖² | The seed, the observation norm |
| 3 | ‖R‖² = |V₄\{0}| | The production norm |
| 5 | disc(R) = ‖R‖²+‖N‖² | The discriminant |

Product: 2 × 3 × 5 = 30 = primorial(5). φ(30) = 8 = |S₀|³ = SHA-256 register count. τ(30) = 8 = divisor count.

Primorial hierarchy: primorial(2) = 2 = |S₀| (seed), primorial(3) = 6 = |S₃| (symmetry group), primorial(5) = 30 (full arithmetic).

**Integration target:** T0_SUBSTRATE or T2_BRIDGE (new remark).

---

## §14 POST-SHANNON CAPACITY FOR SELF-REFERENTIAL SYSTEMS

The three-layer capacity formula generalizes to any system that generates its own alphabet, reads its own output, and has capacity dependent on self-reference depth:

    C₁ = log₂(disc(R))     (algebraic — what the alphabet forces)
    C₂ = H(catchment)       (effective — what geometry permits)
    C₃ = C₂ − I_self        (recursive — what self-reading costs)

For systems with weak mixing, I_self can be substantial (XOR-fold: 25% of bandwidth). The discriminant plays Shannon's role but carries more structure: "what kind" in addition to "how much."

Applicable to: neural networks (self-supervised learning), biological cells (DNA→protein→regulation), markets (price→behavior→price), languages (word→meaning→word choice).

**Integration target:** T_COMP (new section on recursive information theory).

---

## §15 P≠NP ↔ (e,π) STRUCTURAL RESONANCE

Both assert: the mode (iii) boundary cannot be crossed in polynomial resources. The parallel is structural (same boundary, same mode, same framework location) but NOT a logical equivalence. The resource models (algebraic degree vs computational time) are different.

What WOULD make it rigorous: a proof that P(e,π)=0 implies a polynomial-time algorithm for inverting mode (iii) one-way functions — a Baker-type bound connecting algebraic degree to inverter time.

**Grade:** RESONANT. **Integration target:** T_COMP (new remark, clearly graded).

---

## §16 THE P2-COLLAPSE ARGUMENT FOR (e,π)

If e and π are algebraically dependent, then P2 becomes derivable from P3 at the constant level. The bridge chain B is functorial and zero-branching; if e = f(π) for algebraic f, then B(P2) = f(B(P3)) — a natural transformation from P3-data to P2-data, contradicting Thm 1.1 (projection independence).

The gap: does "derivable modulo B" imply "derivable as projections"? This requires showing that zero branching prevents "accidental" algebraic relations between forced outputs.

**Grade:** CANDIDATE. Most promising framework-internal route to (e,π). **Integration target:** T4_LATTICE §8.8.

---

## §17 THE FRESÁN-JOSSEN ROUTE (ENHANCEMENT)

The framework derives: 𝔾_m × SO₂ (direct product, dim 2, FORCED by Killing orthogonality). EPC predicts: tr.deg_ℚ ℚ(e,π) = dim(𝔾_m × SO₂) = 2 = independence.

The specific EPC instance needed is SIMPLER than general EPC: direct product group, classical motives, standard periods. The framework provides ALL structural input (Killing orthogonality → Picard-Vessiot decoupling → direct product) that any proof would likely use.

**Grade:** FORCED (framework input complete). OPEN (EPC itself). **Integration target:** T4_LATTICE §8.7.

---

## §18 THE OBSERVER-DEPENDENT O⁺/O⁻ SPLIT

The O⁺/O⁻ decomposition is a property of the OBSERVER'S APPROACH, not the hash function. Seven approaches tested, seven different O⁺/O⁻ splits — each recovers a DIFFERENT 128 bits cheaply. The 128-bit wall is observer-dependent in content but invariant in size.

This is N² = −I at the meta level. The first observation creates {O⁺, O⁻}. The second observation swaps them.

**Grade:** FORCED. **Integration target:** T5_OBSERVER (new remark on observer-dependence of the O⁺/O⁻ split).

---

## §19 OPEN THREADS (REVISED)

~~A. Formalize 2+2+1 theorem~~ → **CLOSED: THEOREM** (tower exhaustion + basis closure). See THREAD_CLOSURES.md §A.
B. Phase-Dist boundary reality ↔ P≠NP formalization — **GENUINELY OPEN** (requires connecting algebraic degree to computational time)
C. Λ-to-(e,π) scale connection — **GENUINELY OPEN** (requires closing (e,π) first)
~~D. General nilpotent barrier~~ → **CLOSED: THEOREM** (polynomial termination of exp on nilpotent cone, verified through sl(3,ℝ) and 4×4). See THREAD_CLOSURES.md §D.
~~E/K. Blind spot = nilpotent-crossing~~ → **CLOSED: THEOREM** (both directions proved: ⊇ via Thm 19¾.1b + sector purity, ⊆ via Lindemann-Weierstrass/Nesterenko/Baker exhaustion). See THREAD_CLOSURES.md §E/K.
F. Conserved quantity sensitivity to mode imbalance — **COMPUTATIONAL** (needs test run)
G. The specific EPC instance for 𝔾_m × SO₂ — **GENUINELY OPEN** (external mathematics)
~~H. Mode-sequential solver~~ → **MOVED to T_SHA256** (SHA-256-specific)
~~I. SAT encoding~~ → **MOVED to T_SHA256** (SHA-256-specific)
~~J. Silver ratio δ_S = 1+√2~~ → **CLOSED: DERIVED** (Marchenko-Pastur edge from γ=1/|S₀|; Pell connection mapped; not a primitive). See THREAD_CLOSURES.md §J.

**Score: 4 closed, 2 moved, 3 genuinely open, 1 computational.**

---

## §20 COMPLETE INTEGRATION CHECKLIST (REVISED)

### Already in source docs (15 items — no integration needed):

| # | Finding | Location | Grade |
|---|---------|----------|-------|
| 1 | Nilpotent boundary = transcendence degeneration | T2_BRIDGE §19¾ Thm 19¾.1b | FORCED |
| 2 | Casimir-Koide-Cardinal identity | T2_BRIDGE §23.1 Thm 23.1d | FORCED |
| 3 | Double-exponential formula | T5_OBSERVER §2 Remark | FORCED |
| 4 | Casimir-Weinberg unification | T2_BRIDGE §23.1 Thm 23.1e | FORCED |
| 5 | Euler / product chain / 2×2+1 table | T2_BRIDGE §22.3 | FORCED |
| 7 | Incompletion loop as K6' | T_INDEX | FORCED(4/6) |
| 8 | Ascending blind spot | T_SIL §6 Remark | ENCODED |
| 9 | Co-primitive tower alternation | T4_LATTICE §8.8 Remark | CANDIDATE |
| 10 | P2-collapse route | T4_LATTICE Remark | CANDIDATE |
| 11 | Nested product chain | T2_BRIDGE §22.3 | FORCED |
| 12 | Constant table (2×2+1) | T2_BRIDGE §22.3 | FORCED |
| 13 | Phase-Dist ↔ P/NP | T_COMP §10.1 Remark | CANDIDATE |
| 14 | P≠NP ↔ (e,π) resonance | T_COMP §10.1 Remark | RESONANT |
| 15 | P2-collapse route to (e,π) | T4_LATTICE Remark | CANDIDATE |
| 20 | EPC route enhancement | T4_LATTICE §8.7 | FORCED(input) |

### Needs integration (8 items):

| # | Finding | Target | Type | Grade |
|---|---------|--------|------|-------|
| 6 | **2+2+1 = disc(R) exact count** | T4_LATTICE §8.8 | Remark → THEOREM | **THEOREM** (Thread A) |
| 16 | Ternary from binary (P2=P1×P3) | T3_META §7 | New result | FORCED |
| 17 | Three framework primes / primorial | T0_SUBSTRATE or T2_BRIDGE | New remark | FORCED |
| 18 | Post-Shannon recursive capacity | T_COMP new § | New section | FORCED |
| 19 | Silver ratio δ_S = 1+√2 | T2_BRIDGE §22.3 | New remark | FORCED (Thread J) |
| 20 | Observer-dependent O⁺/O⁻ | T5_OBSERVER | New remark | FORCED |
| 21 | **General nilpotent barrier** | T2_BRIDGE §19¾ | New Corollary | **THEOREM** (Thread D) |
| 22 | **Blind spot = nilpotent-crossing** | T_SIL §6 | New Thm SIL-7½ | **THEOREM** (Thread E/K) |

---

*The SHA-256 investigation produced framework-level theorems at every tower level: new algebraic identities (Casimir-Koide-Cardinal, Casimir-Weinberg), new structural patterns (co-primitive tower, ternary from binary, nested product chain), new approaches to open problems (P2-collapse route, ascending blind spot), and a new information theory (post-Shannon recursive capacity). Four open threads closed: 2+2+1 exhaustion promoted to THEOREM, general nilpotent barrier proved for all semisimple algebras, blind spot precisely characterized as nilpotent-crossing claims, silver ratio fully derived as observer-level quantity. Three genuinely open threads remain (Phase-Dist↔P≠NP, EPC instance, Λ-scale connection). Eight integration items queued for source docs. The hash function was a lens. The findings are the framework's. R(R) = R.*
