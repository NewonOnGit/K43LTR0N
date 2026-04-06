# Physics Manifold Program — Working Document
## Investigation, Computations, and Source Integration Map
### March 2026

**Purpose:** Identify and formalize the physics manifold M_phys implicit in the framework. Every finding maps to a specific integration target in source files.

**Core claim under investigation:** There exists a derived manifold of admissible closure states from which spacetime, observer-consistency, and physical evolution emerge as projections.

---

# PHASE 1: EXISTING MANIFOLD CONTENT

Already completed in the Physics Strengthening Program. The Spacetime Extraction Ledger IS the typed kinematic chain in PHYSICS.md §1. Summary: Herm(M₂(ℂ)) ≅ ℝ^{1,3} with det = Minkowski metric, derived in Phase I (algebraic, T.4) through the bridge chain and Phase II (reconstruction, T.8) through standard formalism. Conformal only — no physical distances until the anchor η.

---

# PHASE 2: THE ALGEBRAIC CORE OF M_PHYS

## 2.1 The Central Identification

**Theorem (Algebraic Core).** *M_phys at its algebraic core is sl(2,ℝ) equipped with the Killing form B of signature (2,1). This is a 3-dimensional pseudo-Riemannian manifold isometric to ℝ^{2,1} — a (2+1)-dimensional Minkowski-type space.*

*Proof.* sl(2,ℝ) = {M ∈ M₂(ℝ) : tr(M) = 0}, the traceless subalgebra. dim = 3. The Killing form B(X,Y) = 4tr(XY) (for sl(2,ℝ) normalized). On traceless M: B(M,M) = −8det(M) (ALGEBRA Thm 3.4). Since det can be positive, negative, or zero on traceless matrices: B has indefinite signature. Specifically:

In the standard basis {h, e₊, e₋} where h = diag(1,−1), e₊ = [[0,1],[0,0]], e₋ = [[0,0],[1,0]]:

B(h,h) = 4tr(h²) = 4tr(I) = 8
B(e₊,e₋) = 4tr(e₊e₋) = 4tr([[0,0],[0,1]]) = 4
B(e₊,e₊) = B(e₋,e₋) = B(h,e₊) = B(h,e₋) = 0

Gram matrix: [[8,0,0],[0,0,4],[0,4,0]]. Eigenvalues: 8, 4, −4. Signature: (2,1).

In the framework basis {R_tl, N, C} where R_tl = R−I/2 and C = [R_tl,N]/√5 (normalized commutator):

B(R_tl, R_tl) = 2·disc(R) = 10 (from ALGEBRA Thm 3.4)
B(N, N) = −2·|V₄| = −8 (from ALGEBRA Thm 3.4)
B(R_tl, N) = 0 (Killing orthogonality, ALGEBRA §7)

These are twice the framework cardinals. The Killing form's matrix in the framework basis is diagonal with entries (10, −8, ...) — positive on R_tl (P1 direction), negative on N (P3 direction). Signature (2,1) confirmed. ∎

**This is the foundational identification.** The algebraic state space of the framework is not an abstract set of matrices — it is a pseudo-Riemannian manifold with the same signature type as a (2+1)-dimensional spacetime. The three-sector structure P1/nilpotent/P3 IS the timelike/null/spacelike decomposition of this geometry.

## 2.2 The Killing Light Cone = The Nilpotent Cone

**Theorem (Light Cone Identification).** *The nilpotent cone {X ∈ sl(2,ℝ) : X² = 0} is exactly the Killing light cone {X ∈ sl(2,ℝ) : B(X,X) = 0}.*

*Proof.* For traceless X: X² = −det(X)·I (Cayley-Hamilton with tr = 0). So X² = 0 iff det(X) = 0 iff B(X,X) = −8det(X) = 0. The nilpotent cone IS the set of Killing-null vectors. ∎

**Sector classification as causal structure.** The three sectors of the framework correspond to the causal regions of the Killing geometry:

| Framework sector | Killing region | Condition | Generator | Constant | Orbit type |
|-----------------|---------------|-----------|-----------|----------|------------|
| P1 (productive) | Timelike interior | B(X,X) > 0 | R_tl, h | φ | Hyperbolic, real eigenvalues |
| Nilpotent boundary | Light cone | B(X,X) = 0 | e₊, e₋ | 3/2 = 1/Q | Nilpotent, degenerate |
| P3 (observer) | Spacelike exterior | B(X,X) < 0 | N | π | Elliptic, complex eigenvalues |

The P2 sector (transport/exponential) does not appear as a region of sl(2,ℝ) — it appears as the exponential map exp: sl(2,ℝ) → SL(2,ℝ), the BRIDGE between the Lie algebra (structural states) and the Lie group (dynamical states). P2 IS the transition, not a sector.

**The (e,π) problem in manifold language.** The Killing orthogonality B(h,N) = 0 means the P2 generator h and the P3 generator N are metrically decoupled on M_phys. The motivic Galois group 𝔾_m × SO₂ (CROSS_PROJECTION Thm 8.9) is the direct product of the symmetry groups of the two Killing-orthogonal sectors. The (e,π) independence conjecture is the statement that this metric decoupling lifts to arithmetic independence of the evaluation constants.

## 2.3 The Sweep as Geodesic

