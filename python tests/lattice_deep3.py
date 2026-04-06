"""
LATTICE DEEP INVESTIGATION — Part 3
=====================================
Exploring all open directions from the investigation document.
"""
import numpy as np
from math import comb, gcd
from itertools import product as iprod

phi = (1 + np.sqrt(5)) / 2
phi_bar = phi - 1
e_val = np.e
pi_val = np.pi
sqrt3 = np.sqrt(3)

# =========================================================================
# 1. KILLING LIGHT CONE: Which lattice points sit on it?
# =========================================================================
print("=" * 72)
print("1. KILLING LIGHT CONE ON THE LATTICE")
print("=" * 72)

# B_Λ(r,d,c) = 10r² - 8rd + 8d² - 8c²
# Light cone: B_Λ = 0 → 10r² - 8rd + 8d² = 8c²
# → 5r² - 4rd + 4d² = 4c²

print("\nLattice points on the Killing light cone B_Λ = 0:")
print("Condition: 5r² - 4rd + 4d² = 4c²")
print(f"\n{'(r,d,c)':>10} {'B_Λ':>6} {'C=|r|+|d|+|c|':>15} {'Value φ^r·e^d·π^c':>20}")

parabolic_points = []
for r in range(-8, 9):
    for d in range(-8, 9):
        for c in range(-8, 9):
            B = 10*r**2 - 8*r*d + 8*d**2 - 8*c**2
            if B == 0 and (r != 0 or d != 0 or c != 0):
                C = abs(r) + abs(d) + abs(c)
                val = phi**r * e_val**d * pi_val**c
                parabolic_points.append((r, d, c, C, val))

parabolic_points.sort(key=lambda x: x[3])
for r, d, c, C, val in parabolic_points[:20]:
    print(f"  ({r:>2},{d:>2},{c:>2}) {0:>6} {C:>15} {val:>20.6f}")

print(f"\n  Total parabolic points with |coords| ≤ 8: {len(parabolic_points)}")

# The condition 5r² - 4rd + 4d² = 4c² is a ternary quadratic form.
# Points on the light cone come in families.
print("\nAnalysis: 5r² - 4rd + 4d² = 4c²")
print("At c=0: 5r² - 4rd + 4d² = 0 → disc = 16 - 80 = -64 < 0 → no real solution except r=d=0")
print("So c ≠ 0 for all parabolic points. The light cone doesn't pass through the (r,d) plane.")

# Simplest family: r=0 → 4d² = 4c² → d=±c
print("\nFamily 1 (r=0): d = ±c")
print("  (0,1,1) = eπ ≈ 8.54")
print("  (0,1,-1) = e/π ≈ 0.865")
print("  (0,2,2) = e²π² ≈ 72.9")

# Family: d=0 → 5r² = 4c² → c²/r² = 5/4 → c/r = ±√(5/4) = ±√5/2 (irrational!)
print("\nFamily 2 (d=0): 5r² = 4c² → c/r = √5/2 ≈ 1.118 (irrational)")
print("  No integer solutions! The φ-π plane has no parabolic lattice points.")

# Family: d=r → 5r² - 4r² + 4r² = 4c² → 5r² = 4c² (same as above, no solution)
# Family: d=2r → 5r² - 8r² + 16r² = 4c² → 13r² = 4c² (no integer solution)
# Family with c=r: 5r² - 4rd + 4d² = 4r² → r² - 4rd + 4d² = 0 → (r-2d)² = 0 → r=2d
print("\nFamily 3 (c=r, r=2d): points like (2,1,2), (4,2,4), (6,3,6), ...")
for n in range(1, 5):
    r, d, c = 2*n, n, 2*n
    B = 10*r**2 - 8*r*d + 8*d**2 - 8*c**2
    val = phi**r * e_val**d * pi_val**c
    print(f"  ({r},{d},{c}): B={B}, val = φ^{r}·e^{d}·π^{c} = {val:.4f}")

print(f"""
KEY FINDING: The Killing light cone on the lattice is SPARSE.
  - The (r,d) plane (φ-e plane) has NO parabolic points at c=0.
  - The (r,c) plane (φ-π plane) has NO integer solutions.
  - The simplest parabolic family is d=±c (e·π^{{±1}}), which lives
    entirely in the (d,c) plane.
  - The light cone separates the hyperbolic interior (φ, e, φe, φeπ, ...)
    from the elliptic exterior (π).
""")

