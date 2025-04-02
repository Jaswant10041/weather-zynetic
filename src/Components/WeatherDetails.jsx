import React from "react";

const WeatherDetails = (props) => {
  const { weatherData } = props;
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 text-center font-medium sm:text-3xl mx-auto mt-15 pt-15 gap-2">
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg text-center">
          <label className="dark:text-gray-300">City Name</label>
          <p className="pt-1">{weatherData?.cityName}</p>
        </div>
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg text-center">
          <label className="dark:text-gray-300">Temperature</label>
          <p className="pt-1">{weatherData?.cityTemperature} °C</p>
        </div>
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg text-center">
          <label className="dark:text-gray-300">Weather Condition</label>
          <p className="pt-1">{weatherData?.cityWeatherCondition}</p>
        </div>
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg text-center">
          <label className="dark:text-gray-300">Humidity</label>
          <p className="pt-1">{weatherData?.cityHumidity} %</p>
        </div>
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg text-center">
          <label className="dark:text-gray-300">Wind Speed</label>
          <p className="pt-1">{weatherData?.cityWindSpeed} m/s</p>
        </div>
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg text-center">
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
