* {
  box-sizing: border-box;
  }

html {
scroll-behavior: smooth;
}

body {
margin: 0;
font-family: Arial, sans-serif;
background: #f4f6fa;
color: #222;
}

.header {
background: linear-gradient(135deg, #073b75, #087bba);
color: white;
text-align: center;
padding: 35px 15px;
}

.header h1 {
margin: 0 0 10px;
font-size: 27px;
}

.header p {
margin: 0;
}

.navigation {
display: flex;
justify-content: center;
flex-wrap: wrap;
gap: 25px;
padding: 15px;
background: #ffffff;
box-shadow: 0 2px 6px #00000015;
}

.navigation a {
color: #07518a;
text-decoration: none;
font-weight: bold;
}

.navigation a:hover {
color: #e58b18;
}

.accueil {
text-align: center;
padding: 45px 20px;
}

.section {
padding: 30px 18px;
max-width: 1100px;
margin: auto;
}

.section h2 {
color: #07518a;
}

.recherche {
display: flex;
gap: 12px;
flex-wrap: wrap;
margin: 25px 0;
}

.recherche input,
.recherche select {
flex: 1;
min-width: 180px;
padding: 14px;
border: 1px solid #ccc;
border-radius: 8px;
font-size: 16px;
background: white;
}

.grille {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
gap: 20px;
}

.carte {
background: white;
border-radius: 12px;
overflow: hidden;
box-shadow: 0 3px 12px #00000015;
}

.carte img {
display: block;
width: 100%;
height: auto;
max-height: 500px;
object-fit: contain;
background: #eee;
}

.carte-contenu {
padding: 15px;
}

.carte h3 {
margin-top: 0;
color: #07518a;
}

.bouton {
display: inline-block;
background: #087bba;
color: white;
padding: 10px 16px;
border-radius: 7px;
text-decoration: none;
margin-top: 8px;
cursor: pointer;
}

.bouton:hover {
background: #064d80;
}

#message {
text-align: center;
padding: 15px;
}

footer {
background: #073b75;
color: white;
text-align: center;
padding: 22px;
margin-top: 35px;
}

@media(max-width: 600px) {
.header h1 {
font-size: 23px;
}

.navigation {
gap: 16px;
}

.recherche {
flex-direction: column;
}

.recherche input,
.recherche select {
width: 100%;
}
}
