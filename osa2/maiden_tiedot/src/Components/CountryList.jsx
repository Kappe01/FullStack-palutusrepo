const CountryList = ({country, showCountry}) => {
    console.log(country)
    return (
        <p>{country.name.common} <button onClick={() => showCountry(country)}>show</button></p>
    )
}

export default CountryList