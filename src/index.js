import "./style.css";
const searchBar = document.querySelector("#searchBar");
const currentLocationDisplay = document.querySelector(".currentLocation");
const currentWeatherDisplay = document.querySelector("#currentWeather");
const currentTempDisplay = document.querySelector(".currentTempDisplay");
const currentTempOption = document.querySelector(".currentTempOption");
const currentIcon = document.querySelector(".currentIcon");
const radio_c = document.querySelector("#cel");
const radio_f = document.querySelector("#fehr");
const searchForm = document.querySelector("form");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (searchBar.value) {
    currentLocation = searchBar.value;
  }
  getWeatherForcast();
});
let currentLocation;
let temp_c;
let temp_f;
radio_c.addEventListener("change", () => {
  if (radio_c.checked) {
    currentTempDisplay.textContent = temp_c;
  }
});
radio_f.addEventListener("change", () => {
  if (radio_f.checked) {
    currentTempDisplay.textContent = temp_f;
  }
});
async function getWeatherForcast() {
  try {
    const forcast = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=c1dc1978a27244b799b222805242704&q=${currentLocation ? currentLocation : "Cairo"}&days=6&aqi=yes&alerts=no`,
    );
    if (!forcast.ok) {
      throw new Error("Couldn't Fetch Resourse");
    }
    const forcastJSON = await forcast.json();
    processData(forcastJSON);
  } catch (err) {
    console.error(err);
  }
}
function processData(data) {
  currentLocationDisplay.textContent = data.location.name;
  const icon = document.createElement("img");
  icon.src = data.current.condition.icon;
  currentIcon.innerHTML = "";
  currentIcon.appendChild(icon);
  temp_c = data.current.temp_c;
  temp_f = data.current.temp_f;
  if (radio_c.checked) {
    currentTempDisplay.textContent = temp_c;
  } else if (radio_f.checked) {
    currentTempDisplay.textContent = temp_f;
  }
}
getWeatherForcast();
