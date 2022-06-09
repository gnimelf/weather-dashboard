var buttonEl=$("button");
var cityInput=$("#search-input");
var cityDateIconEl=$("#city-date-icon");
var currentTempEl=$("#current-temp");
var currentWindEl=$("#current-wind");
var currentHumityEl=$("#current-humity");
var currentUVIndexEl=$("#current-uv-index");

var openWeatherAPI = "https://api.openweathermap.org/data/2.5/forecast?q="
var city = "";
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

    // get current weather

    // get five day forecast
    fiveDayForecast();
}

buttonEl.on("click", performSearch);

function fiveDayForecast(){
    // Weather card
    // <section class="card">
    // <h3>date</h3>
    // <i>icon</i>
    // <p>Temp:</p>
    // <p>Wind:</p>
    // <p>Humity:</p>
    //     </section>
}
