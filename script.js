/* =================================
   MON UNIVERS ÉDUCATIF 🇹🇬
   Recherche intelligente
================================= */

const PROPRIETAIRE = "universde";

const recherche = document.getElementById("recherche");
const niveau = document.getElementById("niveau");
const matiere = document.getElementById("matiere");
const annee = document.getElementById("annee");
const liste = document.getElementById("liste-epreuves");
const message = document.getElementById("message");

// LES 28 NOUVELLES ÉPREUVES AREX

const fichiers = [
  "Img_20261024_010958_876.jpg",
  "IMG_20261024_012457_372.jpg",
  "IMG_20261024_011235_13.jpg",
  "IMG_20261024_011300_110.jpg",
  "IMG_20261024_011350_353.jpg",
  "IMG_20261024_011600_902.jpg",
  "IMG_20261024_011606_330.jpg",
  "IMG_20261024_011644_446.jpg",
  "IMG_20261024_011734_252.jpg",
  "IMG_20261024_011741_198.jpg",
  "IMG_20261024_011810_206.jpg",
  "IMG_20261024_011831_885.jpg",
  "IMG_20261024_011852_882.jpg",
  "IMG_20261024_011909_125.jpg",
  "IMG_20261024_011936_251.jpg",
  "IMG_20261024_011955_208.jpg",
  "IMG_20261024_012127_390.jpg",
  "IMG_20261024_012147_797.jpg",
  "IMG_20261024_012210_656.jpg",
  "IMG_20261024_012226_457.jpg",
  "IMG_20261024_012242_780.jpg",
  "IMG_20261024_012250_463.jpg",
  "IMG_20261024_012306_700.jpg",
  "IMG_20261024_012322_161.jpg",
  "IMG_20261024_012330_646.jpg",
  "IMG_20261024_012332_330.jpg",
  "IMG_20261024_012412_743.jpg",
  "IMG_20261024_012428_300.jpg"
];

// ORGANISATION DES ÉPREUVES

const epreuves = fichiers.map((nom, index) => ({
  nom: nom,
  numero: index + 1,
  code: "AREX",
  niveau: "Seconde",
  matiere: "Physique-Chimie",
  annee: "2026",
  image: `https://${PROPRIETAIRE}.github.io/${encodeURIComponent(nom)}`
}));

// NORMALISER LES MOTS POUR LA RECHERCHE

function normaliser(texte) {
  return texte
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

// AFFICHER LES ÉPREUVES

function afficherEpreuves() {

  const mot = normaliser(recherche.value);
  const classe = normaliser(niveau.value);
  const discipline = normaliser(matiere.value);
  const session = annee.value;

  const resultats = epreuves.filter(epreuve => {

    const informations = normaliser(
      epreuve.code + " " +
      epreuve.nom + " " +
      epreuve.niveau + " " +
      epreuve.matiere + " " +
      epreuve.annee
    );

    const correspondRecherche =
      !mot || informations.includes(mot);

    const correspondNiveau =
      !classe ||
      normaliser(epreuve.niveau) === classe;

    const correspondMatiere =
      !discipline ||
      normaliser(epreuve.matiere) === discipline;

    const correspondAnnee =
      !session || epreuve.annee === session;

    return (
      correspondRecherche &&
      correspondNiveau &&
      correspondMatiere &&
      correspondAnnee
    );
  });

  liste.innerHTML = "";

  if (resultats.length === 0) {
    message.textContent =
      "Aucune épreuve trouvée. Essaie une autre recherche.";
    return;
  }

  message.textContent =
    resultats.length + " épreuve(s) trouvée(s).";

  resultats.forEach(epreuve => {

    const carte = document.createElement("article");
    carte.className = "carte-epreuve";

    const image = document.createElement("img");
    image.src = epreuve.image;
    image.alt =
      "Épreuve AREX de Physique-Chimie numéro " +
      epreuve.numero;
    image.loading = "lazy";

    image.onerror = function() {
      this.alt = "Photo introuvable sur GitHub";
      this.style.minHeight = "180px";
    };

    const contenu = document.createElement("div");
    contenu.className = "contenu-epreuve";

    const titre = document.createElement("h3");
    titre.textContent =
      "AREX - " + epreuve.matiere;

    const classeTexte = document.createElement("p");
    classeTexte.textContent =
      "Niveau : " + epreuve.niveau;

    const anneeTexte = document.createElement("p");
    anneeTexte.textContent =
      "Année : " + epreuve.annee;

    const numero = document.createElement("p");
    numero.textContent =
      "Sujet numéro : " + epreuve.numero;

    const bouton = document.createElement("a");
    bouton.className = "bouton-voir";
    bouton.href = epreuve.image;
    bouton.target = "_blank";
    bouton.rel = "noopener";
    bouton.textContent = "Voir l'épreuve";

    contenu.appendChild(titre);
    contenu.appendChild(classeTexte);
    contenu.appendChild(anneeTexte);
    contenu.appendChild(numero);
    contenu.appendChild(bouton);

    carte.appendChild(image);
    carte.appendChild(contenu);

    liste.appendChild(carte);
  });
}

// ÉCOUTER LES RECHERCHES

recherche.addEventListener("input", afficherEpreuves);
niveau.addEventListener("change", afficherEpreuves);
matiere.addEventListener("change", afficherEpreuves);
annee.addEventListener("change", afficherEpreuves);

// COMPTEUR LOCAL DES VISITES

function compterVisites() {

  const compteur = document.getElementById("nombre-visites");

  try {
    let total = Number(
      localStorage.getItem("monUniversVisites") || 0
    );

    // Une seule augmentation par session de navigation
    if (!sessionStorage.getItem("visiteEnregistree")) {
      total++;
      localStorage.setItem("monUniversVisites", total);
      sessionStorage.setItem("visiteEnregistree", "oui");
    }

    compteur.textContent = total;

  } catch (erreur) {
    compteur.textContent = "Indisponible";
  }
}

// LANCEMENT

compterVisites();
afficherEpreuves();
