import React from 'react';

const Course = ({courses}) => {
  console.log('Course props value is', courses)
  const header = 'Web development curriculum'
  return (
    <div>
      <Header header ={header} />
      {courses.map(course => (
        <div key={course.id}>
          <SubHeader name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </div>
  );
}

const Header = ({header}) => {
  console.log('Header props value is', header)
      return (
      <h1>
        {header}
      </h1>
  )
}

const SubHeader = ({name}) => {
  console.log('Header props value is', name)
      return (
      <h2>
        {name}
      </h2>
  )
}

const Content = ({parts}) => {
  console.log('Content props value is', parts)
  return (
      <div>
        {parts.map(part => (
          < Part key={part.id} name={part.name} exercises={part.exercises} />
        ))}
      </div>
    )
}

const Part = ({name, exercises}) => {
  console.log('Part props value is', name, exercises)
  return (
      <p>
        {name} {exercises}
      </p>
    )
}

const Total = ({parts}) => {
  console.log('Total props value is', parts)
  const total = parts.reduce((s, p) => s + p.exercises, 0)
  return (
      <p>
        <strong>total of {total} exercises</strong>
      </p>
  )
}

export default Course;