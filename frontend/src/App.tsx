import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SearchBar } from './components'
import { Carousel, Navbar } from './containers'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Navbar />
        <Carousel />
        <div>
            <SearchBar />
        </div>
    </>
  )
}

export default App
