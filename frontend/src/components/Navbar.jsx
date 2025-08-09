import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, UserCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore.js';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const { admin, loading, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [showAdminOption, setShowAdminOption] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const adminRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close menus when auth state changes (login/logout)
  useEffect(() => {
    // This will run when 'admin' changes, closing any open menus
    setIsOpen(false);
    setShowAdminOption(false);
  }, [admin]);

  // Hide navbar on scroll down
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Hide admin options on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (adminRef.current && !adminRef.current.contains(e.target)) {
        setShowAdminOption(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={`fixed top-1 left-0 w-full transition-transform duration-300 z-49 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="bg-green-100 shadow-md rounded-2xl px-6 py-3 max-w-7xl mx-auto flex items-center justify-between relative hover:shadow-lg transition-shadow duration-300">

        {/* Logo */}
        <div className="flex-shrink-0">
          <img src="assets/logo.png" alt="LOGO" className="h-14 object-contain" />
        </div>

        {/* Center Links */}
        <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-6 text-gray-700 font-medium">
          <li><NavLink to="/home" className="hover:text-green-600">Home</NavLink></li>
          {admin && <li><NavLink to="/createId" className="hover:text-green-600">Create Id</NavLink></li>}
          <li><NavLink to="/about" className="hover:text-green-600">About Us</NavLink></li>
        </ul>

        {/* Avatar + Dropdown */}
        <div className="relative hidden md:block" ref={adminRef}>
          {loading ? (
            <div className="animate-spin rounded-full h-[30px] w-[30px] border-t-4 border-b-4 border-green-500"></div>
          ) : (
            <button onClick={() => setShowAdminOption(!showAdminOption)} className="text-gray-700 hover:text-green-600">
              <UserCircle size={30} />
            </button>
          )}
          
          {showAdminOption && (
            <div className="absolute left-1/2 -translate-x-1/2 mt-1 w-40 bg-green-100 shadow-lg rounded-lg py-2 z-50">
              {!admin ? (
                <>
                  <NavLink onClick={() => setShowAdminOption(false)} to="/SignIn" className="block w-full px-4 py-2 text-left hover:bg-green-50">Sign In</NavLink>
                  <NavLink onClick={() => setShowAdminOption(false)} to="SignUp" className="block w-full px-4 py-2 text-left hover:bg-green-50">Sign Up</NavLink>
                </>
              ) : (
                <div>
                  <div className='block w-full px-4 py-2 text-left'>
                    {`${admin.fullName}`}
                  </div>
                  <button onClick={() => {
                    logout();
                    navigate("/home");
                  }} className="block w-full px-4 py-2 text-left hover:bg-green-50">Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
        

        {/* Hamburger Icon */}
        <button onClick={toggleMenu} className="md:hidden text-gray-700 focus:outline-none ml-auto">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden mt-4 w-full bg-green-100 shadow-md flex flex-col items-center gap-4 py-4 z-50">
          <li><NavLink to="/home" onClick={toggleMenu} className="text-gray-700 hover:text-blue-600">Home</NavLink></li>
          {admin && <li><NavLink to="/createId" onClick={toggleMenu} className="text-gray-700 hover:text-blue-600">Create Id</NavLink></li>}
          <li><NavLink to="/about" onClick={toggleMenu} className="text-gray-700 hover:text-blue-600">About Us</NavLink></li>

          {/* Conditional rendering for Login/Logout/Signup on mobile */}
          {!admin ? (
            <>
              <li><NavLink onClick={toggleMenu} to="/SignIn" className="text-gray-700 hover:text-blue-600">Sign In</NavLink></li>
              <li><NavLink onClick={toggleMenu} to="/SignUp" className="text-gray-700 hover:text-blue-600">Sign Up</NavLink></li>
            </>
          ) : (
            <>
              <li><div className="text-gray-700 font-bold px-4 py-2">{`Hello, ${admin.fullName}`}</div></li>
              <li>
                <button
                  onClick={() => {
                    logout();
                    navigate("/home");
                  }}
                  className="text-gray-700 hover:text-blue-600"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;