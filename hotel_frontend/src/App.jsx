import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Reservations from './pages/Reservations';
import Orders from './pages/Orders';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminReservations from './pages/AdminReservations'; 

function App() {
  // 1. Initialize state from LocalStorage so login persists on refresh
  const [userRole, setUserRole] = useState(localStorage.getItem('role') || 'guest');

  // 2. Function to update role (passed to Login page)
  const handleLogin = (role) => {
    localStorage.setItem('role', role);
    setUserRole(role);
  };

  // 3. Function to logout (passed to Navbar)
  const handleLogout = () => {
    localStorage.removeItem('role');
    setUserRole('guest');
  };

  return (
    <Router>
      {/* Pass role and logout function to Navbar */}
      <Navbar userRole={userRole} onLogout={handleLogout} />
      
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/orders" element={<Orders />} />
        
        {/* LOGIN PAGE: Pass the handleLogin function */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        <Route 
        path="/admin" 
        element={userRole === 'staff' ? <AdminDashboard /> : <Navigate to="/login" />} 
        />
  
        {/* NEW ROUTE HERE */}
        <Route 
        path="/admin/reservations" 
        element={userRole === 'staff' ? <AdminReservations /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;