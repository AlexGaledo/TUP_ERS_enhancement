import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import './css/auth.css'
import Auth from './pages/auth.jsx'
import ResetPage from './pages/forgetpass.jsx'
import ChangePass from './pages/changepass.jsx'
import Otp from './pages/otp.jsx'

import Home from './pages/Home.jsx';

import { useNavigate } from 'react-router-dom'

function App() {  
  const navigate = useNavigate();
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/forget-password' element={<ResetPage/>}/>
      <Route path='/reset-password/:token' element={<ChangePass/>}/>
      <Route path='/otp'element={<Otp/>}/>
    </Routes>
    </>
  )
}

export default App
