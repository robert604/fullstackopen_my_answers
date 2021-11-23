import React, { useState, useEffect } from 'react'
import db from "./services/phonebook_service"

const Person = ({person,persons,setPersons,setMessage}) => {
  const deleteHandler = (event)=>{
    const confirmation = window.confirm(`Confirm deletion of ${person.name}`) 
    if(confirmation) {   
      db.deletePerson(person.id).then(response=>{
        setPersons(persons.filter(p=>p.id!==person.id))
        showMessage(setMessage,`Deleted person: ${person.name}`)
      })
    }
  }
  return(
    <div>
      {person.name} {person.number} <button onClick={deleteHandler}>delete</button>
    </div>
  )
}

const Persons = ({filtered,persons,setPersons,setMessage}) => {
  return(
    filtered.map(person=>{
      return(
        <Person person={person} persons={persons} setPersons={setPersons} setMessage={setMessage} key={person.id}/>
      )
    })
  )
}

const FilterInput = ({filterText,filterTextChangeHandler})=>{
  return(
    <div>
      filter shown with<input value={filterText} onChange={filterTextChangeHandler}/>
    </div>
  )
}

const Notification = ({message})=>{
  if(message===null) return null
  return(
    <div className='notification'>{message}</div>
  )
}

function showMessage(setMessage,message) {
  setMessage(message)
  setTimeout(()=>setMessage(null),5000)
}

const App = () => {
  const [ persons, setPersons ] = useState([])   
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [message,setMessage] = useState(null)

  function newNameChangeHandler(event) {
    setNewName(event.target.value)
  }

  function newNumberChangeHandler(event) {
    setNewNumber(event.target.value)
  }

  function filterTextChangeHandler(event) {
    setFilterText(event.target.value)
  }

  function filterPersons() {
    return persons.filter((person)=>{
      return person.name.toLowerCase().includes(filterText.toLowerCase())
    }
    )
  }

  function addButtonHandler(event) {
    event.preventDefault()
    const existingPerson = persons.find(person=>person.name===newName)
    if(existingPerson!==undefined) {
      const confirmed = window.confirm(`${newName} is already added to phonebook. Replace the old number with the new one?`)
      if(confirmed) {
        const changedPerson = {...existingPerson,number:newNumber}
        db.updatePerson(changedPerson).then(response=>{
          setPersons(persons.map(person=>person.id===changedPerson.id ? response.data : person))
          showMessage(setMessage,`Updated person: ${response.data.name}`)
        })
      }
    } else {
      const person = {
        name: newName,
        number:newNumber,
        id: persons.length+1
      }
      db.createPerson(person).then(respdata=>{
          setPersons(persons.concat(respdata))
          showMessage(setMessage,`Added person: ${respdata.name}`)
      })

    }
    setNewName('')
    setNewNumber('')
  }
  useEffect(()=>{
    const data = db.getAllPersons()
    data.then((data)=>{
      setPersons(data)
    })
  },[])


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <FilterInput filterText={filterText} filterTextChangeHandler={filterTextChangeHandler}/>
      <form>
        <h2>add a new</h2>
        <div>
          name: <input value={newName} onChange={newNameChangeHandler}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={newNumberChangeHandler}/>          
        </div>
        <div>
          <button type="submit" onClick={addButtonHandler}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <Persons filtered={filterPersons()} persons={persons} setPersons={setPersons} setMessage={setMessage}/>
    </div>
  )
}

export default App