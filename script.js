async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "651c65ce19966bff7f8b91c19fb7a589"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const spinner = document.getElementById("loadingSpinner");
  const result = document.getElementById("weatherResult");

  try {
    spinner.classList.remove("d-none");
    result.classList.add("d-none");

    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    console.log(data); // Debugging output

    const cityName = `${data.name}, ${data.sys.country}`;
    const condition = data.weather[0].description;
    const temperature = `${data.main.temp}°C`;
    const humidity = `${data.main.humidity}%`;
    const iconCode = data.weather[0].icon;

    // Local time calculation
    const timezoneOffset = data.timezone;
    const localDate = new Date(Date.now() + timezoneOffset * 1000 - new Date().getTimezoneOffset() * 60000);
    const timeString = localDate.toLocaleString();

    // Update UI
    document.getElementById("cityName").textContent = `📍 ${cityName}`;
    document.getElementById("localTime").textContent = `🕒 Local Time: ${timeString}`;
    document.getElementById("weatherCondition").textContent = `🌤️ ${condition}`;
    document.getElementById("temperature").textContent = `🌡️ Temp: ${temperature}`;
    document.getElementById("humidity").textContent = `💧 Humidity: ${humidity}`;
    document.getElementById("weatherIcon").src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    result.classList.remove("d-none");
  } catch (error) {
    alert("Please enter a valid city.");
    console.error(error);
  } finally {
    spinner.classList.add("d-none");
  }
}