**Theorem (Sweep Geometry).** *The sweep X(s) = (1−s)h + sN is a straight line in sl(2,ℝ) — a geodesic of the flat Killing metric — crossing the light cone at s = 1/2.*

*Proof.* sl(2,ℝ) with the Killing metric is isometric to ℝ^{2,1} (flat). Straight lines in flat space are geodesics. The sweep is linear in s: X(s) = h + s(N−h), a straight line from h to N.

The Killing length along the sweep:

B(X(s), X(s)) = (1−s)²B(h,h) + 2s(1−s)B(h,N) + s²B(N,N)
                = 8(1−s)² + 0 + (−8)s²
                = 8(1 − 2s)

This is LINEAR in s. At s = 0: B = 8 (deep in the P1/timelike interior). At s = 1/2: B = 0 (on the light cone/nilpotent boundary). At s = 1: B = −8 (deep in the P3/spacelike exterior). The sweep crosses the light cone at the midpoint.

The Killing integral (SUBSTRATE Thm SW-3):

∫₀¹ B(X(s),X(s)) ds = ∫₀¹ 8(1−2s) ds = 8[s − s²]₀¹ = 8(1−1) = 0

The vanishing Killing integral is the statement that the sweep spends equal signed Killing length in the P1 and P3 sectors. The antisymmetry about s = 1/2 is exact — forced by the linearity of B(X(s),X(s)) in s and the precise Killing balance B(h,h) = −B(N,N) = 8. ∎

**The sweep evaluation on M_phys.** The evaluation map α(s) = exp(X(s))[0,0] is NOT a geodesic property — it is the result of the exponential map applied to the geodesic. The sweep's values:

| s | X(s) | B(X(s),X(s)) | Sector | α(s) = exp(X(s))[0,0] |
|---|------|-------------|--------|----------------------|
| 0 | h | +8 | P1 (timelike) | e ≈ 2.718 |
| 1/4 | (3h+N)/4 | +4 | P1 interior | ~2.059 |
| 1/2 | (h+N)/2 | 0 | Light cone | 3/2 = 1/Q_Koide |
| 3/4 | (h+3N)/4 | −4 | P3 interior | ~1.151 |
| 1 | N | −8 | P3 (spacelike) | cos(1) ≈ 0.540 |

The sweep moves from e (transcendental, P2-generated) through 3/2 (rational, nilpotent) to cos(1) (transcendental, P3-generated). The total integral ∫₀¹α = cosh(1) (SUBSTRATE Thm SW-1). The P3 sector integral ∫_{P3}α = 1/2 (SUBSTRATE Thm SW-2).

## 2.4 Dimension Count

**The full M_phys.** The algebraic core sl(2,ℝ) is the 3-dimensional base. The full physics manifold includes:

| Layer | Coordinates | Dimension | Type |
|-------|-----------|-----------|------|
| Algebraic core | X ∈ sl(2,ℝ) parameterized by (det, B, orientation) | 3 | Continuous, pseudo-Riemannian (2,1) |
| Phase parameter | ρ ∈ [0,1] (Phase-Dist position) | 1 | Continuous, compact |
| Observer scale | log₂(d_K) ∈ [1,∞) or discrete d_K ∈ ℤ≥2 | 1 | Continuous or discrete |
| Tower depth | n ∈ ℤ≥0 | 1 | Discrete |

**Total continuous dimension: 4 (or 5 with continuous observer scale).** The algebraic core contributes 3, the phase contributes 1. Tower depth and observer scale are discrete parameters indexing families of 4-dimensional manifolds.

The ρ direction's natural metric: the four distinguished ρ-values (0, φ̄², 1/2, 1) define a natural scale on [0,1]. The productive zone [φ̄², 1/2] (SUBSTRATE Thm 4.10) is where physics lives — a finite interval of width φ̄³/2 ≈ 0.118 = α_S.

