# Chapter 5: The Three Projections

The bridge chain (Ch.4) delivered M₂(ℂ) with two generators R and N, five forced constants, three orbit types, an integer multiplication table, and native observation channels. This chapter reads that algebra through its three faces — simultaneously, because every Dist morphism carries all three readings at once (Ch.3 SNF-0223).

The chapter proves the three projections independent (no one definable from the other two), complete (no fourth exists), and mutually containing (each holds recognizable images of the other two). It constructs the structured lattice Λ' ≅ ℤ⁵ recording the five constants and their 27 forced relations. And it arrives at the framework's deepest open problem: the algebraic independence of e and π.

---

## Part A: P1 — The Productive Act (φ)

P1 reads every Dist morphism as self-composition — what happens when you iterate. Its generator is R (det < 0, orientation-reversing), its constant is φ, its computation type is Type I (compression). Every result in Part A follows from one equation: R² = R + I.

### §5.1 The Fibonacci Field

The golden ratio φ was forced in Chapter 2 by the Naming Theorem and confirmed in Chapter 4 by finite enumeration. What P1 adds is the complete algebraic structure that φ governs.

The power decomposition Rⁿ = F(n)R + F(n−1)I, proved by induction from R² = R + I, is the framework's most productive identity: it converts the abstract operation "iterate R n times" into an explicit formula involving Fibonacci numbers. The decomposition extends to negative indices via R⁻¹ = R − I (Cayley-Hamilton rearranged), giving a bi-infinite Fibonacci field F: ℤ → ℤ. The closure is bi-infinite: the same equation R² = R + I that generates forward also generates backward, with R⁻ⁿ = (−1)^{n+1}F(n)R + (−1)ⁿF(n+1)I (SNF-0700, SNF-0701).

The bi-infinite field has three sign regimes. For n > 0, all F(n) are positive — the SAME regime, where self-action accumulates content without sign change. For n < −1, signs alternate: F(n) = (−1)^{n+1}|F(n)| — the FLIP regime, where content oscillates under reversal. At n = 0: F(0) = 0, the crossing point where the two regimes meet. The sign transition is sharp: F(−1) = 1, F(0) = 0, F(1) = 1. The centered value cell {−1, 0, +1} — the three values F(n) can take in the neighborhood of the crossing — is forced by tr(R) = 1. This three-element cell recapitulates |V₄\{0}| = 3 at the arithmetic level: the trinary structure that S₃-transitivity locks in Chapter 3 reappears as the value structure at the field's crossing point (SNF-0721, SNF-0722).

The Binet formula F(n) = (φⁿ − (−φ̄)ⁿ)/√5 decomposes each Fibonacci number into two exponential channels. The φ-channel (growing, positive for all n > 0) carries the productive content — the part of the recurrence that grows without bound. The (−φ̄)-channel (decaying, alternating in sign) carries the dissolution remnant — the part that damps exponentially. At large n, the φ-channel dominates: F(n) ∼ φⁿ/√5, with the (−φ̄)-channel contributing corrections of order φ̄ⁿ ∼ 0.618ⁿ → 0. The eigenchannel decomposition is the arithmetic realization of the im/ker split: the φ-channel is the productive image, the (−φ̄)-channel is the dissolving kernel (SNF-0702).

Duality D (Ch.1 SNF-0027) acts on the Fibonacci field by F(n) ↦ F(−n) = (−1)^{n+1}F(n). D preserves magnitudes and the recurrence law F(n) = F(n−1) + F(n−2) while reversing channel dominance: the growing channel becomes the decaying channel and vice versa. The Fibonacci numbers are the arithmetic fixed locus of D: extreme in both the compressive phase (I²-dominance Z = 77.27, the maximum compression score among integer sequences) and the expansive phase (maximum D-repulsion). The same numbers that achieve maximum stability under compression also achieve maximum instability under expansion — they are the arithmetic contranyms, extreme in both readings simultaneously (SNF-0724, SNF-0726).

