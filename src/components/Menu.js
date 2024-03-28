import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="navbar">
      <div className="menu-container">
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/projects" className="nav-link">
              Projects
            </Link>
          </li>
          <li>
            <Link to="/timereports" className="nav-link">
              Time reports
            </Link>
          </li>
          <li>
            <Link to="/overview" className="nav-link">
              Overview
            </Link>
          </li>
        </ul>
        <div className="loggedInUser">
        <p>Inloggad som: </p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
