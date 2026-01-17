import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

export default function Register() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      alert("⚠️ Password must be at least 8 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("⚠️ Passwords do not match!");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
        alert("⚠️ Please enter a valid email address.");
        return;
    }

    try {
      const payload = {
          name: formData.name,
          username: formData.email,
          password: formData.password
      };

      await axios.post('/api/auth/register', payload);
      alert("Registration Successful!");
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert("Registration failed.");
    }
  };

  return (
    <div className="login-container page-animation">
      <div className="login-card" style={{ maxWidth: '450px' }}>
        <h2>Create Account</h2>
        <form onSubmit={handleRegister} className="login-form">
          
          <div className="input-group">
            <label>Full Name</label>
            <input 
              type="text" 
              name="name" 
              placeholder="John Doe"
              onChange={handleChange} 
              className="login-input" 
              required 
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              name="email" 
              placeholder="john@example.com"
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
              minLength="8"
              required 
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input 
              type="password" 
              name="confirmPassword" 
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