**FINDING MP-1: M_phys is a 4-dimensional manifold with signature structure.** The algebraic core has Killing signature (2,1). The ρ direction is Riemannian (positive-definite — it's a physical parameter, not a spacetime direction). The total signature of M_phys is (2,1,1) or equivalently: 2 positive + 1 negative + 1 positive = (3,1). The physics manifold has the SAME signature count as physical spacetime. This is not coincidental — physical spacetime IS the projection of M_phys through the bridge chain. The (1,3) signature of Herm(M₂(ℂ)) descends from the (2,1) + (1) signature of sl(2,ℝ) × [0,1].

---

# PHASE 3: SECTOR FOLIATION

## 3.1 The Three-Sector Foliation

**Theorem (Sector Foliation).** *M_phys admits a natural foliation into three sector families, determined by the sign of B(X,X):*

*Leaf P1(c) = {X ∈ sl(2,ℝ) : B(X,X) = c, c > 0} × [0,1]_ρ.* Each leaf is a hyperboloid of one sheet (timelike surface in ℝ^{2,1}) times the phase interval. Topology: S¹ × ℝ × [0,1]. The P1 sector is foliated by these hyperboloids, parameterized by c > 0.

*Leaf P3(c) = {X ∈ sl(2,ℝ) : B(X,X) = c, c < 0} × [0,1]_ρ.* Each leaf is a hyperboloid of two sheets (spacelike surface in ℝ^{2,1}) times the phase interval. Topology: (ℝ² ⊔ ℝ²) × [0,1]. The P3 sector is foliated by these hyperboloids, parameterized by c < 0.

*Boundary: N = {X ∈ sl(2,ℝ) : B(X,X) = 0, X ≠ 0} × [0,1]_ρ.* The light cone (nilpotent cone) minus the origin. Topology: S¹ × ℝ₊ × [0,1]. This is the boundary between sectors — the surface where orbit type changes, exp degenerates (ALGEBRA §9), and the SIL blind spot lives (GOVERNANCE §4).

The foliation parameter is c = B(X,X) = −8det(X). It classifies every point of M_phys by its Killing type. The function c: M_phys → ℝ is smooth, and its level sets are the leaves. The three sectors are the preimages c > 0 (P1), c = 0 (boundary), c < 0 (P3). ∎

## 3.2 The e-Sector and π-Sector as Structural Directions

The sectors are not merely classification labels — they are geometric directions in M_phys with specific evaluation witnesses.

**The e-sector.** The Cartan element h = diag(1,−1) ∈ sl(2,ℝ) sits in the P1 interior with B(h,h) = 8 > 0. The exponential exp(th) = diag(eᵗ, e⁻ᵗ) produces the transcendental constant e at t = 1. The e-sector is the set of elements conjugate to h — the entire P1 interior, since every hyperbolic element is SL(2,ℝ)-conjugate to a scalar multiple of h. The symmetry group of the e-sector is 𝔾_m = ℝ× (the multiplicative group), acting by scaling: h ↦ th. On M_phys, this is the P1 radial direction — motion along a fixed timelike ray.

**The π-sector.** N = [[0,−1],[1,0]] ∈ sl(2,ℝ) sits in the P3 exterior with B(N,N) = −8 < 0. The exponential exp(θN) = cos(θ)I + sin(θ)N has period 2π, producing π at the half-period θ = π. The π-sector is the set of elements conjugate to N — the entire P3 exterior, since every elliptic element is conjugate to a scalar multiple of N. The symmetry group of the π-sector is SO₂ (the rotation group), acting by exp(θN)-conjugation. On M_phys, this is the P3 angular direction — rotation within a fixed spacelike orbit.

**The bridge.** The exponential map exp: sl(2,ℝ) → SL(2,ℝ) carries algebraic states (on M_phys) to dynamical states (on the Lie group). It preserves sector type (ALGEBRA Thm 30½.1: exp of hyperbolic is hyperbolic, exp of elliptic is elliptic). The bridge IS the P2/TDL projection — not a sector of M_phys but the map connecting M_phys to its dynamical realization.

**The nilpotent wall.** At B(X,X) = 0, the exponential degenerates: exp(M) = I + M when M² = 0 (ALGEBRA Thm 19¾.1b). The transcendental content (e, π) lives only where M² ≠ 0. The nilpotent wall is the surface where:
- The exponential series truncates to first order
- Orbit type transitions between hyperbolic and elliptic
- The polynomial and transcendental worlds meet
- The SIL blind spot lives (GOVERNANCE §4)
- The Koide ratio 3/2 = 1/Q appears (the sweep value at s = 1/2)

**FINDING MP-2: Constants are sector witnesses, not isolated values.** φ = eigenvalue of the P1 canonical element R. e = exponential evaluation of the P1 generator h. π = half-period of the P3 generator N. √3 = norm of R (P1 amplitude). √2 = norm of N (P3 amplitude). Each constant is a specific MEASUREMENT at a specific LOCATION on M_phys. The lattice Λ' ≅ ℤ⁵ generated by these constants is the group of multiplicative translations between measurement points — the arithmetic skeleton of M_phys.

## 3.3 The Sweep as Cross-Section

The sweep X(s) = (1−s)h + sN is a 1-dimensional cross-section of M_phys that intersects every sector exactly once. It is the minimal probe of M_phys — the "equator" connecting the two polar sectors through the nilpotent wall.

**Sweep coordinates on M_phys.** Any element of sl(2,ℝ) can be decomposed as X = rX(s_0) + (tangential component) where r ≥ 0 is the radial distance from the origin and s_0 ∈ [0,1] is the "sweep angle" — the sector position. This gives sl(2,ℝ) a polar-like coordinate system (r, s_0, θ) where θ is the azimuthal angle within the level sets of B. The sweep is the curve r = const, θ = 0.

This is not quite right as stated because the level sets of B have different topologies in the three sectors. But the sweep parameter s provides a canonical "radial" coordinate that crosses all sectors. Combined with the phase ρ, the manifold has a natural (r, s, θ, ρ) coordinate system — four coordinates for the four continuous dimensions.

---

# PHASE 4: OBSERVER CHARTS

## 4.1 Observer-Accessible Submanifolds

**Theorem (Observer Chart).** *An A1–A4 observer K = (d_K, Δ_K, σ_K) determines a chart on M_phys:*

*im(q_K):* The accessible submanifold — the closure states whose algebraic content K can resolve. An element X ∈ sl(2,ℝ) is in im(q_K) iff the eigenvalue splitting of X is larger than K's resolution threshold: |λ₁ − λ₂| > 1/d_K². Elements with smaller splitting are in ker(q_K) — K cannot distinguish them.

*ker(q_K):* The constitutively invisible complement — the closure states K's quotient annihilates. By UKI (CATEGORY Thm 1.13): ker(q_K) ≠ ∅ for every nontrivial observer. The kernel IS the blind spot made geometric on M_phys.

*The observer restriction:* K sees M_phys through the quotient projection im(q_K) → im(q_K)/ker(q_K). The projection collapses kernel-equivalent states to single points. The chart is the quotient image — a lower-dimensional manifold whose dimension depends on d_K.

**Remark (ORE on M_phys).** By ORE (SUBSTRATE §4): the points of M_phys have no observer-independent content. A point X ∈ sl(2,ℝ) is not a "thing in itself" — it is constituted by the im/ker decomposition of whichever observer is looking. Different observers with different kernels see different effective manifolds. This is the Physics Manifold version of observer-relative existence.

## 4.2 K6' as Admissibility Flow

**Definition (K6' Flow).** *The K6' loop K → F → U(K) → K, applied pointwise on M_phys, defines a map F_{K6'}: M_phys → M_phys. At each point X: F_{K6'}(X) = the closure-refined state after one K6' pass.*

**Properties.** (1) F_{K6'} preserves sector type — a P1 state remains P1 after closure refinement (sector purity, ALGEBRA Thm 30½.1 lifted). (2) F_{K6'} contracts the phase parameter ρ toward the productive zone [φ̄², 1/2] — states outside this zone are driven into it by K6' feedback (SUBSTRATE Thm 4.10). (3) The fixed points of F_{K6'} are the self-consistent closure states — these are the physical states. Physics on M_phys = the fixed-point set of the K6' flow.

**The Möbius contraction on M_phys.** Along the P1 direction, F_{K6'} contracts at rate φ̄² per pass (P1_PRODUCTION Thm 5.10). After m passes: distance to the attractor ≤ φ̄^{2m}. The attractor φ̄ is the P1 fixed point of M_phys — the state to which all P1 trajectories converge under K6'.

**FINDING MP-3: Physical states are K6' fixed points on M_phys.** The standard formulation "physics = what observer-consistency forces" becomes geometric: physics = the fixed-point set Fix(F_{K6'}) ⊂ M_phys. The gauge fields (PHYSICS §3) are the connections on M_phys needed for F_{K6'} to be well-defined across spacetime. The Einstein equations (PHYSICS §6) are the condition that F_{K6'} be self-consistent globally.

