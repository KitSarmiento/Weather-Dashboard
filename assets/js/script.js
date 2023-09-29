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
