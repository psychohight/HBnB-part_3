document.addEventListener('DOMContentLoaded', function () {
    fetch('/countries')
        .then((response) => response.json())
        .then((data) => {
            const countryDropdown = document.getElementById('country-filter');
            data.forEach(country => {
                const option = document.createElement('option');
                option.value = country.code;
                option.textContent = country.name;
                countryDropdown.appendChild(option);
            });
        });
});