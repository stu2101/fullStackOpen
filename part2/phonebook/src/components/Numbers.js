// COMPONENT CURRENTLY NOT IS USE
import React from 'react'
import Person from './Person'

const Numbers = ({ persons, filter, onClick}) => {
    return (
        <ul>
            {persons
                .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
                .map(person => <Person key={person.name} person={person} onClick={onClick}/>)}
        </ul>
    )
}

export default Numbers