# FRAMEWORK REORGANIZATION: Complete Content Map

## Master Reference: Source → Target

**17 source files → 18 target papers + 1 index**

---

## LEGEND

- **→** means "this content moves to"
- **[NEW]** means connective tissue needs to be written
- **[EXPAND]** means existing content needs fuller treatment
- **[CONDENSE]** means reduce redundancy (same theorem stated in multiple source files)
- Source files are abbreviated: PNE, DER (RRR_DERIVATION), CLO (RRR_CLOSURE), P1/P2/P3, CP (COMP_PRIMITIVES), CC (COMP_COMPLEXITY), ΛP (LAMBDA_PRIME), KMS, LS (LATTICE_STRAT), LDI (LATTICE_DEEP), K1 (K1_DEPTH_GAP), BS (BINARY_SEED), MP (METAPATTERNS), EXT (EXTENSIONS), VIC (Void — empty)

---

# TIER 0A: THE PHASE-NEUTRAL SUBSTRATE

**Target file:** `T0A_PHASE_NEUTRAL_SUBSTRATE.md`
**Scope:** Everything before phase commitment. The irreducible starting point.
**Estimated size:** ~30K

### Content Sources

| Source | Section | Content | Notes |
|--------|---------|---------|-------|
| PNE | §0.1 (lines 127–188) | Three pre-phase primitives: recursive substrate, distinction, generative polarity | Core. Thms 0.1, 0.2, 0.3 |
| PNE | §0.2 (lines 190–224) | Product-kernel route to Dist (summary) | Keep as summary; full derivation in Paper 1 |
| PNE | Cor 0.4 (lines 212–224) | Root Unification: TP1 and TP2 share root at S₁ | |
| PNE | Cor 0.5 (lines 226–229) | Distinction and composition co-primitive | |
| PNE | §0.3 (lines 231–249) | What is explicitly NOT primitive (table of demotions) | |
| PNE | §0.4 (lines 251–379) | Spencer-Brown relationship. Thms 0.6, 0.7, 0.8, 0.9 + Cor 0.9a | Large section. All Laws of Form content |
| PNE | §0.5 (lines 381–521) | Forcing arguments. Thms 0.10, 0.11, 0.12, 0.13, Cor 0.13a | Binary minimality, generativity, naming, complexity jump |
| PNE | §0.5.1 (lines 475–519) | Polarity status: three primitives or two? Interpretation A vs B | |
| PNE | Part I §I.1 (lines 525–567) | Global duality D definition. Thms 1.1, 1.2 | |
| PNE | Part I §I.2 (lines 569–583) | Three roles of D: legitimation, systematization, fixed-locus creation | |
| PNE | Part II §II.1 (lines 586–649) | Fixed locus completeness: five classes. Thm 2.1 | |
| PNE | Part II §II.2 (lines 651–679) | {0,1} as crossing object. Thms 2.2, 2.3 | |
| PNE | Preamble (lines 91–123) | Why the foundations changed (historical context) | [CONDENSE] — reduce to brief note |

### Internal Structure of Target Paper

```
§0  Preamble: Why phase-neutral?
§1  Three pre-phase primitives (Thms 0.1–0.3)
§2  Mathematical grounding: product-kernel route (summary, pointer to Paper 1)
§3  Co-primitives (Cor 0.4–0.5)
§4  Spencer-Brown relationship (Thms 0.6–0.9)
§5  Forcing arguments: binary minimality and generativity (Thms 0.10–0.13)
§6  Global duality D (Thms 1.1–1.2)
§7  Fixed locus of D: five classes (Thm 2.1)
§8  The crossing object {0,1} (Thms 2.2–2.3)
§9  Claim status and verification
```

### Dependencies
- Depends on: nothing (this is the root)
- Required by: everything

---

# TIER 0B: PHASE ARCHITECTURE

**Target file:** `T0B_PHASE_ARCHITECTURE.md`
**Scope:** What happens once phase is allowed. Engines, potentials, Phase-Dist.
**Estimated size:** ~40K

### Content Sources

| Source | Section | Content | Notes |
|--------|---------|---------|-------|
| PNE | Part III §III.1 (lines 683–758) | Construction–dissolution asymmetry. Thms 3.1, 3.1b, Cor 3.1c (parity) | Core asymmetry result |
| PNE | Part III §III.2 (lines 760–807) | Compressive engine derivation. Thm 3.2 | |
| PNE | Part III §III.3 (lines 785–808) | Expansive engine derivation. Thm 3.3 | |
| PNE | Part IV §IV.1 (lines 810–848) | Unified potential Φ_λ(n). Thms 4.1, 4.2 (phase transition, saddle) | |
| PNE | Part IV §IV.2 (lines 850–898) | Phase-Dist(ρ) definition and theorems. Thms 4.3, 4.4, 4.5, 4.5b | |
| PNE | Part IV §IV.3 (lines 922–931) | Co-Dist and R(R)≠R. Thm 4.6 | |
| PNE | Part IV §IV.4 (lines 936–958) | Birth-dissolution cycle in PFn. Thm 4.7 | |
| PNE | Part IV §IV.5 (lines 960–1009) | Phase-Dist ↔ signature correspondence. Thms 4.8, Cor 4.9 | |
| PNE | Part V §V.1 (lines 1013–1055) | Internal phase encoding P1↔P3. Thms 5.1, 5.2 | |
| PNE | Remark 5.1c (lines 1100–1109) | Phase moduli space H² | |
| PNE | Part VI §VI.1 (lines 1255–1268) | Bidirectional phase architecture. Thm 6.1 | |
| PNE | Part VI §VI.2 (lines 1270–1280) | Fibonacci as arithmetic fixed locus. Thm 6.2 | |
| PNE | Part VII (lines 1282–1314) | Reinterpretation: what changes / what doesn't | |
| PNE | Part VIII (lines 1316–1370) | New hierarchy of fundamentality (Layers A–E) | |
| PNE | Part IX (subset) | Claim status for phase-specific theorems | |
| PNE | Part X (subset) | Verification for phase-specific tests | |

