async function getWeather() {
      const city = document.getElementById("cityInput").value.trim();
      const apiKey = "8e6ec1f40f52427588075015250306";
      const output = document.getElementById("weatherCards");
      output.innerHTML = "Loading...";

      if (!city) {
        alert("Please enter a city name.");
        return;
      }

      try {
        const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`);
        const data = await res.json();

        const location = data.location;
        const current = data.current;
        const forecast = data.forecast.forecastday;

        output.innerHTML = '';

        // Current Weather Card
        output.innerHTML += `<div class="card">
            <h3>Now in ${location.name}</h3>
            <p><strong>${current.condition.text}</strong></p>
            <p> Temp: ${current.temp_c}°C</p>
            <p> Humidity: ${current.humidity}%</p>
            <p> Wind: ${current.wind_kph} kph</p>
            <p class="small">${location.localtime}</p>
          </div>`;

        // Forecast Cards
        forecast.forEach(day => {
          output.innerHTML += `<div class="card">
              <h3>${day.date}</h3>
              <p><strong>${day.day.condition.text}</strong></p>
              <p> Max: ${day.day.maxtemp_c}°C</p>
              <p> Min: ${day.day.mintemp_c}°C</p>
              <p> Humidity: ${day.day.avghumidity}%</p>
            </div>`;
        });

      } catch (err) {
        console.error(err);
        output.innerHTML = `<div class="card">❌ Error fetching data</div>`;
      }
    }