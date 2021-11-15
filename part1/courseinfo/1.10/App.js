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

const StatisticLine = ({text,value}) => {
  return(
    <div>
      {text} {value}
    </div>
  )
}

function all(stateArray) {
  let total = 0;
  stateArray.forEach((state)=>total+=state.val)
  return total
}

function average(stateArray) {
  let total=0,sum=0;
  stateArray.forEach(({name,val}) => {
    if(name==="good") sum+=val
    else if(name==="bad") sum-=val
    total+=val
  })
  const average = sum/total
  return average
}

function positive(stateArray) {
  let total=0,sum=0;
  stateArray.forEach(({name,val}) => {
    if(name==="good") sum+=val
    total+=val
  })
  let pos = sum/total
  pos = (pos*100) + " %"
  return pos
}

function gotFeedback(stateArray) {
  for(const {feedbackGiven} of stateArray) {
    if(feedbackGiven) return true
  }
  return false
}

const Statistics = ({states,stateArray}) => {
  const {good,neutral,bad} = states
  const gotit = gotFeedback(stateArray)
  if(gotit) return (
    <div>
      <StatisticLine text="good" value={good.val} />
      <StatisticLine text="neutral" value={neutral.val} />
      <StatisticLine text="bad" value={bad.val} />            
      <StatisticLine text="all" value={all(stateArray)} /> 
      <StatisticLine text="average" value={average(stateArray)} />
      <StatisticLine text="positive" value={positive(stateArray)} />      
    </div>
  );
  else return (
    <div>
      No feedback given
    </div>    
  ) 
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(makeState("good",0,false))
  const [neutral, setNeutral] = useState(makeState("neutral",0,false))
  const [bad, setBad] = useState(makeState("bad",0,false))
  const stateArray = [good,neutral,bad]
  const states = {good:good,neutral:neutral,bad:bad}

  return (

    <div>
      <h1>give feedback</h1>
      <FeedbackButton state={good} setter={setGood} />
      <FeedbackButton state={neutral} setter={setNeutral}/>
      <FeedbackButton state={bad} setter={setBad}/>
      <h1>statistics</h1>
      <Statistics states={states} stateArray={stateArray} />
    </div>
  )
}

export default App