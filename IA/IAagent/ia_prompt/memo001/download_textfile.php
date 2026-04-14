<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf-8');

// Sécurisation de base
$id = isset($_GET['id']) ? basename($_GET['id']) : null;

if (!$id) {
    echo json_encode([
        "status" => "error",
        "message" => "ID manquant"
    ]);
    exit;
}

$file = __DIR__ . "/data/" . $id . ".txt";

if (!file_exists($file)) {
    echo json_encode([
        "status" => "error",
        "message" => "Fichier introuvable"
    ]);
    exit;
}
// Lire le JSON
$data = file_get_contents($file);
// Vérifier validité JSON
//$data = json_decode($content, true);

if (!$data) {
    echo json_encode([
        "status" => "error",
        "message" => "Contenu du fichier texte erroné : data = |".$data."|"
        //"message" => "JSON invalide"
    ]);
    exit;
}
// Retour UTF-8 garanti
echo json_encode([
    "status" => "ok",
    "content" => $data
], JSON_UNESCAPED_UNICODE);

?>