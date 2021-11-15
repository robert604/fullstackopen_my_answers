import React, { useState } from 'react'

function selectRandom(selected,setSelected,total) {
  const randint = Math.floor(Math.random()*total)
  setSelected(randint)
}

const NextButton = ({selected,setSelected,total}) => {
  return(
    <button onClick={()=>{
        selectRandom(selected,setSelected,total)
      }}>
        next anecdote
    </button>
  )
}
const VoteButton = ({selected,votes,setVotes}) => {
  return(
    <button onClick={()=>{
        const newvotes = [...votes];
        newvotes[selected] += 1
        setVotes(newvotes)
      }
    }>
      vote
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const indexOfMax = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>
        has {votes[selected]} votes
      </div>
      <div>
        <VoteButton selected={selected} votes={votes} setVotes={setVotes} />
        <NextButton selected={selected} setSelected={setSelected} total={anecdotes.length}/>
      </div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[indexOfMax]}
      <div>
        has {votes[indexOfMax]} votes
      </div>
    </div>
  )
}

export default App