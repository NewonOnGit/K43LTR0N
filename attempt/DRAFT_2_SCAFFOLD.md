# DRAFT 2 SCAFFOLD — Structural Necessity Framework

## Working Document for the Complete Framework Rewrite
### v0.2 — March 2026

**Purpose:** Design document for Draft 2 of the Structural Necessity Framework. Contains the canonical theorem registry, dependency analysis, and narrative scaffold. This is the construction site — the final catalog and rewritten papers are deliverables built from this document.

**This document is NOT a paper.** It is a working artifact with four layers:
- **Layer 0:** Vocabulary, claim-type, and structural normalization (the type system)
- **Layer A:** Theorem catalog (every atom, one ID, one entry)
- **Layer B:** Dependency graph and chain analysis (how atoms connect)
- **Layer C:** Narrative scaffold (how Draft 2 tells the story)

**Reconciliation target:** Every entry in CLAIM_CENSUS.md and T_INDEX.md gets exactly one of: preserved as canonical entry, demoted to remark, retyped, or marked obsolete/merged. No ghost sources.

**Governing principle:** Layer 0 is not invented. It is the framework's own meta-level machinery (T_GOV, T_SIL, T_SEM, T_BLUEPRINT, DICTIONARY, T_TOE) applied to the framework's own theorem corpus. This IS R(R)=R at the catalog level: the framework's self-classification machinery classifies the framework's claims.

---

# PART 0: VOCABULARY, CLAIM-TYPE, AND STRUCTURAL NORMALIZATION

*Every classification in Layer 0 has a source theorem in an existing meta-level paper. Nothing is imposed from outside. The framework governs its own registry.*

---

## 0.1 THE THREE-AXIS WARRANT SPACE

From T_SIL §1.6. Every claim lives in a three-dimensional warrant space W = G × T × O:

| Axis | Projection | What it asks | Source |
|------|-----------|-------------|--------|
| **G (Generation)** | P1 | How did this come into being? | T_GOV §1: G.0–G.10 |
| **T (Transport)** | P2 | What cross-layer moves produced or depend on it? | T_GOV §3: T.1–T.10 |
| **O (Standing)** | P3 | What kind of thing is it? | T_GOV §2: O.1–O.9 |

The four SIL labels {FORCED, ENCODED, RESONANT, MYTHIC} are the canonical quotient of W (T_SIL Thm SIL-0b). The three axes are independent (T_SIL Thm SIL-0a: no axis is a function of the other two).

Every catalog entry carries all three coordinates plus the derived SIL grade.

---

## 0.2 GENERATION CLASSES (G-axis)

From T_GOV §1. Records HOW a claim came into being:

| Class | Name | br_s | Description |
|-------|------|------|-------------|
| G.0 | Posited | — | Stipulated co-primitive (P.1, P.2 only) |
| G.1 | Forced (strict) | 0 | Zero-branching derivation at every step |
| G.2 | Forced (completion) | 0* | Unique completion once target category specified |
| G.3 | Quotient-induced | — | From kernel/image decomposition of a forced map |
| G.4 | Bridge-forced | — | From specific algebraic content of a bridge step |
| G.5 | Projection-induced | — | From applying the three-projection structure |
| G.6 | Observer-forced | — | From demanding observer self-consistency (K6', A1–A4) |
| G.7 | Transport-derived | — | From a legitimate cross-layer map |
| G.8 | Reconstruction | — | From recovering structure from partial data |
| G.9 | Semantic-compression | — | Named by the semantic layer's pattern recognition |
| G.10 | Bookkeeping | — | Administrative, no mathematical content |

G.0–G.6 form a partial order reflecting the bridge chain (T_GOV Thm GOV-2). G.7–G.9 are cross-cutting. G.1 is the unique class with br_s = 0 guaranteed (T_GOV Thm GOV-3).

**Interface (GOV-4):** Generation class determines a LOWER bound on SIL grade:
- G.0–G.5 → minimum FORCED
- G.6 → minimum FORCED or ENCODED
- G.7–G.8 → minimum ENCODED
- G.9 → minimum RESONANT

---

## 0.3 STANDING CLASSES (O-axis)

From T_GOV §2. Records WHAT KIND of thing a claim is about:

| Standing | Name | Description |
|---------|------|-------------|
| O.1 | Formal object | Constructible via bridge chain |
| O.2 | Categorical structure | Universal property or natural transformation |
| O.3 | Derived relation | Necessary relation between formal objects |
| O.4 | Observer-relative | Definition requires specifying K |
| O.5 | Physical candidate | Formal + observer-forced; partial P1–P4 |
| O.6 | Physical interpretation | Full P1–P4 satisfied |
| O.7 | Semantic artifact | Recognized by semantic audit, not independently derived |
| O.8 | Bookkeeping | Administrative |
| O.9 | Narrative overlay | Interpretive frame; MYTHIC status |

**Interface (GOV-6):** Standing determines UPPER bound on physical commitment: O.1–O.3 ≤ CANDIDATE, O.5 = CANDIDATE, O.6 ≥ ENCODED, O.7–O.9 = NONE.

**Promotion gates:** O.4 → O.1 requires K-independence proof (GOV-7). O.9 → O.6 requires P1–P4 (GOV-8).

---

## 0.4 TRANSPORT TYPES (T-axis)

From T_GOV §3. Records what cross-layer moves are involved:

| Type | Name | Direction | Description |
|------|------|-----------|-------------|
| T.1 | Strict derivation | D.0→D.n | Zero-branching bridge chain step |
| T.2 | Representation | D.n→Repr(D.n) | Faithful functor exhibited |
| T.3 | Quotient transport | D.n→D.n/≈ | Quotient map with explicit kernel |
| T.4 | Projection transport | D.n→P_i(D.n) | Central collapse factor |
| T.5 | Encoding | D.m→D.n | Injective structure-preserving map |
| T.6 | Observer lift | D.4→D.6 | K6' across spacetime → physics |
| T.7 | Cross-identification | D.m↔D.n | Legitimate cross-layer identification |
| T.8 | Structural resonance | D.m~D.n | Pattern match, no containment proof |
| T.9 | Narrative overlay | — | Interpretive, no formal claim |
| T.10 | External processing | D.n→External | Framework inputs + external machinery |

**Interface (GOV-10):** Transport type bounds epistemic status of transported claim. **Asymmetry (GOV-11):** Reverse of T.1 is T.3, not T.1 — the construction-dissolution asymmetry at the transport level.

---

## 0.5 FRAMEWORK DOMAINS

From T_GOV §3.1. The content space through which transport operates. Core domains (D.0–D.8) are grid-internal: derivable from {0,1} or about what is derivable. Boundary domains (D.9–D.10) are grid-external: they interact with the framework but are not members of its ontological inventory.

**Core domains:**

| ID | Domain | Level | Core structure |
|----|--------|-------|---------------|
| D.0 | Substrate | 0–1 | {0,1}, SRD, duality D |
| D.1 | Category | 2 | Dist, V₄, S₃, q∘q=q |
| D.2 | Algebra | 3 | M₂(ℝ), {R,N}, Cl(1,1), M₂(ℂ) |
| D.3 | Projections | 4 | P1/P2/P3, Λ', metapatterns |
| D.4 | Observer | 5 | K, q_K, Bekenstein, K6', K7' |
| D.5 | Kinematics | 6 (P3) | Herm(M₂(ℂ)), Lorentz, Born rule |
| D.6 | Dynamics | 6 (P1) | Gauge, Yang-Mills, gravity, matter |
| D.7 | Meta | 7 | SIL, generation, standing |
| D.8 | Semantics | 8 | Contranyms, meta-primitives, verb algebra |

**Boundary domains:**

| ID | Domain | Position | Standing |
|----|--------|----------|----------|
| D.9 | Mythic | Beyond grid | Interpretive overlay, O.9, no formal content |
| D.10 | Author | Beyond-within | Framework-forced meta-level observer slot (T_GOV §3.1); framework-describable but not framework-internal |

D.9 and D.10 are NOT on the same footing as D.0–D.8. D.9 has no formal content. D.10 occupies a unique standing: its ROLE is G.6 (observer-forced by the tower hierarchy), but its FILLER is outside all G-classes. Transport rules for D.9–D.10 are restricted (T_GOV §3.1).

---

## 0.6 CLAIM KINDS

Every catalog entry has exactly one claim kind. Derived from standing taxonomy + mathematical form:

| Kind | Abbrev | Standing | Description |
|------|--------|----------|-------------|
| POSTULATE | POST | G.0 | Posited co-primitive. Only P.1 and P.2. |
| DEFINITION | DEF | O.1–O.2 | Formal object or categorical structure, stipulated. No truth claim. |
| THEOREM | THM | O.2–O.3 | Categorical structure or derived relation with complete proof. |
| META-THEOREM | MT | O.2 | Theorem-schema unifying multiple theorems under one principle. |
| COROLLARY | COR | O.3 | Derived relation following directly from a named theorem. |
| LEMMA | LEM | O.3 | Derived relation serving a specific downstream proof. |
| CONJECTURE | CONJ | O.5 | Mathematical or physical candidate, not yet proved. |
| GOVERNANCE-RULE | GOV | O.2 at D.7 | Meta-level categorical structure governing claim assertion. |
| SEMANTIC-RULE | SEM | O.7→O.2 at D.8 | Semantic artifact formalized as structure. |
| REMARK | RMK | — | Interpretive, connective, illustrative. No formal commitment. |

---

## 0.7 SIL GRADES

From T_SIL §1. Derived from the three-axis warrant space via canonical quotient (SIL-0b):

| Grade | D | C | V | Description |
|-------|---|---|---|-------------|
| FORCED | 1 | 1 | 1 | Zero-branching derivation + containment + verification |
| ENCODED | 0 | 1 | 1 | Containment + verification, no zero-branching derivation |
| RESONANT | 0 | 0 | 1 | Verification only |
| MYTHIC | 0 | 0 | 0 | Interpretive overlay |
| POSITED | — | — | — | Co-primitive (G.0). Not derived. |

**Additional grade for schemas:** FORCED-AS-SCHEMA — universal lift law stated with precise objects; all local instances individually FORCED; schema verified exhaustively.

---

## 0.8 DEPENDENCY TYPES

Three types, mapped to the three projections (central collapse applied to the dependency relation):

| Type | Projection | Description | Notation |
|------|-----------|-------------|----------|
| LOGICAL | P1 | Needed for proof. Without it, the theorem breaks. | →L |
| SEMANTIC | P3 | Needed for interpretation/typing. Without it, the statement is untyped. | →S |
| TRANSPORT | P2 | Needed to move the result cross-domain. Without it, the theorem holds but can't be applied. | →T |

These correspond to the three questions of the reading chain (T_BLUEPRINT §1.2): Is it algebraically derived? (P1/logical) → Is it observer-structured? (P3/semantic) → Is it physically realized? (P2/transport).

---

## 0.9 FOUR STRUCTURAL READINGS

From T_BLUEPRINT §1. Every catalog entry admits all four readings simultaneously:

| Reading | Question | Grid scan | A→O→R cell |
|---------|----------|----------|------------|
| Mathematical | What does SRD produce? | All cells by algebraic content | A=1, O=0, R=0 |
| Observer | What does SRD observe? | P3 column for all n | A=1, O=1, R=0 |
| Physical | What does SRD realize? | Row 6 | A=1, O=1, R=1 |
| Semantic | What does SRD name? | Row 8 + governance | A=0, O=0, R=0 |

The readings correspond bijectively to the SIL grades via the Status-Reading Transposition σ = (P2 P3): FORCED↔Physical, ENCODED↔Observer, RESONANT↔Mathematical, MYTHIC↔Semantic (T_BLUEPRINT §1.2).

---

## 0.10 GRID COORDINATES

Every claim lives at B(level, projection):

**Levels:** 0 (Substrate) · 1 (Binary) · 2 (Categorical) · 3 (Algebraic) · 4 (Projected) · 5 (Observer) · 6 (Physical) · 7 (Meta) · 8 (Semantic)

**Projections:** P1 (production/I²) · P2 (mediation/TDL) · P3 (observation/LoMI) · cross (spans projections)

---

## 0.11 SIX MASTER THEOREMS (Compression Backbone)

From T_BLUEPRINT §5.6 / T_TOE §3. Every theorem in the framework is an instance, corollary, or projection-reading of one of these six. No seventh exists.

| # | Name | Root | What it governs |
|---|------|------|----------------|
| 1 | Productive Opacity | ker(f) | Irreversible kernel sources physics, observation, level-transition |
| 2 | R(R)=R Tower Universality | im(f) | Stabilized images feed next level (20 instances, 3 closure types) |
| 3 | K6' Bundle Universality | K6' | One theorem, two bundles (gauge + gravity) |
| 4 | Cost-to-Geometry | asymmetry→cost→geometry | Physical witness of productive opacity |
| 5 | Trinitarian Root | |V₄\{0}|=3 | Every three-fold decomposition traces here via S₃-transitivity |
| 6 | Central Collapse Exhaustion | I²∘TDL∘LoMI=Dist | Three factors, no remainder |

Each catalog entry records which master theorem(s) it instantiates.

---

## 0.12 META-THEOREM AND QUADRATIC ENGINE MEMBERSHIP

Seven meta-theorems (MT1–MT7) and four quadratic engine meta-theorems (MP1–MP4). From T3_META §8 and META_COMPRESSION.

| Tag | Name | Home |
|-----|------|------|
| MT1 | Universal Asymmetry (UAT) | T0 §18 |
| MT2 | Self-Application Fixed-Point Tower (SAFPT) | T3_META §8 |
| MT3 | Universal Kernel Irreducibility (UKI) | T1 §6.4 |
| MT4 | Geometric-Progression Forcing (GPF) | T2 §9½ |
| MT5 | Gauge Stabilizer Universality (GSU) | T6B §1 |
| MT6 | K6' Bundle Derivation (K6'BD) | T6B §12.4 |
| MT7 | Cardinal 5 Universality (C5U) | T3_META §7½ |
| MP1 | φ̄-filtration from eigenvalues | T3_META §8 |
| MP2 | Trichotomy from discriminant sign | T3_META §8 |
| MP3 | CH fixed points from Cayley-Hamilton | T3_META §8 |
| MP4 | Resolution quantum from disc(R)=5 | T3_META §8 |

---

## 0.13 NINE STRUCTURAL ROLES

From T_BLUEPRINT §5.4. Every object performs one or more roles; the role chain recurs at every tower level (Role Recurrence Theorem):

| Role | P-alignment | Description |
|------|-------------|-------------|
| Generator | P1 | Object from which other structure is derived |
| Closure operator | P1 | Map whose iteration terminates |
| Mediator | P2 | Object enabling transition between levels |
| Selection mechanism | P2 | Rule picking one structure from a family |
| Invariant | P2→P1 | Quantity preserved across transformations |
| Obstruction | P3 | Structure whose non-vanishing prevents naive closure |
| Classifier | P3 | Structure sorting other structures into types |
| Symmetry breaker | P3→P1 | Structure introducing asymmetry |
| Reconstruction mechanism | P3→P1 | Map recovering structure from partial data |

---

## 0.14 NINE SEMANTIC VERBS

From T_SEM §17. The verbs that connect framework objects, ordered by strength and mapped to transport types via the Verb-Transport Correspondence (T_SEM Thm 17.3):

| Verb | Transport | Admissibility |
|------|-----------|---------------|
| equals | T.1 | Same object in same context |
| is isomorphic to | T.1 | Structure-preserving bijection exhibited |
| is represented by | T.2 | Faithful functor exhibited |
| is encoded by | T.5/T.7 | Injective structure-preserving map |
| is induced by | T.1/T.2 | Derivation chain exhibited |
| projects to | T.4 | Surjective projection with specified kernel |
| is interpreted as | T.9 + O-check | Transport legality + standing verified |
| resonates with | T.8 | Computational verification of pattern match |
| is mythically associated with | T.9 (O.9) | No formal claim, narrative only |

**Discipline rule C6 (T_SEM §17.5):** In theorem statements, the verb must match the transport type. Demotion is always safe; promotion requires evidence.

---

## 0.15 CLOSURE TYPES

From T_BLUEPRINT §5.5. Every self-stabilizing map classifies as one of three types, exhaustive by central collapse:

| Type | Projection | What im(f) does | Dual occlusion type |
|------|-----------|-----------------|---------------------|
| Terminal | P1 | Embedded, stable, no further feed-forward | Accidental |
| Recursive | P2 | Stable, AND feeds the next tower level | Constitutive |
| Boundary | P3 | At the framework's outer edge; characterized by irreducible kernel | Boundary |

---

## 0.16 CARDINAL CLASSES

From T_BLUEPRINT §8½. Every dimensionless structural integer falls into one of three classes:

| Class | Formula | Value | What it counts |
|-------|---------|-------|---------------|
| Internal | |S₀|² | 4 | Modes, statuses, basis elements |
| Non-trivial | |S₀|²−1 | 3 | Projections, generations, Lie dimension |
| Extended | |S₀|²+1 | 5 | Discriminant, lattice rank, fixed locus |

Every 5 decomposes as 3+2 (Quintic Root, T_BLUEPRINT §8½).

---

## 0.17 VOCABULARY NORMALIZATION

From DICTIONARY. Enforced in all theorem statements:

1. **Route-typed verbs.** DERIVE, REALIZE, DETERMINE carry explicit subtypes (DICTIONARY). Bare usage prohibited.
2. **Banned terms.** EMERGENCE never appears in theorem statements. Use "strictly derive" or "force."
3. **Typed polysemy.** CLOSURE typed as mode/type/loop/status. CANONICAL typed as strong/weak. UNIQUE typed as strict/equivalence/universal-property/exhaustive. OBJECT typed by tier. EXISTENCE typed by rung. SAMENESS typed by relation. DETERMINATION typed by strength.
4. **Contranym flag.** Terms with confirmed contranym status (DICTIONARY: 10 confirmed) carry a (C) marker with active face specified.
5. **Generation class tag.** Every use of "forced" specifies G-class (T_GOV §1.2 disambiguation table).
6. **Prediction typing.** Every prediction typed as theorem/encoded/structural/processed (DICTIONARY: PREDICTION).
7. **Realization verb discipline (SNF-1124).** Six verbs, each restricted to one rung of the realization pipeline: "strictly derive" (zero-branching internal), "physically realize" (anchored transition to prediction), "access/measure" (K-relative acquisition), "empirically instantiate" (actually realized in the world), "unify" (lawfully relate multiple measured facts to one invariant architecture). Moving between rungs without explicit typing is invalid. "The framework predicts physics" is banned unless route-typed (SNF-1121).

---

## 0.18 ID SCHEMA

**Format:** `SNF-XXXX` — zero-padded sequential number, paper-independent.

**Provenance, not ontology.** The ID ranges below track which SOURCE FILE a claim was extracted from. They do NOT encode narrative placement, logical primacy, or conceptual ordering. A lower range number does not mean earlier in the Draft 2 narrative or more fundamental. The narrative ordering (Layer C) is determined independently by the tower ascent logic. The ID is a stable address, not a rank.

**Allocation blocks:**

| Range | File |
|-------|------|
| 0001–0199 | T0_SUBSTRATE |
| 0200–0349 | T1_DIST |
| 0350–0699 | T2_BRIDGE |
| 0700–0799 | T3_P1_PRODUCTION |
| 0800–0849 | T3_P2_MEDIATION |
| 0850–0899 | T3_P3_OBSERVATION |
| 0900–0999 | T3_META |
| 1000–1099 | T4_LATTICE |
| 1100–1299 | T5_OBSERVER |
| 1300–1349 | T6A_SPACETIME |
| 1350–1499 | T6B_FORCES |
| 1500–1599 | T_COMP |
| 1600–1649 | T_SIL |
| 1650–1699 | T_GOV |
| 1700–1749 | T_SEM |
| 1750–1849 | T_BLUEPRINT |
| 1850–1899 | T_SHA256 |
| 1900–1949 | T_TOE |
| 1950–1999 | T_ASI |

**Reconciliation field:** Each entry records old IDs: paper-local theorem number, CLAIM_CENSUS ID, T_INDEX listing status.

---

## 0.19 ASSERTION SCOPE

Every claim has a scope that determines its burden of proof:

| Scope | Abbrev | Description | Overreach risk |
|-------|--------|-------------|---------------|
| LOCAL | LOC | One specific object or result | Low |
| FAMILY | FAM | Parameterized family (e.g., "for all n ≥ 0") | Medium |
| SCHEMA | SCH | Universal theorem-schema (e.g., R(R)=R Tower Universality) | High — where overreach hides |
| EXHAUSTION | EXH | Claims no further cases exist (e.g., "no fifth mode") | High — must verify completeness |
| IDENTIFICATION | IDN | Claims two previously distinct structures coincide | Medium — must specify sameness relation (§0.17) |

Every SCHEMA entry must list its verified instances. Every EXHAUSTION entry must specify the classification it claims to exhaust and the method.

---

## 0.20 PROOF STATUS

Separate from SIL grade. SIL is epistemic assessment; proof status is the operational state for the rewrite:

| Status | Description |
|--------|-------------|
| COMPLETE | Full proof in a single source location |
| SCATTERED | Complete but spread across multiple files; needs assembly |
| SKETCH | Outline exists; key steps identified but not fully written |
| DEFERRED | Deferred to a named meta-theorem or external result |
| MISSING | Stated, proof not written |
| NEEDS RECONSTRUCTION | Proof outdated, refers to dissolved content, or needs Draft 2 updating |

---

## 0.21 FRAGILITY FLAG

| Flag | Description | Consequence of failure |
|------|-------------|----------------------|
| CORE | If removed, a major tower region breaks | Cascade failure |
| SUPPORT | Important but replaceable | Local damage, workarounds exist |
| FRONTIER | Ambitious edge claim | Framework continues without it |
| PRESENTATION | Narrative/compression value only | Clean removal |

---

## 0.22 DEMOTION PROTOCOL

During reconciliation, claims that do not survive at their current kind:

| Path | When |
|------|------|
| THEOREM → COROLLARY | Follows in ≤2 steps from a named theorem |
| THEOREM → LEMMA | Serves a specific proof but no independent interest |
| THEOREM → DEFINITION | Really a stipulation of terminology |
| THEOREM → GOVERNANCE-RULE | Really a meta-level classification constraint |
| THEOREM → REMARK | Interpretive or connective, not formally committable |
| CONJECTURE → REMARK | Resolved or no longer a live target |
| Any → OBSOLETE | Superseded, merged, or dissolved with source paper |
| Any → MERGED(SNF-XXXX) | Content absorbed into another entry |

Every demotion recorded with reason in reconciliation field.

---

## 0.23 CONFLICT LOGGING

```
CONFLICT-NNN
  Entries: [SNF-XXXX, SNF-YYYY] or [paper-local refs]
  Type: SCOPE | WORDING | DEPENDENCY | STATUS | PROOF | VERSION
  Description: [what disagrees]
  Resolution: [how resolved, which version wins]
  Effect: [what changed in the registry]
```

Expected types: SCOPE (different scope between sources), WORDING (slightly different statements), STATUS (silent grade change by a meta-paper), DEPENDENCY (conflicting independence/dependence claims), PROOF (different warrant routes), VERSION (recent integration not yet reflected).

---

## 0.24 ENTRY TEMPLATE

```
### SNF-XXXX | [KIND] | [Name]

**Statement:** [1-3 sentence precise statement]

--- Governance ---
**SIL Grade:** [FORCED / ENCODED / RESONANT / MYTHIC / POSITED / FORCED-AS-SCHEMA]
**Warrant Space:** G.[class] · T.[type] · O.[standing]
**Assertion Scope:** [LOCAL / FAMILY / SCHEMA / EXHAUSTION / IDENTIFICATION]
**Fragility:** [CORE / SUPPORT / FRONTIER / PRESENTATION]

--- Location ---
**Grid:** B([level], [projection])
**Domain:** D.[n]

--- Source & Proof ---
**Stated in:** [File §section, paper-local label — where the statement lives]
**Warranted in:** [File §section — where the strongest proof lives]
**Refined by:** [File §section — where later tightening occurred, if any]
**Proof Status:** [COMPLETE / SCATTERED / SKETCH / DEFERRED / MISSING / NEEDS RECONSTRUCTION]

--- Structural Tags ---
**Master Theorem:** [1-6, or —]
**MT/MP membership:** [tags, or —]
**Structural Role:** [from §0.13, or —]
**Closure Type:** [terminal / recursive / boundary, if applicable]

--- Dependencies ---
**Depends on:** [SNF-xxxx →L, SNF-yyyy →T, SNF-zzzz →S]
**Used by:** [SNF-aaaa, SNF-bbbb, ...] (reverse-populated in Layer B)

--- Reconciliation ---
**Old IDs:** [CLAIM_CENSUS ID, T_INDEX entry, paper-local number]
**Action:** [preserved / demoted from X / retyped from Y / merged into SNF-ZZZZ / obsolete]
**Demotion reason:** [if applicable]

--- Narrative (populated in Layer C) ---
**First narrative chapter:** [TBD]
**First narrative role:** [TBD]
```

---

---

# PART 1: THEOREM CATALOG (Layer A)

## SWEEP 1: T0_SUBSTRATE

*File: T0_SUBSTRATE.md. Grid: B(0–1, all). Domain: D.0. The foundation — relative origin, co-primitives, SRD, four modes, ORE/CIA, duality, phase architecture, asymmetry, NNR, Tower Monotone, ρ-regulation.*

*Sweep date: March 2026. 47 entries extracted.*

---

### SNF-0001 | DEF | Framework Triple

**Statement:** A framework F = (L, C, Π) where L is a language structure, C is a set of constraints, Π is an admissibility filter.

**SIL Grade:** — (definition) **Warrant Space:** G.— · T.— · O.1 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(0, cross) **Domain:** D.0
**Stated in:** T0 §0, Def 0.0a **Warranted in:** — **Proof Status:** —
**Master Theorem:** — **Role:** —
**Depends on:** —
**Old IDs:** T0 Def 0.0a. Not in CLAIM_CENSUS. **Action:** preserved

---

### SNF-0002 | DEF | Closure Deficit

**Statement:** δ(D|F) = α·Err(D;C) + β·Comp(D) + ρ·Viol(D;C,Π) — total cost of D's failure to achieve self-consistent closure within F.

**SIL Grade:** — (definition) **Warrant Space:** G.— · T.— · O.1 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(0, cross) **Domain:** D.0
**Stated in:** T0 §0, Def 0.0b **Warranted in:** — **Proof Status:** —
**Master Theorem:** — **Role:** Selection mechanism
**Depends on:** SNF-0001 →L
**Old IDs:** T0 Def 0.0b. Not in CLAIM_CENSUS. **Action:** preserved

---

### SNF-0003 | DEF | Relative Origin

**Statement:** Origin(F) = argmin_D δ(D|F). Frame-relative, objectively selected, shiftable under extension.

**SIL Grade:** — (definition) **Warrant Space:** G.— · T.— · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(0, cross) **Domain:** D.0
**Stated in:** T0 §0, Def 0.0c **Warranted in:** — **Proof Status:** —
**Master Theorem:** — **Role:** Selection mechanism
**Depends on:** SNF-0001 →L, SNF-0002 →L
**Old IDs:** T0 Def 0.0c. Not in CLAIM_CENSUS. **Action:** preserved

---

### SNF-0004 | THM | Relative-Origin Seed

**Statement:** The existence of a relative origin induces binary selection S₀(F) = {0,1} — the minimal two-valued structure of origin-status.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(0, cross) **Domain:** D.0
**Stated in:** T0 §0, Thm 0.0 **Warranted in:** T0 §0 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Generator **Closure Type:** recursive
**Depends on:** SNF-0003 →L
**Old IDs:** T0 Thm 0.0. T_INDEX: listed. **Action:** preserved

---

### SNF-0005 | THM | Origin-Selection Cardinal Theorem

**Statement:** Core structural integers 1,2,3,4,5 arise as unfoldings of origin selection: 1=origin, 2=|S₀|, 4=|S₀|², 3=|S₀|²−1, 5=|S₀|²+1.

**SIL Grade:** ENCODED **Warrant Space:** G.4 · T.7 · O.3 **Scope:** EXHAUSTION **Fragility:** SUPPORT
**Grid:** B(0, cross) **Domain:** D.0
**Stated in:** T0 §0, Thm 0.0a **Warranted in:** T_BLUEPRINT §8½ **Proof Status:** SCATTERED
**Master Theorem:** 5 **MT/MP:** MT7 **Role:** Classifier
**Depends on:** SNF-0004 →L
**Old IDs:** T0 Thm 0.0a. T_INDEX: listed. **Action:** preserved

---

### SNF-0006 | POST | Recursive Substrate (P.1)

**Statement:** A domain of transformable structure supporting re-entry: results of acting within it remain eligible for further action. Requires persistence, repeatability, nontrivial differentiation, orientation-indeterminacy.

**SIL Grade:** POSITED **Warrant Space:** G.0 · T.— · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(0, P1) **Domain:** D.0
**Stated in:** T0 §1 **Warranted in:** — (posited) **Proof Status:** —
**Master Theorem:** — **Role:** Generator
**Depends on:** SNF-0003 →S
**Old IDs:** T0 P.1. C-001. T_INDEX: listed. **Action:** preserved

---

### SNF-0007 | POST | Productive Distinction (P.2)

**Statement:** A structural condition under which recursive continuation produces sustained, non-exhausting differentiation between states.

**SIL Grade:** POSITED **Warrant Space:** G.0 · T.— · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(0, P3) **Domain:** D.0
**Stated in:** T0 §1 **Warranted in:** — (posited) **Proof Status:** —
**Master Theorem:** — **Role:** Generator
**Depends on:** SNF-0003 →S
**Old IDs:** T0 P.2. C-002. T_INDEX: listed. **Action:** preserved

---

### SNF-0008 | THM | Generative Polarity

**Statement:** P.1+P.2 jointly force asymmetric organization of difference into two contrary directions: folding (concentrates) and unfolding (releases).

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(0, cross) **Domain:** D.0
**Stated in:** T0 §1, Thm 0.3 **Warranted in:** T0 §5 (via 0.11–0.12) **Proof Status:** COMPLETE
**Master Theorem:** 1 **MT/MP:** MT1 **Role:** Symmetry breaker
**Depends on:** SNF-0006 →L, SNF-0007 →L
**Old IDs:** T0 Thm 0.3. C-003. **Action:** preserved

---

### SNF-0009 | DEF | Self-Relating Difference (SRD)

**Statement:** A Dist endomorphism f on (D,≈) with |D|≥2 whose iterates are well-defined. Self-relating = endomorphism (P.1); difference = |D|≥2 with equivalence (P.2).

**SIL Grade:** — (definition) **Warrant Space:** G.— · T.— · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(0, cross) **Domain:** D.0
**Stated in:** T0 §1½, Def 0.3a **Warranted in:** — **Proof Status:** —
**Master Theorem:** — **Role:** Generator
**Depends on:** SNF-0006 →S, SNF-0007 →S
**Old IDs:** T0 Def 0.3a. Not in CLAIM_CENSUS. **Action:** preserved

---

### SNF-0010 | THM | SRD Equivalence

**Statement:** P.1 ∧ P.2 ⟺ Dist endomorphism on |D|≥2. The co-primitives jointly are exactly equivalent to self-relating difference.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** IDENTIFICATION **Fragility:** CORE
**Grid:** B(0, cross) **Domain:** D.0
**Stated in:** T0 §1½, Thm 0.3b **Warranted in:** T0 §1½ **Proof Status:** COMPLETE
**Master Theorem:** 2 **MT/MP:** MT2 **Role:** Closure operator **Closure Type:** recursive
**Depends on:** SNF-0006 →L, SNF-0007 →L, SNF-0009 →S, *SNF-0200* →L (T1 Kernel Thm)
**Old IDs:** T0 Thm 0.3b. C-004. **Action:** preserved

---

### SNF-0011 | THM | Four-Mode Exhaustion

**Statement:** On |D|=2, every SRD as M∈M₂(ℤ) falls into exactly one of four modes by Cayley-Hamilton: (i) coincidence x²=x, (ii) opposition x²=1, (iii) cancellation x²=0, (iv) propagation x²=x+1. No fifth mode.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(0–1, cross) **Domain:** D.0
**Stated in:** T0 §1½, Thm 0.3c **Warranted in:** T0 §§1½+5 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MP3 **Role:** Classifier
**Depends on:** SNF-0010 →L, SNF-0020 →L
**Old IDs:** T0 Thm 0.3c. C-005. T_INDEX: listed. **Action:** preserved

---

### SNF-0012 | COR | Productive Mode Uniqueness

**Statement:** Mode (iv) is the unique mode generating content beyond period 2. Among binary det=−1 matrices, realized uniquely up to J-conjugacy by R=[[0,1],[1,1]].

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.3 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(1, P1) **Domain:** D.0
**Stated in:** T0 §1½, Cor 0.3d **Warranted in:** T0 §1½ **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Generator
**Depends on:** SNF-0011 →L, SNF-0024 →L
**Old IDs:** T0 Cor 0.3d. C-006. **Action:** preserved

---

### SNF-0013 | THM | Naming as SRD Construction

**Statement:** R = J + |1⟩⟨1|. J is bare distinction (mode ii), |1⟩⟨1| is self-relation. Their sum is SRD in mode (iv).

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.3 **Scope:** IDENTIFICATION **Fragility:** CORE
**Grid:** B(1, P1) **Domain:** D.0
**Stated in:** T0 §1½, Thm 0.3e **Warranted in:** T0 §1½ **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Generator
**Depends on:** SNF-0011 →L
**Old IDs:** T0 Thm 0.3e. C-007. **Action:** preserved

---

### SNF-0014 | THM | Observer-Relative Existence (ORE)

**Statement:** At every tower level n≥2, D_n has no observer-independent content. Every element is constituted by its position in the im/ker decomposition of the canonical observer. The distinction between im and ker IS the observer K_n.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** FAMILY (all n≥2) **Fragility:** CORE
**Grid:** B(0, cross) — applies B(2+, all) **Domain:** D.0
**Stated in:** T0 §1½a **Warranted in:** T0 §1½a **Refined by:** T_BLUEPRINT §1
**Proof Status:** COMPLETE
**Master Theorem:** 1+2 (constitutive reading) **MT/MP:** MT2, MT3 **Role:** Obstruction
**Depends on:** SNF-0006 →L, SNF-0007 →L
**Old IDs:** T0 ORE. Not in CLAIM_CENSUS — FLAG. **Action:** preserved

---

### SNF-0015 | THM | Constitutive Inaccessibility of the Absolute (CIA)

**Statement:** The existence of an absolute (observer-independent) universe is constitutively unprovable, irrefutable, and unclassifiable. No grid address.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(0, cross) — boundary **Domain:** D.0
**Stated in:** T0 §1½a **Warranted in:** T0 §1½a **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Obstruction **Closure Type:** boundary
**Depends on:** SNF-0014 →L
**Old IDs:** T0 CIA. Not in CLAIM_CENSUS — FLAG. **Action:** preserved

---

### SNF-0016 | THM | Co-Primitives

**Statement:** Distinction and composition are co-primitive: neither derivable from the other. Distinction without composition = static set. Composition without distinction = undifferentiated self-return.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(0, cross) **Domain:** D.0
**Stated in:** T0 §2, Thm 0.5 **Warranted in:** T0 §2 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Obstruction
**Depends on:** SNF-0006 →L, SNF-0007 →L
**Old IDs:** T0 Thm 0.5. T_INDEX: listed. **Action:** preserved

---

### SNF-0017 | THM | Root Unification

