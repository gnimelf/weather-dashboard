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

// var openWeatherAPI = "https://api.openweathermap.org/data/2.5/forecast?"

// lat={lat}&lon={lon}&exclude={part}&appid={API key}


var weatherData = "";

function performSearch(event) {
    
    var cityCoord = ['lat','lon'];

    var openWeatherAPI = "https://api.openweathermap.org/data/2.5/onecall?"
    var units = "imperial"
    var key = "6c03b15832f909d67599d2b7a3dc73ff";
    
    if (event.target.id === "search-button"){
        cityToSearch = cityInputEl.val();

    } else {
        cityToSearch = event.target.textContent;
    }

    //Clear input
    cityInputEl.val("");

    // Get current weather
    fetch(`${openWeatherAPI}q=${cityToSearch}&units=${units}&appid=${key}`)
    .then(response => {
        if (response.status === 200){
            return response.json();
        } else {
            console.log("connection failed " + response.status)
        }
    }).then(data => {
        currentWeather(data);
        fiveDayForecast(data);
    });
}

function currentWeather(data) {

    var currentItem = data.list[0];
    var date = moment.unix(currentItem.dt).format("M/D/YYYY");
    cityDateEl.text(`${data.city.name} ${date}`);
    currentIconEl.attr("src", `http://openweathermap.org/img/wn/${currentItem.weather[0].icon}@2x.png`);
    currentTempEl.text(`Temp: ${currentItem.main.temp}°F`);
    currentWindEl.text(`Wind: ${currentItem.wind.speed} MPH`);
    currentHumidityEl.text(`Humidity: ${currentItem.main.humidity}%`);
    currentUVIndexEl
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

function getCityGeoCode() {
    var mapQuestURL = http://www.mapquestapi.com/geocoding/v1/address
    var location = cityInputEl.val();
    var key = 'r1mDirYhsNqQFo4CHKpfetS7bihGswci';
    var lat = '';
    var lon = '';

    fetch(`${mapQuestURL}?key=${key}&location=${location}`)
    .then(reponse => {
        if (reponse.status === 200){
            return reponse.json();
        } else {
            console.log("connection failed " + reponse.status);
        }
    }).then (data => {
        lat = data.results[0].locations[0].latLng.lat;
        lon = data.results[0].locations[0].latLng.lng;
    })

    return [lat, lon];
}

buttonEl.on("click", performSearch);

