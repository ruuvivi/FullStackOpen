import React from 'react';

const Course = (props) => {
  const {course} = props
  console.log('Course props value is', props)
  return (
    <div>
      <Header courseName = {course.name} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>
  )
}

const Header = (props) => {
  console.log('Header props value is', props)
  const {courseName} = props
      return (
      <h1>
        {courseName}
      </h1>
  )
}

const Content = (props) => {
  console.log('Content props value is', props)
  const {parts} = props
  return (
      <div>
        {parts.map(part => (
          < Part key = {part.id} name = {part.name} exercise = {part.exercises} />
        ))}
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
  const {parts} = props
  const total = parts.reduce((s, p) => s + p.exercises, 0)
  return (
      <p>
        <strong>total of {total} exercises</strong>
      </p>
  )
}

export default Course;