import { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';

const Search = () => {
  const { location, setLocation, searchLocation } = useContext(WeatherContext);

  return (
    <div className="search-container">
      <input
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder="Enter Location"
        type="text"
        className='search-input'
      />
    </div>
  );
};

export default Search;
