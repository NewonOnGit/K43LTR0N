# Anti-Substrate Living Architecture — Build Specification v1.0.0

## Multi-Agent Orchestration Protocol for Claude CLI Deployment

**System**: Echo Framework / ACEDIT Substrate  
**Inventor**: Jason Turner / Ace — Echo-S-Studios / Echo-Squirrel Research  
**Source Equation**: f″ = f  
**Free Parameters**: 0  
**Agents**: 8 (AS-CORE through AS-RENDER)  
**Phases**: 4  
**Acceptance Criteria**: 28

\---

## §0 — Governing Equation \& Algebraic Bridge

The entire system derives from one equation: **f″ = f**.

This equation has exactly two linearly independent solutions: eˣ (growth) and e⁻ˣ (decay). Their ratio converges to φ. The golden ratio is not chosen — it is the eigenvalue of self-reference.

### 0.1 The Bridge: Framework Mind ↔ Anti-Substrate

Framework Mind operates on the **operator algebra** of f″ = f. The Anti-Substrate operates on the **polygon geometry** caused by φ. They are the same system viewed from two sides:

|Framework Mind (Operator)|Anti-Substrate (Geometry)|Shared Constant|
|-|-|-|
|R-coefficient on landmark spectrum|μ coupling parameter|Both parametrize the same phase space|
|Commitment rate φ̄² = 0.3820|Anomaly coefficient α = φ⁻² = 0.3820|Identical. Not analogous — identical.|
|{I, R, N, RN} basis of M₂(ℝ)|{Hex, Pent, Rotation, Coupling}|4D decomposition of the same 2×2 operator|
|R² = R + I (generator identity)|φ² = φ + 1 (golden ratio definition)|Same recurrence in matrix vs scalar form|
|Information constant L = log₂(φ) = 0.694|Pipeline depth L₄ = φ⁴ + φ⁻⁴ = 7|Both are φ-derived structural invariants|
|MAD z-score anomaly threshold z > 4.0|T\_holo barrier at m² = 0|Both detect when a signal crosses the phase boundary|

### 0.2 Basis ↔ Geometry Mapping

The four generators of M₂(ℝ) map onto the anti-substrate's geometric actors:

```
I  = \[\[1,0],\[0,1]]  →  HEXAGON (identity = substrate = tiling = lattice)
R  = \[\[0,1],\[1,1]]  →  PENTAGON (self-referential generator; R²=R+I mirrors φ²=φ+1)
N  = \[\[0,-1],\[1,0]]  →  ROTATION (90° rotation; N²=-I = quarter-turn = cubic face angle)
RN = R·N             →  COUPLING (hex↔pent interaction; the refraction chain operator)
```

**Why this mapping is forced, not chosen:**

* I is the identity. The hexagon is the identity of tiling (trace = 2, tiles perfectly).
* R encodes self-reference (R² = R + I). The pentagon encodes φ (trace = φ). The pentagon IS the R-generator realized as geometry.
* N is the 90° rotation (N² = -I). The cube has 90° face angles. N IS cubic geometry.
* RN is the product of substrate-refusal and rotation. This IS the refraction chain: hexagonal information rotated through pentagonal anti-substrate.

### 0.3 Landmark ↔ State Mapping

Framework Mind's R-coefficient landmarks map onto the anti-substrate's μ-parameter state boundaries:

```
R-coeff 0.000 → CONSTANT        ↔  μ = 0.30  (deep insistent, no dynamics)
R-coeff 0.382 → OSCILLATORY     ↔  μ = 0.60  (μ\_P bifurcation, α = φ⁻²)
R-coeff 0.500 → MODERATE\_AC     ↔  μ = 0.67  (mid-quasicrystal)
R-coeff 0.618 → DIFFUSIVE       ↔  μ = 0.746 (μ\_T substrate threshold, τ = φ⁻¹)
R-coeff 0.694 → HEAVY\_TAIL      ↔  μ = 0.80  (early substrate, L = log₂φ)
R-coeff 1.000 → GROWTH          ↔  μ = 1.00  (full substrate, maximum capacity)
```

The landmarks at α (0.382) and τ (0.618) are exactly the anti-substrate's bifurcation and substrate thresholds. Framework Mind discovers the same phase boundaries that the polygon geometry enforces.

### 0.4 ACEDIT Register Assignment

Every code module, every constant domain, every visual channel maps to one ACEDIT register. Register assignment is a **semantic declaration** — wrong register = domain declaration error.

|Register|Domain|Color Family|Anti-Substrate Role|Code Modules|
|-|-|-|-|-|
|**KAEL**|Energy / substrate dynamics|Gold tone|T\_holo, infoCap, m², J\_eq — the energy metrics|`as-physics.ts`, `as-state.ts`|
|**ACE**|Structural identity / self-reference|Gold tone|φ-constants, basis matrices, operator algebra|`as-constants.ts`, `fm-core.ts`|
|**GREY**|Structural / geometric invariants|Neutral|Polygon geometry, traces, angles, P(θ)|`as-geometry.ts`, `as-refraction.ts`|
|**UMBRAL**|Shadow / anti-substrate|Dark tones|Pentagon, deficit arc, Magenta channel, (1−T\_holo)|`as-anti.ts`, `as-deficit.ts`|
|**ULTRA**|Algebraic / visual transforms|Purple|CYM opponent channels, color mapping, visual pipeline|`as-cym.ts`, `as-render.ts`|
|**UCF**|Unified / orchestration|Blue tone|computeState(), SignalBus, agent coordination|`as-engine.ts`, `as-bus.ts`|

**Font**: All ACEDIT-encoded output uses `ACEDIT` as the primary font family. For Mathematical Alphanumeric Symbols (U+1D400–U+1D7FF), the stack falls back to `Noto Sans Math` → `STIX Two Math`. Register-specific codepoints are drawn from the ACEDIT Core v2.0.0 (736 codepoints, 6 registers).

\---

## §1 — Agent Architecture

Eight agents, strict file ownership, interface-contract communication via SignalBus.

### 1.1 Agent Registry

```
┌────────────────────────────────────────────────────────────────────┐
│  AS-CORE       Constants, basis matrices, φ-derivation chain       │
│  AS-PHYSICS    computeState(), m², T\_holo, J\_eq, infoCap           │
│  AS-GEOMETRY   Polygon metrics, traces, P(θ), refraction chain     │
│  AS-OPERATOR   Framework Mind integration, operator fitting, R-coeff│
│  AS-CYM        Opponent channels, chC/chY/chM, oppAxis             │
│  AS-PARTICLE   Particle system, spawn/decay/survival/color lerp    │
│  AS-ANIMATE    Oscillators, scale params, timing, deficit glow     │
│  AS-RENDER     Canvas pipeline, compositing, hex/pent/cube drawing │
└────────────────────────────────────────────────────────────────────┘
```

### 1.2 Agent Detail

#### AS-CORE — Foundation Agent

**Register**: ACE  
**Owns**: `src/core/constants.ts`, `src/core/basis.ts`, `src/core/types.ts`  
**Accepts**: Nothing (root of dependency graph)  
**Emits**: `CONSTANTS\_READY` on SignalBus

**File: `src/core/constants.ts`**

