import React from 'react';

const Header = (props) => {
    console.log('Header props value is', props)
        return (
        <h1>
          {props.courseName}
        </h1>
    )
  }

  export default Header