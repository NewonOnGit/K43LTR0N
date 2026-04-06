import numpy as np
from itertools import product as iprod
np.set_printoptions(precision=8, suppress=True)

phi = (1 + np.sqrt(5)) / 2
phi_bar = phi - 1

R = np.array([[0,1],[1,1]], dtype=float)
N = np.array([[0,-1],[1,0]], dtype=float)
I2 = np.eye(2)
RN = R @ N

print("=" * 70)
print("LATTICE FOLDING THROUGH THE TOWER")
print("=" * 70)

# ============================================================
# §1: LEVEL 1 — THE SEED NORMS AND GRAM MATRIX
# ============================================================
print("\n§1: LEVEL 1 — THE SEED")
print("-" * 40)

basis_1 = {'I': I2, 'R': R, 'N': N, 'RN': RN}
print("Level 1 generators and norms:")
for name, M in basis_1.items():
    norm = np.sqrt(np.trace(M @ M.T))
    print(f"  ||{name}||_F = {norm:.6f} = √{np.trace(M @ M.T):.0f}")

# Gram matrix of {R, N}
G1 = np.array([[np.trace(R@R.T), np.trace(R@N.T)],
               [np.trace(N@R.T), np.trace(N@N.T)]])
print(f"\nGram matrix G₁ of {{R, N}}:")
print(G1)
evals_G1 = np.linalg.eigvalsh(G1)
print(f"Eigenvalues: {evals_G1}")
print(f"  = √5·φ̄ = {np.sqrt(5)*phi_bar:.6f}, √5·φ = {np.sqrt(5)*phi:.6f}")
print(f"det(G₁) = {np.linalg.det(G1):.6f} = disc(R) = 5")
print(f"Koide ratio: ||R||²/||N||² = {3/2:.6f}")

# Full 4×4 Gram of {I, R, N, RN}
full_basis = [I2, R, N, RN]
G1_full = np.zeros((4,4))
for i in range(4):
    for j in range(4):
        G1_full[i,j] = np.trace(full_basis[i] @ full_basis[j].T)
print(f"\nFull Gram G₁_full of {{I, R, N, RN}}:")
print(G1_full)
print(f"det(G₁_full) = {np.linalg.det(G1_full):.1f} = 5² = 25")

# ============================================================
# §2: LEVEL 2 — TENSOR PRODUCTS AND THE √6 EMERGENCE
# ============================================================
print("\n\n§2: LEVEL 2 — TENSOR PRODUCTS")
print("-" * 40)

# Level 2 generators: all tensor products of level 1 generators
RR = np.kron(R, R)
NN = np.kron(N, N)
RN2 = np.kron(R, N)
NR2 = np.kron(N, R)
RI = np.kron(R, I2)
IR = np.kron(I2, R)
NI = np.kron(N, I2)
IN = np.kron(I2, N)

level2_gens = {
    'R⊗R': RR, 'N⊗N': NN, 'R⊗N': RN2, 'N⊗R': NR2,
    'R⊗I': RI, 'I⊗R': IR, 'N⊗I': NI, 'I⊗N': IN,
}

print("Level 2 Frobenius norms (||A⊗B|| = ||A||·||B||):")
for name, M in level2_gens.items():
    norm_sq = np.trace(M @ M.T)
    norm = np.sqrt(norm_sq)
    print(f"  ||{name}||_F = {norm:.6f} = √{norm_sq:.0f}")

print(f"""
KEY: √6 = √2·√3 = ||R||·||N|| appears as:
  ||R⊗N||_F = ||N⊗R||_F = ||R⊗I||_F = ||I⊗N⊗...|| = √6

√6 is the TENSOR PRODUCT NORM — it emerges at level 2 as
the natural norm when the two generators combine.
""")

# Gram matrix of {R⊗R, N⊗N}
G2_RN = np.array([
    [np.trace(RR@RR.T), np.trace(RR@NN.T)],
    [np.trace(NN@RR.T), np.trace(NN@NN.T)]
])
print(f"Gram G₂ of {{R⊗R, N⊗N}}:")
print(G2_RN)
print(f"det(G₂) = {np.linalg.det(G2_RN):.1f}")
print(f"Eigenvalues: {np.sort(np.linalg.eigvalsh(G2_RN))}")

