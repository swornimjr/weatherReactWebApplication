import { useState } from "react";
import { cities } from "../data/cities";
import fetchWeather from "../axios/weatherAxios";
import "../App.css"; // Import CSS styles

const Weather = () => {
  const [city, setCity] = useState(""); // User-entered city
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch weather data
  const getWeather = async (selectedCity) => {
    if (!selectedCity) return;
    setLoading(true);

    const data = await fetchWeather(selectedCity);
    setWeather(data);

    setLoading(false);
  };

  // Function to fetch a random city's weather
  const getRandomCityWeather = () => {
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    setCity(randomCity.name);
    getWeather(randomCity.name);
  };

  // 🌈 Function to change background color based on weather
  const getBackgroundImage = () => {
    if (!weather) return "/images/clearsky.jpg"; // Default background

    switch (weather.weather) {
      case "clear sky":
        return "/images/clearsky.jpg";
      case "few clouds":
      case "scattered clouds":
      case "broken clouds":
      case "overcast clouds":
        return "/images/cloudy.jpg";
      case "rain":
      case "shower rain":
      case "light rain":
        return "/images/rainy.jpg";
      case "snow":
        return "/images/snowy.jpg";
      case "mist":
      case "haze":
      case "fog":
        return "/images/foggy.jpg";
      case "thunderstorm":
        return "/images/thunderstorm.jpg";
      default:
        return "/images/clear-sky.jpg";
    }
  };

  return (
    <div className="weather-container">
      {/* Background Image with Blur */}
      <div
        className="weather-background"
        style={{ backgroundImage: `url(${getBackgroundImage()})` }}
      ></div>

      {/* Weather Content */}
      <div className="weather-content">
        <h2>🌍 Weather App</h2>

        {/* Input field for user to enter a city */}
        <div>
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={() => getWeather(city)}>Get Weather</button>
        </div>

        {/* Button to fetch random city's weather */}
        <button onClick={getRandomCityWeather}>🎲 Get Random City</button>

        {/* Display Weather Data */}
        {loading && <p>⏳ Loading weather...</p>}
        {weather && (
          <div className="weather-card">
            <h3>📍 {weather.city}</h3>
            <p>
              🌡 <strong>Temperature:</strong> {weather.temperature}°C
            </p>
            <p>
              🥶 <strong>Feels Like:</strong> {weather.feels_like}°C
            </p>
            <p>
              💧 <strong>Humidity:</strong> {weather.humidity}%
            </p>
            <p>
              🌦 <strong>Condition:</strong> {weather.weather}
            </p>
            <p>
              🌅 <strong>Sunrise:</strong> {weather.sunrise}
            </p>
            <p>
              🌇 <strong>Sunset:</strong> {weather.sunset}
            </p>
            <img src={weather.icon} alt={weather.weather} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
