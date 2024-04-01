module.exports ={fetchAirQualityData,weatherConditionUpdate};
let currentPage = 1;
const itemsPerPage = 1;
let alertsData = [];



document.addEventListener("DOMContentLoaded", () => {
	fetchWeatherAlerts();
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			async (position) => {
				const { latitude, longitude } = position.coords;
				fetchWeather(latitude, longitude);
			},
			(error) => {
				console.error(
					"Geolocation is not supported by this browser or user has denied the permission."
				);
			}
		);
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
		console.log(weatherData);
		let weatherInfo = {
			temperature: weatherData.main.temp,
			feelsLike: weatherData.main.feels_like,
			minTemperature: weatherData.main.temp_min,
			maxTemperature: weatherData.main.temp_max,
			weather: weatherData.weather[0].description,
			humidity: weatherData.main.humidity,
			name: weatherData.name,
			windSpeed:weatherData.wind.speed,
			windDegree:weatherData.wind.deg,
			dust:weatherData.main.gust,
		};
		weatherConditionUpdate(Number(weatherData.weather[0].id));
		weatherInfo = await fetchAirQualityData(lat, lon, apiKey, weatherInfo);
		displayWeatherInfo(weatherInfo);
	} catch (error) {
		console.error("Error fetching weather data:", error);
	}
}


async function callWeather() {
	// event.preventDefault();
	const city = document.getElementById("city").value;
	const apiKey = "3583598f2905696b1295fb5241a59448";
	const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	
	try {

		const { lat, lon } = await fetchCityCoordinates(city, apiKey);
		console.log(lat,lon)
		const response = await fetch(weatherURL);
		const weatherData = await response.json();
		console.log(weatherData);
		let weatherInfo = {
			temperature: weatherData.main.temp,
			feelsLike: weatherData.main.feels_like,
			minTemperature: weatherData.main.temp_min,
			maxTemperature: weatherData.main.temp_max,
			weather: weatherData.weather[0].description,
			humidity: weatherData.main.humidity,
			name: weatherData.name,
			windSpeed:weatherData.wind.speed,
			windDegree:weatherData.wind.deg,
			dust:weatherData.main.gust,
		};
		weatherConditionUpdate(Number(weatherData.weather[0].id));
		weatherInfo = await fetchAirQualityData(lat, lon, apiKey, weatherInfo);
		displayWeatherInfo(weatherInfo);
	} catch (error) {
		console.error("Error fetching weather data:", error);
	}
}


async function fetchCityCoordinates(city, apiKey) {
	const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
	try {
	  const response = await fetch(geoURL);
	  const data = await response.json();
	  if (data.length > 0) {
		return { lat: data[0].lat, lon: data[0].lon };
	  } else {
		throw new Error('City not found');
	  }
	} catch (error) {
	  console.error("Error fetching city coordinates:", error);
	  throw error; 
	}
  }


  async function fetchAirQualityData(lat,lon,apiKey,weatherInfo) {
	const airQualityURL = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
	try {
	  const response = await fetch(airQualityURL);
	  const airQualityData = await response.json();

	  const currentAirQuality = airQualityData.list[0];

    weatherInfo.aqi = currentAirQuality.main.aqi;
    weatherInfo.pm2_5 = currentAirQuality.components.pm2_5; 
    weatherInfo.pm10 = currentAirQuality.components.pm10;
	
	return weatherInfo
	} catch (error) {
	  console.error("Error fetching air quality data:", error);
	  throw error; 
	}
  }


  function displayWeatherInfo(weatherInfo) {
	document.getElementById('weather-info').innerHTML = `
	  <div class="container mt-4">
		<!-- Weather Data Section -->
		<div class="card-deck">
		  <!-- Logo and Weather Info -->
		  <div class="card bg-light mb-3">
			<div class="card-body text-center">
			  <div class="row align-items-center">
				<div class="col-md-4 text-center">
				  <img src="weather-app.png" alt="Logo" class="img-fluid" style="max-width: 150px;"> 
				</div>
				<div class="col-md-8 text-left">
				  <h2 class="card-title">Today's Weather ${weatherInfo.name}</h2>
				  <h3 class="display-3">${weatherInfo.temperature}°C</h3>
				  <p class="lead">Feels like ${weatherInfo.feelsLike}°C</p>
				  <p>Min: ${weatherInfo.minTemperature}°C</p>
				  <p>Max: ${weatherInfo.maxTemperature}°C</p>
				  <p>Weather: ${weatherInfo.weather}</p>
				  <p>Humidity: ${weatherInfo.humidity}%</p>
				</div>
			  </div>
			</div>
		  </div>
		</div>
		<!-- Additional Information Section -->
		<div class="card-deck">
		  <!-- Air Quality Information Block -->
		  <div class="card mb-3">
			<div class="card-body">
			  <h4 class="card-title">Air Quality </h4>
			  <p>Air Quality Index: ${weatherInfo.aqi}</p>
			  <p>PM 2.5: ${weatherInfo.pm2_5}</p>
			  <p>PM 10: ${weatherInfo.pm10}</p>
			</div>
		  </div>
		  <!-- Wind Information Block -->
		  <div class="card mb-3">
			<div class="card-body">
			  <h4 class="card-title">Wind</h4>
			  <p>Speed: ${weatherInfo.windSpeed} m/s</p>
			  <p>Direction: ${weatherInfo.windDegree}°</p>
			  <p>Dust: ${weatherInfo.dust} µg/m3</p>
			</div>
		  </div>
		  <!-- Sunrise and Sunset Block -->
		  <div class="card mb-3">
			<div class="card-body">
			  <h4 class="card-title">Sun Times</h4>
			  <p>Sunrise: ${weatherInfo.sunrise}</p>
			  <p>Sunset: ${weatherInfo.sunset}</p>
			</div>
		  </div>
		</div>
		<!-- Other Weather Details Section -->
		<div class="card bg-light mb-3">
		  <div class="card-body">
			<h4 class="card-title">Other Weather Details</h4>
			<p class="card-text">Data not available</p>
		  </div>
		</div>
	  </div>
	`;
  }
  

