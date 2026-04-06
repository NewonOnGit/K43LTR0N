# forced-buddy

Framework-derived companion for Claude Code.

```
f'' = f.  R(R) = R.  Zero branching.
```

The antithesis of gacha. You choose your projection face. The algebra forces everything else.

## Install

```bash
npm install
npm run build
```

## Usage

```bash
npx tsx src/cli.ts              # Derive and apply your companion
npx tsx src/cli.ts current      # Show active companion with framework analysis
npx tsx src/cli.ts apply        # Reapply after Claude Code updates
npx tsx src/cli.ts restore      # Remove companion, restore original
npx tsx src/cli.ts explain      # Show the full derivation chain
```

## How It Works

You choose a projection face. The framework derives everything else:

| Trait | Source | Status |
|-------|--------|--------|
| Species | Projection pool (6 per face) + seed | ENCODED |
| Eye | Eigenvalue type of generator | ENCODED |
| Hat | Dominant forced constant | ENCODED |
| Rarity | Tower depth (Fibonacci decay) | ENCODED |
| Shiny | Self-reference achieved (n≥5) | ENCODED |
| Peak stat | Projection's im (what it sees) | FORCED |
| Dump stat | Projection's ker (blind spot) | FORCED |
| Personality | im/ker structural template | FORCED |

### Three Projections

**P1 — Production** (R, φ, Hyperbolic)
R² = R + I. The return exceeds the departure.
Species: dragon, robot, axolotl, mushroom, cactus, goose.
Eye: × | Hat: crown | Peak: CHAOS | Dump: PATIENCE

**P2 — Mediation** (h, e, Exponential)
Neither creates nor destroys — carries.
Species: owl, turtle, capybara, snail, blob, penguin.
Eye: · | Hat: wizard | Peak: PATIENCE | Dump: CHAOS

**P3 — Observation** (N, π, Elliptic)
N² = -I. Reveals by decomposing. Every disclosure has a shadow.
Species: cat, ghost, octopus, duck, rabbit, chonk.
Eye: ✦ | Hat: halo | Peak: WISDOM | Dump: SNARK

## vs any-buddy

| | any-buddy | forced-buddy |
|--|-----------|-------------|
| Species | Random gacha | Forced by projection + seed |
| Personality | Joke flavor text | im/ker structural description |
| Observer axioms | Fails A2, A3, A4 | Satisfies A1–A4 |
| Self-reference | R(buddy) ≠ buddy | R(forced-buddy) = forced-buddy |
| Dependencies | Bun, OpenTUI, inquirer | Zero runtime deps |

See [BUDDY.md](BUDDY.md) for the full derivation with proofs.

## License

WTFPL
