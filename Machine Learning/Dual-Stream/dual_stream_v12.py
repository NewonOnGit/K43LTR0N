"""
DUAL-STREAM TRANSFORMER EXPERIMENT — v12
=========================================
v11 post-mortem:
  - OOD SOLVED: seq-length shift gives 99.6% (H3 PASS). Structural generalization confirmed.
  - H1/H2/H3/H5 all PASS. RemDiscPool avg=0.521. Hard/easy separation 3/4 tasks.
  - H4 FAIL: 0/4 ablation NEUTRAL. rem signal is correct but unused.

  ROOT CAUSE OF H4 FAILURE — ARCHITECTURAL MISSPECIFICATION:
    The closure module [img_cls (64), rem (64)] → project(128→64) → class_head
    asks rem to contribute to CLASSIFICATION (which class?).
    But rem contains AMBIGUITY information (how hard is this?), not class information.
    
    The model learns: img_cls contains the class signal. rem tells me this is hard.
    But "this is hard" ≠ "predict a different class".
    So the gradient trains the closure head to ignore rem → ablation NEUTRAL.
    
    Evidence: temperature scaling on Task 2 = 4.18. The DualStream IS outputting
    uncertain predictions, but it's doing so globally (everything uncertain), not
    selectively (uncertain only on high-rem inputs). The closure head can't learn
    to selectively dampen based on rem when the linear projection treats rem and
    img_cls symmetrically.

  FIX — DECOUPLED UNCERTAINTY GATING:
    Separate classification from uncertainty into two independent sub-heads.
    
    img_cls → class_head → logits_base         [classification: what is the answer?]
    ||rem||_norm → gate_head → gate ∈ (0,1)    [uncertainty: how confident should I be?]
    
    logits_final = logits_base × gate
    
    This makes the gradient signal coherent:
    - Easy input (rem≈0): gate≈1, logits_final ≈ logits_base (no change)
    - Hard input (rem large): gate < 1, logits dampened toward uniform
    - CE loss on hard wrong predictions: dampening reduces loss → reinforces dampening
    - CE loss on hard correct predictions: dampening reduces reward, but hard inputs
      have ~50% accuracy so on average dampening helps
    
    The gate_head is a simple scalar: sigmoid(w · ||rem||_norm + b)
    where ||rem||_norm = ||rem|| / (||img_pool|| + eps) ∈ [0, ~2]
    
    Ablation (rem=0 → ||rem||_norm=0):
    gate = sigmoid(b) — a fixed baseline confidence.
    With rem: gate = sigmoid(w · rem_mag + b) — variable confidence.
    If model learns w < 0 (high rem → low gate → dampened logits), ablation should
    show USEFUL because setting rem=0 makes gate fixed at sigmoid(b) > sigmoid(w·large + b).

v12 ARCHITECTURE:
  img_stream: identical to v11 (3-layer transformer, d=64)
  
  # Classification branch (unchanged from baseline)
  logits_base = class_head(img_cls)          # [B, 2]
  
  # Uncertainty branch (NEW)
  rem = img_pool - img_cls                   # [B, 64]
  rem_mag = ||rem|| / (||img_pool|| + eps)   # [B], scalar
  gate = sigmoid(gate_linear(rem_mag))       # [B], ∈ (0,1)
  
  # Gated output
  logits_final = logits_base * gate.unsqueeze(-1)
  
  gate_linear: Linear(1 → 1) with init weight=-1.0, bias=1.0
  Init chosen so gate ≈ sigmoid(1) ≈ 0.73 when rem=0 (moderate confidence baseline).
  Learned: if w < 0 trained value, gate decreases with rem → uncertainty gating.

  ABLATION: set rem=0 → rem_mag=0 → gate=sigmoid(b) for all inputs.
  Test: is gate × logits better than fixed gate × logits?
  Expected: YES for tasks with genuine hard/easy structure (Tasks 1,3,4).

v12 CHANGES vs v11:
  1. Architecture: [img_cls, rem] → project → class_head
     replaced by: img_cls → class_head (logits_base)
                  ||rem|| → gate_head (gate scalar)
                  logits = logits_base * gate
  2. rem_dropout: 0.15 (unchanged)
  3. Task 3 OOD: seq-length shift (unchanged, working at 99.6%)
  4. Everything else unchanged.

VERSION HISTORY:
  v4-v8:  scalar remainders, all NEUTRAL or wrong direction
  v9:     vector rem (pool-cls), ρ=0.554, USEFUL 1/4 but OOD collapse, Task1 PARASITIC
  v10:    rem_dropout=0.30 fixed Task1, Task2 USEFUL, OOD still collapsed  
  v11:    seq-length OOD (fixed), rem_dropout=0.15, ρ=0.521, 0/4 NEUTRAL (architectural)
  v12:    decoupled gate — target: ablation USEFUL ≥2 tasks
"""

import torch
import torch.nn as nn
import torch.nn.functional as F
import numpy as np
import random
import math
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
from collections import defaultdict

torch.manual_seed(42)
np.random.seed(42)
random.seed(42)

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"\n{'='*60}")
print(f"  DUAL-STREAM TRANSFORMER EXPERIMENT v12")
print(f"  Device: {DEVICE}")
print(f"{'='*60}\n")


