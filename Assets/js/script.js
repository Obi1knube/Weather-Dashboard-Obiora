
// Step 1: Capture the form and input field in variables
var formEl = document.querySelector('#search-form');
var cityInputEl = document.querySelector('#city-input');
var searchHistory= document.querySelector('#search-history');
var weatherAPIKey = "7bf1bc8896b2490b467308927aa00c20";

// Step 2: Add an event listener to the form
formEl.addEventListener('submit', function(event) {
  event.preventDefault();

  // Step 3: Retrieve the city name from the input field
  var cityName = cityInputEl.value;

  // Step 4: Make an API request to retrieve weather data for the city
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherAPIKey}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // Step 5: Use the retrieved data to display the current weather conditions on the page
      var weather = data.weather[0].description;
      var temperature = data.main.temp;
      var humidity = data.main.humidity;
      var windSpeed = data.wind.speed;

      // Display the weather conditions on the page
      var weatherInfo = document.querySelector('#weather-info');
      weatherInfo.innerHTML = `
        <p>Weather: ${weather}</p>
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
      `;
    })
    .catch(function(error) {
      console.log(error);
    });

  // Step 6: Store the searched city in the search history
  var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  searchHistory.push(cityName);
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

  // Step 7: Display the search history on the page and add event listeners to the search history items
  var searchHistoryList = document.querySelector('#search-history');
  searchHistoryList.innerHTML = '';
  searchHistory.forEach(function(city) {
    var listItem = document.createElement('li');
    listItem.textContent = city;
    searchHistoryList.appendChild(listItem);

    // Add event listener to the search history items
    listItem.addEventListener('click', function() {
      // Repeat steps 3-5 to display the weather conditions for that city
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}`)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          // Use the retrieved data to display the current weather conditions on the page
          var weather = data.weather[0].description;
          var temperature = data.main.temp;
          var humidity = data.main.humidity;
          var windSpeed = data.wind.speed;

          // Display the weather conditions on the page
          var weatherInfo = document.querySelector('#weather-info');
          weatherInfo.innerHTML = `
            <p>Weather: ${weather}</p>
            <p>Temperature: ${temperature}°C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
          `;
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  });
});

// Step 8: Add an event listener to the search history items



// When a search history item is clicked, repeat steps 3-5 to display the weather conditions for that city

//This code uses the fetch function to make an API request to retrieve weather data for the city entered in the input field. The retrieved data is then used to display the current weather conditions on the page. The searched city is stored in the search history, which is displayed on the page. When a search history item is cli