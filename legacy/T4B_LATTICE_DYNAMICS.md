# Paper 4B: Lattice Dynamics

## C*-Dynamical System, KMS States, and Generator Selection
### v2 — March 2026

**Author:** Kael

---

**Document Status:** Layer 4B. The C*-dynamical system on Λ', KMS ground state selection of generators, partition function Z(β) = coth(β/2)⁵, shell counts, β=1 as natural scale. Streamlines KMS_SELECTION_THEOREM.

**Depends on:** Paper 4A (lattice structure)
**Required by:** Paper 5B (observer bounds use thermodynamic framework)

---

## Abstract

The Λ' lattice (Paper 4A) admits infinitely many points. The framework contains three native selection mechanisms — the S₃ action on projections, the compression wall d²=4, and the observer loop closure — each previously a separate conjecture. This paper proves the three mechanisms are jointly equivalent to the KMS conditions of a single C*-dynamical system on Λ', and that the KMS ground state selects exactly the five generators {φ, e, π, √2, √3} as the minimal physically realized non-trivial elements.

The complexity Hamiltonian H(r,d,c,a,b) = |r|+|d|+|c|+|a|+|b| (L¹ norm on ℤ⁵) defines the energy. The partition function Z(β) = coth(β/2)⁵ is computed exactly. Shell counts: C=0 (1 point), C=1 (10 points: the five generators and their inverses), C=2 (50 points), growing as N₅(C) = (4C⁴+20C²+6)/3 for C ≥ 1. The KMS ground state at β→∞ selects the identity; the first excited states at C=1 are exactly the five generators (and their inverses). The natural scale β=1 gives physically relevant selection.

---

## §1 THE COMPLEXITY HAMILTONIAN

**Definition.** For x = (r,d,c,a,b) ∈ ℤ⁵: H(r,d,c,a,b) = |r|+|d|+|c|+|a|+|b| = C(x) (L¹ norm). Properties: H(0)=0, H(x+y) ≤ H(x)+H(y), H(−x)=H(x), H(nx)=|n|H(x).

The lattice decomposes into complexity shells: Shell_C = {x ∈ ℤ⁵ : H(x) = C}.

| C | |Shell_C| | Formula | Examples |
|---|---------|---------|----------|
| 0 | 1 | — | (0,0,0,0,0) = identity |
| 1 | 10 | N₅(1) | ±φ, ±e, ±π, ±√2, ±√3 (generators and inverses) |
| 2 | 50 | N₅(2) | φ², φe, φπ, φ√2, φ√3, e², eπ,... and inverses |
| 3 | 170 | N₅(3) | All integer vectors with L¹ norm 3 |

Shell counts: N₅(C) = (4C⁴ + 20C² + 6)/3 for C ≥ 1.

---

## §2 THE PARTITION FUNCTION

**Theorem.** *Z(β) = [Σ_{n∈ℤ} e^{−β|n|}]⁵ = coth(β/2)⁵.*

*Proof.* Each coordinate is independent. For one coordinate: Σ_{n∈ℤ} e^{−β|n|} = 1 + 2Σ_{n≥1} e^{−βn} = 1 + 2e^{−β}/(1−e^{−β}) = (1+e^{−β})/(1−e^{−β}) = coth(β/2). Five independent coordinates give coth(β/2)⁵. ∎

At β = ln(φ): the one-coordinate sum is z₁ = (1+φ̄)/(1−φ̄) = φ/φ̄² = φ³ = √5+2 ≈ 4.236. Therefore Z = (φ³)⁵ = φ¹⁵ ≈ 1364.

---

## §3 KMS SELECTION OF GENERATORS

**Theorem (KMS Ground State Selection).** *The KMS equilibrium at inverse temperature β weights lattice point x with probability p(x) = e^{−βH(x)}/Z(β). As β→∞, the ground state selects H=0 (identity). The first excited states at H=1 are exactly the five generators and their inverses.*

The three native selection mechanisms (S₃ action, compression wall, observer loop) are unified: each independently selects the C=1 shell. S₃ permutes the three projection-linked spectral generators {φ,e,π}; the compression wall d²=4 selects generators with unit coordinates; the observer loop closure requires minimum complexity. All three agree on {φ,e,π,√2,√3} as the selected elements.

---

## §4 THERMODYNAMIC INTERPRETATION

