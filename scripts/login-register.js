// script.js

// Sélection du formulaire
const form = document.getElementById('myForm');
const formregister = document.getElementById('myFormRegister');
const message = document.getElementById('message');

// 1️⃣ Validation du formulaire + envoi au serveur
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // empêche le rechargement automatique de la page

    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const username = form.username.value.trim();

    // --- Vérification de base ---
    if (username === '' || email === '' || password === '') {
        message.textContent = 'Veuillez remplir tous les champs.';
        message.style.color = 'red';
        return;
    }

    // Vérif email simple (regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        message.textContent = 'Email invalide.';
        message.style.color = 'red';
        return;
    }

    // --- Envoi des données au serveur ---
    try {
        const response = await fetch('https://ton-serveur.com/api/formulaire', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        // --- Réponse du serveur ---
        if (response.ok) {
            message.textContent = '✅ Envoi réussi ! ' + (data.message || '');
            message.style.color = 'green';
        } else {
            message.textContent = '❌ Échec de l’envoi : ' + (data.error || 'Erreur inconnue');
            message.style.color = 'red';
        }

    } catch (error) {
        message.textContent = '⚠️ Erreur de connexion au serveur.';
        message.style.color = 'red';
        console.error(error);
    }
});

formregister.addEventListener('submit', async (e) => {
    e.preventDefault(); // empêche le rechargement automatique de la page

    const email = formregister.email.value.trim();
    const password = formregister.password.value.trim();
    const confirm_password = formregister.confirm_password.value.trim();
    const username = formregister.username.value.trim();

    // --- Vérification de base ---
    if (name === '' || email === '' || password === '' || confirm_password !== password) {
        message.textContent = 'Veuillez remplir tous les champs.';
        message.style.color = 'red';
        return;
    }

    // Vérif email simple (regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        message.textContent = 'Email invalide.';
        message.style.color = 'red';
        return;
    }

    // --- Envoi des données au serveur ---
    try {
        const response = await fetch('https://ton-serveur.com/api/formulaire', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password, confirm_password })
        });

        const dataR = await response.json();

        // --- Réponse du serveur ---
        if (response.ok) {
            message.textContent = '✅ Envoi réussi ! ' + (dataR.message || '');
            message.style.color = 'green';
        } else {
            message.textContent = '❌ Échec de l’envoi : ' + (dataR.error || 'Erreur inconnue');
            message.style.color = 'red';
        }

    } catch (error) {
        message.textContent = '⚠️ Erreur de connexion au serveur.';
        message.style.color = 'red';
        console.error(error);
    }
});


// 2️⃣ Fonctions de redirection
function redirectTo(url) {
    window.location.href = url;
}

// Exemple : redirection en cliquant sur un bouton ou un lien
document.getElementById('goToLogin').addEventListener('click', () => {
    redirectTo('/login-page.html');
});

document.getElementById('goToRegister').addEventListener('click', (e) => {
    e.preventDefault(); // empêche comportement par défaut du lien
    redirectTo('/register-page.html');
});
