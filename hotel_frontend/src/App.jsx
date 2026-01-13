import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Reservations from './pages/Reservations';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Register from './pages/Register'; 
import AdminDashboard from './pages/AdminDashboard';
import AdminReservations from './pages/AdminReservations';

function App() {
  // 1. Initialize state from LocalStorage so login persists on refresh
const [userRole, setUserRole] = useState(localStorage.getItem('role'));
  // 2. Function to update role (passed to Login page)
  const handleLogin = (role) => {
    localStorage.setItem('role', role);
    setUserRole(role);
  };

  // 3. Function to logout (passed to Navbar)
  const handleLogout = () => {
  localStorage.removeItem('role');
  setUserRole(null); 
};

  return (
    <Router>
      <Navbar userRole={userRole} onLogout={handleLogout} />
      
      <Routes>
        {/* === PUBLIC ROUTES === */}
        <Route path="/" element={<Home />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* === STAFF ROUTES (Protected) === */}
        
        {/* 1. Admin Home */}
        <Route 
          path="/admin" 
          element={userRole === 'staff' ? <AdminDashboard /> : <Navigate to="/login" />} 
        />
  
        {/* 2. Room Management (Matches Navbar Link) */}
        <Route 
          path="/admin/rooms" 
          element={userRole === 'staff' ? <AdminReservations /> : <Navigate to="/login" />} 
        />

        {/* 3. Services Management (Matches Navbar Link) */}
        {/* For now, we reuse the Orders page or you can make a new AdminServices page */}
        <Route 
          path="/admin/services" 
          element={userRole === 'staff' ? <Orders /> : <Navigate to="/login" />} 
        />

      </Routes>
    </Router>
  );
}

export default App;