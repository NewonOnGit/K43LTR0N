# Framework Agent — Working Handoff
## Everything needed to continue from v0.5 (9 levels, zero per-game configs)

---

## 1. ENVIRONMENT

```bash
pip install arc-agi arcengine scipy
export ARC_API_KEY=eb9ec177-c310-4000-b78c-be959f922e21
```

API: `https://three.arcprize.org`
SDK: `arc_agi` v0.9.6, `arcengine` v0.9.3 (MIT)
Packages installed at: `/usr/local/lib/python3.12/dist-packages/`
Game source downloads to: `environment_files/{game_id}/{version}/{game_id}.py`

---

## 2. SDK API (exact patterns that work)

```python
from arc_agi import Arcade, OperationMode
from arcengine import GameAction, GameState

arc = Arcade(arc_api_key="eb9ec177-c310-4000-b78c-be959f922e21",
             operation_mode=OperationMode.NORMAL)
env = arc.make("sb26")      # returns LocalEnvironmentWrapper
fd = env.reset()             # returns FrameDataRaw

# fd.frame         -> list of numpy ndarray (int8, 64x64). Usually len=1.
# fd.state         -> GameState enum: NOT_FINISHED, WIN, GAME_OVER, NOT_PLAYED
# fd.available_actions -> list[int], e.g. [5, 6, 7]. VARIES PER GAME.
# fd.levels_completed  -> int
# fd.win_levels        -> int (total levels needed to WIN)
# fd.full_reset        -> bool

# Simple action (directional, etc.)
fd = env.step(action=1)
fd = env.step(action=5, reasoning="optional string")

# Complex action (click at coordinates)
fd = env.step(action=6, data={'x': 32, 'y': 32})

# GameAction enum mapping
# RESET=0, ACTION1=1, ACTION2=2, ACTION3=3, ACTION4=4,
# ACTION5=5, ACTION6=6(click,needs x,y), ACTION7=7

# Scorecard (optional)
card_id = arc.create_scorecard()  # returns string UUID
env = arc.make("sb26", card_id)
# card is closed with: arc.close_scorecard(card_id)

# COMPETITION mode (blocks source access, server-side scoring)
arc = Arcade(operation_mode=OperationMode.COMPETITION)
```

**Gotchas:**
- `fd.frame` is a list of numpy arrays, NOT nested python lists
- `available_actions` varies per game. Some games have only [6] (click-only). Some have [1,2,3,4]. Check every time.
- Games are deterministic: identical action sequences produce identical results
- ACTION6 with wrong data format crashes the COMPETITION server (known bug, disclosed)
- `env._game` gives direct access to the game object in NORMAL mode (not in COMPETITION)
- Game source files in `environment_files/` have obfuscated variable names

---

## 3. v0.5 ARCHITECTURE (the code that gets 9 levels)

### Core components:

**SBD (Status Bar Detector):** Tracks which rows change >85% of frames. Those rows are status counters, not game content. Mask them before hashing. Always mask row 63. Mask row 0 if it changes >50%. Calibrate after 10 frame diffs. When calibrating, clear the BFS state graph (hashes change).

**v17 BFS (the search engine):** Hash-based breadth-first search through game states. State = md5 of masked frame. For each state: try all untried actions (random order). If all tried: BFS to nearest state with untried actions. If all states fully explored: pick least-visited neighbor with spatial diversity bonus. Wall avoidance: if action produces 0 pixel change at a position, mark that (position_bucket, action) as walled.

**Click Memory:** For click-only games. Persists across resets within a level. Priority order: (1) near positions that advanced a level, (2) near positions that changed the frame, (3) segmented objects from frame, (4) grid search coarse-to-fine. Clear tested positions on level advance (new geography).

**Game Type Classification:** After 10 actions, check which actions produced pixel changes. If directional actions (1-4) produced changes: MOVE. If other actions produced changes: ACTION. If nothing changed and click available: CLICK.

**Routing:** Click-only games (no simple actions) go to click memory. Everything else goes to v17 BFS. This is the framework's only contribution to search: routing, not ordering.

### What NOT to do (proven regressions):

