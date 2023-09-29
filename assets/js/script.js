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
