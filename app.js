

const express = require("express");
var cons = require('consolidate');

const app = express();
var path = require ('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


async function getWeatherData(city) {
  const apiKey = "3583598f2905696b1295fb5241a59448";
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(weatherURL);
  return response.json();
}

app.get("/", async (req, res) => {
  try {
    const defaultCity = 'Hyderabad';
    const weatherData = await getWeatherData(defaultCity);
    res.render("index", { weatherData: weatherData });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).send("Error loading the page.");
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Weather app is running on port ${PORT}`);
});
