document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Empêche le comportement par défaut de soumission du formulaire
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('error-message');

            try {
                const response = await loginUser(email, password);
                if (response.ok) {
                    const data = await response.json();
                    // Stocker le token JWT dans un cookie
                    document.cookie = `token=${data.access_token}; path=/`;
                    // Rediriger vers la page principale
                    window.location.href = 'index.html';
                } else {
                    errorMessage.style.display = 'block'; // Afficher le message d'erreur
                }
            } catch (error) {
                console.error('Error:', error);
                errorMessage.style.display = 'block';
            }
        });
    }
});

async function loginUser(email, password) {
    const API_URL = 'http://localhost:5500/templates/login';
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    return response;
}