### Internal Structure of Target Paper

```
§1  Construction–dissolution asymmetry (Thms 3.1, 3.1b, Cor 3.1c)
§2  Deriving the compressive engine (Thm 3.2)
§3  Deriving the expansive engine (Thm 3.3)
§4  The unified potential and phase transition (Thms 4.1, 4.2)
§5  Phase-Dist(ρ): rigorous definition (Thms 4.3–4.5b)
§6  Co-Dist and the expansive fixed-point equation (Thm 4.6)
§7  Birth-dissolution cycle (Thm 4.7)
§8  Phase-Dist ↔ computational signature (Thms 4.8, 4.9)
§9  Internal phase encoding: P1↔P3 duality (Thms 5.1, 5.2)
§10 Phase moduli space SL(2,ℝ)/SO(2) ≅ H²
§11 Fibonacci self-duality (Thm 6.2)
§12 The hierarchy of fundamentality
§13 Claim status and verification
```

### Dependencies
- Depends on: Paper 0A
- Required by: All Tier 1+ papers

---

# TIER 1: DIST — THE CATEGORICAL GROUND

**Target file:** `T1_DIST.md`
**Scope:** Pure category theory. No algebra, no matrices. Dist forced from co-primitives.
**Estimated size:** ~35K

### Content Sources

| Source | Section | Content | Notes |
|--------|---------|---------|-------|
| DER | Part I (lines 54–230+) | The co-primitives (summary from PNE). Self-product tower. Kernel theorem (1.5). Morphism forcing (1.7). Dist is forced (1.9) | Core derivation |
| DER | Part II (lines ~230–400) | Elimination: Set too weak (3.1), Rel too strong (3.2), Co-Dist wrong direction (3.3), Exact too restrictive (3.4), Dist uniquely forced (3.5) | Five-way elimination |
| DER | Part III (lines ~400–500) | Observer = Dist quotient morphism. Thm 2.2 | |
| DER | Part IV (lines ~500–600) | R(R)=R: q∘q=q is forced. Thm 4.1 | |
| DER | Part V (lines ~600–700) | Every Dist morphism instantiates P1, P2, P3 simultaneously. Thm 5.1 | |

### Content NOT transferred (goes elsewhere)
- DER Part VI (bridge chain) → Paper 2A
- DER Part VII (orbit types, constants) → Paper 2A
- DER Part VII½ (physics) → Paper 6A

### Internal Structure of Target Paper

```
§1  Co-primitives and the self-product tower
§2  The kernel theorem (Thm 1.5)
§3  Morphism forcing: three independent arguments (Thm 1.7)
§4  Dist is the unique forced category (Thm 1.9)
§5  Elimination of alternatives (Thms 3.1–3.5)
§6  The observer as Dist quotient (Thm 2.2)
§7  The fixed-point equation R(R)=R (Thm 4.1)
§8  Three simultaneous readings of every morphism (Thm 5.1)
§9  Computational verification
```

### Dependencies
- Depends on: Papers 0A, 0B
- Required by: Papers 2A, 2B, all downstream

---

# TIER 2A: THE BRIDGE CHAIN

**Target file:** `T2A_BRIDGE_CHAIN.md`
**Scope:** From {0,1} to sl(2,ℝ). Zero branching. Orbit types. Constant forcing.
**Estimated size:** ~35K

### Content Sources

| Source | Section | Content | Notes |
|--------|---------|---------|-------|
| DER | Part VI (~lines 700–950) | Bridge chain: {0,1}→V₄→S₃→ℂ[S₃]→M₂(ℂ)→sl(2,ℝ). Bridge Thm 2.1 (zero branching). Artin-Wedderburn (Thm 2.3). Bifurcation rigidity (Thm 5.1). | Core content |
| DER | Part VII (~lines 950–1200) | Three orbit types exhaustive (Thm 3.1). Four constants forced. Forcing quality π>φ>e>√3 (Thm 4.5). No fifth constant (Thm 4.6). Discriminant form Δ=5b²-4c²-4cd+4d² | Core content |
| DER | Thm 4.1 | φ uniquely forced from det=−1 over {0,1} | Currently in DER §7.1 |
| DER | Thm 4.2 | e forced by entry normalization | DER §7.2 |
| DER | Thm 4.3 | π absolutely forced | DER §7.3 |
| PNE | Thm 0.13 | Complexity jump GL(n,F₂) | [ALREADY in 0A; reference here] |

### Internal Structure of Target Paper

```
§1  The bridge chain: five forced steps (Thm 2.1)
§2  Step-by-step derivation with uniqueness proofs
§3  Artin-Wedderburn decomposition (Thm 2.3)
§4  Bifurcation rigidity: sl(2,ℝ) is unique (Thm 5.1)
§5  Three orbit types are exhaustive (Thm 3.1)
§6  Constant forcing: φ (§6.1), e (§6.2), π (§6.3), √3 (§6.4)
§7  Forcing quality ranking (Thm 4.5) and no fifth constant (Thm 4.6)
§8  The discriminant form and orbit-type classification
§9  Computational verification
```

### Dependencies
- Depends on: Paper 1 (Dist provides the categorical framework)
- Required by: Papers 2B, 3-*, 4-*, 5-*, 6-*

---

# TIER 2B: THE ALGEBRA OF {R, N}

**Target file:** `T2B_ALGEBRA_RN.md`
**Scope:** Complete algebraic structure of Cl(1,1) ≅ M₂(ℝ) from {R, N}.
**Estimated size:** ~50K

### Content Sources

