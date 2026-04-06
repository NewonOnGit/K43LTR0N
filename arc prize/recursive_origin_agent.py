"""
RECURSIVE ORIGIN AGENT for ARC-AGI-3
=====================================

A framework-derived agent for the ARC-AGI-3 interactive reasoning benchmark.

Core principle: K6' loop — Observe → Classify → Act → Refine
  P3 (Observation): Detect frame changes, classify action effects
  P1 (Production):  Execute actions that produce changes  
  P2 (Mediation):   Build and refine action→effect model

With 80 max actions, every action must count.
Budget allocation (φ-derived):
  Exploration: φ⁻² × 80 ≈ 31 actions (learning which actions work)
  Exploitation: φ⁻¹ × 80 ≈ 49 actions (applying what we learned)

Author: Kael Makani Tejada
"""

import random
import numpy as np
from typing import Any, Optional
from collections import defaultdict
from arcengine import FrameData, GameAction, GameState
from agents.agent import Agent

# Constants from f''=f
PHI = (1 + np.sqrt(5)) / 2
PHI_INV = PHI - 1
PHI_INV2 = PHI_INV ** 2

# Action budget
MAX_ACTIONS = 80
EXPLORE_BUDGET = int(PHI_INV2 * MAX_ACTIONS)  # ~31
EXPLOIT_BUDGET = MAX_ACTIONS - EXPLORE_BUDGET   # ~49

# All simple actions (no coordinates needed)
SIMPLE_ACTIONS = [GameAction.ACTION1, GameAction.ACTION2, GameAction.ACTION3,
                  GameAction.ACTION4, GameAction.ACTION5, GameAction.ACTION7]

# Grid positions for ACTION6 exploration (φ-spaced sampling)
def phi_grid(n=8):
    """Generate φ-spaced grid positions on [0,63]."""
    positions = []
    for i in range(n):
        for j in range(n):
            x = int((i * PHI * 8) % 64)
            y = int((j * PHI * 8) % 64)
            positions.append((x, y))
    return positions

CLICK_GRID = phi_grid(8)


def frame_to_array(frame_data: list) -> Optional[np.ndarray]:
    """Convert frame data to numpy array for analysis."""
    if not frame_data:
        return None
    try:
        return np.array(frame_data, dtype=np.float32)
    except (ValueError, TypeError):
        return None


def frame_changed(prev_frame: list, curr_frame: list, threshold: float = 0.0) -> bool:
    """Detect if frame changed between two observations."""
    prev = frame_to_array(prev_frame)
    curr = frame_to_array(curr_frame)
    if prev is None or curr is None:
        return True  # assume changed if we can't compare
    if prev.shape != curr.shape:
        return True
    diff = np.abs(curr - prev).sum()
    return diff > threshold


def frame_diff_magnitude(prev_frame: list, curr_frame: list) -> float:
    """Compute magnitude of frame change."""
    prev = frame_to_array(prev_frame)
    curr = frame_to_array(curr_frame)
    if prev is None or curr is None:
        return 0.0
    if prev.shape != curr.shape:
        return float('inf')
    return float(np.abs(curr - prev).sum())


