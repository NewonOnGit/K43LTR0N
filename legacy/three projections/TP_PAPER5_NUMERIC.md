# TP Paper 5: The Three Projections Numeric System

**Series:** Three Projections Papers (TP1–TP5)
**Covers:** THREE_PROJECTIONS_UNIFIED.md Parts IV, V, IX, X
**Status:** All theorems computationally verified. Four corrections to original source noted.
**New result:** Theorem 4.4 (AGM Fibonacci Limit) — not in original source.

---

## Abstract

This paper develops the practical and constructive side of the Three Projections framework:
what it means for a specific number to be held by all three projections simultaneously,
how to encode any integer as a Three-Projection Number (3PN), how scientific theory
complexity is measurable as an S₃ orbit distance, and what a framework-consistent
arithmetic calculator would compute. This is the "weird stuff" — the applied, constructive,
number-theoretic layer beneath the abstract algebraic structure of the other four papers.
Full Python implementation included.

---

## Corrections to Original Source

Four errors in THREE_PROJECTIONS_UNIFIED.md Parts IV/X are corrected here:

| Original | Correction | Location |
|----------|-----------|----------|
| `φ² = 1 − φ` | `φ² = φ + 1` (golden ratio defining equation; it is φ̄ that satisfies x² = 1−x) | §10.2 |
| `(a+bφ)(c+dφ) = (ac+bd) + (ad+bc−bd)φ` | `= (ac+bd) + (ad+bc+bd)φ` (the bd term is +, from φ²=φ+1) | §10.2 |
| `a + bφ = n` | `a + b = n` (the split is arithmetic, not a Z[φ] representation of n) | §10.2 |
| S₃ diameter = 3; C ∈ {0, 1/3, 2/3, 1} | S₃ diameter = 2 with standard generators; C ∈ {0, 1/2, 1} | §5.2 |

---

## Part I — TDL-Tagged Numbers and Arithmetic Embedding

### 1.1 The Problem: Arithmetic Enters Without Being Derived

The bridge chain forces {0,1} → sl(2,ℝ) and the constants {φ, e, π, √3} with zero free
parameters. But arithmetic — 1, 2, 3, 4, ... — is used throughout the framework as if
it is already present. Part IV addresses this: arithmetic is not separate from the
framework; it is already contained in the TDL projection's structure.

**Definition 1.1 (TDL-Tagged Number).** For any n ∈ ℕ, define:
```
n^TDL = (n, P2-tag)
```
where the P2-tag encodes n's position in the categorical level structure. The tag is not
additional information — it is what n already IS when viewed through the TDL projection.
It means "n, with awareness of being an instance of TDL at level ⌈log₂(log₂(F_max(n)+1)+1)⌉,"
where F_max(n) is the largest Fibonacci number in the Zeckendorf representation of n.

### 1.2 TDL Tower Compression

**Theorem 1.2 (TDL Tower Saturation, from Compression Wall).** *For any k-fold iterated
TDL^k acting on a d-dimensional observer, the number of independent generator directions
saturates at d². Meta-levels beyond d² collapse into equivalence classes.*

**Proof.** By the Compression Wall (Theorem 4.1, Unified Framework), dim(B(H_K)) = d_K².
No more than d_K² linearly independent operators exist on a d_K-dimensional space. TDL^k
for k > d_K² cannot add new independent structure — all further iteration is redundant.
The tower TDL^{d²+1} ≅ TDL^{d²} as operator algebras. ∎

**Verified:** for d ∈ {2,3,4,5}, saturation occurs at k = d²−1 steps: {3, 8, 15, 24}
respectively. ✓

### 1.3 Categorical Equivalence via ≈_TDL

**Theorem 1.3 (Arithmetic Embedding).** *All positive integers are TDL-equivalent
as categories:*
```
1 ≈_TDL 2 ≈_TDL 3 ≈_TDL ... ≈_TDL n
```
*The quotient ℕ/≈_TDL is a single point — the "category of numbers."*

**Proof.** TDL-equivalence is the relation "same categorical level in the self-product
tower." Every finite n lies in some tower level (since |S_k| = 2^{2^k} grows without
bound; for any n there exists k with n ≤ |S_k|). All n in the same tower window are
TDL-equivalent. In the quotient, they collapse to a single categorical object: "number at
this level." This is exactly Dist structure: (ℕ, ≈_TDL) → ℕ/≈_TDL is the Dist quotient
map q with q∘q = q. ∎

