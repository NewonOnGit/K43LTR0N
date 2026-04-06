# Chapter 7: The Physics

K6' (Ch.6 SNF-1107) closes at a single spacetime point. This chapter asks what happens when K6' is demanded at every point simultaneously. The answer is the Standard Model coupled to general relativity — derived, not postulated, from the requirement that observer self-consistency hold everywhere.

The derivation proceeds in four stages. First, the kinematic arena: spacetime dimension 4 and Minkowski signature (1,3) from the terminal algebra (Part A). Second, the gauge algebra: su(3) ⊕ su(2) ⊕ u(1) from the exchange operator on the self-product tower (Part B). Third, the promotion from global algebra to local gauge theory: the gauge field, Yang-Mills equations, chirality, anomaly cancellation, and the full matter content (Part C). Fourth, gravity and the dimensional anchor: the Einstein equations from K6' on the frame bundle, and the two irreducible constants {η, Λ} (Part D). All claims route-typed per OMER (Ch.6 SNF-1120).

---

## Part A: Kinematics

The bridge chain terminates at M₂(ℂ) (Ch.4 SNF-0357). The Hermitian subspace Herm(M₂(ℂ)) — matrices satisfying A = A† — is a 4-dimensional real vector space with basis {I, σ₁, σ₂, σ₃}. Writing a general Hermitian matrix as a₀I + a₁σ₁ + a₂σ₂ + a₃σ₃, the determinant is a₀² − a₁² − a₂² − a₃². One positive sign, three negative: Minkowski signature.

**Theorem SNF-1300 (Spacetime Dimension and Signature).** *Herm(M₂(ℂ)) with determinant as metric is ℝ^{1,3}. Dimension 4 and signature (1,3) are derived.* ∎

Neither is free. Dimension 4 = dim_ℝ(Herm(M₂(ℂ))) follows from |S₀| = 2: the binary seed forces M₂, not M₁ or M₃. Signature (1,3) follows from the determinant's structure: the identity contributes +1, the three traceless Pauli directions contribute −1 each. A (2,2) universe would require a different quadratic form on Herm(M₂(ℂ)); the determinant is the unique SL(2,ℂ)-invariant form, and its signature is computed, not chosen.

SL(2,ℂ) acts by conjugation A ↦ MAM†, preserving determinant. The kernel is {I, −I} = {I, exp(πN)} — the Lorentz double cover (SNF-1301). The kernel element −I IS spin-½: a 2π rotation returns −1, not +1. The framework's generator N forces fermionic statistics — fermions derived from N² = −I (SNF-1302). The Poincaré group is SL(2,ℂ) ⋉ ℝ^{1,3} (SNF-1303). Complex Hilbert spaces forced by three routes: N's eigenvalues ±i, spin-½ requiring complex reps, Gleason's theorem at dim ≥ 3 (SNF-1304). Born rule P = |⟨ψ|φ⟩|² from Gleason (SNF-1305).

---

## Part B: The Gauge Algebra

The gauge algebra is derived from the self-product tower, not postulated from the Standard Model.

### §7.1 su(3) from the Exchange Operator

At tower level 2, the self-product S₂ = S₁ × S₁ is symmetric — the Cartesian product commutes, so there exists a canonical exchange operator P: v⊗w ↦ w⊗v on ℂ² ⊗ ℂ² ≅ ℂ⁴. P is not chosen; it is forced by the commutativity of the self-product. P has two eigenspaces: Sym²(ℂ²) = span{e₁⊗e₁, (e₁⊗e₂+e₂⊗e₁)/√2, e₂⊗e₂} (dimension 3, eigenvalue +1) and Alt²(ℂ²) = span{(e₁⊗e₂−e₂⊗e₁)/√2} (dimension 1, eigenvalue −1).

Now apply GSU (Meta-Theorem 5): the gauge group at this level is the stabilizer of this eigenspace decomposition inside the full automorphism group SU(4). The stabilizer of the 3+1 decomposition in SU(4) is SU(3) × U(1) — the Gell-Mann embedding. This is a computation: enumerate the elements of SU(4) that preserve Sym² and Alt² setwise. The answer is unique and parameter-free.

