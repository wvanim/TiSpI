# Tispi Agent Training — Face Selector Mechanism

## 1. The Key / Tag / Face relationship

Every position on the timeline carries three independent roles.

### Definitions

| Term | Question | Role |
|---|---|---|
| `Key` | **how much** | the value stored at a frame |
| `Tag` | **why** | semantic role of the frame — optional |
| `Face` | **what** | the component that appears |

### The frame is the address. The Key is the value.

```
T pos[0: 0 0 ; 100: 500 300]
        ↑ ↑↑
     frame  Key = value "0 0"

T face[0: fIdle ; 1: fSubmit]
          ↑↑↑↑↑
          Key = Face reference

T tag[0: STEP_IDLE ; 1: STEP_SUBMIT]
         ↑↑↑↑↑↑↑↑↑
         Key = semantic name = Tag
```

### The fundamental rule

> **Every named Tag has its Face. By default.**
> The absence of a Face is an explicit, justified exception.

### The three roles are independent

- A Key without a Tag — `T pos[0: 0 0]` — value without semantic role
- A Tag without a Face — silent frame 0 — semantic role without visual component
- A Face without a named Tag — always active Face — visual component without explicit semantic role

---

## 2. Face Selector Modules

### The unique mechanism

A Piece can display different Faces according to its position on the timeline.
**The mechanism is always identical :**

```
T tag[...]    ← names the positions
T stop[0]     ← freezes the timeline
T face[...]   ← one Face per position
```

### Why a family of modules ?

The mechanism is unique. The semantics differ.
Each module is a **recognizable signature** for the developer and the AI.
One module per family — one clear interface per use case.

### 2.1 Why this list ?

Each module corresponds to a **distinct triggering nature** :

| Trigger | Nature | Module |
|---|---|---|
| Mouse event | reactive | `moduleMouse` |
| Sequential progression | temporal | `moduleStep` |
| Paginated navigation | navigational | `modulePage` |
| Criteria / condition | conditional | `moduleState` |

The prefix of the Tag is the **signature of the module** :
- `MOUSE_` → `moduleMouse`
- `STEP_` → `moduleStep`
- `PAGE_` → `modulePage`
- `STATE_` → `moduleState`

**The mechanism is identical. Only the prefix changes.**

### 2.2 Each module

---

#### `moduleMouse`
**Trigger :** mouse events — managed automatically by the engine.
**Tags :** `MOUSE_OUT`, `MOUSE_OVER`, `MOUSE_PUSHED`
**Params :**
```
params(
  func --click,
  F --mouse-out,
  F --mouse-over,
  F --mouse-pushed
)
```
**Usage :** buttons, rollovers, mouse interactions.

```
P btn M moduleMouse
  --click       = (e) => { ... }
  --mouse-out    = F image "btn_out.png"
  --mouse-over   = F image "btn_over.png"
  --mouse-pushed = F image "btn_pushed.png"
```

---

#### `moduleStep`
**Trigger :** sequential logic — application events, time progression.
**Tags :** `STEP_<name>` — named by the author.
**Params :**
```
params(
  F --step-@index
)
```
**Usage :** forms, requests, wizards, sequential flows.

```
P login M moduleStep
  --step-0 = F group   // STEP_IDLE
  --step-1 = F group   // STEP_SUBMIT
```

---

#### `modulePage`
**Trigger :** paginated navigation — user browses between pages.
**Tags :** `PAGE_@index`
**Params :**
```
params(
  F --page-@index
)
```
**Usage :** paginated frames, single-page websites, galleries.

```
P site M modulePage
  --page-0 = F group  // PAGE_0 — Home
  --page-1 = F group  // PAGE_1 — Gallery
  --page-2 = F group  // PAGE_2 — Contact
```

---

#### `moduleState`
**Trigger :** external criteria — role, language, theme, condition.
**Tags :** `STATE_<name>` — named by the author.
**Params :**
```
params(
  F --state-@index
)
```
**Usage :** user roles, languages, themes, conditional display.

```
P form M moduleState
  --state-0 = F group  // STATE_MANAGER
  --state-1 = F group  // STATE_EMPLOYEE
```

---

### The list is non-exhaustive

Other families may be defined as needed :

| Prefix | Trigger | Usage |
|---|---|---|
| `TOUCH_` | touch event | mobile interfaces |
| `KEY_` | keyboard event | input fields |
| `ANIM_` | automatic animation | transitions, sequences |
| `MEDIA_` | media playback | video, audio |

---

### Summary

> A Face Selector Module is a Piece that exposes a set of named Faces,
> each associated with a Tag, activated by a specific trigger.
> The mechanism is unique. The semantics are declared by the prefix.
