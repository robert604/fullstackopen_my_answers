import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  let sum = 0;
  course.parts.forEach(part=>{sum+=part.exercises})
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

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },

    ]
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))