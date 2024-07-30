import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  //uusi taulukko, jossa on yhtä monta paikkaa kuin anekdootteja,
  // kaikki paikat täytety 0-lla  [0, 0, 0, 0, 0, 0, 0, 0]

  const copyAnecdotesArr = Array(anecdotes.length).fill(0)


  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(copyAnecdotesArr)

  const handleVote = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected] += 1
    setVotes(updatedVotes)
  }

  const handleRandomAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNumber)
  }

  //suurin arvo votes-taulukossa
  const maxVotes = Math.max(...votes)

  const maxVotesIndex = votes.indexOf(maxVotes)
  const mostVotedAnecdote = anecdotes[maxVotesIndex]

  return (
    <>
      <div style={{ margin: '30px' }}>
        <h2>Anecdote of the day</h2>
        <div style={{ marginBottom: '15px' }}>
          {anecdotes[selected]}
        </div>
        <button onClick={handleVote} type='button' style={{ marginRight: '10px' }}>Vote</button>
        <button onClick={handleRandomAnecdote} type='button'>Next anecdote</button>
        <h2>Anecdote with most votes</h2>
        <div>
          {mostVotedAnecdote}
          <span style={{ display: 'block' }}>has {maxVotes} votes</span>
        </div>
      </div>
    </>
  )
}

export default App