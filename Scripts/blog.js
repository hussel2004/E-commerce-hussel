// Array of blog articles
const articles = [
  {
    image: "../assets/images/iphone-expo-with-case.jpg",
    title: "Top 5 Smartphones of 2025",
    description: "Discover the must-have models of the year in the world of smartphones …",
    date: "September 15, 2025"
  },
  {
    image: "../assets/images/laptop.jpg",
    title: "Buying Guide: How to Choose a Good Laptop",
    description: "What should you look for? Our complete guide to help you make the right choice …",
    date: "August 1, 2025"
  },
  {
    image: "../assets/images/gpc.jpeg",
    title: "Must-Have Accessories for Gamers",
    description: "Controllers, headsets, monitors — here’s a closer look at the best gear to level up your gaming experience …",
    date: "July 20, 2025"
  }
];

// Target the section where articles will be injected
const blogList = document.getElementById("blog-list");

// Dynamic generation
articles.forEach(article => {
  const card = document.createElement("div");
  card.classList.add("blog-card");

  card.innerHTML = `
    <img src="${article.image}" alt="${article.title}">
    <div class="blog-info">
        <h2>${article.title}</h2>
        <p>${article.description}</p>
        <span class="date">${article.date}</span>
    </div>
  `;

  blogList.appendChild(card);
});
