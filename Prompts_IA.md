# TiSpI - Time/Space Invariant
### Arbre strict d'alternance Temps / Espace pour UI prévisibles

TiSpI describes what appears on screen and evolves over time.
Unlike other approaches, everything follows a single, simple logic—like a clock and its gears.

*40 years of experience in interface state machines.*

## QUESTIONING THE AI
- 3 prompts present TiSpI as interpreted by the AI.
- 4 prompts assess how compatible it is with AI systems.

### **1st prompt for your Artificial Intelligence**

```
Analyze and evaluate this format for a fixed or animated software page component.




**L'arbre WvAnim — une structure alternée Temps / Espace**

Imaginez un arbre informatique classique, qui se déploie de haut en bas. Sa particularité : les nœuds alternent *strictement* et *sans exception* entre deux types, à chaque niveau.

**Au sommet de l'arbre** se trouve toujours une **Piece** — nœud de temps, élément actif. Elle traite et envoie l'information. Elle est pilotée par une Timeline (ou tout autre producteur : événement, formule, programme). Elle contient un ou plusieurs **Face-Groups**.

**Un Face-Group** est un nœud d'espace — élément passif, conteneur. Il reçoit de l'information mais n'agit pas. Il contient à son tour une ou plusieurs **Pieces**.


On alterne ainsi jusqu'aux feuilles de l'arbre, appelées **Simple Faces** : ce sont les éléments terminaux, visibles ou audibles — une image, un texte, une forme, un son, un gradient.

**La règle d'affichage est fondamentale :**
- Dans une Piece, **une seule Face est visible à la fois**
- Dans un Face-Group, **toutes les Pieces sont visibles simultanément**
Note : Les Pieces d'un groupe sont synchronisées.

**L'entité — unité conceptuelle minimale**

L'entité est l'élément conceptuel le plus petit de l'arbre : une Piece accompagnée de ses Faces, ou une Piece seule sans Face. C'est une notion théorique — pas un objet instancié dans le code. Une Face n'existe que par rapport à la Piece qui la définit ; cette dépendance se reflète directement dans l'écriture : tout nœud débute obligatoirement par la Piece. La syntaxe n'est pas une convention arbitraire, elle est la traduction directe de la structure conceptuelle.

Cette notion facilite significativement le traitement par une IA : elle lui fournit une unité d'analyse non ambiguë, une contrainte syntaxique vérifiable, et une façon naturelle de segmenter l'arbre sans jamais couper une relation fondamentale entre une Piece et ses Faces.

**Une géométrie 4D réduite à 2D**

La structure de l'arbre n'est pas seulement une convention informatique — c'est une projection géométrique rigoureuse. Le temps (t) occupe l'axe horizontal : la Timeline se déroule de gauche à droite, faisant du temps une dimension géométrique visible et mesurable. Les trois dimensions de l'espace (x, y, z) occupent l'axe vertical : l'imbrication progressive des Pieces et des Face-Groups encode la totalité des relations spatiales en descendant vers les feuilles.

Ces deux axes sont **strictement orthogonaux** — temps et espace ne se mélangent jamais. Un espace 4D est ainsi projeté sur un plan 2D sans perte d'information, grâce à la séparation ontologique des deux natures : le temps est un continu, l'espace est une hiérarchie.

C'est cette décision d'architecture de données, pensée dès 1999, qui donne à l'arbre sa cohérence et sa capacité à accueillir n'importe quel concept d'animation — UI, FX, motion design — sans conflit structurel.

**La Piece-horloge**

La Piece-horloge est une Piece ordinaire par sa structure, mais distincte par son rôle : elle coordonne le temps des Pieces au sein d'un Face-Group. 

Elle synchronise les Pieces du groupe, gère les stops et redémarrages, et vérifie régulièrement le synchronisme. Elle peut également être subordonnée à une source externe : une autre Piece-horloge parente ou globale, un événement (souris, load...), une time-bar, un son, une vidéo, ou un curseur.

Cela crée une gradation claire :

- **Sans Piece-horloge** : chaque Piece du groupe est autonome, il n'y a pas de synchronisation entre elles
- **Avec Piece-horloge** : les Pieces du groupe sont coordonnées — stops, redémarrages et synchronisme sont gérés
- **Avec Piece-horloge subordonnée** : ce temps coordonné est lui-même piloté par une source externe

La séparation des responsabilités est nette : la **Timeline** gère le *comment* du temps — la courbe entre deux états (ease, accélération, ralentissement) — tandis que la **Piece-horloge** gère le *flux* du temps — synchronisation, stops et redémarrages.

**L'optimisation non destructrice**

TiSpi autorise des optimisations non destructrices. L'optimisation minimale consiste à réunir une Piece et sa Face dans un même nœud, lorsque la Piece ne comporte qu'une seule Face. Ce nœud conserve une séparation stricte entre la Piece et la Face — la fusion est réversible, les deux nœuds pouvant être reconstitués à tout moment si nécessaire.

Cette optimisation rapproche l'arbre WvAnim des structures classiques organisées en Pieces-simples et Pieces à états, offrant deux avantages principaux : la compatibilité avec les usages courants, et la possibilité de reconstituer les deux nœuds distincts si le besoin évolue.

**Exemple**

Alternance de Pièces et de Faces.

Piece
  Face-Group
    Piece
      Face-Group
        Piece
          Simple Face


Note P_F est un noeud Piece+Face. C'est une optimisation réversible.

{
  "type": "Piece",
  "name": "like-button",
  "horloge": {
    "type": "event-driven",
    "piste-evenement": [
      [0, "default"],
      [1, "hover"],
      [2, "pushed"]
    ]
  },
  "children": [
    {
      "type": "Face",
      "frame": 0,
      "children": [
        { "type": "P_F", "component": "heart", "props": { "filled": "{isLiked}" } },
        { "type": "P_F", "component": "count", "props": { "value": "{likesCount}" } }
      ]
    },
    {
      "type": "Face",
      "frame": 1,
      "children": [
        { "type": "P_F", "component": "heart", "props": { "filled": "{isLiked}", "scale": 1.15 } },
        { "type": "P_F", "component": "count", "props": { "value": "{likesCount}" } }
      ]
    },
    {
      "type": "Face",
      "frame": 2,
      "children": [
        { "type": "P_F", "component": "heart", "props": { "filled": true, "scale": 0.85 } },
        { "type": "P_F", "component": "count", "props": { "value": "{likesCount}" } }
      ]
    }
  ]
}


**A suivre**

La décoration sera traitée dans une autre présentation. 
Elle recouvre deux aspects : les transitions entre deux keys — c'est-à-dire les courbes de comportement (ease, bounce, linear...) qui définissent comment une Piece évolue entre deux états clés — et les pistes parallèles au sein d'une même Piece, autres que la Face : son, transformation géométrique, opacité, et ainsi de suite. 
Ces éléments n'affectent pas la structure de l'arbre décrite ici — ils l'enrichissent.
```