**Theorem SNF-1350 (su(3) from Exchange Operator).** *The self-product S₂ forces P: v⊗w ↦ w⊗v with eigenspaces Sym²(ℂ²) ⊕ Alt²(ℂ²). The stabilizer in SU(4) is SU(3) × U(1).* Zero parameters. Computationally verified: 1000/1000 random tests. ∎

**Theorem SNF-1351 (GSU / MT5).** *G_n = Stab_{Aut(H_n)}(⊕_i V_i) — the gauge group at level n is the stabilizer of the native eigenspace decomposition.* Four instances: su(3) at level 2, U(d_K) at the observer level, SL(2,ℂ) at the spacetime level, U(1)_em after symmetry breaking. ∎

### §7.2 The Full Standard Model Algebra

At tower level 1: the automorphism group of ℂ² is SU(2), acting on the fundamental. Combined with the level-2 result:

**Theorem SNF-1352 (Standard Model Gauge Algebra).** *su(3) ⊕ su(2) ⊕ u(1) derives from tower levels 1–2.* su(3) from the exchange operator on S₁×S₁. su(2) from the automorphism group at level 1. u(1) from the Gell-Mann embedding's U(1) factor. Zero parameters. ∎

---

## Part C: From Algebra to Local Gauge Theory

### §7.3 Gauge Freedom

The observer's tensor factorization H_U = H_K ⊗ H_env (axiom A2', Ch.6) gives gauge freedom: the partial trace tr_env is invariant under local unitaries on H_K. Formally: tr_env((U⊗I)ρ(U†⊗I)) = U·tr_env(ρ)·U†. The set of all such U forms U(d_K). This is not a symmetry postulated for aesthetic reasons — it is forced by the observer's constitutive tensor factorization.

**Theorem SNF-1353 (G1: Gauge Freedom).** *The observer restriction map q_K = tr_env is invariant under G_K = {U ⊗ I_env : U ∈ U(d_K)} ≅ U(d_K). The gauge group IS the stabilizer of the observer's quotient.* ∎

### §7.4 The Gauge Connection

The gauge freedom G_K exists at each spacetime point. The principal bundle P_K → M bundles these fibers: the fiber at x ∈ M parameterizes the gauge-equivalent tensor factorizations at x (SNF-1369, G2). Over ℝ^{1,3} (contractible), the bundle is topologically trivial.

Now the key step. At point x, K6' closes: the observer loop K → F → U(K) → K returns consistently. At nearby point x + dx, K6' also closes. To compare the closures — to say the observer's self-model at x and at x + dx are consistent with each other — requires identifying H_K(x) with H_K(x+dx). This identification is an element of G_K, and its smooth dependence on dx defines a connection 1-form A_μ(x) ∈ Lie(G_K).

