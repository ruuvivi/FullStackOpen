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
    <div>
      <h1>
        {props.header}
      </h1>
    </div>
  )
}

const SubHeader = (props) => {
  console.log('Subheder props value is', props)
  return (
    <div>
      <h2>
        {props.subheader}
      </h2>
    </div>
  )
}

const StatisticLine = (props) => { 
  console.log('Statisticline props value is', props)
  const { text, value } = props;
  return (
    <div>
      {text} {value}
    </div>
  )
}

const Statistics = (props) => {
  console.log('Statistics props value is', props)  
  const {good, neutral, bad, allStats, StatisticLine} = props;

  if (allStats == 0) {
    return(
    <div>
      No feedback given
      </div>
    )
  }

  const total = good + neutral + bad;
  const average = total === 0 ? 0 : (good - bad) / total;
  const positive = total === 0 ? 0 : (good * 100) / total;
  
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td> 
              <StatisticLine text="good" />
            </td>
            <td>
              {good}
            </td>
          </tr>
          <tr>
            <td> 
              <StatisticLine text="neutral" />
            </td>
            <td>
              {neutral}
            </td>
          </tr>
          <tr>
            <td> 
              <StatisticLine text="bad" />
            </td>
            <td>
              {bad}
            </td>
          </tr>
          <tr>
            <td> 
              <StatisticLine text="total" />
            </td>
            <td>
              {total}
            </td>
          </tr>
          <tr>
            <td> 
              <StatisticLine text="average" />
            </td>
            <td>
              {average}
            </td>
          </tr>
          <tr>
            <td> 
              <StatisticLine text="positive" />
            </td>
            <td>
              {positive + ' %'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const Points = props => {
  console.log('Points props value is', props)
  const {value} = props;
  return (
    <div>
      has {value} votes
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allStats, setStats] = useState([])
  const [selected, setSelected] = useState(0)
  const header = 'give feedback'
  
  const subheader = 'statistics'

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

  const handlegoodClick = () => {
    setStats(allStats.concat('good'))
    const updatedGood = good + 1
    setGood(updatedGood)
  };

  const handleneutralClick = () => {
    setStats(allStats.concat('neutral'))
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  };

  const handlebadClick = () => {
    setStats(allStats.concat('bad'))
    const updatedBad = bad + 1
    setBad(updatedBad)   
  };

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
      <Header header ={header} />
      <Button handleClick={handlegoodClick} text="good" />
      <Button handleClick={handleneutralClick} text="neutral" />
      <Button handleClick={handlebadClick} text="bad" />
      <SubHeader subheader ={subheader} />
      <Statistics good={good} neutral={neutral} bad={bad} allStats={allStats} StatisticLine={StatisticLine} />
      {anecdotes[selected]}
      <Points handlepointsClick={handlepointsClick} value = {points[selected]}/>
        <p>
          <Button handleClick={handlepointsClick} text="vote" />
          <Button handleClick={handleanecdoteClick} text="next anecdote" />
        </p>
    </div>
  );
};

export default App;