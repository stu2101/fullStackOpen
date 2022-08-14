const Countries = (props) => {
    return (
        <ul>
            {props.countries
                .filter(country => country.name.common.toLowerCase().includes(props.filter.toLowerCase()))
                .map(country => <li key={country.name.common}>{country.name.common}</li>)
            }
        </ul>
    )
}

export default Countries