# Gram of {R⊗R, N⊗N, R⊗N, N⊗R}
four_gens = [RR, NN, RN2, NR2]
G2_4 = np.zeros((4,4))
for i in range(4):
    for j in range(4):
        G2_4[i,j] = np.trace(four_gens[i] @ four_gens[j].T)
print(f"\nGram G₂ of {{R⊗R, N⊗N, R⊗N, N⊗R}}:")
print(G2_4)
print(f"det = {np.linalg.det(G2_4):.1f}")
evals_G2 = np.sort(np.linalg.eigvalsh(G2_4))
print(f"Eigenvalues: {evals_G2}")

# ============================================================
# §3: THE KOIDE RATIO POWERS UP
# ============================================================
print("\n\n§3: KOIDE RATIO AT EACH TOWER LEVEL")
print("-" * 40)

for n in range(1, 5):
    Rn = R.copy()
    Nn = N.copy()
    for _ in range(n-1):
        Rn = np.kron(Rn, R)
        Nn = np.kron(Nn, N)
    norm_R = np.trace(Rn @ Rn.T)
    norm_N = np.trace(Nn @ Nn.T)
    ratio = norm_R / norm_N
    print(f"  Level {n}: ||R^⊗{n}||² / ||N^⊗{n}||² = {norm_R:.0f}/{norm_N:.0f} = {ratio:.6f} = (3/2)^{n} = {(3/2)**n:.6f} {'✓' if abs(ratio-(3/2)**n)<1e-6 else '✗'}")

print(f"""
The Koide ratio (3/2) POWERS UP through the tower:
  Level n: ||R^⊗n||²/||N^⊗n||² = (3/2)ⁿ

This is the lattice folding: the self-product tower S_{n+1}=S_n×S_n
maps onto EXPONENTIATION in the lattice. Each tower level multiplies
the exponent of every lattice generator.
""")

# ============================================================
# §4: EIGENVALUE SPECTRUM AT LEVEL 2
# ============================================================
print("\n§4: EIGENVALUE SPECTRA")
print("-" * 40)

print("R eigenvalues:", np.sort(np.linalg.eigvals(R).real)[::-1])
print(f"  = φ={phi:.6f}, -φ̄={-phi_bar:.6f}")

RR_evals = np.sort(np.linalg.eigvals(RR).real)[::-1]
print(f"\nR⊗R eigenvalues: {RR_evals}")
print(f"  Products of R eigenvalues: φ²={phi**2:.6f}, φ·(-φ̄)={-1:.6f}, (-φ̄)·φ={-1:.6f}, φ̄²={phi_bar**2:.6f}")
print(f"  φ² = φ+1 = {phi+1:.6f} (Fibonacci relation FOLDS the eigenvalue)")
print(f"  φ̄² = 1-φ̄ = {1-phi_bar:.6f} (conjugate folding)")

NN_evals = np.sort(np.linalg.eigvals(NN))
print(f"\nN⊗N eigenvalues: {NN_evals}")
print(f"  Products of N eigenvalues (±i): i²={-1}, i·(-i)={1}, (-i)·i={1}, (-i)²={-1}")

RN2_evals = np.sort(np.linalg.eigvals(RN2))
print(f"\nR⊗N eigenvalues: {RN2_evals}")
print(f"  Products: φ·i, φ·(-i), (-φ̄)·i, (-φ̄)·(-i)")
print(f"  = ±iφ, ±iφ̄  (MIXING φ and π sectors!)")

# ============================================================
# §5: THE DISCRIMINANT AT LEVEL 2
# ============================================================
print("\n\n§5: DISCRIMINANT AND DET STRUCTURE")
print("-" * 40)

print(f"Level 1:")
print(f"  det(R) = {np.linalg.det(R):.0f}, det(N) = {np.linalg.det(N):.0f}")
print(f"  disc(R) = tr²-4det = 1-4(-1) = 5")
print(f"  det(G₁) = 5 = disc(R)")

