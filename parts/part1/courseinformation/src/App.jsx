const Header = (props) => {
  console.log(props)
  return (
      <h1>
        {props.course}
      </h1>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      {props.parts.map((part, index) => (
        <p key={index}>
          {part.name} {part.exercises}
        </p>
      ))}
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  const total = props.total.reduce((total, part) => total + part.exercises, 0) // 0 = initial value for accumulator total
  return (
      <p>
        Total number of exercises {total}
      </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  return (
    
    <div>
      <Header course  ={course.name} />
      <Content parts = {course.parts} />
      <Total total = {course.parts} />
    </div>
  )

}

export default App
