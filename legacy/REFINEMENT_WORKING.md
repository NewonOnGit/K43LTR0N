# REFINEMENT WORKING DOCUMENT

## Low-Hanging Fruit, Formatting Fixes, Easy Upgrades, and Unexplored Connections
### v1 — March 2026

**Purpose:** Systematic audit of all 23 project files for refinable issues: stale references, formatting inconsistencies, missing structural elements, easy theorem upgrades, semantic clarifications, and unexplored connections that should be trivially closable.

**Method:** Full read of all files, grep-verified cross-references, structural comparison of metadata fields, theorem index presence, section numbering.

**Integration standard:** All fixes must read as if always present. No changelogs, no "we discovered" language.

---

## CATEGORY A: STALE PAPER REFERENCES (~60+ instances)

**Problem:** The papers were merged from separate files (T0A+T0B → T0, T2A+T2B → T2, T4A+T4B+T4C → T4, T5A+T5B → T5) but downstream references still cite the old names. This is the single largest cleanup item.

**Scope:** Every instance of "Paper 0A", "Paper 0B", "Paper 2A", "Paper 2B", "Paper 4A", "Paper 4B", "Paper 4C", "Paper 5A", "Paper 5B" should become "Paper 0", "Paper 2", "Paper 4", "Paper 5" respectively, with section numbers preserved for precision.

### Affected files and instance counts:

| File | Old refs found | Examples |
|------|---------------|---------|
| **T1_DIST** | 3 | "Paper 0A" (×2), "Paper 5A" (×1) |
| **T3_P1_PRODUCTION** | 2 | "Paper 2A", "Paper 2B" |
| **T3_P2_MEDIATION** | 2 | "Paper 2A", "Paper 2B" |
| **T3_P3_OBSERVATION** | 3 | "Paper 2A", "Paper 2B", "Paper 0B" (×1) |
| **T6A_SPACETIME** | 8 | "Paper 2A" (×4), "Paper 5A" (×2), "Paper 4B" (×1), "Paper 2B" (×1) |
| **T6B_FORCES** | 15+ | "Paper 5A" (×5), "Paper 5B" (×2), "Paper 2A" (×3), "Paper 2B" (×3), "Paper 4A", "Paper 4B", "Paper 4C", "Paper 0B" |
| **T_COMP** | 12+ | "Paper 5A" (×5), "Paper 5B" (×2), "Paper 2B" (×3), "Paper 0B" (×2) |
| **T_SIL** | 0 | Clean |
| **T_SEM** | 0 | Clean |
| **T_BLUEPRINT** | 0 | Clean (uses "Paper 0 §1½" style) |
| **T_GOV** | 0 | Clean |
| **T_INDEX** | 0 | Clean |

**Replacement map:**

| Old reference | New reference |
|--------------|--------------|
| Paper 0A §X | Paper 0 §X (Part I content: §§1–8) |
| Paper 0B §X | Paper 0 §X (Part II content: §§9–18) |
| Paper 2A §X | Paper 2 §X (Part I content: §§1–16) |
| Paper 2B §X | Paper 2 §X (Part II content: §§17–28) |
| Paper 4A §X | Paper 4 §X (Part I content: §§1–9) |
| Paper 4B §X | Paper 4 §X (Part II content: §§10–12) |
| Paper 4C §X | Paper 4 §X (Part III content: §§13–15) |
| Paper 5A §X | Paper 5 §X (Part I content: §§1–19) |
| Paper 5B §X | Paper 5 §X (Part II content: §§20–26) |

**Priority:** HIGH. This is pure cleanup — zero mathematical content changes, pure reference hygiene.

**Execution plan:** One file at a time, dependency order. Start with T1 (fewest refs), then T3-P* files, then T6A, T6B, T_COMP (most refs).

---

## CATEGORY B: MISSING THEOREM INDEX TABLES

**Problem:** 12 of 18 canonical papers lack a `## THEOREM INDEX` table at the top. The 6 that have them (T1, T3-META, T6B, T_COMP, T_SIL, T_GOV) are significantly easier to navigate. The worst offenders are T2 (67 theorems/corollaries/lemmas, no index) and T5 (29 theorems, no index).

### Status by file:

