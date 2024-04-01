import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NotionLogin from "./NotionLogin"; // Import the Login component
import "../components/Menu.css";
 
const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
 
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
 
  return (
    <header>
      <nav id="desktop-nav" className="navbar">
        <div className="logo">G5</div>
        <div className="nav-content">
          <ul className="nav-links">
            <li>
              <Link to="/" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/projects" className={location.pathname === '/projects' ? 'nav-link active' : 'nav-link'}>
                Projects
              </Link>
            </li>
            <li>
              <Link to="/timereports" className={location.pathname === '/timereports' ? 'nav-link active' : 'nav-link'}>
                Time reports
              </Link>
            </li>
            <li>
              <Link to="/overview" className={location.pathname === '/overview' ? 'nav-link active' : 'nav-link'}>
                Overview
              </Link>
            </li>
          </ul>
          <div className="login-status">
            <NotionLogin />
          </div>
        </div>
      </nav>
      <nav id="hamburger-nav" className="navbar">
        <div className="logo">G5</div>
        <div className="hamburger-menu">
          <div className="hamburger-icon" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`menu-links ${isOpen ? "open" : ""}`}>
            <ul className="nav-links">
              <li>
                <a href="#about" onClick={toggleMenu}>
                  Home
                </a>
              </li>
              <li>
                <a href="#experience" onClick={toggleMenu}>
                  Projects
                </a>
              </li>
              <li>
                <a href="#projects" onClick={toggleMenu}>
                  Time reports
                </a>
              </li>
              <li>
                <a href="#overview" onClick={toggleMenu}>
                  Overview
                </a>
              </li>
            </ul>
            <div className="login-status">
              <NotionLogin />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
 
export default Menu;