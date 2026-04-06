"""
CRITICAL CORRECTIONS to Route C analysis.
Two errors found. Fixing them honestly.
"""
import numpy as np
from scipy.linalg import expm

I2 = np.eye(2)
h = np.array([[1,0],[0,-1]], dtype=float)
N = np.array([[0,-1],[1,0]], dtype=float)
J = np.array([[0,1],[1,0]], dtype=float)
ep = np.array([[0,1],[0,0]], dtype=float)
em = np.array([[0,0],[1,0]], dtype=float)

def killing(X,Y):
    return 4*np.trace(X@Y)

print("="*75)
print("CORRECTION 1: [h,N] IS NOT NILPOTENT")
print("="*75)

bracket = h@N - N@h
print(f"[h,N] = \n{bracket}")
print(f"[h,N]² = \n{bracket@bracket}")
print(f"[h,N]² = 4I? {np.allclose(bracket@bracket, 4*I2)}")
print(f"NILPOTENT? NO. [h,N]² = 4I ≠ 0.")
print(f"B([h,N],[h,N]) = {killing(bracket,bracket):.1f}")
print(f"[h,N] is HYPERBOLIC (B = 32 > 0), NOT nilpotent.")
print(f"[h,N] = -2J = -2·[[0,1],[1,0]]")
print(f"Check: {np.allclose(bracket, -2*J)}")
print()
print("The commutator rigidity claim was WRONG.")
print("[h,N] ∈ H (hyperbolic), not N₀ (nilpotent).")
print()

# What IS the orthogonal complement of span{h,N}?
print("Orthogonal complement of span{h,N} in sl(2,R):")
print(f"B(h,h) = {killing(h,h):.0f}, B(N,N) = {killing(N,N):.0f}, B(h,N) = {killing(h,N):.0f}")
print("span{{h,N}} has Killing signature (1,1) (one + one -)")
print("sl(2,R) has signature (2,1)")
print("Complement: signature (2,1) - (1,1) = (1,0) → POSITIVE, not null")
print(f"The complement is span{{J}}, B(J,J) = {killing(J,J):.0f} > 0 → HYPERBOLIC")
print()
print("[h,N] = -2J ∈ span{J} = orthogonal complement. CORRECT.")
print("But complement is HYPERBOLIC, not NILPOTENT. CORRECTED.")

print("\n" + "="*75)
print("CORRECTION 2: MONODROMY ARGUMENT HAS A PARAMETRIZATION GAP")
print("="*75)

print("""
The monodromy argument claimed: if P(e,π) = 0, then P(α(s), T(s)) = 0
for s in some open set, and monodromy forces P(α(s), -T(s)) = 0 too.

PROBLEM: The pair (e, π) does NOT correspond to any single value of s.
  At s = 0: α(0) = e,     but T(0) is UNDEFINED (hyperbolic sector)
  At s = 1: T(1) = π,     but α(1) = cos(1) ≠ e

No single parameter value s gives the pair (e, π) simultaneously.

Therefore: P(α(s), T(s)) = 0 holding on an open set is NOT 
established from P(e, π) = 0. The monodromy argument as stated 
has a parametrization gap.

The monodromy itself (T → -T around s = 1/2) is CORRECT.
The application to P(e, π) = 0 is NOT DIRECTLY VALID.

POSSIBLE FIX: Use a DIFFERENT parameterization where both e and π 
appear at the same parameter value. For example:

F(t₁, t₂) = (exp(t₁·h)[0,0], smallest θ>0 with exp(θ·t₂·N)=-I)
           = (exp(t₁),       π/t₂)

At (t₁, t₂) = (1, 1): F = (e, π).

But P(exp(t₁), π/t₂) = 0 at (1,1) does NOT imply it holds on 
an open set — it's a real-analytic function that could vanish 
at an isolated point.

STATUS: The monodromy SPLITTING theorem (P = Q(x,y²) + yR(x,y²))
requires P(α(s), T(s)) = 0 on an interval, which is NOT established.
""")

print("="*75)
print("WHAT SURVIVES AFTER CORRECTIONS")
print("="*75)

