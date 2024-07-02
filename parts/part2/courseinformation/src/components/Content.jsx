import React from 'react';
import Part from './components/Part'

const Content = (props) => {
    console.log('Content props value is', props)
    return (
        <div>
          {props.parts.map(part => (
            < Part key={part.id} name = {part.name} exercise = {part.exercises} />
          ))}
        </div>
      )
  }

export default Content