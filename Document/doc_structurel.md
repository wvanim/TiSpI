# TiSpI — Time/Space Interleaved

This document presents the structural part of TiSpI.

Deeply impressed by the logical simplicity of a processor, I sought to structure and simplify the mechanisms underlying user interface processing. At the core of this approach is a tree that strictly alternates time and space.

The document's data follows this structure, while behavioral rules govern its evolution over time. This simple organization gives rise to capabilities that emerge without being explicitly programmed: the editor itself is built with its own tools.

TiSpI proposes a formalization of UI processing. Since 1999, it has been implemented in Java applets, then in SWF/Flash, and now in HTML.

<p align="center">
  <a href="https://www.wvanim.fr/p/tispi_agent_prompt.html" >
  <img
    src="https://www.wvanim.fr/_demo/present_tispi.png"
    alt="Temps / Espace"
    width="350"
  ><br>
    <sub>See IA compatibility -> Agentic training (clic image)</sub>
  </a>
</p>

## 1. Law 1: The Atomic Unit — Piece / Face

 Tispi — Time/Space Interleaved — is an engine that drives a component tree in which time and space strictly alternate.  :  
 - Time/Space/Time/Space/..
 Here, we present it applied to user interfaces, its original domain.

The model takes its cue from real life. A real-world object changes throughout its life while keeping its identity — in Tispi, the Piece plays the part of the object.  
At any given moment, this object presents an aspect: its Face. The Face is not an image attached to the Piece; it is the Piece itself, in its visible and audible form.

Thus, we decompose any interface component along two fundamental axes: **the axis of time**, which carries its identity and logic (the Piece), and **the axis of space**, which carries its instantaneous manifestations (the Faces).
<p align="center">
  <a href="https://www.wvanim.fr/projets_perso/tispi/doc/tispi_node_animated/html/structure.html">
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
  <a href="https://www.wvanim.fr/projets_perso/tispi/doc/tispi_node_animated2/structure1.html">
    <img
      src="https://www.wvanim.fr/_demo/plate_motor.jpg"
      alt="Diagramme Piece / Face"
      width="75%"
    ><br>
    <sub>Plateau de 2 pièces synchronisées (click image)</sub>
  </a>
</p>

## 3. L'arbre

### Notion élémentaire de l''Interface Utilisateur, mis en évidence dans l'éditeurs.

La combinaison du temps et de l'espace est une notion élémentaire de l'interface utilisateur.

<p align="center"><img
  src="https://www.wvanim.fr/_demo/time_space.png"
  alt="Temps / Espace"
  width="50%"
></p>

### Le mécanisme de l'activation des branches par le composant temporel (la Piece).

Tispi les combine en les **alternant** : la particularité du modèle réside dans l'alternance stricte des Pièces et des Faces. Elles exposent des tableaux orthogonaux : temps | espace

<p align="center">
           
  <a href="https://www.wvanim.fr/projets_perso/tispi/schema_piece_face.html">
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
  <a href="https://www.wvanim.fr/projets_perso/tispi/schema_piece_face.html">
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


### Barre de temps - animation

Usage traditionnel de la barre-de-temps. Tableau composé de keys et d'intervalles avant, après et entre les keys.
Les pistes de Tispi décrivent de façon classique les keys, mais il décrit aussi les transformation et les effets d'apparition sur le keys

<p align="center">
  <a href="https://www.wvanim.fr/_demo/present/wvanim-2004-en.html">
    <img
      src="https://www.wvanim.fr/_demo/present/timebar_wvanim.png"
      alt="Diagramme Piece / Face"
      width="40%"
    ><br>
    <sub>Plateau de 2 pièces synchronisées (click image)</sub>
  </a>
</p>

### Slave d'une valeur master - listener de valeur continue

La barre de temps est pilotée par une valeur externe.  
C'est un mécanisme fondamentale de Tispi.

Ici la barre de temps de l'animation est assujettie à la timeline de la vidéo.
La synchro se positionne en listener d'une source. 
- ici "&synchro @master=face;" force la Pièce à écouter la face
- et "&videoSynchro" envoie à la Pièce les informations du pilotage et de synchro de la vidéo
```html
<!-- ════════════════════════════════════════════════════════════════
     player : sa face porte la vidéo. &synchro !<face> ne cale pas *player*
     mais l'HORLOGE DU PLATEAU (ici le <body>) sur la vidéo :
     requestMasterFromFace → la piste &videoSynchro de la face fournit le
     TsiVideoClockMasterService. 1 plateau = 1 horloge → toutes les Pièces
     sœurs (tag…) suivent la vidéo, et se figent quand elle s'arrête.
     ════════════════════════════════════════════════════════════════ -->
<tsi-p id="player" data-tsi="&synchro @master=face; 0:; &pos 40,40;">
  <tsi-f id="screen" data-tsi='&videoSynchro "avion.mp4", controls; &size 640,360;'></tsi-f>
</tsi-p>
```
La synchro pièce serait, de façon identique, pilotée par un pièce parent ou une jauge placée dans la Face.
<p align="center">
  <a href="https://www.wvanim.fr/video.html">
    <img
      src="https://www.wvanim.fr/_demo/video_synchro.png"
      alt="Diagramme Piece / Face"
      width="40%"
    ><br>
    <sub>Plateau de 2 pièces synchronisées (click image)</sub>
  </a>
