import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import axios from 'axios'
import personsService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('');
    const url = 'http://localhost:3001/persons'


    useEffect(() => {
        personsService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const addNumber = (event) => {
        event.preventDefault();

        // It wasn't a requirement, but I added a same number check, so if the number you entered
        // is already in the phonebook, you get alerted and it doesn't go in the phonebook again.
        // The time of submission in the phonebook is also stored
        const personExists = persons.find(person => person.name.toLowerCase() === newName.toLowerCase()) != undefined
        const numberExists = persons.find(person => person.number === newNumber) != undefined

        if (personExists) {
            alert(newName + " is already in the phonebook")
            setNewName("")
            return;
        }

        if (numberExists) {
            alert(newNumber + " is already in the phonebook")
            setNewNumber("")
            return;
        }

        const personObject = {
            name: newName,
            date: new Date().toISOString(),
            number: newNumber,
            id: persons.length + 1
        }

        // axios
        //     .post(url, personObject)
        //     .then(response => {
        //         setPersons(persons.concat(response.data))
        //     })

        personsService
            .add(personObject)
            .then(person => {
                setPersons(persons.concat(person))
            })

        setNewName("")
        setNewNumber("")
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter onChange={handleFilterChange} />

            <h3>add a new</h3>
            <PersonForm
                onSubmit={addNumber}
                nameValue={newName}
                nameOnChange={handleNameChange}
                numberValue={newNumber}
                numberOnChange={handleNumberChange}
            />

            <h3>Numbers</h3>
            <Numbers persons={persons} filter={filter}/>
        </div>
    )
}

export default App