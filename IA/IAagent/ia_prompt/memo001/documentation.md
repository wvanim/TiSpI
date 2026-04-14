# Téléchargement de fichier texte

Page Html pour télécharger des fichiers textes sur le serveur. 
Puis placer le contenu dans le press-papier. 

## Fichers du pack :

- index.html : Page HTML comportant les boutons pour télécharger les fichiers
- DownloadTextFile.js : requète PHP pour télécharger un fichier texte, puis le placer dans le presse papier
- download_textfile.php : backend pour lire le fichier text et le retourner au frontend 
- les fichiers textes dans un sous dossier 'data'

## Process

### installation du pack

Placez les fichiers dans votre dosseir sur serveur :
- index.html 
- DownloadTextFile.js 
- download_textfile.php 
- les fichiers textes dans un sous dossier 'data'

Créez votre page HTML avec des boutons.
Voir : Préparation/dans la page html.


### Initialisation

- Installe l'événement clic dans les boutons
DownloadTextFile.js/buttons.forEach(<requète donwload>)
Requète PHP de téléchargement du fichier texte, puis mise en presse-papier du fichier texte

### Clic bouton de la page Html

Appel à <requète donwload>
- paramètres 'data-id' du bouton, comporte le préfixe du nom de fichier à télécharger

Requète download_textfile.php
- reception du nom de fichier texte
- lecture du fichier
- retourne le contenu texte du fichier ou 'erreur'

Reception du texte dans <requète donwload>
- texte placé dans le presse papier, si requète 'OK'
- statut inscrit dans la div "statut" de la page Html

## Préparation

### Sur le serveur

- installer les 3 fichier "index.html", "DownloadTextFile.js", "download_textfile.php" sur votre serveur.
- créer un sous-repertoire : data
- inscrivez vos fichiers textes.

### Dans le fichier "DownloadTextFile.js"

Rechercher et modifier le chemin du dossier sur le serveur :  TODO inscrire le chemin du dossier sur le serveur

### Dans la page html

Voire les TODO dans le fichier 'index.html'. TODO recopié ci dessous.
- dans chaque bouton, inscrire : data-id="prefixe_noom_fichier_texte_sur_serveur"
- Copiez les 2 portions 'copy' - style et requète - depuis le fichier 'index.html' dans votre fichier html

## Test

Tester avec le fichier index.html.
- dans chaque bouton, inscrire : data-id="prefixe_noom_fichier_texte_sur_serveur"

Exécuter cette page : index.Html
- clic sur les boutons
- Ctrl-V pour voir si le texte du fichier requis est téléchargé. 




