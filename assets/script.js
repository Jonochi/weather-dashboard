let apiKey = 'd071e22250b82455ee40bb37a48a404a';
let searchForm = document.getElementById("searchForm");
let searchInput = document.getElementById("searchInput");
let searchHistory = document.getElementById("searchHistory");
let current = document.getElementById("current");
let forecast = document.getElementById("forecast");

//Current weather conditions
function renderCurrentWeather(data) {
    let name = document.createElement("div");
    name.textContent = data.name;
    current.append(name);
    
    let date = document.createElement("div");
    date.textContent = new Date(data.dt * 1000).toLocaleTimeString("en-US", {weekday: "long", year: "numeric", month: "short", day: "numeric"});
    current.append(date);

    let temp = document.createElement("div");
    temp.textContent = data.main.temp;
    current.append(temp);

    let humidity = document.createElement("div");
    humidity.textContent = data.main.humidity;
    current.append(humidity);

    let windSpeed = document.createElement("div");
    windSpeed.textContent = data.wind.speed;
    current.append(windSpeed);

    let icon = document.createElement("img");
    icon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
    current.append(icon);

}

function displayCurrent(name) {
    let cityName = name;

    let cityQuery = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;

    fetch(cityQuery)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            console.log(data);
            renderCurrentWeather(data);
        })
        .catch(function (err) {
            console.log(error)
        });
}

//Forecasted weather conditions
let forecastHigh = -1000;
let forecastLow = 1000;
let avgWindspeed = 0;
let avgHumidity = 0;
let forecastIconSrc;

function renderForecast(data) {
    for (let i = 0; i < data.list; i++) {
        let forecastCard = document.createElement("div");
        let forecastIcon = document.createElement("img");

        if(data.list[i].main.temp_max > forecastHigh) {
            forecastHigh = data.list[i].main.temp_max
        }
        if(data.list[i].main.temp_min < forecastLow) {
            forecastLow = data.list[i].main.temp_min
        }
    }
}

function displayForecast(name) {
    let cityName = name;

    let forecastQuery = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + apiKey;

    fetch(forecastQuery)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            console.log(data);
            renderForecast(data);
        })
        .catch(function (err) {
            console.log(error)
        });
}

function searchCity(e) {
    e.preventDefault();
    displayCurrent(searchInput.value);
    displayForecast(searchInput.value);
}

searchForm.addEventListener("submit", searchCity)