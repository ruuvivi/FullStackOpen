import { useState, useEffect } from 'react'
import axios from 'axios'

const Button = (props) => { 
  const { handleClick, text } = props;
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [value, setValue] = useState('')
  const [information, setInformation] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  const api_key = import.meta.env.VITE_SOME_KEY;
  console.log('api key: ', api_key)

  const fetchWeather = (capital) => {
    console.log('api key fetcweather : ', api_key)
    if (capital) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`)
        .then(response => {
          console.log(response.data)
          console.log('api key 2: ', api_key)
          setWeather(response.data)
        })
  };
  }

  const handleClick = (country) => {
    setSelectedCountry(country);
    fetchWeather(country.capital);
  };

  useEffect(() => {
    if (selectedCountry) {
      fetchWeather(selectedCountry.capital);
    }
  }, [selectedCountry]);

  useEffect(() => {
    console.log('effect run, country is now', filteredCountries)
    if (value) {
      console.log('fetching information...')
      axios
      .get(`https://restcountries.com/v3.1/name/${value}`)
      .then(response => {
        setInformation(response.data)
      })
  } else {
    setInformation([])
    setFilteredCountries([])
  }
}, [value])

  const handleChange = (event) => {
    setValue(event.target.value)
    setSelectedCountry(null);
    setWeather(null);
  }

  const onSearch = (event) => {
    event.preventDefault();
    setSelectedCountry(country);
    setWeather(weather);
  }

  const queryList = () => {
    console.log('query', filteredCountries.length)
    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }
    else if (filteredCountries.length > 1) {
      return (
        <div>
          {filteredCountries.map(country => (
            <ul key={country.name.common}>
              {country.name.common}
              <Button handleClick={() => handleClick(country)} text="show" />
            </ul>
          ))}
        </div>
      )
    }
    else if (filteredCountries.length === 1) {
        const country = filteredCountries[0];
        if (weather == null) {
          fetchWeather(country.capital)
        }
        return showselectedCountry(country)
    }
  }

  const showselectedCountry = (country) => {
    console.log('weather: ', weather)
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area} km²</p>
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img
          src={country.flags.svg}
          style={{ width: '200px', height: '200px' }}
        />
        <div>
        {weather && (
          <div>
            <h3>weather in {country.capital}</h3>
            <p>temperature {weather.main.temp} °C</p>
            <p>wind {weather.wind.speed} m/s</p>
            <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            />
          </div>
        )}
        </div>
      </div>
    );
  }

  useEffect(() => {
    setFilteredCountries(
      information.filter(country =>
        country.name.common.toLowerCase().includes(value.toLowerCase())
      )
    );
  }, [value, information]);

  return (
    <div>
      <form onSubmit={onSearch}>
        find countries <input value={value} onChange={handleChange} />
      </form>
      {queryList()}
      {selectedCountry && showselectedCountry(selectedCountry)}
    </div>
  )
}

export default App