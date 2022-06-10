var buttonEl=$("button");
var cityInput=$("#search-input");
var cityDateIconEl=$("#city-date-icon");
var currentTempEl=$("#current-temp");
var currentWindEl=$("#current-wind");
var currentHumityEl=$("#current-humity");
var currentUVIndexEl=$("#current-uv-index");
var forecastCardsEl = $("#forecast-cards");
var todaysDate = moment().format("YYYY-MM-DD");

var openWeatherAPI = "https://api.openweathermap.org/data/2.5/forecast?"
var city = "";
var units = "imperial"
var key = "6c03b15832f909d67599d2b7a3dc73ff";
var weatherData = "";

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
        fiveDayForecast(data);
    });

    // TODO: grab current weather

    // TODO: grab five day forecast
    
}

function currentWeather(){
    
    var city = date.city.name;
    var currentItem = data.list[0].weather[0];
    var date = moment.unix(currentItem.dt).format("M/D/YYYY");
    // var currentIcon = `http://openweathermap.org/img/wn/${currentItem}@2x.png`;
    var currentTemp = data.list[0].weather[0]
    
}

function fiveDayForecast(weatherData){
    console.log(weatherData);
    var forecastData = weatherData.list;
    var todaysDate = moment().format("YYYY-MM-DD");
    var nextDayWeather = moment().add(1,"day").format("YYYY-MM-DD");
    var thirdDayWeather = moment().add(2,"day").format("YYYY-MM-DD");
    var fourthDayWeather = moment().add(3,"day").format("YYYY-MM-DD");
    var fiveDayWeather = moment().add(4,"day").format("YYYY-MM-DD");
    var foundToday = false;
    var foundNextDay = false;
    var foundThirdDay = false;
    var foundFourthDay = false;
    var foundFifthDay = false;

    for (var i=0; i<forecastData.length; i++){
        nextDay = moment().add(i,"day").format("YYYY-MM-DD");
        var item = forecastData[i];
        var itemDate = item.dt_txt.split(" ")[0];
        // Get the current day weather a item 0
        if (itemDate === todaysDate && !foundToday) {
            console.log("found today");
            
        } else if(itemDate === nextDayWeather && !foundNextDay) {
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
        }
    }
}

function createCard(item, itemDate){
    var currentIcon = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
    var cardEl = $("<section>");
    cardEl.attr("class","card");

    var dateEl = $("<h3>");
    dateEl.text(itemDate);
    cardEl.append(dateEl);
    
    var imgEl = $("<img>");
    imgEl.attr("src", currentIcon);
    cardEl.append(imgEl);
    
    var tempEl = $("<p>");
    tempEl.text(`Temp: ${item.main.temp}`);
    cardEl.append(tempEl);
    
    var windEl = $("<p>");
    windEl.text(`Temp: ${item.wind.speed}`);
    cardEl.append(windEl);
    
    var humidityEl = $("<p>");
    humidityEl.text(`Humity: ${item.main.humidity}`);
    cardEl.append(humidityEl);
    forecastCardsEl.append(cardEl);
}

buttonEl.on("click", performSearch);


