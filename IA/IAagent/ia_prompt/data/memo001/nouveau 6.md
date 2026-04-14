Voici une **version ultra‑pédagogique**, pensée pour un lecteur qui découvre Tispi et qui doit comprendre *intuitivement* ce qu’est un module, pourquoi il existe, et comment il s’utilise.  
Elle ne suppose aucune connaissance préalable autre que les étapes 1 à 6.

---

# **7. Réduction en modules**

### *Comment transformer un sous‑arbre complexe en une brique simple, réutilisable et sûre*


## **7.1. Définition**

### 🎯 L’idée en une phrase  
Un **module**, c’est un *sous‑arbre Tispi* que tu transformes en **brique autonome**, avec une **interface claire** (ses paramètres), pour pouvoir le réutiliser partout **sans jamais réécrire sa mécanique interne**.

C’est l’équivalent Tispi de fabriquer ta propre “Pièce sur mesure”.


Un **module** est une *Pièce paramétrable* dont la structure interne est encapsulée.  
Il constitue une **réduction structurelle** :

> **Un module est une branche complète de l’arbre Tispi, représentée comme un nœud unique.**

La réduction ne modifie pas la grammaire : le module reste une Pièce et respecte l’alternance stricte `P → F → P`.  
L’intérieur du module est opaque et inaccessible lors de l’usage.  
L’interface du module est définie par une liste de **paramètres typés**.



---


---

## 1. Pourquoi les modules existent  
Avant les modules, quand tu voulais un bouton, un rollover, une page, un carrousel…  
tu devais **réécrire tout le sous‑arbre** :

- la piste `tag`  
- la piste `stop`  
- la piste `face`  
- les trois Faces  
- l’isolation de timeline  
- les groupes internes  

Et à chaque fois, tu pouvais oublier un détail.  
Un bouton mal encapsulé → conflit de timeline.  
Un tag oublié → état inaccessible.  
Une face mal nommée → comportement cassé.

👉 **Les modules éliminent ces erreurs.**  
Tu écris la mécanique *une seule fois*, puis tu exposes seulement ce qui doit varier.

---

## 2. Ce qu’est un module (définition simple)

Un module est :

- **une Pièce**, comme n’importe quelle autre Pièce  
- dont **l’intérieur est caché**  
- et qui expose **des paramètres typés** (souvent des Faces)

Autrement dit :

> **Un module = une Pièce avec une interface.**

Il respecte *strictement* la grammaire P/F.  
Il ne crée aucune exception.  
Il s’insère dans l’arbre comme n’importe quelle Pièce.

---

## 3. Exemple concret : transformer un bouton en module

### 🔴 Avant : le bouton “en brut”
Tu écris tout à la main :

```
P bouton
  T tag[0,MOUSE_OUT ; 1,MOUSE_OVER ; 2,MOUSE_PUSHED]
    stop[0]
    face[0,fOut ; 1,fOver ; 2,fPushed]
  F fOut    image "btn_out.png"
  F fOver   image "btn_over.png"
  F fPushed image "btn_pushed.png"
```

C’est long, fragile, répétitif.

---

### 🟢 Après : le module “Button”
Tu écris la mécanique **une seule fois**, dans un module :

```
P moduleButton
  doc "Bouton à 3 états"
  params(
    F --mouse-out,
    F --mouse-over,
    F --mouse-pushed
  )
```

À l’intérieur, le module contient *exactement* le sous‑arbre précédent, mais **caché**.  
L’utilisateur du module n’a plus à s’en soucier.

---

## 4. Comment on utilise un module  
Tu fournis simplement les paramètres :

```
P moduleButton
  --mouse-out    = F image "btn_out.png"
  --mouse-over   = F image "btn_over.png"
  --mouse-pushed = F image "btn_pushed.png"
```

Le module :

- crée automatiquement les Tags  
- gère la piste `face`  
- gère la piste `stop`  
- isole sa timeline  
- active la bonne Face au bon moment  

Tu n’as plus rien à faire.

---

Parfait Philippe — voici la **section complète et formelle**, intégrée proprement dans la documentation de l’étape 7, avec les **types de paramètres** mis à jour selon tes spécifications.

Elle est prête à être insérée telle quelle dans une doc officielle Tispi.


---

# **7.4. Paramètres**

Les paramètres définissent l’interface publique d’un module.  
Chaque paramètre est **typé**, et son type détermine la nature de la valeur attendue.

