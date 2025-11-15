import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup.jsx'
import Login from './Login.jsx'
import Home from './Home.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/register' element={<Signup/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/home' element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App;
