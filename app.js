const express = require("express");
var cons = require('consolidate');


// Function to fetch weather data
async function getWeatherData(city) {
  console.log(city)
  const apiKey = "3583598f2905696b1295fb5241a59448";
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(weatherURL);
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.log("Error fetching weather data:", error);
    throw error;
  }
}

const app = express();
var path = require ('path');
//app.set("view engine", "ejs");

app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname + '../public')));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/weather", async (req, res) => {
  const city = req.query.city;
  try {
    const weatherData = await getWeatherData(city);
    console.log(weatherData);
    console.log(weatherData.main.temp)
    let weatherInfo = {
      temperature: weatherData.main.temp,
      feelsLike: weatherData.main.feels_like,
      minTemperature: weatherData.main.temp_min,
      maxTemperature: weatherData.main.temp_max,
      pressure: weatherData.main.pressure,
      humidity: weatherData.main.humidity
    };
    console.log(weatherinfo)
    // res.render("index", { weather: weatherData });
    res.render("index", { weatherInfo: weatherInfo });
  } catch (error) {
    res.status(500).send("Error fetching weather data.");
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Weather app is running on port ${PORT}`);
});