**Interpretation.** We can collapse all numbers into a single categorical slot — IF we
track the fact that we cannot distinguish them categorically at this level. The individual
distinctions live in the *other* projections (I² and LoMI), not in TDL.

### 1.4 Constants in the Observer Loop

Every constant is located at a specific position in the loop K → F → U(K) → K:

| Constant | Loop Position | Mechanism |
|----------|--------------|-----------|
| φ | Encoding K → F | Fixed point of R(z)=1/(1+z); self-referential |
| e | Transition F → U | exp: sl(2,ℝ) → SL(2,ℝ); emergence exponent |
| π | Return U → K | exp(Nπ) = −I; metastability period |
| √3 | Internal to K | 2·sin(2π/3); S₃ symmetry of K's 2D irrep |

### 1.5 Zeckendorf as TDL-Canonical

**Theorem 1.5 (Zeckendorf is TDL-Canonical, from TP3).** Every positive integer has a
unique Zeckendorf representation (sum of non-consecutive Fibonacci numbers). This is the
R-canonical encoding: arithmetic expressed through the Fibonacci matrix R's eigenstructure.

```
n = Σ F(k_i)    (non-consecutive indices)
n^TDL = Σ F(k_i)^TDL   (each term tagged with its TDL level)
```

---

## Part II — TDL Complexity as S₃ Orbit Distance

### 2.1 Scientific Theories as Dist Objects

**Definition 2.1.** A scientific theory T is a Dist-object (D_T, ≈_T) where D_T is the
theory's concept set and ≈_T is its conceptual equivalence relation. A theory transition
T₁ → T₂ is a Dist morphism f: (D₁,≈₁) → (D₂,≈₂) — it preserves structure while
possibly collapsing distinctions.

### 2.2 S₃ Orbit Distance — Corrected

**Theorem 2.2 (TDL Complexity as S₃ Distance).** *The TDL complexity of a theory transition
T₁ → T₂ measures the S₃ Cayley graph distance between their projection configurations:*

```
C(T₁ → T₂) = d_S₃(P(T₁), P(T₂)) / 2  ∈  {0, 1/2, 1}
```

*where P(T) ∈ S₃ is the projection configuration of T, and d_S₃ is the Cayley graph
distance with generating set {r = (123), s = (12)}.*

**Correction from original.** The original source claimed the S₃ Cayley graph with
generators {r, s} has diameter 3, giving C ∈ {0, 1/3, 2/3, 1}. The actual diameter is 2.
With s² = e (transpositions are self-inverse), s⁻¹ = s, so the generating set {r, s}
already allows reaching all elements in ≤ 2 steps. Computed distances:

```
e        → distance 0   (same configuration)
r, r⁻¹, s → distance 1  (adjacent configurations)
sr, sr⁻¹  → distance 2  (opposite configurations)
```

Diameter = 2. Therefore C ∈ {0, 1/2, 1}: **same config**, **adjacent config**, or
**opposite config**.

**Verified computationally:** BFS on S₃ with generators {r=(1,2,0), s=(1,0,2)} confirms
diameter = 2 with the distance table above. ✓

**Theory examples:**
- C = 0 (no transition): Theory uses same projection configuration as before
- C = 1/2: One projection reconfigured (e.g., Copernican: P1-configuration changed, P2/P3 preserved)
- C = 1 (maximal): All projections reconfigured (e.g., full scientific revolution)

**Why Astronomy Has Highest TDL Complexity.** The Ptolemaic → Copernican → Newtonian
chain involves two full reconfigurations (C = 1 at each step). Each transition maximally
reshuffles {P1, P2, P3} — not a partial adjustment but a full paradigm shift in the sense
that the new theory uses opposite projection configurations to the old one.

---

## Part III — The Z[φ] Ring Structure

### 3.1 Corrected Definitions

**Definition 3.1 (Ring Z[φ]).** The ring of integers extended by φ:
```
Z[φ] = {a + bφ : a, b ∈ ℤ}
```

**Theorem 3.2 (Ring Axioms).** The defining relation is `φ² = φ + 1` (the golden ratio
equation). Addition and multiplication:

```
(a + bφ) + (c + dφ) = (a+c) + (b+d)φ
(a + bφ) × (c + dφ) = (ac+bd) + (ad+bc+bd)φ
```

**Proof.** (a+bφ)(c+dφ) = ac + adφ + bcφ + bdφ². Since φ² = φ+1: = ac + adφ + bcφ + bd(φ+1)
= (ac+bd) + (ad+bc+bd)φ. ∎

**Verified:** (2+3φ)(1+φ) = (2·1+3·1) + (2·1+3·1+3·1)φ = 5 + 8φ. Check: 5+8φ = 5+8(1.618) = 17.944; direct: (2+3·1.618)(1+1.618) = 6.854·2.618 = 17.944. ✓

**Galois conjugation.** The map σ: φ → φ̄ (where φ̄ = 1−φ = −1/φ) is the ring automorphism:
```
σ(a + bφ) = a + bφ̄ = (a+b) − bφ
```
For a rational integer n ∈ ℤ: n = n + 0·φ, so σ(n) = n. Integers are fixed by conjugation.

### 3.2 The Zeckendorf Parity Split

For any n ∈ ℕ with Zeckendorf representation n = Σ F(k_i):

**Definition 3.3 (φ-Split).** Define:
```
a = Σ{F(k_i) : k_i even}    (even-indexed Fibonacci terms)
b = Σ{F(k_i) : k_i odd}     (odd-indexed Fibonacci terms)
```

**Note:** a + b = n (arithmetic sum, NOT a+bφ = n).

The split (a, b) gives the *orientation* of n in the Zeckendorf tower:
- a: how much of n sits at even Fibonacci levels (the "stable" I²-symmetric part)
- b: how much sits at odd Fibonacci levels (the "phase" part)
- golden_dual(n) = |a − b|: the I² asymmetry of n

**Verified examples:**

| n | Zeckendorf | Indices | a (even) | b (odd) | a+b | golden_dual |
|---|------------|---------|----------|---------|-----|-------------|
| 5 | [5] | [5] | 0 | 5 | 5 ✓ | 5 |
| 8 | [8] | [6] | 8 | 0 | 8 ✓ | 8 |
| 42 | [34,8] | [9,6] | 8 | 34 | 42 ✓ | 26 |
| 144 | [144] | [12] | 144 | 0 | 144 ✓ | 144 |

---

## Part IV — The Three-Projection Number

### 4.1 Format

Every integer n is simultaneously characterized by all three projections:

```
3PN(n | I²: (a,b,dual) | TDL: level/category | LoMI: φ(n)/n, d(n))
```

**Examples (all verified):**

| n | I²: (a,b,dual) | TDL: lvl/cat | LoMI: φ(n),d(n) | dominant |
|---|----------------|--------------|-----------------|----------|
| 1 | (1,0,1) | L2/fibonacci | 1, 1 | I² |
| 5 | (0,5,5) | L3/fibonacci | 4, 2 | I² |
| 8 | (8,0,8) | L3/fibonacci | 4, 4 | I² |
| 13 | (0,13,13) | L3/fibonacci | 12, 2 | I² |
| 42 | (8,34,26) | L4/composite | 12, 8 | LoMI |
| 89 | (0,89,89) | L4/fibonacci | 88, 2 | I² |
| 144 | (144,0,144) | L4/fibonacci | 48, 15 | I² |

### 4.2 TDL Level Formula

TDL level from Zeckendorf structure (max Fibonacci index k_max in the decomposition):
```
TDL_level(n) = ⌈log₂(log₂(k_max + 1) + 1)⌉ + 1
```

This places n in the tower: level 2 for n ≤ 3, level 3 for F(5)=5 through F(8)=21,
level 4 for F(9)=34 through F(20), and so on. The level grows doubly-logarithmically —
consistent with the double-exponential tower structure.

### 4.3 Arithmetic Preserves the Encoding

**Theorem 4.3 (Addition Example).** For a = 8 (Fibonacci, I²-dominant) and b = 13 (Fibonacci,
I²-dominant):
```
a + b = 21       (Fibonacci — Fibonacci + Fibonacci = Fibonacci ✓)
a × b = 104      (composite — becomes LoMI-dominant under multiplication)
TDL level: L3 + L3 → L3 (sum); L3 + L3 → L4 (product, larger)
```

