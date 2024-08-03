document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('review-form');
    const token = checkAuthentication();
    const placeId = getPlaceIdFromURL();

    // Pré-remplir le champ de lieu
    const placeInput = document.getElementById('place');
    if (placeId) {
        placeInput.value = `Place ID: ${placeId}`; // Optionnel : afficher l'ID du lieu pour référence
    }

    if (reviewForm) {
        reviewForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const reviewText = document.getElementById('review').value;
            await submitReview(token, placeId, reviewText);
        });
    }
});

function checkAuthentication() {
    const token = getCookie('token');
    if (!token) {
        window.location.href = 'index.html'; // Rediriger si non authentifié
    }
    return token;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

function getPlaceIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id'); // Assurez-vous que l'URL a un paramètre `id`
}

async function submitReview(token, placeId, reviewText) {
    try {
        const response = await fetch('/reviews', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                place_id: placeId,
                text: reviewText
            })
        });

        handleResponse(response);
    } catch (error) {
        console.error('Error submitting review:', error);
    }
}

function handleResponse(response) {
    if (response.ok) {
        alert('Review submitted successfully!');
        document.getElementById('review-form').reset(); // Effacer le formulaire
    } else {
        alert('Failed to submit review');
    }
}