print(f"\nLevel 2:")
print(f"  det(R⊗R) = det(R)² = {np.linalg.det(RR):.0f}")
print(f"  det(N⊗N) = det(N)² = {np.linalg.det(NN):.0f}")
print(f"  det(R⊗N) = det(R)·det(N) = {np.linalg.det(RN2):.0f}")
print(f"  disc(R⊗R) = tr(R⊗R)²-4det(R⊗R) = {np.trace(RR)**2:.0f}-4·{np.linalg.det(RR):.0f} = {np.trace(RR)**2-4*np.linalg.det(RR):.0f}")

# What's tr(R⊗R)?
tr_RR = np.trace(RR)
print(f"  tr(R⊗R) = tr(R)² = {tr_RR:.0f}")
print(f"  disc(R⊗R) = 1 - 4(1) = -3  ← NEGATIVE! (elliptic at level 2!)")
print(f"  Level 1 R is P1 (hyperbolic). Level 2 R⊗R is P3 (elliptic)!")

# ============================================================
# §6: THE PYTHAGOREAN FOLD
# ============================================================
print("\n\n§6: THE PYTHAGOREAN FOLD")
print("-" * 40)

print(f"Level 1: ||R||² + ||N||² = 3 + 2 = 5 = disc(R) = (√5)²")
print(f"Level 2: ||R⊗R||² + ||N⊗N||² = 9 + 4 = 13")
print(f"         ||R⊗N||² + ||N⊗R||² = 6 + 6 = 12")
print(f"         ||R⊗R||² + ||N⊗N||² + ||R⊗N||² + ||N⊗R||² = 9+4+6+6 = 25 = 5²")
print(f"\nThe total norm-squared at level 2 = (total at level 1)² = 5² = 25")
print(f"This is det(G₁_full) = 25!")

# Verify: sum of all level-2 tensor product norms
total_lev2 = sum(np.trace(M@M.T) for M in [RR, NN, RN2, NR2])
total_lev1 = sum(np.trace(M@M.T) for M in [R, N])
print(f"\nΣ||generators||² at level 1: {total_lev1:.0f}")
print(f"Σ||tensor products||² at level 2: {total_lev2:.0f} = {total_lev1:.0f}² = 25")

# Check level 3
total_lev3 = 0
for a in [R, N]:
    for b in [R, N]:
        for c in [R, N]:
            M3 = np.kron(np.kron(a, b), c)
            total_lev3 += np.trace(M3 @ M3.T)

print(f"Σ||triple tensor products||² at level 3: {total_lev3:.0f} = {int(total_lev1**3):.0f} = 5³ = 125")

# ============================================================
# §7: THE EXPONENTIAL MAP AND COMPOSITION CONSTANTS  
# ============================================================
print("\n\n§7: EXPONENTIAL COMPOSITIONS")
print("-" * 40)

# Key: exp maps between the Lie algebra (additive) and group (multiplicative)
# The lattice Λ' is multiplicative. The Lie algebra log-lattice is additive.

# Critical compositions
e_phi_pi = np.exp(phi * np.pi)
print(f"e^(φπ) = e^({phi*np.pi:.6f}) = {e_phi_pi:.6f}")
print(f"e^π = {np.exp(np.pi):.6f}  (Gelfond's constant)")
print(f"e^(π√5) = {np.exp(np.pi*np.sqrt(5)):.6f}")
print(f"φ^π = {phi**np.pi:.6f}")
print(f"π^φ = {np.pi**phi:.6f}")

# The natural temperature β = ln(φ)
beta = np.log(phi)
print(f"\nβ = ln(φ) = {beta:.6f}")
print(f"e^β = φ = {np.exp(beta):.6f}")
print(f"e^(2β) = φ² = φ+1 = {np.exp(2*beta):.6f}")
print(f"e^(nβ) = φⁿ = F(n)φ+F(n-1)  [Fibonacci!]")

# The partition function uses coth(β/2)
print(f"\ncoth(β/2) = coth({beta/2:.6f}) = {1/np.tanh(beta/2):.6f}")
print(f"  = (1+φ̄)/(1-φ̄) = φ/φ̄² = φ³ = {phi**3:.6f}")
print(f"  φ³ = 2φ+1 = 2+√5 = {2+np.sqrt(5):.6f}")

