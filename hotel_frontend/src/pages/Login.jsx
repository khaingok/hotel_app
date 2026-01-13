import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';
import axios from 'axios';

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // 1. Send the username/password to your Spring Boot Backend
      const response = await axios.post('/api/auth/login', credentials);
      
      // 2. Get the user data from the response (id, username, role)
      const user = response.data;
      
      // 3. Update the App state with the REAL role from the database
      onLogin(user.role); 
      
      alert(`Welcome back, ${user.username}!`);
      
      // 4. Redirect based on their role
      if (user.role === 'staff') {
        navigate('/admin');
      } else {
        navigate('/'); // Guests go to Home
      }

    } catch (error) {
      console.error("Login Error:", error);
      alert('Invalid Username or Password. Please try again.');
    }
  };

  return (
    <div className="login-container page-animation">
      <div className="login-card">
        <h2>🔐 Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          
          <div className="input-group">
            <label>Username</label>
            <input 
              type="text" 
              name="username" 
              placeholder="Enter your username"
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

          {/* New Link to Register Page */}
          <div style={{ marginTop: '15px', fontSize: '0.9rem' }}>
            <p>Don't have an account?</p>
            <Link to="/register" style={{ color: '#0056b3', fontWeight: 'bold' }}>
              Create an account
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}