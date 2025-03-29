import axios from "axios";
// const apiKey = import.meta.env.VITE_API_KEY;
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
    <div className="m-3">
      <div className="flex justify-center mt-10">
        <form className="flex" onSubmit={(e)=>e.preventDefault()}>
          <input
            type="text"
            placeholder=" Search "
            className="border-2 border-indigo-600 w-md rounded-md p-2"
            onChange={(e) => {
              setCity(e.target.value);
            }}
            value={city}
            required
          />
          <div className="pl-1">
            <button
              onClick={() => handleSearch(city)}
              className="border-2 border-emerald-400 p-2 rounded-md bg-gray-200"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="flex justify-around mt-15 pt-15">
        {error === "" && (
          <div className="flex flex-row text-center font-medium text-3xl mx-3">
            <div className="flex flex-col p-2 mx-3 bg-gray-200 rounded-md justify-center h-45">
              <label>City Name </label>
              <p>{weatherData?.cityName}</p>
            </div>
            <div className="flex flex-col p-2 bg-gray-200 mx-3 rounded-md justify-center">
              <label>Temperature </label>
              <p>{weatherData?.cityTemperature} °C</p>
            </div>
            <div className="flex flex-col p-2 bg-gray-200 mx-3 rounded-md justify-center">
              <label>Weather Condition </label>
              <p>{weatherData?.cityWeatherCondition}</p>
            </div>
            <div className="flex flex-col p-2 bg-gray-200 mx-3 rounded-md justify-center">
              <label>Humidity </label>
              <p>{weatherData?.cityHumidity}%</p>
            </div>
            <div className="flex flex-col p-2 bg-gray-200 mx-3 rounded-md justify-center">
              <label>Wind Speed </label>
              <p>{weatherData?.cityWindSpeed} m/s</p>
            </div>
            <div className="flex flex-col p-2 bg-gray-200 mx-2 rounded-md justify-center">
              <label>Weather Icon </label>
              <p>{weatherData?.cityWeatherIcon}</p>
            </div>
          </div>
        )}
        {<div className="font-medium text-2xl">{error}</div>}
        <div className="flex flex-col text-center h-45 w-40">
          <div className="font-medium text-2xl p-2 bg-gray-200 justify-center rounded-md">
            History
          </div>
          <ul>
            {history.length === 0 && (
              <li className="font-md text-2xl bg-gray-200 p-2">No recent search</li>
            )}
            {history.map((item, index) => {
              if (index === 0) {
                return;
              }
              return (
                <li
                  key={index}
                  onClick={() => handleSearch(item)}
                  className="font-md text-2xl p-2 bg-gray-200"
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