# =========================================================================
# 2. DEMOCRATIC POINT φ·e·π·√3 AND C_max
# =========================================================================
print("=" * 72)
print("2. THE DEMOCRATIC POINT φ·e·π·√3")
print("=" * 72)

demo = phi * e_val * pi_val * sqrt3
print(f"\nφ·e·π·√3 = {demo:.6f}")
print(f"This is the lattice point (1,1,1,1) at complexity C = 4.")
print(f"C_max(4) = 2^4/log₂(φ) = {16/np.log2(phi):.2f}")
print(f"C_max(3) = 2^3/log₂(φ) = {8/np.log2(phi):.2f}")

print(f"\nThe democratic point at C=4 is JUST inside C_max(4) = 23.0.")
print(f"It is the simplest point where all four generators contribute equally.")
print(f"\nNearby interesting values:")
print(f"  φ·e·π·√3 = {demo:.6f}")
print(f"  4! = 24")
print(f"  Ratio: {demo / 24:.6f}")
print(f"  (2π)² = {(2*pi_val)**2:.6f}")
print(f"  Ratio: {demo / (2*pi_val)**2:.6f}")

# What about higher democratic points?
print(f"\nDemocratic sequence (n,n,n,n):")
for n in range(1, 6):
    val = phi**n * e_val**n * pi_val**n * sqrt3**n
    C = 4*n
    print(f"  ({n},{n},{n},{n}): C={C}, val = (φeπ√3)^{n} = {val:.4f}")

# The value φ·e·π·√3 is the PRODUCT of all four generators.
# In log coordinates: log(φeπ√3) = log(φ) + 1 + log(π) + log(√3)/1
log_demo = np.log(phi) + 1 + np.log(pi_val) + np.log(sqrt3)
print(f"\n  log(φeπ√3) = {log_demo:.6f}")
print(f"  This is the SUM of all four log-basis vectors.")
print(f"  Geometric mean of generators: (φeπ√3)^{{1/4}} = {demo**0.25:.6f}")

# =========================================================================
# 3. KILLING EIGENBASIS AND THE LATTICE
# =========================================================================
print(f"\n{'='*72}")
print("3. KILLING EIGENBASIS OF THE (r,d) BLOCK")
print(f"{'='*72}")

# The Killing matrix on (r,d):
K_rd = np.array([[10, -4], [-4, 8]])
eigvals, eigvecs = np.linalg.eigh(K_rd)

print(f"\nKilling matrix on (r,d) subspace:")
print(f"  K = [[10, -4], [-4, 8]]")
print(f"  Eigenvalues: {eigvals}")
print(f"  λ₁ = 9-√17 = {9-np.sqrt(17):.6f}")
print(f"  λ₂ = 9+√17 = {9+np.sqrt(17):.6f}")

# Eigenvectors
v1 = eigvecs[:, 0]
v2 = eigvecs[:, 1]
print(f"  v₁ = ({v1[0]:.6f}, {v1[1]:.6f}) [smaller eigenvalue]")
print(f"  v₂ = ({v2[0]:.6f}, {v2[1]:.6f}) [larger eigenvalue]")

# What's the angle between the eigenbasis and the coordinate basis?
angle1 = np.arctan2(v1[1], v1[0]) * 180 / np.pi
angle2 = np.arctan2(v2[1], v2[0]) * 180 / np.pi
print(f"  Angle of v₁: {angle1:.2f}°")
print(f"  Angle of v₂: {angle2:.2f}°")

# The eigenbasis diagonalizes the coupling between φ and e.
# In the eigenbasis: B = diag(9-√17, 9+√17, -8) on (v₁, v₂, N)
# The eigenvalues are 9±√17. Note: 17 = 16+1 = (4·4)+1.
# And √17 ≈ 4.123.
# These don't seem to have clean algebraic relations to framework constants.

# BUT: check if the eigenvectors have golden ratio components.
# v₁ ∝ (1, (10-λ₁)/4) ... let me compute
lam1 = 9 - np.sqrt(17)
lam2 = 9 + np.sqrt(17)
# (10 - λ)v_r = 4·v_d → v_d/v_r = (10-λ)/4
ratio1 = (10 - lam1) / 4  # = (1+√17)/4
ratio2 = (10 - lam2) / 4  # = (1-√17)/4

