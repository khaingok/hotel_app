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
import ProtectedRoute from './components/ProtectedRoute';

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
        {/* === PUBLIC ROUTES (Everyone can see) === */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* === PROTECTED GUEST ROUTES (Needs Token) === */}
        <Route 
          path="/reservations" 
          element={
            <ProtectedRoute>
              <Reservations />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/orders" 
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } 
        />

        {/* === PROTECTED STAFF ROUTES (Needs Token + Role Check) === */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
               {/* We keep the role check too for extra safety */}
               {userRole === 'staff' ? <AdminDashboard /> : <Navigate to="/" />}
            </ProtectedRoute>
          } 
        />
  
        <Route 
          path="/admin/rooms" 
          element={
            <ProtectedRoute>
               {userRole === 'staff' ? <AdminReservations /> : <Navigate to="/" />}
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin/services" 
          element={
            <ProtectedRoute>
               {userRole === 'staff' ? <Orders /> : <Navigate to="/" />}
            </ProtectedRoute>
          } 
        />

      </Routes>
    </Router>
  );
}

export default App;