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
      }
    ]
  }

  return (
    <div>
     <Course course={course} />
  </div> 
  )
}

const Course = (props) => {
  console.log('Course props value is', props)
  return (
      <h1>
        {course.map(note => 
          <Note key={course.name} note={note} />
        )}
      </h1>
  )
}

export default App