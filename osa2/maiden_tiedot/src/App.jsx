import axios from 'axios'
import { useState, useEffect } from 'react'
import Country from './Components/Country'
import CountryList from './Components/CountryList'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterCountries, setFilterCountries] = useState('')

  const hook = () => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response => {
        setCountries(countries.concat(response.data))
        console.log(response.data)
      }))
  }

  useEffect(hook, [])

  const handleFilterChange = (event) => {
    setFilterCountries(event.target.value)
  }

  const showCountry = (country) => {
    console.log(country)
    setFilterCountries(country.name.common)
  }

  const countriesToShow = countries.filter((country) => 
  country.name.common.toLowerCase().includes(filterCountries.toLowerCase()))

  return (
    <div>
      <div>
      find countries <input
      value={filterCountries}
      onChange={handleFilterChange}/>
      </div>
      <div>
      {countriesToShow.length > 10 ? (
      <p>Too many matches, specify another filter</p>
      ) : countriesToShow.length < 10 && countriesToShow.length > 1 ? (
        countriesToShow.map(country => 
        <CountryList key={countriesToShow.name} country={country} showCountry={showCountry}/>)
      ) : (
        countriesToShow.map(country =>
        <Country key={countriesToShow.name} countriesToShow={country}/>)
      )}
      </div>
    </div>
  )
}

export default App