| File | Has Index? | Theorem count | Priority |
|------|-----------|---------------|----------|
| T0_SUBSTRATE | NO | ~48 | HIGH (foundation document) |
| T1_DIST | YES | — | — |
| T2_BRIDGE | NO | ~67 | HIGH (most theorems of any paper) |
| T3_P1_PRODUCTION | NO | ~49 | MEDIUM |
| T3_P2_MEDIATION | NO | ~20 | MEDIUM |
| T3_P3_OBSERVATION | NO | ~25 | MEDIUM |
| T3_META | YES | — | — |
| T4_LATTICE | NO | ~15 | LOW |
| T5_OBSERVER | NO | ~29 | HIGH (complex paper) |
| T6A_SPACETIME | NO | ~8 | LOW (short paper, easy to navigate) |
| T6B_FORCES | YES | — | — |
| T_COMP | YES | — | — |
| T_SIL | YES | — | — |
| T_SEM | NO | ~5 | LOW |
| T_BLUEPRINT | NO | ~8 | MEDIUM |
| T_GOV | YES | — | — |
| T_TOE | NO | 0 (derived) | SKIP |
| T_ASI | NO | 0 (derived) | SKIP |

**Execution plan:** Build index tables for T0, T2, T5 first (highest value). Then T3-P1, T3-P2, T3-P3, T_BLUEPRINT. Skip T6A (short enough), T4 (low count), T_SEM (few theorems), T_TOE/T_ASI (no first-instance theorems).

---

## CATEGORY C: SECTION NUMBERING ERRORS

### C-1: T6B duplicate §14

**Problem:** T6B_FORCES.md has TWO sections numbered §14:
- Line 785: `## §14 GRADING SUMMARY`
- Line 825: `## §14 PHYSICS INSERTION AUDIT`

The second §14 should be §16 (since §15 VERIFICATION SUMMARY exists between them at line 796).

**Fix:** Rename the second `§14` to `§16`. Update any internal cross-references.

### C-2: T_BLUEPRINT "(+1?)" in Document Status

**Problem:** Line 10 of T_BLUEPRINT reads: "the 9(+1?)×3 grid B(n,p)". The question mark is an unresolved editorial note. The grid IS 9 levels (0 through 8) — this was settled when the semantic layer was confirmed as Level 8. The "(+1?)" should be removed.

**Fix:** Replace "9(+1?)×3" with "9×3".

---

## CATEGORY D: MISSING / INCONSISTENT METADATA

### D-1: Missing `Document Species` field

Seven files lack the `Document Species` field that 15 other files have:

| File | Has Species? | Suggested value |
|------|-------------|----------------|
| T0_SUBSTRATE | NO | CANONICAL. Foundation document. Owns co-primitives, SRD, phase architecture. |
| T2_BRIDGE | NO | CANONICAL. Owns bridge chain, {R,N} algebra, Clifford structure. |
| T3_META | NO | CANONICAL. Owns cross-projection synthesis at Level 4. |
| T4_LATTICE | NO | CANONICAL. Owns structured lattice Λ' and KMS dynamics. |
| T6B_FORCES | NO | CANONICAL. Owns gauge theory, gravity, Standard Model predictions. |
| T_BLUEPRINT | NO | CANONICAL. Owns architectural self-compression (Blueprint grid). |
| T_INDEX | NO | DERIVED (navigation). Master index. No first-instance content. |

**Fix:** Add `**Document Species:**` line after `**Author:**` in each file, before `**Grid address:**`.

### D-2: Undefined "HOT compressions" tag

Three files reference "HOT compressions" (T2: "16 proofs replaced", T4: "2 proofs replaced", T5: "9 proofs replaced") but "HOT" is never defined anywhere in the corpus. This appears to stand for "Higher-Order Theorem" compressions — proofs replaced with corollary references to the meta-theorems MP1–MP4.

**Fix:** Either:
- (a) Define HOT explicitly in the first file that uses it (T2), OR
- (b) Replace "HOT compressions" with "Meta-theorem compressions (MP1–MP4 corollary references)" everywhere, which is self-documenting.

Option (b) preferred — matches the framework's own semantic hygiene standard (C5).

### D-3: References to non-existent working documents

Five references to working documents that are not in the project:

