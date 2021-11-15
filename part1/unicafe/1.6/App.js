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

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodState = makeStateObj("good",good,setGood)
  const neutralState = makeStateObj("neutral",neutral,setNeutral)
  const badState = makeStateObj("bad",bad,setBad)

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
    </div>
  )
}

export default App