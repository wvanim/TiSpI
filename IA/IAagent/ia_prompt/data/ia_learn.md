Prompt :
Pouvez-vous écrire de façon claire l'étape 7. La réduction en modules


# Cours pour apprendre Tispi

Progression pour présenter Tispi, et permettre de l'utiliser.

Ce cours se concentre sur les données structurelles.
Les données spatiales et décoratives seront abordées séparément. voir : tispi_data_rules.md
La grammaire est volontairement simplifiée

L'apprentissage se construit en couches progressives, chacune s'appuyant naturellement sur la précédente.


## sommaire

---

**1. La grammaire de base**
Poser les deux nœuds fondamentaux : Pièce et Face, en alternance stricte. C'est l'axiome de tout le reste.

**2. La compression PF**
Une notation allégée pour le cas fréquent Pièce à Face unique. Réduction du bruit syntaxique.

**3. Les pistes de structure**
Introduire `face`, `tag`, `stop` comme mécanismes autonomes, indépendants de la Pièce qui les porte. C'est le premier saut conceptuel important.

**4. Des cas concrets simples**
Rollover, bouton — appliquer immédiatement les pistes sur des cas réels pour valider la compréhension par la pratique.

**5. La composition**
La Face-groupe comme seul mécanisme d'imbrication. C'est ici que l'arbre devient récursif et que la puissance du modèle apparaît.

**6. L'isolation de timeline**
Découverte du conflit de synchronisation, puis sa résolution par encapsulation dans un groupe. Un apprentissage par l'erreur, volontairement provoqué.

**7. Les pistes de propriété**
`x`, `y` — étendre le mécanisme des pistes à l'animation. Même logique, nouveau domaine d'application.

**8. La réduction en modules**
Encapsuler un sous-arbre répétitif derrière une interface paramètrée. C'est le deuxième saut conceptuel majeur.

---

Chaque étape est un *cas d'usage*, jamais une règle abstraite posée à priori. La grammaire se révèle par l'usage.

# Cours #1 de Tispi 


## La grammaire de base

L'arbre Tispi repose sur **deux nœuds**, qui s'alternent strictement :

- **P** — Pièce
- **F** — Face

---

### La règle fondamentale

Une Pièce contient des Faces. Une Face contient des Pièces. Jamais deux Pièces directement imbriquées, jamais deux Faces directement imbriquées.

- **Pseudo EBNF of node of Tispi**
```
tree     ::= piece
piece    ::= faces*
face     ::= piece* | image | texte | shape
```

Notez que l'alternance Piece / Face  est garantie par structure.

- Sample

```
P racine
  F f0 image "img.png"
  F f1 text "Hello"
```

---

### La Face-groupe

Pour qu'une Face contienne plusieurs Pièces, elle doit être de type `group` :

```
P racine
  F f0 group
    P enfantA
      F f0 image "img.png"
    P enfantB
      F f0 text "Hello"
```

C'est le **seul mécanisme de composition**. Il n'y en a pas d'autre.

---

### Les règles

| Règle | Validité |
|---|---|
| P contient des F | ✅ |
| F de type `group` contient des P | ✅ |
| P directement dans P | ❌ |
| F directement dans F | ❌ |
| F sans contenu (Face vide) | ✅ |
| P sans Face | ✅ |

---

### Ce que cette étape pose

Rien d'autre que l'**alternance** par structure. Pas de logique, pas de temporalité, pas d'interaction. Juste la structure de l'arbre — la grammaire dans sa forme la plus pure.

Tout le reste vient se greffer sur cette ossature.

_______________________________________________________________________________________
_______________________________________________________________________________________
_______________________________________________________________________________________
_______________________________________________________________________________________


_______________________________________________________________________________________


## la compression

La compression réduit plusieurs noeuds de l'arbre en 1 seul.
Important : Une compression ne modifie pas la structure de l'abre alterné. 
Elle conserve la structure dans ce noeud. 
Ce noeud peut à tout moment se redévelopper en ses noeuds initiaux.

