import axios from "axios";
import React, { useEffect, useState } from "react";
const Weather = () => {
  const [city,setCity]=useState('');
  const [queryCity,setQueryCity]=useState('');
  const [dataUpdated,setDataUpdated]=useState(false);
  const weatherData = {
    cityName: null,
    cityTemperature: null,
    cityWeatherCondition: null,
    cityHumidity: null,
    cityWindSpeed: null,
    cityWeatherIcon: null,
    isLoading: null,
    isError: null,
  };
  function handleSearch(){
    if(city===''){
      console.log("Enter valid City name");
      return ;
    }
    setTimeout(()=>{
      setQueryCity(city);
    },2000);
  }
  async function fetchWeatherDetails() {
    try {
      weatherData.isLoading = true;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&appid=&units=metric`
      );
      const { data } = response;
      console.log(data);
      if (!data) {
        throw new Error("Data should not empty");
      }
      weatherData.cityName = data?.name;
      weatherData.cityTemperature = data?.main?.temp;
      weatherData.cityHumidity = data?.main?.humidity;
      weatherData.cityWindSpeed = data?.wind?.speed;
      weatherData.cityWeatherCondition = data?.weather[0]?.main;
      weatherData.cityWeatherIcon = data?.weather[0]?.icon;
      weatherData.isLoading = false;
      weatherData.isError = false;
      // setDataUpdated(true);
      console.log(weatherData);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if(queryCity===''){
      return ;
    }
    fetchWeatherDetails();
  }, [queryCity]);
  return (
    <div className="m-3">
      <div className="flex justify-center">
        <input type="text" placeholder=" Search " className="border-2 border-indigo-600 w-xs rounded-md" onChange={(e)=>{
          setCity(e.target.value);
        }} value={city}/>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {
          weatherData?.cityName
        }
        {
          weatherData?.cityTemperature
        }
        {
          weatherData?.cityWeatherCondition
        }
        {
          weatherData?.cityWindSpeed
        }
        {
          weatherData?.cityWeatherIcon
        }
      </div>
    </div>
  );
};

export default Weather;
