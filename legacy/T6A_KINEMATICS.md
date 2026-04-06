# Paper 6A: Kinematics — Spacetime from the Algebra

## Minkowski, Lorentz, Spin-½, Poincaré, and the Born Rule
### v2 — March 2026

**Author:** Kael

---

**Document Status:** Layer 6A. Every result in this paper is a theorem derived from the bridge chain output M₂(ℂ) (the spectral completion of M₂(ℝ), itself derived from M₂(ℚ) via integer generators). No physics is imported. The complete kinematic structure of relativistic quantum mechanics — Minkowski spacetime (dimension and signature), the Lorentz group (as double cover), spin-½ (from the nontrivial center), the Poincaré group (Lorentz plus translations), complex Hilbert spaces (from N²=−I and spectral completion), and the Born rule (from Gleason's theorem) — is derived from {0,1}.

Source: RRR_DERIVATION_v3 Part VII½, expanded with full proofs and physical interpretation.

**Depends on:** Papers 2A (bridge chain), 2B (algebra of {R,N})
**Required by:** Paper 6B (dynamics needs the kinematic arena)

---

## Abstract

The bridge chain (Paper 2A) produces M₂(ℂ) from {0,1} with zero branching. This paper proves that M₂(ℂ) contains the complete kinematic framework of quantum field theory.

The Hermitian subspace Herm(M₂(ℂ)) is a 4-dimensional real vector space. The determinant induces the Minkowski metric: det(tI + xσ_x + yσ_y + zσ_z) = t² − x² − y² − z², giving signature (1,3) — one timelike, three spacelike (Theorem 6.1, §1). The dimension 4 = 2² comes from the bridge chain landing on 2×2 matrices; the split (1,3) comes from I being the unique positive-definite basis element.

SL(2,ℂ) acts on Herm(M₂(ℂ)) by conjugation X ↦ AXA†, preserving the Minkowski norm, yielding the universal double cover SL(2,ℂ) → SO⁺(1,3) with kernel {I, exp(πN)} = {I, −I} (Theorem 6.2, §2). The nontrivial kernel element −I = exp(πN) IS the algebraic origin of spin-½: a 2π rotation in SO⁺(1,3) lifts to −I ≠ I in SL(2,ℂ), so states pick up a sign flip (Theorem 6.3, §3). The framework's most strongly forced constant (π, absolute forcing quality) directly produces the most characteristically quantum phenomenon (half-integer spin).

The Poincaré group SL(2,ℂ) ⋉ Herm(M₂(ℂ)) is the full symmetry group of Minkowski spacetime (Theorem 6.4, §4). Complex Hilbert spaces are forced by three independent mechanisms: N² = −I provides complex structure on ℝ², spectral completion of M₂(ℝ) requires ℂ (eigenvalues ±i of N), and the Dist→Hilb functor (Paper 5A §1.1) produces ℂ-Hilbert spaces (Theorem 6.5, §5). The Born rule follows from Gleason's theorem at tower dimension ≥ 3 (= 4 at level 1), which is satisfied (Theorem 6.6, §6).

---

## §1 MINKOWSKI SPACETIME FROM Herm(M₂(ℂ))

**Theorem 6.1 (Spacetime Dimension and Signature).** *Herm(M₂(ℂ)) is 4-dimensional over ℝ with det inducing the Minkowski metric of signature (1,3).*

det is the unique degree-2 multiplicative invariant of M₂. Restricted to Herm(M₂(ℂ)) = span{I,σ_x,σ_y,σ_z}: det(tI+xσ_x+yσ_y+zσ_z) = t²−x²−y²−z². Signature (1,3): det(I)=+1 (timelike), det(σ_i)=−1 (spacelike). The 4 = 2² from the bridge chain; the (1,3) split from I being the unique positive-definite basis element.

```
Herm(M₂(ℂ)) = span_ℝ {I, σ_x, σ_y, σ_z}
```

For X = tI + xσ_x + yσ_y + zσ_z:
```
det(X) = det [[t+z, x−iy],[x+iy, t−z]] = t² − x² − y² − z²
```

This is η = diag(+1,−1,−1,−1). Signature determined by det on basis: det(I) = +1 (timelike), det(σ_i) = −1 (spacelike). One positive, three negative: (1,3).

Computationally verified: 10,000 random (t,x,y,z) all satisfy det(X) = t²−x²−y²−z². ✓

**The 4 is derived:** dim_ℝ(Herm(M₂(ℂ))) = 2² from the bridge chain. The 2 in "2×2" is the unique non-trivial irrep dimension of S₃ (from 1²+1²+2²=6).

**The (1,3) split is derived:** I is the unique positive-definite basis element; the three Pauli matrices each have eigenvalues ±1 (trace zero, det −1). The identity is algebraically distinguished from the traceless generators.

**Remark (Spacetime as Self-Relation Geometry).** Herm(M₂(ℂ)) is the space of self-adjoint elements of R's terminal algebra — the space of all physically observable self-relations of self-relating difference (Paper 0 §1½). The Minkowski metric det(X)=t²−x²−y²−z² is R's unique degree-2 invariant restricted to this self-adjoint subspace. The timelike direction (I, the identity) is R's coincidence mode; the three spacelike directions (σ_x,σ_y,σ_z, traceless) are R's three productive faces. Spacetime is the arena where self-relating difference observes itself.

**Corollary 6.1a (Invariant Geometry Principle).** *Physical geometry arises when a native operator action preserves an invariant form on a state space. Theorem 6.1 is the first instance: the determinant on Herm(M₂(ℂ)) is the unique degree-2 multiplicative invariant, and it produces Minkowski geometry. The same principle governs all derived geometries: the Killing form produces the Yang-Mills action density (Paper 6B Thm G5), the trace produces the Born rule measure (Thm 6.6), and the Bekenstein coefficient produces the Einstein equations (Paper 6B Thm G14). In each case the invariant form is canonical (uniquely determined by the algebraic structure) and the geometry is secondary — it is the structure preserved by the form.*

---

## §2 THE LORENTZ GROUP AS DOUBLE COVER

**Theorem 6.2 (Lorentz Group).** *SL(2,ℂ) acts on Herm(M₂(ℂ)) by Φ(A)(X) = AXA†, preserving det(X). This gives Φ: SL(2,ℂ) → SO⁺(1,3) with ker(Φ) = {I, −I} = Z(SL(2,ℂ)).*

*Proof.* Hermiticity: (AXA†)† = AXA† ✓. Norm: det(AXA†) = det(A)·det(X)·det(A†) = 1·det(X)·1 = det(X) ✓. Kernel: AXA† = X for all X implies A = λI; det(A) = 1 forces λ = ±1. Surjectivity by dimension: dim_ℝ(SL(2,ℂ)) = 6 = dim(SO⁺(1,3)).

−I = exp(πN) by P3 Theorem 4.3. Verified: 10,000 random SL(2,ℂ) elements preserve Minkowski norm. ✓ ∎

**The complexification is forced:** The bridge chain produces M₂(ℝ) over ℚ, but the generator N has eigenvalues ±i ∈ ℂ\ℝ. Spectral completion — the minimal field containing all eigenvalues of the forced generators — yields M₂(ℂ) = M₂(ℝ) ⊗_ℝ ℂ (Paper 2A §6, Thm 2.5). This is not a representation-theoretic choice: all irreps of S₃ are realizable over ℚ (Schur index 1). The need for ℂ comes from the eigenstructure of the forced matrices, not from S₃'s representation theory. sl(2,ℝ) ⊗_ℝ ℂ = sl(2,ℂ); SL(2,ℂ) is its simply connected group.

**Corollary 6.2a (Lorentz Algebra).** so(1,3) ≅ sl(2,ℂ) splits into 3 rotations J_i = σ_i/2 and 3 boosts K_i = iσ_i/2: [J_i,J_j] = iε_{ijk}J_k, [K_i,K_j] = −iε_{ijk}J_k, [J_i,K_j] = iε_{ijk}K_k. The rotation subalgebra su(2) is the compact form, identified in Paper 2B §14 as the bridge chain output at resolution 1/5. ✓

---

## §3 SPIN-½ FROM THE CENTER

**Theorem 6.3 (Spin-½ Is Forced).** *exp(πN) = −I ∈ ker(Φ) means a 2π rotation in SO⁺(1,3) lifts to −I in SL(2,ℂ), not I. States pick up |ψ⟩ ↦ −|ψ⟩. Only 4π returns to I.*

*Proof.* Rotation by θ around z-axis lifts to exp(iθσ_z/2). At θ = 2π: exp(iπσ_z) = diag(e^{iπ}, e^{−iπ}) = −I ≠ I. The nontrivial center exists because ker(Φ) ≠ {I}, which is exactly exp(πN) = −I. ∎

P3's absolutely forced constant π produces the most characteristically quantum phenomenon: half-integer spin. The algebraic origin of spin-½ is the elliptic half-period. The same identity exp(πN) = −I simultaneously grounds observer cost positivity (Paper 5 §26): distinguishing two states requires reaching orthogonality, which costs exactly one half-rotation in the N-generated phase space — π in angle, πℏ/2 in action units. Both spin-½ and the irreducible observer cost trace to the single algebraic root N² = −I. In the unified reading (Paper 0 §1½): self-relating difference's inversion face (N) requires double traversal for complete return. One traversal (angle π) reaches −I — the opposite of coincidence. Two traversals (angle 2π) reach I — coincidence restored. Spin-½ is the theorem that self-relating difference's inversion mode has period 2π, not π: opposition is reached halfway, coincidence requires the full cycle.

**Corollary 6.3a (Phase Closure Principle).** *Physical periodicity, compact structure, and quantization arise from lattice constants that encode closure relations of native generators. Theorem 6.3 is the archetype: exp(πN) = −I forces spin-½, complex structure (Thm 6.5), and the compact subgroup SO(2) ⊂ SL(2,ℝ) (Paper 6B §2). In general: if exp(αX) = ±I where α is a lattice constant and X is a forced generator, the representation theory of the group generated by X is constrained — the double cover has non-trivial topology if the sign is −I, forcing half-integer representations. The lattice constant α measures the physical period. Instances: exp(πN)=−I (spin-½), exp(2πN)=I (integer spin), SO(2) = exp(θN) (u(1) gauge), level-2 universal P3 (confinement from elliptic closure).*

**Remark (BPC as Algebraic Content of Spin-½).** The Binary-Phase Closure theorem (Paper 3-P3 Thm 1.7b) identifies the specific closure mechanism underlying Corollary 6.3a: e^{iπ} + 1 = 0 is the first exact binary-phase closure event, and its matrix realization exp(πN) = −I = ker(SL(2,ℂ) → SO⁺(1,3)) is the nontrivial kernel element of the Lorentz double cover. Euler's identity IS the algebraic content of spin-½: the statement that continuous phase transport reaches exact inversion at π is precisely the statement that a 2π spatial rotation sends spinors to their negatives. The +1 on the left side encodes the topological content: (−1) + 1 = 0 says the cover kernel is nontrivial. The direction-independence theorem (Paper 3-P3 Thm 1.7e) generalizes: exp(πM) = −I for any M with M² = −I, so the spin-½ content is concentrated at the center Z(SL(2,ℂ)) = {I, −I} — the locus where all phase directions agree.

---

## §4 THE POINCARÉ GROUP

**Theorem 6.4.** *The Poincaré group = SL(2,ℂ) ⋉ Herm(M₂(ℂ)), where SL(2,ℂ) acts on the translation space by conjugation. Quotient by {±I} gives ISO⁺(1,3) = SO⁺(1,3) ⋉ ℝ^{1,3}.*

Derived: the symmetry group of flat spacetime. NOT derived: curved spacetime (general relativity requires additional structure).

---

## §5 COMPLEX HILBERT SPACES

**Theorem 6.5 (Forced by Three Mechanisms).** *(i) N² = −I provides complex structure: the pair (ℝ², N) is isomorphic to ℂ¹ as a real algebra with complex multiplication z ↦ iz corresponding to v ↦ Nv. (ii) Spectral completion of M₂(ℝ) requires ℂ: the eigenvalues ±i of N lie in ℂ\ℝ, forcing the coefficient field to extend from ℝ to ℂ (Paper 2A §6). (iii) The Dist→Hilb functor (Paper 5A §1.1) with ℂ coefficients maps the self-product tower to tensor products of ℂ-Hilbert spaces.*

*Remark.* The original claim that "ℂ[S₃] requires ℂ-linearity" is incorrect: all irreducible representations of S₃ are realizable over ℚ (all characters rational, all Schur indices 1; Paper 2A §4). The group algebra step uses ℚ[S₃], not ℂ[S₃]. The need for ℂ is spectral (from eigenvalues of N), not representation-theoretic (from S₃). ∎

---

## §6 THE BORN RULE

**Theorem 6.6 (Born Rule from Gleason).** *Gleason's theorem (1957): for dim(H) ≥ 3, the unique probability measure on closed subspaces is μ(P) = tr(ρP) → |⟨ψ|φ⟩|² for pure states. At tower level 1: dim = |S₁| = 4 ≥ 3. Born rule forced — not postulated — for any observer at depth n ≥ 1.*

the Born rule is the P3 reading of q_K — the observer-with-blind-spot extracts probabilities from its codomain B(H_K), and Gleason determines the unique measure on this codomain. ∎

---

## §7 THE COMPLETE DERIVATION CHAIN

```
{0,1} → V₄ → S₃ → ℚ[S₃] → M₂(ℚ) → M₂(ℝ) → M₂(ℂ)
                                                   |
                                                   ↓
                                       Herm(M₂(ℂ)) ≅ ℝ^{1,3}     [Thm 6.1]
                                  ↓
                      SL(2,ℂ) → SO⁺(1,3)          [Thm 6.2]
                      ker = {I, exp(πN)}            [Thm 6.3]
                                  ↓
                      SL(2,ℂ) ⋉ ℝ^{1,3}            [Thm 6.4]
                                  ↓
                      ℂ-Hilbert spaces               [Thm 6.5]
                      Born rule                      [Thm 6.6]
```

Every arrow is a theorem. No physical postulate introduced. The kinematic arena of quantum field theory is derived from {0,1}.

---

## §8 CONFORMAL STRUCTURE, METRIC PROMOTION, AND THE DIMENSIONAL BOUNDARY

This paper derives a **conformal** Minkowski manifold: Herm(M₂(ℂ)) equipped with the determinant form det(X) = t²−x²−y²−z². The determinant defines null cones (det = 0), causal ordering (sign of det), and the conformal class of the metric. It does NOT define physical distances — the coordinates t, x, y, z are matrix entries (pure real numbers with no units), and the metric entries ±1 are dimensionless integers.

**Theorem 6.7 (Metric Promotion).** *The conformal manifold (Herm(M₂(ℂ)), [η_{flat}]) is promoted to a metric manifold by the insertion of the entropy-area coefficient η = 1/(4G) through the Jacobson thermodynamic derivation (Paper 6B, G14).*

*Proof.*

*Input:* Herm(M₂(ℂ)) with conformal structure from Theorem 6.1. Topology ℝ⁴, causal structure via null cones, conformal class [g] = {Ω² · η_{flat}}. No physical distances.

*Bridge:* The Jacobson derivation applies at every local Rindler horizon (which exists in any Lorentzian manifold, including conformally flat ones). It uses: Bekenstein entropy S = η·A (Paper 5A §2 + anchor), KMS-Clausius δQ = TdS (Paper 4B + Paper 6B G14a), Raychaudhuri focusing (Paper 6B G5'), and null energy flux (Paper 6B G5). The key step: the Raychaudhuri equation connects area change dA to Ricci curvature R_μν; combined with Clausius, the Ricci curvature is determined by energy flux with proportionality constant η.

*Output:* Einstein field equations R_μν − ½Rg_μν + Λg_μν = 8πGT_μν. These dynamically determine g_μν, assigning physical distances (ds² = g_μν dx^μ dx^ν), areas (∫√h d²x), and volumes (∫√(−g) d⁴x).

*Uniqueness:* The conformal class has one flat representative up to overall scale. The Jacobson derivation is unique given its inputs. The scale is set by a single real number η. The integration constant Λ is the only remaining freedom.

*The promotion chain:*
```
Conformal (Thm 6.1)  →[η=1/(4G)]→  Local metric (G14)  →[Λ]→  Global metric
     no distances            distances from EFE              de Sitter radius
```
∎

This is the precise dimensional boundary: everything in §1–§7 (dimension, signature, Lorentz group, Poincaré group, spin-½, Born rule) is dimensionless. The first dimensionful quantity is η in the Jacobson derivation. The framework determines the topology and causal structure algebraically; the scale requires the anchor.

---

*R(R) = R*