| File | Reference | Line |
|------|-----------|------|
| T3_META | "Supersedes METAPATTERNS.md" | 12 |
| T3_META | "Absorbs cross-projection content from RRR_CLOSURE Parts VIII, X, XII" | 12 |
| T6A_SPACETIME | "Source: RRR_DERIVATION_v3 Part VII½" | 16 |
| T_COMP | "see §5.3 of REORGANIZATION_WORKING" | 10 |
| T_BLUEPRINT | "SEMANTIC_INVESTIGATION_WORKING.md" | 25 |

These are provenance breadcrumbs from the development process. They're harmless but violate the integration standard ("read as if always present").

**Fix:** Replace with forward-references to the canonical content:
- "Supersedes METAPATTERNS.md" → remove (the supersession is implicit in being the canonical paper)
- "RRR_CLOSURE Parts VIII, X, XII" → remove or replace with specific theorem references
- "RRR_DERIVATION_v3 Part VII½" → remove (all content is now native to T6A)
- "§5.3 of REORGANIZATION_WORKING" → replace with actual section reference
- "SEMANTIC_INVESTIGATION_WORKING.md" → "the semantic audit (Part I–VII below)" or similar

---

## CATEGORY E: PARTITION FUNCTION EXPONENT CLARIFICATION

**Problem:** Two different partition functions appear with different exponents:
- T3_P2_MEDIATION: Z(β) = coth(β/2)⁴ (from four L¹ norms of {I,R,N,RN} basis of M₂(ℝ))
- T4_LATTICE: Z(β) = coth(β/2)⁵ (from five independent coordinates of Λ'≅ℤ⁵)

These are genuinely different objects (one is the M₂(ℝ) partition function, the other is the lattice partition function) and the exponents correctly track their respective dimensions (4 = dim M₂(ℝ), 5 = rank Λ'). But neither paper acknowledges the other's partition function or explains the relationship.

**Fix:** Add a cross-reference remark in T4 (the later paper):

> **Remark (Two Partition Functions).** The lattice partition function Z_Λ(β) = coth(β/2)⁵ (rank Λ' = 5) is related to the algebra partition function Z_M(β) = coth(β/2)⁴ (dim M₂(ℝ) = 4, Paper 3-P2 §4.5) by Z_Λ = Z_M · coth(β/2). The extra factor comes from the exponential coordinate d (the P2 flow depth), which is algebraically independent of the four basis coordinates. The 5 = 4 + 1 decomposition echoes the |S₀|² + 1 pattern: four within-algebra coordinates plus one cross-algebra coordinate.

---

## CATEGORY F: DEAD FILES

### F-1: Void_Infinite_Chaos_Theorems.md

Empty file (0 bytes). Either populate with content or remove from the project.

**Recommendation:** Remove. If it was a placeholder for something specific, note the intent and move on.

---

## CATEGORY G: EASY THEOREM UPGRADES AND UNEXPLORED CONNECTIONS

These are mathematical observations visible in the current corpus that are either implicitly present but not formally stated, or are trivial consequences of existing theorems that would strengthen the framework's coverage.

### G-1: Cardinal Reduction completeness — the missing entries

T_BLUEPRINT §8½ has a cardinal reduction table expressing dimensionless ratios in terms of |S₀| = 2. Several obvious entries are missing:

| Quantity | Formula in |S₀| | Value | Currently stated? |
|----------|-------------------|-------|----------------------|
| |Fix(D)| | |S₀|²+1 | 5 | YES (T4 remark) |
| rank(Λ') | |S₀|²+1 | 5 | YES (T4 remark) |
| dim(sl(2,ℝ)) | |S₀|²−1 | 3 | NO — should be added |
| # SIL statuses | |S₀|² | 4 | NO — should be added |
| # self-action modes | |S₀|² | 4 | NO — should be added |
| # structural readings | |S₀|² | 4 | NO — should be added |
| # SIL axes (D,C,V) | |S₀|²−1 | 3 | NO — should be added |
| sig(Killing) positive dirs | |S₀| | 2 | NO |
| sig(Killing) negative dirs | |S₀|²−|S₀|−1 = 1 | 1 | NO |
| sig(spacetime) timelike | 1 | 1 | implicit |
| sig(spacetime) spacelike | |S₀|²−1 | 3 | implicit |
| # Koide generations | |S₀|²−1 | 3 | YES |
| # bridge chain steps to M₂(ℚ) | |S₀|² = 4 | 4 | NO |
| # 27 relations | ? | 27 | unknown if reducible to |S₀| |

The pattern: |S₀|² = 4 counts internal degrees of freedom (modes, statuses, readings, basis elements). |S₀|²−1 = 3 counts non-trivial/non-identity objects (projections, generations, spatial dimensions, Lie algebra dimension). |S₀|²+1 = 5 counts objects plus a boundary/cross element (discriminant, lattice rank, fixed locus). These three cardinal classes exhaust the dimensionless integers the framework produces.

**Fix:** Extend the §8½ table. State the three cardinal classes as a remark. This is trivially FORCED — each entry is a corollary of existing theorems.

### G-2: The 27 relations — is 27 itself derivable from |S₀|?

T4 §2 states 27 = 10 + 6 + 7 + 4 relations. The question is whether 27 has a closed-form expression in |S₀| = 2. Candidates:
- 27 = 3³ = (|S₀|²−1)³ → cube of the non-identity count
- 27 = (|S₀|²+1)! / (|S₀|!·|S₀|²!) = 5!/(2!·4!) = 120/48... no, that's 2.5

The first is clean: 27 = |V₄\{0}|³. Three non-identity elements, each contributing three types of spectral data (eigenvalue, trace, norm), cubed? This needs investigation. If 27 = 3³ is not a coincidence but forced, it would be a new entry in the cardinal reduction table.

**Status:** INVESTIGATE. Run the combinatorial argument: do the four relation types decompose as 3ⁿ for specific n?

### G-3: Six bridge chain steps and the hexagonal structure

The bridge chain has exactly 6 steps ({0,1} → V₄ → S₃ → ℚ[S₃] → M₂(ℚ) → M₂(ℝ) → M₂(ℂ)). Also: |S₃| = 6, six {R,N} identities (now seven with [R,N]²=5I), six folding containments (Thm 2.1). The number 6 = |S₃| = 3! = |S₀|²!/|S₀|! appears repeatedly. Is the bridge chain length forced to equal |Aut(V₄)| = |S₃| = 6?

**Status:** INVESTIGATE. If yes, add to cardinal reduction and state as a remark in T2.

### G-4: T_SEM and T_BLUEPRINT — missing CLAIM STATUS sections

T_SEM has ~5 theorems (Semantic Tower Theorem, Verb-Transport Correspondence, Semantic Exhaustion, and two others) but no claim status table. T_BLUEPRINT has ~8 theorems (R(R)=R Tower Universality, Recursive Closure Universality, Closure-Occlusion Duality, Trinitarian Root, Observer Transposition, Five-Mechanism Irreducibility, Dual Central Collapse, D-Fixed Propagation) but no claim status table.

**Fix:** Add claim status tables to both, matching the format of other papers. All theorems already have status assignments in T_INDEX — just need local tables.

### G-5: T_TOE and T_ASI — missing Document Species

These derived documents have the field but T_TOE could use a `Grid address` field for consistency.

### G-6: T6A missing a theorem index

T6A has only 8 theorems (6.1–6.7 plus the Invariant Geometry Principle), making it trivial to add an index table. It's the shortest canonical paper; the index would be 8 rows.

### G-7: T1_DIST — stale "Paper 7" reference

The T1 theorem index table at line 355 references "Paper 5A". This should be "Paper 5".

Additionally, the Document Status (line 14) says "co-primitives established in Paper 0A" — should be "Paper 0".

### G-8: The "Document Hierarchy" tree in T1, T3-P1, T3-P2, T3-P3

These files have a hierarchy tree showing the file structure. The tree doesn't include the newer files (T_SIL, T_GOV, T_SEM, T_BLUEPRINT, etc.). Not critical — the tree shows dependency, not completeness — but it could be extended or a note added.

**Recommendation:** Leave as-is. The trees show local dependency context, not the full file graph. T_INDEX handles the full map.

### G-9: Verification sections — format standardization

Most papers end with a verification table + claim status table + `*R(R) = R*` signature. The format is mostly consistent but some papers have the verification section before claim status (T6B: §15 then §14-duplicate), some have claim status before verification (T1: §9 Computational Verification then §11 Claim Status with §10 sandwiched between). Standardize to: ... → §(n) VERIFICATION → §(n+1) CLAIM STATUS → signature.

### G-10: T3-P2 "S₃ Cayley distance to diameter 2 (not 3)" correction

The abstract of T3-P2 mentions correcting the S₃ Cayley distance diameter to 2. This is a correction of an earlier error. The abstract's phrase "correct the S₃ Cayley distance to diameter 2 (not 3)" reads as a changelog note. Should be restated as a direct claim: "The S₃ Cayley distance has diameter 2."

### G-11: T_COMP Document Species — "LENS with CANONICAL content"

The species "LENS" is defined only here and nowhere else. The DICTIONARY doesn't have it. The governance calculus doesn't list it as a species. This should either be:
- Defined in the DICTIONARY/T_GOV as a document species, or
- Replaced with a standard species + qualifier: "CANONICAL (cross-cutting lens). Reads existing structure; canonical theorems C.1–C.12 are first-instance content."

### G-12: The "Paper 7" ghost

The old T7 consciousness paper was merged into T5. But T_INDEX still lists it as a separate paper in the 19-document structure. Some memory references mention "T7" as a file that should exist. Verify that all T7 content is now in T5 and that no dangling references to "Paper 7" or "T7" remain in canonical files.

**Scope check needed:** grep for "Paper 7", "T7", "Paper T7" across all files.

---

## CATEGORY H: SEMANTIC / PROSE IMPROVEMENTS

### H-1: Abstract quality variance

T3-P1, T3-P2, T3-P3 have extremely long abstracts (single-paragraph walls of text listing every result). T6A, T6B have well-structured multi-paragraph abstracts. T_SIL has an excellent concise abstract.

**Recommendation:** Break the P1/P2/P3 abstracts into 2–3 paragraphs with natural topic transitions. No content change — purely readability.

### H-2: "Source:" provenance line in T6A

Line 16: `Source: RRR_DERIVATION_v3 Part VII½, expanded with full proofs and physical interpretation.`

This is a development-history breadcrumb. Remove or replace with a content-forward statement.

### H-3: Consistent use of "Self-Relating Difference" vs "SRD"

Some papers use the full phrase, others use SRD, some use both without establishing the abbreviation. The DICTIONARY should canonize "SRD" as the standard abbreviation and the first use in each paper should introduce it: "Self-Relating Difference (SRD)".

---

## CATEGORY I: POTENTIAL NEW RESULTS (require investigation)

### I-1: Is 27 = 3³ forced?

**RESOLVED: NO (MYTHIC).** The decomposition 27 = 10 + 6 + 7 + 4 (arithmetic + trace + cross-source + structural) does not split cleanly as 3^k. The individual counts are: 10 = C(5,2) (pairwise from 5 generators), 6 = 3! = |S₃| (trace invariants), 7 (prime — no clean |S₀|-formula), 4 = |S₀|² (basis identities). The total 27 = 3³ is numerologically true but the mechanism is coincidental. Not worth promoting.

### I-2: Bridge chain length = |S₃|?

**RESOLVED: NO (presentation artifact).** The 6-step count is granularity-dependent. Steps 3–4 (linearize + decompose) could be one step; steps 5–6 (embed + complete) could be one step. The coarse reading gives 3 conceptual stages (produce, linearize, complete) which maps to the P1→P2→P3 cycle — this is more structurally meaningful than the 6 = |S₃| coincidence but is already captured by the fundamental rhythm (T_BLUEPRINT §3). Not a cardinal reduction entry.

### I-3: Four readings ↔ four SIL statuses — the (P2 P3) permutation

**RESOLVED: YES — genuine structural observation (ENCODED).**

The two four-cell structures are generated by the same mechanism (three binary questions with implication chain from the three projections) but with different projection orderings:

| System | Chain | Projection order |
|--------|-------|-----------------|
| SIL statuses | D→C→V | P1→P2→P3 (natural order) |
| Blueprint readings | A→O→R | P1→P3→P2 (P2 and P3 swapped) |

The permutation relating them is σ_new = (P2 P3), which swaps mediation and observation. This is the *third* transposition in S₃, distinct from the known observer transposition σ_obs = (P1 P3):

| Transposition | Where it appears | What it swaps |
|--------------|-----------------|---------------|
| (P1 P3) | Level 5→6 and 7→8 boundaries | Production ↔ Observation |
| (P2 P3) | SIL ↔ Blueprint reading correspondence | Mediation ↔ Observation |
| (P1 P2) | Not yet identified | Production ↔ Mediation |

The natural bijection between cells:

| SIL Status | Bits (D,C,V) | Blueprint Reading | Bits (A,O,R) |
|-----------|-------------|-------------------|-------------|
| FORCED | (1,1,1) | PHYSICAL | (1,1,1) |
| ENCODED | (0,1,1) | OBSERVER | (1,1,0) |
| RESONANT | (0,0,1) | MATHEMATICAL | (1,0,0) |
| MYTHIC | (0,0,0) | SEMANTIC | (0,0,0) |

Extremes match (all-flags-on ↔ all-flags-on, all-flags-off ↔ all-flags-off). Middle cells cross-map via (P2 P3).

Composition with the observer transposition: (P1 P3)∘(P2 P3) = (P1 P2 P3), a 3-cycle. The three transpositions {(P1 P3), (P2 P3), (P1 P2)} generate all of S₃, so the framework's projection permutations at tower boundaries potentially exhaust S₃.

**Target:** Candidate remark in T_BLUEPRINT §1.2 (after the four-reading derivation), cross-referenced to T_SIL §1. Status ENCODED (containment proof via projection-order comparison).

**Open question:** Where does the third transposition (P1 P2) appear? The three tower boundaries with known transpositions are: Level 5→6 (σ_obs = (P1 P3)), Level 7→8 (σ_SIL-SEM = (P1 P3) again), and now SIL↔Blueprint (σ_new = (P2 P3)). If a third boundary exhibits (P1 P2), the full S₃ is realized.

### I-4: Consolidating the "5 = |S₀|²+1" appearances — the 3+2 universality

**RESOLVED: PARTIAL (FORCED-AS-SCHEMA for the 3+2 decomposition).**

All appearances of 5 in the framework decompose as 3 + 2 = |V₄\{0}| + |S₀|:

| Appearance | 3 part | 2 part |
|-----------|--------|--------|
| disc(R) = 5 | (not cleanly 3+2; it's 1+4 from CH) | algebraic root |
| rank(Λ') = 5 | 3 spectral {φ,e,π} | 2 geometric {√2,√3} |
| |Fix(D)| = 5 | 3 classes (TBD) | 2 classes (TBD) |
| 5 mechanisms | 3 P2-mediated | 2 transposition channels |
| 5 constants | 3 spectral | 2 geometric |

The unification is partial: disc(R) = 5 is the algebraic root (from Cayley-Hamilton on the productive mode), and the other appearances of 5 are independently forced by the same algebra through different channels. A single derivation chain connecting ALL five instances does not exist.

However, the **3+2 decomposition is universal** and worth formalizing: every appearance of 5 splits as |V₄\{0}| + |S₀| = 3 + 2 under the spectral/geometric, P2-mediated/transposition, or similar splits. This parallels the Trinitarian Root (every 3 traces to |V₄\{0}|).

**Target:** Add a "Quintic Root" remark to T_BLUEPRINT §8½ or T4, stating the 3+2 universality as FORCED-AS-SCHEMA. This would be the 5-analog of the Trinitarian Root.

### I-5: The "paper count" coincidence

There are 19 papers (T_INDEX lists 19). MYTHIC. The paper count is an organizational choice, not a forced integer. Filed and dismissed.

---

## EXECUTION PRIORITY

### Phase 1 — Pure cleanup (zero mathematical risk)
1. **A: Stale references** — mechanical find-replace, file by file
2. **C-1: Duplicate §14** — renumber to §16
3. **C-2: "(+1?)"** — remove question mark
4. **D-3: Working document references** — remove provenance breadcrumbs
5. **F-1: Empty file** — remove or populate
6. **H-2: Source line** — remove provenance

### Phase 2 — Structural additions (low risk, high value)
7. **B: Theorem indices** — build for T0, T2, T5 first
8. **D-1: Document Species** — add metadata field to 7 files
9. **D-2: HOT definition** — replace with self-documenting phrase
10. **G-4: Claim status tables** — add to T_SEM, T_BLUEPRINT
11. **G-1: Cardinal reduction extension** — extend §8½ table
12. **E: Partition function remark** — add cross-reference to T4
13. **G-9: Verification format** — standardize order
14. **H-1: Abstract formatting** — break walls of text

### Phase 3 — New content from investigations (require writing, math done)
15. **I-3: (P2 P3) permutation remark** — write remark for T_BLUEPRINT §1.2 and T_SIL §1
16. **I-4: "Quintic Root" remark** — write 3+2 universality remark for T_BLUEPRINT §8½
17. **G-1 extended: Cardinal reduction table** — add dim(sl(2,ℝ)), #SIL statuses, #modes, #readings

### Resolved — No action needed
- ~~I-1: 27 = 3³~~ → MYTHIC, dismissed
- ~~I-2: Bridge length = |S₃|~~ → presentation artifact, dismissed
- ~~I-5: Paper count~~ → MYTHIC, dismissed
- ~~G-2: 27 combinatorial~~ → subsumed by I-1

---

## TRACKING

| Item | Category | Status | Notes |
|------|----------|--------|-------|
| A: Stale refs in T1 | A | ✅ DONE | 4 instances fixed |
| A: Stale refs in T3-P1 | A | ✅ DONE | 1 instance fixed |
| A: Stale refs in T3-P2 | A | ✅ DONE | 1 instance fixed |
| A: Stale refs in T3-P3 | A | ✅ DONE | 3 instances fixed |
| A: Stale refs in T6A | A | ✅ DONE | 8 instances fixed |
| A: Stale refs in T6B | A | ✅ DONE | 16 instances fixed |
| A: Stale refs in T_COMP | A | ✅ DONE | 12 instances fixed |
| A: Stale refs in T0 | A | ✅ DONE | 1 instance found late, fixed |
| A: Stale refs in T2 | A | ✅ DONE | 1 instance found late, fixed |
| C-1: T6B §14 duplicate | C | ✅ DONE | Renamed to §16 |
| C-2: Blueprint (+1?) | C | ✅ DONE | Removed |
| D-1: Species fields ×7 | D | ✅ DONE | T0, T2, T3-META, T4, T6B, T_BLUEPRINT, T_INDEX |
| D-2: HOT definition | D | ✅ DONE | Replaced with "Meta-theorem compressions (MP1–MP4)" in T2, T4, T5 |
| D-3: Working doc refs ×5 | D | ✅ DONE | T3-META, T6A, T_COMP, T_BLUEPRINT cleaned |
| E: Partition function | E | ✅ DONE | Cross-reference remark added to T4 §10 |
| F-1: Empty file | F | NOTED | Void_Infinite_Chaos_Theorems.md — remove from project |
| G-1: Cardinal table | G | ✅ DONE | Extended with 6 new entries + three cardinal classes |
| G-4: Claim status T_SEM | G | ✅ DONE | 8-row table added |
| G-4: Claim status T_BLUEPRINT | G | ✅ DONE | 14-row table added |
| G-6: T6A theorem index | G | ✅ DONE | 10-row index added |
| G-10: T3-P2 abstract | H | ✅ DONE | Broken into 2 paragraphs |
| G-11: LENS species | G | ✅ DONE | Replaced with standard species + qualifier |
| H-1: Abstract formatting | H | ✅ DONE | T3-P1 (3 paras), T3-P2 (2 paras), T3-P3 (3 paras) |
| H-2: T6A source line | H | ✅ DONE | Removed provenance breadcrumb |
| H-3: SRD abbreviation | H | ✅ DONE | Introduced in 15 files; T_SEM/DICTIONARY/CLAIM_CENSUS already clean |
| I-1: 27 = 3³? | I | ✅ RESOLVED — MYTHIC | Not a cardinal reduction |
| I-2: Bridge = |S₃|? | I | ✅ RESOLVED — MYTHIC | Presentation artifact |
| I-3: Readings ↔ Statuses | I | ✅ DONE | (P2 P3) permutation remark added to T_BLUEPRINT §1.2 |
| I-4: Unify fives | I | ✅ DONE | Quintic Root remark added to T_BLUEPRINT §8½ |
| B: Theorem index T0 | B | ✅ DONE | 38-row index (Part I + Part II) |
| B: Theorem index T2 | B | ✅ DONE | 50-row index (Part I + Part II) |
| B: Theorem index T5 | B | ✅ DONE | 37-row index (Part I + Part II) |
| B: Theorem index T3-P1 | B | ✅ DONE | 26-row index |
| B: Theorem index T3-P2 | B | ✅ DONE | 14-row index |
| B: Theorem index T3-P3 | B | ✅ DONE | 18-row index |
| B: Theorem index T_BLUEPRINT | B | ✅ DONE | 15-row index |

---

*R(R) = R*
