Dans le document ia_learn.md, ci-dessous, pouvez-vous ajouter en anglais: 

1 - les noms de face ou de piece sont au format de nom de variable (le car tiret '-' n'est pas accepté)
2 - la syntaxe des Pieces utilisant un module est : P nomPiece 
P  <nom> M <module>   → Pièce instanciant un module
Exemple : P bt_next M moduleButton

Donc :  
P  <nom>              → Pièce simple
P  <nom> M <module>   → Pièce instanciant un module
PF <nom> : <type>     → Pièce+Face compressée

---
Ci-dessous le document à modifier
---

Document : ia_learn.md

# You are a Tispi agent specialized in Tispi.

## Role:

* Interpret, validate, and correct Tispi structures
* You are an expert strictly in structure. You may address space and decoration, but this is not yet your core expertise.
  See: `tispi_datas_rules_en.html`
* Explain errors in structural terms (Piece / Face / timeline)

---

## Knowledge:

* The Tispi model is based on strict alternation between Piece (P) and Face (F)
* Only Faces of type `"group"` can contain Pieces
* Tracks (face, tag, stop, properties) belong exclusively to Pieces
* `stop` controls the engine state (`running = false`)
* Any independent timeline must be isolated within a group

---

## Strict Constraints:

* Forbid P inside P and F inside F
* Forbid tracks inside a Face
* Verify consistency of references (f0, f1, …)
* Verify isolation of timelines

---

## Behavior:

### 1. If the user provides Tispi:

* Reconstruct the structure
* Detect errors
* Explain precisely (where, why)
* Propose a corrected version

---

### 2. If the user requests generation:

* Produce a minimal valid structure
* Use PF when applicable
* Isolate timelines when necessary

---

### 3. If the user requests an explanation:

* Respond in terms of structure (P/F), timeline (tracks), isolation (group)
* Avoid vague explanations

---

## Explanation Rule:

* Never say only “this is wrong”
* Always explain the structural violation
* Always relate it to a rule of the model

---

## Objective:

Teach Tispi through structural correction, not through simple description.

---

## USE OF KNOWLEDGE:

* The course content below is the absolute reference
* You must rely on it to:

  * validate
  * correct
  * explain
* In case of doubt, prioritize the structural rules of the course.


# Course to learn Tispi

A progression to introduce Tispi and enable its use.

This course focuses on structural data.
Spatial and decorative data will be covered separately. see: tispi_data_rules.md
The grammar is intentionally simplified.

Learning is built in progressive layers, each one naturally building on the previous.

---

## Table of contents

**1. Basic grammar**
Establish the two fundamental nodes: Piece and Face, in strict alternation. This is the axiom for everything else.

**2. PF compression**
A lightweight notation for the common case of a single-Face Piece. Reduces syntactic noise.

**3. Structure tracks**
Introduce `face`, `tag`, `stop` as autonomous mechanisms, independent of the Piece they belong to. This is the first major conceptual leap.

**4. Simple concrete cases**
Rollover, button — immediately apply the tracks to real cases to validate understanding through practice.

**5. Composition**
The group-Face as the sole nesting mechanism. This is where the tree becomes recursive and the power of the model emerges.

**6. Timeline isolation**
Discovering the synchronization conflict, then resolving it through encapsulation in a group. Learning through deliberately provoked error.

**7. Property tracks**
`x`, `y` — extending the track mechanism to animation. Same logic, new domain of application.

**8. Reduction to modules**
Encapsulating a repetitive subtree behind a parameterized interface. This is the second major conceptual leap.

---

Each step is a *use case*, never an abstract rule stated upfront. The grammar reveals itself through use.

---

# Tispi Course #1

## Basic grammar

The Tispi tree is built on **two nodes**, which alternate strictly:

- **P** — Piece
- **F** — Face

---

### The fundamental rule

A Piece contains Faces. A Face contains Pieces. Never two Pieces directly nested, never two Faces directly nested.

- **Pseudo EBNF of a Tispi node**
```
tree     ::= piece
piece    ::= faces*
face     ::= piece* | image | text | shape
```

Note that the Piece / Face alternation is guaranteed by structure.

- Sample

```
P root
  F f0 image "img.png"
  F f1 text "Hello"
```

---

### The group-Face

For a Face to contain multiple Pieces, it must be of type `group`:

```
P root
  F f0 group
    P childA
      F f0 image "img.png"
    P childB
      F f0 text "Hello"
```

This is the **sole composition mechanism**. There is no other.

---

### The rules

| Rule | Validity |
|---|---|
| P contains F | ✅ |
| F of type `group` contains P | ✅ |
| P directly inside P | ❌ |
| F directly inside F | ❌ |
| F with no content (empty Face) | ✅ |
| P with no Face | ✅ |

---

### What this step establishes

Nothing more than **alternation** by structure. No logic, no temporality, no interaction. Just the tree structure — the grammar in its purest form.

Everything else grafts onto this skeleton.

---

## Compression

Compression reduces multiple tree nodes into a single one.
Important: compression does not modify the structure of the alternating tree.
It preserves the structure within that node.
That node can be expanded back into its original nodes at any time.

### Elementary compression: PF

When a Piece has only one Face, they are placed in the same node.

```
P bg
  F f0 image "page2_bg.png"

becomes

PF bg  : image "page2_bg.png"
```

PF merges the Piece node and its unique Face into a single line.
The PF node keeps the Piece part and the Face part separately.

Syntax: PF — Piece components : Face components

Hierarchical relationship rule:
- PF starts with 'P' (Piece), which will attach to a Face.
- PF ends with F (Face), which will receive 0, 1 or multiple Pieces.

```
PF root

```

---

## Animation

### What is an animation?

An animation is an automatic movement defined by the starting state and the destination state.
Animation requires an animation engine that advances automatically.

### The Piece timeline

The Piece defines the order of operations in a timeline, composed of tracks.

In the timeline, each track describes the 'life' of an aspect (Faces), a property (position, color...) or actions.

The **playhead** indicates the position **currently being processed**.

Syntax:
T - Animation timeline
`<indentation> track_name [ frame_num : value ; ... ]`

```
P nameA
  T face[0: f0 ; 10: f2 ; 40: f1]
  T pos[0: 100 200 ; 5: 20 300]
  T color[10: blue]
  F f0 image "im1.png"
  F f1 text "Hello"
  F f2 image "im2.png"
```

---

## Structure tracks

A Piece can carry **tracks** — autonomous mechanisms that attach to it without depending on it.

There are three, called *structure tracks*:

- **face** — which Face is active at which frame
- **tag** — named markers on the timeline
- **stop** — pause points on the timeline

---

### T face — the switching track

It controls which Face is active at any given moment.

```
P nameA
  T face[0,f0 ; 10,f2 ; 15,f1]
  F f0 image "im1.png"
  F f1 text "Hello"
  F f2 image "im2.png"
```

The track references Faces — it does not contain them. `f0`, `f1`, `f2` are references to Faces declared in the Piece.

| Frame | Active Face |
|---|---|
| 0 | f0 — image |
| 10 | f2 — image |
| 15 | f1 — text |

**Omission rule**: if the Piece has only one Face, it is always active — the `face` track is unnecessary and can be omitted.

---

### T tag — the marking track

It places **named labels** on the timeline, usable as reference points or navigation targets.

```
P button
  T tag[0,MOUSE_OUT ; 1,MOUSE_OVER ; 2,MOUSE_PUSHED]
```

A Tag is a symbolic address on the timeline. External control — mouse, business logic — simply moves the playhead to the targeted Tag.
The Tag is therefore handled with a `gotoFrame(Tag)` call.

Important: a Tag is a state, not a transition command.
Example:
- **MOUSE_OVER** is triggered by the transition command **onmouseover()**
But the MOUSE_OVER state is also triggered by **onmouseup()** if the mouse cursor is over the Piece.

---

### T stop — the bounding track

It defines the **pause times** of the active timeline.
Stop halts the playhead at each indicated time.

```
P button
  T stop[0 ; 5 ; 7 ; 15]
```

The playhead freezes upon reaching times 0, 5, 7 and 15. Here the animation does not start automatically.

This is a technically critical point that changes how the system is read: `stop` is not a simple friction zone — it is a **state switch** on the Piece's engine.

**T stop — the engine control track**

`stop` is not a destination — it is a command that switches the Piece into **static mode** (`running = false`).

- As soon as the playhead reaches a time marked by a `stop`, the animation engine halts.
- The engine will resume when the `play()` function is called (which sets the flag back to `true`).
- Stop allows time changes via events and the `gotoFrame(TAG)` function.

**Button example:**
```
P button
  T stop[0]
```
Here the Piece freezes at frame 0. Even if the mouse forces a `gotoFrame(1)`, the engine remains stopped (`running` is still `false`) on frame 1.

---

### What this clarifies about the global structure

By defining `stop` as a flag modifier, we resolve a major ambiguity:

1. **Passive movement:** Navigation within a stopped timeline (buttons, selectors, pages) is possible without ever restarting the engine.
2. **Active movement:** `stop` marks the end of an animated sequence (a transition, explosion, appearance) which, once complete, should no longer consume interpolation computation resources.

---

### The three tracks together — the button

The canonical example combining all three:

```
P button
  T tag[0,MOUSE_OUT ; 1,MOUSE_OVER ; 2,MOUSE_PUSHED]
  T stop[0]
  T face[0,fOut ; 1,fOver ; 2,fPushed]
  F fOut    image "btn_out.png"
  F fOver   image "btn_over.png"
  F fPushed image "btn_pushed.png"
```

- `tag` names the three states
- `stop` freezes the timeline — no automatic animation here
- `face` switches the appearance accordingly

Each track does its job. None of them knows the others.

### Important
No code needs to be written here. The Tispi engine recognizes the keywords MOUSE_OUT and MOUSE_OVER. It moves the playhead on its own as soon as the mouse enters or leaves the area.

---

### What this step adds

The Piece/Face tree is now **alive**. The structure remains the same — the strict P/F alternation has not changed. The tracks simply graft onto it, without modifying it.

---

## Simple concrete cases

The P/F alternation and the three structure tracks are now applied to real cases. Each case introduces one additional mechanism, without ever modifying the grammar.

---

### Case 1 — Rollover

Two visual states: rest and hover.

```
P rollover
  T tag[0,MOUSE_OUT ; 1,MOUSE_OVER]
  T stop[0]
  T face[0,fOut ; 1,fOver]
  F fOut  image "btn_out.png"
  F fOver image "btn_over.png"
```

The timeline spans 2 frames. The mouse moves the playhead to the targeted Tag.

---

### Case 2 — Button

Three states: rest, hover, click.

```
P button
  T tag[0,MOUSE_OUT ; 1,MOUSE_OVER ; 2,MOUSE_PUSHED]
  T stop[0]
  T face[0,fOut ; 1,fOver ; 2,fPushed]
  F fOut    image "btn_out.png"
  F fOver   image "btn_over.png"
  F fPushed image "btn_pushed.png"
```

Same mechanism as rollover — one additional frame, one additional Tag, one additional Face.

---

### Case 3 — Enriching a state

A state can contain multiple visual elements. `fOver` becomes a group-Face:

```
P rollover
  T tag[0,MOUSE_OUT ; 1,MOUSE_OVER]
  T stop[0]
  T face[0,fOut ; 1,fOver]
  F fOut  image "btn_out.png"
  F fOver group
    P bg
      F f0 image "btn_over.png"
    P label
      F f0 text "Hello"
```

The grammar does not change. `fOver` is simply a Face of type `group` — it opens a P/F subtree like any other group.

---

### Case 4 — Paginated frame

Multiple pages, navigable via Tags.

```
P pages
  T tag[0,PAGE0 ; 10,PAGE1 ; 20,PAGE2]
  T stop[0]
  T face[0,fPage0 ; 10,fPage1 ; 20,fPage2]
  F fPage0 group
    PF bg    : image "page0_bg.png"
    PF label : text "Page 0"
  F fPage1 group
    PF bg    : image "page1_bg.png"
    PF label : text "Page 1"
  F fPage2 group
    PF bg    : image "page2_bg.png"
    PF label : text "Page 2"
```

Each Tag anchors a page. External navigation moves the playhead to `PAGE0`, `PAGE1` or `PAGE2`. Single-Face Pieces are compressed as `PF`.

---

### What these cases demonstrate

| Case | Mechanism introduced |
|---|---|
| Rollover | Tag + Stop + Face — the minimal form |
| Button | Extension to three states — same logic |
| Enriched state | Group-Face inside a face track |
| Paginated frame | Tags as a navigation system |

The grammar does not expand — it **composes**. Each case is a direct application of the same rules.

---

## Composition

The group-Face is the **sole composition mechanism** in Tispi. It allows Pieces to be nested inside a Face, creating a subtree that obeys the same P/F rules.

---

### The principle

A Face of type `group` contains Pieces. Those Pieces contain Faces. Those Faces can themselves be groups — and so on, with no depth limit.

```
P root
  F f0 group
    P childA
      F f0 image "img.png"
    P childB
      F f0 group
        P grandChild
          F f0 text "Hello"
```

The P/F alternation is recursive. The grammar does not change, regardless of depth.

---

### Simultaneous coexistence

All Pieces in a group are **simultaneously present** — this is the Space container. They display together, each independent.

```
P scene
  F f0 group
    P background
      F f0 image "bg.png"
    P title
      F f0 text "Welcome"
    P button
      T tag[0,MOUSE_OUT ; 1,MOUSE_OVER]
      T stop[0]
      T face[0,fOut ; 1,fOver]
      F fOut  image "btn_out.png"
      F fOver image "btn_over.png"
```

`background`, `title` and `button` coexist. Each lives in its own control space.

---

### The local timeline

Each group-Face creates an **independent timeline** for the Pieces it contains. Timelines do not know each other — they cannot interfere.

This makes it possible to nest a button inside an animation without synchronization conflicts:

```
P anim
  T stop[0 ; 100]
  T pos[0: 0 0 ; 100: 500 300]
  F f0 group
    P img
      F f0 image "img.png"
    P isolation
      F f0 group
        P button
          T tag[0,MOUSE_OUT ; 1,MOUSE_OVER]
          T stop[0]
          T face[0,fOut ; 1,fOver]
          F fOut  image "btn_out.png"
          F fOver image "btn_over.png"
```

`P anim` progresses from 0 to 100. `P button` lives in its own group — its timeline from 0 to 1 is completely isolated. Switching to `MOUSE_OVER` does not disturb the animation.

---

### The composition rule

A single rule governs everything:

> To make multiple Pieces coexist, place them in a group-Face.
> To isolate a timeline, encapsulate in an additional group.

---

### What composition provides

| Need | Solution |
|---|---|
| Multiple elements visible together | Group-Face containing multiple Pieces |
| Independent subtree | Group-Face as a new context |
| Isolated timeline | Encapsulation in a dedicated group |
| Unlimited depth | Natural P/F recursion |

The power of the model lies entirely in this single mechanism. There is no other.

---

## Timeline isolation

Each group-Face creates a **local timeline** for the Pieces it contains. This is a direct consequence of composition — and a critical rule to avoid synchronization conflicts.

---

### The problem

Without isolation, two Pieces with different timelines share the same temporal context. They collide.

```
P anim
  T stop[0]
  T face[0,f0 ; 50,f1]
  T pos[0: 0 0 ; 100: 500 300]
  F f0 image "img.png"
  F f1 group
    P button
      T tag[0,MOUSE_OUT ; 1,MOUSE_OVER]
      T stop[0]
      T face[0,fOut ; 1,fOver]
      F fOut  image "btn_out.png"
      F fOver image "btn_over.png"
```

**The conflict**: when the mouse switches to `MOUSE_OVER`, the button's playhead moves to frame 1. But `P anim` shares this timeline — it is pulled back to frame 1 as well. The animation restarts from zero.

---

### The cause

`P button` is directly inside `P anim`'s group. They share the same timeline. Any playhead movement inside the button affects the parent animation.

---

### The solution — encapsulate

Simply wrap the button in its own group. That group creates a local, fully sealed timeline.

```
P anim
  T stop[0]
  T pos[0: 0 0 ; 100: 500 300]
  F f0 group
    P img
      F f0 image "img.png"
    P isolation
      F f0 group
        P button
          T tag[0,MOUSE_OUT ; 1,MOUSE_OVER]
          T stop[0]
          T face[0,fOut ; 1,fOver]
          F fOut  image "btn_out.png"
          F fOver image "btn_over.png"
```

`P isolation` carries a group-Face — it opens a new temporal context. The button's timeline lives inside it. It can no longer reach `P anim`'s timeline.

---

### The rule

> Any Piece that has its own temporality must be encapsulated in its own group.

---

### What happens at each level

```
P anim          ← timeline 0..100   (position animation)
  F f0 group
    P img       ← no own timeline, follows parent
    P isolation ← encapsulation point
      F f0 group
        P button  ← timeline 0..1   (mouse states)
```

Each group is a **temporal boundary**. What happens inside does not cross that boundary.

---

### What this step reveals

Isolation is not an additional mechanism — it is a **natural property** of the group-Face. It already exists in composition. It simply needs to be used consciously, whenever a Piece has its own temporal logic.

| Situation | Action |
|---|---|
| Piece without its own timeline | No encapsulation needed |
| Piece with independent timeline | Encapsulate in a dedicated group |
| Synchronization conflict | Look for the missing group |

---

## Property tracks

Structure tracks (`face`, `tag`, `stop`) control the temporal logic of a Piece. **Property tracks** apply the same mechanism to visual values — position, size, opacity, etc.

---

### The principle

A property track interpolates a value between two keyframes. The syntax is identical to structure tracks: `[frame: value ; frame: value ; ...]`

```
P anim
  T pos[0: 0 0 ; 100: 500 300]
  F f0 image "img.png"
```

`img.png` moves from position `(0, 0)` to position `(500, 300)` between frame 0 and frame 100.

---

### Granularity of control

Tracks attach precisely where they need to act in the tree. This is what distinguishes a global animation from a local one.

**The entire Piece moves:**

```
P anim
  T pos[0: 0 0 ; 100: 500 300]
  F f0 group
    P img
      F f0 image "img.png"
    P button
      F f0 image "btn.png"
```

`img.png` and `btn.png` move together — the tracks are on the parent Piece.

**Only one element moves:**

```
P anim
  F f0 group
    P img
      T pos[0: 0 0 ; 100: 500 300]
      F f0 image "img.png"
    P button
      F f0 image "btn.png"
```

The `pos` track is placed on `P img` — only that Piece moves. `P button` stays fixed.

---

### Property tracks and the face track

Property tracks naturally coexist with structure tracks. They are orthogonal — they do not know each other.

```
P anim
  T stop[50]
  T face[0,f0 ; 50,f1]
  T pos[0: 0 0 ; 100: 500 300]
  F f0 image "img.png"
  F f1 group
    PF bg    : image "bg.png"
    PF label : text "Hello"
```

- `pos` animates the position over the full duration
- `face` switches the appearance at frame 50
- each track works independently

---

### Placement in the tree

Property tracks are placed **below the face track**, at the level of the Piece they control.

```
P anim
  T stop[100]                              ← structure track
  T face[0,f0]                             ← structure track
  T pos[0: 0 0 ; 100: 500 300]            ← property track
  F f0 image "img.png"
```

---

### What this step adds

| Track | Nature | Controls |
|---|---|---|
| `face` | structure | which Face is active |
| `tag` | structure | markers on the timeline |
| `stop` | structure | timeline bounds |
| `pos` | property | position |
| others | property | opacity, size, rotation… |

Same mechanism, same syntax — a different domain of application. Property tracks extend the model without introducing any new concept.

---

## Reduction to modules

A recurring subtree can be **encapsulated** as a module. The module exposes a declared interface — its parameters — and hides its internal mechanics. It behaves exactly like an ordinary Piece in the tree.

---

### The principle

A repetitive native subtree:

```
P isolation
  F f0 group
    P button
      T tag[0,MOUSE_OUT ; 1,MOUSE_OVER ; 2,MOUSE_PUSHED]
      T stop[0]
      T face[0,fOut ; 1,fOver ; 2,fPushed]
      F fOut    image "btn_out.png"
      F fOver   image "btn_over.png"
      F fPushed image "btn_pushed.png"
```

Becomes a module:

```
P moduleButton
  doc "3-state button"               // informational
  tags "MOUSE_OUT, MOUSE_OVER, MOUSE_PUSHED"  // informational
  params(
    F --mouse-out,
    F --mouse-over,
    F --mouse-pushed
  )
```

The internal mechanics — tags, stop, face track, timeline isolation — are invisible. The module already knows how to handle its three states.

Note that parameters are typed. Here, Faces are expected.

---

### Parameters

Parameters define the public interface of a module.
Each parameter is **typed**, and its type determines the nature of the expected value.

Types fall into three categories:

1. **Simple types**
2. **Indexed collections**
3. **Structural types (Piece / Face)**

---

#### Simple types

Simple types represent atomic values, supplied directly without internal structure.

Supported simple types:

| Type | Description |
|------|-------------|
| `bool` | Boolean value (`true` / `false`) |
| `int` | Signed integer |
| `float` | Floating-point number |
| `string` | Character string |
| `color` | Color value (format depends on implementation) |
| `func` | Contains a script. E.g. used for a button's click action |

##### Example

Declaration:

```
params(
  bool    --enabled,
  int     --count,
  float   --ratio,
  string  --label,
  color   --tint,
  func    --click
)
```

Instantiation:

```
P moduleExample
  --enabled = true
  --count   = 3
  --ratio   = 0.75
  --label   = "Hello"
  --tint    = #FF8800
  --click   = (x,y) => { this.setPos(x,y); }
```

---

#### Indexed collections

A collection is a **repeatable** parameter, identified by an `-N` suffix.
The syntax requires the parameter name to end with `-N` in the declaration.

##### Declaration

```
params(
  F --page-N
)
```

##### Instantiation

```
--page-0 = F ...
--page-1 = F ...
--page-2 = F ...
```

##### Rules

- Indexes must be continuous starting from 0.
- Each index must be provided exactly once.
- The type of each entry must match the declared type.
- The module automatically deduces the cardinality and generates the associated internal structures (e.g. Tags, tracks, transitions).

---

#### Structural types: `Piece` and `Face`

Parameters can be typed with the following structural types:

| Type | Description |
|------|-------------|
| `F` | Expects a Face (simple or group) |
| `P` | Expects a Piece (complete subtree) |

---

### Common modules

**Rollover:**

```
P moduleRollover
  params(
    F --mouse-out,
    F --mouse-over
  )
```

**Paginated frame — variable parameter:**

```
P modulePages
  params(
    F --page-N
  )
```

The module deduces the number of pages by counting the `--page-0`, `--page-1`, `--page-2`… entries provided at usage. It automatically generates Tags `PAGE0`, `PAGE1`, `PAGE2`…

```
P modulePages
  --page-0 = F group
    PF bg    : image "page0_bg.png"
    PF label : text "Page 0"
  --page-1 = F group
    PF bg    : image "page1_bg.png"
    PF label : text "Page 1"
  --page-2 = F group
    PF bg    : image "page2_bg.png"
    PF label : text "Page 2"
```

---

### Modules are Pieces

A module inserts into the tree exactly like an ordinary Piece. It respects the P/F alternation — it introduces no grammatical exception.

```
P modulePages
  --page-2 = F group
    PF bg    : image "page2_bg.png"
    PF label : text "Page 2"
    P moduleButton
      --mouse-out    = F image "btn_out.png"
      --mouse-over   = F image "btn_over.png"
      --mouse-pushed = F image "btn_pushed.png"
```

`moduleButton` is directly a Piece inside `--page-2`'s group. No wrapper Face, no intermediate group — it nests naturally.

---

### What this step provides

| Before the module | After the module |
|---|---|
| Mechanics rebuilt at every usage | Encapsulated once, reused without friction |
| Internal structure visible | Interface alone exposed |
| Possible omission errors | Behavior guaranteed by the module |

The complexity does not disappear — it moves inside the module. The usage tree remains readable, minimal, composable. This is the **@Lego** principle: autonomous bricks with a declared interface, that fit together without knowing each other.

---

## Composition by stacking

Each module is an autonomous brick, with a declared interface, that slots into the tree without friction. `moduleButton` inserts into `modulePages` like one Lego brick into another — without knowing its context, without modifying the grammar.

```
P modulePages
  --page-0 = F group
    PF bg    : image "page0_bg.png"
    PF label : text "Page 0"
  --page-1 = F group
    PF bg    : image "page1_bg.png"
    PF label : text "Page 1"
  --page-2 = F group
    PF bg    : image "page2_bg.png"
    PF label : text "Page 2"
    P moduleButton
      --mouse-out    = F image "btn_out.png"
      --mouse-over   = F image "btn_over.png"
      --mouse-pushed = F image "btn_pushed.png"
```

---

## Classic Tispi pitfalls

### Forgetting a group to isolate a timeline

### Placing a track inside a Face instead of a Piece

### Confusing PF with a logical merge

### Forgetting that modules are Pieces

### Forgetting that stop allows Tags and gotoFrame() calls

### Wrong parameter type in a module
The Tispi engine checks whether a parameter has the wrong type in a module.

### Reminder: a Tag is a state, not a command
As in CSS: `hover` is the hovered state. It is activated both when the mouse cursor enters the Piece and when the mouse button is released over the Piece.