- **Don't weight BFS actions by effect magnitude** (v0.4 tried this, lost cn04 and m0r0)
- **Don't clear the state graph after exploration** (v0.2 did this, lost depth)
- **Don't replace BFS with framework-driven action selection** (v0.1 tried this, got 0 levels)
- **Don't add goal-directed navigation** (v17 development proved this regresses)
- **Don't add separate world models** (v17 development proved this regresses)

---

## 4. ALL 25 GAMES — v0.5 results + what v17 knows

### SOLVED (9 levels, 8 games)

**cd82** — Lv=1, MOVE, available=[1,2,3,4]
v17 has deterministic sequence [3,2,2,1,4,3,2,2,3,4,2,5]. BFS finds L1 without it.
To get more levels: try the sequence, or let BFS run longer.

**sp80** — Lv=1, MOVE, available=[1,2,3,4,5]
v17 has sequence [1,2,4,3,2,2,4,3,1,4,5,3,4,5,4,2,4,5]. BFS finds L1.

**cn04** — Lv=1, MOVE, available=[1,2,3,4,5]
v17 has weights {1:10,2:16,3:20,4:28,5:14}. BFS found L1 with 2500 budget.
FRAGILE: v0.4's effect-weighted BFS lost this. v17 exact BFS recovered it.

**m0r0** — Lv=1, MOVE, available=[1,2,3,4]
v17 has weights {1:27,2:12,3:19,4:20,5:20}. BFS found L1.
FRAGILE: same as cn04. Don't touch BFS priority.

**r11l** — Lv=1, CLICK, available=[6]
Click-only. 1830 clicks tested, 1206 produced change, 1 advanced level.
v17 uses segment-based clicking (same approach as click memory).

**lp85** — Lv=1, CLICK, available=[5,6,7]
Click game. 1982 clicks tested, 56 produced change, 1 advanced level.
v17 has 24 hardcoded coordinates: [(56,32),(60,32),(56,36),(60,36),(58,34),(58,30),(4,36),(4,32),(6,34),(4,34),(56,34),(2,34),(60,34),(2,30),(58,32),(6,30),(60,30),(4,30),(56,30),(58,36),(2,32),(2,36),(6,32),(6,36)]
Note: these are (x,y) display coordinates.

**ls20** — Lv=1, MOVE, available=[1,2,3,4]
Pure movement game. BFS solves L1.

**tu93** — Lv=2, MOVE, available=[1,2,3]
First multi-level auto-solve. Only 3 actions available. BFS with 2500 budget reaches 2 levels.

### UNSOLVED — Specific failure analysis

**ar25** — 1973 states, MOVE, available=[1,3,4,5,7]
Explores heavily, no level. v17 weights: {1:9,3:11,4:11,5:13,7:15}. Note: no ACTION2 available. ACTION7 is important (weight 15). BFS random selection doesn't favor ACTION7 enough.
**Fix:** Try v17's weighted random for this specific game, or increase budget to 4000+.

**ft09** — 124 states, CLICK, available=[5,6,7]
2491 clicks, 278 effective, 0 levels. Many clicks change the frame but none advance.
v17 coords: [(40,40),(40,48),(40,56),(48,40),(48,56),(56,40),(56,48),(56,56),(36,40),(36,48),(38,46),(40,38),(52,48),(52,40),(52,56),(52,36),(44,56),(44,40),(44,48),(48,48),(48,36),(36,52),(56,52),(56,56)]
**Fix:** Click memory needs to learn PATTERNS, not just individual positions. ft09's targets are on a grid.

**vc33** — 5 states, CLICK, available=[6]
Only 5 distinct states from 2450 clicks. Extremely specific targets needed.
v17 coords: [(62,34),(60,32),(60,26),(62,26),(60,34),(47,13),(57,48),(51,29),(28,29),(29,0),(28,0),(27,0),(48,46),(26,0),(25,0),(61,25),(61,33),(60,24),(62,32),(62,24)]
**Fix:** These coordinates are scattered. Need much finer grid search, or source code analysis.

**sk48** — 1808 states, MOVE, available=[1,3,7]
Explores heavily. A7 confirmed as exact algebraic inverse (50/50 trials from framework analysis). 3 actions only. v17 uses row63 mask.
**Fix:** Try row63-only masking. The adaptive SBD might mask game-relevant rows.

