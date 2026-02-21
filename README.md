*Note : The NTS (Technical Syntax Nomenclature) for the Time/Space Invariant protocol is available upon request.*

---

**Time/Space-Invariant Ecosystem - Tispi - Adapted for User Interface**  
- a visual editor: e-anim (renamed WvAnim - Web View animation)  
- a data structure (Time/Space tree)  [documentation](https://github.com/wvanim/TiSpI/tree/main/Document)
- a generic prompt format: the vehicle that transports typed, deterministic tree structures [@wvanim/Treeiaj: Json](https://github.com/wvanim/Treeiaj)  [@wvanim/Treeiat: token](https://github.com/wvanim/Treeiat)  
- a specific format dedicated to the Time/Space-Invariant UI: passenger of the former, it adapts the Tispi tree to a prompt.

---


# TiSpI - Time/Space Invariant


## **Problem Statement (English Version)**

- Current UI frameworks are imperative and mutable.  
- AI agents require a deterministic model.  
- DOM, XAML, MAUI, and WinUI do not provide a formal state graph.  
- Decorative transitions are mixed with behavioral logic.  
- There is no stable, canonical UI Intermediate Representation (IR).

---

<img width="1101" height="814" alt="im38" src="https://github.com/user-attachments/assets/c1b05151-98d7-42eb-a6b3-de470bfdddb7" />

Interactive UI and animation standard based on a dual tree structure: Time / Space.
=> natively compatible with AI processing.
- optimizes processing by AI models,
- improves design productivity,
- reduces ambiguity and hallucination effects in AI-driven interfaces.

Developed in the e-anim editor in 1999 (later renamed WvAnim). Used continuously for over 25 years, with the core structure remaining unchanged.

This policy defines the conditions required to preserve the structural integrity and consistency of the format.
```
© Philippe Destrumel — TiSpI structure and diagrams.
This material is publicly available for reading, analysis, and technical discussion.
Redistribution or modification of the material requires prior permission from the author,
No confidential, proprietary, or third-party information is involved.
```


---
DESCRIPTION
---

Interactive UI and animation standard composed of a dual tree: time / space

A standard created in the **e-anim** editor (later **WvAnim**) in 1999, with the introduction of **parametric semantic branch evolution** in 2007.

TiSpI is a **closed structural standard** based on a **strict Time / Space alternation tree**, in which **all components and behaviors are expressed without exception** through **deterministic, declarative, and verifiable relationships**, with **no heuristics and no implicit semantics**.

In TiSpI, **any branch that conforms to the Time / Space invariant can be reduced to an equivalent semantic component**, with **no loss of meaning and no additional rules**.
This reduction is **purely structural, deterministic, and reversible**.

Branch reduction is **not an optional optimization**.
It is a **logical consequence of the closed structure**.

* Without a closed structure → reduction is impossible without heuristics.
* With TiSpI → reduction is natural and safe.

---

In TiSpI, every property of an element is decomposed into two independent aspects:

- **behavior** — what the UI *does*  
- **decoration** — how the UI *looks*  

This separation is fundamental to the model:

- behavior and decoration must remain strictly separated  
- decoration must never influence business logic  
- cloud logic must never directly touch the UI  
- the model must remain canonical and deterministic  


---

## **Concise functional description**

**Time = Piece**: timeline, event, formula, function…

* Displays faces sequentially

**Space = Face**

* Visual and/or audio representation at a given time

  * **Face-group**: elements distributed in the workspace

    * Displays pieces simultaneously
  * **Face-render**: image, text, sound, video…

---

## **Semantic reduction**

Any valid Time/Space branch can be reduced to a single semantic component with no loss of meaning.
The reduction is purely structural, deterministic, and reversible — no heuristics, no added rules.


## **Example: Declarative Button Model Using TA + State Machine + TISPI**

<img width="830" height="584" alt="im2" src="https://github.com/user-attachments/assets/635ab6b2-f5e1-4f89-ab4b-13e724153764" />

This diagram illustrates how a simple button can be represented using the proposed architecture:

### **1. Structure (TA)**
The button is a *Piece* containing several *Faces*.  
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

## Links

[The tree Time/Space](https://github.com/wvanim/TiSpI/blob/main/Document/Editor%20on-line%20-%201%20-%20introduction%20tree.md)

[The Timeline, autonomous properties](https://github.com/wvanim/TiSpI/blob/main/Document/Editor%20on-line%20-%202%20-%20introduction%20timeline.md)

## AI feedback

Ask an AI to answer a prompt written in a file, without opening the file.
* enter this prompt into your AI: 
  "On the page: https://wvanim.fr/p/prompts3ia.html answer the first prompt"
* Next: "Answer the 2nd prompt"
* Next:"Answer the 3rd prompt"
* ...Up to the 7th.
