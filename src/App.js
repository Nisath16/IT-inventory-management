import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Assets from './pages/Assets.js';
import Users from './pages/Users.js';
import Branches from './pages/Branches.js';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/assets" element={<Assets />} />
        <Route path="/users" element={<Users />} />
        <Route path="/branches" element={<Branches />} />
      </Routes>
    </Router>
  );
}

export default App;
