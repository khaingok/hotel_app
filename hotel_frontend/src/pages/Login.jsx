import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // --- THIS IS THE ONLY FUNCTION YOU NEED ---
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Check credentials
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      
      // 1. IMPORTANT: Tell App.jsx we are now Staff
      onLogin('staff'); 
      
      // 2. Redirect to the Admin Dashboard
      navigate('/admin');

    } else {
      alert('Invalid Credentials! (Try: admin / admin123)');
    }
  };

  return (
    <div className="login-container page-animation">
      <div className="login-card">
        <h2>🔐 Staff Login</h2>
        {/* Ensure this points to the function above */}
        <form onSubmit={handleLogin} className="login-form">
          
          <div className="input-group">
            <label>Username</label>
            <input 
              type="text" 
              name="username" 
              placeholder="e.g. admin"
              value={credentials.username}
              onChange={handleChange}
              className="login-input"
              required 
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Enter password"
              value={credentials.password}
              onChange={handleChange}
              className="login-input"
              required 
            />
          </div>

          <button type="submit" className="login-btn">Log In</button>
        </form>
      </div>
    </div>
  );
}