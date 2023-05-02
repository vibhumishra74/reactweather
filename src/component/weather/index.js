import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './weather.css'

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('metric');
  const navigate = useNavigate();

  const API_KEY = 'e77460dfaa55e9e9c1642c52add1954f';

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

  useEffect(()=>{
    city.length >0 && handleFetchWeather()
  },[unit])

  const addToLocalStorage = (data) => {
    const storedData = JSON.parse(localStorage.getItem('weatherData') || '[]');
    const existingData = storedData.find(d => d.data.name === data.name && d.data.unit === data.unit);
    if (existingData) {
      // console.log('Data already exists:', existingData);
    } else {
      
      storedData.push({data,unit});
      localStorage.setItem('weatherData', JSON.stringify(storedData));
      // console.log('Data stored successfully:', data);
    }
  };
  
  const handleFetchWeather = async() => {
    try {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`);
      const data = response.data;
      setWeatherData(data);
      data.cod === 200 && addToLocalStorage(data);
  
      const forecastResponse = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`);

        // const forecastResponse = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${data?.coord?.lat}&lon=${data?.coord?.lon}&units=${unit}&appid=${API_KEY}`); 
        // commented this because some times it give some error
      
        const forecastData = forecastResponse.data;
      setWeatherData(prevData => ({ ...prevData, forecast: forecastData }));
    } catch (error) {
      console.log(error.message);
    }
  };
 

  return (
    <div className='weather_app'>
      <h1 className='title'>Weather App</h1>
      <button className='button' style={{margin:'10px'}} onClick={() => {
            navigate(`/history`);
          }}>See History</button>
      <div className='input-container'>
        <label className='label' htmlFor="city">City:</label>
        <input className='input' placeholder='Enter city name' id="city" type="text" value={city} onChange={handleCityChange} />
      </div>
      <div className='select-container'>
        <label className='label' htmlFor="unit">Unit:</label>
        <select className='input' id="unit" value={unit} onChange={handleUnitChange}>
          <option  value="metric">Celsius</option>
          <option value="imperial">Fahrenheit</option>
        </select>
      </div>
      <button className='button' onClick={()=>handleFetchWeather()}>Get Weather</button>
      {weatherData && (
        <div className='weather-info'>
          <h2 className='city-name'>{weatherData.name}</h2>
          <p className='temperature'>Temperature: {weatherData?.main?.temp} &deg;{unit === 'metric' ? 'C' : 'F'}</p>
          <p className='humidity'>Humidity: {weatherData?.main?.humidity} %</p>
          {weatherData.weather && weatherData.weather[0] && (
            <p>Weather Condition: {weatherData.weather[0].main}</p>
          )}
         {weatherData.forecast && weatherData.forecast.list && (
  <div>
    <h3 className='forecast-title'>7-day Forecast</h3>
    <div className='card'>
    <ul className='forecast-list'>
      {weatherData.forecast.list
        .filter((forecast, index, array) => {
          const date = new Date(forecast.dt * 1000).toLocaleDateString();
          return index === array.findIndex((f) => new Date(f.dt * 1000).toLocaleDateString() === date);
        })
        .slice(0, 7)
        .map((forecast) => (
          <li className='forecast-item' key={forecast.dt}>
            {new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'long', month: 'numeric', day: 'numeric' })}: {forecast.main.temp}&deg;{unit === 'metric' ? 'C' : 'F'}
            <img
                          src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
                          alt={forecast.weather[0].description}
                          className="forecast-icon"
                        />
                         <div className="forecast-details">
                          
                          <p className="forecast-description">{forecast.weather[0].description}</p>
                        </div>
          </li>
        ))}
    </ul>
    </div>
  </div>
)}


        </div>
      )}
    </div>
  );
};

export default WeatherApp;
