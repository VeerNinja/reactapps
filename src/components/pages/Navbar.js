// src/Navbar.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  // Local state to manage authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Get the current location
  const location = useLocation();

  const handleLogout = () => {
    // Add your logout logic here (e.g., clearing tokens, etc.)
    setIsLoggedIn(false); // Update the state to reflect user is logged out
  };

  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container-fluid container-xl position-relative d-flex align-items-center">
        <a className="logo d-flex align-items-center me-auto">
          <h1 className="sitename">Appland</h1>
        </a>
        
        <nav id="navmenu" className="navmenu">
        <ul>
            <li>
              <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
            </li>
            <li>
              <Link to="/view" className={location.pathname.startsWith('/view') ? 'active' : ''}>View</Link>
            </li>
            <li>
              <Link to="/upload" className={location.pathname === '/upload' ? 'active' : ''}>Upload</Link>
            </li>
          </ul>
            {/* {isLoggedIn && <li><Link to="/upload" className="active">Upload</Link></li>} */}
        </nav>
        
        {/* Conditional rendering based on authentication status */}
        {!isLoggedIn ? (
          <>
           <Link className={`${location.pathname === '/signup' ? 'btn-getstarted-active' : 'btn-getstarted '}`} to="/signup">Sign Up</Link>
            <Link className={` ${location.pathname === '/signin' ? 'btn-getstarted-active' : 'btn-getstarted '}`} to="/signin">Sign In</Link>
          
          </>
        ) : (
          <button className="btn-getstarted" onClick={handleLogout}>Sign Out</button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