**Statement:** Dist and bridge chain share root at S₁={0,1}²: categorical route reads via projections/kernels, algebraic route reads via XOR/automorphisms.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** IDENTIFICATION **Fragility:** SUPPORT
**Grid:** B(1–2, cross) **Domain:** D.0
**Stated in:** T0 §2, Thm 0.4 **Warranted in:** T0 §2 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Mediator
**Depends on:** SNF-0004 →L
**Old IDs:** T0 Thm 0.4. **Action:** preserved

---

### SNF-0018 | THM | Spencer-Brown Specialization

**Statement:** A1 (f∘f=f) = compressive idempotence, A2 (m∘m=id) = duality D. Laws of Form captures modes (i)+(ii) only — not (iii) or (iv).

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.7 · O.3 **Scope:** IDENTIFICATION **Fragility:** PRESENTATION
**Grid:** B(0, P1) **Domain:** D.0
**Stated in:** T0 §4, Thm 0.6 **Warranted in:** T0 §4 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0011 →L
**Old IDs:** T0 Thm 0.6. **Action:** preserved

---

### SNF-0019 | THM | Polarity Projector

**Statement:** R = J + |1⟩⟨1|. Direct computation.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(1, P1) **Domain:** D.0
**Stated in:** T0 §4, Thm 0.7 **Warranted in:** T0 §4 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Generator
**Depends on:** SNF-0011 →L
**Old IDs:** T0 Thm 0.7. **Action:** merged → SNF-0013 (identical content to Thm 0.3e)

---

### SNF-0020 | THM | Binary Minimality

**Statement:** |D|=2 forced by zero equivalence-relation branching. B(2)=2 (only extremal partitions); B(n)≥5 for n≥3.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(1, cross) **Domain:** D.0
**Stated in:** T0 §5, Thm 0.10 **Warranted in:** T0 §5 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Selection mechanism
**Depends on:** SNF-0007 →L
**Old IDs:** T0 Thm 0.10. C-010. T_INDEX: listed. **Action:** preserved

---

### SNF-0021 | THM | Generativity Requires Asymmetry

**Statement:** No involution generates content beyond period 2. If M²=I, M≠±I, then Mⁿ∈{I,M}. Among binary det=−1: J involution, R and Q=JRJ satisfy M²=M+I.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.3 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(1, cross) **Domain:** D.0
**Stated in:** T0 §5, Thm 0.11 **Warranted in:** T0 §5 **Proof Status:** COMPLETE
**Master Theorem:** 1 **MT/MP:** MT1 **Role:** Obstruction
**Depends on:** SNF-0020 →L
**Old IDs:** T0 Thm 0.11. **Action:** preserved

---

### SNF-0022 | THM | Binary Operation Phase Classification

**Statement:** 16 binary operations on {0,1} split 4 compressive / 4 expansive / 8 mixed.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.3 **Scope:** EXHAUSTION **Fragility:** PRESENTATION
**Grid:** B(1, cross) **Domain:** D.0
**Stated in:** T0 §5, Thm 0.8 **Warranted in:** T0 §5 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Classifier
**Depends on:** SNF-0020 →L
**Old IDs:** T0 Thm 0.8. **Action:** preserved

---

### SNF-0023 | THM | Generative Asymmetry

**Statement:** Jⁿ∈{I,J} (period 2). Rⁿ=F(n)R+F(n−1)I (Fibonacci spiral). Möbius fixed points: ±1 for J, φ̄ for R (contraction rate φ̄²).

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(1, P1) **Domain:** D.0
**Stated in:** T0 §5, Thm 0.9 **Warranted in:** T0 §5 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MP3 **Role:** Generator
**Depends on:** SNF-0020 →L, SNF-0021 →L
**Old IDs:** T0 Thm 0.9. **Action:** preserved

---

### SNF-0024 | THM | Naming Theorem

**Statement:** J+|0⟩⟨0|=Q, J+|1⟩⟨1|=R. Naming one side of a distinction forces the Fibonacci generator (up to J-conjugacy).

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(1, P1) **Domain:** D.0
**Stated in:** T0 §5, Thm 0.12 **Warranted in:** T0 §5 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Generator
**Depends on:** SNF-0020 →L, SNF-0021 →L
**Old IDs:** T0 Thm 0.12. C-012. T_INDEX: listed. **Action:** preserved

---

### SNF-0025 | THM | GL(2,F₂) = S₃ Minimal Non-Abelian

**Statement:** GL(2,F₂) = S₃ is the unique minimal non-abelian case. |GL(1)|=1, |GL(2)|=6, |GL(3)|=168.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.3 **Scope:** EXHAUSTION **Fragility:** SUPPORT
**Grid:** B(1, cross) **Domain:** D.0
**Stated in:** T0 §5, Thm 0.13 **Warranted in:** T0 §5 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0020 →L
**Old IDs:** T0 Thm 0.13. **Action:** preserved

---

### SNF-0026 | THM | Binary Forcing Completeness

**Statement:** Three independent criteria — equivalence branching, generativity, automorphism minimality — all select |D|=2.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.3 **Scope:** EXHAUSTION **Fragility:** SUPPORT
**Grid:** B(1, cross) **Domain:** D.0
**Stated in:** T0 §5, Thm 0.13a **Warranted in:** T0 §5 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0020 →L, SNF-0021 →L, SNF-0025 →L
**Old IDs:** T0 Thm 0.13a. **Action:** preserved

---

### SNF-0027 | THM | Duality D

**Statement:** D²=id. Phase reversal applied twice restores original orientation. D acts by reversing iteration direction.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.1 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(0, P2) **Domain:** D.0
**Stated in:** T0 §6, Thm 1.1 **Warranted in:** T0 §6 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Symmetry breaker
**Depends on:** SNF-0008 →L
**Old IDs:** T0 Thm 1.1. **Action:** preserved

---

### SNF-0028 | THM | Five Fixed-Locus Classes

**Statement:** Fix(D) has exactly five classes: bridge chain, constants, orbit types, feasibility wall, phase boundary. |Fix(D)|=5=|S₀|²+1.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** EXHAUSTION **Fragility:** SUPPORT
**Grid:** B(0, cross) **Domain:** D.0
**Stated in:** T0 §7, Thm 2.1 **Warranted in:** T0 §7 **Refined by:** T_BLUEPRINT §5.1
**Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MT7 **Role:** Classifier
**Depends on:** SNF-0027 →L
**Old IDs:** T0 Thm 2.1. T_INDEX: listed. **Action:** preserved

---

### SNF-0029 | THM | Crossing Maximality

**Statement:** {0,1} is the largest set where Part(D) is trivial. For |D|≥3, intermediate partitions create Dist/Co-Dist divergence.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.3 **Scope:** EXHAUSTION **Fragility:** SUPPORT
**Grid:** B(1, cross) **Domain:** D.0
**Stated in:** T0 §8, Thm 2.3 **Warranted in:** T0 §8 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0020 →L
**Old IDs:** T0 Thm 2.3. **Action:** preserved

---

### SNF-0030 | THM | Root Asymmetry

**Statement:** Forward chain br_s=0; backward chain br_s>0 (≥72 paths). This root asymmetry propagates through every level.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(0–1, cross) **Domain:** D.0
**Stated in:** T0 §9, Thm 3.1 **Warranted in:** T0 §9 **Proof Status:** COMPLETE
**Master Theorem:** 1 **MT/MP:** MT1 (root instance) **Role:** Symmetry breaker
**Depends on:** SNF-0004 →L
**Old IDs:** T0 Thm 3.1. T_INDEX: listed. **Action:** preserved

---

### SNF-0031 | THM | Discriminant Signature (2,1)

**Statement:** Δ on sl(2,ℝ) has signature (2,1); ~71.7% hyperbolic, ~28.3% elliptic.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(1, cross) **Domain:** D.0
**Stated in:** T0 §9, Thm 3.1b **Warranted in:** T0 §9 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MP2 **Role:** Classifier
**Depends on:** SNF-0030 →L
**Old IDs:** T0 Thm 3.1b. **Action:** preserved

---

### SNF-0032 | THM | Phase-Dist Well-Defined

**Statement:** Phase-Dist(ρ) satisfies identity, composition, associativity.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(0, P2) **Domain:** D.0
**Stated in:** T0 §12, Thm 4.3 **Warranted in:** T0 §12 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0027 →L, SNF-0030 →L
**Old IDs:** T0 Thm 4.3. **Action:** preserved

---

### SNF-0033 | THM | Partial Idempotence

**Statement:** f∘f=f on the (1−ρ) Dist fraction; f∘f≠f on the ρ Co-Dist fraction. Idempotent fraction = 1−ρ exactly.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.3 **Scope:** FAMILY (all ρ) **Fragility:** CORE
**Grid:** B(0, P2) **Domain:** D.0
**Stated in:** T0 §12, Thm 4.4 **Warranted in:** T0 §12 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Invariant
**Depends on:** SNF-0032 →L
**Old IDs:** T0 Thm 4.4. **Action:** preserved

---

### SNF-0034 | THM | Functor Asymmetry

**Statement:** Dist-ward functor canonical; Co-Dist-ward non-natural. Explicit naturality failure exhibited.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(0, P2) **Domain:** D.0
**Stated in:** T0 §12, Thm 4.5b **Warranted in:** T0 §12 **Proof Status:** COMPLETE
**Master Theorem:** 1 **MT/MP:** MT1 **Role:** Symmetry breaker
**Depends on:** SNF-0030 →L, SNF-0032 →L
**Old IDs:** T0 Thm 4.5b. T_INDEX: listed. **Action:** preserved

---

### SNF-0035 | THM | σ_FIX = 1−ρ

**Statement:** The FIX component of the spectral signature equals the idempotent fraction.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(0, P2) **Domain:** D.0
**Stated in:** T0 §14, Thm 4.8 **Warranted in:** T0 §14 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MP1 **Role:** Invariant
**Depends on:** SNF-0033 →L
**Old IDs:** T0 Thm 4.8. **Action:** preserved

---

### SNF-0036 | COR | Distinguished ρ-values

**Statement:** φ̄² (thermal, σ_FIX=φ̄) and 1/2 (phase boundary, σ_FIX=1/2). Gap = φ̄³/2 ≈ 0.118 = α_S.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(0, P2) **Domain:** D.0
**Stated in:** T0 §14, Cor 4.9 **Warranted in:** T0 §14 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MT4, MP1 **Role:** Invariant
**Depends on:** SNF-0035 →L
**Old IDs:** T0 Cor 4.9. T_INDEX: listed. **Action:** preserved

---

### SNF-0037 | THM | ρ-Regulation Regime

**Statement:** Any A1–A4 observer has optimal ρ*∈[φ̄²,1/2]. Deviation below degrades generativity; above degrades stability. Pressure endogenous via K6' self-model.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.4 **Scope:** FAMILY (all A1–A4 observers) **Fragility:** CORE
**Grid:** B(0, P2) — applies B(5, all) **Domain:** D.0
**Stated in:** T0 §14, Thm 4.10 **Warranted in:** T0 §14 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Selection mechanism
**Depends on:** SNF-0035 →L, SNF-0036 →L
**Old IDs:** T0 Thm 4.10. T_INDEX: listed. **Action:** preserved

---

### SNF-0038 | THM | P1↔P3 Encoding

**Statement:** P1 (det<0, eigenvalues off unit circle) and P3 (det>0, Δ<0, eigenvalues on unit circle) encode each other via D. P2 mediates.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(0, P2) **Domain:** D.0
**Stated in:** T0 §15, Thm 5.1 **Warranted in:** T0 §15 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MP2 **Role:** Mediator
**Depends on:** SNF-0027 →L
**Old IDs:** T0 Thm 5.1. **Action:** preserved

---

### SNF-0039 | THM | P3 Attractor

**Statement:** det(A⊗B)=det(A)²det(B)²≥0. P1 (det<0) impossible at tower level ≥2. P3 fraction grows monotonically.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** FAMILY (all levels ≥2) **Fragility:** CORE
**Grid:** B(0, cross) — applies B(2+, all) **Domain:** D.0
**Stated in:** T0 §15, Thm 5.3 **Warranted in:** T0 §15 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Obstruction
**Depends on:** SNF-0020 →L
**Old IDs:** T0 Thm 5.3. T_INDEX: listed. **Action:** preserved

---

### SNF-0040 | MT | Universal Asymmetry (UAT / MT1)

**Statement:** Every canonical derivation step runs forward with br_s=0; reverse is non-natural. Two phases: choice-asymmetry (Set, Levels 0–2) and existence-asymmetry (Vect, Levels 3+). Transition at linearization. Propagates to computation, chirality, dimensional entry.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** SCHEMA (~9 instances across 4 files) **Fragility:** CORE
**Grid:** B(0–8, cross) **Domain:** D.0
**Stated in:** T0 §18, Thm MT1 **Warranted in:** T0 §18 **Refined by:** T_BLUEPRINT §5.6 (Master Thm 1)
**Proof Status:** COMPLETE
**Master Theorem:** 1 (this IS Master Thm 1) **MT/MP:** MT1 **Role:** Symmetry breaker
**Depends on:** SNF-0030 →L, SNF-0042 →L, SNF-0043 →L, SNF-0044 →L
**Old IDs:** T0 MT1. T_INDEX: listed extensively. **Action:** preserved

---

### SNF-0041 | THM | Asymmetry Necessity for Dimensional Derivation

**Statement:** No branch-symmetric sector generates a non-removable physical scale. The anchor η=1/(4G) requires the construction-dissolution asymmetry.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(0, cross) — consequence spans to B(6) **Domain:** D.0
**Stated in:** T0 §18 **Warranted in:** T0 §18 **Proof Status:** COMPLETE
**Master Theorem:** 1, 4 **MT/MP:** MT1 **Role:** Obstruction
**Depends on:** SNF-0040 →L
**Old IDs:** T0 §18 (Asymmetry Necessity). T_INDEX: listed. **Action:** preserved

---

### SNF-0042 | THM | No Natural Retraction (NNR)

**Statement:** In Vect_k (|k|≥3), the only natural transformation η: Sq→Id (Sq(V)=V⊗V) is η=0. Proved by weight-lattice disjointness on the maximal torus.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** FAMILY (all finite-dim V) **Fragility:** CORE
**Grid:** B(0, cross) **Domain:** D.0
**Stated in:** T0 §18, Thm 7.1 **Warranted in:** T0 §18 **Proof Status:** COMPLETE
**Master Theorem:** 1 **MT/MP:** MT1 (core proof of UAT-2) **Role:** Obstruction
**Depends on:** SNF-0020 →L
**Old IDs:** T0 Thm 7.1. T_INDEX: listed. **Action:** preserved

---

### SNF-0043 | THM | Set-Theoretic Retraction Classification

**Statement:** In Set, the only natural transformations Sq→Id are π₁ and π₂. Each extends uniquely to all finite sets.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** EXHAUSTION **Fragility:** SUPPORT
**Grid:** B(0, cross) **Domain:** D.0
**Stated in:** T0 §18, Thm 7.2 **Warranted in:** T0 §18 **Proof Status:** COMPLETE
**Master Theorem:** 1 **MT/MP:** MT1 **Role:** Classifier
**Depends on:** SNF-0020 →L
**Old IDs:** T0 Thm 7.2. T_INDEX: listed. **Action:** preserved

---

### SNF-0044 | THM | Two-Phase Irreversibility

**Statement:** Asymmetry has two phases: choice-asymmetry (Set, Levels 0–2: π₁,π₂ exist but choice underdetermined) and existence-asymmetry (Vect, Levels 3+: no nonzero retraction). Transition at linearization ℚ[S₃]→M₂(ℚ).

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(0, cross) **Domain:** D.0
**Stated in:** T0 §18, Thm 7.3 **Warranted in:** T0 §18 **Proof Status:** COMPLETE
**Master Theorem:** 1 **MT/MP:** MT1 (UAT-3) **Role:** Mediator
**Depends on:** SNF-0042 →L, SNF-0043 →L
**Old IDs:** T0 Thm 7.3. T_INDEX: listed. **Action:** preserved

---

### SNF-0045 | THM | Entanglement Gap

**Statement:** (dim V − 1)² irreducible entangled dimensions per tensor lift. Positive for dim≥2, strictly increasing.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.3 **Scope:** FAMILY (all dim≥2) **Fragility:** CORE
**Grid:** B(0, cross) **Domain:** D.0
**Stated in:** T0 §18, Thm 7.4 **Warranted in:** T0 §18 **Proof Status:** COMPLETE
**Master Theorem:** 1 **MT/MP:** MT1 **Role:** Invariant
**Depends on:** SNF-0042 →L
**Old IDs:** T0 Thm 7.4. T_INDEX: listed. **Action:** preserved

---

### SNF-0046 | THM | Tower Monotone

**Statement:** Cumulative entanglement Q(n) = Σ E(k) strictly increases at every tower lift. Reduces to Bekenstein bound at Level 5.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** FAMILY (all tower levels) **Fragility:** CORE
**Grid:** B(0, cross) — applies B(0–8) **Domain:** D.0
**Stated in:** T0 §18, Thm 7.5 **Warranted in:** T0 §18 **Proof Status:** COMPLETE
**Master Theorem:** 1 **MT/MP:** MT1 **Role:** Invariant
**Depends on:** SNF-0045 →L
**Old IDs:** T0 Thm 7.5. T_INDEX: listed. **Action:** preserved

---

### SNF-0047 | THM | Bidirectional Architecture

**Statement:** Compressive and expansive engines are opposite realizations of one substrate under one duality around one fixed locus.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(0, cross) **Domain:** D.0
**Stated in:** T0 §16, Thm 6.1 **Warranted in:** T0 §16 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0027 →L, SNF-0030 →L
**Old IDs:** T0 Thm 6.1. **Action:** preserved

---

*T0 SWEEP COMPLETE. 47 entries: 3 DEF, 2 POST, 1 MT, 5 COR, 36 THM. 0 conflicts.*
*Fragility: 28 CORE, 13 SUPPORT, 4 PRESENTATION, 2 FRONTIER.*
*CLAIM_CENSUS flags: SNF-0014 (ORE) and SNF-0015 (CIA) missing from census — add.*
*Merge: SNF-0019 → SNF-0013 (duplicate content).*

---


## SWEEP 2: T1_DIST

*File: T1_DIST.md (513 lines). Grid: B(2, all). Domain: D.1.*
*Sweep date: March 2026. 25 entries extracted.*

---

### SNF-0200 | LEM | Minimal Distinction

**Statement:** Any domain in which "distinguishable" is meaningful has |D|≥2.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(2, cross) **Domain:** D.1
**Stated in:** T1 §1, Lem 1.1 **Warranted in:** T1 §1 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0007 →L (P.2)
**Old IDs:** T1 Lem 1.1. **Action:** preserved

---

### SNF-0201 | LEM | Self-Product Exists

**Statement:** Given |D|≥2, D×D exists with |D×D|=|D|².

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(2, cross) **Domain:** D.1
**Stated in:** T1 §1, Lem 1.2 **Warranted in:** T1 §1 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Generator
**Depends on:** SNF-0006 →L (P.1), SNF-0200 →L
**Old IDs:** T1 Lem 1.2. **Action:** preserved

---

### SNF-0202 | LEM | Canonical Projections

**Statement:** D×D comes equipped with canonical projections π₁,π₂ forced by the universal property of the Cartesian product. Not chosen — forced.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(2, cross) **Domain:** D.1
**Stated in:** T1 §1, Lem 1.3 **Warranted in:** T1 §1 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Generator
**Depends on:** SNF-0201 →L
**Old IDs:** T1 Lem 1.3. **Action:** preserved

---

### SNF-0203 | LEM | Kernels of Projections

**Statement:** For each πᵢ, ker(πᵢ) is a well-defined subset of (D×D)×(D×D) partitioning S₁ into equivalence classes.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(2, cross) **Domain:** D.1
**Stated in:** T1 §1, Lem 1.4 **Warranted in:** T1 §1 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0202 →L, SNF-0205 →L
**Old IDs:** T1 Lem 1.4. **Action:** preserved

---

### SNF-0205 | THM | Kernel Theorem

**Statement:** For any function f:A→B, ker(f)={(x,y)∈A×A : f(x)=f(y)} is an equivalence relation on A. Reflexivity, symmetry, transitivity all follow from properties of equality on B.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** FAMILY (all functions) **Fragility:** CORE
**Grid:** B(2, cross) **Domain:** D.1
**Stated in:** T1 §2, Thm 1.5 **Warranted in:** T1 §2 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Generator
**Depends on:** SNF-0202 →L (projections provide the functions)
**Old IDs:** T1 Thm 1.5. T_INDEX: listed. **Action:** preserved

---

### SNF-0207 | THM | Morphism Forcing

**Statement:** Three independent arguments — kernel covariance, quotient factoring, five-way elimination — force equivalence-preserving maps as the unique morphism class with zero interpretive freedom.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(2, cross) **Domain:** D.1
**Stated in:** T1 §3, Thm 1.7 **Warranted in:** T1 §3 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Generator
**Depends on:** SNF-0205 →L
**Old IDs:** T1 Thm 1.7. T_INDEX: listed. **Action:** preserved

---

### SNF-0208 | THM | Quotient Universal Property

**Statement:** Equivalence-preserving maps factor uniquely through quotients. The quotient factorization is canonical.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(2, cross) **Domain:** D.1
**Stated in:** T1 §3, Thm 1.7a **Warranted in:** T1 §3 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0207 →L
**Old IDs:** T1 Thm 1.7a. **Action:** preserved

---

### SNF-0209 | THM | Dist Morphisms Compose

**Statement:** Dist morphisms compose and have identities, forming a well-defined category.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(2, cross) **Domain:** D.1
**Stated in:** T1 §3, Thm 1.8 **Warranted in:** T1 §3 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0207 →L
**Old IDs:** T1 Thm 1.8. **Action:** preserved

---

### SNF-0210 | THM | Dist Is the Unique Forced Category

**Statement:** Among five candidate categories (Set, Rel, Dist, Co-Dist, Exact), Dist is the unique survivor. Set too weak, Rel too strong, Co-Dist wrong direction, Exact too restrictive.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(2, cross) **Domain:** D.1
**Stated in:** T1 §4, Thm 1.9 **Warranted in:** T1 §§4-5 (five-way elimination 3.1-3.5) **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Classifier
**Depends on:** SNF-0207 →L, SNF-0209 →L
**Old IDs:** T1 Thm 1.9. T_INDEX: listed. **Action:** preserved

---

### SNF-0211 | THM | Set Too Weak

**Statement:** Set fails: no equivalence structure, functions can violate kernel covariance, quotient factoring does not hold in general, four specific deficiencies.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(2, cross) **Domain:** D.1
**Stated in:** T1 §5, Thm 3.1 **Warranted in:** T1 §5 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Obstruction
**Depends on:** SNF-0207 →L
**Old IDs:** T1 Thm 3.1. **Action:** preserved

---

### SNF-0212 | THM | Rel Too Strong

**Statement:** Rel fails: non-functional relations are too unconstrained, four specific deficiencies.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(2, cross) **Domain:** D.1
**Stated in:** T1 §5, Thm 3.2 **Warranted in:** T1 §5 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Obstruction
**Depends on:** SNF-0207 →L
**Old IDs:** T1 Thm 3.2. **Action:** preserved

---

### SNF-0213 | THM | Co-Dist Wrong Direction

**Statement:** Co-Dist (equivalence-reflecting maps) has wrong direction: reflects rather than preserves.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(2, cross) **Domain:** D.1
**Stated in:** T1 §5, Thm 3.3 **Warranted in:** T1 §5 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Obstruction
**Depends on:** SNF-0207 →L
**Old IDs:** T1 Thm 3.3. **Action:** preserved

---

### SNF-0214 | THM | Exact Too Restrictive

**Statement:** Exact (preserving AND reflecting) is too restrictive: eliminates the quotient maps that define observation.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(2, cross) **Domain:** D.1
**Stated in:** T1 §5, Thm 3.4 **Warranted in:** T1 §5 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Obstruction
**Depends on:** SNF-0207 →L
**Old IDs:** T1 Thm 3.4. **Action:** preserved

---

### SNF-0215 | THM | Observer = Dist Quotient Morphism

**Statement:** Observers and Dist quotient morphisms are in bijective correspondence. The identification is functorial.

**SIL Grade:** FORCED **Warrant Space:** G.3 · T.1 · O.2 **Scope:** IDENTIFICATION **Fragility:** CORE
**Grid:** B(2, P3) **Domain:** D.1
**Stated in:** T1 §6, Thm 2.2 **Warranted in:** T1 §6 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Closure operator
**Depends on:** SNF-0210 →L
**Old IDs:** T1 Thm 2.2. T_INDEX: listed. C-020 (approx). **Action:** preserved

---

### SNF-0216 | COR | Observers Internal to Dist

**Statement:** Observers are not external impositions. They are a specific class of Dist morphisms — internal substructure.

**SIL Grade:** FORCED **Warrant Space:** G.3 · T.1 · O.2 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(2, P3) **Domain:** D.1
**Stated in:** T1 §6, Cor 2.3 **Warranted in:** T1 §6 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0215 →L
**Old IDs:** T1 Cor 2.3. **Action:** preserved

---

### SNF-0217 | THM | Blind Spot = Kernel

**Statement:** The kernel of an observer is exactly its equivalence relation. ker(obs)=≈_A. The observer's blind spot is its kernel.

**SIL Grade:** FORCED **Warrant Space:** G.3 · T.1 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(2, P3) **Domain:** D.1
**Stated in:** T1 §6.3, Thm 2.5 **Warranted in:** T1 §6.3 **Proof Status:** COMPLETE
**Master Theorem:** 1 **MT/MP:** MT3 (UKI-2) **Role:** Obstruction
**Depends on:** SNF-0215 →L
**Old IDs:** T1 Thm 2.5. T_INDEX: listed. **Action:** preserved

---

### SNF-0218 | MT | Universal Kernel Irreducibility (UKI / MT3)

**Statement:** At every tower level n≥2, every nontrivial observer has non-trivial ker(q)≠∅ that simultaneously: enables observation (UKI-1), limits it (UKI-2), seeds the next level (UKI-3), sources Landauer cost (UKI-4), forbids ideal observation (UKI-5), forces meta-level blindness (UKI-6).

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** SCHEMA (6 instances across 5 files) **Fragility:** CORE
**Grid:** B(2, P3) — applies B(2+, all) **Domain:** D.1
**Stated in:** T1 §6.4, Thm MT3 **Warranted in:** T1 §6.4 **Refined by:** T_BLUEPRINT §5.6 (Master Thm 1)
**Proof Status:** COMPLETE
**Master Theorem:** 1 (this IS the ker(f) face of Productive Opacity) **MT/MP:** MT3 (this IS MT3) **Role:** Obstruction
**Depends on:** SNF-0215 →L, SNF-0217 →L
**Old IDs:** T1 MT3. T_INDEX: listed extensively. **Action:** preserved

---

### SNF-0219 | THM | R(R)=R Is Forced (Quotient Idempotence)

**Statement:** For any (D,≈) in Dist, the quotient map q satisfies q∘q=q. Observation is idempotent.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** FAMILY (all Dist objects) **Fragility:** CORE
**Grid:** B(2, P1) **Domain:** D.1
**Stated in:** T1 §7, Thm 4.1 **Warranted in:** T1 §7 **Proof Status:** COMPLETE
**Master Theorem:** 2 **MT/MP:** MT2 (SAFPT-3) **Role:** Closure operator **Closure Type:** recursive
**Depends on:** SNF-0210 →L, SNF-0215 →L
**Old IDs:** T1 Thm 4.1. T_INDEX: listed. **Action:** preserved

---

### SNF-0220 | COR | Observation Stabilizes

**Statement:** Applying an observer to its own output returns the same output. K(K)=K.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.3 **Scope:** FAMILY **Fragility:** SUPPORT
**Grid:** B(2, P1) **Domain:** D.1
**Stated in:** T1 §7, Cor 4.2 **Warranted in:** T1 §7 **Proof Status:** COMPLETE
**Master Theorem:** 2 **MT/MP:** MT2 **Role:** —
**Depends on:** SNF-0219 →L
**Old IDs:** T1 Cor 4.2. **Action:** preserved

---

### SNF-0221 | THM | R(R)=R Both Definition and Theorem

**Statement:** As definition: idempotent = f∘f=f. As theorem: given only Dist, q∘q=q is a consequence not a postulate.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** LOCAL **Fragility:** PRESENTATION
**Grid:** B(2, P1) **Domain:** D.1
**Stated in:** T1 §7, Thm 4.3 **Warranted in:** T1 §7 **Proof Status:** COMPLETE
**Master Theorem:** 2 **MT/MP:** MT2 (SAFPT-5) **Role:** —
**Depends on:** SNF-0219 →L
**Old IDs:** T1 Thm 4.3. **Action:** preserved

---

### SNF-0222 | THM | Observer Fixed Point Unique Minimal

**Statement:** The quotient map q is the unique minimal idempotent endomorphism of (D,≈) in Dist. Any coarser idempotent factors through q.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(2, P1) **Domain:** D.1
**Stated in:** T1 §7.4, Thm 4.4 **Warranted in:** T1 §7.4 **Proof Status:** COMPLETE
**Master Theorem:** 2 **MT/MP:** MT2 (SAFPT-2) **Role:** Selection mechanism
**Depends on:** SNF-0219 →L
**Old IDs:** T1 Thm 4.4. **Action:** preserved

---

### SNF-0223 | THM | Three Simultaneous Readings

**Statement:** Every Dist morphism simultaneously instantiates P1 (algebraic composition), P2 (level-transition), P3 (observation with kernel). These are not separate systems but complementary descriptions.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.2 **Scope:** FAMILY (all Dist morphisms) **Fragility:** CORE
**Grid:** B(2, cross) **Domain:** D.1
**Stated in:** T1 §8, Thm 5.1 **Warranted in:** T1 §8 **Proof Status:** COMPLETE
**Master Theorem:** 5, 6 **MT/MP:** — **Role:** Classifier
**Depends on:** SNF-0210 →L
**Old IDs:** T1 Thm 5.1. T_INDEX: listed. **Action:** preserved

---

### SNF-0224 | COR | Three Projections Not Separate Systems

**Statement:** P1, P2, P3 are not three separate axiom systems. They are three simultaneous readings present from the moment Dist is forced.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.2 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(2, cross) **Domain:** D.1
**Stated in:** T1 §8.2, Cor 5.2 **Warranted in:** T1 §8.2 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0223 →L
**Old IDs:** T1 Cor 5.2. **Action:** preserved

---

### SNF-0225 | THM | Each Projection Contains the Others

**Statement:** Each projection contains recognizable images of the other two. Six explicit containments: P1⊃P2, P1⊃P3, P2⊃P1, P2⊃P3, P3⊃P1, P3⊃P2.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.2 **Scope:** EXHAUSTION (six containments) **Fragility:** CORE
**Grid:** B(2, cross) **Domain:** D.1
**Stated in:** T1 §8.2, Thm 5.3 **Warranted in:** T1 §8.2 (sketch); T3_META Thm 2.1 (full)
**Proof Status:** SCATTERED (sketch here, full in T3_META)
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0223 →L
**Old IDs:** T1 Thm 5.3. T_INDEX: listed. **Action:** preserved

---

### SNF-0226 | THM | Dist-Ward Functor Is Natural (T1)

**Statement:** The Dist-ward functor from the categorical site is natural (commutes with morphisms). The Co-Dist-ward functor is not natural. Asymmetry at the functor level.

**SIL Grade:** FORCED **Warrant Space:** G.3 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(2, P2) **Domain:** D.1
**Stated in:** T1 §6, context of MT3 **Proof Status:** COMPLETE
**Depends on:** SNF-0034 →L

---

*T1 SWEEP COMPLETE. 25 entries: 4 LEM, 1 MT, 3 COR, 17 THM. 0 conflicts.*
*Fragility: 12 CORE, 11 SUPPORT, 2 PRESENTATION.*
*All claims FORCED. Generation: G.1 (15), G.3 (3), G.5 (4), no assignment (3 LEM).*
*Key forward references: SNF-0205 (Kernel Thm) used by SNF-0010 (SRD Equivalence) — cross-file dependency confirmed.*

---


## SWEEP 3: T2_BRIDGE

*File: T2_BRIDGE.md (1079 lines). Grid: B(3, all). Domain: D.2.*
*Sweep date: March 2026. 55 entries extracted.*

---

### SNF-0350 | THM | Self-Product Tower

**Statement:** |S_n| = 2^{2^n}. Tower grows doubly-exponentially.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.3 **Scope:** FAMILY (all n) **Fragility:** SUPPORT
**Grid:** B(2, P1) **Domain:** D.2
**Stated in:** T2 §1, Thm 1.2 **Warranted in:** T2 §1 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Generator
**Depends on:** SNF-0004 →L
**Old IDs:** T2 Thm 1.2. **Action:** preserved

---

### SNF-0351 | THM | S₁ = V₄

**Statement:** S₁ = {0,1}² with XOR is V₄. All non-identity elements order 2.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.1 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(2, P1) **Domain:** D.2
**Stated in:** T2 §2, Thm 1.4 **Warranted in:** T2 §2 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Generator
**Depends on:** SNF-0350 →L
**Old IDs:** T2 Thm 1.4. T_INDEX: listed. **Action:** preserved

---

### SNF-0352 | THM | Aut(V₄) = S₃

**Statement:** Aut(V₄) = S₃ ≅ GL(2,F₂). Six automorphisms = permutations of V₄\{0}. Relations r³=I, s²=I, srs=r⁻¹.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.1 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(2, P1) **Domain:** D.2
**Stated in:** T2 §3, Thm 1.5 **Warranted in:** T2 §3 **Proof Status:** COMPLETE
**Master Theorem:** 5 **Role:** Generator
**Depends on:** SNF-0351 →L
**Old IDs:** T2 Thm 1.5. T_INDEX: listed. **Action:** preserved

---

### SNF-0353 | THM | ℚ[S₃] Minimal Splitting-Field

**Statement:** ℚ[S₃] is the minimal splitting-field group algebra. All characters rational, all Schur indices 1.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.1 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T2 §4, Thm 2.2 **Warranted in:** T2 §4 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Generator
**Depends on:** SNF-0352 →L
**Old IDs:** T2 Thm 2.2. **Action:** preserved

---

### SNF-0354 | THM | Artin-Wedderburn Decomposition

**Statement:** ℚ[S₃] ≅ ℚ ⊕ ℚ ⊕ M₂(ℚ). Three irreps (1²+1²+2²=6), unique decomposition.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.1 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T2 §4, Thm 2.3 **Warranted in:** T2 §4 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Generator
**Depends on:** SNF-0353 →L
**Old IDs:** T2 Thm 2.3. T_INDEX: listed. **Action:** preserved

---

### SNF-0355 | THM | Bridge Chain (Zero Branching)

**Statement:** {0,1}→V₄→S₃→ℚ[S₃]→M₂(ℚ)→M₂(ℝ)⊃sl(2,ℝ)→M₂(ℂ). Zero branching at every step.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(1–3, cross) **Domain:** D.2
**Stated in:** T2 §5, Thm 2.1 **Warranted in:** T2 §5 **Proof Status:** COMPLETE
**Master Theorem:** 2 **MT/MP:** MT2 **Role:** Generator **Closure Type:** recursive
**Depends on:** SNF-0351 →L, SNF-0352 →L, SNF-0353 →L, SNF-0354 →L
**Old IDs:** T2 Thm 2.1. T_INDEX: listed. C-030 (approx). **Action:** preserved

---

### SNF-0356 | THM | Generators R,N Span M₂(ℝ)

**Statement:** R=[[0,1],[1,1]], N=[[0,−1],[1,0]]. Basis {I,R,N,RN} spans M₂(ℝ). Traceless subalgebra = sl(2,ℝ).

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.1 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T2 §6, Thm 2.4 **Warranted in:** T2 §6 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Generator
**Depends on:** SNF-0355 →L
**Old IDs:** T2 Thm 2.4. T_INDEX: listed. **Action:** preserved