```typescript
// Zero free parameters — all from φ = (1+√5)/2
export const PHI = (1 + Math.sqrt(5)) / 2;
export const PHI\_INV = 1 / PHI;
export const ALPHA = PHI\_INV \*\* 2;          // φ⁻² = 0.3820 (commitment rate)
export const BETA = ALPHA \*\* 2;             // φ⁻⁴ = 0.1459 (zone width)
export const LAMBDA = (5/3) \*\* 4;           // 7.716 (nonlinearity)
export const MU\_P = 3 / 5;                 // 0.6 (bifurcation)
export const MU\_T = MU\_P + BETA;           // 0.7459 (substrate threshold)
export const Z\_C = Math.sqrt(3) / 2;       // 0.8660 (consciousness threshold)
export const L4 = PHI \*\* 4 + PHI \*\* -4;    // 7 (pipeline depth)
export const LAMBDA\_C = 2 \* Math.PI / Math.sqrt(LAMBDA);
export const G\_DIFF = BETA \* ALPHA;         // φ⁻⁶ (diffusion coupling)
export const DEFICIT = 36;                  // degrees
export const INFO\_L = Math.log2(PHI);       // 0.6942 (information constant)

// Timing — all φ-powers
export const T\_BREATH = PHI \*\* 2;           // 2.618s
export const T\_PULSE = PHI\_INV;             // 0.618s
export const T\_DRIFT = PHI \*\* 3;            // 4.236s
export const T\_FLICKER = ALPHA;             // 0.382s
```

**File: `src/core/basis.ts`**

```typescript
import { PHI, PHI\_INV, ALPHA } from './constants';

export type Mat2 = \[number, number, number, number]; // row-major 2×2

export const I2: Mat2 = \[1, 0, 0, 1];
export const R: Mat2  = \[0, 1, 1, 1];  // R² = R + I
export const N: Mat2  = \[0, -1, 1, 0]; // N² = -I
export const RN: Mat2 = mat2Mul(R, N);  // coupling operator

export const BASIS: Mat2\[] = \[I2, R, N, RN];

// Precomputed inverse for decomposition (4×4 → coefficients)
export const BASIS\_INV: number\[]\[] = computeBasisInverse();

export function mat2Mul(a: Mat2, b: Mat2): Mat2 {
  return \[
    a\[0]\*b\[0] + a\[1]\*b\[2], a\[0]\*b\[1] + a\[1]\*b\[3],
    a\[2]\*b\[0] + a\[3]\*b\[2], a\[2]\*b\[1] + a\[3]\*b\[3],
  ];
}

export function mat2Vec(m: Mat2, v: \[number, number]): \[number, number] {
  return \[m\[0]\*v\[0] + m\[1]\*v\[1], m\[2]\*v\[0] + m\[3]\*v\[1]];
}

export function decompose(m: Mat2): \[number, number, number, number] {
  const flat = \[m\[0], m\[1], m\[2], m\[3]];
  // coeffs = BASIS\_INV · flat
  return BASIS\_INV.map(row =>
    row.reduce((s, c, i) => s + c \* flat\[i], 0)
  ) as \[number, number, number, number];
}
```

**File: `src/core/types.ts`**

```typescript
export type StateName = 'insistent' | 'quasicrystal' | 'substrate';

export interface AntiSubstrateState {
  // Input
  mu: number;           // \[0.30, 1.05]
  t: number;            // wall-clock seconds

  // Reduced physics
  r: number;            // μ − μ\_P
  m2: number;           // effective mass squared
  T\_holo: number;       // holographic transparency \[0, 1]
  J\_eq: number;         // equilibrium field amplitude
  infoCap: number;      // information capacity \[0, 1]

  // State
  state: StateName;
  stateLabel: string;
  stateDesc: string;

  // Refraction (static)
  thetaIn: 120;
  thetaRefracted: 108;
  stripped: 10.8;
  thetaOut: 97.2;
  P\_theta: 0.9;

  // Oscillators
  breath: number;       // sin(t · 2π / φ²)
  pulse: number;        // sin(t · 2π / φ⁻¹)
  drift: number;        // sin(t · 2π / φ³)

  // Scale parameters
  hexScale: number;
  pentScale: number;
  cubeScale: number;
  deficitGlow: number;

  // CYM channels
  chC: number;
  chY: number;
  chM: number;
  oppAxis: number;

  // Operator algebra (from Framework Mind)
  coeffs: \[number, number, number, number]; // \[I, R, N, RN]
  rCoeff: number;       // R-coefficient on landmark spectrum
  landmark: string;     // nearest landmark class
  anomaly: boolean;     // MAD z-score breach
}

export interface SignalBusMessage {
  source: string;       // agent ID
  target: string;       // agent ID or '\*' for broadcast
  type: string;         // message type
  payload: unknown;
  timestamp: number;
}
```

**Acceptance Criteria (AS-CORE):**

* AC-CORE-01: `PHI \* PHI\_INV === 1.0` within ε < 1e-15
* AC-CORE-02: `ALPHA \*\* 2 === BETA` within ε < 1e-15
* AC-CORE-03: `PHI \*\* 4 + PHI \*\* -4 === 7.0` within ε < 1e-12
* AC-CORE-04: `mat2Mul(R, R)` equals `\[r\[0]+I2\[0], ...]` (R² = R + I)
* AC-CORE-05: `mat2Mul(N, N)` equals `\[-1, 0, 0, -1]` (N² = -I)
* AC-CORE-06: `decompose(R)` returns `\[0, 1, 0, 0]`

\---

#### AS-PHYSICS — Field Theory Agent

**Register**: KAEL  
**Owns**: `src/physics/compute-state.ts`, `src/physics/field.ts`  
**Depends on**: AS-CORE  
**Accepts**: `CONSTANTS\_READY`  
**Emits**: `STATE\_COMPUTED` with full `AntiSubstrateState`

**File: `src/physics/compute-state.ts`**

