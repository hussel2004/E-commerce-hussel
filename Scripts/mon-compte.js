// ===============================================
// 1. SIMULATION DES DONNÉES 
// ===============================================

const clientData = {
    dateCreation: "15 Janvier 2022",
    totalCommandes: 56,
    pointsFidelite: 520,
    recompenses: "2 bons d’achat"
};

const historiqueCommandes = [
    { code: "A2025-001", date: "01/09/2025", statut: "Livrée", montant: 230.00 },
    { code: "A2025-002", date: "15/09/2025", statut: "Livrée", montant: 1200.50 },
    { code: "A2025-003", date: "28/09/2025", statut: "Livrée", montant: 86.00 },
    { code: "A2025-004", date: "05/10/2025", statut: "Annulée", montant: 45.00 },
    { code: "A2025-005", date: "12/10/2025", statut: "En attente", montant: 2100.00 },
];

const produitsConsultes = [
    "Samsung S26",
    "Earbuds pro",
    "Iphone 17",
    "Asus Gaming Pc"
];

// ===============================================
// 2. RENDU DYNAMIQUE DES DONNÉES
// ===============================================

document.addEventListener('DOMContentLoaded', () => {
    // Remplissage des sections statiques (Résumé & Fidélité)
    renderClientSummary(clientData);

    // Génération de l'historique des commandes
    renderCommandHistory(historiqueCommandes);

    // Génération de la liste des produits consultés
    renderConsultedProducts(produitsConsultes);
});


/**
 * Met à jour le contenu des sections Résumé et Fidélité.
 * @param {object} data - Les données du client.
 */
function renderClientSummary(data) {
    document.getElementById("compte-date-creation").textContent = data.dateCreation;
    document.getElementById("compte-total-commandes").textContent = data.totalCommandes;

    document.getElementById("fidelite-points").textContent = data.pointsFidelite;
    document.getElementById("fidelite-recompenses").textContent = data.recompenses;
}

/**
 * Génère dynamiquement les lignes du tableau d'historique des commandes.
 * @param {Array<object>} commandes - La liste des objets commande.
 */
function renderCommandHistory(commandes) {
    const tbody = document.getElementById("history-body");
    tbody.innerHTML = ''; 

    // Utilisation de .map et .join pour une injection de HTML performante
    const rowsHTML = commandes.map(cmd => `
        <tr>
            <td>${cmd.code}</td>
            <td>${cmd.date}</td>
            <td><span class="status-${cmd.statut.toLowerCase().replace(' ', '-')}">${cmd.statut}</span></td>
            <td>$${cmd.montant.toFixed(2)}</td>
            <td>
                <a href="../pages/prodDetails.html">Détails</a> | 
                <a href="/facture/${cmd.code}" target="_blank">Facture</a>
            </td>
        </tr>
    `).join('');

    tbody.innerHTML = rowsHTML;
}

/**
 * Génère dynamiquement les éléments <li> de la liste des produits consultés.
 * @param {Array<string>} produits - La liste des noms de produits.
 */
function renderConsultedProducts(produits) {
    const ul = document.getElementById("consulted-list");
    ul.innerHTML = '';

    const listItemsHTML = produits.map(produit => `
        <li><a href="../pages/prodDetails.html">${produit}</a></li> 
    `).join('');

    ul.innerHTML = listItemsHTML;
}

// NOTE :feature: ajouter des styles CSS pour les différents statuts de commande (Livrée, En attente, Annulée) 
// en utilisant les classes générées ci-dessus (ex: .status-livree, .status-en-attente).