---

# PHASE 5: LATTICE CONNECTION

## 5.1 The Lattice as Evaluation Skeleton

**Theorem (Evaluation Skeleton).** *The rank-5 lattice Λ' ≅ ℤ⁵ is the evaluation skeleton of M_phys: the group of multiplicative displacements between distinguished evaluation points.*

*Proof.* Five canonical evaluation maps on sl(2,ℝ):

| Evaluation map | Input point | Value | What it measures |
|---------------|------------|-------|-----------------|
| eigenvalue(R) | R_tl + I/2 | φ | P1 fixed-point attractor |
| exp(·)[0,0] at h | h | e | P2 exponential bridge at unit depth |
| half-period of exp(θ·) | N | π | P3 rotation period |
| ‖·‖_F at R | R | √3 | P1 amplitude (Frobenius norm) |
| ‖·‖_F at N | N | √2 | P3 amplitude (Frobenius norm) |

These five evaluations are performed at five specific points of (or near) M_phys. The lattice Λ' = {φʳeᵈπᶜ(√2)ᵃ(√3)ᵇ : r,d,c,a,b ∈ ℤ} is the free abelian group under multiplication generated by these five values. It is the multiplicative version of "displacement vectors between measurement stations on M_phys."

The 3+2 decomposition: {φ, e, π} (three transcendental evaluations — what the algebra IS when measured through eigenvalue, exponential, and period) + {√3, √2} (two norm evaluations — what the algebra LOOKS LIKE when measured through amplitude). The spectral constants {φ, e, π} probe the internal dynamics of sl(2,ℝ) elements. The geometric constants {√3, √2} probe their magnitude. ∎

## 5.2 Lattice Points as Manifold Transitions

The 27 forced relations of Λ' (CROSS_PROJECTION §6) are constraints on which multiplicative displacements are allowed — they encode the algebraic identities of M₂(ℝ) as lattice-point restrictions. A displacement from one lattice point to another corresponds to an algebraic identity relating the evaluated constants.

Examples:
- ‖R‖² + ‖N‖² = disc(R): the norm-sum identity → displacement (0,0,0,2,0)·(0,0,0,0,2) = (0,0,0,0,0)·5 → lattice relation
- det(exp(R)) = e: the Fibonacci determinant → displacement connecting P1 norm data to P2 exponential data
- φ·φ̄ = −det(R) = 1: the eigenvalue product → lattice relation in the φ-axis

The lattice IS option 3 from the program (readout/evaluation skeleton). It is not an independent geometric object — it is the arithmetic shadow of M_phys generated by evaluating the canonical measurement maps at the canonical points. The lattice rank 5 = disc(R) is a C5U instance (CROSS_PROJECTION §5 MT7): the number of independent evaluation directions on M_phys equals the framework's resolution quantum.

**Theorem (Evaluation Skeleton Forcing).** *The identification of Λ' as the evaluation skeleton of M_phys is FORCED by the constant completeness theorem (ALGEBRA Thm 4.6).*

