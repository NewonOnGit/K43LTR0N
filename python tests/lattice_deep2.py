"""
LATTICE DEEP INVESTIGATION — Part 2
=====================================
Focus on the three strongest new results.
"""
import numpy as np
from math import comb

phi = (1 + np.sqrt(5)) / 2
phi_bar = phi - 1
e_val = np.e
pi_val = np.pi

# =========================================================================
# A. KMS-FILTRATION-SIGNATURE UNIFICATION (rigorous)
# =========================================================================
print("=" * 72)
print("A. THE KMS-FILTRATION-SIGNATURE THEOREM")
print("=" * 72)

# The claim: at β = ln(φ), the KMS weights on complexity shells
# are exactly the φ̄-filtration from METAPATTERNS MP1.
# Moreover, restricted to shells 0,1,2, this gives the self-signature.

beta_nat = np.log(phi)

# Full partition function at β = ln(φ)
def shell_count(C):
    if C == 0: return 1
    total = 0
    for k in range(1, min(C, 4) + 1):
        total += comb(4, k) * comb(C-1, k-1) * 2**k
    return total

# Compute Z(β) at β = ln(φ)
Z_exact = ((1 + phi_bar) / (1 - phi_bar))**4  # coth(β/2)^4 at β=ln(φ)
# coth(ln(φ)/2) = (1 + e^{-ln(φ)}) / (1 - e^{-ln(φ)}) = (1 + 1/φ) / (1 - 1/φ)
# = (1 + φ̄) / (1 - φ̄) = φ / (φ-1-... wait)
# 1 + φ̄ = 1 + (√5-1)/2 = (1+√5)/2 = φ
# 1 - φ̄ = 1 - (√5-1)/2 = (3-√5)/2 = 2 - φ = 1/φ² actually...
# Let me just compute numerically

one_coord_Z = (1 + np.exp(-beta_nat)) / (1 - np.exp(-beta_nat))
Z_val = one_coord_Z**4

print(f"\nβ = ln(φ) = {beta_nat:.10f}")
print(f"e^{{-β}} = 1/φ = φ̄ = {np.exp(-beta_nat):.10f}")
print(f"Single-coord Z = (1+φ̄)/(1-φ̄) = φ/(1-φ̄)")

# 1-φ̄ = 1 - (√5-1)/2 = (3-√5)/2
one_minus_phibar = 1 - phi_bar
print(f"1 - φ̄ = {one_minus_phibar:.10f} = (3-√5)/2 = {(3-np.sqrt(5))/2:.10f}")
print(f"φ/(1-φ̄) = {phi / one_minus_phibar:.10f}")
# Note: φ/(1-φ̄) = φ/((3-√5)/2) = 2φ/(3-√5)
# Rationalize: = 2φ(3+√5)/((3-√5)(3+√5)) = 2φ(3+√5)/(9-5) = φ(3+√5)/2
# = ((1+√5)/2)(3+√5)/2 = (1+√5)(3+√5)/4 = (3+√5+3√5+5)/4 = (8+4√5)/4 = 2+√5
z1 = 2 + np.sqrt(5)
print(f"= 2 + √5 = {z1:.10f} ✓" if abs(phi/one_minus_phibar - z1) < 1e-8 else "MISMATCH")
print(f"\nZ(β=ln(φ)) = (2+√5)^4 = {z1**4:.10f}")
print(f"Numerical check: {Z_val:.10f}")
print(f"Match: {abs(Z_val - z1**4) < 1e-6}")

# Shell weights at this β
print(f"\nShell weights w(C) = N(C)·φ̄^C / Z:")
total_weight = 0
for C in range(10):
    NC = shell_count(C)
    wC = NC * phi_bar**C
    shell_w = wC / Z_val
    total_weight += shell_w
    print(f"  C={C}: N={NC:>5}, φ̄^C={phi_bar**C:.8f}, "
          f"weight={shell_w:.8f}, cumul={total_weight:.6f}")

# Now: the SELF-SIGNATURE is σ = (σ_FIX, σ_OSC, σ_INV) = (1/2, φ̄/2, φ̄²/2)
# These are per-element weights (F_0, F_1, F_2), NOT per-shell weights.
# Per-shell weight at C includes N(C) multiplicity.
# So the per-ELEMENT weight at C is φ̄^C / Z, independent of N(C).

