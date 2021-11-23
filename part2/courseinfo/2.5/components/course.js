import React from 'react'

const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  const Total = ({ course }) => {
    let sum = course.parts.reduce((sumSoFar,currentPart)=>sumSoFar+currentPart.exercises,0)
    return(
      <p><b>total of {sum} exercises</b></p>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({course}) => {
    const {parts} = course
    return(
        parts.map(part=>{
          return (
            <Part part={part} key={part.id} />
          )
        })
    )
  }
  
  const Course = ({course}) => {
    return(
      <div>
        <Header course={course} />
  
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }

  export default Course