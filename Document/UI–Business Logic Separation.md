# Loi 2 — Séparation Tispi / Métier

Tispi se concentre exclusivement sur l'interface utilisateur — sa structure, ses états, ses rendus. Il ne prend aucune décision, n'effectue aucun calcul conditionnel, et ne possède pas d'initiative propre. Son rôle est de **recevoir**, **manifester** et **notifier**.

Le métier reste extérieur à Tispi. C'est lui qui **déclenche**, **calcule** et **décide**. La causalité réside toujours dans la couche métier.

---

## Le contrat d'interface

La relation est bidirectionnelle et formellement définie.

### Métier → Tispi

- **Balises d'état**
  Le métier envoie une commande qui modifie l'état interne d'une Pièce. Ces commandes sont analogues à des `gotoState` ou `gotoFrame` externes : elles ordonnent un changement sans que la Pièce ait à décider quoi que ce soit. Exemples : `mode = "edit"`, `animation = "jouer"`, `visible = true`.

- **Keys**
  Le métier écrit des valeurs dans les pistes de données. Chaque key est associée à une **propriété** qui décrit comment cette valeur se traduit en effet sur les Faces (couleur, position, texte, rotation, etc.).
  Le système de propriétés est **extensible** : le contenu d'une key n'est pas contraint (nombre, chaîne, vecteur, fonction, etc.), seule l'interprétation par la propriété importe. Ainsi, on peut définir de nouveaux comportements de rendu sans modifier le noyau de Tispi.

### Tispi → Métier

- **Événements structurels**
  Tispi notifie le métier de faits purement mécaniques : fin d'une séquence, fin d'une animation, collision détectée, changement de direction, atteinte d'une borne, etc. Ces événements sont des **constats** émis par les modules internes ou les pistes actives. Le métier les reçoit et décide de la suite à donner.
  Tispi ne réagit jamais directement à ses propres événements — il se contente de les signaler.

---

## Principe de séparation mécanique / décisionnel

Tispi distingue deux catégories de réactions internes :

**La décoration** regroupe tout comportement visuel ou sonore autonome, déterministe et indépendant du contexte métier. Le rebond d'une balle, un clignotement, un dégradé animé, un rollover — Tispi les gère entièrement sans consulter le métier. Ces comportements sont des **règles mécaniques préprogrammées** : elles produisent toujours le même résultat pour les mêmes conditions initiales, et peuvent s'appliquer à n'importe quelle piste — position, couleur, opacité, son, etc.

La décoration peut notifier le métier — fin de rebond, collision, changement de direction — mais elle n'attend rien de lui pour fonctionner.

**Le comportement** implique une décision contextuelle dépendante d'une règle métier, d'un état applicatif ou d'une donnée externe. Tispi ne décide jamais — il exécute ce que le métier lui commande via les balises d'état et les keys.

La frontière est donc :

```
Décoration   → Tispi gère seul. Déterministe, autonome, notifie si utile.
Comportement → Le métier décide. Tispi exécute.
```

Cette organisation garantit que Tispi reste une mécanique prévisible, tandis que le métier demeure l'unique orchestrateur des choix applicatifs.

---

## Comparaison avec le backend

La relation Tispi / métier est structurellement identique à la relation table / logique backend.

```
Table backend           Tispi
──────────────────      ──────────────────
colonnes                keys (avec propriétés)
triggers entrants       balises d'état
UPDATE/INSERT           écriture métier
triggers sortants       événements structurels
rendu SQL               rendu UI
```

Les tables ne calculent pas — elles contiennent et notifient. Le SQL et les scripts forment la logique. De même, Tispi ne décide pas — il structure, manifeste et notifie. Le métier forme la logique applicative.

---

## Avantages de ce choix formel

**Testabilité indépendante.**
Tispi peut être validé sans métier : on vérifie que les états s'affichent correctement, que les keys reçoivent les valeurs, que les animations se déclenchent et que les événements sont émis. Le métier peut être testé sans Tispi : on vérifie que les calculs sont justes et que les commandes sont émises au bon moment.

**Remplaçabilité.**
Le moteur de rendu peut changer sans toucher au métier. La logique métier peut évoluer sans modifier la structure Tispi. Les deux mondes sont étanches.

**Lisibilité.**
Un développeur métier n'a pas besoin de comprendre la structure interne de Tispi — il connaît les balises, les keys et les événements. Un concepteur Tispi n'a pas besoin de connaître la logique métier — il connaît les points de contact.

**Stabilité.**
La structure Tispi ne change pas quand la logique métier évolue. C'est une propriété rare dans le frontend actuel où un changement de règle métier entraîne souvent une réécriture de composants.

**Réutilisabilité.**
Une structure Tispi peut être connectée à des métiers différents sans modification. C'est la même table — avec des scripts différents.

**Extensibilité.**
Le système de propriétés associé aux keys permet d'enrichir les capacités de rendu sans toucher au cœur de Tispi, en ajoutant de nouvelles interprétations pour les valeurs.

---
