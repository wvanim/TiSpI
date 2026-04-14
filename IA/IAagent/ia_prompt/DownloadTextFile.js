/*
 * Installation : rechercher "TODO inscrire le chemin du dossier sur le serveur"
 */

const statusDiv = document.getElementById("status");
const buttons = document.querySelectorAll("button");

function setLoading(message = "Chargement...") {
    statusDiv.className = "loading";
    statusDiv.innerHTML = `<span class="spinner"></span>${message}`;
}

function setSuccess(message) {
    statusDiv.className = "success";
    statusDiv.textContent = message;
    alert("Paste into the prompt field (Ctrl+V)");
}

function setError(message) {
    statusDiv.className = "error";
    statusDiv.textContent = message;
}

function toggleButtons(disabled) {
    buttons.forEach(btn => btn.disabled = disabled);
}
function downloadFileText(button, callbackFc, ...params){ 
    return downloadFileText_(button)
        .then(text => callbackFc(text, ...params));
}
function downloadFileText(button, callbackFc = null, ...params){ // new
        const id = button.getAttribute("data-id");
        toggleButtons(true);
        setLoading("Chargement...");
        
        // TODO inscrire le chemin du dossier sur le serveur 
        const server_folder = "https://www.wvanim.fr/p/ia_prompt";
        //alert( `${server_folder}/download_textfile.php?id=${server_folder}/${id}`);
        return fetch( `${server_folder}/download_textfile.php?id=${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur HTTP");
                }
                return response.json();
            })
            .then(data => {
                if (data.status === "ok") {
                    let text = data.content;
                    if (typeof callbackFc === "function") {
                        // Le callback peut modifier le retour,
                        // Ex : une vérification fausse -> retourne un texte correctif à transmettre à l'IA
                        text = callbackFc(text, ...params);
                    }
                    navigator.clipboard.writeText(text)
                        .then(() => {
                            setSuccess("Texte copié dans le presse-papier");
                        })
                        .catch(() => {
                            setError("Copie dans le presse-papier impossible");
                        });
                    return text;
                } else {
                    throw new Error(data.message);
                }
            })
            .catch(err => {
                setError("Erreur : " + err.message);
                return false;
            })
            .finally(() => {
                toggleButtons(false);
                return false;
            });
} 

async function copyImage(url) {
    try {
        const response = await fetch(url); //"https://www.wvanim.fr/p/test.png");
        const blob = await response.blob();

        await navigator.clipboard.write([
            new ClipboardItem({
                [blob.type]: blob
            })
        ]);
        alert("Copy the image to your clipboard\nand paste it (Ctrl+V) into your AI input field.");
    } catch (err) {
        console.error("Error:", err);
    }
}