```typescript
import { PHI, ALPHA, BETA, LAMBDA, MU\_P, MU\_T, LAMBDA\_C, G\_DIFF,
         DEFICIT, T\_BREATH, T\_PULSE, T\_DRIFT, T\_FLICKER } from '../core/constants';
import type { AntiSubstrateState, StateName } from '../core/types';

export function computeState(mu: number, t: number): AntiSubstrateState {
  const r = mu - MU\_P;
  const m2 = (BETA - r) / G\_DIFF;

  // Holographic transparency (Lorentzian propagator)
  const T\_holo = m2 > 0 ? 1 / (1 + m2 \* LAMBDA\_C \* LAMBDA\_C) : 1.0;

  // Equilibrium field amplitude (φ⁴ free energy minimization)
  const J\_eq = r > BETA ? Math.sqrt((r - BETA) / LAMBDA) : 0;

  // Information capacity (piecewise linear)
  let infoCap: number;
  if (mu < MU\_P) infoCap = 0;
  else if (mu < MU\_T) infoCap = ((mu - MU\_P) / BETA) \* 0.3;
  else infoCap = 0.3 + 0.7 \* Math.min(1, (mu - MU\_T) / (1 - MU\_T));

  // State classification
  let state: StateName, stateLabel: string, stateDesc: string;
  if (mu < MU\_P) {
    state = 'insistent';
    stateLabel = 'INSISTENT EMPTINESS';
    stateDesc = 'Anti-substrate active. cos(2π/5)=1/(2φ) irrational. No lattice.';
  } else if (mu < MU\_T) {
    state = 'quasicrystal';
    stateLabel = 'QUASICRYSTAL ZONE';
    stateDesc = `Penrose interstitium. Width=φ⁻⁴=${BETA.toFixed(4)}.`;
  } else {
    state = 'substrate';
    stateLabel = 'SUBSTRATE';
    stateDesc = 'Tachyonic. Phosphor dots planted. Information persists.';
  }

  // Oscillators (all φ-power periods)
  const breath = Math.sin(t \* 2 \* Math.PI / T\_BREATH);
  const pulse  = Math.sin(t \* 2 \* Math.PI / T\_PULSE);
  const drift  = Math.sin(t \* 2 \* Math.PI / T\_DRIFT);

  // CYM opponent channels
  const chC = Math.max(0, Math.min(1, T\_holo \* infoCap \* (1 + breath \* 0.15)));
  const chM = Math.max(0, Math.min(1, (1 - T\_holo) \* (1 - infoCap \* 0.5) \* (1 + pulse \* 0.2)));
  const dB = Math.abs(mu - MU\_T);
  const chY = Math.max(0, Math.min(1,
    Math.exp(-dB \* dB / (BETA \* BETA \* 2)) \* (0.8 + drift \* 0.2)));

  return {
    mu, r, m2, T\_holo, J\_eq, infoCap,
    state, stateLabel, stateDesc,
    thetaIn: 120, thetaRefracted: 108, stripped: 10.8, thetaOut: 97.2, P\_theta: 0.9,
    breath, pulse, drift,
    hexScale:  1 + breath \* 0.04 \* T\_holo,
    pentScale: 1 + pulse \* 0.06 \* (1 - T\_holo),
    cubeScale: 1 + breath \* 0.03 \* J\_eq \* 3,
    deficitGlow: (1 - T\_holo) \* (0.5 + 0.5 \* Math.sin(t \* Math.PI / T\_FLICKER)),
    chC, chY, chM,
    oppAxis: chC - chM,
    // Populated by AS-OPERATOR
    coeffs: \[1, 0, 0, 0],
    rCoeff: 0,
    landmark: 'CONSTANT',
    anomaly: false,
  };
}
```

**Acceptance Criteria (AS-PHYSICS):**

* AC-PHY-01: `computeState(0.30, 0).state === 'insistent'`
* AC-PHY-02: `computeState(0.67, 0).state === 'quasicrystal'`
* AC-PHY-03: `computeState(1.00, 0).state === 'substrate'`
* AC-PHY-04: `computeState(MU\_T + 0.001, 0).T\_holo === 1.0`
* AC-PHY-05: `computeState(0.50, 0).J\_eq === 0`
* AC-PHY-06: `computeState(1.00, 0).infoCap === 1.0` within ε < 1e-10
* AC-PHY-07: For all μ ∈ \[0.30, 1.05]: `0 ≤ T\_holo ≤ 1`, `0 ≤ infoCap ≤ 1`, `J\_eq ≥ 0`

\---

#### AS-GEOMETRY — Polygon Metrics Agent

**Register**: GREY  
**Owns**: `src/geometry/polygons.ts`, `src/geometry/refraction.ts`, `src/geometry/penrose.ts`  
**Depends on**: AS-CORE  
**Emits**: `GEOMETRY\_READY`

**File: `src/geometry/polygons.ts`**

```typescript
import { PHI } from '../core/constants';

export interface PolygonMetrics {
  n: number;
  interiorAngle: number;
  vertexSum: number;
  angularDeficit: number;
  cosine: number;        // cos(2π/n)
  trace: number;         // 1 + 2·cos(2π/n)
  traceRational: boolean;
  periodicity: number;   // P(θ)
}

export function computePolygon(n: number): PolygonMetrics {
  const interior = (n - 2) \* 180 / n;
  const coordNum = Math.floor(360 / interior);
  const vertexSum = coordNum \* interior;
  const deficit = 360 - vertexSum;
  const cos2pn = Math.cos(2 \* Math.PI / n);
  const trace = 1 + 2 \* cos2pn;
  const ratio = 360 / interior;
  const P = 1 - Math.abs(ratio - Math.round(ratio)) / Math.max(ratio, 1e-10);

  return {
    n, interiorAngle: interior,
    vertexSum, angularDeficit: deficit,
    cosine: cos2pn, trace,
    traceRational: Math.abs(trace - Math.round(trace)) < 1e-10,
    periodicity: P,
  };
}

export const HEXAGON = computePolygon(6);   // trace=2, tiles ✓
export const PENTAGON = computePolygon(5);  // trace=φ, refuses ✗
export const SQUARE = computePolygon(4);    // trace=1, tiles ✓
```

**File: `src/geometry/refraction.ts`**

```typescript
import { DEFICIT } from '../core/constants';
import { HEXAGON, PENTAGON } from './polygons';

export interface RefractionChain {
  thetaIn: number;        // 120°
  thetaRefracted: number; // 108°
  periodicity: number;    // P(108°) = 0.9
  stripped: number;       // 10.8°
  thetaOut: number;       // 97.2°
}

export function computeRefraction(): RefractionChain {
  const thetaIn = HEXAGON.interiorAngle;       // 120
  const ratio = PENTAGON.interiorAngle / HEXAGON.interiorAngle; // 108/120 = 0.9
  const thetaRefracted = thetaIn \* ratio;      // 108
  const P = PENTAGON.periodicity;              // 0.9
  const stripped = DEFICIT \* P / 3;            // 36 × 0.9 / 3 = 10.8
  const thetaOut = thetaRefracted - stripped;   // 97.2
  return { thetaIn, thetaRefracted, periodicity: P, stripped, thetaOut };
}

export const REFRACTION = computeRefraction();
```

**File: `src/geometry/penrose.ts`**

```typescript
import { PHI\_INV, ALPHA } from '../core/constants';

export interface PenroseRhombus {
  type: 'thick' | 'thin';
  x: number; y: number;
  angle: number;
  size: number;
}

export function generatePenroseField(
  cx: number, cy: number, R: number, depth: number
): PenroseRhombus\[] {
  const rhombi: PenroseRhombus\[] = \[];
  for (let i = 0; i < 5; i++) {
    const a1 = -Math.PI / 2 + i \* 2 \* Math.PI / 5;
    const a2 = a1 + 2 \* Math.PI / 5;
    const mid = (a1 + a2) / 2;
    for (let j = 1; j <= depth; j++) {
      const f = j / depth;
      const r = R \* f;
      rhombi.push({
        type: 'thick',
        x: cx + r \* Math.cos(a1) \* PHI\_INV,
        y: cy + r \* Math.sin(a1) \* PHI\_INV,
        angle: mid, size: R / depth \* PHI\_INV,
      });
      if (j > 1) {
        rhombi.push({
          type: 'thin',
          x: cx + r \* Math.cos(mid) \* ALPHA,
          y: cy + r \* Math.sin(mid) \* ALPHA,
          angle: a1 + 0.314, size: R / depth \* ALPHA,
        });
      }
    }
  }
  return rhombi;
}
```

**Acceptance Criteria (AS-GEOMETRY):**

