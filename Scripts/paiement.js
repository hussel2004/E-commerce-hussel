// ...existing code...
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  let messageProcessing = document.getElementById("messageProcessing");

  // If the HTML doesn't include a processing message element, create a simple fallback
  if (!messageProcessing) {
    messageProcessing = document.createElement("div");
    messageProcessing.id = "messageProcessing";
    messageProcessing.textContent = "Processing payment...";
    messageProcessing.style.display = "none";
    messageProcessing.style.padding = "16px";
    messageProcessing.style.textAlign = "center";
    messageProcessing.style.fontWeight = "600";
    form.parentNode.insertBefore(messageProcessing, form.nextSibling);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      fullName: (document.querySelector('[name="fullName"]')?.value || "").trim(),
      email: (document.querySelector('[name="email"]')?.value || "").trim(),
      address: (document.querySelector('[name="address"]')?.value || "").trim(),
      city: (document.querySelector('[name="city"]')?.value || "").trim(),
      state: (document.querySelector('[name="state"]')?.value || "").trim(),
      zip: (document.querySelector('[name="zip"]')?.value || "").trim(),
      cardName: (document.querySelector('[name="cardName"]')?.value || "").trim(),
      cardNumber: (document.querySelector('[name="cardNumber"]')?.value || "").trim(),
      expMonth: (document.querySelector('[name="expMonth"]')?.value || "").trim(),
      expYear: (document.querySelector('[name="expYear"]')?.value || "").trim(),
      cvv: (document.querySelector('[name="cvv"]')?.value || "").trim(),
    };

    console.log("🧾 Données du formulaire de paiement :", data);

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
      total: cart.reduce((s, item) => s + (item.price * item.quantity), 0),
    };

    console.log("🧾 Données prêtes à être envoyées au backend :", commande);

    // Show processing message and simulate sending
    form.style.display = "none";
    messageProcessing.style.display = "block";

    setTimeout(() => {
      // On success: clear cart and redirect
      localStorage.removeItem("panier");
      window.location.href = "./paiement_reussi.html";
    }, 2000);
  });
});
// ...existing code...