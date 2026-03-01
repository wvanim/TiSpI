# Loi 1 : L'Unité Atomique Pièce / Face

## 1. Principe d'Indivisibilité

Le couple **Pièce / Face** n'est pas une association de deux objets distincts, mais la définition bipolaire d'un **composant unique**. Il est impossible d'isoler une Pièce de ses Faces sans briser l'intégrité du système.

### La Dualité Constitutive

Tout élément d'interface est une entité unique possédant deux dimensions complémentaires :

1. **La Pièce (L'Être) :** Elle représente l'existence même du composant. C'est son ancrage logique, sa "vie", et son interface avec l'extérieur. Elle est le centre décisionnel.
2. **La Face (Le Paraître) :** Elle est la manifestation matérielle ou l'état de rendu. Elle n'existe que parce qu'elle est portée par une Pièce.

### Structure Formelle du Composant

Un composant est structurellement défini comme une **Pièce** contenant un ensemble de **Faces** (0 à n).

* **L'unité par la Pièce :** Il n'y a qu'une seule Pièce par composant. Elle garantit l'unité d'identité du système, peu importe le nombre d'aspects qu'il peut prendre.
* **La multiplicité par la Face :** La Face est un **Type de rendu**. Un composant unique peut ainsi changer d'aspect (commuter entre F_0 et F_1) sans changer d'identité (la Pièce reste la même).

### Synthèse Technique

Dans le modèle **TISPI**, concevoir un composant revient à définir cette unité :

> **Un seul centre de vie (Pièce) pour une ou plusieurs expressions d'état (Faces).**

Cette fusion élimine la complexité liée à la synchronisation entre des objets de logique et des objets d'affichage séparés : ici, ils sont les deux faces d'une même pièce de monnaie.

---

## 2. Question : une Face peut-elle être présente sans Pièce ?

Ceci questionne les Intefaces Utilisateurs en général, d'un point de vue théorique et structurel.
Clarifions *ce qu’est une entité*, *ce qu’est une représentation*, et *où se situe l’identité* dans un système d’interface. 

Distinguons trois niveaux : ontologique, computationnel et architectural.

---

### Le niveau ontologique : qu’est‑ce qu’une Face *en tant qu’être* ?
Une Face n’est pas un objet, mais une **projection**. Elle n’a pas d’identité propre : elle est un *effet*.

- Une couleur n’existe pas sans surface.  
- Une ombre n’existe pas sans corps.  
- Une forme n’existe pas sans support.  

Dans ce sens, une Face sans Pièce est une contradiction : c’est vouloir un **phénotype sans génotype**, une manifestation sans substrat.

Ce que nous appelons *Face* dans Tispi est un **accident** (au sens aristotélicien), pas une substance.  
Une *Pièce* est la substance minimale qui permet à l’accident d’exister.

---

### Le niveau computationnel : qu’est-ce qu’une Face *dans une machine* ?
Même dans les systèmes les plus permissifs, une Face nécessite :

- un **contenant mémoire** (adresse, instance, structure)  
- un **cycle de vie** (création, mise à jour, destruction)  
- un **canal d’événements** (interaction, focus, hitbox)  
- un **contexte de rendu** (canvas, GPU, pipeline)

Sans Pièce, aucune de ces fonctions n’a de porteur.  
Une Face “sans Pièce” serait un **bitmap flottant**, sans identité, sans persistance, sans interaction.

Nous pouvons le nommer *artefact visuel statique*.

---

### Ontologie : Tispi 
Voyons les **conditions d’existence**.

Dans Tispi :

- La Pièce est l’unité minimale d’identité.  
- La Face est l’unité minimale de manifestation.  
- Les deux forment un **couple indissociable**, comme un nœud et sa projection.

Tu élimines ainsi :

- les vues orphelines,  
- les états incohérents,  
- les rendus morts,  
- les transitions non causales.

C’est une **axiomatisation de la continuité**.

---

### L’inverse : une Pièce sans Face ?

Une Pièce peut-elle exister sans Face ?

- Oui, si elle est **hors écran**, **cachée**, **en transition**, **préchargée**, **en attente**, **en erreur**, etc.  
- Oui, si elle représente une entité logique non visible (container, layout, proxy, service).  
- Oui, si elle est un nœud structurel sans manifestation directe.

Autrement dit :  
**la Face dépend de la Pièce, mais la Pièce ne dépend pas de la Face.**

C’est asymétrique.

---

### Synthèse
Une Face sans Pièce est impossible dans un système cohérent, car elle n’a ni identité, ni cycle de vie, ni causalité.  
Une Pièce sans Face est non seulement possible, mais structurellement utile.

---
