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
    var forecastData = weatherData.list;
    var nextDayWeather = moment().add(1,"day").format("YYYY-MM-DD");
    var thirdDayWeather = moment().add(2,"day").format("YYYY-MM-DD");
    var fourthDayWeather = moment().add(3,"day").format("YYYY-MM-DD");
    var fiveDayWeather = moment().add(4,"day").format("YYYY-MM-DD");
    var sixthDayWeather = moment().add(5,"day").format("YYYY-MM-DD");
    var foundNextDay = false;
    var foundThirdDay = false;
    var foundFourthDay = false;
    var foundFifthDay = false;
    var foundSixthDay = false;

    for (var i=0; i<forecastData.length; i++){
        nextDay = moment().add(i,"day").format("YYYY-MM-DD");
        var item = forecastData[i];
        var itemDate = item.dt_txt.split(" ")[0];         
            
        if(itemDate === nextDayWeather && !foundNextDay) {
            console.log("found nextDay");
            foundNextDay = true;
            createCard(item, itemDate);
        } else if(itemDate === thirdDayWeather && !foundThirdDay) {
            console.log("found thirDay");
            foundThirdDay = true;
            createCard(item, itemDate);
        } else if(itemDate === fourthDayWeather && !foundFourthDay) {
            console.log("found fourthDay");
            foundFourthDay = true;
            createCard(item, itemDate);
        } else if(itemDate === fiveDayWeather && !foundFifthDay) {
            console.log("found fifthDay");
            foundFifthDay = true;
            createCard(item, itemDate);
        } else if(itemDate === sixthDayWeather && !foundSixthDay) {
            console.log("found sixthDay");
            foundSixthDay = true;
            createCard(item, itemDate);
        }
    }
}

// Creat weather cards
function createCard(item, itemDate) {
    var currentIcon = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
    var cardEl = $("<section>");
    cardEl.attr("class","card");

    var dateEl = $("<h3>");
    dateEl.text(itemDate);
    cardEl.append(dateEl);
    
    var imgEl = $("<img>");
    imgEl.attr("class", "weather-card-icon")
    imgEl.attr("src", currentIcon);
    cardEl.append(imgEl);
    
    var tempEl = $("<p>");
    tempEl.text(`Temp: ${item.main.temp}°F`);
    cardEl.append(tempEl);
    
    var windEl = $("<p>");
    windEl.text(`Temp: ${item.wind.speed}MPH`);
    cardEl.append(windEl);
    
    var humidityEl = $("<p>");
    humidityEl.text(`Humity: ${item.main.humidity}%`);
    cardEl.append(humidityEl);
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
    fetch(`${mapQuestURL}key=${mapkey}&location=${cityName}`)
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
        console.log("lat: " + lat + ", " + "lon: " + lon)
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
            // fiveDayForecast(data);
        });
    }); 
}
    // Get current weather
    

buttonEl.on("click", getCityGeoCode);