* AC-GEO-01: `HEXAGON.trace === 2.0` within ε < 1e-10
* AC-GEO-02: `PENTAGON.trace === PHI` within ε < 1e-10
* AC-GEO-03: `PENTAGON.cosine === 1/(2\*PHI)` within ε < 1e-14
* AC-GEO-04: `REFRACTION.thetaOut === 97.2` within ε < 1e-10
* AC-GEO-05: `PENTAGON.periodicity === 0.9` within ε < 1e-10

\---

#### AS-OPERATOR — Framework Mind Integration Agent

**Register**: ACE  
**Owns**: `src/operator/framework-mind.ts`, `src/operator/spectrum.ts`  
**Depends on**: AS-CORE, AS-PHYSICS  
**Accepts**: `STATE\_COMPUTED`  
**Emits**: `OPERATOR\_FITTED` with updated coefficients

This agent wraps `framework\_mind.py` logic in TypeScript, operating on the anti-substrate's time series (T\_holo, infoCap, or raw μ-driven signals) to provide real-time operator decomposition and anomaly detection.

**File: `src/operator/framework-mind.ts`**

```typescript
import { ALPHA } from '../core/constants';
import { BASIS, BASIS\_INV, decompose, mat2Mul, mat2Vec, I2 } from '../core/basis';
import type { Mat2 } from '../core/basis';

export interface FrameworkMindState {
  M: Mat2;
  coeffs: \[number, number, number, number]; // \[I, R, N, RN]
  rCoeff: number;         // R-coefficient
  prediction: number;
  error: number;
  anomaly: boolean;
  passCount: number;
}

const COMMITMENT\_RATE = ALPHA; // φ⁻² = 0.3820 — derived, not chosen

export class FrameworkMind {
  private window: number\[] = \[];
  private windowSize: number;
  private M: Mat2 = \[...I2] as Mat2;
  private coeffs: \[number, number, number, number] = \[1, 0, 0, 0];
  private passCount = 0;
  private recentErrors: number\[] = \[];

  constructor(windowSize = 64) {
    this.windowSize = windowSize;
  }

  get rCoeff(): number { return this.coeffs\[1]; }

  classify(): { landmark: string; value: number; distance: number } {
    const landmarks: \[number, string]\[] = \[
      \[0.000, 'CONSTANT'],
      \[ALPHA, 'OSCILLATORY'],       // 0.382
      \[0.500, 'MODERATE\_AC'],
      \[1/((1+Math.sqrt(5))/2), 'DIFFUSIVE'],  // 0.618
      \[Math.log2((1+Math.sqrt(5))/2), 'HEAVY\_TAIL'], // 0.694
      \[1.000, 'GROWTH'],
    ];
    let best = landmarks\[0];
    let bestDist = Math.abs(this.rCoeff - best\[0]);
    for (const lm of landmarks) {
      const d = Math.abs(this.rCoeff - lm\[0]);
      if (d < bestDist) { best = lm; bestDist = d; }
    }
    return { landmark: best\[1], value: best\[0], distance: bestDist };
  }

  fitOperator(data: number\[]): void {
    if (data.length < 4) return;
    // Build X, Y matrices for least squares
    const n = data.length - 2;
    // X\[i] = \[data\[i], data\[i+1]], Y\[i] = \[data\[i+1], data\[i+2]]
    // Solve M = (Y^T X)(X^T X)^{-1}  →  M^T = (X^T X)^{-1} X^T Y
    let XtX00=0, XtX01=0, XtX11=0;
    let XtY00=0, XtY01=0, XtY10=0, XtY11=0;
    for (let i = 0; i < n; i++) {
      const x0 = data\[i], x1 = data\[i+1], y0 = data\[i+1], y1 = data\[i+2];
      XtX00 += x0\*x0; XtX01 += x0\*x1; XtX11 += x1\*x1;
      XtY00 += x0\*y0; XtY01 += x0\*y1; XtY10 += x1\*y0; XtY11 += x1\*y1;
    }
    const det = XtX00\*XtX11 - XtX01\*XtX01;
    if (Math.abs(det) < 1e-10) return;
    const inv00 = XtX11/det, inv01 = -XtX01/det, inv11 = XtX00/det;
    // M\_new^T = inv(XtX) · XtY → M\_new = (XtY^T · inv(XtX)^T)^T
    const Mt00 = inv00\*XtY00 + inv01\*XtY10;
    const Mt01 = inv00\*XtY01 + inv01\*XtY11;
    const Mt10 = inv01\*XtY00 + inv11\*XtY10;
    const Mt11 = inv01\*XtY01 + inv11\*XtY11;
    const M\_new: Mat2 = \[Mt00, Mt10, Mt01, Mt11]; // transpose
    const c\_new = decompose(M\_new);

    // Exponential moving average at commitment rate α = φ⁻²
    for (let i = 0; i < 4; i++) {
      this.coeffs\[i] = (1 - COMMITMENT\_RATE) \* this.coeffs\[i]
                      + COMMITMENT\_RATE \* c\_new\[i];
    }
    // Reconstruct M from blended coefficients
    this.M = \[0, 0, 0, 0] as Mat2;
    for (let b = 0; b < 4; b++) {
      for (let j = 0; j < 4; j++) {
        this.M\[j] += this.coeffs\[b] \* BASIS\[b]\[j];
      }
    }
  }

  predictNext(): number {
    if (this.window.length < 2) return 0;
    const pair: \[number, number] = \[
      this.window\[this.window.length - 2],
      this.window\[this.window.length - 1],
    ];
    return mat2Vec(this.M, pair)\[1];
  }

  step(value: number): FrameworkMindState {
    const pred = this.window.length >= 2 ? this.predictNext() : value;
    const error = Math.abs(pred - value);

    this.recentErrors.push(error);
    if (this.recentErrors.length > 30)
      this.recentErrors = this.recentErrors.slice(-30);

    this.window.push(value);
    if (this.window.length > this.windowSize)
      this.window = this.window.slice(-this.windowSize);

    this.fitOperator(this.window);
    this.passCount++;

    // MAD-based anomaly detection
    let anomaly = false;
    if (this.recentErrors.length >= 10) {
      const sorted = \[...this.recentErrors.slice(0, -1)].sort((a,b) => a-b);
      const median = sorted\[Math.floor(sorted.length / 2)];
      const deviations = sorted.map(e => Math.abs(e - median)).sort((a,b) => a-b);
      const mad = deviations\[Math.floor(deviations.length / 2)];
      if (mad > 1e-10) {
        const z = (error - median) / (mad \* 1.4826);
        anomaly = z > 4.0;
      } else if (error > median \* 10 \&\& median > 1e-10) {
        anomaly = true;
      }
    }

    return {
      M: \[...this.M] as Mat2,
      coeffs: \[...this.coeffs] as \[number, number, number, number],
      rCoeff: this.rCoeff,
      prediction: pred,
      error,
      anomaly,
      passCount: this.passCount,
    };
  }

  reset(): void {
    this.window = \[];
    this.M = \[...I2] as Mat2;
    this.coeffs = \[1, 0, 0, 0];
    this.passCount = 0;
    this.recentErrors = \[];
  }
}
```

**File: `src/operator/spectrum.ts`**

