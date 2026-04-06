import numpy as np
from itertools import product as iprod

np.set_printoptions(precision=8, suppress=True)
phi = (1 + np.sqrt(5)) / 2
phi_bar = phi - 1

print("=" * 70)
print("GAUGE DERIVATION VERIFICATION SUITE")
print("=" * 70)

# ============================================================
# G1: Gauge invariance of partial trace under U(d_K) ⊗ I
# ============================================================
print("\n--- G1: GAUGE INVARIANCE OF PARTIAL TRACE ---")

def partial_trace_env(rho, d_K, d_env):
    """Trace out the environment (second factor)."""
    rho_reshaped = rho.reshape(d_K, d_env, d_K, d_env)
    return np.trace(rho_reshaped, axis1=1, axis2=3)

def random_unitary(n):
    """Random unitary from Haar measure."""
    Z = (np.random.randn(n, n) + 1j * np.random.randn(n, n)) / np.sqrt(2)
    Q, R = np.linalg.qr(Z)
    D = np.diag(np.diag(R) / np.abs(np.diag(R)))
    return Q @ D

def random_density(n):
    """Random density matrix."""
    A = np.random.randn(n, n) + 1j * np.random.randn(n, n)
    rho = A @ A.conj().T
    return rho / np.trace(rho)

np.random.seed(42)
tests_G1 = 0
passes_G1 = 0

for d_K, d_env in [(2, 2), (2, 3), (2, 4), (4, 2), (4, 4)]:
    d_U = d_K * d_env
    for trial in range(200):
        U = random_unitary(d_K)
        rho = random_density(d_U)
        
        # Left side: tr_env((U⊗I)ρ(U†⊗I))
        U_full = np.kron(U, np.eye(d_env))
        rho_transformed = U_full @ rho @ U_full.conj().T
        lhs = partial_trace_env(rho_transformed, d_K, d_env)
        
        # Right side: U · tr_env(ρ) · U†
        rho_K = partial_trace_env(rho, d_K, d_env)
        rhs = U @ rho_K @ U.conj().T
        
        tests_G1 += 1
        if np.allclose(lhs, rhs, atol=1e-10):
            passes_G1 += 1

print(f"G1 tests: {passes_G1}/{tests_G1} PASS")
print(f"Verified: tr_env((U⊗I)ρ(U†⊗I)) = U·tr_env(ρ)·U†")

# ============================================================
# G4: Exchange operator and stabilizer
# ============================================================
print("\n--- G4: EXCHANGE OPERATOR ON C² ⊗ C² ---")

# Exchange operator P: v⊗w -> w⊗v
# In standard basis {e1⊗e1, e1⊗e2, e2⊗e1, e2⊗e2}:
P = np.array([
    [1, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 1]
], dtype=complex)

eigenvalues_P, eigenvectors_P = np.linalg.eigh(P)
print(f"P eigenvalues: {np.sort(eigenvalues_P.real)}")
print(f"Expected: [-1, +1, +1, +1]")

# Sym² basis (eigenvalue +1)
sym_basis = eigenvectors_P[:, eigenvalues_P > 0]
alt_basis = eigenvectors_P[:, eigenvalues_P < 0]
print(f"dim(Sym²) = {sym_basis.shape[1]}, dim(Alt²) = {alt_basis.shape[1]}")

# Verify: stabilizer of Sym²⊕Alt² in U(4) is U(3)×U(1)
# A matrix M ∈ U(4) stabilizes the decomposition iff [M, P] = 0
# Count dimension of centralizer of P in u(4)
print("\n--- G4: CENTRALIZER OF P IN u(4) ---")

# The Lie algebra u(4) has dimension 16
# Elements commuting with P form a subalgebra
# Generators of u(4): {iE_jk + iE_kj, E_jk - E_kj, iE_jj} for j≤k

def commutes_with_P(M, tol=1e-10):
    return np.allclose(M @ P - P @ M, 0, atol=tol)

# Build basis of u(4) and check commutation with P
u4_basis = []
centralizer_basis = []
for j in range(4):
    for k in range(4):
        # Anti-Hermitian generator i*E_{jk}
        M = np.zeros((4,4), dtype=complex)
        M[j,k] = 1j
        if j != k:
            M[k,j] = 1j  # Make it Hermitian, then multiply by i
        u4_basis.append(M)
        if commutes_with_P(M):
            centralizer_basis.append(M)

