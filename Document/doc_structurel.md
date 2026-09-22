Présentation de la partie structurelle, composition et modification, de Time/Space Interleaved - TiSpI. 
<p align="center"><img
  src="https://www.wvanim.fr/_demo/tree_cristal_robot_part2.png"
  alt="Temps / Espace"
  width="50%"
></p>


# Historic

Créé en 1999 pour l'éditeur d'animation e-anim, la structure Time/Space Interleave a exporté les animations en Java, en Flash et actuellement en Html.
<p align="center">
  <a href="https://www.wvanim.fr/">
    <img
      src="https://www.wvanim.fr/_demo/e-anim.png"
      alt="Diagramme Piece / Face"
      width="60%"
    ><br>
    <sub>Actuellement en conversion pour s'adapter au traitement IA</sub>
  </a>
</p>

# Tree Piece / Face Interleaved

## 1. Law 1: The Atomic Unit — Piece / Face

 Tispi — Time/Space Interleaved — is an engine that drives a component tree in which time and space strictly alternate.  :  
 - Time/Space/Time/Space/..
 Here, we present it applied to user interfaces, its original domain.

The model takes its cue from real life. A real-world object changes throughout its life while keeping its identity — in Tispi, the Piece plays the part of the object.  
At any given moment, this object presents an aspect: its Face. The Face is not an image attached to the Piece; it is the Piece itself, in its visible and audible form.

Thus, we decompose any interface component along two fundamental axes: **the axis of time**, which carries its identity and logic (the Piece), and **the axis of space**, which carries its instantaneous manifestations (the Faces).
<p align="center">
  <a href="https://www.wvanim.fr/projets_perso/tipsi/doc/tispi_node_animated/html/structure.html">
    <img
      src="https://www.wvanim.fr/_demo/tispi_piece.png"
      alt="Diagramme Piece / Face"
      width="40%"
    ><br>
    <sub>A Piece displays its Faces one after another (click image)</sub>
  </a>
</p>

## 2. le plateau

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
    <sub>Plateau de 2 pièces synchronisées (click image)</sub>
  </a>
</p>

## 3. L'arbre

La combinaison du temps et de l'espace est une notion élémentaire de l'interface utilisateur.

<p align="center"><img
  src="https://www.wvanim.fr/_demo/time_space.png"
  alt="Temps / Espace"
  width="50%"
></p>

Tispi les combine en les **alternant** : la particularité du modèle réside dans l'alternance stricte des Pièces et des Faces. Elles exposent des tableaux orthogonaux : temps | espace

<p align="center">
  <a href="https://www.wvanim.fr/projets_perso/tipsi/schema_piece_face.html">
    <img
      src="https://www.wvanim.fr/_demo/tispi003a.png"
      alt="Diagramme Pièce / Face"
      width="85%"
    ><br>
    <sub>Tree Time/Space Interleaved (click image)</sub>
  </a>
</p>

## 4 - les rôle de la barre de temps

### Barre d'états - listener de valeur discrète

La préhistoire de e-anim proposait une éditeurs dynamique, avec pages, boutons, roll-over, cadres paginés...
Ces contrôles étaient pilotés des tables à état.
Mécaniquement il s'agit d'outils réactifs à des événements sur un nombre défini d'état : un listener de valeur discrètes.
<p align="center">
  <a href="https://www.wvanim.fr/projets_perso/tipsi/schema_piece_face.html">
    <img
      src="https://www.wvanim.fr/_demo/button_user.png"
      alt="Diagramme Piece / Face"
      width="60%"
    >
    <img
      src="https://www.wvanim.fr/_demo/button_motor.png"
      alt="Diagramme Piece / Face"
      width="60%"
    >
    <br>
    <sub>Tree Time/Space Interleaved (click image)</sub>
  </a>
</p>


### Barre de temps

### Slave d'une valeur master - listener de valeur continue
