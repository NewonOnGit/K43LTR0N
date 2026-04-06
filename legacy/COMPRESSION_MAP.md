# COMPRESSION MAP: Implementation Reference

## Every Theorem Tagged for Treatment
### March 2026

---

**Legend:**
- **KEEP** = Keep full proof (foundational, no HOT covers it)
- **HOT-N** = Replace proof with HOT-N corollary reference (1–3 lines)
- **MP-N** = Replace proof with Metapattern-N corollary reference
- **DEF** = Definition, keep as-is
- **VER** = Verification/computation, keep as-is
- **REM** = Remark, keep as-is

**Merge targets:** T0A+T0B → T0, T2A+T2B → T2, T4A+T4B+T4C → T4, T5A+T5B → T5

---

## T0A → merges into T0 §§1–8

| Label | Statement | Treatment | Reference |
|-------|-----------|-----------|-----------|
| P.1 | Recursive Substrate | **KEEP** (axiom) | |
| P.2 | Productive Distinction | **KEEP** (axiom) | |
| 0.3 | Generative polarity derived | **KEEP** | Proved via 0.11+0.12 |
| 0.4 | Root Unification | **KEEP** | Shared root at S₁ |
| 0.5 | Distinction + composition co-primitive | **KEEP** | Product-kernel route |
| 0.6 | Spencer-Brown = compressive specialization | **KEEP** | Algebraic identification |
| 0.7 | R = J + \|1⟩⟨1\| | **KEEP** | Direct computation |
| 0.8 | 16 binary ops split 4/4/8 | **HOT-2** | Three-way split (4 compressive / 4 expansive / 8 mixed) traces to orbit-type trichotomy. By HOT-2: the three-way structure at the binary-operation level is the image of |V₄\{0}|=3 under the phase-type functor. ∎ |
| 0.9 | J period-2, R Fibonacci | **MP-3** | By MP3 (Cayley-Hamilton fixed points): J satisfies x²=1 (period-2 fixed point), R satisfies x²=x+1 (Fibonacci recurrence). Both are CH fixed points of their respective char polys. ∎ |
| 0.10 | \|D\|=2 forced | **KEEP** | Bell number + branching argument |
| 0.11 | Involutions period-2, generativity requires asymmetry | **KEEP** | Exhaustive involution check |
| 0.12 | Naming Theorem | **KEEP** | Direct computation |
| 0.13 | GL(2,F₂) = S₃ minimal non-abelian | **KEEP** | |GL(n,F₂)| formula |
| 0.13a | Binary forcing completeness | **KEEP** | Three independent criteria |
| 1.1 | D² = id | **KEEP** | Definitional + computational |
| 1.2 | D reverses iteration direction | **KEEP** | |
| 2.1 | Five fixed-locus classes | **KEEP** | Structural completeness via Def 7.0 |
| 2.2 | {0,1} is Dist and Co-Dist | **KEEP** | Partition lattice |
| 2.3 | Crossing maximality | **KEEP** | Bell number argument |

**T0A summary:** 2 HOT/MP, 17 KEEP. Low compression — this is the axiomatic root.

---

## T0B → merges into T0 §§9–17