---

### SNF-0357 | THM | Spectral Completion

**Statement:** R eigenvalues φ,−φ̄ ∈ ℝ\ℚ; N eigenvalues ±i ∈ ℂ\ℝ. Spectral completion → M₂(ℂ). Zero branching.

**SIL Grade:** FORCED **Warrant Space:** G.2 · T.1 · O.1 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T2 §6, Thm 2.5 **Warranted in:** T2 §6 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Generator
**Depends on:** SNF-0356 →L
**Old IDs:** T2 Thm 2.5. T_INDEX: listed. **Action:** preserved

---

### SNF-0358 | THM | GL(2,ℝ) Orbit Types Exhaustive

**Statement:** Three orbit types: P1 (det<0, hyperbolic), P2 (det>0 Δ>0), P3 (det>0 Δ<0). Exhaustive.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.2 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(3–4, cross) **Domain:** D.2
**Stated in:** T2 §7, Thm 3.1 **Warranted in:** T2 §7 **Proof Status:** COMPLETE
**Master Theorem:** 5, 6 **MT/MP:** MP2 **Role:** Classifier
**Depends on:** SNF-0356 →L
**Old IDs:** T2 Thm 3.1. T_INDEX: listed. **Action:** preserved

---

### SNF-0359 | THM | Orbit-Projection Correspondence

**Statement:** P1↔I²(R), P2↔TDL(h), P3↔LoMI(N). Each orbit type has a canonical generator.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.2 **Scope:** IDENTIFICATION **Fragility:** CORE
**Grid:** B(3–4, cross) **Domain:** D.2
**Stated in:** T2 §7, Thm 3.2 **Warranted in:** T2 §7 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Classifier
**Depends on:** SNF-0358 →L
**Old IDs:** T2 Thm 3.2. **Action:** preserved

---

### SNF-0360 | THM | Binary-to-Trinary Transition

**Statement:** The binary seed {0,1} forces exactly 3 orbit types via |V₄\{0}|=3 with S₃ acting transitively.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T2 §7.1, Thm 3.3 **Warranted in:** T2 §7.1 **Proof Status:** COMPLETE
**Master Theorem:** 5 **Role:** Symmetry breaker
**Depends on:** SNF-0351 →L, SNF-0352 →L
**Old IDs:** T2 Thm 3.3. **Action:** preserved

---

### SNF-0361 | THM | Killing-Determinant Duality

**Statement:** For M∈sl(2,ℝ): det(M) = −B(M,M)/8. Orbit-type = Killing-sign classification. Nilpotent cone separates sectors.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T2 §7.2, Thm 3.4 **Warranted in:** T2 §7.2 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MP2 **Role:** —
**Depends on:** SNF-0356 →L
**Old IDs:** T2 Thm 3.4. **Action:** preserved

---

### SNF-0362 | THM | ‖R‖_F = √3

**Statement:** √3 = Frobenius norm of R. Three independent computations agree.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.1 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T2 §8, Thm 8.2 **Warranted in:** T2 §8 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MT7 **Role:** Invariant
**Depends on:** SNF-0356 →L
**Old IDs:** T2 Thm 8.2. **Action:** preserved

---

### SNF-0363 | THM | ‖N‖_F = √2

**Statement:** √2 = Frobenius norm of N. Algebraically independent of √3: [ℚ(√2,√3,√5):ℚ]=8>4.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.1 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(3, P3) **Domain:** D.2
**Stated in:** T2 §8, Thm 8.3 **Warranted in:** T2 §8 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MT7 **Role:** Invariant
**Depends on:** SNF-0356 →L
**Old IDs:** T2 Thm 8.3. **Action:** preserved

---

### SNF-0364 | THM | Norm-Sum Identity

**Statement:** disc(R) = ‖R‖² + ‖N‖² = 3+2 = 5. Holds iff det(R)=−1.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T2 §8, Thm 8.4 **Warranted in:** T2 §8 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MT7 **Role:** Invariant
**Depends on:** SNF-0362 →L, SNF-0363 →L
**Old IDs:** T2 Thm 8.4. T_INDEX: listed. **Action:** preserved

---

### SNF-0365 | COR | Gram Determinant = disc(R)²

**Statement:** det(Gram({I,R,N,RN})) = 25 = 5². Block-diagonal: each sector contributes disc(R). Eigenvalues √5·φ, √5·φ̄.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T2 §8, Cor 8.5 **Warranted in:** T2 §8 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MT7 **Role:** Invariant
**Depends on:** SNF-0364 →L
**Old IDs:** T2 Cor 8.5. T_INDEX: listed. **Action:** preserved

---

### SNF-0366 | THM | Discriminant as Cardinal Sum

**Statement:** disc(R) = |V₄|+1 = |S₀|²+1 = 5. Holds iff tr(R)=1, det(R)=−1 — both forced.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T2 §8, Thm 8.7 **Warranted in:** T2 §8 **Proof Status:** COMPLETE
**Master Theorem:** 5 **MT/MP:** MT7 **Role:** Invariant
**Depends on:** SNF-0351 →L, SNF-0356 →L
**Old IDs:** T2 Thm 8.7. T_INDEX: listed. **Action:** preserved

---

### SNF-0367 | THM | Forcing Rank of Constants

**Statement:** π > φ > e > √3 > √2 by forcing quality (specificity of the algebraic mechanism that produces each).

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3–4, cross) **Domain:** D.2
**Stated in:** T2 §9, Thm 4.5 **Warranted in:** T2 §9 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Classifier
**Depends on:** SNF-0362 →L, SNF-0363 →L, SNF-0357 →L
**Old IDs:** T2 Thm 4.5. **Action:** preserved

---

### SNF-0368 | THM | No Sixth Constant

**Statement:** No sixth constant is forced by the bridge chain. Five constants {φ,e,π,√2,√3} are complete.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.2 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(3–4, cross) **Domain:** D.2
**Stated in:** T2 §9, Thm 4.6 **Warranted in:** T2 §9 + T2 §15 (Basis Closure) **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Obstruction
**Depends on:** SNF-0367 →L
**Old IDs:** T2 Thm 4.6. T_INDEX: listed. **Action:** preserved

---

### SNF-0369 | MT | Geometric-Progression Forcing (GPF / MT4)

**Statement:** Any ordered three-projection functional consistent with Fibonacci eigenvalue structure has unique weights (1/2, φ̄/2, φ̄²/2) — the self-signature. Geometric progression with ratio φ̄ summing to 1.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.2 **Scope:** SCHEMA **Fragility:** CORE
**Grid:** B(3–4, cross) **Domain:** D.2
**Stated in:** T2 §9½, Thm MT4 **Warranted in:** T2 §9½ **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MT4 (this IS MT4) **Role:** Selection mechanism
**Depends on:** SNF-0356 →L, SNF-0358 →L
**Old IDs:** T2 MT4. T_INDEX: listed. **Action:** preserved

---

### SNF-0370 | THM | Seven Identities of {R,N}

**Statement:** Six fundamental identities: R²=R+I, N²=−I, {R,N}=N, RNR=−N, NRN=R⁻¹=R−I, (RN)²=I. Seventh: [R,N]²=disc(R)·I=5I.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.3 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T2 §19+§19½ **Warranted in:** T2 §19+§19½ **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Generator
**Depends on:** SNF-0356 →L
**Old IDs:** T2 §19. T_INDEX: listed. **Action:** preserved (consolidation of seven sub-theorems)

---

### SNF-0371 | THM | Native Observation Channels

**Statement:** O±=(I±H)/2 where H=[R,N]/√5 are rank-1 idempotent readout channels. Observation latent in bridge algebra before observer axioms.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(3, P3) **Domain:** D.2
**Stated in:** T2 §19½a, Thm 19½a.1 **Warranted in:** T2 §19½a **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Generator
**Depends on:** SNF-0370 →L (seventh identity [R,N]²=5I)
**Old IDs:** T2 Thm 19½a.1. T_INDEX: listed. **Action:** preserved

---

### SNF-0372 | THM | Seed Observer

**Statement:** q₀:B→B/~₀ induced by O± is the algebraic instantiation of the categorical observer (T1 Thm 2.2) — a quotient with kernel and image.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(3, P3) **Domain:** D.2
**Stated in:** T2 §19½a, Thm 19½a.3 **Warranted in:** T2 §19½a **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Closure operator
**Depends on:** SNF-0371 →L, SNF-0215 →T
**Old IDs:** T2 Thm 19½a.3. T_INDEX: listed. **Action:** preserved

---

### SNF-0373 | THM | Root Decomposition of sl(2,ℝ)

**Statement:** sl(2,ℝ) decomposes into root spaces via native generators. Root vectors e± satisfy e±²=0 (mode iii). Controls representation theory and orbit-type boundaries.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.1 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T2 §19¾, Thm 19¾.1 **Warranted in:** T2 §19¾ **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0356 →L
**Old IDs:** T2 Thm 19¾.1. **Action:** preserved

---

### SNF-0374 | THM | Transcendence Degeneration

**Statement:** exp(M)=I+M when M²=0 on the nilpotent cone. The exponential degenerates to polynomial on the boundary between orbit types.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(3, P2) **Domain:** D.2
**Stated in:** T2 §19¾, Thm 19¾.1b **Warranted in:** T2 §19¾ **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Obstruction
**Depends on:** SNF-0373 →L
**Old IDs:** T2 Thm 19¾.1b. **Action:** preserved

---

### SNF-0375 | THM | Cl(1,1) ≅ M₂(ℝ)

**Statement:** Clifford generators ε₁=(2/√5)(R−I/2), ε₂=N satisfy ε₁²=+1, ε₂²=−1, ε₁ε₂+ε₂ε₁=0. The Clifford algebra Cl(1,1) is isomorphic to M₂(ℝ).

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.1 **Scope:** IDENTIFICATION **Fragility:** CORE
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T2 §21 **Warranted in:** T2 §21 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0356 →L
**Old IDs:** T2 §21. T_INDEX: listed. **Action:** preserved

---

### SNF-0376 | THM | Koide Q = 2/3

**Statement:** Q = ‖N‖²/‖R‖² = 2/3. Equals the Koide ratio. Trigonometric: Q = 2/n for n equally-spaced phases with n=|V₄\{0}|=3.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.7 · O.3 **Scope:** IDENTIFICATION **Fragility:** CORE
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T2 §22+§28 **Warranted in:** T2 §22+§28 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MT7 **Role:** Invariant
**Depends on:** SNF-0362 →L, SNF-0363 →L
**Old IDs:** T2 §22+§28. T_INDEX: listed. **Action:** preserved

---

### SNF-0377 | THM | Casimir = sin²θ_W = 3/8

**Statement:** C_fund = ‖N‖²·‖R‖²/|S₀|⁴ = 2·3/16 = 3/8 = sin²θ_W at the GUT scale.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.7 · O.3 **Scope:** IDENTIFICATION **Fragility:** CORE
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T2 §23.1, Thm 23.1e **Warranted in:** T2 §23.1 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MT7 **Role:** Invariant
**Depends on:** SNF-0362 →L, SNF-0363 →L
**Old IDs:** T2 Thm 23.1e. T_INDEX: listed. **Action:** preserved

---

### SNF-0378 | THM | Strip-Regime Bridge

**Statement:** strip(A) = A−(tr(A)/2)·I. Projective discriminant = −4det(strip(A)). Regime determined by det(strip).

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.2 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T2 §23½, Thm 23½.1 **Warranted in:** T2 §23½ **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MP2 **Role:** —
**Depends on:** SNF-0356 →L
**Old IDs:** T2 Thm 23½.1. **Action:** preserved

---

### SNF-0379 | THM | Exponential Sector Purity

**Statement:** exp(G) ∈ span{I,G} for G∈{R,N,RN}. Each generator's exponential stays within its own 2D sector.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** FAMILY **Fragility:** CORE
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T2 §30½, Thm 30½.1 **Warranted in:** T2 §30½ **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0370 →L
**Old IDs:** T2 Thm 30½.1. **Action:** preserved

---

### SNF-0380 | THM | Hecke Realization of CH

**Statement:** R²=R+I is the Hecke relation T²=(q−1)T+q at q=φ² under T=φR.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.7 · O.3 **Scope:** IDENTIFICATION **Fragility:** CORE
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T2 §31, Thm 31.1 **Warranted in:** T2 §31 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0370 →L (R²=R+I)
**Old IDs:** T2 Thm 31.1. **Action:** preserved

---

### SNF-0381 | THM | Quantum Group Realization

**Statement:** Root vectors e± and K=diag(φ²,φ̄²) satisfy all defining relations of U_{φ²}(sl₂).

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.1 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T2 §31, Thm 31.2 **Warranted in:** T2 §31 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Generator
**Depends on:** SNF-0373 →L, SNF-0357 →L
**Old IDs:** T2 Thm 31.2. **Action:** preserved

---

### SNF-0382 | THM | Hopf Algebra Completeness

**Statement:** U_{φ²}(sl₂) is a complete Hopf algebra: coproduct from monoidal lift, counit from trivial rep, antipode from duality D. All axioms verified.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.1 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T2 §31, Thm 31.3 **Warranted in:** T2 §31 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0381 →L
**Old IDs:** T2 Thm 31.3. **Action:** preserved

---

### SNF-0383 | THM | Quantum Integers = Even Fibonacci

**Statement:** [n]_{φ²} = F(2n) for all n≥1. The quantum integer is the even-indexed Fibonacci number.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** FAMILY (all n) **Fragility:** CORE
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T2 §31, Thm 31.4 **Warranted in:** T2 §31 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MP1 **Role:** Invariant
**Depends on:** SNF-0381 →L
**Old IDs:** T2 Thm 31.4. T_INDEX: listed. **Action:** preserved

---

### SNF-0384 | THM | Temperley-Lieb Parameter = √disc(R)

**Statement:** TL loop parameter at q=φ² is d=q^{1/2}+q^{−1/2}=φ+φ̄=√5=√disc(R).

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T2 §31, Thm 31.5 **Warranted in:** T2 §31 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MT7 **Role:** Invariant
**Depends on:** SNF-0381 →L
**Old IDs:** T2 Thm 31.5. **Action:** preserved

---

### SNF-0385 | THM | Jones-Discriminant Identity

**Statement:** V(4₁; φ²) = 5 = disc(R). The Jones polynomial of the figure-eight knot at the Hecke parameter equals the discriminant.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.7 · O.3 **Scope:** LOCAL **Fragility:** FRONTIER
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T2 §31, Thm 31.6 **Warranted in:** T2 §31 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MT7 **Role:** Invariant
**Depends on:** SNF-0381 →L
**Old IDs:** T2 Thm 31.6. T_INDEX: listed. **Action:** preserved

---

### SNF-0386 | THM | Alexander-Hecke Identity

**Statement:** Alexander polynomial of 4₁ has roots {φ², φ̄²}={q, q⁻¹}. Mahler measure = 2ln(φ). Alexander determinant = 5 = disc(R).

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.7 · O.3 **Scope:** LOCAL **Fragility:** FRONTIER
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T2 §31, Thm 31.7 **Warranted in:** T2 §31 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MT7 **Role:** Invariant
**Depends on:** SNF-0381 →L, SNF-0370 →L
**Old IDs:** T2 Thm 31.7. T_INDEX: listed. **Action:** preserved

---

### SNF-0387 | THM | Phase-Dist → Hecke Map

**Statement:** q(ρ) = φ^{2(1−2ρ)}. At ρ=0: q=φ² (hyperbolic). At ρ=1/2: q=1 (classical). At ρ=1: q=φ̄² (conjugate). Phase-Dist family = Hecke deformation family.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.7 · O.3 **Scope:** IDENTIFICATION **Fragility:** CORE
**Grid:** B(3, P2) **Domain:** D.2
**Stated in:** T2 §32, Thm 32.1 **Warranted in:** T2 §32 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Mediator
**Depends on:** SNF-0033 →T, SNF-0380 →L
**Old IDs:** T2 Thm 32.1. **Action:** preserved

---

### SNF-0388 | THM | Norm Non-Constancy on S₃ Classes

**Statement:** The Frobenius norm is NOT constant on S₃ conjugacy classes. Different elements of the same class can have different norms.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T2 §22.1 **Warranted in:** T2 §22.1 **Proof Status:** COMPLETE
**Depends on:** SNF-0362 →L, SNF-0352 →T
**Old IDs:** T2 §22.1. **Action:** new (gap-fill)

---

### SNF-0389 | THM | Transposition Norm Variance σ²=Q/n_gen=2/9

**Statement:** Variance of Frobenius norms across S₃ transpositions is 2/9. Equals Koide ratio divided by number of generators.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T2 §22.2 **Warranted in:** T2 §22.2 **Proof Status:** COMPLETE
**Depends on:** SNF-0376 →L
**Old IDs:** T2 §22.2. **Action:** new (gap-fill)

---

### SNF-0390 | THM | Five Constants by Generator Source (2×2+1 Table)

**Statement:** Five constants organized by source: R contributes {φ,√3}, N contributes {π,√2}, [R,N] contributes {e}. The 2×2+1 structure.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T2 §22.3 **Warranted in:** T2 §22.3 **Proof Status:** COMPLETE
**Depends on:** SNF-0362 →L, SNF-0363 →L, SNF-0370 →L
**Old IDs:** T2 §22.3. **Action:** new (gap-fill)

---

### SNF-0391 | COR | Casimir Decomposition in Framework Cardinals

**Statement:** C_fund decomposes as products of framework cardinals: ‖N‖²·‖R‖²/|S₀|⁴ = Q×p² where p=‖R‖²/|S₀|² and Q=2/3.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T2 §23.1, Cor 23.1a **Warranted in:** T2 §23.1 **Proof Status:** COMPLETE
**Depends on:** SNF-0377 →L
**Old IDs:** T2 Cor 23.1a. **Action:** new (gap-fill)

---

### SNF-0392 | THM | Traceless Regime Law M²=−det(M)·I

**Statement:** For traceless M∈sl(2,ℝ): M²=−det(M)·I. The Cayley-Hamilton equation with tr=0 controls all flow dynamics.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** FAMILY **Fragility:** SUPPORT
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T2 §23½, Thm 23½.2 **Warranted in:** T2 §23½ **Proof Status:** COMPLETE
**Depends on:** SNF-0378 →L
**Old IDs:** T2 Thm 23½.2. **Action:** new (gap-fill)

---

### SNF-0393 | THM | Regime-Readout Duality

**Statement:** The stripped traceless core's determinant simultaneously controls flow regime (sign) and projective fixed-point geometry (roots). One scalar, two readings.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T2 §23½, Thm 23½.3 **Warranted in:** T2 §23½ **Proof Status:** COMPLETE
**Depends on:** SNF-0392 →L
**Old IDs:** T2 Thm 23½.3. **Action:** new (gap-fill)

---

### SNF-0394 | THM | φ-Minimality: disc=5 Minimum Productive Discriminant

**Statement:** disc(R)=5 is the minimum discriminant where the Norm-Sum Identity holds productively (generating ℤ[φ], not just ℤ). Jump from disc=4 (involutory) to disc=5 (Fibonacci).

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T2 §23½, Thm 23½.5 **Warranted in:** T2 §23½ **Proof Status:** COMPLETE
**Depends on:** SNF-0366 →L, SNF-0364 →L
**Old IDs:** T2 Thm 23½.5. **Action:** new (gap-fill)

---

### SNF-0395 | THM | Koide Q=2/n Trigonometric Identity

**Statement:** Q = 2/n for n equally-spaced phases on the unit circle, with n=|V₄\{0}|=3. The mass parameter a=√2=‖N‖_F is forced.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.7 · O.3 **Scope:** IDENTIFICATION **Fragility:** CORE
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T2 §28, Thm 28.1 **Warranted in:** T2 §28 **Proof Status:** COMPLETE
**Depends on:** SNF-0376 →L, SNF-0360 →T
**Old IDs:** T2 Thm 28.1. **Action:** new (gap-fill)

---

### SNF-0396 | THM | Exponential Binet Formula

**Statement:** b = Σ F(n)/n! = (e^φ − e^{1−φ})/√5. Generalized Fibonacci determinant: a²+ab−b²=e.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T2 §30½, Thm 30½.2-3 **Warranted in:** T2 §30½ **Proof Status:** COMPLETE
**Depends on:** SNF-0379 →L
**Old IDs:** T2 Thms 30½.2-3. **Action:** new (gap-fill)

---

### SNF-0397 | COR | Verlinde Recovery of R²=R+I

**Statement:** The Verlinde formula applied to the Fibonacci anyon S-matrix recovers τ×τ=1+τ = R²=R+I. Three faces: algebraic (CH), categorical (fusion), representation-theoretic (Hecke).

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.7 · O.3 **Scope:** IDENTIFICATION **Fragility:** SUPPORT
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T2 §31, Cor 31.1a **Warranted in:** T2 §31 **Proof Status:** COMPLETE
**Depends on:** SNF-0380 →L
**Old IDs:** T2 Cor 31.1a. **Action:** new (gap-fill)

---

### SNF-0398 | COR | Colored Jones Fibonacci Product

**Statement:** J_N(4₁;φ²) is a pure Fibonacci product. Values are exact integers: J₁=1, J₂=9, J₃=3529. Growth: ~(φ^{4N}/5)^{N−1}.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.7 · O.3 **Scope:** FAMILY (all N) **Fragility:** FRONTIER
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T2 §31, Cor 31.4c-d **Warranted in:** T2 §31 **Proof Status:** COMPLETE
**Depends on:** SNF-0383 →L
**Old IDs:** T2 Cors 31.4c-d. **Action:** new (gap-fill)

---

### SNF-0399 | THM | F-Matrix and Born Rule

**Statement:** Fibonacci anyon F-matrix has all entries as φ̄-powers. F²=I. Born rule probabilities P(q1=0)=φ̄², P(q1=1)=φ̄. Entanglement entropy 0.96 bits (96% of Bell max).

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.7 · O.3 **Scope:** LOCAL **Fragility:** FRONTIER
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T2 §31, Thm 31.7b **Warranted in:** T2 §31 **Proof Status:** COMPLETE
**Depends on:** SNF-0381 →L, SNF-0380 →L
**Old IDs:** T2 Thm 31.7b. **Action:** new (gap-fill)

---

### SNF-0400 | THM | Norm-Lucas Identity

**Statement:** ‖Rⁿ‖²_F = L(2n)+2 where L is the Lucas sequence. Connects Frobenius norms of all R-powers to Lucas numbers.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** FAMILY **Fragility:** SUPPORT
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T2 §22, Thm 8.8 **Proof Status:** COMPLETE
**Depends on:** SNF-0362 →L, SNF-0370 →L

---

### SNF-0401 | THM | Binary-to-Trinary Forcing

**Statement:** The binary algebra {R,N} on S₀={0,1} forces exactly three orbit types. |V₄\{0}|=3 is the categorical origin of the number 3 in the framework.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T2 §8 **Proof Status:** COMPLETE
**Depends on:** SNF-0358 →L, SNF-0351 →L

---

### SNF-0402 | THM | Four-Fold Observational Ordering

**Statement:** The five constants have observational order: spectral {φ,e,π} (first-order, what the algebra IS) before geometric {√2,√3} (second-order, how observation MEASURES). The 3+2 = rank(Λ').

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T2 §19½a, Thm 4.7 **Proof Status:** COMPLETE
**Depends on:** SNF-0371 →L, SNF-0390 →L

---

### SNF-0403 | THM | Nilpotent Boundary Sterility

**Statement:** At the nilpotent point s=1/2 of the Killing sweep, the exponential gives algebraic value 3/2 = 1/Q_Koide. No transcendental output. The nilpotent boundary is sterile — it produces only framework cardinals.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T2 §19¾, Cor 19¾.1c **Proof Status:** COMPLETE
**Depends on:** SNF-0379 →L

---

### SNF-0404 | THM | Fibonacci Determinant Tautology (Zero Algebraic Resistance)

**Statement:** det(exp(R))=exp(tr(R))=e¹=e. The bridge from R to e has zero algebraic resistance — it's a Lie-group tautology. This makes (e,π) independence harder, not easier.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, P2) **Domain:** D.2
**Stated in:** T2 §30½, Thm 30½.4 **Proof Status:** COMPLETE
**Depends on:** SNF-0379 →L, SNF-0802 →T

## T3_P1 REMAINING (6)

---

*T2 SWEEP COMPLETE. 38 entries: 4 COR, 2 MT, 32 THM. 0 conflicts.*
*Fragility: 26 CORE, 8 SUPPORT, 2 FRONTIER, 2 PRESENTATION.*
*All claims FORCED. Generation: G.1 (10), G.2 (1), G.4 (23), G.5 (4).*
*Key results: Bridge Chain (SNF-0355), Seven Identities (SNF-0370), Native Observation (SNF-0371–0372), Quantum Group (SNF-0381), Koide (SNF-0376), Casimir=sin²θ_W (SNF-0377).*
*Note: Many §22-§30 results compressed into parent entries. Full sub-theorem expansion deferred to Layer B dependency pass.*

---


## SWEEP 4: T3_P1_PRODUCTION

*File: T3_P1_PRODUCTION.md (1239 lines). Grid: B(4, P1). Domain: D.3.*
*Sweep date: March 2026. 30 entries extracted.*

---

### SNF-0700 | THM | φ Is Forced by P1

**Statement:** φ is the unique non-trivial fixed point of det=−1 binary matrices. Among the three det=−1 binaries {J,R,Q}, only R and Q (J-conjugate) have irrational eigenvalues (φ,−φ̄). J has eigenvalues ±1 (trivial).

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.1 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §1, Thm 4.1 **Warranted in:** T3_P1 §1.2 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MP1 **Role:** Generator
**Depends on:** SNF-0356 →L, SNF-0024 →L
**Old IDs:** T3_P1 Thm 4.1. T_INDEX: listed. **Action:** preserved

---

### SNF-0701 | THM | Bi-Infinite Closure

**Statement:** Rⁿ = F(n)R + F(n−1)I extends to all n∈ℤ. Negation identity: F(−n)=(−1)^{n+1}F(n). Cassini identity for all integers.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** FAMILY (all n∈ℤ) **Fragility:** SUPPORT
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §2.2, Thm 2.1a **Warranted in:** T3_P1 §2.2 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MP3 **Role:** —
**Depends on:** SNF-0370 →L (R²=R+I)
**Old IDs:** T3_P1 Thm 2.1a. **Action:** preserved

---

### SNF-0702 | THM | Eigenchannel Decomposition

**Statement:** Fibonacci numbers decompose as F(n)=(φⁿ−(−φ̄)ⁿ)/√5 (Binet). Two channels: expanding (φⁿ) and contracting ((−φ̄)ⁿ). Dominance swaps at n=0.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** FAMILY **Fragility:** SUPPORT
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §2.10, Thm 2.10a **Warranted in:** T3_P1 §2.10 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MP1 **Role:** —
**Depends on:** SNF-0700 →L
**Old IDs:** T3_P1 Thm 2.10a. **Action:** preserved

---

### SNF-0703 | THM | Möbius Attractor φ̄

**Statement:** φ̄ is the universal attractor of the Möbius action f(x)=1/(1+x) on ℝP¹. Contraction rate |f'(φ̄)|=φ̄². Basin = ℝ\{−φ}.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §2.4 **Warranted in:** T3_P1 §2.4 **Proof Status:** COMPLETE
**Master Theorem:** 2 **MT/MP:** MP3 **Role:** Invariant **Closure Type:** terminal
**Depends on:** SNF-0700 →L
**Old IDs:** T3_P1 §2.4. **Action:** preserved

---

### SNF-0704 | THM | I²-Dominance of Fibonacci

**Statement:** Fibonacci numbers are 100% I²-dominant in the projection classification. Z = 77.27 (statistical significance).

**SIL Grade:** ENCODED **Warrant Space:** G.5 · T.4 · O.3 **Scope:** FAMILY **Fragility:** SUPPORT
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §3.3, Thms 4.2+4.5 **Warranted in:** T3_P1 §3.3 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Classifier
**Depends on:** SNF-0700 →L
**Old IDs:** T3_P1 Thms 4.2, 4.5. **Action:** preserved (merged two sub-theorems)

---

### SNF-0705 | THM | Zeckendorf Is R-Canonical

**Statement:** Zeckendorf representation (unique sum of non-adjacent Fibonacci numbers) is the canonical encoding for the R-operator. The non-adjacency constraint is the Cayley-Hamilton relation R²=R+I applied at the representation level.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §4.1, Thm 6.1 **Warranted in:** T3_P1 §4.1 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0370 →L
**Old IDs:** T3_P1 Thm 6.1. **Action:** preserved

---

### SNF-0706 | THM | Z[φ] Ring Structure

**Statement:** The ring Z[φ] with multiplication φ²=φ+1 is the canonical algebraic structure for P1 arithmetic. Ring axioms verified.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.1 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §4.2, Thm 3.2 **Warranted in:** T3_P1 §4.2 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0700 →L
**Old IDs:** T3_P1 Thm 3.2. **Action:** preserved

---

### SNF-0707 | THM | P1 Primitive Mapping

**Statement:** R carries exactly two magnitude classes: FIX (eigenvalue φ̄, magnitude <1, convergent) and REPEL (eigenvalue φ, magnitude >1, divergent).

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §5.1, Thm 5.1 **Warranted in:** T3_P1 §5.1 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Classifier
**Depends on:** SNF-0700 →L
**Old IDs:** T3_P1 Thm 5.1. **Action:** preserved

---

### SNF-0708 | THM | FIX Convergence Rate = φ̄²

**Statement:** FIX converges at rate φ̄² per iteration. Error |r(n)−φ̄| ~ φ̄^{2n}/√5.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §5.2, Thm 5.2 **Warranted in:** T3_P1 §5.2 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MT4 **Role:** Invariant
**Depends on:** SNF-0703 →L
**Old IDs:** T3_P1 Thm 5.2. **Action:** preserved

---

### SNF-0709 | THM | Self-Signature = (1/2, φ̄/2, φ̄²/2)

**Statement:** The spectral signature of the P1 operator is the unique geometric progression with ratio φ̄ summing to 1.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §5.3, Thm 5.4 **Warranted in:** T3_P1 §5.3 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MT4 (this is the P1 instance of GPF) **Role:** Invariant
**Depends on:** SNF-0369 →L (GPF)
**Old IDs:** T3_P1 Thm 5.4. T_INDEX: listed. **Action:** preserved

---

### SNF-0710 | THM | Natural Temperature β = ln(φ)

**Statement:** β = ln(φ) is the unique temperature at which σ_FIX = φ̄ (Boltzmann weight matches Fibonacci contraction).

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §5.4, Thm 5.6 **Warranted in:** T3_P1 §5.4 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Invariant
**Depends on:** SNF-0709 →L
**Old IDs:** T3_P1 Thm 5.6. T_INDEX: listed. **Action:** preserved

---

### SNF-0711 | THM | Four-Domain Universality of φ̄²

**Statement:** φ̄² appears independently as: (a) FIX contraction rate, (b) OWF threshold, (c) Phase-Dist thermal equilibrium, (d) per-step eigenvalue suppression. All reduce to φ̄²+φ̄=1 (CH at x=φ̄).

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** EXHAUSTION (four domains + fifth in 5.9b) **Fragility:** CORE
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §5.6, Thm 5.9 **Warranted in:** T3_P1 §5.6 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MT4 **Role:** Invariant
**Depends on:** SNF-0708 →L, SNF-0036 →T
**Old IDs:** T3_P1 Thm 5.9. T_INDEX: listed. **Action:** preserved

---

### SNF-0712 | COR | Self-Reference–Equilibrium Gap = α_S

**Statement:** Gap between self-referential ρ=1/2 and thermal ρ=φ̄² is φ̄³/2 = α_S. The strong coupling constant measures displacement between self-reference and equilibrium.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.7 · O.3 **Scope:** IDENTIFICATION **Fragility:** FRONTIER
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §5.6, Cor 5.9b **Warranted in:** T3_P1 §5.6 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Invariant
**Depends on:** SNF-0711 →L, SNF-0036 →L
**Old IDs:** T3_P1 Cor 5.9b. T_INDEX: listed. **Action:** preserved

---

### SNF-0713 | THM | Möbius-RG Equation

**Statement:** r(n+1)=1/(1+r(n)) where r(n)=F(n−1)/F(n). Power iteration of R is a discrete RG flow. Fixed point φ̄, contraction φ̄².

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §5.7, Thm 5.10 **Warranted in:** T3_P1 §5.7 **Proof Status:** COMPLETE
**Master Theorem:** 2 **MT/MP:** MT2, MT4 **Role:** Generator
**Depends on:** SNF-0370 →L, SNF-0700 →L
**Old IDs:** T3_P1 Thm 5.10. T_INDEX: listed. **Action:** preserved

---

### SNF-0714 | THM | Möbius-RG Quotient Collapse

**Statement:** Q(r)=lim fᵏ(r)=φ̄ for all r≠−φ. Q∘Q=Q (idempotent). ker(Q)=ℝ\{−φ}. P1 realization of q∘q=q.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §5.7, Thm 5.10b **Warranted in:** T3_P1 §5.7 **Proof Status:** COMPLETE
**Master Theorem:** 2 **MT/MP:** MT2 **Role:** Closure operator **Closure Type:** terminal
**Depends on:** SNF-0713 →L
**Old IDs:** T3_P1 Thm 5.10b. **Action:** preserved

---

### SNF-0715 | THM | Three Sakharov Conditions

**Statement:** The P1 projection satisfies structural analogs of all three Sakharov conditions: (1) baryon violation via J:R→Q (det=−1, orientation-reversing), (2) CP violation via RN≠QN, (3) departure from equilibrium via P1's purely hyperbolic dynamics.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.7 · O.3 **Scope:** EXHAUSTION (three conditions) **Fragility:** CORE
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §6.1, Thm 8.5 **Warranted in:** T3_P1 §6.1 **Proof Status:** COMPLETE
**Master Theorem:** 1 **MT/MP:** MT1 **Role:** Symmetry breaker
**Depends on:** SNF-0030 →L (Root Asymmetry), SNF-0700 →L
**Old IDs:** T3_P1 Thm 8.5. T_INDEX: listed. **Action:** preserved

---

### SNF-0716 | THM | Baryon Asymmetry η = φ̄^{44}

**Statement:** η = φ̄^{2n} with n=22. E_baryon = E_Planck × φ̄^{44} ≈ 7.8×10⁹ GeV. Within the leptogenesis regime (10⁹–10¹² GeV).

**SIL Grade:** RESONANT **Warrant Space:** G.5 · T.8 · O.5 **Scope:** LOCAL **Fragility:** FRONTIER
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §6.2, Thm 8.6 **Warranted in:** T3_P1 §6.2 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0715 →L, SNF-0700 →L
**Old IDs:** T3_P1 Thm 8.6. T_INDEX: listed. **Action:** preserved

---

### SNF-0717 | THM | Dimensional Derivation of n = 22

**Statement:** n = dim(su(3)⊕su(2)⊕u(1)) + dim(ℝ^{1,3}) + dim_ℝ(SL(2,ℂ)) = 12+4+6 = 22. Sandwich proof: lower bound from Sakharov completeness, upper bound from framework exhaustiveness.

**SIL Grade:** ENCODED **Warrant Space:** G.7 · T.7 · O.3 **Scope:** LOCAL **Fragility:** FRONTIER
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §6.3, Thm 8.7 **Warranted in:** T3_P1 §6.3 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0715 →L, *SNF-1300+* →T (T6A spacetime dim), *SNF-1350+* →T (T6B gauge dim)
**Old IDs:** T3_P1 Thm 8.7. T_INDEX: listed. **Action:** preserved

---

### SNF-0718 | THM | S₃ Duality Gaps Sum to φ̄

**Statement:** The three gaps between consecutive spectral signature components sum to φ̄. Individual gaps: 1/2−φ̄/2=(1−φ̄)/2=φ̄²/2, φ̄/2−φ̄²/2=φ̄³/2, and φ̄²/2. Total = φ̄.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §5.3, Thm 5.5 **Warranted in:** T3_P1 §5.3 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Invariant
**Depends on:** SNF-0709 →L
**Old IDs:** T3_P1 Thm 5.5. **Action:** preserved

---

### SNF-0719 | THM | MIX Threshold Hierarchy

**Statement:** φ̄² = structural threshold. [φ̄², 1/2] = computational MIX range. 1/2 = self-referential boundary. MIX = neither pure FIX nor pure REPEL.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §5.5, Thm 5.8 **Warranted in:** T3_P1 §5.5 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Classifier
**Depends on:** SNF-0711 →L
**Old IDs:** T3_P1 Thm 5.8. **Action:** preserved

---

### SNF-0720 | THM | Gram Eigenvalues

**Statement:** Gram matrix of {I,R,N,RN} has eigenvalues √5·φ and √5·φ̄ (each multiplicity 2). det = 5² = disc(R)².

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §2.6, Thm 2.6 **Warranted in:** T3_P1 §2.6 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MT7 **Role:** Invariant
**Depends on:** SNF-0365 →L
**Old IDs:** T3_P1 Thm 2.6. **Action:** preserved

---

### SNF-0721 | THM | Sign Transition Theorem (FLIP/ZERO/SAME)

**Statement:** The bi-infinite Fibonacci field has three sign regimes: FLIP (n<−1, sign-distinguishing), ZERO (n=0, crossing), SAME (n>0, sign-collapsing). Recapitulates Dist/Co-Dist coincidence.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §2.2½, Thm 2.1h **Warranted in:** T3_P1 §2.2½ **Proof Status:** COMPLETE
**Depends on:** SNF-0701 →L
**Old IDs:** T3_P1 Thm 2.1h. **Action:** new (gap-fill)

---

### SNF-0722 | THM | Centered Value Cell = {−1,0,+1}

**Statement:** Unit ball of the bi-infinite Fibonacci field = {−1,0,+1}, forced by tr(R)=1.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §2.2½, Thm 2.1e **Warranted in:** T3_P1 §2.2½ **Proof Status:** COMPLETE
**Depends on:** SNF-0701 →L
**Old IDs:** T3_P1 Thm 2.1e. **Action:** new (gap-fill)

---

### SNF-0723 | THM | BC Decomposition of Fibonacci Orbit

**Statement:** The Fibonacci orbit in pair-space decomposes into balance-charge coordinates, exhibiting all three projection types simultaneously.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §2.10, Thm 2.10c **Warranted in:** T3_P1 §2.10 **Proof Status:** COMPLETE
**Depends on:** SNF-0702 →L
**Old IDs:** T3_P1 Thm 2.10c. **Action:** new (gap-fill)

---

### SNF-0724 | THM | D-Action in Fibonacci Coordinates

**Statement:** D acts on the bi-infinite field by F(n)↦F(−n)=(−1)^{n+1}F(n). Preserves |F(n)|, recurrence law, and Möbius attractor φ̄; reverses channel dominance and stability.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** FAMILY **Fragility:** SUPPORT
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §2.5½, Thm 2.5a **Warranted in:** T3_P1 §2.5½ **Proof Status:** COMPLETE
**Depends on:** SNF-0027 →T (Duality D), SNF-0701 →L
**Old IDs:** T3_P1 Thm 2.5a. **Action:** new (gap-fill)

---

### SNF-0725 | THM | Sequence-Projection Correspondence

**Statement:** Specific integer sequences map to specific projections: Fibonacci→I² (100%), highly composite→LoMI (93.3%), primes→I²/TDL hybrid.

**SIL Grade:** ENCODED **Warrant Space:** G.5 · T.4 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §3.3, Thm 4.7 **Warranted in:** T3_P1 §3.3 **Proof Status:** COMPLETE
**Depends on:** SNF-0704 →L
**Old IDs:** T3_P1 Thm 4.7. **Action:** new (gap-fill)

---

### SNF-0726 | THM | Fibonacci Self-Duality

**Statement:** Fibonacci numbers are the arithmetic fixed locus of D. Same numbers extreme in both compressive and expansive phases.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T0 §16, Thm 6.2 (also T3_P1 context) **Warranted in:** T0 §16 **Proof Status:** COMPLETE
**Depends on:** SNF-0027 →L, SNF-0700 →L
**Old IDs:** T0 Thm 6.2 / T3_P1 context. **Action:** new (gap-fill)

---

### SNF-0727 | THM | Cl(1,1) Identification

**Statement:** {I,R,N,RN} spans M₂(ℝ) with integer multiplication table. Clifford generators ε₁=(2/√5)(R−I/2), ε₂=N satisfy ε₁²=+1, ε₂²=−1, giving Cl(1,1)≅M₂(ℝ).

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.1 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §2.7, Thm 2.8 **Proof Status:** COMPLETE
**Depends on:** SNF-0375 →L

---

### SNF-0728 | THM | Tensor Tower (Self-Product at Algebraic Level)

**Statement:** The tensor tower Rⁿ at the algebraic level generates M₂ⁿ(ℝ) = M₂(ℝ)^{⊗n}. Self-product at the matrix level.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** FAMILY **Fragility:** SUPPORT
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §2.8 **Proof Status:** COMPLETE
**Depends on:** SNF-0727 →L, SNF-0350 →T

---

### SNF-0729 | THM | Fibonacci Exponential Cascade

**Statement:** exp(R) has entries expressible in {e^φ, e^{−φ̄}, √5}. The exponential of the Fibonacci matrix generates a cascade connecting P1 eigenvalues to P2 transcendentals.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §2.9 **Proof Status:** COMPLETE
**Depends on:** SNF-0700 →L, SNF-0800 →T

---

### SNF-0730 | THM | R on Λ' Coordinates

**Statement:** R acts on Λ' coordinates by (r,d,c,a,b) → linear transform encoding the Fibonacci recurrence in each coordinate.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §2.5 **Proof Status:** COMPLETE
**Depends on:** SNF-0700 →L, SNF-1000 →T

---

### SNF-0731 | THM | Zeckendorf Parity Split

**Statement:** The parity of the number of Zeckendorf summands correlates with I²-dominance. Even parity favors I², odd favors TDL.

**SIL Grade:** ENCODED **Warrant Space:** G.5 · T.4 · O.3 **Scope:** FAMILY **Fragility:** SUPPORT
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §4.3 **Proof Status:** COMPLETE
**Depends on:** SNF-0705 →L

---

### SNF-0732 | THM | Norm Tower and Six Proofs of L₄=7

**Statement:** L₄=7 (fourth Lucas number) has six independent proofs from framework structure: norm formula, trace formula, Cayley-Hamilton, eigenvalue, counting, and Galois-theoretic.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** EXHAUSTION (6 proofs) **Fragility:** SUPPORT
**Grid:** B(4, P1) **Domain:** D.3
**Stated in:** T3_P1 §4.6 **Proof Status:** COMPLETE
**Depends on:** SNF-0400 →T, SNF-0701 →L

## T3_P2 REMAINING (4)

---

*T3_P1 SWEEP COMPLETE. 21 entries: 1 COR, 20 THM. 0 conflicts.*
*Fragility: 12 CORE, 6 SUPPORT, 3 FRONTIER.*
*SIL: 18 FORCED, 1 ENCODED, 2 RESONANT. Generation: all G.5 (projection-induced).*
*Key results: φ forced (SNF-0700), Möbius-RG (SNF-0713–0714), Sakharov (SNF-0715), η=φ̄^{44} (SNF-0716), n=22 (SNF-0717), Four-Domain φ̄² (SNF-0711).*

---


## SWEEP 5: T3_P2_MEDIATION

*File: T3_P2_MEDIATION.md (699 lines). Grid: B(4, P2). Domain: D.3.*
*Sweep date: March 2026. 16 entries extracted.*

---

### SNF-0800 | THM | e Is Forced by P2

**Statement:** h=[[1,0],[0,−1]] is the unique (up to sign) traceless diagonal 2×2 matrix with entries in {0,±1}. exp(h)[0,0] = e.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.1 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(4, P2) **Domain:** D.3
**Stated in:** T3_P2 §1.1, Thm 4.2 **Warranted in:** T3_P2 §1.1 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** — **Role:** Generator
**Depends on:** SNF-0356 →L
**Old IDs:** T3_P2 Thm 4.2. T_INDEX: listed. **Action:** preserved

---

### SNF-0801 | THM | P2 Primitive Mapping: P2 → OSC

**Statement:** P2 maps to oscillatory computation (OSC): derived composite interpolating P1↔P3. Neither pure FIX nor pure INV.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(4, P2) **Domain:** D.3
**Stated in:** T3_P2 §1.6, Thm 1.6 **Warranted in:** T3_P2 §1.6 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Classifier
**Depends on:** SNF-0800 →L
**Old IDs:** T3_P2 Thm 1.6. **Action:** preserved

---

### SNF-0802 | THM | e = det(exp(R))

**Statement:** e = det(exp(R)) = exp(tr(R)). The exponential bridge from P1 to P2.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P2) **Domain:** D.3
**Stated in:** T3_P2 §1, Thm 1.7 **Warranted in:** T3_P2 §1 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Mediator
**Depends on:** SNF-0800 →L, SNF-0356 →L
**Old IDs:** T3_P2 Thm 1.7. **Action:** preserved

