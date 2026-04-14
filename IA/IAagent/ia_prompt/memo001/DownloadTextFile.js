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

buttons.forEach(button => { // <requète donwload>
    button.addEventListener("click", () => {

        const id = button.getAttribute("data-id");
        toggleButtons(true);
        setLoading();
        
        // TODO inscrire le chemin du dossier sur le serveur 
        const server_folder = "www.wvanim.fr/p/ia_prompt";
        //alert(`https://`+server_folder+`/download_textfile.php?id=${id}`);
        fetch(`https://`+server_folder+`/download_textfile.php?id=${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur HTTP");
                }
                return response.json();
            })
            .then(data => {
                if (data.status === "ok") {

                    const text = data.content;

                    return navigator.clipboard.writeText(text)
                        .then(() => {
                            setSuccess("Texte copié dans le presse-papier");
                        });

                } else {
                    throw new Error(data.message);
                }
            })
            .catch(err => {
                setError("Erreur : " + err.message);
            })
            .finally(() => {
                toggleButtons(false);
            });

    });
});