### La compression élémentaire : PF

Quand une Pièce ne possède qu'une seule face. on les place dans le même noeud

---

```
P bg 
  F f0 image "page2_bg.png"

deviendra

PF bg  : image "page2_bg.png"
```

PF fusionne le nœud Pièce et sa Face unique en une seule ligne. 
Le noeud PF conserve séparément la partie Piece et la Partie Face.

Syntaxe : PF composant de P : composants de F

Règle de relation hiérarchique.
- PF débute par 'P' (Piece) qui s'accrochera à une Face.
- PF se termine par F (Face), Elle recevra 0, 1 ou plusiurs Pieces.

```
PF root 
  
```



_______________________________________________________________________________________
_______________________________________________________________________________________
_______________________________________________________________________________________
_______________________________________________________________________________________


_______________________________________________________________________________________


## L'animation

### Qu'est-ce qu'une animation ?

Une animation est un mouvement automatique défini par la situation d'origine et la situation destination.
L'animation nécessite un "moteur d'animation" qui fait avancer automatiquement 


### La timeline de la Pièce

La Piece définit l'ordre de opérations dans une timeline, composée de pistes.

Dans la Timeline, chaque piste décrit la 'vie' d'un aspect (Faces), d'une propriété (position, couleur...) ou des actions.

La **tête-de-lecture** indique la positon **en cours** de traitement. 

Syntaxe : 
T - Timeline de l'animation
<indentation> track_name [ num_frame : value ; ... ] 

```
P nameA
  T face[0: f0 ; 10: f2 ; 40: f1]
  T pos[0: 100  200; 5: 20,300]
  T color[10: blue; ]
  F f0 image "im1.png"
  F f1 text "Hello"
  F f2 image "im2.png"
```



_______________________________________________________________________________________
_______________________________________________________________________________________
_______________________________________________________________________________________
_______________________________________________________________________________________


_______________________________________________________________________________________
_______________________________________________________________________________________



## Les pistes de structure

Une Pièce peut porter des **pistes** — des mécanismes autonomes qui se greffent sur elle sans en dépendre.

Il en existe trois, dites *de structure* :

- **face** — quelle Face est active à quelle frame
- **tag** — des marqueurs nommés sur la timeline
- **stop** — des points d'arrêt sur la timeline

---

### T face — la piste de commutation

Elle pilote quelle Face est active à un instant donné.

```
P nameA
  T face[0,f0 ; 10,f2 ; 15,f1]
  F f0 image "im1.png"
  F f1 text "Hello"
  F f2 image "im2.png"
```

La piste cite les Faces — elle ne les contient pas. `f0`, `f1`, `f2` sont des références aux Faces déclarées dans la Pièce.

| Frame | Face active |
|---|---|
| 0 | f0 — image |
| 10 | f2 — image |
| 15 | f1 — texte |

**Règle d'omission** : si la Pièce n'a qu'une seule Face, elle est toujours active — la piste `face` est inutile et peut être omise.

---

### T tag — la piste de marquage

Elle pose des **labels nommés** sur la timeline, utilisables comme points de repère ou cibles de navigation.

```
P button
  T tag[0,MOUSE_OUT ; 1,MOUSE_OVER ; 2,MOUSE_PUSHED]
```

Un Tag est une adresse symbolique sur la timeline. Un pilotage extérieur — souris, logique métier — déplace simplement la tête de lecture vers le Tag visé.
Le Tag est donc traité avec un gotoFrame(Tag); 

Important : le Tag est un état, et non une commande de transition 
Exemple : 
- **MOUSE_OVER** sera révélé par la commande de transition **onmouseover()**
Mais l'état MOUSE_OVER sera aussi révélé par la commande **onmouseup()** si le curseur souris est sur la Pièce.

---

### T stop — la piste de bornage