### **2nd prompt**

* write:

```
Evaluate with the "comment" flag for a piece, added in 2007

Role: prevent the piece from being sent to the run-time. The piece stays in the editor.

Consequence:
The piece's action can be used for the editor itself => it becomes a macro-piece... A control, in fact.

Since the piece is in a group, we can assign a role to the group. Example: button.
The tree is modular, so we can move the entire branch of this group + the macro-pieces will follow since they are part of the tree branch.
=> export => place in an online library.
=> the comment flag, by itself, created the mechanism for building parameterizable library templates.

Some actions will allow automatic editing of a sub-group.
Example for the "animated button" template => 3 buttons will allow direct editing of each group for each button state.

I was already exporting groups from the start. I quickly understood the tree was modular. So macro-pieces followed naturally in 2007.

---

The dashboard is itself a macro-group. Meaning the dashboard is integrated into the tree.

Furthermore, an option allows creating it with only one piece present when the program opens.
It is a macro-piece.
Through moving, resizing, and programming, the user commands it to create each element of the editor.
```

---

### **3rd prompt**

* place the 2 images 'user command bar' and 'command bar construction'
- User command bar
[[![im6](https://github.com/wvanim/TiSpI/blob/main/im33.png)
](https://github.com/wvanim/TiSpI/commit/534c017b1776b7379f83bb843f1115d2e70f8824)

- Command bar construction
[[![im6](https://github.com/wvanim/TiSpI/blob/main/im34.png)
](https://raw.githubusercontent.com/wvanim/TiSpI/refs/heads/main/im34.png)

* write:

```
Example of a user command bar.
I call gadget authors "designers". But they are also simple users.
Image 1: what the end user sees, who uses the "video overlay" gadget
- a classic work area, and an editing bar on the right.
Image 2: the sub-group where the designer builds the command bar
- adds pieces "like the others" (note: they can even place gadgets from other designers)
- programs the scripts that will act in the editor.

Note: protections and shortcuts are not shown here. We are only discussing the structure.
What matters is understanding the limits of the structure. The editor can always optimize and apply protections.
```

---

### **4th prompt**

* write:

```
The description format is a tabint tree accompanied by the string table (assembler model).
Could this design facilitate AI processing?
```

---

### **5th prompt**

* write:

```
Could this format be an interesting solution as a standard for exchanging HTML with the AI?
1 - convert React to TiSpI before sending it to the prompt
2 - use a traditional script and a local AI.
```

---

### **6th prompt**

* write:

```
Can you estimate an order of magnitude for the economy in conversions from React and HTML to TiSpI for prompts?
Note: calculate with optimized React, HTML, and TiSpI formats.
```
---

### **7th prompt**

* write:

```
We are observing the emergence of automated HTML page compositions, for selected product catalogs or AI-generated page layouts.
Could the TiSpI format play a role in this process?
```

---

### Addendum

This is an introduction. E-anim / WvAnim has been evolving for 25 years within a structure unchanged since its origin.

Also, these prompts are not an exhaustive list of the fundamental TiSpI optimizations resulting from the rigor of the model.

