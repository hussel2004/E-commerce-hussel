//  GESTION DU PANIER (MON PANIER)


// Fonction pour mettre à jour le total du panier
function updateCartTotal() {
  let subtotal = 0;
  const cartItems = document.querySelectorAll(".cart-item");

  cartItems.forEach(item => {
    const priceElement = item.querySelector(".price");
    const quantityElement = item.querySelector(".quantity span");
    const totalElement = item.querySelector(".total");

    const price = parseFloat(priceElement.textContent.replace("€", "").trim());
    const quantity = parseInt(quantityElement.textContent);

    const itemTotal = price * quantity;
    totalElement.textContent = itemTotal.toFixed(2) + " €";

    subtotal += itemTotal;
  });

  // Met à jour le sous-total et le total dans le résumé
  const subtotalElement = document.querySelector(".summary .subtotal-value");
  const totalElement = document.querySelector(".summary .total-value");

  subtotalElement.textContent = subtotal.toFixed(2) + " €";
  totalElement.textContent = subtotal.toFixed(2) + " €";
}

//  GESTION DES BOUTONS + et -

function setupQuantityButtons() {
  const plusButtons = document.querySelectorAll(".qty-btn.plus");
  const minusButtons = document.querySelectorAll(".qty-btn.minus");

  plusButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const quantityElement = btn.parentElement.querySelector("span");
      let currentQuantity = parseInt(quantityElement.textContent);
      quantityElement.textContent = currentQuantity + 1;
      updateCartTotal();
    });
  });

  minusButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const quantityElement = btn.parentElement.querySelector("span");
      let currentQuantity = parseInt(quantityElement.textContent);
      if (currentQuantity > 1) {
        quantityElement.textContent = currentQuantity - 1;
        updateCartTotal();
      }
    });
  });
}

// SUPPRESSION D’UN PRODUIT

function setupRemoveButtons() {
  const removeButtons = document.querySelectorAll(".remove-btn");

  removeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".cart-item");
      item.remove();
      updateCartTotal();
    });
  });
}

// MESSAGE AU CHECKOUT

function setupCheckoutButton() {
  const checkoutBtn = document.querySelector(".checkout");
  checkoutBtn.addEventListener("click", () => {
    alert("✅ Merci pour votre achat ! Votre commande est en cours de traitement.");
  });
}

//  INITIALISATION

document.addEventListener("DOMContentLoaded", () => {
  setupQuantityButtons();
  setupRemoveButtons();
  setupCheckoutButton();
  updateCartTotal();
});

// Continue shopping
document.addEventListener('DOMContentLoaded', () => {
    // simple navigation for elements that use data-href
    document.querySelectorAll('[data-href]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const href = el.dataset.href; //To get the data from the element and store its value
            if (!href) return;
            // if you want to open in same tab:
            window.location.href = href;
            // or to replace history entry:
            // window.location.replace(href);
            // or open in new tab:
            // window.open(href, '_blank');
        });
    });
});