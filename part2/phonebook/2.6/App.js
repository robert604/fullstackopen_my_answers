import React, { useState } from 'react'

const Person = ({person}) => {
  return(
    <div>{person.name}</div>
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
    { name: 'Arto Hellas' ,id:1}
  ]) 
  const [ newName, setNewName ] = useState('')

  function inputChangeHandler(event) {
    setNewName(event.target.value)
  }
  function addButtonHandler(event) {
    event.preventDefault()
    const person = {
      name: newName,
      id: persons.length+1
    }
    setPersons(persons.concat(person))
    setNewName('')
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={inputChangeHandler}/>
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