Les types se répartissent en trois catégories :

1. **Types simples**  
2. **Collections indexées**  
3. **Types structurels (Piece / Face)**

---

## **7.4.1. Types simples**

Les types simples représentent des valeurs atomiques.  
Ils sont fournis directement, sans structure interne.

Types simples supportés :

| Type | Description |
|------|-------------|
| `boolean` | Valeur booléenne (`true` / `false`) |
| `integer` | Entier signé |
| `float` | Nombre flottant |
| `string` | Chaîne de caractères |
| `color` | Valeur de couleur (format dépendant de l’implémentation) |

### **Exemple**

Déclaration :

```
params(
  boolean --enabled,
  integer --count,
  float   --ratio,
  string  --label,
  color   --tint
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
```

---

## **7.4.2. Collections indexées**

Une collection est un paramètre **répétable**, identifié par un suffixe `-N`.  
La syntaxe impose que le nom du paramètre se termine par `-N` dans la déclaration.

### **Déclaration**

```
params(
  F --page-N
)
```

### **Instanciation**

```
--page-0 = F ...
--page-1 = F ...
--page-2 = F ...
```

### **Règles**

- Les index doivent être continus à partir de 0.  
- Chaque index doit être fourni exactement une fois.  
- Le type de chaque entrée doit respecter le type déclaré.  
- Le module déduit automatiquement la cardinalité et génère les structures internes associées (ex. Tags, pistes, transitions).

---

## **7.4.3. Types structurels : `Piece` et `Face`**

Les paramètres peuvent être typés avec les types structurels suivants :

| Type | Description |
|------|-------------|
| `F` | Attend une Face (simple ou groupe) |
| `P` | Attend une Pièce (sous-arbre complet) |

### **Face (`F`)**

Une Face peut être :

- une Face simple (`image`, `text`, `shape`)  
- une Face-groupe contenant des Pièces  

Exemples :

```
--mouse-out = F image "btn_out.png"

--mouse-over = F group
  PF bg    : image "btn_over.png"
  PF label : text "Hover"
```

### **Pièce (`P`)**

Une Pièce peut être fournie comme paramètre lorsque le module doit encapsuler une logique complète.

Exemple :

```
params(
  P --content
)
```

Instanciation :

```
--content = P customBlock
  F f0 text "Hello"
```

---

## **7.4.4. Règles générales d’affectation**

1. Chaque paramètre doit être fourni exactement une fois, sauf pour les paramètres indexés.  
2. Le type fourni doit correspondre au type déclaré.  
3. Les paramètres sont évalués **avant** l’expansion interne du module.  
4. Les paramètres structurels (`F`, `P`) respectent l’alternance P/F lors de leur insertion.  
5. Les paramètres simples ne modifient jamais la structure de l’arbre.

---

## **7.4.5. Résumé formel**

| Catégorie | Types | Exemple |
|-----------|--------|---------|
| Types simples | `boolean`, `integer`, `float`, `string`, `color` | `--enabled = true` |
| Collections | `--nom-N` | `--page-0 = F ...` |
| Structurels | `F`, `P` | `--mouse-over = F group ...` |

---

## 7. Rôle de modules

### ✔ Ils réduisent la complexité  
Tu n’écris plus la mécanique interne.

### ✔ Ils garantissent le bon comportement  
Impossible d’oublier un `stop`, un `tag`, un groupe d’isolation.

### ✔ Ils sont composables  
Un module peut contenir un autre module :

```
P modulePages
  --page-2 = F group
    PF bg    : image "page2_bg.png"
    PF label : text "Page 2"
    P moduleButton
      --mouse-out    = F image "btn_out.png"
      --mouse-over   = F image "btn_over.png"
      --mouse-pushed = F image "btn_pushed.png"
```

### ✔ Ils respectent la grammaire  
Un module **est une Pièce**.  
Il s’insère naturellement dans l’alternance P/F.

---

## 8. Résumé pédagogique  
Voici la version “mémoire immédiate” :

- Un module = une Pièce dont l’intérieur est caché.  
- Il expose des paramètres typés (souvent des Faces).  
- Tu fournis les Faces, il gère la mécanique.  
- Il élimine les erreurs et rend l’arbre lisible.  
- Il s’emboîte comme une brique Lego dans n’importe quel groupe.  
- Il respecte strictement la grammaire P/F.

---
