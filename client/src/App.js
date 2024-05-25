import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Chat from './Components/Chat'
import Join from './Components/Join'
const App = () => {
  return (
    <div>
        <Router>
            <Routes>

            <Route path='/' exact Component={Join}/>
            <Route path='/chat' exact Component={Chat}/>
            </Routes>
        </Router>
      
    </div>
  )
}

export default App
