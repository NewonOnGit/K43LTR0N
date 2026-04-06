import numpy as np

phi = (1 + np.sqrt(5)) / 2
phi_bar = (np.sqrt(5) - 1) / 2  # = 1/phi
print("=== BASIC CONSTANTS ===")
print(f"φ = {phi:.10f}")
print(f"φ̄ = {phi_bar:.10f}")
print(f"φ̄² = {phi_bar**2:.10f}")
print(f"φ̄³ = {phi_bar**3:.10f}")
print(f"φ̄³/2 = {phi_bar**3/2:.10f}")
print()

# Pattern 1: Five-fold
print("=== PATTERN 1: FIVE-FOLD ===")
R = np.array([[0,1],[1,1]], dtype=float)
N = np.array([[0,-1],[1,0]], dtype=float)
norm_R_sq = np.sum(R**2)
norm_N_sq = np.sum(N**2)
print(f"‖R‖² = {norm_R_sq}")
print(f"‖N‖² = {norm_N_sq}")
print(f"‖R‖² + ‖N‖² = {norm_R_sq + norm_N_sq}")

eigR = np.linalg.eigvals(R)
print(f"φ² + φ̄² = {phi**2 + phi_bar**2:.10f}  (should be 3 = tr(R²+I)/... )")
print(f"Actual: φ² = {phi**2:.6f}, φ̄² = {phi_bar**2:.6f}, sum = {phi**2 + phi_bar**2:.6f}")

Gram = np.array([[norm_R_sq, np.sum(R*N)], [np.sum(R*N), norm_N_sq]])
print(f"Gram matrix:\n{Gram}")
print(f"det(Gram) = {np.linalg.det(Gram):.6f}  (should be 25 = 5²)")
print()

# Pattern 2: φ̄² universality
print("=== PATTERN 2: φ̄² THRESHOLD ===")
print(f"φ̄² = 1 - φ̄ = {1 - phi_bar:.10f}  (golden identity)")
print(f"e^{{-2β}} at β=ln(φ): {np.exp(-2*np.log(phi)):.10f}")
print(f"|R'(φ̄)| = 1/(1+φ̄)² = {1/(1+phi_bar)**2:.10f}")
print(f"All three equal? {np.allclose(phi_bar**2, 1-phi_bar) and np.allclose(phi_bar**2, np.exp(-2*np.log(phi)))}")
print()

# α_S = φ̄³/2
alpha_S_framework = phi_bar**3 / 2
alpha_S_exp = 0.1179
print(f"α_S (framework) = φ̄³/2 = {alpha_S_framework:.10f}")
print(f"α_S (experimental) = {alpha_S_exp}")
print(f"Self-ref gap: 1/2 - φ̄² = {0.5 - phi_bar**2:.10f}")
print(f"φ̄³/2 = {phi_bar**3/2:.10f}")
print(f"Match: {np.isclose(0.5 - phi_bar**2, phi_bar**3/2)}")
print()

# Hurwitz constant
print(f"1/√5 = 1/√disc(R) = {1/np.sqrt(5):.10f}")
print(f"log_φ(2) = {np.log(2)/np.log(phi):.10f}")
print()

# RG critical exponent
nu = 1 / (2 * np.log(phi))
print(f"RG critical exponent ν = 1/(2ln(φ)) = {nu:.10f}")
print()

# Pattern 3: Gauge rank
print("=== PATTERN 3: GAUGE RANK ===")
print(f"|V₄| = 4")
print(f"rank(SU(3)) = 2, rank(SU(2)) = 1, rank(U(1)) = 1")
print(f"Total rank = 4 = |V₄|")
print()

# Pattern 4: Koide phase
print("=== PATTERN 4: KOIDE PHASE ===")
delta = 2*np.pi/3 + 2/9
print(f"2/9 = {2/9:.10f}")
print(f"φ̄³ = {phi_bar**3:.10f}")
print(f"Difference: {phi_bar**3 - 2/9:.10f}  ({(phi_bar**3 - 2/9)/(2/9)*100:.2f}%)")
print(f"φ̄⁵/2 = {phi_bar**5/2:.10f}")
print(f"Does φ̄³ - 2/9 ≈ φ̄⁵/2? {phi_bar**3 - 2/9:.6f} vs {phi_bar**5/2:.6f}")
print()

# Pattern 6: π-emergence test
print("=== PATTERN 6: π-EMERGENCE TEST ===")
test = 4 * np.log(2)/np.log(phi) * phi_bar**2
print(f"4·log_φ(2)·φ̄² = {test:.10f}")
print(f"π = {np.pi:.10f}")
print(f"Ratio π / (4·log_φ(2)·φ̄²) = {np.pi/test:.10f}")
print(f"log_φ(2) = {np.log(2)/np.log(phi):.10f}")
print(f"Match? NO — ratio is {np.pi/test:.4f}, not a clean constant")
print()

# Pattern 7: Scale ratio
print("=== PATTERN 7: SCALE RATIO ===")
print(f"φ̄^{{-44}} = {phi_bar**(-44):.6e}")
print(f"φ̄^{{44}} = {phi_bar**44:.6e}")
print(f"This is E_B/E_P = η")
# E_P ≈ 1.22e19 GeV
E_P = 1.22e19
E_B = E_P * phi_bar**44
print(f"E_B = E_P × φ̄^{{44}} ≈ {E_B:.2e} GeV")
print()

