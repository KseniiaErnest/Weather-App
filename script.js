'use strict'

const api = {
  endpoint: 'https://api.openweathermap.org/data/2.5/',
  key: 'SECRET'
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
console.log(result);

displayResult(result);

}


// we need to create a fucntion that will be responsible for displaying the result
function displayResult(result) {
let city = document.querySelector('#city');
city.textContent = `${result.name}, ${result.sys.country}`;

// Date
let timezoneOffset = result.timezone; // Offset in seconds
getOurDate(timezoneOffset);


// TEMP
let temperature = document.querySelector('#temperature');
let temperatureValue = Math.round(result.main.temp);
temperature.innerHTML = `${temperatureValue}<span>°C</span>`;

//  Feels Like
let feelslike = document.querySelector('#feelslike');
let temperatureValueFeelsLike = Math.round(result.main.feels_like);
feelslike.innerHTML = `Feels like: ${temperatureValueFeelsLike}<span>°C</span>`;

// Min and Max temp
let variations = document.querySelector('#variations');
let tempMin = Math.round(result.main.temp_min);
let tempMax = Math.round(result.main.temp_max);
variations.innerHTML = `Max: ${tempMax}<span>°C</span> Min: ${tempMin}<span>°C</span>`;

// To access celcius/fahrenheit buttons and addEventListener
const btnCelsius = document.querySelector('#btn-celsius');
btnCelsius.addEventListener('click', convertToCelsius);
const btnFahrenheit = document.querySelector('#btn-fahrenheit');
btnFahrenheit.addEventListener('click', convertToFahrenheit);

// To keep track of current temp unit;
let currentUnit = 'C';

function convertToCelsius() {

  if (currentUnit === 'F') {

  // Temp
  temperatureValue = (temperatureValue - 32) * (5 / 9);
  temperature.innerHTML = `${Math.round(temperatureValue)}<span>°C</span>`;

  // Feels like
  temperatureValueFeelsLike = (temperatureValueFeelsLike - 32) * (5 / 9);
  feelslike.innerHTML = `Feels like: ${Math.round(temperatureValueFeelsLike)}<span>°C</span>`;

  // Min and Max temp
  tempMin = (tempMin - 32) * (5 / 9);
  tempMax = (tempMax - 32) * (5 / 9);
  variations.innerHTML = `Max: ${Math.round(tempMax)}<span>°C</span> Min: ${Math.round(tempMin)}<span>°C</span> `;

  // Disable the Celsius button
  btnCelsius.disabled = true;
  // Enable the Fahrenheit button
  btnFahrenheit.disabled = false;

  // Update the current unit
  currentUnit = 'C';

}
}

function convertToFahrenheit() {

  if (currentUnit === 'C') {

  
  // Temp
  temperatureValue = (temperatureValue * (9 / 5)) + 32;
  temperature.innerHTML = `${Math.round(temperatureValue)}<span>°F</span>`;

  // Feels like
  temperatureValueFeelsLike = (temperatureValueFeelsLike * (9 / 5)) + 32;
  feelslike.innerHTML = `Feels like: ${Math.round(temperatureValueFeelsLike)}<span>°F</span>`;

  // Min and Max temp
  tempMin = (tempMin * (9 / 5)) + 32;
  tempMax = (tempMax * (9 / 5)) + 32;
  variations.innerHTML = `Max: ${Math.round(tempMax)}<span>°F</span> Min: ${Math.round(tempMin)}<span>°F</span> `;

  // Enable the Celsius button
  btnCelsius.disabled = false;

  // Disable the Fahrenheit button
  btnFahrenheit.disabled = true;

  // Update the current unit
  currentUnit = 'F';

}
}


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


// Sunrise and Sunset
let sunrise = document.querySelector('#sunrise');
let sunset = document.querySelector('#sunset');

let sunriseTimestamp = result.sys.sunrise * 1000; // Convert to milliseconds
let sunsetTimestamp = result.sys.sunset * 1000; // Convert to milliseconds

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


function getOurDate(timezoneOffset) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const d = new Date();
  
  // Apply the timezone offset to the current date
  const utcOffset = d.getTimezoneOffset() * 60 * 1000; // Convert minutes to milliseconds
  const localOffset = timezoneOffset * 1000; // Convert seconds to milliseconds
  const adjustedTime = d.getTime() + utcOffset + localOffset;
  d.setTime(adjustedTime);

  let dayOfWeek = days[d.getDay()];
  let dayNumber = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  let showDate = document.querySelector('#date');
  showDate.textContent = `${dayOfWeek}, ${dayNumber} ${month} ${year}`;
}
