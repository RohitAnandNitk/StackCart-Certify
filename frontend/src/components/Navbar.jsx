import React, { useState , useEffect} from 'react';
import { Menu, X, UserCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  // track if admin is logged in 
  const [isAdmin, setIsAdmin] = useState(true);

  // Effect on navbar visibility
     
     const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



 return (
  <nav
    className={`fixed top-1 left-0 w-full transition-transform duration-300 z-50 ${
      showNavbar ? 'translate-y-0' : '-translate-y-full'
    }`}
  >
    {/* Main container */}
    <div className="bg-green-50 shadow-md rounded-2xl px-6 py-3 max-w-7xl mx-auto flex items-center justify-between relative hover:shadow-lg transition-shadow duration-300">
      
      {/* Left - Logo */}
      <div className="flex-shrink-0 shadow-2xs">
        <img src="assets/header_image_1.avif" alt="LOGO" className="h-14 object-contain" />
      </div>

      {/* Center - Navigation Links */}
      <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-6 text-gray-700 font-medium">
        <li id='home'><NavLink to="home" className="hover:text-green-600">Home</NavLink></li>
        { isAdmin && (<li id='create-id'><NavLink to="createId" className="hover:text-green-600">Create Id</NavLink></li>)}
        <li id='about'><NavLink to="about" className="hover:text-green-600">About Us</NavLink></li>
      </ul>
   
      {/* Right - Avatar Icon */}
      <div className="hidden md:block">
        <NavLink to="/admin" className="text-gray-700 hover:text-green-600">
          <UserCircle size={30} />
        </NavLink>
      </div>
       
      {/* Hamburger Icon */}
      <button onClick={toggleMenu} className="md:hidden text-gray-700 focus:outline-none ml-auto">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>

      

    {/* Mobile Menu */}
    {isOpen && (
      <ul className="md:hidden mt-4 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4 z-50">
        <li><NavLink to="home" onClick={toggleMenu} className="text-gray-700 hover:text-blue-600">Home</NavLink></li>
        {isAdmin && (<li><NavLink to="createId" onClick={toggleMenu} className="text-gray-700 hover:text-blue-600">Create Id</NavLink></li>)}
        <li><NavLink to="about" onClick={toggleMenu} className="text-gray-700 hover:text-blue-600">About Us</NavLink></li>
        <li><NavLink to="admin" onClick={toggleMenu} className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
          <UserCircle size={20} /> Admin
        </NavLink></li>
      </ul>
    )}
  </nav>
);

};

export default Navbar;
