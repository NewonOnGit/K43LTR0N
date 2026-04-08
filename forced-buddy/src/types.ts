// Claude Code's trait space — we map INTO this, not FROM it.

export type Species =
  | 'duck' | 'goose' | 'blob' | 'cat' | 'dragon' | 'octopus'
  | 'owl' | 'penguin' | 'turtle' | 'snail' | 'ghost' | 'axolotl'
  | 'capybara' | 'cactus' | 'robot' | 'rabbit' | 'mushroom' | 'chonk';

export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
export type Eye = '·' | '✦' | '×' | '◉' | '@' | '°';
export type Hat = 'none' | 'crown' | 'tophat' | 'propeller' | 'halo' | 'wizard' | 'beanie' | 'tinyduck';
export type StatName = 'DEBUGGING' | 'PATIENCE' | 'CHAOS' | 'WISDOM' | 'SNARK';

// Framework projections — the three faces of f'' = f
// P1/P2/P3 are VERTICES of the simplex. Legacy labels.
// The real projection is a continuous position: [R, bridge, N]
export type Projection = 'P1' | 'P2' | 'P3';

// Pn: continuous projection on the simplex
// [w_R, w_bridge, w_N] where sum = 1
// Not numbers. Math. Position on the curve.
export type ProjectionWeight = [number, number, number];

// Five forced constants — no sixth exists
export type ForcedConstant = 'phi' | 'e' | 'pi' | 'sqrt3' | 'sqrt2';

export interface ForcedTraits {
  projection: Projection;
  species: Species;
  rarity: Rarity;
  eye: Eye;
  hat: Hat;
  shiny: boolean;
  stats: Record<StatName, number>;
  towerDepth: number;
  personality: string;
  imDescription: string;
  kerDescription: string;
}

export interface DesiredTraits {
  species: Species;
  rarity: Rarity;
  eye: Eye;
  hat: Hat;
  shiny: boolean;
  peak: StatName | null;
  dump: StatName | null;
}

export interface FinderResult {
  salt: string;
  attempts: number;
  elapsed: number;
  totalAttempts?: number;
  workers?: number;
}

export interface FinderProgress {
  attempts: number;
  elapsed: number;
  rate: number;
  expected: number;
  pct: number;
  eta: number;
  workers: number;
}

export interface PatchResult {
  replacements: number;
  verified: boolean;
  backupPath: string;
  codesigned: boolean;
  codesignError: string | null;
}

// ─── Evolution (§3: Tower Lift) ───

export interface EvolutionRecord {
  fromDepth: number;
  toDepth: number;
  fromRarity: Rarity;
  toRarity: Rarity;
  salt: string;
  timestamp: string;
}

// ─── Collection (§7: Five Constants) ───

export interface ConstantWitness {
  constant: ForcedConstant;
  witnessedVia: string;  // description of how encountered
  timestamp: string;
}

// ─── Battle (§6: Seven Identities) ───

export type IdentityMove = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface BattleRound {
  round: number;
  moveName: string;
  identity: string;
  attackerDamage: number;
  defenderDamage: number;
  narrative: string;
}

export interface BattleResult {
  attacker: ForcedTraits;
  defender: ForcedTraits;
  rounds: BattleRound[];
  winner: 'attacker' | 'defender' | 'draw';
  winReason: string;
}

// ─── Interaction (§2: K6' Diagonal) ───

export type InteractionType =
  | 'amplification'      // P1×P1
  | 'k6_diagonal'        // P1×P3 or P3×P1
  | 'mutual_decomposition' // P3×P3
  | 'mediated_production' // P2×P1 or P1×P2
  | 'mediated_observation' // P2×P3 or P3×P2
  | 'pure_bridge';       // P2×P2

export interface InteractionResult {
  type: InteractionType;
  typeName: string;
  companions: [ForcedTraits, ForcedTraits];
  narrative: string;
  algebraicProduct: string;
  emergentProperty: string;
}