print("""
STILL PROVED (from earlier work, unaffected by corrections):
  ✓ Sector partition: H, E, N₀ exhaust sl(2,R)\\{0}
  ✓ Source placement: e ∈ H, π ∈ E
  ✓ Topological boundary forcing (IVT)
  ✓ Boundary sterility: exp(nilpotent) = algebraic, no period on N₀
  ✓ Period wall: T(s) → ∞ at boundary, α(s) → 3/2 ∈ Q
  ✓ Polynomial divergence at boundary (Corollary 5.9)
  ✓ Linearized mixing exclusion (G_m × SO₂ direct product)
  ✓ Differential disjointness: K_H ∩ K_E = Q̄(x)
  ✓ Schanuel equivalence: Lemma 4.3 ⟺ Schanuel for (1, iπ)
  ✓ Nesterenko compatibility
  ✓ Non-special point
  ✓ Real-complex path obstruction

STILL PROVED (from Route C, valid):
  ✓ Trace encoding: both e and π encoded via τ(X) = tr(exp(X))
  ✓ Complexified deformation: α(s) entire, T(s) branched at s=1/2
  ✓ LW on deformation: α(s) transcendental for algebraic s ≠ 1/2
  ✓ Monodromy of T: T → -T around branch point (valid as math)

RETRACTED:
  ✗ Commutator rigidity: [h,N] ∈ N₀. WRONG. [h,N] = -2J ∈ H.
  ✗ Monodromy splitting of P: requires P(α(s),T(s))=0 on open set,
    which is not established from P(e,π)=0 alone.
  ✗ BCH boundary terms: the BCH involves [h,N] = -2J (hyperbolic),
    not a nilpotent term. BCH doesn't go through boundary.

NET RESULT: Route C found interesting structure (trace encoding,
complexified deformation, LW transcendence on the family) but did
NOT close the gap. The two claimed new theorems (commutator rigidity,
monodromy splitting) both had errors.

The gap remains: Lemma 4.3 = Schanuel for (1, iπ).
""")

print("\n" + "="*75)
print("SALVAGEABLE IDEA: THE JOINT PARAMETERIZATION")
print("="*75)

print("""
The monodromy argument WOULD work if we could find a parameterization
Ψ: C → C² with Ψ(s₀) = (e, π) and Ψ having branch monodromy.

CANDIDATE: Consider the 2-parameter family
  F(t₁, t₂) = (exp(t₁), π/t₂)

At (1,1): F = (e, π). Now set t₁ = 1/(1-s), t₂ = 1/s for s ∈ (0,1).
At s = 1/2: t₁ = 2, t₂ = 2, F = (e², π/2). 
As s → 0: t₁ → 1, t₂ → ∞, F → (e, 0).
As s → 1: t₁ → ∞, t₂ → 1, F → (∞, π).

This still doesn't give (e, π) along a curve with branch monodromy.

The fundamental issue: e and π are defined through DIFFERENT operations
(matrix entry vs period) on DIFFERENT elements (h vs N) of sl(2,R).
There is no natural 1-parameter family that simultaneously produces
both at a single evaluation.

THIS is why the problem is hard. The two transcendentals come from
structurally different functionals on the same Lie algebra. Connecting
them requires either:
(a) An external theorem (Schanuel), or
(b) A framework-internal argument that DOESN'T need a joint
    parameterization.

Route C attempted (b) but the two main arguments had errors.
The search continues.
""")

print("\n" + "="*75)
print("WHAT I ACTUALLY LEARNED")
print("="*75)

print("""
1. [h,N] = -2J is HYPERBOLIC, not nilpotent. The Lie algebra 
   structure doesn't force the generators' connection through 
   the boundary. It forces it through the HYPERBOLIC direction.
   
   This is actually an interesting STRUCTURAL observation:
   The commutator of the φ-generator and the π-generator is 
   proportional to J = [[0,1],[1,0]], which is the trivial 
   involution (the "swap" permutation). J² = I, eigenvalues ±1.
   
   The connection h ↔ N goes through J, not through the boundary.

2. The parametrization problem — needing (e, π) at a single 
   parameter value — is the EXACT obstacle that makes this hard.
   The deformation family tracks exp-map OUTPUT (giving e-type 
   numbers) and PERIOD (giving π-type numbers) but never both 
   at the same point.
   
   This is a deep structural feature: the exponential output and 
   the period are DUAL readings of the same map, not two values 
   of the same reading. Getting them at the same parameter requires
   a self-referential construction — which is precisely what the 
   framework's R(R) = R loop structure provides in principle but
   we haven't been able to formalize for this specific problem.

3. The correct path may be to ABANDON single-deformation arguments
   and instead work with the PAIR of evaluations directly, using
   the framework's Killing geometry to constrain what relations
   are possible between the two types of output.
""")

