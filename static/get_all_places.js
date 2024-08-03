document.addEventListener('DOMContentLoaded', function () {
    const placesList = document.getElementById('places-list');
    const countryFilter = document.getElementById('country-filter');

    // Stocker les lieux globalement pour un accès par filter_by_country.js
    window.allPlaces = [];

    // Fonction pour obtenir un cookie par nom
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // Fonction pour récupérer les lieux
    async function fetchPlaces() {
        const token = getCookie('jwt_token');

        if (!token) {
            console.error('User is not logged in');
            return;
        }

        try {
            const response = await fetch('/places', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                console.error('Failed to fetch places:', response.status, response.statusText);
                return;
            }

            const places = await response.json();
            window.allPlaces = places; // Stocker les lieux récupérés globalement
            renderPlaces(places);

        } catch (error) {
            console.error('Error fetching places:', error);
        }
    }

    // Fonction pour afficher les lieux
    function renderPlaces(places) {
        placesList.innerHTML = ''; // Vider la liste des lieux

        places.forEach(place => {
            const placeCard = document.createElement('div');
            placeCard.classList.add('place-card');

            const placeImage = document.createElement('img');
            // Assurez-vous que l'API fournit l'URL de l'image correcte
            placeImage.src = `../static/images/${place.image}`; // Remplacer par place.image_url si disponible
            placeImage.alt = place.name;
            placeImage.classList.add('place-image');

            const placeTitle = document.createElement('h3');
            placeTitle.textContent = place.name;

            const placePrice = document.createElement('p');
            placePrice.textContent = `Price per night: $${place.price_by_night}`;

            const placeLocation = document.createElement('p');
            placeLocation.textContent = `Location: ${place.city_id}`; // Remplacez par place.city_name si disponible

            const detailsButton = document.createElement('button');
            detailsButton.textContent = 'View Details';
            detailsButton.classList.add('details-button');
            detailsButton.onclick = () => {
                window.location.href = `place.html?id=${place.id}`; // Naviguer vers les détails de l'endroit
            };

            placeCard.appendChild(placeImage);
            placeCard.appendChild(placeTitle);
            placeCard.appendChild(placePrice);
            placeCard.appendChild(placeLocation);
            placeCard.appendChild(detailsButton);

            placesList.appendChild(placeCard);
        });
    }

    // Récupérer les lieux si l'utilisateur est connecté
    fetchPlaces();

    // Exposer la fonction renderPlaces globalement
    window.renderPlaces = renderPlaces;
});

