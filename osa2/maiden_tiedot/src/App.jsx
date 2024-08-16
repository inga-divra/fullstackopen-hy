import { useEffect, useState } from "react"
import Country from "./components/Country"
import Search from "./components/Search"
import axios from "axios"

const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchedItem, setSearchedItem] = useState('')


  useEffect(() => {
    try {
      axios
        .get(url)
        .then(response => {
          const countries = response.data
          setCountries(countries)
        })
    } catch (error) {
      console.log(error);
    }
  }, [])


  const handleSearchedItem = (e) => {
    setSearchedItem(e.target.value);
  }

  //display only searched countries
  const countriesToShow = countries.filter((country) => {
    const name = country.name.common
    return name.toLowerCase().includes(searchedItem.toLowerCase())
  })


  return <div className="center">
    <Search searchedItem={searchedItem} handleSearchedItem={handleSearchedItem} />
    <Country countriesToShow={countriesToShow} searchedItem={searchedItem} />
  </div>
}

export default App