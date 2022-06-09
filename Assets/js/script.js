var buttonEl=$("button");
var cityInput=$("#search-input");
var cityDateIconEl=$("#city-date-icon");
var currentTempEl=$("#current-temp");
var currentWindEl=$("#current-wind");
var currentHumityEl=$("#current-humity");
var currentUVIndexEl=$("#current-uv-index");
var time 

var openWeatherAPI = "https://api.openweathermap.org/data/2.5/forecast?"
var city = "";
var units = "imperial"
var key = "6c03b15832f909d67599d2b7a3dc73ff";
var weatherDate = {};

function performSearch(event){
    var cityToSearch = "";
    if (event.target.id === "search-button"){
        cityToSearch = cityInput.val();
        // console.log(cityToSearch);

    } else {
        // console.log(event.target.textContent);
        cityToSearch = event.target.textContent;
    }

    // TODO: get current weather
    fetch(`${openWeatherAPI}q=${cityToSearch}&appid=${key}`)
    .then(response => {
        if (response.status === 200){
            return response.json();
        } else {
            console.log("connection failed " + response.status)
        }
    }).then(data => {
        console.log(data);
    });

    // TODO: grab current weather
    
    // TODO: grab five day forecast
    fiveDayForecast();
}

function currentWeather(data){
    
    var currentItem = data.list[0].weather[0]
    var date = moment.unix(currentItem.dt).format("M/D/YYYY")
    var currentIcon = `http://openweathermap.org/img/wn/${currentItem}@2x.png`
    var currentTemp = data.list[0].weather[0]
    
}

function fiveDayForecast(data){
    // Weather card
    // <section class="card">
    // <h3>date</h3>
    // <i>icon</i>
    // <p>Temp:</p>
    // <p>Wind:</p>
    // <p>Humity:</p>
    // </section>
}

buttonEl.on("click", performSearch);