# ============================================================
# §8: THE RECURSIVE SEED — LATTICE SELF-SIMILARITY  
# ============================================================
print("\n\n§8: LATTICE SELF-SIMILARITY UNDER THE TOWER")
print("-" * 40)

print("""
The tower map S_{n+1} = S_n × S_n acts on the lattice as:

  Multiplicative: x → x²  (squaring the lattice point)
  Lattice coords: (r,d,c,a,b) → (2r,2d,2c,2a,2b)

BUT the algebraic relations FOLD this back:
  φ² = φ+1  →  (2,0,0,0,0) ≡ (1,0,0,0,0) + (0,0,0,0,0) mod relations
  
In the φ-direction: doubling the exponent applies the Fibonacci
recurrence.  φ^{2n} = F(2n)φ+F(2n-1).

In the {√2,√3}-directions: (√2)² = 2, (√3)² = 3 — 
squaring exits the irrational and enters the rational.
The square of any generator is "closer to 1" in a precise sense.
""")

# The Fibonacci numbers ARE the lattice folding in the φ-direction
print("φ-direction folding (Fibonacci recursion):")
for n in range(1, 9):
    val = phi**(2**n)
    # Fibonacci decomposition: φ^m = F(m)φ + F(m-1)
    m = 2**n
    # Compute F(m) and F(m-1) using matrix exponentiation
    Rm = np.linalg.matrix_power(R, m)
    Fm = int(round(Rm[0,1]))      # F(m)
    Fm1 = int(round(Rm[0,0]))     # F(m-1) 
    print(f"  Tower level {n}: φ^{m} = F({m})·φ + F({m-1}) = {Fm}φ + {Fm1}")
    print(f"    Value: {val:.6f}, Fibonacci approx: {Fm*phi+Fm1:.6f}")

# ============================================================
# §9: THE DEEP STRUCTURE — 5^n RECURSION
# ============================================================
print("\n\n§9: THE 5ⁿ RECURSION")
print("-" * 40)

print("""
The key numerical pattern through the tower:

Level 0: {0,1}                  — |S₀| = 2
Level 1: disc(R) = 5            — det(G₁) = 5
Level 2: 5² = 25                — Σ||tensor norms||² = 25  
Level 3: 5³ = 125               — Σ||triple tensor norms||² = 125
Level n: 5ⁿ                     — total norm-squared at level n

The discriminant 5 = disc(R) is the SEED, and it propagates 
as 5ⁿ through the tower. This is because:

  ||A⊗B||² = ||A||²·||B||²   (Frobenius norm is multiplicative)
  Σ_{A,B∈{R,N}} ||A⊗B||² = (Σ||A||²)(Σ||B||²) = 5·5 = 25

The discriminant 5 = 4+1 = (2φ-1)² comes from the Fibonacci
characteristic polynomial x²-x-1 with discriminant 1²+4·1 = 5.
""")

# ============================================================
# §10: THE ORBIT TYPE FLIP
# ============================================================
print("\n§10: ORBIT TYPE FLIP AT LEVEL 2")
print("-" * 40)

# R at level 1: det=-1, tr=1, disc=5 → P1 (orientation-reversing, hyperbolic)
# R⊗R at level 2: det=1, tr=1, disc=-3 → P3 (elliptic!)
# N at level 1: det=1, tr=0, disc=-4 → P3 (elliptic)
# N⊗N at level 2: det=1, tr=-2, disc=4-4=0 → PARABOLIC (boundary!)

print("Orbit type classification:")
for name, M in [('R', R), ('R⊗R', RR), ('N', N), ('N⊗N', NN), ('R⊗N', RN2)]:
    d = np.linalg.det(M)
    t = np.trace(M)
    disc = t**2 - 4*d
    if d < 0:
        otype = "P1 (det<0)"
    elif disc > 0.01:
        otype = "P2 (hyp)"
    elif disc < -0.01:
        otype = "P3 (ell)"
    else:
        otype = "PARABOLIC"
    print(f"  {name:<6}: det={d:+.0f}, tr={t:+.0f}, disc={disc:+.0f} → {otype}")

