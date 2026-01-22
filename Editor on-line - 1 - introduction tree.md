Introduction to the documentation of the WvAnim/TiSpI online editor 

## The Strictly Alternating Time/Space Tree – WvPiece/WvFace

Like a clockwork mechanism, WvAnim alternates temporal wheels (WvPiece) and spatial plates (WvFace), each level meshing with the next to create a fluid and predictable machine.
<img width="1129" height="849" alt="image" src="https://github.com/user-attachments/assets/6e730e7d-9ba1-4dff-b197-b392a8ac7aec" />

*Figure 1: Visualization of the alternating tree – purple (Time/WvPiece) and green (Space/WvFace)*

**WvAnim organizes components according to a tree with alternating levels:**
- **Odd levels:** WvPiece (temporal dimension)
- **Even levels:** WvFace (spatial dimension)

This strict alternation ensures a clear separation between:
- **"when"** – the evolution over time
- **"what"** – the spatial content at a given instant

**Golden Rule of the Interface**

<img width="902" height="364" alt="image" src="https://github.com/user-attachments/assets/f6d22719-a88b-45e6-b062-d75b20cdd3bc" />

*Figure 2: The WvAnim editor showing the timeline (Piece) and the spatial editing area (Face-Group)*

The **Piece** = your timeline ("when things change")  
The **Group** = what you see and edit at the cursor's instant ("what is visible now")

---

### Time is Represented by WvPieces

**WvPiece** = the temporal dimension of a component

A WvPiece describes **how a component evolves over time:**

* It defines the temporal evolution (mechanism detailed in the next section)
* It contains **0, 1, or N child WvFaces** (possible visual/auditory states)
* **At any instant T:** only 1 WvFace is active/visible
* The WvPiece manages **which Face to display and when**

**Concrete example:**

A character has 3 different visual states ("idle", "walk", "jump").

→ The **WvPiece "Character"** contains these 3 WvFaces  
→ It defines the chronology: "idle" from 0-2s, "walk" from 2-5s, "jump" from 5s onward  
→ At t=3s, only the WvFace "walk" is visible

---

### Space is Represented by WvFaces

**WvFace** = the spatial dimension of a component

A WvFace represents **the visual and/or auditory state at an instant T.**

**There are two classes of WvFace:**

'WvFaceGroup' and 'Render WvFace':
Note: hereafter, when we simply say **"WvFace"**, we are generally referring to render WvFaces (leaves). WvFaceGroups will always be named explicitly.

---

#### The WvFaceGroup (Spatial Container)

**WvFaceGroup** = composition of several components displayed simultaneously

* Represents **the spatial arrangement** of several components at a given moment
* Contains **1 or N child WvPieces**
* **All children are active at the same time** (parallel display)

**Concrete example:**

A car dashboard is a **WvFaceGroup** containing:
- WvPiece "Fuel Gauge" (which evolves based on level)
- WvPiece "Speedometer" (which evolves based on speed)
- WvPiece "Engine Warning Light" (which blinks in case of an alert)

→ The 3 WvPieces evolve **independently** in time  
→ But are **all visible simultaneously** in the dashboard

---

#### Render WvFaces (Tree Leaves)

**Render WvFace** = terminal visual or auditory components

The leaf nodes of the tree are concrete elements:
- **Image** (properties: file path, dimensions...)
- **Text** (properties: font, size, style, color...)
- **Sound** (properties: audio file, volume...)
- **Video** (properties: source, resolution...)

These WvFaces contain the **properties necessary for their rendering** but have no children.

---

### Alternation Schema

```
WvPiece "Scene"                        ← TIME (global evolution)
    │
    └─ WvFaceGroup "Layout"            ← SPACE (spatial organization)
           │
           ├─ WvPiece "Hero"           ← TIME (hero's evolution)
           │      │
           │      ├─ WvFace "neutral"  ← SPACE (image)
           │      └─ WvFace "smiling"  ← SPACE (image)
           │
           └─ WvPiece "Background"     ← TIME (background evolution)
                  │
                  └─ WvFace "forest"   ← SPACE (image)
```

**Fundamental Rule:**
- A **WvPiece** node can only have **WvFace** children
- A **WvFace** node (of type Group) can only have **WvPiece** children
- The alternation is **strict** at every level of the tree

---

### Reading the Tree at an Instant T

To display the scene at **t = 3 seconds:**

1. **WvPiece "Scene"** → evaluates its state at t=3s → activates its WvFace "Layout"
2. **WvFaceGroup "Layout"** → activates **all** its child WvPieces
3. **WvPiece "Hero"** → evaluates its state at t=3s → activates WvFace "smiling"
4. **WvPiece "Background"** → evaluates its state at t=3s → activates WvFace "forest"
5. The **render WvFaces** ("smiling", "forest") display their content

---

### Next Section

This section has described **the structure** of the tree and **the role** of each node type.

**A following section details the animation mechanism:**
- How does a WvPiece define its temporal evolution?
- What is a WvProperty and an animation track?
- How are transitions between WvFaces managed?