Elle définit les **temps de pause** de la timeline active.
Le "stop" arrête la tête de lecture sur chaque temps indiqué.

```
P button
  T stop[0 ; 5; 7; 15]
```
La tête de lecture se fige en arrivant sur les temps 0, 7 7 et 15. Ici l'aniamtion ne démarre pas automatiquement.

C'est une précision technique capitale qui change la lecture du système : le `stop` n'est pas une simple zone de friction, c'est un **interrupteur d'état** sur le moteur de la Pièce.

**T stop — la piste de contrôle du moteur**

Le `stop` n'est pas une destination, c'est une commande qui fait basculer la Pièce en mode **statique** (`running = false`).

* Dès que la tête de lecture rencontre un temps marqué par un `stop`, le moteur d'animation s'arrête.
* La Pièce la moteur d'animation repartira à l'appelle la fonction `play()` (qui repasse le flag à `true`).
* Stop autorise le changement de de temps par événement, fonction gotoFrame(TAG) 

**Exemple du bouton :**
```
P button
  T stop[0]
```
Ici, la Pièce se fige dès la frame 0. Même si le curseur de la souris force un `gotoFrame(1)`, le moteur reste à l'arrêt (`running` est toujours `false`) sur la frame 1.

---

### Ce que cela clarifie sur la structure globale

En définissant le `stop` comme un modificateur de flag, nous levons une ambiguïté majeure :
1.  **Le mouvement passif :** On peut naviguer dans une timeline arrêtée (cas du bouton, du sélecteur, des pages) sans jamais relancer le moteur.
2.  **Le mouvement actif :** On utilise le `stop` pour marquer la fin d'une séquence animée (une transition, une explosion, une apparition) qui, une fois terminée, ne doit plus consommer de ressources de calcul d'interpolation.

---

### Les trois pistes ensemble — le bouton

L'exemple canonique qui réunit les trois :

```
P button
  T tag[0,MOUSE_OUT ; 1,MOUSE_OVER ; 2,MOUSE_PUSHED]
  T stop[0]
  T face[0,fOut ; 1,fOver ; 2,fPushed]
  F fOut    image "btn_out.png"
  F fOver   image "btn_over.png"
  F fPushed image "btn_pushed.png"
```

- `tag` nomme les trois états
- `stop` inutile, le groupe ne possède pas d'animation automatique
- `face` bascule l'apparence en conséquence

Chaque piste fait son travail. Aucune ne connaît les deux autres.

### Important
Ici, vous n'avez aucun code à écrire. Le moteur Tispi reconnaît les mots-clés MOUSE_OUT et MOUSE_OVER. Il déplace la tête de lecture de lui-même dès que la souris entre ou sort de la zone.

---

### Ce que cette étape ajoute

L'arbre Pièce/Face est désormais **vivant**. La structure reste la même — l'alternance stricte P/F n'a pas changé. Les pistes viennent simplement se greffer dessus, sans la modifier.

_______________________________________________________________________________________
_______________________________________________________________________________________
_______________________________________________________________________________________
_______________________________________________________________________________________


_______________________________________________________________________________________
_______________________________________________________________________________________
_______________________________________________________________________________________

????

## Des cas concrets simples

L'alternance P/F et les trois pistes de structure sont maintenant appliquées sur des cas réels. Chaque cas introduit un mécanisme supplémentaire, sans jamais modifier la grammaire.

---

### Cas 1 — Le rollover

Deux états visuels : repos et survol.

```
P rollover
  T tag[0,MOUSE_OUT ; 1,MOUSE_OVER]
  T stop[0]
  T face[0,fOut ; 1,fOver]
  F fOut  image "btn_out.png"
  F fOver image "btn_over.png"
```

La timeline est bornée à 2 frames. La souris déplace la tête de lecture vers le Tag visé.

---

### Cas 2 — Le bouton

Trois états : repos, survol, clic.

