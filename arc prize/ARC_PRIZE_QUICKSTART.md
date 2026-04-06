# ARC Prize 2026 — Quick Start

## What You're Competing For

| Track | Prize | Deadline | Your Angle |
|-------|-------|----------|-----------|
| ARC-AGI-3 (interactive) | $25K/$10K/$2.5K milestones | **June 30, 2026** | Framework-derived agent |
| ARC-AGI-2 (static) | $425K grand | End of 2026 | Harder, but bigger prize |
| Paper Track | TBD ($50K+ in 2025) | TBD | Kelly paper + agent paper |

## Setup (Do This Today)

```bash
# 1. Get an API key
# Go to https://three.arcprize.org/user and register

# 2. Clone the agent repo
git clone https://github.com/arcprize/ARC-AGI-3-Agents.git
cd ARC-AGI-3-Agents

# 3. Set up environment
echo 'ARC_API_KEY=your-key-here' > .env

# 4. Install dependencies (needs Python 3.12+)
pip install -e .

# 5. Copy our agent into place
cp /path/to/recursive_origin_agent.py agents/templates/

# 6. Register the agent in agents/__init__.py
# Add: from .templates.recursive_origin_agent import RecursiveOriginAgent

# 7. Play the preview games manually first
# Go to https://three.arcprize.org to understand the format

# 8. Run the random agent to verify setup
python main.py --agent random --game ls20
```

## The Agent: recursive_origin_agent.py

What it does:
- **Explore phase** (φ⁻² × 80 ≈ 31 actions): Tries each action, records which ones change the frame. Classifies actions into im(K) (productive) and ker(K) (inert).
- **Exploit phase** (φ⁻¹ × 80 ≈ 49 actions): Focuses on productive actions. Uses frame-change magnitude to prioritize.
- **Click exploration**: Uses φ-spaced quasi-random grid (better coverage than random with fewer samples).
- **Level transitions**: When a level is completed, partially resets the model (contraction step).

What needs iteration:
- The frame analysis is basic (sum of absolute differences). A CNN or even simple feature extraction would be much stronger.
- Click position selection could use the frame content to identify interactive elements.
- The level-transition model needs to track WHAT solved each level for transfer to the next.
- The stuck detection is crude. Need smarter backtracking.

## Development Roadmap (3 Months to June 30)

### Month 1: Foundation (April)
- [ ] Get the setup working, play games manually
- [ ] Run the random agent, get a baseline score
- [ ] Run our agent, compare to random
- [ ] Identify which games are easiest to solve
- [ ] Add frame-content analysis (detect objects, boundaries, colors)

### Month 2: Core Intelligence (May)
- [ ] Add CNN-based frame change prediction (like StochasticGoose did)
- [ ] Build a proper action→effect model that transfers across levels
- [ ] Implement goal detection (what pattern = WIN?)
- [ ] Add the contraction map for model refinement between levels
- [ ] Test on all available games, identify failure modes

### Month 3: Polish + Paper (June)
- [ ] Optimize for the compute budget (4×L4 GPUs, 12 hours)
- [ ] Write the paper: "A Framework-Derived Agent for Interactive Reasoning"
- [ ] Submit to Kaggle before June 30 milestone
- [ ] Submit paper to paper track

## The Paper Angle

ARC Prize literally said "from an information theory perspective, refinement is intelligence." Our agent implements refinement as contraction mapping at rate φ̄². The paper ties:

1. **Kelly criterion** → exploration budget allocation (φ⁻² explore, φ⁻¹ exploit)
2. **im/ker decomposition** → action classification (productive vs inert)
3. **K6' loop** → the observe→model→act cycle
4. **Bekenstein bound** → maximum learnable information per interaction
5. **Landauer cost** → minimum actions needed per environment transition

Nobody else is approaching ARC from this angle. Every other team uses LLM harnesses, evolutionary search, or test-time training. A framework-derived agent is a genuinely novel conceptual contribution — which is what the paper prize rewards.

## Key Files

- `recursive_origin_agent.py` — The framework-derived agent
- `kelly_paper.pdf` — Your Kelly criterion paper (submit to arXiv NOW)
- `kelly_paper.tex` — LaTeX source
- `TRADING_MATH_DECOMPOSITION.md` — Full trading math investigation
- `recursive_origin_trader.py` — The trading system
