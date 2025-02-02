import PropTypes from 'prop-types';
import { Thermometer, Droplet, Wind } from 'lucide-react';

const WeatherDetails = ({ data }) => {
  return (
    <div className="details-container">
      <div className="detail">
        <Thermometer size={24} strokeWidth={1.5} />
        {data.main && <p className="bold">{data.main.feels_like.toFixed()}°</p>}
        <p>Feels Like</p>
      </div>
      <div className="detail">
        <Droplet size={24} strokeWidth={1.5} />
        {data.main && <p className="bold">{data.main.humidity}%</p>}
        <p>Humidity</p>
      </div>
      <div className="detail">
        <Wind size={24} strokeWidth={1.5} />
        {data.wind && <p className="bold">{data.wind.speed.toFixed()} mph</p>}
        <p>Wind Speed</p>
      </div>
    </div>
  );
};

WeatherDetails.propTypes = {
  data: PropTypes.object.isRequired,
};

export default WeatherDetails;
