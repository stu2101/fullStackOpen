import React from 'react'
import Person from './Person'

const Numbers = ({ persons, filter }) => {
    return (
        <ul>
            {persons
                .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
                .map(person => <Person key={person.name} person={person} />)}
        </ul>
    )
}

export default Numbers