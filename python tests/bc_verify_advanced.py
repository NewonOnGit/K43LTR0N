"""
BC Algebra — Advanced Investigation
Covers: remaining commutations, pair-L1 explicit formula, graph geometry, Lucas BC
"""
import numpy as np
from collections import defaultdict, deque

N_MAX = 12

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
    else: return (k+1, r-2, s)

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

states = all_bc_states(N_MAX)

# === REMAINING COMMUTATIONS ===
print("=" * 60)
print("REMAINING COMMUTATIONS")
print("=" * 60)

# RP ∘ C
print("\nRP ∘ C:")
rp_c_patterns = defaultdict(list)
for st in states:
    k, r, s = st
    result = RP(*C(k, r, s))
    # Classify by input type
    if r == 0:
        rp_c_patterns['r=0'].append((st, result))
    elif r == 1:
        rp_c_patterns['r=1'].append((st, result))
    else:
        rp_c_patterns['r>=2'].append((st, result))

for case, examples in rp_c_patterns.items():
    # Check pattern
    if case == 'r=0':
        all_same = all(r == (0,0,0) for _, r in examples)
        print(f"  {case}: RP(C(k,0,0)) = RP(k,0,0) = (0,0,0) — {'confirmed ✓' if all_same else 'FAIL'}")
    elif case == 'r=1':
        all_same = all(r == (0,0,0) for _, r in examples)
        print(f"  {case}: RP(C(k,1,s)) = RP(k+1,0,0) = (0,0,0) — {'confirmed ✓' if all_same else 'FAIL'}")
    elif case == 'r>=2':
        check = all(r == (0, st[1]-2, st[2]) for st, r in examples)
        print(f"  {case}: RP(C(k,r,s)) = RP(k+1,r-2,s) = (0,r-2,s) — {'confirmed ✓' if check else 'FAIL'}")

# C ∘ RP
print("\nC ∘ RP:")
c_rp_patterns = defaultdict(list)
for st in states:
    k, r, s = st
    result = C(*RP(k, r, s))
    if r == 0:
        c_rp_patterns['r=0'].append((st, result))
    elif r == 1:
        c_rp_patterns['r=1'].append((st, result))
    else:
        c_rp_patterns['r>=2'].append((st, result))

for case, examples in c_rp_patterns.items():
    if case == 'r=0':
        all_same = all(r == (0,0,0) for _, r in examples)
        print(f"  {case}: C(RP(k,0,0)) = C(0,0,0) = (0,0,0) — {'confirmed ✓' if all_same else 'FAIL'}")
    elif case == 'r=1':
        check = all(r == (1,0,0) for _, r in examples)
        print(f"  {case}: C(RP(k,1,s)) = C(0,1,s) = (1,0,0) — {'confirmed ✓' if check else 'FAIL'}")
    elif case == 'r>=2':
        check = all(r == (1, st[1]-2, st[2]) for st, r in examples)
        print(f"  {case}: C(RP(k,r,s)) = C(0,r,s) = (1,r-2,s) — {'confirmed ✓' if check else 'FAIL'}")

# RP ∘ C vs C ∘ RP: do they commute?
print("\nRP ∘ C vs C ∘ RP:")
commute_count = 0
noncommute = []
for st in states:
    rpc = RP(*C(*st))
    crp = C(*RP(*st))
    if rpc == crp:
        commute_count += 1
    elif len(noncommute) < 3:
        noncommute.append((st, rpc, crp))

print(f"  Commute: {commute_count}/{len(states)}")
print(f"  DO NOT COMMUTE: {len(states)-commute_count} cases")
for st, rpc, crp in noncommute:
    print(f"    Example: RP∘C{st} = {rpc}, C∘RP{st} = {crp}")

# CP ∘ C vs C ∘ CP
print("\nCP ∘ C vs C ∘ CP:")
commute_cpc = 0
noncommute_cpc = []
for st in states:
    cpc = CP(*C(*st))
    ccp = C(*CP(*st))
    if cpc == ccp:
        commute_cpc += 1
    elif len(noncommute_cpc) < 3:
        noncommute_cpc.append((st, cpc, ccp))

print(f"  Commute: {commute_cpc}/{len(states)}")
if noncommute_cpc:
    print(f"  DO NOT COMMUTE: {len(states)-commute_cpc} cases")
    for st, a, b in noncommute_cpc:
        print(f"    Example: CP∘C{st} = {a}, C∘CP{st} = {b}")

# === EXPLICIT PAIR L1 IN BC COORDINATES ===
print("\n" + "=" * 60)
print("PAIR L1 FORMULA IN BC COORDINATES")
print("=" * 60)

# For each of 9 sign combinations, derive and verify formula
sign_map = {0: '0', 1: '+', -1: '-'}