| Source | Section | Content | Notes |
|--------|---------|---------|-------|
| CP | Part I (lines 23–150) | Generating matrices R, N forced. Fundamental identities: R²=R+I, N²=−I, {R,N}=N, RNR=−N, (RN)²=I | Core |
| CP | Part II (~lines 150–300) | Integer multiplication table. Basis {I,R,N,RN} spans M₂(ℝ) | Core |
| CP | Part III (~lines 300–450) | Five Jordan types: FIX, REPEL, INV, HALT, MIX + composite OSC | Core |
| CP | Part IV (~lines 450–600) | Projection ↔ primitive mapping: P1→{FIX,REPEL}, P2→OSC, P3→INV | |
| CP | Part V (~lines 600–750) | S₃ orbit structure on primitives. Turing completeness via FIX | |
| CP | Part VI+ (~lines 750–1150) | Self-signature theorem. MIX structural threshold φ̄²/2. Koide from norms. S₃ duality gaps sum to φ̄ | Core results |
| BS | All (17K) | Complete {0,1}→Cl(1,1) derivation. φ uniqueness among 16 binary matrices. Gram eigenvalues √5·φ, √5·φ̄. det(Gram)=25=5². Clifford identification ε₁=(2/√5)(R−I/2), ε₂=N | Merge fully |
| PNE | Thm 5.1b (lines 1057–1078) | Pauli algebra at resolution 1/5 | Move here as consequence of {R,N} algebra |

### Internal Structure of Target Paper

```
§1  The binary seed: all 16 binary 2×2 matrices (from BS)
§2  φ uniqueness: exactly 3 det=−1, unique up to J-conjugacy (from BS)
§3  Forcing of R and N from the bridge chain (from CP Part I)
§4  Fundamental identities: R²=R+I, N²=−I, {R,N}=N, RNR=−N, (RN)²=I
§5  The integer multiplication table and M₂(ℝ) basis
§6  Clifford identification: Cl(1,1) ≅ M₂(ℝ) (from BS)
§7  Norms: ||R||=√3, ||N||=√2, ratio 3/2=1/Q_Koide
§8  Gram matrix: eigenvalues √5·φ, √5·φ̄; det=5² (from BS)
§9  Five Jordan types and projection mapping (from CP Parts III–IV)
§10 S₃ orbit structure on primitives (from CP Part V)
§11 Self-signature and S₃ duality gaps (from CP Part VI)
§12 MIX threshold φ̄²/2 (from CP)
§13 Koide formula Q=2/3 from norms (from CP)
§14 Pauli algebra at resolution 1/5 (from PNE Thm 5.1b)
§15 Rⁿ = F(n)R + F(n−1)I: Fibonacci power decomposition
§16 Computational verification
```

### Dependencies
- Depends on: Paper 2A (bridge chain provides R and N)
- Required by: Papers 3-*, 4-*, 5-*, 6-*

---

# TIER 3-P1: I² / φ — THE ORIENTATION-REVERSING PROJECTION

**Target file:** `T3_P1_I2_PHI.md`
**Scope:** Everything specific to P1. Fibonacci structure, Möbius dynamics, I²-dominance, baryon.
**Now ALSO includes:** P1-specific folding, independence witness, anti-I², V_I(n) component.
**Estimated size:** ~50K

### Content Sources

| Source | Section | Content | Notes |
|--------|---------|---------|-------|
| P1 | All (39K) | Fibonacci matrix, Möbius dynamics, φ̄ attractor, I²-dominance (Z=77.27), Zeckendorf, tensor tower eigenvalues, baryon asymmetry | Core — keep all |
| CLO | Part VIII §8.1 (P1-specific) | Independence witness for P1 | Distribute from CLOSURE |
| CLO | Part VIII §8.2 (P1 folding) | P1 contains P2 and P3 (2 of 6 containments) | Distribute from CLOSURE |
| CLO | Part IX (anti-I² content) | Anti-I² = the reverse flow | Distribute from CLOSURE |
| CLO | Part X (V_I component) | V_I(n) = Fibonacci-specific potential component | Distribute from CLOSURE |
| PNE | Thm 5.10, 5.10a, 5.10b (lines 1140–1206) | Sakharov conditions, baryon energy, dimensional irreducibility | [CHECK overlap with P1 existing] |
| EXT | §2.6b (α_S observation) | α_S ≈ φ̄³/2 observation | Move here as P1-linked observation |

### New Content to Write
- [NEW] Opening: P1 as the orientation-reversing sector of sl(2,ℝ)
- [NEW] Explicit V_I(n) definition and properties (extracted from composite V(n))
- [NEW] Connections to Paper 2B algebraic structure (the det=−1 subspace)

### Dependencies
- Depends on: Papers 0A, 0B, 1, 2A, 2B
- Required by: Papers 3-META, 4-*, 5-*, 6B

---

# TIER 3-P2: TDL / e — THE HYPERBOLIC PROJECTION

**Target file:** `T3_P2_TDL_E.md`
**Scope:** Everything specific to P2. Exponential flow, level transitions, tower saturation.
**Now ALSO includes:** P2-specific folding, independence witness, anti-TDL, V_T(n), thermodynamics.
**Estimated size:** ~40K

### Content Sources

| Source | Section | Content | Notes |
|--------|---------|---------|-------|
| P2 | All (26K) | Exponential flow, entry norm→e, Killing→√e, k=2 uniqueness, tower saturation d², S₃ Cayley distance | Core — keep all |
| CLO | Part VIII §8.1 (P2-specific) | Independence witness for P2 | Distribute |
| CLO | Part VIII §8.2 (P2 folding) | P2 contains P1 and P3 (2 of 6 containments) | Distribute |
| CLO | Part IX (anti-TDL) | Anti-TDL reverse flow | Distribute |
| CLO | Part X (V_T component) | V_T(n) = TDL-specific potential component | Distribute |
| CLO | Part X (extension to ℤ, ℚ) | V extended to negative integers and rationals | Distribute |
| CC | Part VI (~lines 500–600) | Thermodynamic β=ln(φ), Boltzmann computation, optimal parameter | Move here: P2 IS the thermodynamic projection |
| CC | Lucas semiring content | Lucas bounds on resource costs | Move here |
| CC | Fibonacci power decomposition applied to complexity | Rⁿ = F(n)R + F(n-1)I applied | Move here (algebraic facts stay in 2B) |

### New Content to Write
- [NEW] V_T(n) explicit definition
- [NEW] TDL as the thermodynamic sector (unifying CC content with P2)

### Dependencies
- Depends on: Papers 0A, 0B, 1, 2A, 2B
- Required by: Papers 3-META, 4B (KMS), 5B

