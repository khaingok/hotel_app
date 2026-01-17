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
      const response = await axios.post('/api/auth/login', credentials);
      
      const data = response.data;

      localStorage.setItem('token', data.token);

      localStorage.setItem('userName', data.name);

      localStorage.setItem('uid', credentials.username);
      
      onLogin(data.role); 
      
      alert(`Welcome back, ${data.name}!`);
      
      if (data.role === 'staff') {
        navigate('/admin');
      } else {
        navigate('/');
      }

    } catch (error) {
      console.error("Login Error:", error);
      alert('Invalid Username or Password. Please try again.');
    }
  };

    const handleLogout = () => {
      localStorage.removeItem('role');
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      setUserRole(null);
  };

  return (
    <div className="login-container page-animation">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          
          <div className="input-group">
            <label>Email</label>
            <input 
              type="text" 
              name="username" 
              placeholder="Enter your email"
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