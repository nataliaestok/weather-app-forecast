function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

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
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayTemperature(response){

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    let dateElement = document.querySelector("#date");
    dateElement.innerHTML =formatDate(response.data.dt * 1000);

    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;

    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;

    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;

    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
}


function search(city){
let apiKey = "30576d24fe7c955bdd206c12086c3d03"
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}


function handleSubmit(event){
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-search");
  search(cityInputElement.value);
}

let form = document.querySelector("#container-search");
form.addEventListener("submit", handleSubmit);

function displayForecast(){
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];

  let forecastHTML = `<section class="weather-forecast-prediction">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <section class="weather-forecast-prediction" id="forecast">

        <div>
        <h3 class="weather-forecast-date">${day}</h3>
        <img id="center" src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png">
        <div>
        <div class="weather-forecast-temperatures"> <span class="weather-forecast-temperature-max">18 °C </span> </div>
        <div class="weather-forecast-temperatures"> <span class="weather-forecast-temperature-min">12 °C </span> </div>
        </div>
      </div>


      </section>
        
  `;
  });

  forecastHTML = forecastHTML + `</section>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}


displayForecast();
