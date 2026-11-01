// ===================================
// MON UNIVERS EDUCATIF - EPREUVES
// ===================================

const epreuves = [
  {
    nom: "AREX – Physique – Seconde",
    code: "AREX",
    matiere: "Physique-Chimie",
    niveau: "seconde",
    image: "IMG_20261024_011930_252.jpg"
  }

  // Ajoute les autres épreuves ici.
];

// Récupération des éléments
const recherche = document.getElementById("recherche");
const niveau = document.getElementById("niveau");
const liste = document.getElementById("liste-epreuves");
const message = document.getElementById("message");

// Fonction d'affichage
function afficherEpreuves() {

  const mot = recherche.value.trim().toLowerCase();
  const classe = niveau.value;

  const resultats = epreuves.filter(epreuve => {

    const texte = (
      epreuve.nom + " " +
      epreuve.code + " " +
      epreuve.matiere
    ).toLowerCase();

    const rechercheOK = texte.includes(mot);
    const niveauOK = classe === "" || epreuve.niveau === classe;

    return rechercheOK && niveauOK;
  });

  liste.innerHTML = "";

  if (resultats.length === 0) {
    message.textContent = "Aucune épreuve trouvée.";
    return;
  }

  message.textContent = resultats.length + " épreuve(s) disponible(s).";

  resultats.forEach(epreuve => {

    const carte = document.createElement("article");
    carte.className = "carte-epreuve";

    const image = document.createElement("img");
    image.src = epreuve.image;
    image.alt = epreuve.nom;
    image.loading = "lazy";

    image.onerror = function() {
      this.alt = "Photo introuvable : " + epreuve.image;
      this.style.display = "none";
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

// Recherche et filtre
recherche.addEventListener("input", afficherEpreuves);
niveau.addEventListener("change", afficherEpreuves);

// Afficher toutes les épreuves au départ
afficherEpreuves();
