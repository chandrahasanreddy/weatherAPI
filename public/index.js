//function to get the latitude and longitude details on page load

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
		const weatherInfo = {
			temperature: weatherData.main.temp,
			feelsLike: weatherData.main.feels_like,
			minTemperature: weatherData.main.temp_min,
			maxTemperature: weatherData.main.temp_max,
			weather: weatherData.weather[0].description,
			humidity: weatherData.main.humidity,
			name: weatherData.name,
		};
		weatherConditionUpdate(Number(weatherData.weather[0].id));
		displayWeatherInfo(weatherInfo);
	} catch (error) {
		console.error("Error fetching weather data:", error);
	}
}

document.querySelector("form").addEventListener("submit", async (event) => {
	event.preventDefault();
	const city = document.getElementById("city").value;
	const apiKey = "3583598f2905696b1295fb5241a59448";
	const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	try {
		const response = await fetch(weatherURL);
		const weatherData = await response.json();
		console.log(weatherData);
		const weatherInfo = {
			temperature: weatherData.main.temp,
			feelsLike: weatherData.main.feels_like,
			minTemperature: weatherData.main.temp_min,
			maxTemperature: weatherData.main.temp_max,
			weather: weatherData.weather[0].description,
			humidity: weatherData.main.humidity,
			name: weatherData.name,
		};
		weatherConditionUpdate(Number(weatherData.weather[0].id));
		displayWeatherInfo(weatherInfo);
	} catch (error) {
		console.error("Error fetching weather data:", error);
	}
});

function displayWeatherInfo(weatherInfo) {
	document.getElementById("weather-info").innerHTML = `
        <div class="row">
          <div class="col-12 col-md-6">
            <h2 class="font-weight-bold mb-0">${weatherInfo.name}</h2>
          </div>
          <div class="col-12 col-md-6 text-md-right">
            <h1 class="display-4 font-weight-bold mb-0">${weatherInfo.temperature}°C</h1>
            <p>Feels like ${weatherInfo.feelsLike}°C</p>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-6 col-md-3">
            <p>Min: ${weatherInfo.minTemperature}°C</p>
          </div>
          <div class="col-6 col-md-3">
            <p>Max: ${weatherInfo.maxTemperature}°C</p>
          </div>
          <div class="col-6 col-md-3">
            <p>Weather: ${weatherInfo.weather}</p>
          </div>
          <div class="col-6 col-md-3">
            <p>Humidity: ${weatherInfo.humidity}%</p>
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