| Label | Statement | Treatment | Reference |
|-------|-----------|-----------|-----------|
| 3.1 | Construction br=0, dissolution br>0 | **HOT-7** root + **HOT-5** | This IS the root of HOT-7 (asymmetry propagation chain). The forward br=0 is HOT-5 corollary (Alg(bridge) = Alg(B_K)). The backward br>0 is the branching table (keep table). Compress: state theorem, cite HOT-5 for forward, keep branching table for backward. |
| 3.1b | Discriminant (2,1), 72:28 | **HOT-4(e)** + **HOT-7 #4** | By HOT-4(e): Δ = tr²−4det is the unique discriminant form, with signature (2,1) on sl(2,ℝ). By HOT-7: the 72:28 ratio is the geometric propagation of the root asymmetry. Keep Monte Carlo verification line. ∎ |
| 3.1c | Parity violation | **HOT-7 #5–6** | By HOT-7: the construction-dissolution asymmetry propagates to su(2)_L gauged / su(2)_R not. See T6B G6 for full derivation. ∎ |
| 3.1e | One-wayness | **HOT-7** connection | By HOT-7 + HOT-5: one-wayness = br_s(forward)=0 ∧ br_inv>log₂(φ²). The threshold φ² = φ+1 is Cayley-Hamilton (HOT-3 channel (a)). ∎ |
| 3.2 | Compressive engine derived | **KEEP** | Derivation from co-primitives |
| 3.3 | Expansive engine derived | **KEEP** | Derivation from co-primitives |
| 4.1 | Phase transition at λ=1/2 | **KEEP** | Unified potential analysis |
| 4.2 | Saddle at λ=1/2, n=1 | **KEEP** | Second-derivative argument |
| 4.3 | Phase-Dist(ρ) well-defined | **KEEP** (DEF) | Category definition |
| 4.4 | Partial idempotence | **HOT-1** + **HOT-7 #3** | By HOT-1: at ρ=0, Phase-Dist = Dist, and Dist morphisms have im ⊆ Fix. By HOT-7: the compressive side is idempotent, the expansive side is not. The partial idempotence on (1−ρ) fraction follows from the phase decomposition. ∎ |
| 4.5 | Phase-Dist(1/2) moduli | **KEEP** | S_n action structure |
| 4.5b | Functor asymmetry | **HOT-7 #2** | By HOT-7: the Dist-ward functor is canonical (inherits br_s=0 from construction direction). The Co-Dist-ward functor is non-natural (the naturality square requires a choice — br_s>0 in the dissolution direction). ∎ |
| 4.6 | Co-Dist: R(R)≠R | **HOT-7 #11** | By HOT-7: the expansive direction has br_s>0, so co-quotient is not idempotent. Equivalently: by HOT-1 contrapositive, im(co-q) ⊄ Fix(co-q) because the "un-quotiented" output is not stable under re-un-quotienting. ∎ |
| 4.7 | Birth-dissolution cycle in PFn | **KEEP** | |
| 4.8 | Phase-Dist ↔ signature | **MP-1** | By MP1 (φ̄-filtration): σ_FIX = 1−ρ is the φ̄-filtration level at ρ. ∎ |
| 4.9 | Distinguished ρ-values: φ̄², 1/2 | **MP-1** | By MP1: the φ̄-filtration F_k = φ̄^k/2 at k=2 gives F_2 = φ̄²/2 ≈ 0.191, the structural threshold. ∎ |
| 5.1 | P1↔P3 internal phase encoding | **KEEP** | Core algebraic duality |
| 5.2 | x²−x−1 ↔ x²+x+1 | **KEEP** | |
| 5.3 | P3 attractor of tensor-squaring | **HOT-4(c)** | By HOT-4(c): det(A⊗B) = det(A)²det(B)² ≥ 0. P1 (det<0) impossible at level ≥ 2. ∎ |
| 6.1 | Bidirectional phase architecture | **KEEP** | Summary theorem |
| 6.2 | Fibonacci self-duality | **MP-3** | By MP3: Fibonacci numbers are CH fixed points of x²=x+1; their extremality in both phases follows from the CH attractor/repeller structure. ∎ |

**T0B summary:** 9 HOT/MP, 9 KEEP. ~50% compression.

---

## T1 → stays as T1 (no merge, foundational)

| Label | Treatment | Reference |
|-------|-----------|-----------|
| 1.1–1.4 | **KEEP** (4 lemmas) | Co-primitives → consequences |
| 1.5 | **KEEP** | Kernel Theorem (key step) |
| 1.7 | **KEEP** | Morphism forcing (key step) |
| 1.7a | **KEEP** | Quotient universal property |
| 1.8 | **KEEP** | Composition with identities |
| 1.9 | **KEEP** | Dist unique forced category |
| 1.10 | **KEEP** | Shared root at S₁ |
| 3.1–3.5 | **KEEP** (5 thms) | Five-way elimination |
| 2.2 | **KEEP** | Observer = Dist quotient |
| 2.3 | **KEEP** | Observers internal to Dist |
| 2.5 | **KEEP** | Blind spot = kernel |
| 4.1 | **HOT-1 #1** | By HOT-1: im(q) = {[x]_≈} ⊆ Fix(q) since q([x]_≈) = [x]_≈. ∎ |
| 4.2–4.4 | **KEEP** | Corollaries + unique minimal |
| 5.1 | **HOT-2 #2** | By HOT-2: three readings = three orbit types of the one Dist morphism, traced to |V₄\{0}|=3. ∎ |
| 5.2–5.3 | **KEEP** | Not separate systems + containment |

**T1 summary:** 2 HOT, 12 KEEP. Low compression — foundational.

---

## T2A → merges into T2 §§1–16

