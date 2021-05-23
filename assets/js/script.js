const cityEl = $("#city-search");
const dateEl = $("#current-date");
const searchEl = $("#search-submit");
// const clearEl = document.getElementById("clear-history");
const nameEl = $("#searched-city")
const currentIconEl = $("#current-icon")
const currentTempEl = $("#temp");
const currentHumidityEl = $("#humid");
const currentWindEl = $("#wind");
const currentUVEl = $("#uv-index");
// const historyEl = document.getElementById("history");
// var fivedayEl = document.getElementById("fiveday-header");
// var todayweatherEl = document.getElementById("today-weather");
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

// Assigning a unique API to a variable
const APIKey = "e539d550849a8dec453f58a54bf1d4e5";

function getWeather() {
  // Execute a current weather get request from open weather api
  var queryURL =(`https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=${APIKey}`)
  fetch(queryURL)  
  .then(function (response) {
      if (!response.ok) {
          throw response.json()
      }
      return response.json()
  })
  .then(function (response) {
      console.log(response)
    // Parse response to display current weather
    const currentDate = new Date(response.dt * 1000);
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    nameEl.text(`${response.name} (${month}/${day}/${year}) `) 
    let weatherPic = response.weather[0].icon;
    currentIconEl.next().attr("src", "http://openweathermap.org/img/wn/10d@2x.png");
    currentTempEl.text(`Temperature: ${response.main.temp} F`)
    currentHumidityEl.text(`Humidity: ${response.main.humidity}%`)
      "Humidity: " + response.main.humidity + "%";
    currentWindEl.text(`Wind Speed: ${response.wind.speed} MPH`)
    getUVIndex(response)
    })}
    getWeather()

    function getUVIndex(data){
        let lat = data.coord.lat;
        let lon = data.coord.lon;
        let UVQueryURL = `https://api.openweathermap.org/data/2.5/uvi/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&cnt=1`

    fetch(UVQueryURL)  
        .then(function (UVfetch) {
      if (!UVfetch.ok) {
          throw UVfetch.json()
      }
      return UVfetch.json()
     })
     .then(function (UVfetch) {
         console.log(UVfetch)
       currentUVEl.text(UVfetch[0].value)
//  When UV Index is good, shows green, when ok shows yellow, when bad shows red
      if (UVfetch[0].value < 4) {
        currentUVEl.addClass("success");
      } else if (UVfetch[0].value < 8) {
        currentUVEl.addClass("warning");
      } else {
        currentUVEl.addClass("danger");
      }
      currentUVEl.text(`UV Index: ${UVfetch[0].value}`)
    })};

//     // Get 5 day forecast for this city
//     // let cityID = response.data.id;
//     // let forecastQueryURL =
//     //   "https://api.openweathermap.org/data/2.5/forecast?id=" +
//     //   cityID +
//     //   "&appid=" +
//     //   APIKey;
//     // axios.get(forecastQueryURL).then(function (response) {
//     //   fivedayEl.classList.remove("d-none");

//     //   //  Parse response to display forecast for next 5 days
//     //   const forecastEls = document.querySelectorAll(".forecast");
//     //   for (i = 0; i < forecastEls.length; i++) {
//     //     forecastEls[i].innerHTML = "";
//     //     const forecastIndex = i * 8 + 4;
//     //     const forecastDate = new Date(
//     //       response.data.list[forecastIndex].dt * 1000
//     //     );
//     //     const forecastDay = forecastDate.getDate();
//     //     const forecastMonth = forecastDate.getMonth() + 1;
//     //     const forecastYear = forecastDate.getFullYear();
//     //     const forecastDateEl = document.createElement("p");
//     //     forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
//     //     forecastDateEl.innerHTML =
//     //       forecastMonth + "/" + forecastDay + "/" + forecastYear;
//     //     forecastEls[i].append(forecastDateEl);

//     //     // Icon for current weather
//     //     const forecastWeatherEl = document.createElement("img");
//     //     forecastWeatherEl.setAttribute(
//     //       "src",
//     //       "https://openweathermap.org/img/wn/" +
//     //         response.data.list[forecastIndex].weather[0].icon +
//     //         "@2x.png"
//     //     );
//     //     forecastWeatherEl.setAttribute(
//     //       "alt",
//     //       response.data.list[forecastIndex].weather[0].description
//     //     );
//     //     forecastEls[i].append(forecastWeatherEl);
//     //     const forecastTempEl = document.createElement("p");
//     //     forecastTempEl.innerHTML =
//     //       "Temp: " +
//     //       k2f(response.data.list[forecastIndex].main.temp) +
//     //       " &#176F";
//     //     forecastEls[i].append(forecastTempEl);
//     //     const forecastHumidityEl = document.createElement("p");
//     //     forecastHumidityEl.innerHTML =
//     //       "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
//     //     forecastEls[i].append(forecastHumidityEl);
//     //   }
//     // });
//   });
// }

// // Get history from local storage if any
// searchEl.addEventListener("click", function () {
//   const searchTerm = cityEl.value;
//   getWeather(searchTerm);
//   searchHistory.push(searchTerm);
//   localStorage.setItem("search", JSON.stringify(searchHistory));
//   renderSearchHistory();
// });

// // Clear History button
// clearEl.addEventListener("click", function () {
//   localStorage.clear();
//   searchHistory = [];
//   renderSearchHistory();
// });

// function k2f(K) {
//   return Math.floor((K - 273.15) * 1.8 + 32);
// }

// function renderSearchHistory() {
//   historyEl.innerHTML = "";
//   for (let i = 0; i < searchHistory.length; i++) {
//     const historyItem = document.createElement("input");
//     historyItem.setAttribute("type", "text");
//     historyItem.setAttribute("readonly", true);
//     historyItem.setAttribute("class", "form-control d-block bg-white");
//     historyItem.setAttribute("value", searchHistory[i]);
//     historyItem.addEventListener("click", function () {
//       getWeather(historyItem.value);
//     });
//     historyEl.append(historyItem);
//   }
// }

// renderSearchHistory();
// if (searchHistory.length > 0) {
//   getWeather(searchHistory[searchHistory.length - 1