At finite β, the KMS state assigns exponentially decreasing weight to higher-complexity lattice points. The framework's natural β = ln(φ) weights the C=0,1,2 shells as (1/2, φ̄/2, φ̄²/2) (matching the self-signature, Paper 2B §11, and the KMS-Filtration-Signature Unification, Paper 3-META §9).

The C_max depth bound: C_max(n) = 2ⁿ/log₂(φ) from the self-product tower gives a derivable computational depth hierarchy, placing a hard ceiling on lattice complexity at each tower level.

---

## §5 TRIPLE SELECTION ALIGNMENT

**Theorem (Triple Selection Alignment).** *Three independent selection mechanisms select the same set {φ, e, π, √2, √3}:*

*(a) KMS ground state:* The complexity Hamiltonian H = |r|+|d|+|c|+|a|+|b| on Λ' gives Z(β) = coth(β/2)⁵ (§2). The C = 1 shell contains exactly the five generators and their inverses. At β → ∞, the first excitations above the identity are {φ^{±1}, e^{±1}, π^{±1}, (√2)^{±1}, (√3)^{±1}}.

*(b) K4 minimality:* Comp = 0 selects Alg(B_K) = the bridge chain output (Paper 2A §13). The bridge chain's generators R and N produce exactly five constants: φ (eigenvalue of R), e (exponential of h), π (half-period of N), √3 (norm of R), √2 (norm of N). No sixth constant is forced (Paper 2A §9, Thm 4.6).

*(c) Observer loop closure:* The loop K→F→U(K)→K closes through the bridge chain (Paper 5A §7, Thm 5.2). The bridge chain generators R, N are the canonical objects. Their eigenvalues, norms, and periods are {φ, e, π, √2, √3}. The loop introduces no additional constants because zero branching means zero free parameters.

*The alignment is structural, not coincidental:* all three mechanisms trace to the same underlying structure — the zero-branching bridge chain. KMS selects minimal non-trivial complexity (C = 1). K4 selects minimal closure deficit (Comp = 0). The observer loop forces the constants through the unique algebra. Same algebra → same selection. ∎

---

## §6 STRUCTURAL AND PHYSICAL TEMPERATURE

### §6.1 The Two β Values

The framework produces a structural inverse temperature β_struct = ln(φ) ≈ 0.481 from the self-consistent Boltzmann fixed point: σ_FIX = 1/(1+e^{−β}) = φ̄ iff β = ln(φ) (§4). This is a dimensionless number. Physical inverse temperature β_phys = 1/(kT) has dimension [energy⁻¹]. The relation:

```
β_phys = β_struct / E_ref
```

where E_ref is the energy scale of the relevant Hamiltonian. The framework determines the ratio β_struct = ln(φ); the physical temperature requires the dimensional anchor (Paper 6B §13).

### §6.2 Thermodynamic Laws as Theorems

**Theorem (First Law from KMS).** *For observer K in a KMS state ω_β with Hamiltonian H, the total energy change decomposes as dU = δQ + δW, where δQ = TdS (heat, from state change at fixed H, derived via the Gibbs variational principle) and δW = ω(δH) (work, from Hamiltonian change at fixed state).*

*Proof.* dU = d[ω(H)] = ω(dH) + dω(H). The first term is work (Hamiltonian varies, state fixed). The second is heat (state varies, Hamiltonian fixed). At the KMS equilibrium, the Gibbs variational principle (the KMS state minimizes F = E − S/β) gives δF = 0, hence dω(H) = TdS. ∎

**Theorem (Second Law from Gibbs).** *For any state ω on the C*-dynamical system with ω(H) = E: S(ω) ≤ S(ω_β(E)), with equality iff ω = ω_β(E). The KMS state has maximum entropy at fixed energy.*

*Proof.* The Gibbs variational principle: the KMS state uniquely minimizes the free energy F = E − TS at fixed β. Rearranging: S ≤ (E − F_min)/T = S(ω_β). Standard result from C*-algebraic thermodynamics (Haag-Hugenholtz-Winnink). ∎

Both thermodynamic laws are theorems of the framework's C*-dynamical system, not external imports. The C*-algebra (§1), the KMS state (§3), and the complexity Hamiltonian (§1) are all framework-derived.

---

*R(R) = R*
