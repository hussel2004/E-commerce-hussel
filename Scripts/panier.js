/*
Panier JS: gestion du panier via localStorage
Structure d'un item: { id, title, price, quantity }
*/

document.addEventListener('DOMContentLoaded', () => {
  // expose functions globally so other pages can call addToCart(item)
  window.getCart = () => JSON.parse(localStorage.getItem('panier') || '[]');

  window.saveCart = (cart) => localStorage.setItem('panier', JSON.stringify(cart));

  window.addToCart = (item) => {
    const cart = window.getCart();
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      cart.push(item);
    }
    window.saveCart(cart);
    alert(item.title + ' ajouté au panier');
  };

  window.removeFromCart = (id) => {
    let cart = window.getCart();
    cart = cart.filter(i => i.id !== id);
    window.saveCart(cart);
    renderCart(); // if on a cart page, refresh
  };

  window.updateQuantity = (id, qty) => {
    const cart = window.getCart();
    const item = cart.find(i => i.id === id);
    if (item) {
      item.quantity = qty;
      if (item.quantity <= 0) {
        window.removeFromCart(id);
        return;
      }
      window.saveCart(cart);
      renderCart();
    }
  };

  window.cartTotal = () => {
    const cart = window.getCart();
    return cart.reduce((sum, it) => sum + (it.price * it.quantity), 0);
  };

  // If there's a cart table on this page, render it
  function formatPrice(p) {
    return p.toFixed(2) + '€';
  }

  window.renderCart = () => {
    const table = document.getElementById('cartTable');
    const totalEl = document.getElementById('cartTotal');
    if (!table) return;
    const cart = window.getCart();
    // clear existing rows
    table.innerHTML = '<tr><th>Produit</th><th>Qté</th><th>Prix</th><th></th></tr>';
    cart.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.title}</td>
        <td><input type="number" min="1" value="${item.quantity}" data-id="${item.id}" class="qty-input" style="width:60px"></td>
        <td>${formatPrice(item.price * item.quantity)}</td>
        <td><button class="remove-btn" data-id="${item.id}">Supprimer</button></td>
      `;
      table.appendChild(row);
    });
    if (totalEl) totalEl.textContent = formatPrice(window.cartTotal());
    // attach events
    table.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        window.removeFromCart(id);
      });
    });
    table.querySelectorAll('.qty-input').forEach(inp => {
      inp.addEventListener('change', (e) => {
        const id = e.target.getAttribute('data-id');
        const qty = parseInt(e.target.value, 10) || 1;
        window.updateQuantity(id, qty);
      });
    });
  };

  // auto render on load if needed
  window.renderCart();
});