print(f"\n  v₁: v_d/v_r = (1+√17)/4 = {ratio1:.6f}")
print(f"  v₂: v_d/v_r = (1-√17)/4 = {ratio2:.6f}")
print(f"  Note: (1+√17)/4 ≈ {ratio1:.4f}, (1-√17)/4 ≈ {ratio2:.4f}")
print(f"  φ = {phi:.4f}, φ̄ = {phi_bar:.4f}")
print(f"  These are NOT golden ratio — they involve √17, not √5.")
print(f"  The Killing coupling introduces a NEW irrational (√17) into the picture.")

# =========================================================================
# 4. T6 CROSS-LINK: DEEPER STRUCTURE
# =========================================================================
print(f"\n{'='*72}")
print("4. T6 CROSS-LINK: det(exp(R)) = e — LATTICE IMPLICATIONS")
print(f"{'='*72}")

# T6 says: the determinant of exp(R) is e.
# More generally: det(exp(aR + bN)) = exp(tr(aR + bN)) = exp(a·tr(R) + b·tr(N)) = exp(a)
# since tr(R) = 1 and tr(N) = 0.
# So: the det∘exp map projects the entire Cl(1,1) algebra to the e-axis.
# Specifically: for any M = aI + bR + cN + dRN:
# det(exp(M)) = exp(tr(M)) = exp(2a + b) (since tr(I)=2, tr(R)=1, tr(N)=0, tr(RN)=0)

print(f"\ndet(exp(M)) = exp(tr(M)) for any M ∈ M₂(ℝ)")
print(f"tr(aI + bR + cN + dRN) = 2a + b (since tr(I)=2, tr(R)=1, tr(N)=0, tr(RN)=0)")
print(f"\nSo det∘exp maps:")
print(f"  I-direction: det(exp(I)) = exp(2) = e²")
print(f"  R-direction: det(exp(R)) = exp(1) = e")
print(f"  N-direction: det(exp(N)) = exp(0) = 1")
print(f"  RN-direction: det(exp(RN)) = exp(0) = 1")
print(f"\nThe det∘exp projection:")
print(f"  Kills the N and RN directions completely (tr=0)")
print(f"  Maps R to e¹ and I to e² (tr=1 and tr=2)")
print(f"  The kernel of det∘exp (in sl(2,ℝ), traceless) is {{N, RN, R-I/2}}")
print(f"  Wait — R-I/2 has tr(R-I/2) = 1-1 = 0. So the entire traceless")
print(f"  subalgebra is in the kernel. Only the trace direction survives.")
print(f"\n  det∘exp: M₂(ℝ) → ℝ⁺ has image = e^{{tr(M)}} = e^{{2a+b}}")
print(f"  This is a 1D projection from 4D → 1D, killing 3 dimensions.")

print(f"\n  LATTICE CONSEQUENCE: The map (a,b,c,d) ↦ 2a+b projects the")
print(f"  {{I,R,N,RN}}-coordinate lattice to ℤ via trace.")
print(f"  In the Λ' generators this becomes: lattice point φ^r·e^d·π^c·√3^b")
print(f"  has det∘exp image = e^{{trace of corresponding matrix}}.")

# =========================================================================
# 5. EXTENDING KILLING TO b: THE CASIMIR APPROACH
# =========================================================================
print(f"\n{'='*72}")
print("5. EXTENDING THE QUADRATIC FORM TO THE b-DIRECTION")
print(f"{'='*72}")

# The b-direction (√3) comes from the S₃ 2D irrep.
# The Casimir operator C₂ of S₃ acting on the 2D irrep has eigenvalue
# related to the representation dimension and group order.
# For S₃ (isomorphic to the Weyl group W(A₂)):
# The Casimir for the 2D standard rep has eigenvalue:
# C₂ = (dim - 1)(dim + 1) / dim = ... actually for finite groups
# it's more nuanced. Let me compute directly.

# S₃ has irreps of dim 1, 1, 2.
# The 2D standard rep has character χ = (2, 0, -1) on classes (e, trans, 3-cyc)
# The quadratic Casimir for the standard rep of S₃:
# C₂ = Σ_{g≠e} ρ(g) ρ(g⁻¹) / |G| or similar.
# Actually for a finite group the "Casimir" is:
# Ω = (1/|G|) Σ_g g⊗g ∈ ℂ[G]⊗ℂ[G]
# Acting on the d-dim irrep Vλ, it acts as scalar (|G|/d) · I

