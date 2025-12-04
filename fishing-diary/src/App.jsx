
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup.jsx'
import Login from './Login.jsx'
import Home from './Home.jsx'
import MapPage from "./Map";
import TideChart from "./TideChart";

import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/register' element={<Signup/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/' element={<Home/>}/>
                <Route path="/map" element={<MapPage />} />
                <Route path="/tides" element={<TideChart />} />

            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App;