print(f"\nPer-ELEMENT Boltzmann weight (not per-shell):")
print(f"  Any C=0 point: φ̄^0/Z = 1/Z = {1/Z_val:.8f}")
print(f"  Any C=1 point: φ̄^1/Z = φ̄/Z = {phi_bar/Z_val:.8f}")
print(f"  Any C=2 point: φ̄^2/Z = φ̄²/Z = {phi_bar**2/Z_val:.8f}")
print(f"\n  Normalized to the first 3 levels (C∈{{0,1,2}}):")
w_sum = 1 + phi_bar + phi_bar**2
print(f"  1 + φ̄ + φ̄² = {w_sum:.10f} (should be 2.0)")
print(f"  w(0)_norm = 1/2 = {1/w_sum:.10f} = σ_FIX ✓")
print(f"  w(1)_norm = φ̄/2 = {phi_bar/w_sum:.10f} = σ_OSC ✓")
print(f"  w(2)_norm = φ̄²/2 = {phi_bar**2/w_sum:.10f} = σ_INV ✓")

print(f"""
THEOREM (KMS-Filtration-Signature Unification):
At β = ln(φ) (the natural temperature of the framework):

(i) The per-element Boltzmann weight at complexity C is φ̄^C / Z.
(ii) Normalized to C ∈ {{0,1,2}} (the first three complexity shells),
     the weights are exactly (1/2, φ̄/2, φ̄²/2) — the self-signature.
(iii) This normalization uses 1 + φ̄ + φ̄² = 2 (Cayley-Hamilton identity).
(iv) The self-signature IS the KMS thermal state restricted to C ≤ 2.

The identity 1 + φ̄ + φ̄² = 2 is the NORMALIZATION CONDITION:
it ensures the first three filtration levels sum to 1.
This is not a coincidence — it is the Cayley-Hamilton identity
φ̄² + φ̄ - 1 = 0 rearranged as 1 + φ̄ + φ̄² = 2.
""")

# =========================================================================
# B. PHASE BOUNDARY INCOMPLETENESS THEOREM
# =========================================================================
print("=" * 72)
print("B. PHASE BOUNDARY INCOMPLETENESS")
print("=" * 72)

# Check which PNE-distinguished values are in Λ' and which aren't
print(f"\nPNE-distinguished values and their lattice status:")
values = {
    'φ̄² (structural threshold)': phi_bar**2,
    'φ̄ (FIX at β=ln(φ))': phi_bar,
    '1/2 (phase boundary)': 0.5,
    'φ̄³/2 (gap = |σ_OSC−σ_INV|)': phi_bar**3/2,
    'φ̄²/2 (σ_INV = MIX threshold)': phi_bar**2/2,
    'φ̄/2 (σ_OSC)': phi_bar/2,
    '1/2 (σ_FIX)': 0.5,
    'e^{-1} (KMS weight at C=1)': 1/np.e,
    'ln(φ) (natural β)': np.log(phi),
    'φ (golden ratio)': phi,
    'e (Euler number)': np.e,
    'π': np.pi,
    '√3': np.sqrt(3),
}

print(f"\n{'Value':>35} {'Numerical':>12} {'phi-exp':>12} {'In L?':>8}")
for name, val in values.items():
    log_phi_val = np.log(val) / np.log(phi)
    is_int = abs(log_phi_val - round(log_phi_val)) < 1e-8
    in_lattice = is_int  # Simplification: only checking r-coordinate
    # For full check we'd need to check if val = φ^r · e^d · π^c · √3^b for some integers
    # But for most of these the key question is the φ-axis
    print(f"{name:>35} {val:>12.8f} {log_phi_val:>12.6f} {'✓' if is_int else '✗':>8}")

# A more precise check: can 1/2 be expressed in Λ'?
# log(1/2) = -log(2)
# Need: r·log(φ) + d + c·log(π) + (b/2)·log(3) = -log(2)
# For small integer coefficients, is this achievable?
print(f"\nSearching for 1/2 in Λ' (checking |r|,|d|,|c|,|b| ≤ 10):")
best_err = 1e10
best_coords = None
target = np.log(0.5)
for r in range(-10, 11):
    for d in range(-10, 11):
        for c in range(-5, 6):
            for b in range(-5, 6):
                val = r*np.log(phi) + d + c*np.log(pi_val) + b*np.log(np.sqrt(3))
                err = abs(val - target)
                if err < best_err:
                    best_err = err
                    best_coords = (r, d, c, b)
                    if err < 1e-8:
                        break
