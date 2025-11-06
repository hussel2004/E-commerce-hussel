// 🔍 Recherche de produits
document.getElementById("searchButton").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const products = document.querySelectorAll(".productItem");

  products.forEach(product => {
    const title = product.querySelector("h3").textContent.toLowerCase();
    product.style.display = title.includes(query) ? "block" : "none";
  });
});

// 🧭 Filtrage par catégorie
document.querySelectorAll(".categoryItem").forEach(category => {
  category.addEventListener("click", () => {
    const selected = category.textContent.toLowerCase();
    const products = document.querySelectorAll(".productItem");

    products.forEach(product => {
      const title = product.querySelector("h3").textContent.toLowerCase();
      if (selected === "all products" || title.includes(selected)) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  });
});

// 🛒 Ajout au panier
document.querySelectorAll(".cartButton").forEach(button => {
  button.addEventListener("click", (e) => {
    e.stopPropagation(); // Empêche le clic de déclencher la redirection
    const product = button.closest(".productItem");
    const name = product.querySelector("h3").textContent;
    const price = product.querySelector(".prodPrice").textContent;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${name} ajouté au panier !`);
  });
});

// 💳 Achat immédiat
document.querySelectorAll(".buyButton").forEach(button => {
  button.addEventListener("click", (e) => {
    e.stopPropagation(); // Empêche le clic de déclencher la redirection
    const product = button.closest(".productItem");
    const name = product.querySelector("h3").textContent;
    alert(`Merci pour votre achat de ${name} !`);
    // window.location.href = "checkout.html"; // Si tu veux rediriger
  });
});

// 📄 Redirection vers la page de détails
document.querySelectorAll(".productItem").forEach(item => {
  item.addEventListener("click", () => {
    const name = item.querySelector("h3").textContent;
    const price = item.querySelector(".prodPrice").textContent;
    const rating = item.querySelector(".numRating").textContent;
    const imageSrc = item.querySelector("img").getAttribute("src");

    localStorage.setItem("selectedProduct", JSON.stringify({
      name,
      price,
      rating,
      imageSrc
    }));

    window.location.href = "prodDetails.html";
  });
});
