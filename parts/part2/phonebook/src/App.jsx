import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newName
    }
    setNewName('')
    console.log('button clicked', event.target)
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name:
        </div>
        <input value={newName}
        onChange={handleNoteChange}
        />
        <div>
          <button type="submit">add</button> 
          <>input value = {newName}</>
        </div>
      </form>
      <div>debug: {newName}</div>
      <h2>Numbers</h2>
      ...
    </div>
  )
}

export default App