import { useState } from 'react'

const getRandomInt =(min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Button = (props) => {
    return (
        <button onClick={props.onClick}>
            {props.text}
        </button>
    )
}

const Anecdote = (props) => {
    return (
        <div>
            <h2>{props.title}</h2>
            <p>{props.text}</p>
            <p>has {props.votes} votes</p>
        </div>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
    ]

    const [selected, setSelected] = useState(getRandomInt(0, anecdotes.length - 1))
    let [points, setPoints] = useState(new Uint8Array(anecdotes.length));

    const incrementByOne = (arr, index) => {
        let copy = [...arr];
        copy[index] += 1;
        return copy
    }

    return (
        <div>
            <Anecdote title='Anecdote of the day' text={anecdotes[selected]} votes={points[selected]}/>
            <Button onClick={() => setPoints(incrementByOne(points, selected))} text="vote" />
            <Button onClick={() => setSelected(getRandomInt(0, anecdotes.length - 1))} text="next anecdote"/>
            {console.log(points)}
            <Anecdote title="Anecdote with most votes" text={anecdotes[points.indexOf(Math.max(...points))]} votes={Math.max(...points)}/>
        </div>
    )
}

export default App