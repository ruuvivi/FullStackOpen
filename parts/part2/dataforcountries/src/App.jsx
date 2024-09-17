import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('')
  const [information, setInformation] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    console.log('effect run, country is now', filteredCountries)

    // skip if country is not defined
    if (value) {
      console.log('fetching information...')
      axios
        .get(`https://restcountries.com/v3.1/name/${value}`)
        .then(response => {
          setInformation(response.data)
        })
    }
    else {
      setInformation([])
    }
  }, [value])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (event) => {
      event.preventDefault()
      setCountriesFiltered(value)
    }

  const queryList = () => {
    if (filteredCountries.length > 10) {
      return (
      <p>Too many matches, specify another filter</p>
      )
    }
    else if (filteredCountries.length > 1) {
      return (
        <div>
          {filteredCountries.map(country => (
            <ul>{country.name.common}</ul>
          ))}
          </div>
      )
  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0]
    return (
      <div>
          <h1>{country.name.common}</h1>
          <p>capital {country.capital}</p>
          <p>area {country.area} km²</p>
          <h3>languages:</h3>
          <li>
            {Object.values(country.languages).map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </li>
          <img
            src={country.flags.svg}
            style={{ width: '200px', height: '200px' }}
          />
        </div>
      )
    }
  }

  useEffect(() => {
    // Filter countries based on the search input
    setFilteredCountries(
      information.filter(country =>
        country.name.common.toLowerCase().includes(value.toLowerCase())
      )
    )
  }, [value, information])

  return (
    <div>
      <form onSubmit={onSearch}>
        find countries <input value={value} onChange={handleChange} />
      </form>
      {queryList()}
    </div>
  )
}

export default App