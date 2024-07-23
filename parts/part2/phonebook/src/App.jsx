import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showFound, setShowFound] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    if (persons.some((existing) => existing.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObject));
    }
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('');
        console.log('new person',personObject)
      })
  };

  const personsToShow = showFound
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(showFound.toLowerCase())
      )
    : persons;

  const deletePerson = (id) => {
    const url = `http://localhost:3001/persons/${id}`
    const person = persons.find(p => p.id === id)
    const deletedPerson = { ...person, name: !person.name }
    if (window.confirm(`Delete ${person.name}?`)) {
      axios.delete(url, deletedPerson).then(response => {
        setPersons(persons.map(p => p.id !== id ? p : response.data))
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFoundChange = (event) => {
    setShowFound(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter showFound={showFound} handleFoundChange={handleFoundChange} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
      personsToShow={personsToShow}
      deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;