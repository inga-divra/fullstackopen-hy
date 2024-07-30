import { useState } from 'react'
import Title from './Title'
import Button from './Button'
import Subtitle from './Subtitle'
import StatisticLine from './StatisticLine'

const Statistics = (props) => {
  const { good, neutral, bad, allPoints, averagePoints, positiveAvr } = props;
  return <>
    {good || neutral || bad ? (
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={allPoints} />
          <StatisticLine text='average' value={averagePoints.toFixed(1)} />
          <StatisticLine text='positive' value={`${positiveAvr.toFixed(1)} %`} />
        </tbody>
      </table>
    ) : <h3>No feedback given</h3>}
  </>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const updateGood = () => {
    setGood(good + 1)
  }

  const updateNeutral = () => {
    setNeutral(neutral + 1)
  }
  const updateBad = () => {
    setBad(bad + 1)
  }

  //statistic`s variables

  const allPoints = good + neutral + bad
  const averagePoints = allPoints ? (good - bad) / allPoints : 0
  const positiveAvr = allPoints > 0 ? (good / allPoints) * 100 : 0

  return (
    <div>
      <Title />
      <Button handleClick={() => updateGood()} text='Good' />
      <Button handleClick={() => updateNeutral()} text='Neutral' />
      <Button handleClick={() => updateBad()} text='Bad' />
      <Subtitle />
      <Statistics good={good}
        neutral={neutral}
        bad={bad}
        allPoints={allPoints}
        averagePoints={averagePoints}
        positiveAvr={positiveAvr} />
    </div>
  )
}

export default App