var formEl = $('#search-form');
var cityInputEl = $('#city-input');
var currentWeatherEl = $('#current-weather');
var futureWeatherEl = $('.future-forecast');
var searchHistoryEl = $('.search-history');
var weatherAPIKey = "7bf1bc8896b2490b467308927aa00c20";

// Load the search history from local storage
var savedSearchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

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
  // Add the city to the saved search history
  savedSearchHistory.push(city);

  // Save the updated search history to local storage
  localStorage.setItem('searchHistory', JSON.stringify(savedSearchHistory));

  // Print the search history on the page
  printSearchHistory();
}

// Function to print the search history on the page
function printSearchHistory() {
  // Clear the search history element
  searchHistoryEl.empty();

  // Loop through the saved search history and create list items
  for (var i = 0; i < savedSearchHistory.length; i++) {
    var city = savedSearchHistory[i];
    var listItem = $('<li>').text(city);
    searchHistoryEl.append(listItem);
  }
}

// Function to fetch current weather data
function fetchCurrentWeather(city) {
  var currentWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}&units=metric`;

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
    currentWeatherEl.text(`
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
  var futureWeatherAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherAPIKey}&units=metric`;

  // Make a GET request to the weather API
  $.ajax({
    url: futureWeatherAPI,
    method: 'GET'
  }).then(function(response) {
    // Process the response and display future weather forecast
    var forecastList = response.list;

    // Clear the future weather element
    futureWeatherEl.empty();

    // Loop through the forecast list and display each forecast
    for (var i = 0; i < forecastList.length; i += 7) {
      var forecast = forecastList[i];
      var date = new Date(forecast.dt * 1000);
      var icon = forecast.weather[0].icon;
      var temperature = forecast.main.temp;
      var humidity = forecast.main.humidity;
      var windSpeed = forecast.wind.speed;
      var iconUrl = `http://openweathermap.org/img/w/${icon}.png`;
      var iconImage = $(`<img src=${iconUrl} >`);

      // Create a new forecast element
      var forecastElement = $('<div>').text(`
        Date: ${date}
        Temperature: ${temperature}
        Humidity: ${humidity}
        Wind Speed: ${windSpeed}
      `);

      forecastElement.append(iconImage);
      forecastElement.addClass('card');

      // Append the forecast element to the future weather element
      futureWeatherEl.append(forecastElement);
    }
  });
}

// Event listener for form submission
formEl.on('submit', handleFormSubmit);

// Print the search history

$('#clearSearchHistory').on('click', function() {
  // Clear the saved search history
  savedSearchHistory = [];

  // Clear the search history in local storage
  localStorage.removeItem('searchHistoryEl');

  // Clear the search history display
  printSearchHistory();
});