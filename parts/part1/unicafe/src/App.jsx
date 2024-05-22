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
      {text}: {value}
    </div>
  )
}

const Statistics = (props) => {
  console.log('Statisticline props value is', props)  
  const {good, neutral, bad, allClicks, StatisticLine} = props;

  if (allClicks == 0) {
    return(
    <div>
      No feedback given
      </div>
    )
  }

  const total = good + neutral + bad;
  const average = total === 0 ? 0 : (good - bad) / total;
  const positive = good * 100 / total;
  
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

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const header = 'give feedback'
  
  const subheader = 'statistics'

  const handlegoodClick = () => {
    setAll(allClicks.concat('good'))
    const updatedGood = good + 1
    setGood(updatedGood)
  };

  const handleneutralClick = () => {
    setAll(allClicks.concat('neutral'))
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  };

  const handlebadClick = () => {
    setAll(allClicks.concat('bad'))
    const updatedBad = bad + 1
    setBad(updatedBad)
  };

  return (
    <div>
      <Header header ={header} />
      <Button handleClick={handlegoodClick} text="good" />
      <Button handleClick={handleneutralClick} text="neutral" />
      <Button handleClick={handlebadClick} text="bad" />
      <SubHeader subheader ={subheader} />
      <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks} StatisticLine={StatisticLine}/>
    </div>
  );
};

export default App;