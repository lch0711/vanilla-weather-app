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
  search("Southampton");
  
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
    tempMinMax.innerHTML = `<i class="fas fa-thermometer-half"></i> ${min}°/${max}°`;
  
    let currentDescription = document.querySelector("#description");
    let description = result.data.weather[0].description;
    currentDescription.innerHTML = `${description}`;
    let currentWind = document.querySelector("#wind");
    let windSpd = Math.round(result.data.wind.speed);
    currentWind.innerHTML = `<i class="fas fa-wind"></i> Wind: ${windSpd} m/s`;
    let currentHumidity = document.querySelector("#humidity");
    let humidity = result.data.main.humidity;
    currentHumidity.innerHTML = `<i class="fas fa-tint"></i> Humidity: ${humidity}%`;
    let currentClouds = document.querySelector("#clouds");
    let cloudiness = result.data.clouds.all;
    currentClouds.innerHTML = `<i class="fas fa-cloud"></i> Cloudiness: ${cloudiness}%`;
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
  
  let celsius = document.querySelector("#celsius");
  let fahrenheit = document.querySelector("#fahrenheit");
  
  function convertFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    let temperature = temperatureElement.innerHTML;
    temperature = Number(temperature);
    temperatureElement.innerHTML = Math.round(temperature * (9 / 5) + 32);
  }
  function convertCelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    let temperature = temperatureElement.innerHTML;
    temperature = Number(temperature);
    temperatureElement.innerHTML = Math.round((temperature - 32) * (5 / 9));
  }
  
  fahrenheit.addEventListener("click", convertFahrenheit);
  celsius.addEventListener("click", convertCelsius);
  