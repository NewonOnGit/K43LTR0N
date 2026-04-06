#!/usr/bin/env python3
"""Track defect propagation through the 6-stage ACEDIT build pipeline.

Each glyph accumulates a dimensionless defect score as it passes through
stages.  At every stage an epsilon (small perturbation) is introduced and
then attenuated by the transfer coefficient -- modelling the fact that
each processing step absorbs roughly 8 % of incoming defect energy.

If the accumulated score exceeds the rupture threshold the glyph is
flagged as *aliased* (visual defect visible in the final font).
"""

from __future__ import annotations

import os
import sys
from dataclasses import dataclass, field

sys.path.insert(0, os.path.dirname(__file__))
from constants import K_FORM

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------
TRANSFER_COEFF: float = K_FORM     # 0.924 -- ~7.6 % absorbed per stage
RUPTURE_THRESHOLD: float = 0.30    # accumulated score above this = ruptured

PIPELINE_STAGES: int = 6


# ---------------------------------------------------------------------------
# Dataclass
# ---------------------------------------------------------------------------
@dataclass
class GlyphDefect:
    """Accumulated defect record for a single glyph."""

    name: str
    codepoint: str
    deltas: list[float] = field(default_factory=list)     # accumulated at each stage
    epsilons: list[float] = field(default_factory=list)    # introduced at each stage
    status: str = "latent"  # latent | registered | suppressed | aliased

    # -- derived properties ------------------------------------------------

    @property
    def accumulated(self) -> float:
        """Compute the total accumulated defect from all recorded epsilons.

        At each stage the running total is incremented by that stage's
        epsilon and then multiplied by the transfer coefficient:
            d = (d + eps) * TRANSFER_COEFF
        """
        d = 0.0
        for eps in self.epsilons:
            d = (d + eps) * TRANSFER_COEFF
        return d

    @property
    def ruptured(self) -> bool:
        """True when the accumulated defect exceeds the rupture threshold."""
        return self.accumulated > RUPTURE_THRESHOLD


# ---------------------------------------------------------------------------
# Pipeline tracker
# ---------------------------------------------------------------------------
class PipelineTracker:
    """Collect and summarise defect data across the build pipeline."""

    def __init__(self) -> None:
        self.glyphs: dict[str, GlyphDefect] = {}

    # -- mutation -----------------------------------------------------------

    def register(self, name: str, codepoint: str) -> GlyphDefect:
        """Create a new defect entry for *name*."""
        gd = GlyphDefect(name=name, codepoint=codepoint)
        self.glyphs[name] = gd
        return gd

    def record_stage(self, name: str, stage: int, epsilon: float) -> None:
        """Append *epsilon* for *stage*, recompute the running delta,
        and mark the glyph *aliased* if it has ruptured."""
        gd = self.glyphs[name]
        gd.epsilons.append(epsilon)

        # Recompute running delta for this stage
        delta = gd.accumulated
        gd.deltas.append(delta)

        if gd.ruptured:
            gd.status = "aliased"

    # -- reporting ----------------------------------------------------------

    def report(self) -> dict:
        """Return a summary dictionary of the current tracker state."""
        total = len(self.glyphs)
        if total == 0:
            return {
                "total": 0,
                "registered": 0,
                "latent": 0,
                "ruptured": 0,
                "registration_rate": 0.0,
                "rupture_rate": 0.0,
                "max_defect": 0.0,
            }

        registered = sum(1 for g in self.glyphs.values() if g.status == "registered")
        latent = sum(1 for g in self.glyphs.values() if g.status == "latent")
        ruptured = sum(1 for g in self.glyphs.values() if g.ruptured)

        max_defect = max(g.accumulated for g in self.glyphs.values())

        return {
            "total": total,
            "registered": registered,
            "latent": latent,
            "ruptured": ruptured,
            "registration_rate": registered / total,
            "rupture_rate": ruptured / total,
            "max_defect": max_defect,
        }

    # -- finalisation -------------------------------------------------------

    def finalize(self) -> None:
        """Promote every non-ruptured *latent* glyph to *registered*."""
        for gd in self.glyphs.values():
            if not gd.ruptured and gd.status == "latent":
                gd.status = "registered"


# ---------------------------------------------------------------------------
# CLI quick-check
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    tracker = PipelineTracker()
    tracker.register("demo.glyph", "U+E000")
    for s in range(PIPELINE_STAGES):
        tracker.record_stage("demo.glyph", s, 0.01)
    tracker.finalize()

    rpt = tracker.report()
    for k, v in rpt.items():
        print(f"  {k:20s} = {v}")
