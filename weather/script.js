const body = document.querySelector("body");

const btn = document.querySelector("#submit");
const form = document.querySelector(".form-inline");

const contentContainer = document.querySelector("#contentContainer");
let weather;
const weatherContainer = document.querySelector(".weatherInfo");
const cityInfo = document.querySelector(".cityInfo");
const cityText = document.querySelector(".city");
const dateText = document.querySelector(".date");
const temperature = document.querySelector(".temperature");
const temperatureMin = document.querySelector(".tempMin");
const temperatureMinContainer = document.querySelector(".tempMinContainer");
const temperatureMax = document.querySelector(".tempMax");
const temperatureMaxContainer = document.querySelector(".tempMaxContainer");
const tempMinMax = document.querySelector(".tempMinMax");

const weatherDescription = document.querySelector(".weatherDesc");

const sunriseInfo = document.querySelector("#sunrise");
const sunsetInfo = document.querySelector("#sunset");
const humidityInfo = document.querySelector("#humidity");
const pressureInfo = document.querySelector("#pressure");
const windInfo = document.querySelector("#wind");
const cloudInfo = document.querySelector("#cloud");

let iconLow = document.createElement("i");
let iconHigh = document.createElement("i");

let img = document.createElement("img");
let weatherText = document.createElement("div");

let divSunrise = document.createElement("div");
let iconSunrise = document.createElement("i");
let divSunset = document.createElement("div");
let iconSunset = document.createElement("i");
let divHumidity = document.createElement("div");
let iconHumidity = document.createElement("i");
let divPressure = document.createElement("div");
let iconPressure = document.createElement("i");
let divWind = document.createElement("div");
let iconWind = document.createElement("i");
let divCloud = document.createElement("div");
let iconCloud = document.createElement("i");

const errorText = document.querySelector("#error");

const additionalInfoContainer = document.querySelector("#additionalInfo");

let forecast;
let forecastArray = [];

const forecastInfoContainer = document.querySelector("#forecastInfo");
const forecastTimes = document.querySelectorAll(".forecastTime");
const forecastImgs = document.querySelectorAll(".forecastImg");
const forecastDescs = document.querySelectorAll(".forecastDesc");
const forecastTemps = document.querySelectorAll(".forecastTemp");

btn.addEventListener("click", function() {
    submitForm();
});

document.addEventListener("keypress", function(e) {
    if (e.key === 13 || e.which === 13) {
        e.preventDefault();
        submitForm();
        form[0].value = '';
    }
});

class weatherInfo {
    constructor(city, country, date, timezone, tempFeelsLike, temp, tempMin, tempMax, humidity, pressure, clouds, sunrise, sunset, weatherDesc, icon, windDeg, windSpeed, rain, message) {
        this.city = city;
        this.country = country;
        this.date = date;
        this.timezone = timezone;
        this.tempFeelsLike = tempFeelsLike;
        this.temp = temp;
        this.tempMin = tempMin;
        this.tempMax = tempMax;
        this.humidity = humidity;
        this.pressure = pressure;
        this.clouds = clouds;
        this.sunrise = sunrise;
        this.sunset = sunset;
        this.weatherDesc = weatherDesc;
        this.icon = icon;
        this.windDeg = windDeg;
        this.windSpeed = windSpeed;
        this.rain = rain;
        this.message = message;
    }

}

class forecastInfo {
    constructor(date, temp, icon, description) {
        this.date = date;
        this.temp = temp;
        this.icon = icon;
        this.description = description;
    }
}

