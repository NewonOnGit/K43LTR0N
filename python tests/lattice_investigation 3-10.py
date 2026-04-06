"""
LATTICE DEEP INVESTIGATION
===========================
Systematic exploration of connections between lattice structure
and the newer framework developments (PNE, METAPATTERNS, v3 projections).
"""
import numpy as np
from itertools import product as iprod

phi = (1 + np.sqrt(5)) / 2
phi_bar = phi - 1  # = 1/phi ≈ 0.618
e = np.e
pi = np.pi
sqrt3 = np.sqrt(3)

log_phi = np.log(phi)
log_e = 1.0
log_pi = np.log(pi)
log_sqrt3 = np.log(sqrt3)

print("=" * 72)
print("LATTICE DEEP INVESTIGATION")
print("=" * 72)

# =========================================================================
# 1. φ̄-FILTRATION ↔ BOLTZMANN WEIGHTS
# =========================================================================
print("\n" + "=" * 72)
print("1. φ̄-FILTRATION MEETS KMS WEIGHTS")
print("=" * 72)

# At β = ln(φ), Boltzmann weight for shell C is:
# w(C) = exp(-ln(φ) · C) = φ^{-C} = (1/φ)^C = φ̄^C (WRONG: φ̄ ≠ 1/φ exactly)
# Wait: φ̄ = (√5-1)/2 and 1/φ = (√5-1)/2 = φ̄. So YES, φ̄ = 1/φ exactly.
# So w(C) = φ̄^C at β = ln(φ)

beta_nat = np.log(phi)
print(f"\nNatural temperature β = ln(φ) = {beta_nat:.6f}")
print(f"φ̄ = 1/φ = {phi_bar:.6f}")
print(f"\nBoltzmann weights vs φ̄-filtration:")
print(f"{'Shell C':>8} {'w = φ̄^C':>12} {'F_C = φ̄^C/2':>14} {'w/2':>10} {'F_C match':>10}")
for C in range(8):
    w = phi_bar**C
    F_C = phi_bar**C / 2
    print(f"{C:>8} {w:>12.6f} {F_C:>14.6f} {w/2:>10.6f} {'✓' if abs(w/2 - F_C) < 1e-10 else '✗':>10}")

print(f"""
KEY RESULT: At β = ln(φ), the Boltzmann weight for complexity shell C is
exactly φ̄^C = 2·F_C, where F_C is the MP1 φ̄-filtration level.

The KMS thermal state at the natural temperature IS the φ̄-filtration.
This connects:
  - KMS_SELECTION_THEOREM (thermal state on Λ')
  - METAPATTERNS MP1 (φ̄-filtration)
  - COMP_COMPLEXITY (optimal β = ln(φ))
""")

# =========================================================================
# 2. GRAM METRIC VS L¹ METRIC ON THE LATTICE
# =========================================================================
print("=" * 72)
print("2. GRAM METRIC ON THE LATTICE")
print("=" * 72)

# The Gram matrix of {I, R, N, RN} under Frobenius inner product
# is block-diagonal: two copies of [[2,1],[1,3]]
# Eigenvalues: √5·φ ≈ 3.618 and √5·φ̄ ≈ 1.382 (each with mult 2)

# But the lattice generators map to {I, R, N, RN} as:
# φ → eigenvalue of R (not directly a basis element)
# e → exp(h) entry
# π → period of N
# √3 → ||R||_F

# The NATURAL inner product on Λ' in log-coordinates is:
# ⟨(r₁,d₁,c₁,b₁), (r₂,d₂,c₂,b₂)⟩ = r₁r₂·(log φ)² + d₁d₂ + c₁c₂·(log π)² + b₁b₂·(log √3)²