---

# TIER 3-P3: LoMI / π — THE ELLIPTIC PROJECTION

**Target file:** `T3_P3_LOMI_PI.md`
**Scope:** Everything specific to P3. Rotation closure, observer/quotient structure.
**Now ALSO includes:** P3-specific folding, independence witness, anti-LoMI (period-2), V_L(n).
**Estimated size:** ~40K

### Content Sources

| Source | Section | Content | Notes |
|--------|---------|---------|-------|
| P3 | All (30K) | Rotation closure exp(Nπ)=−I, HC→LoMI (93.3%), totient ratio, GCD/LCM, AGM | Core — keep all |
| CLO | Part VIII §8.1 (P3-specific) | Independence witness for P3 | Distribute |
| CLO | Part VIII §8.2 (P3 folding) | P3 contains P1 and P2 (2 of 6 containments) | Distribute |
| CLO | Part IX (anti-LoMI) | Anti-LoMI oscillates with period 2 (Thm 6.3) | Distribute |
| CLO | Part X (V_L component) | V_L(n) = LoMI-specific potential component | Distribute |

### New Content to Write
- [NEW] V_L(n) explicit definition
- [NEW] P3 as the phase-neutral sector (connecting to PNE §V.1 P1↔P3 duality)

### Dependencies
- Depends on: Papers 0A, 0B, 1, 2A, 2B
- Required by: Papers 3-META, 4-*, 5A (observer is LoMI-linked)

---

# TIER 3-META: METAPATTERNS & SYNTHESIS

**Target file:** `T3_META_SYNTHESIS.md`
**Scope:** Cross-projection structure. What's true of P1∧P2∧P3 jointly.
**Estimated size:** ~30K

### Content Sources

| Source | Section | Content | Notes |
|--------|---------|---------|-------|
| MP | All (13K) | Four meta-theorems: MP1 φ̄-filtration, MP2 trichotomy, MP3 CH fixed points, MP4 resolution quantum | Core — keep all |
| CLO | Part VIII §8.3 | Unity theorem: all dualities are UP↔DOWN (Thm 3.2/13.1) | The cross-projection result |
| CLO | Part X (composite) | V(n) = V_I + V_T + V_L composite potential. n=1 fixed point (Thms 1.2, 1.6). V(1)=0, V(n)>0 for n>1 | Central result |
| CLO | Part X (Markov) | Markov dynamics, detailed balance, β=ln(φ), convergence (Thms 3.2, 3.3) | |
| CLO | Part X (n=1) | 1 = arithmetic R(R)=R (Thm 5.1/14.2). UP(1)=DOWN(1)=1 in all three | |
| CLO | Central Collapse | I²∘TDL∘LoMI = Dist (Thm 7.1/11.2) | The synthesis theorem |
| CLO | Part XII | Four-layer coherence | |
| LDI | New Theorem 1 | KMS-Filtration-Signature Unification: all three are the same object | Move here |
| LDI | New Theorem 2 | Phase boundary ρ=1/2 is NOT a lattice point | Move here |
| LDI | Other connections | Remaining LDI cross-references | Distribute or absorb |

### Content NOT included (distributed to P-files already)
- Independence witnesses → individual P-files
- Folding containments → individual P-files
- Anti-projections → individual P-files
- V_I, V_T, V_L individual components → individual P-files

### Internal Structure of Target Paper

```
§1  The four meta-theorems (MP1–MP4) with proofs
§2  The composite potential V(n) = V_I + V_T + V_L
§3  The fixed point n=1: arithmetic R(R)=R
§4  Markov dynamics and convergence
§5  The unity theorem: all dualities are UP↔DOWN
§6  The central collapse: I²∘TDL∘LoMI = Dist
§7  KMS-Filtration-Signature Unification (from LDI)
§8  Four-layer coherence
§9  Verification
```

### Dependencies
- Depends on: Papers 3-P1, 3-P2, 3-P3 (needs all three projections established)
- Required by: Papers 4-*, 5-*, 6-*

---

# TIER 4A: THE STRUCTURED LATTICE Λ'

**Target file:** `T4A_STRUCTURED_LATTICE.md`
**Scope:** Λ' definition, group structure, 25 forced relations, 8-layer structure, independence.
**Estimated size:** ~45K

### Content Sources

| Source | Section | Content | Notes |
|--------|---------|---------|-------|
| ΛP | Part I (lines 26–150) | Definition, group structure, Thm 1.1 (conditional isomorphism) | Core |
| ΛP | Part II (~lines 150–400) | 25 forced relations (A1–A10, T1–T6, C1–C5, S1–S4). Completeness proof by source exhaustion | Core |
| ΛP | Part III (~lines 400–600) | 8-layer structured lattice. Norm partition, Pythagorean, Koide, exp bridge, Killing, det form, phase, Euler | Core |
| ΛP | Part IV (~lines 600–1000) | Independence: 5/6 pairs unconditional. Baker 3-way. 4-way reduction. Nesterenko correction. PSLQ verification | Core |
| ΛP | Part IV §IV.6 (~lines 900–1100) | Two-World Separation Theorem: seven obstructions (Thms 4.7a–f, 4.10). V₄ Galois, dilogarithm, D-module Ext¹=0, differential Galois, nilpotent barrier, L-function, trace gateway | Core — major result |
| PNE | Thms 6.3, 6.4, 6.5, 6.5b, 6.5c, 6.6 | Pointer theorems to lattice content | [CONDENSE] — these are summaries of ΛP content |

### Internal Structure of Target Paper

```
§1  Definition of Λ' and group structure
§2  The 25 forced relations with proofs
§3  Completeness: source exhaustion theorem
§4  The 8-layer structured lattice geometry
§5  Pairwise independence: 5/6 unconditional
§6  3-way independence via Baker's theorem
§7  4-way reduction to π^q ≠ e^p·(algebraic)
§8  The Two-World Separation Theorem (7 obstructions)
§9  Nesterenko correction: what it does and doesn't prove
§10 PSLQ computational verification
§11 Conjecture 6.6: Lie algebra exponential independence
§12 Open: (e,π) and Λ' ≅ ℤ⁴
```