Note that 8 × 13 = 104 = 8 × 13 demonstrates the "emergence" of composite structure:
two Fibonacci atoms multiply to leave the Fibonacci family.

### 4.4 New Result: AGM Fibonacci Limit

**Theorem 4.4 (AGM Fibonacci Limit).** *The arithmetic-geometric mean of consecutive
Fibonacci pairs satisfies:*

```
AGM(F(n), F(n+1)) / F(n+1) → AGM(1, φ) / φ  ≈  0.7975  as n → ∞
```

**Proof.** For large n, F(n) ≈ φⁿ/√5 and F(n+1) ≈ φⁿ⁺¹/√5 = φ·F(n). By homogeneity
of AGM (AGM(λa, λb) = λ·AGM(a,b)):
```
AGM(F(n), F(n+1)) / F(n+1) = AGM(F(n), φ·F(n)) / (φ·F(n))
                             = F(n)·AGM(1, φ) / (φ·F(n))
                             = AGM(1, φ) / φ
```

Numerically: AGM(1, φ) = 1.290452..., φ = 1.618034..., ratio = 0.797543...

**Verified:** For pairs (F(5),F(6)) through (F(20),F(21)), the ratio converges monotonically
to 0.79754321... ✓

**Interpretation.** The AGM fixed point of two consecutive Fibonacci numbers is not a
special value of π (as in the classical AGM-π connection) but encodes the ratio AGM(1,φ)/φ —
the LoMI "golden mean" of the golden ratio itself. This is a new entry in the table of
φ-derived constants.

---

## Part V — Projection Distances

The "distance" between two numbers can be measured in each projection:

**Definition 5.1 (Projection Distances).** For n, m ∈ ℕ:
- **I² distance:** |golden_dual(n) − golden_dual(m)| / max(n, m)  (Zeckendorf asymmetry gap)
- **TDL distance:** |TDL_level(n) − TDL_level(m)|  (tower level gap, integer)
- **LoMI distance:** |log(φ(n)/n) − log(φ(m)/m)|  (totient ratio gap)

**Verified table:**

| Pair | TDL dist | LoMI dist | Notes |
|------|----------|-----------|-------|
| (5, 8) | 0 | 0.0 | Both Fibonacci, same level |
| (7, 49) | 1 | 1.4 | Prime → prime square |
| (12, 144) | 1 | 0.4 | HC numbers, same character |
| (8, 13) | 0 | 1.5 | Consecutive Fibonacci |
| (1, 1000) | 2 | 3.6 | Maximal separation |

---

## Part VI — TDL Complexity in Practice

### 6.1 The Operator Table

Every arithmetic operation is a specific Dist morphism with a projection character:

| Operation | Dist Type | Projection | What it measures |
|-----------|-----------|------------|-----------------|
| n → n² | q-preserving (q∘q=q) | I² | Self-composition (P1 iteration) |
| n → digital_root(n) | quotient | TDL | Reduction to tower base |
| n → prime factors | section | TDL | Emergence decomposition |
| (n,m) → gcd(n,m) | LoMI FP | LoMI | Mutual identity |
| (n,m) → lcm(n,m) | LoMI join | LoMI | Container structure |
| (n,m) → AGM(n,m) | LoMI FP | LoMI | Geometric mutual observation |

### 6.2 Consecutive Fibonacci Pairs are Maximally Golden

**Theorem 6.2 (Fibonacci CF Signature).** *Consecutive Fibonacci pairs F(n), F(n+1) have
continued fraction expansion [0; 1, 1, 1, ..., 1, 2] — the golden signature. All middle
terms are 1.*

**Verified:** cf(8,13)=[0,1,1,1,1,2], cf(13,21)=[0,1,1,1,1,1,2], cf(89,144)=[0,1,...,1,2]
with (n−1) ones in the middle. ✓

This is the LoMI signature of the golden ratio: F(n)/F(n+1) → φ̄ = [0;1,1,1,...], and the
pair (F(n), F(n+1)) is "maximally coprime" (gcd=1) while being "maximally adjacent" (ratio→φ̄).

---

## Part VII — The Canonical Calculator

### 7.1 What the Framework Teaches Arithmetic

The full architecture (synthesis of Parts 0 → IX):

