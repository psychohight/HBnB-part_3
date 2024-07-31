document.addEventListener('DOMContentLoaded', function () {
    const placesList = document.getElementById('places-list');
    const countryFilter = document.getElementById('country-filter');

    // Function to get a cookie by name
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // Function to fetch places
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
                console.error('Failed to fetch places');
                return;
            }

            const places = await response.json();
            renderPlaces(places);

        } catch (error) {
            console.error('Error fetching places:', error);
        }
    }

    // Function to render places
    function renderPlaces(places) {
        placesList.innerHTML = '';
        places.forEach(place => {
            const placeCard = document.createElement('div');
            placeCard.classList.add('place-card');

            const placeImage = document.createElement('img');
            placeImage.src = `../static/images/beach-house.jpeg`;
            placeImage.alt = place.name;
            placeImage.classList.add('place-image');

            const placeTitle = document.createElement('h3');
            placeTitle.textContent = place.name;

            const placePrice = document.createElement('p');
            placePrice.textContent = `Price per night: ${place.price_by_night}`;

            const placeLocation = document.createElement('p');
            placeLocation.textContent = `Location: ${place.city_id}`;

            const detailsButton = document.createElement('button');
            detailsButton.textContent = 'View Details';
            detailsButton.classList.add('details-button');

            placeCard.appendChild(placeImage);
            placeCard.appendChild(placeTitle);
            placeCard.appendChild(placePrice);
            placeCard.appendChild(placeLocation);
            placeCard.appendChild(detailsButton);

            placesList.appendChild(placeCard);
        });
    }

    // Fetch places if the user is logged in
    fetchPlaces();
});