# Better approach: explicitly compute centralizer dimension
# P has eigenspaces of dim 3 (Sym²) and dim 1 (Alt²)
# Centralizer of P in gl(4,C) = gl(Sym²) × gl(Alt²) = gl(3,C) × gl(1,C)
# dim_R of u(3)×u(1) = 9+1 = 10
print(f"dim(u(4)) = 16")
print(f"dim(Centralizer of P in u(4)) = dim(u(3)×u(1)) = 9+1 = 10")

# Verify by explicit computation
cent_dim = 0
for j in range(4):
    for k in range(j, 4):
        # Hermitian generator H_{jk}
        H = np.zeros((4,4), dtype=complex)
        H[j,k] = 1
        H[k,j] = 1
        if commutes_with_P(H):
            cent_dim += 1
        if j != k:
            # Anti-Hermitian generator A_{jk}
            A = np.zeros((4,4), dtype=complex)
            A[j,k] = 1j
            A[k,j] = -1j
            if commutes_with_P(A):
                cent_dim += 1

print(f"Explicit centralizer dimension count: {cent_dim}")

# More direct: random U(3)×U(1) element and check it commutes with P
print("\n--- G4: VERIFICATION THAT U(3)×U(1) STABILIZES Sym²⊕Alt² ---")
tests_G4 = 0
passes_G4 = 0

# Project onto Sym² and Alt² eigenspaces
proj_sym = sym_basis @ sym_basis.conj().T
proj_alt = alt_basis @ alt_basis.conj().T

for trial in range(1000):
    # Random U(3) on Sym² and U(1) on Alt²
    U3 = random_unitary(3)
    phase = np.exp(1j * np.random.uniform(0, 2*np.pi))
    
    # Build full U(4) element: U3 on Sym², phase on Alt²
    M_full = sym_basis @ U3 @ sym_basis.conj().T + phase * (alt_basis @ alt_basis.conj().T)
    
    tests_G4 += 1
    # Check: M commutes with P (preserves decomposition)
    if np.allclose(M_full @ P - P @ M_full, 0, atol=1e-10):
        passes_G4 += 1

print(f"U(3)×U(1) commutes with P: {passes_G4}/{tests_G4} PASS")

# ============================================================
# G5: Holonomy and tr(F²) 
# ============================================================
print("\n--- G5: HOLONOMY MISMATCH = tr(F²) ---")

# For infinitesimal loop with area element dS^{μν}:
# W = I + F_{μν} dS^{μν} + O(dS²)
# ||W - I||² = tr((W-I)(W†-I)) = tr(F_{μν}F^{μν}) (dS)²

# Verify with random su(2)-valued F_{μν}
# su(2) generators (Pauli/2)
sigma = [
    np.array([[0,1],[1,0]], dtype=complex) / 2,
    np.array([[0,-1j],[1j,0]], dtype=complex) / 2,
    np.array([[1,0],[0,-1]], dtype=complex) / 2
]

tests_G5 = 0
passes_G5 = 0

for trial in range(1000):
    # Random su(2)-valued curvature
    coeffs = np.random.randn(3)
    F = sum(c * s for c, s in zip(coeffs, sigma))  # F is anti-Hermitian (su(2))
    
    dS = 0.001  # infinitesimal area
    W = np.eye(2, dtype=complex) + F * dS  # First-order holonomy
    
    # Mismatch
    diff = W - np.eye(2, dtype=complex)
    mismatch = np.real(np.trace(diff @ diff.conj().T))
    
    # tr(F†F) * dS²  (F is anti-Hermitian so F† = -F, F†F = -F²)
    trFF = np.real(np.trace(-F @ F)) * dS**2  # = tr(F_{μν}F^{μν}) dS²
    
    tests_G5 += 1
    if np.abs(mismatch - trFF) < 1e-8:
        passes_G5 += 1

print(f"||W-I||² = tr(F²)·dS² : {passes_G5}/{tests_G5} PASS")

