import React from "react";

const WeatherDetails = (props) => {
  const { weatherData } = props;
  return (
    <div>
      <div className="sm:flex flex-row text-center font-medium sm:text-3xl mx-auto mt-15 pt-15">
        <div className="flex flex-col p-2 sm:p-8 bg-gray-200 mx-auto rounded-md justify-center ml-3 mt-1 dark:bg-gray-700 dark:text-white">
          <label className="dark:text-gray-300">City Name</label>
          <p className="pt-1">{weatherData?.cityName}</p>
        </div>
        <div className="flex flex-col p-2 sm:p-8 bg-gray-200 mx-auto rounded-md justify-center ml-3 mt-1 dark:bg-gray-700 dark:text-white">
          <label className="dark:text-gray-300">Temperature</label>
          <p className="pt-1">{weatherData?.cityTemperature} °C</p>
        </div>
        <div className="flex flex-col p-2 sm:p-8 bg-gray-200 mx-auto rounded-md justify-center ml-3 mt-1 dark:bg-gray-700 dark:text-white">
          <label className="dark:text-gray-300">Weather Condition</label>
          <p className="pt-1">{weatherData?.cityWeatherCondition}</p>
        </div>
        <div className="flex flex-col p-2 sm:p-8 bg-gray-200 mx-auto rounded-md justify-center ml-3 mt-1 dark:bg-gray-700 dark:text-white">
          <label className="dark:text-gray-300">Humidity</label>
          <p className="pt-1">{weatherData?.cityHumidity} %</p>
        </div>
        <div className="flex flex-col p-2 bg-gray-200 mx-auto rounded-md justify-center ml-3 mt-1 dark:bg-gray-700 dark:text-white">
          <label className="dark:text-gray-300">Wind Speed</label>
          <p className="pt-1">{weatherData?.cityWindSpeed} m/s</p>
        </div>
        <div className="flex flex-col p-2 bg-gray-200 mx-auto rounded-md justify-center ml-3 mt-1 dark:bg-gray-700 dark:text-white">
          <label className="dark:text-gray-300">Weather Icon</label>
          {weatherData.cityWeatherIcon !== "N/A" ? (
            <div className="flex justify-center ">
              <img
                src={`http://openweathermap.org/img/w/${weatherData.cityWeatherIcon}.png`}
                alt="weather icon"
                className=""
              />
            </div>
          ) : (
            <p>{weatherData.cityWeatherIcon}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