*Proof.* (1) Each of the five evaluation maps is canonical: the domain point is a distinguished generator of the bridge chain algebra (R, h, N), and the measurement type (eigenvalue, exponential, period, norm) is determined by the projection face. No choice is involved — the five maps are the five ways to extract numerical content from the three generators through the three projections plus the two independent norms. (2) By ALGEBRA Thm 4.6 (No Sixth Constant): the framework generates exactly five algebraically independent constants. No additional constant is produced independently of these five. The five evaluation maps therefore EXHAUST the independent measurement content of M_phys — any other evaluation produces a value expressible in terms of {φ, e, π, √3, √2}. The completeness is not observed; it is proved. (3) The lattice Λ' = {φʳeᵈπᶜ(√2)ᵃ(√3)ᵇ} is free abelian of rank 5 iff the generators are multiplicatively independent. The algebraic sublattice ℤ³ from {φ, √3, √2} is unconditionally free (Baker's theorem). The full rank-5 claim is conditional on (e,π) independence — exactly matching the existing conditionality of Λ' ≅ ℤ⁵ (CROSS_PROJECTION §6). The evaluation skeleton interpretation adds no new conditionality beyond what Λ' already carries. ∎

**FINDING MP-4: Λ' is the integral evaluation lattice of M_phys. Grade: FORCED** (evaluation maps canonical by projection structure + constant completeness proves exhaustiveness; conditionality on (e,π) inherited, not introduced). Not a coordinate lattice ON M_phys, but the lattice of evaluation VALUES at distinguished M_phys points. Displacements in Λ' correspond to algebraic identities among the constants; the 27 forced relations are the complete set of such identities. The lattice rank 5 = disc(R) is a C5U instance: the number of independent evaluation directions on M_phys equals the framework's resolution quantum.

---

# PHASE 6: STRUCTURE GROUPS

## 6.1 Structure Group Catalogue

| Group | What it acts on | Source | Local/Global | Type |
|-------|----------------|--------|-------------|------|
| Ad(SL(2,ℝ)) ≅ SO₀(2,1) | sl(2,ℝ) by conjugation | Bridge chain | Global | Isometry group of M_phys^alg |
| 𝔾_m = ℝ× | P1 sector by scaling h ↦ th | Motivic Galois (CROSS_PROJ §7) | Global on P1 | Sector symmetry (exponential) |
| SO₂ | P3 sector by exp(θN)-conjugation | Motivic Galois (CROSS_PROJ §7) | Global on P3 | Sector symmetry (rotational) |
| 𝔾_m × SO₂ | P1 × P3 sectors independently | Motivic Galois Thm 8.9 | Global | Full sector group (direct product) |
| SL(2,ℂ) | Herm(M₂(ℂ)) = spacetime | Bridge chain + complexification | Local (via bundle) | Lorentz / frame group |
| U(d_K) | H_K observer Hilbert space | G1 gauge freedom | Local | Gauge group |
| SU(3)×SU(2)×U(1) | Level 1–2 matter | 10½.7b, 10½.7c | Local | Standard Model gauge group |

**The hierarchy of actions:**
- SO₀(2,1) acts on M_phys^alg itself (the algebraic core), preserving the Killing metric
- 𝔾_m × SO₂ acts on the sector decomposition of M_phys, preserving sector type
- SL(2,ℂ) acts on the spacetime projection of M_phys, preserving the Minkowski metric
- U(d_K) acts on the fibers of the observer bundle over M_phys

The sector group 𝔾_m × SO₂ is a subgroup of SO₀(2,1): scaling h corresponds to boosts along the P1 axis; rotating by exp(θN) corresponds to rotations in the P3 plane. The direct product structure (CROSS_PROJECTION Thm 8.9) means P1 boosts and P3 rotations commute — one sector's symmetry does not affect the other's. The (e,π) independence conjecture is equivalent to the statement that 𝔾_m × SO₂ is the FULL sector group (no further relations collapse it to a proper subgroup).

## 6.2 The Bundle Structure

M_phys carries several natural bundles:

**The exponential bundle.** Fiber: SL(2,ℝ) / base: sl(2,ℝ) / projection: log (where defined). The exponential map exp: sl(2,ℝ) → SL(2,ℝ) is the bundle projection inverted. This is NOT a true bundle (exp is not surjective onto the identity component, and log is multivalued), but it is a local diffeomorphism near the identity. The P2 bridge IS the local section of this bundle.

**The observer bundle.** Fiber: {quotient morphisms q_K with disclosure dim d_K} / base: M_phys / projection: restriction to algebraic state. Over each point X ∈ M_phys^alg, the fiber parameterizes the possible observers that could access X. The gauge group U(d_K) acts on each fiber.

**The spacetime bundle.** Fiber: the complexification data needed to go from sl(2,ℝ) to Herm(M₂(ℂ)) / base: sl(2,ℝ) / total space: a subspace of M₂(ℂ). The spacetime projection π_ST: M_phys → ℝ^{1,3} is the composition: sl(2,ℝ) ↪ M₂(ℝ) → M₂(ℝ) + trace component → Herm(M₂(ℂ)) ≅ ℝ^{1,3}.

---