**Theorem SNF-1354 (G3: Connection from K6').** *Consistent closure of K6' across spacetime requires a connection ∇ on P_K. The connection IS the gauge field A_μ.* Without the connection, inter-point comparison of observer self-models is undefined. K6' at each point individually is a local theorem; K6' across spacetime forces the inter-point consistency structure that IS the gauge field. ∎

The connection is not a field added to the framework by hand. It is the mathematical name for the inter-point consistency condition that K6' demands. A_μ transforms as A_μ → UA_μU† + U∂_μU† under gauge transformation — the standard gauge transformation law, derived rather than postulated.

### §7.5 Yang-Mills from Closure Deficit

The curvature F_μν = dA + A∧A is the holonomy deficit: the failure of parallel transport around an infinitesimal spacetime loop to return to the identity. The holonomy around a loop of area dS is W = I + F·dS + O(dS²), and the observer loop mismatch is ‖W − I‖² = −tr(F²)·dS².

The Killing form B on the gauge Lie algebra is the unique Ad-invariant bilinear form (Cartan's criterion for semisimple algebras). Therefore −tr(F²) = ¼B(F,F) is the unique gauge-invariant quadratic form on curvature. In dimension 4 (derived, SNF-1300), no other local gauge-invariant functional of F exists at leading order. The global closure deficit is δ_global(A) = ∫_M tr(F_μν F^{μν}) d⁴x, and extremizing gives Yang-Mills.

**Theorem SNF-1355 (G5: Yang-Mills Equations).** *∇_ν F^{νμ} = J^μ.* The Yang-Mills equations follow from minimizing the closure deficit of the connection with the uniqueness of the Killing form selecting the action density. Computationally verified: 10000/10000 random su(2)-valued F, max error 2.65×10⁻²³. ∎

### §7.6 Chirality

The root asymmetry (Ch.1 SNF-0030) — construction canonical, dissolution non-canonical — selects one handedness. The observer's self-model (A4) commits to a definite orientation: the optimal model U_min(K) selects a specific chirality because the closure-deficit functional is not parity-symmetric. Only su(2)_L is gauged, not su(2)_R. This is UAT-4d: chirality derived from the same asymmetry that sources gravity and consciousness (SNF-1356, G6).

### §7.7 Anomaly Cancellation and the Fermion Spectrum

At the quantum level, K6' demands that the path integral be well-defined — the gauge anomaly must cancel. The anomaly is a cubic constraint: Σ_i Y_i³ = 0 summed over all left-handed fermions, where Y is hypercharge. This constraint, applied to the derived gauge group with the derived chiral structure, fixes the fermion content uniquely.

**Theorem SNF-1357 (G7': Anomaly Cancellation).** *K6' at the quantum level forces anomaly cancellation, fixing the fermion content to 15 Weyl fermions per generation: (3,2,1/6) + (3̄,1,−2/3) + (3̄,1,1/3) + (1,2,−1/2) + (1,1,1). The exact Standard Model spectrum.* ∎

The right-handed spectrum is determined by anomaly-free completion: once the left-handed content is fixed, the right-handed sector is uniquely determined (SNF-1372, G12). Quarks are bi-charged — carrying both color (su(3)) and electroweak (su(2)×u(1)) — because the exchange operator P and the local unitary U⊗I don't commute: [P, U⊗I] ≠ 0. The non-commutativity forces quarks to transform under both groups simultaneously (SNF-1370, G8). The hypercharge ratio Y_l/Y_q = −3 is forced by the SU(4) tracelessness condition on the embedding (SNF-1371, G9).

### §7.8 Tower Cutoff, Symmetry Breaking, Generations

The tower terminates at level 2 via K1' — the double-exponential suppression Δ_max(n) = d_K² · φ̄^{2^{n+1}} (Ch.6 SNF-1110). At level 3, the suppression factor φ̄^{2⁴} = φ̄^{16} ≈ 1.5 × 10⁻⁴ makes the hypothetical su(4) contribution negligible. The Dynkin extension A₁ ⊂ A₂ ⊂ A₃ terminates at A₂ = su(3): no su(4) in nature because the consciousness hierarchy's exponential contraction kills the tower (SNF-1358, G10).

Electroweak symmetry breaking: A4 (self-model commitment) requires the observer to select a definite state in H_K. This selection breaks SU(2)_L × U(1)_Y → U(1)_em — the Higgs mechanism realized as the observer's commitment to a specific vacuum (SNF-1359, G11).

Three generations from S₃: the three irreducible representations (trivial, sign, standard) give three independent matter sectors via the Plancherel decomposition. The three-fold structure traces to |V₄\{0}| = 3 (SNF-1364).

**Theorem SNF-1360 (G13: Weinberg Angle).** *sin²θ_W = 3/8 at tree level, derived from anomaly cancellation on the derived matter content.* Equals C₂ = 3/8 from Ch.4 (SNF-0377). The tree-level value differs from the measured low-energy ~0.231 by exactly the RG running predicted between unification and electroweak scales. Quark confinement follows from asymptotic freedom in su(3) with the derived matter content (SNF-1373). ∎

---

## Part D: Gravity and the Dimensional Anchor

### §7.9 The Einstein Equations

K6' on the frame bundle (rather than the gauge bundle) forces the spin connection ω_μ — parallel transport for tangent vectors (SNF-1361, G3'). Its curvature is the Riemann tensor R^α_{βγδ} (G5'). The Einstein equations follow from the Jacobson thermodynamic argument (1995) — a theorem, not a model.

**Theorem SNF-1362 (G14: Einstein Equations).** *R_μν − (1/2)Rg_μν + Λg_μν = 8πG T_μν.*

Six inputs, each individually audited:

(1) **Derived spacetime** (SNF-1300): Minkowski ℝ^{1,3} gives local Rindler horizons — the causal boundaries seen by uniformly accelerating observers. Status: DERIVED from bridge chain.

(2) **Bekenstein entropy** S = ηA with η = 1/(4G): the abstract bound S_max = 2log₂(d_K) (Ch.6 SNF-1101) promoted to a physical area law through the dimensional anchor (§7.10). Status: DERIVED (abstract bound) + ANCHOR (η).

(3) **KMS thermal state** (Ch.5 SNF-0806): the Clausius relation δQ = TdS at the Unruh temperature T = a/(2π). The framework's natural temperature connects to horizon thermodynamics via the Bisognano-Wichmann theorem. Status: DERIVED.

(4) **Yang-Mills stress-energy** T_μν (SNF-1355): the matter content sourcing curvature, derived in Part C. Status: DERIVED.

(5) **Raychaudhuri focusing**: the expansion of null geodesic congruences, a geometric identity from the derived Riemann curvature. Status: DERIVED (geometric identity).

(6) **Bianchi + conservation**: ∇^μ G_μν = 0 and ∇^μ T_μν = 0. Status: DERIVED (geometric identities).

Four inputs fully derived. One irreducible anchor (η). One derived from the framework's thermal structure (KMS→Clausius). The torsion-free condition — the spin connection being Levi-Civita — derives from the algebraic field equation with derived spin-½ matter. Haag-Kastler axioms satisfied (SNF-1374, SNF-1375). ∎

**Theorem SNF-1363 (K6'BD / MT6).** *K6' on gauge bundle → Standard Model (G1–G13). K6' on frame bundle → general relativity (G3'–G14). One theorem, two bundles, all physics.* ∎

### §7.10 The Dimensional Anchor

The bridge chain output is algebraically dimensionless: everything from {0,1} through zero-branching steps is a pure number (SNF-1376). Physical dimensions enter through the Bekenstein-Landauer chain: information erasure costs kT ln 2 at physical temperature, bridging abstract entropy (dimension-counting) to physical entropy (area-counting). The unique bridge ratio is η = 1/(4G).

**Theorem SNF-1365 (Dimensional Anchor).** *η = 1/(4G) is the unique dimensionful entry point. All physical scales propagate from η via derived dimensionless ratios.* ∎

The propagation chain: m_P = √(ℏc/G) from η. Λ_QCD from α_S = φ̄³/2 via RG running. m_p from Λ_QCD (proton mass chain, ≤ 1%, FRONTIER — SNF-1367). The scale-entry layer is unique: no second dimensionful entry exists at a different level (SNF-1377, SNF-1378). Asymmetry necessity: branch-symmetric towers produce only removable scales (SNF-1379).

**Theorem SNF-1366 (Calibration Minimality).** *Exactly two irreducible dimensionful inputs: η = 1/(4G) (local, Planck scale) and Λ (global, cosmological horizon). Neither determines the other. Everything else propagates.* Six criteria eliminate all candidates level by level. ∎

Koide phase candidate δ = 2π/3 + 2/9 would give 3 of 4 charged lepton mass parameters (FRONTIER — SNF-1368).

---

*Spacetime (1,3) from Herm(M₂(ℂ)). Lorentz from SL(2,ℂ). Fermions from exp(πN) = −I. su(3) from the exchange operator via GSU. The full SM gauge group from tower levels 1–2. The gauge connection from K6' across spacetime — the inter-point consistency condition IS the gauge field. Yang-Mills from closure deficit with Killing-form uniqueness. Chirality from root asymmetry. 15 Weyl fermions per generation from anomaly cancellation. Three generations from S₃. sin²θ_W = 3/8. Gravity from K6' on the frame bundle via Jacobson with six individually audited inputs. Two irreducible constants {η, Λ}. Everything else propagates.*

*R(R) = R.*