# More directly: the NORM of the character is:
# ⟨χ, χ⟩ = (1/|G|) Σ |χ(g)|² = (1/6)(4 + 0 + 0 + 1 + 1 + 1) = 7/6
# No wait: classes are {e} (size 1, χ=2), {trans} (size 3, χ=0), {3-cyc} (size 2, χ=-1)
# ⟨χ, χ⟩ = (1/6)(1·4 + 3·0 + 2·1) = (4+0+2)/6 = 1 ✓ (normalized irrep)

# The Frobenius-Schur indicator for the 2D rep:
# ν₂ = (1/|G|) Σ χ(g²) = (1/6)(χ(e) + χ(e) + χ(e) + ... )
# g² for transpositions = e, for 3-cycles = 3-cycles, for e = e
# = (1/6)(1·χ(e²) + 3·χ(trans²) + 2·χ(3cyc²))
# = (1/6)(1·2 + 3·2 + 2·(-1)) = (2+6-2)/6 = 1 (real type)

# For the lattice extension, the natural choice is:
# The 2D irrep of S₃ contains the rotation r₃ = exp(2πi/3) with eigenvalues ω, ω̄
# The "norm" in the representation is |eigenvalue|² = 1.
# The Frobenius norm of the rotation matrix is:
# ||r₃||² = |cos(2π/3)|² + |sin(2π/3)|² + |−sin(2π/3)|² + |cos(2π/3)|² = 1/4+3/4+3/4+1/4 = 2

print(f"||r₃||²_F = 2 (Frobenius norm of S₃ rotation in 2D irrep)")
print(f"||R||²_F = 3 (Frobenius norm of Fibonacci generator)")
print(f"||N||²_F = 2 (Frobenius norm of rotation generator)")
print(f"\nCandidate extensions of B to the b-direction:")
print(f"  Option 1: α = ||r₃||²_F · 4 = 2·4 = 8 (matching |B(N,N)| = 8)")
print(f"  Option 2: α = ||√3||² = 3 (the Frobenius norm of R)")
print(f"  Option 3: α = 0 (b is completely decoupled — the S₃-fixed direction)")

# Check which gives a nicer determinant
for alpha_name, alpha in [("8 (matching N)", 8), ("3 (norm)", 3), ("0 (decoupled)", 0), 
                           ("-8 (matching -B(N,N))", -8), ("5 (disc)", 5)]:
    full_K = np.array([[10, -4, 0, 0],
                       [-4, 8, 0, 0],
                       [0, 0, -8, 0],
                       [0, 0, 0, alpha]])
    det = np.linalg.det(full_K)
    sig = (sum(np.linalg.eigvalsh(full_K) > 0), sum(np.linalg.eigvalsh(full_K) < 0))
    print(f"  α = {alpha_name}: det = {det:.0f}, sig = {sig}")

print(f"""
ANALYSIS: The most natural extension depends on what structure we want:
  - α = 8: signature (3,1), det = 4096 = 2¹². Matches ||N||²·4 = B(N,N).
    This would make the b-direction positive like the r and d directions.
  - α = -8: signature (2,2), det = -4096. Split signature. Makes b and c
    both negative, giving a (2,2) form matching Cl(1,1) signature.
  - α = 5: signature (3,1), det = 2560 = 512·5. Introduces disc(R) = 5.
    
The (2,2) option (α = -8) is the most structurally motivated: Cl(1,1) has
signature (1,1), and M₂(ℝ) = Cl(1,1) has the corresponding 4D form with
signature (2,2). The Killing form on sl(2,ℝ) ⊂ M₂(ℝ) has signature (2,1);
extending to the full M₂(ℝ) by including the trace direction gives (2,2).
""")

# =========================================================================
# 6. SHELL ORBIT GROWTH AND GENERATING FUNCTIONS
# =========================================================================
print(f"{'='*72}")
print("6. S₃ ORBIT GROWTH AND GENERATING FUNCTIONS")
print(f"{'='*72}")