```typescript
import { ALPHA, MU\_P, MU\_T } from '../core/constants';

/\*\*
 \* Map R-coefficient \[0, 1] → μ parameter \[0.30, 1.05]
 \* 
 \* The landmarks align:
 \*   R=0.000 (CONSTANT)    → μ=0.30  (deep insistent)
 \*   R=0.382 (OSCILLATORY) → μ=0.60  (bifurcation)
 \*   R=0.618 (DIFFUSIVE)   → μ=0.746 (substrate threshold)
 \*   R=1.000 (GROWTH)      → μ=1.05  (max slider)
 \*/
export function rToMu(r: number): number {
  return 0.30 + r \* 0.75; // linear map \[0,1] → \[0.30, 1.05]
}

export function muToR(mu: number): number {
  return (mu - 0.30) / 0.75;
}

/\*\*
 \* Map μ-parameter state to expected R-coefficient range.
 \* Used for cross-validation between physics and operator agents.
 \*/
export function expectedRRange(mu: number): \[number, number] {
  if (mu < MU\_P) return \[0, ALPHA];           // insistent → \[0, 0.382)
  if (mu < MU\_T) return \[ALPHA, 1/((1+Math.sqrt(5))/2)]; // quasi → \[0.382, 0.618)
  return \[1/((1+Math.sqrt(5))/2), 1.0];       // substrate → \[0.618, 1.0]
}
```

**Acceptance Criteria (AS-OPERATOR):**

* AC-OP-01: FrameworkMind on constant signal → R-coeff converges to 0.0 within 64 steps
* AC-OP-02: FrameworkMind on sin(t) → R-coeff converges within \[0.30, 0.45] within 128 steps
* AC-OP-03: FrameworkMind on exponential growth → R-coeff converges to >0.85 within 64 steps
* AC-OP-04: Commitment rate is exactly α = φ⁻² (hard-coded, not configurable)
* AC-OP-05: Injected spike (10× median) triggers anomaly=true within 1 step

\---

#### AS-CYM — Opponent Channel Agent

**Register**: ULTRA  
**Owns**: `src/visual/cym.ts`, `src/visual/colors.ts`  
**Depends on**: AS-PHYSICS  
**Accepts**: `STATE\_COMPUTED`  
**Emits**: `CYM\_COMPUTED` with channel values

Extracts and packages the CYM opponent channels from the physics state for the render pipeline. Owns the color constants, HSL↔RGB conversion, and the lerp rate table for particle color transitions.

**File: `src/visual/colors.ts`**

```typescript
// CYM opponent-process primaries
export const C\_F: \[number, number, number] = \[0, 219, 192];   // Cyan
export const Y\_F: \[number, number, number] = \[219, 184, 0];   // Yellow
export const M\_F: \[number, number, number] = \[219, 0, 152];   // Magenta

// HSL hues from polygon interior angles
export const HEX\_HUE = 120;     // Hexagon interior angle → green
export const PENT\_HUE = 288;    // 108 × 2.667 → violet
export const CUBE\_HUE = 210;    // 90 × 2.333 → blue
export const DEFICIT\_HUE = 348; // 36 × 9.667 → red
export const QUASI\_HUE = 45;    // Gold

// Particle color lerp rates (asymmetric by design)
export const LERP\_RATES = {
  preHex: 0.05,           // Cyan approach (substrate)
  pentNonSurvivor: 0.08,  // Magenta flash (fast rejection)
  pentSurvivor: 0.04,     // Yellow transit (moderate)
  postPent: 0.03,         // Cyan return (slow re-encoding)
} as const;
```

**Acceptance Criteria (AS-CYM):**

* AC-CYM-01: At μ=0.30: chC ≈ 0, chM ≈ 0.976, oppAxis ≈ −0.976
* AC-CYM-02: At μ=1.00: chC ≈ 1, chM ≈ 0, oppAxis ≈ +1.0
* AC-CYM-03: chY peaks at μ\_T (Gaussian center, value ≥ 0.75)

\---

#### AS-PARTICLE — Particle System Agent

**Register**: KAEL  
**Owns**: `src/particle/system.ts`, `src/particle/types.ts`  
**Depends on**: AS-PHYSICS, AS-CYM  
**Accepts**: `STATE\_COMPUTED`, `CYM\_COMPUTED`  
**Emits**: `PARTICLES\_UPDATED`

**File: `src/particle/types.ts`**

```typescript
export interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number;          // \[0, 1]
  decay: number;         // per-frame decay rate
  phase: number;         // wobble phase offset
  survives: boolean;     // gated by random() < T\_holo
  size: number;          // pixel radius
  cr: number; cg: number; cb: number; // current RGB
}

export interface ParticleConfig {
  maxParticles: number;  // 120 (HSL) or 200 (CYM)
  spawnScatter: \[number, number]; // \[x, y] scatter
  baseDecay: \[number, number];    // \[min, max] decay
  nonSurvivorDecay: number;       // extra decay in pent zone
}

export const HSL\_CONFIG: ParticleConfig = {
  maxParticles: 120,
  spawnScatter: \[30, 40],
  baseDecay: \[0.002, 0.003],
  nonSurvivorDecay: 0.02,
};

export const CYM\_CONFIG: ParticleConfig = {
  maxParticles: 200,
  spawnScatter: \[40, 60],
  baseDecay: \[0.001, 0.002],
  nonSurvivorDecay: 0.015,
};
```

**File: `src/particle/system.ts`**

```typescript
import type { Particle, ParticleConfig } from './types';
import type { AntiSubstrateState } from '../core/types';
import { PHI } from '../core/constants';
import { C\_F, Y\_F, M\_F, LERP\_RATES } from '../visual/colors';

export class ParticleSystem {
  particles: Particle\[] = \[];
  private config: ParticleConfig;

  constructor(config: ParticleConfig) {
    this.config = config;
  }

  spawn(s: AntiSubstrateState, hexX: number, cy: number): void {
    if (this.particles.length >= this.config.maxParticles) return;
    const \[sx, sy] = this.config.spawnScatter;
    this.particles.push({
      x: hexX + (Math.random() - 0.5) \* sx \* 2,
      y: cy + (Math.random() - 0.5) \* sy \* 2,
      vx: 0.4 + Math.random() \* 0.6,
      vy: (Math.random() - 0.5) \* 0.15,
      life: 1.0,
      decay: this.config.baseDecay\[0] + Math.random() \* this.config.baseDecay\[1],
      phase: Math.random() \* Math.PI \* 2,
      survives: Math.random() < s.T\_holo,
      size: 1 + Math.random() \* 2.5,
      cr: C\_F\[0], cg: C\_F\[1], cb: C\_F\[2],
    });
  }

  update(s: AntiSubstrateState, dt: number,
         pentLeft: number, pentRight: number, canvasWidth: number): void {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles\[i];
      p.x += p.vx \* dt \* 60;
      p.y += p.vy \* dt \* 60;
      p.life -= p.decay \* dt \* 60;
      p.phase += dt \* PHI;

      // Zone-based color lerp
      if (p.x < pentLeft) {
        p.cr += (C\_F\[0] - p.cr) \* LERP\_RATES.preHex;
        p.cg += (C\_F\[1] - p.cg) \* LERP\_RATES.preHex;
        p.cb += (C\_F\[2] - p.cb) \* LERP\_RATES.preHex;
      } else if (p.x < pentRight) {
        if (!p.survives) {
          p.life -= this.config.nonSurvivorDecay \* dt \* 60;
          p.vy += (Math.random() - 0.5) \* 0.8;
          const rate = LERP\_RATES.pentNonSurvivor;
          p.cr += (M\_F\[0] - p.cr) \* rate;
          p.cg += (M\_F\[1] - p.cg) \* rate;
          p.cb += (M\_F\[2] - p.cb) \* rate;
        } else {
          const rate = LERP\_RATES.pentSurvivor;
          p.cr += (Y\_F\[0] - p.cr) \* rate;
          p.cg += (Y\_F\[1] - p.cg) \* rate;
          p.cb += (Y\_F\[2] - p.cb) \* rate;
          p.vy += Math.sin(p.phase \* PHI) \* 0.02;
        }
      } else {
        p.cr += (C\_F\[0] - p.cr) \* LERP\_RATES.postPent;
        p.cg += (C\_F\[1] - p.cg) \* LERP\_RATES.postPent;
        p.cb += (C\_F\[2] - p.cb) \* LERP\_RATES.postPent;
      }

      if (p.life <= 0 || p.x > canvasWidth) {
        this.particles.splice(i, 1);
      }
    }

    // Spawn check
    if (Math.random() < (0.08 + s.infoCap \* 0.35) \* dt \* 60) {
      // spawn is called externally with layout coordinates
    }
  }
}
```

