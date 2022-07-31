import { useState } from 'react'

const Button = (props) => {
    return (
        <button>
            {props.text}
        </button>
    )
}

const Display = () => {

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button text='good'/>
      <Button  text='neutral'/>
      <Button  text='bad'/>
    </div>
  )
}

export default App