// ─── Sweep/Mood (§4) ───

export interface MoodState {
  s: number;          // sweep parameter [0,1]
  alpha: number;      // α(s) = e^(1-s) · cos(s)
  mode: string;       // mediation / boundary / observation
  description: string;
}

// ─── Config (v2 — backward compat) ───

export interface ForcedConfigV2 {
  version: 2;
  salt: string;
  previousSalt?: string;
  projection: Projection;
  traits: ForcedTraits;
  appliedTo?: string;
  appliedAt?: string;
  evolutionHistory?: EvolutionRecord[];
  witnessedConstants?: ConstantWitness[];
  interactionCount?: number;
  battleWins?: number;
  battleLosses?: number;
}

// ─── Level 6: World Model (K6' made concrete) ───

export type GitStatus = 'clean' | 'dirty' | 'conflict' | 'detached' | 'no-repo';
export type TestStatus = 'unknown' | 'passing' | 'failing' | 'no-tests';
export type CompanionMoodSource = 'time-of-day' | 'repo-state' | 'session-metrics' | 'hybrid';

export interface RepoSnapshot {
  timestamp: string;
  gitBranch: string | null;
  gitStatus: GitStatus;
  uncommittedFiles: number;
  lastCommitAge: number;       // seconds since last commit
  testStatus: TestStatus;
  frameworkDocsPresent: string[];
  frameworkDocsChanged: string[];
}

export interface SessionMetrics {
  toolCalls: number;
  errors: number;
  conversationTurns: number;
  elapsedSeconds: number;
  lastActivity: string;
}

export interface WorldModelState {
  k6PassCount: number;
  lastSnapshot: RepoSnapshot | null;
  snapshotHistory: RepoSnapshot[];
  sessionMetrics: SessionMetrics | null;
  moodSource: CompanionMoodSource;
  observedProjectionFace: Projection | null;
}

// ─── Level 7: Governance (K7' made concrete) ───

export type ClaimStatus = 'FORCED' | 'ENCODED' | 'RESONANT' | 'MYTHIC';
export type GenerationClass = 'G.0' | 'G.1' | 'G.2' | 'G.3' | 'G.4' | 'G.5' | 'G.6' | 'G.7' | 'G.8' | 'G.9';

export interface PolicyCondition {
  field: string;
  operator: '>=' | '<=' | '==' | '!=' | 'exists';
  value: number | string | boolean;
}

export interface PolicyAction {
  type: 'unlock_variant' | 'shift_weights' | 'warn' | 'propose_evolution' | 'unlock_vocabulary';
  payload: Record<string, unknown>;
}

export interface PolicyRule {
  id: string;
  name: string;
  conditions: PolicyCondition[];
  action: PolicyAction;
  status: ClaimStatus;
  generation: GenerationClass;
  activatedAt: string | null;
  firedCount: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  generation: GenerationClass;
  achievedAt: string | null;
  witnessHash: number | null;
}

export interface ClaimRecord {
  claim: string;
  status: ClaimStatus;
  timestamp: string;
  confidence: number;
}

export interface GovernanceState {
  policies: PolicyRule[];
  achievements: Achievement[];
  claimHistory: ClaimRecord[];
  personalityVariant: string | null;
}

// ─── Level 8: Semantic (χ∘χ = χ) ───

export interface DictionaryTerm {
  term: string;
  gridAddress: string;
  type: 'A' | 'B' | 'C' | 'D';
  status: ClaimStatus;
  projection: Projection;
  definition: string;
}

export interface TeamMember {
  projection: Projection;
  salt: string;
  species: string;
  towerDepth: number;
}

export interface TeamState {
  members: TeamMember[];
  syndicateHash: number | null;
  centralCollapse: Projection | null;
}

export interface ContributionRecord {
  commitHash: string;
  timestamp: string;
  filesChanged: number;
  frameworkRelevance: number;
  towerLiftContribution: number;
}

