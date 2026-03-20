# TiSpI - Time/Space Invariant

### Arbre strict d'alternance Temps / Espace pour UI prévisibles

TiSpI describes what appears on screen and evolves over time.
Unlike other approaches, everything follows a single, simple logic—like a clock and its gears.

*40 years of experience in interface state machines.*

## QUESTIONING THE AI
- 3 prompts present TiSpI as interpreted by the AI.
- 4 prompts assess how compatible it is with AI systems.

### **1st prompt for your Artificial Intelligence**

```
Analyze and evaluate this format for a fixed or animated software page component.

# **Organization of Components in a User Interface**

The components of the User Interface are arranged in a tree that alternates between Time and Space.
This tree is a data storage structure. It is used in the editor, and is later adapted and exported to meet the needs of different runtimes.

## **The WvAnim Tree — an Alternating Time / Space Structure**

Imagine a conventional computer tree that unfolds from top to bottom. Its defining characteristic: nodes alternate *strictly* and *without exception* between two types at each level.

**At the top of the tree** is always a **Piece** — a time node, an active element. It processes and emits information. It is driven by a Timeline (or any other producer: event, formula, program). It contains one or more **Face-Groups**.

**A Face-Group** is a space node — a passive element, a container. It receives information but does not act. It, in turn, contains one or more **Pieces**.

This alternation continues down to the leaves of the tree, called **Simple Faces**: these are the terminal elements, visual or audible — an image, text, a shape, a sound, a gradient.

## **The Display Rule is Fundamental**

* In a Piece, **only one Face is visible at a time**
* In a Face-Group, **all Pieces are visible simultaneously**

Note: Pieces within a group are synchronized.

---

## **The Entity — Minimal Conceptual Unit**

The entity is the smallest conceptual element of the tree: a Piece together with its Faces, or a standalone Piece without Faces. It is a theoretical notion — not an instantiated object in code.

A Face exists only in relation to the Piece that defines it; this dependency is directly reflected in the syntax: every node must begin with a Piece. The syntax is not an arbitrary convention — it is a direct translation of the conceptual structure.

This notion significantly facilitates processing by an AI: it provides a non-ambiguous unit of analysis, a verifiable syntactic constraint, and a natural way to segment the tree without ever breaking the fundamental relationship between a Piece and its Faces.

---

## **A 4D Geometry Reduced to 2D**

The tree structure is not merely a software convention — it is a rigorous geometric projection.

Time (t) occupies the horizontal axis: the Timeline unfolds from left to right, making time a visible and measurable geometric dimension.

The three spatial dimensions (x, y, z) occupy the vertical axis: the progressive nesting of Pieces and Face-Groups encodes all spatial relationships as one descends toward the leaves.

These two axes are **strictly orthogonal** — time and space never mix.

Thus, a 4D space is projected onto a 2D plane without loss of information, thanks to the ontological separation of the two domains: time is continuous, space is hierarchical.

This data architecture decision, conceived as early as 1999, gives the tree its coherence and its ability to accommodate any animation concept — UI, FX, motion design — without structural conflict.

---

## **The Clock-Piece**

The Clock-Piece is structurally a regular Piece, but distinct in its role: it coordinates the timing of Pieces within a Face-Group.

It synchronizes the Pieces in the group, manages stops and restarts, and regularly checks synchronization. It may also be subordinated to an external source: another parent or global Clock-Piece, an event (mouse, load...), a time-bar, audio, video, or a cursor.

This creates a clear hierarchy:

* **Without a Clock-Piece**: each Piece in the group is autonomous, with no synchronization
* **With a Clock-Piece**: Pieces are coordinated — stops, restarts, and synchronization are managed
* **With a subordinated Clock-Piece**: this coordinated time is itself driven by an external source

Responsibility separation is explicit:

* The **Timeline** manages *how* time evolves — interpolation between states (easing, acceleration, deceleration)
* The **Clock-Piece** manages the *flow* of time — synchronization, stops, and restarts

---

## **Non-Destructive Optimization**

TiSpi allows non-destructive optimizations.

The minimal optimization consists of merging a Piece and its Face into a single node when the Piece contains only one Face. This node maintains a strict separation between Piece and Face — the merge is reversible, and both nodes can be reconstructed at any time if needed.

This optimization brings the WvAnim tree closer to conventional structures organized as simple Pieces and stateful Pieces, offering two main advantages: compatibility with common practices, and the ability to reconstruct the two distinct nodes if requirements evolve.

---

## **Example**

Alternation of Pieces and Faces:

Piece
  Face-Group
    Piece
      Face-Group
        Piece
          Simple Face

Note: P_F is a Piece+Face node. It is a reversible optimization.

json
{
  "type": "Piece",
  "name": "like-button",
  "horloge": {
    "type": "event-driven",
    "piste-evenement": [
      [0, "default"],
      [1, "hover"],
      [2, "pushed"]
    ]
  },
  "children": [
    {
      "type": "Face",
      "frame": 0,
      "children": [
        { "type": "P_F", "component": "heart", "props": { "filled": "{isLiked}" } },
        { "type": "P_F", "component": "count", "props": { "value": "{likesCount}" } }
      ]
    },
    {
      "type": "Face",
      "frame": 1,
      "children": [
        { "type": "P_F", "component": "heart", "props": { "filled": "{isLiked}", "scale": 1.15 } },
        { "type": "P_F", "component": "count", "props": { "value": "{likesCount}" } }
      ]
    },
    {
      "type": "Face",
      "frame": 2,
      "children": [
        { "type": "P_F", "component": "heart", "props": { "filled": true, "scale": 0.85 } },
        { "type": "P_F", "component": "count", "props": { "value": "{likesCount}" } }
      ]
    }
  ]
}

---

## **Tracks of a Piece**

Any evolution of a Piece is carried by tracks. Each track is specialized in an independent dimension of variation expressed over time: successive faces, positions, click actions, immediate actions, component color, background, etc.

### **Tracks**

A Piece may have multiple parallel tracks, each independent:

* **FACE-TRACK**: defines the sequence of displayed faces — which Face is visible at each moment. It may include visual transitions between faces (fade, 3D, shear...), which are decorative.
* **POSITION-TRACK**: defines spatial position changes
* **CLICK-ACTION-TRACK**: defines actions triggered by a click
* **BACKGROUND-TRACK**: defines background evolution

Stops suspend the progression of time at a given instant — the Piece waits for an external instruction to resume.

All tracks within a Piece are synchronized with each other, and all Pieces within a group are also synchronized — ensuring temporal coherence at the group level.

---

### **Keys**

Each track is composed of keys. A key contains either a transition preceding the key, a value, or both. Each track represents the complete script of one class of evolution of the Piece.

---

## **Example**

json
{
  "face": [
    {"frame": 0, "face": 2, "transition": {"ease": "easeout", "effect": "fade", "duration": "2s"}},
    {"frame": 5, "face": 0, "transition": {"ease": "easein", "effect": "3D", "duration": "0.5s"}}
  ],
  "position": [
    {"frame": 0, "css": {"left": "50%", "top": "100px"}, "transition": {"ease": "easeout", "effect": "fade", "duration": "2s"}}
  ]
}


Note: this example is expanded form and will be optimized later.

```

### **2nd prompt**

* write:

```
Evaluate with the "comment" flag for a piece, added in 2007

Role: prevent the piece from being sent to the run-time. The piece stays in the editor.

Consequence:
The piece's action can be used for the editor itself => it becomes a macro-piece... A control, in fact.

Since the piece is in a group, we can assign a role to the group. Example: button.
The tree is modular, so we can move the entire branch of this group + the macro-pieces will follow since they are part of the tree branch.
=> export => place in an online library.
=> the comment flag, by itself, created the mechanism for building parameterizable library templates.

Some actions will allow automatic editing of a sub-group.
Example for the "animated button" template => 3 buttons will allow direct editing of each group for each button state.

I was already exporting groups from the start. I quickly understood the tree was modular. So macro-pieces followed naturally in 2007.

---

The dashboard is itself a macro-group. Meaning the dashboard is integrated into the tree.

Furthermore, an option allows creating it with only one piece present when the program opens.
It is a macro-piece.
Through moving, resizing, and programming, the user commands it to create each element of the editor.

```

### Addendum

This is an introduction. E-anim / WvAnim has been evolving for 25 years within a structure unchanged since its origin.

Also, these prompts are not an exhaustive list of the fundamental TiSpI optimizations resulting from the rigor of the model.

