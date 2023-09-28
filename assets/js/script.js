var apiKey = "9484fb3037fb24e863ff617d2c22b3b1";

// function to toggle the dashboard
function toggleWeatherDashboard() {
  var weatherDashboard = document.getElementById("weatherDashboard");
  if (weatherDashboard.style.display === "none") {
    weatherDashboard.style.display = "block";
  } else {
    weatherDashboard.style.display = "none";
  }
}
