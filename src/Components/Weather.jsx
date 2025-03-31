import axios from "axios";
import { FaSearch } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import weatherForecast from "./weatherForecast";
import Loader from "./Loader";
import WeatherDetails from "./WeatherDetails";
// const apiKey = import.meta.env.VITE_API_KEY;
const Weather = () => {
  const key = "bb60a37ba6d01f853b6bcd5f5899b110";
  const [city, setCity] = useState("");
  const [forecast,setForecast]=useState([]);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for saved preference or use system preference
    const savedMode = localStorage.getItem("darkMode");
    return savedMode
      ? JSON.parse(savedMode)
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const initialValues = {
    cityName: "N/A",
    cityTemperature: "N/A",
    cityWeatherCondition: "N/A",
    cityHumidity: "N/A",
    cityWindSpeed: "N/A",
    cityWeatherIcon: "N/A",
  };
  const [weatherData, setWeatherData] = useState(initialValues);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  function handleSearch(cityName) {
    if (cityName === "") {
      setError("Invalid city name");
      console.log("Invalid city name");
      return;
    }
    setIsLoading(true);
    setTimeout(async() => {
      fetchWeatherDetails();
      // const response=await weatherForecast(cityName);
      // setForecast(response);
      setIsLoading(false);
    }, 2000);
  }

  async function fetchWeatherDetails() {
    if (!isLoading) {
      setIsLoading(true);
    }
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
      );
      const { data } = response;
      console.log(data);
      if (!data) {
        throw new Error("Data should not empty");
      }
      setError("");
      const freshWeatherData = {};
      freshWeatherData.cityName = data?.name;
      freshWeatherData.cityTemperature = data?.main?.temp;
      freshWeatherData.cityHumidity = data?.main?.humidity;
      freshWeatherData.cityWindSpeed = data?.wind?.speed;
      freshWeatherData.cityWeatherCondition = data?.weather[0]?.main;
      freshWeatherData.cityWeatherIcon = data?.weather[0]?.icon;
      console.log(freshWeatherData);
      setWeatherData(freshWeatherData);
      if (history.length < 6) {
        setHistory((prev) => [freshWeatherData.cityName, ...prev]);
      } else {
        history.remove(history[history.length - 1]);
        setHistory((prev) => [freshWeatherData.cityName, ...prev]);
      }
      // setIsLoading(false);
    } catch (err) {
      const { status } = err;
      if (status === 404) {
        setError("City not found");
      }
      console.log(err);
      setIsLoading(false);
    }
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "dark bg-gray-900" : "bg-red-200"
      }`}
    >
      <div className="flex justify-end p-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white cursor-pointer"
        >
          {darkMode ? "Light" : "Dark"}
        </button>
      </div>

      <div className="flex justify-center mx-auto">
        <form className="flex mt-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder=" Search "
            className="border-2 border-indigo-600 rounded-md md:w-md sm:w-sm w-54 p-2 text-sm sm:text-xl bg-red-200 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            onChange={(e) => {
              setCity(e.target.value);
            }}
            value={city}
            required
          />
          <div className="pl-2">
            <button
              disabled={isLoading}
              onClick={() => handleSearch(city)}
              className="border-2 border-indigo-400 rounded-md bg-gray-200 p-3 cursor-pointer hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
            >
              <FaSearch className="text-xl" />
            </button>
          </div>
        </form>
      </div>

      <div>
        {isLoading !== true ? (
          <div className="sm:flex justify-around">
            {error === "" ? (
              <div className="">
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => handleSearch(city)}
                    className="border-2 border-indigo-400 rounded-md bg-gray-200 p-2 cursor-pointer hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                  >
                    Refresh
                  </button>
                </div>
                <WeatherDetails weatherData={weatherData} />
                <div className="flex flex-col text-center h-45 w-40 mx-auto sm:my-2 my-20">
                  <div className="font-medium sm:text-2xl p-1 bg-gray-200 justify-center dark:bg-gray-700 dark:text-white">
                    History
                  </div>
                  <ul>
                    {history.length === 0 && (
                      <li className="font-md sm:text-2xl bg-gray-200 p-2 dark:bg-gray-700 dark:text-white">
                        No recent search
                      </li>
                    )}
                    {history.map((item, index) => {
                      if (index === 0) {
                        return;
                      }
                      return (
                        <li
                          key={index}
                          onClick={() => handleSearch(item)}
                          className="font-md sm:text-xl px-2 pt-1 bg-gray-200 cursor-pointer dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                        >
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="font-semibold text-2xl my-50 bg-zinc-500 p-3 rounded-md">{error}</div>
            )}
          </div>
        ) : (
          <Loader isLoading={isLoading} />
        )}
      </div>
    </div>
  );
};

export default Weather;
