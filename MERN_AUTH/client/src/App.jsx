import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPasswod from "./pages/ResetPasswod";

const App = () => {
  return (

    
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/verify-email' element={<EmailVerify/>}/>
        <Route path='/reset-password' element={<ResetPasswod/>}/>
      </Routes>
    </div>
  )
}

export default App