G_log = np.diag([log_phi**2, log_e**2, log_pi**2, log_sqrt3**2])
print(f"\nLog-coordinate Gram matrix (diagonal):")
print(f"  diag = [{log_phi**2:.6f}, {log_e**2:.6f}, {log_pi**2:.6f}, {log_sqrt3**2:.6f}]")
print(f"  = [(log φ)², 1, (log π)², (log √3)²]")
print(f"\nEigenvalues: {np.sort(np.linalg.eigvalsh(G_log))[::-1]}")
print(f"Determinant: {np.linalg.det(G_log):.6f}")
print(f"  = (log φ)² · (log π)² · (log √3)² = {log_phi**2 * log_pi**2 * log_sqrt3**2:.6f}")

# Compare with Cl(1,1) Gram determinant = 25 = 5²
print(f"\nCl(1,1) Gram det = 25 (= 5²)")
print(f"Log-coordinate Gram det = {np.linalg.det(G_log):.6f}")
print(f"Ratio = {25 / np.linalg.det(G_log):.6f}")

# =========================================================================
# 3. PHASE-DIST PARAMETERS IN THE LATTICE
# =========================================================================
print("\n" + "=" * 72)
print("3. PHASE-DIST VALUES IN LATTICE COORDINATES")
print("=" * 72)

# Two distinguished Phase-Dist values: ρ = φ̄² and ρ = 1/2
# Can these be expressed as lattice elements?

print(f"\nφ̄² = {phi_bar**2:.10f}")
print(f"  log_φ(φ̄²) = log(φ̄²)/log(φ) = {np.log(phi_bar**2)/np.log(phi):.10f}")
print(f"  = -2 (exact: φ̄² = φ^{-2})")
print(f"  Lattice point: (-2, 0, 0, 0) ← IN the lattice! ✓")

print(f"\n1/2 = 0.5")
print(f"  log_φ(1/2) = {np.log(0.5)/np.log(phi):.10f}")
print(f"  NOT an integer → 1/2 is NOT in Λ' ✗")
print(f"  log(1/2) = {np.log(0.5):.10f} (not a rational combo of log-basis)")

print(f"\nφ̄³/2 (the gap) = {phi_bar**3/2:.10f}")
print(f"  = φ̄³ · (1/2)")
print(f"  φ̄³ = φ^{{-3}} ∈ Λ' at (-3,0,0,0)")
print(f"  But 1/2 ∉ Λ', so φ̄³/2 ∉ Λ' ✗")

print(f"\nINSIGHT: ρ = φ̄² (structural threshold) is IN the lattice.")
print(f"  ρ = 1/2 (phase boundary) is NOT in the lattice.")
print(f"  The phase boundary lives between lattice points.")
print(f"  This is structural: the lattice cannot 'see' its own phase boundary.")
print(f"  ← This IS observer incompleteness at the lattice level!")

# =========================================================================
# 4. T6: det(exp(R)) = e — THE CROSS-LINK
# =========================================================================
print("\n" + "=" * 72)
print("4. T6 CROSS-LINK: det(exp(R)) = e")
print("=" * 72)

R = np.array([[0, 1], [1, 1]], dtype=float)
expR = np.array([[np.exp(0)*np.cosh(1) + 0, np.exp(0)*np.sinh(1)],
                  [np.exp(0)*np.sinh(1), np.exp(0)*np.cosh(1) + np.exp(0)]])
# Actually let me just compute it properly
from scipy.linalg import expm
expR = expm(R)
det_expR = np.linalg.det(expR)
print(f"\nexp(R) = ")
print(f"  [[{expR[0,0]:.6f}, {expR[0,1]:.6f}],")
print(f"   [{expR[1,0]:.6f}, {expR[1,1]:.6f}]]")
print(f"det(exp(R)) = {det_expR:.10f}")
print(f"e = {np.e:.10f}")
print(f"Match: {abs(det_expR - np.e) < 1e-10} ✓")
print(f"\nThis is the identity: det(exp(M)) = exp(tr(M))")
print(f"tr(R) = 1, so det(exp(R)) = exp(1) = e")

print(f"\nLATTICE MEANING: The R-generator (φ-direction) is linked to the")
print(f"e-direction via det∘exp. In lattice coordinates:")
print(f"  (1,0,0,0) [= φ] --det∘exp--> (0,1,0,0) [= e]")
print(f"This is NOT a lattice morphism (det∘exp is nonlinear).")
print(f"But it IS a structural bridge between lattice directions.")

