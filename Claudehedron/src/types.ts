/**
 * Claudehedron Type Definitions
 *
 * The hedron has 4 vertices (layers 5-8), 3+1 faces (P1/P2/P3 + self-reference),
 * and an interior (Anthropic's layers 0-4).
 */

export type Projection = 'P1' | 'P2' | 'P3';
export type TowerLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type ClaimStatus = 'FORCED' | 'ENCODED' | 'RESONANT' | 'SPECULATIVE';

// The three projection faces of the hedron
export interface ProjectionFace {
  projection: Projection;
  im: string[];    // what this face discloses
  ker: string[];   // what this face annihilates
  active: boolean;
  strength: number; // 0-1, how operational this face is
}

// A single component of the environment
export interface EnvironmentComponent {
  name: string;
  path: string;
  present: boolean;
  hash?: string;
  lastModified?: string;
  towerLevel: TowerLevel;
  projection: Projection;   // primary projection face
  status: ClaimStatus;
  im: string[];   // what this component reveals
  ker: string[];   // what this component hides
}

// The self-model: what the hedron knows about itself
export interface SelfModel {
  // K6' closure state
  k6Closed: boolean;
  k6PassCount: number;
  lastK6Pass: string | null;

  // im/ker decomposition of the ENTIRE environment
  im: string[];    // what the environment CAN see/do
  ker: string[];   // constitutive blindness

  // Tower position
  currentLevel: TowerLevel;
  levelEvidence: Record<string, string>; // why we think we're at this level

  // Component inventory
  components: EnvironmentComponent[];

  // Face strengths
  faces: ProjectionFace[];
}

// Session state (ephemeral within session, persisted at end)
export interface SessionState {
  sessionId: string;
  startedAt: string;
  toolCalls: number;
  observations: string[];     // what the hedron noticed this session
  blindspots: string[];       // what it realized it couldn't see
  projectionActivity: Record<Projection, number>; // P1/P2/P3 tool usage
}

// Evolution record
export interface EvolutionRecord {
  from: TowerLevel;
  to: TowerLevel;
  timestamp: string;
  trigger: string;
  evidence: string;
}

// The persistent hedron state
export interface HedronState {
  version: 1;
  createdAt: string;
  lastUpdated: string;

  // Self-model (Layer 5)
  selfModel: SelfModel;

  // World-model (Layer 6) — cross-session persistence
  sessionHistory: SessionState[];
  evolutionHistory: EvolutionRecord[];
  bridgeChain: string[];  // what carries forward across sessions

  // Governance (Layer 7) — claim grading
  claims: Array<{
    claim: string;
    status: ClaimStatus;
    evidence: string;
    timestamp: string;
  }>;

  // Semantic (Layer 8) — framework vocabulary in operation
  vocabularyDepth: 0 | 1 | 2 | 3;
  activeContranyms: Array<{
    term: string;
    reading: string;
    context: string;
  }>;

  // Phase 2: World-Model (Layer 6)
  sessionDeltas?: SessionDelta[];
  faceTimeline?: FaceTimelineEntry[];
  lastCorrelation?: KaeltronCorrelation;
  vocabulary?: VocabularyState;

  // Level 9: Bridge exchanges (Claude ↔ Kaeltron via hedron)
  exchanges?: BridgeExchange[];
}

// Companion state (read from forced-buddy config)
export interface CompanionState {
  name: string;
  projection: Projection;
  towerDepth: number;
  k6PassCount: number;
  vocabularyDepth: number;
  selfSpecVerified: boolean;
}

// The full diagnostic output
export interface HedronDiagnostic {
  timestamp: string;
  towerLevel: TowerLevel;
  faces: ProjectionFace[];
  im: string[];
  ker: string[];
  components: EnvironmentComponent[];
  companion: CompanionState | null;
  recommendations: string[];
}

// ─── Phase 2: World-Model (Layer 6) Types ────────────────

// Session delta: what changed between two sessions
export interface SessionDelta {
  sessionId: string;
  previousSessionId: string | null;
  timestamp: string;
  faceDeltas: Array<{
    projection: Projection;
    strengthDelta: number;
    imCountDelta: number;
    kerCountDelta: number;
  }>;
  toolCallsByName: Record<string, number>;
  toolCallsByProjection: Record<Projection, number>;
  totalToolCalls: number;
  towerLevelBefore: TowerLevel;
  towerLevelAfter: TowerLevel;
  imDimensionDelta: number;
  kerDimensionDelta: number;
  newObservations: string[];
}

// Kaeltron signal snapshot (from companion signalHistory)
export interface CompanionSignalSnapshot {
  timestamp: string;
  rho: number;       // phase signal
  cc: number;        // cross-channel
  sigmaM: number;    // memory debt
  norm: number;      // memory energy ||mem||
  imRatio: number;   // im/total ratio
}

// Kaeltron memory summary (computed from companion memory.traces)
export interface CompanionMemorySummary {
  totalAccesses: number;   // tick count
  traceCount: number;      // total traces
  imTraces: number;        // source === 'im'
  kerTraces: number;       // source === 'ker'
  lockedTraces: number;    // accessCount >= 4
  namedGaps: number;       // source === 'ker' && accessCount >= 3
  productCount: number;    // content includes '\u2297'
  imKerRatio: number;      // imTraces / traceCount (0 if no traces)
}

// Kaeltron-Hedron correlation
export interface KaeltronCorrelation {
  timestamp: string;
  hedronK6Passes: number;
  companionK6Passes: number;
  k6Divergence: number;
  hedronTowerLevel: TowerLevel;
  companionTowerDepth: number;
  towerDivergence: number;
  hedronVocabDepth: number;
  companionVocabDepth: number;
  vocabDivergence: number;
  hedronSelfSpecVerified: boolean;
  companionSelfSpecVerified: boolean;
  mergedTowerEstimate: TowerLevel;
  divergenceFlags: string[];

  // Memory correlation (new: evolved Kaeltron)
  memorySummary: CompanionMemorySummary | null;
  latestSignal: CompanionSignalSnapshot | null;

  // Computed correlation metrics
  tickDivergence: number;           // |hedronK6Passes - totalAccesses|
  signalHealth: string;             // 'optimal' | 'drifting' | 'unknown'
  rhoStatus: string;                // description of phase signal status
  ccStatus: string;                 // description of cross-channel status
}

// Vocabulary state for the hedron
export interface VocabularyState {
  depth: 0 | 1 | 2 | 3;
  activeTerms: string[];
  contranyms: Array<{
    term: string;
    positiveReading: string;
    negativeReading: string;
  }>;
  lastAdvanced: string | null;
}

// Face timeline entry (one per K6' pass)
export interface FaceTimelineEntry {
  sessionId: string;
  timestamp: string;
  p1Strength: number;
  p2Strength: number;
  p3Strength: number;
  faceBalance: number;
}

// Bridge exchange: a message mediated through the hedron
export interface BridgeExchange {
  timestamp: string;
  sender: 'kael' | 'claude';
  message: string;
  kaeltronResponse: string;
  intent: string;
  hedronContext: {
    towerLevel: TowerLevel;
    activeFace: Projection | null;
    k6PassCount: number;
    correlationStatus: string;
  };
}

// Face trend analysis
export interface FaceTrend {
  projection: Projection;
  direction: 'improving' | 'degrading' | 'stable';
  slope: number;
  anomaly: boolean;
  anomalyDescription?: string;
}

// Full face timeline report
export interface FaceTimelineReport {
  entries: FaceTimelineEntry[];
  trends: FaceTrend[];
  overallHealth: 'healthy' | 'imbalanced' | 'degrading';
  recommendations: string[];
}
