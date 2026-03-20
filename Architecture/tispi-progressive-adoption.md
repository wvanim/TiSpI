Voici une base de conception exploitable pour l’adoption progressive de **TiSpI** en tant que modèle **Temps / Espace** superposé à HTML/CSS, avec une librairie TypeScript, un éditeur visuel et un format d’échange IA.

# 1. Positionnement

TiSpI doit rester :

* **surcouche** de HTML/CSS, sans redéfinir le DOM ;
* **orienté exécution CSS**, pas moteur d’animation propriétaire ;
* **progressif**, donc intégrable dans une base React existante ;
* **sérialisable en JSON**, pour édition, export, IA et round-trip.

L’idée centrale est saine :

* le **CSS exécute** ;
* le **runtime TypeScript orchestre** ;
* l’**éditeur manipule un graphe logique** ;
* l’’**IA échange un sous-arbre simplifié**.

---

# 2. Principe architectural

## 2.1 Séparation nette des responsabilités

### A. Noyau de modèle

Décrit les objets TiSpI indépendamment du DOM.

Responsabilités :

* structure des scènes / éléments / états / transitions ;
* représentation JSON canonique ;
* validation ;
* transformations de modèle.

### B. Parser / générateur CSS

Convertit entre représentation TiSpI et CSS.

Responsabilités :

* `JSON -> CSS`
* `CSS -> JSON`
* gestion des variables CSS (`--state`, `--progress`, etc.) ;
* règles, sélecteurs, pseudo-états, animations.

### C. Runtime d’exécution

Pilote le DOM et écoute les événements.

Responsabilités :

* injecter classes, attributs, variables CSS ;
* déclencher des opérations ;
* écouter `transitionend`, `animationend`, événements utilisateur ;
* synchroniser état logique et état rendu.

### D. Adaptateurs framework

Pont avec React, puis éventuellement Vue/Svelte.

Responsabilités :

* hooks ;
* composants de binding ;
* synchronisation avec état applicatif.

### E. Éditeur visuel

Construit et modifie le modèle TiSpI.

Responsabilités :

* édition graphique ;
* import/export ;
* inspection des états, transitions, décorations ;
* préprocessing IA.

---

# 3. Modèle conceptuel minimal

Je recommande un noyau autour de 5 concepts :

## 3.1 `Node`

Élément logique ciblant un ou plusieurs nœuds DOM.

## 3.2 `Behavior`

Décrit les états, événements, transitions, règles temporelles.

## 3.3 `Decoration`

Décrit l’apparence, les variables CSS, les styles dynamiques.

## 3.4 `Operation`

Action demandée au runtime : lancer un état, faire progresser, attendre une fin.

## 3.5 `Binding`

Lien entre modèle TiSpI et environnement d’exécution (DOM, React props, événements).

---

# 4. Format JSON canonique

Il faut un format **simple, strict, versionné**, conçu pour le round-trip.

Exemple de base :

```json
{
  "version": "0.1",
  "scene": {
    "id": "root",
    "nodes": [
      {
        "id": "button.primary",
        "selector": ".primary-button",
        "behavior": {
          "states": ["idle", "hover", "pressed", "disabled"],
          "transitions": [
            {
              "from": "idle",
              "to": "hover",
              "on": "pointerenter"
            },
            {
              "from": "hover",
              "to": "idle",
              "on": "pointerleave"
            },
            {
              "from": "hover",
              "to": "pressed",
              "on": "pointerdown"
            }
          ]
        },
        "decoration": {
          "vars": {
            "--progress": 0,
            "--scale": 1
          },
          "styles": {
            "idle": {
              "opacity": 1,
              "transform": "scale(1)"
            },
            "hover": {
              "transform": "scale(1.03)"
            },
            "pressed": {
              "transform": "scale(0.98)"
            },
            "disabled": {
              "opacity": 0.4,
              "pointer-events": "none"
            }
          },
          "timing": {
            "default": "160ms ease-out"
          }
        }
      }
    ]
  }
}
```

## Pourquoi ce format est robuste

* **sépare comportement et décoration** ;
* reste **lisible par humain** ;
* facile à filtrer pour l’IA ;
* compatible avec export CSS ;
* extensible via `meta`, `tokens`, `constraints`, `bindings`.

---

# 5. Mapping CSS recommandé

Le plus important est de ne pas “inventer un second CSS”.
TiSpI doit **compiler vers du CSS standard**, avec conventions minimales.

## 5.1 Représentation d’état