```
P button
  T tag[0,MOUSE_OUT ; 1,MOUSE_OVER ; 2,MOUSE_PUSHED]
  T stop[0]
  T face[0,fOut ; 1,fOver ; 2,fPushed]
  F fOut    image "btn_out.png"
  F fOver   image "btn_over.png"
  F fPushed image "btn_pushed.png"
```

Même mécanique que le rollover — une frame supplémentaire, un Tag supplémentaire, une Face supplémentaire.

---

### Cas 3 — Enrichir un état

Un état peut contenir plusieurs éléments visuels. `fOver` devient une Face-groupe :

```
P rollover
  T tag[0,MOUSE_OUT ; 1,MOUSE_OVER]
  T stop[0]
  T face[0,fOut ; 1,fOver]
  F fOut  image "btn_out.png"
  F fOver group
    P bg
      F f0 image "btn_over.png"
    P label
      F f0 text "Hello"
```

La grammaire ne change pas. `fOver` est simplement une Face de type `group` — elle ouvre un sous-arbre P/F comme n'importe quel autre groupe.

---

### Cas 4 — Le cadre paginé

Plusieurs pages, navigables par Tags.

```
P pages
  T tag[0,PAGE0 ; 10,PAGE1 ; 20,PAGE2]
  T stop[0]
  T face[0,fPage0 ; 10,fPage1 ; 20,fPage2]
  F fPage0 group
    PF bg    : image "page0_bg.png"
    PF label : text "Page 0"
  F fPage1 group
    PF bg    : image "page1_bg.png"
    PF label : text "Page 1"
  F fPage2 group
    PF bg    : image "page2_bg.png"
    PF label : text "Page 2"
```

Chaque Tag ancre une page. La navigation extérieure déplace la tête de lecture vers `PAGE0`, `PAGE1` ou `PAGE2`. Les Pièces à Face unique sont compressées en `PF`.

---

### Ce que ces cas démontrent

| Cas | Mécanisme introduit |
|---|---|
| Rollover | Tag + Stop + Face — la forme minimale |
| Bouton | Extension à trois états — même logique |
| État enrichi | Face-groupe dans une piste face |
| Cadre paginé | Tags comme système de navigation |

La grammaire ne s'étend pas — elle se **compose**. Chaque cas est une application directe des mêmes règles.




_______________________________________________________________________________________
_______________________________________________________________________________________
_______________________________________________________________________________________
_______________________________________________________________________________________


_______________________________________________________________________________________
_______________________________________________________________________________________
_______________________________________________________________________________________
_______________________________________________________________________________________


## La composition

La Face-groupe est le **seul mécanisme de composition** de Tispi. Elle permet d'imbriquer des Pièces à l'intérieur d'une Face, créant un sous-arbre qui obéit aux mêmes règles P/F.

---

### Le principe

Une Face de type `group` contient des Pièces. Ces Pièces contiennent des Faces. Ces Faces peuvent elles-mêmes être des groupes — et ainsi de suite, sans limite de profondeur.

```
P racine
  F f0 group
    P enfantA
      F f0 image "img.png"
    P enfantB
      F f0 group
        P petitEnfant
          F f0 text "Hello"
```

L'alternance P/F est récursive. La grammaire ne change pas, quelle que soit la profondeur.

---

### Coexistence simultanée

Toutes les Pièces d'un groupe sont **simultanément présentes** — c'est le conteneur Espace. Elles s'affichent ensemble, chacune indépendante.

``` 
P scene
  F f0 group
    P fond
      F f0 image "bg.png"
    P titre
      F f0 text "Bienvenue"
    P bouton
      T tag[0,MOUSE_OUT ; 1,MOUSE_OVER]
      T stop[0]
      T face[0,fOut ; 1,fOver]
      F fOut  image "btn_out.png"
      F fOver image "btn_over.png"
```

`fond`, `titre` et `bouton` coexistent. Chacun vit dans son propre espace de contrôle.

---

### La timeline locale

