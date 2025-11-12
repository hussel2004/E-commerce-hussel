// Tableau d'articles
const articles = [
  {
    image: "../assets/images/iphone-expo-with-case.jpg",
    titre: "Top 5 best smart phones in 2025",
    description: "Discover the must-have items this year in the world of smartphones",
    date: "15 september 2025"
  },
  {
    image: "../assets/images/laptop.jpg",
    titre: "Guide to buy the best laptop for you",
    description: "What do you have to look for ? Our complete guide to help you make the best choice",
    date: "1 august 2025"
  },
  {
    image: "../assets/images/gpc.jpeg",
    titre: "Essential gaming accessories in 2025",
    description: "Controllers, headsets, and more: enhance your gaming experience with these top accessories",
    date: "20 july 2025"
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
