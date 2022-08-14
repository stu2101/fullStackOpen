import { useState, useEffect } from 'react'
import axios from 'axios';
import Filter from './components/Filter'
import Countries from './components/Countries'

function App() {

    const [countries, setCountries] = useState([]);
    const [filter, setFilter] = useState('')

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then(response => {
                console.log("promise fullfilled")
                setCountries(response.data)
            })
    }, [])

    return (
        <div>
            {console.log("filter value is", filter)}
            <Filter onChange={handleFilterChange} />
            {/* {filter.length > 0 && countries.length >= 10 ?
                <p>Too many matches, specify another filter</p> :
            } */}
            <Countries countries={countries} filter={filter} />

        </div>
    );
}

export default App;