// Fetch Users function
async function fetchUsersData() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            console.log(`Network response was not ok - Status: ${response.status}`);
            return;
        }

        const data = await response.json();

        console.log(data);

        displayUsersData(data);

    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}


// Fetch Countries function
async function fetchCountriesData(region = "europe") {

    const container = document.getElementById("remote-data-container");
    container.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(`https://restcountries.com/v3.1/region/${region}`);

        if (!response.ok) {
            throw new Error(`Network error: ${response.status}`);
        }

        const data = await response.json();

        displayCountriesData(data);

    } catch (error) {

        container.innerHTML = `<p class="no-results">⚠️ Could not load countries. Please try again.</p>`;
        console.error(error);
    }
}



// Fetch Rick & Morty data function
async function fetchRMData(name = "") {

    try {

        const url = name
            ? `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(name)}`
            : `https://rickandmortyapi.com/api/character`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            const container = document.getElementById("remote-data-container");
            container.innerHTML = `No characters found matching "${name}".`;
            return;
        }

        displayRMData(data.results);

    } catch (error) {

        const container = document.getElementById("remote-data-container");
        container.innerHTML = `⚠️ Could not load data. Please try again.`;

        console.error(error);
    }
}



// Display countries function
function displayCountriesData(countriesArray) {

    const container = document.getElementById("remote-data-container");

    let htmlOutput = `<p><b>Showing ${countriesArray.length} countries</b></p>`;

    countriesArray.forEach(country => {

        htmlOutput += `
        <div style="border: 1px solid #ccc; padding: 12px; border-radius: 6px;">

            <img src="${country.flags?.png}" alt="Flag of ${country.name.common}" width="100">

            <p>
                <b>${country.name.common}</b><br>

                Capital: ${country.capital ? country.capital[0] : "N/A"}<br>

                Population: ${country.population.toLocaleString()}<br>

                Region: ${country.region}

            </p>

        </div>
        `;
    });

    container.innerHTML = htmlOutput;
}



// Display users function
function displayUsersData(usersArray) {

    const container = document.getElementById("remote-data-container");

    let htmlOutput = "";

    usersArray.forEach(user => {

        htmlOutput += `
        <div style="border: 1px solid #ccc; padding: 12px; border-radius: 6px;">
            <p>
                <b>${user.name} (${user.username})</b><br>
                Email: <a href="mailto:${user.email}">${user.email}</a><br>
                Website: <a href="http://${user.website}" target="_blank">${user.website}</a><br>
                Location: ${user.address.street}, ${user.address.city}
            </p>
        </div>
        `;
    });

    container.innerHTML = htmlOutput;
}



// Display Rick & Morty characters function
function displayRMData(rmArray) {

    const container = document.getElementById("remote-data-container");

    let htmlOutput = "";

    rmArray.forEach(character => {

        htmlOutput += `
        <div style="border: 1px solid #ccc; padding: 12px; border-radius: 6px;">
            <img src="${character.image}" alt="${character.name}" width="100">

            <p>
                <b>${character.name}</b><br>
                Status: ${character.status}
            </p>
        </div>
        `;
    });

    container.innerHTML = htmlOutput;
}



// -------------------------------------------------------
// Event listener on button container
// -------------------------------------------------------

document.getElementById("button-container").addEventListener("click", function(e) {

    if (e.target.id === "btn-countries") {

        document.getElementById("filter-rm").style.display = "none";
        document.getElementById("section-countries").style.display = "block";

        // Reset dropdown to Europe
        regionSelect.value = "europe";

        fetchCountriesData();

    }

    else if (e.target.id === "btn-users") {

        fetchUsersData();

        document.getElementById("filter-rm").style.display = "none";
        document.getElementById("section-countries").style.display = "none";
    }

    else if (e.target.id === "btn-rm") {

        document.getElementById("characterSearch").value = "";

        document.getElementById("remote-data-container").innerHTML = "";

        fetchRMData();

        document.getElementById("filter-rm").style.display = "block";
        document.getElementById("section-countries").style.display = "none";
    }
});



// -------------------------------------------------------
// Countries by region dropdown
// -------------------------------------------------------

const regionSelect = document.getElementById("regionSelect");

regionSelect.addEventListener("change", () => {

    const selectedRegion = regionSelect.value;

    fetchCountriesData(selectedRegion);
});



// -------------------------------------------------------
// Filter Rick & Morty characters by name
// -------------------------------------------------------

const characterSearch = document.getElementById("characterSearch");

characterSearch.addEventListener("input", () => {

    const searchTerm = characterSearch.value.trim();

    if (searchTerm === "") {

        const container = document.getElementById("remote-data-container");
        container.innerHTML = "";

        return;
    }

    fetchRMData(searchTerm);
});



// -------------------------------------------------------
// Reset dropdown when page loads
// -------------------------------------------------------

window.addEventListener("load", () => {

    regionSelect.value = "europe";

});