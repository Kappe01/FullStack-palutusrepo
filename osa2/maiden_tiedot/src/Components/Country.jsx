const Country = ({countriesToShow}) => {
    console.log(countriesToShow.languages)
    return (
        <div>
            <div>
            <h1>{countriesToShow.name.common}</h1>
            <p>capital {countriesToShow.capital}</p>
            <p>area {countriesToShow.area}</p>
            </div>
            <div>
                <h2>languages:</h2>
                <ul>
                {Object.entries(countriesToShow.languages).map(([code, language]) => (
                <li key={code}>
                    {language}
                </li>
                ))}
                </ul>
            </div>
            <div>
                <img src={countriesToShow.flags.png}/>
            </div>
        </div>
        
    )
}

export default Country