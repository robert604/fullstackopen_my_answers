import React, {useState,useEffect} from 'react';
import axios from 'axios';

const FilterInput = ({data,filterText,setFilterText,setCountriesToShow})=>{
  return(
    <div>
      find countries
      <input  value={filterText} onChange={(event)=>{
        const newFilterText = event.target.value
        setFilterText(newFilterText)
        const filtered = filterCountries(data,filterText)
        setCountriesToShow({countries:filtered,show:new Array(filtered.length).fill(false)})
      }}/>
    </div>
  )
}

function filterCountries(countries,filterText) {
  return countries.filter(country=>{
    return country.name.common.toLowerCase().includes(filterText.toLowerCase())
  })
}

const Country = ({i,countriesToShow,setCountriesToShow})=>{
  const {countries,show} = countriesToShow 
  const country=countries[i]
  const showDetails=show[i]
 
  function showClickHandler(event) {
    const newShow = [...show]
    newShow[i] = true
    setCountriesToShow({countries:countries,show:newShow})
  }
  if(showDetails) {
    return(
      <div>
        {country.name.common}
        <button onClick={showClickHandler}>show</button>
        <CountryData country={country}/>
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
  const [countriesToShow,setCountriesToShow] = useState({countries:[],show:[]})

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
        <FilterInput data={data} filterText={filterText} setFilterText={setFilterText} setCountriesToShow={setCountriesToShow}/>
        <Countries countriesToShow={countriesToShow} setCountriesToShow={setCountriesToShow}/>
      </div>
    );
  }
}

export default App;