Deux options principales :

### Option A — attribut de données

```css
[data-tispi-state="hover"] { ... }
```

### Option B — variable CSS

```css
--state: "hover";
```

En pratique :

* utiliser **`data-tispi-state`** pour le ciblage CSS ;
* utiliser **variables CSS** pour les paramètres continus (`--progress`, `--x`, `--y`, `--depth`, etc.).

C’est plus robuste que de vouloir comparer des chaînes dans CSS.

## 5.2 Exemple de CSS généré

```css
.primary-button {
  --progress: 0;
  --scale: 1;
  transition: transform 160ms ease-out, opacity 160ms ease-out;
}

.primary-button[data-tispi-state="idle"] {
  opacity: 1;
  transform: scale(1);
}

.primary-button[data-tispi-state="hover"] {
  transform: scale(1.03);
}

.primary-button[data-tispi-state="pressed"] {
  transform: scale(0.98);
}

.primary-button[data-tispi-state="disabled"] {
  opacity: 0.4;
  pointer-events: none;
}
```

---

# 6. API TypeScript de la librairie

Je recommande un package découpé ainsi :

```text
@tispi/core
@tispi/css
@tispi/runtime
@tispi/react
@tispi/editor-protocol
```

## 6.1 Types du noyau

```ts
export type TispiStateName = string;

export interface TispiTransition {
  from?: TispiStateName;
  to: TispiStateName;
  on: string; // ex: pointerenter, animationend:intro
  guard?: string;
  actions?: TispiAction[];
}

export interface TispiBehavior {
  states: TispiStateName[];
  transitions: TispiTransition[];
}

export interface TispiDecoration {
  vars?: Record<string, string | number>;
  styles?: Record<TispiStateName, Record<string, string | number>>;
  timing?: Record<string, string>;
}

export interface TispiNode {
  id: string;
  selector?: string;
  behavior?: TispiBehavior;
  decoration?: TispiDecoration;
  children?: TispiNode[];
}

export interface TispiDocument {
  version: string;
  scene: TispiNode;
}

export interface TispiAction {
  type: "setVar" | "emit" | "setState" | "wait";
  target?: string;
  name?: string;
  value?: string | number;
}
```

## 6.2 API de compilation

```ts
export interface CssCompileOptions {
  scope?: string;
  minify?: boolean;
}

export interface CssParseOptions {
  recoverStates?: boolean;
}

export function jsonToCss(
  doc: TispiDocument,
  options?: CssCompileOptions
): string;

export function cssToJson(
  css: string,
  options?: CssParseOptions
): TispiDocument;
```

## 6.3 API runtime

```ts
export interface TispiRuntime {
  mount(root: ParentNode): void;
  unmount(): void;
  setState(nodeId: string, state: string): Promise<void>;
  setVar(nodeId: string, name: string, value: string | number): void;
  run(op: TispiOperation): Promise<TispiOperationResult>;
  on(event: string, cb: (payload: unknown) => void): () => void;
}

export interface TispiOperation {
  type: "state" | "progress" | "sequence" | "parallel";
  target: string;
  state?: string;
  value?: number;
  steps?: TispiOperation[];
}
```

---

# 7. Runtime : modèle d’exécution

Votre phrase clé est juste :

> l’exécutable “lance” des opérations CSS et attend les événements en retour.

Donc le runtime doit être un **orchestrateur transactionnel**, pas un moteur visuel.

## 7.1 Cycle d’exécution

1. sélection du nœud cible ;
2. application de l’état ou de la variable CSS ;
3. abonnement aux événements attendus ;
4. résolution de la promesse à la fin.

## 7.2 Exemple

