import { useState } from 'react'

const Person = ({ name, number }) => {
  return (
    <p>
      {name} {number}
    </p>
  )
}

const Filter = ({showFound, persons}) => {
  const foundPersonstoShow = showFound
  ? persons.filter(found => found.name.toLowerCase().includes(showFound.toLowerCase()))
  : persons
  return (
    <>
      {foundPersonstoShow.map((person) => (
        <Person key={person.id} name={person.name} number={person.number} />
      ))}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showFound, setShowFound] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    if (persons.find(existing => existing.name === newName) && !foundPersonstoShow) {
      alert(newName + ' is already added to phonebook')
    }
    else {
      setPersons(persons.concat(personObject))
  
    }
    console.log('button clicked', event.target)
    setNewName('')
    setNewNumber('')
    setShowFound('')
  }

  const handleNameChange = (event) => {
    console.log('newName', event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log('newNumber', event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFoundChange = (event) => {
    console.log('showfound', event.target.value)
    setShowFound(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson} >
      <div>filter shown with
          <input
          value={showFound}
          onChange={handleFoundChange}
          />
          </div>
      <h3>
        Add a new
      </h3>
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
        <div>debug: {newName} {newNumber}</div>
        <h2>Numbers</h2>
        <div>
          <Filter showFound={showFound} persons={persons}/>
        </div>
    </div>
  )
}

export default App