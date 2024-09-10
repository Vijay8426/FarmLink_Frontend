import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Bootstrap JS (includes Popper.js)
import { Link } from 'react-router-dom';
import logo from '../../images/farmlinkicon.png';

function Navbar() {
  const [bgColor, setBgColor] = useState('transparent'); // Default background color
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if user is logged in
  const [userRole, setUserRole] = useState(''); // State to track user role

  // Check if accessToken exists and fetch user role from localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const role = localStorage.getItem('userRole'); // Fetch user role from localStorage
    if (token) {
      setIsLoggedIn(true); // Set user as logged in if token exists
      if (role) {
        setUserRole(role); // Set user role if it exists in localStorage
      }
    } else {
      setIsLoggedIn(false); // Set user as not logged in if token is not found
    }
  }, []); // Empty dependency array ensures this runs once on component mount

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 90) {
      setBgColor('white'); // Set to a different color when scrolled
    } else {
      setBgColor('transparent'); // Set to initial color when at the top
    }
  };

  const HomeRef = useRef(null);
  const ServicesRef = useRef(null);
  const AboutRef = useRef(null);
  const ContactRef = useRef(null);

  const HomeClick = () => {
    HomeRef.current.classList.add('header_navButton__zcho_');
    ServicesRef.current.classList.remove('header_navButton__zcho_');
    AboutRef.current.classList.remove('header_navButton__zcho_');
    ContactRef.current.classList.remove('header_navButton__zcho_');
  };

  const ServicesClick = () => {
    HomeRef.current.classList.remove('header_navButton__zcho_');
    ServicesRef.current.classList.add('header_navButton__zcho_');
    AboutRef.current.classList.remove('header_navButton__zcho_');
    ContactRef.current.classList.remove('header_navButton__zcho_');
  };

  const AboutClick = () => {
    HomeRef.current.classList.remove('header_navButton__zcho_');
    ServicesRef.current.classList.remove('header_navButton__zcho_');
    AboutRef.current.classList.add('header_navButton__zcho_');
    ContactRef.current.classList.remove('header_navButton__zcho_');
  };

  const ContactClick = () => {
    HomeRef.current.classList.remove('header_navButton__zcho_');
    ServicesRef.current.classList.remove('header_navButton__zcho_');
    AboutRef.current.classList.remove('header_navButton__zcho_');
    ContactRef.current.classList.add('header_navButton__zcho_');
  };

  // Function to handle sign out
  const handleSignOut = () => {
    localStorage.removeItem('accessToken'); // Clear the access token from localStorage
    localStorage.removeItem('userRole'); // Clear the user role from localStorage
    setIsLoggedIn(false); // Update state to reflect logged out status
    window.location.reload(); // Refresh the page
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      style={{ boxShadow: 'none', backgroundColor: bgColor, color: '#233241' }}
      className="header_pactronHeader__DjB52 navbar navbar-expand-lg navbar-light fixed-top"
    >
      <div className="container">
        <Link to="/" className="navbar-brand" onClick={HomeClick}>
          <img
            alt="FarmLink Logo"
            fetchPriority="high"
            width="230"
            height="130"
            decoding="async"
            className="undefined"
            style={{ color: 'transparent' }}
            src={logo}
          />
        </Link>
        <button
          aria-controls="pactronNav"
          type="button"
          aria-label="Toggle navigation"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#pactronNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="pactronNav">
          <div className="ms-auto header_pactronNav__q0P3M navbar-nav">
            <Link to="/" className="nav-link header_navButton__zcho_" onClick={HomeClick} ref={HomeRef}>
              Home
            </Link>
            {
              userRole==='2'&&
            <div className="header_servicesDropdown__84AKF nav-item dropdown">
              <Link
                id="servicesDropdown"
                aria-expanded="false"
                role="button"
                className="dropdown-toggle nav-link"
                tabIndex="0"
                to="#"
                data-bs-toggle="dropdown"
                onClick={ServicesClick}
                ref={ServicesRef}
              >
                Tender
              </Link>
              <ul className="dropdown-menu" aria-labelledby="servicesDropdown">
                <li><Link className="dropdown-item" to="/viewtenders">View Tenders &nbsp;</Link></li>
                <li><Link className="dropdown-item" to="/issuetender">Issue Tenders</Link></li>
              </ul>
            </div>}
            {
              userRole==='2'&&
            <div className="header_servicesDropdown__84AKF nav-item dropdown">
              <Link
                id="servicesDropdown"
                aria-expanded="false"
                role="button"
                className="dropdown-toggle nav-link"
                tabIndex="0"
                to="#"
                data-bs-toggle="dropdown"
                onClick={ServicesClick}
                ref={ServicesRef}
              >
                Contract
              </Link>
              <ul className="dropdown-menu" aria-labelledby="servicesDropdown">
                <li><Link className="dropdown-item" to="/contracts">View Contracts &nbsp;</Link></li>
                <li><Link className="dropdown-item" to="/issuetender">Sign Contract</Link></li>
              </ul>
            </div>}
            { userRole==='1'&&
            <Link to="/contracts" className="nav-link" onClick={AboutClick} ref={AboutRef}>
              Contracts
            </Link>
}

            <Link to="/profile" className="nav-link" onClick={ContactClick} ref={ContactRef}>
              Profile
            </Link>
            <Link to="/chat" className="nav-link" onClick={AboutClick} >
              Chat
            </Link>
            {userRole==='1'&&
            <Link to="/tender-farmer" className="nav-link" onClick={AboutClick} >
              Tenders
            </Link>
}
            {/* Conditionally render Sign in or Sign out */}
            {isLoggedIn ? (
              <>
                
                <a href="/" className="nav-link" onClick={handleSignOut}>
                  Sign out
                </a>
              </>
            ) : (
              <Link to="/sign-in" className="nav-link">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
