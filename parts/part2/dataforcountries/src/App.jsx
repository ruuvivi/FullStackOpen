import { useState, useEffect } from 'react'
import axios from 'axios'

const Button = (props) => { 
  console.log('Button props value is', props)
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

  const handleClick = (country) => {
    setSelectedCountry(country);
  };

  useEffect(() => {
    if (value) {
      console.log('effect run, country is now', filteredCountries)
      if (value) {
        console.log('fetching information...')
        axios
        .get(`https://restcountries.com/v3.1/name/${value}`)
        .then(response => {
          setInformation(response.data)
        })
    } else {
      setInformation([]) // clear information if no search input
    }}
  }, [value])

  const handleChange = (event) => {
    setValue(event.target.value)
    setSelectedCountry(null); // Clear the information when input changes
  }

  const onSearch = (event) => {
    event.preventDefault();
    setCountriesFiltered(value)
    setSelectedCountry(null);
  }

  const queryList = () => {
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
    } else if (filteredCountries.length === 1) {
      // Directly show the single country's details
      const country = filteredCountries[0];
      return showselectedCountry(country);
    }
  }

  const showselectedCountry = (country) => {
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
          alt={`Flag of ${country.name.common}`}
        />
      </div>
    );
  }

  useEffect(() => {
    // Filter countries based on the search input
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
      {/* Show selected country details if a country is selected */}
      {selectedCountry && showselectedCountry(selectedCountry)}
    </div>
  )
}

export default App