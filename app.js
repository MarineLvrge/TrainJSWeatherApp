let formElt = document.querySelector("#form")
let inputElt = document.querySelector("#input")
let titleElt = document.querySelector("#title")
let listElt = document.querySelector("#list")

function addElementInList(text) {
    let newLiElt = document.createElement("li")
    newLiElt.textContent = text
    listElt.appendChild(newLiElt)
}

function getWeatherDataByCity(city) {
    let apiUrl = "https://www.prevision-meteo.ch/services/json/"
    return fetch(apiUrl + city, {method: "GET"})
    .then((data) => {
        return data.json()
    }).then((json) => {
        return json
    })
}

async function displayWeather(e) {
    e.preventDefault()

    // Récupérer le nom de la ville
    let cityName = inputElt.value 
    console.log(cityName)

    // Récupérer les informations météo de cette ville
    let weatherData = await getWeatherDataByCity(cityName)
    console.log(weatherData)


    // Afficher les informations sur notre site web
    let condition = weatherData.current_condition.condition
    let humidity = weatherData.current_condition.humidity
    let tmp = weatherData.current_condition.tmp

    //Changement du texte du titre h1
    titleElt.textContent = "La météo du jour à " + cityName

    // Clear list elements
    listElt.innerHTML = ""

    // Ajout d'un élément dans la liste
    addElementInList("Condition: " + condition)
    addElementInList("Humidité: " + humidity + "%")
    addElementInList("Température: " + tmp + "°C")
}

formElt.addEventListener("submit", displayWeather)