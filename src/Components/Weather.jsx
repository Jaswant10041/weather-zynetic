import axios from "axios";
import { FaSearch } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import WeatherDetails from "./WeatherDetails";

const Weather = () => {
  const apiKey = "bb60a37ba6d01f853b6bcd5f5899b110"; // Consider using environment variable
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState([]);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode
      ? JSON.parse(savedMode)
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const initialWeatherData = {
    cityName: "N/A",
    cityTemperature: "N/A",
    cityWeatherCondition: "N/A",
    cityHumidity: "N/A",
    cityWindSpeed: "N/A",
    cityWeatherIcon: "N/A",
  };
  const [weatherData, setWeatherData] = useState(initialWeatherData);

  // Set dark mode class and save preference
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Fetch 5-day forecast data
  const fetchForecast = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
      );
      // Get one forecast per day (around midday)
      console.log(response.data.list);
      return response.data.list
        .filter((_, index) => index % 8 === 0)
        .slice(0, 5);
    } catch (error) {
      console.error("Forecast error:", error);
      return [];
    }
  };

  // Handle city search
  const handleSearch = async (cityName) => {
    if (!cityName.trim()) {
      setError("Please enter a city name");
      return;
    }
    setCity(cityName);
    setIsLoading(true);
    setError("");

    try {
      await fetchWeatherDetails(cityName);
      const forecastData = await fetchForecast(cityName);
      setForecast(forecastData);
    } catch (error) {
      console.error("Search error:", error);
      setError(
        error.response?.status === 404
          ? "City not found"
          : "Error fetching weather data"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch current weather
  const fetchWeatherDetails = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          cityName || city
        }&appid=${apiKey}&units=metric`
      );

      const { data } = response;
      if (!data) throw new Error("No data received");

      setWeatherData({
        cityName: data.name,
        cityTemperature: data.main.temp,
        cityHumidity: data.main.humidity,
        cityWindSpeed: data.wind.speed,
        cityWeatherCondition: data.weather[0].main,
        cityWeatherIcon: data.weather[0].icon,
      });
      if (weatherData.cityName === "N/A") {
        //do nothing
      } else if (history.length < 6) {
        setHistory((prev) => [weatherData.cityName, ...prev]);
      } else {
        history.remove(history[history.length - 1]);
        setHistory((prev) => [weatherData.cityName, ...prev]);
      }
    } catch (error) {
      console.error("Weather fetch error:", error);
      throw error;
    }
  };

  return (
    <div className={`min-h-screen w-full fixed inset-0 overflow-y-auto ${darkMode ? "bg-gray-900" : "bg-red-200"}`}>
      <header className="flex justify-end p-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white cursor-pointer hover:opacity-80 transition-opacity"
          aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
        >
          {darkMode ? "Light" : "Dark"}
        </button>
      </header>

      {/* Search bar */}
      <div className="flex justify-center mx-auto px-4">
        <form
          className="flex w-full max-w-md mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(city);
          }}
        >
          <input
            type="text"
            placeholder="Search city..."
            className="flex-1 border-2 border-indigo-600 rounded-md p-2 text-sm sm:text-xl bg-red-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="ml-2 border-2 border-indigo-400 rounded-md bg-gray-200 p-3 cursor-pointer hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white disabled:cursor-not-allowed"
          >
            <FaSearch className="text-xl" />
          </button>
        </form>
      </div>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <Loader isLoading={isLoading} />
        ) : error ? (
          <div className="text-center py-8 flex justify-center">
            <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 w-60 py-2 rounded-md">
              {error}
            </div>
          </div>
        ) : (
          <>
            {/* Current weather */}
            <div className="mb-12">
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => handleSearch(city)}
                  className="border-2 border-indigo-400 rounded-md bg-gray-200 px-4 py-2 cursor-pointer hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                >
                  Refresh
                </button>
              </div>
              <WeatherDetails weatherData={weatherData} />
            </div>

            <div className="mb-12">
              {weatherData.cityName === "N/A" ? (
                ""
              ) : (
                <h2 className="text-xl font-bold mb-6 text-center text-gray-700 dark:text-white">
                  5-Day Forecast
                </h2>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {forecast.map((day) => (
                  <div
                    key={day.dt}
                    className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md text-center"
                  >
                    <p className="font-semibold dark:text-white">
                      {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </p>
                    <img
                      src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                      alt={day.weather[0].description}
                      className="mx-auto w-16 h-16"
                    />
                    <p className="text-xl font-bold dark:text-white">
                      {Math.round(day.main.temp)}°C
                    </p>
                    <p className="text-sm capitalize dark:text-gray-300">
                      {day.weather[0].description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-xs mx-auto">
              <div className="font-medium text-lg p-2 bg-gray-200 dark:bg-gray-700 dark:text-white text-center rounded-t-md">
                Search History
              </div>
              <ul className="bg-white dark:bg-gray-800 rounded-b-md shadow">
                {history.length === 0 ? (
                  <li className="p-2 text-center text-gray-500 dark:text-gray-400">
                    No recent searches
                  </li>
                ) : (
                  history.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => handleSearch(item)}
                      className="p-2 text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700"
                    >
                      <div className="text-white">{item}</div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Weather;
