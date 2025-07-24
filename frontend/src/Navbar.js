import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

function Navbar({ isAuthenticated, onLogout }) {
  const [open, setOpen] = useState(false);
  // Keyboard accessibility for hamburger
  const handleKeyDown = (e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };
  return (
    <nav aria-label="Main navigation" role="navigation" className="navbar-black">
      {/* Kenyan flag stripes */}
      <div className="w-full h-2 bg-black" />
      <div className="w-full bg-black shadow flex items-center justify-between h-16 px-4">
        <div className="flex-1 flex items-center">
          <Link to="/" className="flex items-center font-bold text-2xl tracking-tight hover:underline focus:outline-none cursor-pointer text-left text-white focus-visible:ring-2 focus:ring-green-400" tabIndex={0} aria-label="Go to Home">
            {/* Leaf icon for agriculture */}
            <svg className="h-7 w-7 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M10.75 2.75c-3.5 0-6.5 2.5-7.5 6.5 2.5-1.5 5.5-2 8.5-1.5-2.5 1-4.5 3.5-4.5 6.5 0 1.5 1 2.5 2.5 2.5 2.5 0 6.5-2.5 6.5-7.5 0-2-1.5-6-5.5-6z" />
            </svg>
            Digi-Shamba
          </Link>
        </div>
        <div className="hidden md:flex space-x-8 items-center" role="menubar">
          <Link to="/">
            <button className="hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 text-white" role="menuitem">Home</button>
          </Link>
          <Link to="/products">
            <button className="hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 text-white" role="menuitem">Product List</button>
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <button className="hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 text-white" role="menuitem">Dashboard</button>
              </Link>
              <button className="hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 text-white" onClick={onLogout} role="menuitem">Logout</button>
            </>
          ) : (
            <Link to="/auth">
              <button className="hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 text-white" role="menuitem">Sign Up / Log In</button>
            </Link>
          )}
        </div>
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="focus:outline-none focus:ring-2 focus:ring-green-400"
            tabIndex={0}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="md:hidden bg-black px-2 pb-3 pt-2 space-y-1" role="menu">
          <Link to="/">
            <button className="block w-full text-left py-2 px-3 rounded hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 text-white" role="menuitem" onClick={() => setOpen(false)}>Home</button>
          </Link>
          <Link to="/products">
            <button className="block w-full text-left py-2 px-3 rounded hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 text-white" role="menuitem" onClick={() => setOpen(false)}>Product List</button>
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <button className="block w-full text-left py-2 px-3 rounded hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 text-white" role="menuitem" onClick={() => setOpen(false)}>Dashboard</button>
              </Link>
              <button className="block w-full text-left py-2 px-3 rounded hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 text-white" onClick={() => {onLogout(); setOpen(false);}} role="menuitem">Logout</button>
            </>
          ) : (
            <Link to="/auth">
              <button className="block w-full text-left py-2 px-3 rounded hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 text-white" role="menuitem" onClick={() => setOpen(false)}>Sign Up / Log In</button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;