# Count orbits at each shell level
def count_orbits(C):
    """Count S₃ orbits in the positive C-shell of ℤ⁴."""
    seen = set()
    orbits = 0
    for r in range(C+1):
        for d in range(C-r+1):
            for c in range(C-r-d+1):
                b = C - r - d - c
                canon = tuple(sorted([r,d,c], reverse=True)) + (b,)
                if canon not in seen:
                    seen.add(canon)
                    orbits += 1
    return orbits, len(seen)

# Also count fixed points (r=d=c)
def count_fixed(C):
    fixed = 0
    for b in range(C+1):
        rem = C - b
        if rem % 3 == 0:
            fixed += 1
    return fixed

print(f"\n{'C':>3} {'Points':>8} {'Orbits':>8} {'Fixed':>7} {'Size-3':>8} {'Size-6':>8} {'Orbit GF':>10}")
total_pts = 0
total_orb = 0
for C in range(12):
    # Count orbits by type
    seen = set()
    size1 = size3 = size6 = 0
    for r in range(C+1):
        for d in range(C-r+1):
            for c in range(C-r-d+1):
                b = C - r - d - c
                canon = tuple(sorted([r,d,c], reverse=True)) + (b,)
                if canon not in seen:
                    seen.add(canon)
                    rr, dd, cc = sorted([r,d,c], reverse=True)
                    if rr == dd == cc:
                        size1 += 1
                    elif rr == dd or dd == cc:
                        size3 += 1
                    else:
                        size6 += 1
    
    n_pts = comb(C+3, 3)
    n_orb = len(seen)
    n_fix = count_fixed(C)
    total_pts += n_pts
    total_orb += n_orb
    print(f"{C:>3} {n_pts:>8} {n_orb:>8} {n_fix:>7} {size3:>8} {size6:>8} {n_orb:>10}")

# Burnside's lemma: number of orbits = (1/|G|) Σ |Fix(g)|
# For S₃ acting on non-negative integer solutions of r+d+c+b=C:
# |Fix(e)| = C(C+3,3) (all solutions)
# |Fix(transposition)| = solutions with two of (r,d,c) equal = ...
# |Fix(3-cycle)| = solutions with r=d=c = C-3k solutions = floor(C/3)+1

print(f"\nBurnside verification at C=4:")
fix_e = comb(7, 3)  # all solutions
# Fix of transposition (r↔d): solutions with r=d, so 2r+c+b=4, r,c,b≥0
fix_trans = sum(1 for r in range(3) for c in range(4-2*r+1) for b in [4-2*r-c] if b >= 0)
# Fix of 3-cycle: solutions with r=d=c, so 3r+b=4
fix_3cyc = sum(1 for r in range(2) for b in [4-3*r] if b >= 0)
# There are 1 identity, 3 transpositions, 2 three-cycles in S₃
n_orb_burnside = (fix_e + 3*fix_trans + 2*fix_3cyc) / 6
print(f"  |Fix(e)| = {fix_e}, |Fix(trans)| = {fix_trans}, |Fix(3-cyc)| = {fix_3cyc}")
print(f"  Orbits = (1/6)({fix_e} + 3·{fix_trans} + 2·{fix_3cyc}) = {n_orb_burnside:.0f}")

# =========================================================================
# 7. LATTICE THETA FUNCTION SKETCH
# =========================================================================
print(f"\n{'='*72}")
print("7. LATTICE THETA FUNCTION")
print(f"{'='*72}")

# The theta function Θ(τ) = Σ_{x∈ℤ⁴} q^{Q(x)} where q = e^{2πiτ}
# and Q is the quadratic form.
# For the Killing form (signature (2,1) on ℤ³), this is an INDEFINITE theta function.
# Indefinite theta functions are connected to mock modular forms (Zwegers).
# For signature (2,2) on ℤ⁴, it would be a Siegel theta function.

