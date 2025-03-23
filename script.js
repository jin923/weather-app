function getWeather() {
    const city = document.getElementById("city").value;
    const apiKey = "79378ea26761d3eaa1df75b46088948c"; // Your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const temp = data.main.temp;
                const weather = data.weather[0].main;
                const iconCode = data.weather[0].icon; // Get weather icon code
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`; // Icon URL
                const humidity = data.main.humidity; // Get humidity
                const windSpeed = data.wind.speed; // Get wind speed

                // Update HTML content
                document.getElementById("city-name").innerText = city;
                document.getElementById("temperature").innerText = `${temp}°C`;
                document.getElementById("description").innerText = `${weather}`;
                document.getElementById("humidity").innerHTML = `
    <div class="info-box">
        <i class="fas fa-tint"></i>
        <div class="text">
            <span>${humidity}%</span>
            <p>Humidity</p>
        </div>
    </div>
`;

                document.getElementById("wind-speed").innerHTML =`
    <div class="info-box">
        <i class="fas fa-wind"></i>
        <div class="text">
            <span>${windSpeed} km/h</span>
            <p>Wind Speed</p>
        </div>
    </div>
`;

                // Fix the weather icon issue
                const weatherIcon = document.getElementById("weather-icon");
                weatherIcon.src = iconUrl;
                weatherIcon.style.display = "block"; // Show the image only when data is available
            } else {
                document.getElementById("weather-info").innerHTML = `<p>City not found. Try again.</p>`;
            }
        })
        .catch(error => {
            document.getElementById("weather-info").innerHTML = `<p>Error fetching weather data.</p>`;
        });
}
