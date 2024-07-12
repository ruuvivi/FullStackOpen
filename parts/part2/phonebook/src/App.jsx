import { useState } from 'react'

const Person = ({ person }) => {
  return (
    <p>{person.name}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName
    }

    if (persons.find(existing => existing.name === newName)) {
      alert(newName + ' is already added to phonebook')
      setNewName('')
    }
    else {
      setPersons(persons.concat(noteObject))
      setNewName('')
      console.log('button clicked', event.target)
  
    }
  }

  const handleNameChange = (event) => {
    console.log('event target value', event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name:
        </div>
        <input
        value={newName}
        onChange={handleNameChange}
        />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>debug: {newName}</div>
      <h2>Numbers</h2>
      <div>
        {persons.map((person, index) =>
          <Person key={index} person={person} />
        )}
      </div>
    </div>
  )
}

export default App