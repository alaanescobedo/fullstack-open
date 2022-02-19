import { useState } from 'react'

// Text Data
const labelOptions = {
  giveFeedback: 'give feedback',
  statistics: 'statistics',
  noFeedback: 'no feedback given'
}

// Components
const Title = ({ label }) => <h2>{label}</h2>

const FeedbackButton = ({ label, handleClick }) => (
  <button onClick={handleClick}>{label}</button>
)

const FeedbackButtonsGroup = ({
  handleClickGood,
  handleClickNeutral,
  handleClickBad
}) => (
  <>
    <FeedbackButton
      label='good'
      handleClick={handleClickGood}
    />
    <FeedbackButton
      label='neutral'
      handleClick={handleClickNeutral}
    />
    <FeedbackButton
      label='bad'
      handleClick={handleClickBad}
    />
  </>)

const StatisticLine = ({ label, statisticValue }) => (
  <tr>
    <td>{label}:</td>
    <td>{statisticValue}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad, allVotes }) => {
  const average = allVotes
    ? parseFloat(((good - bad) / allVotes).toFixed(3))
    : 0
  const positive = allVotes
    ? `${parseFloat(((good * 100) / allVotes).toFixed(3))} %`
    : '0 %'

  return (
    <table>
      <tbody>
        <StatisticLine label='good' statisticValue={good} />
        <StatisticLine label='neutral' statisticValue={neutral} />
        <StatisticLine label='bad' statisticValue={bad} />
        <StatisticLine label='all' statisticValue={allVotes} />
        <StatisticLine label='average' statisticValue={average} />
        <StatisticLine label='positive' statisticValue={positive} />
      </tbody>
    </table>
  )
}

// Main Component
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const allVotes = good + neutral + bad

  const handleVoteGood = () => setGood(prevVal => prevVal + 1)
  const handleVoteNeutral = () => setNeutral(prevVal => prevVal + 1)
  const handleVoteBad = () => setBad(prevVal => prevVal + 1)

  return (
    <div>
      <Title label={labelOptions.giveFeedback} />
      <FeedbackButtonsGroup
        handleClickGood={handleVoteGood}
        handleClickNeutral={handleVoteNeutral}
        handleClickBad={handleVoteBad}
      />

      <Title label={labelOptions.statistics} />
      {allVotes > 0
        ? <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            allVotes={allVotes}
          />
        : <p>{labelOptions.noFeedback}</p>}
    </div>
  )
}

export default App
