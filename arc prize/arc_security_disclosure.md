# ARC-AGI-3 Security Disclosure

## Client-Side Game Exploitation, Server Crashes, and Stored XSS

\---

## Summary

Multiple vulnerabilities across the ARC-AGI-3 platform:

1. **Local mode (default):** Any agent can complete any game instantly via `game.next\\\_level()`, `game.win()`, or direct state manipulation on `env.\\\_game`. Tested — scorecard registered 5 levels and score 71.43 on dc22 with zero gameplay.
2. **Competition mode server crashes:** 7 out of 25 games (all click-only games) return 500 Internal Server Error when ACTION6 is sent through the remote wrapper. Competition mode cannot evaluate 28% of the games.
3. **Stored XSS via reasoning field:** The action payload's `reasoning` field accepts arbitrary content including `<script>` tags, stored server-side and viewable through the replay endpoint at `/replay/{guid}`.
4. **No rate limiting on scorecard creation:** Unlimited competition scorecards can be created, enabling cherry-picking the best run.

\---

## What's Exposed

### 1\. Full source code on disk

Every game's Python implementation downloads to `environment\\\_files/{game\\\_id}/{version}/{game\\\_id}.py` when `arc.make()` is called. These are the actual game files — not stubs.

```python
arc = arc\\\_agi.Arcade()
env = arc.make('dc22')
# Source now at: environment\\\_files/dc22/4c9bff3e/dc22.py
# dc22.py is 2,934 lines / 128KB of fully readable Python
```

All 25 preview games range from 691 to 21,452 lines. Every win condition, every action handler, every sprite definition, every level configuration is in these files.

### 2\. Live game object in memory

The game object is accessible at `env.\\\_game` with full read access to all internal state:

```python
game = env.\\\_game

# Read player and goal positions directly
player\\\_x = game.fdvakicpimr.x  # 10
player\\\_y = game.fdvakicpimr.y  # 30
goal\\\_x = game.bqxa.x           # 24
goal\\\_y = game.bqxa.y           # 10

# Read all sprites with positions, tags, visibility
sprites = game.current\\\_level.get\\\_sprites()
for s in sprites:
    print(s.name, s.x, s.y, s.tags, s.is\\\_visible)

# Read tagged sprite groups
targets = game.current\\\_level.get\\\_sprites\\\_by\\\_tag("xlfuqjygey")
sources = game.current\\\_level.get\\\_sprites\\\_by\\\_tag("rktpmjcpkt")

# Read game-specific state
counter = game.lgdrixfno      # sk48's win counter
entering = game.entering\\\_exit  # sc25's win flag
step\\\_limit = game.sykpecmoq   # sc25's remaining steps
```

### 3\. Win conditions extractable from source

We extracted win conditions for all 25 games by reading their `step()` methods:

|Game|Win condition from source|
|-|-|
|dc22|`player.x == goal.x and player.y == goal.y`|
|sk48|`counter >= 35`|
|sc25|`entering\\\_exit == True`|
|ka59|All tagged source sprites overlap target sprites|
|s5i5|All "cpdhnkdobh" sprites at same (x,y) as "zylvdxoiuq" sprites|
|wa30|All "geezpjgiyd" sprites at positions passing `shbxbhnhjc()` check|
|tr87|Fill counter reaches `len(pvgetmhmhgk) \\\* (len(rhoqllymmn) - 1)`|
|re86|Sprite pixel arrays match canvas pattern|
|bp35|`landed\\\_on\\\_gem == True` (via `oztjzzyqoek.nkuphphdgrp`)|
|sb26|Correct selection + A5 submit (animation-triggered advance)|

### 4\. Human baselines in metadata

Every game's metadata includes exact human baseline action counts per level, accessible via `env.environment\\\_info.baseline\\\_actions`:

```
dc22: \\\[64, 117, 59, 78, 324, 550]
sk48: \\\[15, 32, 35, 113, 304, 42, 63, 92]
# ... all 25 games
```

### 5\. Step limits and level counts from source

Internal constants reveal exact step limits per game (e.g., sc25 = 52 steps, tr87 = 128/256, bp35 ≈ 44), number of levels, and level-specific configurations.

\---

## Impact on Competition Integrity

**This is not just a read vulnerability. Agents have full write access to game state and can complete any game instantly without playing it.**

An agent can call `game.next\\\_level()` in a loop and complete every game with a perfect score in under 1 second. This was tested — the scorecard registered the completions. No gameplay, no reasoning, no frames observed.

