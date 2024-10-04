const weatherContainer = document.getElementById('weatherContainer'); // Get a reference to the HTML element with the ID 'weatherContainer'

// List of locations to fetch weather data for (name, latitude, longitude)
const locations = [
    { name: "Tokyo", latitude: 35.6895, longitude: 139.6917 },
    { name: "London", latitude: 51.5074, longitude: -0.1278 },
    { name: "New York", latitude: 40.7128, longitude: -74.0060 },
    { name: "Oslo", latitude: 59.9139, longitude: 10.7522 },
    { name: "Sydney", latitude: -33.8688, longitude: 151.2093 },
    { name: "Paris", latitude: 48.8566, longitude: 2.3522 }
];

// Function to fetch weather data for a location
function fetchWeather(location) { // URL for the Open-Meteo API
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`; 
    
    fetch(url) // Fetch weather data from the Open-Meteo API
        .then(response => response.json()) // Convert the response to JSON
        .then(data => { // Handle the JSON data
            // Create a div for each location with the weather data
            const weatherDiv = document.createElement('div');
            weatherDiv.classList.add('weather'); // Add the 'weather' class to the div
            weatherDiv.innerHTML = ` 
                <h2>${location.name}</h2>
                <p>Temperature: ${data.current_weather.temperature}°C</p>
                <p>Wind Speed: ${data.current_weather.windspeed} km/h</p>
                <p>Weather Condition: ${data.current_weather.weathercode}</p>
            `; // Add the location name, temperature, wind speed, and weather condition to the div
            weatherContainer.appendChild(weatherDiv); // Add the div to the weatherContainer
        })
        .catch(error => console.error('Error fetching weather data:', error)); // Handle any errors
}

// Function to fetch weather data for all locations
function fetchAllWeather() {
    weatherContainer.innerHTML = ''; // Clear the weatherContainer
    locations.forEach(location => fetchWeather(location)); // Fetch weather data for each location
}

// Fetch weather data every 30 seconds
setInterval(fetchAllWeather, 30000);

// Fetch weather data when the page loads
fetchAllWeather();
