import './App.css'
import React from 'react'
import AppRoute from './Routes/AppRoute'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
       <Toaster position="top-right" reverseOrder={false} />
      <div className="fixed inset-0 -z-10 w-full min-h-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </>
  )
}

export default App