class RecursiveOriginAgent(Agent):
    """
    ARC-AGI-3 agent derived from the Recursive Origin framework.
    
    Strategy:
    1. EXPLORATION (P1): Systematically probe all actions to discover
       which ones produce frame changes (im vs ker of the action space).
    2. MODELING (P2): Build action→effect model. Track which actions
       cause changes, how big the changes are, and whether they repeat.
    3. EXPLOITATION (P3→P1, K6' loop): Use the model to focus on
       productive actions. When a level is solved, reset the model
       for the next level (contraction step).
    
    Budget: φ⁻² × 80 for exploration, φ⁻¹ × 80 for exploitation.
    """
    
    MAX_ACTIONS = MAX_ACTIONS
    
    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)
        
        # === PHASE TRACKING ===
        self.phase = 'EXPLORE'  # EXPLORE → EXPLOIT
        self.explore_count = 0
        self.exploit_count = 0
        
        # === ACTION MODEL (im/ker decomposition) ===
        # im(K): actions that produce frame changes
        # ker(K): actions that don't
        self.action_effects = {}      # action_id → list of (magnitude, frame_changed)
        self.productive_actions = []  # actions in im(K)
        self.inert_actions = []       # actions in ker(K)
        
        # For ACTION6 (click): track which positions produce changes
        self.click_effects = {}       # (x,y) → magnitude
        self.productive_clicks = []   # positions that produce changes
        
        # === LEVEL TRACKING ===
        self.current_level = 0
        self.level_action_sequences = {}  # level → list of actions that worked
        self.prev_frame_data = None
        
        # === EXPLORATION QUEUE ===
        self.explore_queue = []
        self._build_explore_queue()
        
        # === STRATEGY STATE ===
        self.last_action = None
        self.stuck_counter = 0
        self.rng = random.Random(42 + hash(self.game_id))
    
    def _build_explore_queue(self):
        """Build the exploration queue: simple actions first, then grid clicks."""
        # Phase 1: Try each simple action once
        self.explore_queue = list(SIMPLE_ACTIONS)
        self.rng.shuffle(self.explore_queue)
        
        # Phase 2: Try ACTION6 at φ-spaced grid positions
        click_positions = list(CLICK_GRID)
        self.rng.shuffle(click_positions)
        # Only sample a subset to stay within budget
        n_clicks = max(1, EXPLORE_BUDGET - len(SIMPLE_ACTIONS))
        for x, y in click_positions[:n_clicks]:
            action = GameAction.ACTION6
            self.explore_queue.append(('CLICK', x, y))
    
    def _record_effect(self, action, prev_frame, curr_frame):
        """Record the effect of an action on the frame."""
        changed = frame_changed(prev_frame, curr_frame)
        magnitude = frame_diff_magnitude(prev_frame, curr_frame)
        
        if isinstance(action, tuple) and action[0] == 'CLICK':
            key = (action[1], action[2])
            if key not in self.click_effects:
                self.click_effects[key] = []
            self.click_effects[key] = magnitude
            if changed and magnitude > 0:
                self.productive_clicks.append(key)
        else:
            action_id = action.value if hasattr(action, 'value') else action
            if action_id not in self.action_effects:
                self.action_effects[action_id] = []
            self.action_effects[action_id].append((magnitude, changed))
            
            if changed and magnitude > 0:
                if action not in self.productive_actions:
                    self.productive_actions.append(action)
            else:
                if action not in self.inert_actions and action not in self.productive_actions:
                    self.inert_actions.append(action)
    
    def _check_level_advance(self, frame: FrameData):
        """Check if we advanced to a new level."""
        if frame.levels_completed > self.current_level:
            # Record what worked
            self.current_level = frame.levels_completed
            # Partial reset: keep productive actions but re-explore clicks
            self.productive_clicks = []
            self.click_effects = {}
            self.stuck_counter = 0
    
    def _choose_explore_action(self, latest_frame: FrameData) -> GameAction:
        """Choose an exploration action from the queue."""
        if not self.explore_queue:
            # Queue exhausted → switch to exploit
            self.phase = 'EXPLOIT'
            return self._choose_exploit_action(latest_frame)
        
        next_item = self.explore_queue.pop(0)
        self.explore_count += 1
        
        if isinstance(next_item, tuple) and next_item[0] == 'CLICK':
            action = GameAction.ACTION6
            action.set_data({'x': next_item[1], 'y': next_item[2]})
            action.reasoning = f"Exploring click at ({next_item[1]}, {next_item[2]})"
            self.last_action = next_item
            return action
        else:
            action = next_item
            if action.is_simple():
                action.reasoning = f"Exploring {action.name}"
            self.last_action = action
            return action
    
    def _choose_exploit_action(self, latest_frame: FrameData) -> GameAction:
        """Choose an exploitation action based on learned model."""
        self.exploit_count += 1
        
        # If we have productive actions, use them
        candidates = self.productive_actions.copy()
        
        # If we have productive click positions, add them weighted by magnitude
        if self.productive_clicks:
            # Weight by magnitude — bigger changes are more interesting
            sorted_clicks = sorted(
                self.productive_clicks,
                key=lambda p: self.click_effects.get(p, 0),
                reverse=True
            )
            # Take top clicks
            for pos in sorted_clicks[:5]:
                candidates.append(('CLICK', pos[0], pos[1]))
        
        if not candidates:
            # Nothing productive found — try random actions
            available = latest_frame.available_actions
            if available:
                action_id = self.rng.choice(available)
                action = GameAction.from_id(action_id) if hasattr(GameAction, 'from_id') else GameAction(action_id)
            else:
                action = self.rng.choice(SIMPLE_ACTIONS)
            if action.is_simple():
                action.reasoning = "No productive actions found, exploring randomly"
            self.last_action = action
            return action
        
        # Choose from candidates with φ-weighted preference for high-magnitude actions
        choice = self.rng.choice(candidates)
        
        if isinstance(choice, tuple) and choice[0] == 'CLICK':
            action = GameAction.ACTION6
            action.set_data({'x': choice[1], 'y': choice[2]})
            action.reasoning = f"Exploiting productive click at ({choice[1]}, {choice[2]})"
            self.last_action = choice
        else:
            action = choice
            if action.is_simple():
                action.reasoning = f"Exploiting productive {action.name}"
            self.last_action = action
        
        # Stuck detection: if frame hasn't changed in 5 actions, try something new
        self.stuck_counter += 1
        if self.stuck_counter > 5:
            self.stuck_counter = 0
            # Try a random unexplored click
            x, y = self.rng.randint(0, 63), self.rng.randint(0, 63)
            action = GameAction.ACTION6
            action.set_data({'x': x, 'y': y})
            action.reasoning = "Stuck — trying random position"
            self.last_action = ('CLICK', x, y)
        
        return action
    
    def is_done(self, frames: list[FrameData], latest_frame: FrameData) -> bool:
        """Done when we win or exceed action budget."""
        return latest_frame.state is GameState.WIN
    
    def choose_action(
        self, frames: list[FrameData], latest_frame: FrameData
    ) -> GameAction:
        """
        The K6' loop: Observe → Classify → Act
        
        P3 (Observation): Record what the last action did
        P2 (Mediation): Update the action→effect model  
        P1 (Production): Choose the next action
        """
        # Handle game state
        if latest_frame.state in [GameState.NOT_PLAYED, GameState.GAME_OVER]:
            self.prev_frame_data = None
            return GameAction.RESET
        
        # === P3: OBSERVE — record effect of last action ===
        if self.prev_frame_data is not None and self.last_action is not None:
            self._record_effect(self.last_action, self.prev_frame_data, latest_frame.frame)
            
            # Check if frame changed (reset stuck counter if it did)
            if frame_changed(self.prev_frame_data, latest_frame.frame):
                self.stuck_counter = 0
        
        # === P2: MODEL — check for level advance ===
        self._check_level_advance(latest_frame)
        
        # Save current frame for next comparison
        self.prev_frame_data = latest_frame.frame
        
        # === P1: ACT — choose action based on phase ===
        if self.phase == 'EXPLORE' and self.explore_count < EXPLORE_BUDGET:
            action = self._choose_explore_action(latest_frame)
        else:
            self.phase = 'EXPLOIT'
            action = self._choose_exploit_action(latest_frame)
        
        return action
