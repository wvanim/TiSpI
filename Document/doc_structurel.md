# Historic

Créé en 1999 pour l'éditeur d'animation e-anim, la structure Time/Space Interleave a exporté les animations en Java, en Flash et actuellement en Html.
<p align="center">
  <a href="https://www.wvanim.fr/">
    <img
      src="https://www.wvanim.fr/_demo/e-anim.png"
      alt="Diagramme Piece / Face"
      width="60%"
    ><br>
    Actuellement en conversion pour s'adapter au traitement IA
  </a>
</p>


# Law 1: The Atomic Unit — Piece / Face

 Tispi — Time/Space Interleaved — is an engine that drives a component tree in which time and space strictly alternate.  :  
 - Time/Space/Time/Space/..
 Here, we present it applied to user interfaces, its original domain.

The model takes its cue from real life. A real-world object changes throughout its life while keeping its identity — in Tispi, the Piece plays the part of the object.  
At any given moment, this object presents an aspect: its Face. The Face is not an image attached to the Piece; it is the Piece itself, in its visible and audible form.

Thus, we decompose any interface component along two fundamental axes: **the axis of time**, which carries its identity and logic (the Piece), and **the axis of space**, which carries its instantaneous manifestations (the Faces).
<p align="center"">
  <a href="https://www.wvanim.fr/projets_perso/tipsi/doc/tispi_node_animated/html/structure.html"  style="font-size:6px;>
    <img
      src="https://www.wvanim.fr/_demo/tispi_piece.png"
      alt="Diagramme Piece / Face"
      width="40%"
    ><br>
    A Piece displays its Faces one after another (click here)
  </a>
  
</p>

## 1. le plateau

Les Groupes sont des Faces. L''arbre Tispi peut se présenter ainsi : Piece/Groups/Pieces/Groups/.../Piece/Face

Les Pieces enfants directs d'un groupe forment un plateau. Le plateau est une notion théorique utilisé pour la documentation.

Les pièces d'un plateau sont synchronisées. Comme vous pouvez le constater dans cette animation en cliquant ci-dessous.

<p align="center">
  <a href="https://www.wvanim.fr/projets_perso/tipsi/doc/tispi_node_animated2/structure1.html">
    <img
      src="https://www.wvanim.fr/_demo/plate_motor.jpg"
      alt="Diagramme Piece / Face"
      width="75%"
    ><br>
    Plateau de 2 pièces synchronisées (click here)
  </a>
</p>

## 2 - L'arbre

Donc les Pieces et les Faces exposent des tableau orthogonaux : temps | Face

<p align="center">
  <a href="https://www.wvanim.fr/projets_perso/tipsi/schema_piece_face.html">
    <img
      src="https://www.wvanim.fr/_demo/tispi003a.png"
      alt="Diagramme Piece / Face"
      width="100%"
    ><br>
    Tree Time/Space Interleaved (click here)
  </a>
</p>

## 3 - les rôle de la barre de temps

### Barre d'états - listener de valeur discrète

### Barre de temps

### Slave d'une valeur master - listener de valeur continue
