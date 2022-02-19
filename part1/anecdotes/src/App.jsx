import { useState } from 'react'

// Text Data
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
]
const labelOptions = {
  ofTheDay: 'Anecdote of the day',
  mostVoted: 'Anecdote with most votes',
  vote: 'vote',
  next: 'next anecdote'
}

// Function Handlers
function generateRandomNum () {
  return Math.floor(Math.random() * anecdotes.length)
}

// Initial values
const points = Array(anecdotes.length).fill(0)
const initialValues = [...points]

// Components
const Title = ({ label }) => <h2>{label}</h2>

const Anecdote = ({ label }) => <p>{label}</p>

const AnecdoteVotes = ({ votes }) => <p>- Has {votes} votes</p>

const Button = ({ label, handleClick }) =>
  <button onClick={handleClick}>{label}</button>

// Main Component
const App = () => {
  const [selected, setSelected] = useState(0)
  const [allVotes, setAllVotes] = useState(initialValues)
  const [mostVoted, setMostVoted] = useState({
    anectode: null,
    votes: null
  })

  const handleNextAnecdote = () => setSelected(() => generateRandomNum())

  const handleVote = () => {
    setAllVotes(() => [...allVotes], allVotes[selected] += 1)
    if (allVotes[selected] > mostVoted.votes) {
      setMostVoted(() => ({
        anectode: anecdotes[selected],
        votes: allVotes[selected]
      }))
    }
  }

  return (
    <>
      <Title label={labelOptions.ofTheDay} />
      <Anecdote label={anecdotes[selected]} />
      <AnecdoteVotes votes={allVotes[selected]} />
      <Button label={labelOptions.vote} handleClick={() => handleVote()} />
      <Button label={labelOptions.next} handleClick={() => handleNextAnecdote()} />

      <Title label={labelOptions.mostVoted} />
      {mostVoted.anectode &&
        <>
          <Anecdote label={mostVoted.anectode} />
          <AnecdoteVotes votes={mostVoted.votes} />
        </>}
    </>
  )
}

export default App