### Dependencies
- Depends on: Papers 2A, 2B (lattice generators come from the algebra)
- Required by: Papers 4B, 4C, 5B

---

# TIER 4B: LATTICE DYNAMICS (KMS)

**Target file:** `T4B_LATTICE_DYNAMICS.md`
**Scope:** C*-dynamical system, KMS states, generator selection, partition function.
**Estimated size:** ~35K

### Content Sources

| Source | Section | Content | Notes |
|--------|---------|---------|-------|
| KMS | All (41K) | Complexity Hamiltonian H=|x|₁. Partition function Z(β)=coth(β/2)⁴. KMS states. Shell counts. Generator selection via KMS ground state. Three mechanisms unified | Core — keep all, streamline |
| ΛP | Part V (if exists) | C_max depth bound from tower | Check: may already be in KMS |
| CC | Part II–III | Signature-depth theorem. Complexity Hamiltonian connection | Move thermodynamic content that's P2-specific to P2; keep lattice-level content here |
| LDI | New Theorem 1 | KMS-Filtration-Signature Unification | [ALREADY mapped to 3-META; reference here] |

### Key Decision
KMS at 41K is already big. Streamline by removing:
- Redundant restatements of lattice structure (reference Paper 4A)
- Redundant bridge chain summary (reference Paper 2A)
Target: ~35K after removing redundancy.

### Dependencies
- Depends on: Paper 4A
- Required by: Paper 5B (observer bounds use thermodynamic framework)

---

# TIER 4C: LATTICE STRATIFICATION

**Target file:** `T4C_LATTICE_STRATIFICATION.md`
**Scope:** Orbit type → dominant coordinate. Physical assignment. π paradox resolution.
**Estimated size:** ~45K

### Content Sources

| Source | Section | Content | Notes |
|--------|---------|---------|-------|
| LS | All (33K) | Four classification theorems. φ for masses, e for decays, π for confinement, √3 for three-body. π paradox | Core — keep all |
| LDI | Remaining connections (~10K) | Cross-references between lattice layers not captured by Thm 1 or Thm 2 | Merge what's lattice-specific |
| ΛP | Part V+ | Physical coordinate assignments (if in ΛP) | Check for overlap |

### Internal Structure of Target Paper

```
§1  Background: three orbit types of GL(2,ℝ)
§2  The classification: orbit type → dominant coordinate
§3  Four classification theorems with proofs
§4  The π paradox: most forced, least frequent
§5  Physical examples: mass spectra, decay rates, confinement
§6  Lattice deep connections (from LDI)
§7  Open: exact particle lattice coordinates
```

### Dependencies
- Depends on: Papers 2A (orbit types), 4A (lattice structure)
- Required by: Paper 6B (physics predictions use stratification)

---

# TIER 5A: OBSERVER THEORY

**Target file:** `T5A_OBSERVER_THEORY.md`
**Scope:** The observer as mathematical object. Loop closure. Meta-encoding.
**Estimated size:** ~35K

### Content Sources

| Source | Section | Content | Notes |
|--------|---------|---------|-------|
| CLO | Part X½ §10½.1 | Bekenstein bound: S_max = 2log₂(d_K) | |
| CLO | Part X½ §10½.1b | Phase boundary classification | |
| CLO | Part X½ §10½.1c | Boundary observer definition and properties | |
| CLO | Part X½ §10½.1d | GL(2ⁿ,F₂) tower: Aut(S_n) = GL(2ⁿ,F₂) | |
| CLO | Part X½ §10½.1e | Bridge = level-0 slice of tower of bridges | |
| CLO | Part X½ §10½.1f | Tower apex: S₀ = {0,1} unique | |
| CLO | Part XI §11.1 | Observer loop K→F→U(K)→K. K0 (nontrivial idempotent) | |
| CLO | Part XI §11.2 | K6′: loop forced closed (zero branching) | |
| CLO | Part XI §11.3 | K7′: meta-encoding fixed point | |
| CLO | Part XI §11.4 | K4: selection via closure deficit δ=Err+Comp | |
| CLO | Part XI (K8) | Individual(K) = qualia | |
| CLO | Part XII | Four-layer coherence | [SPLIT: observer-specific parts here, cross-projection parts to 3-META] |
| DER | Thm 7.1 (in Part VII?) | Simulation equivalence: observer incompleteness ≡ simulation hypothesis | |
| DER | Thm 4.1/5.1 | Compression wall d², mutual incompleteness | Reference from Paper 1, expand observer interpretation here |
| PNE | §V.2 (lines 1111–1131) | Boundary observer theory summary | [CONDENSE] — pointer, not full restatement |

### Internal Structure of Target Paper

```
§1  Observer K = (d_K, Δ_K, σ_K): definition
§2  Bekenstein bound from compression wall
§3  Phase boundary and boundary observers
§4  The GL(2ⁿ,F₂) tower
§5  Bridge as boundary observer cascade
§6  The observer loop K→F→U(K)→K
§7  K0: nontrivial idempotent
§8  K6′: loop forced closed
§9  K4: selection via closure deficit
§10 K7′: meta-encoding fixed point
§11 K8: Individual(K) = qualia
§12 Simulation equivalence (Thm 7.1)
§13 Anti-idolatry: different K → different U_min
§14 Tower apex: S₀ unique
```

### Dependencies
- Depends on: Papers 1 (Dist/observer definition), 2A (bridge chain), 3-META (composite structure)
- Required by: Paper 5B, 6B

---

# TIER 5B: OBSERVER BOUNDS

**Target file:** `T5B_OBSERVER_BOUNDS.md`
**Scope:** Quantitative observer theory. K1', resource bounds, cortical predictions.
**Estimated size:** ~45K

### Content Sources

