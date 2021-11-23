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

const deletePerson = (id)=>{
    const url = `${baseUrl}/${id}`
    const prom = axios.delete(url)
    return prom
}

const updatePerson = (person)=>{
    const url = `${baseUrl}/${person.id}`
    const prom = axios.put(url,person)
    return prom
}

const exp = {getAllPersons,createPerson,deletePerson,updatePerson}
export default exp