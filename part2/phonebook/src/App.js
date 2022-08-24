import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Person from './components/Person'
import personsService from './services/persons'
import Message from './components/Message'

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');
    const [messageText, setMessageText] = useState(null)
    const [messageType, setMessageType] = useState('')

    useEffect(() => {
        personsService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons);
            })
    }, [])

    const addNumber = (event) => {
        event.preventDefault();
        const personExists = persons.find(person => person.name.toLowerCase() === newName.toLowerCase()) != undefined
        const numberExists = persons.find(person => person.number === newNumber) != undefined

        if (personExists) {
            const message = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
            if (message) {
                const currentPerson = persons.find(person => person.name === newName)
                const newPerson = { ...currentPerson, number: newNumber }
                personsService
                    .update(currentPerson.id, newPerson)
                    .then(response => {
                        setPersons(persons.map(person => person.name === newPerson.name ? newPerson : person))
                        setNewName('')
                        setNewNumber('')
                        setMessageText(`The number of ${newPerson.name} was changed successfuly`)
                        setTimeout(() => {
                            setMessageText(null)
                        }, 3500)
                    })
                    .catch(error => {
                        setMessageType('error')
                        setMessageText(`Information of ${newPerson.name} has already been removed from serer`)
                        setPersons(persons.filter(person => person.name !== newPerson.name))
                        setTimeout(() => {
                            setMessageText(null)
                            setMessageType('')
                        }, 3500);
                    })
            }
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

        personsService
            .add(personObject)
            .then(person => {
                setPersons(persons.concat(person))
            })

        setMessageText(`Added ${newName}`)
        setTimeout(() => {
            setMessageText(null)
        }, 3500)

        setNewName('')
        setNewNumber('')

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
            <Message message={messageText} type={messageType} />
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
            {persons
                .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
                .map(person => <Person key={person.name} person={person} onClick={() => {
                    const message = window.confirm(`Delete ${person.name} ?`)
                    if (message) {
                        const currentId = person.id
                        personsService.deletePerson(currentId)
                        setPersons(persons.filter(currentPerson => currentPerson.id !== currentId))
                    }
                }} />)}
        </div>
    )
}

export default App