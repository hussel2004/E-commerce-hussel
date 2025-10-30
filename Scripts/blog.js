// Tableau d'articles
const articles = [
  {
    image: "../assets/images/iphone-expo-with-case.jpg",
    titre: "Les 5 meilleurs smartphones de 2025",
    description: "Découvrez quelles sont les références à ne pas manquer cette année dans l’univers des smartphones …",
    date: "15 septembre 2025"
  },
  {
    image: "../assets/images/laptop.jpg",
    titre: "Guide d’achat : choisir un bon ordinateur portable",
    description: "Que faut-il regarder ? Notre guide complet pour t’aider à faire le bon choix …",
    date: "1 août 2025"
  },
  {
    image: "../assets/images/gpc.jpeg",
    titre: "Accessoires incontournables pour gamer",
    description: "Manettes, casques, écrans — zoom sur les accessoires utiles pour améliorer ton expérience gaming …",
    date: "20 juillet 2025"
  }
];

// Cible la section où injecter les articles
const blogList = document.getElementById("blog-list");

// Génération dynamique
articles.forEach(article => {
  const card = document.createElement("div");
  card.classList.add("blog-card");

  card.innerHTML = `
    <img src="${article.image}" alt="${article.titre}">
    <div class="blog-info">
        <h2>${article.titre}</h2>
        <p>${article.description}</p>
        <span class="date">${article.date}</span>
    </div>
  `;

  blogList.appendChild(card);
});