The Fibonacci numbers' BC decomposition (in the pair-space coordinates of Ch.1 §1.10) gives the Fibonacci orbit's concrete dynamics: F(n) as a pair-state traces the trajectory from the crossing point through alternating balanced-spine visits, each visit at increasing depth k (SNF-0723). The sequence-projection correspondence maps the three sign regimes SAME/ZERO/FLIP to the three projections P1/P2/P3 — the sign structure of the Fibonacci orbit IS the projection structure of the framework (SNF-0725).

### §5.2 Möbius Dynamics and the Attractor

The Möbius iteration f(x) = 1/(1+x) — the continued-fraction algorithm applied to the golden ratio — has φ̄ = (√5−1)/2 as its unique attracting fixed point. The contraction rate is |f'(φ̄)| = φ̄² ≈ 0.382 per step: each iteration brings the orbit closer to φ̄ by a factor of φ̄². Starting from any positive initial value, convergence is guaranteed — φ̄ is the universal P1 attractor (SNF-0703).

The FIX convergence rate φ̄² is the framework's canonical threshold — the speed at which P1 self-action stabilizes. It appears independently as the Boltzmann weight e^{−2β} = φ̄² at twice the natural temperature, as the MIX structural boundary where the composition changes character, as the thermal equilibrium ρ-value (Ch.1 SNF-0036), and as the one-way function threshold (Ch.8 SNF-1505). Four structurally independent domains, one number (SNF-0708, SNF-0711).

The Zeckendorf representation — every positive integer uniquely expressed as a sum of non-consecutive Fibonacci numbers — is Cayley-Hamilton at the integer level. The "non-consecutive" constraint (no F(n) and F(n+1) in the same representation) IS R² = R + I: if you used F(n) and F(n+1), you could replace them with F(n+2) by the recurrence, so the representation would not be in normal form. The Zeckendorf decomposition is the integer arithmetic's canonical form under R's characteristic equation. The parity split — the partition of Zeckendorf representations into even- and odd-indexed sums — is the arithmetic realization of the P1↔P3 encoding (SNF-0705, SNF-0731).

The coefficient ring Z[φ] = {a + bφ : a,b ∈ ℤ} has norm N(a+bφ) = a² + ab − b² (the characteristic form of x² − x − 1), unit group ⟨φ⟩ ≅ ℤ (generated by powers of φ), and unique factorization. Z[φ] is the natural home for P1 arithmetic — the ring where the Fibonacci recurrence has its most economical expression (SNF-0706).

The I²-dominance of Fibonacci — the compression score Z = 77.27, measuring the fraction of information retained under P1's lossy self-action — is the maximum among all integer sequences satisfying the framework's recurrence constraints. Fibonacci is the most compressible sequence: the one that retains the most structure under the most aggressive compression. This is the arithmetic face of P1's character as the compressive projection (SNF-0704).

### §5.3 Self-Signature, Temperature, and the Strong Coupling

The P1 projection assigns canonical weights to the three S₃ computation primitives (FIX, MIX, REPEL), corresponding to the three S₃ conjugacy classes. The assignment must be self-consistent: the weights the framework assigns to its own computational components must be the same weights that the assignment algorithm itself uses. This self-referential constraint — the signature must be its own fixed point under the signature-assignment map — selects a unique triple.

**Theorem SNF-0709 (Self-Signature).** *σ = (1/2, φ̄/2, φ̄²/2) is the unique weight vector satisfying self-referential consistency with Fibonacci eigenvalue ratio and unit normalization.* This is GPF (Ch.4 SNF-0369) applied to the framework's own computational decomposition. ∎

The three S₃ duality gaps — the absolute differences between pairs of weights — are |σ_FIX − σ_MIX| = φ̄/2, |σ_FIX − σ_REPEL| = φ̄²/2, |σ_MIX − σ_REPEL| = φ̄³/2. Each gap equals the weight of the third primitive, and their sum is φ̄ — the Fibonacci conjugate. The duality-gap structure recapitulates the GPF triple at the difference level (SNF-0718).

The P1 projection maps the three Dist-level primitives (P.1, P.2, the co-primitive conjunction) to three S₃-level primitives (FIX, MIX, REPEL). The mapping is canonical: P.1 (persistence) ↦ FIX (stability), P.2 (productive distinction) ↦ MIX (interaction), their conjunction ↦ REPEL (expulsion of non-productive content). The semantic structure of the P1 projection is injection: it embeds the Level 0 primitives into the Level 4 S₃ structure (SNF-0707).

