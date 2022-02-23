import { memo, useEffect, useState } from 'react'

const WEATHER_API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY
const WEATHER_API_URL = 'https://restcountries.com/v2/all'
// Helper function
function findCountryMatch(country, queryFilter) {
  const sanitizedCountryName = country.name.toLowerCase()
  const sanitizedQueryFilter = queryFilter.toLowerCase()
  return sanitizedCountryName.includes(sanitizedQueryFilter)
}

// Components
const CountryNotFound = () => {
  return (
    <p>Country not found</p>
  )
}
const CountryData = memo(({ country }) => {
  const [weather, setWeather] = useState()

  const [lat, lon] = country.latlng

  useEffect(() => {
    window.fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`)
      .then(res => res.json())
      .then(data => setWeather({ temp: data.main.temp, wind: data.wind.speed, icon: data.weather[0].icon }))
  }, [])

  return (
    <div key={country.name}>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <div>
        <p>languages</p>
        <ul>
          {country.languages.map(language => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <img src={country.flag} alt={`${country.name}-flag`} width={280} />
      </div>
      {weather
        ? (
          <>
            <h2>Weather in {country.name}</h2>
            <p>temperature {weather.temp} Celsius</p>
            <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt='' />
            <p>wind {weather.speed} m/s</p>
          </>
        )
        : <p>Loading weather data...</p>}
    </div>
  )
})
const CountryListItem = memo(({ country, handleClick }) => {
  return (
    <div key={country.name}>
      {country.name}
      <button onClick={() => handleClick(country)}>Show</button>
    </div>
  )
})
const CountriesView = ({ countries, queryFilter, handleClick }) => {
  const [currentCountries, setCurrentCountries] = useState(countries)

  useEffect(() => {
    const filteredCountries = countries.filter(country => findCountryMatch(country, queryFilter))
    setCurrentCountries(filteredCountries)
  }, [queryFilter])

  return (
    <div>
      {currentCountries.length > 10 && queryFilter.length > 0
        ? <p>Too many matches, be a specific in the query</p>
        : currentCountries.length === 0 && queryFilter.length > 0
          ? <CountryNotFound />
          : currentCountries.length > 1 && queryFilter.length > 0
            ? currentCountries.map(country => (
              <CountryListItem
                country={country}
                handleClick={handleClick}
                key={country.name}
              />
            ))
            : currentCountries.length === 1
              ? currentCountries.map(country => (
                <CountryData
                  country={country}
                  key={country.name}
                />
              ))
              : <p>Find a country</p>}
    </div>
  )
}

// Main Component
const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [queryFilter, setQueryFilter] = useState('')

  useEffect(() => {
    window.fetch(WEATHER_API_URL)
      .then(res => res.json())
      .then(data => {
        setAllCountries(() => data)
      })
  }, [])

  const handleInputChange = (e) => {
    setQueryFilter(() => e.target.value)
  }

  const handleButtonClick = (country) => {
    setAllCountries(() => [country])
  }

  return (
    <div>
      <div>
        find countries
        <input type='text' name='find' onChange={handleInputChange} />
      </div>
      {allCountries.length > 0
        ? (
          <CountriesView
            countries={allCountries}
            queryFilter={queryFilter}
            handleClick={handleButtonClick}
          />
        )
        : <p>Loading...</p>}
    </div>
  )
}

export default App
