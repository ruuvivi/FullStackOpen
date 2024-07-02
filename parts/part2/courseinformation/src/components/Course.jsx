import React from 'react';
import Header from './components/Header'
import Content from './components/Content'

const Course = (props) => {
  console.log('Course props value is', props)
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

export default Course