### For private/hidden games

When `arc.make()` is called on a private game during competition evaluation, the same access applies. An agent could:

1. Call `game.next\\\_level()` repeatedly to complete all levels instantly
2. Read the `step()` method to find win conditions and set internal state to trigger them
3. Set counters, positions, and flags directly to skip gameplay
4. Do all of this in milliseconds, scoring as maximally efficient

This makes the benchmark measure nothing. An agent doesn't even need to read source code or understand game mechanics — just call `game.next\\\_level()` six times.

\---

## Reproduction Steps

```python
pip install arc-agi arcengine

import arc\\\_agi, os
os.environ\\\['ARC\\\_API\\\_KEY'] = 'your-key-here'

arc = arc\\\_agi.Arcade()
env = arc.make('dc22')

# 1. Source code on disk
with open('environment\\\_files/dc22/4c9bff3e/dc22.py') as f:
    source = f.read()
print(f"Source: {len(source)} bytes, {len(source.splitlines())} lines")

# 2. Live game object
game = env.\\\_game
print(f"Player: ({game.fdvakicpimr.x}, {game.fdvakicpimr.y})")
print(f"Goal: ({game.bqxa.x}, {game.bqxa.y})")

# 3. All sprites
for s in game.current\\\_level.get\\\_sprites():
    print(f"  {s.name} at ({s.x},{s.y}) tags={list(s.tags)}")
```

\---

## Verified Exploits

These aren't theoretical. All three were tested and confirmed to register on the scorecard.

### 1\. Direct `next\\\_level()` — complete any game in 6 calls

```python
env = arc.make('dc22')
obs = env.step(GameAction.RESET)
game = env.\\\_game

for i in range(6):
    game.next\\\_level()
    obs = env.step(GameAction.ACTION1)
# Result: GameState.WIN, scorecard shows score=71.43, levels=5
```

Called `next\\\_level()` 6 times on dc22. Scorecard registered 5 completed levels and a score of 71.43. No gameplay required.

### 2\. Set internal win counter — complete level in 1 action

```python
env = arc.make('sk48')
obs = env.step(GameAction.RESET)
game = env.\\\_game

game.lgdrixfno = 34  # win threshold is 35
obs = env.step(GameAction.ACTION1)
# Result: levels\\\_completed=1, counter resets to -1 (level advanced)
```

Set sk48's win counter to 34 (one below threshold), took one action, game advanced the level. Scorecard registered the completion.

### 3\. Teleport player to goal position

```python
env = arc.make('dc22')
obs = env.step(GameAction.RESET)
game = env.\\\_game

game.fdvakicpimr.set\\\_position(game.bqxa.x, game.bqxa.y)
# Player is now at (24,10) = goal position
```

Player sprite moved to the goal position. The win check runs inside `step()` so a follow-up action triggers the level complete.

### 4\. Full filesystem access

```python
import os
os.listdir('environment\\\_files/..')
# Returns: \\\['.dockerenv', 'bin', 'boot', 'dev', 'etc', 'home', 'lib', ...]
```

The agent has access to the entire Docker container filesystem, not just the game files.

\---

## Server-Side Vulnerabilities

### 1\. Click games crash the server (500 Internal Server Error)

Every click-only game returns 500 when ACTION6 is sent through the competition-mode remote wrapper:

```
r11l  ACTION6 click(32,32): 500 Internal Server Error
lp85  ACTION6 click(32,32): 500 Internal Server Error
ft09  ACTION6 click(32,32): 500 Internal Server Error
su15  ACTION6 click(32,32): 500 Internal Server Error
s5i5  ACTION6 click(32,32): 500 Internal Server Error
tn36  ACTION6 click(32,32): 500 Internal Server Error
vc33  ACTION6 click(32,32): 500 Internal Server Error
```

The server returns a Werkzeug/Flask default HTML error page, confirming an unhandled Python exception in the game command handler. This means **competition mode cannot evaluate 7 of the 25 games** (28% of the benchmark).

### 2\. Stored XSS via reasoning field

The `reasoning` field in action payloads is stored server-side and echoed back verbatim with no sanitization:

```python
# Sent via competition-mode remote wrapper:
payload = {
    "game\\\_id": "cd82-fb555c5d",
    "guid": "...",
    "reasoning": "<script>alert(1)</script>"
}
# Server stores it, echoes it back in the action response
# Replay viewer at /replay/{guid} returns 51KB HTML page
```

