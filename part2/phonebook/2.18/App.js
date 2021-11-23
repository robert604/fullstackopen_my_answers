import React, { useState, useEffect } from 'react'
import db from "./services/phonebook_service"

const Person = ({person,persons,setPersons}) => {
  const deleteHandler = (event)=>{
    const confirmation = window.confirm(`Confirm deletion of ${person.name}`) 
    if(confirmation) {   
      db.deletePerson(person.id).then(response=>{
        setPersons(persons.filter(p=>p.id!==person.id))
      })
    }
  }
  return(
    <div>
      {person.name} {person.number} <button onClick={deleteHandler}>delete</button>
    </div>
  )
}

const Persons = ({filtered,persons,setPersons}) => {
  return(
    filtered.map(person=>{
      return(
        <Person person={person} persons={persons} setPersons={setPersons} key={person.id}/>
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

const App = () => {
  const [ persons, setPersons ] = useState([])   
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

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
        <Persons filtered={filterPersons()} persons={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App