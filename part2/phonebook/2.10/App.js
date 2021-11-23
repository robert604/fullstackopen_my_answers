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
const FilterInput = ({filterText,filterTextChangeHandler})=>{
  return(
    <div>
      filter shown with<input value={filterText} onChange={filterTextChangeHandler}/>
    </div>
  )
}
const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' , number:'040-1234567',id:1},
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }

  ]) 
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

  function alreadyPresent() {
    return persons.find(person=>person.name===newName)!==undefined
  }

  function filterPersons() {
    return persons.filter((person)=>{
      return person.name.toLowerCase().includes(filterText.toLowerCase())
    }
    )
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
        <Persons persons={filterPersons()}/>
    </div>
  )
}

export default App