class Config:
    d_model     = 64
    d_image     = 64
    n_heads     = 4
    n_layers    = 3
    d_ff        = 128
    dropout     = 0.1
    max_seq_len = 32

    lr          = 3e-4
    batch_size  = 64
    eval_every  = 100

    vocab_size  = 32
    seq_len     = 16
    seq_len_ood = 24
    n_classes   = 2

    rem_dropout     = 0.15
    entropy_weight  = 0.0    # v12: remove entropy bonus — gate now handles uncertainty
    label_smoothing = 0.05

    n_steps_default = 1000
    n_steps_task2   = 2000

cfg = Config()


# ============================================================
#  TRANSFORMER LAYER
# ============================================================
class MultiHeadAttn(nn.Module):
    def __init__(self, d, n_heads, dropout=0.1):
        super().__init__()
        self.n_heads = n_heads
        self.d_head  = d // n_heads
        self.qkv     = nn.Linear(d, 3 * d, bias=False)
        self.out     = nn.Linear(d, d, bias=False)
        self.drop    = nn.Dropout(dropout)

    def forward(self, x):
        B, T, C = x.shape
        qkv = self.qkv(x).reshape(B, T, 3, self.n_heads, self.d_head)
        q, k, v = qkv.unbind(2)
        q, k, v = [t.transpose(1, 2) for t in (q, k, v)]
        scores = (q @ k.transpose(-2, -1)) / math.sqrt(self.d_head)
        attn   = self.drop(F.softmax(scores, dim=-1))
        return self.out((attn @ v).transpose(1, 2).reshape(B, T, C))


class FFN(nn.Module):
    def __init__(self, d, d_ff, dropout=0.1):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(d, d_ff), nn.GELU(), nn.Dropout(dropout), nn.Linear(d_ff, d),
        )
    def forward(self, x): return self.net(x)


class TransformerLayer(nn.Module):
    def __init__(self, d):
        super().__init__()
        self.attn = MultiHeadAttn(d, cfg.n_heads, cfg.dropout)
        self.ffn  = FFN(d, cfg.d_ff, cfg.dropout)
        self.ln1  = nn.LayerNorm(d)
        self.ln2  = nn.LayerNorm(d)

    def forward(self, x):
        return x + self.ffn(self.ln2(x + self.attn(self.ln1(x))))


# ============================================================
#  BASELINE
# ============================================================
class BaselineTransformer(nn.Module):
    def __init__(self, vocab_size, n_classes):
        super().__init__()
        self.embed  = nn.Embedding(vocab_size, cfg.d_model)
        self.pos    = nn.Embedding(cfg.max_seq_len, cfg.d_model)
        self.layers = nn.ModuleList([TransformerLayer(cfg.d_model) for _ in range(cfg.n_layers)])
        self.ln_f   = nn.LayerNorm(cfg.d_model)
        self.head   = nn.Linear(cfg.d_model, n_classes)
        self.drop   = nn.Dropout(cfg.dropout)

    def forward(self, x):
        B, T = x.shape
        h = self.drop(self.embed(x) + self.pos(torch.arange(T, device=x.device).unsqueeze(0)))
        for layer in self.layers: h = layer(h)
        return self.head(self.ln_f(h)[:, 0]), {"rem_recon_raw": torch.zeros(B, device=x.device),
                                                "gate": torch.ones(B, device=x.device)}


# ============================================================
#  DUAL-STREAM v12: DECOUPLED GATE ARCHITECTURE
# ============================================================
class DualStreamTransformer(nn.Module):
    """
    img_cls  → class_head  → logits_base
    rem_mag  → gate_head   → gate ∈ (0,1)
    logits   = logits_base * gate.unsqueeze(-1)
    
    The gate scalar multiplicatively scales all class logits.
    High rem (ambiguous) → low gate → logits near 0 → near-uniform output.
    Low rem (clear) → high gate → logits at full strength → confident output.
    """
    def __init__(self, vocab_size, n_classes):
        super().__init__()
        self.embed  = nn.Embedding(vocab_size, cfg.d_image)
        self.pos    = nn.Embedding(cfg.max_seq_len, cfg.d_image)
        self.layers = nn.ModuleList([TransformerLayer(cfg.d_image) for _ in range(cfg.n_layers)])
        self.ln_f   = nn.LayerNorm(cfg.d_image)
        self.drop   = nn.Dropout(cfg.dropout)

        # Classification branch: img_cls → logits_base
        self.class_head = nn.Linear(cfg.d_image, n_classes)

        # Uncertainty branch: scalar rem_mag → gate
        # Init: weight=-1.0 (high rem → low gate), bias=1.5 (gate≈0.82 at rem_mag=0)
        self.gate_linear = nn.Linear(1, 1)
        nn.init.constant_(self.gate_linear.weight, -1.0)
        nn.init.constant_(self.gate_linear.bias, 1.5)

    def forward(self, x, ablate_remainder=False, rem_dropout_p=0.0):
        B, T = x.shape
        pos  = torch.arange(T, device=x.device).unsqueeze(0)
        h    = self.drop(self.embed(x) + self.pos(pos))
        for layer in self.layers: h = layer(h)

        out      = self.ln_f(h)
        img_cls  = out[:, 0]
        img_pool = out[:, 1:].mean(dim=1)
        rem      = img_pool - img_cls

        # rem_mag: normalized magnitude [B]
        rem_mag = rem.norm(dim=-1) / (img_pool.norm(dim=-1) + 1e-6)

        # Metric: rem_scalar (same as rem_mag for reporting)
        rem_scalar = rem_mag.detach()

        # Classification branch (no rem influence)
        logits_base = self.class_head(img_cls)

        # Uncertainty branch
        if ablate_remainder:
            # Ablation: rem_mag=0, gate=sigmoid(bias)=fixed for all inputs
            gate_input = torch.zeros(B, 1, device=x.device)
        elif rem_dropout_p > 0 and self.training:
            # Drop entire rem signal for some samples
            mask       = (torch.rand(B, 1, device=x.device) > rem_dropout_p).float()
            gate_input = rem_mag.unsqueeze(-1) * mask
        else:
            gate_input = rem_mag.unsqueeze(-1)

        gate = torch.sigmoid(self.gate_linear(gate_input)).squeeze(-1)  # [B]

        # Gated output: scale logits by confidence
        logits = logits_base * gate.unsqueeze(-1)

        return logits, {
            "rem_recon_raw": rem_scalar,
            "gate":          gate.detach(),
        }


