import React, { useState } from 'react'

function makeState(name,val,feedbackGiven) {
  return {
    name: name,
    val: val,
    feedbackGiven: feedbackGiven
  }
}

const FeedbackButton = ({state,setter}) => {
  return(
    <button onClick = {() => {
      setter(makeState(state.name,state.val+1,true))     
    }}>
      {state.name}
    </button>
  ) 
}

const DispState = ({state}) => {
  return(
    <div>
      {state.name} {state.val}
    </div>
  )
}

const All = ({stateArray}) => {
  let total = 0;
  stateArray.forEach((state)=>total+=state.val)
  return(
    <div>
      all {total}
    </div>
  )
}

const Average = ({stateArray}) => {
  let total=0,sum=0;
  stateArray.forEach(({name,val}) => {
    if(name==="good") sum+=val
    else if(name==="bad") sum-=val
    total+=val
  })
  const average = sum/total
  return(
    <div>
      average {average}
    </div>
  )
}

const Positive = ({stateArray}) => {
  let total=0,sum=0;
  stateArray.forEach(({name,val}) => {
    if(name==="good") sum+=val
    total+=val
  })
  const pos = sum/total
  return(
    <div>
      positive {pos*100} %
    </div>
  )
}

function gotFeedback(stateArray) {
  for(const {feedbackGiven} of stateArray) {
    if(feedbackGiven) return true
  }
  return false
}

const Statistics = ({stateArray}) => {
  return (
    <div>
      <All stateArray={stateArray} />
      <Average stateArray={stateArray} />
      <Positive stateArray={stateArray} />  
    </div>
  )
}

const App = () => {
  console.log("starting app")
  // save clicks of each button to its own state
  const [good, setGood] = useState(makeState("good",0,false))
  const [neutral, setNeutral] = useState(makeState("neutral",0,false))
  const [bad, setBad] = useState(makeState("bad",0,false))
  const stateArray = [good,neutral,bad]
  const gotit = gotFeedback(stateArray)
  const stats = gotit ? 
    (<div>
    <DispState state={good} />
    <DispState state={neutral} />
    <DispState state={bad} />
    <Statistics stateArray={stateArray} />
    </div>) :
    (<div>
          No feedback given
    </div>)
  return (

    <div>
      <h1>give feedback</h1>
      <FeedbackButton state={good} setter={setGood} />
      <FeedbackButton state={neutral} setter={setNeutral}/>
      <FeedbackButton state={bad} setter={setBad}/>
      <h1>statistics</h1>
      {stats}
    </div>
  )
}

export default App