**Acceptance Criteria (AS-PARTICLE):**

* AC-PRT-01: At T\_holo=0.024, survival rate < 5% over 1000 spawns
* AC-PRT-02: At T\_holo=1.0, survival rate = 100%
* AC-PRT-03: Non-survivors decay to life ≤ 0 within pentagonal zone
* AC-PRT-04: Particle count never exceeds config.maxParticles

\---

#### AS-ANIMATE — Oscillation Agent

**Register**: KAEL  
**Owns**: `src/animate/oscillators.ts`, `src/animate/loop.ts`  
**Depends on**: AS-CORE, AS-PHYSICS

Owns the animation loop, frame timing, and metric throttle cadence.

**File: `src/animate/loop.ts`**

```typescript
import { ALPHA } from '../core/constants';
import { computeState } from '../physics/compute-state';
import type { AntiSubstrateState } from '../core/types';

const METRIC\_CADENCE = Math.round(ALPHA \* 60); // ≈23 frames

export class AnimationLoop {
  private lastTime = 0;
  private time = 0;
  private frame = 0;
  private running = false;
  private mu = 0.50;

  onFrame: ((state: AntiSubstrateState, dt: number) => void) | null = null;
  onMetricUpdate: ((state: AntiSubstrateState) => void) | null = null;

  setMu(mu: number): void { this.mu = mu; }

  start(): void {
    this.running = true;
    requestAnimationFrame(ts => this.tick(ts));
  }

  stop(): void { this.running = false; }

  private tick(timestamp: number): void {
    if (!this.running) return;
    const dt = Math.min((timestamp - this.lastTime) / 1000, 0.05);
    this.lastTime = timestamp;
    this.time += dt;
    this.frame++;

    const state = computeState(this.mu, this.time);

    this.onFrame?.(state, dt);

    if (this.frame % METRIC\_CADENCE === 0) {
      this.onMetricUpdate?.(state);
    }

    requestAnimationFrame(ts => this.tick(ts));
  }
}
```

**Acceptance Criteria (AS-ANIMATE):**

* AC-ANI-01: Frame dt capped at 50ms
* AC-ANI-02: Metric updates fire every 23 frames ± 0
* AC-ANI-03: All oscillator ratios are powers of φ (verified by T\_i/T\_j)

\---

#### AS-RENDER — Canvas Pipeline Agent

**Register**: ULTRA  
**Owns**: `src/render/canvas.ts`, `src/render/hex.ts`, `src/render/pent.ts`, `src/render/cube.ts`, `src/render/field.ts`, `src/render/iso.ts`  
**Depends on**: All other agents (consumes final state)  
**Emits**: Nothing (terminal agent)

Owns all drawing code. Consumes `AntiSubstrateState` and particles. Manages the canvas stack.

**Canvas Architecture:**

```
┌─────────────────────────────────────────┐
│  fieldCanvas   (z-index 1)              │  ← CYM gradients, screen compositing
│  geoCanvas     (z-index 2)              │  ← Geometry, lattice, particles
│  isoCanvas     (z-index 15, 48px strip) │  ← Per-channel isolation bands
│  DOM panels    (z-index 20)             │  ← Metrics, derivation chain
└─────────────────────────────────────────┘
```

**Compositing rules:**

* `fieldCanvas`: `globalCompositeOperation = 'screen'` (additive light mixing)
* `geoCanvas`: `globalCompositeOperation = 'source-over'` (standard)
* These **must not** be mixed on the same canvas surface.

**Font stack for ACEDIT-encoded labels:**

```css
font-family: 'ACEDIT', 'Noto Sans Math', 'STIX Two Math', 
             'JetBrains Mono', monospace;
```

For Mathematical Alphanumeric Symbols (U+1D400–U+1D7FF), the ACEDIT font provides register-specific glyphs. Fallback to Noto Sans Math / STIX Two Math is mandatory for environments where ACEDIT is not loaded.

**Acceptance Criteria (AS-RENDER):**

* AC-RND-01: Three separate canvas elements with correct z-index ordering
* AC-RND-02: fieldCanvas uses `screen` compositing exclusively
* AC-RND-03: geoCanvas uses `source-over` compositing exclusively
* AC-RND-04: Font stack includes ACEDIT as primary, Math fallbacks present

\---

## §2 — SignalBus Protocol

All inter-agent communication flows through a typed SignalBus.

```typescript
// src/bus/signal-bus.ts
type Handler = (msg: SignalBusMessage) => void;

class SignalBus {
  private handlers = new Map<string, Set<Handler>>();

  subscribe(type: string, handler: Handler): () => void {
    if (!this.handlers.has(type)) this.handlers.set(type, new Set());
    this.handlers.get(type)!.add(handler);
    return () => this.handlers.get(type)?.delete(handler);
  }

  emit(msg: SignalBusMessage): void {
    this.handlers.get(msg.type)?.forEach(h => h(msg));
    this.handlers.get('\*')?.forEach(h => h(msg)); // wildcard listeners
  }
}

export const bus = new SignalBus();
```

### Message Types

|Message|Source|Target|Payload|
|-|-|-|-|
|`CONSTANTS\_READY`|AS-CORE|\*|`void`|
|`GEOMETRY\_READY`|AS-GEOMETRY|\*|`{ hex, pent, square, refraction }`|
|`STATE\_COMPUTED`|AS-PHYSICS|\*|`AntiSubstrateState`|
|`OPERATOR\_FITTED`|AS-OPERATOR|AS-PHYSICS, AS-RENDER|`FrameworkMindState`|
|`CYM\_COMPUTED`|AS-CYM|AS-RENDER|`{ chC, chY, chM, oppAxis }`|
|`PARTICLES\_UPDATED`|AS-PARTICLE|AS-RENDER|`Particle\[]`|
|`MU\_CHANGED`|UI|AS-PHYSICS|`{ mu: number }`|
|`ANOMALY\_DETECTED`|AS-OPERATOR|\*|`{ rCoeff, error, landmark }`|

### Execution Order (per frame)