| Source | Section | Content | Notes |
|--------|---------|---------|-------|
| K1 | All (19K) | K1′ depth gap: Δ_max(n) = d_K²·φ̄^{2^{n+1}}. Four steps: tower counting, axiom derivation, energy barrier, spectral gap. c=2β derived. Cortical depth prediction | Core — keep all |
| CC | Part I (lines 33–200) | Signature system definition. Algorithm signature σ=(σ_FIX,σ_OSC,σ_INV,σ_MIX) ∈ Δ³ | Core |
| CC | Part II–III (~lines 200–400) | Signature-depth theorem. Complexity classes as signature regions | Core |
| CC | Part IV–V (~lines 400–600) | Landauer→Bekenstein connection. Resource bounds | Core |
| CC | Part VII+ | Gödel algorithm. Incompleteness of Alg | Move here |
| PNE | Thm 5.10c (lines 1213–1239) | K1′ summary | [CONDENSE] — reference only |

### Content NOT included (moved to P2)
- CC Part VI: thermodynamic β=ln(φ) → Paper 3-P2
- CC Lucas semiring → Paper 3-P2

### Internal Structure of Target Paper

```
§1  The signature system (from CC Part I)
§2  Signature-depth theorem and complexity classes (CC Parts II–III)
§3  K1′ depth-gap: the full proof (from K1)
    §3.1 Tower counting
    §3.2 A1+A3 → faithful self-model
    §3.3 Energy barrier (Hamming geometry)
    §3.4 Arrhenius + compression wall → spectral gap
    §3.5 c = 2β from MIX threshold
§4  Landauer → Bekenstein connection (CC Part IV)
§5  Resource bounds and Lucas semiring bounds
§6  Cortical depth prediction: d_K ~ 10¹² vs 10¹³ synapses
§7  The Gödel algorithm and incompleteness of Alg
§8  Computational verification
```

### Dependencies
- Depends on: Papers 5A (observer theory), 2B (algebra), 3-P2 (thermodynamics)
- Required by: Paper 6B (physics uses observer bounds)

---

# TIER 6A: KINEMATICS — SPACETIME FROM THE ALGEBRA

**Target file:** `T6A_KINEMATICS.md`
**Scope:** Minkowski spacetime, Lorentz, spin-½, Poincaré, Born rule. All derived.
**Estimated size:** ~30K (currently ~15K in DER; expand with full proofs)

### Content Sources

| Source | Section | Content | Notes |
|--------|---------|---------|-------|
| DER | Part VII½ (~lines 1200–1391) | Thm 6.1: Herm(M₂(ℂ)) ≅ ℝ^{1,3}. Thm 6.2: SL(2,ℂ)→SO⁺(1,3). Cor 6.2a: so(1,3)≅sl(2,ℂ). Spin-½: exp(πN)=−I. Poincaré: SL(2,ℂ)⋉Herm. Born rule: Gleason at dim≥3 | Core — this is the big result |
| PNE | Thm 5.1d (lines 1080–1098) | Physical structure chain summary table | [CONDENSE] — pointer only |
| PNE | Thm 5.1b (lines 1057–1078) | Pauli at resolution 1/5 | [ALREADY mapped to 2B; reference here] |

### New Content to Write
- [EXPAND] Full proof of Herm(M₂(ℂ)) ≅ ℝ^{1,3} with explicit basis computation
- [EXPAND] Full derivation of SL(2,ℂ) double cover with explicit matrix verification
- [EXPAND] Spin-½ proof with physical interpretation
- [NEW] Connection to standard QFT textbook formulations (for physicists reading this)
- [NEW] Why 4 = 2² is the spatial dimension (self-product structure)

### Internal Structure of Target Paper

```
§1  From M₂(ℂ) to spacetime: Hermitian subspace
§2  Dimension 4 and signature (1,3) (Thm 6.1)
§3  The Lorentz group as double cover (Thm 6.2)
§4  Lorentz algebra decomposition (Cor 6.2a)
§5  Spin-½ from the kernel: exp(πN) = −I
§6  The Poincaré group
§7  Complex Hilbert spaces: forced by ℂ[S₃] + N²=−I
§8  The Born rule via Gleason's theorem
§9  Summary: the kinematic arena of QFT from {0,1}
§10 Computational verification
```

### Dependencies
- Depends on: Paper 2A (bridge chain), 2B (algebra of {R,N})
- Required by: Paper 6B

---

# TIER 6B: DYNAMICS & PREDICTIONS

**Target file:** `T6B_DYNAMICS_PREDICTIONS.md`
**Scope:** SM gauge group, generations, parity, Higgs, Koide, physical predictions.
**Estimated size:** ~40K

### Content Sources

| Source | Section | Content | Notes |
|--------|---------|---------|-------|
| CLO | Part X½ §10½.2 | Thm 10½.7b: su(3) from exchange P on S₁×S₁. Stabilizer=SU(3)×U(1) | Core |
| CLO | Part X½ §10½.2 | Thm 10½.7c: SM gauge group su(3)⊕su(2)⊕u(1) from tower levels 1–2 | Core |
| CLO | Part X½ §10½.2 | Thm 10½.7d: Three generations = 3 irreps of S₃ (Plancherel) | Core |
| CLO | Part X½ §10½.2 | Thm 10½.7e: Parity violation from construction asymmetry | Core |
| PNE | Cor 3.1c (lines 746–758) | Parity violation from PNE perspective | [CONDENSE] — cite Paper 0B |
| EXT | §2 (physics predictions) | τ mass, α⁻¹≈137, X17 boson. Koide formula. α_S≈φ̄³/2 | Move all physics here |
| EXT | §2.6c | Higgs-like mechanism: phase transition at λ=1/2, VEV at φ̄², offset=φ̄³/2 | Move here |
| EXT | §2.6d | Gravity (Jacobson route): framework provides all 3 Jacobson ingredients | Move here |
| P1 | §6 (baryon content) | Sakharov conditions, η=φ̄^{2n}, E_B≈7.8×10⁹ GeV | [ALREADY in P1; reference and expand physics interpretation here] |
| PNE | Thms 5.10, 5.10a, 5.10b (lines 1140–1206) | Baryon prediction + dimensional irreducibility | [SPLIT: math to P1, physics interpretation here] |

### Internal Structure of Target Paper