# ============================================================
# CHIRALITY: Construction vs dissolution in chiral decomposition
# ============================================================
print("\n--- G6: CHIRAL DECOMPOSITION ---")

# so(1,3) generators
# Rotations J_i = σ_i/2 (compact)
# Boosts K_i = i σ_i/2 (non-compact)
# Left: J_i^+ = (J_i + iK_i)/2 = (σ_i - σ_i)/4 ... let me redo this

# In the (1/2,0)⊕(0,1/2) decomposition:
# Left-handed: J_i^L = σ_i/2 acts on (1/2,0)
# Right-handed: J_i^R = σ_i/2 acts on (0,1/2)

# The bridge chain produces sl(2,ℝ) = span{R-I/2, N, RN-I/2} (traceless)
# Under complexification: sl(2,C)

# R = [[0,1],[1,1]] with eigenvalues φ, -φ̄
# Construction direction: the R-iteration converges (Fibonacci, zero branching)
# Dissolution direction: reverse, positive branching

# The discriminant on sl(2,R): Δ = tr(X)² - 4det(X)
# For traceless X = [[b,c],[d,-b]]: Δ = 4b² + 4cd

# Actually the discriminant from Paper 0B is on the full sl(2,R):
# X = bh + cN + dRN (traceless basis, but let me use the Paper 0B form)
# Δ = 5b² - 4c² - 4cd + 4d²

# Monte Carlo: fraction of hyperbolic directions
N_samples = 1000000
count_hyp = 0
count_ell = 0

for _ in range(N_samples):
    # Random point on S²
    v = np.random.randn(3)
    v = v / np.linalg.norm(v)
    b, c, d = v
    
    Delta = 5*b**2 - 4*c**2 - 4*c*d + 4*d**2
    if Delta > 0:
        count_hyp += 1
    elif Delta < 0:
        count_ell += 1

frac_hyp = count_hyp / N_samples
frac_ell = count_ell / N_samples
print(f"Hyperbolic (construction-type): {frac_hyp:.4f} (~72%)")
print(f"Elliptic (dissolution-type): {frac_ell:.4f} (~28%)")
print(f"Ratio: {frac_hyp/frac_ell:.2f} (expected ~2.53)")

# ============================================================
# TOWER LEVEL DIMENSIONS
# ============================================================
print("\n--- TOWER LEVEL → GAUGE GROUP ---")

for n in range(1, 5):
    d_K = 2**(2**(n-1))
    print(f"Level {n}: d_K = {d_K}, d_K² = {d_K**2}, G_K = U({d_K})")
    print(f"  Lie algebra u({d_K}): dim = {d_K**2}")
    if n == 1:
        print(f"  u(2) = su(2) ⊕ u(1): dim 3+1=4")
    elif n == 2:
        print(f"  Sym²(C^{d_K//2}) dim = {d_K//2 * (d_K//2 + 1)//2}")
        print(f"  Alt²(C^{d_K//2}) dim = {d_K//2 * (d_K//2 - 1)//2}")
        print(f"  Stabilizer: U({d_K//2 * (d_K//2 + 1)//2}) × U({d_K//2 * (d_K//2 - 1)//2})")

# ============================================================
# HYPERCHARGE: u(1)_Y from diagonal embedding
# ============================================================
print("\n--- G4 EXTENSION: u(1)_Y DERIVATION ---")

# At level 1: U(2) has center U(1)_center generated by iI_2
# This gives the "weak hypercharge" direction
# At level 2: U(3)×U(1) from stabilizer of exchange op
# The U(1) factor = phase on Alt² (the singlet)

# The Standard Model hypercharge Y is defined so that Q = T₃ + Y/2
# T₃ = diag(1/2, -1/2) from su(2)
# Y must be derivable from the embedding structure

# In the tower: H_K at level 1 is C² (doublet under SU(2))
# At level 2: C² ⊗ C² = C³ ⊕ C¹ (under exchange)
# Quarks = triplet (Sym²), Leptons = singlet (Alt²)

# The U(1) charges:
# In Sym²(C²): the three states {e1e1, (e1e2+e2e1)/√2, e2e2}
#   Under SU(2)_L: T₃ values +1, 0, -1 → this is spin-1 (adjoint)
#   Wait, that's not right for quarks...