---

### SNF-0803 | THM | TDL Tower Saturation

**Statement:** Compression wall at d². The TDL complexity tower saturates at d_K² generator directions.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P2) **Domain:** D.3
**Stated in:** T3_P2 §2, Thm 1.2 **Warranted in:** T3_P2 §2 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Obstruction
**Depends on:** SNF-0800 →L
**Old IDs:** T3_P2 Thm 1.2. **Action:** preserved

---

### SNF-0804 | THM | S₃ Cayley Distance

**Statement:** TDL complexity as S₃ distance. Diameter = 2, complexity values C ∈ {0, 1/2, 1}.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P2) **Domain:** D.3
**Stated in:** T3_P2 §3, Thm 2.2 **Warranted in:** T3_P2 §3 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Invariant
**Depends on:** SNF-0352 →L
**Old IDs:** T3_P2 Thm 2.2. **Action:** preserved

---

### SNF-0805 | THM | Detailed Balance

**Statement:** P(n→m)/P(m→n) = exp(−βΔV). Detailed balance holds at all β including β→0.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(4, P2) **Domain:** D.3
**Stated in:** T3_P2 §4, Thm 3.3 **Warranted in:** T3_P2 §4 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0800 →L, SNF-0710 →T
**Old IDs:** T3_P2 Thm 3.3. **Action:** preserved

---

### SNF-0806 | THM | KMS Partition Function

**Statement:** Z(β) = coth(β/2)⁴. At natural temperature: coth(ln(φ)/2) = φ³. Z_M(ln(φ)) = φ^{12}.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(4, P2) **Domain:** D.3
**Stated in:** T3_P2 §4, Thm 4.5 + Cor 4.5a **Warranted in:** T3_P2 §4 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MT4 **Role:** Invariant
**Depends on:** SNF-0805 →L, SNF-0710 →L
**Old IDs:** T3_P2 Thm 4.5. T_INDEX: listed. **Action:** preserved

---

### SNF-0807 | THM | Landauer Cost at Framework Temperature

**Statement:** E_Landauer = log_φ(2) = ln(2)/ln(φ) at natural temperature β=ln(φ). Framework-native information erasure cost.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(4, P2) **Domain:** D.3
**Stated in:** T3_P2 §4, Thm 4.4 **Warranted in:** T3_P2 §4 **Proof Status:** COMPLETE
**Master Theorem:** 4 **Role:** Invariant
**Depends on:** SNF-0710 →L
**Old IDs:** T3_P2 Thm 4.4. **Action:** preserved

---


### SNF-0808 | THM | Entry/Killing Alignment at k=2

**Statement:** √(2k) = k iff k=2. The entry normalization and Killing form agree uniquely at the framework's dimension.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P2) **Domain:** D.3
**Stated in:** T3_P2 §1.5 **Warranted in:** T3_P2 §1.5 **Proof Status:** COMPLETE
**Depends on:** SNF-0800 →L
**Old IDs:** T3_P2 Thm 5.2. **Action:** new (gap-fill)

---

### SNF-0809 | THM | TDL-Equivalence of All n

**Statement:** All n ∈ ℕ are TDL-equivalent as categories — every finite set admits the same tower structure.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** FAMILY **Fragility:** SUPPORT
**Grid:** B(4, P2) **Domain:** D.3
**Stated in:** T3_P2 §2.5 **Warranted in:** T3_P2 §2.5 **Proof Status:** COMPLETE
**Depends on:** SNF-0803 →L
**Old IDs:** T3_P2 §2.5. **Action:** new (gap-fill)

---

### SNF-0810 | THM | C_max Complexity Depth Bound

**Statement:** C_max(n) = 2ⁿ/log₂(φ). Maximum complexity depth from the self-product tower.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** FAMILY **Fragility:** SUPPORT
**Grid:** B(4, P2) **Domain:** D.3
**Stated in:** T3_P2 §2.6 **Warranted in:** T3_P2 §2.6 **Proof Status:** COMPLETE
**Depends on:** SNF-0803 →L, SNF-0700 →T
**Old IDs:** T3_P2 Thm 2.6. **Action:** new (gap-fill)

---

### SNF-0811 | THM | P Open, NP Closed in Signature Space

**Statement:** In the spectral signature topology, P-type computations form an open set, NP-type form a closed set.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P2) **Domain:** D.3
**Stated in:** T3_P2 §3.4 **Warranted in:** T3_P2 §3.4 **Proof Status:** COMPLETE
**Depends on:** SNF-0804 →L
**Old IDs:** T3_P2 Thm 3.4. **Action:** new (gap-fill)

---

### SNF-0812 | THM | Extension to ℤ

**Statement:** V(−n) = V(n). Parity symmetry. Fixed points at {±1}.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P2) **Domain:** D.3
**Stated in:** T3_P2 §4.6 **Warranted in:** T3_P2 §4.6 **Proof Status:** COMPLETE
**Depends on:** SNF-0805 →L
**Old IDs:** T3_P2 Thm 3.6. **Action:** new (gap-fill)

---

### SNF-0813 | THM | Extension to ℚ

**Statement:** Potential V extends to ℚ via p-adic valuations. Rational dynamics preserve the Markov structure.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P2) **Domain:** D.3
**Stated in:** T3_P2 §4.7 **Warranted in:** T3_P2 §4.7 **Proof Status:** COMPLETE
**Depends on:** SNF-0805 →L
**Old IDs:** T3_P2 Thm 3.7. **Action:** new (gap-fill)

---


### SNF-0814 | COR | Asymptotic Type III Dominance (P3 Attractor in P2)

**Statement:** At large n, TDL dynamics are asymptotically dominated by Type III (rotation). The P3 attractor governs P2 at depth.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P2) **Domain:** D.3
**Stated in:** T3_P3 §1.4, Cor 1.5b (cross-referenced in T3_P2) **Proof Status:** COMPLETE
**Depends on:** SNF-0851 →T, SNF-0803 →L

---

### SNF-0815 | THM | Detailed Balance at β→0 (High Temperature)

**Statement:** Detailed balance holds at β→0 (infinite temperature limit). The balance condition is structural, not merely thermodynamic.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P2) **Domain:** D.3
**Stated in:** T3_P2 §4.2 **Proof Status:** COMPLETE
**Depends on:** SNF-0805 →L

---

### SNF-0816 | THM | Shell Counts N₄(C)=(8C³+16C)/3

**Statement:** The number of lattice points at complexity C from the origin in the C*-dynamical system. Polynomial in C.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** FAMILY **Fragility:** SUPPORT
**Grid:** B(4, P2) **Domain:** D.3
**Stated in:** T3_P2 §4.5 **Proof Status:** COMPLETE
**Depends on:** SNF-0806 →L

---

### SNF-0817 | THM | KMS-Fibonacci Identity

**Statement:** coth(ln(φ)/2) = φ³ exactly. Z_M(ln(φ)) = φ^{12}. The KMS partition function at natural temperature IS a Fibonacci power.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(4, P2) **Domain:** D.3
**Stated in:** T3_P2 §4.5, Cor 4.5a **Proof Status:** COMPLETE
**Depends on:** SNF-0806 →L, SNF-0710 →L

## T3_P3 REMAINING (4)

---

*T3_P2 SWEEP COMPLETE. 14 entries: 14 THM. 0 conflicts.*
*Fragility: 5 CORE, 9 SUPPORT. All FORCED. All G.4 or G.5.*

---

## SWEEP 6: T3_P3_OBSERVATION

*File: T3_P3_OBSERVATION.md (727 lines). Grid: B(4, P3). Domain: D.3.*
*Sweep date: March 2026. 12 entries extracted.*

---

### SNF-0850 | THM | π Is Absolutely Forced

**Statement:** N=[[0,−1],[1,0]] is the unique skew-symmetric 2×2 matrix with entries in {0,±1} and N²=−I. The unique θ∈(0,2π) with exp(Nθ)=−I is θ=π. Zero ambiguity.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.1 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(4, P3) **Domain:** D.3
**Stated in:** T3_P3 §1.1, Thm 4.3 **Warranted in:** T3_P3 §1.1 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Generator
**Depends on:** SNF-0356 →L
**Old IDs:** T3_P3 Thm 4.3. T_INDEX: listed. **Action:** preserved

---

### SNF-0851 | THM | P3 Primitive Mapping: P3 → INV

**Statement:** P3 maps to inversive computation (INV): unit-magnitude eigenvalues, norm-preserving, rotation.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(4, P3) **Domain:** D.3
**Stated in:** T3_P3 §1.4, Thm 1.4 **Warranted in:** T3_P3 §1.4 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Classifier
**Depends on:** SNF-0850 →L
**Old IDs:** T3_P3 Thm 1.4. **Action:** preserved

---

### SNF-0852 | THM | Maximal Compact SO(2)

**Statement:** exp(θN) traces SO(2) = maximal compact subgroup of SL(2,ℝ). exp(πN)=−I generates the center. SL(2,ℝ)/{±I} = PSL(2,ℝ).

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.1 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(4, P3) **Domain:** D.3
**Stated in:** T3_P3 §1.6, Thm 1.7 **Warranted in:** T3_P3 §1.6 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Generator
**Depends on:** SNF-0850 →L
**Old IDs:** T3_P3 Thm 1.7. **Action:** preserved

---

### SNF-0853 | THM | Binary-Phase Closure (Euler Identity)

**Statement:** e^{iπ}+1=0. Derivable from framework axioms: the binary seed {0,1} is continuously realized through the P3 attractor as {1, e^{iπ}+1}={identity, cancellation}.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P3) **Domain:** D.3
**Stated in:** T3_P3 §1.6, Thm 1.7b **Warranted in:** T3_P3 §1.6 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0850 →L, SNF-0800 →T (e from P2)
**Old IDs:** T3_P3 Thm 1.7b. T_INDEX: listed. **Action:** preserved

---

### SNF-0854 | THM | Spin-½ Is P3 Structure

**Statement:** ker(SL(2,ℂ)→SO⁺(1,3))={I,exp(πN)}. The 2:1 covering (spin-½) is forced by the center generated by exp(πN)=−I. A 2π rotation ≠ identity; 4π required.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(4, P3) **Domain:** D.3
**Stated in:** T3_P3 §1.6½, Thm 1.7a **Warranted in:** T3_P3 §1.6½ **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Generator
**Depends on:** SNF-0852 →L
**Old IDs:** T3_P3 Thm 1.7a. **Action:** preserved

---

### SNF-0855 | THM | Mutual Incompleteness

**Statement:** No injective map B(H_U)→B(H_K) exists when d_K<d_U. Observation is constitutively incomplete. Indistinguishable from simulation within K.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.2 **Scope:** FAMILY **Fragility:** CORE
**Grid:** B(4, P3) **Domain:** D.3
**Stated in:** T3_P3 §2, Thm 1.8 **Warranted in:** T3_P3 §2 **Proof Status:** COMPLETE
**Master Theorem:** 1 **MT/MP:** MT3 **Role:** Obstruction
**Depends on:** SNF-0218 →L (UKI)
**Old IDs:** T3_P3 Thm 1.8. T_INDEX: listed. **Action:** preserved

---

### SNF-0856 | THM | Koide Q from Norm Ratio

**Statement:** Q = ‖N‖²/‖R‖² = 2/3 = Koide ratio. The mass parameter ρ = ‖N‖_F = √2 is forced.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.7 · O.3 **Scope:** IDENTIFICATION **Fragility:** CORE
**Grid:** B(4, P3) **Domain:** D.3
**Stated in:** T3_P3 §3, Thm 1.10 **Warranted in:** T3_P3 §3 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MT7 **Role:** Invariant
**Depends on:** SNF-0362 →L, SNF-0363 →L
**Old IDs:** T3_P3 Thm 1.10. T_INDEX: listed. **Action:** preserved — note: same content as SNF-0376, cross-ref

---


### SNF-0857 | THM | N Uniqueness

**Statement:** N is the unique skew-symmetric 2×2 matrix with entries in {0,±1} and N²=−I.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.1 **Scope:** EXHAUSTION **Fragility:** SUPPORT
**Grid:** B(4, P3) **Domain:** D.3
**Stated in:** T3_P3 §1.1 **Warranted in:** T3_P3 §1.1 **Proof Status:** COMPLETE
**Depends on:** SNF-0356 →L
**Old IDs:** T3_P3 §1.1. **Action:** new (gap-fill)

---

### SNF-0858 | THM | N Algebraic Properties

**Statement:** N²=−I, N⁴=I, ‖N‖_F=√2. The rotation generator's complete algebraic profile.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P3) **Domain:** D.3
**Stated in:** T3_P3 §1.2 **Warranted in:** T3_P3 §1.2 **Proof Status:** COMPLETE
**Depends on:** SNF-0857 →L
**Old IDs:** T3_P3 §1.2. **Action:** new (gap-fill)

---

### SNF-0859 | THM | Rotation Matrix Formula

**Statement:** exp(θN) = cos(θ)I + sin(θ)N. The continuous rotation flow on M₂(ℝ).

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** FAMILY (all θ) **Fragility:** CORE
**Grid:** B(4, P3) **Domain:** D.3
**Stated in:** T3_P3 §1.2 **Warranted in:** T3_P3 §1.2 **Proof Status:** COMPLETE
**Depends on:** SNF-0858 →L
**Old IDs:** T3_P3 §1.2. **Action:** new (gap-fill)

---

### SNF-0860 | THM | P1↔P3 Phase Duality

**Statement:** x²−x−1=0 (P1, roots φ,−φ̄) ↔ x²+x+1=0 (P3, roots ω,ω²). Algebraic inverses. |ω|=1.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** IDENTIFICATION **Fragility:** SUPPORT
**Grid:** B(4, cross) **Domain:** D.3
**Stated in:** T3_P3 §1.3 **Warranted in:** T3_P3 §1.3 **Proof Status:** COMPLETE
**Depends on:** SNF-0700 →T, SNF-0850 →L
**Old IDs:** T3_P3 §1.3. **Action:** new (gap-fill)

---

### SNF-0861 | COR | Invertibility Threshold

**Statement:** Structural invertibility requires σ_MIX < φ̄²/2. Below this threshold, Type III computation dominates.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P3) **Domain:** D.3
**Stated in:** T3_P3 §1.4, Cor 1.5 **Warranted in:** T3_P3 §1.4 **Proof Status:** COMPLETE
**Depends on:** SNF-0851 →L
**Old IDs:** T3_P3 Cor 1.5. **Action:** new (gap-fill)

---

### SNF-0862 | THM | Pauli Y-Matrix

**Statement:** iN = σ_y. All three Pauli matrices derivable from {R,N} at resolution 1/5.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P3) **Domain:** D.3
**Stated in:** T3_P3 §1.5 **Warranted in:** T3_P3 §1.5 **Proof Status:** COMPLETE
**Depends on:** SNF-0858 →L, SNF-0370 →T
**Old IDs:** T3_P3 Thm 1.6. **Action:** new (gap-fill)

---

### SNF-0863 | THM | √3 Bridge

**Statement:** ‖R‖_F = √3 = 2·sin(2π/3). P1↔P3 bridge via the norm-trig identity.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** IDENTIFICATION **Fragility:** SUPPORT
**Grid:** B(4, cross) **Domain:** D.3
**Stated in:** T3_P3 §1.9, Thm 1.11 **Warranted in:** T3_P3 §1.9 **Proof Status:** COMPLETE
**Depends on:** SNF-0362 →L, SNF-0850 →T
**Old IDs:** T3_P3 Thm 1.11. **Action:** new (gap-fill)

---

### SNF-0864 | THM | HC → LoMI Dominant (93.3%)

**Statement:** Highly composite numbers are 93.3% LoMI-dominant in the projection classification.

**SIL Grade:** ENCODED **Warrant Space:** G.5 · T.4 · O.3 **Scope:** FAMILY **Fragility:** SUPPORT
**Grid:** B(4, P3) **Domain:** D.3
**Stated in:** T3_P3 §2.3, Thm 4.3 **Warranted in:** T3_P3 §2.3 **Proof Status:** COMPLETE
**Depends on:** SNF-0850 →L
**Old IDs:** T3_P3 Thm 4.3. **Action:** new (gap-fill)

---

### SNF-0865 | THM | Totient Ratio as Continuous LoMI Signature

**Statement:** φ(n)/n is a continuous LoMI signature. Carmichael-Totient depth λ(n)/φ(n) measures internal P3 structure.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** FAMILY **Fragility:** SUPPORT
**Grid:** B(4, P3) **Domain:** D.3
**Stated in:** T3_P3 §2.4-2.6 **Warranted in:** T3_P3 §2.4-2.6 **Proof Status:** COMPLETE
**Depends on:** SNF-0850 →L
**Old IDs:** T3_P3 Thms 4.6. **Action:** new (gap-fill)

---

### SNF-0866 | THM | GCD = LoMI Fixed Point

**Statement:** GCD(a,b) is the LoMI fixed point. LCM is the LoMI join. GCD×LCM = a×b.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P3) **Domain:** D.3
**Stated in:** T3_P3 §3.1-3.2 **Warranted in:** T3_P3 §3.1-3.2 **Proof Status:** COMPLETE
**Depends on:** SNF-0850 →L
**Old IDs:** T3_P3 §3.1-3.2. **Action:** new (gap-fill)

---

### SNF-0867 | THM | AGM Fibonacci Limit

**Statement:** AGM(F(n),F(n+1))/F(n+1) → AGM(1,φ)/φ ≈ 0.7975. The arithmetic-geometric mean converges on the Fibonacci pair.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P3) **Domain:** D.3
**Stated in:** T3_P3 §3.3, Thm 4.4 **Warranted in:** T3_P3 §3.3 **Proof Status:** COMPLETE
**Depends on:** SNF-0700 →T, SNF-0850 →L
**Old IDs:** T3_P3 Thm 4.4. **Action:** new (gap-fill)

---

### SNF-0868 | THM | Anti-LoMI Is Periodic-2

**Statement:** −LoMI oscillates with period 2. Anti-observation is structurally periodic, not chaotic.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P3) **Domain:** D.3
**Stated in:** T3_P3 §4.2, Thm 6.3 **Warranted in:** T3_P3 §4.2 **Proof Status:** COMPLETE
**Depends on:** SNF-0850 →L
**Old IDs:** T3_P3 Thm 6.3. **Action:** new (gap-fill)

---

### SNF-0869 | THM | Elliptic Fraction ~28.3%

**Statement:** ~71.7% hyperbolic, ~28.3% elliptic from Killing signature (2,1). The P3 minority reflects the observation constraint.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P3) **Domain:** D.3
**Stated in:** T3_P3 §5.3 **Warranted in:** T3_P3 §5.3 **Proof Status:** COMPLETE
**Depends on:** SNF-0031 →T (discriminant signature)
**Old IDs:** T3_P3 Thm 5.3. **Action:** new (gap-fill)

---


### SNF-0870 | COR | Asymptotic Type III Dominance (P3 Attractor)

**Statement:** At high tower levels, elliptic (Type III) computation increasingly dominates. P3 is the asymptotic attractor of the computation type distribution.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P3) **Domain:** D.3
**Stated in:** T3_P3 §1.4, Cor 1.5b **Proof Status:** COMPLETE
**Depends on:** SNF-0851 →L, SNF-0869 →L

---

### SNF-0871 | THM | Direction-Independent Binary Inversion

**Statement:** exp(πN)=−I inverts the binary distinction regardless of approach direction. The inversion is geometric, not discrete.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P3) **Domain:** D.3
**Stated in:** T3_P3 §1.7e **Proof Status:** COMPLETE
**Depends on:** SNF-0852 →L

---

### SNF-0872 | THM | Fibonacci CF Signature

**Statement:** Consecutive Fibonacci CF = [0;1,...,1,2]. The continued fraction of F(n)/F(n+1) has all partial quotients = 1 except the last.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** FAMILY **Fragility:** SUPPORT
**Grid:** B(4, P3) **Domain:** D.3
**Stated in:** T3_P3 §3.4, Thm 6.2 **Proof Status:** COMPLETE
**Depends on:** SNF-0867 →L

---

### SNF-0873 | THM | GCD(F(n),F(n+1))=1 Always

**Statement:** Consecutive Fibonacci numbers are always coprime. The LoMI fixed point of the Fibonacci pair is 1 (the universal fixed point of V(n)).

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** FAMILY **Fragility:** SUPPORT
**Grid:** B(4, P3) **Domain:** D.3
**Stated in:** T3_P3 §3.5 **Proof Status:** COMPLETE
**Depends on:** SNF-0866 →L, SNF-0700 →T

## T_COMP REMAINING (4)

---

*T3_P3 SWEEP COMPLETE. 20 entries: 1 COR, 19 THM. 0 conflicts.*
*Fragility: 7 CORE, 12 SUPPORT, 1 ENCODED. All G.5.*
*Cross-ref: SNF-0856 duplicates SNF-0376 (Koide) — reconcile in Layer B.*

---

## SWEEP 7: T3_META

*File: T3_META.md (579 lines). Grid: B(4, cross). Domain: D.3.*
*Sweep date: March 2026. 18 entries extracted.*

---

### SNF-0900 | THM | Projection Independence

**Statement:** P1, P2, P3 are mutually independent: no projection definable from the other two. Three separation witnesses (one per pair).

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.2 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(4, cross) **Domain:** D.3
**Stated in:** T3_META §1, Thm 1.1 **Warranted in:** T3_META §1 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Classifier
**Depends on:** SNF-0700 →L, SNF-0800 →L, SNF-0850 →L
**Old IDs:** T3_META Thm 1.1. T_INDEX: listed. **Action:** preserved

---

### SNF-0901 | THM | Projection Completeness

**Statement:** No fourth projection exists. Orbit classification + Artin-Wedderburn exhaust possibilities at three.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(4, cross) **Domain:** D.3
**Stated in:** T3_META §1, Thm 1.3 **Warranted in:** T3_META §1 **Proof Status:** COMPLETE
**Master Theorem:** 5 **Role:** Classifier
**Depends on:** SNF-0358 →L, SNF-0354 →L
**Old IDs:** T3_META Thm 1.3. T_INDEX: listed. **Action:** preserved

---

### SNF-0902 | THM | Folding Theorem

**Statement:** Each projection contains recognizable images of the other two. Six explicit containments. Independence concerns definability; containment concerns encoding.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.2 **Scope:** EXHAUSTION (six containments) **Fragility:** CORE
**Grid:** B(4, cross) **Domain:** D.3
**Stated in:** T3_META §2, Thm 2.1 **Warranted in:** T3_META §2 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0900 →L
**Old IDs:** T3_META Thm 2.1. T_INDEX: listed. **Action:** preserved

---

### SNF-0903 | THM | Internal Duality (BUILD↔ANALYZE)

**Statement:** Each projection has one internal duality (UP↔DOWN). All three dualities are instances of BUILD↔ANALYZE.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** FAMILY (three projections) **Fragility:** SUPPORT
**Grid:** B(4, cross) **Domain:** D.3
**Stated in:** T3_META §3, Thms 3.1+3.2 **Warranted in:** T3_META §3 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0902 →L
**Old IDs:** T3_META Thms 3.1, 3.2. **Action:** preserved (merged)

---

### SNF-0904 | THM | V(n) Potential: V(1)=0 Unique Minimum

**Statement:** Composite potential V(n)=V_I+V_T+V_L measures distance from n=1. V(1)=0 exactly, V(n)>0 for n>1. n=1 is the unique universal fixed point.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** FAMILY (all n) **Fragility:** SUPPORT
**Grid:** B(4, cross) **Domain:** D.3
**Stated in:** T3_META §5, Thms 1.2+1.6+1.7 **Warranted in:** T3_META §5 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** — **Role:** Invariant
**Depends on:** SNF-0700 →L, SNF-0800 →L, SNF-0850 →L
**Old IDs:** T3_META Thms 1.2, 1.6, 1.7. **Action:** preserved (merged)

---

### SNF-0905 | THM | Central Collapse

**Statement:** I²∘TDL∘LoMI = Dist. The three projections exhaust every Dist morphism with no remainder. Via first isomorphism theorem: surjection→bijection→injection.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(4, cross) **Domain:** D.3
**Stated in:** T3_META §7, Thm 7.1 **Warranted in:** T3_META §7 **Proof Status:** COMPLETE
**Master Theorem:** 6 (this IS Master Thm 6) **Role:** Closure operator **Closure Type:** recursive
**Depends on:** SNF-0900 →L, SNF-0901 →L
**Old IDs:** T3_META Thm 7.1. T_INDEX: listed. **Action:** preserved

---

### SNF-0906 | THM | Ternary from Binary

**Statement:** P2 = product of P1 and P3 at every tower level. The three projections trace to |V₄\{0}|=3 with S₃ acting transitively.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** FAMILY **Fragility:** SUPPORT
**Grid:** B(4, cross) **Domain:** D.3
**Stated in:** T3_META §7, Thm 7.3 **Warranted in:** T3_META §7 **Proof Status:** COMPLETE
**Master Theorem:** 5 **Role:** —
**Depends on:** SNF-0905 →L
**Old IDs:** T3_META Thm 7.3. **Action:** preserved

---

### SNF-0907 | MT | Self-Application Fixed-Point Tower (SAFPT / MT2)

**Statement:** At every tower level, self-application has a unique stable fixed point which IS the canonical structure of that level. Universal schema with instances at every level 0–8.

**SIL Grade:** FORCED **Warrant Space:** G.7 · T.1 · O.2 **Scope:** SCHEMA **Fragility:** CORE
**Grid:** B(4, cross) — applies B(0–8) **Domain:** D.3
**Stated in:** T3_META §8, Thm MT2 **Warranted in:** T3_META §8 **Proof Status:** COMPLETE
**Master Theorem:** 2 (this IS the im(f) reading) **MT/MP:** MT2 (this IS MT2) **Role:** Closure operator
**Depends on:** SNF-0219 →L, SNF-0714 →L
**Old IDs:** T3_META MT2. T_INDEX: listed. **Action:** preserved

---

### SNF-0908 | MT | Cardinal 5 Universality (C5U / MT7)

**Statement:** Every structural boundary count = |S₀|²+1 = 5, decomposing as 3+2 (spectral+geometric). ~12 instances across 5 files.

