// ================== DONNÉES PRODUITS ==================
const products = [
  {
    name: "Iphone 16 Pro Max",
    image: "../assets/images/iphone.webp",
    originalPrice: 1200000,
    promoPrice: 800000
  },
  {
    name: "Headset Logitech 3X",
    image: "../assets/images/headset.webp",
    originalPrice: 38000,
    promoPrice: 20000
  },
  {
    name: "Samsung Galaxy S25",
    image: "../assets/images/s25.jpg",
    originalPrice: 1000000,
    promoPrice: 600000
  },
  {
    name: "Laptop Asus V Pro",
    image: "../assets/images/laptop.jpg",
    originalPrice: 700000,
    promoPrice: 400000
  }
];

// Fonction de formatage pour le prix en FCFA
function formatPrice(number) {
  return number.toLocaleString('fr-FR') + ' FCFA';
}

// Fonction pour afficher les produits dans le conteneur
function renderProducts(list) {
  const container = document.getElementById("products-container");
  container.innerHTML = ''; // vider avant
  list.forEach(prod => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${prod.image}" alt="${prod.name}">
      <div class="product-info">
        <h3>${prod.name}</h3>
        <p class="original-price">${formatPrice(prod.originalPrice)}</p>
        <p class="promo-price">${formatPrice(prod.promoPrice)}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

// Initial display
renderProducts(products);

// ===== TRI DES PRODUITS =====
document.getElementById("sort-select").addEventListener("change", function(e) {
  const value = e.target.value;
  let sorted = [...products];
  if (value === "price-asc") {
    sorted.sort((a, b) => a.promoPrice - b.promoPrice);
  } else if (value === "price-desc") {
    sorted.sort((a, b) => b.promoPrice - a.promoPrice);
  }
  renderProducts(sorted);
});

// ================== COMPTE À REBOURS ==================
const deadline = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;

function updateCountdown() {
  const now = new Date().getTime();
  const distance = deadline - now;

  if (distance < 0) {
    ["days", "hours", "minutes", "seconds"].forEach(id => {
      document.getElementById(id).innerText = "00";
    });
    clearInterval(interval);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days.toString().padStart(2, "0");
  document.getElementById("hours").innerText = hours.toString().padStart(2, "0");
  document.getElementById("minutes").innerText = minutes.toString().padStart(2, "0");
  document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0");
}

const interval = setInterval(updateCountdown, 1000);
updateCountdown();
