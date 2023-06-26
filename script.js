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
conditions.textContent = `${result.weather[0].main}`;

// Variation
let variations = document.querySelector('#variations');
variations.innerHTML = `Max: ${Math.round(result.main.temp_min)}<span>°</span> Min: ${Math.round(result.main.temp_max)}<span>°</span>`;

// Sunrise and Sunset
// let sunrise = document.querySelector('#sunrise');
// let sunset = document.querySelector('#sunset');
// sunrise.textContent = `${result.sys.sunrise}`

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