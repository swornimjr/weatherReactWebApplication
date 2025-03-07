import axios from "axios";

// Define API Base URL
const API_BASE_URL = "http://localhost:8000/api/weather"; // Your backend URL

// Function to fetch weather data
const fetchWeather = async (city) => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: { city },
    });

    return response.data.data; // Extracting only the weather data
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null; // Return null in case of an error
  }
};

export default fetchWeather;
