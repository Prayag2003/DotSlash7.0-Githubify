import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import ChatWithBot from './Components/ChatWithBot'
import Explore from './Components/Explore'
import Hero from './Components/Hero'
import History from './Components/History'
import Navbar from './Components/Navbar'

function App() {

  return (
    <>
      <Navbar/>
      <Router>
        <Routes>
          <Route path='/' element={<Hero/>}/>
          <Route path='/explore' element={<Explore/>}/>
          <Route path='/chatwithbot' element={<ChatWithBot/>}/>
          <Route path='/history' element={<History/>}/>
        </Routes>
      </Router>
</>
  )
}

export default App
