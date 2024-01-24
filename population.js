let searchEle = document.getElementById("searchInput");

let resultCountriesEle = document.getElementById("resultCountries");

let spinnerEle = document.getElementById("spinner");

let inputText = "";
let countryList = [];


function createAndAppendCountry(country) {

    let countryEle = document.createElement("div");
    countryEle.classList.add("country-card", "col-11", "col-md-5", "mr-auto", "ml-auto", "d-flex", "flex-row");
    resultCountriesEle.appendChild(countryEle);


    let countryImgEle = document.createElement("img");
    countryImgEle.classList.add("country-flag", "mt-auto", "mb-auto");
    countryImgEle.src = country.flag;
    countryEle.appendChild(countryImgEle);

    let countryEleDiv = document.createElement("div");
    countryEleDiv.classList.add("d-flex", "flex-column", "ml-4");
    countryEle.appendChild(countryEleDiv);

    let countryName = document.createElement("p");
    countryName.textContent = country.name;
    countryName.classList.add("country-name");
    countryEle.appendChild(countryName);

    let countryPopulation = document.createElement("p");
    countryPopulation.textContent = country.population;
    countryPopulation.classList.add("country-population");
    countryEle.appendChild(countryPopulation);


}



function displayResults() {
    resultCountriesEle.textContent = "";
    for (let country of countryList) {
        let countryName = country.name;
        if (countryName.includes(inputText)) {
            createAndAppendCountry(country);
        }
    }
}


function searchResult() {
    let url = "https://apis.ccbp.in/countries-data";

    let option = {
        method: "GET"
    };
    spinnerEle.classList.remove("d-none");

    // making an http request get method using fetch//
    fetch(url, option)
        .then(function(response) {
            return response.json();

        })
        .then(function(jsonData) {
            spinnerEle.classList.add("d-none");
            countryList = jsonData;
            displayResults();
        });



}

function onchangeSearch(event) {
    inputText = event.target.value;
    displayResults();
}
searchResult();
searchEle.addEventListener("keyup", onchangeSearch);