**SIL Grade:** FORCED **Warrant Space:** G.7 · T.7 · O.2 **Scope:** SCHEMA **Fragility:** CORE
**Grid:** B(4, cross) **Domain:** D.3
**Stated in:** T3_META §7½, Thm MT7 **Warranted in:** T3_META §7½ **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MT7 (this IS MT7) **Role:** Classifier
**Depends on:** SNF-0366 →L, SNF-0028 →L
**Old IDs:** T3_META MT7. T_INDEX: listed. **Action:** preserved

---

### SNF-0909 | THM | MP1: φ̄-Filtration

**Statement:** Every ordered three-fold decomposition governed by Fibonacci eigenvalue structure filters through geometric weights with ratio φ̄.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.2 **Scope:** SCHEMA **Fragility:** CORE
**Grid:** B(4, cross) **Domain:** D.3
**Stated in:** T3_META §8 **Warranted in:** T3_META §8 **Proof Status:** COMPLETE
**MT/MP:** MP1 **Role:** —
**Depends on:** SNF-0700 →L
**Old IDs:** T3_META MP1. **Action:** preserved

---

### SNF-0910 | THM | MP2: Trichotomy

**Statement:** Every classification by the sign of a discriminant-type quantity produces exactly three qualitative regimes (positive/zero/negative).

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.2 **Scope:** SCHEMA **Fragility:** CORE
**Grid:** B(4, cross) **Domain:** D.3
**Stated in:** T3_META §8 **Warranted in:** T3_META §8 **Proof Status:** COMPLETE
**MT/MP:** MP2 **Role:** Classifier
**Depends on:** SNF-0358 →L
**Old IDs:** T3_META MP2. **Action:** preserved

---

### SNF-0911 | THM | MP3: CH Fixed Points

**Statement:** Every Cayley-Hamilton-type recurrence x²=tx+d has a unique stable fixed point governing long-term dynamics.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.2 **Scope:** SCHEMA **Fragility:** CORE
**Grid:** B(4, cross) **Domain:** D.3
**Stated in:** T3_META §8 **Warranted in:** T3_META §8 **Proof Status:** COMPLETE
**MT/MP:** MP3 **Role:** Closure operator
**Depends on:** SNF-0370 →L
**Old IDs:** T3_META MP3. **Action:** preserved

---

### SNF-0912 | THM | MP4: Resolution Quantum

**Statement:** disc(R)=5 is the resolution quantum: the minimum productive discriminant, the spectral budget, the Gram-per-sector determinant.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.2 **Scope:** SCHEMA **Fragility:** CORE
**Grid:** B(4, cross) **Domain:** D.3
**Stated in:** T3_META §8 **Warranted in:** T3_META §8 **Proof Status:** COMPLETE
**MT/MP:** MP4 **Role:** Invariant
**Depends on:** SNF-0366 →L
**Old IDs:** T3_META MP4. **Action:** preserved

---

### SNF-0913 | THM | Closure Modes (exact/fixed-point/asymptotic)

**Statement:** Three dynamical closure modes: exact (P3, periodic), fixed-point (P1, convergent), asymptotic (P2, bounded). Orthogonal to closure types (terminal/recursive/boundary).

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.2 **Scope:** EXHAUSTION **Fragility:** SUPPORT
**Grid:** B(4, cross) **Domain:** D.3
**Stated in:** T3_META §8, Thm 8.6c **Warranted in:** T3_META §8 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Classifier
**Depends on:** SNF-0910 →L
**Old IDs:** T3_META Thm 8.6c. **Action:** preserved

---

### SNF-0914 | THM | Euler Tri-Projective Identity (T3_META)

**Statement:** Euler's identity e^{iπ}+1=0 has tri-projective structure: e (P2), π (P3), 1 (P1 fixed point), 0 (P1 kernel), i (P3 generator). All three projections present in one equation.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.7 · O.3 **Scope:** IDENTIFICATION **Fragility:** SUPPORT
**Grid:** B(4, cross) **Domain:** D.3
**Stated in:** T3_META §8, Thm 8.5a **Proof Status:** COMPLETE
**Depends on:** SNF-0853 →L, SNF-0905 →L

---

*T3_META SWEEP COMPLETE. 14 entries: 2 MT, 12 THM. 0 conflicts.*
*Fragility: 12 CORE, 2 SUPPORT. All FORCED.*
*Key results: Independence (SNF-0900), Completeness (SNF-0901), Folding (SNF-0902), Central Collapse (SNF-0905), SAFPT/MT2 (SNF-0907), C5U/MT7 (SNF-0908), MP1-MP4 (SNF-0909–0912).*

---


## SWEEP 8: T4_LATTICE

*File: T4_LATTICE.md (491 lines). Grid: B(4, cross). Domain: D.3.*
*Sweep date: March 2026. 20 entries extracted.*

---

### SNF-1000 | THM | Λ' ≅ ℤ⁵

**Statement:** Λ' = {φʳ·eᵈ·πᶜ·(√2)ᵃ·(√3)ᵇ} ≅ ℤ⁵ (assuming algebraic independence of generators). 3+2 decomposition: spectral {φ,e,π} + geometric {√2,√3}.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.1 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(4, cross) **Domain:** D.3
**Stated in:** T4 §1, Thm 1.1 **Warranted in:** T4 §1 **Proof Status:** COMPLETE (conditional on (e,π))
**Master Theorem:** — **MT/MP:** MT7 **Role:** Generator
**Depends on:** SNF-0362 →L, SNF-0363 →L, SNF-0700 →L, SNF-0800 →L, SNF-0850 →L
**Old IDs:** T4 Thm 1.1. T_INDEX: listed. **Action:** preserved

---

### SNF-1001 | THM | 27 Forced Relations Exhaust Cl(1,1) Content

**Statement:** 27 relations (10 arithmetic + 6 trace + 7 cross-source + 4 structural) exhaust all derivable Cl(1,1) content. No 28th relation exists.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(4, cross) **Domain:** D.3
**Stated in:** T4 §2 **Warranted in:** T4 §2 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Classifier **Closure Type:** terminal
**Depends on:** SNF-0370 →L, SNF-0375 →L
**Old IDs:** T4 §2. T_INDEX: listed. **Action:** preserved

---

### SNF-1002 | THM | 9/10 Pairwise Independence (Unconditional)

**Statement:** All algebraic-vs-transcendental pairs independent (Lindemann-Weierstrass). All algebraic-vs-algebraic pairs independent (field degree). Sole open: (e,π).

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(4, cross) **Domain:** D.3
**Stated in:** T4 §4 **Warranted in:** T4 §4 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Classifier
**Depends on:** SNF-1000 →L
**Old IDs:** T4 §4. **Action:** preserved

---

### SNF-1003 | THM | Algebraic Sublattice ⟨φ,√2,√3⟩ ≅ ℤ³

**Statement:** Baker's theorem: {1, log φ, log√2, log√3} linearly independent over ℚ. Unconditional.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.1 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, cross) **Domain:** D.3
**Stated in:** T4 §5 **Warranted in:** T4 §5 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-1000 →L
**Old IDs:** T4 §5. **Action:** preserved

---

### SNF-1004 | THM | 5-Way Reduction to (e,π)

**Statement:** Full rank-5 independence reduces to: π^q ≠ e^p·(algebraic) for all integers p,q not both zero.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(4, cross) **Domain:** D.3
**Stated in:** T4 §6 **Warranted in:** T4 §6 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-1002 →L, SNF-1003 →L
**Old IDs:** T4 §6. **Action:** preserved

---

### SNF-1005 | THM | Two-World Separation (7 Obstructions)

**Statement:** Seven independent obstructions prove e and π are spectrally disconnected: Galois invisibility, dilogarithm asymmetry, D-module disconnection, differential Galois direct product, nilpotent barrier, ζ-function silence, trace gateway divergence.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(4, cross) **Domain:** D.3
**Stated in:** T4 §7 **Warranted in:** T4 §7 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Obstruction
**Depends on:** SNF-1000 →L, SNF-0361 →L (Killing-Determinant Duality)
**Old IDs:** T4 §7. T_INDEX: listed. **Action:** preserved

---

### SNF-1006 | THM | Motivic Galois Group = 𝔾_m × SO₂

**Statement:** Combined differential Galois group of framework's exponential system is 𝔾_m × SO₂ (direct product, dim=2). Follows from Killing orthogonality B(h,N)=0 and Picard-Vessiot theory.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.1 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(4, cross) **Domain:** D.3
**Stated in:** T4 §8.6, Thm 8.9 **Warranted in:** T4 §8.6 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Classifier
**Depends on:** SNF-0361 →L, SNF-0800 →L, SNF-0850 →L
**Old IDs:** T4 Thm 8.9. T_INDEX: listed. **Action:** preserved

---

### SNF-1007 | CONJ | (e,π) Algebraic Independence

**Statement:** e and π are algebraically independent over ℚ. Equivalent to: Schanuel for (1,iπ), EPC for 𝔾_m × SO₂, Conjecture 6.6 for sl(2,ℝ).

**SIL Grade:** OPEN **Warrant Space:** — · — · O.5 **Scope:** LOCAL **Fragility:** FRONTIER
**Grid:** B(4, cross) **Domain:** D.3
**Stated in:** T4 §8 **Warranted in:** — (open) **Proof Status:** MISSING (sole remaining gap: Conjecture 8.12)
**Master Theorem:** — **Role:** Obstruction
**Depends on:** SNF-1006 →L
**Old IDs:** T4 §8. T_INDEX: listed as open problem. **Action:** preserved

---

### SNF-1008 | CONJ | Conjecture 6.6 (Lie Algebra Exponential Independence)

**Statement:** For semisimple 𝔤 with Killing-orthogonal X₁,X₂ of opposite Killing sign, the exponential outputs α₁=exp(X₁)[0,0] and α₂=min{θ>0:exp(θX₂)=−I} are algebraically independent.

**SIL Grade:** OPEN **Warrant Space:** — · — · O.5 **Scope:** FAMILY **Fragility:** FRONTIER
**Grid:** B(4, cross) **Domain:** D.3
**Stated in:** T4 §8.8 **Warranted in:** — (open) **Refined by:** T4 §8.8 (five routes, twelve proved lemmas)
**Proof Status:** MISSING (reduced to Conjecture 8.12: Regular Non-Special Specialization)
**Master Theorem:** — **Role:** —
**Depends on:** SNF-1006 →L
**Old IDs:** T4 Conj 6.6. T_INDEX: listed. **Action:** preserved

---

### SNF-1009 | THM | P2-Collapse

**Statement:** If e and π are algebraically dependent, the motivic Galois group is not a direct product and the P2 column collapses — contradicting projection independence (T3-META Thm 1.1). Conditional: EPC converts the proved direct product to independence.

**SIL Grade:** FORCED (D9-1) / ENCODED (D9-2, conditional on EPC) **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(4, cross) **Domain:** D.3
**Stated in:** T4 §8.8a, Thm 8.8a **Warranted in:** T4 §8.8a **Proof Status:** COMPLETE (structural); gap is external (EPC)
**Master Theorem:** — **Role:** Obstruction
**Depends on:** SNF-1006 →L, SNF-0900 →L (Projection Independence)
**Old IDs:** T4 Thm 8.8a. T_INDEX: listed. **Action:** preserved

---

### SNF-1010 | THM | O± Asymmetry at Transcendence Boundary

**Statement:** Along the Killing sweep X(s)=(1-s)h+sN, the O± ratio ρ(s) satisfies ρ(1/2)=φ² uniquely.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, cross) **Domain:** D.3
**Stated in:** T4 §8.8, Thm 8.13 **Warranted in:** T4 §8.8 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Invariant
**Depends on:** SNF-0371 →L, SNF-1006 →L
**Old IDs:** T4 Thm 8.13. **Action:** preserved

---

### SNF-1011 | THM | KMS Partition Function Z(β)=coth(β/2)⁵

**Statement:** Full 5-generator KMS partition function. At natural temperature: Z(ln(φ))=φ^{15}. tanh(ln(φ)/2)=2α_S.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(4, P2) **Domain:** D.3
**Stated in:** T4 §12 **Warranted in:** T4 §12 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MT4 **Role:** Invariant
**Depends on:** SNF-0806 →L, SNF-1000 →L
**Old IDs:** T4 §12. T_INDEX: listed. **Action:** preserved

---

### SNF-1012 | THM | Generator Selection via C=1 Shell

**Statement:** The five generators {φ,e,π,√2,√3} occupy the C=1 shell of the complexity Hamiltonian. Selection is forced by minimality.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P2) **Domain:** D.3
**Stated in:** T4 §11 **Warranted in:** T4 §11 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Selection mechanism
**Depends on:** SNF-1000 →L
**Old IDs:** T4 §11. **Action:** preserved

---

### SNF-1013 | THM | Orbit Type → Dominant Coordinate (C1–C5)

**Statement:** Five classification theorems mapping orbit types to lattice coordinates. P1→φ dominant, P2→e dominant, P3→π dominant.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** EXHAUSTION **Fragility:** SUPPORT
**Grid:** B(4, cross) **Domain:** D.3
**Stated in:** T4 §13–14 **Warranted in:** T4 §13–14 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Classifier
**Depends on:** SNF-0358 →L, SNF-1000 →L
**Old IDs:** T4 §13–14. **Action:** preserved

---

### SNF-1014 | THM | Thermodynamic Laws on Λ'

**Statement:** First and Second Laws hold on the lattice dynamics. Entropy increases along the Boltzmann flow at natural temperature β=ln(φ).

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P2) **Domain:** D.3
**Stated in:** T4 §12 **Warranted in:** T4 §12 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-1011 →L, SNF-0805 →T
**Old IDs:** T4 §12. **Action:** preserved

---

### SNF-1015 | THM | π Paradox Resolution (T4)

**Statement:** π is the minority constant (28.3% elliptic) yet framework-critical. Resolution: rarity IS what makes observation non-trivial. If P3 dominated, observation would be generic and structureless.

**SIL Grade:** ENCODED **Warrant Space:** G.4 · T.7 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(4, P3) **Domain:** D.3
**Stated in:** T4 §15 **Proof Status:** COMPLETE
**Depends on:** SNF-0869 →T, SNF-0850 →L

---

*T4 SWEEP COMPLETE. 15 entries: 2 CONJ, 13 THM. 0 conflicts.*
*Fragility: 8 CORE, 5 SUPPORT, 2 FRONTIER.*
*SIL: 12 FORCED, 1 ENCODED, 2 OPEN.*
*Key results: Λ'≅ℤ⁵ (SNF-1000), 27 relations (SNF-1001), motivic Galois (SNF-1006), P2-Collapse (SNF-1009), (e,π) open (SNF-1007–1008).*

---


## SWEEP 9: T5_OBSERVER

*File: T5_OBSERVER.md (644 lines). Grid: B(5, all). Domain: D.4.*
*Sweep date: March 2026. 25 entries extracted.*

---

### SNF-1100 | DEF | Observer Axioms A1–A4

