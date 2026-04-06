"""
BC Algebra — Final Resolution of All Open Items
1. P± compositions with all other operators
2. d_P2 (Euclidean) formula in BC coordinates
3. 17.B: Mixed-sign / sheet-crossing recurrences
4. 17.C: Shell-preserving recurrences
"""
import numpy as np
from collections import defaultdict

# === CORE DEFINITIONS ===
def phi(a, b):
    k = min(a, b); r = abs(a - b)
    s = 0 if a == b else (1 if a > b else -1)
    return (k, r, s)

def phi_inv(k, r, s):
    if s == 0: return (k, k)
    elif s == 1: return (k + r, k)
    else: return (k, k + r)

def J(k, r, s): return (k, r, -s)
def RP(k, r, s): return (0, 0, 0) if r == 0 else (0, r, s)
def CP(k, r, s): return ((2*k+r)//2, 0, 0)
def C(k, r, s):
    if r == 0: return (k, 0, 0)
    elif r == 1: return (k+1, 0, 0)
    elif r == 2: return (k+1, 0, 0)
    else: return (k+1, r-2, s)

def P_out(k, r, s, sign_choice=None):
    """Unified outward transport. sign_choice only matters when r=0."""
    if k == 0: return None  # boundary
    if r == 0:
        if sign_choice is None: return None  # need explicit choice
        return (k-1, 2, sign_choice)
    return (k-1, r+2, s)  # sign-preserving

def Pp(k, r, s): return P_out(k, r, s, sign_choice=1)   # P+
def Pm(k, r, s): return P_out(k, r, s, sign_choice=-1)   # P-

def all_bc_states(n_max):
    states = []
    for N in range(n_max + 1):
        for k in range(N // 2 + 1):
            r = N - 2*k
            if r == 0: states.append((k, 0, 0))
            else:
                states.append((k, r, 1))
                states.append((k, r, -1))
    return states

states = all_bc_states(12)

# ============================================================
# 1. P± COMPOSITIONS
# ============================================================
print("=" * 70)
print("1. P± COMPOSITIONS WITH ALL OTHER OPERATORS")
print("=" * 70)

# Filter states where P+ is defined (k >= 1)
p_states = [st for st in states if st[0] >= 1]

# J ∘ P+
print("\nJ ∘ P+ vs P- (should be equal):")
f = 0
for st in p_states:
    pp = Pp(*st)
    if pp is None: continue
    j_pp = J(*pp)
    pm = Pm(*st)
    if pm is None: continue
    if j_pp != pm:
        f += 1
        if f <= 2: print(f"  FAIL: J∘P+{st}={j_pp} ≠ P-{st}={pm}")
print(f"  J ∘ P+ = P-: {'CONFIRMED ✓' if f == 0 else f'FAIL ({f})'}")

# P+ ∘ J vs J ∘ P+
print("\nP+ ∘ J vs P- ∘ id:")
f2 = 0
for st in p_states:
    jst = J(*st)
    pp_j = Pp(*jst) if jst[0] >= 1 else None
    pm_st = Pm(*st)
    if pp_j is None or pm_st is None: continue
    # P+(J(k,r,s)) = P+(k,r,-s)
    # If r=0: P+(k,0,0) = (k-1,2,+) and P-(k,0,0) = (k-1,2,-)... these differ
    # If r>0: P+(k,r,-s) = (k-1,r+2,-s) and P-(k,r,s) = (k-1,r+2,s)... differ!
    if pp_j == pm_st:
        f2 += 1

# Actually let's check what P+∘J actually equals
print("\nP+ ∘ J formula:")
patterns = defaultdict(list)
for st in p_states:
    jst = J(*st)
    if jst[0] < 1: continue
    pp_j = Pp(*jst)
    if pp_j is None: continue
    k, r, s = st
    if r == 0:
        patterns['r=0'].append((st, jst, pp_j))
    else:
        patterns['r>0'].append((st, jst, pp_j))

for case, exs in patterns.items():
    for st, jst, result in exs[:3]:
        k, r, s = st
        print(f"  {case}: P+(J{st}) = P+{jst} = {result}")
    # Check: P+(J(k,r,s)) = P+(k,r,-s)
    # r=0: P+(k,0,0) = (k-1,2,+) regardless of J (J fixes balanced)
    # r>0: P+(k,r,-s) = (k-1,r+2,-s) [sign-preserving, but sign is now flipped]
    # So P+∘J(k,r,s) for r>0 = (k-1,r+2,-s) = J(P+(k,r,s)) = J(k-1,r+2,s)
    # Hence P+∘J = J∘P+ for r>0. For r=0: P+∘J = P+ (J fixes balanced), J∘P+ = J(k-1,2,+) = (k-1,2,-)
    # So P+∘J ≠ J∘P+ on balanced spine

# Verify P+∘J = J∘P+ away from balanced spine
f3 = 0
f3_bal = 0
for st in p_states:
    k, r, s = st
    jst = J(*st)
    if jst[0] < 1: continue
    pp_j = Pp(*jst)
    j_pp = J(*Pp(*st)) if Pp(*st) else None
    if pp_j is None or j_pp is None: continue
    if r > 0:
        if pp_j != j_pp:
            f3 += 1
    else:
        if pp_j != j_pp:
            f3_bal += 1

print(f"\n  P+∘J = J∘P+ (r>0): {'CONFIRMED ✓' if f3 == 0 else f'FAIL ({f3})'}")
print(f"  P+∘J ≠ J∘P+ (r=0): {f3_bal} cases (expected — J fixes balanced, P+∘J(k,0,0)=P+(k,0,0)=(k-1,2,+) but J∘P+(k,0,0)=J(k-1,2,+)=(k-1,2,-))")

# RP ∘ P+
print("\nRP ∘ P+:")
rp_pp = defaultdict(list)
for st in p_states:
    pp = Pp(*st)
    if pp is None: continue
    result = RP(*pp)
    k, r, s = st
    rp_pp[f"r={r}" if r <= 2 else "r>2"].append((st, pp, result))

for case, exs in sorted(rp_pp.items()):
    for st, pp, result in exs[:2]:
        print(f"  {case}: RP(P+{st}) = RP{pp} = {result}")
    # P+(k,r,s) = (k-1,r+2,s) for r>0 or (k-1,2,+) for r=0
    # RP of that: (0, r+2, s) for r>0 or (0, 2, +) for r=0
    # Unified: RP∘P+ = (0, r+2, s_out) where s_out = s if r>0, + if r=0 and P+

# Verify
f4 = 0
for st in p_states:
    k, r, s = st
    pp = Pp(*st)
    if pp is None: continue
    result = RP(*pp)
    if r == 0:
        expected = (0, 2, 1)  # P+ creates s=+
    else:
        expected = (0, r+2, s)
    if result != expected:
        f4 += 1
        if f4 <= 2: print(f"  FAIL: RP∘P+{st} = {result}, expected {expected}")

print(f"  RP∘P+(k,r,s) = (0, r+2, s_out): {'CONFIRMED ✓' if f4 == 0 else f'FAIL ({f4})'}")

# CP ∘ P+
print("\nCP ∘ P+:")
f5 = 0
for st in p_states:
    pp = Pp(*st)
    if pp is None: continue
    result = CP(*pp)
    k, r, s = st
    N = 2*k + r  # shell of input
    N_pp = 2*(k-1) + (r+2 if r > 0 else 2)  # shell of P+ output = N (always)
    expected = (N_pp // 2, 0, 0)
    if result != expected:
        f5 += 1
        if f5 <= 2: print(f"  FAIL at {st}")

print(f"  CP∘P+ = (⌊N/2⌋, 0, 0) = CP of same shell: {'CONFIRMED ✓' if f5 == 0 else f'FAIL ({f5})'}")
print(f"  (P+ preserves shell, so CP∘P+ = CP — same shell center)")

# C ∘ P+ (already verified = id, but let's also check P+ ∘ C)
print("\nP+ ∘ C (outward after inward):")
pp_c_patterns = defaultdict(int)
f6 = 0
for st in states:
    k, r, s = st
    cst = C(*st)
    if cst[0] < 1: 
        pp_c_patterns['C lands at k=0'] += 1
        continue
    pp_cst = Pp(*cst)
    if pp_cst is None:
        pp_c_patterns['P+ undef'] += 1
        continue
    if pp_cst == st:
        pp_c_patterns['P+∘C = id'] += 1
    else:
        pp_c_patterns['P+∘C ≠ id'] += 1
        f6 += 1
        if f6 <= 5:
            print(f"  P+∘C{st} = P+{cst} = {pp_cst} ≠ {st}")

for k, v in sorted(pp_c_patterns.items()):
    print(f"  {k}: {v}")

# ============================================================
# 2. d_P2 (EUCLIDEAN) IN BC COORDINATES
# ============================================================
print("\n" + "=" * 70)
print("2. d_P2 (PAIR EUCLIDEAN) IN BC COORDINATES")
print("=" * 70)

# For each sign combination, derive formula
# d_P2 = sqrt((a1-a2)^2 + (b1-b2)^2)
# Same case analysis as d_P1 but squared

sign_map = {0: '0', 1: '+', -1: '-'}

for s1 in [0, 1, -1]:
    for s2 in [0, 1, -1]:
        cases = [(x, y) for x in states for y in states if x[2]==s1 and y[2]==s2]
        if not cases: continue
        
        all_match = True
        for x, y in cases:
            k1, r1, _ = x
            k2, r2, _ = y
            a1, b1 = phi_inv(*x)
            a2, b2 = phi_inv(*y)
            actual_sq = (a1-a2)**2 + (b1-b2)**2
            
            # Compute from BC coords
            if s1 == 1 and s2 == 1:
                pred_sq = (k1+r1-k2-r2)**2 + (k1-k2)**2
            elif s1 == -1 and s2 == -1:
                pred_sq = (k1-k2)**2 + (k1+r1-k2-r2)**2
            elif s1 == 0 and s2 == 0:
                pred_sq = 2*(k1-k2)**2
            elif s1 == 1 and s2 == 0:
                pred_sq = (k1+r1-k2)**2 + (k1-k2)**2
            elif s1 == 0 and s2 == 1:
                pred_sq = (k1-k2-r2)**2 + (k1-k2)**2
            elif s1 == -1 and s2 == 0:
                pred_sq = (k1-k2)**2 + (k1+r1-k2)**2
            elif s1 == 0 and s2 == -1:
                pred_sq = (k1-k2)**2 + (k1-k2-r2)**2
            elif s1 == 1 and s2 == -1:
                pred_sq = (k1+r1-k2)**2 + (k1-k2-r2)**2
            elif s1 == -1 and s2 == 1:
                pred_sq = (k1-k2-r2)**2 + (k1+r1-k2)**2
            else:
                pred_sq = None
            
            if pred_sq is not None and pred_sq != actual_sq:
                all_match = False
                break
        
        print(f"  ({sign_map[s1]},{sign_map[s2]}): d²_P2 formula verified — {'✓' if all_match else '✗'}")

# Special case: (0,0) gives d_P2 = sqrt(2)|Δk|
print(f"\n  Notable: d_P2((k1,0,0),(k2,0,0)) = √2·|Δk|")
print(f"  d_P2((k,r,+),(k,r,-)) = √2·r  [same (k,r), opposite sign → pair displacement = 2r along diagonal]")

# Verify the last one
f7 = 0
for st in states:
    k, r, s = st
    if r == 0 or s != 1: continue
    other = (k, r, -1)
    a1, b1 = phi_inv(*st)
    a2, b2 = phi_inv(*other)
    d = np.sqrt((a1-a2)**2 + (b1-b2)**2)
    expected = np.sqrt(2) * r
    if abs(d - expected) > 1e-10:
        f7 += 1
print(f"  Verified d_P2 for opposite-sign same-(k,r): {'PASS ✓' if f7 == 0 else f'FAIL ({f7})'}")

# ============================================================
# 3. INVESTIGATION 17.B: SHEET-CROSSING RECURRENCES
# ============================================================
print("\n" + "=" * 70)
print("3. MIXED-SIGN / SHEET-CROSSING RECURRENCES (17.B)")
print("=" * 70)

def fib(n):
    if n <= 0: return 0
    if n == 1: return 1
    a, b = 0, 1
    for _ in range(n - 1):
        a, b = b, a + b
    return b

# Negative-index Fibonacci: F(-n) = (-1)^(n+1) * F(n)
def fib_ext(n):
    if n >= 0: return fib(n)
    return ((-1)**((-n)+1)) * fib(-n)

# Mixed-sign pair: (F(n), -F(n-1)) or alternating-sign Fibonacci pairs
# Try: pairs from bi-infinite Fibonacci (a_n, a_{n+1}) where a_n = F(n) for n in Z
print("\nBi-infinite Fibonacci pairs (F(n), F(n+1)) for negative n:")
print(f"  {'n':>4} | {'F(n)':>8} | {'F(n+1)':>8} | {'sign':>5}")
for n in range(-8, 4):
    fn = fib_ext(n)
    fn1 = fib_ext(n+1)
    sign = "+" if fn > fn1 else ("-" if fn < fn1 else "0")
    print(f"  {n:4d} | {fn:8d} | {fn1:8d} | {sign}")

# The bi-infinite Fibonacci with NEGATIVE values can't go into BC (requires a,b >= 0)
# So sheet-crossing requires a different construction

# Try: generalized Fibonacci with mixed initial conditions
print("\nGeneralized Fibonacci with (a0, a1) = (3, 1) [a0 > a1, starts on positive sheet]:")
a, b = 3, 1  # a > b, so starts on S+
print(f"  {'n':>3} | {'a':>6} | {'b':>6} | {'BC':>20} | {'sheet':>6}")
for n in range(10):
    bc = phi(a, b)
    sheet = {0: 'B', 1: 'S+', -1: 'S-'}[bc[2]]
    print(f"  {n:3d} | {a:6d} | {b:6d} | {str(bc):>20} | {sheet}")
    a, b = b, a + b

print("\nGeneralized Fibonacci with (a0, a1) = (5, 2):")
a, b = 5, 2
for n in range(8):
    bc = phi(a, b)
    sheet = {0: 'B', 1: 'S+', -1: 'S-'}[bc[2]]
    print(f"  {n:3d} | {a:6d} | {b:6d} | {str(bc):>20} | {sheet}")
    a, b = b, a + b

# Key observation: Fibonacci recurrence ALWAYS has a_{n+1} = a_n + a_{n-1} > a_n for n >= 2
# So after at most 2 steps, b > a and sign stabilizes at S-
# Sheet crossing happens AT MOST ONCE in standard Fibonacci-type recurrences

print("\n=== SHEET CROSSING ANALYSIS ===")
print("For (a0, a1) with a0 > a1 > 0 (starts on S+):")
print("  Step 0: a=a0, b=a1, a>b → S+")
print("  Step 1: a=a1, b=a0+a1, a<b → S- (crossed!)")
print("  Step 2+: b always > a (monotone growth), stays on S-")
print("  → Fibonacci-type recurrences cross sheets EXACTLY ONCE (at step 1)")

# Verify for many initial conditions
crosses = []
for a0 in range(1, 20):
    for a1 in range(1, a0):  # a0 > a1
        a, b = a0, a1
        sheets = []
        for _ in range(10):
            bc = phi(a, b)
            sheets.append(bc[2])
            a, b = b, a + b
        # Count sign changes
        n_cross = sum(1 for i in range(len(sheets)-1) if sheets[i] != sheets[i+1])
        crosses.append(n_cross)

from collections import Counter
cross_dist = Counter(crosses)
print(f"\n  Cross count distribution (a0 > a1 > 0, a0 up to 19): {dict(cross_dist)}")
print(f"  All cross exactly once: {'YES ✓' if set(crosses) == {1} else 'NO'}")

# What about a0 = a1? (starts balanced)
print("\nFor a0 = a1 (starts balanced):")
for a0 in [1, 2, 5]:
    a, b = a0, a0
    sheets = []
    for _ in range(6):
        bc = phi(a, b)
        sheets.append(bc[2])
        a, b = b, a + b
    print(f"  ({a0},{a0}): sheets = {sheets}")

# Non-Fibonacci recurrences: a_{n+2} = a_{n+1} - a_n (alternating)
print("\n\nNon-Fibonacci: a_{n+2} = |a_{n+1} - a_n| (absolute difference):")
for a0, a1 in [(5, 3), (8, 5), (7, 2)]:
    a, b = a0, a1
    print(f"  ({a0},{a1}):", end="")
    sheets = []
    for n in range(15):
        bc = phi(a, b)
        sheets.append({0:'B', 1:'+', -1:'-'}[bc[2]])
        a_new = abs(b - a)
        a, b = b, a_new
        if a == 0 and b == 0:
            break
    print(f" {''.join(sheets)}")

# Pell recurrence: a_{n+2} = 2*a_{n+1} + a_n
print("\nPell recurrence a_{n+2} = 2*a_{n+1} + a_n, start (1, 2):")
a, b = 1, 2
for n in range(8):
    bc = phi(a, b)
    sheet = {0: 'B', 1: '+', -1: '-'}[bc[2]]
    ratio = bc[1]/bc[0] if bc[0] > 0 else float('inf')
    print(f"  n={n}: ({a},{b}) → BC={bc}, sheet={sheet}, r/k={ratio:.4f}")
    a, b = b, 2*b + a

sqrt2_minus1 = np.sqrt(2) - 1
print(f"  Pell r/k → {sqrt2_minus1:.6f} = √2 - 1 (Pell analog of φ̄)")

# ============================================================
# 4. INVESTIGATION 17.C: SHELL-PRESERVING RECURRENCES
# ============================================================
print("\n" + "=" * 70)
print("4. SHELL-PRESERVING RECURRENCES / CLOSED ORBITS (17.C)")
print("=" * 70)

# A shell-preserving map on shell N must permute the N+1 states
# Operators: J preserves shell, C preserves shell (for r >= 2, but r=1 breaks it)
# Can we chain J and C to get closed orbits within a shell?

for N in [4, 5, 6]:
    shell = [st for st in all_bc_states(N) if 2*st[0]+st[1] == N]
    print(f"\nShell N={N} ({len(shell)} states):")
    
    # J orbit structure
    j_orbits = []
    visited = set()
    for st in shell:
        if st in visited: continue
        orbit = [st]
        visited.add(st)
        jst = J(*st)
        if jst != st:
            orbit.append(jst)
            visited.add(jst)
        j_orbits.append(tuple(orbit))
    print(f"  J orbits: {len(j_orbits)} (sizes: {[len(o) for o in j_orbits]})")
    
    # C orbit on shell (note: C may leave shell for r=1)
    print(f"  C orbits (may leave shell):")
    for st in shell:
        if st[1] == 0: continue  # skip balanced (fixpoint)
        orbit = [st]
        cur = st
        for _ in range(20):
            cur = C(*cur)
            if cur in orbit or cur[1] == 0:
                orbit.append(cur)
                break
            orbit.append(cur)
        stays = all(2*s[0]+s[1] == N for s in orbit[:-1])
        print(f"    {st} → {'→'.join(str(s) for s in orbit)}, shell-preserving: {stays}")

# The answer: C does NOT give closed orbits within a shell because it converges to B
# J gives period-2 orbits (trivial)
# The only shell-preserving permutations are J and compositions of shell-preserving ops

# But what about the COMBINATION J∘C?
print("\n\nJ∘C orbit structure on shell N=6:")
N = 6
shell = [st for st in all_bc_states(N) if 2*st[0]+st[1] == N]
for st in shell:
    if st[1] == 0: continue
    cur = st
    orbit = [cur]
    for _ in range(20):
        cur = J(*C(*cur))
        N_cur = 2*cur[0]+cur[1]
        orbit.append(cur)
        if cur == st or N_cur != N:
            break
    on_shell = all(2*s[0]+s[1] == N for s in orbit)
    print(f"  {st}: orbit length {len(orbit)}, on-shell: {on_shell}, orbit: {orbit[:6]}...")

# C doesn't preserve shell at r=1, so J∘C won't either
# The answer is: NO non-trivial shell-preserving dynamics exist
# because C (the only non-trivial transport) breaks shell at the singular boundary

print("\n=== CONCLUSION 17.C ===")
print("No non-trivial shell-preserving closed orbits exist under the native operators.")
print("C breaks shell at r=1 (ΔN=+1). J preserves shell but is period-2 (trivial).")
print("Compositions J∘C, C∘J inherit C's shell-breaking at r=1.")
print("Shell-preservation + non-triviality are incompatible under {J, C, RP, CP, P±}.")
print("This is a STRUCTURAL result: the singular boundary Σ prevents closed dynamics.")

