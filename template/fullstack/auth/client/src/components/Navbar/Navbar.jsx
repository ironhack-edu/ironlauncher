import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <Link to="/" className="nav__projectName">
        Project Name
      </Link>

      <div className="nav__authLinks">
        <Link to="/auth/signup" className="authLink">
          Signup
        </Link>
        <Link to="/auth/signin" className="authLink">
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
