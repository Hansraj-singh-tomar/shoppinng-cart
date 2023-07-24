import './App.css'

import Home from './Components/Home'
import Cart from './Components/Cart'
import Header from './Components/Header'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <div>
          <Routes>
            <Route exact path='/' element={<Home />}/>
            <Route exact path='/cart' element={<Cart />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </> 
  )
}

export default App
