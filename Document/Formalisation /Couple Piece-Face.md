# Loi 1 — Unité atomique Pièce / Face

## Définitions

Soit :

* **P** l’ensemble des *Pièces*
* **F** l’ensemble des *Faces*

Une **Face** est une manifestation d’une **Pièce**.

Nous définissons une relation :

```
owner : F → P
```

qui associe chaque Face à la Pièce qui la porte.

---

# Axiome 1 — Existence de la Pièce

Toute Face appartient à exactement une Pièce.

```
∀ f ∈ F, ∃! p ∈ P : owner(f) = p
```

Conséquence :

```
Face ⇒ Piece
```

Une Face sans Pièce est impossible.

---

# Axiome 2 — Multiplicité des Faces

Une Pièce peut posséder zéro, une ou plusieurs Faces.

```
∀ p ∈ P, Faces(p) ⊆ F
```

avec :

```
|Faces(p)| ≥ 0
```

Conséquence :

Une Pièce peut exister sans Face.

---

# Axiome 3 — Unité d'identité

L'identité d'un composant est portée exclusivement par la Pièce.

Deux Faces appartenant à la même Pièce représentent **le même composant**.

```
owner(f₁) = owner(f₂) ⇒ identity(f₁) = identity(f₂)
```

---

# Axiome 4 — Subordination ontologique

L'existence d'une Face dépend de l'existence de sa Pièce.

```
destroy(p) ⇒ ∀ f ∈ Faces(p), destroy(f)
```

La suppression d'une Pièce entraîne la disparition de toutes ses Faces.

---

# Structure du composant

Un composant TiSpI est défini comme :

```
Component = (p, Faces(p))
```

où :

```
p ∈ P
Faces(p) ⊆ F
```

---

# Principe de représentation

Chaque Face représente un **état de rendu possible** d'une Pièce.

```
Face = render_state(Piece)
```

Ainsi un même composant peut changer d'apparence sans changer d'identité.

---

# Conséquences architecturales

Le modèle TiSpI interdit :

```
∄ f ∈ F tel que owner(f) = ∅
```

Donc il n'existe pas :

* de vues orphelines
* de rendus sans entité
* d'états visuels non portés par un composant

---

# Forme minimale de la loi

On peut résumer la loi par deux règles fondamentales :

```
∀ Face → ∃ Piece
∀ Piece → 0..n Faces
```

---

# Interprétation conceptuelle

La **Pièce** est l'unité minimale d'identité.
La **Face** est l'unité minimale de manifestation.

Le composant TiSpI est donc une **entité bipolaire** :

```
Piece (identity)
Faces (manifestations)
```

---

