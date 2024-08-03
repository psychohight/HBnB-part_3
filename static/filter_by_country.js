document.addEventListener('DOMContentLoaded', function () {
    const countryFilter = document.getElementById('country-filter');

    countryFilter.addEventListener('change', function () {
        const selectedCountry = countryFilter.value;
        const filteredPlaces = window.allPlaces.filter(place => {
            return selectedCountry === 'All' || place.country === selectedCountry;
        });
        renderPlaces(filteredPlaces);
    });
});
