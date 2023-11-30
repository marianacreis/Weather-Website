function refreshWeather(response) {
  let temperatureElement = document.querySelector("#current-city-temp");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);

  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.city;
}

function searchCity(city) {
  let apiKey = "dd09922bof9dfbd100daf3a044cat44d";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(refreshWeather);
}

function updateCityName(event) {
  event.preventDefault();
  let textInput = document.querySelector("#text-input-form");

  searchCity(textInput.value);
}

let searchInput = document.querySelector("#city-search-form");
searchInput.addEventListener("submit", updateCityName);

searchCity("Porto");
