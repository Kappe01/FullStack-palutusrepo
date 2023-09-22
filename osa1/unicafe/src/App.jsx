import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incgood = () => setGood(good + 1)
  const incneutral = () => setNeutral(neutral + 1)
  const incbad = () => setBad(bad + 1)
  console.log(good, bad, neutral)

  return (
    <div>
    <div>
      <h1>
        give feedback
      </h1>
    </div>
    <div>
      <Button handleClick={incgood} text='Good' />
      <Button handleClick={incneutral} text='Neutral' />
      <Button handleClick={incbad} text='Bad' />
    </div>
    <div>
      <h1>
        statistics
      </h1>
    </div>
    <div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
    </div>
  )
}

const Statistics = (props) => {
  if (props.bad + props.good + props.neutral === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <StatisticLine text="good" value={props.good} text2=''/>
      <StatisticLine text='neutral' value={props.neutral} text2=''/>
      <StatisticLine text='bad' value={props.bad} text2=''/>
      <StatisticLine text='all' value={props.good+props.neutral+props.bad} text2=''/>
      <StatisticLine text='average' value={(((props.good*1)+(props.bad*-1))/(props.good+props.bad+props.neutral))} text2=''/>
      <StatisticLine text='positive' value={(props.good/(props.good+props.bad+props.neutral))*100} text2='%'/>
    </div>
  )
}

const StatisticLine = (props) => {
  return (
      <tr>
        <td>
          {props.text} 
        </td>
        <td>
          {props.value} {props.text2}
        </td>
      </tr>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

export default App