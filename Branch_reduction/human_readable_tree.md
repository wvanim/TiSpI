# 1) Nature de la présentation

Il s’agit d’une :

> **Représentation linéaire minimale d’un arbre typé alternant deux catégories de nœuds : pièces (P) et faces (F)**.
Présentation élémentaire, la plus succincte possible de l’arbre.

Caractéristiques :

* arbre strictement alterné (`P → F → P → F`)
* adressage par **nom pour P**
* adressage par **index pour F**
* navigation par **chemin hiérarchique**

---

# 2) Type formel de structure

On peut la qualifier comme :

* **arbre biparti alterné**
* **arbre typé à profondeur contrainte**
* **arbre alterné typé (Temps/Espace)**

Structure générique :

```text
P(name)
  F(index)
    P(name)
      F(index)
```

---

# 3) Notation de chemin

La syntaxe :

```text
root[0].pages[1]
```

Ou bien accès directe :

```text
pages[1]
```

---

# 4) Propriétés structurantes

### 1. Alternance obligatoire

Un chemin valide respecte :

```text
P → F → P → F
```

Donc :

```text
nom[index].nom[index]
```

### 2. Typage implicite par position

La racine est toujours une pièce (P).

| position dans le chemin | type |
| ----------------------- | ---- |
| 0                       | P    |
| 1                       | F    |
| 2                       | P    |
| 3                       | F    |

---

# 5) Comment je la décrirais formellement

> C’est une **notation de navigation hiérarchique sur un arbre alterné typé Temps/Espace.**, où les pièces (`P`) sont identifiées par nom et les faces (`F`) par index positionnel.

---

# 6) Version synthétique

Si je devais la nommer :

* **Arbre alterné indexé**
* **Notation P/F hiérarchique**
* **Chemin Temps/Espace**

---

# 7) Ce qu’elle n’est pas

Ce n’est pas :

* une simple indentation visuelle
* une numérotation de profondeur
* un identifiant global

C’est une **adresse structurelle**.

---

# 8) Formulation canonique possible pour ta spécification

> Le modèle Time/Space est représenté comme un arbre alterné de pièces (P) et de faces (F).
> Les pièces sont nommées, les faces sont indexées.
> L’adressage se fait par un chemin hiérarchique de la forme :
> `nom[index].nom[index]...`

---
______________________________________________________________________________________
## exemple de pages successives en développé

Les groupe et les faces de rendus sont désignés par le type F.
Règle : toute pièce apparaissant dans une face-groupe constitue un domaine temporel distinct.

### Pages-successives placée dans un groupe

P(root          // Piece racine
  F(0           // Groupe principal - affichage dans fenêtre
    P(page_successives  // Piece affichant les pages successives
      F(0       // Groupe comportant les pages, pour isoler les pages du synchronisme du groupe parent
        P(pages // Pieces affichant les pages successivement 
          F(0)   // Groupe de la page 0
          F(1)   // Groupe de la page 1   
          F(2)  // Groupe de la page 2
        )
      )
    )
    P(menu      // Piece menu  
      F(0 ...)      // Exemple non décrit.
    )
  )
)

### Pages-successives affichée après une image.

P(root     // Piece racine
  F(0      // Groupe principal - affichage dans fenêtre
    P(présentation  // Pièce affichant successivement une image puis des pages successives 
      F(0)           // image 
      F(1           // groupe de pages successives
        P(pages     // Pieces affichant les pages successivivement
          F(0)       // Groupe de la page 0
          F(1)       // Groupe de la page 1   
          F(2)      // Groupe de la page 2
        )
      )
    )
    P(menu          // Piece menu  
      F(0 ...)      // Exemple non décrit.
    )
  )
)


### Bouton

#### Un exemple d'état du bouton

```
F(5
  P(icon F(0 check))
  P(libellé F(0 "Validé !"))
  bg #28a745   // Exemple de style fixe, propriété du groupe.
)
```

### Quelques observations rapides sur cette structure

- il s'agit d'une structure simplifiée présentant surtout la partie "comportement" du bouton.
Quelques élement de "décoration" sont présent pour visualiser le bouton. Mais ils n'ont aucun impacte sur le traitement.  
- **P(icon)** et **P(libellé)** sont deux domaines temporels distincts → même si aujourd’hui on ne leur donne pas de comportement temporel différent, on garde la possibilité future d’animer l’icône indépendamment du texte (ex. : scale-up de l’icône dès t=0, fade-in du texte à t=0.3s).
- Le **couleur-fond** (ou bg) est appliqué au niveau **F(5)**, donc il affecte tout le groupe parent (l’ensemble icône + texte).
- Pas de layout explicite ici → on suppose que le système a un layout par défaut (row, center, gap-8) au niveau F(5), ou qu’il est hérité du bouton global.

### Proposition d’intégration complète dans le bouton (version finale compacte)

```
P(bouton-primary
  F(0 // racine spatiale du bouton
    P(états
      F(0 // normal
        P(contenu F(0 texte "Valider" color white))
        bg #007bff
      )
      F(1 // hover
        P(contenu F(0 texte "Valider" color white))
        bg #0056b3
        shadow sm
      )
      F(2 // pressed
        P(contenu F(0 texte "Valider" color white))
        bg #004085
        translate-y 1px
      )
      F(3 // disabled
        P(contenu F(0 texte "Valider" color white opacity 0.7))
        bg #6c757d
        cursor not-allowed
      )
      F(4 // loading
        P(contenu F(0 spinner + texte "En cours…" color gray))
        bg #6c757d opacity 0.8
      )
      F(5 // success
        P(icon F(0 check))
        P(libellé F(0 "Validé !"))
        bg #28a745
      )
      F(6 // error
        P(icon F(0 ×))
        P(libellé F(0 "Erreur"))
        bg #dc3545
      )
    )
  )
)
```

Chaque état (F) contient soit un P(contenu) pour les cas simples, soit plusieurs P pour les cas composés (icône + texte).


