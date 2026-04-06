"""
CRITICAL: Check legality of C output at r=2 boundary.
C(k,2,s) = (k+1, 0, s) with s≠0 → ILLEGAL! r=0 requires s=0.
"""

def is_legal(k, r, s):
    if k < 0 or r < 0: return False
    if r == 0 and s != 0: return False
    if r > 0 and s == 0: return False
    return True

# Current definition
def C_buggy(k, r, s):
    if r == 0: return (k, 0, 0)
    elif r == 1: return (k+1, 0, 0)
    else: return (k+1, r-2, s)

# Check legality of outputs
print("LEGALITY CHECK on C outputs:")
bugs = 0
for k in range(6):
    for r in range(7):
        for s in ([0] if r == 0 else [1, -1]):
            out = C_buggy(k, r, s)
            legal = is_legal(*out)
            if not legal:
                print(f"  ILLEGAL: C({k},{r},{s:+d}) = {out}")
                bugs += 1

print(f"\n  Total illegal outputs: {bugs}")

# The fix: when r-2 = 0, force s = 0
def C_fixed(k, r, s):
    if r == 0: return (k, 0, 0)
    elif r == 1: return (k+1, 0, 0)
    elif r == 2: return (k+1, 0, 0)  # singular terminal: orientation destroyed, shell preserved
    else: return (k+1, r-2, s)  # r >= 3: smooth transport

print("\n\nFIXED C — legality check:")
bugs2 = 0
for k in range(6):
    for r in range(7):
        for s in ([0] if r == 0 else [1, -1]):
            out = C_fixed(k, r, s)
            legal = is_legal(*out)
            if not legal:
                print(f"  ILLEGAL: C({k},{r},{s:+d}) = {out}")
                bugs2 += 1

print(f"  Total illegal outputs: {bugs2}")

# Shell analysis with fixed C
print("\nSHELL BEHAVIOR with fixed C:")
for r in range(8):
    for s in ([0] if r == 0 else [1]):
        k = 3
        N = 2*k + r
        out = C_fixed(k, r, s)
        N_out = 2*out[0] + out[1]
        delta_N = N_out - N
        sign_killed = (r > 0 and out[2] == 0)
        print(f"  r={r}: N={N} → N'={N_out} (ΔN={delta_N:+d}), sign_destroyed={sign_killed}")

print("\nKEY FINDING:")
print("  r=0: fixed (no shell change, no sign change)")
print("  r=1: singular terminal, ΔN=+1, sign destroyed (ODD parity)")
print("  r=2: singular terminal, ΔN=0, sign destroyed (EVEN parity)")
print("  r≥3: smooth transport, ΔN=0, sign preserved")
print()
print("  The SINGULAR SET is Σ = {r=1} ∪ {r=2}, not just {r=1}!")
print("  Parity determines the shell cost:")
print("  - Even r: terminal at r=2→0, shell preserved, sign destroyed")
print("  - Odd r: terminal at r=1→0, shell incremented by 1, sign destroyed")
print()

# Re-verify convergence with fixed C
print("CONVERGENCE with fixed C:")
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

states = all_bc_states(20)
f_conv = 0
for st in states:
    k0, r0, s0 = st
    if r0 == 0: continue
    state = st
    steps = 0
    while state[1] > 0:
        state = C_fixed(*state)
        steps += 1
        if steps > 100:
            f_conv += 1; break
    
    expected_steps = (r0 + 1) // 2  # ceil(r0/2) — unchanged!
    if steps != expected_steps:
        print(f"  FAIL: from {st}, took {steps}, expected {expected_steps}")
        f_conv += 1

    # Check final state
    if r0 % 2 == 0:
        expected_final = (k0 + r0//2, 0, 0)
        expected_N = 2*k0 + r0  # same shell
    else:
        expected_final = (k0 + (r0+1)//2, 0, 0)
        expected_N = 2*k0 + r0 + 1  # shell +1
    
    if state != expected_final:
        print(f"  FAIL final: from {st}, got {state}, expected {expected_final}")
        f_conv += 1

print(f"  Convergence test: {'PASS ✓' if f_conv == 0 else f'FAIL ({f_conv})'}")

# Check: C∘J = J∘C still holds?
print("\nCOMMUTATION C∘J = J∘C with fixed C:")
f_cj = 0
for st in states:
    k, r, s = st
    cj = C_fixed(*tuple(x for x in [k, r, -s if r > 0 else 0]))  # J then C
    # More carefully:
    j_st = (k, r, -s) if r > 0 else (k, 0, 0)
    cj = C_fixed(*j_st)
    c_st = C_fixed(k, r, s)
    jc = (c_st[0], c_st[1], -c_st[2]) if c_st[1] > 0 else c_st
    if cj != jc:
        f_cj += 1
        if f_cj <= 3:
            print(f"  FAIL: C∘J{st} = {cj}, J∘C{st} = {jc}")

print(f"  C∘J = J∘C: {'CONFIRMED ✓' if f_cj == 0 else f'FAILED ({f_cj})'}")