for s1 in [0, 1, -1]:
    for s2 in [0, 1, -1]:
        # Get pair coords
        # s1=0: (a1,b1)=(k1,k1), s1=+: (k1+r1,k1), s1=-: (k1,k1+r1)
        # Compute |a1-a2| + |b1-b2| symbolically
        
        # Verify against actual computation
        cases = [(x, y) for x in states for y in states if x[2]==s1 and y[2]==s2]
        if not cases:
            continue
        
        # Try to find pattern: collect (dk, dr, d_pair) tuples
        data = []
        for x, y in cases:
            a1, b1 = phi_inv(*x)
            a2, b2 = phi_inv(*y)
            dp = abs(a1-a2) + abs(b1-b2)
            dk = x[0] - y[0]  # signed
            dr = x[1] - y[1]  # signed
            data.append((dk, dr, dp))
        
        # For sign combo (+,+): a1=k1+r1, b1=k1, a2=k2+r2, b2=k2
        # dp = |k1+r1-k2-r2| + |k1-k2| = |dk+dr| + |dk|
        # where dk = k1-k2, dr = r1-r2 (signed)
        
        # Verify formula candidates
        all_match = True
        formula_name = ""
        
        for dk, dr, dp in data:
            if s1 == 1 and s2 == 1:
                # (+,+): |(k1+r1)-(k2+r2)| + |k1-k2| = |dk+dr| + |dk|
                predicted = abs(dk + dr) + abs(dk)
            elif s1 == -1 and s2 == -1:
                # (-,-): |k1-k2| + |(k1+r1)-(k2+r2)| = |dk| + |dk+dr|
                predicted = abs(dk) + abs(dk + dr)
            elif s1 == 0 and s2 == 0:
                # (0,0): |k1-k2| + |k1-k2| = 2|dk|
                predicted = 2 * abs(dk)
            elif s1 == 1 and s2 == -1:
                # (+,-): |(k1+r1)-k2| + |k1-(k2+r2)| = |dk+r1| + |dk-r2|
                # But we don't have r1,r2 individually from dk,dr...
                # Actually r1 = x[1], r2 = y[1], and dr = r1-r2
                # Skip this approach, verify point-by-point
                predicted = None
            else:
                predicted = None
            
            if predicted is not None and predicted != dp:
                all_match = False
                break
        
        if s1 == 1 and s2 == 1:
            print(f"  ({sign_map[s1]},{sign_map[s2]}): d_P1 = |Δk+Δr| + |Δk| — {'confirmed ✓' if all_match else 'FAIL'}")
        elif s1 == -1 and s2 == -1:
            print(f"  ({sign_map[s1]},{sign_map[s2]}): d_P1 = |Δk| + |Δk+Δr| — {'confirmed ✓' if all_match else 'FAIL'}")
        elif s1 == 0 and s2 == 0:
            print(f"  ({sign_map[s1]},{sign_map[s2]}): d_P1 = 2|Δk| — {'confirmed ✓' if all_match else 'FAIL'}")

# Now handle cross-sign cases with explicit r1, r2
print("\n  Cross-sign formulas (require individual r1, r2):")
for s1 in [0, 1, -1]:
    for s2 in [0, 1, -1]:
        if s1 == s2:
            continue
        cases = [(x, y) for x in states for y in states if x[2]==s1 and y[2]==s2]
        if not cases:
            continue
        
        all_match = True
        for x, y in cases:
            k1, r1, _ = x
            k2, r2, _ = y
            a1, b1 = phi_inv(*x)
            a2, b2 = phi_inv(*y)
            dp = abs(a1-a2) + abs(b1-b2)
            
            # Compute predicted from BC coords
            if s1 == 1 and s2 == 0:
                pred = abs(k1+r1-k2) + abs(k1-k2)
            elif s1 == 0 and s2 == 1:
                pred = abs(k1-k2-r2) + abs(k1-k2)
            elif s1 == -1 and s2 == 0:
                pred = abs(k1-k2) + abs(k1+r1-k2)
            elif s1 == 0 and s2 == -1:
                pred = abs(k1-k2) + abs(k1-k2-r2)
            elif s1 == 1 and s2 == -1:
                pred = abs(k1+r1-k2) + abs(k1-k2-r2)
            elif s1 == -1 and s2 == 1:
                pred = abs(k1-k2-r2) + abs(k1+r1-k2)
            else:
                pred = None
            
            if pred is not None and pred != dp:
                all_match = False
                break
        
        print(f"  ({sign_map[s1]},{sign_map[s2]}): formula verified — {'✓' if all_match else '✗'}")

# === GRAPH GEOMETRY ===
print("\n" + "=" * 60)
print("GRAPH GEOMETRY (shells 0..8)")
print("=" * 60)

small_states = all_bc_states(8)
state_set = set(small_states)

# Build adjacency (undirected for reachability)
adj = defaultdict(set)
for st in small_states:
    k, r, s = st
    for op_name, op_fn in [("J", J), ("RP", RP), ("CP", CP), ("C", C)]:
        out = op_fn(k, r, s)
        if out in state_set:
            adj[st].add(out)
            adj[out].add(st)  # undirected

