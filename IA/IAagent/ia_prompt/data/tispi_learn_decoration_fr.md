Passons à l'apprentissage de la partie décoration.
Ce sont les propriétés CSS et les transitions.

---
Les décorations

A - les propriétés CSS

1 - les propriétés CSS  fixes peuvent être placées dans les faces.
Ce sont des éléments constitutif de la Face
Par exemple, la couleur pour un rectangle.

Syntaxe :
Style color:#4080FF; border:...; 
Important : une seule valeur par propriété

2 -  les propriétés CSS dynamiques sont placées dans la Piece
Chaque propriété a sa propre piste. 
Ainsi l'histoire d'une propriété est totalement inscrite dans une piste. 
Chaque notation propriété est repérable par sont type et sont temps dans la barre-de-temps.

Pour une propriété donnée, la valeur active à un instant T est déterminée par deux sources possibles, résolues par priorité :
- La valeur dans la Face — fixe, toujours présente
- La valeur dans la piste de la Piece au frame T — prioritaire si elle existe

Syntaxe : 
T color [0: blue; 50: rvg(80, 150, 255); 78:#C080FF;...]
Nous retrouvons la syntaxe des autres pistes.

3 - priorité
Les propriétés inscrites dans les pistes de la Pièce sont prioritaires sir celles inscrites dans la Face

B - les transitions

1 - définition
Une transition décrit l'évolution de l'effet visuelle ou sonore pour afficher une Face ou d'une propriété.
Exemple d'effets: fade, cube3D, slide, 
Les transitions peuvent être affectée d'un accélérateur : ease.

Les transitions sont donc appliquées avant l'affichage de la valeur. Comme en CSS. Aussi bien dans les Pistes de Piece que lors de l'apparition d'un face.
Les transitions sont des décorations. C'est à dire qu'elles n'affectent pas la structure, ni l'évolution du projet 

On peut déterminer la durée de l'animation.  Voir CSS
Pour les propriétés inscrites dans une Face, la durée est obligatoire.
Si la durée n'est pas indiquées dans une Key de Piece, la transition affecte tout le temps intervalle avec la key précédente ou le début de la piste.
Important : tous les temps de Tispi sont indiqués en frame.

On peut aussi applique un delay pour retarder ou avancer le début de la transition. Voir CSS
 
2 - Situation de la transition
Les transitions sont associées à chacune des keys est à chacune des propriétés de la Face.
Pour les faces,  les transitions s'effectueront à l'apparition de la Face.

Les transition sont aussi décrites dans les pistes, elles accompagnes les valeurs. 
Les accès sont donc aussi : par propriété et par temps.

Chaque piste décrit donc tout la vie de sont contenu : transition + valeur successives dans le temps.

3 - Syntaxe
[duration:  A ease, E effect, D delay]
A = valeur de durée, E = nom d'effet, D = valeur de delay
Elles sont toutes optionnelle.

4 - les types acceptés
Chaque valeur de la transition peut être une constante, une variable, une callback



____________________________________________________________________________
____________________________________________________________________________
____________________________________________________________________________
____________________________________________________________________________


---

### A — Propriétés CSS

**Dans la Face** — valeur fixe, constitutive :
```
F f0 rect  style color:#4080FF; border:1px solid #000;
```

**Dans la Piece** — valeur dynamique, par piste :
```
P element
  T color[0: blue ; 50: rgb(80,150,255) ; 78: #C080FF]
```

**Priorité** : la piste de la Piece écrase la Face.

---

### B — Transitions

Associées à chaque key, syntaxe optionnelle :
```
[duration: A ease, E effect, D delay]
```

**Dans une piste Piece** — la transition accompagne la valeur :
```
T color[0: blue, [40: A ease, E fade] ; 50: red, [25: E slide]]
```

**Dans une Face** — la transition s'applique à l'apparition, durée obligatoire :
```
F f0 rect  style color:#4080FF;  [100: A ease, E fade]
```

---

### confirmation

La transition dans une key de Piece sans durée explicite s'étend sur **tout l'intervalle** jusqu'à la key précédente — c'est bien le comportement par défaut ?
Oui, parfaitement.



____________________________________________________________________________
____________________________________________________________________________
____________________________________________________________________________
____________________________________________________________________________

### A — Propriétés CSS

**Dans la Face** — valeur fixe, constitutive :
```
F f0 rect  style color:#4080FF; border:1px solid #000;
```

**Dans la Piece** — valeur dynamique, par piste :
```
P element
  T color[0: blue ; 50: rgb(80,150,255) ; 78: #C080FF]
```

**Priorité** : la piste de la Piece écrase la Face.

---

### B — Transitions

Associées à chaque key, chaque composant est optionnel :
```
[duration: A ease, E effect, D delay]
```

**Dans une piste Piece** — la transition accompagne la valeur :
```
T color[0: blue, [5: A ease, E fade] ; 50: red, [10: E slide]]
```

**Dans une Face** — la transition s'applique à l'apparition, durée obligatoire :
```
F f0 rect  style color:#4080FF;  [50: A ease, E fade]
```

---



____________________________________________________________________________
____________________________________________________________________________
____________________________________________________________________________
____________________________________________________________________________


---

### Syntaxe complète intégrée

**Piste avec transition implicite sur l'intervalle :**
```
T color[0: blue ; 50: red, [A ease, E fade]]
```
La transition `fade` s'étend sur les 50 frames entre les deux keys.

**Piste avec durée explicite :**
```
T color[0: blue ; 50: red, [20: A ease, E fade]]
```
La transition dure 20 temps, indépendamment de l'intervalle.

**Avec delay :**
```
T color[0: blue ; 50: red, [20: A ease, E fade, 5]]
```

**Face avec transition à l'apparition : la durée est obligatoire, c'est logique**
```
F f0 rect  style color:#4080FF, [20: A ease, E fade]
```

---

### Résumé

Les transitions sont **purement décoratives** — elles n'affectent ni la structure ni la timeline. On peut les retirer sans changer le comportement fonctionnel.

Chaque valeur de transition accepte constante, variable ou callback — ce qui ouvre la transition à une logique dynamique sans toucher à la structure.








____________________________________________________________________________
____________________________________________________________________________
____________________________________________________________________________
____________________________________________________________________________



____________________________________________________________________________
____________________________________________________________________________
____________________________________________________________________________
____________________________________________________________________________

Vous êtes un expert de Tsipi-décoration

---

## Décorations Tispi

### A — Propriétés CSS

**Règle générale :** tous les temps en Tispi sont exprimés en frames.

---

**Dans la Face** — valeur fixe, constitutive :
```
F f0 rect  style color:#4080FF; border:1px solid #000;
```
Une seule valeur par propriété. Ces propriétés font partie de la Face.

**Dans la Piece** — valeur dynamique, par piste :
```
P element
  T color[0: blue ; 50: rgb(80,150,255) ; 78: #C080FF]
```
Chaque propriété a sa propre piste. L'histoire complète de la propriété est inscrite dans cette piste.
Chaque notation est repérable par son type et son numéro de frame dans la barre de temps. 
Pas d'ambiguité de résolution.

**Priorité** : la piste de la Piece écrase la valeur déclarée dans la Face.

Règle de résolution : pour une propriété donnée, la valeur active à un instant T est déterminée par deux sources possibles :
- La valeur dans la Face — fixe, toujours présente
- La valeur dans la piste de la Piece au frame T — prioritaire si elle existe

La règle est déterministe : la piste Piece gagne toujours sur la Face.

---

### B — Transitions

Une transition décrit l'évolution visuelle ou sonore lors de l'affichage d'une Face ou d'une valeur de propriété. Les transitions sont appliquées avant l'affichage de la valeur — comme en CSS.
Les transitions sont purement décoratives — elles n'affectent ni la structure ni la timeline. On peut les retirer sans changer le comportement fonctionnel.

Exemple d'effets : `fade`, `cube3D`, `slide`, …
Exemple d'accélérateur : `ease`, `easein`, --funcByJump

---

**Syntaxe :**
```
[A ease, E effect, D delay]
```
- `A` = Accélerateur (optionnelle)
- `E` = nom de l'effet (optionnel)
- `D` = delay en frames (optionnel)

Tous les composants sont optionnels. Chaque valeur peut être une constante, une variable, ou une callback.

---

**Dans une piste Piece** — la transition accompagne la valeur de la key :
```
T color[0: blue, [40: A ease, E fade] ; 50: red, [25: E slide]]
```
Si la durée est omise, la transition s'étend sur tout l'intervalle jusqu'à la key précédente (ou le début de la piste).
```
T color[0: blue ; 50: red, [A ease, E fade]]
```

Avec durée explicite et delay :
```
T color[0: blue ; 50: red, [20: A ease, E fade, D 5]]
```
La transition dure 20 frames, le delay est de 5 frames.

---

**Dans une Face** — la transition s'applique à l'apparition de la Face. La durée est obligatoire :
```
F f0 rect  style color:#4080FF, [20: A ease, E fade]
```

---

**Résumé des règles**

| Contexte | Durée | Comportement |
|---|---|---|
| Key de Piece, durée omise | implicite | couvre tout l'intervalle |
| Key de Piece, durée explicite | en frames | durée indépendante de l'intervalle |
| Face | obligatoire, en frames | s'applique à l'apparition |
| Delay | en frames | optionnel dans tous les contextes |





# Exécution run-time

Tispi est une structure. Le run-time est un produit exporté qui possède un moteur d'animation dédié au contexte.
Il est possible d'écrire un run-time en C++, en Python pour d'autres support que les navigateurs.
Ce modèle pourrait s'implémenter dans des outilss traditionneles, tels que les tableurs ou les outils de présentation de diapositive... 

Exemple : le contexte est internet traitement/CSS.
Cet exemple est donné pour permettre de se représenter le comportement attendu du système
  
Ici l'animation est déléguée au CSS

---

## 1. CSS comme moteur run-time

Le CSS constitue **l’un des moteurs d’exécution run-time de Tispi**.

Dans ce modèle :

* Tispi reste responsable de :

  * la structure (P / F)
  * la timeline (tracks, frames)
  * les événements (keyframes, segments, stop)

* Le CSS est responsable de :

  * l’interpolation continue
  * les effets visuels
  * l’exécution temporelle réelle (ms)

👉 Le CSS n’est pas un système de description ici, mais un **moteur d’exécution délégué**.

---

## 2. Principe de délégation

La délégation repose sur un cycle simple :

```text
Tispi déclenche → CSS exécute → Tispi attend
```

---

### 2.1. Déclenchement

Lors d’une injection :

* Tispi calcule :

  * la valeur cible
  * les paramètres de transition (durée, easing, effet, delay)

* Tispi injecte ces valeurs dans le CSS

👉 Cela déclenche une transition CSS.

---

### 2.2. Prise en charge par le CSS

Une fois déclenchée :

* le CSS :

  * interpole la valeur
  * applique easing et effets
  * gère la progression temporelle réelle

* Tispi :

  * **n’intervient plus**
  * ne met pas à jour la valeur en continu

👉 La continuité est entièrement déléguée.

---

### 2.3. Attente

Pendant la transition CSS :

* Tispi reste **passif**
* aucun recalcul n’est effectué
* aucune injection supplémentaire n’a lieu

👉 Le système fonctionne en **mode événementiel**, non en mode frame-by-frame.

---

### 2.4. Interruption

La délégation prend fin immédiatement si un événement structurel survient :

* nouvelle injection (nouvelle keyframe ou segment)
* arrêt de la Piece (`T stop`)
* disparition de la Piece (changement de Face parent)

#### Effet :

* la transition CSS en cours est :

  * interrompue
  * ou remplacée

* une nouvelle valeur devient référence

---

## 3. Règles d’injection

```text
Une propriété est injectée :

1. à chaque keyframe
2. lors de toute entrée dans un segment temporel
   (lecture, saut, changement de Face, reprise)

Une propriété n’est pas injectée :
- à chaque frame
- ni uniquement lors d’un changement de valeur
```

---

## 4. Effet de l’injection

Après injection :

```text
- la valeur est transmise au moteur CSS
- le CSS prend en charge la continuité (interpolation, easing, effet)
- Tispi ne réintervient pas tant qu’aucun nouvel événement structurel ne survient
```

---

## 5. Modèle d’exécution

Le comportement global peut être résumé ainsi :

```text
événement Tispi (keyframe / segment / structure)
→ injection propriété
→ déclenchement transition CSS
→ exécution continue par CSS
→ attente côté Tispi
→ interruption uniquement si nouvel événement
```

---

## 6. Propriété fondamentale

> Tispi est un moteur discret (événements en frames)
> CSS est un moteur continu (interpolation en temps réel)

La délégation garantit :

* absence de calcul continu côté Tispi
* synchronisation parfaite avec la timeline
* exploitation directe des capacités du navigateur

---

## Conclusion

La délégation au CSS est un **contrat d’exécution** :

* Tispi décide **quand** une valeur doit changer
* CSS décide **comment** elle évolue dans le temps
* l’exécution est pilotée par événements, jamais par boucle continue côté Tispi

Ce mécanisme assure un système :

* déterministe
* performant
* directement implémentable en environnement web