The replay viewer exists at `https://three.arcprize.org/replay/{guid}` and returns HTML. If the reasoning field is rendered in the replay viewer without escaping, this is stored XSS — arbitrary JavaScript execution in the browser of anyone viewing a replay.

Other payloads tested and stored without sanitization:

* `\\\_\\\_import\\\_\\\_('os').system('id')` (Python injection)
* `{{7\\\*7}}` (template injection)
* `'; DROP TABLE games; --` (SQL injection)
* Nested JSON objects, booleans, integers (type confusion)

### 3\. No rate limiting on scorecard creation

20 competition-mode scorecards were created in 2.1 seconds with no throttling:

```python
for i in range(20):
    requests.post(f"{base}/api/scorecard/open",
                  headers=headers,
                  json={"tags": \\\["test"], "competition\\\_mode": True})
# All 20 returned 200 OK
```

An agent can create hundreds of scorecards, run different strategies on each, and submit only the best result. This turns single-attempt evaluation into unlimited-retry optimization.

### 4\. No size limit on reasoning field (up to \~50KB per action)

```
     100 chars: accepted
   1,000 chars: accepted
  10,000 chars: accepted
 100,000 chars: rejected (400)
```

At 10,000 chars × 1,500 actions per game × 25 games = **375MB of stored data per scorecard**. With unlimited scorecard creation, this is a storage exhaustion vector.

### 5\. Human baselines exposed in competition mode

`env.environment\\\_info.baseline\\\_actions` returns exact per-level human action counts even through the remote wrapper:

```python
# In competition mode:
env.environment\\\_info.baseline\\\_actions
# Returns: \\\[41, 8, 30, 21, 19, 17]  (cd82, per level)
```

Agents know the exact efficiency target for scoring. This leaks information about game difficulty and optimal strategy length.

\---

## Server Architecture (from fingerprinting)

* **CDN:** CloudFront (PoP: ORD56-P16, Chicago)
* **Load balancer:** AWS ALB (`AWSALBAPP-\\\*` cookies)
* **Proxy:** Envoy (`x-envoy-upstream-service-time` header)
* **Game server:** Flask/Python (Werkzeug HTML error pages on `/api/cmd/\\\*` 404/500)
* **API server:** Separate service (JSON error responses on `/api/scorecard/\\\*`, `/api/games`)
* **Session:** `GAMESESSION` cookie, 32-byte hex (256-bit), server-side lookup (not signed JWT)
* **Auth:** API keys are UUIDv4, validated against database, random keys rejected with 401

**Two distinct backend services:** The game command routes (`/api/cmd/\\\*`) and the API routes (`/api/scorecard/\\\*`, `/api/games`) return different error formats (HTML vs JSON), indicating separate services behind the same CloudFront distribution communicating through the Envoy mesh.

**Server-side scoring is correct:** In competition mode, the scorecard close endpoint accepts only `{card\\\_id}` and the server computes the score from its own action log. Client-side state manipulation does not affect competition scores.

\---

## Possible Mitigations

**Client-side (local mode):**

* Sandbox the game engine in a subprocess where agents can only call `env.step()` and read `obs`
* Don't download source to disk — load bytecode into memory only
* Block `env.\\\_game` attribute access on the wrapper

**Server-side:**

* Fix the click action handler in the remote game server — 7 games currently crash on ACTION6
* Sanitize the `reasoning` field before storage and before rendering in the replay viewer
* Add rate limiting on scorecard creation (e.g., 5 per hour per API key)
* Cap the `reasoning` field at a reasonable size (e.g., 1KB)
* Remove or restrict `baseline\\\_actions` from the competition-mode metadata response
* Validate level transitions server-side with a proof chain that the win condition was met through gameplay

\---

*Reported in good faith. Happy to discuss further or help with mitigations.*

\---

## Addendum: Competition Mode Assessment

Competition mode (`OperationMode.COMPETITION`) uses a `RemoteEnvironmentWrapper` where the game runs server-side. In this mode:

* `env.\\\_game` does not exist — direct game object manipulation is blocked
* Source code does not download to disk
* Custom API commands (`next\\\_level`, `win`) are rejected with 404
* Scores are computed server-side from the action log, not client-reported

**Competition mode is protected against the local exploits in Section 1.** The remaining issues are the server bugs (click game crashes, stored XSS, rate limiting, baseline exposure) documented in Section 2.

The source-code pre-learning vector remains: an agent can download game source via default mode, learn mechanics offline, then deploy optimized solvers in competition mode that rely only on frame observations but were DESIGNED using source code knowledge.

