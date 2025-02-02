const apiKey = "7d5e74e7b112e34001dc87b79a2fc7c3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

    // Dynamically updating the weather data
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    
    // Convert wind speed from m/s to km/h
    const windSpeedInKmH = (data.wind.speed * 3.6).toFixed(1);
    document.querySelector(".wind").innerHTML = windSpeedInKmH + " km/h";

    // Set weather icon based on weather condition
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "mist.png";
    }

    // Show weather and hide error
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

// Event listener for search button
searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    checkWeather(city);
  }
});

// Optional: Automatically check weather for a default city when the page loads
checkWeather();  // You can replace "New York" with any default city
