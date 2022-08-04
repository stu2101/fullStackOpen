import { useState } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Numbers from './components/Numbers'

const App = () => {

    // REMOVE DUMMY DATA WHEN DONE
    // REMOVE DUMMY DATA WHEN DONE
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState(' ')
    const [newNumber, setNewNumber] = useState(' ')
    const [filter, setFilter] = useState('');

    const addNumber = (event) => {
        event.preventDefault();

        const personExists = persons.find(person => person.name === newName) != undefined
        const numberExists = persons.find(person => person.number === newNumber) != undefined

        if (personExists) {
            alert(newName + " is already in the phonebook")
            setNewName(" ")
            return;
        }

        if (numberExists) {
            alert(newNumber + " is already in the phonebook")
            setNewNumber(" ")
            return;
        }

        const personObject = {
            name: newName,
            date: new Date().toISOString(),
            number: newNumber,
            id: persons.length + 1
        }
        console.log("personObject is: ", personObject);

        setPersons(persons.concat(personObject));
        setNewName(" ")
        setNewNumber(" ")
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
            <Numbers persons={persons}/>
            <ul>
                {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => <Person key={person.name} person={person} />)}
            </ul>
        </div>

    )
}

export default App