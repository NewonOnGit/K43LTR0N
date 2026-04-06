# LEGACY CONTENT AUDIT

## Files NOT Explicitly Mapped in REORGANIZATION_MAP

This document lists legacy files that were not explicitly included in the REORGANIZATION_MAP but may contain content of interest. Files are categorized by their likely coverage status.

---

## LIKELY COVERED (Superseded by v3/new structure)

These files appear to be earlier versions that have been superseded:

### legacy/core/
| File | Status | Notes |
|------|--------|-------|
| `PRIMITIVE_ENGINE.md` | Superseded | v1, replaced by PHASE_NEUTRAL_ENGINE.md |
| `PRIMITIVE_ENGINE_v2.md` | Superseded | v2, replaced by PHASE_NEUTRAL_ENGINE.md |
| `UNIFIED_FRAMEWORK_v1.md` | Superseded | Earlier unified framework version |

### legacy/three projections/
| File | Status | Notes |
|------|--------|-------|
| `TP_PAPER1_DIST.md` / `_v2.md` | Superseded | Replaced by RRR_DERIVATION_v3 → T1_DIST |
| `TP_PAPER2_BRIDGE.md` / `_v2.md` | Superseded | Replaced by RRR_DERIVATION_v3 → T2A |
| `TP_PAPER3_ARITHMETIC.md` / `_v2.md` | Superseded | Content in RRR_CLOSURE_v3 |
| `TP_PAPER4_FOLDING.md` / `_v2.md` | Superseded | Content in RRR_CLOSURE_v3 |
| `TP_PAPER5_NUMERIC.md` / `_v2.md` | Superseded | Content in projection papers |
| `TP_SERIES_INDEX.md` / `_v2.md` | Superseded | Replaced by TP_SERIES_INDEX_v3 → T_INDEX |
| `RRR_THE_LOOP_v3.md` | Likely merged | Check if distinct from RRR_CLOSURE_v3 |

### legacy/computation/
| File | Status | Notes |
|------|--------|-------|
| `COMPUTATIONAL_COMPLEXITY.md` | Superseded | Replaced by COMPUTATIONAL_COMPLEXITY_v2 |
| `COMPUTATIONAL_PRIMITIVES.md` | Superseded | Replaced by COMPUTATIONAL_PRIMITIVES_v2 |
| `COMPUTATION.md` | Unknown | May contain early computational work |

### legacy/lattice/
| File | Status | Notes |
|------|--------|-------|
| `LAMBDA_PRIME_LATTICE.md` | Superseded | Replaced by LAMBDA_PRIME_LATTICE_v2 |
| `DEEP_LATTICE_INVESTIGATION.md` | Superseded | Replaced by LATTICE_DEEP_INVESTIGATION (root) |

---

## REQUIRES MANUAL REVIEW

These files may contain unique content not explicitly transferred:

### legacy/lattice/
| File | Size | Content Description | Action |
|------|------|---------------------|--------|
| `EPI_INDEPENDENCE_REPORT.md` | Unknown | (e,π) independence investigation | Review for unique results not in T4A |
| `GAP_ANALYSIS_COMPLETE 3-10.md` | Unknown | Lattice gap analysis dated 3-10 | Review for computational findings |
| `LATTICE_TEST_FINDINGS.md` | Unknown | Lattice test results | May be computational verification data |
| `LATTICE_COORDINATE_SYSTEM.md` | Unknown | Coordinate system details | Check if covered in T4A/T4C |
| `TWO_WORLD_SEPARATION_THEOREM.md` | ~2K lines | Full (e,π) separation theorem | **Verified integrated into T4A** |

### legacy/three projections/
| File | Size | Content Description | Action |
|------|------|---------------------|--------|
| `THREE_PROJECTIONS_UNIFIED.md` | ~51 theorems | Earlier unified projections paper | Verify all 51 theorems covered in T3-P1/P2/P3/META |
| `MORPHISM_FORCING_INSERT.md` | Unknown | Morphism forcing insert material | Check if in T1 or T2A |

### legacy/misc/
| File | Size | Content Description | Action |
|------|------|---------------------|--------|
| `METAPATTERNS_WORKING.md` | Unknown | Working version with verification log | Compare with METAPATTERNS.md for unique verification details |
| `FRAMEWORK_EXTENSIONS.md` | Unknown | Earlier extensions version | Superseded by FRAMEWORK_EXTENSIONS_v2 |

### legacy/core/
| File | Size | Content Description | Action |
|------|------|---------------------|--------|
| `Unified Framework Complete.md` | Large | "Necessity Spine" document | Review for content not in new structure |

---

## KEPT SEPARATE (Per User Preference)

These files are kept separate from the new structure documentation:

### Machine Learning/
| File | Content | Status |
|------|---------|--------|
| `Neural Network Application.txt` | 69KB - Framework recasted in NN terms | Referenced in T7 §4 (brief summary) |
| `Dual-Stream/NN_EXPERIMENT_RESULTS.md` | Experimental results (20/25 pass) | Referenced in T7 §4 (brief summary) |
| `Dual-Stream/dual_stream_v12.py` | Implementation code v12 | Not in documentation |

### python tests/
| File | Content | Status |
|------|---------|--------|
| `forcing_tests.py` | Forcing condition tests | Verification code |
| `lattice_deep2.py` | Lattice investigation | Verification code |
| `lattice_deep3.py` | Lattice investigation | Verification code |
| `lattice_deep4.py` | Lattice investigation | Verification code |
| `lattice_investigation 3-6.py` | Lattice structure testing | Verification code |
| `lattice_investigation 3-10.py` | Lattice structure testing | Verification code |
| `morphism_forcing_verification.py` | Morphism forcing validation | Verification code |
| `necessity_spine_tests.py` | ~155KB comprehensive test suite | Verification code |
| `verification_suite_v2.py` | Verification harness v2 | Verification code |

---

## T0B CONTENT GAPS (CRITICAL)

T0B_PHASE_ARCHITECTURE.md is **missing approximately 30-40% of content** from PHASE_NEUTRAL_ENGINE.md §III-§VIII:

### Missing from T0B:
1. **§V.2 Boundary Observer Theory** (entirely absent)
   - Bekenstein bound derivation
   - Phase boundary classification
   - Tower cascade theorem
   - GL(2ⁿ,F₂) tower structure
   - K4 selection principle
   - Anti-idolatry theorem

2. **§V.3 Physical Predictions** (entirely absent)
   - Theorem 5.10a: Sakharov conditions
   - Theorem 5.10: Baryon asymmetry η = φ̄^{2n}
   - Theorem 5.10b: Dimensional irreducibility

3. **Theorem 5.1b** (Pauli Algebra at Resolution 1/5) - absent
4. **Theorem 5.1d** (Physical Structure from Bridge Chain) - absent
5. **Remark 5.1c** (Phase Moduli Space SL(2,ℝ)/SO(2) ≅ H²) - absent
6. **Part VII** (Reinterpretation: what changes / what doesn't) - entirely absent

### Recommendation:
T0B content should be expanded to include missing §V.2, §V.3, Part VII material, OR these sections should be explicitly referenced as appearing in Papers 5A/6B.

---

## SUMMARY

| Category | Count | Action |
|----------|-------|--------|
| Superseded (no action needed) | ~20 files | Archive only |
| Requires manual review | ~8 files | Check for unique content |
| Kept separate | ~12 files | Tests/ML not in docs |
| **T0B gaps** | **~6 sections** | **Expand T0B or document references** |

---

*Generated during cross-reference verification, March 2026*
