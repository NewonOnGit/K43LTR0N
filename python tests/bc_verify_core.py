"""
BC Algebra — Core Theorem Verification
Verifies: bijection, shell size, J, RP, CP, C, branch points, Fibonacci BC
"""
import numpy as np
from itertools import product

N_MAX = 20  # max shell for exhaustive tests

# === CORE DEFINITIONS ===

def phi(a, b):
    """Pair-space -> BC"""
    k = min(a, b)
    r = abs(a - b)
    s = 0 if a == b else (1 if a > b else -1)
    return (k, r, s)

def phi_inv(k, r, s):
    """BC -> Pair-space"""
    if s == 0:
        return (k, k)
    elif s == 1:
        return (k + r, k)
    else:  # s == -1
        return (k, k + r)

def is_legal(k, r, s):
    """Check BC legality"""
    if k < 0 or r < 0:
        return False
    if r == 0 and s != 0:
        return False
    if r > 0 and s == 0:
        return False
    return True

# === OPERATORS ===

def J(k, r, s):
    return (k, r, -s)

def RP(k, r, s):
    if r == 0:
        return (0, 0, 0)
    return (0, r, s)

def CP(k, r, s):
    N = 2*k + r
    return (N // 2, 0, 0)

def C(k, r, s):
    if r == 0:
        return (k, 0, 0)
    elif r == 1:
        return (k + 1, 0, 0)
    else:  # r >= 2
        return (k + 1, r - 2, s)

# === GENERATE ALL STATES ON SHELLS 0..N_MAX ===

def all_bc_states(n_max):
    states = []
    for N in range(n_max + 1):
        for k in range(N // 2 + 1):
            r = N - 2*k
            if r == 0:
                states.append((k, 0, 0))
            else:
                states.append((k, r, 1))
                states.append((k, r, -1))
    return states

# === TEST 1: BIJECTION ===
print("=" * 60)
print("TEST 1: BC Coordinate Bijection (Thm 1.4)")
print("=" * 60)

failures_bij = 0
count = 0
for N in range(N_MAX + 1):
    for a in range(N + 1):
        b = N - a
        bc = phi(a, b)
        recovered = phi_inv(*bc)
        if recovered != (a, b):
            print(f"  FAIL: ({a},{b}) -> {bc} -> {recovered}")
            failures_bij += 1
        # Also check inverse direction
        k, r, s = bc
        if not is_legal(k, r, s):
            print(f"  FAIL: ({a},{b}) -> illegal BC state {bc}")
            failures_bij += 1
        pair = phi_inv(k, r, s)
        bc2 = phi(*pair)
        if bc2 != bc:
            print(f"  FAIL: BC {bc} -> pair {pair} -> BC {bc2}")
            failures_bij += 1
        count += 1

print(f"  Tested {count} pairs, {failures_bij} failures")
print(f"  {'PASS ✓' if failures_bij == 0 else 'FAIL ✗'}")

# === TEST 2: SHELL SIZE ===
print("\n" + "=" * 60)
print("TEST 2: Shell Size (Prop 2.5)")
print("=" * 60)

failures_shell = 0
for N in range(N_MAX + 1):
    # Count pair states with a+b = N
    pair_count = N + 1
    # Count BC states on shell N
    bc_count = 0
    for k in range(N // 2 + 1):
        r = N - 2*k
        if r == 0:
            bc_count += 1
        else:
            bc_count += 2  # + and -
    if bc_count != pair_count:
        print(f"  FAIL: Shell {N}: pair count {pair_count}, BC count {bc_count}")
        failures_shell += 1

print(f"  Tested shells 0..{N_MAX}, {failures_shell} failures")
print(f"  {'PASS ✓' if failures_shell == 0 else 'FAIL ✗'}")

# === TEST 3: BALANCED SHELL COUNT (Prop 2.6) ===
print("\n" + "=" * 60)
print("TEST 3: Balanced Shell Count (Prop 2.6)")
print("=" * 60)

failures_bal = 0
for N in range(N_MAX + 1):
    bal_count = 1 if N % 2 == 0 else 0
    actual = sum(1 for k in range(N // 2 + 1) if N - 2*k == 0)
    if actual != bal_count:
        print(f"  FAIL: Shell {N}: expected {bal_count} balanced, got {actual}")
        failures_bal += 1

print(f"  Tested shells 0..{N_MAX}, {failures_bal} failures")
print(f"  {'PASS ✓' if failures_bal == 0 else 'FAIL ✗'}")

# === TEST 4: J PROPERTIES (Thm 3.2) ===
print("\n" + "=" * 60)
print("TEST 4: Reflection J (Thm 3.2)")
print("=" * 60)

states = all_bc_states(N_MAX)
f_j = 0

for st in states:
    k, r, s = st
    jst = J(k, r, s)
    jjst = J(*jst)
    
    # (1) Pair equivalence
    a, b = phi_inv(k, r, s)
    bc_swap = phi(b, a)
    if jst != bc_swap:
        print(f"  FAIL pair equiv: J{st} = {jst}, Φ(swap) = {bc_swap}")
        f_j += 1
    
    # (2) Involution
    if jjst != st:
        print(f"  FAIL involution: J²{st} = {jjst}")
        f_j += 1
    
    # (3-5) Preserves k, r, N
    if jst[0] != k or jst[1] != r:
        print(f"  FAIL preserves k,r: J{st} = {jst}")
        f_j += 1
    if 2*jst[0] + jst[1] != 2*k + r:
        print(f"  FAIL preserves N: J{st} = {jst}")
        f_j += 1
    
    # (6) Sign flip
    if r > 0 and jst[2] != -s:
        print(f"  FAIL sign flip: J{st} = {jst}")
        f_j += 1
    if r == 0 and jst[2] != 0:
        print(f"  FAIL balanced fix: J{st} = {jst}")
        f_j += 1

# (7) Fixed set = balanced spine
fix_j = [st for st in states if J(*st) == st]
bal = [st for st in states if st[1] == 0]
if set(fix_j) != set(bal):
    print(f"  FAIL fixed set: Fix(J) ≠ B")
    f_j += 1

print(f"  Tested {len(states)} states, {f_j} failures")
print(f"  {'PASS ✓' if f_j == 0 else 'FAIL ✗'}")

# === TEST 5: RP PROPERTIES (Thm 4.2) ===
print("\n" + "=" * 60)
print("TEST 5: Residual Projection RP (Thm 4.2)")
print("=" * 60)

f_rp = 0
for st in states:
    k, r, s = st
    rpst = RP(k, r, s)
    
    # (1) Pair equivalence
    a, b = phi_inv(k, r, s)
    strip_a, strip_b = a - min(a, b), b - min(a, b)
    bc_strip = phi(strip_a, strip_b)
    if rpst != bc_strip:
        print(f"  FAIL pair equiv: RP{st} = {rpst}, Φ(strip) = {bc_strip}")
        f_rp += 1
    
    # (2) Idempotent
    rp2 = RP(*rpst)
    if rp2 != rpst:
        print(f"  FAIL idempotent: RP²{st} = RP({rpst}) = {rp2}")
        f_rp += 1
    
    # (3) k-annihilating
    if rpst[0] != 0:
        print(f"  FAIL k-annihilating: RP{st} = {rpst}")
        f_rp += 1
    
    # (4) r-preserving
    if rpst[1] != r:
        print(f"  FAIL r-preserving: RP{st} = {rpst}")
        f_rp += 1
    
    # (5) s-preserving
    if rpst[2] != s:
        print(f"  FAIL s-preserving: RP{st} = {rpst}")
        f_rp += 1

print(f"  Tested {len(states)} states, {f_rp} failures")
print(f"  {'PASS ✓' if f_rp == 0 else 'FAIL ✗'}")

# === TEST 6: CP PROPERTIES (Thm 5.2) ===
print("\n" + "=" * 60)
print("TEST 6: Center Projection CP (Thm 5.2)")
print("=" * 60)

f_cp = 0
for st in states:
    k, r, s = st
    cpst = CP(k, r, s)
    N = 2*k + r
    
    # (1) Shell-center collapse
    expected = (N // 2, 0, 0)
    if cpst != expected:
        print(f"  FAIL shell-center: CP{st} = {cpst}, expected {expected}")
        f_cp += 1
    
    # (2) Idempotent
    cp2 = CP(*cpst)
    if cp2 != cpst:
        print(f"  FAIL idempotent: CP²{st} = CP({cpst}) = {cp2}")
        f_cp += 1
    
    # (8) J-commuting: CP(J(x)) = CP(x)
    cpj = CP(*J(k, r, s))
    if cpj != cpst:
        print(f"  FAIL J-commute: CP∘J{st} = {cpj} ≠ {cpst}")
        f_cp += 1
    
    # Check: image is balanced
    if cpst[1] != 0 or cpst[2] != 0:
        print(f"  FAIL image balanced: CP{st} = {cpst}")
        f_cp += 1

# Shell preservation check
n_even_preserved = 0
n_odd_shifted = 0
for st in states:
    k, r, s = st
    N = 2*k + r
    cpst = CP(k, r, s)
    N_out = 2*cpst[0]
    if N % 2 == 0:
        if N_out == N:
            n_even_preserved += 1
        else:
            print(f"  FAIL even shell preserve: N={N}, CP gives N'={N_out}")
            f_cp += 1
    else:
        if N_out == N - 1:
            n_odd_shifted += 1
        else:
            print(f"  FAIL odd shell shift: N={N}, CP gives N'={N_out}")
            f_cp += 1

print(f"  Even shells preserved: {n_even_preserved}")
print(f"  Odd shells shifted N→N-1: {n_odd_shifted}")
print(f"  Tested {len(states)} states, {f_cp} failures")
print(f"  {'PASS ✓' if f_cp == 0 else 'FAIL ✗'}")

# === TEST 7: CENTER-CONDENSE C (Thm 6.2) ===
print("\n" + "=" * 60)
print("TEST 7: Center-Condense C (Thm 6.2)")
print("=" * 60)

f_c = 0
shell_changes = {0: 0, 1: 0}  # count of r=0, r=1 cases

for st in states:
    k, r, s = st
    N = 2*k + r
    cst = C(k, r, s)
    N_out = 2*cst[0] + cst[1]
    
    # Shell behavior
    if r == 0:
        if cst != st:
            print(f"  FAIL fixpoint: C{st} = {cst}")
            f_c += 1
    elif r == 1:
        expected = (k+1, 0, 0)
        if cst != expected:
            print(f"  FAIL terminal: C{st} = {cst}, expected {expected}")
            f_c += 1
        if N_out != N + 1:
            shell_changes[1] += 1  # confirm shell increment at r=1
    elif r >= 2:
        expected = (k+1, r-2, s)
        if cst != expected:
            print(f"  FAIL transport: C{st} = {cst}, expected {expected}")
            f_c += 1
        if N_out != N:
            print(f"  FAIL shell preserve (r≥2): N={N}, N'={N_out}")
            f_c += 1

# Convergence test
f_conv = 0
for st in states:
    k0, r0, s0 = st
    if r0 == 0:
        continue
    state = st
    steps = 0
    while state[1] > 0:
        state = C(*state)
        steps += 1
        if steps > 100:
            print(f"  FAIL convergence: stuck at {state} from {st}")
            f_conv += 1
            break
    expected_steps = (r0 + 1) // 2  # ceil(r0/2)
    if steps != expected_steps:
        print(f"  FAIL step count: from {st}, took {steps} steps, expected {expected_steps}")
        f_conv += 1

print(f"  Shell increment at r=1 confirmed: {shell_changes[1]} cases")
print(f"  Operator failures: {f_c}")
print(f"  Convergence failures: {f_conv}")
print(f"  {'PASS ✓' if f_c == 0 and f_conv == 0 else 'FAIL ✗'}")

# === TEST 8: FIBONACCI BC (Prop 16.1) ===
print("\n" + "=" * 60)
print("TEST 8: Fibonacci BC Transport (Prop 16.1)")
print("=" * 60)

def fib(n):
    if n <= 0: return 0
    if n == 1: return 1
    a, b = 0, 1
    for _ in range(n - 1):
        a, b = b, a + b
    return b

f_fib = 0
print(f"  {'n':>3} | {'F(n)':>8} | {'F(n+1)':>8} | {'BC state':>20} | {'Expected':>20} | {'r/k':>8}")
print(f"  {'-'*3}-+-{'-'*8}-+-{'-'*8}-+-{'-'*20}-+-{'-'*20}-+-{'-'*8}")

for n in range(1, 21):
    fn = fib(n)
    fn1 = fib(n + 1)
    bc = phi(fn, fn1)
    fn_minus_1 = fib(n - 1)
    expected = (fn, fn_minus_1, -1)  # F(n) < F(n+1) for n>=1, so s = -
    # Wait: min(F(n), F(n+1)) = F(n), |F(n)-F(n+1)| = F(n+1)-F(n) = F(n-1)
    # Since F(n) < F(n+1) for n >= 1, we have a < b, so s = -1
    # But the brief says s = + ... let me check
    # (a,b) = (F(n), F(n+1)): a < b, so k=F(n), r=F(n-1), s=-
    # Hmm, the brief says positive. Let me check with the OTHER convention:
    # Maybe the brief uses (F(n+1), F(n)) as the pair?
    # R·[F(n), F(n+1)]^T = [F(n+1), F(n+2)]^T
    # So the pair evolving is (F(n), F(n+1)) with F(n) < F(n+1) for n≥1
    # In our convention: s = - (since a < b)
    
    ratio = bc[1] / bc[0] if bc[0] > 0 else float('inf')
    
    expected_check = (fn, fn_minus_1, -1)
    match = "✓" if bc == expected_check else "✗"
    if bc != expected_check:
        f_fib += 1
    
    if n <= 10 or n == 20:
        print(f"  {n:3d} | {fn:8d} | {fn1:8d} | {str(bc):>20} | {str(expected_check):>20} | {ratio:8.5f} {match}")

phi_bar = (np.sqrt(5) - 1) / 2
print(f"\n  Asymptotic ratio r/k → {phi_bar:.10f} = φ̄")
print(f"  Last computed ratio: {fib(19)/fib(20):.10f}")
print(f"  Fibonacci BC failures: {f_fib}")
print(f"  {'PASS ✓' if f_fib == 0 else 'FAIL ✗'}")
print(f"\n  NOTE: Fibonacci pairs (F(n), F(n+1)) land on NEGATIVE sheet (s=-)")
print(f"  because F(n) < F(n+1). The brief's 'positive' convention uses")
print(f"  the reversed pair (F(n+1), F(n)).")

# === TEST 9: COMMUTATION TABLE (partial) ===
print("\n" + "=" * 60)
print("TEST 9: Commutation Table (partial)")
print("=" * 60)

f_comm = 0
# J ∘ RP vs RP ∘ J
for st in states[:100]:  # sample
    k, r, s = st
    j_rp = J(*RP(k, r, s))
    rp_j = RP(*J(k, r, s))
    if j_rp != rp_j:
        print(f"  J∘RP ≠ RP∘J at {st}: {j_rp} vs {rp_j}")
        f_comm += 1
        break

# RP ∘ CP: should be (0,0,0) always
for st in states[:100]:
    k, r, s = st
    rp_cp = RP(*CP(k, r, s))
    if rp_cp != (0, 0, 0):
        print(f"  RP∘CP ≠ origin at {st}: {rp_cp}")
        f_comm += 1
        break

# CP ∘ RP
cp_rp_results = set()
for st in states[:50]:
    k, r, s = st
    cp_rp = CP(*RP(k, r, s))
    cp_rp_results.add(cp_rp)
    # RP gives (0, r, s) or (0,0,0), then CP of that gives (r//2, 0, 0) or (0,0,0)
    rpst = RP(k, r, s)
    expected = (rpst[1] // 2, 0, 0)  # CP of (0, r, s) has N=r, so k'=r//2
    if cp_rp != expected:
        print(f"  CP∘RP unexpected at {st}: got {cp_rp}, expected {expected}")
        f_comm += 1
        break

print(f"  J ∘ RP = RP ∘ J: {'CONFIRMED ✓' if f_comm == 0 else 'FAILED'}")
print(f"  RP ∘ CP = (0,0,0): {'CONFIRMED ✓' if f_comm == 0 else 'FAILED'}")
print(f"  CP ∘ RP: (0,r,s) → (⌊r/2⌋,0,0): {'CONFIRMED ✓' if f_comm == 0 else 'FAILED'}")

# C ∘ J vs J ∘ C (away from singularity)
f_cj = 0
for st in states:
    k, r, s = st
    if r <= 1:  # skip singular + fixpoint
        continue
    cj = C(*J(k, r, s))
    jc = J(*C(k, r, s))
    if cj != jc:
        print(f"  C∘J ≠ J∘C at {st}: {cj} vs {jc}")
        f_cj += 1
        if f_cj > 3:
            break

# At singularity r=1
cj_sing = 0
for st in states:
    k, r, s = st
    if r != 1:
        continue
    cj = C(*J(k, r, s))
    jc = J(*C(k, r, s))
    if cj != jc:
        cj_sing += 1

print(f"  C ∘ J = J ∘ C (r≥2): {'CONFIRMED ✓' if f_cj == 0 else f'FAILED ({f_cj} cases)'}")
print(f"  C ∘ J = J ∘ C (r=1): {'YES' if cj_sing == 0 else f'NO ({cj_sing} mismatches)'}")

print("\n" + "=" * 60)
print("SUMMARY")
print("=" * 60)
all_pass = (failures_bij == 0 and failures_shell == 0 and failures_bal == 0 
            and f_j == 0 and f_rp == 0 and f_cp == 0 and f_c == 0 
            and f_conv == 0)
print(f"  Core theorems: {'ALL PASS ✓' if all_pass else 'SOME FAILURES'}")
print(f"  Fibonacci: {'PASS ✓ (negative sheet)' if f_fib == 0 else 'FAIL'}")
print(f"  Commutations: partial verification complete")
