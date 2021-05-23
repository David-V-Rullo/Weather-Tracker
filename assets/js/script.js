const cityEl = $("#city-search");
const dateEl = $("#current-date");
const searchEl = $("#search-submit");
// const clearEl = document.getElementById("clear-history");
const nameEl = $("#searched-city");
const currentIconEl = $("#current-icon");
const currentTempEl = $("#temp");
const currentHumidityEl = $("#humid");
const currentWindEl = $("#wind");
const currentUVEl = $("#uv-index");
const historyEl = $("#history");
// var fivedayEl = document.getElementById("fiveday-header");
// var todayweatherEl = document.getElementById("today-weather");
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

// Assigning a unique API to a variable
const APIKey = "e539d550849a8dec453f58a54bf1d4e5";

function getWeather(city) {
  // Execute a current weather get request from open weather api
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;
  fetch(queryURL)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      // Parse response to display current weather
      const currentDate = new Date(response.dt * 1000);
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      nameEl.text(`${response.name} (${month}/${day}/${year}) `);
      let weatherPic = response.weather[0].icon;
      currentIconEl.attr("src", `http://openweathermap.org/img/wn/${weatherPic}@2x.png`);
      currentTempEl.text(`Temperature: ${response.main.temp} F`);
      currentHumidityEl.text(`Humidity: ${response.main.humidity}%`);
      "Humidity: " + response.main.humidity + "%";
      currentWindEl.text(`Wind Speed: ${response.wind.speed} MPH`);
      getUVIndex(response);
      fiveDayFore(response)
    });
}
function getUVIndex(data) {
  let lat = data.coord.lat;
  let lon = data.coord.lon;
  let UVQueryURL = `https://api.openweathermap.org/data/2.5/uvi/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&cnt=1`;

  fetch(UVQueryURL)
    .then(function (UVfetch) {
      if (!UVfetch.ok) {
        throw UVfetch.json();
      }
      return UVfetch.json();
    })
    .then(function (UVfetch) {
      console.log(UVfetch);
      currentUVEl.text(UVfetch[0].value);
      //  When UV Index is good, shows green, when ok shows yellow, when bad shows red
      if (UVfetch[0].value < 4) {
        currentUVEl.addClass("success");
      } else if (UVfetch[0].value < 8) {
        currentUVEl.addClass("warning");
      } else {
        currentUVEl.addClass("danger");
      }
      currentUVEl.text(`UV Index: ${UVfetch[0].value}`);
    });
}
function fiveDayFore(data) {
  let cityID = data.id;
  let fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?id=${cityID}&units=imperial&appid=${APIKey}`;
  fetch(fiveDayURL)
    .then(function (fiveDay) {
      if (!fiveDay.ok) {
        throw fiveDay.json();
      }
      return fiveDay.json();
    })
    .then(function (fiveDay) {
      console.log(fiveDay);
      $(".weather.card").each(function (fiveDay){

      })
    });
}
// // Get history from local storage if any
searchEl.on("click", function(e) {
  const searchTerm = cityEl.val();
  console.log(e)
  console.log(searchTerm)
  getWeather(searchTerm);
  searchHistory.push(searchTerm);
  localStorage.setItem("search", JSON.stringify(searchHistory));
//   renderSearchHistory();
});

function renderSearchHistory() {
  historyEl.innerHTML = "";
  for (let i = 0; i < searchHistory.length; i++) {
    const historyItem = document.createElement("input");
    historyItem.setAttribute("type", "text");
    historyItem.setAttribute("readonly", true);
    historyItem.setAttribute("class", "form-control d-block bg-white");
    historyItem.setAttribute("value", searchHistory[i]);
    historyItem.addEventListener("click", function () {
      getWeather(historyItem.value);
    });
    historyEl.append(historyItem);
  }
}

// renderSearchHistory();
// if (searchHistory.length > 0) {
//   getWeather(searchHistory[searchHistory.length - 1