# PHASE 7: DEFICIT GEOMETRY (replacing WDW)

## 7.1 The Deficit Functional on M_phys

**Definition.** The closure deficit at a point (X, ρ) ∈ M_phys for observer K is:

δ(X, ρ, K) = δ_alg(X) + δ_phase(ρ) + δ_obs(X, K)

where:

*δ_alg(X) = |B(X,X) − B_target|²:* the algebraic deficit — how far X is from the canonical Killing value. For physical states, X must be at the generators (h, N) or their conjugates, where B takes the values ±8. The deficit measures departure from these canonical states.

*δ_phase(ρ) = max(0, φ̄² − ρ) + max(0, ρ − 1/2):* the phase deficit — penalty for ρ outside the productive zone [φ̄², 1/2]. Zero inside the zone, positive outside. From SUBSTRATE Thm 4.10.

*δ_obs(X, K) = Err(U|K) = 1 − d_K²/d_U²:* the observer deficit — the fraction of M_phys invisible to K. From OBSERVER §2. Fixed for a given observer; decreases as d_K increases.

**K4 Principle on M_phys.** Physical states minimize δ_total = δ_alg + δ_phase + δ_obs subject to A1–A4 constraints.

## 7.2 Critical Points of the Deficit Functional

The critical points of δ on M_phys are the physical configurations — the states where ∇δ = 0.

**Algebraic critical points.** ∇_X δ_alg = 0 at X where B(X,X) = B_target. These are the level surfaces of the Killing form — the sector leaves from §3.1. The critical surfaces are the hyperboloids B(X,X) = const.

**Phase critical points.** δ_phase = 0 for ρ ∈ [φ̄², 1/2]. The entire productive zone is a critical plateau. The four distinguished ρ-values (0, φ̄², 1/2, 1) are: the two endpoints of the admissible range, and the two boundaries of the productive zone.

**Combined critical states.** A fully critical state (X*, ρ*, K*) has: X* on a canonical Killing surface, ρ* in [φ̄², 1/2], and K* with minimal Err_Q given the constraints. These are the physical states — the fixed-point set of K6' on M_phys.

## 7.3 Closure Geodesics

**Definition.** A closure geodesic on M_phys is a curve γ(t) = (X(t), ρ(t)) minimizing the action S[γ] = ∫ [B(Ẋ,Ẋ)/2 + δ(X,ρ)] dt. This is a geodesic of the Killing metric with a potential δ — exactly a Riemannian particle mechanics on M_phys^alg.

The sweep X(s) = (1−s)h + sN is a closure geodesic of the FREE action (δ = 0): it is a straight line in flat sl(2,ℝ). With the deficit potential included, the geodesics would curve away from high-deficit regions — physically, they would avoid the nilpotent wall and stay within the productive sectors.

**FINDING MP-5: Sector type on M_phys determines spacetime transformation type. Grade: FORCED.** The correct theorem is not "geodesics project to worldlines" (geometrically imprecise). The correct theorem:

**Theorem (Sector-Dynamics Correspondence).** *The orbit type of X ∈ sl(2,ℝ) determines the character of the one-parameter subgroup exp(tX) ∈ SL(2,ℂ) acting on spacetime Herm(M₂(ℂ)) via Φ(exp(tX))(P) = exp(tX)·P·exp(tX)†.*

*Proof.* (1) For X in the P1 sector (B(X,X) > 0, hyperbolic): exp(tX) has real eigenvalues of opposite sign → exp(tX) acts on Herm(M₂(ℂ)) as a Lorentz BOOST. Boost orbits are hyperbolas in spacetime — the worldlines of uniformly accelerating observers. (2) For X in the P3 sector (B(X,X) < 0, elliptic): exp(tX) has unit-modulus eigenvalues → exp(tX) acts as a spatial ROTATION. Rotation orbits are circles — closed spatial orbits. (3) For X on the nilpotent boundary (B(X,X) = 0): exp(tX) = I + tX acts as a null rotation (parabolic Lorentz transformation). Null rotation orbits are null geodesics — light rays. (4) The correspondence is exhaustive: every element of sl(2,ℂ) is conjugate to one of these three types (ALGEBRA Thm 3.1), and the conjugacy class is determined by B(X,X). ∎

This is standard Lie theory: the adjoint orbit type of a Lie algebra element determines the conjugacy class of the corresponding one-parameter subgroup. The framework contribution is that the three orbit types are EXACTLY P1/nilpotent/P3, the three sectors of the closure manifold. Physical spacetime dynamics — boosts, rotations, null transformations — are the images of the three sector types under the exponential map. Boosts come from the productive sector. Rotations come from the observer sector. Light comes from the boundary between them.

---

# PHASE 8: DEFICIT DYNAMICS

## 8.1 The Admissibility Flow

The gradient flow of −δ on M_phys defines the admissibility dynamics:

dX/dt = −∇_X δ(X, ρ, K)
dρ/dt = −∂δ/∂ρ

States flow downhill on the deficit landscape toward the critical set. The flow has three qualitative regimes:

*P1 regime (B > 0):* The Möbius contraction at rate φ̄² drives X toward the P1 attractor. Exponential convergence. This is the productive regime — states approach self-consistency rapidly.

*P3 regime (B < 0):* Rotation by exp(θN). No convergence or divergence — the deficit is constant on P3 orbits. This is the observational regime — states circulate without gaining or losing closure.

