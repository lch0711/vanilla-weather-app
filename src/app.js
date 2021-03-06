//time

function formatTime() {
  let now = new Date();
  let date = now.getDate();

  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  return `${day} ${month} ${date}, ${hour}:${minute}`;
}

let currentDate = document.querySelector("#dateTime");
currentDate.innerHTML = formatTime();

//forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastSection = document.querySelector("#forecastComponent");

  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index !== 0 && index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="row" id=forecastElement>
  <div class="col-6">${formatDay(forecastDay.dt)} 
  <br> 
  ${Math.round(forecastDay.temp.max)}°/${Math.round(
          forecastDay.temp.min
        )}°</div>
  <div class="col-6 forecastIcon">
  <img src=http://openweathermap.org/img/wn/${
    forecastDay.weather[0].icon
  }@2x.png width="50" height="50" />
  </div>
  </div>`;
    }
  });

  forecastSection.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "353945fb94bb7d9cc7861a36dae03c52";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(displayForecast);
}

//searchbar

function search(cityName) {
  let apiKey = "353945fb94bb7d9cc7861a36dae03c52";
  let units = "metric";
  let urlHead = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${urlHead}q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function submitCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#search-input").value;
  search(cityName);
}

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", submitCity);

function showTemperature(result) {
  let currentCity = document.querySelector("#place-name");
  let cityName = result.data.name;
  let cityCountry = result.data.sys.country;
  currentCity.innerHTML = `${cityName}, ${cityCountry}`;

  let currentTemperature = Math.round(result.data.main.temp);
  let condition = document.querySelector("#temperature");
  condition.innerHTML = ` ${currentTemperature}`;
  let currentFeeling = document.querySelector("#feels-like");
  let feelLike = Math.round(result.data.main.feels_like);
  currentFeeling.innerHTML = `Feels like ${feelLike}°`;

  let tempMinMax = document.querySelector("#min-max");
  let min = Math.round(result.data.main.temp_min);
  let max = Math.round(result.data.main.temp_max);
  tempMinMax.innerHTML = `<i class="fas fa-thermometer-half"></i>  ${max}°/${min}°`;

  let currentDescription = document.querySelector("#description");
  let description = result.data.weather[0].description;
  currentDescription.innerHTML = `${description}`;
  let mainWeatherIcon = document.querySelector("#mainIcon");
  mainWeatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${result.data.weather[0].icon}@2x.png`
  );
  mainWeatherIcon.setAttribute("alt", `${description}`);

  let currentWind = document.querySelector("#wind");
  let windSpd = Math.round(result.data.wind.speed);
  currentWind.innerHTML = `<i class="fas fa-wind"></i> Wind: ${windSpd} m/s`;
  let currentHumidity = document.querySelector("#humidity");
  let humidity = result.data.main.humidity;
  currentHumidity.innerHTML = `<i class="fas fa-tint"></i> Humidity: ${humidity}%`;
  let currentClouds = document.querySelector("#clouds");
  let cloudiness = result.data.clouds.all;
  currentClouds.innerHTML = `<i class="fas fa-cloud"></i> Cloudiness: ${cloudiness}%`;

  celsiusTemperature = result.data.main.temp;
  feelLikeTemperature = result.data.main.feels_like;
  minTemperature = result.data.main.temp_min;
  maxTemperature = result.data.main.temp_max;

  getForecast(result.data.coord);
}

//geolocation
let geolocationButton = document.querySelector("#geolocation");
geolocationButton.addEventListener("click", getLocation);

function getLocation() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

function currentLocation(location) {
  let apiKey = "353945fb94bb7d9cc7861a36dae03c52";
  let urlHead = `https://api.openweathermap.org/data/2.5/weather?`;
  let latitude = location.coords.latitude;
  let longitude = location.coords.longitude;
  let units = "metric";
  let apiUrl = `${urlHead}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

//units

function convertFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = Math.round(celsiusTemperature * (9 / 5) + 32);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = fahrenheitTemperature;

  let currentFeeling = document.querySelector("#feels-like");
  let feelsLike = Math.round(feelLikeTemperature * (9 / 5) + 32);
  currentFeeling.innerHTML = `Feels like ${feelsLike}°`;

  let tempMinMax = document.querySelector("#min-max");
  let minTemp = Math.round(minTemperature * (9 / 5) + 32);
  let maxTemp = Math.round(maxTemperature * (9 / 5) + 32);
  tempMinMax.innerHTML = `<i class="fas fa-thermometer-half"></i> ${maxTemp}°/ ${minTemp}°`;

  celsius.classList.add("convert");
  fahrenheit.classList.remove("convert");
}
function convertCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let currentFeeling = document.querySelector("#feels-like");
  let feelsLike = Math.round(feelLikeTemperature);
  currentFeeling.innerHTML = `Feels like ${feelsLike}°`;

  let tempMinMax = document.querySelector("#min-max");
  let minTemp = Math.round(minTemperature);
  let maxTemp = Math.round(maxTemperature);
  tempMinMax.innerHTML = `<i class="fas fa-thermometer-half"></i> ${maxTemp}°/ ${minTemp}°`;

  celsius.classList.remove("convert");
  fahrenheit.classList.add("convert");
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertFahrenheit);

let celsiusTemperature = null;
let feelLikeTemperature = null;
let minTemperature = null;
let maxTemperature = null;

search("Southampton");