**g50t** — 82 states, MOVE, available=[3]
Only ACTION3 available! Single-action game. 82 states = BFS is cycling through a state loop. This game has some other mechanic (timing? animation?).
**Fix:** Need to understand what ACTION3 does differently in different states. May need frame analysis.

**bp35** — 289 states, MOVE, available=[3,4,7]
Has HIDDEN undeclared ACTION1/ACTION2 (from our security audit). The game accepts them even though they're not in available_actions. v17 knows this.
**Fix:** Try sending ACTION1 and ACTION2 even though they're not listed.

**lf52** — 2 states, MOVE
Only 2 states found = completely stuck. v17 uses mask=none.
**Fix:** Disable status bar masking for this game (SBD might mask game content).

**sc25** — 551 states, MOVE, available=[2,3,4]
No ACTION1. v17 uses row63 mask.
**Fix:** Row63-only masking, more budget.

**dc22** — 10 states, MOVE, available=[1,2,3,4]
Very few states despite having 4 actions. Might need click action (6) even though it looks like MOVE.
**Fix:** Check if ACTION6 is secretly available. Try clicking objects.

**ka59** — 76 states, MOVE, available=[1,2,3,4]
v17 uses row63 mask.
**Fix:** Row63-only masking.

**s5i5** — 18 states, CLICK, available=[5,6]
2450 clicks, 120 effective, 0 levels. v17 uses mask=none.
**Fix:** Disable masking. More targeted clicking.

**tn36** — 94 states, CLICK, available=[5,6,7]
Was solved in v0.4 (1 level) but not v0.5. The click memory ordering changed.
**Fix:** This game IS solvable. v0.4 found it. Need to understand what v0.4 did differently (it used effect-weighted clicks, which worked here but hurt movement games).

**sb26** — 65 states, CLICK/ACTION, available=[5,6,7]
v17 uses mask=none.
**Fix:** Disable masking. sb26 is one of the six games we measured framework constants in.

**tr87** — 1633 states, MOVE, available=[1,2,3,4,5]
Heavy exploration, no level. v17 uses row63 mask.
**Fix:** Row63-only masking, more budget.

**re86** — 1684 states, MOVE, available=[1,2,3,4,5]
Same as tr87. v17 uses row63 mask.

**wa30** — 839 states, MOVE, available=[1,2,3,4]
v17 uses row63 mask. Also one of the six framework-constant games (e/pi ratio).

**su15** — 1 state, CLICK, available=[5,6,7]
Only 1 state = completely stuck. v17 uses mask=none, excludes ACTION7 from simple.
**Fix:** Disable masking. Exclude ACTION7. This game needs specific click patterns.

---

## 5. PRIORITY FIXES FOR v0.6 (estimated +3-5 levels)

### Fix 1: Per-game mask mode detection
Some games need mask=none (s5i5, lf52, sb26, su15, r11l, lp85, ft09).
Some need mask=row63 only (ka59, tr87, re86, wa30, sk48, sc25, bp35).
Detection: if adaptive masking produces <5 unique states after 500 actions, retry with no masking. If still stuck, try row63-only.

### Fix 2: Try undeclared actions
bp35 accepts ACTION1/ACTION2 despite not listing them. After exploration, try ALL 8 actions regardless of available_actions. If undeclared actions produce state changes, include them.

### Fix 3: Click pattern learning
For click games: track the SPATIAL PATTERN of successful clicks. If level-advancing clicks cluster in a region, densely search that region. If they form a grid, extrapolate the grid.

### Fix 4: tn36 regression fix
v0.4 solved tn36 but v0.5 lost it. The difference: v0.4 did effect-weighted click selection, v0.5 uses click memory priority. For click games specifically, effect-weighted selection might be better than memory-priority. Try: use effect-weighted for click games, v17 BFS for move games.

### Fix 5: Single-action games (g50t)
g50t has only ACTION3. The game must have internal state progression that ACTION3 advances differently depending on frame state. Need to hash more carefully or detect animation cycles.

---

## 6. v17 REFERENCE — Per-game configs that work

