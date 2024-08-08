document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '3576072ad3c9641c760bbe16e7e2639c';  // Replace with your OpenWeatherMap API key
    const weatherBtn = document.getElementById('get-weather-btn');
    const cityInput = document.getElementById('city-input');
    const weatherResult = document.getElementById('weather-result');

    weatherBtn.addEventListener('click', () => {
        const city = cityInput.value;
        if (city) {
            getWeather(city);
        } else {
            weatherResult.innerHTML = '<p>Please enter a city name.</p>';
        }
    });

    // Add input event listener to change button color
    document.getElementById('city-input').addEventListener('input', function() {
        var button = document.getElementById('get-weather-btn');
        button.style.backgroundColor = '#0056b3';
    });

    async function getWeather(city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.cod === 200) {
                displayWeather(data);
            } else {
                weatherResult.innerHTML = `<p>${data.message}</p>`;
            }
        } catch (error) {
            weatherResult.innerHTML = '<p>Unable to fetch weather data. Please try again later.</p>';
        }
    }

    function displayWeather(data) {
        const { name, main, weather } = data;
        const weatherDetails = `
            <h2>${name}</h2>
            <p>Temperature: ${main.temp}°C</p>
            <p>Weather: ${weather[0].description}</p>
            <p>Humidity: ${main.humidity}%</p>
            <p>Pressure: ${main.pressure} hPa</p>
        `;
        weatherResult.innerHTML = weatherDetails;
    }
    // function changeBackgroundImage(temperature) {
    //     let imageUrl = '';

    //     if (temperature  < 10) {
    //         imageUrl = url(freezy.jpg);
    //     } else if (temperature >= 10 && temperature <= 25) {
    //         imageUrl = 'url(image_url_3)';
    //     } else if (temperature >= 25 && temperature <= 35) {
    //         imageUrl = 'url(image_url_4)';
    //     } else {
    //         imageUrl = 'url(default_image_url)';
    //     }

    //     container.style.backgroundImage = imageUrl;
    // }

    // Trigger getWeather on pressing "Enter" key in the city input field
    cityInput.addEventListener('keydown', (event) => {
        if (event.keyCode === 13) { // Check if "Enter" key is pressed (key code 13)
            event.preventDefault(); // Prevent form submission (to avoid page reload)
            const city = cityInput.value;
            if (city) {
                getWeather(city);
            } else {
                weatherResult.innerHTML = '<p>Please enter a city name.</p>';
            }
        }
    });

    // Get weather data automatically on page load for a default city
    // const defaultCity = 'Greater Noida'; // Set your default city here
    // getWeather(defaultCity); // Fetch weather data for the default cityity
});
