import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle navigation with React Router
  const handleNavigation = (page) => {
    navigate(page);
    setIsMobileMenuOpen(false);
  };

  // Check if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* LOGO SECTION - Clickable to home */}
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => handleNavigation('/')}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl blur-md opacity-50"></div>
              <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
                FS
              </div>
            </div>
            <div>
              <h1 className="text-base md:text-lg font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Face Anti-Spoofing
              </h1>
              <p className="text-[10px] md:text-xs text-gray-500 hidden sm:block">Liveness Detection System</p>
            </div>
          </div>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink 
              active={isActive('/')} 
              onClick={() => handleNavigation('/')}
            >
              Home
            </NavLink>
            <NavLink 
              active={isActive('/upload')} 
              onClick={() => handleNavigation('/upload')}
            >
              Upload
            </NavLink>
            <NavLink 
              active={isActive('/results')} 
              onClick={() => handleNavigation('/results')}
            >
              Results
            </NavLink>
          </div>

          {/* RIGHT SIDE - Status Indicator */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-medium text-green-700">System Active</span>
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-slideDown">
            <div className="flex flex-col space-y-3">
              <MobileNavLink 
                active={isActive('/')} 
                onClick={() => handleNavigation('/')}
              >
                Home
              </MobileNavLink>
              <MobileNavLink 
                active={isActive('/upload')} 
                onClick={() => handleNavigation('/upload')}
              >
                Upload
              </MobileNavLink>
              <MobileNavLink 
                active={isActive('/results')} 
                onClick={() => handleNavigation('/results')}
              >
                Results
              </MobileNavLink>
              <div className="pt-3 mt-2 border-t border-gray-100">
                <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg w-fit">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-xs font-medium text-green-700">System Active</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Desktop Navigation Link Component
const NavLink = ({ children, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`relative px-1 py-2 text-sm font-medium transition-all duration-200 group ${
      active
        ? "text-blue-600"
        : "text-gray-600 hover:text-blue-600"
    }`}
  >
    {children}
    {active && (
      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></span>
    )}
    <span
      className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100 ${
        active ? "scale-x-100" : ""
      }`}
    ></span>
  </button>
);

// Mobile Navigation Link Component
const MobileNavLink = ({ children, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`block w-full text-left px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
      active
        ? "bg-blue-50 text-blue-600"
        : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
    }`}
  >
    {children}
  </button>
);

export default Navbar;