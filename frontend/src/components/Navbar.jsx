import React, { useState, useEffect, useRef } from "react";
import { Menu, X, UserCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { admin, loading, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [showAdminOption, setShowAdminOption] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const adminRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close menus when auth state changes (login/logout)
  useEffect(() => {
    setIsOpen(false);
    setShowAdminOption(false);
  }, [admin]);

  // Hide navbar on scroll down and add scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Hide admin options on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (adminRef.current && !adminRef.current.contains(e.target)) {
        setShowAdminOption(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed top-1 left-0 w-full transition-all duration-500 ease-in-out z-49 ${
        showNavbar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div
        className={`bg-green-100 shadow-md rounded-2xl px-6 py-3 max-w-7xl mx-auto flex items-center justify-between relative transition-all duration-300 ease-out transform hover:scale-[1.02] hover:shadow-xl ${
          isScrolled ? "bg-green-50/95 backdrop-blur-sm shadow-lg" : ""
        }`}
      >
        {/* Logo with hover animation */}
        <div className="flex-shrink-0 group">
          <img
            src="assets/logo.png"
            alt="LOGO"
            className="h-14 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2"
          />
        </div>

        {/* Center Links with stagger animation */}
        <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-8 text-gray-700 font-medium">
          {[
            { to: "/home", label: "Home", show: true },
            { to: "/createId", label: "Create Id", show: admin },
            { to: "/about", label: "About Us", show: true },
          ].map(
            (item, index) =>
              item.show && (
                <li
                  key={item.to}
                  className="relative group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <NavLink
                    to={item.to}
                    className="relative py-2 px-4 rounded-lg transition-all duration-300 hover:text-green-600 hover:bg-green-50 transform hover:scale-105 hover:-translate-y-1"
                  >
                    {item.label}
                    {/* Animated underline */}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                    {/* Glow effect */}
                    <span className="absolute inset-0 rounded-lg bg-green-200 opacity-0 transition-opacity duration-300 group-hover:opacity-20 -z-10"></span>
                  </NavLink>
                </li>
              )
          )}
        </ul>

        {/* Avatar + Dropdown with enhanced animations */}
        <div className="relative hidden md:block" ref={adminRef}>
          {loading ? (
            <div className="relative">
              <div className="animate-spin rounded-full h-[30px] w-[30px] border-t-4 border-b-4 border-green-500"></div>
              <div className="absolute inset-0 rounded-full bg-green-200 animate-pulse opacity-30"></div>
            </div>
          ) : (
            <button
              onClick={() => setShowAdminOption(!showAdminOption)}
              className="text-gray-700 hover:text-green-600 p-2 rounded-full transition-all duration-300 hover:bg-green-100 hover:scale-110 transform active:scale-95"
            >
              <UserCircle
                size={30}
                className={`transition-transform duration-300 ${
                  showAdminOption ? "rotate-180" : ""
                }`}
              />
            </button>
          )}

          {/* Enhanced dropdown with slide and fade animation */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white/95 backdrop-blur-sm shadow-xl rounded-xl py-2 z-50 border border-green-100 transition-all duration-300 origin-top ${
              showAdminOption
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            }`}
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l border-t border-green-100"></div>

            {!admin ? (
              <>
                <NavLink
                  onClick={() => setShowAdminOption(false)}
                  to="/SignIn"
                  className="block w-full px-4 py-3 text-left hover:bg-green-50 transition-all duration-200 hover:translate-x-1 hover:text-green-600 rounded-lg mx-2"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"></span>
                    Sign In
                  </span>
                </NavLink>
                <NavLink
                  onClick={() => setShowAdminOption(false)}
                  to="/SignUp"
                  className="block w-full px-4 py-3 text-left hover:bg-green-50 transition-all duration-200 hover:translate-x-1 hover:text-green-600 rounded-lg mx-2"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"></span>
                    Sign Up
                  </span>
                </NavLink>
              </>
            ) : (
              <div>
                <div className="block w-full px-4 py-3 text-left font-semibold text-green-700 border-b border-green-100 mb-2">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    {`${admin.fullName}`}
                  </span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    navigate("/home");
                  }}
                  className="block w-full px-4 py-3 text-left hover:bg-red-50 hover:text-red-600 transition-all duration-200 hover:translate-x-1 rounded-lg mx-2"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"></span>
                    Logout
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Hamburger Icon */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 focus:outline-none ml-auto p-2 rounded-lg hover:bg-green-100 transition-all duration-300 transform hover:scale-110 active:scale-95"
        >
          <div className="relative w-6 h-6">
            <span
              className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 transform ${
                isOpen ? "rotate-45 top-3" : "top-1"
              }`}
            ></span>
            <span
              className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 top-3 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 transform ${
                isOpen ? "-rotate-45 top-3" : "top-5"
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Enhanced Mobile Menu */}
      <div
        className={`md:hidden mt-4 w-full bg-white/95 backdrop-blur-sm shadow-lg rounded-2xl mx-2 overflow-hidden transition-all duration-500 ease-out ${
          isOpen
            ? "max-h-96 opacity-100 scale-100"
            : "max-h-0 opacity-0 scale-95"
        }`}
      >
        <ul className="flex flex-col items-center gap-2 py-4">
          {[
            { to: "/home", label: "Home", show: true },
            { to: "/createId", label: "Create Id", show: admin },
            { to: "/about", label: "About Us", show: true },
          ].map(
            (item, index) =>
              item.show && (
                <li
                  key={item.to}
                  className="w-full transform transition-all duration-300"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    transform: isOpen ? "translateX(0)" : "translateX(-100px)",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <NavLink
                    to={item.to}
                    onClick={toggleMenu}
                    className="block text-center text-gray-700 hover:text-green-600 hover:bg-green-50 py-3 px-6 mx-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
          )}

          {/* Mobile auth section */}
          <div className="w-full border-t border-green-100 mt-4 pt-4">
            {!admin ? (
              <>
                <li
                  className="w-full transform transition-all duration-300"
                  style={{ animationDelay: "300ms" }}
                >
                  <NavLink
                    onClick={toggleMenu}
                    to="/SignIn"
                    className="block text-center text-gray-700 hover:text-green-600 hover:bg-green-50 py-3 px-6 mx-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Sign In
                  </NavLink>
                </li>
                <li
                  className="w-full transform transition-all duration-300"
                  style={{ animationDelay: "400ms" }}
                >
                  <NavLink
                    onClick={toggleMenu}
                    to="/SignUp"
                    className="block text-center text-gray-700 hover:text-green-600 hover:bg-green-50 py-3 px-6 mx-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="w-full">
                  <div className="text-center text-green-700 font-semibold px-4 py-2 flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    {`Hello, ${admin.fullName}`}
                  </div>
                </li>
                <li
                  className="w-full transform transition-all duration-300"
                  style={{ animationDelay: "400ms" }}
                >
                  <button
                    onClick={() => {
                      logout();
                      navigate("/home");
                    }}
                    className="block w-full text-center text-gray-700 hover:text-red-600 hover:bg-red-50 py-3 px-6 mx-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
