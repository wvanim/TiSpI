

---

# **TiSpI — Introduction**

## **Note**  
The NTS (Technical Syntax Nomenclature) for the Time/Space Invariant protocol is available upon request.

---

# **What is TiSpI?**

TiSpI is an **interactive UI and animation standard** based on a **dual Time/Space tree structure**, originally created in the **e‑anim** editor (later **WvAnim**) in 1999 and used continuously for more than 25 years.  
Its core structure has remained unchanged and is **natively compatible with AI processing**.

TiSpI provides:

- a **visual editor** (e‑anim / WvAnim)  [video](https://www.wvanim.fr/p/present_wvanim_philippe_destrumel.mp4)
- a **structural data model** (Time/Space tree) [documentation](https://github.com/wvanim/TiSpI/tree/main/Document)
- a **generic prompt format** for typed deterministic trees  
  - [@wvanim/Treeiaj](https://github.com/wvanim/Treeiaj) (JSON)  
  - [@wvanim/Treeiat](https://github.com/wvanim/Treeiat) (token)  
- a **UI‑specific format** adapting the TiSpI tree to prompts  
- the **Time/Space‑Invariant structural standard** itself  

---

# **Problem Statement**

- Current UI frameworks are imperative and mutable.  
- AI agents require a deterministic model.  
- DOM, XAML, MAUI, and WinUI do not provide a formal state graph.  
- Decorative transitions are mixed with behavioral logic.  
- There is no stable, canonical UI Intermediate Representation (IR).

---

# **What TiSpI Provides (AI‑Native UI)**

TiSpI provides a deterministic, declarative, and verifiable UI structure that:

- optimizes processing by AI models  
- reduces ambiguity and hallucination in AI‑driven interfaces  

---

# **Structural Foundations**

TiSpI is a **closed structural standard** based on a strict **Time / Space alternation tree**, where **all components and behaviors** are expressed through **deterministic, declarative, and verifiable relationships**, with **no heuristics and no implicit semantics**.

### Structure — L'arbre temps/espace invariant

1. L'arbre est une alternance stricte Temps (Piece) / Espace (Face), de profondeur arbitraire.
2. Une "entité" est le couple de type Piece/Face. La Pièce est indispensable, contenant la ou les Faces.
3. Une Piece ne sélectionne qu'une seule Face courante à chaque instant.
4. FaceGroup et FaceRender sont des spécialisations de Face — ils n'ajoutent pas de niveau dans l'alternance.
5. Un FaceGroup affiche toutes ses Pieces simultanément. Ses Pieces sont synchronisées.

### Temps

1. Toutes les pistes de toutes les Pieces sont synchronisées.
2. La vie de chaque canal est totalement décrite dans sa piste : succession de valeurs et de transformations.

### Exemple

```
Piece                        // racine
    Face                     // FaceGroup : contient des Pieces
        Piece
            Face (image)
            Face (texte : Hello)
        Piece
            Face (texte : word)
    Face (oval)              // FaceRender
```

<img width="1101" height="814" alt="im38" src="https://github.com/user-attachments/assets/c1b05151-98d7-42eb-a6b3-de470bfdddb7" />
---

### **Semantic Reduction**

Any branch that conforms to the Time/Space invariant can be reduced to a single semantic component:

- no loss of meaning  
- no additional rules  
- purely structural  
- deterministic  
- reversible  

Reduction is **not an optimization** — it is a **logical consequence** of the closed structure.

- Without a closed structure → reduction requires heuristics  
- With TiSpI → reduction is natural and safe  

# **Property Decomposition**

In TiSpI, every property of an element is decomposed into two independent aspects:

- **behavior** — what the UI does  
- **decoration** — how the UI looks  

This separation is fundamental:

- behavior and decoration must remain strictly separated  
- decoration must never influence business logic  
- cloud logic must never directly touch the UI  
- the model must remain canonical and deterministic  

---

# **Concise Functional Description**

### **Time = Piece**  
Timeline, event, formula, function…  
Displays **faces sequentially**.

### **Space = Face**  
Visual and/or audio representation at a given time.

### **Face‑group**  
Elements distributed in the workspace.  
Displays **pieces simultaneously**.

### **Face‑render**  
Image, text, sound, video…

---

# **Example: Declarative Button Model Using TA + State Machine + TISPI**

<img width="830" height="584" alt="im2" src="https://github.com/user-attachments/assets/635ab6b2-f5e1-4f89-ab4b-13e724153764" />

This diagram illustrates how a simple button can be represented using the proposed architecture:

### **1. Structure (TA)**  
The button is a Piece containing several Faces.  
Each Face corresponds to a visual frame (NORMAL, OVER, PUSHED).

### **2. Behavior (State Machine)**  
The button has an explicit state graph:

- NORMAL → OVER (on mouse over)  
- OVER → PUSHED (on mouse down)  
- PUSHED → NORMAL (on mouse up)  

Each transition is declarative and deterministic.

### **3. Decoration (TISPI)**  
Each Face is rendered through tracks:

- Track Face: which frame to display  
- Track Action: visual effects applied during transitions  

Tracks are neutral; the attached property defines their meaning.
---

# **AI Feedback Experiment**

Ask an AI to answer a prompt written in a file, without opening the file.

Enter this prompt into your AI:  
“On the page: https://wvanim.fr/p/prompts3ia.html answer the first prompt.”  
Then: “Answer the 2nd prompt.”  
… up to the 7th.

---
