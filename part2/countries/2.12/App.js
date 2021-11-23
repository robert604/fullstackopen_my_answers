import React, {useState,useEffect} from 'react';
import axios from 'axios';

const FilterInput = ({filterText,setFilterText})=>{
  return(
    <div>
      find countries
      <input  value={filterText} onChange={(event)=>{
        setFilterText(event.target.value)
      }}/>
    </div>
  )
}


function filterCountries(countries,filterText) {
  return countries.filter(country=>{
    return country.name.common.toLowerCase().includes(filterText.toLowerCase())
  })
}

const CountryNames = ({countries})=>{
  return(
    <div>
      {countries.map(country=><div key={country.name.common}>{country.name.common}</div>)}
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

  useEffect(()=>{
    axios.get('https://restcountries.com/v3.1/all').then((response)=>{
      setData(response.data)
    })
  },[])

  const filtered = filterCountries(data,filterText)
  if(filtered.length===1) {
    return(
      <div>
        <FilterInput filterText={filterText} setFilterText={setFilterText}/>        
        <CountryData country={filtered[0]}/>
      </div>
    )
  } else if(filtered.length>10) {
    return(
      <div>
        <FilterInput filterText={filterText} setFilterText={setFilterText}/>
        Too many matches, specify another filter        
      </div>

    )
  } else {
    return (
      <div>
        <FilterInput filterText={filterText} setFilterText={setFilterText}/>
        <CountryNames countries={filtered}/>
      </div>
    );
  }
}

export default App;