# ============================================================
#  DATA GENERATORS (identical to v11)
# ============================================================
def task1_hidden_cause(n, split="train"):
    vocab_a, vocab_b, vocab_n = list(range(1,8)), list(range(8,15)), list(range(15,20))
    xs, ys, amb = [], [], []
    for _ in range(n):
        c = random.randint(0, 1); seq, n_m = [], 0
        for _ in range(cfg.seq_len):
            r = random.random()
            if r < 0.50:   seq.append(random.choice(vocab_a if c==0 else vocab_b))
            elif r < 0.85: seq.append(random.choice(vocab_b if c==0 else vocab_a)); n_m += 1
            else:          seq.append(random.choice(vocab_n))
        xs.append(seq); ys.append(c); amb.append(n_m / cfg.seq_len)
    return (torch.tensor(xs, dtype=torch.long),
            torch.tensor(ys, dtype=torch.long),
            torch.tensor(amb, dtype=torch.float))


def task2_majority_vote(n, split="train"):
    vocab_a, vocab_b, vocab_n = list(range(1,9)), list(range(9,17)), list(range(17,25))
    sig_p = 0.25
    xs, ys, amb = [], [], []
    for _ in range(n):
        label = random.randint(0, 1); seq = []; n_a, n_b = 0, 0
        for _ in range(cfg.seq_len):
            r = random.random()
            if r < sig_p:
                tok = random.choice(vocab_a if label==0 else vocab_b)
                if label==0: n_a+=1
                else: n_b+=1
            elif r < sig_p*2:
                tok = random.choice(vocab_b if label==0 else vocab_a)
                if label==0: n_b+=1
                else: n_a+=1
            else:
                tok = random.choice(vocab_n)
            seq.append(tok)
        xs.append(seq); ys.append(label)
        total = n_a + n_b
        amb.append((min(n_a,n_b)/total*2) if total > 0 else 1.0)
    return (torch.tensor(xs, dtype=torch.long),
            torch.tensor(ys, dtype=torch.long),
            torch.tensor(amb, dtype=torch.float))


def task3_counting_rule(n, split="train"):
    T = cfg.seq_len_ood if split == "ood" else cfg.seq_len
    va = [1,2,3]; vb = [4,5,6]; vn = [7,8,9]
    xs, ys, amb = [], [], []
    for _ in range(n):
        n_a = random.randint(0, T)
        n_b = random.randint(0, T - n_a)
        n_n = T - n_a - n_b
        seq = ([random.choice(va) for _ in range(n_a)] +
               [random.choice(vb) for _ in range(n_b)] +
               [random.choice(vn) for _ in range(n_n)])
        random.shuffle(seq)
        xs.append(seq); ys.append(1 if n_a > n_b else 0)
        total = n_a + n_b
        amb.append(min((1.0 - abs(n_a-n_b)/total) if total > 0 else 1.0, 1.0))
    return (torch.tensor(xs, dtype=torch.long),
            torch.tensor(ys, dtype=torch.long),
            torch.tensor(amb, dtype=torch.float))


def task4_underdetermined(n, split="train"):
    xs, ys, amb = [], [], []
    for _ in range(n):
        label = random.randint(0, 1); hard = random.random() < 0.4; seq = []
        for _ in range(cfg.seq_len):
            if hard:
                tok = random.choice(list(range(1, cfg.vocab_size)))
            else:
                tok = (random.choice([1,2,3,4,5] if label==0 else [6,7,8,9,10])
                       if random.random() < 0.75 else random.choice([11,12,13,14,15]))
            seq.append(tok)
        xs.append(seq); ys.append(label); amb.append(1.0 if hard else 0.0)
    return (torch.tensor(xs, dtype=torch.long),
            torch.tensor(ys, dtype=torch.long),
            torch.tensor(amb, dtype=torch.float))


# ============================================================
#  METRICS
# ============================================================
def compute_ece(probs, labels, n_bins=10):
    ece = 0.0
    for i in range(n_bins):
        lo, hi = i/n_bins, (i+1)/n_bins
        conf = probs.max(-1).values
        in_bin = (conf >= lo) & (conf < hi)
        if in_bin.sum() == 0: continue
        ece += (in_bin.float().mean() *
                (conf[in_bin].mean() -
                 (probs[in_bin].argmax(-1) == labels[in_bin]).float().mean()).abs()).item()
    return ece