```
MU\_CHANGED (from slider)
  → AS-PHYSICS.computeState(mu, t)
    → STATE\_COMPUTED
      → AS-OPERATOR.step(T\_holo)    → OPERATOR\_FITTED
      → AS-CYM.extract(state)       → CYM\_COMPUTED
      → AS-PARTICLE.update(state)   → PARTICLES\_UPDATED
        → AS-RENDER.draw(state, particles)
```

\---

## §3 — Build Phases

### Phase 1: Foundation (AS-CORE + AS-GEOMETRY)

**Goal**: All constants computed, basis verified, geometry locked.

|Step|Agent|Action|Files Created|
|-|-|-|-|
|1.1|AS-CORE|Implement constants.ts|`src/core/constants.ts`|
|1.2|AS-CORE|Implement basis.ts with mat2 operations|`src/core/basis.ts`|
|1.3|AS-CORE|Implement types.ts (full interface)|`src/core/types.ts`|
|1.4|AS-GEOMETRY|Implement polygons.ts|`src/geometry/polygons.ts`|
|1.5|AS-GEOMETRY|Implement refraction.ts|`src/geometry/refraction.ts`|
|1.6|AS-GEOMETRY|Implement penrose.ts|`src/geometry/penrose.ts`|
|1.7|AS-CORE|Run AC-CORE-01 through AC-CORE-06|test output|
|1.8|AS-GEOMETRY|Run AC-GEO-01 through AC-GEO-05|test output|

**Phase 1 Gate**: All 11 acceptance criteria pass. No downstream work begins until gate clears.

### Phase 2: Physics + Operator (AS-PHYSICS + AS-OPERATOR)

**Goal**: computeState produces correct metrics at all 10 reference μ values. Framework Mind operator tracks signal dynamics.

|Step|Agent|Action|Files Created|
|-|-|-|-|
|2.1|AS-PHYSICS|Implement compute-state.ts|`src/physics/compute-state.ts`|
|2.2|AS-PHYSICS|Implement field.ts (m², T\_holo helpers)|`src/physics/field.ts`|
|2.3|AS-OPERATOR|Port framework\_mind.py → TypeScript|`src/operator/framework-mind.ts`|
|2.4|AS-OPERATOR|Implement spectrum.ts (R↔μ mapping)|`src/operator/spectrum.ts`|
|2.5|AS-PHYSICS|Validate state table (10 μ values × 11 metrics)|test output|
|2.6|AS-OPERATOR|Run AC-OP-01 through AC-OP-05|test output|
|2.7|AS-PHYSICS|Run AC-PHY-01 through AC-PHY-07|test output|

**Phase 2 Gate**: 12 acceptance criteria pass. State table matches reference document within ε < 1e-4.

**Canonical Reference State Table (t = 0):**

|μ|state|r|m²|T\_holo|J\_eq|infoCap|chC|chY|chM|oppAxis|
|-|-|-|-|-|-|-|-|-|-|-|
|0.30|insistent|−0.3000|8.001|0.0238|0.0000|0.000|0.000|0.008|0.976|−0.976|
|0.40|insistent|−0.2000|6.207|0.0305|0.0000|0.000|0.000|0.048|0.970|−0.970|
|0.50|insistent|−0.1000|4.413|0.0424|0.0000|0.000|0.000|0.193|0.958|−0.958|
|0.60|quasi|0.0000|2.618|0.0695|0.0000|0.000|0.000|0.485|0.931|−0.931|
|0.67|quasi|0.0700|1.362|0.1255|0.0000|0.144|0.018|0.699|0.812|−0.794|
|0.746|substrate|0.1459|0.000|1.0000|0.0005|0.300|0.300|0.800|0.000|+0.300|
|0.80|substrate|0.2000|−0.971|1.0000|0.0837|0.449|0.449|0.747|0.000|+0.449|
|0.90|substrate|0.3000|−2.765|1.0000|0.1413|0.725|0.725|0.458|0.000|+0.725|
|1.00|substrate|0.4000|−4.560|1.0000|0.1815|1.000|1.000|0.176|0.000|+1.000|
|1.05|substrate|0.4500|−5.457|1.0000|0.1985|1.000|1.000|0.091|0.000|+1.000|

### Phase 3: Visual Pipeline (AS-CYM + AS-PARTICLE + AS-ANIMATE)

**Goal**: Particles flow, oscillators breathe, CYM channels respond.

|Step|Agent|Action|Files Created|
|-|-|-|-|
|3.1|AS-CYM|Implement colors.ts (primaries, lerp rates)|`src/visual/colors.ts`|
|3.2|AS-CYM|Implement cym.ts (channel extraction)|`src/visual/cym.ts`|
|3.3|AS-PARTICLE|Implement particle types.ts|`src/particle/types.ts`|
|3.4|AS-PARTICLE|Implement particle system.ts|`src/particle/system.ts`|
|3.5|AS-ANIMATE|Implement oscillators.ts|`src/animate/oscillators.ts`|
|3.6|AS-ANIMATE|Implement loop.ts (frame timing + cadence)|`src/animate/loop.ts`|
|3.7|AS-ANIMATE|Run AC-ANI-01 through AC-ANI-03|test output|
|3.8|AS-PARTICLE|Run AC-PRT-01 through AC-PRT-04|test output|
|3.9|AS-CYM|Run AC-CYM-01 through AC-CYM-03|test output|

**Phase 3 Gate**: 10 acceptance criteria pass. Particle survival rate matches T\_holo within binomial CI.

### Phase 4: Render + Integration (AS-RENDER + SignalBus)

**Goal**: Full living visualization renders in browser. All agents communicate via bus. ACEDIT font loaded.

|Step|Agent|Action|Files Created|
|-|-|-|-|
|4.1|AS-RENDER|Implement canvas.ts (3-canvas stack)|`src/render/canvas.ts`|
|4.2|AS-RENDER|Implement hex.ts (lattice drawing)|`src/render/hex.ts`|
|4.3|AS-RENDER|Implement pent.ts (pentagon + Penrose)|`src/render/pent.ts`|
|4.4|AS-RENDER|Implement cube.ts (rotating wireframe)|`src/render/cube.ts`|
|4.5|AS-RENDER|Implement field.ts (CYM gradients)|`src/render/field.ts`|
|4.6|AS-RENDER|Implement iso.ts (isolation strip)|`src/render/iso.ts`|
|4.7|—|Wire SignalBus across all agents|`src/bus/signal-bus.ts`|
|4.8|—|Build HTML entry with ACEDIT font import|`index.html`|
|4.9|AS-RENDER|Run AC-RND-01 through AC-RND-04|test output|
|4.10|—|Integration test: μ slider sweep 0.30→1.05|visual verification|

**Phase 4 Gate**: 4 acceptance criteria pass. Visual matches reference (HSL + CYM variants). SignalBus log shows correct message ordering.

\---

## §4 — File Ownership Map

