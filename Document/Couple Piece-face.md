# Law 1: The Atomic Unit — Piece / Face

## 1. Principle of Indivisibility

The **Piece / Face** pair is not an association of two separate objects, but the bipolar definition of a **single component**. It is impossible to isolate a Piece from its Faces without breaking the integrity of the system.

### Constitutive Duality

Every interface element is a single entity possessing two complementary dimensions:

1. **The Piece (Being):** It represents the existence of the component—its logical anchoring, its “life,” and its interface with the outside world. It forms the decision-making center.

2. **The Face (Appearance):** It is the material manifestation or rendering state. It exists only because it is carried by a Piece.

### Formal Structure of the Component

A component is structurally defined as a **Piece** containing a set of **Faces** (0 to n).

- **Unity through the Piece:** There is only one Piece per component. It guarantees the unity of identity of the system, regardless of how many aspects it may take.

- **Multiplicity through the Face:** The Face is a **rendering type**. A single component can therefore change appearance (switch between F₀ and F₁) without changing identity (the Piece remains the same).

### Technical Synthesis

In the **TISPI** model, designing a component means defining this unity:

> **One single center of life (Piece) for one or more state expressions (Faces).**

This fusion removes the complexity associated with synchronizing separate logic objects and display objects: here, they are simply the two sides of the same coin.

## 2. Question: Can a Face exist without a Piece?

This question concerns user interfaces in general from a theoretical and structural perspective. Let us clarify what *an entity* is, what a *representation* is, and *where identity resides* in an interface system.

We distinguish three levels: ontological, computational, and architectural.

### The Ontological Level: What is *a Face as a being?

A Face is not an object but a **projection**. It has no identity of its own; it is an *effect*.

- A color does not exist without a surface.

- A shadow does not exist without a body.

- A shape does not exist without a support.

In this sense, a Face without a Piece is a contradiction: it would be a **phenotype without a genotype**, a manifestation without a substrate.

What we call a *Face* in Tispi is an **accident** (in the Aristotelian sense), not a substance.

A *Piece* is the minimal substance that allows the accident to exist.

### The Computational Level: What is a Face inside a machine?

Even in the most permissive systems, a Face requires:

- a **memory container** (address, instance, structure)

- a *lifecycle** (creation, update, destruction)

- an **event channel** (interaction, focus, hitbox)

- a **rendering context** (canvas, GPU, pipeline)

Without a Piece, none of these functions has a bearer.

A Face “without a Piece” would be a **floating bitmap**, without identity, persistence, or interaction.

We could call it a static visual artifact.

### Ontology: Tispi

Let us examine the **conditions of existence**.

In Tispi:

- The Piece is the minimal unit of identity.

- The Face is the minimal unit of manifestation.

- Together they form an **inseparable pair**, like a node and its projection.

This eliminates orphaned views, inconsistent states, dead renderings, and non-causal transitions.

### The Reverse Case: A Piece without a Face?

Can a Piece exist without a Face?

- Yes, if it is off-screen, **hidden**, **in transition**, **preloaded**, **waiting**, **in error**, etc.

- Yes, if it represents a non-visible logical entity (container, layout, proxy, service).

- Yes, if it is a structural node without direct manifestation.

In other words:

**The Face depends on the Piece, but the Piece does not depend on the Face.**

The relationship is asymmetric.

### Synthesis

A Face without a Piece is impossible in a coherent system: it would have neither identity, lifecycle, nor causality.
A Piece without a Face is not only possible but structurally useful.