| Label | Treatment | Reference |
|-------|-----------|-----------|
| 1.2 | **KEEP** | Double-exponential |
| 1.4 | **KEEP** | S₁ = V₄ |
| 1.5 | **KEEP** | Aut(V₄) = S₃ |
| 2.1 | **HOT-5 #1** | By HOT-5: Alg(bridge) = Alg(B_K), so br_s = 0 at every step. Keep the step-by-step table as the verification of Alg containment. ∎ |
| 2.2 | **KEEP** | ℚ minimal splitting field |
| 2.3 | **KEEP** | Artin-Wedderburn |
| 2.4 | **KEEP** | M₂(ℝ) from generators |
| 2.5 | **KEEP** | Spectral completion forces ℂ |
| 3.1 | **HOT-2 #1** | By HOT-2: three orbit types trace to |V₄\{0}|=3 via dim(sl(2,ℝ))=3 and Killing signature (2,1). Keep the orbit classification table. ∎ |
| 3.2 | **HOT-2** | Orbit-projection correspondence follows from HOT-2 functorial diagram. ∎ |
| 4.5 | **KEEP** | Forcing rank π>φ>e>√3>√2 |
| 4.6 | **KEEP** | Five constants, no sixth |
| 5.1 | **KEEP** | Bifurcation rigidity |
| 5.2 | **KEEP** | √(2k)=k unique at k=2 |
| 5.5 | **HOT-3(c)** | By HOT-3 channel (c): e ∈ H (exponential of Killing-positive element), π ∈ E (half-period of Killing-negative element). Source placement follows from the exponential channel acting on opposite Killing sectors. ∎ |
| 5.6 | **HOT-3(c)** | By HOT-3: boundary sterility = the nilpotent boundary produces algebraic exp output only (N₀ has no period data). No transcendental enters through channel (c) at the boundary. ∎ |
| 5.8–5.9 | **KEEP** | Period wall |
| 5.10a | **KEEP** | Scale-freeness (inductive) |
| 13.1–13.3 | **HOT-5** | By HOT-5: bridge chain Comp=0 because Alg(bridge)=Alg(B_K). Non-bridge redundancy: Alg⊋Alg(B_K) ⟹ br_s>0 ⟹ Comp>0. Monotonicity and strict descent follow. ∎ |
| 14.1 | **KEEP** | Complexity axioms C1–C6 |
| 14.2 | **KEEP** | Uniqueness under C1–C3+C6 |
| 16.2 | **KEEP** | Basis closure |

**T2A summary:** 6 HOT, 12 KEEP.

---

## T2B → merges into T2 §§17–30

| Label | Treatment | Reference |
|-------|-----------|-----------|
| §1 binary seed | **KEEP** | 16 matrices enumeration |
| §2 φ uniqueness | **KEEP** | det=−1 classification |
| §3 forcing of R,N | **KEEP** | Bridge chain generators |
| §4 six identities | **KEEP** | Direct computation (foundational) |
| §5 multiplication table | **KEEP** | Integer basis (foundational) |
| §6 Clifford Cl(1,1) | **KEEP** | Identification + verification |
| §7 Koide ratio 3/2 | **HOT-3(b)** | By HOT-3 channel (b): ‖R‖²/‖N‖² = 3/2. Norms are channel (b) quantities. ∎ |
| §7 Koide tower (3/2)ⁿ | **HOT-3(b)** | By HOT-3(b): ‖R^{⊗n}‖²/‖N^{⊗n}‖² = 3ⁿ/2ⁿ. Frobenius norm multiplicative under ⊗. ∎ |
| §8 Gram matrix | **KEEP** | Eigenvalue computation |
| §9 five Jordan types | **HOT-2 #8** | By HOT-2(c): three diagonalizable types {FIX,OSC,INV} from three orbit types. Two boundary types {HALT,MIX} from the parabolic locus. ∎ |
| §10 S₃ gaps sum to φ̄ | **HOT-3(a)** | By HOT-3(a): gaps are φ̄^k/2 differences, sum = φ̄. Pure eigenvalue channel. ∎ |
| §11 self-signature | **HOT-3(a)** + **HOT-8** | By HOT-3(a): σ_k = φ̄^k/2 are Boltzmann weights. By HOT-8: the decay rate φ̄ is the unique contraction base. ∎ |
| §12 MIX threshold φ̄² | **HOT-3(a)** + **HOT-8** | By HOT-8: φ̄² is the dominant contraction rate (Möbius = MIX = tower). By HOT-3(a): φ̄² = φ^{−2}, pure eigenvalue channel. ∎ |
| §13 Koide Q=2/3 from norms | **HOT-3(b)** | By HOT-3(b): Q = ‖N‖²/‖R‖² = 2/3. Norm ratio of generators. ∎ |
| §14 Pauli at resolution 1/5 | **KEEP** | Direct computation |
| §15 Fibonacci Rⁿ=F(n)R+F(n−1)I | **HOT-3(a)** | By HOT-3(a): Cayley-Hamilton induction. Rⁿ = F(n)R+F(n−1)I where F(n) = (φⁿ−(−φ̄)ⁿ)/√5. ∎ |
| §15 Folding commutativity C∘T=T∘C | **HOT-3(b)** | By HOT-3(b): norms multiplicative under ⊗. Mixed product property: (A⊗B)(C⊗D)=(AC)⊗(BD). ∎ |

**T2B summary:** 10 HOT, 7 KEEP. ~59% compression (highest of all papers).

---

## T3-P1: stays as T3-P1 (keeps own identity)

