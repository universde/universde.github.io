const PROPRIETAIRE = "universde";
const DEPOT = "universde.github.io";
const BRANCHE = "main";

const recherche = document.getElementById("recherche");
const niveau = document.getElementById("niveau");
const liste = document.getElementById("liste-epreuves");
const message = document.getElementById("message");

let epreuves = [];

async function chargerEpreuves() {
message.textContent = "Chargement des épreuves...";

try {
const url = "https://api.github.com/repos/${PROPRIETAIRE}/${DEPOT}/contents?ref=${BRANCHE}";

const reponse = await fetch(url);

if (!reponse.ok) {
  throw new Error("Impossible de récupérer les fichiers.");
}

const fichiers = await reponse.json();

epreuves = fichiers
  .filter(f => f.type === "file" && /\.(jpg|jpeg|png|webp)$/i.test(f.name))
  .map(f => {
    const nom = f.name;
    const texte = nom.toLowerCase();

    let classe = "seconde";
    if (texte.includes("terminale")) classe = "terminale";
    else if (texte.includes("premiere") || texte.includes("première")) classe = "premiere";

    let matiere = "Autre matière";
    if (texte.includes("physique")) matiere = "Physique-Chimie";
    else if (texte.includes("math")) matiere = "Mathématiques";
    else if (texte.includes("science")) matiere = "Sciences";

    return {
      nom: nom.replace(/\.(jpg|jpeg|png|webp)$/i, ""),
      niveau: classe,
      matiere: matiere,
      image: `https://${PROPRIETAIRE}.github.io/${encodeURIComponent(nom)}`
    };
  });

afficherEpreuves();

} catch (erreur) {
message.textContent = "Erreur de chargement. Vérifie le dépôt GitHub.";
}
}

function afficherEpreuves() {
const mot = recherche.value.trim().toLowerCase();
const classe = niveau.value;

const resultats = epreuves.filter(e => {
const correspondTexte =
(e.nom + " " + e.matiere).toLowerCase().includes(mot);

const correspondNiveau =
  classe === "" || e.niveau === classe;

return correspondTexte && correspondNiveau;

});

liste.innerHTML = "";

message.textContent = resultats.length
? resultats.length + " épreuve(s) trouvée(s)."
: "Aucune épreuve trouvée.";

resultats.forEach(e => {
const carte = document.createElement("article");
carte.className = "carte-epreuve";

const image = document.createElement("img");
image.src = e.image;
image.alt = e.nom;
image.loading = "lazy";

const contenu = document.createElement("div");
contenu.className = "contenu-epreuve";

const titre = document.createElement("h3");
titre.textContent = e.nom;

const matiere = document.createElement("p");
matiere.textContent = "Matière : " + e.matiere;

const classe = document.createElement("p");
classe.textContent = "Niveau : " + e.niveau;

const bouton = document.createElement("a");
bouton.href = e.image;
bouton.target = "_blank";
bouton.rel = "noopener";
bouton.className = "bouton-voir";
bouton.textContent = "Voir le sujet";

contenu.append(titre, matiere, classe, bouton);
carte.append(image, contenu);
liste.appendChild(carte);

});
}

recherche.addEventListener("input", afficherEpreuves);
niveau.addEventListener("change", afficherEpreuves);

chargerEpreuves();