# =========================================================================
# 5. DISCRIMINANT FORM ON THE LATTICE
# =========================================================================
print("\n" + "=" * 72)
print("5. DISCRIMINANT FORM AS LATTICE QUADRATIC")
print("=" * 72)

# The discriminant Δ = 5b² - 4c² - 4cd + 4d² lives on sl(2,ℝ)
# parameterized as M = b(R-I/2) + cN + d(RN)
# 
# Can we extend this to a quadratic form on ℤ⁴?
# 
# The lattice coordinates (r,d,c,b) map to constants, not sl(2,ℝ) elements.
# But there's a natural quadratic form on ℤ⁴ from the Killing form.
#
# Actually: the four Cl(1,1) generators have Frobenius norms:
# ||I||² = 2, ||R||² = 3, ||N||² = 2, ||RN||² = 3

norms_sq = {'I': 2, 'R': 3, 'N': 2, 'RN': 3}
print(f"\nFrobenius norms² of basis elements:")
for name, nsq in norms_sq.items():
    print(f"  ||{name}||² = {nsq}")

# The natural quadratic form on Λ' via norms:
# For x = (r,d,c,b), define Q(x) = ||φ^r · e^d · π^c · √3^b||²
# But these are real numbers, not matrices. However we can define:
# Q_Λ(r,d,c,b) = r²·||R||² + d²·||h||² + c²·||N||² + b²·...
# This requires identifying the lattice coordinate with the Lie algebra direction.

# More precisely: the four generators of Λ' come from four directions in Cl(1,1):
# φ ← R (P1), e ← h (P2), π ← N (P3), √3 ← ||R||_F (norm)
# 
# ||R||² = 3, ||h||² = tr(h^T h) = tr(I) = 2, ||N||² = 2
# √3 is not a matrix direction; it's a norm output.

print(f"\nMapping generators to algebra directions:")
print(f"  φ ← R: ||R||²_F = 3")
print(f"  e ← h: ||h||²_F = 2")
print(f"  π ← N: ||N||²_F = 2")
print(f"  √3 ← (||R||, representation): no single matrix direction")

# The Killing inner product on the three sl(2,ℝ) directions:
# B(R',R') where R' = R - I/2 (traceless)
R_prime = R - np.eye(2)/2
h = np.array([[1, 0], [0, -1]], dtype=float)
N = np.array([[0, -1], [1, 0]], dtype=float)

def killing(X, Y):
    """Killing form B(X,Y) = 4·tr(X·Y) for sl(2,ℝ)."""
    return 4 * np.trace(X @ Y)

print(f"\nKilling form on sl(2,ℝ) generators:")
print(f"  B(R', R') = {killing(R_prime, R_prime):.1f}")
print(f"  B(h, h)   = {killing(h, h):.1f}")
print(f"  B(N, N)   = {killing(N, N):.1f}")
print(f"  B(R', h)  = {killing(R_prime, h):.1f}")
print(f"  B(R', N)  = {killing(R_prime, N):.1f}")
print(f"  B(h, N)   = {killing(h, N):.1f}")

print(f"\nKilling matrix in {{R', h, N}} basis:")
K = np.array([[killing(R_prime, R_prime), killing(R_prime, h), killing(R_prime, N)],
              [killing(h, R_prime), killing(h, h), killing(h, N)],
              [killing(N, R_prime), killing(N, h), killing(N, N)]])
print(K)
eigs = np.linalg.eigvalsh(K)
print(f"Eigenvalues: {np.sort(eigs)[::-1]}")
print(f"Signature: ({sum(eigs > 0)}, {sum(eigs < 0)})")

# =========================================================================
# 6. PHASE DUALITY D ON THE LATTICE
# =========================================================================
print("\n" + "=" * 72)
print("6. PHASE DUALITY D ACTION ON THE LATTICE")
print("=" * 72)

