import { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import WeatherDetails from './WeatherDetails';

const WeatherDisplay = () => {
  const { data, forecast, unit, setUnit } = useContext(WeatherContext);

  return (
    <div className="weather-container">
      <div className="top">
        {/* Location and Time */}
        <div className="location-time">
          <p className="location-name">{data.name || "Sample Location"}</p>
          <p className="time">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>

        {/* Weather Icon & Temperature */}
        <div className="weather-info">
          {data.weather && (
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              className="weather-icon"
            />
          )}
          <div className="temp">
            {data.main && (
              <h1 className="temp-value">
                {data.main.temp.toFixed()}°{unit === 'imperial' ? 'F' : 'C'}
              </h1>
            )}
            <p className="description">{data.weather ? data.weather[0].description : "Weather Info"}</p>
          </div>
        </div>

        {/* Unit Switch Button */}
        <button
          className="switch-btn"
          onClick={() => {
            const newUnit = unit === 'imperial' ? 'metric' : 'imperial';
            setUnit(newUnit);
            if (data.name) fetchWeatherData(data.name); // Fetch data again with the new unit
          }}
        >
          Switch to {unit === 'imperial' ? '°C' : '°F'}
        </button>
      </div>

      {/* Weather Details & Forecast */}
      <div className="bottom-section">

        <div style={{ padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
          {data.name && <WeatherDetails data={data} />}
        </div>
        <div className="forecast">
          {forecast.slice(0, 6).map((day, index) => (
            <div key={index} className="forecast-day">
              <p className="day-name">{new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short' })}</p>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt={day.weather[0].description}
                className="forecast-icon"
              />

              <p className="day-temp">{day.main.temp.toFixed()}°{unit === 'imperial' ? 'F' : 'C'}</p>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
