import { useState } from 'react'
import Person from './components/Person'

const App = () => {

    const [persons, setPersons] = useState([ ])
    const [newName, setNewName] = useState(' ')

    const addNumber = (event) => {
        event.preventDefault();
        console.log('button clicked', event.target);
        
        if (persons.find(person => person.name === newName) != undefined) {
            alert(newName + " is already in the phonebook")
            setNewName(" ")
            return;
        }

        const personObject = {
            name: newName,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
        }
        console.log("personObject is: ", personObject);

        setPersons(persons.concat(personObject));
        setNewName(" ")
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addNumber}>
                <input
                    value={newName}
                    onChange={handleNumberChange}
                />
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