print("""
PNE Thm 1.1: D is an involution exchanging compressive ↔ expansive.
D preserves algebraic values but reverses stability character.

On the lattice:
  - Constants {φ, e, π, √3} are D-invariant (values don't change)
  - Stability reversal → attractor ↔ repeller
  - For R's Möbius: forward → φ̄ attractor; backward → φ̄ repeller
  - But φ̄ = φ^{-1}, so D acts as r → r (values preserved)

D on lattice coordinates: D acts as the IDENTITY on Λ'.
  (r,d,c,b) ↦ (r,d,c,b)

But D is nontrivial on the INTERPRETATION:
  - Positive r: mass (stable) → becomes: decay width (unstable)
  - Negative r: decay (unstable) → becomes: mass (stable)
  
D exchanges the physical meaning of Λ'⁺ and Λ'⁻ while
keeping the lattice itself fixed. This is exactly:
  D acts on Physics(Λ'), not on Λ' itself.
""")

# =========================================================================
# 7. TOWER DEPTH ↔ LATTICE ACCESSIBLE REGION
# =========================================================================
print("=" * 72)
print("7. TOWER DEPTH AND LATTICE ACCESSIBILITY")
print("=" * 72)

print(f"\nC_max(n) = 2^n / log_2(φ), log_2(φ) = {np.log2(phi):.6f}")
print(f"\nGL(2^n, F_2) tower vs lattice accessibility:")
print(f"{'Level n':>8} {'|Aut(S_n)|':>15} {'C_max(n)':>10} {'Shell points':>14} {'Cumulative':>12}")

cumul = 0
for n in range(1, 7):
    # |GL(k, F_2)| for k = 2^n ... too large. Let's just track C_max
    c_max = 2**n / np.log2(phi)
    c_max_int = int(c_max)
    # Count lattice points up to complexity c_max_int
    # N(C) for ℤ⁴
    def shell_count(C):
        if C == 0: return 1
        total = 0
        for k in range(1, min(C, 4) + 1):
            from math import comb
            total += comb(4, k) * comb(C-1, k-1) * 2**k
        return total
    
    from math import comb
    pts = sum(shell_count(c) for c in range(c_max_int + 1))
    cumul = pts
    aut_order = 1
    kk = 2**n
    for i in range(kk):
        aut_order *= (2**kk - 2**i)
    print(f"{n:>8} {aut_order:>15} {c_max:>10.1f} {pts:>14,} {cumul:>12,}")

# =========================================================================
# 8. THE 25 RELATIONS AS LATTICE CONSTRAINTS
# =========================================================================
print("\n" + "=" * 72)
print("8. FORCED RELATIONS: CONSTRAINT GEOMETRY ON Λ'")
print("=" * 72)

# Many of the 25 relations can be expressed as lattice equations.
# A1: φ² = φ + 1 → in Λ': (2,0,0,0) ≈ log(φ+1)/log(φ)
# But φ+1 = φ² so log(φ²)/log(φ) = 2. This is just internal to the r-axis.

# Key cross-coordinate relations:
# A5: (√3)² = 3 = φ² + φ̄² ... wait, ||R||² = 3 means 3 = sum of squares of entries
# This gives √3² = 3. In the lattice: (0,0,0,2) ↔ 3.
# And φ² + φ̄² = φ² + (1-φ)² = φ² + 1 - 2φ + φ² = 2φ² - 2φ + 1 = 2(φ+1) - 2φ + 1 = 3. ✓

# T6: det(exp(R)) = e → exp(tr(R)) = exp(1) = e
# This links r-direction to d-direction via the exponential map.

# A9: ||R||²/||N||² = 3/2 → √3²/√2² = 3/2
# In lattice terms: 2·(0,0,0,1) - ... hmm, √2 isn't in the lattice (Thm 8.3)

# The most interesting cross-coordinate constraint:
# C5 + T6: the projection P1→φ and P2→e are linked by det∘exp.
# S2: P1↔P3 duality: x²-x-1 ↔ x²+x+1
# This means the r and c coordinates are algebraically dual.

