import React from 'react'
import {Route , Routes} from 'react-router-dom'
import MainLayout from '../Layout/MainLayout'
import Home from '../Pages/Home'
import About from '../Pages/About'
import CreateId from '../Pages/CreateId'
import SignIn from '../Pages/SignIn'
import SignUp from '../Pages/SignUp'
import ProtectedRoute from '../components/ProtectedRoute'
import UploadCertificate from '../Pages/UploadCertificate'

function AppRoute() {
  return (
    <div>
       <Routes>
           <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="/getInfo/:id" element={<Home />} />
            <Route path="createId" element={<ProtectedRoute><CreateId /></ProtectedRoute>} />
            <Route path="uploadCertificate" element={<ProtectedRoute><UploadCertificate /></ProtectedRoute>} />
            <Route path="about" element={<About />} />
            <Route path="SignIn" element={<SignIn />} />
            <Route path="SignUp" element={<SignUp />} />
      </Route>
       </Routes>
    </div>
  )
}

export default AppRoute