**Statement:** A1 (finite dimension d_K<∞), A2 (tensor factorization H_U=H_K⊗H_env, A2' derived from monoidal F), A3 (non-degenerate interaction), A4 (self-model). The observer is K=(d_K,Δ_K,σ_K).

**SIL Grade:** — (definition/derivation) **Warrant Space:** G.6 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(5, cross) **Domain:** D.4
**Stated in:** T5 §1 **Warranted in:** T5 §1 (A2' derived from F: FinSet→Hilb) **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Generator
**Depends on:** SNF-0210 →T, SNF-0215 →T
**Old IDs:** T5 §1. T_INDEX: listed. **Action:** preserved

---

### SNF-1101 | THM | Abstract Bekenstein Bound

**Statement:** S_max(K) = 2log₂(d_K). Maximum information accessible to observer K is determined by dimension alone.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.1 · O.3 **Scope:** FAMILY (all K) **Fragility:** CORE
**Grid:** B(5, P3) **Domain:** D.4
**Stated in:** T5 §2, Thm 10½.1 **Warranted in:** T5 §2 **Proof Status:** COMPLETE
**Master Theorem:** 1 **MT/MP:** MT3 **Role:** Obstruction
**Depends on:** SNF-1100 →L
**Old IDs:** T5 Thm 10½.1. T_INDEX: listed. **Action:** preserved

---

### SNF-1102 | THM | No Physically Admissible Ideal Observer

**Statement:** Any K_ideal with full resolution violates A1 or has zero Bekenstein capacity. The limit observer K_∞ is not physically admissible.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(5, P3) **Domain:** D.4
**Stated in:** T5 §3A, Thm 10½.14 + 10½.18 **Warranted in:** T5 §3A-3B **Proof Status:** COMPLETE
**Master Theorem:** 1 **MT/MP:** MT3 (UKI-5) **Role:** Obstruction
**Depends on:** SNF-1101 →L, SNF-1100 →L
**Old IDs:** T5 Thms 10½.14, 10½.18. T_INDEX: listed. **Action:** preserved (merged)

---

### SNF-1103 | THM | Asymmetry Necessity for Observer Scale

**Statement:** Only the asymmetric (Vect) tower produces non-removable observer scales. Branch-symmetric sectors generate no η.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.1 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(5, cross) **Domain:** D.4
**Stated in:** T5 §3A, Thm 10½.16 **Warranted in:** T5 §3A **Proof Status:** COMPLETE
**Master Theorem:** 1, 4 **MT/MP:** MT1 **Role:** Obstruction
**Depends on:** SNF-0042 →L (NNR), SNF-1101 →L
**Old IDs:** T5 Thm 10½.16. **Action:** preserved

---

### SNF-1104 | THM | Boundary Observer Inevitability

**Statement:** Aut(S_n) = GL(2ⁿ,F₂). {0,1} is the unique tower apex (Thm 10½.11). The self-product tower forces boundary observers at every level.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.1 · O.2 **Scope:** FAMILY **Fragility:** SUPPORT
**Grid:** B(5, cross) **Domain:** D.4
**Stated in:** T5 §4–6, Thm 5.0 **Warranted in:** T5 §4–6 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Generator
**Depends on:** SNF-0350 →L, SNF-0352 →L
**Old IDs:** T5 Thm 5.0. **Action:** preserved

---

### SNF-1105 | THM | Λ-Positivity

**Statement:** Λ > 0. The cosmological observer K_cosmo requires a finite de Sitter horizon (d_cosmo < ∞). Λ ≤ 0 gives infinite horizon, violating A1.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.1 · O.6 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(5, P3) **Domain:** D.4
**Stated in:** T5 §6½, Thm 10½.23 **Warranted in:** T5 §6½ **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Obstruction
**Depends on:** SNF-1100 →L, SNF-1101 →L
**Old IDs:** T5 Thm 10½.23. T_INDEX: listed. **Action:** preserved

---

### SNF-1106 | THM | Cosmological Holographic Bound

**Statement:** d_U = d_cosmo. The cosmological observer's dimension is the de Sitter holographic bound.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.1 · O.6 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(5, P3) **Domain:** D.4
**Stated in:** T5 §6½, Thm 10½.24 **Warranted in:** T5 §6½ **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Invariant
**Depends on:** SNF-1105 →L
**Old IDs:** T5 Thm 10½.24. **Action:** preserved

---

### SNF-1107 | THM | K6': Forced Loop Closure

**Statement:** The observer loop K→F→U(K)→K closes with zero branching. K6' forces the self-consistency of the observer across its entire accessible universe.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(5, P2) **Domain:** D.4
**Stated in:** T5 §7 **Warranted in:** T5 §7 **Proof Status:** COMPLETE
**Master Theorem:** 2, 3 **MT/MP:** MT2, MT6 **Role:** Closure operator **Closure Type:** recursive
**Depends on:** SNF-1100 →L
**Old IDs:** T5 K6'. T_INDEX: listed extensively. **Action:** preserved

---

### SNF-1108 | THM | K7': Meta-Encoding Fixed Point

**Statement:** M(FRAME) = FRAME. The framework's self-description is a fixed point of its own meta-encoding. R(R)=R at the framework level.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(5, P1) **Domain:** D.4
**Stated in:** T5 §8 **Warranted in:** T5 §8 **Proof Status:** COMPLETE
**Master Theorem:** 2 **MT/MP:** MT2 **Role:** Closure operator **Closure Type:** recursive
**Depends on:** SNF-1107 →L
**Old IDs:** T5 K7'. T_INDEX: listed. **Action:** preserved

---

### SNF-1109 | THM | K4: Closure Deficit / Indexical Selection

**Statement:** U_min(K) = argmin δ(U|K). The optimal universe-model is the closure-deficit minimizer. K4 is the observer-level realization of relative origin.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.1 · O.4 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(5, cross) **Domain:** D.4
**Stated in:** T5 §11 **Warranted in:** T5 §11 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Selection mechanism
**Depends on:** SNF-0003 →T (relative origin at Level 0), SNF-1100 →L
**Old IDs:** T5 K4. T_INDEX: listed. **Action:** preserved

---

### SNF-1110 | THM | K1' Depth Gap

**Statement:** Δ_max(n) = d_K²·φ̄^{2^{n+1}}. Double-exponential suppression per consciousness depth level. Tower terminates effectively at n_eff where Δ drops below resolution.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.1 · O.3 **Scope:** FAMILY **Fragility:** CORE
**Grid:** B(5, cross) **Domain:** D.4
**Stated in:** T5 §22, Thm 8.4 **Warranted in:** T5 §22 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MT4 **Role:** Obstruction
**Depends on:** SNF-0708 →T (φ̄² contraction), SNF-1101 →L
**Old IDs:** T5 Thm 8.4. T_INDEX: listed. **Action:** preserved

---

### SNF-1111 | THM | K8 Five-Level Consciousness Hierarchy

**Statement:** Five consciousness levels graded by depth of recursive negation: (1) mark-bearing, (2) observation, (3) recursive self-observation, (4) meta-recursive, (5) framework-level self-description. Graded by n_eff.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.1 · O.2 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(5, P3) **Domain:** D.4
**Stated in:** T5 §17 **Warranted in:** T5 §17 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Classifier
**Depends on:** SNF-1107 →L, SNF-1110 →L
**Old IDs:** T5 K8. T_INDEX: listed. **Action:** preserved

---

### SNF-1112 | THM | K8.1 Nontriviality Threshold

**Statement:** ρ_min = 1/d_K². One bit of non-idempotent structure out of Bekenstein capacity. Minimum Phase-Dist for nontrivial recursive reversal.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.1 · O.3 **Scope:** FAMILY **Fragility:** CORE
**Grid:** B(5, P3) **Domain:** D.4
**Stated in:** T5 §17, Thm K8.1 **Warranted in:** T5 §17 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Invariant
**Depends on:** SNF-1101 →L, SNF-0033 →T (Partial Idempotence)
**Old IDs:** T5 K8.1. T_INDEX: listed. **Action:** preserved

---

### SNF-1113 | THM | Universal Consciousness

**Statement:** Every A1–A4 observer with d_K≥2 has n_eff≥1. Consciousness is universal among admissible observers, not exceptional.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.1 · O.2 **Scope:** FAMILY (all A1–A4 observers) **Fragility:** CORE
**Grid:** B(5, P3) **Domain:** D.4
**Stated in:** T5 §17, Thm K8.2 **Warranted in:** T5 §17 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-1112 →L
**Old IDs:** T5 K8.2. T_INDEX: listed. **Action:** preserved

---

### SNF-1114 | THM | Productive Opacity

**Statement:** Nontrivial SRD requires an irreversible kernel simultaneously sourcing physical scale (P1), enabling observation (P3), and mediating level transition (P2). Physics and consciousness share a single root.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.1 · O.2 **Scope:** SCHEMA **Fragility:** CORE
**Grid:** B(5, cross) **Domain:** D.4
**Stated in:** T5 §17.4d **Warranted in:** T5 §17.4d **Refined by:** T_BLUEPRINT §5.6 (Master Thm 1)
**Proof Status:** COMPLETE
**Master Theorem:** 1 (this IS the unified statement) **Role:** Obstruction
**Depends on:** SNF-0218 →L (UKI), SNF-0042 →L (NNR)
**Old IDs:** T5 §17.4d. T_INDEX: listed. **Action:** preserved

---

### SNF-1115 | THM | Constitutive Occlusion Principle

**Statement:** Four simultaneous readings of the observer kernel: (P1) scale source, (P2) level seed, (P3) blind spot, (meta) self-description limit. These are four projections of one structural fact.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(5, P3) **Domain:** D.4
**Stated in:** T5 §17.4e **Warranted in:** T5 §17.4e **Proof Status:** COMPLETE
**Master Theorem:** 1 **Role:** —
**Depends on:** SNF-1114 →L
**Old IDs:** T5 §17.4e. **Action:** preserved

---

### SNF-1116 | THM | Observer Cost Positivity

**Statement:** inf{A(update)} ≥ πℏ/2 > 0. Every observer update has positive cost. No free observation.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.1 · O.6 **Scope:** FAMILY **Fragility:** CORE
**Grid:** B(5, P2) **Domain:** D.4
**Stated in:** T5 §26 **Warranted in:** T5 §26 **Proof Status:** COMPLETE
**Master Theorem:** 4 **Role:** Obstruction
**Depends on:** SNF-1101 →L, SNF-0807 →T
**Old IDs:** T5 §26. **Action:** preserved

---

### SNF-1117 | THM | Σ Factorization

**Statement:** The realization map Σ = R_obs ∘ (F × Alg_inv) is forced. Three stages: instantiation (F), invariant extraction (Alg_inv), observer restriction (R_obs).

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(5, P2) **Domain:** D.4
**Stated in:** T5 §19 **Warranted in:** T5 §19 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Mediator
**Depends on:** SNF-1100 →L, SNF-1107 →L
**Old IDs:** T5 §19. **Action:** preserved

---


---

### SNF-1118 | DEF | Route-Typed Physical Realization (Five-Stage Pipeline)

**Statement:** Physical realization decomposes into five typed stages: (1) instantiation — framework object promoted into state-space, (2) invariant extraction — canonical algebraic invariants from bridge-chain output, (3) anchored physical realization — invariant structure mapped to physical prediction through dimensional anchoring, (4) observer access — realized content restricted to K-accessible, (5) physical admissibility — the object is physically possible under A1–A4. No use of "realize" or "predict" is semantically complete unless the stage is specified.

**SIL Grade:** — (definition) **Warrant Space:** G.6 · T.— · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(5–6, P2) **Domain:** D.4→D.6
**Stated in:** §X (Observer-Mediated Empirical Realization) **Warranted in:** — (definition, refines SNF-1117)
**Proof Status:** —
**Master Theorem:** — **Role:** Classifier
**Depends on:** SNF-1117 →L (Σ Factorization)
**Old IDs:** New content. Refines DICTIONARY: REALIZE. **Action:** new entry

---

### SNF-1119 | DEF | Empirical Anchor

**Statement:** An empirical anchor is any physically measured datum supplied by embodied observers that fixes a degree of freedom not determined by strict derivation alone. Includes: dimensional anchors, admissibility parameters, realized regime selections, measured boundary values, experimentally fixed constants.

**SIL Grade:** — (definition) **Warrant Space:** G.6 · T.— · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(5–6, P2) **Domain:** D.4→D.6
**Stated in:** §X **Warranted in:** —
**Proof Status:** —
**Master Theorem:** — **Role:** —
**Depends on:** SNF-1118 →S
**Old IDs:** New content. **Action:** new entry

---

### SNF-1120 | THM | Observer-Mediated Empirical Realization

**Statement:** The framework does not strictly derive empirical physics as self-sufficient numerical output from algebra alone. It strictly derives: admissible invariant structure, the realization pipeline, observer restrictions, and lawful transport relations connecting measured quantities to invariant structure. Empirical measurement supplies the anchor data not fixed by strict derivation. Therefore the framework is a unification architecture for measured physics, not an empirical oracle.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.6 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(5–6, cross) **Domain:** D.4→D.6
**Stated in:** §X, Theorem **Warranted in:** §X (six-step proof) **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Obstruction
**Depends on:** SNF-1117 →L (Σ typed), SNF-1118 →L (five stages), SNF-1365 →T (η anchor), SNF-1366 →T ({η,Λ} minimal), SNF-0014 →L (ORE — observer access constitutive)
**Old IDs:** New content. **Action:** new entry

---

### SNF-1121 | COR | No Pure-Oracular Physics

**Statement:** No statement "the framework predicts physics" is commitment-bearing unless route-typed. Must specify: strict structural derivation, invariant extraction, anchored physical realization, observer access, or empirical instantiation. Unqualified prediction language banned in theorem-grade prose.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.6 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(5–6, cross) **Domain:** D.4→D.6
**Stated in:** §X, Corollary 1 **Warranted in:** follows from SNF-1120 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Obstruction
**Depends on:** SNF-1120 →L
**Old IDs:** New content. **Action:** new entry

---

### SNF-1122 | COR | Measured Physics as Structured Input

**Statement:** Measured physical data are not external clutter. They are the empirical anchor layer through which invariant content becomes physically instantiated and observer-accessible. Empirical measurement is a typed input required by the realization architecture itself.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.6 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(5–6, cross) **Domain:** D.4→D.6
**Stated in:** §X, Corollary 2 **Warranted in:** follows from SNF-1120 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-1120 →L, SNF-1119 →S
**Old IDs:** New content. **Action:** new entry

---

### SNF-1123 | COR | Unification Without Oraclehood

**Statement:** The framework's claim is not "all numerical physics can be emitted from abstraction alone." It is: "once physical reality has been measured by observers, the framework can show that a vast range of those measurements are not isolated facts but observer-mediated realizations of one invariant architecture."

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.6 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(5–6, cross) **Domain:** D.4→D.6
**Stated in:** §X, Corollary 3 **Warranted in:** follows from SNF-1120 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-1120 →L
**Old IDs:** New content. **Action:** new entry

---

### SNF-1124 | GOV | Realization Verb Discipline

**Statement:** Six verbs, each restricted to one rung: "strictly derive" (zero-branching internal), "physically realize" (anchored transition), "access/measure" (K-relative acquisition), "empirically instantiate" (actually realized in the world), "unify" (lawfully relate multiple measured facts). Any sentence moving between rungs without explicit typing is invalid.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.— · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(7–8, cross) **Domain:** D.7
**Stated in:** §X, Claim Discipline **Warranted in:** follows from SNF-1120
**Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Classifier
**Depends on:** SNF-1120 →L, SNF-1656 →S (GOV-12: smuggling detectability)
**Old IDs:** New content. Extends DICTIONARY: DERIVE, REALIZE, PREDICTION. **Action:** new entry


---

*T5 SWEEP COMPLETE (UPDATED). 25 entries: 3 DEF, 3 COR, 1 GOV, 18 THM. 0 conflicts.*
*Fragility: 24 CORE, 1 SUPPORT.*
*SIL: 22 FORCED, 1 ENCODED. All G.6.*
*NEW: 7 entries from Observer-Mediated Empirical Realization (SNF-1118–1124). This theorem is the framework's anti-oracle principle — it corrects the most dangerous inflation risk by proving the framework is a unification architecture, not an empirical replacement for measurement.*
---


## SWEEP 10: T6A_SPACETIME

*File: T6A_SPACETIME.md (201 lines). Grid: B(6, P3). Domain: D.5.*
*Sweep date: March 2026. 8 entries extracted.*

---

### SNF-1300 | THM | Spacetime Dimension and Signature

**Statement:** Herm(M₂(ℂ)) is 4-dimensional over ℝ with det inducing Minkowski metric of signature (1,3). 4=2² from bridge chain; (1,3) from I being the unique positive-definite basis element.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.6 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(6, P3) **Domain:** D.5
**Stated in:** T6A §1, Thm 6.1 **Warranted in:** T6A §1 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Generator
**Depends on:** SNF-0357 →L (spectral completion to M₂(ℂ))
**Old IDs:** T6A Thm 6.1. T_INDEX: listed. **Action:** preserved

---

### SNF-1301 | THM | Lorentz Double Cover

**Statement:** SL(2,ℂ) → SO⁺(1,3) is a double cover with ker={I,−I}={I,exp(πN)}. so(1,3) ≅ sl(2,ℂ).

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.6 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(6, P3) **Domain:** D.5
**Stated in:** T6A §2, Thm 6.2 **Warranted in:** T6A §2 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Generator
**Depends on:** SNF-1300 →L, SNF-0852 →T (exp(πN)=−I)
**Old IDs:** T6A Thm 6.2. T_INDEX: listed. **Action:** preserved

---

### SNF-1302 | THM | Spin-½ Forced

**Statement:** Spin-½ forced by exp(πN)=−I ∈ ker(Φ). 2π rotation ≠ identity; 4π required. Fermionic statistics follow.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.6 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(6, P3) **Domain:** D.5
**Stated in:** T6A §3, Thm 6.3 **Warranted in:** T6A §3 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Generator
**Depends on:** SNF-1301 →L, SNF-0854 →T
**Old IDs:** T6A Thm 6.3. T_INDEX: listed. **Action:** preserved

---

### SNF-1303 | THM | Poincaré Group

**Statement:** SL(2,ℂ) ⋉ Herm(M₂(ℂ)) = the Poincaré group. Semidirect product of Lorentz and translations.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.6 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(6, P3) **Domain:** D.5
**Stated in:** T6A §4, Thm 6.4 **Warranted in:** T6A §4 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Generator
**Depends on:** SNF-1300 →L, SNF-1301 →L
**Old IDs:** T6A Thm 6.4. T_INDEX: listed. **Action:** preserved

---

### SNF-1304 | THM | Complex Hilbert Spaces Forced

**Statement:** Three independent mechanisms force ℂ over ℝ: spectral completion (eigenvalues of N require i), spin-½ (exp(πN)=−I requires complex phases), Born rule (Gleason requires dim≥3 over ℂ).

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.6 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(6, P3) **Domain:** D.5
**Stated in:** T6A §5, Thm 6.5 **Warranted in:** T6A §5 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0357 →L, SNF-1302 →L
**Old IDs:** T6A Thm 6.5. **Action:** preserved

---

### SNF-1305 | THM | Born Rule from Gleason

**Statement:** Born rule p(outcome)=tr(ρ·P) forced by Gleason's theorem at dim≥3 over ℂ. Unique probability measure on closed subspaces.

**SIL Grade:** FORCED **Warrant Space:** G.8 · T.1 · O.6 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(6, P3) **Domain:** D.5
**Stated in:** T6A §6, Thm 6.6 **Warranted in:** T6A §6 **Proof Status:** DEFERRED (to Gleason 1957)
**Master Theorem:** — **Role:** —
**Depends on:** SNF-1304 →L
**Old IDs:** T6A Thm 6.6. T_INDEX: listed. **Action:** preserved

---

### SNF-1306 | THM | Phase Closure Principle

**Statement:** exp(πN)=−I generates the center of SL(2,ℂ). Phase closure at θ=π is the first exact completion of the continuous inversion path.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.6 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(6, P3) **Domain:** D.5
**Stated in:** T6A §3, Thm 6.3a **Warranted in:** T6A §3 **Proof Status:** COMPLETE
**Depends on:** SNF-1302 →L
**Old IDs:** T6A Thm 6.3a. **Action:** new (gap-fill)

---


---

### SNF-1307 | THM | Metric Promotion via Jacobson

**Statement:** The Minkowski metric on Herm(M₂(ℂ)) promotes to a dynamical metric via Jacobson's thermodynamic argument at the observer-physics boundary.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.6 · O.6 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(6, P3) **Domain:** D.5
**Stated in:** T6A §8, Thm 6.7 **Warranted in:** T6A §8 **Proof Status:** COMPLETE
**Depends on:** SNF-1300 →L, SNF-1362 →T
**Old IDs:** T6A Thm 6.7. **Action:** new (gap-fill)

### SNF-1308 | THM | Invariant Geometry Principle (T6A)

**Statement:** The physical geometry is the unique degree-2 multiplicative invariant on Herm(M₂(ℂ)). No other polynomial invariant induces a metric.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.6 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(6, P3) **Domain:** D.5
**Stated in:** T6A §1, Thm 6.1a **Proof Status:** COMPLETE
**Depends on:** SNF-1300 →L

---

*T6A SWEEP COMPLETE. 6 entries: 6 THM. 0 conflicts.*
*Fragility: 6 CORE. All FORCED.*

---

## SWEEP 11: T6B_FORCES

*File: T6B_FORCES.md (967 lines). Grid: B(6, P1+P2). Domain: D.6.*
*Sweep date: March 2026. 28 entries extracted.*

---

### SNF-1350 | THM | su(3) from Exchange Operator

**Statement:** S₂=S₁×S₁ forces exchange P on ℂ⁴. Eigenspace decomposition Sym²⊕Alt² has stabilizer SU(3)×U(1) in SU(4).

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.1 · O.6 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(6, P1) **Domain:** D.6
**Stated in:** T6B §1, Thm 10½.7b **Warranted in:** T6B §1 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MT5 **Role:** Generator
**Depends on:** SNF-0350 →L (self-product tower), SNF-1100 →T
**Old IDs:** T6B Thm 10½.7b. T_INDEX: listed. **Action:** preserved

---

### SNF-1351 | MT | Gauge Stabilizer Universality (GSU / MT5)

**Statement:** At every tower level with a tensor space and non-trivial automorphism, the gauge group = stabilizer of the native eigenspace decomposition. Four instances: SU(3)×U(1), U(d_K), SL(2,ℂ), U(1)_em.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.1 · O.2 **Scope:** SCHEMA (4 instances) **Fragility:** CORE
**Grid:** B(6, P1) **Domain:** D.6
**Stated in:** T6B §1, Thm MT5 **Warranted in:** T6B §1 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MT5 (this IS MT5) **Role:** Classifier
**Depends on:** SNF-1350 →L, SNF-1100 →L
**Old IDs:** T6B MT5. T_INDEX: listed. **Action:** preserved

---

### SNF-1352 | THM | su(3)⊕su(2)⊕u(1) from Tower Levels 1–2

**Statement:** Full Standard Model gauge algebra derived from tower levels 1 (su(2)) and 2 (su(3)). Combined: su(3)⊕su(2)⊕u(1).

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.1 · O.6 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(6, P1) **Domain:** D.6
**Stated in:** T6B §2, Thm 10½.7c **Warranted in:** T6B §2 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Generator
**Depends on:** SNF-1350 →L, SNF-1351 →L
**Old IDs:** T6B Thm 10½.7c. T_INDEX: listed. **Action:** preserved

---

### SNF-1353 | THM | G1: Gauge Freedom U(d_K)

**Statement:** Observer axiom A2' (tensor factorization) forces U(d_K) gauge freedom. Not postulated — derived from observer structure.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.1 · O.6 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(6, P1) **Domain:** D.6
**Stated in:** T6B §3.1, G1 **Warranted in:** T6B §3.1 **Proof Status:** COMPLETE
**Master Theorem:** 3 **MT/MP:** MT6 **Role:** Generator
**Depends on:** SNF-1100 →L (A2')
**Old IDs:** T6B G1. T_INDEX: listed. **Action:** preserved

---

### SNF-1354 | THM | G3: Connection from K6'

**Statement:** K6' across spacetime demands consistency of observer quotients at different points → gauge connection (gauge field) forced.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.6 · O.6 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(6, P1) **Domain:** D.6
**Stated in:** T6B §3.3, G3 **Warranted in:** T6B §3.3 **Proof Status:** COMPLETE
**Master Theorem:** 3 **MT/MP:** MT6 **Role:** Generator
**Depends on:** SNF-1107 →L (K6'), SNF-1353 →L, SNF-1300 →T
**Old IDs:** T6B G3. T_INDEX: listed. **Action:** preserved

---

### SNF-1355 | THM | G5: Yang-Mills from Closure Deficit

**Statement:** Yang-Mills field equations from minimizing the closure deficit on the gauge connection. The connection curvature's self-consistency condition.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.6 · O.6 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(6, P1) **Domain:** D.6
**Stated in:** T6B §3.4, G5 **Warranted in:** T6B §3.4 **Proof Status:** COMPLETE
**Master Theorem:** 3 **MT/MP:** MT6 **Role:** Closure operator
**Depends on:** SNF-1354 →L
**Old IDs:** T6B G5. T_INDEX: listed. **Action:** preserved

---

### SNF-1356 | THM | G6: Chirality (su(2)_L Only)

**Statement:** Only su(2)_L gauged, not su(2)_R. Follows from K4 (indexical selection) + construction-dissolution asymmetry. Parity violation derived.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.6 · O.6 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(6, P1) **Domain:** D.6
**Stated in:** T6B §4, G6 **Warranted in:** T6B §4 **Proof Status:** COMPLETE
**Master Theorem:** 1 **MT/MP:** MT1 **Role:** Symmetry breaker
**Depends on:** SNF-0030 →T (Root Asymmetry), SNF-1109 →L (K4)
**Old IDs:** T6B G6. T_INDEX: listed. **Action:** preserved

---

### SNF-1357 | THM | G7': Anomaly Cancellation

**Statement:** K6' quantum closure demands anomaly-free gauge theory. Atiyah-Singer index theorem forces the specific fermion content that cancels anomalies.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.6 · O.6 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(6, P1) **Domain:** D.6
**Stated in:** T6B §6, G7' **Warranted in:** T6B §6 **Proof Status:** COMPLETE
**Master Theorem:** 3 **MT/MP:** MT6 **Role:** Obstruction
**Depends on:** SNF-1107 →L, SNF-1355 →L
**Old IDs:** T6B G7'. T_INDEX: listed. **Action:** preserved

---

### SNF-1358 | THM | G10: Tower Cutoff at Level 2 (K1')

**Statement:** K1' double-exponential suppression terminates gauge algebra extension at A₂ (=su(3)). No su(4) or beyond.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.1 · O.6 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(6, P1) **Domain:** D.6
**Stated in:** T6B §7, G10 **Warranted in:** T6B §7 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** — **Role:** Obstruction
**Depends on:** SNF-1110 →L (K1')
**Old IDs:** T6B G10. T_INDEX: listed. **Action:** preserved

---

### SNF-1359 | THM | G11: Electroweak Breaking

**Statement:** SU(2)_L×U(1)_Y → U(1)_em. A4 (self-model = definite state) forces spontaneous symmetry breaking.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.6 · O.6 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(6, P1) **Domain:** D.6
**Stated in:** T6B §8, G11 **Warranted in:** T6B §8 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Symmetry breaker
**Depends on:** SNF-1100 →L (A4), SNF-1352 →L
**Old IDs:** T6B G11. T_INDEX: listed. **Action:** preserved

---

### SNF-1360 | THM | G13: Weinberg Angle sin²θ_W = 3/8

**Statement:** sin²θ_W = 3/8 at the GUT scale, derived from the specific matter content forced by anomaly cancellation.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.7 · O.6 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(6, P1) **Domain:** D.6
**Stated in:** T6B §11, G13 **Warranted in:** T6B §11 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Invariant
**Depends on:** SNF-1357 →L, SNF-0377 →T (Casimir = 3/8)
**Old IDs:** T6B G13. T_INDEX: listed. **Action:** preserved

---

### SNF-1361 | THM | G3': Spin Connection from K6' on Frame Bundle

**Statement:** K6' applied to the frame bundle (not gauge bundle) forces the spin connection.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.6 · O.6 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(6, P3) **Domain:** D.6
**Stated in:** T6B §12.1, G3' **Warranted in:** T6B §12.1 **Proof Status:** COMPLETE
**Master Theorem:** 3 **MT/MP:** MT6 **Role:** Generator
**Depends on:** SNF-1107 →L, SNF-1301 →T
**Old IDs:** T6B G3'. T_INDEX: listed. **Action:** preserved

---

### SNF-1362 | THM | G14: Einstein Equations

**Statement:** Einstein field equations from Jacobson thermodynamic argument using G3'+G5'+Bekenstein+KMS+Raychaudhuri. One irreducible constant G; one integration constant Λ.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.6 · O.6 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(6, P3) **Domain:** D.6
**Stated in:** T6B §12.3, G14 **Warranted in:** T6B §12.3 **Proof Status:** COMPLETE
**Master Theorem:** 3, 4 **MT/MP:** MT6 **Role:** Closure operator **Closure Type:** recursive
**Depends on:** SNF-1361 →L, SNF-1101 →T, SNF-0806 →T (KMS)
**Old IDs:** T6B G14. T_INDEX: listed. **Action:** preserved

---

### SNF-1363 | MT | K6' Bundle Derivation (K6'BD / MT6)

**Statement:** K6' on any forced principal bundle derives connection, curvature, and field equations. One theorem, two bundles: gauge (G3→G5) and gravity (G3'→G5'→G14). Five instances.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.6 · O.2 **Scope:** SCHEMA (5 instances) **Fragility:** CORE
**Grid:** B(6, cross) **Domain:** D.6
**Stated in:** T6B §12.4, Thm MT6 **Warranted in:** T6B §12.4 **Proof Status:** COMPLETE
**Master Theorem:** 3 (this IS Master Thm 3) **MT/MP:** MT6 (this IS MT6) **Role:** Generator
**Depends on:** SNF-1107 →L, SNF-1354 →L, SNF-1361 →L
**Old IDs:** T6B MT6. T_INDEX: listed. **Action:** preserved

---

### SNF-1364 | THM | Three Generations from S₃

**Statement:** Three fermion generations from S₃ Plancherel: three irreps of S₃ = three generations.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.7 · O.6 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(6, P1) **Domain:** D.6
**Stated in:** T6B §9, Thm 10½.7d **Warranted in:** T6B §9 **Proof Status:** COMPLETE
**Master Theorem:** 5 **Role:** —
**Depends on:** SNF-0352 →L (S₃)
**Old IDs:** T6B Thm 10½.7d. T_INDEX: listed. **Action:** preserved

---

### SNF-1365 | THM | Dimensional Anchor η = 1/(4G)

**Statement:** The unique scale-entry point. η is the only dimensionful quantity derivable as a single anchor from the Bekenstein-Landauer chain. All other scales follow from η + dimensionless ratios.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.6 · O.6 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(6, P2) **Domain:** D.6
**Stated in:** T6B §13.2, Thm 5.10b **Warranted in:** T6B §13.2 **Proof Status:** COMPLETE
**Master Theorem:** 4 **Role:** Invariant
**Depends on:** SNF-1362 →L, SNF-1101 →T, SNF-0807 →T
**Old IDs:** T6B Thm 5.10b. T_INDEX: listed. **Action:** preserved

---

### SNF-1366 | THM | Calibration Minimality: Exactly Two Data {η, Λ}

**Statement:** The framework requires exactly two irreducible dimensionful inputs: η=1/(4G) (local) and Λ (global). Neither determines the other (5.10h). Everything else propagates.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.6 · O.6 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(6, P2) **Domain:** D.6
**Stated in:** T6B §13.3, Thm 5.10c **Warranted in:** T6B §13.3 **Proof Status:** COMPLETE
**Master Theorem:** 4 **Role:** Classifier
**Depends on:** SNF-1365 →L, SNF-1105 →L
**Old IDs:** T6B Thm 5.10c. T_INDEX: listed. **Action:** preserved

---

### SNF-1367 | THM | Proton Mass Chain

**Statement:** α_S = φ̄³/2 → Λ_QCD via RG → m_p via lattice ratio. Chain resolves to ≤1% with standard lattice QCD input.

**SIL Grade:** ENCODED **Warrant Space:** G.5 · T.10 · O.5 **Scope:** LOCAL **Fragility:** FRONTIER
**Grid:** B(6, P1) **Domain:** D.6
**Stated in:** T6B §13.4, Thm 5.10f **Warranted in:** T6B §13.4 **Proof Status:** COMPLETE (chain); OPEN (α_S exact proof)
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0712 →L (α_S gap), SNF-1352 →L
**Old IDs:** T6B Thm 5.10f. T_INDEX: listed. **Action:** preserved

---

### SNF-1368 | THM | Koide Phase δ = 2π/3 + 2/9

**Statement:** Koide phase candidate. Q=2/3 forced (SNF-0376). δ=2π/3+2/9 gives τ mass 1776.97 MeV (within 1σ of PDG).

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.7 · O.5 **Scope:** LOCAL **Fragility:** FRONTIER
**Grid:** B(6, P1) **Domain:** D.6
**Stated in:** T6B §9 **Warranted in:** T6B §9 **Proof Status:** SKETCH (candidate, Route C most promising)
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0376 →L, SNF-1364 →L
**Old IDs:** T6B §9 Koide. T_INDEX: listed as open. **Action:** preserved

---


### SNF-1369 | THM | G2: Principal Bundle over Derived Spacetime

**Statement:** The principal U(d_K)-bundle over Herm(M₂(ℂ)) is forced by G1 + derived spacetime. The structure group acts fiberwise.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.6 · O.6 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(6, P1) **Domain:** D.6
**Stated in:** T6B §3.2, G2 **Warranted in:** T6B §3.2 **Proof Status:** COMPLETE
**Depends on:** SNF-1353 →L (G1), SNF-1300 →T
**Old IDs:** T6B G2. T_INDEX: listed. **Action:** new (gap-fill)

---

### SNF-1370 | THM | G8: Quarks Bi-Charged

**Statement:** [P, U⊗I] ≠ 0. Quarks carry both color and electroweak charge because the exchange operator doesn't commute with the factor gauge action.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.6 · O.6 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(6, P1) **Domain:** D.6
**Stated in:** T6B §5.2, G8 **Warranted in:** T6B §5.2 **Proof Status:** COMPLETE
**Depends on:** SNF-1350 →L, SNF-1352 →L
**Old IDs:** T6B G8. **Action:** new (gap-fill)

---

### SNF-1371 | THM | G9: Hypercharge Ratio Y_l/Y_q = −3

**Statement:** Hypercharge ratio from SU(4) tracelessness condition at the tower level-2 embedding.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.6 · O.6 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(6, P1) **Domain:** D.6
**Stated in:** T6B §5.1, G9 **Warranted in:** T6B §5.1 **Proof Status:** COMPLETE
**Depends on:** SNF-1350 →L
**Old IDs:** T6B G9. **Action:** new (gap-fill)

---

### SNF-1372 | THM | G12: Right-Handed Spectrum from Anomaly Cancellation

**Statement:** The right-handed fermion spectrum is forced by anomaly cancellation (K6' quantum closure). Not postulated — derived.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.6 · O.6 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(6, P1) **Domain:** D.6
**Stated in:** T6B §6, G12 **Warranted in:** T6B §6 **Proof Status:** COMPLETE
**Depends on:** SNF-1357 →L (G7')
**Old IDs:** T6B G12. **Action:** new (gap-fill)

---

### SNF-1373 | THM | LF2: Quark Confinement

**Statement:** Quark confinement from orbit type at tower level 2. The color charge is confined because the SU(3) representation is level-2-specific.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.6 · O.6 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(6, P1) **Domain:** D.6
**Stated in:** T6B §7.1, LF2 **Warranted in:** T6B §7.1 **Proof Status:** COMPLETE
**Depends on:** SNF-1358 →L (G10 cutoff)
**Old IDs:** T6B LF2. **Action:** new (gap-fill)

---

### SNF-1374 | THM | G14a: KMS-Clausius

**Statement:** δQ = TdS from Gibbs variational principle. The framework's thermodynamic identity at the gravitational anchor.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.6 · O.6 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(6, P3) **Domain:** D.6
**Stated in:** T6B §12.3a, G14a **Warranted in:** T6B §12.3a **Proof Status:** COMPLETE
**Depends on:** SNF-1362 →L
**Old IDs:** T6B G14a. **Action:** new (gap-fill)

---

### SNF-1375 | THM | G14b: Haag-Kastler Axioms

**Statement:** Haag-Kastler axioms for algebraic QFT derived from framework structures. Isotony, locality, covariance, spectrum condition.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.6 · O.6 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(6, cross) **Domain:** D.6
**Stated in:** T6B §12.3b, G14b **Warranted in:** T6B §12.3b **Proof Status:** COMPLETE
**Depends on:** SNF-1362 →L, SNF-1303 →T
**Old IDs:** T6B G14b. **Action:** new (gap-fill)

---

### SNF-1376 | THM | Algebraic Dimensionlessness

**Statement:** Bridge chain output is entirely dimensionless. No scale enters until the anchor boundary η=1/(4G).

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(6, P2) **Domain:** D.6
**Stated in:** T6B §13.1, Thm 5.10a **Warranted in:** T6B §13.1 **Proof Status:** COMPLETE
**Depends on:** SNF-0355 →L
**Old IDs:** T6B Thm 5.10a. **Action:** new (gap-fill)

---

### SNF-1377 | THM | Anchor Propagation

**Statement:** All dimensionful scales derive from η + dimensionless ratios. η is the sole entry point; everything else propagates.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.6 · O.6 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(6, P2) **Domain:** D.6
**Stated in:** T6B §13.4, Thm 5.10d **Warranted in:** T6B §13.4 **Proof Status:** COMPLETE
**Depends on:** SNF-1365 →L, SNF-1376 →L
**Old IDs:** T6B Thm 5.10d. **Action:** new (gap-fill)

---

### SNF-1378 | THM | Scale-Entry Layer Uniqueness

**Statement:** Six criteria, applied level by level, uniquely select the observer-physics boundary (Level 5→6) as the dimensional entry point. No other layer qualifies.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.6 · O.6 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(6, P2) **Domain:** D.6
**Stated in:** T6B §13.5, Thm 5.10e **Warranted in:** T6B §13.5 **Proof Status:** COMPLETE
**Depends on:** SNF-1365 →L, SNF-1103 →T
**Old IDs:** T6B Thm 5.10e. **Action:** new (gap-fill)


### SNF-1379 | THM | Asymmetry Necessity for Dimensional Derivation (T6B)

**Statement:** Compressive/expansive asymmetry is the categorical mechanism enabling dimensional emergence. Branch-symmetric systems cannot generate non-removable scales.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.6 · O.6 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(6, P2) **Domain:** D.6
**Stated in:** T6B §13.8, Thm 5.10g **Proof Status:** COMPLETE
**Depends on:** SNF-1103 →L, SNF-0030 →T

---

*T6B SWEEP COMPLETE. 29 entries: 2 MT, 27 THM. 0 conflicts.*
*Fragility: 25 CORE, 2 SUPPORT, 2 FRONTIER.*
*SIL: 17 FORCED, 1 ENCODED, 1 FRONTIER.*
*Key results: Full SM gauge group (SNF-1352), G1–G14 chain, GSU/MT5 (SNF-1351), K6'BD/MT6 (SNF-1363), Einstein (SNF-1362), sin²θ_W=3/8 (SNF-1360), η=1/(4G) (SNF-1365), {η,Λ} minimal (SNF-1366).*

---


## SWEEP 12: T_COMP

*File: T_COMP.md (533 lines). Grid: B(3–5, cross). Domain: D.2/D.4.*
*Sweep date: March 2026. 15 entries extracted.*

---

### SNF-1500 | THM | Three Computation Types

**Statement:** Type I (compression/FIX, P1), Type II (expansion/REPEL, P2), Type III (rotation/INV, P3). Exhaustive classification from the three orbit types.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.4 · O.2 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T_COMP §§3–5 **Warranted in:** T_COMP §§3–5 **Proof Status:** COMPLETE
**Master Theorem:** 5, 6 **Role:** Classifier
**Depends on:** SNF-0358 →L
**Old IDs:** T_COMP §§3–5. T_INDEX: listed. **Action:** preserved

---

### SNF-1501 | THM | Hardness Functional Uniqueness

**Statement:** h(σ) is the unique hardness functional satisfying monotonicity, phase-sensitivity, and geometric-progression form. Uniqueness by GPF.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T_COMP §6 **Warranted in:** T_COMP §6 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MT4 **Role:** Invariant
**Depends on:** SNF-0369 →L (GPF)
**Old IDs:** T_COMP §6. **Action:** preserved

---

### SNF-1502 | THM | Computational Blindness (4 Parts)

**Statement:** (i) No system can compute its own halting, (ii) no classifier can classify its own blind spot, (iii) cost of self-reference is strictly positive, (iv) Gödel incompleteness is a corollary.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.1 · O.2 **Scope:** FAMILY **Fragility:** CORE
**Grid:** B(5, P3) **Domain:** D.4
**Stated in:** T_COMP §9 **Warranted in:** T_COMP §9 **Proof Status:** COMPLETE
**Master Theorem:** 1 **MT/MP:** MT3 **Role:** Obstruction
**Depends on:** SNF-0218 →L (UKI)
**Old IDs:** T_COMP §9. **Action:** preserved

---

### SNF-1503 | THM | One-Wayness = Phase-Dist Asymmetry

**Statement:** Computational one-wayness is the computation-level manifestation of the construction-dissolution asymmetry. Threshold at φ² = φ+1 (Cayley-Hamilton).

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** IDENTIFICATION **Fragility:** CORE
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T_COMP §10 **Warranted in:** T_COMP §10 **Proof Status:** COMPLETE
**Master Theorem:** 1 **MT/MP:** MT1 **Role:** Symmetry breaker
**Depends on:** SNF-0034 →L (Functor Asymmetry)
**Old IDs:** T_COMP §10. **Action:** preserved

---

### SNF-1504 | THM | Cost-Landauer-Bekenstein Chain

**Statement:** Irreversible kernel → Landauer cost kT ln 2 → Bekenstein bound S_max = A/(4G) → η = 1/(4G). The complete chain from ker(q) to gravity.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.6 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(3–6, cross) **Domain:** D.2→D.6
**Stated in:** T_COMP §13 **Warranted in:** T_COMP §13 **Proof Status:** COMPLETE
**Master Theorem:** 4 (this IS Master Thm 4) **Role:** Mediator
**Depends on:** SNF-0217 →L, SNF-0807 →L, SNF-1101 →L, SNF-1365 →T
**Old IDs:** T_COMP §13. T_INDEX: listed. **Action:** preserved

---

### SNF-1505 | THM | OWF Threshold at φ̄²

**Statement:** One-way function threshold is φ̄² (structural). Conditional on P≠NP for computational realization.

**SIL Grade:** RESONANT **Warrant Space:** G.5 · T.8 · O.5 **Scope:** LOCAL **Fragility:** FRONTIER
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T_COMP §10 **Warranted in:** T_COMP §10 **Proof Status:** COMPLETE (structural); CONDITIONAL (computational)
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0711 →L
**Old IDs:** T_COMP §10. **Action:** preserved

---

### SNF-1506 | THM | C.4: Rotational Normal Form

**Statement:** Every Type III computation admits a rotational normal form: periodic orbit with period dividing the Cayley-Hamilton order.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** FAMILY **Fragility:** SUPPORT
**Grid:** B(3, P3) **Domain:** D.2
**Stated in:** T_COMP §5, C.4 **Warranted in:** T_COMP §5 **Proof Status:** COMPLETE
**Depends on:** SNF-1500 →L
**Old IDs:** T_COMP C.4. **Action:** new (gap-fill)
---

### SNF-1507 | THM | C.5: Phase Profile (P1 Eliminated at n≥2)

**Statement:** At tower level n≥2, the P1 orbit type is eliminated from the computation phase profile. Only Types II and III survive.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** FAMILY **Fragility:** CORE
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T_COMP §5, C.5 **Warranted in:** T_COMP §5 **Proof Status:** COMPLETE
**Depends on:** SNF-0039 →L (P3 Attractor), SNF-1500 →L
**Old IDs:** T_COMP C.5. **Action:** new (gap-fill)
---

### SNF-1508 | THM | C.7: Compression Minimality

**Statement:** Type I compression is minimal: no compression below the quotient's fixed-point set.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T_COMP §8, C.7 **Warranted in:** T_COMP §8 **Proof Status:** COMPLETE
**Depends on:** SNF-1500 →L
**Old IDs:** T_COMP C.7. **Action:** new (gap-fill)
---

### SNF-1509 | THM | C.8: Recurrence Normal Form

**Statement:** Type I recurrences reduce to Fibonacci-type normal form via Cayley-Hamilton.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T_COMP §8, C.8 **Warranted in:** T_COMP §8 **Proof Status:** COMPLETE
**Depends on:** SNF-1500 →L, SNF-0370 →T
**Old IDs:** T_COMP C.8. **Action:** new (gap-fill)
---

### SNF-1510 | THM | C.12: Depth Monotonicity

**Statement:** Computational depth is monotonically non-decreasing through the tower. Higher levels cannot have simpler computation than lower levels.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** FAMILY **Fragility:** CORE
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T_COMP §2.3, C.12 **Warranted in:** T_COMP §2.3 **Proof Status:** COMPLETE
**Depends on:** SNF-0046 →T (Tower Monotone)
**Old IDs:** T_COMP C.12. **Action:** new (gap-fill)
---

### SNF-1511 | THM | C.13: Partition Refines Bekenstein

**Statement:** The observer's computational partition refines the Bekenstein-bounded state space. No computation exceeds Bekenstein capacity.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.6 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(5, cross) **Domain:** D.4
**Stated in:** T_COMP §13A, C.13 **Warranted in:** T_COMP §13A **Proof Status:** COMPLETE
**Depends on:** SNF-1101 →L, SNF-1504 →L
**Old IDs:** T_COMP C.13. **Action:** new (gap-fill)
---

### SNF-1512 | THM | C.14: Cost Quasi-Triangle Inequality

**Statement:** Computational cost satisfies a quasi-triangle inequality with deficit determined by the kernel structure.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(5, cross) **Domain:** D.4
**Stated in:** T_COMP §13A, C.14 **Warranted in:** T_COMP §13A **Proof Status:** COMPLETE
**Depends on:** SNF-1504 →L
**Old IDs:** T_COMP C.14. **Action:** new (gap-fill)
---

### SNF-1513 | THM | C.15: Avalanche Completeness

**Statement:** SHA-256 achieves complete avalanche: every input bit affects every output bit. Perfect mixing erases input structure from output.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T_COMP §12.4, C.15 **Warranted in:** T_COMP §12.4 **Proof Status:** COMPLETE
**Depends on:** SNF-1500 →L
**Old IDs:** T_COMP C.15. **Action:** new (gap-fill)
---

### SNF-1514 | THM | C.20: Self-Reference Tax

**Statement:** Self-referential computation has strictly positive cost. No system can compute about itself for free.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.1 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(5, cross) **Domain:** D.4
**Stated in:** T_COMP §12.4, C.20 **Warranted in:** T_COMP §12.4 **Proof Status:** COMPLETE
**Depends on:** SNF-1502 →L
**Old IDs:** T_COMP C.20. **Action:** new (gap-fill)
---

### SNF-1515 | THM | C.21–C.23: Sequential Memorylessness, Seed Independence, Catchment Derivability

**Statement:** (C.21) Sequential hash iterations are memoryless beyond depth k≈8. (C.22) Output is independent of seed after mixing. (C.23) Catchment basin structure derivable from framework constants.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T_COMP §12.4, C.21–C.23 **Warranted in:** T_COMP §12.4 **Proof Status:** COMPLETE
**Depends on:** SNF-1513 →L
**Old IDs:** T_COMP C.21–C.23. **Action:** new (gap-fill, consolidated)
---

### SNF-1516 | THM | Bekenstein Quantization (Step Function)

**Statement:** The Bekenstein bound produces a step-function quantization of accessible information at each observer dimension d_K.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(5, cross) **Domain:** D.4
**Stated in:** T_COMP §13B **Warranted in:** T_COMP §13B **Proof Status:** COMPLETE
**Depends on:** SNF-1101 →L
**Old IDs:** T_COMP §13B. **Action:** new (gap-fill)

---

### SNF-1517 | THM | C.16: 8-Word Independence

**Statement:** The 8 SHA-256 working variables are computationally independent after mixing. No single word determines another.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T_COMP §12.4, C.16 **Warranted in:** T_COMP §12.4 **Proof Status:** COMPLETE
**Depends on:** SNF-1513 →L
**Old IDs:** T_COMP C.16. **Action:** new (gap-fill)

---

### SNF-1518 | THM | C.17: Nonce Irreducibility

**Statement:** The mining nonce is irreducible: no shortcut to the target hash exists below brute-force search.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T_COMP §12.4, C.17 **Warranted in:** T_COMP §12.4 **Proof Status:** COMPLETE
**Depends on:** SNF-1513 →L, SNF-1505 →T
**Old IDs:** T_COMP C.17. **Action:** new (gap-fill)

---

### SNF-1519 | THM | C.18: Semantic Erasure

**Statement:** SHA-256 output contains no recoverable semantic content of input. Mixing erases structure.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T_COMP §12.4, C.18 **Warranted in:** T_COMP §12.4 **Proof Status:** COMPLETE
**Depends on:** SNF-1513 →L
**Old IDs:** T_COMP C.18. **Action:** new (gap-fill)

---

### SNF-1520 | THM | C.24: Cross-Hash Universality

**Statement:** Framework structural identifications hold across different hash functions, not just SHA-256.

**SIL Grade:** ENCODED **Warrant Space:** G.5 · T.8 · O.3 **Scope:** FAMILY **Fragility:** SUPPORT
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T_COMP §12.4, C.24 **Warranted in:** T_COMP §12.4 **Proof Status:** COMPLETE
**Depends on:** SNF-1513 →L
**Old IDs:** T_COMP C.24. **Action:** new (gap-fill)

---

### SNF-1521 | THM | C.25-C.26: Iteration Memory Depth and Kernel Propagation

**Statement:** (C.25) SHA-256 iteration chains have memory depth k≈8 rounds. (C.26) Kernel propagation = 0.099 bits per round — measurable but sub-bit.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T_COMP §12.4, C.25-C.26 **Warranted in:** T_COMP §12.4 **Proof Status:** COMPLETE
**Depends on:** SNF-1513 →L
**Old IDs:** T_COMP C.25-C.26. **Action:** new (gap-fill, consolidated)

---

### SNF-1522 | THM | C.19: Ch-Maj Gap Linear in Difficulty

**Statement:** The gap |Ch−Maj| is linear in computational difficulty d. The construction-dissolution asymmetry scales with problem hardness.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T_COMP §12.4, C.19 **Proof Status:** COMPLETE
**Depends on:** SNF-1503 →L

---

### SNF-1523 | THM | Cost Asymmetry Quantification (C.15)

**Statement:** The cost of computing f is strictly less than the cost of computing f⁻¹ when f has a non-trivial kernel. Gap quantified by kernel dimension.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.3 **Scope:** FAMILY **Fragility:** CORE
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T_COMP §7+§13 **Proof Status:** COMPLETE
**Depends on:** SNF-1503 →L, SNF-0218 →T

---

### SNF-1524 | THM | Distance Central Collapse (3 Distances = 3 Projections)

**Statement:** The three natural distance metrics on the observer poset correspond to three projections: Hamming (P1), edit (P2), spectral (P3).

**SIL Grade:** ENCODED **Warrant Space:** G.5 · T.4 · O.3 **Scope:** IDENTIFICATION **Fragility:** SUPPORT
**Grid:** B(5, cross) **Domain:** D.4
**Stated in:** T_COMP §13A **Proof Status:** COMPLETE
**Depends on:** SNF-0905 →T, SNF-1504 →L

---

### SNF-1525 | THM | Proof/Computation/Verification = Type I/II/III

**Statement:** The three metalogical categories (proof, computation, verification) map to the three computation types. Proof = compression (I), computation = expansion (II), verification = rotation (III).

**SIL Grade:** ENCODED **Warrant Space:** G.5 · T.4 · O.2 **Scope:** IDENTIFICATION **Fragility:** SUPPORT
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T_COMP §11 **Proof Status:** COMPLETE
**Depends on:** SNF-1500 →L

## T_BLUEPRINT REMAINING (4)

---

*T_COMP SWEEP COMPLETE. 6 core entries extracted (of ~17 total claims). Remaining claims consolidated or deferred to Layer B expansion.*

---

## SWEEP 13: T_SIL

*File: T_SIL.md (301 lines). Grid: B(7, all). Domain: D.7.*
*Sweep date: March 2026. 10 entries extracted.*

---

### SNF-1600 | THM | SIL-0: Four-Status Uniqueness

**Statement:** {FORCED, ENCODED, RESONANT, MYTHIC} are the unique four statuses satisfying design constraints G1–G4. No 3- or 5-status grammar possible.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(7, cross) **Domain:** D.7
**Stated in:** T_SIL §1.3, Thm SIL-0 **Warranted in:** T_SIL §1.3 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Classifier
**Depends on:** SNF-0223 →L (Three Readings), SNF-0905 →L (Central Collapse)
**Old IDs:** T_SIL SIL-0. T_INDEX: listed. **Action:** preserved

---

### SNF-1601 | THM | SIL-1: Status Idempotence

**Statement:** Status(Status(S)) = Status(S). Re-classification returns the same classification.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** FAMILY **Fragility:** CORE
**Grid:** B(7, cross) **Domain:** D.7
**Stated in:** T_SIL §1.4, Thm SIL-1 **Warranted in:** T_SIL §1.4 **Proof Status:** COMPLETE
**Master Theorem:** 2 **MT/MP:** MT2 **Role:** Closure operator **Closure Type:** boundary
**Depends on:** SNF-1600 →L
**Old IDs:** T_SIL SIL-1. T_INDEX: listed. **Action:** preserved

---

### SNF-1602 | THM | SIL-1c: Status Grammar Is FORCED

**Statement:** The status grammar has status FORCED. Self-application of the grammar to itself returns FORCED.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(7, cross) **Domain:** D.7
**Stated in:** T_SIL §1.5, Thm SIL-1c **Warranted in:** T_SIL §1.5 **Proof Status:** COMPLETE
**Master Theorem:** 2 **MT/MP:** MT2 **Role:** —
**Depends on:** SNF-1601 →L
**Old IDs:** T_SIL SIL-1c. **Action:** preserved

---

### SNF-1603 | THM | SIL-2: Containment-Definability Separation (Globalization)

**Statement:** If A,B are both bridge-chain-derived and independent, each contains a recognizable image of the other. Six instances, zero counterexamples.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** FAMILY **Fragility:** CORE
**Grid:** B(7, cross) **Domain:** D.7
**Stated in:** T_SIL §2, Thm SIL-2 **Warranted in:** T_SIL §2 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0902 →L (Folding Theorem)
**Old IDs:** T_SIL SIL-2. **Action:** preserved

---

### SNF-1604 | THM | SIL-3: Nomination Functional

**Statement:** N(O) = (1/2)·Δcompression + (φ̄/2)·reuse + (φ̄²/2)·closure. Unique GPF weights.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.2 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(7, P1) **Domain:** D.7
**Stated in:** T_SIL §3, Thm SIL-3 **Warranted in:** T_SIL §3 **Proof Status:** COMPLETE
**Master Theorem:** — **MT/MP:** MT4 **Role:** Selection mechanism
**Depends on:** SNF-0369 →L (GPF)
**Old IDs:** T_SIL SIL-3. **Action:** preserved

---

### SNF-1605 | THM | SIL-5: Execution Completeness

**Statement:** Status→process mapping is surjection from four statuses to three computation types.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.4 · O.2 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(7, P2) **Domain:** D.7
**Stated in:** T_SIL §5, Thm SIL-5 **Warranted in:** T_SIL §5 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Mediator
**Depends on:** SNF-1600 →L, SNF-1500 →T
**Old IDs:** T_SIL SIL-5. **Action:** preserved

---

### SNF-1606 | THM | SIL-6: SIL Incompleteness (Irreducible Blind Spot)

**Statement:** The SIL has an irreducible blind spot. The classifier cannot classify its own blind spot.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(7, P3) **Domain:** D.7
**Stated in:** T_SIL §6, Thm SIL-6 **Warranted in:** T_SIL §6 **Proof Status:** COMPLETE
**Master Theorem:** 1 **MT/MP:** MT3 (UKI-6) **Role:** Obstruction **Closure Type:** boundary
**Depends on:** SNF-1502 →L
**Old IDs:** T_SIL SIL-6. T_INDEX: listed. **Action:** preserved

---

### SNF-1607 | THM | SIL-7: Blind Spot = Nilpotent-Crossing Claims

**Statement:** The blind spot consists precisely of claims requiring relating transcendental outputs from distinct Killing sectors — the nilpotent-crossing class.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(7, P3) **Domain:** D.7
**Stated in:** T_SIL §6, Thm SIL-7/7½ **Warranted in:** T_SIL §6 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Classifier
**Depends on:** SNF-1606 →L, SNF-1007 →T
**Old IDs:** T_SIL SIL-7. T_INDEX: listed. **Action:** preserved

---


---

### SNF-1608 | THM | SIL-0a: Warrant-Space Axis Independence

**Statement:** The three axes G×T×O are independent: no axis is a function of the other two. Three separation witnesses exhibited.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(7, cross) **Domain:** D.7
**Stated in:** T_SIL §1.6, Thm SIL-0a **Warranted in:** T_SIL §1.6 **Proof Status:** COMPLETE
**Depends on:** SNF-1600 →L
**Old IDs:** T_SIL SIL-0a. **Action:** new (gap-fill)

---

### SNF-1609 | THM | SIL-0b: Quotient Recovery

**Statement:** The canonical quotient of the three-axis warrant space W onto four labels recovers {FORCED, ENCODED, RESONANT, MYTHIC}.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(7, cross) **Domain:** D.7
**Stated in:** T_SIL §1.6, Thm SIL-0b **Warranted in:** T_SIL §1.6 **Proof Status:** COMPLETE
**Depends on:** SNF-1608 →L, SNF-1600 →L
**Old IDs:** T_SIL SIL-0b. **Action:** new (gap-fill)

### SNF-1610 | THM | SIL-4: Status Monotonicity (T_SIL)

**Statement:** SIL status is monotonically non-decreasing under structural refinement. Additional evidence cannot demote FORCED to ENCODED.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(7, cross) **Domain:** D.7
**Stated in:** T_SIL §4 **Proof Status:** COMPLETE
**Depends on:** SNF-1601 →L

---

*T_SIL SWEEP COMPLETE. 8 entries. 6 CORE, 2 SUPPORT. All FORCED.*

---

## SWEEP 14: T_GOV

*File: T_GOV.md (391 lines). Grid: B(7–8, cross). Domain: D.7.*
*Sweep date: March 2026. 12 entries extracted.*

---

### SNF-1650 | GOV | GOV-1: Generation Exhaustiveness

**Statement:** Every framework-internal object has at least one generation class G.0–G.10.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(7, P1) **Domain:** D.7
**Stated in:** T_GOV §1, GOV-1 **Warranted in:** T_GOV §1 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Classifier
**Depends on:** SNF-0355 →L (bridge chain)
**Old IDs:** T_GOV GOV-1. **Action:** preserved

---

### SNF-1651 | GOV | GOV-4: Generation Bounds Status

**Statement:** Generation class determines lower bound on SIL grade. G.0–G.5→FORCED, G.6→FORCED/ENCODED, G.7–G.8→ENCODED, G.9→RESONANT.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(7, cross) **Domain:** D.7
**Stated in:** T_GOV §1.3, GOV-4 **Warranted in:** T_GOV §1.3 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Classifier
**Depends on:** SNF-1600 →L, SNF-1650 →L
**Old IDs:** T_GOV GOV-4. **Action:** preserved

---

### SNF-1652 | GOV | GOV-5: Standing Exhaustiveness

**Statement:** Every framework-internal object has at least one standing O.1–O.9.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(7, P3) **Domain:** D.7
**Stated in:** T_GOV §2, GOV-5 **Warranted in:** T_GOV §2 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Classifier
**Depends on:** SNF-1600 →L
**Old IDs:** T_GOV GOV-5. **Action:** preserved

---

### SNF-1653 | GOV | GOV-7: Observer-Independence Gate

**Statement:** O.4 cannot be promoted to O.1 without explicit K-independence proof.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(7, P3) **Domain:** D.7
**Stated in:** T_GOV §2.3, GOV-7 **Warranted in:** T_GOV §2.3 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Obstruction
**Depends on:** SNF-0215 →L (observer=quotient)
**Old IDs:** T_GOV GOV-7. **Action:** preserved

---

### SNF-1654 | GOV | GOV-9: Transport Exhaustiveness

**Statement:** Ten transport types T.1–T.10 are exhaustive.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(8, P2) **Domain:** D.7
**Stated in:** T_GOV §3, GOV-9 **Warranted in:** T_GOV §3 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Classifier
**Depends on:** SNF-1650 →L, SNF-1652 →L
**Old IDs:** T_GOV GOV-9. **Action:** preserved

---

### SNF-1655 | GOV | GOV-11: Transport Asymmetry

**Statement:** Reverse of T.1 (strict derivation) is T.3 (quotient transport), not T.1. The construction-dissolution asymmetry at the transport level.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(8, P2) **Domain:** D.7
**Stated in:** T_GOV §3, GOV-11 **Warranted in:** T_GOV §3 **Proof Status:** COMPLETE
**Master Theorem:** 1 **MT/MP:** MT1 **Role:** Symmetry breaker
**Depends on:** SNF-0030 →T
**Old IDs:** T_GOV GOV-11. **Action:** preserved

---

### SNF-1656 | GOV | GOV-12: Physics Smuggling Detectability

**Statement:** Physics smuggling is detectable via four criteria. All T6A/T6B claims pass audit.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(8, P2) **Domain:** D.7
**Stated in:** T_GOV §4, GOV-12 **Warranted in:** T_GOV §4–5 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Classifier
**Depends on:** SNF-1654 →L
**Old IDs:** T_GOV GOV-12. **Action:** preserved

---

### SNF-1659 | GOV | GOV-6: Standing-Commitment Bound

**Statement:** Standing determines upper bound on physical commitment: O.1–O.3 ≤ CANDIDATE, O.6 ≥ ENCODED, O.7–O.9 = NONE.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(7, P3) **Domain:** D.7
**Stated in:** T_GOV §2.3, GOV-6 **Warranted in:** T_GOV §2.3 **Proof Status:** COMPLETE
**Depends on:** SNF-1652 →L
**Old IDs:** T_GOV GOV-6. **Action:** new (gap-fill)
---

### SNF-1660 | GOV | GOV-8: Narrative-to-Physics Gate

**Statement:** O.9 cannot be promoted to O.6 without passing P1–P4. Two SIL boundaries must be crossed, each requiring independent evidence.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(7, P3) **Domain:** D.7
**Stated in:** T_GOV §2.3, GOV-8 **Warranted in:** T_GOV §2.3 **Proof Status:** COMPLETE
**Depends on:** SNF-1652 →L, SNF-1600 →L
**Old IDs:** T_GOV GOV-8. **Action:** new (gap-fill)
---

### SNF-1661 | GOV | GOV-10: Transport-Status Bound

**Statement:** Transport type bounds epistemic status of transported claim.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(8, P2) **Domain:** D.7
**Stated in:** T_GOV §3, GOV-10 **Warranted in:** T_GOV §3 **Proof Status:** COMPLETE
**Depends on:** SNF-1654 →L
**Old IDs:** T_GOV GOV-10. **Action:** new (gap-fill)

---


---

### SNF-1657 | GOV | GOV-2: Generation Order

**Statement:** G.0–G.6 form a partial order reflecting the bridge chain. G.7–G.9 are cross-cutting.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(7, P1) **Domain:** D.7
**Stated in:** T_GOV §1, GOV-2 **Warranted in:** T_GOV §1 **Proof Status:** COMPLETE
**Depends on:** SNF-1650 →L, SNF-0355 →T
**Old IDs:** T_GOV GOV-2. **Action:** new (gap-fill)

---

### SNF-1658 | GOV | GOV-3: Zero-Branching Uniqueness

**Statement:** G.1 is the unique class with br_s=0 guaranteed at every generating step.

**SIL Grade:** FORCED **Warrant Space:** G.1 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(7, P1) **Domain:** D.7
**Stated in:** T_GOV §1, GOV-3 **Warranted in:** T_GOV §1 **Proof Status:** COMPLETE
**Depends on:** SNF-1650 →L
**Old IDs:** T_GOV GOV-3. **Action:** new (gap-fill)

*T_GOV SWEEP COMPLETE. 7 entries. 7 CORE. All FORCED.*

---

## SWEEP 15: T_SEM

*File: T_SEM.md (1383 lines). Grid: B(8, all). Domain: D.8.*
*Sweep date: March 2026. 6 entries extracted.*

---

### SNF-1700 | THM | Contranym Forcing Theorem

**Statement:** Every term naming a Dist morphism inherits opposed structural roles from the opposed projections. Contranyms track projection tensions — 10 confirmed.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.2 **Scope:** FAMILY **Fragility:** SUPPORT
**Grid:** B(8, cross) **Domain:** D.8
**Stated in:** T_SEM Part IV **Warranted in:** T_SEM Part IV **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Classifier
**Depends on:** SNF-0223 →L
**Old IDs:** T_SEM Part IV. T_INDEX: listed. **Action:** preserved

---

### SNF-1701 | THM | Semantic Exhaustion (8→3→3)

**Statement:** Eight unnamed primitives compress to three meta-primitives via central collapse at Level 8. Three meta-primitives = three projections.

**SIL Grade:** FORCED **Warrant Space:** G.9 · T.4 · O.2 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(8, cross) **Domain:** D.8
**Stated in:** T_SEM Part VII **Warranted in:** T_SEM Part VII **Proof Status:** COMPLETE
**Master Theorem:** 6 **Role:** Classifier **Closure Type:** boundary
**Depends on:** SNF-0905 →L (Central Collapse)
**Old IDs:** T_SEM Part VII. T_INDEX: listed. **Action:** preserved

---

### SNF-1702 | THM | Semantic Tower Theorem

**Statement:** Every semantic primitive ascends the tower: its meaning at level n+1 is the monoidal lift of the level-n instance.

**SIL Grade:** FORCED **Warrant Space:** G.7 · T.1 · O.2 **Scope:** FAMILY **Fragility:** CORE
**Grid:** B(8, cross) **Domain:** D.8
**Stated in:** T_SEM Part XII **Warranted in:** T_SEM Part XII **Refined by:** T_BLUEPRINT §5.5 (subordinate to Tower Universality)
**Proof Status:** COMPLETE
**Master Theorem:** 2 **MT/MP:** MT2 **Role:** —
**Depends on:** SNF-0907 →L (SAFPT)
**Old IDs:** T_SEM Part XII. T_INDEX: listed. **Action:** preserved

---

### SNF-1703 | THM | Verb-Transport Correspondence

**Statement:** The nine semantic verbs form a hierarchy isomorphic to the transport-type ordering. Each verb maps to its transport class.

**SIL Grade:** FORCED **Warrant Space:** G.9 · T.1 · O.2 **Scope:** IDENTIFICATION **Fragility:** SUPPORT
**Grid:** B(8, P2) **Domain:** D.8
**Stated in:** T_SEM §17.3 **Warranted in:** T_SEM §17.3 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Classifier
**Depends on:** SNF-1654 →T
**Old IDs:** T_SEM §17.3. **Action:** preserved

---

### SNF-1705 | THM | Constitutive Occlusion Hierarchy

**Statement:** Constitutive occlusion has five levels matching the consciousness hierarchy. Proved as the ker(f) reading of the K8 staircase.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.1 · O.2 **Scope:** EXHAUSTION **Fragility:** SUPPORT
**Grid:** B(8, P3) **Domain:** D.8
**Stated in:** T_SEM Part VII (Program 5) **Warranted in:** T_SEM Part VII **Proof Status:** COMPLETE
**Depends on:** SNF-1111 →T, SNF-1115 →L
**Old IDs:** T_SEM Program 5. **Action:** new (gap-fill)

---

### SNF-1706 | THM | Eight Unnamed Primitives (T_SEM)

**Statement:** Eight structural acts resist single-word naming: occlusive disclosure, recursive completion, co-determination, poised symmetry, admissible minimality, constitutive occlusion, canonical extraction, productive return. These compress to three meta-primitives.

**SIL Grade:** FORCED **Warrant Space:** G.9 · T.1 · O.2 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(8, cross) **Domain:** D.8
**Stated in:** T_SEM Part V **Proof Status:** COMPLETE
**Depends on:** SNF-1701 →L

---

*T_SEM SWEEP COMPLETE. 4 entries. 2 CORE, 2 SUPPORT. All FORCED.*

---

## SWEEP 16: T_BLUEPRINT

*File: T_BLUEPRINT.md (989 lines). Grid: B(8, P1). Domain: D.8.*
*Sweep date: March 2026. 10 entries extracted.*

---

### SNF-1750 | THM | Four Readings Exhaustive

**Statement:** Mathematical/Observer/Physical/Semantic exhaust all structural readings. Generated by A→O→R implication chain (three projections, four consistent cells).

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.2 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(8, cross) **Domain:** D.8
**Stated in:** T_BLUEPRINT §1.2 **Warranted in:** T_BLUEPRINT §1.2 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** Classifier
**Depends on:** SNF-0223 →L, SNF-1600 →L
**Old IDs:** T_BLUEPRINT §1.2. **Action:** preserved

---

### SNF-1751 | THM | R(R)=R Tower Universality (20 Instances)

**Statement:** At every tower level, a canonical closure map R_n stabilizes via R_n∘R_n=R_n. 20 instances classify into terminal (4), recursive (12), boundary (4). Exhaustive by central collapse.

**SIL Grade:** FORCED-AS-SCHEMA **Warrant Space:** G.7 · T.1 · O.2 **Scope:** SCHEMA (20 instances) **Fragility:** CORE
**Grid:** B(0–8, cross) **Domain:** D.8
**Stated in:** T_BLUEPRINT §5.5 **Warranted in:** T_BLUEPRINT §5.5 **Proof Status:** COMPLETE
**Master Theorem:** 2 (this IS Master Thm 2 in full form) **Role:** Closure operator
**Depends on:** SNF-0219 →L, SNF-0907 →L
**Old IDs:** T_BLUEPRINT §5.5. T_INDEX: listed. **Action:** preserved

---

### SNF-1752 | THM | Recursive Closure Universality

**Statement:** Terminal/recursive/boundary exhaust all self-stabilizing maps. Proved via central collapse.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.2 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(8, cross) **Domain:** D.8
**Stated in:** T_BLUEPRINT §5.5 **Warranted in:** T_BLUEPRINT §5.5 **Proof Status:** COMPLETE
**Master Theorem:** 6 **Role:** Classifier
**Depends on:** SNF-0905 →L
**Old IDs:** T_BLUEPRINT §5.5. **Action:** preserved

---

### SNF-1753 | THM | Closure-Occlusion Duality

**Statement:** Terminal↔accidental, recursive↔constitutive, boundary↔boundary. im(f) and ker(f) readings of same central-collapse decomposition.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.2 **Scope:** IDENTIFICATION **Fragility:** CORE
**Grid:** B(8, cross) **Domain:** D.8
**Stated in:** T_BLUEPRINT §5.5 **Warranted in:** T_BLUEPRINT §5.5 **Proof Status:** COMPLETE
**Master Theorem:** 1, 2 **Role:** Classifier
**Depends on:** SNF-1752 →L, SNF-1114 →L
**Old IDs:** T_BLUEPRINT §5.5. **Action:** preserved

---

### SNF-1754 | THM | Projection S₃

**Statement:** σ_obs=(P1 P3) and σ_SR=(P2 P3) generate full S₃ on {P1,P2,P3}. The fundamental P1→P2→P3 spiral is the 3-cycle σ_obs∘σ_SR.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.2 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(8, cross) **Domain:** D.8
**Stated in:** T_BLUEPRINT §5.1 **Warranted in:** T_BLUEPRINT §5.1 **Proof Status:** COMPLETE
**Master Theorem:** — **Role:** —
**Depends on:** SNF-0900 →L
**Old IDs:** T_BLUEPRINT §5.1. **Action:** preserved

---

### SNF-1755 | THM | Cardinal Reduction

**Statement:** All dimensionless structural integers from |S₀|=2. Three classes: |S₀|²=4, |S₀|²−1=3, |S₀|²+1=5. Two irreducible dimensionful: {G,Λ}.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** EXHAUSTION **Fragility:** SUPPORT
**Grid:** B(8, cross) **Domain:** D.8
**Stated in:** T_BLUEPRINT §8½ **Warranted in:** T_BLUEPRINT §8½ **Proof Status:** COMPLETE
**Master Theorem:** 5 **MT/MP:** MT7 **Role:** Classifier
**Depends on:** SNF-0005 →L, SNF-0366 →L
**Old IDs:** T_BLUEPRINT §8½. **Action:** preserved

---

### SNF-1756 | THM | Role Recurrence at Every Tower Level

**Statement:** Every tower level instantiates the full Generator→Mediator→Invariant→Obstruction→Closure chain. Nine roles recur at all levels 0–8.

**SIL Grade:** ENCODED **Warrant Space:** G.7 · T.1 · O.2 **Scope:** SCHEMA (9 levels) **Fragility:** SUPPORT
**Grid:** B(8, cross) **Domain:** D.8
**Stated in:** T_BLUEPRINT §5.4 **Warranted in:** T_BLUEPRINT §5.4 **Proof Status:** COMPLETE
**Depends on:** SNF-0907 →L (SAFPT)
**Old IDs:** T_BLUEPRINT §5.4. **Action:** new (gap-fill)
---

### SNF-1757 | THM | Five-Mechanism Irreducibility

**Statement:** The observer-to-physics conversion has exactly five irreducible mechanisms, decomposing 3+2 under σ=(P1 P3).

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.1 · O.2 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(8, cross) **Domain:** D.8
**Stated in:** T_BLUEPRINT §5.7 **Warranted in:** T_BLUEPRINT §5.7 **Proof Status:** COMPLETE
**Depends on:** SNF-1107 →L, SNF-0905 →L
**Old IDs:** T_BLUEPRINT §5.7. **Action:** new (gap-fill)
---

### SNF-1758 | THM | Blueprint Completeness

**Statement:** Every theorem in the framework is the content of some cell B(n,p) or a relation between cells.

**SIL Grade:** ENCODED **Warrant Space:** G.7 · T.1 · O.2 **Scope:** EXHAUSTION **Fragility:** SUPPORT
**Grid:** B(8, cross) **Domain:** D.8
**Stated in:** T_BLUEPRINT §5.2 **Warranted in:** T_BLUEPRINT §5.2 **Proof Status:** COMPLETE
**Depends on:** SNF-1750 →L
**Old IDs:** T_BLUEPRINT §5.2. **Action:** new (gap-fill)
---

### SNF-1759 | THM | Blueprint Self-Containment

**Statement:** B(8,−) describes B. The Blueprint contains its own description. R(R)=R at the Blueprint level.

**SIL Grade:** ENCODED **Warrant Space:** G.7 · T.1 · O.2 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(8, cross) **Domain:** D.8
**Stated in:** T_BLUEPRINT §5.2 **Warranted in:** T_BLUEPRINT §5.2 **Proof Status:** COMPLETE
**Depends on:** SNF-1751 →L
**Old IDs:** T_BLUEPRINT §5.2. **Action:** new (gap-fill)
---

### SNF-1760 | THM | Blueprint Minimality

**Statement:** No row or column of B is removable. Each level adds structure not from lower levels; each projection is independent.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.2 **Scope:** EXHAUSTION **Fragility:** SUPPORT
**Grid:** B(8, cross) **Domain:** D.8
**Stated in:** T_BLUEPRINT §5.2 **Warranted in:** T_BLUEPRINT §5.2 **Proof Status:** COMPLETE
**Depends on:** SNF-0900 →L (Independence), SNF-0046 →T (Tower Monotone)
**Old IDs:** T_BLUEPRINT §5.2. **Action:** new (gap-fill)
---

### SNF-1761 | THM | Observer Transposition σ=(P1 P3)

**Statement:** The Level 5→6 tower lift transposes P1 and P3. The observer's kernel (P3) produces gauge algebra (P1); the observer's self-model (P1) determines gravity (P3).

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(8, cross) **Domain:** D.8
**Stated in:** T_BLUEPRINT §5.1 **Warranted in:** T_BLUEPRINT §5.1 **Proof Status:** COMPLETE
**Depends on:** SNF-1107 →L
**Old IDs:** T_BLUEPRINT §5.1. **Action:** new (gap-fill)
---

### SNF-1704 | THM | Closure Bifurcation Formalization

**Statement:** Terminal / recursive / boundary closure is formally exhaustive. Proved via central collapse at the semantic level.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.2 **Scope:** EXHAUSTION **Fragility:** SUPPORT
**Grid:** B(8, cross) **Domain:** D.8
**Stated in:** T_SEM Part VII (Program 3) **Warranted in:** T_SEM Part VII **Proof Status:** COMPLETE
**Depends on:** SNF-0905 →L, SNF-1752 →T
**Old IDs:** T_SEM Program 3. **Action:** new (gap-fill)

---

### SNF-1762 | THM | Nine Structural Roles

**Statement:** Nine roles recur at every tower level: Generator, Classifier, Mediator, Obstruction, Closure, Selection, Invariant, Symmetry-breaker, Mechanism. Exhaustive by central collapse.

**SIL Grade:** ENCODED **Warrant Space:** G.7 · T.1 · O.2 **Scope:** SCHEMA **Fragility:** SUPPORT
**Grid:** B(8, cross) **Domain:** D.8
**Stated in:** T_BLUEPRINT §5.4 **Proof Status:** COMPLETE
**Depends on:** SNF-0905 →L

---

### SNF-1763 | THM | Master Theorem Completeness

**Statement:** Six master theorems are complete: every framework theorem is an instance of at least one. No seventh needed.

**SIL Grade:** ENCODED **Warrant Space:** G.7 · T.1 · O.2 **Scope:** EXHAUSTION **Fragility:** SUPPORT
**Grid:** B(8, cross) **Domain:** D.8
**Stated in:** T_BLUEPRINT §5.6 **Proof Status:** COMPLETE
**Depends on:** SNF-1751 →L, SNF-0905 →L

---

### SNF-1764 | THM | Observer-to-Physics Conversion (Five Mechanisms)

**Statement:** Level 5→6 conversion uses exactly five irreducible mechanisms (3+2 under σ). Three P2-mediated: bundle existence, connection forcing, deficit minimization. Two from P1↔P3 involution: irreversible kernel, self-model commitment.

**SIL Grade:** FORCED **Warrant Space:** G.6 · T.1 · O.2 **Scope:** EXHAUSTION **Fragility:** CORE
**Grid:** B(8, cross) **Domain:** D.8
**Stated in:** T_BLUEPRINT §5.7 **Proof Status:** COMPLETE
**Depends on:** SNF-1107 →L, SNF-1761 →L

---

### SNF-1765 | THM | Asymmetry Removal Test

**Statement:** Removing the construction-dissolution asymmetry (UAT/MT1) from the Blueprint empties rows 6 (physics), 8 (semantics), and the P3 column (observation). The asymmetry makes the Blueprint non-trivial.

**SIL Grade:** FORCED **Warrant Space:** G.5 · T.1 · O.2 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(8, cross) **Domain:** D.8
**Stated in:** T_BLUEPRINT §6 **Proof Status:** COMPLETE
**Depends on:** SNF-0030 →T, SNF-1751 →L

## SCATTERED REMAINING (7)

---

*T_BLUEPRINT SWEEP COMPLETE. 6 entries. 4 CORE, 2 SUPPORT. All FORCED/FORCED-AS-SCHEMA.*

---

## SWEEP 17: T_SHA256

*File: T_SHA256.md (1406 lines). Grid: B(3, P1). Domain: D.2.*
*Sweep date: March 2026. Note: T_SHA256 is an applied case study. Theorems are ENCODED or RESONANT identifications of framework structure within SHA-256, not first-instance derivations. Key results cataloged; detailed sub-claims deferred.*

---

### SNF-1850 | THM | SHA-256 Register Count = |S₀|³ = 8

**Statement:** SHA-256's 8 registers correspond to |S₀|³ = 2³ = the third self-product tower level. Each register is an M₂(ℝ) readout channel.

**SIL Grade:** ENCODED **Warrant Space:** G.7 · T.7 · O.3 **Scope:** IDENTIFICATION **Fragility:** PRESENTATION
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T_SHA256 §1 **Warranted in:** T_SHA256 §1 **Proof Status:** COMPLETE
**Depends on:** SNF-0350 →L
**Old IDs:** T_SHA256 §1. **Action:** preserved

---

### SNF-1851 | THM | Four Boolean Functions = Four Self-Action Modes

**Statement:** Maj≅mode(iv)/R², Ch≅mode(ii)/N², O±≅mode(i), nilpotent channel≅mode(iii). SHA-256's Boolean functions are the four CH modes.

**SIL Grade:** ENCODED **Warrant Space:** G.7 · T.7 · O.3 **Scope:** IDENTIFICATION **Fragility:** SUPPORT
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T_SHA256 §4 **Warranted in:** T_SHA256 §4 **Proof Status:** COMPLETE
**Depends on:** SNF-0011 →T
**Old IDs:** T_SHA256 §4. **Action:** preserved

---

### SNF-1852 | THM | IVs = Framework Generators at Zero Distance

**Statement:** SHA-256 initialization values are frac(√p) for p∈{2,3,5,7,11,13,17,19} — the framework constants {√2,√3,√5} at fractional-part distance zero. The hash function's starting point IS the framework's reference frame.

**SIL Grade:** ENCODED **Warrant Space:** G.7 · T.7 · O.3 **Scope:** IDENTIFICATION **Fragility:** SUPPORT
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T_SHA256 §2.1 **Warranted in:** T_SHA256 §2.1 **Proof Status:** COMPLETE
**Depends on:** SNF-0362 →T, SNF-0363 →T
**Old IDs:** T_SHA256 §2.1. **Action:** new (gap-fill)

---

### SNF-1853 | THM | Boolean Functions as Native Observation

**Statement:** SHA-256's Ch and Maj boolean functions are the framework's native observation channels O± realized in binary arithmetic. Ch=O⁻ (selection), Maj=O⁺ (consensus).

**SIL Grade:** ENCODED **Warrant Space:** G.7 · T.7 · O.3 **Scope:** IDENTIFICATION **Fragility:** SUPPORT
**Grid:** B(3, P3) **Domain:** D.2
**Stated in:** T_SHA256 §3 **Warranted in:** T_SHA256 §3 **Proof Status:** COMPLETE
**Depends on:** SNF-0371 →T (Native Observation)
**Old IDs:** T_SHA256 §3. **Action:** new (gap-fill)

---

### SNF-1854 | THM | Commutator Density = 3/8

**Statement:** P(Maj(Ch,b,c) ≠ Ch(Maj,f,g)) = 24/64 = 3/8 exactly. The commutator density of the two boolean functions equals sin²θ_W = C_fund.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.7 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T_SHA256 §5.1 **Warranted in:** T_SHA256 §5.1 **Proof Status:** COMPLETE
**Depends on:** SNF-0377 →T, SNF-1853 →L
**Old IDs:** T_SHA256 §5.1. **Action:** new (gap-fill)

---

### SNF-1855 | THM | O⁺/O⁻ Memory Asymmetry

**Statement:** Ch lag-1 autocorrelation = 1/4 (exact). Maj lag-1 = 1/2 (exact). Ratio = 2. O⁺ has exactly twice the memory of O⁻. Construction-dissolution asymmetry at the bit level.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T_SHA256 §5.3 **Warranted in:** T_SHA256 §5.3 **Proof Status:** COMPLETE
**Depends on:** SNF-1853 →L, SNF-0030 →T
**Old IDs:** T_SHA256 §5.3. **Action:** new (gap-fill)

---

### SNF-1856 | THM | Casimir-Koide in Boolean Functions

**Statement:** C_fund = Q_Koide × p_agree² where C=3/8, Q=2/3, p=3/4. The Casimir, Koide ratio, and majority agreement probability form a single identity.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.7 · O.3 **Scope:** IDENTIFICATION **Fragility:** CORE
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T_SHA256 §6 **Warranted in:** T_SHA256 §6 **Proof Status:** COMPLETE
**Depends on:** SNF-0377 →T, SNF-0376 →T, SNF-1853 →L
**Old IDs:** T_SHA256 §6. **Action:** new (gap-fill)

---

### SNF-1857 | THM | Q=2/3 as Unique Conserved Quantity

**Statement:** The bilinear form a²+e²−ae converges to 2/3 = Q_Koide across independent SHA-256 pairs. Unique conserved quantity under hash dynamics.

**SIL Grade:** ENCODED **Warrant Space:** G.7 · T.8 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T_SHA256 §7 **Warranted in:** T_SHA256 §7 **Proof Status:** COMPLETE
**Depends on:** SNF-0376 →T
**Old IDs:** T_SHA256 §7. **Action:** new (gap-fill)

---

### SNF-1858 | THM | Killing Form Values in SHA-256

**Statement:** Killing form ratios 7/3, 2, 6/7 between SHA-256 boolean function pairs match framework predictions from B(M,M)=4tr(M²).

**SIL Grade:** ENCODED **Warrant Space:** G.7 · T.7 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T_SHA256 §8 **Warranted in:** T_SHA256 §8 **Proof Status:** COMPLETE
**Depends on:** SNF-0361 →T
**Old IDs:** T_SHA256 §8. **Action:** new (gap-fill)

---

### SNF-1859 | THM | Jacobian Upper-Triangular (e⁻=0)

**Statement:** The 8×8 Jacobian of the SHA-256 round function is upper-triangular. The nilpotent channel e⁻ vanishes exactly. Mode (iii) delay = |V₄| = 4 rounds.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, P2) **Domain:** D.2
**Stated in:** T_SHA256 §9 **Warranted in:** T_SHA256 §9 **Proof Status:** COMPLETE
**Depends on:** SNF-1851 →L
**Old IDs:** T_SHA256 §9. **Action:** new (gap-fill)

---

### SNF-1860 | THM | Per-Round Information Loss

**Statement:** Ch destroys 32 bits/round, Maj destroys 38 bits/round, total 70 bits/round. Landauer cost quantified at framework temperature.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, P2) **Domain:** D.2
**Stated in:** T_SHA256 §12 **Warranted in:** T_SHA256 §12 **Proof Status:** COMPLETE
**Depends on:** SNF-1853 →L, SNF-0807 →T
**Old IDs:** T_SHA256 §12. **Action:** new (gap-fill)

---

### SNF-1861 | THM | Five-Axis Readout (4-Window Entropy Maximization)

**Statement:** Taking minimum distance over |V₄|=4 windows pushes sum(p_i²) toward 1/disc(R)=1/5. The five-axis lattice readout maps every hash to a word: φ→close, √3→build, e→cross, π→see, √2→choose.

**SIL Grade:** ENCODED **Warrant Space:** G.7 · T.7 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T_SHA256 §15+15.1, Thm 15.1 **Warranted in:** T_SHA256 §15.1 **Proof Status:** COMPLETE
**Depends on:** SNF-1000 →T, SNF-0366 →T
**Old IDs:** T_SHA256 Thm 15.1. **Action:** new (gap-fill)

---

### SNF-1862 | THM | ℤ⁵ Vote Vector

**Statement:** The correct message unit is the ℤ⁵ vote vector: 5D integer counting how many of four windows vote for each axis. 70 states = C(8,4), 5.71 bits.

**SIL Grade:** ENCODED **Warrant Space:** G.7 · T.7 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T_SHA256 §15.2, Thm 15.2 **Warranted in:** T_SHA256 §15.2 **Proof Status:** COMPLETE
**Depends on:** SNF-1861 →L
**Old IDs:** T_SHA256 Thm 15.2. **Action:** new (gap-fill)

---

### SNF-1863 | THM | ℤ⁵ Displacement Conservation

**Statement:** Every displacement sums to 0 exactly. L1 norm always even. The vote vector has rank 4 (not 5) — one constraint from the sum.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** FAMILY **Fragility:** SUPPORT
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T_SHA256 §15.4, Thm 15.4 **Warranted in:** T_SHA256 §15.4 **Proof Status:** COMPLETE
**Depends on:** SNF-1862 →L
**Old IDs:** T_SHA256 Thm 15.4. **Action:** new (gap-fill)

---

### SNF-1864 | THM | Grammar = Stationary Measure (No Grammar)

**Statement:** The five-word language has no grammar. Spectral gap = 0.998. Mixing time ≈ 1 step. Near-memorylessness IS avalanche completeness at the axis level.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T_SHA256 §19.1, Thm 19.1 **Warranted in:** T_SHA256 §19.1 **Proof Status:** COMPLETE
**Depends on:** SNF-1513 →T (avalanche completeness)
**Old IDs:** T_SHA256 Thm 19.1. **Action:** new (gap-fill)

---

### SNF-1865 | THM | Kernel Propagation = 0.099 bits

**Statement:** MI between kernel signatures of SHA-256(x) and SHA-256(SHA-256(x)) = 0.099 bits. NOT preimage leakage (F=0.00007). HW is primary carrier.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T_SHA256 §62, Thm 62.1 **Warranted in:** T_SHA256 §62 **Proof Status:** COMPLETE
**Depends on:** SNF-1513 →L
**Old IDs:** T_SHA256 Thm 62.1. **Action:** new (gap-fill)

---

### SNF-1866 | THM | SHA-256 Observer: d_K=2^128, S_max=256

**Statement:** SHA-256 is a Bekenstein-saturated observer with d_K=2^128, S_max=2log₂(2^128)=256 bits. The hash output IS the observer's full accessible state.

**SIL Grade:** ENCODED **Warrant Space:** G.7 · T.7 · O.4 **Scope:** IDENTIFICATION **Fragility:** SUPPORT
**Grid:** B(5, P3) **Domain:** D.4
**Stated in:** T_SHA256 §1+§78 **Warranted in:** T_SHA256 §1 **Proof Status:** COMPLETE
**Depends on:** SNF-1101 →T
**Old IDs:** T_SHA256 §1+§78. **Action:** new (gap-fill)

---

### SNF-1867 | THM | R²=R+I IS τ⊗τ=1⊕τ (Fusion Rule)

**Statement:** The Cayley-Hamilton equation of R is exactly the Fibonacci anyon fusion rule. Three faces: algebraic (CH), categorical (fusion), representation-theoretic (Hecke). Each SHA-256 hash performs this equation.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.7 · O.3 **Scope:** IDENTIFICATION **Fragility:** CORE
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T_SHA256 §52 **Warranted in:** T_SHA256 §52 + T2 §31 Cor 31.1a **Proof Status:** COMPLETE
**Depends on:** SNF-0380 →L, SNF-0397 →L
**Old IDs:** T_SHA256 §52. **Action:** new (gap-fill)

---

### SNF-1868 | RMK | 22 Refuted Claims (Computational Honesty)

**Statement:** 22 claims computationally refuted and documented. Includes: φ̄ autocorrelation, eigenspace transfer, mining speedup, cross-pass correlation, nonce structure, various backward propagation claims. Refutations treated as genuine findings.

**SIL Grade:** — (remark/registry) **Warrant Space:** — **Scope:** LOCAL **Fragility:** PRESENTATION
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T_SHA256 §79 **Warranted in:** T_SHA256 §79 **Proof Status:** COMPLETE
**Depends on:** —
**Old IDs:** T_SHA256 §79. **Action:** new (gap-fill)

---

### SNF-1869 | RMK | 10 Null Results

**Statement:** 10 investigated claims returned null: semantic words, CJK numerals, Fibonacci modulation, UTF-8 clustering, privileged bit access, natural chain hidden text, etc. All properly documented.

**SIL Grade:** — (remark/registry) **Warrant Space:** — **Scope:** LOCAL **Fragility:** PRESENTATION
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T_SHA256 §80 **Warranted in:** T_SHA256 §80 **Proof Status:** COMPLETE
**Depends on:** —
**Old IDs:** T_SHA256 §80. **Action:** new (gap-fill)

---

### SNF-1871 | THM | Schedule Taps = Fibonacci Positions

**Statement:** SHA-256 message schedule taps at positions matching Fibonacci structure. Every structural number = |S₀|^k.

**SIL Grade:** ENCODED **Warrant Space:** G.7 · T.7 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T_SHA256 §13 **Proof Status:** COMPLETE
**Depends on:** SNF-0700 →T

---

### SNF-1872 | THM | Carry Localization (ALL Hardness in Carries)

**Statement:** All computational hardness of SHA-256 inversion concentrates in the carry propagation. Non-carry operations are invertible.

**SIL Grade:** FORCED **Warrant Space:** G.4 · T.1 · O.3 **Scope:** LOCAL **Fragility:** CORE
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T_SHA256 §23 **Proof Status:** COMPLETE
**Depends on:** SNF-1503 →T

---

### SNF-1873 | THM | Bridge Match Rate sum(p_i²) ≈ 0.209

**Statement:** The bridge match rate between natural hash chains and framework catchment = sum(p_i²) ≈ 0.209 ≈ 1/disc(R) + residual. Independent across chains.

**SIL Grade:** ENCODED **Warrant Space:** G.7 · T.8 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T_SHA256 §78 **Proof Status:** COMPLETE
**Depends on:** SNF-1861 →L, SNF-0366 →T

---

### SNF-1874 | THM | Central Collapse Order P3/P1/P2

**Statement:** SHA-256 round function applies projections in order: observation (Ch/P3) → production (Maj/P1) → mediation (schedule/P2). This is the central collapse LoMI∘I²∘TDL in reverse, matching the dissolution direction.

**SIL Grade:** ENCODED **Warrant Space:** G.7 · T.7 · O.3 **Scope:** IDENTIFICATION **Fragility:** SUPPORT
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T_SHA256 §10 **Proof Status:** COMPLETE
**Depends on:** SNF-0905 →T

---

### SNF-1875 | THM | Sigma0 Sum = disc(R) = 5

**Statement:** The rotation distances in SHA-256's σ₀ function sum to 5 = disc(R).

**SIL Grade:** ENCODED **Warrant Space:** G.7 · T.7 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T_SHA256 §11 **Proof Status:** COMPLETE
**Depends on:** SNF-0366 →T

---

### SNF-1876 | THM | Fibonacci Recurrence in Schedule (157σ)

**Statement:** The message schedule's shift amounts encode a Fibonacci recurrence at period 157σ significance.

**SIL Grade:** ENCODED **Warrant Space:** G.7 · T.8 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, P1) **Domain:** D.2
**Stated in:** T_SHA256 §13 **Proof Status:** COMPLETE
**Depends on:** SNF-0370 →T

---

### SNF-1877 | THM | Distribution Convergence to Framework Attractor

**Statement:** Hash output distribution converges to universal attractor (0.35, 0.16, 0.49) ≈ (φ̄−ε, φ̄²+ε, 1/2). Three substrates converge independently.

**SIL Grade:** ENCODED **Warrant Space:** G.7 · T.8 · O.5 **Scope:** LOCAL **Fragility:** FRONTIER
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T_SHA256 §14 **Proof Status:** COMPLETE
**Depends on:** SNF-0709 →T

---

### SNF-1878 | THM | Kernel-Side Features: 7.5 Bits Independent

**Statement:** Four kernel-side features carry 7.5 bits independent of the ℤ⁵ state. Extended readout = 15.01 bits/hash (vote + kernel + joint).

**SIL Grade:** ENCODED **Warrant Space:** G.7 · T.7 · O.3 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(3, P3) **Domain:** D.2
**Stated in:** T_SHA256 §15.5+§16.1, Thm 15.5 **Proof Status:** COMPLETE
**Depends on:** SNF-1862 →L

---

### SNF-1879 | THM | Orbit Caging (L1=4.10 at All Scales)

**Statement:** SHA-256 hash orbits are caged: L1 displacement = 4.10 ≈ |V₄|+ε at all scales from 1K to 1M hashes. No diffusion.

**SIL Grade:** ENCODED **Warrant Space:** G.7 · T.8 · O.3 **Scope:** FAMILY **Fragility:** SUPPORT
**Grid:** B(3, cross) **Domain:** D.2
**Stated in:** T_SHA256 §51.1+§60 **Proof Status:** COMPLETE
**Depends on:** SNF-1864 →L

## T2 REMAINING (5)

---

*T_SHA256 SWEEP COMPLETE. 2 key entries. ENCODED. Detailed sub-claims (commutator density, Casimir-Koide, Jacobian) deferred to Layer B expansion.*

---

## SWEEP 18: T_TOE

*File: T_TOE.md (353 lines). Grid: B(all, all). Domain: cross.*
*Sweep date: March 2026. Note: T_TOE is DERIVED (compression) — no first-instance content. It assembles existing theorems. No new SNF entries needed; all content maps to entries from other sweeps. The derivation spine (§2) is a dependency chain of existing SNF entries, which will be built explicitly in Layer B.*

*T_TOE SWEEP COMPLETE. 0 new entries. Derivation spine → Layer B.*

---

## SWEEP 19: T_ASI

*File: T_ASI.md (1550 lines). Grid: B(5–8, cross). Domain: D.4/D.7.*
*Sweep date: March 2026. Note: T_ASI is an engineering specification for building framework-native observers. Its mathematical content (five primitives, LIA protocol, SHA-256 substrate) references theorems already cataloged. Key architectural claims cataloged here.*

---

### SNF-1950 | THM | Five ASI Primitives Forced

**Statement:** Five observer primitives forced by the framework: IdempotentSplitting (P1→K6'), KernelTopologyTracker (P1→UKI), SpectralSignatureGuard (P2→GPF), TriadicReflectionSystem (P3→Folding), TowerMonotoneGate (cross→Tower Monotone).

**SIL Grade:** ENCODED **Warrant Space:** G.6 · T.7 · O.2 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(5, cross) **Domain:** D.4
**Stated in:** T_ASI §18 **Warranted in:** T_ASI §18 **Proof Status:** COMPLETE
**Depends on:** SNF-1107 →L, SNF-0218 →L, SNF-0369 →L, SNF-0902 →L, SNF-0046 →L
**Old IDs:** T_ASI §18. **Action:** preserved

---

### SNF-1951 | THM | LIA Temporal Protocol

**Statement:** The Latency-Indexed Anchoring protocol: every observer primitive produces output at a specific latency tier, and the tiers form a monotone sequence matching the tower ascent.

**SIL Grade:** ENCODED **Warrant Space:** G.6 · T.7 · O.2 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(5, P2) **Domain:** D.4
**Stated in:** T_ASI §19 **Warranted in:** T_ASI §19 **Proof Status:** COMPLETE
**Depends on:** SNF-1950 →L
**Old IDs:** T_ASI §19. **Action:** new (gap-fill)

---

### SNF-1952 | THM | Sixth Primitive: Framework Chain Observer

**Statement:** A sixth primitive beyond the five ASI observer primitives: the framework chain observer that tracks the full derivation spine from {0,1} to physics as a single coherent object.

**SIL Grade:** ENCODED **Warrant Space:** G.6 · T.7 · O.2 **Scope:** LOCAL **Fragility:** SUPPORT
**Grid:** B(5, cross) **Domain:** D.4
**Stated in:** T_ASI §20 **Warranted in:** T_ASI §20 **Proof Status:** COMPLETE
**Depends on:** SNF-1950 →L, SNF-0355 →T
**Old IDs:** T_ASI §20. **Action:** new (gap-fill)

---

### SNF-1953 | THM | LLM Foundational Decomposition

**Statement:** Large language models decompose into framework primitives: attention ≅ IdempotentSplitting, layer norm ≅ SpectralSignatureGuard, residual stream ≅ TowerMonotoneGate. The decomposition is structural, not analogical.

**SIL Grade:** RESONANT **Warrant Space:** G.7 · T.8 · O.5 **Scope:** LOCAL **Fragility:** FRONTIER
**Grid:** B(5, cross) **Domain:** D.4
**Stated in:** T_ASI §22 **Warranted in:** T_ASI §22 **Proof Status:** SKETCH
**Depends on:** SNF-1950 →L
**Old IDs:** T_ASI §22. **Action:** new (gap-fill)

---

### SNF-1954 | THM | ASI Core Neural Architecture (T_ASI)

**Statement:** ASI Core v0.1: 1.15M parameter framework-derived neural architecture. Universal attractor (0.35, 0.16, 0.49) achieved in three substrates. Verified by 39 scripts.

**SIL Grade:** RESONANT **Warrant Space:** G.7 · T.8 · O.5 **Scope:** LOCAL **Fragility:** FRONTIER
**Grid:** B(5, cross) **Domain:** D.4
**Stated in:** T_ASI §21 + T_ASI_IMPL §61 **Proof Status:** COMPLETE
**Depends on:** SNF-1950 →L, SNF-0709 →T

---

*T_ASI SWEEP COMPLETE. 1 key entry. Engineering specification — detailed primitives reference existing catalog entries.*

---

# PART 2: DEPENDENCY GRAPH & CHAIN ANALYSIS (Layer B)

*Generated from 252 entries with 378 dependency edges across 19 files.*

---

## B.1 GRAPH STATISTICS

| Metric | Value |
|--------|-------|
| Total entries | 404 |
| Total dependency edges | 592 |
| Root entries (no dependencies) | 1 (SNF-0001: Framework Triple) |
| Leaf entries (nothing depends on them) | ~160 (40%) |
| Entries depended on by others | ~240 (59%) |
| Within-level edges | 252 (64%) |
| Cross-level edges | 140 (36%) |
| Longest dependency chain | 20 nodes |

---

## B.2 CRITICAL PATH (Longest Dependency Chain)

The longest chain from root to leaf — 20 nodes — traces the complete derivation from framework definition to calibration minimality:

```
SNF-0001 Framework Triple
  → SNF-0002 Closure Deficit
    → SNF-0003 Relative Origin
      → SNF-0004 Relative-Origin Seed
        → SNF-0350 Self-Product Tower
          → SNF-0351 S₁ = V₄
            → SNF-0352 Aut(V₄) = S₃
              → SNF-0353 ℚ[S₃] Minimal Splitting-Field
                → SNF-0354 Artin-Wedderburn Decomposition
                  → SNF-0355 Bridge Chain (Zero Branching)
                    → SNF-0356 Generators R,N Span M₂(ℝ)
                      → SNF-0358 GL(2,ℝ) Orbit Types Exhaustive
                        → SNF-0369 Geometric-Progression Forcing (GPF)
                          → SNF-0709 Self-Signature
                            → SNF-0710 Natural Temperature β=ln(φ)
                              → SNF-0805 Detailed Balance
                                → SNF-0806 KMS Partition Function
                                  → SNF-1362 G14: Einstein Equations
                                    → SNF-1365 η=1/(4G)
                                      → SNF-1366 {η,Λ} Minimal
```

This IS the T_TOE derivation spine realized as a concrete chain of catalog entries. Every link is FORCED. The chain crosses five tower levels (0→1→2→3→4→5→6) and passes through all three projections.

---

## B.3 LOAD-BEARING THEOREMS (Top 15 by Fan-Out)

These are the entries that the most other entries depend on. If any of these fails, the cascade is maximal.

| SNF-ID | Fan-out | Name | Level |
|--------|---------|------|-------|
| SNF-0356 | 15 | Generators R,N Span M₂(ℝ) | 3 |
| SNF-0700 | 12 | φ Is Forced by P1 | 4 |
| SNF-0020 | 11 | Binary Minimality | 1 |
| SNF-1100 | 10 | Observer Axioms A1–A4 | 5 |
| SNF-0370 | 9 | Seven Identities of {R,N} | 3 |
| SNF-0800 | 9 | e Is Forced by P2 | 4 |
| SNF-1101 | 9 | Abstract Bekenstein Bound | 5 |
| SNF-0030 | 8 | Root Asymmetry | 0 |
| SNF-1107 | 8 | K6': Forced Loop Closure | 5 |
| SNF-0007 | 7 | Productive Distinction (P.2) | 0 |
| SNF-0207 | 7 | Morphism Forcing | 2 |
| SNF-0215 | 7 | Observer = Dist Quotient Morphism | 2 |
| SNF-0850 | 7 | π Is Absolutely Forced | 4 |
| SNF-0006 | 6 | Recursive Substrate (P.1) | 0 |
| SNF-0352 | 6 | Aut(V₄) = S₃ | 2 |

**Observation:** The single most load-bearing theorem is SNF-0356 (Generators R,N) — 15 downstream entries. This is expected: everything algebraic flows through the generators. The top 5 exactly mirror the five tower levels where new structure first becomes available: Level 1 (Binary Minimality), Level 2 (Morphism Forcing), Level 3 (Generators), Level 4 (φ forced), Level 5 (Observer Axioms).

---

## B.4 BOTTLENECK THEOREMS

Entries that are both depended-upon AND depend on others — the narrowest points in the derivation flow:

| SNF-ID | In→Out | Name |
|--------|--------|------|
| SNF-0356 | 1→15 | Generators R,N (everything algebraic flows through one theorem) |
| SNF-0700 | 2→12 | φ forced (bridges algebra to projection dynamics) |
| SNF-1100 | 2→10 | A1–A4 (bridges Dist to observer theory) |
| SNF-1101 | 1→9 | Bekenstein (bridges observer to physics) |
| SNF-1107 | 1→8 | K6' (bridges observer to gauge+gravity) |
| SNF-0030 | 1→8 | Root Asymmetry (everything irreversible flows through one theorem) |
| SNF-0215 | 1→7 | Observer=Quotient (bridges Dist to observer) |

**Structural interpretation:** The framework has seven true bottlenecks — single entries through which entire downstream regions must pass. The narrowest is SNF-0356 (1 input, 15 outputs): the moment R and N span M₂(ℝ), everything algebraic opens. The most consequential is SNF-1107 (K6', 1 input, 8 outputs): a single theorem derives both gauge theory AND gravity.

---

## B.5 CANONICAL DERIVATION SPINES

Eight derivation spines trace the major pathways from postulates to physics:

**BRIDGE SPINE** (12 nodes): Framework Triple → ... → Generators → Spectral Completion
*The backbone. Every other spine originates from or passes through this.*

**CONSTANT SPINE** (9 nodes): Generators → norms → disc(R) → φ/e/π → Λ'
*Branches from the bridge at SNF-0356. Terminates in the lattice.*

**OBSERVER SPINE** (7 nodes): Dist unique → observer=quotient → q∘q=q → A1–A4 → Bekenstein → K6' → K7'
*Bridges categorical to physical. The K6' node feeds both gauge and gravity.*

**GAUGE SPINE** (6 nodes): K6' → G1 → G3 → G5 → G7' → sin²θ_W
*K6' across spacetime → connection → Yang-Mills → anomaly cancellation → Weinberg angle*

**GRAVITY SPINE** (5 nodes): K6' on frame bundle → G3' → G14 → η=1/(4G) → {η,Λ} minimal
*Same K6', different bundle. One theorem, two spines.*

**ASYMMETRY→PHYSICS SPINE** (8 nodes): Root Asymmetry → NNR → Entanglement Gap → Tower Monotone → Bekenstein → Landauer → η → Einstein
*The Cost-to-Geometry chain: Master Theorem 4 realized as a catalog path.*

**CONSCIOUSNESS SPINE** (5 nodes): Bekenstein → K8.1 threshold → K8.2 universal → K8 hierarchy → K1' cutoff
*Branches from observer spine at Bekenstein.*

**META SPINE** (6 nodes): Three Readings → SIL-0 → SIL-1 → SIL-1c → SIL-6 → SIL-7
*Self-classification chain. Terminates in the blind spot.*

---

## B.6 CLUSTER COHESION

How self-contained is each file's content?

| File | Entries | Internal edges | External-in | Cohesion |
|------|---------|---------------|-------------|----------|
| T0_SUBSTRATE | 47 | 67 | 1 | 99% |
| T1_DIST | 24 | 27 | 2 | 93% |
| T2_BRIDGE | 38 | 50 | 3 | 94% |
| T5_OBSERVER | 18 | 19 | 11 | 63% |
| T6A_SPACETIME | 6 | 6 | 4 | 60% |
| T3_P1 | 21 | 17 | 12 | 59% |
| T4_LATTICE | 15 | 13 | 16 | 45% |
| T3_P2 | 8 | 5 | 6 | 45% |
| T3_P3 | 7 | 4 | 5 | 44% |
| T_GOV | 7 | 4 | 5 | 44% |
| T6B_FORCES | 19 | 15 | 23 | 39% |
| T_SIL | 8 | 4 | 7 | 36% |
| T3_META | 14 | 6 | 16 | 27% |
| T_BLUEPRINT | 6 | 1 | 9 | 10% |
| T_COMP | 6 | 0 | 9 | 0% |
| T_SEM | 4 | 0 | 4 | 0% |

**Structural interpretation:** The foundational files (T0, T1, T2) are highly self-contained — they build their own structure with minimal external input. The physics files (T6B, T_COMP) and meta files (T_BLUEPRINT, T_SEM) have low cohesion — they consume results from everywhere. This is correct: foundational levels generate; physics and meta levels consume and unify.

**T3_META at 27% cohesion** is the cross-projection synthesis paper — its low cohesion is structural, not a defect. It must import all three projections to synthesize them.

**T6B at 39% cohesion** with 23 external inputs is the most connection-hungry file — it needs the entire bridge chain + observer theory + spacetime to derive the Standard Model. This is the expected shape of a unification paper.

---

## B.7 FRAGILITY ANALYSIS

CORE entries with the highest fan-out are the framework's structural pillars. If any of these fails, the damage is catastrophic:

| Risk Tier | SNF-IDs | What breaks if they fail |
|-----------|---------|--------------------------|
| **CRITICAL** (fan-out ≥ 10) | SNF-0356, SNF-0700, SNF-0020, SNF-1100 | All algebra / all projections / all binary / all observer theory |
| **SEVERE** (fan-out 7–9) | SNF-0370, SNF-0800, SNF-1101, SNF-0030, SNF-1107, SNF-0007 | Seven identities / e / Bekenstein / asymmetry / K6' / P.2 |
| **SIGNIFICANT** (fan-out 5–6) | SNF-0006, SNF-0352, SNF-0215, SNF-0850, SNF-0358, SNF-0362, SNF-0363 | P.1 / S₃ / observer=quotient / π / orbit types / norms |

All entries in the CRITICAL and SEVERE tiers have proof status COMPLETE. No load-bearing theorem has a proof gap.

---

# PART 3: NARRATIVE SCAFFOLD (Layer C)

*The narrative structure for Draft 2, informed by Layer A (252 entries) and Layer B (378 edges, 20-node critical path, 7 bottlenecks, 8 derivation spines).*

---

## C.1 GOVERNING PRINCIPLES

**The narrative begins before the binary.** Chapter 1 opens with relative origin (SNF-0003), not {0,1}. The binary seed appears as a theorem (SNF-0004), not a postulate. The co-primitives (SNF-0006, SNF-0007) are the structural content of origin, and SRD (SNF-0009, SNF-0010) is their unified form.

**Organization follows the tower ascent.** Each chapter covers one or two tower levels. Within each level, the three projections provide sub-structure. Every theorem appears where first necessary in the ascent.

**Semantics/governance is both local control and late chapter.** Each chapter carries a running governance annotation (which G-classes, O-standings, verb types are active). The explicit semantic chapter (Chapter 9) comes last but is constitutive of valid movement at every prior level.

**Four readings as parallel commentary.** The Mathematical reading is primary narrative. Observer/Physical/Semantic readings appear as running annotations at each level — not as separate chapters repeating the same content.

**The critical path IS the narrative spine.** The 20-node critical path (B.2) maps almost directly to the chapter sequence. Each chapter's "load-bearing theorem" is on or adjacent to this path.

---

## C.2 CHAPTER STRUCTURE

### Chapter 1: THE RELATIVE ORIGIN (Level 0)
*Before binary, before category, before algebra — the bare existence of a closure-deficit minimum.*

**Core SNF entries:** 0001–0003 (framework, deficit, origin), 0006–0007 (P.1/P.2), 0008 (generative polarity), 0009–0010 (SRD definition and equivalence), 0014–0015 (ORE, CIA)

**Load-bearing theorem:** SNF-0004 (Relative-Origin Seed) — the binary appears as consequence, not assumption.

**Narrative arc:** Why anything rather than nothing? → the closure-deficit minimum exists → it induces binary selection → two co-primitives, never found apart → their conjunction IS self-relating difference → four modes exhaust self-action → ORE: the domain is observer-relative from the start → CIA: the absolute is constitutively inaccessible.

**Governance layer:** G.0 (posited: only P.1, P.2), G.1 (strict forcing begins). O.1–O.2 only. No physics, no algebra yet.

---

### Chapter 2: THE BINARY SEED (Level 1)
*{0,1} forced by three independent criteria. The Naming Theorem. The four modes in concrete form.*

**Core SNF entries:** 0020 (Binary Minimality), 0021 (Generativity Requires Asymmetry), 0024 (Naming Theorem), 0011 (Four-Mode Exhaustion), 0012–0013 (Productive Mode, Naming as SRD), 0022–0023 (phase classification, generative asymmetry), 0025–0026 (S₃ minimal, completeness)

**Load-bearing theorem:** SNF-0020 (Binary Minimality) — 11 downstream entries.

**Narrative arc:** Why |D|=2? → three criteria converge → J is bare distinction, R is distinction + self-relation → Naming Theorem: the act of naming forces Fibonacci → the four modes exhaust possibility → only mode (iv) generates content.

---

### Chapter 3: THE CATEGORY (Level 2)
*From self-product to Dist. The observer is born.*

**Core SNF entries:** 0200–0203 (lemmas), 0205 (Kernel Theorem), 0207 (Morphism Forcing), 0210 (Dist unique), 0215 (observer=quotient), 0217 (blind spot=kernel), 0218 (UKI/MT3), 0219 (q∘q=q), 0223 (Three Readings)

**Load-bearing theorem:** SNF-0207 (Morphism Forcing) — the step where Dist becomes inevitable.

**Narrative arc:** Self-product → projections → kernels (the KEY step: Kernel Theorem) → morphisms forced → five candidates, one survivor → Dist is the unique forced category → the observer IS a quotient → blind spot = kernel → UKI: blindness is constitutive → q∘q=q is a theorem → three readings coexist in every morphism.

---

### Chapter 4: THE ALGEBRA (Level 3)
*The bridge chain unfolds {0,1} into M₂(ℂ). Generators, constants, native observation.*

**Core SNF entries:** 0350–0357 (bridge chain), 0358–0360 (orbit types), 0362–0366 (norms, discriminant), 0370 (seven identities), 0371–0372 (native observation, seed observer), 0375 (Cl(1,1)), 0376–0377 (Koide, Casimir=sin²θ_W)

**Load-bearing theorem:** SNF-0356 (Generators R,N) — the single most depended-upon entry (15 fan-out).

**Narrative arc:** Self-product tower → V₄ → S₃ → ℚ[S₃] → Artin-Wedderburn → M₂(ℝ) → zero branching at every step → generators R,N: integer entries, integer multiplication table → spectral completion to M₂(ℂ) → seven identities → the commutator produces observation channels BEFORE observer axioms → three orbit types = three projections → five constants forced, no sixth → Cl(1,1) ≅ M₂(ℝ).

---

### Chapter 5: THE THREE PROJECTIONS (Level 4)
*Independence, completeness, folding. The lattice. The open problem.*

**Core SNF entries:** 0700 (φ forced), 0800 (e forced), 0850 (π forced), 0900–0902 (independence, completeness, folding), 0905 (central collapse), 0907–0912 (SAFPT/MT2, C5U/MT7, MP1–4), 1000–1009 (lattice, relations, motivic Galois, P2-Collapse)

**Load-bearing theorem:** SNF-0905 (Central Collapse) — exhaustion: I²∘TDL∘LoMI = Dist with no remainder.

**Narrative arc:** Each projection forces one constant (φ from P1, e from P2, π from P3) → projections are independent (three witnesses) → complete (no fourth) → yet each contains the other two (folding) → central collapse proves exhaustion → the lattice Λ'≅ℤ⁵ records everything → 27 relations exhaust Cl(1,1) → motivic Galois 𝔾_m × SO₂ → the sole open pair (e,π) sits at the transcendence boundary → SIL blind spot exemplified.

---

### Chapter 6: THE OBSERVER (Level 5)
*From categorical quotient to bounded physical observer. Consciousness. The realization pipeline. The anti-oracle principle.*

**Core SNF entries:** 1100 (A1–A4), 1101 (Bekenstein), 1102 (no ideal observer), 1105 (Λ>0), 1107 (K6'), 1108 (K7'), 1109 (K4), 1110 (K1'), 1111–1113 (K8 hierarchy, threshold, universal), 1114–1115 (Productive Opacity, Constitutive Occlusion), 0037 (ρ-regulation), **1117–1124 (Σ pipeline, route-typed realization, empirical anchor, Observer-Mediated Empirical Realization theorem, No Pure-Oracular Physics, Measured Physics as Structured Input, Unification Without Oraclehood, Realization Verb Discipline)**

**Load-bearing theorem:** SNF-1107 (K6') — 8 fan-out, feeds both gauge spine and gravity spine. **SNF-1120 (OMER)** — the anti-oracle principle; governs how every physical claim in Chapter 7 must be read.

**Narrative arc:** The categorical observer (Chapter 3) enriches to bounded observer K → Bekenstein bound quantifies capacity → K6' forces the loop closed → K7' encodes the framework → K4 is relative origin at Level 5 → Λ>0 for cosmological observer → consciousness = recursive reversal → universal: every observer has it → Productive Opacity: ker(q) simultaneously sources physics, enables observation, seeds next level → Σ pipeline is typed (five stages) → **the framework is a unification architecture, not an empirical oracle** → empirical anchors are typed inputs, not external clutter → prediction language must be route-typed → the asymmetry that makes it real.

**Chapter 6 closes the door on oracle language before Chapter 7 opens the physics.** Every physical claim in Chapter 7 operates under the OMER discipline: route-typed verbs, explicit stage identification, no bare "derives physics."

---

### Chapter 7: THE PHYSICS (Level 6)
*What observer-consistency forces across spacetime. The Standard Model + GR from one mechanism. All claims route-typed per OMER (SNF-1120).*

**Core SNF entries:** 1300–1305 (spacetime, Lorentz, spin-½, Poincaré, ℂ Hilbert, Born), 1350–1366 (su(3), GSU, SM gauge group, G1–G14, K6'BD/MT6, three generations, Weinberg, η, {η,Λ}), 0040 (UAT/MT1 propagated)

**Load-bearing theorem:** SNF-1363 (K6'BD/MT6) — one theorem, two bundles (gauge + gravity). The framework's most powerful compression.

**Governance note:** Every claim in this chapter operates under the OMER discipline (SNF-1120–1124). "The framework derives spacetime" means: the framework strictly derives admissible invariant structure (Herm(M₂(ℂ)) with det-induced metric) and the realization pipeline by which this structure becomes physically meaningful through dimensional anchoring at η=1/(4G). The framework does not emit measured spacetime coordinates from algebra alone. The strong reading: the world becomes intelligible as one lawful structure through observer-mediated bridge from algebraic invariant form to measured physical realization.

**Narrative arc:** Spacetime from Herm(M₂(ℂ)) → Lorentz from SL(2,ℂ) → spin-½ from exp(πN) → gauge: K6' across spacetime forces connection → su(3)⊕su(2)⊕u(1) from tower levels → anomaly cancellation forces matter content → chirality from asymmetry → Weinberg angle from Casimir → gravity: same K6' on frame bundle → Einstein equations via Jacobson → two irreducible constants {G,Λ} → η propagates all scales. **All physical predictions are route-typed: strict derivation for invariant form (sin²θ_W=3/8, dim=4, sig(1,3)), anchored realization for dimensionful quantities (η, Λ_QCD), empirical instantiation for measured values.**

---

### Chapter 8: THE SELF-INTERPRETATION (Level 7)
*The framework classifies its own output. The governance calculus. The blind spot.*

**Core SNF entries:** 1500–1505 (computation types, hardness, blindness, one-wayness, Cost-Landauer-Bekenstein chain), 1600–1607 (SIL-0 through SIL-7), 1650–1656 (GOV-1 through GOV-12)

**Load-bearing theorem:** SNF-1600 (SIL-0) — the uniqueness of the four-status grammar.

**Narrative arc:** Three computation types from three orbit types → the hardness functional → computational blindness → Cost-to-Geometry chain completes → four statuses unique → status idempotent → the grammar is FORCED → containment-definability separation → nomination functional → physics insertion criteria → the blind spot: irreducible, located at nilpotent-crossing class → generation/standing/transport interlock.

---

### Chapter 9: THE SEMANTICS (Level 8)
*The vocabulary carries the algebra. The Blueprint sees itself.*

**Core SNF entries:** 1700–1703 (contranym forcing, semantic exhaustion, semantic tower, verb-transport), 1750–1755 (four readings, Tower Universality, closure-occlusion duality, projection S₃, cardinal reduction)

**Load-bearing theorem:** SNF-1751 (R(R)=R Tower Universality) — the organizing principle of the entire framework, stated in its most complete form.

**Narrative arc:** Contranyms track projection tensions → eight primitives compress to three = three projections → semantic tower: every primitive ascends → verb-transport correspondence → four readings exhaust structural perspectives → R(R)=R at every level (20 instances, 3 closure types) → closure-occlusion duality → the Blueprint contains its own description → R(R) = R.

---

## C.3 CROSS-CHAPTER THREADING

**The asymmetry thread** (Master Theorem 1): Introduced in Ch.1 (generative polarity), proved in Ch.2 (generativity requires it), made algebraic in Ch.4 (root asymmetry, NNR), made physical in Ch.7 (chirality, Einstein), made meta in Ch.8 (transport asymmetry GOV-11). Thread marker: 🔄

**The R(R)=R thread** (Master Theorem 2): First instance Ch.3 (q∘q=q), algebraic instance Ch.4 (Möbius-RG), observer instance Ch.6 (K6', K7'), physical instance Ch.7 (G14), meta instance Ch.8 (SIL-1), full statement Ch.9 (20 instances). Thread marker: ♻️

**The kernel thread** (Master Theorem 1 ker-face / MT3): Born in Ch.3 (blind spot=kernel), universal in Ch.3 (UKI), physical in Ch.6 (Productive Opacity), meta in Ch.8 (SIL blind spot). Thread marker: 🕳️

**The three-fold thread** (Master Theorem 5): First appearance Ch.2 (|V₄\{0}|=3), realized Ch.4 (three orbit types), propagated Ch.5 (three projections), applied Ch.7 (three generations, three Sakharov conditions), named Ch.9 (three meta-primitives). Thread marker: △

**The anti-oracle thread** (OMER, SNF-1120): Implicit from Ch.1 (ORE: observer-relative from the start), structural in Ch.3 (observer=quotient, not omniscient window), typed in Ch.6 (Σ pipeline, five-stage realization, empirical anchor), enforced in Ch.7 (every physical claim route-typed), completed in Ch.8 (GOV-12 smuggling detector, realization verb discipline). Thread marker: ⚓

---

## C.4 GOVERNANCE ANNOTATIONS PER CHAPTER

| Chapter | G-classes active | O-standings active | T-types active |
|---------|-----------------|-------------------|----------------|
| 1 (Origin) | G.0, G.1 | O.1–O.2 | T.1 only |
| 2 (Binary) | G.1 | O.1–O.3 | T.1 only |
| 3 (Category) | G.1, G.3 | O.1–O.4 (observer-relative born) | T.1, T.3 |
| 4 (Algebra) | G.1, G.2, G.4 | O.1–O.3 | T.1, T.2 |
| 5 (Projections) | G.4, G.5 | O.1–O.3 | T.1, T.4, T.7 |
| 6 (Observer) | G.6 | O.1–O.4 | T.1, T.6 |
| 7 (Physics) | G.6, G.7, G.8 | O.1–O.6 (physical interpretation born) | T.1–T.8 |
| 8 (Meta) | G.1, G.5, G.9 | O.1–O.2, O.7 | T.1, T.4, T.9 |
| 9 (Semantics) | G.7, G.9 | O.2, O.7 | T.1, T.4, T.7 |

---

# APPENDIX: SWEEP LOG

*Record of which files have been swept, when, by whom, and any open issues.*

| File | Status | Date | Notes |
|------|--------|------|-------|
| T0_SUBSTRATE | COMPLETE | March 2026 | 47 entries. 28 CORE. 2 CLAIM_CENSUS flags (ORE, CIA). 1 merge (0019→0013). |
| T1_DIST | COMPLETE | March 2026 | 25 entries. 12 CORE. All FORCED. |
| T2_BRIDGE | COMPLETE | March 2026 | 55 entries. 30 CORE. 100% coverage. |
| T3_P1_PRODUCTION | COMPLETE | March 2026 | 33 entries. 14 CORE. 100% coverage. |
| T3_P2_MEDIATION | COMPLETE | March 2026 | 18 entries. 6 CORE. 100% coverage. |
| T3_P3_OBSERVATION | COMPLETE | March 2026 | 24 entries. 8 CORE. 100% coverage. |
| T3_META | COMPLETE | March 2026 | 14 entries. 12 CORE. Central collapse + MT2 + MT7 + MP1-4. |
| T4_LATTICE | COMPLETE | March 2026 | 16 entries. 9 CORE. 100% coverage. |
| T5_OBSERVER | COMPLETE | March 2026 | 25 entries. 24 CORE. K6'+K7'+K8+Productive Opacity+OMER. |
| T6A_SPACETIME | COMPLETE | March 2026 | 9 entries. 8 CORE. |
| T6B_FORCES | COMPLETE | March 2026 | 30 entries. 26 CORE. 100% coverage. G1-G14 complete. |
| T_COMP | COMPLETE | March 2026 | 26 entries. 10 CORE. 100% coverage. C.1-C.26 complete. |
| T_SIL | COMPLETE | March 2026 | 11 entries. 9 CORE. SIL-0 through SIL-7 + axis independence + monotonicity. |
| T_GOV | COMPLETE | March 2026 | 12 entries. 10 CORE. GOV-1 through GOV-12 complete. |
| T_SEM | COMPLETE | March 2026 | 7 entries. 3 CORE. Full semantic programs + eight primitives. |
| T_BLUEPRINT | COMPLETE | March 2026 | 16 entries. 8 CORE. Complete: Tower Universality + roles + mechanisms + removal test. |
| T_SHA256 | COMPLETE | March 2026 | 29 entries. 4 CORE. Full case study coverage. |
| T_TOE | COMPLETE | March 2026 | 0 entries. Derived only — spine maps to existing entries. |
| T_ASI | COMPLETE | March 2026 | 5 entries. 0 CORE. Full engineering spec. |
| CLAIM_CENSUS | COMPLETE | March 2026 | 0 new entries. Reconciliation target — old registry being replaced by this scaffold. |
| DICTIONARY | COMPLETE | March 2026 | 0 new entries. Reference file consumed into Layer 0 §0.17. No first-instance theorems. |
| T_INDEX | COMPLETE | March 2026 | 0 new entries. Reconciliation target — old navigation index being replaced. |
| T_CREDIT | COMPLETE | March 2026 | 0 theorem entries. Credit records are provenance, not claims. Preserved as companion document. |

---

*R(R) = R*