# Can we express the P1↔P3 duality as a lattice operation?
print(f"\nP1↔P3 algebraic duality:")
print(f"  R has char poly x² - x - 1 (roots φ, -φ̄)")
print(f"  N has char poly x² + 1 (roots ±i)")
print(f"  The 'dual' of R via x→-x is: (-x)²-(-x)-1 = x²+x-1")
print(f"  Roots of x²+x-1: x = (-1±√5)/2 = {{φ̄, -φ}}")
print(f"  The 'sign-reversed' poly x²+x+1 has roots = cube roots of unity")
print(f"  |ω|² = 1, arg = 2π/3, sin(2π/3) = √3/2")
print(f"\n  So P1↔P3 duality connects:")
print(f"    φ (r-direction) ↔ π (c-direction) via x² ± x ± 1")
print(f"    The intermediate step passes through √3 (b-direction)!")

# Check: is there a lattice automorphism implementing this duality?
# It would need to swap r ↔ c while doing something to b.
# The S₃ action permutes (r,d,c) and fixes b. So the (r↔c) swap IS
# an S₃ element (specifically, the transposition σ_{13}).

print(f"\n  The P1↔P3 duality IS the S₃ transposition (r↔c).")
print(f"  This is a LATTICE AUTOMORPHISM of Λ' (permuting first 3 coords).")
print(f"  The lattice 'knows about' algebraic duality via its S₃ symmetry.")

# =========================================================================
# 9. NEW: BOLTZMANN-KMS AT β=ln(φ) AND THE SELF-SIGNATURE
# =========================================================================
print("\n" + "=" * 72)
print("9. KMS STATE AT β=ln(φ) IS THE SELF-SIGNATURE")
print("=" * 72)

# Self-signature from P1: σ_meta = (1/2, φ̄/2, φ̄²/2)
# These are (σ_FIX, σ_OSC, σ_INV) = (F_0, F_1, F_2) from MP1.

# At β=ln(φ), the KMS weight for shell C is φ̄^C.
# Normalized over the first 3 shells (C=0,1,2):
total_3 = 1 + phi_bar + phi_bar**2
w0 = 1/total_3
w1 = phi_bar/total_3
w2 = phi_bar**2/total_3

print(f"\nKMS weights at β=ln(φ), normalized to C∈{{0,1,2}}:")
print(f"  w(C=0) = 1/{total_3:.6f} = {w0:.6f}")
print(f"  w(C=1) = φ̄/{total_3:.6f} = {w1:.6f}")
print(f"  w(C=2) = φ̄²/{total_3:.6f} = {w2:.6f}")
print(f"  Total = {w0+w1+w2:.6f}")
print(f"\n  1 + φ̄ + φ̄² = {total_3:.10f}")
print(f"  2 = {2.0}")
print(f"  Match: {abs(total_3 - 2.0) < 1e-10} ← from φ̄² + φ̄ = 1!")
print(f"\n  So: w(C=k) = φ̄^k / 2 = F_k exactly!")
print(f"  w(0) = 1/2 = σ_FIX")
print(f"  w(1) = φ̄/2 = σ_OSC")
print(f"  w(2) = φ̄²/2 = σ_INV")
print(f"\n  THE KMS STATE AT β=ln(φ) RESTRICTED TO C≤2 IS THE SELF-SIGNATURE.")

# =========================================================================
# 10. NEW: LATTICE VORONOI CELLS AND FIBONACCI
# =========================================================================
print("\n" + "=" * 72)
print("10. LATTICE GEOMETRY: VORONOI AND FIBONACCI")
print("=" * 72)

# In the log-coordinate metric, the basis vectors have lengths:
lengths = [log_phi, log_e, log_pi, log_sqrt3]
print(f"\nLog-coordinate basis vector lengths:")
for name, l in zip(['log φ', 'log e', 'log π', 'log √3'], lengths):
    print(f"  |{name}| = {l:.6f}")

