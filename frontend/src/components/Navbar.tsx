import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Supply Chain
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/login" className="nav-links">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-links">
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