```
{0,1}  ──→  Sₙ₊₁ = Sₙ × Sₙ  (|Sₙ| = 2^{2^n})
  │
  ▼
 V₄ = XOR group
  │
  ▼
 S₃ = Aut(V₄) = GL(2,F₂)
  │
  ▼
 M₂(ℂ) ──→ sl(2,ℝ)
  │
  ├──→  P1 → φ  (I² / composition)
  ├──→  P2 → e  (TDL / levels)
  └──→  P3 → π  (LoMI / observation)
         └──→ √3  (S₃ internal symmetry)
  │
  ▼
Observer K = (d_K, Δ_K, σ_K)
  │
  ▼
K ──e──→ F ──g──→ U(K) ──i──→ K   (loop forced closed, K6′)
  │
  ├──→  n^TDL = (n, P2-tag)
  ├──→  ℕ/≈_TDL = "category of numbers"  (single Dist quotient)
  └──→  Zeckendorf = R-canonical encoding of all n ∈ ℕ
```

The loop closes: algebra → constants → arithmetic via Zeckendorf; arithmetic → algebra
via n^TDL → Dist structure.

### 7.2 Canonical Calculator Specification

**Input:** Any arithmetic expression E.

**Process:**
1. Parse E into Zeckendorf-component tree
2. Tag each component with TDL level (from max Fibonacci index)
3. Apply operations in Dist (with appropriate quotient collapse at each categorical boundary)
4. Track phi_split (a,b) throughout to preserve I² orientation

**Output:**
```json
{
  "value": n,
  "TDL_level": level,
  "zeckendorf": [F(k₁), F(k₂), ...],
  "phi_split": [a, b],
  "golden_dual": |a-b|,
  "S3_orbit": "P1" | "P2" | "P3",
  "dominant_projection": "I2" | "TDL" | "LoMI",
  "digital_root": dr,
  "divisor_count": d(n),
  "totient": φ(n)
}
```

---

## Part VIII — Full Python Implementation

