import React, { useState } from 'react'

const makeStateObj = (name,state,setter) => {
  return {
    name: name,
    state: state,
    setter: setter
  }
}
const FeedbackButton = ({stateObj}) => {
  const {name,state,setter} = stateObj
  return(
    <button onClick = {() => {
      setter(state+1)
    }}>
      {name}
    </button>
  ) 
}

const DispState = ({stateObj}) => {
  return(
    <div>
      {stateObj.name} {stateObj.state}
    </div>
  )
}

const All = ({stateObjsArray}) => {
  let total = 0;
  stateObjsArray.forEach(({state})=>total+=state)
  return(
    <div>
      all {total}
    </div>
  )
}

const Average = ({stateObjsArray}) => {
  let total=0,sum=0;
  stateObjsArray.forEach((stateObj) => {
    if(stateObj.name==="good") sum+=stateObj.state
    else if(stateObj.name==="bad") sum-=stateObj.state
    total+=stateObj.state
  })
  const average = sum/total
  return(
    <div>
      average {average}
    </div>
  )
}

const Positive = ({stateObjsArray}) => {
  let total=0,sum=0;
  stateObjsArray.forEach((stateObj) => {
    if(stateObj.name==="good") sum+=stateObj.state
    total+=stateObj.state
  })
  const pos = sum/total
  return(
    <div>
      positive {pos*100} %
    </div>
  )
}

const Statistics = ({stateObjsArray}) => {
  return (
    <div>
      <All stateObjsArray={stateObjsArray} />
      <Average stateObjsArray={stateObjsArray} />
      <Positive stateObjsArray={stateObjsArray} />  
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodState = makeStateObj("good",good,setGood)
  const neutralState = makeStateObj("neutral",neutral,setNeutral)
  const badState = makeStateObj("bad",bad,setBad)
  const stateObjsArray = [goodState,neutralState,badState]
  return (
    <div>
      <h1>give feedback</h1>
      <FeedbackButton stateObj={goodState} />
      <FeedbackButton stateObj={neutralState} />
      <FeedbackButton stateObj={badState} />
      <h1>statistics</h1>
      <DispState stateObj={goodState} />
      <DispState stateObj={neutralState} />
      <DispState stateObj={badState} />
      <Statistics stateObjsArray={stateObjsArray} />    
    </div>
  )
}

export default App