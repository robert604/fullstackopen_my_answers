import React from 'react';
import ReactDOM from 'react-dom';

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

const Courses = ({courses}) => {
  return(
    courses.map((course)=>{
      return(
        <Course course={course} key={course.id} />
      )
    })
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Courses courses={courses} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))