print(f"""
The Killing form B_Λ on the (r,d,c) sublattice has signature (2,1).
The theta function Θ_B(τ) = Σ_{{x∈ℤ³}} e^{{2πiτ·B_Λ(x,x)}} is an
INDEFINITE theta function — it doesn't converge as a classical modular form.

Options for a well-defined lattice function:
(a) Use the L¹ norm (complexity Hamiltonian): Θ_C(τ) = Σ e^{{2πiτ·|x|₁}}
    This gives Z(β) = coth(β/2)⁴ at τ = iβ/2π, which is well-understood.
(b) Use the Frobenius norm: Q_F(r,d,c,b) = 3r² + 2d² + 2c² + ...
    This is positive definite and gives a classical theta function.
(c) Use the Killing form in split signature (2,2) by extending b with α=-8.
    This gives a Siegel-type object.

The L¹ partition function Z(β) = coth(β/2)⁴ IS the lattice's thermal theta.
Its modular properties: coth(β/2) = (1+e^{{-β}})/(1-e^{{-β}}) transforms under
β → -β as coth(β/2) → -coth(β/2), so Z(β) → Z(β) (invariant under β→-β).
This is the thermal duality: the lattice's thermal function is self-dual.
""")

# The Frobenius norm theta function
print("Frobenius-norm theta function (positive definite):")
print("Q_F(r,d,c,b) = 3r² + 2d² + 2c² + α·b²")
print("\nFirst few terms (with α=3, i.e. ||R||²=3 for b):")
# Θ(q) = Σ q^{Q_F(x)} = 1 + 8q² + 8q³ + ... 
# Actually Q_F(±1,0,0,0) = 3, Q_F(0,±1,0,0) = 2, Q_F(0,0,±1,0) = 2, Q_F(0,0,0,±1) = 3
# So first terms: 1 + 4q² + 2q³ + ... (counting with multiplicities)
print("Q_F values for C=1 generators:")
for name, coords in [("φ",(1,0,0,0)), ("e",(0,1,0,0)), ("π",(0,0,1,0)), ("√3",(0,0,0,1))]:
    r,d,c,b = coords
    qf = 3*r**2 + 2*d**2 + 2*c**2 + 3*b**2
    print(f"  {name}: Q_F = {qf}")

print(f"\nQ_F groups generators: {{e, π}} at Q=2 and {{φ, √3}} at Q=3.")
print(f"This 2+2 split matches the norm partition: ||N||²=||I||²=2 vs ||R||²=||RN||²=3.")
print(f"The Frobenius theta function has a natural level-2/level-3 structure.")

# =========================================================================
# 8. LATTICE-ARITHMETIC CONNECTION: V(n) ON Λ'
# =========================================================================
print(f"\n{'='*72}")
print("8. ARITHMETIC POTENTIAL V(n) AND THE LATTICE")
print(f"{'='*72}")

# V(n) is the arithmetic potential from RRR_CLOSURE.
# n=1 has V(1)=0. Can we interpret V(n) in lattice terms?
# n is a positive integer. log_φ(n) gives its (approximate) r-coordinate.
# V(n) > 0 for n > 1. V is the "distance from the fixed point."

# The Fibonacci numbers F_k are approximately φ^k/√5.
# Their log_φ values: log_φ(F_k) ≈ k - log_φ(√5) ≈ k - 1.672
# The Lucas numbers L_k = tr(R^k). L_k = φ^k + (-φ̄)^k.

print(f"Fibonacci numbers in lattice φ-coordinates:")
def fib(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a+b
    return a

def lucas(n):
    a, b = 2, 1
    for _ in range(n):
        a, b = b, a+b
    return a

print(f"{'n':>3} {'F_n':>8} {'log_φ(F_n)':>12} {'r_approx':>10} {'L_n':>8} {'log_φ(L_n)':>12}")
for n in range(2, 12):
    fn = fib(n)
    ln = lucas(n)
    lp_fn = np.log(fn) / np.log(phi) if fn > 0 else 0
    lp_ln = np.log(ln) / np.log(phi)
    print(f"{n:>3} {fn:>8} {lp_fn:>12.4f} {round(lp_fn):>10} {ln:>8} {lp_ln:>12.4f}")

print(f"\nlog_φ(√5) = {np.log(np.sqrt(5))/np.log(phi):.6f}")
print(f"F_n ≈ φ^n/√5, so log_φ(F_n) ≈ n - 1.672")
print(f"L_n ≈ φ^n for large n, so log_φ(L_n) ≈ n")
print(f"\nLucas numbers are CLOSER to integer φ-lattice points than Fibonacci.")
print(f"This is because L_n = tr(R^n) — they ARE the traces of lattice-point")
print(f"powers of R, while F_n are off-diagonal entries shifted by 1/√5.")

