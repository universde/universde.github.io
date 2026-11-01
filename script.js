
const PROPRIETAIRE = "universde";
const DEPOT = "universde.github.io";

const recherche = document.getElementById("recherche");
const niveau = document.getElementById("niveau");
const liste = document.getElementById("liste-epreuves");
const message = document.getElementById("message");

// Uniquement les 28 nouvelles épreuves
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

const epreuves = fichiers.map((nom, index) => ({
  nom: nom,
  numero: index + 1,
  code: "AREX",
  niveau: "Seconde",
  matiere: "Physique-Chimie",
  image: `https://${PROPRIETAIRE}.github.io/${encodeURIComponent(nom)}`
}));

function afficherEpreuves() {
  const mot = recherche.value.trim().toLowerCase();
  const classe = niveau.value.trim().toLowerCase();

  const resultats = epreuves.filter(epreuve => {
    const correspondRecherche =
      !mot ||
      "arex".includes(mot) ||
      epreuve.nom.toLowerCase().includes(mot) ||
      epreuve.matiere.toLowerCase().includes(mot);

    const correspondNiveau =
      !classe ||
      classe === "tous" ||
      classe === "seconde";

    return correspondRecherche && correspondNiveau;
  });

  liste.innerHTML = "";

  if (resultats.length === 0) {
    message.textContent = "Aucune épreuve trouvée.";
    return;
  }

  message.textContent =
    resultats.length + " nouvelles épreuves trouvées.";

  resultats.forEach(epreuve => {
    const carte = document.createElement("article");
    carte.className = "carte-epreuve";

    const image = document.createElement("img");
    image.src = epreuve.image;
    image.alt = "Épreuve AREX numéro " + epreuve.numero;

    image.onerror = function() {
      this.alt = "Photo introuvable sur GitHub";
    };

    const contenu = document.createElement("div");
    contenu.className = "contenu-epreuve";

    const titre = document.createElement("h3");
    titre.textContent = "AREX - " + epreuve.matiere;

    const classeTexte = document.createElement("p");
    classeTexte.textContent = "Niveau : Seconde";

    const bouton = document.createElement("a");
    bouton.className = "bouton-voir";
    bouton.href = epreuve.image;
    bouton.target = "_blank";
    bouton.rel = "noopener";
    bouton.textContent = "Voir l'épreuve";

    contenu.appendChild(titre);
    contenu.appendChild(classeTexte);
    contenu.appendChild(bouton);

    carte.appendChild(image);
    carte.appendChild(contenu);

    liste.appendChild(carte);
  });
}

recherche.addEventListener("input", afficherEpreuves);
niveau.addEventListener("change", afficherEpreuves);

afficherEpreuves();
