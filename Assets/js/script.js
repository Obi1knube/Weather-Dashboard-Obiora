
// Step 1: Capture the form and input field in variables
var formEl = $('#search-form');
var cityInputEl = $('#city-input');
var currenWeatherEl =$('#current-weather');
var futureWeatherEl=$('#future-forcast');
var searchHistory= $('#search-history');
var weatherAPIKey = "7bf1bc8896b2490b467308927aa00c20";
// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  // Get the value of the city input
  var city = cityInputEl.val().trim();

  // Check if the city is empty
  if (city === '') {
    return;
  }

  // Clear the city input
  cityInputEl.val('');

  // Save the city to the search history
  saveSearchHistory(city);

  // Fetch current weather data
  fetchCurrentWeather(city);

  // Fetch future weather forecast
  fetchFutureWeather(city);
}

// Function to save the city to the search history
function saveSearchHistory(city) {
  // Create a new list item
  var listItem = $('<li>').text(city);

  // Append the list item to the search history
  searchHistory.append(listItem);
}

// Function to fetch current weather data
function fetchCurrentWeather(city) {
  var currentWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}`;

  // Make a GET request to the weather API
  $.ajax({
    url: currentWeatherAPI,
    method: 'GET'
  }).then(function(response) {
    // Process the response and display current weather conditions
    var cityName = response.name;
    var date = new Date(response.dt * 1000);
    var icon = response.weather[0].icon;
    var temperature = response.main.temp;
    var humidity = response.main.humidity;
    var windSpeed = response.wind.speed;

    // Update the current weather element with the retrieved data
    currenWeatherEl.text(`
      City: ${cityName}
      Date: ${date}
      Icon: ${icon}
      Temperature: ${temperature}
      Humidity: ${humidity}
      Wind Speed: ${windSpeed}
    `);
  });
}

// Function to fetch future weather forecast
function fetchFutureWeather(city) {
  var futureWeatherAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherAPIKey}`;

  // Make a GET request to the weather API
  $.ajax({
    url: futureWeatherAPI,
    method: 'GET'
  }).then(function(response) {
    // Process the response and display future weather forecast
    var forecastList = response.list;

    // Loop through the forecast list and display each forecast
    for (var i = 0; i < forecastList.length; i++) {
      var forecast = forecastList[i];
      var date = new Date(forecast.dt * 1000);
      var icon = forecast.weather[0].icon;
      var temperature = forecast.main.temp;
      var humidity = forecast.main.humidity;
      var windSpeed = forecast.wind.speed;

      // Create a new forecast element
      var forecastElement = $('<div>').text(`
        Date: ${date}
        Icon: ${icon}
        Temperature: ${temperature}
        Humidity: ${humidity}
        Wind Speed: ${windSpeed}
      `);

      // Append the forecast element to the future weather element
      futureWeatherEl.append(forecastElement);
    }
  });
}

// Event listener for form submission
formEl.on('submit', handleFormSubmit);

