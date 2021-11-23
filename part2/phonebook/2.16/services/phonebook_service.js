import axios from 'axios'

const baseUrl = "http://localhost:3001/persons"

const getAllPersons = ()=>{
    const url = baseUrl
    const prom = axios.get(url)
    return prom.then(response=>response.data)
}

const createPerson = (item)=>{
    const url = baseUrl
    const prom = axios.post(url,item)
    return prom.then(response=>response.data)
}


const exp = {getAllPersons,createPerson}
export default exp