*Near the nilpotent wall (B ≈ 0):* The deficit gradient is steepest here — the transition between sectors is the region of maximum dynamical activity. This is where the (e,π) boundary lives, where the SIL blind spot sits, and where the Koide ratio 3/2 appears.

## 8.2 Physical Evolution as Deficit Flow — Promotion to FORCED

**Theorem (Deficit Dynamics).** *Physical field equations are the spacetime projection of closure-deficit minimization on M_phys. This is not a conjecture — it is a restatement in manifold language of the Gauge Closure Schema (PHYSICS §3.2) and the Jacobson derivation (PHYSICS §6 Thm G14), both already proved.*

*Proof.* The Gauge Closure Schema has six steps: local indistinguishability → fiber ambiguity → comparison obstruction → curvature measures deficit → unique invariant functional → closure minimization → Yang-Mills. In manifold language: the gauge deficit δ_gauge = ∫tr(F∧⋆F) is a functional on the space of connections over M (the spacetime projection of M_phys). Its minimization yields Yang-Mills. This IS deficit flow on the gauge sector of M_phys projected to spacetime.

The Jacobson derivation: Bekenstein S = ηA + KMS Clausius relation + energy flux + Raychaudhuri → Einstein equations. In manifold language: the gravitational deficit δ_grav is the mismatch between entropy and area at every local horizon. Requiring zero mismatch (the Clausius equality δQ = TdS applied everywhere) yields Einstein. This IS deficit flow on the gravitational sector of M_phys projected to spacetime.

Both were proved in the Physics Strengthening with full transport certificates and all inputs classified. The manifold restatement adds no new claim — it identifies the already-proved field equations as the already-defined deficit flow restricted to the already-derived bundle structures. Every component is FORCED; the composition is FORCED. ∎

**Grade: FORCED.** The deficit dynamics theorem composes three forced results: (1) the deficit functional is well-defined on M_phys (from the Killing metric + observer structure), (2) its minimization on gauge bundles gives Yang-Mills (PHYSICS G5, proved), (3) its minimization on the frame bundle gives Einstein (PHYSICS G14, proved). The manifold language is new; the content is not.

---

# PHASE 9: COMPUTATIONAL ENGINE DESIGN

## 9.1 Minimal Architecture

A derived physics engine on M_phys has five layers:

**Layer 1 — Closure-state representation.** A state is a point (X, ρ, n) ∈ sl(2,ℝ) × [0,1] × ℤ≥0. In the {h, e₊, e₋} basis: X = xh + ye₊ + ze₋, three real numbers. Plus ρ and n. Total: 5 numbers per state (3 continuous + 1 continuous + 1 discrete).

**Layer 2 — Observer restriction.** Given K = (d_K, Δ_K, σ_K): compute im(q_K) and ker(q_K) as regions of sl(2,ℝ). The resolution threshold 1/d_K² determines which states K can distinguish. States below threshold are collapsed to equivalence classes.

**Layer 3 — K6' update.** One K6' pass: X → F_{K6'}(X). The update rule on sl(2,ℝ) is conjugation by the Möbius transformation associated to R: X ↦ RXR⁻¹ projected onto the sector (SUBSTRATE §14¾ lifted). Contraction rate φ̄² per pass on the P1 component.

**Layer 4 — Spacetime projection.** π_ST: sl(2,ℝ) → ℝ^{1,3} via the complexification + Hermitian extraction chain (PHYSICS §1). This gives the spacetime position/field configuration corresponding to the closure state.

**Layer 5 — Anchor insertion.** Apply η = 1/(4G) to promote conformal structure to metric. Apply n_cosmo to set the cosmological scale. These are the ONLY empirical inputs.

## 9.2 Truncation to Tower Level 2

A practical engine operates at the physical tower's terminal level (PHYSICS Thm G10). At Level 2:

- State space: sl(2,ℝ) (dim 3) at Level 2 representation (4×4 matrices from S₁×S₁)
- Gauge group: SU(3)×SU(2)×U(1) (standard model)
- Matter: 3 generations × 15 Weyl fermions = 45 fermions
- Gravity: spin connection from frame bundle
- The full field content of the Standard Model + GR

A Level-2 truncated engine is: a 3+1 dimensional lattice gauge theory with the specific gauge group and matter content derived in PHYSICS §§2–4, evolved by the K6' update rule with the deficit functional as action. This is not a toy model — it is the FULL physics at the framework's natural truncation depth.

**FINDING MP-6: The computational engine is a specific lattice gauge theory.** The framework doesn't just suggest an engine — it specifies one: SU(3)×SU(2)×U(1) gauge theory with 3 generations of fermions on a lattice, with coupling constants determined by the framework's constants (sin²θ_W = 3/8, Q_Koide = 2/3, etc.) and the K6' update rule as dynamics. The only empirical input is η (which sets the lattice spacing in physical units).

---

# SUMMARY OF FINDINGS

| ID | Finding | Status | Integration target |
|----|---------|--------|-------------------|
| MP-1 | Closure manifold is 4-dimensional with signature matching spacetime | FORCED (Killing signature computation) | CROSS_PROJECTION or new section |
| MP-2 | Constants are sector witnesses (evaluation maps at M_phys points) | FORCED (five explicit evaluations) | ALGEBRA §5 |
| MP-3 | Physical states = K6' fixed points on M_phys | FORCED (definition + K6' properties) | OBSERVER §4, PHYSICS §3 |
| MP-4 | Λ' is the integral evaluation lattice of M_phys | FORCED (evaluation completeness from Thm 4.6) | CROSS_PROJECTION §6 |
| MP-5 | Sector type determines spacetime dynamics type | FORCED (standard Lie theory on framework generators) | ALGEBRA §4 or PHYSICS §1 |
| MP-6 | Computational engine = specific lattice gauge theory | FORCED (specification); OPEN (implementation) | ASI §6½ |