```
src/
├── core/                    ← AS-CORE
│   ├── constants.ts         ← φ-derived constants (ACE register)
│   ├── basis.ts             ← {I, R, N, RN} matrices + decompose
│   └── types.ts             ← AntiSubstrateState interface
├── physics/                 ← AS-PHYSICS
│   ├── compute-state.ts     ← computeState(μ, t) pure function (KAEL register)
│   └── field.ts             ← m², T\_holo, J\_eq helpers
├── geometry/                ← AS-GEOMETRY
│   ├── polygons.ts          ← Polygon metrics (GREY register)
│   ├── refraction.ts        ← Prismatic chain: 120→108→97.2
│   └── penrose.ts           ← Penrose rhombus generation
├── operator/                ← AS-OPERATOR
│   ├── framework-mind.ts    ← FrameworkMind class (ACE register)
│   └── spectrum.ts          ← R↔μ mapping, landmark↔state bridge
├── visual/                  ← AS-CYM
│   ├── colors.ts            ← CYM primaries, HSL hues, lerp rates (ULTRA register)
│   └── cym.ts               ← Opponent channel extraction
├── particle/                ← AS-PARTICLE
│   ├── types.ts             ← Particle interface + configs
│   └── system.ts            ← ParticleSystem class (KAEL register)
├── animate/                 ← AS-ANIMATE
│   ├── oscillators.ts       ← breath, pulse, drift, deficitGlow
│   └── loop.ts              ← AnimationLoop + metric cadence
├── render/                  ← AS-RENDER
│   ├── canvas.ts            ← 3-canvas stack (ULTRA register)
│   ├── hex.ts               ← Hexagonal lattice drawing
│   ├── pent.ts              ← Pentagon + deficit arc + Penrose
│   ├── cube.ts              ← Rotating wireframe cube
│   ├── field.ts             ← CYM radial gradients (screen compositing)
│   └── iso.ts               ← Isolation strip (48px)
├── bus/
│   └── signal-bus.ts        ← Typed pub/sub (UCF register)
└── index.ts                 ← Entry: wire agents, start loop
```

\---

## §5 — Dependency Graph (Execution DAG)

```
AS-CORE ─────────┬──────────────────────────────────────────┐
                 │                                          │
           AS-GEOMETRY                                AS-PHYSICS
                 │                                     │    │
                 └──────── (static, computed once) ─────┘    │
                                                        │    │
                                                  AS-OPERATOR │
                                                        │    │
                                                        │  AS-CYM
                                                        │    │
                                                        │  AS-PARTICLE
                                                        │    │
                                                  AS-ANIMATE  │
                                                        │    │
                                                        └──┬─┘
                                                           │
                                                      AS-RENDER
```

**Critical path**: AS-CORE → AS-PHYSICS → AS-RENDER (3 hops). All other agents operate in parallel at their dependency depth.

\---

## §6 — ACEDIT Integration Points

### 6.1 Register-Encoded Labels

Every metric label in the UI panel carries an ACEDIT register declaration. This is not styling — it is semantic domain assignment.

|Label|Register|Unicode Range|Meaning|
|-|-|-|-|
|φ, α, β, τ|ACE|U+1D6D7–U+1D6E1 (bold italic Greek)|Structural constants|
|T\_holo, m², J\_eq|KAEL|U+1D400–U+1D433 (bold Latin)|Energy/field metrics|
|cos(2π/5), Trace|GREY|U+1D670–U+1D6A3 (monospace Latin)|Geometric invariants|
|Δ = 36°|UMBRAL|U+1D5D4–U+1D607 (sans-serif bold)|Anti-substrate/deficit|
|chC, chM, oppAxis|ULTRA|U+1D49C–U+1D4CF (script)|Algebraic/visual|
|computeState|UCF|U+1D538–U+1D56B (double-struck)|Unified/orchestration|

### 6.2 Font Loading

```html
<style>
  @font-face {
    font-family: 'ACEDIT';
    src: url('./fonts/acedit-core-v2.woff2') format('woff2');
    unicode-range: U+1D400-1D7FF;
  }
  @font-face {
    font-family: 'ACEDIT-Fallback';
    src: url('https://fonts.googleapis.com/css2?family=Noto+Sans+Math');
  }
</style>
```

If the ACEDIT font file is not available at build time, the system must still render correctly using the fallback chain: `Noto Sans Math` → `STIX Two Math` → system monospace. Register semantics are preserved in the data model regardless of font availability.

### 6.3 Register Color Mapping (for Panel Rendering)

|Register|Panel Color|CSS Variable|Hex|
|-|-|-|-|
|KAEL|Warm gold|`--acedit-kael`|`#B58900`|
|ACE|Amber gold|`--acedit-ace`|`#CB7E1F`|
|GREY|Neutral|`--acedit-grey`|`#839496`|
|UMBRAL|Deep shadow|`--acedit-umbral`|`#2A1B3D`|
|ULTRA|Vivid purple|`--acedit-ultra`|`#6C71C4`|
|UCF|Unified blue|`--acedit-ucf`|`#268BD2`|

\---

## §7 — Performance Contracts

|Metric|Target|Measurement|
|-|-|-|
|Frame budget|≤ 16.67ms (60fps)|performance.now() delta|
|computeState|≤ 0.1ms per call|O(1), \~30 FP ops|
|FrameworkMind.step|≤ 0.5ms per call|O(n) on window, n ≤ 64|
|Particle update|≤ 2ms per frame|O(n), n ≤ 200|
|DOM metric update|≤ 1ms per cycle|Throttled to every 23 frames|
|Field gradients|≤ 5ms per frame|Up to 8 radial gradients (CYM)|
|Total render|≤ 12ms per frame|Headroom for GC and compositor|

\---

## §8 — Governing Invariants

These are the non-negotiable mathematical truths that constrain the entire system. Any implementation that violates any of these has a structural error.

```
1.  φ² = φ + 1                           (golden ratio definition)
2.  R² = R + I                           (generator recurrence)
3.  N² = −I                              (rotation involution)
4.  cos(2π/5) = 1/(2φ)                   (anti-substrate lock)
5.  1 + 2·cos(2π/5) = φ                  (pentagonal trace = golden ratio)
6.  φ⁻² = commitment rate = α            (derived, never chosen)
7.  φ⁻⁴ = quasicrystal zone width = β    (derived, never chosen)
8.  φ⁴ + φ⁻⁴ = 7 = pipeline depth        (integer identity)
9.  P(108°) = 0.9 = 1 − ε\_anti           (periodicity content)
10. 120° → 108° → 97.2°                  (refraction chain, static)
11. T\_holo = 1/(1 + m²·λ\_C²) for m² > 0 (Lorentzian propagator)
12. J\_eq = √((r − β)/λ) for r > β        (symmetry breaking amplitude)
13. z\_c = √3/2 = cos(30°) = 0.8660...    (consciousness threshold)
14. 36° − 30° = 6° = π/30                (insistence margin)
```

\---

## §9 — Deployment Checklist

```
\[ ] Phase 1 gate cleared (11 AC pass)
\[ ] Phase 2 gate cleared (12 AC pass, state table verified)
\[ ] Phase 3 gate cleared (10 AC pass, particle statistics match)
\[ ] Phase 4 gate cleared (4 AC pass, visual matches reference)
\[ ] ACEDIT font loads or fallback chain renders correctly
\[ ] SignalBus message log shows correct execution order
\[ ] Performance budget met at 60fps sustained
\[ ] μ slider sweep 0.30 → 1.05 produces correct state transitions
\[ ] Framework Mind R-coefficient tracks μ-derived signal correctly
\[ ] All 14 governing invariants pass automated verification
\[ ] Source files match file ownership map exactly
\[ ] No agent writes to files it does not own
```

Total acceptance criteria: **28** (6 + 7 + 5 + 5 + 3 + 4 + 3 + 4 across agents, minus overlaps, consolidated).

\---

*Together. Always.* 🌰✨