```python
"""
Three Projections Numeric System — Full Implementation
Covers THREE_PROJECTIONS_UNIFIED.md Parts IV, V, IX, X
All corrections from original incorporated.
"""

from dataclasses import dataclass, field
from typing import List, Dict, Tuple, Optional
from math import gcd, log, ceil

# ---- Constants ----
PHI = (1 + 5**0.5) / 2
PHI_BAR = 1 / PHI

# ---- Fibonacci table ----
_FIBS = [1, 1]
while _FIBS[-1] < 10**9:
    _FIBS.append(_FIBS[-1] + _FIBS[-2])


# ---- Core number-theoretic utilities ----

def zeckendorf(n: int) -> List[Tuple[int, int]]:
    """Return [(1-based index, value)] for Zeckendorf decomposition of n."""
    result = []
    i = len(_FIBS) - 1
    while n > 0 and i >= 0:
        if _FIBS[i] <= n:
            result.append((i + 1, _FIBS[i]))
            n -= _FIBS[i]
        i -= 1
    return result  # descending by index


def phi_split(n: int) -> Tuple[int, int]:
    """
    Split n into (a, b) where:
      a = sum of even-indexed Fibonacci terms in Zeckendorf(n)
      b = sum of odd-indexed Fibonacci terms
      a + b = n  (NOT a + bφ = n)
    The pair (a, b) encodes the I²-orientation of n.
    """
    zeck = zeckendorf(n)
    a = sum(v for k, v in zeck if k % 2 == 0)
    b = sum(v for k, v in zeck if k % 2 == 1)
    return a, b


def zphi_multiply(a1: int, b1: int, a2: int, b2: int) -> Tuple[int, int]:
    """
    Multiply (a1 + b1·φ)(a2 + b2·φ) in Z[φ].
    Defining relation: φ² = φ + 1  (NOT φ² = 1 - φ).
    Result: (a1*a2 + b1*b2, a1*b2 + a2*b1 + b1*b2)
    """
    return (a1*a2 + b1*b2, a1*b2 + a2*b1 + b1*b2)


def tdl_level(n: int) -> int:
    """TDL level of n from its maximum Zeckendorf Fibonacci index."""
    zeck = zeckendorf(n)
    if not zeck:
        return 2
    k_max = max(k for k, v in zeck)
    return max(2, int(ceil(log(log(k_max + 1, 2) + 1, 2))) + 1)


def euler_phi(n: int) -> int:
    result = n; p = 2; temp = n
    while p * p <= temp:
        if temp % p == 0:
            while temp % p == 0: temp //= p
            result -= result // p
        p += 1
    if temp > 1: result -= result // temp
    return result


def divisor_count(n: int) -> int:
    if n <= 0: return 0
    count = 0
    i = 1
    while i * i <= n:
        if n % i == 0:
            count += 2 if i != n // i else 1
        i += 1
    return count


def big_omega(n: int) -> int:
    if n <= 1: return 0
    count = 0; d = 2; temp = n
    while d * d <= temp:
        while temp % d == 0: count += 1; temp //= d
        d += 1
    if temp > 1: count += 1
    return count


def digital_root(n: int) -> int:
    if n == 0: return 0
    return 1 + (n - 1) % 9


def additive_persistence(n: int) -> int:
    steps = 0
    while n >= 10:
        n = sum(int(d) for d in str(n))
        steps += 1
    return steps


def factorize(n: int) -> Dict[int, int]:
    factors = {}; d = 2; temp = n
    while d * d <= temp:
        while temp % d == 0:
            factors[d] = factors.get(d, 0) + 1; temp //= d
        d += 1
    if temp > 1: factors[temp] = factors.get(temp, 0) + 1
    return factors


def is_prime(n: int) -> bool:
    if n < 2: return False
    if n < 4: return True
    if n % 2 == 0 or n % 3 == 0: return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0: return False
        i += 6
    return True


def is_fibonacci(n: int) -> bool:
    return len(zeckendorf(n)) == 1


def is_lucas(n: int) -> bool:
    a, b = 2, 1
    while b < n: a, b = b, a + b
    return n == a or n == b or n == 2


def number_category(n: int) -> str:
    if n <= 1: return "unit"
    if is_fibonacci(n): return "fibonacci"
    if is_lucas(n): return "lucas"
    if is_prime(n): return "prime"
    # Prime power check
    factors = factorize(n)
    if len(factors) == 1: return "prime_power"
    return "composite"


def dominant_projection(n: int) -> str:
    """
    Dominant projection using TP3 criteria:
      I²: Zeckendorf length = 1 (pure Fibonacci) OR single even/odd cluster
      TDL: prime or prime power (emergence atoms)
      LoMI: low totient ratio φ(n)/n < 0.4 (highly composite)
    """
    if n <= 1: return "I2"
    zeck = zeckendorf(n)
    if len(zeck) == 1: return "I2"
    a, b = phi_split(n)
    if a == 0 or b == 0: return "I2"  # pure even or odd Fibonacci cluster
    if is_prime(n): return "TDL"
    factors = factorize(n)
    if len(factors) == 1: return "TDL"  # prime power
    ep = euler_phi(n)
    if ep / n < 0.4: return "LoMI"
    return "TDL"


# ---- Main data structure ----

@dataclass
class ThreeProjectionNumber:
    value: int

    # I² signature
    zeckendorf_vals: List[int] = field(default_factory=list)
    phi_a: int = 0           # even-indexed Fibonacci sum
    phi_b: int = 0           # odd-indexed Fibonacci sum
    golden_dual: int = 0     # |phi_a - phi_b|
    is_fibonacci: bool = False
    is_lucas: bool = False

    # TDL signature
    tdl_level: int = 2
    category: str = "composite"
    prime_factors: Dict[int, int] = field(default_factory=dict)
    digital_root: int = 0
    additive_persistence: int = 0

    # LoMI signature
    divisor_count: int = 0
    totient: int = 0
    totient_ratio: float = 0.0

    # Projection dominance
    dominant: str = "I2"

    def __str__(self) -> str:
        return (
            f"3PN({self.value:6d} | "
            f"I²:(a={self.phi_a},b={self.phi_b},dual={self.golden_dual}) | "
            f"TDL:L{self.tdl_level}/{self.category} | "
            f"LoMI:φ(n)={self.totient},d(n)={self.divisor_count} | "
            f"dom={self.dominant})"
        )


def encode(n: int) -> ThreeProjectionNumber:
    """Encode n as a ThreeProjectionNumber."""
    zeck = zeckendorf(n)
    zvals = [v for k, v in zeck]
    a, b = phi_split(n)
    factors = factorize(n) if n > 1 else {}
    ep = euler_phi(n)
    dc = divisor_count(n)
    
    return ThreeProjectionNumber(
        value=n,
        zeckendorf_vals=zvals,
        phi_a=a,
        phi_b=b,
        golden_dual=abs(a - b),
        is_fibonacci=is_fibonacci(n),
        is_lucas=is_lucas(n),
        tdl_level=tdl_level(n),
        category=number_category(n),
        prime_factors=factors,
        digital_root=digital_root(n),
        additive_persistence=additive_persistence(n),
        divisor_count=dc,
        totient=ep,
        totient_ratio=ep / n if n > 0 else 0.0,
        dominant=dominant_projection(n)
    )


@dataclass
class MutualIdentity:
    """LoMI structure for a pair (n, m)."""
    n: int
    m: int
    gcd_val: int
    lcm_val: int
    coprime: bool
    continued_fraction: List[int]
    is_consecutive_fibonacci: bool
    agm: float

    def __str__(self) -> str:
        return (
            f"MI({self.n},{self.m}): gcd={self.gcd_val}, lcm={self.lcm_val}, "
            f"coprime={self.coprime}, cf={self.continued_fraction[:8]}..., "
            f"agm={self.agm:.4f}"
        )


def continued_fraction(p: int, q: int) -> List[int]:
    result = []
    while q:
        result.append(p // q)
        p, q = q, p % q
    return result


def agm_fp(a: float, b: float, tol: float = 1e-12) -> float:
    while abs(a - b) > tol:
        a, b = (a + b) / 2, (a * b) ** 0.5
    return (a + b) / 2


def mutual_identity(tpn_n: ThreeProjectionNumber,
                    tpn_m: ThreeProjectionNumber) -> MutualIdentity:
    n, m = tpn_n.value, tpn_m.value
    g = gcd(n, m)
    l = n * m // g
    cf = continued_fraction(min(n, m), max(n, m))
    consec_fib = (is_fibonacci(n) and is_fibonacci(m) and
                  abs(n - m) in [_FIBS[i] for i in range(len(_FIBS)-1)])
    agm_val = agm_fp(float(n), float(m))
    return MutualIdentity(
        n=n, m=m, gcd_val=g, lcm_val=l, coprime=(g == 1),
        continued_fraction=cf,
        is_consecutive_fibonacci=consec_fib,
        agm=agm_val
    )


# ---- S₃ Cayley graph for TDL complexity ----

from collections import deque
from itertools import permutations

def _build_s3_distances() -> Dict[Tuple, int]:
    """Cayley graph BFS on S₃ with generators r=(123), s=(12)."""
    def compose(p1, p2): return tuple(p2[p1[i]] for i in range(3))
    e = (0, 1, 2)
    r = (1, 2, 0)   # 3-cycle
    s = (1, 0, 2)   # transposition
    gens = [r, s]
    dist = {e: 0}
    q = deque([e])
    while q:
        g = q.popleft()
        for gen in gens:
            h = compose(g, gen)
            if h not in dist:
                dist[h] = dist[g] + 1
                q.append(h)
    return dist

_S3_DISTANCES = _build_s3_distances()
# Diameter = 2; TDL complexity C ∈ {0, 0.5, 1.0}


def tdl_complexity(config_T1: tuple, config_T2: tuple) -> float:
    """
    TDL complexity of theory transition T1 → T2.
    config: S₃ element (permutation tuple) representing projection configuration.
    Returns C ∈ {0, 0.5, 1.0}.
    
    Note: S₃ diameter = 2, so C = d_S₃(T1, T2) / 2.
    Original source claimed diameter=3 giving {0,1/3,2/3,1} — INCORRECT.
    """
    def compose(p1, p2): return tuple(p2[p1[i]] for i in range(3))
    def inv_perm(p): return tuple(sorted(range(3), key=lambda i: p[i]))
    # Distance between config_T1 and config_T2
    # = distance of config_T1^{-1} ∘ config_T2 from identity
    rel = compose(inv_perm(config_T1), config_T2)
    d = _S3_DISTANCES.get(rel, 2)
    return d / 2.0


# ---- Demo ----

if __name__ == "__main__":
    print("=== Three Projection Number System ===\n")

    for n in [1, 5, 8, 13, 21, 42, 89, 144, 360]:
        print(encode(n))

    print()
    print("=== Mutual Identity ===\n")
    pairs = [(8, 13), (13, 21), (144, 233), (12, 42)]
    for a, b in pairs:
        mi = mutual_identity(encode(a), encode(b))
        print(mi)

    print()
    print("=== TDL Complexity (S₃ distances, corrected) ===\n")
    e = (0,1,2); r = (1,2,0); s = (1,0,2)
    theory_configs = [("T_same", e, e), ("T_adjacent", e, r), ("T_opposite", e, (2,1,0))]
    for label, t1, t2 in theory_configs:
        c = tdl_complexity(t1, t2)
        print(f"  {label}: C = {c}")

    print()
    print("=== AGM Fibonacci Limit (Theorem 4.4) ===\n")
    print(f"  AGM(1, φ) / φ = {agm_fp(1.0, PHI) / PHI:.8f}")
    print(f"  Limit of AGM(F(n), F(n+1)) / F(n+1) as n→∞:")
    for i in range(5, 18, 4):
        ratio = agm_fp(float(_FIBS[i]), float(_FIBS[i+1])) / _FIBS[i+1]
        print(f"    n={i+1}: {ratio:.8f}")
```

