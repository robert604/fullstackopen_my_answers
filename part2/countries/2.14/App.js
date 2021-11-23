import React, {useState,useEffect} from 'react';
import axios from 'axios';

const FilterInput = ({data,filterText,setFilterText,countriesToShow,setCountriesToShow})=>{
  return(
    <div>
      find countries
      <input  value={filterText} onChange={(event)=>{
        const newFilterText = event.target.value    
        setFilterText(newFilterText)
        const filtered = filterCountries(data,filterText)
        setCountriesToShow({
          countries:filtered,
          show:new Array(filtered.length).fill(false),
          capitalWeather:new Array(filtered.length).fill(null)
        })
      }}/>
    </div>
  )
}

function filterCountries(countries,filterText) {
  return countries.filter(country=>{
    return country.name.common.toLowerCase().includes(filterText.toLowerCase())
  })
}

const CapitalWeather = ({i,countriesToShow})=>{
  const {countries,capitalWeather} = countriesToShow
  const country = countries[i]
  const weatherData = capitalWeather[i]
  if(weatherData!==null) {
    return(
      <div>
        <h3>Weather in {country.capital[0]}</h3>
        <div>Temperature: {weatherData.main.temp} Celsius</div>
        <div>Humidity: {weatherData.main.humidity}%</div>
        <div>Temp min: {weatherData.main.temp_min} Celsius, Temp max: {weatherData.main.temp_max} Celsius</div>
        <div>Wind speed {weatherData.wind.speed} meter/sec</div>
      </div>
    )
  } else {
    return(
      <div></div>
    )
  }
}
const Country = ({i,countriesToShow,setCountriesToShow})=>{
  const {countries,show,capitalWeather} = countriesToShow 
  const country=countries[i]
  const showDetails=show[i]
 
  function showClickHandler(event) {
    const newShow = [...show]
    newShow[i] = true
    setCountriesToShow({countries:countries,show:newShow,capitalWeather:new Array(countries.length).fill(null)})
    const capital = country.capital[0]
    const cca2 = country.tld.cca2
    const units = "metric"
    const apikey = process.env.REACT_APP_WEATHER_API_KEY
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + capital + "," + cca2 + "&units=" + units + "&appid=" + apikey
    axios.get(url).then((response)=>{
      const newWeather = [...capitalWeather]
      newWeather[i] = response.data
      setCountriesToShow({countries:countries,show:newShow,capitalWeather:newWeather})
    })
  }
  if(showDetails) {
    return(
      <div>
        {country.name.common}
        <button onClick={showClickHandler}>show</button>
        <CountryData country={country}/>
        <CapitalWeather i={i} countriesToShow={countriesToShow}/>
      </div>
    )
  } else {
    return(
      <div>
        {country.name.common}
        <button onClick={showClickHandler}>show</button>
      </div>
    )
  }
}

const Countries = ({countriesToShow,setCountriesToShow})=>{
  const {countries} = countriesToShow
  return(
    <div>
      {countries.map((country,i)=>{
        return(
          <Country key={country.name.common}
            i={i}
            countriesToShow={countriesToShow}
            setCountriesToShow={setCountriesToShow}/>
        )
      })}
    </div>
  )
}

const Languages = ({country})=>{
  return(
    <div>
      <h3>languages</h3>
      <ul>
        {Object.entries(country.languages).map(([langshort,langlong])=>{
          return(
            <li key={langlong}>{langlong}</li>
          )
        })}
      </ul>
    </div>
  )
}

const CountryData = ({country})=>{
  return(
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <Languages country={country}/>
      <img src={country.flags.png} alt="" width="100" />
    </div>
  )
}



function App() {
  const [data,setData] = useState([])
  const [filterText,setFilterText] = useState('')
  const [countriesToShow,setCountriesToShow] = useState({countries:[],show:[],capitalWeather:[]})

  useEffect(()=>{
    axios.get('https://restcountries.com/v3.1/all').then((response)=>{
      setData(response.data)
    })
  },[])

  if(countriesToShow.countries.length>10) {
    return(
      <div>
        <FilterInput data={data} filterText={filterText} setFilterText={setFilterText} setCountriesToShow={setCountriesToShow}/>
        Too many matches, specify another filter        
      </div>

    )
  } else {
    return (
      <div>
        <FilterInput data={data} filterText={filterText} setFilterText={setFilterText} countriesToShow={countriesToShow} setCountriesToShow={setCountriesToShow}/>
        <Countries countriesToShow={countriesToShow} setCountriesToShow={setCountriesToShow}/>
      </div>
    );
  }
}

export default App;
