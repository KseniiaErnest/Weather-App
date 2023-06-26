'use strict'

const api = {
  endpoint: 'https://api.openweathermap.org/data/2.5/',
  key: '36090a72e6e694879dc0a9b07b802c2d'
};

// To access input field and addEventListener
const input = document.querySelector('#input');
input.addEventListener('keydown', enter);

// if 13key/enter => search
function enter(e) {
  if (e.keyCode === 13) {
    getInfo(input.value); 
  }
  
}

// Function to get information about the weather from API
async function getInfo(data) {
const res = await fetch(`${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}`);
const result = await res.json();

displayResult(result);

}

// we need to create a fucntion that will be responsible for displaying the result
function displayResult(result) {
let city = document.querySelector('#city');
city.textContent = `${result.name}, ${result.sys.country}`;

// Date
getOurDate();

// Temperature
let temperature = document.querySelector('#temperature');
temperature.innerHTML = `${Math.round(result.main.temp)}<span>°</span>`;

//  Feels Like
let feelslike = document.querySelector('#feelslike');
feelslike.innerHTML = `Feels like: ${Math.round(result.main.feels_like)}<span>°</span>`;

// Condition
let conditions = document.querySelector('#conditions');
let body = document.querySelector('body');
if (result.weather[0].id >= 200 && result.weather[0].id <= 232) {
  body.style.backgroundImage = `url('thunderstorm.jpg')`;
} else if (result.weather[0].id >= 300 && result.weather[0].id <= 321) {
  body.style.backgroundImage = `url('drizzle.jpg')`;
} else if (result.weather[0].id >= 500 && result.weather[0].id <= 531) {
  body.style.backgroundImage = `url('rain.jpg')`;
} else if (result.weather[0].id >= 600 && result.weather[0].id <= 622) {
  body.style.backgroundImage = `url('snow.jpg')`;
} else if (result.weather[0].id >= 701 && result.weather[0].id <= 781) {
  body.style.backgroundImage = `url('atmosphere.jpg')`;
} else if (result.weather[0].id === 800) {
  body.style.backgroundImage = `url('clear.jpg')`;
} else if (result.weather[0].id >= 801 && result.weather[0].id <= 804) {
  body.style.backgroundImage = `url('clouds.jpg')`;
} else {
  body.style.backgroundImage = `url('weather.jpg')`;
}

conditions.textContent = `${result.weather[0].main}`;

// Variation
let variations = document.querySelector('#variations');
variations.innerHTML = `Max: ${Math.round(result.main.temp_min)}<span>°</span> Min: ${Math.round(result.main.temp_max)}<span>°</span>`;

// Sunrise and Sunset
let sunrise = document.querySelector('#sunrise');
let sunset = document.querySelector('#sunset');

let sunriseTimestamp = result.sys.sunrise * 1000; // Convert to milliseconds
let sunsetTimestamp = result.sys.sunset * 1000; // Convert to milliseconds
let timezoneOffset = result.timezone; // Offset in seconds

// Create Date objects using the timestamps
let sunriseDate = new Date(sunriseTimestamp);
let sunsetDate = new Date(sunsetTimestamp);

// Apply the timezone offset to the Date objects
sunriseDate.setTime(sunriseDate.getTime() + (timezoneOffset * 1000));
sunsetDate.setTime(sunsetDate.getTime() + (timezoneOffset * 1000));

// Format the sunrise and sunset times based on the timezone
let sunriseTime = sunriseDate.toLocaleTimeString([], { timeZone: 'UTC' });
let sunsetTime = sunsetDate.toLocaleTimeString([], { timeZone: 'UTC' });

sunrise.innerHTML = `Sunrise: ${sunriseTime}`;
sunset.innerHTML = `Sunset: ${sunsetTime}`


};

// Function to get a date
function getOurDate() {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const d = new Date();

  let dayOfWeek = days[d.getDay()];
  let dayNumber = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  let showDate = document.querySelector('#date');
  showDate.textContent = `${dayOfWeek}, ${dayNumber} ${month} ${year}`;

}