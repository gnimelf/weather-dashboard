var searchInputEl=$("#search-input");
var searchButtonEl=$("#search-button");
var columbusEl=$("#columbus-btn");
var chicagoEl=$("#chicago-btn");
var newYorkEl=$("#new-york-btn");
var orlandoEl=$("#orlando-btn");
var sanFranciscoEl=$("#san-francisco-btn");
var seattleEl=$("#seattle-btn");
var denverEl=$("#denver-btn");
var atlantaEl=$("#atlanta-btn");
var cityDateIconEl=$("#city-date-icon");
var currentTempEl=$("#current-temp");
var currentWindEl=$("#current-wind");
var currentHumityEl=$("#current-humity");
var currentUVIndexEl=$("#current-uv-index");

var openWeatherAPI = "https://api.openweathermap.org/data/2.5/forecast?q="
var city = "";
var key = "6c03b15832f909d67599d2b7a3dc73ff";


// Weather card
    // <section class="card">
    // <h3>date</h3>
    // <i>icon</i>
    // <p>Temp:</p>
    // <p>Wind:</p>
    // <p>Humity:</p>
    //     </section>