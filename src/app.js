function refreshWeather(response) {
  let temperatureElement = document.querySelector("#current-city-temp");
  let temperature = response.data.daily[0].temperature.day;
  let cityNameElement = document.querySelector("#city");
  let weatherDescriptionElement = document.querySelector(
    "#current-city-description"
  );
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let maxTempElement = document.querySelector("#max-temp");
  let maxTemp = response.data.daily[0].temperature.maximum;
  let minTempElement = document.querySelector("#min-temp");
  let minTemp = response.data.daily[0].temperature.minimum;
  let dateElement = document.querySelector("#date");
  let date = new Date(response.data.daily[0].time * 1000);
  let mainIcon = document.querySelector("#main-icon");

  dateElement.innerHTML = formatDate(date);
  cityNameElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  weatherDescriptionElement.innerHTML =
    response.data.daily[0].condition.description;
  windElement.innerHTML = `${response.data.daily[0].wind.speed} MPH`;
  humidityElement.innerHTML = `${response.data.daily[0].temperature.humidity}%`;
  maxTempElement.innerHTML = `${Math.round(maxTemp)}ºC`;
  minTempElement.innerHTML = `${Math.round(minTemp)}ºC`;
  mainIcon.innerHTML = `<img src="${response.data.daily[0].condition.icon_url}" class="main-icon" />`;
}

function formatDate(date) {
  let dayNumber = date.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April,",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];

  return `${day}, ${dayNumber} ${month}`;
}

function searchCity(city) {
  let apiKey = "dd09922bof9dfbd100daf3a044cat44d";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(refreshWeather);
}

function updateCityName(event) {
  event.preventDefault();
  let textInput = document.querySelector("#text-input-form");

  searchCity(textInput.value);
}

function displayForecast() {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let forecastHTML = "";

  weekDays.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<hr class="line" />
        <ul class="week-forecast">
          <li class="week-day">${day}</li>
          <img
            src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/104/711/original/clear-sky-day.png?1700660394"
            class="week-forecast-icon"
          />
          <li class="week-temp">10º | 15º</li>
        </ul>`;
  });

  let forecastElement = document.querySelector("#week-forecast-container");
  forecastElement.innerHTML = forecastHTML;
}

let searchInput = document.querySelector("#city-search-form");
searchInput.addEventListener("submit", updateCityName);

searchCity("Porto");
displayForecast();
