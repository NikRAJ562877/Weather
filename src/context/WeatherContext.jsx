import { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState('');
  const [unit, setUnit] = useState('imperial'); // 'imperial' (°F) or 'metric' (°C)
  const [error, setError] = useState(null);

  const API_KEY = '47b5b91f8721ba932a1259a4cd725d17';
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
  const API_FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

  const fetchWeatherData = useCallback(async (cityName) => {
    if (!cityName) return; // Prevent API call with empty city name

    try {
      const response = await axios.get(API_URL, {
        params: { q: cityName, units: unit, appid: API_KEY },
      });
      setData(response.data);
      setError(null);

      const forecastResponse = await axios.get(API_FORECAST_URL, {
        params: { q: cityName, units: unit, appid: API_KEY },
      });

      const dailyData = forecastResponse.data.list.filter((_, index) => index % 8 === 0);
      setForecast(dailyData);
    } catch (error) {
      setError('Failed to fetch weather data. Please check the city name.');
      setData({});
      setForecast([]);
    }
  }, [unit]); // Dependency array includes `unit` so it refetches when `unit` changes

  // 🌟 Automatically refetch weather data when `unit` changes (if data already exists)
  useEffect(() => {
    if (data.name) {
      fetchWeatherData(data.name);
    }
  }, [unit]); // Runs when `unit` changes

  const searchLocation = (event) => {
    if (event.key === 'Enter' && location) {
      fetchWeatherData(location);
      setLocation('');
    }
  };

  return (
    <WeatherContext.Provider value={{
      data, forecast, location, setLocation, searchLocation, error, unit, setUnit, fetchWeatherData
    }}>
      {children}
    </WeatherContext.Provider>
  );
};

WeatherProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { WeatherContext, WeatherProvider };
