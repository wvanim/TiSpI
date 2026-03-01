# Law 2 — Separation Between Tispi and Business Logic

Tispi focuses exclusively on the **user interface**—its structure, states, and rendering. It makes no decisions, performs no conditional computations, and has no initiative of its own. Its role is to **receive**, **render**, and **notify**.

Business logic remains external to Tispi. It is responsible for **triggering**, **computing**, and **deciding**. Causality always resides in the business layer.

---

## The Interface Contract

The relationship is bidirectional and formally defined.

### Business → Tispi

* **State Tags**
  The business layer sends a command that modifies the internal state of a Piece. These commands are analogous to external `gotoState` or `gotoFrame` instructions: they order a change without the Piece having to decide anything.
  Examples: `mode = "edit"`, `animation = "play"`, `visible = true`.

* **Keys**
  The business layer writes values into data tracks. Each key is associated with a **property** that defines how this value translates into an effect on Faces (color, position, text, rotation, etc.).

  The property system is **extensible**: the content of a key is not constrained (number, string, vector, function, etc.); only its interpretation by the property matters.
  This makes it possible to define new rendering behaviors without modifying the Tispi core.

---

### Tispi → Business

* **Structural Events**
  Tispi notifies the business layer of purely mechanical facts: end of a sequence, end of an animation, detected collision, change of direction, boundary reached, etc.

  These events are **observations** emitted by internal modules or active tracks. The business layer receives them and decides what to do next.

  Tispi never reacts directly to its own events—it only reports them.

---

## Principle of Mechanical / Decision Separation

Tispi distinguishes between two categories of internal reactions.

**Decoration** includes any autonomous visual or audio behavior that is deterministic and independent of business context. A ball bouncing, a blinking light, an animated gradient, a rollover—Tispi manages these entirely without consulting the business layer.

These behaviors are **preprogrammed mechanical rules**: they always produce the same result given the same initial conditions and can apply to any track—position, color, opacity, sound, etc.

Decoration may notify the business layer—bounce finished, collision detected, direction change—but it requires nothing from it to operate.

**Behavior** involves a contextual decision dependent on a business rule, an application state, or external data. Tispi never decides—it executes what the business layer commands via state tags and keys.

The boundary is therefore:

```
Decoration   → Tispi manages it alone. Deterministic, autonomous, notifies if useful.
Behavior     → The business layer decides. Tispi executes.
```

This organization ensures that Tispi remains a predictable mechanism, while the business layer remains the sole orchestrator of application-level decisions.

---

## Comparison with the Backend

The Tispi / business relationship is structurally identical to the relationship between a database table and backend logic.

```
Backend table           Tispi
──────────────────      ──────────────────
columns                 keys (with properties)
incoming triggers       state tags
UPDATE / INSERT         business writes
outgoing triggers       structural events
SQL rendering           UI rendering
```

Tables do not compute—they store and notify. SQL and scripts form the logic. Likewise, Tispi does not decide—it structures, renders, and notifies. Business logic forms the application logic.

---

## Advantages of This Formal Choice

**Independent testability.**
Tispi can be validated without business logic: one verifies that states render correctly, that keys receive values, that animations trigger, and that events are emitted. Business logic can be tested without Tispi: one verifies that computations are correct and that commands are issued at the right time.

**Replaceability.**
The rendering engine can change without touching the business logic. Business logic can evolve without modifying the Tispi structure. The two domains are isolated.

**Readability.**
A business developer does not need to understand Tispi’s internal structure—they only need to know the tags, keys, and events. A Tispi designer does not need to know the business logic—they only need to know the contact points.

**Stability.**
The Tispi structure does not change when business logic evolves. This is a rare property in modern frontend development, where a change in a business rule often triggers a rewrite of components.

**Reusability.**
A Tispi structure can be connected to different business logics without modification. It is the same table—with different scripts.

**Extensibility.**
The property system associated with keys allows rendering capabilities to be expanded without modifying the Tispi core, simply by adding new interpretations for values.