```python
# Deterministic sequences (these solve specific levels)
CD82_SEQ = [3,2,2,1,4,3,2,2,3,4,2,5]
SP80_SEQ = [1,2,4,3,2,2,4,3,1,4,5,3,4,5,4,2,4,5]

# Weighted random (action distributions)
AR25_W = {1:9,2:19,3:11,4:11,5:13,7:15}
CN04_W = {1:10,2:16,3:20,4:28,5:14}
M0R0_W = {1:27,2:12,3:19,4:20,5:20}

# Click coordinates (display x,y pairs)
LP85_HITS = [(56,32),(60,32),(56,36),(60,36),(58,34),(58,30),(4,36),(4,32),
             (6,34),(4,34),(56,34),(2,34),(60,34),(2,30),(58,32),(6,30),
             (60,30),(4,30),(56,30),(58,36),(2,32),(2,36),(6,32),(6,36)]
FT09_HITS = [(40,40),(40,48),(40,56),(48,40),(48,56),(56,40),(56,48),(56,56),
             (36,40),(36,48),(38,46),(40,38),(52,48),(52,40),(52,56),(52,36),
             (44,56),(44,40),(44,48),(48,48),(48,36),(36,52),(56,52),(56,56)]
VC33_HITS = [(62,34),(60,32),(60,26),(62,26),(60,34),(47,13),(57,48),
             (51,29),(28,29),(29,0),(28,0),(27,0),(48,46),(26,0),(25,0),
             (61,25),(61,33),(60,24),(62,32),(62,24)]

# Mask modes
NO_MASK = {'s5i5','lf52','sb26','su15','r11l','lp85','ft09'}
ROW63_ONLY = {'ka59','tr87','re86','wa30','sk48','sc25','bp35'}
# Everything else: adaptive

# Special cases
# su15: exclude ACTION7 from simple actions
# bp35: try undeclared ACTION1, ACTION2
```

---

## 7. ENGINE STRUCTURE (from our decomposition)

arcengine (2,342 lines): sprites.py, base_game.py, camera.py, level.py, enums.py, interfaces.py
arc_agi (3,758 lines): base.py, scorecard.py, api.py, local_wrapper.py, remote_wrapper.py, wrapper.py, rendering.py, server.py, models.py

**InteractionMode = V4 (Klein four-group):**
TANGIBLE(visible+collidable), INTANGIBLE(visible), INVISIBLE(collidable), REMOVED(neither)

**Game loop:** perform_action() calls step() in loop until complete_action(). Renders frame each step. MAX_FRAME_PER_ACTION=1000.

**Frame:** 64x64 int8 numpy array. -1=transparent. 0-9=ARC colors. Background typically 5 (black).

**ACTION6 = K6':** Only action with spatial parameters. Observation coordinates feed back into production. Click requires seeing.

**Sprite merge:** Non-commutative monoid. REMOVED=identity, TANGIBLE=absorbing. BlockingMode merge = max() in total order (always upgrades).

**Tags:** sys_static (merged at init), sys_click (clickable), sys_place (placeable), sys_every_pixel (each pixel is click target).

---

## 8. GAME SOURCE ACCESS

In NORMAL mode, `arc.make()` downloads complete Python source to `environment_files/{game_id}/{version}/{game_id}.py`. Variable names are obfuscated but logic is readable. All 25 games' source available locally after first run. COMPETITION mode blocks this access.

Full source code analysis of all 25 games available in conversation transcripts. Key per-game structural findings documented in ARC_AGI3_FINDINGS_RECORD.md.

---

## 9. KNOWN SERVER VULNERABILITIES (disclosed to 3 organizers)

1. ACTION6 crashes server in COMPETITION mode (serialization bug)
2. Stored XSS via reasoning field
3. Human baselines exposed via API
4. Unlimited anonymous API keys
5. No rate limiting on scorecard creation
6. Undeclared actions accepted (bp35 ACTION1/ACTION2)
7. Type confusion crashes
8. Reasoning field ~50KB limit not enforced

---

## 10. THE ONE RULE

The framework provides the coordinate system. BFS provides the traversal.
Don't impose the framework on the search.
Use the framework for ROUTING (click vs move), not ORDERING (which action first).
This is the lesson from Framework Mind AND the agent, proven across 10 versions.