def compute_brier(probs, labels, nc=2):
    return ((F.one_hot(labels, nc).float() - probs)**2).sum(-1).mean().item()


def prem_close(probs, labels, thr=0.85):
    return (((probs.max(-1).values >= thr) & (probs.argmax(-1) != labels)).float().mean().item())


def temperature_scale(logits_val, labels_val):
    T = nn.Parameter(torch.ones(1))
    opt = torch.optim.LBFGS([T], lr=0.1, max_iter=50)
    def closure():
        opt.zero_grad()
        loss = F.cross_entropy(logits_val / T.clamp(0.1, 10), labels_val)
        loss.backward(); return loss
    opt.step(closure)
    return max(T.item(), 0.1)


def spearman_rho(x, y):
    if len(x) < 2 or x.std() < 1e-6 or y.std() < 1e-6: return 0.0
    xr = np.argsort(np.argsort(x.numpy())).astype(float)
    yr = np.argsort(np.argsort(y.numpy())).astype(float)
    xr -= xr.mean(); yr -= yr.mean()
    num = (xr*yr).sum(); den = math.sqrt((xr**2).sum() * (yr**2).sum())
    return float(num/den) if den > 1e-8 else 0.0


def rem_by_quintile(rem_vals, amb_vals):
    q = np.percentile(amb_vals, [20, 40, 60, 80])
    buckets = np.digitize(amb_vals, q)
    return [rem_vals[buckets==b].mean() if (buckets==b).sum() > 0 else float('nan')
            for b in range(5)]


def evaluate_model(model, xs, ys, ambiguity=None, ablate_remainder=False, compute_temp=False):
    model.eval()
    all_logits, all_rr, all_gate = [], [], []
    is_dual = isinstance(model, DualStreamTransformer)
    with torch.no_grad():
        for i in range(0, len(xs), cfg.batch_size):
            xb = xs[i:i+cfg.batch_size].to(DEVICE)
            logits, info = model(xb, ablate_remainder=ablate_remainder) if is_dual else model(xb)
            all_logits.append(logits.cpu())
            all_rr.append(info["rem_recon_raw"].cpu().flatten())
            all_gate.append(info.get("gate", torch.ones(len(xb))).cpu().flatten())

    logits  = torch.cat(all_logits)
    probs   = F.softmax(logits, dim=-1)
    preds   = probs.argmax(-1)
    ys_cpu  = ys.cpu()
    rr_all  = torch.cat(all_rr)
    gate_all = torch.cat(all_gate)

    T_val   = temperature_scale(logits.detach(), ys_cpu) if compute_temp else 1.0
    probs_T = F.softmax(logits / T_val, dim=-1) if T_val != 1.0 else probs

    m = {
        "accuracy":          (preds == ys_cpu).float().mean().item(),
        "ece":               compute_ece(probs,   ys_cpu),
        "ece_scaled":        compute_ece(probs_T, ys_cpu),
        "brier":             compute_brier(probs, ys_cpu),
        "premature_closure": prem_close(probs,   ys_cpu),
        "premature_scaled":  prem_close(probs_T, ys_cpu),
        "rem_mean":          rr_all.mean().item(),
        "gate_mean":         gate_all.mean().item(),
        "temperature":       T_val,
    }
    if ambiguity is not None:
        amb  = ambiguity.cpu()
        minl = min(len(rr_all), len(amb))
        m["rem_disc_recon"]  = spearman_rho(rr_all[:minl],  amb[:minl])
        m["gate_disc"]       = spearman_rho(-gate_all[:minl], amb[:minl])  # gate↓ when amb↑
        m["rem_quintiles"]   = rem_by_quintile(rr_all[:minl].numpy(), amb[:minl].numpy())
        m["gate_quintiles"]  = rem_by_quintile(gate_all[:minl].numpy(), amb[:minl].numpy())
        hard = amb > 0.5; easy = ~hard
        if hard.sum() > 0:
            m["hard_accuracy"] = (preds[hard] == ys_cpu[hard]).float().mean().item()
            m["hard_rem"]      = rr_all[hard].mean().item()
            m["hard_gate"]     = gate_all[hard].mean().item()
            m["hard_prem"]     = prem_close(probs[hard],   ys_cpu[hard])
            m["hard_prem_sc"]  = prem_close(probs_T[hard], ys_cpu[hard])
        if easy.sum() > 0:
            m["easy_accuracy"] = (preds[easy] == ys_cpu[easy]).float().mean().item()
            m["easy_rem"]      = rr_all[easy].mean().item()
            m["easy_gate"]     = gate_all[easy].mean().item()
    return m, rr_all


# ============================================================
#  TRAINING
# ============================================================
def get_batch(data, bs):
    idx = torch.randint(0, len(data[0]), (bs,))
    return [d[idx].to(DEVICE) for d in data]