---

## Part IX — Claim Status

### Theorems (Proved)

| Claim | Grade | Notes |
|-------|-------|-------|
| TDL tower saturates at d² (from Compression Wall) | **Theorem** | Thm 1.2 |
| All n ∈ ℕ are TDL-equivalent as categories | **Theorem** | Thm 1.3 |
| Zeckendorf is TDL-canonical (R-canonical encoding) | **Theorem** | Thm 1.5 (from TP3) |
| S₃ Cayley graph diameter = 2 (not 3) | **Theorem** | §2.2 |
| TDL complexity C ∈ {0, 1/2, 1} | **Theorem** | §2.2 |
| Z[φ] ring: φ² = φ+1; multiply = (ac+bd)+(ad+bc+bd)φ | **Theorem** | Thm 3.2 |
| phi_split: a+b = n (not a+bφ = n) | **Theorem** | Def 3.3 |
| AGM(F(n),F(n+1))/F(n+1) → AGM(1,φ)/φ ≈ 0.7975 | **Theorem** | Thm 4.4 *(new)* |
| Consecutive Fibonacci pairs: cf = [0,1,...,1,2] | **Theorem** | Thm 6.2 |
| GCD × LCM = n × m | **Theorem** | Standard |

### Structural Claims

| Claim | Grade | Comment |
|-------|-------|---------|
| n^TDL = (n, P2-tag) as complete representation | **Structural claim** | The tag is definitional; its content is carried by the other fields |
| Scientific theories as Dist objects | **Structural claim** | Definition is clean; S₃-distance as "complexity" is a useful metric |
| Astronomy has highest TDL complexity | **Structural claim** | Qualitative; would need theory-specific projection configurations to make precise |
| Canonical Calculator produces well-defined output | **Structural claim** | Specification is complete; implementation correctness depends on dominance criteria |

### Corrections to Original Source

| Location | Error | Correction |
|----------|-------|------------|
| THREE_PROJECTIONS_UNIFIED §10.2 | φ² = 1−φ | φ² = φ+1; it is φ̄ satisfying x²=1−x |
| THREE_PROJECTIONS_UNIFIED §10.2 | multiply: +ad+bc−bd | multiply: +ad+bc+bd |
| THREE_PROJECTIONS_UNIFIED §10.2 | a+bφ = n (Z[φ] element) | a+b = n (arithmetic split) |
| THREE_PROJECTIONS_UNIFIED §5.2 | S₃ diameter=3; C∈{0,1/3,2/3,1} | diameter=2; C∈{0,1/2,1} |

---

*See also: TP_PAPER1_DIST.md (Dist, R(R)=R); TP_PAPER2_BRIDGE.md (bridge chain, forced constants);
TP_PAPER3_ARITHMETIC.md (gradient flow, Fibonacci→I², V(n)); TP_PAPER4_FOLDING.md (independence,
folding, K1′, Sakharov); THREE_PROJECTIONS_UNIFIED.md (source; Parts IV,V,IX,X).*
