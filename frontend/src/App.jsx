import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import ToDo from './components/ToDo'
import Cookie from 'js-cookie'
import Profile from './components/Profile'

function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todo" element={<ToDo/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