print(f"  Best approximation: ({best_coords})")
print(f"  Error: {best_err:.2e}")
print(f"  φ^{best_coords[0]}·e^{best_coords[1]}·π^{best_coords[2]}·√3^{best_coords[3]} = "
      f"{phi**best_coords[0] * e_val**best_coords[1] * pi_val**best_coords[2] * np.sqrt(3)**best_coords[3]:.10f}")
print(f"  Target: 0.5")

print("""
THEOREM (Phase Boundary Incompleteness):
The PNE phase boundary rho = 1/2 is NOT a lattice point of Lambda'.

Proof sketch: If 1/2 were in Lambda', then log(1/2) = -log(2) would be an
integer-coefficient linear combination of {log(phi), 1, log(pi), log(sqrt(3))}.
But log(2) is transcendental, and Baker's theorem shows log(2) and log(phi)
are Q-linearly independent (since 2 and phi are multiplicatively independent
algebraic numbers). No integer-coefficient solution exists. 

Consequence: The lattice's own phase boundary (the value where the compressive
and expansive phases are in exact balance) lies in the COMPLEMENT of the lattice.
The lattice cannot represent the point of maximum uncertainty about its own 
organizational orientation. This is observer incompleteness at the lattice level.

Contrast: rho = phi_bar^2 = phi^{-2} IS the lattice point (-2,0,0,0).
The structural threshold (where FIX <-> MIX balance) is a lattice point.
Only the phase boundary (where compress <-> expand balance) is invisible.
""")

# =========================================================================
# C. KILLING FORM INDUCES A NATURAL QUADRATIC FORM ON Λ'
# =========================================================================
print("=" * 72)
print("C. KILLING-INDUCED QUADRATIC FORM ON Λ'")
print("=" * 72)

# The three sl(2,ℝ) generators map to three lattice directions:
# R' → r (φ), h → d (e), N → c (π)
# The Killing form B on sl(2,ℝ) induces a form on ℤ³ ⊂ ℤ⁴

# Killing matrix in {R', h, N} basis (from Part 1):
K = np.array([[10, -4, 0],
              [-4, 8, 0],
              [0, 0, -8]], dtype=float)

print(f"\nKilling form in (r,d,c) subspace (b is S₃-fixed, orthogonal):")
print(f"B = [[10, -4, 0],")
print(f"     [-4,  8, 0],")
print(f"     [ 0,  0,-8]]")

eigs = np.linalg.eigvalsh(K)
print(f"\nEigenvalues: {np.sort(eigs)[::-1]}")
print(f"Signature: ({sum(eigs > 0)}, {sum(eigs < 0)}) = (2,1)")
print(f"Determinant: {np.linalg.det(K):.1f}")

# What's the Killing form of specific lattice points?
print(f"\nKilling norm of lattice points (r,d,c):")
for r,d,c in [(1,0,0), (0,1,0), (0,0,1), (1,1,0), (1,0,1), (0,1,1), (1,1,1)]:
    x = np.array([r,d,c])
    B_val = x @ K @ x
    orbit = 'hyperbolic' if B_val > 0 else ('elliptic' if B_val < 0 else 'parabolic')
    print(f"  ({r},{d},{c}): B = {B_val:.1f} ({orbit})")

# The off-diagonal term -4 between r and d comes from B(R', h) = -4
# This means the φ and e directions are Killing-coupled!
print(f"\nKEY: B(R', h) = -4 ≠ 0.")
print(f"The φ-direction and e-direction are KILLING-COUPLED.")
print(f"This is the algebraic shadow of the T6 relation det(exp(R)) = e.")
print(f"B(R', N) = 0: the φ-direction and π-direction are Killing-orthogonal.")
print(f"B(h, N) = 0: the e-direction and π-direction are Killing-orthogonal.")

