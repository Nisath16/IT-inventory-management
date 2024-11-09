import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>IT Inventory Tracker</h1>
      <ul>
        <li><Link to="/assets">Assets</Link></li>
        <li><Link to="/users">Users</Link></li>
        <li><Link to="/branches">Branches</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
