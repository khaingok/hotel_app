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
import { jwtDecode } from "jwt-decode";

function App() {
const [userRole, setUserRole] = useState(localStorage.getItem('role'))
  const handleLogin = (role) => {
    localStorage.setItem('role', role);
    setUserRole(role);
  };

  const handleLogout = () => {
  localStorage.removeItem('role');
  localStorage.removeItem('token');
  setUserRole(null); 
};

useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Browser time in seconds
        const timeLeft = decoded.exp - currentTime;

        // 🕵️ SPY LOGS (Check Console!)
        console.log("--- TOKEN CHECK ---");
        console.log("Token Expiration (Backend):", decoded.exp);
        console.log("Browser Time (Frontend):   ", currentTime);
        console.log("Time Left (Seconds):       ", timeLeft);

        if (timeLeft <= 0) {
          console.error("❌ Token expired! Logging out.");
          handleLogout();
        } else {
          console.log("✅ Token Valid. Setting timer.");
          const timer = setTimeout(() => {
            handleLogout();
          }, timeLeft * 1000);
          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error("Token Decode Error:", error);
        handleLogout();
      }
    }
  }, [userRole]);

  return (
    <Router>
      <Navbar userRole={userRole} onLogout={handleLogout} />
      
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

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

        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
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