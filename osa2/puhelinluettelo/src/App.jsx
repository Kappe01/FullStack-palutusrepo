import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import axios from 'axios'
import { useState, useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [successMessage, setSuccessmessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const sendData = (object) => {
    axios
      .post('http://localhost:3001/persons', object)
      .then((response => {
        setPersons(persons.concat(response.data))
        setSuccessmessage(
          `Added ${object.name} number to phonebook`
        )
        setTimeout(() => {
          setSuccessmessage(null)
        }, 3000)
      }))
  }

  const updateNumber = (id, updatedata) => {
    axios
      .put(`http://localhost:3001/persons/${id}`, updatedata)
      .then((response => {
        const updatedIndex = persons.findIndex((person) => person.id === id)

        const updatedPersons = [...persons]

        updatedPersons[updatedIndex] = response.data

        setPersons(updatedPersons)

        setSuccessmessage(
          `Updated ${updatedata.name} number to ${updatedata.number}`
        )
        setTimeout(() => {
          setSuccessmessage(null)
        }, 3000)
      }))
      .catch(error => {
        setErrorMessage(
          `Information of ${updatedata.name} has already been removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        },3000)
      })
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  const del = (person, id) => {
    if (window.confirm(`Delete ${person.name}`)) {
        axios
            .delete(`http://localhost:3001/persons/${id}`)
            .then(() => {
                axios
                    .get('http://localhost:3001/persons')
                    .then(response => 
                        setPersons(response.data))

            setSuccessmessage(
                `Deleted ${person.name} from phonebook`
                )
            setTimeout(() => {
            setSuccessmessage(null)
            }, 3000)
            })    
    }
}

  const addName = (event) => {
    event.preventDefault()
    axios.get('http://localhost:3001/persons')
      .then((response) => {
      const persons = response.data;
    
      const findName = persons.find((person) => person.name === newName);
      if (findName) {
      if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)){
        const updatedata = {
          name: newName,
          number: newNumber,
        }
        const id = findName.id;
        updateNumber(id, updatedata)
        }      
      }
      else {
        const nameObject = {
          name: newName,
          number: newNumber,
        }
        sendData(nameObject)
        }
        setNewName('')
        setNewNumber('')
        })
      }
      
    

  const namesToShow = persons.filter((person) =>
  person.name.toLowerCase().includes(filterName.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <ErrorMessage message={errorMessage} />
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addName={addName} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={namesToShow} del={del}/>
      
    </div>
  )

}

export default App