</p>

## 4 - les pistes

### Qu'est-ce qu'une propriété ? 

Un composant UI est défini par l'ensemble de ses propriétés et des actions appliquées à ces propriétés.

Les propriété définissent l'aspect et la situation spatial du composant.  
Notemment Son évolution structurelle que nous nommerons "succession de faces".
   par exemple : les ???
   
Mais aussi l'aspect géométrique. Traditionnellement : position, échelle, rotation...  
Et enfin la décoration : couleur, bordure...

### Une piste par propriété

La barre de temps est divisée en pistes.

Chaque piste prend en charge une propriété 

<p align="center">
  <a href="https://www.wvanim.fr/_demo/tispi002.png">
    <img
      src="https://www.wvanim.fr/_demo/tispi002.png"
      alt="Diagramme Piece / Face"
      width="60%"
    ><br>
    <sub>Piste par propriété, chacune décrit les keys et les intervalle</sub>
  </a>
</p>


### Les 3 rôles des propriétés 

Les propriété sont classées suivant l'étendu de leur influence
- rôle structurel : modifie la structure active. Par exemple, le changement d'état désactive une branche pour un activer une autre.
Cette propriété agit au niveau de l'arbre.
- rôle spatial : pilote des pièces pour organiser l'occupation de l'espace d'affichage ou sonore à l'écran.
Cette propriété agit au niveau du plateau
- rôle décoratif : définit l'aspect du rendu.
Cette propriété agit sur les faces 

Ces rôles seront utiles pour le traitement IA. Certain prompts concernerons un rôle uniquement.

#### structurel : les pistes &face et &action

La structure est pilotée par les pistes de face et les pistes d'actions.

```html
<!-- ════════════════════════════════════════════════════════════════ 
    La piste &face décrit les informations utiles à la structure
    Pour chaque key : <effet d'apparition> numFrame: faceName;
    ════════════════════════════════════════════════════════════════-->
<tsi-p id="myPiece" data-tsi="
 &synchro 0:stop;
 &face <60:ease,fade,2> 0:faceOut; <20:easeIn,flash> 1:faceOver; <0:> 2:facePushed; 
">
    <tsi-f id="faceOut" > <!-- branche de l'états out --> </tsi-f>
    <tsi-f id="faceOver" >  <!-- branche de l'états over -->  </tsi-f>
    <tsi-f id="facePushed">  <!-- branche de l'états pushed -->  </tsi-f>
</tsi-P>
```

<p align="center">
  <a href="https://www.wvanim.fr/projets_perso/tispi/schema_piece_face.html">
    <img
      src="https://www.wvanim.fr/_demo/arbre_chat001c.png"
      alt="Diagramme Piece / Face"
      width="80%"
    ><br>
    <sub>Idem 3. l'arbre / Le mécanisme de l'activation des branches</sub>
  </a>
</p>

#### spatial et décorative

Exemples de pistes :
- Spatial : &top, &left, &scale, &rotate.
- décoration : &color, &background, &textSize.

Le traitement spatial et décoratif seront traitées par ailleurs

## 5. La modularité de l'arbre

L'arbre est structurellement modulaire. Chaque branche peut s'isoler ou se copier, puis se replacer ailleurs dans l'arbre.

Notons que des fonctions peuvent traverser les limites hiérarchiques. Celles-ci contraignent alors 2 noeuds et suppriment la modularité.
Des outils de Tispi permette de composer des noeuds "frontières", protéger un bas à sable. Ils composeront ainsi des branche modulaires sécurisées.  

### La branche peut comporter des variables "paramétres" et des noeuds de sorties

Ceci produit des modules paramétrables.

Par exemple, le module Mahjong permet de composer de nouveaux plateaux et d'ajouter ses propres tuiles.
Le créateur du module a exporté le groupe, puis placé dans une bibliothèque online.

<p align="center">
  <a href="https://serveur1.archive-host.com/membres/up/1773583014/index/jeu_mahjong/choix_layouts/layouts_deux_colonnes.html">
    <img
      src="https://www.wvanim.fr/_demo/mahjong001.png"
      alt="Jeu de Mahjong parmétrable"
      width="65%"
    ><br>
    <sub>Quelques exemples de composition de plateau à jouer</sub>
  </a>
</p>


### 6. 
