import React from 'react'
import {Route , Routes} from 'react-router-dom'
import MainLayout from '../Layout/MainLayout'
import Home from '../Pages/Home'
import About from '../Pages/About'
import CreateId from '../components/CreateId'
function AppRoute() {
  return (
    <div>
       <Routes>
           <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="createId" element={<CreateId />} />
            <Route path="about" element={<About />} />
      </Route>
       </Routes>
    </div>
  )
}

export default AppRoute