Chaque Face-groupe crée une **timeline indépendante** pour les Pièces qu'elle contient. Les timelines ne se connaissent pas — elles ne peuvent pas interférer.

C'est ce qui rend possible d'imbriquer un bouton dans une animation sans conflit de synchronisation :

```
P anim
  T stop[0 ; 100]
  T pos[0: 100  200; 5: 20,300]
  F f0 group
    P img
      F f0 image "img.png"
    P isolation
      F f0 group
        P bouton
          T tag[0,MOUSE_OUT ; 1,MOUSE_OVER]
          T stop[0]
          T face[0,fOut ; 1,fOver]
          F fOut  image "btn_out.png"
          F fOver image "btn_over.png"
```

`P anim` progresse de 0 à 100. `P bouton` vit dans son propre groupe — sa timeline de 0 à 1 est totalement isolée. Passer en `MOUSE_OVER` ne perturbe pas l'animation.

---

### La règle de composition

Une seule règle gouverne tout :

> Pour faire coexister plusieurs Pièces, on les place dans une Face-groupe.
> Pour isoler une timeline, on encapsule dans un groupe supplémentaire.

---

### les modules double format 

Toujours un noeud Pièce-root, mais il offre la possibilité de supprimer ce noeud-Piece pour utiliser la Face fille.

Règles pour la Piece-root :
- ne possède qu'une face fille.
- La time line est est fixe, elle ne comporte qu'une seule key maximum par piste, toutes les keys son placées en frame 0. 

Exemple : placer une succession de mécanisme de boutons - next puis return - dans la piste d'un bouton parent.


---

### Ce que la composition apporte

| Besoin | Solution |
|---|---|
| Plusieurs éléments visibles ensemble | Face-groupe contenant plusieurs Pièces |
| Sous-arbre indépendant | Face-groupe comme nouveau contexte |
| Timeline isolée | Encapsulation dans un groupe dédié |
| Profondeur illimitée | Récursivité naturelle de P/F |

La puissance du modèle tient entièrement dans ce mécanisme unique. Il n'y en a pas d'autre.




_______________________________________________________________________________________
_______________________________________________________________________________________
_______________________________________________________________________________________
_______________________________________________________________________________________


_______________________________________________________________________________________



## L'isolation de timeline

Chaque Face-groupe crée une **timeline locale** pour les Pièces qu'elle contient. C'est une conséquence directe de la composition — et une règle critique pour éviter les conflits de synchronisation.

---

### Le problème

Sans isolation, deux Pièces aux timelines différentes partagent le même contexte temporel. Elles entrent en collision.

```
P anim
  T stop[0]
  T face[0,f0 ; 50,f1]
  T pos[0: 100  200; 5: 20,300]
  F f0 image "img.png"
  F f1 group
    P bouton
      T tag[0,MOUSE_OUT ; 1,MOUSE_OVER]
      T stop[0]
      T face[0,fOut ; 1,fOver]
      F fOut  image "btn_out.png"
      F fOver image "btn_over.png"
```

**Le conflit** : quand la souris passe en `MOUSE_OVER`, la tête de lecture du bouton va à la frame 1. Mais `P anim` partage cette timeline — elle est ramenée à la frame 1 également. L'animation repart de zéro.

---

### La cause

`P bouton` est directement dans le groupe de `P anim`. Ils partagent la même timeline. Tout déplacement de tête de lecture dans le bouton affecte l'animation parente.

---

### La solution — encapsuler

Il suffit d'envelopper le bouton dans son propre groupe. Ce groupe crée une timeline locale, totalement étanche.

```
P anim
  T stop[0]
  T pos[0: 100  200; 5: 20,300]
  F f0 group
    P img
    T F f0 image "img.png"
    P isolation
      F f0 group
        P bouton
          T tag[0,MOUSE_OUT ; 1,MOUSE_OVER]
          T stop[0]
          T face[0,fOut ; 1,fOver]
          F fOut  image "btn_out.png"
          F fOver image "btn_over.png"
```

