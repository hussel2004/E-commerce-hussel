document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formPaiement");
  const messageProcessing = document.getElementById("messageProcessing");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      nom: document.getElementById("nom").value.trim(),
      email: document.getElementById("email").value.trim(),
      adresse: document.getElementById("adresse").value.trim(),
      ville: document.getElementById("ville").value.trim(),
      codePostal: document.getElementById("codePostal").value.trim(),
      typeCarte: document.getElementById("typeCarte").value,
      numeroCarte: document.getElementById("numeroCarte").value.trim(),
      dateExpiration: document.getElementById("dateExpiration").value,
      cvc: document.getElementById("cvc").value.trim(),
    };

    // Basic validation
    for (const key in data) {
      if (!data[key]) {
        alert("Veuillez remplir tous les champs.");
        return;
      }
    }

    // Build order object including cart from localStorage
    const cart = JSON.parse(localStorage.getItem("panier") || "[]");
    const commande = {
      client: data,
      panier: cart,
      total: cart.reduce((s, item) => s + (item.price * item.quantity), 0)
    };

    const jsonCommande = JSON.stringify(commande, null, 2);
    console.log("🧾 Données prêtes à être envoyées au backend :");
    console.log(jsonCommande);

    // Show processing message and simulate sending
    form.style.display = "none";
    messageProcessing.style.display = "block";

    setTimeout(() => {
      // On success: clear cart and redirect
      localStorage.removeItem("panier");
      window.location.href = "paiement_reussi.html";
    }, 2000);
  });
});
