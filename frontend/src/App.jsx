import './App.css'
import React from 'react'
import AppRoute from './Routes/AppRoute'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <>
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>    
    </>
  )
}

export default App
