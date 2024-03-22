// function to get the latitude and longitude details on page load
document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      }, (error) => {
        console.error("Geolocation is not supported by this browser or user has denied the permission.");
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  });

  //api to fetch the details based on the lat and long
  async function fetchWeather(lat, lon) {
    const apiKey = "3583598f2905696b1295fb5241a59448";
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    try {
      const response = await fetch(weatherURL);
      const weatherData = await response.json();
      console.log(weatherData)
      const weatherInfo = {
        temperature: weatherData.main.temp,
        feelsLike: weatherData.main.feels_like,
        minTemperature: weatherData.main.temp_min,
        maxTemperature: weatherData.main.temp_max,
        pressure: weatherData.main.pressure,
        humidity: weatherData.main.humidity,
        name: weatherData.name
      };
      displayWeatherInfo(weatherInfo);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }


document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const city = document.getElementById('city').value;
    const apiKey = "3583598f2905696b1295fb5241a59448";
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
      const response = await fetch(weatherURL);
      const weatherData = await response.json();
      console.log(weatherData)
      const weatherInfo = {
        temperature: weatherData.main.temp,
        feelsLike: weatherData.main.feels_like,
        minTemperature: weatherData.main.temp_min,
        maxTemperature: weatherData.main.temp_max,
        pressure: weatherData.main.pressure,
        humidity: weatherData.main.humidity,
        name: weatherData.name
      };
      displayWeatherInfo(weatherInfo);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  });

function displayWeatherInfo(weatherInfo) {
    const weatherInfoElement = document.getElementById('weather-info');
    weatherInfoElement.innerHTML="";

    const weatherDiv = document.createElement("div");

    weatherInfoElement.innerHTML = `
      <p>City:${weatherInfo.name}</p>
      <p>Temperature: ${weatherInfo.temperature}°C</p>
      <p>Feels Like: ${weatherInfo.feelsLike}°C</p>
      <p>Min Temperature: ${weatherInfo.minTemperature}°C</p>
      <p>Max Temperature: ${weatherInfo.maxTemperature}°C</p>
      <p>Pressure: ${weatherInfo.pressure} hPa</p>
      <p>Humidity: ${weatherInfo.humidity}%</p>
    `;

    weatherInfoElement.appendChild(weatherDiv);
    // weatherInfoElement.style.display = 'block'; 
  }
  