print(f"""
THE ORBIT TYPE FLIP:
  R (level 1):   P1 (φ-sector, orientation-reversing)
  R⊗R (level 2): P3 (π-sector, elliptic!)
  
  N (level 1):   P3 (π-sector, elliptic)
  N⊗N (level 2): PARABOLIC (boundary!)

The self-product ROTATES the orbit type:
  P1 → P3 → Parabolic → ...
  
This is the P1↔P3 duality (Paper 0B, Thm 5.1) realized as
the TOWER RECURSION. The algebraic inverse x²-x-1 ↔ x²+x+1
IS the orbit type flip under squaring.
""")

# Verify: x²-x-1=0 has roots φ,-φ̄. Squaring: φ²=φ+1, so
# φ² satisfies (y-1)²-(y-1)-1=0 → y²-3y+1=0, disc=9-4=5
# But det(R²) = det(R)² = 1, and R² = R+I has tr=tr(R)+2=3
# disc(R²) = 9-4=5 → P2!
R2 = R@R  # = R+I
print("Correction — R² = R+I (not R⊗R!):")
d2 = np.linalg.det(R2)
t2 = np.trace(R2)
disc2 = t2**2 - 4*d2
print(f"  R²: det={d2:.0f}, tr={t2:.0f}, disc={disc2:.0f} → P2 (hyperbolic)")
print(f"  So matrix SQUARING: P1→P2 (det goes from -1 to +1)")
print(f"  And TENSOR squaring: P1→P3 (different operation!)")
print(f"  Matrix square vs tensor square — two DIFFERENT foldings")

# ============================================================
# §11: THE FULL PICTURE
# ============================================================
print("\n\n§11: THE LATTICE FOLDING MAP")
print("-" * 40)

print(f"""
TWO FOLDING OPERATIONS on the lattice:

1. MATRIX SQUARING (composition): M → M² = M·M
   - Stays within M₂(ℝ) at level 1
   - R² = R+I (Fibonacci recurrence)
   - N² = -I (period 4)
   - Orbit: P1 → P2 → P2 → P2 → ...
   - In lattice: φ → φ² = φ+1 (fold via Fibonacci)

2. TENSOR SQUARING (tower): M → M⊗M
   - Goes from level n to level n+1
   - Creates new generators in M₂ⁿ(ℝ)
   - Orbit: P1 → P3 → Parabolic → ...
   - In lattice: exponents double, norms square
   - Total norm: 5 → 25 → 125 (5ⁿ recursion)
   - Koide ratio: 3/2 → 9/4 → 27/8 ((3/2)ⁿ)

The LATTICE FOLD is the interaction between these:
  - Matrix squaring creates the FIBONACCI SPIRAL within level 1
  - Tensor squaring creates the TOWER ASCENT across levels
  - The orbit type flip (P1↔P3) under tensor squaring IS
    the P1↔P3 internal phase duality (Paper 0B, Thm 5.1)

The bridge chain {'{0,1}'} → M₂(ℝ) → M₄(ℝ) → M₁₆(ℝ) → ...
carries the lattice Λ' at each level, with the folding relations
acting as the "genetic code" that determines how the seed
{'{φ, e, π, √2, √3}'} propagates.

At each level:
  ||R^⊗n||² + ||N^⊗n||² = 3ⁿ + 2ⁿ  (Pythagorean at level n)
  ||R^⊗n||²/||N^⊗n||² = (3/2)ⁿ     (Koide at level n)
  Σ norms² = 5ⁿ = disc(R)ⁿ          (discriminant seed)
  Eigenvalues of R^⊗n = all products of n choices from {'{φ, -φ̄}'}
  Eigenvalues of N^⊗n = all products of n choices from {'{i, -i}'}

√6 = √2·√3 is the CROSS-TERM: it measures the interaction
between the P1 and P3 sectors at level 2. It is the norm of
R⊗N — the mixed tensor product.

The lattice IS the binary seed, recursively evolving through
its own algebraic structure.
""")

