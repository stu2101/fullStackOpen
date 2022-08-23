import React from 'react'

const Person = (props) => {
    return (
        <div>{props.person.name} {props.person.number} <button value={props.person.id} onClick={props.onClick}>delete</button> </div>
    )
}

export default Person