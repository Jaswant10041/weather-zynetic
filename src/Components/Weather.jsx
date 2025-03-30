import axios from "axios";
// const apiKey = import.meta.env.VITE_API_KEY;
import { FaSearch } from "react-icons/fa";
import React, { useEffect, useState } from "react";
const Weather = () => {
  const key='bb60a37ba6d01f853b6bcd5f5899b110';
  const [city, setCity] = useState("");
  const [queryCity, setQueryCity] = useState("");
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const initialValues = {
    cityName: "N/A",
    cityTemperature: "N/A",
    cityWeatherCondition: "N/A",
    cityHumidity: "N/A",
    cityWindSpeed: "N/A",
    cityWeatherIcon: "N/A",
  };
  const [weatherData, setWeatherData] = useState(initialValues);

  function handleSearch(cityName) {
    if (cityName === "") {
      setError("Enter valid city name");
      return;
    }
    // setTimeout(()=>{
    setQueryCity(cityName);
    // },2000);
  }
  async function fetchWeatherDetails() {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&appid=${key}&units=metric`
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
      //pune
      //chennai
      //delhi
      //bengaluru
      //hyderabad
      //punjab
      //anantapur
    } catch (err) {
      const { status } = err;
      if (status === 404) {
        // alert("City Not found Enter valid City Name")
        setError("City Not found Enter valid City Name");
      }
      console.log(err);
    }
  }
  useEffect(() => {
    if (queryCity === "") {
      return;
    }
    fetchWeatherDetails();
  }, [queryCity]);
  return (
    <div className="h-full w-full">
      <div className="flex justify-center mx-auto">
        <form className="flex mt-10" onSubmit={(e)=>e.preventDefault()}>
          <input
            type="text"
            placeholder=" Search "
            className="border-2 border-indigo-600 rounded-md md:w-md sm:w-sm w-54 p-2 text-sm sm:text-xl "
            onChange={(e) => {
              setCity(e.target.value);
            }}
            value={city}
            required
          />
          <div className="pl-2">
            <button
              onClick={() => handleSearch(city)}
              className="border-2 border-indigo-400 rounded-md bg-gray-200 p-3 cursor-pointer hover:bg-gray-100"
            >
              <FaSearch className="text-xl"/>
            </button>
          </div>
        </form>
      </div>
      <div className="sm:flex justify-around mt-15 pt-15">
        {error === "" && (
          <div className="sm:flex flex-row text-center font-medium sm:text-3xl mx-auto">
            <div className="flex flex-col p-2 bg-gray-200 mx-3 rounded-md justify-center m-2">
              <label>City Name </label>
              <p className="pt-1">{weatherData?.cityName}</p>
            </div>
            <div className="flex flex-col p-2 bg-gray-200 mx-3 rounded-md justify-center m-2">
              <label>Temperature </label>
              <p className="pt-1">{weatherData?.cityTemperature} °C</p>
            </div>
            <div className="flex flex-col p-2 bg-gray-200 mx-3 rounded-md justify-center m-2">
              <label>Weather Condition </label>
              <p className="pt-1">{weatherData?.cityWeatherCondition}</p>
            </div>
            <div className="flex flex-col p-2 bg-gray-200 mx-3 rounded-md justify-center m-2">
              <label>Humidity </label>
              <p className="pt-1">{weatherData?.cityHumidity}%</p>
            </div>
            <div className="flex flex-col p-2 bg-gray-200 mx-3 rounded-md justify-center m-2">
              <label>Wind Speed </label>
              <p className="pt-1">{weatherData?.cityWindSpeed} m/s</p>
            </div>
            <div className="flex flex-col p-2 bg-gray-200 mx-3 rounded-md justify-center m-2">
              <label>Weather Icon </label>
              <p className="pt-1">{weatherData?.cityWeatherIcon}</p>
            </div>
          </div>
        )}
        
        {<div className="font-medium text-2xl">{error}</div>}
        <div className="flex flex-col text-center h-45 w-40 mx-auto sm:my-2  my-20">
          <div className="font-medium sm:text-2xl p-2 bg-gray-200 justify-center rounded-md">
            History
          </div>
          <ul>
            {history.length === 0 && (
              <li className="font-md sm:text-2xl bg-gray-200 p-2 rounded-md">No recent search</li>
            )}
            {history.map((item, index) => {
              if (index === 0) {
                return;
              }
              return (
                <li
                  key={index}
                  onClick={() => handleSearch(item)}
                  className="font-md text-2xl p-2 bg-gray-200 rounded-md"
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Weather;
