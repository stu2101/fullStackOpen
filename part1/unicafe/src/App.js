import { useState } from 'react'

const Button = (props) => {
    return (
        <button onClick={props.onClick}>
            {props.text}
        </button>
    )
}

const Statistics = (props) => {
    const {good, bad, neutral} = props;
    const all = good + bad + neutral;
    if (all === 0) {
        return (
            <p>No feedback given</p>
        )
    }
    return(
        <div>
            <h2>statistics</h2>
            <table>
                <StatisticLine text="good" value={good}/>
                <StatisticLine text="neutral" value={neutral}/>
                <StatisticLine text="bad" value={bad}/>
                <StatisticLine text="all" value={all}/>
                <StatisticLine text="average" value={(good - bad) / all}/>
                <StatisticLine text="positive" value={(good / all)*100 + "%"} /> 
            </table>                    
        </div>
    )
}

const StatisticLine = (props) => {
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    )
}

const App = () => {

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={() => setGood(good + 1)} text='good'/>
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button onClick={() => setBad(bad + 1)} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App