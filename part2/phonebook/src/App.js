import { useState } from 'react'
import Person from './components/Person'

const App = () => {

    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState(' ')
    const [newNumber, setNewNumber] = useState(' ')

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
        console.log(`Name: ${event.target.value}`)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log(`Number: ${event.target.value}`);
        setNewNumber(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addNumber}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange}/>
                </div>
                <button type='submit'>save</button>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map(person => <Person key={person.name} person={person} />)}
            </ul>
        </div>

    )
}

export default App