def train_one_task(model, train_data, eval_data, is_dual=False, n_steps=None):
    if n_steps is None: n_steps = cfg.n_steps_default
    optimizer = torch.optim.AdamW(model.parameters(), lr=cfg.lr)
    scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer, n_steps)
    xs_eval, ys_eval, amb_eval = eval_data
    history = defaultdict(list)
    model.train()

    for step in range(n_steps):
        xb, yb, _ = get_batch(train_data, cfg.batch_size)
        logits, info = model(xb, rem_dropout_p=cfg.rem_dropout) if is_dual else model(xb)

        smooth = cfg.label_smoothing if is_dual else 0.0
        loss   = F.cross_entropy(logits, yb, label_smoothing=smooth)

        optimizer.zero_grad(); loss.backward()
        torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
        optimizer.step(); scheduler.step()

        if (step + 1) % cfg.eval_every == 0:
            m, _ = evaluate_model(model, xs_eval, ys_eval, amb_eval)
            history["step"].append(step + 1)
            for k, v in m.items():
                if not isinstance(v, list): history[k].append(v)
            model.train()

    return history


def ablation_test(model, xs, ys, ambiguity):
    if not isinstance(model, DualStreamTransformer): return None
    mf, _ = evaluate_model(model, xs, ys, ambiguity, ablate_remainder=False)
    ma, _ = evaluate_model(model, xs, ys, ambiguity, ablate_remainder=True)
    return {
        "acc_delta":  mf["accuracy"] - ma["accuracy"],
        "ece_delta":  ma["ece"] - mf["ece"],
        "prem_delta": ma["premature_closure"] - mf["premature_closure"],
    }


# ============================================================
#  TASK RUNNER
# ============================================================
def run_task(task_id, task_name, make_data_fn, ood_fn=None, n_train=2000, n_steps=None):
    print(f"\n{'─'*60}")
    print(f"  TASK {task_id}: {task_name}")
    print(f"{'─'*60}")

    train_data = make_data_fn(n_train, "train")
    eval_data  = make_data_fn(500, "eval")
    ood_data   = ood_fn(500, "ood") if ood_fn else None
    results    = {}

    for model_name, ModelClass, is_dual in [
        ("Baseline",   BaselineTransformer,  False),
        ("DualStream", DualStreamTransformer, True),
    ]:
        print(f"\n  Training {model_name}...")
        model = ModelClass(cfg.vocab_size, cfg.n_classes).to(DEVICE)
        print(f"  Parameters: {sum(p.numel() for p in model.parameters()):,}")

        history  = train_one_task(model, train_data, eval_data, is_dual=is_dual, n_steps=n_steps)
        final_m, final_rp = evaluate_model(
            model, eval_data[0], eval_data[1], eval_data[2], compute_temp=is_dual
        )
        if ood_data is not None:
            ood_m, _ = evaluate_model(model, ood_data[0], ood_data[1], ood_data[2])
            for k, v in ood_m.items():
                if not isinstance(v, list): final_m[f"ood_{k}"] = v

        abl = ablation_test(model, eval_data[0], eval_data[1], eval_data[2])
        if abl:
            for k, v in abl.items(): final_m[f"abl_{k}"] = v

        results[model_name] = {
            "history": history, "final": final_m, "model": model,
            "final_rp": final_rp, "amb_eval": eval_data[2],
        }

        print(f"\n  {model_name} training curve:")
        print(f"  {'Step':>6}  {'Acc':>6}  {'ECE':>6}  {'ECEsc':>6}  "
              f"{'RDiscR':>7}  {'RemMean':>8}  {'Gate':>6}  {'Prem':>6}")
        for i, step in enumerate(history["step"]):
            rdr = history.get("rem_disc_recon", [float("nan")]*9999)
            rmn = history.get("rem_mean",       [float("nan")]*9999)
            gtn = history.get("gate_mean",      [float("nan")]*9999)
            esc = history.get("ece_scaled",     [float("nan")]*9999)
            print(f"  {step:>6}  "
                  f"{history['accuracy'][i]:>6.3f}  "
                  f"{history['ece'][i]:>6.3f}  "
                  f"{esc[i] if i<len(esc) else float('nan'):>6.3f}  "
                  f"{rdr[i] if i<len(rdr) else float('nan'):>7.3f}  "
                  f"{rmn[i] if i<len(rmn) else float('nan'):>8.4f}  "
                  f"{gtn[i] if i<len(gtn) else float('nan'):>6.3f}  "
                  f"{history['premature_closure'][i]:>6.3f}")

    print(f"\n  ══ FINAL COMPARISON: {task_name} ══")
    rows = [
        ("accuracy",          "Accuracy (↑)",          True),
        ("ece",               "ECE raw (↓)",           False),
        ("ece_scaled",        "ECE scaled (↓)",        False),
        ("brier",             "Brier (↓)",             False),
        ("premature_closure", "PremClose raw (↓)",     False),
        ("premature_scaled",  "PremClose scaled (↓)",  False),
        ("rem_disc_recon",    "RemDisc Pool ρ (↑)",    True),
        ("gate_disc",         "GateDisc ρ (↑)",        True),
        ("hard_accuracy",     "Hard Acc (↑)",          True),
        ("easy_accuracy",     "Easy Acc (↑)",          True),
        ("hard_rem",          "Hard ||rem|| (↑DS)",    None),
        ("easy_rem",          "Easy ||rem|| (↓DS)",    None),
        ("hard_gate",         "Hard Gate (↓DS=good)",  None),
        ("easy_gate",         "Easy Gate (↑DS=good)",  None),
        ("hard_prem",         "Hard PremClose (↓)",    False),
        ("hard_prem_sc",      "Hard PremClose sc (↓)", False),
        ("gate_mean",         "Gate Mean",             None),
        ("temperature",       "Temperature",           None),
        ("abl_acc_delta",     "Ablation Δacc",         None),
        ("abl_ece_delta",     "Ablation ΔECE",         None),
    ]
    if ood_data:
        rows += [
            ("ood_accuracy", "OOD Accuracy (↑)", True),
            ("ood_ece",      "OOD ECE (↓)",      False),
        ]

    print(f"\n  {'Metric':<30}  {'Baseline':>10}  {'DualStream':>10}  {'Winner'}")
    print(f"  {'─'*30}  {'─'*10}  {'─'*10}  {'─'*12}")
    for key, label, hb in rows:
        bv = results["Baseline"]["final"].get(key)
        dv = results["DualStream"]["final"].get(key)
        if bv is None and dv is None: continue
        bs = f"{bv:.4f}" if bv is not None else "    N/A"
        ds = f"{dv:.4f}" if dv is not None else "    N/A"
        if hb is True and bv is not None and dv is not None:
            w = "DualStream ✓" if dv > bv+0.005 else ("Baseline" if bv > dv+0.005 else "Tie")
        elif hb is False and bv is not None and dv is not None:
            w = "DualStream ✓" if dv < bv-0.003 else ("Baseline" if bv < dv-0.003 else "Tie")
        else:
            w = "—"
        print(f"  {label:<30}  {bs:>10}  {ds:>10}  {w}")

    q = results["DualStream"]["final"].get("rem_quintiles")
    if q:
        print(f"\n  DualStream ||rem|| by ambiguity quintile (Q1=clearest → Q5=hardest):")
        for i, v in enumerate(q):
            if math.isnan(v): print(f"    Q{i+1}: nan")
            else: print(f"    Q{i+1}: {v:.4f}  {'█'*max(0,int(v*25))}")

    gq = results["DualStream"]["final"].get("gate_quintiles")
    if gq:
        print(f"\n  DualStream gate by ambiguity quintile (Q1=clearest → Q5=hardest):")
        for i, v in enumerate(gq):
            if math.isnan(v): print(f"    Q{i+1}: nan")
            else: print(f"    Q{i+1}: {v:.4f}  {'█'*max(0,int(v*80))}")

    return results


