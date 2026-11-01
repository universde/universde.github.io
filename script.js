// ==========================================
// MON UNIVERS EDUCATIF 🇹🇬
// GESTION AUTOMATIQUE DES EPREUVES
// ==========================================

const PROPRIETAIRE = "universde";
const DEPOT = "universde.github.io";
const BRANCHE = "main";

const recherche = document.getElementById("recherche");
const niveau = document.getElementById("niveau");
const liste = document.getElementById("liste-epreuves");
const message = document.getElementById("message");

let epreuves = [];

// Identifier le niveau
function trouverNiveau(nom) {
const texte = nom.toLowerCase();

if (texte.includes("terminale")) return "terminale";
if (texte.includes("premiere") || texte.includes("première")) return "premiere";

return "seconde";
}

// Identifier la matière
function trouverMatiere(nom) {
const texte = nom.toLowerCase();

if (texte.includes("physique")) return "Physique-Chimie";
if (texte.includes("math")) return "Mathématiques";
if (texte.includes("science")) return "Sciences";

return "Autre matière";
}

// Charger les épreuves
async function chargerEpreuves() {
message.textContent = "Chargement des épreuves...";

try {
const url =
"https://api.github.com/repos/universde/universde.github.io/contents/?ref=main";

const reponse = await fetch(url);

if (!reponse.ok) {
  throw new Error("Erreur GitHub : " + reponse.status);
}

const fichiers = await reponse.json();

epreuves = fichiers
  .filter(fichier =>
    fichier.type === "file" &&
    /\.(jpg|jpeg|png|webp)$/i.test(fichier.name) &&
    !fichier.name.startsWith("IMG_20261024")
  )
  .map(fichier => ({
    nom: fichier.name.replace(/\.[^.]+$/, ""),
    code: "AREX",
    niveau: trouverNiveau(fichier.name),
    matiere: trouverMatiere(fichier.name),
    image: `https://universde.github.io/${encodeURIComponent(fichier.name)}`
  }));

afficherEpreuves();

} catch (erreur) {
console.error(erreur);
message.textContent =
"Impossible de charger les épreuves. Vérifie ta connexion.";
}
}

// Afficher les épreuves
function afficherEpreuves() {
const mot = recherche.value.trim().toLowerCase();
const classe = niveau.value;

liste.innerHTML = "";

const resultats = epreuves.filter(epreuve => {
const texte = (
epreuve.nom + " " +
epreuve.code + " " +
epreuve.matiere
).toLowerCase();

return texte.includes(mot) &&
  (classe === "" || epreuve.niveau === classe);

});

if (resultats.length === 0) {
message.textContent = "Aucune épreuve trouvée.";
return;
}

message.textContent =
resultats.length + " épreuve(s) disponible(s).";

resultats.forEach(epreuve => {
const carte = document.createElement("article");
carte.className = "carte-epreuve";

const image = document.createElement("img");
image.src = epreuve.image;
image.alt = epreuve.nom;
image.loading = "lazy";

image.onerror = () => {
  image.style.display = "none";
};

const contenu = document.createElement("div");
contenu.className = "contenu-epreuve";

const titre = document.createElement("h3");
titre.textContent = epreuve.nom;

const matiere = document.createElement("p");
matiere.textContent = "Matière : " + epreuve.matiere;

const classe = document.createElement("p");
classe.textContent = "Niveau : " + epreuve.niveau;

const bouton = document.createElement("a");
bouton.href = epreuve.image;
bouton.target = "_blank";
bouton.rel = "noopener";
bouton.className = "bouton-voir";
bouton.textContent = "Voir le sujet";

contenu.append(titre, matiere, classe, bouton);
carte.append(image, contenu);
liste.appendChild(carte);

});
}

// Recherche et sélection du niveau
recherche.addEventListener("input", afficherEpreuves);
niveau.addEventListener("change", afficherEpreuves);

// Démarrer
chargerEpreuves();
