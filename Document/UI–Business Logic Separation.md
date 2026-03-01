# **Loi 2 — Séparation Tispi / Métier**

Tispi se concentre exclusivement sur l'UI — sa structure, ses états, ses rendus. Il ne calcule pas, ne décide pas, ne cause rien. Il reçoit, manifeste, et notifie.

Le métier reste extérieur à Tispi. C'est lui qui déclenche, calcule et cause.

### **Le contrat d'interface**

La relation est bidirectionnelle.

*Métier → Tispi*
- Les **balises d'état** — le métier envoie une commande, Tispi change d'état.
- Les **keys** — le métier écrit des valeurs, Tispi les affiche.

*Tispi → Métier*
- Les **événements structurels** — Tispi notifie le métier de faits mécaniques : fin de séquence, fin d'animation, fin de son, etc. Le métier décide quoi en faire.

Tispi ne décide pas — il observe sa propre mécanique et en informe le métier. La causalité reste toujours du côté du métier.

### **Comparaison avec le backend**

La relation Tispi / métier est structurellement identique à la relation table / logique backend.

```
Table backend           Tispi
──────────────────      ──────────────────
colonnes                keys
triggers entrants       balises d'état
UPDATE/INSERT           écriture métier
triggers sortants       événements Tispi → métier
rendu SQL               rendu UI
```

Les tables ne calculent pas — elles contiennent et notifient. Le SQL et les scripts forment la logique. De même, Tispi ne calcule pas — il structure, manifeste et notifie. Le métier forme la logique.

### **Avantages de ce choix formel**

*Testabilité indépendante.* Tispi peut être validé sans métier — on vérifie que les états s'affichent correctement, que les keys reçoivent les valeurs, que les animations se déclenchent et que les événements sont émis. Le métier peut être testé sans Tispi — on vérifie que les calculs sont justes, que les commandes sont émises au bon moment.

*Remplaçabilité.* Le moteur de rendu peut changer sans toucher au métier. La logique métier peut évoluer sans modifier la structure Tispi. Les deux mondes sont étanches.

*Lisibilité.* Un développeur métier n'a pas besoin de comprendre la structure interne de Tispi — il connaît les balises, les keys et les événements. Un concepteur Tispi n'a pas besoin de connaître la logique métier — il connaît les points de contact.

*Stabilité.* La structure Tispi ne change pas quand la logique métier évolue. C'est une propriété rare dans le frontend actuel où un changement de règle métier entraîne souvent une réécriture de composants.

*Réutilisabilité.* Une structure Tispi peut être connectée à des métiers différents sans modification. C'est la même table — avec des scripts différents.