```ts
class DomTispiRuntime implements TispiRuntime {
  constructor(private doc: TispiDocument) {}

  private root: ParentNode | null = null;

  mount(root: ParentNode) {
    this.root = root;
  }

  unmount() {
    this.root = null;
  }

  setVar(nodeId: string, name: string, value: string | number) {
    const el = this.findElement(nodeId);
    if (!el) return;
    el.style.setProperty(name, String(value));
  }

  async setState(nodeId: string, state: string): Promise<void> {
    const el = this.findElement(nodeId);
    if (!el) return;

    return new Promise((resolve) => {
      let done = false;

      const finish = () => {
        if (done) return;
        done = true;
        el.removeEventListener("transitionend", onEnd);
        el.removeEventListener("animationend", onEnd);
        resolve();
      };

      const onEnd = (e: Event) => {
        if (e.target === el) finish();
      };

      el.addEventListener("transitionend", onEnd);
      el.addEventListener("animationend", onEnd);

      el.setAttribute("data-tispi-state", state);

      requestAnimationFrame(() => {
        setTimeout(finish, 400);
      });
    });
  }

  async run(op: TispiOperation): Promise<TispiOperationResult> {
    switch (op.type) {
      case "state":
        await this.setState(op.target, op.state!);
        return { ok: true };

      case "progress":
        this.setVar(op.target, "--progress", op.value ?? 0);
        return { ok: true };

      case "sequence":
        for (const step of op.steps ?? []) {
          await this.run(step);
        }
        return { ok: true };

      case "parallel":
        await Promise.all((op.steps ?? []).map((s) => this.run(s)));
        return { ok: true };
    }
  }

  on(_event: string, _cb: (payload: unknown) => void): () => void {
    return () => {};
  }

  private findElement(nodeId: string): HTMLElement | null {
    if (!this.root) return null;
    const node = findNodeById(this.doc.scene, nodeId);
    if (!node?.selector) return null;
    return this.root.querySelector(node.selector);
  }
}

export interface TispiOperationResult {
  ok: boolean;
}
```

---

# 8. Adaptation React

React doit rester un **hôte**, pas le moteur de TiSpI.

## 8.1 Ce qu’il faut éviter

* recalculer toute l’animation dans React ;
* faire de React la source de vérité de toutes les micro-transitions ;
* coupler étroitement JSX et DSL TiSpI.

## 8.2 Ce qu’il faut faire

* React instancie le runtime ;
* les refs DOM servent de points d’ancrage ;
* l’état métier React peut commander TiSpI ;
* TiSpI renvoie des événements consommables par React.

## 8.3 Hook minimal

```ts
import { useEffect, useMemo, useRef } from "react";

export function useTispi(doc: TispiDocument) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const runtime = useMemo(() => new DomTispiRuntime(doc), [doc]);

  useEffect(() => {
    if (!rootRef.current) return;
    runtime.mount(rootRef.current);
    return () => runtime.unmount();
  }, [runtime]);

  return { rootRef, runtime };
}
```

## 8.4 Usage

```tsx
function Demo() {
  const { rootRef, runtime } = useTispi(doc);

  return (
    <div ref={rootRef}>
      <button
        className="primary-button"
        onMouseEnter={() => runtime.setState("button.primary", "hover")}
        onMouseLeave={() => runtime.setState("button.primary", "idle")}
        onMouseDown={() => runtime.setState("button.primary", "pressed")}
      >
        Action
      </button>
    </div>
  );
}
```

---

# 9. Éditeur visuel online

## 9.1 Portée réaliste v1

Pour une première version, l’éditeur doit faire 6 choses :

1. importer un document JSON TiSpI ;
2. afficher la hiérarchie des nœuds ;
3. éditer `behavior` ;
4. éditer `decoration` ;
5. prévisualiser le rendu dans un iframe sandboxé ;
6. exporter JSON et CSS.

## 9.2 Architecture de l’éditeur

### Modules

* **Model Store** : document TiSpI + undo/redo
* **Inspector** : propriétés du nœud
* **State Timeline** : états, transitions, événements
* **Canvas Preview** : iframe / shadow DOM
* **Code Panels** : JSON / CSS
* **AI Exchange Panel** : sous-arbre preprocessé

## 9.3 Technologies adaptées

Pour desktop/tablette :

* React
* Zustand ou Redux Toolkit pour le store
* Monaco Editor pour JSON/CSS
* iframe de preview isolée
* pointer events, pas besoin de mobile-first initialement

---

# 10. Préprocessing IA

La bonne approche est de **ne jamais envoyer l’arbre complet** si inutile.

## 10.1 Deux vues simplifiées

### Vue comportement

Contient seulement :

* ids
* états
* transitions
* signaux
* contraintes

### Vue décoration

Contient seulement :

* tokens
* variables CSS
* styles par état
* règles d’apparence

## 10.2 Exemple de sortie preprocessée

```json
{
  "type": "behavior",
  "nodes": [
    {
      "id": "button.primary",
      "states": ["idle", "hover", "pressed", "disabled"],
      "transitions": [
        { "from": "idle", "to": "hover", "on": "pointerenter" },
        { "from": "hover", "to": "idle", "on": "pointerleave" },
        { "from": "hover", "to": "pressed", "on": "pointerdown" }
      ]
    }
  ]
}
```

