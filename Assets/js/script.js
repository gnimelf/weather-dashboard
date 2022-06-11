var buttonEl=$("button");
var cityInputEl=$("#search-input");
var cityDateEl=$("#city-date");
var currentIconEl=$("#current-icon")
var currentTempEl=$("#current-temp");
var currentWindEl=$("#current-wind");
var currentHumidityEl=$("#current-humidity");
var currentUVIndexEl=$("#current-uv-index");
var forecastCardsEl = $("#forecast-cards");
var todaysDate = moment().format("YYYY-MM-DD");
var lat = '';
var lon = '';
var cityName = '';
var weatherData = "";


// Add current weather values to page
function currentWeather(data) {

    var currentItem = data.current;
    var date = moment.unix(currentItem.dt).format("M/D/YYYY");
    cityDateEl.text(`${cityName} ${date}`);
    currentIconEl.attr("src", `http://openweathermap.org/img/wn/${currentItem.weather[0].icon}@2x.png`);
    currentTempEl.text(`Temp: ${currentItem.temp}°F`);
    currentWindEl.text(`Wind: ${currentItem.wind_speed} MPH`);
    currentHumidityEl.text(`Humidity: ${currentItem.humidity}%`);
    currentUVIndexEl.text(`UV Index: ${currentItem.uvi}`)
}

// Grab five day forecast
function fiveDayForecast(weatherData) {
    // console.log(weatherData);
    forecastCardsEl.children().remove()
    var forecastData = weatherData.daily;

    for (var i=0; i<forecastData.length-3; i++){
        var item = forecastData[i];  
        var itemDate = moment.unix(item.dt).format("MM/DD/YYYY");
            
            createCard(item, itemDate);
    }
}

// Creat weather cards
function createCard(item, itemDate) {
    var currentIcon = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
    var cardEl = $("<section>");
    cardEl.attr("class","card");

    // Add Date to card
    var dateEl = $("<h3>");
    dateEl.text(itemDate);
    cardEl.append(dateEl);
    
    // Add weather image next to card
    var imgEl = $("<img>");
    imgEl.attr("class", "weather-card-icon")
    imgEl.attr("src", currentIcon);
    cardEl.append(imgEl);
    
    // Add temp to card
    var tempEl = $("<p>");
    tempEl.text(`Temp: ${item.temp.day}°F`);
    cardEl.append(tempEl);
    
    // Add wind to card
    var windEl = $("<p>");
    windEl.text(`Temp: ${item.wind_speed}MPH`);
    cardEl.append(windEl);
    
    // Add humidity to card
    var humidityEl = $("<p>");
    humidityEl.text(`Humity: ${item.humidity}%`);
    cardEl.append(humidityEl);

    // Add card to document
    forecastCardsEl.append(cardEl);
}

// Get lat lon for city name
 function getCityGeoCode(event) {

    cityName = cityInputEl.val();

    //Clear input
    cityInputEl.val("");

    // Geocoding parameters
    var mapQuestURL = 'https://www.mapquestapi.com/geocoding/v1/address?'
    var mapkey = 'r1mDirYhsNqQFo4CHKpfetS7bihGswci';

    // Weather parameters
    var openWeatherAPI = "https://api.openweathermap.org/data/2.5/onecall?";
    var units = "imperial";
    var weatherkey = "6c03b15832f909d67599d2b7a3dc73ff";

    // Get Geocoding Data
    fetch(`${mapQuestURL}key=${mapkey}&exclude=hourly&location=${cityName}`)
    .then(function (response) {
        if (response.status === 200) {
            return response.json();
        } else {
            console.log("connection failed " + response.status);
        }
    }).then (function (data) {

        // Return geodata
        return data

    }).then( (data) => {
        
        // Get lat and lon values from data
        lat = data.results[0].locations[0].latLng.lat;
        lon = data.results[0].locations[0].latLng.lng;

        // Fetch weather data
        fetch(`${openWeatherAPI}lat=${lat}&lon=${lon}&units=${units}&appid=${weatherkey}`)
        .then(response => {
            if (response.status === 200){
                return response.json();
            } else {
                console.log("connection failed " + response.status)
            }
        }).then(data => {
            console.log(data);
            currentWeather(data);
            fiveDayForecast(data);
        });
    }); 
}
    // Get current weather
    

buttonEl.on("click", getCityGeoCode);

