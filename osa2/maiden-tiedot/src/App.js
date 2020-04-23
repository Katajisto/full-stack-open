import React, { useState, useEffect } from 'react';

function Weather({ city }) {
  const [weather, setWeather] = useState({ temperature: "", icon: "", wind_speed: "", wind_direction: "" })
  useEffect(() => {

    const reqUrl = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${city}`

    fetch(reqUrl).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(JSON.stringify(data))
      setWeather({ temperature: data.current.temperature, wind_speed: data.current.wind_speed, wind_direction: data.current.wind_dir, icon: data.current.weather_icons[0] })
    })
  }, [])
  return (
    <>
      <h2>Weather in {city}</h2>

      <p>
        {`temperature: ${weather.temperature} Celcius`}
      </p>
      <img src={weather.icon}></img>
      <p>{`wind: ${weather.wind_speed} mph direction ${weather.wind_direction}`}</p>
    </>
  )
}

function App() {

  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("Finland");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all").then((response) => {
      return response.json();
    }).then((data) => {
      setCountries(data);
    })
  }, [])


  const filteredCountries = countries.filter((country) => {
    return country.name.toLowerCase().includes(search.toLowerCase())
  })

  function buttonHandler(name) {
    return (() => {
      setSearch(name);
    })
  }

  let countryInfo;

  if (filteredCountries.length > 10) {
    countryInfo = <h2>Too many matches, specify another filter</h2>
  } else if (filteredCountries.length > 1) {
    const countryList = filteredCountries.map(x => <li key={x.name}>{x.name} <button onClick={buttonHandler(x.name)}>Show</button></li>)
    countryInfo = <ul>{countryList}</ul>
  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    const languages = country.languages.map(x => <li key={x.name}>{x.name}</li>)
    countryInfo = (<>
      <h1>{country.name}</h1>
      capital {country.capital}<br></br>
      population {country.population}
      <h3>languages</h3>
      <ul>
        {languages}
      </ul>
      <img style={{ border: "solid black 2px" }} width={"300px"} src={country.flag} />
      <Weather city={country.capital}></Weather>
    </>)
  } else {
    countryInfo = <h2>No matches</h2>
  }

  return (
    <div>
      <div>
        find countries <input value={search} onChange={handleSearch}></input>
      </div>
      {countryInfo}
    </div>
  );
}

export default App;
