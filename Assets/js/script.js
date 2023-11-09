// Step 1: Capture the form and input field in variables
const form = document.querySelector('form');
const cityInput = document.querySelector('#city-input');

// Step 2: Add an event listener to the form
form.addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Step 3: Retrieve the city name from the input field
  const cityName = cityInput.value;

  // Step 4: Make an API request to retrieve weather data for the city
  // Use the retrieved data to display the current weather conditions on the page

  // Step 5: Use the retrieved data to display the 5-day forecast on the page

  // Step 6: Store the searched city in the search history

  // Step 7: Display the search history on the page and add event listeners to the search history items

});

// Step 8: Add an event listener to the search history items
// When a search history item is clicked, repeat steps 3-5 to display the weather conditions for that city
