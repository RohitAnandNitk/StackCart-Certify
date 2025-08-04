import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
function MainLayout() {
  return (
    <div>
      
      <div>
         {/* fixed navbar */}
         <div className='sticky top-0 z-50'>
           <Navbar/>
         </div>


         <div className='min-h-screen'>
          <Outlet/>
          </div>

           {/* fixed footer */}
        <Footer/>
      </div>
    </div>
  )
}

export default MainLayout
