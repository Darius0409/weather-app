
console.log("Hello, Weather App!");

let city = "Bucuresti";
let temperature = 30;

console.log(city);
console.log(temperature);

const temperatureElement = document.getElementById("temperature");
temperatureElement.textContent = temperature + "°C";

const cityElement = document.getElementById("city");
cityElement.textContent = city;

const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=47.0465&longitude=21.9189&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code";

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log("Răspunsul complet:", data);
        console.log("Datele actuale:", data.current);
        console.log("Temperatura:", data.current.temperature_2m);
        
        const realTemperature = data.current.temperature_2m;
        const temperatureElement = document.getElementById("temperature");
        temperatureElement.textContent = realTemperature + "°C";

        const realHumidity = data.current.relative_humidity_2m;
        const humidityElement = document.getElementById("humidity");
        humidityElement.textContent = realHumidity + "%";

        const realWind = data.current.wind_speed_10m;
        const windElement = document.getElementById("wind");
        windElement.textContent = realWind + "km/h";
       
    })
    .catch(error => {
        console.log("A apărut o eroare:", error);
    });
        const searchButton = document.getElementById("search-button");
        const cityInput = document.getElementById("city-input");
        console.log("Buton", searchButton);
        console.log("Casuta", cityInput);

        searchButton.addEventListener("click", function() {
    const searchedCity = cityInput.value;

    const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchedCity)}&count=1&language=ro`;

    fetch(geocodingUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Rezultatul căutării:", data);

            if (!data.results || data.results.length === 0) {
                console.log("Orașul nu a fost găsit!");
                return;
            }

            const latitude = data.results[0].latitude;
            const longitude = data.results[0].longitude;

            console.log("Latitudine:", latitude);
            console.log("Longitudine:", longitude);

            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;

   fetch(weatherUrl)
    .then(response => response.json())
    .then(weatherData => {
        console.log("Vremea orașului:", weatherData);

        const realTemperature = weatherData.current.temperature_2m;
        document.getElementById("temperature").textContent = realTemperature + "°C";

        const realHumidity = weatherData.current.relative_humidity_2m;
        document.getElementById("humidity").textContent = realHumidity + "%";

        const realWind = weatherData.current.wind_speed_10m;
        document.getElementById("wind").textContent = realWind + " km/h";

        document.getElementById("city").textContent = searchedCity;
         const weatherCode = weatherData.current.weather_code;

let description = "Condiții variabile";
let icon = "🌥️";

if (weatherCode === 0) {
    description = "Senin";
    icon = "☀️";
} else if (weatherCode === 1 || weatherCode === 2) {
    description = "Parțial noros";
    icon = "🌤️";
} else if (weatherCode === 3) {
    description = "Înnorat";
    icon = "☁️";
} else if (weatherCode === 45 || weatherCode === 48) {
    description = "Ceață";
    icon = "🌫️";
} else if (weatherCode >= 51 && weatherCode <= 67) {
    description = "Ploaie";
    icon = "🌧️";
} else if (weatherCode >= 71 && weatherCode <= 77) {
    description = "Ninsoare";
    icon = "❄️";
} else if (weatherCode >= 80 && weatherCode <= 82) {
    description = "Averse";
    icon = "🌦️";
} else if (weatherCode >= 95) {
    description = "Furtună";
    icon = "⛈️";
}

document.getElementById("description").textContent = description;
document.getElementById("weather-icon").textContent = icon;

    })
    .catch(error => {
        console.log("Eroare la preluarea vremii:", error);
    });
        })
        .catch(error => {
            console.log("Eroare la căutarea orașului:", error);
        });
});
    
