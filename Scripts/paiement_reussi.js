document.addEventListener("DOMContentLoaded", () => {
  const loadingBox = document.getElementById("loading-box");
  const successBox = document.getElementById("success-box");

  // Simule une confirmation de paiement
  setTimeout(() => {
    loadingBox.style.display = "none";
    successBox.style.display = "block";
    // Clear cart just in case
    localStorage.removeItem("panier");
  }, 2000);

  // Return button handler (JS navigation)
  const btnReturn = document.getElementById("btnReturn");
  if (btnReturn) {
    btnReturn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "../index.html";
    });
  }
});
