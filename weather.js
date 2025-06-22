async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = "c68d208b920823cf730235050d8c844a";
    const weatherInfo = document.getElementById('weatherInfo');

    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();

        if (data.cod !== 200) {
            weatherInfo.innerHTML = `<p>❌ ${data.message}</p>`;
        } else {
            const { name, main, weather } = data;
            const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

            weatherInfo.innerHTML = `
                <h2>${name}</h2>
                <img src="${icon}" alt="${weather[0].description}" />
                <p><strong>${main.temp}°C</strong> - ${weather[0].description}</p>
                <p>Humidity: ${main.humidity}%</p>
            `;
        }
        weatherInfo.classList.remove("hidden");
    } catch (error) {
        weatherInfo.innerHTML = `<p>⚠️ Error fetching weather data.</p>`;
        weatherInfo.classList.remove("hidden");
    }
}