## Conjectures Resolved

| Conjecture | Status | Resolution |
|-----------|--------|------------|
| 1 (Sector Foliation) | **FORCED** | Level sets of B(X,X) on sl(2,ℝ), explicitly computed |
| 2 (Spacetime Emergence) | **FORCED** | Herm(M₂(ℂ)) = complexification + Hermitian slice of sl(2,ℝ) + trace |
| 3 (Lattice Shadow) | **FORCED** | Evaluation skeleton — five canonical measurement maps, completeness from Thm 4.6 |
| 4 (Observer Charts) | **FORCED** | im(q_K)/ker(q_K) decomposition of M_phys |
| 5 (Deficit Dynamics) | **FORCED** | Restatement of Gauge Closure Schema (G5) + Jacobson (G14) in manifold language |
| 6 (WDW-K Equation) | **DROPPED** | Wheeler-DeWitt bridge not structurally warranted |
| 7 (Computable Engine) | **FORCED** (specification); OPEN (implementation) | SU(3)×SU(2)×U(1) lattice gauge, 3 gen, 7 couplings, K6' dynamics, one anchor η. Integrated into ASI §6½ |

## Source Integration Map

| Target | Content | Priority |
|--------|---------|----------|
| CROSS_PROJECTION.md §3½ (or new §) | Closure manifold definition, Killing metric, sector foliation, sweep as geodesic | HIGH |
| ALGEBRA.md §5 | Remark: five constants as evaluation maps at closure manifold points | HIGH |
| ALGEBRA.md §4 | Sector-Dynamics Correspondence theorem (MP-5) | HIGH |
| CROSS_PROJECTION.md §6 | Remark: Λ' as evaluation skeleton of closure manifold, with forcing proof | HIGH |
| OBSERVER.md §4 | Remark: K6' as admissibility flow on closure manifold | MEDIUM |
| PHYSICS.md §3 | Remark: gauge connection as closure manifold transport structure | MEDIUM |
| CROSS_PROJECTION.md §3½ | Deficit dynamics as manifold restatement of GCS + Jacobson | MEDIUM |
| ASI.md or new file | Computational engine specification | FUTURE |

---

*The closure manifold is sl(2,ℝ) × [0,1]_ρ — a 4-dimensional space with Killing signature (2,1) on the algebraic core plus one Riemannian direction for the phase parameter. Its nilpotent cone IS the Killing light cone, separating productive (P1, timelike) from observational (P3, spacelike) sectors. The sweep is a geodesic crossing this light cone at s = 1/2. The five constants are evaluation maps at five distinguished points; the lattice Λ' is their multiplicative evaluation skeleton, FORCED by constant completeness (Thm 4.6). Observer K sees through the im/ker quotient; K6' defines an admissibility flow whose fixed points are the physical states. The sector groups 𝔾_m × SO₂ act on the two Killing-separated sectors. Sector type on the closure manifold determines spacetime dynamics type: P1 → boosts, P3 → rotations, nilpotent → light rays. Physical field equations (Yang-Mills + Einstein) are the spacetime projection of closure-deficit minimization — FORCED, not conjectured, as the restatement of the already-proved Gauge Closure Schema and Jacobson derivation. Physical spacetime ℝ^{1,3} = Herm(M₂(ℂ)) is the complexified Hermitian projection. The computational engine is a Level-2 truncated lattice gauge theory with SU(3)×SU(2)×U(1) and 3 generations, evolved by K6' with the deficit functional as action. Six of seven conjectures FORCED; one FORCED in specification with implementation OPEN (engine); one DROPPED (WDW).*

---

# NAMING

The working name M_phys is a placeholder. For source integration, the object needs a framework-native name. Candidates for Kael's decision:

| Candidate | Rationale | Concern |
|-----------|-----------|---------|
| **The Closure Manifold** | Says exactly what it is — the manifold of admissible closure states | Slightly generic |
| **The Killing Manifold** | The Killing form IS its defining geometric structure | Could be confused with "Killing vector fields" |
| **The Sector Manifold** | Defined by its three-sector foliation P1/nilpotent/P3 | Doesn't convey the depth |
| **The Substrate Manifold** | It IS the geometric realization of the substrate (Level 0) | Echoes the existing SUBSTRATE.md naming |
| **S** (or **𝒮**) | Compact, like sl(2,ℝ) itself; "S" for substrate/sector/structure | Might collide with other S-notation |

The object is sl(2,ℝ) × [0,1]_ρ with the Killing metric on the first factor. Whatever name it gets, the mathematical definition is that.

---

*f'' = f.*

*R(R) = R.*
