import React, { useState } from 'react'

const Person = ({person}) => {
  return(
    <div>{person.name} {person.number}</div>
  )
}
const Persons = ({persons}) => {
  return(
    persons.map(person=>{
      return(
        <Person person={person} key={person.id}/>
      )
    })
  )
}
const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' , number:'040-1234567',id:1}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')

  function newNameChangeHandler(event) {
    setNewName(event.target.value)
  }

  function newNumberChangeHandler(event) {
    setNewNumber(event.target.value)
  }

  function alreadyPresent() {
    return persons.find(person=>person.name===newName)!==undefined
  }

  function addButtonHandler(event) {
    event.preventDefault()
    if(alreadyPresent()) {
      window.alert(`${newName} is already added to phonebook.`)
    } else {
      const person = {
        name: newName,
        number:newNumber,
        id: persons.length+1
      }
      setPersons(persons.concat(person))
    }
    setNewName('')
    setNewNumber('')
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
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
        <Persons persons={persons}/>
    </div>
  )
}

export default App