function submitForm() {
    contentContainer.style.display = "block";

    if (form[0].value) {
        let urlCurrentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${form[0].value}&APPID=e92bbfa5df20d2e2c5de7fb74f54c1b3&lang=hu`;

        fetch(urlCurrentWeather, { mode: 'cors' })
            .then((resp) => resp.json())
            .then(function(data) {
                weather = new weatherInfo(data.name, data.sys.country, data.dt, data.timezone, data.main.feels_like, data.main.temp, data.main.temp_min, data.main.temp_max, data.main.humidity, data.main.pressure, data.clouds.all, data.sys.sunrise, data.sys.sunset, data.weather[0].description, data.weather[0].icon, data.wind.deg, data.wind.speed, data.rain, data.message);

                if (data.sys == undefined) {
                    error.textContent = "Hibás városnév!";

                } else {
                    error.textContent = "";
                    writeWeatherInfo(weather);
                }
                errorText.textContent = "";
            })
            .catch(function(error) {
                errorText.textContent = "Hibás városnév!";
                contentContainer.style.display = "none";
            });

        let urlWeatherForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${form[0].value}&APPID=e92bbfa5df20d2e2c5de7fb74f54c1b3&lang=hu`;

        fetch(urlWeatherForecast, { mode: 'cors' })
            .then((resp) => resp.json())
            .then(function(data) {
                forecastArray = [];
                for (let i = 0; i < data.list.length; i++) {
                    forecast = new forecastInfo(data.list[i].dt, data.list[i].main.temp, data.list[i].weather[0].icon, data.list[i].weather[0].description);
                    forecastArray.push(forecast);
                }
                writeHourlyForecastInfo(forecastArray);
            })
            .catch(function(error) {
                errorText.textContent = "Hibás városnév!";
                contentContainer.style.display = "none";
            });

    } else {
        errorText.textContent = "Írj be egy városnevet!";
        form[0].style.border = "1px solid red";
        contentContainer.style.display = "none";
    }
}

let currentTimeZone = 3600;