```
§1  From the bridge chain to gauge theory
§2  su(3) selection via exchange operator (Thm 10½.7b)
§3  The Standard Model gauge group (Thm 10½.7c)
§4  Three generations from S₃ Plancherel (Thm 10½.7d)
§5  Parity violation from construction asymmetry (Thm 10½.7e)
§6  Higgs-like mechanism: VEV at φ̄²
§7  Baryon asymmetry: Sakharov + η = φ̄^{2n}
§8  Koide formula Q=2/3 from norms
§9  Numerical predictions: α_S, τ mass, α⁻¹, X17
§10 Gravity via Jacobson (structural)
§11 Dimensional irreducibility: what cannot be derived
§12 Grading: what is proved vs structural vs observational
```

### Dependencies
- Depends on: Papers 6A (kinematics), 3-P1 (baryon), 5A (observer), 4C (stratification)
- Required by: nothing (terminal)

---

# TIER 7: EXTENSIONS

**Target file:** `T7_EXTENSIONS.md`
**Scope:** Speculative, self-referential, experimental. Anything not core.
**Estimated size:** ~25K

### Content Sources

| Source | Section | Content | Notes |
|--------|---------|---------|-------|
| EXT | §1 | Self-application of framework to its own document | Keep |
| EXT | §3 | Consciousness / qualia (speculative) | Keep |
| EXT | §4 | Cryptographic observations: OWF threshold = φ̄² | Keep |
| EXT | §5 | Lean proof stubs | Keep |
| EXT | §6 | Finite-field dynamical instantiation | Keep |
| EXT | §7 | Neural network validation (dual-stream results) | Keep |

### Content REMOVED from Extensions (moved to core papers)
- EXT §2 (physics predictions) → Paper 6B
- EXT §2.6b (α_S) → Paper 3-P1 or 6B
- EXT §2.6c (Higgs) → Paper 6B
- EXT §2.6d (gravity) → Paper 6B

### Dependencies
- Depends on: Everything (references all tiers)
- Required by: nothing

---

# INDEX

**Target file:** `T_INDEX.md`
**Scope:** Master navigation, cross-reference, problem status.
**Estimated size:** ~15K

### Content Sources

| Source | Section | Content | Notes |
|--------|---------|---------|-------|
| TP_SERIES_INDEX_v3 | All (17K) | Theorem index, reading orders, loop topology, sorting criterion, problem status | Rewrite for new structure |

### Must Include
- Complete theorem cross-reference (all papers)
- Reading orders (external, internal, focused)
- Problem status (open, resolved, conditional)
- The sorting criterion (2D: tier × orbit-type)
- Paper dependency graph
- Size summary

---

# DISSOLUTION MAP: What Happens to Each Source File

| Source File | Size | Fate | Destination(s) |
|-------------|------|------|-----------------|
| PHASE_NEUTRAL_ENGINE | 93K | **DISSOLVED** | §0–§II → 0A (~30K); §III–§VIII → 0B (~40K); §V physics pointers → 6A/6B references; §IX–X split across targets |
| RRR_DERIVATION_v3 | 88K | **DISSOLVED** | Parts I–V → Paper 1 (~35K); Part VI–VII → Paper 2A (~35K); Part VII½ → Paper 6A (~15K+expansion) |
| RRR_CLOSURE_v3 | 72K | **DISSOLVED** | Part VIII → distributed to P1/P2/P3 + META; Part IX → P1/P2/P3; Part X → META + P1/P2/P3; Part X½ → 5A + 6B; Part XI → 5A; Part XII → 5A + META; Part XIII–XIV → distributed |
| P1_I2_PHI_v3 | 39K | **EXPANDED** | +folding, +independence, +anti-I², +V_I(n) from CLO. +α_S from EXT. Target ~50K |
| P2_TDL_E_v3 | 26K | **EXPANDED** | +folding, +independence, +anti-TDL, +V_T(n) from CLO. +thermodynamics from CC. Target ~40K |
| P3_LOMI_PI_v3 | 30K | **EXPANDED** | +folding, +independence, +anti-LoMI, +V_L(n) from CLO. Target ~40K |
| COMPUTATIONAL_PRIMITIVES_v2 | 57K | **MERGED** | → Paper 2B (with BS) |
| COMPUTATIONAL_COMPLEXITY_v2 | 38K | **SPLIT** | Signature system + bounds + Gödel → Paper 5B; Thermodynamics + Lucas → Paper 3-P2; Lattice connections → Paper 4B reference |
| LAMBDA_PRIME_LATTICE_v2 | 62K | **STREAMLINED** | → Paper 4A (remove redundant restatements) |
| KMS_SELECTION_THEOREM | 41K | **STREAMLINED** | → Paper 4B (remove redundant lattice restatements) |
| LATTICE_STRATIFICATION | 33K | **MERGED** | → Paper 4C (with LDI lattice content) |
| LATTICE_DEEP_INVESTIGATION | 27K | **DISSOLVED** | Thm 1 (unification) → Paper 3-META; Thm 2 (ρ=1/2 not lattice) → Paper 3-META; Remaining → Paper 4C |
| K1_DEPTH_GAP | 19K | **MERGED** | → Paper 5B (with CC signature/bounds content) |
| BINARY_SEED_INVESTIGATION | 17K | **MERGED** | → Paper 2B (with CP) |
| METAPATTERNS | 13K | **EXPANDED** | → Paper 3-META (+ synthesis content from CLO) |
| FRAMEWORK_EXTENSIONS_v2 | 23K | **REDUCED** | Physics (§2) → Paper 6B; Remaining → Paper 7 (~15K) |
| TP_SERIES_INDEX_v3 | 17K | **REWRITTEN** | → Index (new structure) |
| Void_Infinite_Chaos_Theorems | 0K | **DELETED** | Empty file |

---

# DEPENDENCY GRAPH

