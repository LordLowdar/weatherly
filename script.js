var fetchButton = document.getElementById("search");
var storedCities = [];

function getApi() {
  var url = `http://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&units=imperial&appid=d60338ffc6ff91a104e3347936e9f739`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      fiveDay(data.coord.lat, data.coord.lon);
    });
}
fetchButton.addEventListener("click", function (e) {
  e.preventDefault();
  getApi();
  storeCity(searchCity.value);
  currentStats(searchCity.value);
});

function storeCity(searchCity) {
  storedCities.push(searchCity);
  localStorage.setItem("storeCity", JSON.stringify(storedCities));
}
function fiveDay(lat, lon) {
  var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly,minutely&appid=d60338ffc6ff91a104e3347936e9f739`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (let i = 1; i < 6; i++) {
        var element = data.daily[i];
        var fiveDetails = document.createElement("div");
        fiveDetails.classList.add("card");
        var date = document.createElement("p");
        date.textContent = element.temp.day + "°";
        document.querySelector(".forecast").appendChild(fiveDetails);
        fiveDetails.appendChild(date);
        var temp = document.createElement("p");
        temp.textContent = element.temp.day + "°";
        document.querySelector(".forecast").appendChild(fiveDetails);
        fiveDetails.appendChild(temp);
        var uv = document.createElement("p");
        uv.textContent = element.uvi + " UVI";
        document.querySelector(".forecast").appendChild(fiveDetails);
        fiveDetails.appendChild(uv);
        var wind = document.createElement("p");
        wind.textContent = element.wind_speed + "MPH";
        document.querySelector(".forecast").appendChild(fiveDetails);
        fiveDetails.appendChild(wind);
        // var startIcon = element.weather.icon;
        // var icon = `<img src="http://openweathermap.org/img/w/" + ${startIcon} + ".png"`;
        // document.querySelector(".forecast").appendChild(fiveDetails);
        // fiveDetails.appendChild(icon);
      }
    });
}

function currentStats() {
  console.log("test");
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&units=imperial&appid=d60338ffc6ff91a104e3347936e9f739`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var startName = document.createElement("h4");
      startName.textContent = data.name;
      document.querySelector(".city").appendChild(startName);
      var startTemp = document.createElement("p");
      startTemp.textContent = data.main.temp + "°";
      document.querySelector(".cityTemp").appendChild(startTemp);
      var startDescription = document.createElement("p");
      startDescription.textContent = data.weather[0].description;
      document.querySelector(".cityDesc").appendChild(startDescription);
      var startIcon = data.weather[0].icon;
      var iconUrl = "http://openweathermap.org/img/w/" + startIcon + ".png";
      document.querySelector(".cityIcon").src = iconUrl;
      var startHumidity = document.createElement("p");
      startHumidity.textContent = data.main.humidity + "% Humidity";
      document.querySelector(".cityHumidity").appendChild(startHumidity);
      var startWind = document.createElement("p");
      startWind.textContent = data.wind.speed + "mph";
      document.querySelector(".cityWind").appendChild(startWind);
    });
}
