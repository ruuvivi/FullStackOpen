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
    };

    if (persons.some(existing => existing.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName('')
      setNewNumber('');
    } else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('');
        console.log('new person',personObject)
      })
    }
  };

  const personsToShow = showFound
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(showFound.toLowerCase())
      )
    : persons;

    const deletePerson = id => {
      const person = persons.find(p => p.id === id)
      const deletedPerson = { ... person}
      if (window.confirm(`Delete ${deletedPerson.name}?`)) {
        personService
          .remove(id)
          .then(() => {
            setPersons(persons.filter(p => p.id !== id))
          })
          .catch(error => {
            console.log(error)
            alert(`the person '${deletedPerson.name}' was already deleted from server`)
            setPersons(persons.filter(p => p.id !== id))
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