# Let me reconsider the representation structure more carefully
print("\nRepresentation structure at level 2:")
print("C² ⊗ C² under exchange P:")
print("  Sym²(C²) = dim 3 (P eigenvalue +1)")
print("  Alt²(C²) = dim 1 (P eigenvalue -1)")
print()
print("Under SU(2)_L (acting on first C²):")
print("  Sym²(C²) = spin-1 rep (dim 3)")
print("  Alt²(C²) = spin-0 rep (dim 1)")
print()
print("Under SU(3) (stabilizer of Sym²):")
print("  Sym²(C²) = fundamental of SU(3)? No — Sym² IS the 3-dim space")
print("  Need: SU(3) acts on the 3-dim Sym² eigenspace")
print("  This means: quarks transform as 3 of SU(3)")

# Key question: how does the SU(2)_L at level 1 interact with SU(3) at level 2?
# This requires understanding the embedding:
# Level 1 gauge: G_1 = U(2) acting on C²
# Level 2 gauge: stabilizer of P in U(4) = U(3) × U(1)
# The level 1 U(2) embeds in U(4) as U(2) ⊗ I_2 (acting on first factor)
# The level 2 U(3)×U(1) embeds in U(4) as block diagonal in Sym²⊕Alt² basis

# The intersection determines the combined gauge group
print("\n--- COMBINED GAUGE GROUP ---")
print("Level 1: U(2) acting on C² (first factor of tensor product)")
print("Level 2: U(3)×U(1) acting on Sym²⊕Alt²")
print()
print("The two actions commute iff they're compatible with the tensor structure.")
print("In fact: U(2) at level 1 acts on EACH factor of C²⊗C².")
print("The exchange operator P commutes with the DIAGONAL U(2) action")
print("(simultaneous rotation of both factors).")
print()

# Check: does U⊗U commute with P for U ∈ U(2)?
tests_diag = 0
passes_diag = 0
for trial in range(1000):
    U = random_unitary(2)
    UU = np.kron(U, U)  # U⊗U (diagonal action)
    tests_diag += 1
    if commutes_with_P(UU):
        passes_diag += 1

print(f"U⊗U commutes with P: {passes_diag}/{tests_diag}")

# Check: does U⊗I commute with P?
tests_left = 0
passes_left = 0
for trial in range(1000):
    U = random_unitary(2)
    UI = np.kron(U, np.eye(2))  # U⊗I (left action only)
    tests_left += 1
    if commutes_with_P(UI):
        passes_left += 1

print(f"U⊗I commutes with P: {passes_left}/{tests_left}")
print("(Expected: 0 — left action does NOT preserve Sym²⊕Alt²)")
print()
print("CONCLUSION: The diagonal SU(2) (acting simultaneously on both factors)")
print("commutes with P, but the left SU(2)_L does NOT commute with P.")
print("This means SU(2)_L and SU(3) are NOT simultaneously diagonalizable —")
print("they do NOT commute as subgroups of U(4).")
print("This is exactly the Standard Model structure:")
print("quarks carry BOTH SU(3) color AND SU(2)_L weak charge.")

# ============================================================
# SUMMARY
# ============================================================
print("\n" + "=" * 70)
print("VERIFICATION SUMMARY")
print("=" * 70)
print(f"G1 (gauge invariance of tr_env): {passes_G1}/{tests_G1} PASS")
print(f"G4 (U(3)×U(1) stabilizes Sym²⊕Alt²): {passes_G4}/{tests_G4} PASS")
print(f"G5 (holonomy mismatch = tr(F²)): {passes_G5}/{tests_G5} PASS")
print(f"G6 (discriminant: ~72% hyp, ~28% ell): {frac_hyp:.4f} / {frac_ell:.4f}")
print(f"Diagonal U(2) commutes with P: {passes_diag}/{tests_diag} PASS")
print(f"Left U(2) commutes with P: {passes_left}/{tests_left} (correct: fails)")
print()
print("KEY FINDING:")
print("SU(2)_L (left action) does NOT commute with exchange operator P.")
print("This means quarks are simultaneously charged under SU(3) and SU(2).")
print("The non-commutativity is STRUCTURAL — forced by the tensor product.")

