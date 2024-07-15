import { useState } from 'react'

const Person = ({ name, number }) => {
  return (
    <p>
      {name} {number}
    </p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.find(existing => existing.name === newName)) {
      alert(newName + ' is already added to phonebook')
      setNewName('')
      setNewNumber('')
    }
    else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      console.log('button clicked', event.target)
  
    }
  }

  const handleNameChange = (event) => {
    console.log('event target value', event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log('event target value', event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson} >
        <div>name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
          </div>
        <div>number:
        <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
        <div>debug: {newName}</div>
        <h2>Numbers</h2>
        <div>
          {persons.map((person, index) =>
            <Person key={index} name={person.name} number={person.number} />
          )}
        </div>
    </div>
  )
}

export default App