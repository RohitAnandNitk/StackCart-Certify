import React from 'react'
import {Route , Routes} from 'react-router-dom'
import MainLayout from '../Layout/MainLayout'
import Home from '../Pages/Home'
function AppRoute() {
  return (
    <div>
       <Routes>
           <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
      </Route>
       </Routes>
    </div>
  )
}

export default AppRoute
