// Make search input be the city name //

function updateCityName(event) {
  event.preventDefault();
  let textInput = document.querySelector("#text-input-form");
  let cityName = document.querySelector("#city");
  cityName.innerHTML = textInput.value;
}

let searchInput = document.querySelector("#city-search-form");
searchInput.addEventListener("submit", updateCityName);
