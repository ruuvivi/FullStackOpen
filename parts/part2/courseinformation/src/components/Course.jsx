import React from 'react';

const Course = (props) => {
  console.log('Course props value is', props)
  return (
    <div>
      <Header courseName = {props.course.name} />
      <Content parts = {props.course.parts} />
    </div>
  )
}

const Header = (props) => {
  console.log('Header props value is', props)
      return (
      <h1>
        {props.courseName}
      </h1>
  )
}

const Content = (props) => {
  console.log('Content props value is', props)
  return (
      <div>
        {props.parts.map(part => (
          < Part key = {part.id} name = {part.name} exercise = {part.exercises} />
        ))}
        < Total total = {props.parts} />
      </div>
    )
}

const Part = (props) => {
  console.log('Part props value is', props)
  const {name, exercise} = props
  return (
      <p>
        {name} {exercise}
      </p>
    )
}

const Total = (props) => {
  console.log('Total props value is', props)
  const total = props.total.reduce((total, part) => total + part.exercises, 0)
  return (
      <p>
        total of {total} exercises
      </p>
  )
}

export default Course;