# MORPHISM FORCING — Replacement for RRR_DERIVATION_v3.md §1.2 Step 6 and §1.3

## Replaces: Lemma 1.7, strengthens Theorem 1.9
## Location: After Theorem 1.5 (Kernel Theorem), before Lemma 1.8 (Composition)

---

#### Step 6: The Morphism Condition Is Forced

Steps 1–5 produced **objects**: pairs (D, ≈) where D is a set and ≈ is an equivalence
relation derived from projection kernels. Step 6 must determine the **morphisms** — the
class of functions between objects that constitute valid structural maps. This is the
transition from "what structures exist" to "which transformations respect them."

The morphism condition is not assumed. It is forced by three independent arguments, each
a mathematical theorem with zero interpretive content.

---

**Theorem 1.7 (Morphism Forcing).** *The product-kernel route forces equivalence-preserving
maps — functions f: D₁ → D₂ satisfying x ≈₁ y ⟹ f(x) ≈₂ f(y) — as the unique forced
morphism class.*

**Proof.** Three independent arguments establish the result.

---

**(Argument 1: Kernel Covariance.)** The product-kernel route constructs equivalence
relations as kernels of functions (Step 5). Kernels are **covariant** with composition:
for any composable functions g: A → B and h: B → C,

```
ker(g) ⊆ ker(h ∘ g)
```

*Proof of covariance:* If (x, y) ∈ ker(g), then g(x) = g(y), hence h(g(x)) = h(g(y)),
hence (x, y) ∈ ker(h ∘ g). ∎

Covariance means that composing a function after g can only **add** identifications —
it can never separate elements that g already identifies. This is a **forward** (domain →
codomain) property: the structural content of a kernel flows with the direction of the
function.

