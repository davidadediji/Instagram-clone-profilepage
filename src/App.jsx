import { useState } from 'react'
import { Nav, Bio, Gallery} from './components'
import './App.css'

const App = () => {
  const name = "David"
  const [count, setCount] = useState(0)
 //JSX - template of Javascript
  return (
    <>
      <Nav/>
      <div className="container">
        <Bio/>
        <Gallery/>
      </div>
    </>
    
  )
}

export default App
