var apiKey = "9484fb3037fb24e863ff617d2c22b3b1";
var cityInput = document.querySelector(".cityName");
var searchBtn = document.querySelector(".searchBtn");
var currentData = document.querySelector(".currentData");
var daysForecast = document.querySelector(".daysForecast");
var weatherDashboard = document.getElementById("weatherDashboard");

// Event listener for the search button
searchBtn.addEventListener("click", function () {
  var city = cityInput.value.trim();

  if (city) {
    WeatherData(city);
    updateSearchHistory(city);
    cityInput.value = "";
    toggleWeatherDashboard(true);
  }
});

// function to toggle the dashboard
function toggleWeatherDashboard() {
  var weatherDashboard = document.getElementById("weatherDashboard");
  if (weatherDashboard.style.display === "none") {
    weatherDashboard.style.display = "block";
  } else {
    weatherDashboard.style.display = "none";
  }
}

// Function to fetch weather data from the OpenWeatherMap
function WeatherData(cityName) {
  var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

  // Used the module activity as a reference for this code.
  // Fetch the current forecast
  fetch(currentWeatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayCurrentWeather(data);
    })
    .catch(function (error) {
      console.error("Error fetching current weather:", error);
      displayErrorMessage();
    });

  // Fetch 5-days forecast
  fetch(forecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayForecast(data);
    })
    .catch(function (error) {
      console.error("Error fetching forecast data:", error);
      displayErrorMessage();
    });
}

// Function to display current weather data
function displayCurrentWeather(data) {
  var weatherIcon = data.weather[0].icon;
  var temperatureKelvin = data.main.temp; // convert the Kelvin to Farenheit.
  var temperatureFahrenheit = (
    ((temperatureKelvin - 273.15) * 9) / 5 +
    32
  ).toFixed(2);

  currentData.innerHTML = `
        <h2>${data.name} (${dayjs().format("MM/DD/YYYY")})</h2>
        <img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">
        <p class="titleDetails">Temperature: ${temperatureFahrenheit}°F</p>
        <p class="titleDetails">Wind: ${data.wind.speed} m/s</p>
        <p class="titleDetails">Humidity: ${data.main.humidity}%</p>
      `;
}

// Function to 5 days forecast.
function displayForecast(data) {
  var forecastList = data.list;
  var displayedDates = []; // Used an array for the dates.
  forecastList.forEach((item, index) => {
    var weatherIcon = item.weather[0].icon;
    var date = dayjs(item.dt_txt).format("MM/DD/YYYY");
    var temperatureKelvin = item.main.temp;
    var temperatureFahrenheit = (
      ((temperatureKelvin - 273.15) * 9) / 5 +
      32
    ).toFixed(2);

    if (!displayedDates.includes(date)) {
      displayedDates.push(date);
      var forecastElement = document.querySelector(
        `.cardsDetails:nth-child(${displayedDates.length})`
      );

      if (forecastElement) {
        forecastElement.innerHTML = `
            <h2>${date}</h2>
            <img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">
            <p class="titleDetails">Temperature: ${temperatureFahrenheit}°F</p>
            <p class="titleDetails">Wind: ${item.wind.speed} m/s</p>
            <p class="titleDetails">Humidity: ${item.main.humidity}%</p>
          `;
      }
    }
  });
}
// Error message
function displayErrorMessage() {
  currentData.innerHTML = `<p class="error">Something went wrong. Please try again.</p>`;
  daysForecast.innerHTML = "";
}

// Event listener for the search history
function updateSearchHistory(city) {
  var searchHistory = document.querySelector(".searchHistory");
  var listItem = document.createElement("li");
  listItem.textContent = city;
  listItem.addEventListener("click", () => {
    WeatherData(city);
    toggleWeatherDashboard(true);
  });
  searchHistory.appendChild(listItem);
}

// Function to add the cities to the local storage.
function SearchStorage(search) {
  var searches = JSON.parse(localStorage.getItem("searches")) || [];
  searches.push(search);
  localStorage.setItem("searches", JSON.stringify(searches));
}
var cityName = `${cityName}`;
SearchStorage(cityName);