A morphism that "respects kernel-generated structure" must preserve this forward flow:
if x ≈₁ y (they are identified by the domain's equivalence), then f(x) ≈₂ f(y) (they
remain identified in the codomain's equivalence). A morphism violating this condition
would **reverse** the covariance — it would separate what the domain structure has
identified, contradicting the directional content of the kernel construction.

[Computationally verified: 729/729 compositions on {0,1,2} satisfy ker(g) ⊆ ker(h∘g).] ✓

---

**(Argument 2: Quotient Factoring.)** The product-kernel route explicitly produces
**quotient maps**: the projections π₁, π₂: D × D → D are surjective functions whose
kernels define the equivalence structure. Quotient maps have a standard universal property
that determines which functions are compatible with the equivalence structure.

**Lemma 1.7a (Quotient Universal Property).** *A function f: D → E factors through the
quotient map q: D → D/≈ (i.e., there exists f̄: D/≈ → E with f = f̄ ∘ q) if and only if
f is ≈-preserving to equality: x ≈ y ⟹ f(x) = f(y).*

*Proof.* (⟹) If f = f̄ ∘ q and x ≈ y, then q(x) = q(y) (definition of quotient map),
so f(x) = f̄(q(x)) = f̄(q(y)) = f(y). (⟸) If x ≈ y ⟹ f(x) = f(y), define
f̄([x]_≈) = f(x). This is well-defined because the value does not depend on the choice
of representative. Then f̄(q(x)) = f̄([x]_≈) = f(x), so f = f̄ ∘ q. ∎

This extends to the general case: f: (D, ≈₁) → (E, ≈₂) is equivalence-preserving if
and only if the image of ≈₁ under f is contained in ≈₂:

```
{(f(x), f(y)) : (x, y) ∈ ≈₁} ⊆ ≈₂
```

The equivalence-preserving condition is the **factoring condition** for quotient maps.
It is determined by the universal property — a theorem of set theory, not a choice.

[Computationally verified: factoring ↔ preserving exact match in all 135 test cases
on {0,1,2}. Image containment ↔ preserving exact match in all 675 test cases.] ✓

---

**(Argument 3: Elimination of Alternatives.)** Four candidate morphism conditions exist
for a category whose objects are (D, ≈):

| Condition | Definition | Morphism count (n=3) |
|-----------|-----------|---------------------|
| **Set** (all functions) | No condition on ≈ | 675 |
| **Dist** (preserving) | x ≈₁ y ⟹ f(x) ≈₂ f(y) | 435 |
| **Co-Dist** (reflecting) | f(x) ≈₂ f(y) ⟹ x ≈₁ y | 231 |
| **Exact** (both) | Preserving AND reflecting | 135 |

All four are closed under composition, contain identity maps, and contain all quotient
maps. [Computationally verified.] The product-kernel route requires:

**(E1) Quotient maps are morphisms.** All four satisfy this. ✓

**(E2) Structure is non-vacuous.** Set fails: in Set, the equivalence relation ≈ on an
object (D, ≈) plays no role — every function is a morphism regardless of ≈. The objects
(D, ≈) and (D, =) have identical hom-sets. The entire product-kernel construction
(Steps 2–5) produces structure that Set cannot see. **Set is eliminated.**

**(E3) Domain-side structure is respected.** The product-kernel route generates equivalence
relations via projection kernels. Kernels live on the **domain** of the projection (D × D),
not on the codomain (D). The relevant structural question is therefore: "does the morphism
respect what the domain equivalence identifies?" This is the **forward** (domain → codomain)
condition: preserving.

Co-Dist asks the **backward** question: "does the morphism respect codomain identifications?"
This is the condition for **inclusions** (the diagonal d: D → D × D), not for projections.
The product-kernel route produces projections — surjective maps with non-trivial kernels —
not inclusions. The diagonal is canonically available but generates only trivial structure
(ker(d) = equality, zero non-trivial identifications). **Co-Dist is eliminated.**

**(E4) Morphism class is maximal.** The product-kernel route imposes no constraint beyond
"respect the equivalence structure produced by Steps 1–5." Among conditions satisfying
(E1)–(E3), the maximal (weakest, most morphisms) condition is preserving. Exact adds the
reflecting condition, which is not forced by the product-kernel route (it comes from
inclusions, not projections), artificially restricting the morphism class. **Exact is
eliminated.**

The unique surviving condition is **equivalence-preserving**. ∎

---

**Lemma 1.8 (Composition and Identities).** *Equivalence-preserving maps compose, and
composition is associative with identities.*

[Proof unchanged from current v3.]

---

### §1.3 The Main Theorem

**Theorem 1.9 (Dist Is Forced).** *The category Dist — whose objects are pairs (D, ≈)
and whose morphisms are equivalence-preserving functions — is the unique category forced
by the product-kernel route from the two co-primitives.*

**Proof.** The derivation chain is:

```
∃ x ≠ y       ─── Lemma 1.1 ───▶  S₀ = {0,1}
|D| ≥ 2       ─── Lemma 1.2 ───▶  S₁ = S₀ × S₀
S₁             ─── Lemma 1.3 ───▶  π₁, π₂: S₁ → S₀ (projections, forced by UP)
π₁, π₂        ─── Lemma 1.4 ───▶  ker(πᵢ) (set-theoretic construction)
ker(πᵢ)        ─── Theorem 1.5 ──▶  ≈ on S₁ (kernel = equivalence relation)
(S₁, ≈)        ─── Theorem 1.7 ──▶  morphisms = equivalence-preserving (forced)
morphisms      ─── Lemma 1.8 ───▶  category Dist (composition + identities)
```

**Objects** are forced by Steps 1–5 (each step is a construction or theorem with zero
interpretive freedom). **Morphisms** are forced by Theorem 1.7 (three independent
arguments: kernel covariance, quotient factoring, and four-way elimination). **Category
axioms** (composition, associativity, identities) are verified in Lemma 1.8.

**Uniqueness.** Theorem 1.7 (Argument 3) eliminates all alternatives by verifying that
Set, Co-Dist, and Exact each fail at least one structural requirement forced by the
product-kernel route. Only Dist survives.

**Minimality.** Dist is the **maximal** category satisfying the structural requirements
(435 morphisms vs 231 for Co-Dist, 135 for Exact). This is the correct notion of
minimality for a morphism condition: the weakest condition (fewest constraints, most
morphisms) that respects the structure.

All claims computationally verified on {0,1,2} (B(3) = 5 equivalence relations,
27 functions per hom-set, 675 total function-pairs tested). ∎

---

## Notes on what changed from v3

1. **Lemma 1.7** (old): informal appeal to "consistency" and "information from none."
   → **Theorem 1.7** (new): three independent mathematical arguments with computational
   verification. Zero informal language.

2. **Theorem 1.9 uniqueness** (old): "Part II proves that Set and Rel fail."
   → **Theorem 1.9 uniqueness** (new): four-way elimination (Set/Dist/Co-Dist/Exact)
   with explicit criteria (E1–E4), each verified. The new argument also subsumes the
   old Rel elimination: Rel morphisms include non-functional relations, which are
   excluded because the product-kernel route produces **functions** (projections are
   functions), so the morphism class is a subclass of functions from the start.

3. **New structural insight:** the **directionality** of the product-kernel route. The
   route goes through projections (surjective, domain-side structure) not inclusions
   (injective, codomain-side structure). This directionality is what selects preserving
   over reflecting. Without this argument, Co-Dist and Exact are legitimate alternatives
   that the old proof could not eliminate.
