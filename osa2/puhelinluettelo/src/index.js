import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from 'axios'
import personService from './services/persons'
import "./index.css"

const Filter = (props) => {
  return (
    <div>
      filter shown with <input value={props.value} onChange={props.handle}></input>
    </div>)
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleForm}>
      <div>
        name: <input value={props.name} onChange={props.handleName} />
      </div>
      <div>
        number: <input value={props.number} onChange={props.handleNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const PersonList = (props) => {

  const deleteNumber = (id, name) => {
    return (() => {
      if(window.confirm(`Delete ${name}?`)) {
        props.delHandler(id)
      }
    });
  }

  console.log(props.persons)
  const filteredPersons = props.persons.filter(x => x.name.toLowerCase().includes(props.search.toLowerCase()))
  const personsList = filteredPersons.map(x => <li key={x.id}>{x.name} {x.number} <button onClick={deleteNumber(x.id, x.name)}>DELETE</button></li>)
  return (
    <>
      <ul>
        {personsList}
      </ul>
    </>
  )
}

const SuccessNotification = ({ message }) => {
  if(message === null) {
    return null
  }

  return (
    <div className="success-notification">
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if(message === null) {
    return null
  }

  return (
    <div className="error-notification">
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "040-123456", id: '1' }]);
  const [search, setSearch] = useState("")
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("")
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response)
    })
  }, [])

  const handleChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const filterTest = persons.filter(p => p.name === newName)
    if (filterTest.length === 1) {
      if(window.confirm(`${newName} is already added to the phonebook, replace number?`)) {
        const newPerson = {...filterTest[0], number: newNumber}
        personService.update(filterTest[0].id, newPerson).then(
          (data) => {
            setPersons(persons.map(person => person.id === filterTest[0].id ? data : person))
            successNotify(`Changed ${newName}'s number`)
          }
        ).catch(error =>
          {
            errorNotify(`Person ${newName} was already deleted from the server`)
        })
        
        setNewName("")
        setNewNumber("");
      }
    
      
      return;
    }

    personService.create({name: newName, number: newNumber}).then(response => setPersons(persons.concat(response)))
    successNotify(`Added ${newName}`)
    setNewName("")
    setNewNumber("");

  }

  const errorNotify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000)
  }
  

  const successNotify = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const removePerson = (id) => {
    personService.remove(id).then(response => console.log(response))
    successNotify(`Removed ${persons.find(element => element.id == id).name}`)
    setPersons(persons.filter(person => person.id !== id))
  }



  return (
    <div>
      <SuccessNotification message={successMessage}/>
      <ErrorNotification message={errorMessage}/>
      <h2>Phonebook</h2>
      <Filter value={search} handle={handleSearch}></Filter>
      <h2>Add new number:</h2>
      <PersonForm number={newNumber} handleNumber={handleNumberChange} handleName={handleChange} handleForm={handleSubmit} name={newName}></PersonForm>
      <h2>Numbers</h2>
      <PersonList search={search} persons={persons} delHandler={removePerson} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
