import { useState, useEffect } from 'react'
import axios from 'axios';

function App() {

    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const currentCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLocaleLowerCase()))

    return (
        <div>
            <p>
                find countries <input onChange={handleFilterChange}></input>
            </p>
            <Countries countries={currentCountries} filter={filter} setFilter={setFilter}/>

        </div>
    )
}

const Countries = (props) => {
    const countries = props.countries
    const filter = props.filter
    const setFilter = props.setFilter

    if (countries.length > 10 && filter.length > 0) {
        return <p>Too many matches, specify another filter</p>
    }

    if (countries.length === 1) {
        return (
            <div>
                <h1>{countries[0].name.common}</h1>
                <p>capital {countries[0].capital}</p>
                <p>area {countries[0].area}</p>
                <h3>languages:</h3>
                <ul>
                    {Object.values(countries[0].languages).map(language => <li key={language}>{language}</li>)}
                </ul>
                <img src={countries[0].flags.png}></img>
            </div>
        )
    }

    return (
        <div>
            {countries.map(country =>
                <div key={country.name.common}>
                    {country.name.common} <button value={country.name.common} onClick={(e) => setFilter(e.target.value)}>show</button>
                </div>)}
        </div>
    )
}

export default App;