function writeWeatherInfo(weather) {
    let sunriseUtc = (weather.sunrise + weather.timezone - currentTimeZone) * 1000;
    let sunrise = new Date(sunriseUtc);
    let sunsetUtc = (weather.sunset + weather.timezone - currentTimeZone) * 1000;
    let sunset = new Date(sunsetUtc);

    let dateUtc = (weather.date + weather.timezone - currentTimeZone) * 1000;
    let date = new Date(dateUtc);
    let months = ["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"];

    cityText.textContent = `${weather.city}, ${weather.country}`;

    let dateHours = date.getHours();
    let dateMinutes = date.getMinutes();
    if (dateHours < 10) {
        dateHours = `0${dateHours}`;
    }
    if (dateMinutes < 10) {
        dateMinutes = `0${dateMinutes}`;
    }

    if (dateHours >= "04" && dateHours < "10") {
        body.style.background = "linear-gradient(to bottom, rgb(18,47,98), rgb(157,149,78))";
    } else if (dateHours >= "10" && dateHours < "16") {
        body.style.background = "linear-gradient(to bottom, rgb(34,69,98), rgb(86,147,166))";
    } else if (dateHours >= "16" && dateHours < "22") {
        body.style.background = "linear-gradient(to bottom, rgb(3, 20, 51), rgb(165, 105, 81))";
    } else if (dateHours >= "22" || dateHours < "04") {
        body.style.background = "linear-gradient(to bottom, rgb(8,23,49), rgb(60,47,94))";
    }

    dateText.textContent = `${date.getFullYear()}. ${months[date.getMonth()]} ${date.getDate()}. ${dateHours}:${dateMinutes}`;

    let tempC = Math.round(weather.temp - 272.15);
    temperature.textContent = `${tempC}°C`;

    let tempMinC = Math.round(weather.tempMin - 272.15);
    let tempMaxC = Math.round(weather.tempMax - 272.15);

    iconLow.classList.add("fas", "fa-temperature-low");
    iconLow.setAttribute("title", "Legalacsonyabb hőmérséklet");
    temperatureMinContainer.append(iconLow);
    temperatureMin.textContent = `${tempMinC}°C`;
    temperatureMinContainer.append(temperatureMin);

    iconHigh.classList.add("fas", "fa-temperature-high");
    iconHigh.setAttribute("title", "Legmagasabb hőmérséklet");
    temperatureMaxContainer.append(iconHigh);
    temperatureMax.textContent = `${tempMaxC}°C`;
    temperatureMaxContainer.append(temperatureMax);


    img.setAttribute("src", `http://openweathermap.org/img/wn/${weather.icon}@2x.png`);
    weatherText.classList.add("weatherText");
    weatherText.textContent = weather.weatherDesc;
    weatherDescription.append(img);
    weatherDescription.append(weatherText);

    additionalInfoContainer.classList.add("additionalInfo");

    let sunriseDateHours = sunrise.getHours();
    let sunriseDateMinutes = sunrise.getMinutes();
    if (sunriseDateHours < 10) {
        sunriseDateHours = `0${sunrise.getHours()}`;
    }
    if (sunriseDateMinutes < 10) {
        sunriseDateMinutes = `0${sunrise.getMinutes()}`;
    }
    iconSunrise.classList.add("fas", "fa-sunrise", "icons");
    iconSunrise.setAttribute("title", "Napkelte");
    sunriseInfo.append(iconSunrise);
    divSunrise.textContent = `${sunriseDateHours}:${sunriseDateMinutes}`;
    sunriseInfo.append(divSunrise);
    sunriseInfo.classList.add("infoContainer");

    let sunsetDateHours = sunset.getHours();
    let sunsetDateMinutes = sunset.getMinutes();
    if (sunsetDateHours < 10) {
        sunsetDateHours = `0${sunset.getHours()}`;
    }
    if (sunsetDateMinutes < 10) {
        sunsetDateMinutes = `0${sunset.getMinutes()}`;
    }
    iconSunset.classList.add("fas", "fa-sunset", "icons");
    iconSunset.setAttribute("title", "Napnyugta");
    sunsetInfo.append(iconSunset);
    divSunset.textContent = `${sunsetDateHours}:${sunsetDateMinutes}`;
    sunsetInfo.append(divSunset);
    sunsetInfo.classList.add("infoContainer");

    iconHumidity.classList.add("fas", "fa-humidity", "icons");
    iconHumidity.setAttribute("title", "Páratartalom");
    humidityInfo.append(iconHumidity);
    divHumidity.textContent = `${weather.humidity}%`;
    humidityInfo.append(divHumidity);
    humidityInfo.classList.add("infoContainer");

    iconPressure.classList.add("fas", "fa-tachometer", "icons");
    iconPressure.setAttribute("title", "Légnyomás");
    pressureInfo.append(iconPressure);
    divPressure.textContent = `${weather.pressure} hPa`;
    pressureInfo.append(divPressure);
    pressureInfo.classList.add("infoContainer");

    iconWind.classList.add("fas", "fa-wind", "icons");
    iconWind.setAttribute("title", "Szélsebesség");
    windInfo.append(iconWind);
    divWind.textContent = `${weather.windSpeed} m/s`;
    windInfo.append(divWind);
    windInfo.classList.add("infoContainer");

    iconCloud.classList.add("fas", "fa-cloud", "icons");
    iconCloud.setAttribute("title", "Felhőzet");
    cloudInfo.append(iconCloud);
    divCloud.textContent = `${weather.clouds}%`;
    cloudInfo.append(divCloud);
    cloudInfo.classList.add("infoContainer");

}


function writeHourlyForecastInfo(forecastArray) {
    let hourlyForecast = [];
    for (let i = 0; i < 5; i++) {
        hourlyForecast.push(forecastArray[i]);
    }
    forecastInfoContainer.classList.add("additionalInfo");
    for (let i = 0; i < 5; i++) {

        let dateUtc = (hourlyForecast[i].date + weather.timezone - currentTimeZone) * 1000;
        let date = new Date(dateUtc);

        let dateHours = date.getHours();
        let dateMinutes = date.getMinutes();
        if (dateHours < 10) {
            dateHours = `0${dateHours}`;
        }
        if (dateMinutes < 10) {
            dateMinutes = `0${dateMinutes}`;
        }

        let dateText = `${dateHours}:${dateMinutes}`;

        forecastTimes[i].textContent = dateText;
        forecastImgs[i].setAttribute("src", `http://openweathermap.org/img/wn/${hourlyForecast[i].icon}@2x.png`);

        forecastDescs[i].textContent = hourlyForecast[i].description;

        let tempC = Math.round(hourlyForecast[i].temp - 272.15);
        forecastTemps[i].textContent = `${tempC}°C`;
    }
}