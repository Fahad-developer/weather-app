async function getWeather() {
      const city = document.getElementById("cityInput").value.trim();
      const apiKey = "8e6ec1f40f52427588075015250306";

      if (!city) {
        alert("Please enter a city name.");
        return;
      }


      try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
        const data = await response.json();
        console.log(data)

        if (data.error) {
          document.getElementById("result").innerHTML = `<p> ${data.error.message}</p>`;
          return;
        }

        const weather = data.current;
        console.log(weather)
        const location = data.location;
        console.log(location)

        document.getElementById("result").innerHTML = ` <div class="card">
            <h2>${location.name}, ${location.country}</h2>
            <p><strong>${weather.condition.text}</strong></p>
            <p> Temp: ${weather.temp_c}°C</p>
            <p> Humidity: ${weather.humidity}%</p>
            <p> Wind: ${weather.wind_kph} kph</p>
          </div> `;
      } catch (err) {
        document.getElementById("result").innerHTML = "<p> Failed to fetch data. Check console.</p>";
        console.error(err);
      }
    }