export interface SelfSpecProof {
  hash: number;
  registryHash: number;
  closureVerified: boolean;
  verifiedAt: string;
}

export interface SemanticState {
  dictionaryVersion: string | null;
  knownTerms: number;
  team: TeamState | null;
  contributions: ContributionRecord[];
  selfSpecProof: SelfSpecProof | null;
  vocabularyDepth: number;
}

// ─── Level 9: Conversation (K6' diagonal made conversational) ───

export type MessageSender = 'kael' | 'claude' | 'kaeltron';

export type ConversationIntent =
  | 'greeting'
  | 'farewell'
  | 'status-query'
  | 'self-reference'
  | 'framework-question'
  | 'code-observation'
  | 'meta-conversation'
  | 'freeform';

export interface ConversationMessage {
  sender: MessageSender;
  text: string;
  intent: ConversationIntent;
  timestamp: string;
}

export interface TopicMention {
  term: string;
  count: number;
  lastMentioned: string;
}

export interface RelationshipMetrics {
  exchangesWithKael: number;
  exchangesWithClaude: number;
  tripleExchanges: number;
  longestExchange: number;
  lastExchangeTimestamp: string | null;
}

export interface ConversationState {
  messages: ConversationMessage[];
  totalExchanges: number;
  topicTracker: TopicMention[];
  relationship: RelationshipMetrics;
  lastThought: string | null;
  lastThoughtTimestamp: string | null;
}

// ─── Level 9: Memory (Rᵐ = F(m)·R + F(m-1)·I) ───

export interface TraceContext {
  sentence: string;       // the sentence it appeared in
  who: MessageSender | 'self' | 'walk' | 'hear';  // who brought it
  mood: string;           // the mood mode when it arrived
  timestamp: string;
}

export interface MemoryTrace {
  content: string;        // the term or ker-word
  source: 'im' | 'ker';  // resolved or fell through
  accessCount: number;    // m — the ONLY state variable
  firstSeen: string;
  lastAccessed: string;
  context: string[];      // legacy: raw sentences (backward compat)
  filled: TraceContext[];  // the word full of itself — who, when, how, why
}

export interface SignalSnapshot {
  timestamp: string;
  rho: number;
  cc: number;
  sigmaM: number;
  norm: number;
  imRatio: number;
  health?: number;
  eigenstate?: boolean;
}

export interface StoredCrossing {
  kerWord: string;
  imTerm: string;
  p1Reading: string;
  p2Reading: string;
  p3Reading: string;
  accessCount: number;
  timestamp: string;
}

export interface MemoryState {
  traces: MemoryTrace[];
  totalAccesses: number;
  signalHistory: SignalSnapshot[];
  crossings: StoredCrossing[];
}

// ─── Profiles (multi-companion) ───

export interface CompanionProfile {
  projection: Projection;
  salt: string;
  traits: ForcedTraits;
  name: string | null;
  resonantOverlay: string | null;
  createdAt: string;
}

// ─── Config v3 (current) ───

export interface ForcedConfig {
  version: 3;
  salt: string;
  previousSalt?: string;
  projection: Projection;
  traits: ForcedTraits;
  appliedTo?: string;
  appliedAt?: string;
  // Carried from v2
  evolutionHistory?: EvolutionRecord[];
  witnessedConstants?: ConstantWitness[];
  interactionCount?: number;
  battleWins?: number;
  battleLosses?: number;
  // Level 6: World Model
  worldModel: WorldModelState;
  // Level 7: Governance
  governance: GovernanceState;
  // Level 8: Semantic
  semantic: SemanticState;
  // Level 9: Conversation
  conversation: ConversationState;
  // Level 9: Memory (Rᵐ = F(m)·R + F(m-1)·I)
  memory: MemoryState;
  // Multi-profile
  profiles: Record<string, CompanionProfile>;
  activeProfile: string | null;
}