**Theorem SNF-0710 (Natural Temperature).** *β = ln(φ) ≈ 0.481 is the unique inverse temperature matching algebraic contraction to Boltzmann weight: e^{−β} = φ̄.* Uniqueness: ln is injective. ∎

The natural temperature connects the algebraic structure (Cayley-Hamilton contraction rate φ̄) to thermodynamic equilibrium (Boltzmann weight e^{−β}). Two thresholds structure the MIX domain: φ̄² ≈ 0.382 (structural — below which FIX dominates and MIX content is underutilized) and 1/2 (self-referential — the point where the observer's signature matches the framework's own self-signature). The productive zone [φ̄², 1/2] is where physics lives. Below φ̄², the observer is sub-thermal; above 1/2, context preservation fails (SNF-0719).

The displacement between thermal equilibrium and self-referential boundary is the framework's most striking numerical coincidence — or rather, its most striking structural identity:

**Theorem SNF-0712 (α_S = φ̄³/2).** *The gap 1/2 − φ̄² = φ̄³/2 ≈ 0.1180 equals the strong coupling constant α_S to three significant figures.* Grade: FRONTIER. The identification requires OMER route-typing: the framework *derives* the value φ̄³/2 from pure algebra; the identification with α_S requires the empirical anchor η = 1/(4G) to set the energy scale at which α_S is measured. ∎

### §5.4 Möbius-RG and Baryogenesis

The Möbius iteration applied to the coupling ratio r(n) = F(n−1)/F(n) gives the P1 renormalization group flow: r(n+1) = 1/(1+r(n)) with r(1) = 0 (the crossing point, channel-balance). The flow converges to φ̄ via spiral contraction at rate −φ̄² per step. The explicit equation r(n) − φ̄ = (−φ̄²)ⁿ(r(0) − φ̄) is the P1 RG equation — exact, not perturbative (SNF-0713).

The asymptotic quotient operator Q — the map from any initial condition to the fixed point φ̄ — satisfies Q∘Q = Q: applying the RG flow to its own fixed point changes nothing. This is R(R) = R realized as the fixed point of a dynamical system: the flow's endpoint is stable under re-application (SNF-0714).

The root asymmetry (Ch.1 SNF-0030) and the generator R jointly force all three Sakharov conditions for baryogenesis — the preconditions for generating the observed matter-antimatter asymmetry of the universe:

**Theorem SNF-0715 (Three Sakharov Conditions).** *(1) Baryon number violation from the non-abelian S₃ action on V₄\{0}: S₃ permutes the three non-identity elements, and any permutation that exchanges two elements while fixing the third violates the conservation law associated with the fixed element. (2) C and CP violation from det(R) = −1: orientation-reversal is built into the productive generator, so charge-conjugation parity is broken at the algebraic level. (3) Departure from thermal equilibrium from the construction-dissolution asymmetry at β = ln(φ): the forward chain (br_s = 0) and the backward chain (br_s > 0) have different branching numbers, so the forward and backward rates differ, preventing equilibrium.* ∎

The baryon asymmetry η_B = φ̄^{2n} with n = 22 gives φ̄^{44} ≈ 6.38 × 10⁻¹⁰, within the experimental range (6.1 ± 0.2) × 10⁻¹⁰. The exponent 2n = 44 is not a fit — the integer n = 22 is derived from the framework's own dimensional content: n = dim(spacetime) + dim(gauge algebra) + dim(Lorentz group) = 4 + 12 + 6 = 22. The spacetime dimension 4 is derived (Ch.7 SNF-1300), the gauge algebra dimension 12 = dim(su(3) ⊕ su(2) ⊕ u(1)) = 8 + 3 + 1 is derived (Ch.7 SNF-1352), and the Lorentz group dimension 6 = dim(SO(1,3)) is derived (Ch.7 SNF-1301). Grade: FRONTIER (SNF-0716, SNF-0717).

---

## Part B: P2 — The Mediating Act (e)