# Verify: φ̄³/2 identity
print("=== KEY IDENTITY VERIFICATION ===")
print(f"1/2 - φ̄² = {0.5 - phi_bar**2:.15f}")
print(f"φ̄³/2     = {phi_bar**3/2:.15f}")
print(f"Exact match: {np.isclose(0.5 - phi_bar**2, phi_bar**3/2, atol=1e-15)}")
# Algebraic proof: 1/2 - φ̄² = 1/2 - (1-φ̄) = φ̄ - 1/2 = (2φ̄-1)/2 = (√5-2)/2 = φ̄³/2
# since φ̄³ = 2φ̄-1 = √5-2
print(f"Algebraic: φ̄³ = 2φ̄ - 1 = {2*phi_bar - 1:.15f} = {phi_bar**3:.15f}")

# Gram matrix correction check
print("\n=== GRAM MATRIX INVESTIGATION ===")
I2 = np.eye(2)
RN = R @ N
basis = [I2, R, N, RN]
labels = ['I', 'R', 'N', 'RN']

# Frobenius Gram matrix for full basis {I,R,N,RN}
Gram4 = np.zeros((4,4))
for i in range(4):
    for j in range(4):
        Gram4[i,j] = np.trace(basis[i].T @ basis[j])

print(f"4×4 Gram matrix (Frobenius) for {{I,R,N,RN}}:")
print(Gram4)
print(f"det(4×4 Gram) = {np.linalg.det(Gram4):.6f}")
print(f"eigenvalues: {np.sort(np.linalg.eigvals(Gram4))[::-1]}")
print()

# Killing form on sl(2,R) = span{R-I/2 tr(R)·I, N, RN-I/2 tr(RN)·I}
# Trace of R = 1, so traceless R = R - I/2
# Trace of RN = ?
print(f"RN = {RN}")
print(f"tr(RN) = {np.trace(RN)}")
# RN = [[0,1],[1,1]]@[[0,-1],[1,0]] = [[1,0],[1,-1]]
# tr = 1+(-1) = 0. Good, RN is already traceless.
# sl(2,R) basis: h = R - I/2, N, RN  (if tr(R-I/2)=0)
h = R - I2 * np.trace(R) / 2  # traceless part of R
print(f"h = R - (1/2)I = {h}")
print(f"tr(h) = {np.trace(h)}")
sl2_basis = [h, N, RN]
sl2_labels = ['h', 'N', 'RN']
Killing = np.zeros((3,3))
for i in range(3):
    for j in range(3):
        # Killing form B(X,Y) = 4tr(XY) for 2x2
        Killing[i,j] = 4 * np.trace(sl2_basis[i] @ sl2_basis[j])
print(f"Killing form on sl(2,R):")
print(Killing)
print(f"det(Killing) = {np.linalg.det(Killing):.6f}")
print()

# Maybe the Gram from the memory is: Gram of {R,N} using Killing form?
Gram_RN_Killing = np.array([
    [4*np.trace(R@R), 4*np.trace(R@N)],
    [4*np.trace(N@R), 4*np.trace(N@N)]
])
print(f"Gram(R,N) with Killing-like 4tr(XY):")
print(Gram_RN_Killing)
print(f"det = {np.linalg.det(Gram_RN_Killing)}")

# Check: R² = R+I, so tr(R²) = tr(R+I) = 1+2 = 3
# N² = -I, so tr(N²) = tr(-I) = -2
# tr(RN) = 0 (computed above)
print(f"\ntr(R²) = {np.trace(R@R)}")
print(f"tr(N²) = {np.trace(N@N)}")
print(f"tr(RN) = {np.trace(R@N)}")

# B(R,R) = 4tr(R²) = 12
# B(N,N) = 4tr(N²) = -8
# This matches the T4 §3 layer 5 content: B(R,R)=12, B(N,N)=-8
print(f"\nB(R,R) = 4·tr(R²) = {4*np.trace(R@R)}")
print(f"B(N,N) = 4·tr(N²) = {4*np.trace(N@N)}")


# Gram eigenvalue identification
print("\n=== GRAM EIGENVALUE IDENTIFICATION ===")
print(f"Eigenvalues of 4×4 Gram: {np.sort(np.linalg.eigvals(Gram4))[::-1]}")
print(f"√5·φ = {np.sqrt(5)*phi:.10f}")
print(f"√5·φ̄ = {np.sqrt(5)*phi_bar:.10f}")
print(f"Product (√5·φ)²·(√5·φ̄)² = {(np.sqrt(5)*phi)**2 * (np.sqrt(5)*phi_bar)**2:.6f}")
print(f"= (5·φ·φ̄)² = (5·{phi*phi_bar:.6f})² = {(5*phi*phi_bar)**2:.6f}")
print(f"Note: φ·φ̄ = φ·(1/φ) = 1 (exact)")
print(f"So det(Gram) = 5² = 25. ✓")
print()

# Double-check: does the 2×2 Gram of {R,N} under Frobenius give 5?
Gram2_frob = np.array([[np.sum(R**2), np.sum(R*N)], [np.sum(R*N), np.sum(N**2)]])
print(f"2×2 Gram(R,N) Frobenius: {Gram2_frob}")
print(f"det = {np.linalg.det(Gram2_frob):.1f}")
print(f"This is 6 = ‖R‖²·‖N‖² - ⟨R,N⟩² = 3·2 - 0 = 6")
print(f"The det=25 comes from the FULL 4×4 basis {{I,R,N,RN}}")