function updateBackgroundImage(weatherCondition) {
	console.log("hey" + weatherCondition);
	const backgroundImage = document.getElementById("background-image");
	let imageUrl = "";

	// background image based on weather condition
	switch (weatherCondition.toLowerCase()) {
		case "thunderstorm":
			imageUrl = "/thunderstorm.gif";
			break;
		case "rain":
			imageUrl = "/rain.gif";
			break;
		case "snow":
			imageUrl = "/snow.gif";
			break;
		case "haze":
			imageUrl = "/haze.gif";
			break;
		case "cloud":
			imageUrl = "/cloud.gif";
			break;

		default:
			imageUrl = "default.jpg";
	}

	backgroundImage.style.backgroundImage = `url('${imageUrl}')`;
}

function weatherConditionUpdate(weatherId) {
	var weatherCondition = "";
	if (weatherId >= 200 && weatherId <= 232) {
		weatherCondition = "thunderstorm";
	} else if (weatherId >= 300 && weatherId <= 531) {
		weatherCondition = "rain";
	} else if (weatherId >= 600 && weatherId <= 632) {
		weatherCondition = "snow";
	} else if (weatherId >= 701 && weatherId <= 781) {
		weatherCondition = "haze";
	} else if (weatherId >= 800 && weatherId <= 805) {
		weatherCondition = "cloud";
	} else {
		weatherCondition = "default";
	}
	updateBackgroundImage(weatherCondition);
}

async function fetchWeatherAlerts() {
	try {
		const response = await fetch("https://api.weather.gov/alerts/active");
		const data = await response.json();
		alertsData = data.features;
		displayWeatherAlertsForPage(currentPage);
		updatePaginationControls();
	} catch (error) {
		console.error("Error fetching weather alerts:", error);
	}
}

function displayWeatherAlertsForPage(page) {
	const startIndex = (page - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const alertsToDisplay = alertsData.slice(startIndex, endIndex);
	displayWeatherAlerts(alertsToDisplay);
}

function getPageRange(selectedPage, totalPages, displayCount) {
	let startPage = Math.max(
		1,
		Math.min(
			selectedPage - Math.floor(displayCount / 2),
			totalPages - displayCount + 1
		)
	);
	let endPage = Math.min(totalPages, startPage + displayCount - 1);
	startPage = Math.max(1, endPage - displayCount + 1);
	return [startPage, endPage];
}

function updatePaginationControls() {
	const totalPages = Math.ceil(alertsData.length / itemsPerPage);
	let [startPage, endPage] = getPageRange(currentPage, totalPages, 10);
  const pagination = document.getElementById("pagination-wrapper");
	pagination.innerHTML = `
      <ul
          id="pagination-controls"
          class="pagination justify-content-center"
        >
			</ul>
        <p class="text-center">Total Available pages are ${totalPages}</p>
      `;
	const paginationContainer = document.getElementById("pagination-controls");
	paginationContainer.innerHTML = ""; 

	// Previous button
	const prevDisabled = currentPage === 1 ? " disabled" : "";
	paginationContainer.innerHTML += `
      <li class="page-item${prevDisabled}">
        <a class="page-link" href="#" aria-label="Previous" onclick="changePage(${
			currentPage - 1
		})">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>`;

	// Page number buttons
	for (let i = startPage; i <= endPage; i++) {
		const activeClass = i === currentPage ? " active" : "";
		paginationContainer.innerHTML += `
        <li class="page-item${activeClass}">
          <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
        </li>`;
	}

	// Next button
	const nextDisabled = currentPage === totalPages ? " disabled" : "";
	paginationContainer.innerHTML += `
      <li class="page-item${nextDisabled}">
        <a class="page-link" href="#" aria-label="Next" onclick="changePage(${
			currentPage + 1
		})">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>`;
}

// pagination control
function changePage(newPage) {
	const totalPages = Math.ceil(alertsData.length / itemsPerPage);
	if (newPage >= 1 && newPage <= totalPages) {
		currentPage = newPage;
		displayWeatherAlertsForPage(currentPage);
		updatePaginationControls();
	}
}

function displayWeatherAlerts(alerts) {
	const alertsContainer = document.getElementById("weather-alerts");
	let alertsHTML = "";

	// Looping over the alerts array to build up the HTML for each card
	alerts.forEach((alert) => {
		const { properties } = alert;
		alertsHTML += `
        <div class="card text-center mb-3">
          <div class="card-header">${properties.headline}</div>
          <div class="card-body">
            <h5 class="card-title">${properties.event}</h5>
            <p class="card-text">${properties.description}</p>
          </div>
          <div class="card-footer text-muted">${new Date(
				properties.sent
			).toLocaleString()}</div>
        </div>
      `;
	});

	alertsContainer.innerHTML = alertsHTML;
}