## 10.3 Objectifs du preprocessing

* réduire le bruit ;
* stabiliser le prompt ;
* rendre le modèle déterministe ;
* éviter de transmettre markup inutile, contenu textuel, ou structure DOM non pertinente.

---

# 11. Parser bidirectionnel JSON ↔ CSS

C’est la partie la plus délicate.

## 11.1 `JSON -> CSS`

Faisable proprement si TiSpI impose une structure stricte.

## 11.2 `CSS -> JSON`

Possible, mais **jamais parfaitement bijectif** sur du CSS arbitraire.
Il faut donc distinguer :

### A. CSS TiSpI-compat

CSS généré ou annoté par TiSpI → conversion fiable.

### B. CSS libre

CSS externe générique → conversion partielle.

Il faut donc intégrer la notion de **mode dégradé** :

```ts
interface ParseResult {
  document: TispiDocument;
  warnings: string[];
  fidelity: "full" | "partial" | "lossy";
}
```

C’est essentiel. Sinon la promesse “bidirectionnelle” sera fragile.

---

# 12. Rapport à la norme W3C

Votre positionnement est cohérent, mais il faut le formuler plus précisément :

* TiSpI **n’attend pas** une nouvelle norme pour exister ;
* TiSpI **n’altère pas HTML** ;
* TiSpI **compile vers des primitives web standard** ;
* une éventuelle formalisation ultérieure n’est pas un prérequis.

Autrement dit, TiSpI doit être présenté comme :

> un modèle outillé et une convention d’orchestration au-dessus de HTML/CSS/JS existants.

C’est plus solide que “la norme W3C n’est pas nécessaire”, qui peut être lu comme une opposition inutile.

---

# 13. Feuille de route pragmatique

## Phase 1 — noyau exécutable

Objectif : prouver le modèle.

Livrables :

* `@tispi/core`
* `@tispi/css`
* `@tispi/runtime`
* démo React simple
* import/export JSON
* génération CSS

## Phase 2 — éditeur minimal

Objectif : éditer sans coder.

Livrables :

* arbre des nœuds
* inspecteur état/décoration
* preview live
* export JSON/CSS

## Phase 3 — protocole IA

Objectif : dialogue machine stable.

Livrables :

* préprocessing comportement/décoration
* schéma JSON formel
* diff/patch
* règles de validation

## Phase 4 — industrialisation

Objectif : adoption réelle.

Livrables :

* plugins React avancés
* design tokens
* tests visuels
* import depuis CSS existant
* documentation / playground

---

# 14. Risques techniques à traiter tôt

## 14.1 Ambiguïté de l’état

Si plusieurs sources modifient `data-tispi-state`, le système dérive vite.

**Réponse** : source d’autorité unique côté runtime.

## 14.2 CSS -> JSON incomplet

Le round-trip sera imparfait sur CSS libre.

**Réponse** : annoncer explicitement les niveaux de fidélité.

## 14.3 Couplage excessif avec React

TiSpI deviendrait un micro-framework au lieu d’un modèle transversal.

**Réponse** : garder React dans `@tispi/react`, pas dans le noyau.

## 14.4 Modèle trop abstrait

Un DSL trop théorique sera peu adopté.

**Réponse** : partir d’exemples UI concrets :

* bouton
* menu
* panneau latéral
* modal
* carte
* slider

---

# 15. Formulation de vision produit

Version plus nette de votre intention :

> **TiSpI** est un modèle Temps/Espace pour décrire, éditer et exécuter des comportements et décorations UI au-dessus de HTML/CSS.
> Le runtime TypeScript orchestre les états et opérations ; le CSS exécute les transitions et restitue les événements ; le format JSON permet l’édition visuelle, l’export automatique et les échanges avec l’IA.

---

# 16. Recommandation finale

Le bon point de départ n’est pas l’éditeur.
Le bon point de départ est :

1. **schéma JSON canonique** ;
2. **compilateur JSON -> CSS** ;
3. **runtime DOM minimal** ;
4. **adaptateur React** ;
5. ensuite seulement l’éditeur.

Sans ce noyau, l’éditeur n’aura pas de contrat stable.

Je peux maintenant faire l’un des deux livrables suivants :

* un **document d’architecture technique complet** de TiSpI ;
* un **starter kit TypeScript monorepo** avec `@tispi/core`, `@tispi/css`, `@tispi/runtime` et `@tispi/react`.
