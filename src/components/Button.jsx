import React from 'react'

export const Button = ({alertText}) => {
  return (
    <button onClick={()=>alert(alertText)}>Click Me</button>
  )
}

export default Button;