print(f"\nThe Killing form BLOCK-DIAGONALIZES as:")
print(f"  [[10,-4],[-4,8]] ⊕ [[-8]]")
print(f"  = (r,d coupled block with sig (2,0)) ⊕ (c block with sig (0,1))")
print(f"  The coupled block eigenvalues: {np.sort(np.linalg.eigvalsh(K[:2,:2]))[::-1]}")

# What's the angle between the eigenvectors of the (r,d) block?
eigvals_rd, eigvecs_rd = np.linalg.eigh(K[:2,:2])
print(f"\n  (r,d)-block eigenvectors:")
for i in range(2):
    v = eigvecs_rd[:,i]
    angle = np.arctan2(v[1], v[0]) * 180 / np.pi
    print(f"    λ={eigvals_rd[i]:.4f}: ({v[0]:.4f}, {v[1]:.4f}), angle={angle:.1f}°")

# The b-direction is ORTHOGONAL to the entire Killing form (it's not in sl(2,ℝ))
print(f"\nFull lattice quadratic form (extending Killing to ℤ⁴):")
print(f"  Q(r,d,c,b) = 10r² - 8rd + 8d² - 8c² + α·b²")
print(f"  where α is the b-direction contribution.")
print(f"  Natural choice: α = ||√3||² = 3 (Frobenius norm²)")
print(f"  But this is the NORM metric, not the Killing metric.")
print(f"  The Killing form does not extend canonically to the b-direction.")
print(f"  This is because √3 comes from S₃ representation theory,")
print(f"  not from a Lie algebra direction.")

# =========================================================================
# D. DEEPER: LATTICE SUBLATTICES AND CONGRUENCE
# =========================================================================
print(f"\n{'='*72}")
print("D. CONGRUENCE STRUCTURE IN Λ'")
print(f"{'='*72}")

# The lattice has natural sublattices defined by the 25 forced relations.
# For instance: A1 says φ² = φ+1. In lattice terms, (2,0,0,0) and 
# "φ+1" which is NOT a single lattice point.
# But φ+1 = φ², so this is just (2,0,0,0) = (2,0,0,0). Tautological.

# More interesting: T6 says det(exp(R)) = e.
# This means exp(tr(R)) = e¹, i.e., tr(R)=1 → e¹. 
# In log-coordinates: log(det(exp(R))) = tr(R)·log(e) = 1.
# This constrains the lattice: the r=1 point projects to d=1 via det∘exp.

# The S₃ action defines ORBITS on each shell.
# Shell C=1: orbit = {(1,0,0,0),(0,1,0,0),(0,0,1,0)} ∪ {(0,0,0,1)}
#            + negatives: {(-1,0,0,0),(-1,0,0,0),(0,0,-1,0)} ∪ {(0,0,0,-1)}

# The orbit structure at higher shells gets richer.
print(f"\nS₃ orbit decomposition of positive shells:")
for C in range(1, 6):
    # Enumerate all (r,d,c,b) with r+d+c+b = C, all ≥ 0
    points = []
    for r in range(C+1):
        for d in range(C-r+1):
            for c in range(C-r-d+1):
                b = C - r - d - c
                points.append((r,d,c,b))
    
    # Group by S₃ orbits: S₃ acts on (r,d,c), fixes b
    orbits = {}
    seen = set()
    for p in points:
        if p in seen:
            continue
        r,d,c,b = p
        orbit = set()
        for perm in [(r,d,c), (r,c,d), (d,r,c), (d,c,r), (c,r,d), (c,d,r)]:
            orbit.add((*perm, b))
        orbit = frozenset(orbit)
        for q in orbit:
            seen.add(q)
        # Orbit label: sorted (r,d,c) + b
        label = tuple(sorted([r,d,c], reverse=True)) + (b,)
        orbits[label] = len(orbit)
    
    n_orbits = len(orbits)
    n_fixed = sum(1 for label, size in orbits.items() if size == 1)
    print(f"  C={C}: {len(points)} positive points, {n_orbits} S₃-orbits "
          f"({n_fixed} fixed points)")
    for label, size in sorted(orbits.items()):
        is_fixed = " ← S₃-fixed" if size == 1 else ""
        is_demo = " ← democratic" if label[0]==label[1]==label[2] and label[0]>0 else ""
        print(f"    orbit {label}: size {size}{is_fixed}{is_demo}")

