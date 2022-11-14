import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const clear = (event) => {
        setValue("")
    }

    return {
        type,
        value,
        onChange,
        clear
    }
}

const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    axios.get(baseUrl)
        .then(response => setResources(response.data))


    const create = (resource) => {
        axios
            .post(baseUrl, resource)
    }

    const service = {
        create
    }

    return [
        resources, service
    ]
}

const App = () => {
    const content = useField('text')
    const name = useField('text')
    const number = useField('text')

    const [notes, noteService] = useResource('http://localhost:3005/notes')
    const [persons, personService] = useResource('http://localhost:3005/persons')

    const handleNoteSubmit = (event) => {
        event.preventDefault()
        noteService.create({ content: content.value })
        content.clear()
    }

    const handlePersonSubmit = (event) => {
        event.preventDefault()
        personService.create({ name: name.value, number: number.value })
        name.clear()
        number.clear()
    }

    return (
        <div>
            <h2>notes</h2>
            <form onSubmit={handleNoteSubmit}>
                <input {...content} clear={null}/>
                <button>create</button>
            </form>
            {notes.map(n => <p key={n.id}>{n.content}</p>)}

            <h2>persons</h2>
            <form onSubmit={handlePersonSubmit}>
                name <input {...name} clear={null}/> <br />
                number <input {...number} clear={null}/>
                <button>create</button>
            </form>
            {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
        </div>
    )
}

export default App