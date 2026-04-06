import { spawn } from 'child_process';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import os from 'os';
import type { FinderResult, FinderProgress, StatName } from '../types.js';
import { estimateAttempts } from './estimator.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Resolve worker path for both dev (src/) and compiled (dist/) modes
function resolveWorkerPath(): string {
  // Check same directory first (dev mode: src/finder/worker.mjs)
  const sameDirPath = join(__dirname, 'worker.mjs');
  if (existsSync(sameDirPath)) return sameDirPath;
  // Compiled mode: dist/finder/ → look in src/finder/
  const srcPath = join(__dirname, '..', '..', 'src', 'finder', 'worker.mjs');
  if (existsSync(srcPath)) return srcPath;
  throw new Error('Cannot find worker.mjs');
}
const WORKER_PATH = resolveWorkerPath();

function getCoreCount(): number {
  if (typeof os.availableParallelism === 'function') return os.availableParallelism();
  return os.cpus().length || 4;
}

export function findSalt(
  userId: string,
  desired: {
    species: string;
    rarity: string;
    eye: string;
    hat: string;
    shiny: boolean;
    peak: StatName | null;
    dump: StatName | null;
  },
  onProgress?: (progress: FinderProgress) => void,
): Promise<FinderResult> {
  const expected = estimateAttempts(desired as Parameters<typeof estimateAttempts>[0]);
  const numWorkers = Math.max(1, Math.min(getCoreCount(), 8));

  return new Promise((resolve, reject) => {
    const args = [
      WORKER_PATH,
      userId,
      desired.species,
      desired.rarity,
      desired.eye,
      desired.hat,
      String(desired.shiny ?? false),
      desired.peak ?? 'any',
      desired.dump ?? 'any',
    ];

    const effectiveExpected = Math.ceil(expected / numWorkers);
    const timeout = Math.max(600000, Math.ceil(effectiveExpected / 50_000_000) * 60_000 + 600_000);

    const children: ReturnType<typeof spawn>[] = [];
    const workerAttempts = new Array<number>(numWorkers).fill(0);
    const workerStdout = new Array<string>(numWorkers).fill('');
    let resolved = false;
    let exited = 0;

    function killAll(): void {
      for (const child of children) {
        try { child.kill(); } catch { /* already dead */ }
      }
    }

    for (let i = 0; i < numWorkers; i++) {
      const child = spawn(process.execPath, args, {
        stdio: ['pipe', 'pipe', 'pipe'],
        timeout,
      });

      child.stdout?.on('data', (chunk: Buffer) => {
        workerStdout[i] += chunk.toString();
      });

      child.stderr?.on('data', (chunk: Buffer) => {
        if (!onProgress || resolved) return;
        const lines = chunk.toString().split('\n').filter(Boolean);
        for (const line of lines) {
          try {
            const progress = JSON.parse(line) as { attempts?: number; elapsed?: number };
            workerAttempts[i] = progress.attempts ?? 0;
            const totalAttempts = workerAttempts.reduce((a, b) => a + b, 0);
            const elapsed = progress.elapsed ?? 0;
            const rate = totalAttempts / (elapsed / 1000);
            const pct = Math.min(100, (totalAttempts / expected) * 100);
            const remaining = Math.max(0, expected - totalAttempts);
            const eta = rate > 0 ? remaining / rate : Infinity;
            onProgress({ attempts: totalAttempts, elapsed, rate, expected, pct, eta, workers: numWorkers });
          } catch { /* not JSON */ }
        }
      });

      child.on('close', (code) => {
        exited++;
        if (resolved) return;

        if (code === 0 && workerStdout[i].trim()) {
          resolved = true;
          killAll();
          try {
            const result = JSON.parse(workerStdout[i].trim()) as FinderResult;
            workerAttempts[i] = result.attempts;
            result.totalAttempts = workerAttempts.reduce((a, b) => a + b, 0);
            result.workers = numWorkers;
            resolve(result);
          } catch {
            reject(new Error(`Failed to parse finder result: ${workerStdout[i].trim()}`));
          }
          return;
        }

        if (exited === numWorkers) {
          reject(new Error(`Salt search failed after ${workerAttempts.reduce((a, b) => a + b, 0)} total attempts.`));
        }
      });

      child.on('error', (err) => {
        if (resolved) return;
        resolved = true;
        killAll();
        reject(new Error(`Failed to spawn salt finder: ${err.message}`));
      });

      children.push(child);
    }
  });
}