`P isolation` porte une Face-groupe — elle ouvre un nouveau contexte temporel. La timeline du bouton vit à l'intérieur. Elle ne peut plus atteindre la timeline de `P anim`.

---

### La règle

> Toute Pièce qui possède sa propre temporalité doit être encapsulée dans son propre groupe.

---

### Ce qui se passe à chaque niveau

```
P anim          ← timeline 0..100   (animation de position)
  F f0 group
    P img       ← pas de timeline propre, suit le parent
    P isolation ← point d'encapsulation
      F f0 group
        P bouton  ← timeline 0..1   (états souris)
```

Chaque groupe est une **frontière temporelle**. Ce qui se passe à l'intérieur ne franchit pas cette frontière.

---

### Ce que cette étape révèle

L'isolation n'est pas un mécanisme supplémentaire — c'est une **propriété naturelle** de la Face-groupe. Elle existe déjà dans la composition. Il suffit de l'utiliser consciemment, dès qu'une Pièce a sa propre logique temporelle.

| Situation | Action |
|---|---|
| Pièce sans timeline propre | Pas d'encapsulation nécessaire |
| Pièce avec timeline indépendante | Encapsuler dans un groupe dédié |
| Conflit de synchronisation | Chercher le groupe manquant |




_______________________________________________________________________________________
_______________________________________________________________________________________
_______________________________________________________________________________________
_______________________________________________________________________________________


_______________________________________________________________________________________
_______________________________________________________________________________________



## Les pistes de propriété

Les pistes de structure (`face`, `tag`, `stop`) pilotent la logique temporelle d'une Pièce. Les **pistes de propriété** appliquent la même mécanique à des valeurs visuelles — position, taille, opacité, etc.

---

### Le principe

Une piste de propriété interpole une valeur entre deux keyframes. La syntaxe est identique à celle des pistes de structure : `[frame, valeur ; frame, valeur ; ...]`

```
P anim
  T pos[0: 100  200; 5: 20,300]
  F f0 image "img.png"
```

`img.png` se déplace de la position `(0, 0)` à la position `(500, 300)` entre la frame 0 et la frame 100.

---

### Granularité du contrôle

Les pistes se greffent précisément là où elles doivent agir dans l'arbre. C'est ce qui distingue une animation globale d'une animation locale.

**Toute la Pièce se déplace :**

```
P anim
  T pos[0: 100  200; 5: 20,300]
  F f0 group
    P img
      F f0 image "img.png"
    P bouton
      F f0 image "btn.png"
```

`img.png` et `btn.png` bougent ensemble — les pistes sont sur la Pièce parente.

**Seul un élément se déplace :**

```
P anim
  F f0 group
    P img
      T pos[0: 100  200; 5: 20,300]
      F f0 image "img.png"
    P bouton
      F f0 image "btn.png"
```

Les pistes `x` et `y` sont descendues sur `P img` — seule cette Pièce se déplace. `P bouton` reste fixe.

---

### Les pistes de propriété et la piste face

Les pistes de propriété coexistent naturellement avec les pistes de structure. Elles sont orthogonales — elles ne se connaissent pas.

```
P anim
  T stop[50]
  T face[0,f0 ; 50,f1]
  T pos[0: 100  200; 5: 20,300]
  F f0 image "img.png"
  F f1 group
    PF bg    : image "bg.png"
    PF label : text "Hello"
```

- `x` et `y` animent la position sur toute la durée
- `face` bascule l'apparence à la frame 50
- chaque piste fait son travail indépendamment

---

### Placement dans l'arbre

Les pistes de propriété se placent **sous la piste face**, au niveau de la Pièce qu'elles contrôlent.

```
P anim
  T stop[100]      ← piste de structure
  T face[0,f0]         ← piste de structure
  T pos[0: 100  200; 5: 20,300] ← piste de propriété
  F f0 image "img.png"
```

