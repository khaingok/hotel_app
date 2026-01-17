import React from 'react';
import '../styles/Home.css';

export default function AdminDashboard() {
  return (
    <div className="home-container page-animation">
      <div className="hero-section" style={{ borderLeft: '5px solid #dc3545' }}>
        <h1>👨‍💼 Staff Dashboard</h1>
        <p>Welcome back, Manager.</p>
      </div>
    </div>
  );
}