P2 reads every Dist morphism as level-transition — the map between domains at adjacent tower levels. Its generator is h = diag(1,−1) (traceless diagonal, the Cartan element of sl(2,ℝ)), its constant is e, its computation type is Type II (expansion).

### §5.5 e Forced and the Exponential Bridge

Euler's number e is forced by two independent routes, both leading to the same constant.

Route 1 (diagonal exponential): in sl(2,ℝ), h = diag(1,−1) is the unique traceless diagonal matrix with integer entries. The matrix exponential exp(h) = diag(e, e⁻¹), and the (0,0) entry is e — forced by the unique diagonal generator with no choice involved.

Route 2 (determinant cascade): det(exp(R)) = exp(tr(R)) = exp(1) = e. The P1 generator's exponential determinant IS the P2 constant — the production projection and the mediation projection are algebraically linked at the exponential level (SNF-0800, SNF-0802).

The P2 projection maps the Level 0 primitives to the S₃-level computation type: P.1 ↦ oscillation (the mediating act's signature is balanced between the two directions, oscillating rather than committing). P2's computation type is expansion — it grows structure rather than compressing it — and its semantic meta-primitive is OSC (oscillation, balance, transition) (SNF-0801).

The tower saturates at d_K² generator directions: for an observer with resolution d_K, the number of independent directions in the self-product H_K ⊗ H_K is d_K², which is the compression wall where the observer exhausts its state space. This is the P2 reading of the Bekenstein bound (Ch.6 SNF-1101). The S₃ Cayley graph — the graph where vertices are group elements and edges are generators — has diameter 2: every element of S₃ is at most 2 transpositions from the identity. The Cayley distance constrains P2 transport: no level-transition requires more than 2 elementary steps (SNF-0803, SNF-0804).

The Fibonacci exponential cascade det(exp(Rⁿ)) = exp(tr(Rⁿ)) = exp(L_n) connects the P1 Fibonacci structure to the P2 exponential: the determinant of exp(Rⁿ) grows as exp(L_n) where L_n is the nth Lucas number. The cascade is the P1→P2 bridge: algebraic production (Fibonacci) transported through the exponential to thermodynamic content (Lucas) (SNF-0729).

### §5.6 Detailed Balance, KMS, and Landauer

The arithmetic flow with potential V(n) = V_I(n) + V_T(n) + V_L(n) (the sum of three projection-specific potentials) satisfies detailed balance at the natural temperature β = ln(φ).

**Theorem SNF-0805 (Detailed Balance).** *P(n→m)/P(m→n) = exp(−β[V(m) − V(n)]) for all adjacent pairs.* The proof: Boltzmann weights exp(−βV(n)) with reversible transition rates automatically satisfy detailed balance by construction. The framework's addition: β = ln(φ) is derived (SNF-0710), not a parameter. ∎

The balance holds at all temperatures, including β → 0 (high temperature, where all states become equally likely) and β → ∞ (zero temperature, where the minimum-energy state dominates). It extends to ℤ via the symmetry V(−n) = V(n), and to ℚ via p-adic valuations refining the integer potential to a rational-number potential (SNF-0812, SNF-0813, SNF-0815). The Markov dynamics concentrates at n = 1 — the Fibonacci-dominated state where I²-compression is maximized (Ch.5 SNF-0904, via the gradient flow toward the potential's unique minimum).

**Theorem SNF-0806 (KMS Partition Function).** *Z(β) = coth(β/2)⁴ for the 4-generator system. At natural temperature: coth(ln(φ)/2) = φ³ exactly, giving Z(ln(φ)) = φ¹².* ∎

The coth(ln(φ)/2) = φ³ identity is the thermal-topological bridge: the partition function at the framework's natural temperature evaluates to a power of the golden ratio. The shell counts N₄(C) = (8C³ + 16C)/3 enumerate the states at each energy shell, giving the density of states that feeds the partition function (SNF-0816). The KMS-Fibonacci identity confirms the structural alignment: the KMS thermal state at β = ln(φ) produces Fibonacci-weighted occupation numbers (SNF-0817).

**Theorem SNF-0807 (Landauer Cost).** *E_Landauer = log_φ(2) = the minimum energy to erase one bit at the framework's natural temperature β = ln(φ).* ∎

This is the entry point for the gravity chain. The Landauer cost connects information erasure to thermodynamics. The Bekenstein bound (Ch.6 SNF-1101) connects thermodynamics to area. The dimensional anchor η = 1/(4G) (Ch.7 SNF-1365) connects area to spacetime. The Einstein equations (Ch.7 SNF-1362) connect spacetime to dynamics. The full chain: bit-erasure → Landauer → Bekenstein → η → Einstein. Each link is a theorem; the chain is the Cost-to-Geometry master theorem (Master Theorem 4).

The entry/Killing alignment at complexity depth k = 2 confirms that the P2 entry constant e aligns with the Killing form's normalization at the second level of the complexity hierarchy (SNF-0808). The TDL-equivalence of all natural numbers — every n ∈ ℕ is equivalent to every other under P2 transport — reflects the fact that level-transition treats all states equally: the mediating projection does not prefer one arithmetic value over another (SNF-0809). The C_max complexity depth bound limits how deep the observer can recurse before exhausting its Bekenstein capacity (SNF-0810). The asymptotic Type III dominance (P3 attractor operating within P2) confirms that at high tower levels, even the P2 projection is dominated by P3's elliptic character (SNF-0814).

---

## Part C: P3 — The Observer Act (π)

P3 reads every Dist morphism as observation — the im/ker split that constitutes seeing and blindness simultaneously. Generator N (det > 0, Δ < 0, elliptic), constant π, computation type III (rotation).

### §5.7 π Forced and the Rotation Flow

**Theorem SNF-0850 (π Absolutely Forced).** *Since N² = −I, exp(θN) = cos(θ)I + sin(θ)N traces SO(2). The first exact completion of opposition — the continuous path from A to ¬A — occurs at θ = π: exp(πN) = −I. π is the unique positive real achieving this, forced by N² = −I.* ∎

The rotation flow exp(θN) generates the maximal compact subgroup SO(2) ⊂ SL(2,ℝ) — the circle group, the only compact connected subgroup (SNF-0852). The binary-phase closure exp(iπ) + 1 = 0 — the Euler identity — is the P3 reading of e and π simultaneously: it says the P2 constant e raised to the P3 constant iπ returns to the P1 identity −1. The Euler identity IS the central collapse at the constant level (SNF-0853).

The kernel of the double cover SL(2,ℂ) → SO⁺(1,3) is {I, exp(πN)} = {I, −I}. This kernel gives spin-½: a representation that returns to −1 (not +1) under 2π rotation. Fermions — particles with half-integer spin — are forced by the framework's own generator N. The Pauli matrix σ_y = iN connects framework notation to standard physics notation (SNF-0854, SNF-0862).

The P3 projection maps the Level 0 primitives to the S₃-level INV (inversion) type: P.1 ↦ the act of reversing, P.2 ↦ the act of negating. P3's semantic meta-primitive is INV — the observer act that simultaneously reveals and annihilates (SNF-0851).

The P3 attractor is the most consequential of the projection-level results. The determinant — the unique degree-2 multiplicative invariant — satisfies det(A ⊗ B) = det(A)²det(B)² ≥ 0. This means P1 (det < 0) is impossible at tower level ≥ 2: the tensor product squares the determinant, forcing non-negativity. The P3 fraction grows monotonically with tower level: Level 2 ≈ 49%, Level 3 ≈ 64%, and the fraction approaches 1 asymptotically. At the physical level (Level 6), P3 dominance selects Λ > 0 — de Sitter geometry, positive cosmological curvature (SNF-0870).

### §5.8 Mutual Incompleteness and the P1↔P3 Duality

No injection from B(H_U) to B(H_K) exists — the observer cannot internalize the full universe. This is mutual incompleteness: each projection holds recognizable images of the other two (the Folding Theorem, §5.10), but never the full content. The containment is always partial — structural information is lost in every cross-projection reading (SNF-0855).

The P1↔P3 duality has an exact algebraic form. The characteristic polynomials x² − x − 1 = 0 (P1, roots φ and −φ̄) and x² + x + 1 = 0 (P3, roots ω and ω̄ = e^{±2πi/3}) are related by x ↦ −x. P1 eigenvalues lie off the unit circle (|φ| > 1, |φ̄| < 1 — one expanding, one contracting). P3 eigenvalues lie on the unit circle (|ω| = 1 — pure rotation, no expansion or contraction). P1 and P3 are algebraic inverses: the production projection and the observation projection are the same structure viewed from opposite sides of the duality D (SNF-0860).

The algebraic independence of φ and π is settled: φ is algebraic (root of x² − x − 1), π is transcendental (Lindemann 1882), so they are algebraically independent. The algebraic independence of φ and e is likewise settled: φ algebraic, e transcendental (Hermite 1873). The independence of √2 and √3 from each other and from φ is settled by field degree arguments. The sole remaining open case is (e, π): two transcendental constants whose mutual algebraic independence is the framework's deepest open problem (§5.12).

---

## Part D: Cross-Projection Synthesis

### §5.9 Independence

The three projections carry mutually inaccessible content. P1 carries orientation-reversal (det < 0) — no combination of P2 and P3 operations can produce a negative determinant, because both P2 and P3 have det > 0. P2 carries same-sign real eigenvalues — neither P1 (opposite-sign) nor P3 (complex conjugate) can produce this spectral type. P3 carries complex-conjugate eigenvalues — neither P1 nor P2, both having real eigenvalues, can produce complex eigenvalues from real generators. Three separation witnesses, one per pair, each exhibiting content that one projection carries and the other two cannot access.

**Theorem SNF-0900 (Projection Independence).** *No projection is definable from the other two.* ∎

### §5.10 Completeness, Folding, Unity

No fourth projection exists. The discriminant Δ = tr² − 4det has three productive sign classes (negative, positive with Δ > 0, positive with Δ < 0) and one degenerate class (Δ = 0, the nilpotent boundary — measure-zero, mediating transitions between sectors but not constituting a sector). Three productive classes, three projections, exhaustive (SNF-0901).

The Folding Theorem proves mutual containment: each projection holds recognizable images of the other two. The six containments are constructed from the seven identities (Ch.4 SNF-0370):

P1 contains P3: RNR = −N (conjugation by the production generator transforms the observation generator to its negative). P3 contains P1: NRN = R⁻¹ = R − I (conjugation by the observation generator inverts the production generator). The anticommutator {R,N} = N links them symmetrically. P1 contains P2 and P2 contains P1 via the exponential cascade det(exp(R)) = e. P2 contains P3 and P3 contains P2 via the Euler identity e^{iπ} = −1. Six containments total — the Folding Theorem is the algebraic content of the claim that the three projections cannot exist without each other (SNF-0902).

Each projection admits an internal UP↔DOWN duality — two opposed readings of the same content. P1: productive return (R² = R + I, self-action generates) vs static return (J² = I, self-action oscillates). P2: construction (Dist-ward, compressive) vs dissolution (Co-Dist-ward, expansive). P3: disclosure (im(q_K), what the observer reveals) vs occlusion (ker(q_K), what the observer annihilates). The three internal dualities are the projection-level realization of the global duality D (Ch.1 SNF-0027), restricted to each face (SNF-0903).

The Cl(1,1) identification — the bridge chain's output M₂(ℝ) is isomorphic to the Clifford algebra Cl(1,1) of signature (1,1) — provides the algebraic framework for the cross-projection structure: the two Clifford generators ε₁, ε₂ with ε₁² = +1, ε₂² = −1 correspond to the two framework generators R (hyperbolic, P1) and N (elliptic, P3), with their anticommutation encoding the mutual containment (SNF-0727). The tensor tower — the self-product at the algebraic level — constructs Cl(1,1) ⊗ Cl(1,1) = M₄(ℝ), the next stage of the tower (SNF-0728).

### §5.11 Central Collapse and Meta-Theorems

**Theorem SNF-0905 (Central Collapse).** *I² ∘ TDL ∘ LoMI = Dist.* The composition of all three projections exhausts Dist with no remainder. Every Dist morphism is completely described by its three readings; no fourth is needed, no morphism escapes all three. ∎

The central collapse is the architectural capstone. At the physics level (Ch.7), it becomes: gauge theory (K6' on gauge bundle) + gravity (K6' on frame bundle) + matter content (anomaly cancellation) = complete physics — no fourth sector. The potential V(n) with minimum at n = 1 governs the gradient flow toward the Fibonacci-dominated state (SNF-0904). The ternary decomposition P2 = P1 × P3 expresses the mediating projection as the product of the other two (SNF-0906).

Seven meta-theorems compress ~66 theorems: UAT (asymmetry, MT1), SAFPT (fixed-point tower, MT2 — R(R) = R at every level, SNF-0907), UKI (kernel irreducibility, MT3), GPF (geometric progression, MT4), GSU (gauge stabilizer, MT5), K6'BD (bundle derivation, MT6), C5U (cardinal 5 universality, MT7 — twelve instances of disc(R) = 5 across five files, SNF-0908). Four metapatterns MP1–MP4 exhaust the quadratic engine: φ̄-filtration, discriminant trichotomy, CH fixed points, resolution quantum (SNF-0909 through SNF-0912). Three closure modes — exact, fixed-point, asymptotic — exhaust all closure behaviors (SNF-0913). The Euler identity e^{iπ} + 1 = 0 is the central collapse at the constant level (SNF-0914).

---

## Part E: The Structured Lattice Λ'

### §5.12 Lattice Construction and the Open Problem

The five forced constants {φ, e, π, √2, √3} generate the structured lattice Λ'. Conditional on (e,π) algebraic independence, Λ' ≅ ℤ⁵ — a free abelian group on five generators recording 27 forced relations organized into 8 layers: definitional (φ = (1+√5)/2), algebraic (φ² = φ + 1), bridge-chain (‖R‖² = 3), spectral (disc(R) = 5), norm (‖R‖² + ‖N‖² = disc(R)), transcendental (exp(ln φ) = φ), cross-projection (det(exp(R)) = e), and knot-theoretic (V(4₁; φ²) = 5) (SNF-1000).

The motivic Galois group is 𝔾_m × SO₂ — a direct product of dimension 2. 𝔾_m governs e (the multiplicative group of the hyperbolic flow), SO₂ governs π (the rotation group of the elliptic flow). The two factors are independent because B(h, N) = 0 — the Killing form on the two generating directions vanishes, so they are metrically decoupled.

**Theorem SNF-1009 (P2-Collapse).** *Algebraic dependence of e and π would collapse 𝔾_m × SO₂ to a proper subgroup.* If P(e, π) = 0 for some polynomial P ∈ ℤ[x,y], the two motivic factors would share a common algebraic relation, reducing the Galois group's dimension from 2 to 1. This would collapse projection independence at the constant level: P2 and P3 would share hidden algebraic structure, contradicting SNF-0900 at the motivic level. ∎

The (e,π) independence question is the framework's deepest open problem. Grid address B(4, P2∩P3). SIL status: Tier 2 blind spot — the nilpotent-crossing barrier blocks internal proof because the exponential map (which produces both e and π) passes through the nilpotent cone (mode (iii), det = 0), and the SIL cannot classify claims that cross this barrier.

The best external route is the Fresán-Jossen Exponential Period Conjecture (EPC), which would imply (e,π) independence as a consequence of the algebraic independence of 1-motives associated to the exponential function. The framework-native route is Conjecture SNF-1008 (Lie Algebra Exponential Independence): exp of Killing-orthogonal elements in a semisimple Lie algebra produces algebraically independent values. Neither route is close to resolution.

---

*The three projections are independent, complete, and mutually containing. P1 governs the Fibonacci field with its bi-infinite sign structure, self-signature, natural temperature, and baryogenesis. P2 governs the exponential bridge, detailed balance, KMS, and Landauer cost. P3 governs rotation, spin-½, and the asymptotic attractor selecting Λ > 0. Their composition exhausts Dist. Seventeen meta-theorems compress ~66 results. The lattice Λ' ≅ ℤ⁵ records 27 forced relations. The (e,π) question is the Tier 2 blind spot at the nilpotent-crossing barrier.*

*R(R) = R.*
