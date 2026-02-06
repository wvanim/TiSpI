Time / Space Invariant = 2D  

Can we consider that each *Piece* describes two dimensions?

Let’s place the tracks one below the other.
At initialization, a vertical cursor crosses all tracks at the left edge.
Crossing tracks (x, y, z), this cursor captures a 3D snapshot of the component's state

* this cursor represents a vertical dimension : 3D snapshot
* by moving it to the right, I cover a horizontal dimension : time, like a musical score

The diagram is drawn in two dimensions, where time occupies one of those two dimensions.

By combining these two rules:

* imposing a time bar — even empty after initialization
* synchronizing all Pieces within a group

we can fully model time within a 2D representation.

Whether the event is the linear flow of time along the tracks or emerges externally (mouse, computation result, etc.) does not affect the deterministic representation of this scheme.

---

## 1. Each *Piece* implicitly carries two dimensions

In this scheme:

* **vertical dimension**
  = stacking of tracks / synchronized Pieces
  → a *structural instant*: a complete snapshot of the state (what you rightly call a logical 3D photo)

* **horizontal dimension**
  = progression along the tracks
  → equivalent to a musical score: a discrete succession of *Pieces*

So yes:

> each Piece occupies a cell in a bidimensional frame: (track/group vertically, time index horizontally)

This is not a classic timeline.
It is a **discrete Piece × Group plane**.

---

## 2. The initial cursor materializes the temporal origin

The vertical cursor on the left edge plays the role of:

* t = 0
* common origin for all tracks
* deterministic anchor point

Imposing a time bar — even an empty one — is crucial:

👉 it forces the existence of an explicit horizontal axis.

This is the difference with many traditional UIs: they treat time as implicit flow; here, time is a declared geometric dimension.

---

## 3. Group synchronization closes the system

The second rule:

> synchronize all Pieces within a group

produces:

* each column is atomic
* each instant is complete
* no track can drift independently

Result:

* no drift
* no temporal race conditions
* no partial states

You obtain a **complete time slice by construction**.

In the groupe, this is very close to a discrete lattice.

---

## 4. Formal conclusion

With:

1. an explicit horizontal axis (time bar)
2. mandatory vertical synchronization

we obtain:

> a fully geometric 2D representation of time.

### ✅ Time is entirely modeled by the 2D topology.

It no longer exists as an external variable.

---

## 5. Important point (often misunderstood)

> Whether the event is linear time flow or emerges externally (…) does not affect the deterministic representation.

Because:

* mouse
* IO
* computation result
* internal tick

are no longer *time*.

They are simply:

👉 **triggers that move the cursor within the plane**.

They do not create state.
They select a coordinate.

This is a major difference.

---

## Synthetic formulation

> By enforcing an explicit temporal axis and vertical synchronization of Pieces, TiSpI turns time into a 2D geometric coordinate. External events do not modify the model: they merely move the cursor within this deterministic space.

---


