// API Link : https://restcountries.com/#endpoints-name

// Dynamically add student id and name
const studentID = document.querySelector("#studentID");
const showStudentID = document.querySelector("#showStuBtn");

// Add event listener to put name and student ID into p tag
showStudentID.addEventListener("click", function () {
  studentID.textContent = "200530585 Seahee Hong";
});

// The URL for the country Search API
const baseURL = "https://restcountries.com/v3.1/name/";

let url;

// Grab references to all the DOM elements
const searchTerm = document.querySelector(".search");
const searchForm = document.querySelector("form");
const section = document.querySelector("section");

// Attach the event listener to the form's submit event
searchForm.addEventListener("submit", fetchResults);

// Functions
function fetchResults(event) {
  // Use preventDefault() to stop the form submitting
  event.preventDefault();

  // Check if searchTerm is empty
  if (searchTerm.value.trim() === "") {
    console.error("Search term is empty");
    return;
  }

  // Assemble the full URL
  url = baseURL + searchTerm.value;
  console.log(url);

  // Use fetch() to pass the URL that I built as a request to the API service, then pass the JSON to the displayResults() function
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((json) => displayResults(json))
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

function displayResults(json) {
  // Clear out the old results
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }

  // Check if there are no results
  if (json.length === 0) {
    const para = document.createElement("p");
    para.textContent = "No results returned.";
    section.appendChild(para);
    return;
  }

  // Create and display results
  json.forEach((countryData) => {
    const country = document.createElement("div");
    const countryName = document.createElement("h2");
    const map = document.createElement("p");
    const mapLink = document.createElement("a");
    const flag = document.createElement("img");
    const capital = document.createElement("p");
    const population = document.createElement("p");

    // From the output at the console get data
    mapLink.href = countryData.maps.googleMaps;
    flag.src = countryData.flags.png;
    capital.textContent = "Capital: " + countryData.capital;
    population.textContent =
      "Population: " + countryData.population.toLocaleString();
    countryName.textContent = countryData.name.official;
    mapLink.textContent = "Map";

    // Put each country together as an element and append it as a child of the SECTION element in the HTML
    country.appendChild(countryName);
    country.appendChild(flag);
    country.appendChild(capital);
    country.appendChild(population);
    map.appendChild(mapLink);
    country.appendChild(map);
    section.appendChild(country);
  });
}