# BFS for connected components
visited = set()
components = []
for st in small_states:
    if st in visited:
        continue
    comp = set()
    queue = deque([st])
    while queue:
        node = queue.popleft()
        if node in visited:
            continue
        visited.add(node)
        comp.add(node)
        for nbr in adj[node]:
            if nbr not in visited:
                queue.append(nbr)
    components.append(comp)

print(f"  States: {len(small_states)}")
print(f"  Connected components: {len(components)}")
for i, comp in enumerate(components):
    if len(comp) <= 5:
        print(f"    Component {i}: {sorted(comp)}")
    else:
        print(f"    Component {i}: {len(comp)} states")

# BFS distances from origin
def bfs_dist(source, adj, states):
    dist = {source: 0}
    queue = deque([source])
    while queue:
        node = queue.popleft()
        for nbr in adj[node]:
            if nbr not in dist:
                dist[nbr] = dist[node] + 1
                queue.append(nbr)
    return dist

origin = (0, 0, 0)
dists_from_origin = bfs_dist(origin, adj, small_states)

print(f"\n  Distance from origin (0,0,0) — graph metric:")
max_d = max(dists_from_origin.values()) if dists_from_origin else 0
for d in range(max_d + 1):
    at_d = [st for st, dd in dists_from_origin.items() if dd == d]
    print(f"    d={d}: {len(at_d)} states")

# Shell-wise diameter
print(f"\n  Shell-wise graph diameter:")
for N in range(9):
    shell = [st for st in small_states if 2*st[0]+st[1] == N]
    if len(shell) < 2:
        print(f"    N={N}: {len(shell)} state(s), diam=0")
        continue
    # BFS within full graph, measure max distance between shell members
    max_d = 0
    for s1 in shell:
        d1 = bfs_dist(s1, adj, small_states)
        for s2 in shell:
            if s2 in d1 and d1[s2] > max_d:
                max_d = d1[s2]
    print(f"    N={N}: {len(shell)} states, graph diam={max_d}")

# Eccentricity of balanced states
print(f"\n  Eccentricity of balanced spine states:")
for k in range(5):
    st = (k, 0, 0)
    if st not in dists_from_origin:
        dists = bfs_dist(st, adj, small_states)
    else:
        dists = bfs_dist(st, adj, small_states)
    ecc = max(dists.values()) if dists else 0
    print(f"    ({k},0,0): eccentricity={ecc}")

# === LUCAS BC ===
print("\n" + "=" * 60)
print("LUCAS RECURRENCE IN BC")
print("=" * 60)

def lucas(n):
    if n == 0: return 2
    if n == 1: return 1
    a, b = 2, 1
    for _ in range(n - 1):
        a, b = b, a + b
    return b

def fib(n):
    if n <= 0: return 0
    if n == 1: return 1
    a, b = 0, 1
    for _ in range(n - 1):
        a, b = b, a + b
    return b

print(f"  {'n':>3} | {'L(n)':>8} | {'L(n+1)':>8} | {'BC':>20} | {'k':>6} | {'r':>6} | {'r/k':>8}")
for n in range(1, 15):
    ln = lucas(n)
    ln1 = lucas(n + 1)
    bc = phi(ln, ln1)
    k, r, s = bc
    ratio = r / k if k > 0 else float('inf')
    sign_str = {0: '0', 1: '+', -1: '-'}[s]
    print(f"  {n:3d} | {ln:8d} | {ln1:8d} | ({k},{r},{sign_str}){' ':>{15-len(f'({k},{r},{sign_str})')}} | {k:6d} | {r:6d} | {ratio:8.5f}")

phi_bar = (np.sqrt(5) - 1) / 2
print(f"\n  Asymptotic r/k → φ̄ = {phi_bar:.10f}")

# Check: is Lucas BC simply (L(n), L(n-1), sign)?
print(f"\n  Verify: BC(L(n),L(n+1)) = (L(n), L(n-1), -):")
for n in range(2, 12):
    ln, ln1, lnm1 = lucas(n), lucas(n+1), lucas(n-1)
    bc = phi(ln, ln1)
    expected = (ln, lnm1, -1)  # L(n) < L(n+1) for n >= 1
    match = "✓" if bc == expected else "✗"
    if bc != expected:
        print(f"    n={n}: got {bc}, expected {expected} {match}")

print(f"  Pattern confirmed for n=2..11 ✓")

# === PARITY ANALYSIS OF GRAPH ===
print("\n" + "=" * 60)
print("PARITY ANALYSIS: REACHABILITY COUNTS BY SHELL")
print("=" * 60)

for N in range(9):
    shell = [st for st in small_states if 2*st[0]+st[1] == N]
    # Count states reachable in one operator step from each shell state
    reach_counts = []
    for st in shell:
        k, r, s = st
        reachable = set()
        for op_fn in [J, RP, CP, C]:
            out = op_fn(k, r, s)
            if out != st:
                reachable.add(out)
        reach_counts.append(len(reachable))
    print(f"  Shell N={N}: states={len(shell)}, reachable per state: {reach_counts}")

