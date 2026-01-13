import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

export default function Register() {
  const navigate = useNavigate();
  
  // 1. Remove 'role' from the initial state
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // We only send username and password. 
      // The Backend will automatically assign role = 'guest'
      await axios.post('/api/auth/register', formData);
      alert("Registration Successful! Please Login.");
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert("Registration failed. Username might be taken.");
    }
  };

  return (
    <div className="login-container page-animation">
      <div className="login-card">
        <h2>📝 Create Account</h2>
        <form onSubmit={handleRegister} className="login-form">
          
          <div className="input-group">
            <label>Username</label>
            <input 
              type="text" 
              name="username" 
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
              onChange={handleChange} 
              className="login-input" 
              required 
            />
          </div>

          <button type="submit" className="login-btn">Register</button>
          
          <p style={{marginTop: '15px'}}>
            Already have an account? <Link to="/login" style={{color: '#0056b3'}}>Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}