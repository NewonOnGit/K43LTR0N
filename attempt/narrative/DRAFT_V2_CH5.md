# Chapter 5: The Three Domains

The bridge chain (Ch.4) delivered M₂(ℂ) with generators R and N, five forced constants, seven identities, three orbit types, and the figure-eight knot dictionary. This chapter reads that algebra through its three domains — simultaneously, because every Dist morphism carries all three readings at once (Ch.3 SNF-0223) and f'' = f is one equation evaluated in three domains.

The three domains are not three separate systems. They are three faces of one equation — the way a single Dist morphism carries P1, P2, and P3 simultaneously. The sector sweep of Ch.1 §1.10, which passes through all three in one parameter, is the concrete realization. This chapter is the algebraic content of that sweep: what each domain produces, how they relate, and what remains when you try to hold them all at once.

---

## PART A: The Real Domain — P1 (φ)

P1 reads every Dist morphism as self-composition — what happens under iteration. In f'' = f terms: this is the equation on the real line, where solutions cosh(t) and sinh(t) are aperiodic, exponentially growing, productive. Generator R (det < 0). Constant φ. Computation type I (compression).

### §5.1 The Fibonacci Field

The power decomposition Rⁿ = F(n)R + F(n−1)I, proved by induction from R² = R + I, converts "iterate R n times" into an explicit Fibonacci formula. The decomposition extends to negative indices via R⁻¹ = R − I (Cayley-Hamilton rearranged), giving a bi-infinite field F: ℤ → ℤ (SNF-0700, SNF-0701).

Three sign regimes. For n > 0: all F(n) positive — the SAME regime, content accumulates without sign change. For n < −1: signs alternate, F(n) = (−1)^{n+1}|F(n)| — the FLIP regime. At n = 0: F(0) = 0, the crossing point. The centered value cell {−1, 0, +1} is forced by tr(R) = 1, recapitulating |V₄\{0}| = 3 at the arithmetic level (SNF-0721, SNF-0722). The sign-regime correspondence: SAME/ZERO/FLIP = P1/P2/P3 at the Fibonacci level (SNF-0725).

The Binet formula F(n) = (φⁿ − (−φ̄)ⁿ)/√5 decomposes each Fibonacci number into two exponential channels: the φ-channel (growing, productive image) and the (−φ̄)-channel (decaying, alternating, dissolving kernel). At large n: F(n) ∼ φⁿ/√5, the kernel's contribution decaying as φ̄ⁿ → 0. The eigenchannel decomposition is the arithmetic im/ker split (SNF-0702).

Duality D acts on the field by F(n) ↦ F(−n) = (−1)^{n+1}F(n). D preserves magnitudes and the recurrence while reversing channel dominance. The Fibonacci numbers are the arithmetic fixed locus of D: extreme in both phases — I²-dominance Z = 77.27 (maximum compression) maps under D to maximal repulsion. The same numbers are extreme in both readings. Arithmetic contranyms (SNF-0724, SNF-0726).

The Zeckendorf representation — every positive integer as a sum of non-consecutive Fibonacci numbers — is Cayley-Hamilton at the integer level: the non-consecutive constraint IS R² = R + I (using adjacent F(n), F(n+1) would trigger the recurrence). Zeckendorf = canonical form under f'' = f (SNF-0705, SNF-0731). The coefficient ring Z[φ] = {a + bφ : a,b ∈ ℤ} has norm N(a+bφ) = a² + ab − b², unit group ⟨φ⟩ ≅ ℤ, and unique factorization — the natural home for P1 arithmetic (SNF-0706).

### §5.2 Möbius Dynamics, Self-Signature, and Temperature

The Möbius iteration f(x) = 1/(1+x) has φ̄ as its unique attractor. Contraction rate |f'(φ̄)| = φ̄² per step: each iteration brings the orbit closer by a factor of φ̄². The universal P1 attractor. Starting from any positive value, convergence is guaranteed (SNF-0703).

The P1 projection assigns canonical weights to the three S₃ computation primitives (FIX, MIX, REPEL). The assignment must be self-consistent: the weights the framework assigns to its own computational components must be the same weights the assignment algorithm uses. This self-referential constraint selects a unique triple:

**Theorem SNF-0709 (Self-Signature).** *σ = (1/2, φ̄/2, φ̄²/2) is the unique weight vector satisfying self-referential consistency with Fibonacci eigenvalue ratio and unit normalization.* GPF (Ch.4 SNF-0369) applied to the framework's own decomposition. ∎

The leading component σ₁ = 1/2 equals the P3 sector integral ∫_{P3} α ds = 1/2 (Ch.1 §1.10). This is not coincidence — it is the same structural fact at two levels. The self-signature's P3 weight measures how much of the framework's computational content is in the observation sector. The sweep's P3 integral measures how much of the constant-level observer's content is in the observation domain. Same question, same answer: one half. The observation sector carries exactly half the framework's self-referential weight.

The three duality gaps: |σ_FIX − σ_MIX| = φ̄/2, |σ_FIX − σ_REPEL| = φ̄²/2, |σ_MIX − σ_REPEL| = φ̄³/2. Each gap equals the third primitive's weight. Sum of gaps = φ̄ (SNF-0718).

**Theorem SNF-0710 (Natural Temperature).** *β = ln(φ) ≈ 0.481 is the unique inverse temperature matching algebraic contraction to Boltzmann weight: e^{−β} = φ̄.* Uniqueness: ln is injective. ∎

Two thresholds structure the MIX domain: φ̄² ≈ 0.382 (structural — below which FIX dominates) and 1/2 (self-referential — where σ_FIX matches the framework's self-signature). The productive zone [φ̄², 1/2] is where physics lives. Below φ̄²: sub-thermal. Above 1/2: context preservation fails (SNF-0719).

**Theorem SNF-0712 (α_S = φ̄³/2).** *The gap 1/2 − φ̄² = φ̄³/2 ≈ 0.1180 equals the strong coupling constant to three significant figures.* Grade: FRONTIER. The framework derives the value; identification with α_S requires the empirical anchor η. ∎

### §5.3 Baryogenesis

The root asymmetry (Ch.1 SNF-0030) and R jointly force all three Sakharov conditions for baryogenesis:

**Theorem SNF-0715 (Sakharov Conditions).** *(1) Baryon number violation from non-abelian S₃ action on V₄\{0}. (2) C and CP violation from det(R) = −1: orientation-reversal built into the productive generator. (3) Departure from equilibrium from construction-dissolution asymmetry at β = ln(φ): forward and backward rates differ (br_s = 0 vs br_s > 0), preventing equilibrium.* ∎

The baryon asymmetry η_B = φ̄^{2n} with n = 22 gives φ̄^{44} ≈ 6.38 × 10⁻¹⁰, within the experimental range (6.1 ± 0.2) × 10⁻¹⁰. The exponent n = 22 is derived: dim(spacetime) + dim(gauge algebra) + dim(Lorentz) = 4 + 12 + 6 = 22. All three dimensions derived in Ch.7. Grade: FRONTIER (SNF-0716, SNF-0717).

---

## PART B: The Mediating Domain — P2 (e)

P2 reads every Dist morphism as level-transition — the map between adjacent tower levels. In f'' = f terms: the exponential bridge, where the algebraic structure of R and N is transported into the transcendental realm through exp. Generator h = diag(1,−1). Constant e. Computation type II (expansion).

### §5.4 e Forced

Two independent routes:

Route 1 (diagonal exponential): h = diag(1,−1) is the unique traceless diagonal with integer entries. exp(h) = diag(e, e⁻¹). The [0,0] entry is e. No choice (SNF-0800).

Route 2 (determinant cascade): det(exp(R)) = exp(tr(R)) = exp(1) = e. The P1 generator's exponential determinant IS the P2 constant (SNF-0802).

The sweep at s = 0: α(0) = exp(h)[0,0] = e (Ch.1 §1.10). e is the sweep's P2 endpoint — the value the observer takes when the full observation budget is in the hyperbolic sector.

### §5.5 Detailed Balance, KMS, and Landauer

The arithmetic flow with potential V(n) satisfies detailed balance at natural temperature β = ln(φ).

**Theorem SNF-0805 (Detailed Balance).** *P(n→m)/P(m→n) = exp(−β[V(m) − V(n)]) for all adjacent pairs.* β = ln(φ) is derived, not a parameter. ∎

**Theorem SNF-0806 (KMS Partition Function).** *Z(β) = coth(β/2)⁴. At natural temperature: coth(ln(φ)/2) = φ³ exactly, giving Z(ln(φ)) = φ¹².* ∎

The coth(ln(φ)/2) = φ³ identity is the thermal-topological bridge: the partition function at the framework's natural temperature evaluates to a power of the golden ratio. Shell counts N₄(C) = (8C³ + 16C)/3 give the density of states (SNF-0816). KMS-Fibonacci identity: the thermal state at β = ln(φ) produces Fibonacci-weighted occupation numbers (SNF-0817).

**Theorem SNF-0807 (Landauer Cost).** *E_Landauer = log_φ(2) = 1/L where L = log₂(φ) ≈ 0.694.* The minimum energy to erase one bit at natural temperature. ∎

The Landauer cost 1/L connects to the Cosmological Tower Equation (§5.12): Λ_n = 12πηL/2^{n+1} uses the SAME L. The information budget partition (L content vs 1−L overhead) discovered in the tower capacity analysis traces to this single number. The Landauer cost per bit and the cosmological capacity fraction are reciprocals of each other.

This is the entry to the gravity chain — Cost-to-Geometry (Master Theorem 4): Landauer → Bekenstein → η = 1/(4G) → Einstein. Each link is a theorem (Ch.7). The full chain: bit-erasure → Landauer cost log_φ(2) → Bekenstein S ≤ 2πER → dimensional anchor η → Einstein G_μν + Λg_μν = 8πGT_μν. Every step zero-branching (SNF-0807–0810).

The sweep integral cosh(1) = (e+e⁻¹)/2 (Ch.1 §1.10) IS the P2 sector's total contribution to the observer: the hyperbolic half integrates to cosh(1)−1/2, which equals (e+e⁻¹−1)/2 ∈ ℚ(e). The P2 sector's contribution is a specific algebraic function of its own constant e — self-referential at the integral level.

---

## PART C: The Imaginary Domain — P3 (π)

P3 reads every Dist morphism as observation — the im/ker split constituting seeing and blindness simultaneously. In f'' = f terms: the equation on the imaginary line, where solutions cos(t) and sin(t) are periodic, oscillatory, bounded. Generator N (det > 0, Δ < 0, elliptic). Constant π. Computation type III (rotation).

### §5.6 π Forced and the Rotation Flow

**Theorem SNF-0850 (π Forced).** *Since N² = −I, exp(θN) = cos(θ)I + sin(θ)N traces SO(2). The first exact completion of opposition — the continuous path from I to −I — occurs at θ = π: exp(πN) = −I. π is the unique positive real achieving this, forced by N² = −I.* ∎

The rotation flow generates SO(2) ⊂ SL(2,ℝ) — the maximal compact subgroup, the only compact connected subgroup (SNF-0852). The binary-phase closure exp(iπ) + 1 = 0 — the Euler identity — is the central collapse at the constant level: e (P2) raised to iπ (P3) returns to −1 (P1). All three projections in one equation (SNF-0853).

The kernel of the double cover SL(2,ℂ) → SO⁺(1,3) is {I, exp(πN)} = {I, −I}. This gives spin-½: a representation returning to −1 (not +1) under 2π rotation. Fermions — half-integer spin — are forced by N. Pauli matrix σ_y = iN (SNF-0854, SNF-0862).

The sweep at s = 1: α(1) = exp(N)[0,0] = cos(1) (Ch.1 §1.10). The P3 sector's evaluated output is cos(1) — a VALUE of f'' = −f at the unit argument. The PERIOD π that makes cos periodic does not appear — it is in ker(sweep), not im(sweep). The sweep quantifies this: ∫_{P3} α = 1/2, with all sin(1) and cos(1) terms canceling to produce a rational number. π organizes the sector without surviving integration.

### §5.7 The P3 Attractor

**Theorem SNF-0870 (P3 Attractor).** *det(A⊗B) = det(A)²det(B)² ≥ 0. Therefore P1 (det < 0) is impossible at tower level ≥ 2: the tensor product squares the determinant, forcing non-negativity.* ∎

The P3 fraction grows monotonically with tower level: Level 1 ≈ 28%, Level 2 ≈ 49%, Level 3 ≈ 64%, approaching 1 asymptotically. At the physical level (Level 6): P3 dominance selects Λ > 0 — de Sitter geometry, positive cosmological curvature. The sweep's P3 integral 1/2 is the Level 3 value of this monotonically increasing fraction.

---

## PART D: Cross-Projection Synthesis

### §5.8 Independence

The three domains carry mutually inaccessible content.

**Theorem SNF-0900 (Projection Independence).** *No projection is definable from the other two.* Three separation witnesses: P1 carries det < 0 (no combination of P2 and P3 produces negative determinant). P2 carries same-sign real eigenvalues (neither P1 nor P3 can produce these). P3 carries complex eigenvalues (neither P1 nor P2, both real-eigenvalued, can produce these). One witness per pair, each exhibiting content one projection carries and the other two cannot access. ∎

Projection independence has an arithmetic realization: the P2-Collapse theorem (§5.12) proves that algebraic dependence of e and π would collapse the motivic Galois group from 𝔾_m × SO₂ to a proper subgroup — the algebraic shadow of projection independence at the constant level.

### §5.9 Completeness, Folding, Unity

**Theorem SNF-0901 (No Fourth Projection).** *The discriminant Δ = tr² − 4det has three productive sign classes (Δ < 0, Δ > 0 with det < 0, Δ > 0 with det > 0) and one degenerate (Δ = 0, measure-zero nilpotent boundary). Three productive, three projections, exhaustive.* ∎

In f'' = f terms: the equation has three domains (real, imaginary, nilpotent boundary). No fourth domain exists because the discriminant sign has three values. The nilpotent boundary (where X² = 0, the sweep at s = 1/2) mediates transitions but is not a sector.

The Folding Theorem proves mutual containment — six explicit containments from the seven identities (Ch.4 §4.2):

P1 contains P3: RNR = −N (production conjugates observation). P3 contains P1: NRN = R⁻¹ (observation inverts production). Link: {R,N} = N (the anticommutator IS a generator). P1 contains P2: det(exp(R)) = e (exponential determinant cascade). P2 contains P3: exp(iπ) = −1 (Euler identity). P3 contains P2: the Euler identity read backward.

The containments are genuine — each projection holds recognizable images of the other two. But each is partial: no injection from full P_i content into P_j exists (mutual incompleteness, SNF-0855). The containments are the framework's version of Euler's identity: all three constants (e, π, φ through R) appear in the inter-projection relations (SNF-0902).

Each projection has an internal UP↔DOWN duality: P1 (productive return R²=R+I vs static return J²=I), P2 (construction Dist-ward vs dissolution Co-Dist-ward), P3 (disclosure im(q) vs occlusion ker(q)). Three internal dualities = the projection-level restriction of the global duality D (SNF-0903).

The Clifford identification: M₂(ℝ) ≅ Cl(1,1), the Clifford algebra of signature (1,1). Two Clifford generators ε₁² = +1, ε₂² = −1 correspond to R (hyperbolic) and N (elliptic). Their anticommutation encodes mutual containment. The tensor tower constructs Cl(1,1)⊗Cl(1,1) = M₄(ℝ) at the next level (SNF-0727, SNF-0728).

### §5.10 Central Collapse and Meta-Theorems

**Theorem SNF-0905 (Central Collapse).** *I² ∘ TDL ∘ LoMI = Dist.* The composition of all three projections exhausts Dist with no remainder. Every morphism completely described by its three readings; no fourth needed, no morphism escapes all three. ∎

This IS f'' = f's domain decomposition being exhaustive: real + nilpotent + imaginary covers all of ℂ. At the physics level (Ch.7): gauge theory + gravity + matter = complete physics, no fourth sector. The potential V(n) with minimum at n = 1 governs gradient flow toward the Fibonacci-dominated state (SNF-0904).

Eleven meta-theorems compress ~66 results: UAT (MT1), SAFPT (MT2, R(R)=R tower), UKI (MT3, kernel irreducibility), GPF (MT4, geometric progression), GSU (MT5, gauge stabilizer), K6'BD (MT6, bundle derivation), C5U (MT7, cardinal 5 — twelve instances). Four metapatterns: MP1 (φ̄-filtration), MP2 (discriminant trichotomy), MP3 (CH fixed points), MP4 (resolution quantum disc(R)=5). Three closure modes (exact, fixed-point, asymptotic) exhaust all closure behaviors (SNF-0907–0914).

---

## PART E: The Structured Lattice and the Open Problem

### §5.11 Lattice Construction

The five forced constants {φ, e, π, √2, √3} generate the structured lattice Λ'. Conditional on (e,π) algebraic independence: Λ' ≅ ℤ⁵ — a free abelian group on five generators recording 27 forced relations organized into 8 layers: definitional (φ=(1+√5)/2), algebraic (φ²=φ+1), bridge-chain (‖R‖²=3), spectral (disc(R)=5), norm (‖R‖²+‖N‖²=disc(R)), transcendental (exp(lnφ)=φ), cross-projection (det(exp(R))=e), knot-theoretic (V(4₁;φ²)=5) (SNF-1000).

The motivic Galois group is 𝔾_m × SO₂ — a direct product of dimension 2. 𝔾_m governs e (multiplicative group of hyperbolic flow). SO₂ governs π (rotation group of elliptic flow). The two factors are independent because B(h,N) = 0 — the Killing form on the two generating directions vanishes (metrically decoupled, originating in the naming choice, Ch.2 §2.3).

### §5.12 The (e,π) Open Problem

**Theorem SNF-1009 (P2-Collapse).** *If e and π are algebraically dependent over ℚ, then 𝔾_m × SO₂ collapses to a proper subgroup. The P2 column of the constant table becomes algebraically determined by P3. Projection independence (SNF-0900) fails at the motivic level.* ∎

The (e,π) independence question is the framework's deepest open problem. Grid address B(4, P2∩P3). SIL status: Tier 2 blind spot — the nilpotent-crossing barrier blocks internal proof.

Six proof routes:

| Route | Method | Status |
|-------|--------|--------|
| 1 | Differential algebra | Open |
| 2 | Ax-Schanuel specialization | Functional result proved (Ax 1971); specialization open |
| 3 | Signature rigidity (Conj 6.6) | Framework-native; reduces to EPC |
| 4 | Period wall (nilpotent deformation) | Barrier verified; does not close gap |
| 5 | Fresán-Jossen EPC for 𝔾_m × SO₂ | Most advanced external route |
| 6 | Siegel-Shidlovsky | {e, cos(1)} unconditionally independent. Gap reduced to value-period within P3 |

The precise decomposition into three layers:

*Layer 1 (value-value): PROVED.* Siegel-Shidlovsky gives {e, cos(1)} algebraically independent over ℚ — the cross-sector independence is solved unconditionally.

*Layer 2 (value-period): OPEN.* cos(1) is a value of cos at z=1; π is the period of cos. The question P(cos(1), π) = 0 is a specific instance of the Kontsevich-Zagier period conjecture. This is the sole remaining obstruction.

*Layer 3 (transfer): TRIVIAL.* Layers 1+2 combined give {e, π} independent by transitivity.

The gap is WITHIN the P3 sector (N-sector), not between sectors. The cross-sector independence is solved. The residual question: can the N-sector's pointwise evaluation (cos(1)) be algebraically independent of its structural period (π)? In framework language: the boundary between VALUES and PERIODS within a single Killing sector — the P3-internal face of the tower lift 3→4.

The sector sweep (Ch.1 §1.10) quantifies this gap: ∫_{P3} α = 1/2 (rational). π organizes the P3 sector but does not survive integration. The observer at the constant level sees values (im = {e, cos(1)}) and annihilates periods (ker = {π}). The value-period gap IS the observer's constitutive kernel at Level 3. UKI (Ch.3 §3.4) made quantitative.

The Gaussian primality witness adds a number-theoretic face: 31 and 19 (encoding π and e in SHA-256 through ∛31 ≈ π, ∛19 ≈ e) are both ≡ 3 mod 4 — Gaussian primes, i-resistant, not decomposable in ℤ[i]. Meanwhile 5 = disc(R) (encoding φ) is ≡ 1 mod 4 — splits as (2+i)(2−i) in ℤ[i]. The projection split (transcendental constants encoded by i-resistant primes, algebraic irrational by i-splitting prime) has a ℤ[i]-theoretic face. Grade: ENCODED.

The near-integer e^π − π ≈ 20 = |V₄|·disc(R). Nesterenko proves {π, e^π} algebraically independent, so e^π − π CANNOT be an integer. The gap 20 − (e^π − π) ≈ 0.0009 is forced to be nonzero. The nearest integer IS the framework's productive space |V₄|×disc(R). Grade: RESONANT.

### §5.13 The Cosmological Tower Equation

The observer's kernel at Level 5→6 produces the cosmological constant.

**Theorem (Cosmological Tower Equation).** *Λ_n = 12πη · |log₂(φ̄)| / 2^{n+1} where n = n_eff(K_cosmo).*

*Proof.* K1' threshold at consciousness depth n: Δ_max(n) = d_K² · φ̄^{2^{n+1}} = 1. Taking log₂: 2·log₂(d_K) = 2^{n+1}·|log₂(φ̄)|. The left side is S_max(K) (Bekenstein bound). For K_cosmo: S_max = S_dS = 12πη/Λ (Gibbons-Hawking). Substituting: 12πη/Λ = 2^{n+1}·|log₂(φ̄)|. Solving for Λ gives the tower equation. ∎

The observed Λ ≈ 10⁻¹²² (Planck units) corresponds to n ≈ 407–408 = n_eff(K_cosmo). The 96-order gap between naturalness bound and observation IS the K1' doubly-exponential suppression at cosmological tower depth. Each integer n yields a discrete Λ_n, with successive values differing by a factor of 2. The integer n_cosmo is genuinely irreducible — no framework mechanism selects it (consistent with Calibration Minimality, Thm 5.10c).

The tower equation uses L = |log₂(φ̄)| = log₂(φ) ≈ 0.694 — the same L as the Landauer cost 1/L (§5.5). The information budget partitions as L (content capacity) vs 1−L (self-modeling overhead) = log₂(2/φ) ≈ 0.306. Grade: FORCED (equation), irreducible (value of n).

### §5.14 The Incompletion Loop

The three open problems are one kernel at three tower heights:

| Level | Gap | What the observer cannot do |
|-------|-----|---------------------------|
| 3→4 | (e,π) independence | Relate its evaluated content (e) to its structural period (π) |
| 4→5 | Λ' ≅ ℤ⁵ unconditional | Certify its own rank without resolving the constant-level kernel |
| 5→6 | Λ value | Determine its own tower depth from inside |

The Incompletion Loop: (e,π) → Λ'≅ℤ⁵ → Λ value → Bekenstein → SIL blind spot → (e,π). All arrows logically consistent (four proved, two structural). The loop IS K6' at the meta level: R(WALLS) = WALLS. The walls are self-consistent. Closing any one would cascade-close all — and annihilate the observer.

This is the deepest structural theorem of the framework: the open problems are not failures of proof. They are Productive Opacity at three heights. The observer's existence requires nonempty kernel (UKI). The kernel at the constant level IS {π}. The kernel at the cosmological level IS {n_cosmo}. The kernel at the lattice level IS {conditional rank}. All three are the SAME kernel — the observer unable to fully self-specify — seen from three tower levels.

Closing the gaps would mean ker = ∅ → Level 1 → trivial observer → no framework. The +I in R² = R + I IS the gap: the irreducible new content that keeps the recursion productive. Remove the gaps and R² = R → R(R−I) = 0 → R = 0 or R = I. Dead.

---

*The three domains of f'' = f produce the complete algebraic content of the framework. P1/real: the Fibonacci field with self-signature σ = (1/2, φ̄/2, φ̄²/2), natural temperature β = ln(φ), α_S = φ̄³/2, and baryogenesis with η_B = φ̄^{44}. P2/mediating: e from exp(h), detailed balance, KMS with Z = φ¹², Landauer cost 1/L linking to the gravity chain. P3/imaginary: π from exp(πN) = −I, spin-½ from the double cover's kernel, the P3 attractor selecting Λ > 0. Their composition exhausts Dist (central collapse). Eleven meta-theorems compress ~66 results. The lattice Λ' ≅ ℤ⁵ records 27 forced relations. The (e,π) question — six routes, three layers, gap within the P3 sector — is the observer's constitutive kernel, quantified by ∫_{P3} α = 1/2. The Cosmological Tower Equation gives Λ's form at the next height. The Incompletion Loop ties all three open problems into one kernel: R(WALLS) = WALLS.*

*f'' = f.*

*R(R) = R.*