---

### Ce que cette étape ajoute

| Piste | Nature | Contrôle |
|---|---|---|
| `face` | structure | quelle Face est active |
| `tag` | structure | marqueurs sur la timeline |
| `stop` | structure | bornes de la timeline |
| `x`, `y` | propriété | position |
| autres | propriété | opacité, taille, rotation… |

Même mécanique, même syntaxe — un domaine d'application différent. Les pistes de propriété étendent le modèle sans introduire aucun nouveau concept.



_______________________________________________________________________________________
_______________________________________________________________________________________
_______________________________________________________________________________________
_______________________________________________________________________________________



_______________________________________________________________________________________
_______________________________________________________________________________________
_______________________________________________________________________________________



## La réduction en modules

Un sous-arbre récurrent peut être **encapsulé** en module. Le module expose une interface déclarée — ses paramètres — et cache sa mécanique interne. Il se comporte exactement comme une Pièce ordinaire dans l'arbre.

---

### Le principe

Un sous-arbre natif répétitif :

```
P isolation
  F f0 group
    P bouton
      T tag[0,MOUSE_OUT ; 1,MOUSE_OVER ; 2,MOUSE_PUSHED]
      T stop[0]
      T face[0,fOut ; 1,fOver ; 2,fPushed]
      F fOut    image "btn_out.png"
      F fOver   image "btn_over.png"
      F fPushed image "btn_pushed.png"
```

Devient un module :

```
P moduleButton
  doc "Bouton à 3 états"    // informatif
  tags "MOUSE_OUT, MOUSE_OVER, MOUSE_PUSHED" // informatif
  params(
    F --mouse-out,
    F --mouse-over,
    F --mouse-pushed
  )
```

La mécanique interne — tags, stop, piste face, isolation de timeline — est invisible. Le module sait déjà comment gérer ses trois états.

Notez que les paramètres sont typés. Ici, des Face sont attendues

---

### Paramètres

Les paramètres définissent l’interface publique d’un module.  
Chaque paramètre est **typé**, et son type détermine la nature de la valeur attendue.

Les types se répartissent en trois catégories :

1. **Types simples**  
2. **Collections indexées**  
3. **Types structurels (Piece / Face)**

---

#### Types simples

Les types simples représentent des valeurs atomiques.  
Ils sont fournis directement, sans structure interne.

Types simples supportés :

| Type | Description |
|------|-------------|
| `bool` | Valeur booléenne (`true` / `false`) |
| `int` | Entier signé |
| `float` | Nombre flottant |
| `string` | Chaîne de caractères |
| `color` | Valeur de couleur (format dépendant de l’implémentation) |
| `func` | Comporte un script. Ex : utilisé pour l'action clic d'un bouton |


##### Exemple

Déclaration :

```
params(
  bool    --enabled,
  int     --count,
  float   --ratio,
  string  --label,
  color   --tint
  func    --click
)
```

Instanciation :

```
P moduleExample
  --enabled = true
  --count   = 3
  --ratio   = 0.75
  --label   = "Hello"
  --tint    = #FF8800
  --func    = (x,y)=> {this.setPos(x,y);}
```

---

#### Collections indexées**

Une collection est un paramètre **répétable**, identifié par un suffixe `-N`.  
La syntaxe impose que le nom du paramètre se termine par `-N` dans la déclaration.

##### **Déclaration**

```
params(
  F --page-N
)
```

##### Instanciation

```
--page-0 = F ...
--page-1 = F ...
--page-2 = F ...
```

##### Règles

- Les index doivent être continus à partir de 0.  
- Chaque index doit être fourni exactement une fois.  
- Le type de chaque entrée doit respecter le type déclaré.  
- Le module déduit automatiquement la cardinalité et génère les structures internes associées (ex. Tags, pistes, transitions).

---

#### Types structurels : `Piece` et `Face`**

