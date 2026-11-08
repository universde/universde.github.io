
/* =================================
   MON UNIVERS ÉDUCATIF 🇹🇬
   Bibliothèque des épreuves
================================= */

const PROPRIETAIRE = "universde";

const recherche = document.getElementById("recherche");
const niveau = document.getElementById("niveau");
const matiere = document.getElementById("matiere");
const annee = document.getElementById("annee");
const liste = document.getElementById("liste-epreuves");
const message = document.getElementById("message");

/* ÉPREUVES AREX DE SECONDE */

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

const epreuvesSeconde = fichiers.map((nom, index) => ({
  nom,
  titre: "AREX - Physique-Chimie",
  numero: index + 1,
  code: "AREX",
  niveau: "seconde",
  matiere: "physique-chimie",
  annee: "2026",
  type: "image",
  url: `https://${PROPRIETAIRE}.github.io/${encodeURIComponent(nom)}`
}));

/* ÉPREUVES PDF DE PREMIÈRE */

const fichiersPremiere = [
  {
    nom: "Mathématiques D Remplacement.pdf",
    matiere: "mathematiques"
  },
  {
    nom: "Mathématiques D.pdf",
    matiere: "mathematiques"
  },
  {
    nom: "Mathématiques.pdf",
    matiere: "mathematiques"
  },
  {
    nom: "PCT (1).pdf",
    matiere: "physique-chimie"
  },
  {
    nom: "Remplacement du PCT D (1).pdf",
    matiere: "physique-chimie"
  },
  {
    nom: "Remplacement PCT D.pdf",
    matiere: "physique-chimie"
  },
  {
    nom: "PCT D.pdf",
    matiere: "physique-chimie"
  },
  {
    nom: "PCT.pdf",
    matiere: "physique-chimie"
  },
  {
    nom: "SVT D (1).pdf",
    matiere: "sciences"
  },
  {
    nom: "Remplacement SVT D.pdf",
    matiere: "sciences"
  },
  {
    nom: "SVT D.pdf",
    matiere: "sciences"
  }
];

const epreuvesPremiere = fichiersPremiere.map(fichier => ({
  nom: fichier.nom,
  titre: fichier.nom.replace(".pdf", ""),
  niveau: "premiere",
  matiere: fichier.matiere,
  annee: "",
  type: "pdf",
  url: `https://${PROPRIETAIRE}.github.io/epreuves/premiere/${encodeURIComponent(fichier.nom)}`
}));

/* RECHERCHE */

function normaliser(texte) {
  return texte.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function afficherEpreuves() {
  liste.innerHTML = "";

  const classe = niveau.value;
  const discipline = matiere.value;
  const mot = normaliser(recherche.value);
  const session = annee.value;

  if (!classe || !discipline) {
    message.textContent =
      "Choisis un niveau et une matière pour consulter les épreuves.";
    return;
  }

  let disponibles = [];

  if (classe === "seconde" && discipline === "physique-chimie") {
    disponibles = epreuvesSeconde;
  }

  if (classe === "premiere") {
    disponibles = epreuvesPremiere.filter(
      epreuve => epreuve.matiere === discipline
    );
  }

  const resultats = disponibles.filter(epreuve => {
    const informations = normaliser(
      epreuve.titre + " " + epreuve.nom
    );

    return (
      (!mot || informations.includes(mot)) &&
      (!session || epreuve.annee === session)
    );
  });

  if (resultats.length === 0) {
    message.textContent = "Aucune épreuve trouvée.";
    return;
  }

  message.textContent =
    resultats.length + " épreuve(s) trouvée(s).";

  resultats.forEach(epreuve => {
    const carte = document.createElement("article");
    carte.className = "carte-epreuve";

    const contenu = document.createElement("div");
    contenu.className = "contenu-epreuve";

    const titre = document.createElement("h3");
    titre.textContent = epreuve.titre;

    const classeTexte = document.createElement("p");
    classeTexte.textContent =
      "Niveau : " +
      (epreuve.niveau === "premiere" ? "Première" : "Seconde");

    const matiereTexte = document.createElement("p");

    const nomsMatieres = {
      mathematiques: "Mathématiques",
      "physique-chimie": "Physique-Chimie",
      sciences: "Sciences"
    };

    matiereTexte.textContent =
      "Matière : " + nomsMatieres[epreuve.matiere];

    const bouton = document.createElement("a");
    bouton.className = "bouton-voir";
    bouton.href = epreuve.url;
    bouton.target = "_blank";
    bouton.rel = "noopener";
    bouton.textContent = "Consulter l'épreuve";

    contenu.append(
      titre,
      classeTexte,
      matiereTexte,
      bouton
    );

    carte.appendChild(contenu);
    liste.appendChild(carte);
  });
}

recherche.addEventListener("input", afficherEpreuves);
niveau.addEventListener("change", afficherEpreuves);
matiere.addEventListener("change", afficherEpreuves);
annee.addEventListener("change", afficherEpreuves);

/* COMPTEUR DE VISITES */

function compterVisites() {
  const compteur = document.getElementById("nombre-visites");

  if (!compteur) return;

  try {
    let total = Number(
      localStorage.getItem("monUniversVisites") || 0
    );

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

compterVisites();
afficherEpreuves();
   
