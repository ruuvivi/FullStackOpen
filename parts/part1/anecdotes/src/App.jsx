import { useState } from 'react';

const Button = (props) => { 
  console.log('Button props value is', props)
  const { handleClick, text } = props;
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Header = (props) => {
  console.log('Header props value is', props)
  return (
      <h1>
        {props.header}
      </h1>
  )
}

const Points = props => {
  console.log('Points props value is', props)
  const {value} = props;
  return (
    <p>
      has {value} votes
    </p>
  )
}

const Anecdotes = (props) => {
  console.log('Anecdotes props value is', props)  
  const { mostVoted, maxPoints } = props;

  if (maxPoints == 0) {
    return(
    <p>
      No votes given
      </p>
    )
  }
  return (
    <div>
      <p>
        {mostVoted}
      </p>
      <p>
        has {maxPoints} votes
      </p>
    </div>
  )
}

const App = () => {
  const [selected, setSelected] = useState(0)

  const header1 = 'Anecdote of the day'
  const header2 = 'Anecdote with most votes'

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]   

  const [points, setPoints] = useState(Array(anecdotes.length).fill(0)) // an element for each anecdote, each initialized to value 0
  const maxPoints = Math.max(...points)
  const mostVoted = anecdotes[points.indexOf(maxPoints)]

  const handleanecdoteClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handlepointsClick = () => {
    const pointscopy =  [...points]
    pointscopy[selected] += 1
    setPoints(pointscopy)
  }

  return (
    <div>
      <Header header ={header1} />
      {anecdotes[selected]}
      <Points value = {points[selected]}/>
        <p>
          <Button handleClick={handlepointsClick} text="vote" />
          <Button handleClick={handleanecdoteClick} text="next anecdote" />
        </p>
      <Header header ={header2} />
      <Anecdotes mostVoted={mostVoted} maxPoints={maxPoints}/>
    </div>
  );
};

export default App;