Les paramètres peuvent être typés avec les types structurels suivants :

| Type | Description |
|------|-------------|
| `F` | Attend une Face (simple ou groupe) |
| `P` | Attend une Pièce (sous-arbre complet) |

---

### Les modules courants

**Le rollover :**

```
P moduleRollover
  params(
    F --mouse-out,
    F --mouse-over
  )
```

**Le cadre paginé — paramètre variable :**

```
P modulePages
  params(
    F --page-n
  )
```

Le module déduit le nombre de pages en comptant les entrées `--page-0`, `--page-1`, `--page-2`… fournies à l'usage. Il génère automatiquement les Tags `PAGE0`, `PAGE1`, `PAGE2`…

```
P modulePages
  --page-0 = F group
    PF bg    : image "page0_bg.png"
    PF label : text "Page 0"
  --page-1 = F group
    PF bg    : image "page1_bg.png"
    PF label : text "Page 1"
  --page-2 = F group
    PF bg    : image "page2_bg.png"
    PF label : text "Page 2"
```

---

### Les modules sont des Pièces

Un module s'insère dans l'arbre exactement comme une Pièce ordinaire. Il respecte l'alternance P/F — il n'introduit aucune exception grammaticale.

```
P modulePages
  --page-2 = F group
    PF bg    : image "page2_bg.png"
    PF label : text "Page 2"
    P moduleButton
      --mouse-out    = image "btn_out.png"
      --mouse-over   = image "btn_over.png"
      --mouse-pushed = image "btn_pushed.png"
```

`moduleButton` est directement une Pièce dans le groupe de `--page-2`. Pas de Face enveloppe, pas de groupe intermédiaire — il s'emboîte naturellement.

---

### Ce que cette étape apporte

| Avant le module | Après le module |
|---|---|
| Mécanique reconstruite à chaque usage | Encapsulée une fois, réutilisée sans friction |
| Structure interne visible | Interface seule exposée |
| Erreurs d'oubli possibles | Comportement garanti par le module |

La complexité ne disparaît pas — elle se déplace vers l'intérieur du module. L'arbre d'usage reste lisible, minimal, composable. C'est le principe **@Lego** : des briques autonomes à interface déclarée, qui s'emboîtent sans se connaître.


_______________________________________________________________________________________
_______________________________________________________________________________________
_______________________________________________________________________________________
_______________________________________________________________________________________

_______________________________________________________________________________________

_______________________________________________________________________________________
_______________________________________________________________________________________
_______________________________________________________________________________________
_______________________________________________________________________________________




## Composition par empilement

Chaque module est une brique autonome, à interface déclarée, qui s'emboîte dans l'arbre sans friction. moduleButton s'insère dans modulePages comme une brique Lego dans une autre — sans connaître son contexte, sans modifier la grammaire.


```
P modulePages
  --page-0 = F group
    PF bg    : image "page0_bg.png"
    PF label : text "Page 0"
  --page-1 = F group
    PF bg    : image "page1_bg.png"
    PF label : text "Page 1"
  --page-2 = F group
    PF bg    : image "page2_bg.png"
    PF label : text "Page 2"
    P moduleButton
      --mouse-out    = F image "btn_out.png"
      --mouse-over   = F image "btn_over.png"
      --mouse-pushed = F image "btn_pushed.png"
```

## Tispi a quelques pièges classiques :

### oublier un groupe pour isoler une timeline

### mettre une piste dans une Face au lieu d’une Pièce

### confondre PF avec une fusion logique

### oublier que les modules sont des Pièces

### oublier que stop autorise les Tag et les gotoFrame()

### Le type de paramètre dans un module.

Le moteur Tispi vérifie si un paramètre est de mauvais type dans un module, 

### Rappel : Tag est un état, pas une commande. 

Comme en CSS : hover est l'état survolé. il est activé aussi bien quand la curseur souris entre dans la Piece que quand le bouton souris est relaché au-dessus de la Piece