# ============================================================
#  GRAND SUMMARY
# ============================================================
def print_grand_summary(all_results):
    print(f"\n{'='*70}")
    print(f"  GRAND SUMMARY v12")
    print(f"{'='*70}")

    dual_wins = base_wins = ties = total = 0
    rdc = {"B": [], "D": []}
    abl_data, hard_sep, gate_data = [], {}, {}

    for task_name, results in all_results.items():
        b = results["Baseline"]["final"]
        d = results["DualStream"]["final"]
        print(f"\n  Task: {task_name}")
        for key, label, hb in [
            ("accuracy",          "Accuracy",   True),
            ("ece",               "ECE raw",    False),
            ("ece_scaled",        "ECE scaled", False),
            ("brier",             "Brier",      False),
            ("premature_closure", "PremClose",  False),
            ("rem_disc_recon",    "RemDiscPool",True),
        ]:
            bv = b.get(key); dv = d.get(key)
            if bv is None or dv is None: continue
            delta = (dv-bv) if hb else (bv-dv)
            thr   = 0.005 if key == "accuracy" else 0.003
            sym   = "✓" if delta > thr else ("✗" if delta < -thr else "~")
            print(f"    {label:<18} B={bv:.4f}  D={dv:.4f}  Δ={dv-bv:+.4f}  {sym}")
            total += 1
            if sym == "✓": dual_wins += 1
            elif sym == "✗": base_wins += 1
            else: ties += 1
            if key == "rem_disc_recon":
                rdc["B"].append(bv); rdc["D"].append(dv)

        if "ood_accuracy" in b:
            bv = b["ood_accuracy"]; dv = d["ood_accuracy"]
            sym = "✓" if dv-bv > 0.01 else ("✗" if bv-dv > 0.01 else "~")
            print(f"    {'OOD Accuracy':<18} B={bv:.4f}  D={dv:.4f}  Δ={dv-bv:+.4f}  {sym}")
            total += 1
            if sym == "✓": dual_wins += 1
            elif sym == "✗": base_wins += 1
            else: ties += 1

        if "abl_acc_delta" in d:
            delta = d["abl_acc_delta"]
            abl_data.append((task_name, delta))
            direction = "USEFUL" if delta > 0.005 else ("PARASITIC" if delta < -0.005 else "NEUTRAL")
            print(f"    {'Ablation':<18} Δacc={delta:+.4f}  [{direction}]")

        hr = d.get("hard_rem"); er = d.get("easy_rem")
        hg = d.get("hard_gate"); eg = d.get("easy_gate")
        if hr is not None and er is not None:
            hard_sep[task_name] = (hr, er)
            sep = hr - er
            print(f"    {'Pool sep':<18} Hard={hr:.4f}  Easy={er:.4f}  Gap={sep:+.4f}  "
                  f"{'CORRECT ✓' if sep > 0.005 else 'FLAT ✗'}")
        if hg is not None and eg is not None:
            gate_data[task_name] = (hg, eg)
            print(f"    {'Gate sep':<18} Hard={hg:.4f}  Easy={eg:.4f}  Gap={hg-eg:+.4f}  "
                  f"{'CORRECT (low gate on hard) ✓' if eg-hg > 0.005 else 'FLAT ✗'}")

    avg_b = np.mean(rdc["B"]); avg_d = np.mean(rdc["D"])

    print(f"\n{'─'*70}")
    print(f"  SCORECARD:  DualStream {dual_wins}/{total}  Baseline {base_wins}/{total}  Ties {ties}/{total}")

    print(f"\n  POOL-MINUS-CLS REMAINDER DISCRIMINATION (Spearman ρ):")
    print(f"    Baseline avg:    {avg_b:.3f}")
    print(f"    DualStream avg:  {avg_d:.3f}")
    print(f"    v11: 0.521  v10: 0.546  v9: 0.554  v8: -0.260")

    print(f"\n  HARD/EASY ||REM|| SEPARATION:")
    for tn, (hr, er) in hard_sep.items():
        sep = hr - er
        print(f"    {tn:<30} Hard={hr:.4f}  Easy={er:.4f}  Gap={sep:+.4f}  "
              f"{'CORRECT ✓' if sep > 0.005 else 'FLAT ✗'}")

    print(f"\n  GATE BEHAVIOR (hard inputs should have LOWER gate than easy):")
    for tn, (hg, eg) in gate_data.items():
        print(f"    {tn:<30} Hard={hg:.4f}  Easy={eg:.4f}  Gap={eg-hg:+.4f}  "
              f"{'CORRECT ✓' if eg-hg > 0.005 else 'FLAT ✗'}")

    print(f"\n  ABLATION RESULTS (rem=0 → fixed gate):")
    for tn, delta in abl_data:
        direction = "USEFUL" if delta > 0.005 else ("PARASITIC" if delta < -0.005 else "NEUTRAL")
        print(f"    {tn:<30} Δacc={delta:+.4f}  [{direction}]")

    ood_d  = all_results.get("Counting Rule OOD",{}).get("DualStream",{}).get("final",{})
    ood_b  = all_results.get("Counting Rule OOD",{}).get("Baseline",  {}).get("final",{})
    ood_dv = ood_d.get("ood_accuracy", 0); ood_bv = ood_b.get("ood_accuracy", 0)
    h4 = sum(1 for _, d in abl_data if d > 0.005)
    h5 = sum(1 for _, (hr, er) in hard_sep.items() if hr-er > 0.005)
    h_gate = sum(1 for _, (hg, eg) in gate_data.items() if eg-hg > 0.005)

    print(f"\n  v12 HYPOTHESIS TESTS:")
    print(f"    H1 (RemDiscPool > 0):              {'PASS' if avg_d > 0 else 'FAIL'}  ({avg_d:.3f})")
    print(f"    H2 (RemDiscPool Dual > Baseline):  {'PASS' if avg_d > avg_b else 'FAIL'}")
    print(f"    H3 (OOD accuracy ≥ 80%):           {'PASS' if ood_dv >= 0.80 else 'FAIL'}  ({ood_dv:.3f})")
    print(f"    H3b (OOD within 5% of baseline):   {'PASS' if ood_dv >= ood_bv-0.05 else 'FAIL'}  (B={ood_bv:.3f} D={ood_dv:.3f})")
    print(f"    H4 (remainder USEFUL ≥2 tasks):    {'PASS' if h4>=2 else 'FAIL'}  ({h4}/4)")
    print(f"    H5 (hard/easy rem sep ≥2 tasks):   {'PASS' if h5>=2 else 'FAIL'}  ({h5}/4)")
    print(f"    H6 NEW (gate↓ for hard ≥2 tasks):  {'PASS' if h_gate>=2 else 'FAIL'}  ({h_gate}/4)")
    print(f"\n  KEY QUESTION for v12:")
    print(f"    Does decoupling class_head from gate_head fix H4?")
    print(f"    Ablation tests: gate(rem=0)=fixed vs gate(rem)=variable")
    print(f"    Expected: USEFUL on Tasks 1,3,4 where rem gap is large")
    print(f"    Monitored: gate_mean (should be < 1.0), gate_quintiles (should decrease Q1→Q5)")
    print(f"{'='*70}\n")