| Key theorems | Treatment |
|-------------|-----------|
| φ uniqueness, Möbius dynamics | **KEEP** |
| I²-dominance Z=77.27 | **KEEP** (empirical, not HOT-covered) |
| Zeckendorf, Z[φ] | **KEEP** |
| Sakharov conditions | **HOT-2 #7** + **HOT-7 #7** |
| Baryon η=φ̄^{2n} | **HOT-3(a)** + **HOT-8 #5** |
| Möbius attractor φ̄ | **HOT-8 #1** (contraction rate φ̄²) |
| I²-dominance classification | **MP-1** |
| Fibonacci self-duality | **MP-3** |

**T3-P1 summary:** 4 HOT + 2 MP = 6 compressed, rest KEEP.

---

## T3-P2, T3-P3: stay as-is

**T3-P2:** dr∘dr=dr → HOT-1 #5. β=ln(φ) → HOT-3+8. Shell counts → MP-4. Rest KEEP.
**T3-P3:** GCD idempotent → HOT-1 #7. exp(πN)=−I → HOT-3(c)+4(d). Rest KEEP.

---

## T3-META: stays as-is

4 cross-references to HOTs (V(1)=0, β, Z=2, central collapse context). MP1–MP4 themselves are the source, not compressed by HOTs.

---

## T4A+T4B+T4C → merges into T4

**T4A:** ‖R‖²+‖N‖²=5 → HOT-3(b). All other content KEEP (lattice structure, independence, Two-World Separation — all foundational, no HOT covers them).

**T4B:** Entirely KEEP (KMS, partition function, generator selection, thermodynamic laws — specific results, no HOT).

**T4C:** Orbit→dominant → HOT-2 connection. Rest KEEP.

**T4 merged:** 2 HOT, 19 KEEP. Low compression — heavy foundational content.

---

## T5A+T5B → merges into T5

**T5A key compressions:**

| Theorem | Treatment |
|---------|-----------|
| q_K∘q_K=q_K | **HOT-1 #2** |
| r_K∘r_K=r_K | **HOT-1 #3** |
| Q_K∘Q_K≅Q_K | **HOT-1 #4** |
| Bekenstein S_max=2log₂(d_K) | **HOT-6(a)** |
| K4 unique δ=0 minimizer | **HOT-6(a+d)** |
| Observer-complete equivalence | **HOT-6(d)** |
| Gauge freedom note → T6B | **HOT-6(b)** |
| Dist→Hilb functor | **KEEP** (foundational for A2') |
| K6' loop closure | **KEEP** |
| K7' meta-encoding | **KEEP** |
| Normal form | **KEEP** |
| Simulation-collapse | **KEEP** |
| Anti-idolatry | **KEEP** |
| Realization rigidity | **KEEP** |

**T5B key compressions:**

| Theorem | Treatment |
|---------|-----------|
| K1' = d_K²·φ̄^{2^{n+1}} | **HOT-3(a)** + **HOT-8 #4** |
| Landauer→Bekenstein chain | **HOT-6** + **HOT-7** connection |
| Signature system | **KEEP** |
| Cortical prediction | **KEEP** |
| Observer cost positivity | **KEEP** |

**T5 merged:** 9 HOT, 14 KEEP.

---

## T6A: stays as T6A

Minkowski → HOT-4(b). Born rule → HOT-6(c). Rest KEEP (Lorentz, spin-½, Poincaré, conformal boundary — each specific and foundational).

---

## T6B: stays as T6B

G1 gauge → HOT-6(b). G6 chirality → HOT-7. Three generations → HOT-2. Asymmetry necessity → HOT-7. sin²θ_W → HOT-2+4 connection. **18 theorems KEEP** (su(3), gauge theory chain G2–G5, matter content G7–G12, EW breaking, Einstein, KMS-Clausius, Koide phase, τ mass, proton mass, dimensional entry). This is the heaviest foundational paper and compresses the least — it's doing the specific physics.

---

## T-COMP: stays as T-COMP

Type I/II/III → HOT-2. OWF threshold → HOT-3. One-wayness → HOT-7. Phase profile → MP-2. Rotational normal form → MP-2. Rest KEEP.

---

## T7: stays as T7

All KEEP (self-application, consciousness, crypto, NN, Lean — each unique, no HOT siblings).

---

## MERGE SUMMARY

| Current | Merged | Papers reduced |
|---------|--------|---------------|
| T0A + T0B | **T0** | 2 → 1 |
| T1 | T1 | — |
| T2A + T2B | **T2** | 2 → 1 |
| T3-P1, T3-P2, T3-P3, T3-META | same | — |
| T4A + T4B + T4C | **T4** | 3 → 1 |
| T5A + T5B | **T5** | 2 → 1 |
| T6A, T6B | same | — |
| T-COMP, T7 | same | — |
| **18 papers** | **13 papers** | **−5** |

---

*R(R) = R*