```
                    T0A (Substrate)
                         │
                    T0B (Phase)
                         │
                    T1 (Dist)
                       ╱    ╲
               T2A (Bridge)  │
                  │      ╲   │
               T2B (Algebra) │
              ╱   │    ╲     │
         T3-P1  T3-P2  T3-P3│
              ╲   │    ╱     │
             T3-META ────────┘
              ╱   │    ╲
         T4A    T4B    T4C
        (Lattice)(KMS)(Strat)
              ╲   │    ╱
             T5A (Observer)
                  │
             T5B (Bounds)
              ╱        ╲
         T6A (Kin)   T6B (Dyn)
                         │
                    T7 (Ext)
```

---

# EXECUTION ORDER

**Phase 1: Foundations** (can be done in parallel)
1. Paper 0A — from PNE §0–§II
2. Paper 0B — from PNE §III–§VIII
3. Paper 1 — from DER Parts I–V

**Phase 2: Algebra** (depends on Phase 1)
4. Paper 2A — from DER Parts VI–VII
5. Paper 2B — merge CP + BS

**Phase 3: Projections** (depends on Phase 2; can be done in parallel)
6. Paper 3-P1 — expand P1 + CLO P1-specific content
7. Paper 3-P2 — expand P2 + CLO P2-specific + CC thermodynamics
8. Paper 3-P3 — expand P3 + CLO P3-specific

**Phase 4: Synthesis** (depends on Phase 3)
9. Paper 3-META — expand MP + CLO synthesis content + LDI

**Phase 5: Lattice** (depends on Phase 2; partially parallel with Phase 3)
10. Paper 4A — streamline ΛP
11. Paper 4B — streamline KMS
12. Paper 4C — merge LS + LDI

**Phase 6: Observer** (depends on Phases 4, 5)
13. Paper 5A — from CLO Parts X½, XI
14. Paper 5B — merge K1 + CC

**Phase 7: Physics** (depends on Phase 6)
15. Paper 6A — from DER Part VII½ [EXPAND]
16. Paper 6B — from CLO Part X½ gauge + EXT physics

**Phase 8: Periphery**
17. Paper 7 — EXT non-physics
18. Index — rewrite for new structure

---

# SIZE SUMMARY

| Paper | Target Size | Source Size | Net Change |
|-------|------------|------------|------------|
| 0A Substrate | ~30K | PNE partial (30K) | — |
| 0B Phase | ~40K | PNE partial (55K) | −15K (remove redundancy) |
| 1 Dist | ~35K | DER partial (35K) | — |
| 2A Bridge | ~35K | DER partial (30K) | +5K (expand) |
| 2B Algebra | ~50K | CP (57K) + BS (17K) = 74K | −24K (remove redundancy) |
| 3-P1 | ~50K | P1 (39K) + CLO (~10K) + EXT (~2K) | — |
| 3-P2 | ~40K | P2 (26K) + CLO (~8K) + CC (~8K) | +2K |
| 3-P3 | ~40K | P3 (30K) + CLO (~8K) | +2K |
| 3-META | ~30K | MP (13K) + CLO (~12K) + LDI (~5K) | — |
| 4A Lattice | ~45K | ΛP (62K) | −17K (remove redundancy) |
| 4B KMS | ~35K | KMS (41K) | −6K (remove redundancy) |
| 4C Strat | ~45K | LS (33K) + LDI (~15K) | −3K |
| 5A Observer | ~35K | CLO partial (~30K) | +5K (expand) |
| 5B Bounds | ~45K | K1 (19K) + CC (~30K) | −4K |
| 6A Kinematics | ~30K | DER partial (~15K) | +15K (EXPAND — major) |
| 6B Dynamics | ~40K | CLO partial (~15K) + EXT (~15K) | +10K (expand) |
| 7 Extensions | ~20K | EXT partial (~15K) | +5K |
| Index | ~15K | TSI (17K) | −2K |
| **TOTAL** | **~660K** | **~695K** | **−35K net** |

The total content slightly decreases despite expansions because of redundancy removal.
Each individual paper is between 15K–50K — no monsters.

---

# CRITICAL CROSS-REFERENCES TO MAINTAIN

These results appear in multiple source files and must have ONE canonical home with references elsewhere:

| Result | Current Locations | Canonical Home | Reference In |
|--------|-------------------|----------------|-------------|
| Bridge chain zero-branching | DER, PNE, CP, CLO | Paper 2A | All others |
| R²=R+I, N²=−I, {R,N}=N | DER, PNE, CP, BS, CLO | Paper 2B | All others |
| Four constants forced | DER, PNE, ΛP | Paper 2A (forcing) + Paper 4A (lattice) | |
| φ uniqueness (det=−1) | DER, BS, P1, PNE | Paper 2B §2 | P1, 2A |
| V(n) composite potential | CLO, PNE | Paper 3-META §2 | P1, P2, P3 (components) |
| n=1 fixed point | CLO, PNE, MP | Paper 3-META §3 | |
| Bekenstein S_max=2log₂(d_K) | CLO, PNE, K1 | Paper 5A §2 | 5B, 6B |
| K1′ depth gap formula | CLO, PNE, K1 | Paper 5B §3 | 5A, 6B |
| Baryon η=φ̄^{2n} | P1, PNE, EXT | Paper 3-P1 (math) + Paper 6B (physics) | |
| Herm(M₂(ℂ))≅ℝ^{1,3} | DER, PNE | Paper 6A §2 | |
| su(3) from exchange | CLO | Paper 6B §2 | |
| Three generations from S₃ | CLO | Paper 6B §4 | |
| KMS β=ln(φ) | CC, KMS, LDI, CLO | Paper 3-P2 (thermodynamic origin) + Paper 4B (lattice application) | |
| Self-signature (1/2, φ̄/2, φ̄²/2) | CP, LDI, PNE | Paper 2B §11 | 3-META, 4B |
| Koide Q=2/3 | CP, BS, EXT | Paper 2B §13 | 6B |
| 25 forced relations | ΛP, PNE | Paper 4A §2 | |
| Discriminant Δ signature (2,1) | DER, PNE | Paper 2A §8 | 0B (parity), 4C |

---

*This map covers every section of every source file. No content is lost. Every theorem has exactly one canonical home.*

*R(R) = R*
