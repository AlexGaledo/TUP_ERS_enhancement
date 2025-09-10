import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Auth from './pages/auth.jsx'
import ResetPage from './pages/forgetpass.jsx'
import ChangePass from './pages/changepass.jsx'

function App() {
 

  return (
    <>
    <Routes>
      <Route path='/' element={<h1>Landing</h1>}/>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/forget-password' element={<ResetPage/>}/>
      <Route path='/reset-password/:token' element={<ChangePass/>}/>
    </Routes>
    </>
  )
}

export default App
