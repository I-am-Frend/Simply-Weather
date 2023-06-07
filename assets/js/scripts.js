const searchInput = document.querySelector("#searchInput")
searchButton = document.querySelector("#searchButton")
weatherIcon = document.querySelector("#weatherIcon")
windSpeed = document.querySelector("#windSpeed")
humidity = document.querySelector(".humidity")
weather = document.querySelector(".weather")
description = document.querySelector(".description")
API = "ccd03ace6e4452197c1cbef3e0ff44af";

const setWeatherDetails = (data) => {
    description.innerHTML = data.weather[0].description;
    weather.innerHTML = Math.round(data.main.temp - 273.15) + "°c";
    humidity.innerHTML = data.main.humidity + "%";
    windSpeed.innerHTML = data.wind.speed + "km/h";
    switch (data.weather[0].main) {
        case 'Clouds':
            weatherIcon.src = "assets/images/clouds.png";
            break;
        case 'Clear':
            weatherIcon.src = "assets/images/sun.png";
            break;
        case 'Rain':
            weatherIcon.src = "assets/images/rainy.png";
            break;
        case 'Mist':
            weatherIcon.src = "assets/images/mist.png";
            break;
        case 'Snow':
            weatherIcon.src = "assets/images/snow.png";
            break;
        case 'Haze':
            weatherIcon.src = "assets/images/haze.png";
            break;
    }
}

// call api
const callAPI = (id) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${id}`) 
        .then(response => {
            if (!response.ok) {
                alert("Check the spelling of your selected city and try again, or something went wrong!");
                throw new Error(`Request failed with status ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
            setWeatherDetails(data);
        })
        .catch(error => console.log(error))
}

searchButton.addEventListener("click", (e) => {
    if (searchInput.value == "") {
        alert("Please enter a city name.");
    } else {
        callAPI(API);
    }
})

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        searchButton.click();
    }
})

searchButton.click();