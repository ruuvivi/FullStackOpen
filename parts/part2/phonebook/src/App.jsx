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
    { name: '', number: '', id: ''}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showFound, setShowFound] = useState(true)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
      findName: showFound
    }

    if (persons.find(existing => existing.name === newName)) {
      alert(newName + ' is already added to phonebook')
      setNewName('')
      setNewNumber('')
      setShowFound('')
    }
    else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      setShowFound('')
      console.log('button clicked', event.target)
  
    }
  }

  const foundNamestoShow = showFound
  ? persons
  : persons.filter(found => found.name.toLowerCase().includes(showFound.toLowerCase()))

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
        {showFound ? foundNamestoShow : persons.map((person, index) => <Person key={index} name={person.name} number={person.number}/>) }
        </div>
    </div>
  )
}

export default App