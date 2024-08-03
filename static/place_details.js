document.addEventListener('DOMContentLoaded', function () {
    const placeId = getPlaceIdFromURL();
    const token = checkAuthentication();

    if (placeId) {
        fetchPlaceDetails(placeId, token);
    }

    function getPlaceIdFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id'); // Assurez-vous que l'URL a un paramètre `id`
    }

    function checkAuthentication() {
        const token = getCookie('token');
        const addReviewSection = document.getElementById('add-review');

        if (!token) {
            addReviewSection.style.display = 'none'; // Masquer le formulaire d'ajout de commentaires
        } else {
            addReviewSection.style.display = 'block'; // Afficher le formulaire d'ajout de commentaires
        }
        return token;
    }

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    async function fetchPlaceDetails(placeId, token) {
        try {
            const response = await fetch(`/places/${placeId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const place = await response.json();
                displayPlaceDetails(place);
                displayReviews(place.reviews); // Assuming the API returns reviews within the place object
            } else {
                console.error('Failed to fetch place details:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching place details:', error);
        }
    }

    function displayPlaceDetails(place) {
        const placeDetails = document.getElementById('place-details');
        placeDetails.innerHTML = ''; // Clear existing content

        const placeCard = document.createElement('div');
        placeCard.classList.add('place-details-card');

        const placeImage = document.createElement('img');
        placeImage.src = place.image_url || '../static/images/beach-house-large.jpeg'; // Default image if not provided
        placeImage.alt = place.name;
        placeImage.classList.add('place-image-large');

        const placeInfo = document.createElement('div');
        placeInfo.classList.add('place-info');

        const placeTitle = document.createElement('h2');
        placeTitle.classList.add('place-title');
        placeTitle.textContent = place.name;

        const placeDescription = document.createElement('p');
        placeDescription.textContent = place.description;

        const placeLocation = document.createElement('p');
        placeLocation.textContent = `Location: ${place.city}, ${place.country}`;

        const placePrice = document.createElement('p');
        placePrice.textContent = `Price per night: $${place.price_by_night}`;

        const placeAmenities = document.createElement('p');
        placeAmenities.textContent = `Amenities: ${place.amenities.join(', ')}`; // Assuming amenities is an array

        placeInfo.appendChild(placeTitle);
        placeInfo.appendChild(placeDescription);
        placeInfo.appendChild(placeLocation);
        placeInfo.appendChild(placePrice);
        placeInfo.appendChild(placeAmenities);

        placeCard.appendChild(placeImage);
        placeCard.appendChild(placeInfo);

        placeDetails.appendChild(placeCard);
    }

    function displayReviews(reviews) {
        const reviewsSection = document.getElementById('reviews');
        reviewsSection.innerHTML = ''; // Clear existing reviews

        if (reviews.length === 0) {
            const noReviews = document.createElement('p');
            noReviews.textContent = 'No reviews yet.';
            reviewsSection.appendChild(noReviews);
        } else {
            reviews.forEach(review => {
                const reviewCard = document.createElement('div');
                reviewCard.classList.add('review-card');

                const reviewerName = document.createElement('p');
                reviewerName.innerHTML = `<strong>${review.user_name}:</strong>`;
                
                const reviewText = document.createElement('p');
                reviewText.textContent = review.text;

                const reviewRating = document.createElement('p');
                reviewRating.innerHTML = `<strong>Rating:</strong> ${'★'.repeat(review.rating)}`;

                reviewCard.appendChild(reviewerName);
                reviewCard.appendChild(reviewText);
                reviewCard.appendChild(reviewRating);

                reviewsSection.appendChild(reviewCard);
            });
        }
    }
});
