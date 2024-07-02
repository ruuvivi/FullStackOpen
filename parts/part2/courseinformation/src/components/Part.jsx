import React from 'react';

const Part = (props) => {
    console.log('Part props value is', props)
    const {name, exercise} = props
    return (
        <h1>
          {name} {exercise}
        </h1>
      )
  }

export default Content