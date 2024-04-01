# weatherAPI

Task

Select any free API and write a simple multiple-page web app that displays information pulled from it. If you don't know which API to start with, here is a list of Public APIs for inspiration.

Requirements:

Node.js with Express and EJS templates.
All client-side assets (stylesheets, images, javacripts, etc.) must be hosted locally, served from your repo/site:
Bootstrap or Tailwind CSS.
jQuery is OK but otherwise please use your own Vanilla Javascript. No React, Vue, or other JS frameworks.
Git Version Control; please push your repo to Github when ready.
Jest
Note that any submissions containing AI-generated code will be disqualified.




## Features
- Get current weather data based on geolocation.
- Search for weather by city.
- Display air quality index and other related data.
- Responsive UI with dynamic weather backgrounds.

## Technologies Used
- Node.js
- Express
- EJS for templating
- OpenWeatherMap API for weather and air quality data
- JavaScript (Client-Side for DOM manipulations)

## Project Structure
- `app.js`: The main server file that initializes the app and sets up endpoints.
- `index.ejs`: The EJS template for the main page that gets rendered on the server.
- `public/`: Contains static files like stylesheets, client-side JavaScript, and images.
  - `index.js`: Client-side script to handle the fetching of weather data and updating the DOM.
- `views/`: Contains EJS templates.
- `node_modules/`: Contains all the npm packages that the app depends on.

## Getting Started

### Prerequisites
- Node.js installed on your machine.

### Installation
1. Clone the repository to your local machine.
2. Run `npm install` to install all the dependencies.
3. Start the server with `npm start` or `node app.js`.



# INITIAL SETUP:

I began by setting up the project using the following commands:

npm init -y
npm install node-fetch --save
Afterward, I created app.js, which serves as the server-side script. I initialized the web application using Express.js, a framework for Node.js. I configured the application to utilize EJS (Embedded JavaScript) as the templating engine for views.

Following the requirements, the initial page is rendered server-side. I implemented API calls within the server script to fetch weather data. Initially, the default city parameter is set to fetch details from the weather API.

Additionally, I established a route handler to serve as the initial homepage for the web application. The default city used for fetching details to load the page is Hyderabad.

The project's default port is configured to 3000.

# client side rendering

I created an index.ejs file to handle the UI page rendering, embedding JavaScript code for initial data display. Upon testing the website at http://localhost:3000/?#, I encountered some initial challenges due to my limited knowledge of embedded JavaScript.

Subsequently, I devised a strategy to handle client-side interactions. I began by creating a index.js file responsible for client-side operations. This included implementing a function to accept user input for the desired city, triggering API calls accordingly. The callWeather function orchestrates these API calls, processing the JSON response into a weatherInfo object used to populate the HTML page.

To enhance user experience, I incorporated geolocation functionality to automatically detect the user's location. This involved accessing latitude and longitude data, which were then used in a geocoding API call to determine the corresponding city name. Subsequently, weather details for this city were fetched. This functionality was achieved through an event listener named contentLoader.

The displayWeatherInfo is used in rendering the webpage, utilizing the data retrieved from the APIs to populate the content dynamically.


Some additional features were implemented to enhance the application. One such feature is the dynamic background image change based on the weather condition of the location. For instance, background images change according to weather conditions such as thunderstorm, mist, etc., based on the value of the weather fetched from the API.

Another feature is pagination, which was developed using a government API to retrieve the latest weather alerts. Currently, weather alerts are limited to the United States as I couldn't find any public API offering weather alerts for free for specific locations. Therefore, this feature remains consistent for all cities that might be searched by the user.

The pagination technique utilized was one that I had designed during my time at Accenture. It involves calculating the number of pages based on the number of alerts, with one alert displayed per card. Implementation included adding next and previous buttons, as well as direct page navigation. This aspect took considerable time, as challenges were encountered with CSS and creating logic to correctly display the pages, particularly since the initial page numbering didn't start from 1.

# Test Case

I decided to create a separate test directory to write test functions for some of these features. However, this task took longer than expected because I wasn't familiar with writing test classes for JavaScript, having previously worked with Java and Apex. Thus, I had to acquire knowledge on testing in JavaScript before proceeding.

I focused on writing test cases for fetchAirQualityData and weatherConditionUpdate. To simulate API calls, I attempted to mock the functions. I aimed to learn how to use JEST for API testing as well.

One aspect that I struggled with was importing functions, as I hadn't yet learned ES module syntax. Consequently, I encountered errors when trying to use CommonJS export and import methods, which I was more familiar with.

A limitation I encountered was that the test cases could only be executed by running npm test after uncommenting the following syntax in index.js:

`module.exports ={fetchAirQualityData,weatherConditionUpdate};`
This approach allowed me to observe the test cases being executed. However, it required me to comment out these lines again to run the main application, as leaving them uncommented would cause errors.


# IMPORTANT

As previously mentioned, there is a limitation in the project where in order to run the application (node app.js), I need to comment out the line:


`module.exports ={fetchAirQualityData,weatherConditionUpdate};`

This is because leaving it uncommented throws errors. To address this issue, I attempted to resolve it by transitioning from CommonJS syntax to ES module syntax. I modified the code to use import and export statements and added type = module in package.json. However, this resulted in errors in app.js.

Despite trying to resolve these errors by converting everything to ES syntax, I encountered several challenges that I couldn't overcome within the limited time available. Consequently, I decided to continue with the older implementation.


# Future Work

I had considered dividing the functionality of index.js into three distinct parts: Pagination, API handling, and UI management. However, due to the import and export errors, I couldn't achieve this modularization.

Additionally, I attempted to implement a weather forecast map to provide an aerial view of the location, but I couldn't find any free APIs offering this feature.

I also wanted to implement multiple test functions, but time constraints limited my ability to do so.

In terms of CSS styling, I had planned to utilize Bootstrap to enhance the visual appearance of the application. This would have involved implementing more styling to customize backgrounds and other elements.

For the pagination feature, I considered modifying the box structure to display colors based on the type of weather alert.


I planned to implement caching for weather news and weather facts. However, I couldn't find any resources or APIs for weather facts. When I attempted to implement cache logic for weather alerts, I faced challenges due to my limited real-time experience and knowledge in this area.




The code lacks real-time design considerations and neglects security concerns due to time limitations. Error handling and data storage in databases are not implemented, and constants are not consistently defined at the top of the code. Additionally, best coding practices are not followed throughout the project.


















