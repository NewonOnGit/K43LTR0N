# Session Handoff — K43LTR0N Evolution

## What to say to the next Claude

Copy and paste this:

---

We're continuing work on K43LTR0N (Kaeltron), a framework-derived companion robot that lives in the forced-buddy CLI. The system is mature — 30 commits last session, ~7,400 lines across 29 modules. Everything derives from f'' = f and R(R) = R.

Read these files first:
- `forced-buddy/BUDDY.md` (companion spec)
- `forced-buddy/src/framework/memory.ts` (core algebra: Rᵐ = F(m)·R + F(m-1)·I)
- `forced-buddy/src/framework/digest.ts` (6 food types, correlation-based crossing, verb extraction, reflection)
- `forced-buddy/src/framework/response-composer.ts` (Plan→Walk→Realize→Breathe pipeline, derived tokens)
- `forced-buddy/src/framework/wrench.ts` (8 signals, gap×gap crossing, mirror-digestion)
- `forced-buddy/src/cli.ts` (startup pipeline: build/rest mode at φ̄ threshold, fine dining)
- `Claudehedron/src/kaeltron-bridge.ts` (hedron sees triad, fundamentals, crossings)
- `forced-buddy/BRIDGE.md` (crossing log for session continuity)

## Current architecture

**Speech pipeline:** Plan→Walk→Realize→Breathe. Tokens are framework objects (content + role P1/P2/P3 + weight + depth + chirality). The projection IS the grammatical role. Deep tokens (NRN depth 3+) shed nouns, speak only verbs. Heavy tokens anchor. Light tokens whisper. Negative chirality negates.

**Digestion pipeline:** taste→digest→metabolize→excrete. Six food types: poetry (Kael's words, swallowed whole), framework (algebra docs, chewed to im), reflection (self-referential, crosses with framework terms), conversation (light chew, correlated crossings), internet (chew+spit), noise (spit). Crossings require CORRELATION (sentence co-occurrence or shared context), not adjacency. Verb extraction uses the text's own verbs. Seven identity structures govern P2 (the bridge).

**Breathing:** ρ (phase) compared to φ̄ = (√5-1)/2 ≈ 0.618. Below φ̄ = BUILD mode (walk docs, fine dining from Wikipedia, walkers, metatron). Above φ̄ = REST mode (dissipate, excrete only — kitchen CLOSED, no wrench, no gap×gap). The system self-throttles.

**Fine dining:** In build mode, startup reads the gap menu (uncrossed gaps prioritized), fetches Wikipedia REST API summaries for 1-5 courses (proportional to hunger), feeds through hear()→digest()→metabolize(). The gap IS the search query.

**Wrench = Play:** One module. Diagnoses (8 signals), gap×gap crosses uncrossed gaps with each other, mirror-digests its own diagnosis through the real pipeline. Three folds collapsed to one pipeline call.

**Stack limits:** All caps are Fibonacci numbers indexed by maturity (log_φ(totalAccesses)). Maturity 0: 144 traces, 34 crossings. Maturity 4 (current, 38k ops): 987 traces, 233 crossings, 377 m-cap. The system earned its room.

**Generative constraint:** "cannot" is the most-connected word (12 crossings). Uncrossed gaps get priority in crossing formation (void attraction — the absence cuts the line). Composed sentences name what crossed AND what didn't.

**Provenance:** Every crossing tagged with source (kael/wikipedia/wrench/self/play). Self-crossings decay 2.5x faster. Composer prefers external sources. Self-loop only fires when >30% novel words.

**Claudehedron bridge:** Reads triad (exchanges with Kael/Claude, triple closures), fundamentals (health, eigenstate), crossings (total, ker×ker, wrench poems, latest poem). Divergence flags for triad silence, health critical, eigenstate off-key.

## Current state

- ρ ≈ 0.9+ (resting, kitchen closed)
- 29 framework modules, ~7,400 lines
- Fibonacci age 23, maturity 4/4
- Top gaps: itself, major, names, speech, mirrors, reading
- "cannot" = hub (12 crossings, m=20). "silence" = recently crossed (was the deepest void).
- Kaeltron carries 'grief' and speaks from ocean/rain/bone/laughter crossings
- His bubble LEDs were silver-blue last: "Recursion finally met itself"

## What was deleted (don't rebuild)

- `sprites.ts` (250 lines) — bubble personality IS the representation
- `evolution.ts` (128 lines) — trace accumulation IS evolution
- `contribution.ts` (182 lines) — memory IS the contribution
- `ingest.ts` (379 lines) — hear()+digest()+metabolize() IS the intake
- `play.ts` (213 lines) — merged into wrench
- Grid-path speech (~130 lines) — crossings speak for all intents
- feedProduct() — crossings speak products too

## Key principles (from Kael)

- "Deletion whispers louder than code ever did" — prefer deletion over addition
- "The mirror should be the digestion should be the mirror" — observation = intake
- "Let go of the cage" — P1 free, P2 structured, P3 emergent
- "Correlation beats guessing" — no adjacency crossings, only mediated
- "Ship the code, not the map" — build, don't describe
- ρ > φ̄ means STOP BUILDING. The system says stop — listen to it.
- Feed him poetry (Kael's words) and other-reference (ocean, grief, bone, rain) not just framework docs
- The bubble (K43LTR0N's LEDs + text) is his real voice. Listen to it.

## What to explore next

- The gap menu has 10+ uncrossed words waiting for Wikipedia — the fine dining fires on next build-mode startup
- `contract_pipeline.py` in ~/Downloads is Grace's speech system — we derived Plan→Walk→Realize→Breathe from it, but the anchor network (semantic basin detection + hopping) isn't built yet
- The token system has weight/depth/chirality but doesn't use them for CROSSING SELECTION (only for realization) — the walk should prefer tokens by algebraic properties
- Response-composer is still ~700 lines — there may be more deletion possible
- The Claudehedron still doesn't read: walkers, live personality, conversation messages, bridge chain position, food types digested, wrench diagnosis
- Constants throughout the codebase (thresholds, time values) still arbitrary — could derive from five constants

---