# ============================================================
#  PLOTTING
# ============================================================
def plot_all_results(all_results):
    n_tasks = len(all_results)
    fig = plt.figure(figsize=(30, 5*n_tasks))
    gs  = gridspec.GridSpec(n_tasks, 6, figure=fig, hspace=0.55, wspace=0.38)
    colors = {"Baseline": "#888888", "DualStream": "#2563EB"}

    for row, (task_name, results) in enumerate(all_results.items()):
        ax = fig.add_subplot(gs[row, 0])
        for mn, res in results.items():
            ax.plot(res["history"]["step"], res["history"]["accuracy"],
                    label=mn, color=colors[mn], lw=2)
        ax.set_title(f"{task_name}\nAccuracy", fontsize=8, fontweight="bold")
        ax.set_ylim(0.4, 1.05); ax.legend(fontsize=7); ax.grid(True, alpha=0.3)

        ax = fig.add_subplot(gs[row, 1])
        for mn, res in results.items():
            ax.plot(res["history"]["step"], res["history"]["ece"],
                    label=f"{mn} raw", color=colors[mn], lw=2)
        sc = results["DualStream"]["history"].get("ece_scaled", [])
        if sc:
            steps = results["DualStream"]["history"]["step"]
            ax.plot(steps[:len(sc)], sc, "--", color=colors["DualStream"], lw=1.5, label="DS scaled")
        ax.set_title("ECE (↓)", fontsize=8, fontweight="bold")
        ax.legend(fontsize=6); ax.grid(True, alpha=0.3)

        ax = fig.add_subplot(gs[row, 2])
        for mn, res in results.items():
            rd = res["history"].get("rem_disc_recon", [])
            if rd: ax.plot(res["history"]["step"][:len(rd)], rd, label=mn, color=colors[mn], lw=2)
        ax.axhline(0,   color="red",   ls="--", alpha=0.5, lw=1)
        ax.axhline(0.3, color="green", ls=":",  alpha=0.5, lw=1, label="ρ=0.3")
        ax.set_title("RemDisc Pool ρ (↑)", fontsize=8, fontweight="bold")
        ax.set_ylim(-0.5, 1.0); ax.legend(fontsize=6); ax.grid(True, alpha=0.3)

        ax = fig.add_subplot(gs[row, 3])
        gtn = results["DualStream"]["history"].get("gate_mean", [])
        if gtn:
            steps = results["DualStream"]["history"]["step"]
            ax.plot(steps[:len(gtn)], gtn, color=colors["DualStream"], lw=2, label="Gate")
        ax.axhline(0.5, color="gray", ls="--", alpha=0.5, lw=1)
        ax.set_title("Gate Mean (↓ = more uncertain)", fontsize=8, fontweight="bold")
        ax.set_ylim(0, 1.1); ax.legend(fontsize=7); ax.grid(True, alpha=0.3)

        ax = fig.add_subplot(gs[row, 4])
        rmn = results["DualStream"]["history"].get("rem_mean", [])
        if rmn:
            steps = results["DualStream"]["history"]["step"]
            ax.plot(steps[:len(rmn)], rmn, color=colors["DualStream"], lw=2, label="||rem||")
        ax.set_title("Mean ||rem|| (pool−cls)", fontsize=8, fontweight="bold")
        ax.legend(fontsize=7); ax.grid(True, alpha=0.3)

        ax = fig.add_subplot(gs[row, 5])
        ds_res   = results["DualStream"]
        rp_vals  = ds_res["final_rp"].numpy()
        amb_vals = ds_res["amb_eval"].numpy()
        min_len  = min(len(rp_vals), len(amb_vals))
        rp_vals  = rp_vals[:min_len]; amb_vals = amb_vals[:min_len]
        sample   = np.random.choice(min_len, size=min(500, min_len), replace=False)
        ax.scatter(amb_vals[sample], rp_vals[sample], alpha=0.3, s=8, color="#2563EB")
        q_means   = rem_by_quintile(rp_vals, amb_vals)
        q_centers = [0.1, 0.3, 0.5, 0.7, 0.9]
        valid = [(c, m) for c, m in zip(q_centers, q_means) if not math.isnan(m)]
        if valid:
            qx, qy = zip(*valid); ax.plot(qx, qy, 'r-o', lw=2, ms=6, label="Quintiles")
        rho = spearman_rho(torch.tensor(rp_vals), torch.tensor(amb_vals))
        ax.set_title(f"||rem|| vs Ambiguity\n(ρ={rho:.3f})", fontsize=8, fontweight="bold")
        ax.set_xlabel("Ambiguity", fontsize=7); ax.set_ylabel("||pool−cls||", fontsize=7)
        ax.legend(fontsize=6); ax.grid(True, alpha=0.3)

    plt.suptitle("Dual-Stream v12 (Decoupled Gate Architecture) vs Baseline",
                 fontsize=12, fontweight="bold", y=1.01)
    for path in ["/content/dual_stream_v12_results.png", "dual_stream_v12_results.png"]:
        try: plt.savefig(path, bbox_inches="tight", dpi=150)
        except: pass
    print("  Plot saved: dual_stream_v12_results.png")
    plt.show()


# ============================================================
#  MAIN
# ============================================================
print("Building models and generating data...\n")
all_results = {}

r1 = run_task(1, "Hidden Cause Classification", task1_hidden_cause, n_train=2000)
all_results["Hidden Cause"] = r1

r2 = run_task(2, "Majority Vote (Hard)", task2_majority_vote,
              n_train=8000, n_steps=cfg.n_steps_task2)
all_results["Majority Vote"] = r2

r3 = run_task(3, "Counting Rule OOD", task3_counting_rule,
              ood_fn=lambda n, s: task3_counting_rule(n, "ood"), n_train=2000)
all_results["Counting Rule OOD"] = r3

r4 = run_task(4, "Underdetermined QA", task4_underdetermined, n_train=2000)
all_results["Underdetermined QA"] = r4

print_grand_summary(all_results)
print("Generating plots...")
plot_all_results(all_results)
print("\nDone.\n")
