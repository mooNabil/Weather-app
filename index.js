// HTML ELEMENTS
let search = document.querySelector('#search');
let btn = document.querySelector('#btn');
let wDaysf = document.querySelector('#wDaysf');
let mDaysf = document.querySelector('#mDaysf');
let city = document.querySelector('#city');
let cityDegreeF = document.querySelector('#cityDegreeF');
let degreeImgF = document.getElementById('degreeImgF');
let ConditionsF = document.querySelector('#ConditionsF');
let wDayS = document.querySelector('#wDayS');
let degreeImgS = document.querySelector('#degreeImgS');
let degreeS = document.querySelector('#degreeS');
let smallDegreeS = document.querySelector('#smallDegreeS');
let ConditionsS = document.querySelector('#ConditionsS');
let wDayT = document.querySelector('#wDayT');
let degreeImgT = document.querySelector('#degreeImgT');
let degreeT = document.querySelector('#degreeT');
let smallDegreeT = document.querySelector('#smallDegreeT');
let ConditionsT = document.querySelector('#ConditionsT');
let humidity = document.querySelector("#humidity")
let wind = document.querySelector("#wind");
let windD = document.querySelector("#windD");

// 
startWeatherApp()

//^ Get Api
async function getWeatherData(key) {

    let res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=4858760d52b54f7ca54200817233112&q=${key}&days=3`
    );
    let final = await res.json();
    return final

}


// display today data

function displayTodayData(data) {

    let todayDate = new Date()

    wDaysf.innerHTML = todayDate.toLocaleDateString("en-US", { weekday: "long" })
    mDaysf.innerHTML = todayDate.getDate() + " " + todayDate.toLocaleDateString("en-US", { month: "long" })

    city.innerHTML = data.location.name;
    cityDegreeF.innerHTML = data.current.temp_c + " <sup>o</sup> C";
    degreeImgF.setAttribute("src", data.current.condition.icon);
    ConditionsF.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity + "%";
    wind.innerHTML = data.current.wind_kph + " km/h"
    windD.innerHTML = data.current.wind_dir
}


//display next days data
function displaytomorrowData(data) {

    let forcastData = data.forecast.forecastday;
    let tomorrowData = new Date(forcastData[1].date)
    wDayS.innerHTML = tomorrowData.toLocaleDateString("en-US", { weekday: "long" })
    degreeImgS.setAttribute("src", forcastData[1].day.condition.icon);
    degreeS.innerHTML = forcastData[1].day.maxtemp_c + " <sup>o</sup> C"
    smallDegreeS.innerHTML = forcastData[1].day.mintemp_c + " <sup>o</sup> C"
    ConditionsS.innerHTML = forcastData[1].day.condition.text
}


function displayAftertomorrowDataData(data) {

    let forcastData = data.forecast.forecastday;
    let AftertomorrowDataData = new Date(forcastData[2].date)
    wDayT.innerHTML = AftertomorrowDataData.toLocaleDateString("en-US", { weekday: "long" })
    degreeImgT.setAttribute("src", forcastData[2].day.condition.icon);
    degreeT.innerHTML = forcastData[2].day.maxtemp_c + " <sup>o</sup> C"
    smallDegreeT.innerHTML = forcastData[2].day.mintemp_c + " <sup>o</sup> C"
    ConditionsT.innerHTML = forcastData[2].day.condition.text
}

// start app
async function startWeatherApp(city = "cairo") {
    let weatherData = await getWeatherData(city)
    if (!weatherData.error) {
        displayTodayData(weatherData);
        displaytomorrowData(weatherData);
        displayAftertomorrowDataData(weatherData)
    }
}

search.addEventListener("input", function () {

    startWeatherApp(search.value)

})