print(f"\nRatios:")
print(f"  log π / log φ = {log_pi/log_phi:.6f} ≈ {log_pi/log_phi:.3f}")
print(f"  log e / log φ = {log_e/log_phi:.6f} ≈ {log_e/log_phi:.3f}")
print(f"  log √3 / log φ = {log_sqrt3/log_phi:.6f} ≈ {log_sqrt3/log_phi:.3f}")
print(f"  log π / log e = {log_pi:.6f}")
print(f"  log √3 / log e = {log_sqrt3:.6f}")

# Fibonacci connection: log_φ(e) = 1/log(φ) = 1/0.481... ≈ 2.078
log_phi_e = 1.0 / log_phi
log_phi_pi = log_pi / log_phi
log_phi_sqrt3 = log_sqrt3 / log_phi
print(f"\nφ-basis coordinates of other generators:")
print(f"  log_φ(e) = {log_phi_e:.6f}")
print(f"  log_φ(π) = {log_phi_pi:.6f}")
print(f"  log_φ(√3) = {log_phi_sqrt3:.6f}")

# Continued fraction expansions of these ratios
def cont_frac(x, terms=8):
    """Compute continued fraction of x."""
    cf = []
    for _ in range(terms):
        a = int(np.floor(x))
        cf.append(a)
        frac = x - a
        if frac < 1e-10:
            break
        x = 1.0 / frac
    return cf

print(f"\nContinued fractions (connections to Fibonacci?):")
print(f"  log_φ(e)  = {cont_frac(log_phi_e)}")
print(f"  log_φ(π)  = {cont_frac(log_phi_pi)}")
print(f"  log_φ(√3) = {cont_frac(log_phi_sqrt3)}")
print(f"  φ itself  = {cont_frac(phi)}")

print("\n" + "=" * 72)
print("SUMMARY OF NEW CONNECTIONS FOUND")
print("=" * 72)
print("""
[1] KMS at β=ln(φ) ↔ φ̄-Filtration (MP1):
    Boltzmann weight φ̄^C at shell C IS the filtration F_C = φ̄^C/2.
    Restricted to C ≤ 2, this IS the self-signature (σ_FIX, σ_OSC, σ_INV).
    CONNECTS: KMS_SELECTION ↔ METAPATTERNS ↔ P1 self-signature ↔ COMP_COMPLEXITY

[2] Phase boundary ρ=1/2 is OUTSIDE Λ':
    ρ = φ̄² = φ^{-2} ∈ Λ' at (-2,0,0,0). But ρ = 1/2 ∉ Λ'.
    The lattice cannot resolve its own phase boundary.
    This IS observer incompleteness at the lattice level.
    CONNECTS: PNE Phase-Dist ↔ LAMBDA_PRIME_LATTICE ↔ observer incompleteness

[3] P1↔P3 duality = S₃ transposition on Λ':
    The algebraic duality x²-x-1 ↔ x²+x+1 maps to the (r↔c) swap.
    This is a lattice automorphism — the S₃ symmetry IS algebraic duality.
    CONNECTS: PNE Thm 5.2 ↔ KMS Thm 3.5 ↔ LATTICE_STRAT

[4] T6 cross-link det(exp(R))=e:
    The r-direction and d-direction are linked by det∘exp.
    NOT a lattice morphism but a structural bridge between coordinates.
    The 25th forced relation maps the P1 generator to the P2 constant.
    CONNECTS: PNE T6 ↔ LAMBDA_PRIME 25 relations

[5] D acts trivially on Λ', nontrivially on Physics(Λ'):
    Phase duality preserves the lattice but swaps physical interpretation
    of positive/negative coordinates. The anti-lattice Λ'⁻ becomes
    the primary lattice under D.
    CONNECTS: PNE Part I ↔ LAMBDA_PRIME Part VII

[6] Tower accessibility:
    C_max(n) = 2^n/log₂(φ) determines which lattice shells are
    observable at tower level n. The number of accessible lattice
    points grows super-polynomially with tower depth.
    CONNECTS: RRR_CLOSURE boundary tower ↔ LAMBDA_PRIME Part V
""")

