## The Life of a Piece
**This section introduces the fundamental concepts of WvAnim.**
The formal grammar (BNF) and invariants are detailed in the following sections.

### 1️⃣ General Principle
**WvAnim decomposes temporal evolution into independent themes**, called **WvProperties**.
* Each **WvProperty** corresponds to **a homogeneous axis of evolution**:
  * `face` (display),
  * `coordinates` (position),
  * `rotation`,
  * `scale`,
  * `background`,
  * `sound volume`,
  * `script` / `event`,
  * etc.
Thus, animating an object's position and rotation will require two distinct WvProperties (and therefore two tracks), managed independently.
👉 A WvProperty = **a single viewpoint on time**.

<img width="1138" height="753" alt="image" src="https://github.com/user-attachments/assets/4e01188e-c25f-4dd3-9cc1-e87c35b0af4c" />

---
### 2️⃣ Role of Tracks
* Each **track** describes **the complete scenario of a theme**.
* Golden rule: an actor can have only one track per WvProperty. No duplicates.
* A track:
  * contains all the **temporal keyframes** (WvKeyTrack),
  * defines **the state at each keyframe**,
  * defines **the evolution between two successive keyframes**.
👉 The track is not a sequence of commands,
👉 it is a **complete definition of a theme's evolution**.
---
### 3️⃣ Role of Keyframes (WvKeyTrack)
* A **WvKeyTrack** represents:
  * a **predetermined moment** (keyframe),
  * with a **target value** for the WvProperty,
  * and a **transition** from the previous keyframe.
The intermediate evolution is **never global**,
it is **always local between two keyframes**.
*(This choice allows the transition curve to be changed for each segment, unlike global Bézier curves.)*
Examples of transitions: ease-in, follow curve, face shear, 3D rotation...
---
### 4️⃣ The Precise Meaning of "WvProperty"
A **WvProperty** is not:
* a simple CSS property,
* nor a simple graphical attribute.
But rather:
> **An abstraction that organizes**
> – CSS properties (top, left, transform, opacity, background, volume...),
> – sequences of faces,
> – script executions,
> – and potentially other behaviors,
**under a single temporal evolution logic**.
---
### 5️⃣ Important Conceptual Consequence
* The **WvProperty defines the track's role**.
* The **value type** depends on the WvProperty.
* The **method of conversion to CSS / face / script** depends on the WvProperty.
* The track is **neutral**, the WvProperty gives it meaning.
👉 It is the **WvProperty** that carries:
* the semantics,
* the value format,
* the execution logic.
---
### 6️⃣ Example Schema
```
WvAnim
|
├── WvProperty "Position" (type: Vec2)
│       └── Track "Position of Actor A"
│               ├── WvKeyTrack @t=0s : (0, 0) [transition: linear]
│               ├── WvKeyTrack @t=2s : (100, 50) [transition: ease-in]
│               └── WvKeyTrack @t=5s : (300, 0) [transition: elastic-out]
│
└── WvProperty "Face" (type: String)
        └── Track "Expression of Actor A"
                ├── WvKeyTrack @t=0s : "neutral" [transition: instant]
                └── WvKeyTrack @t=4s : "smiling" [transition: crossfade]
```
---
### 7️⃣ Glossary
**WvProperty**: The WHAT (which aspect we animate) and the HOW (how to interpret it).
**Track**: The WHEN and the VALUE for a given property (the complete story).
**WvKeyTrack**: A KEY POINT in this story (moment + value + local transition).
