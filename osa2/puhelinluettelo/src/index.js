import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from 'axios'

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
  console.log(props.persons)
  const filteredPersons = props.persons.filter(x => x.name.toLowerCase().includes(props.search.toLowerCase()))
  const personsList = filteredPersons.map(x => <li key={x.name}>{x.name} {x.number}</li>)
  return (
    <>
      <ul>
        {personsList}
      </ul>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "040-123456" }]);
  const [search, setSearch] = useState("")
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("")

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => {
      setPersons(response.data)
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
    if (persons.filter(e => e.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat({ name: newName, number: newNumber }));
    axios.post("http://localhost:3001/persons").then(response => console.log(response))
    setNewName("")
    setNewNumber("");
  }




  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} handle={handleSearch}></Filter>
      <h2>Add new number:</h2>
      <PersonForm number={newNumber} handleNumber={handleNumberChange} handleName={handleChange} handleForm={handleSubmit} name={newName}></PersonForm>
      <h2>Numbers</h2>
      <PersonList search={search} persons={persons} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
