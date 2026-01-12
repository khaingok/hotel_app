import React from 'react';
import '../styles/Home.css';

export default function AdminDashboard() {
  return (
    <div className="home-container page-animation">
      <div className="hero-section" style={{ borderLeft: '5px solid #dc3545' }}>
        <h1>👨‍💼 Staff Dashboard</h1>
        <p>Welcome back, Manager.</p>
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button className="book-btn" style={{ backgroundColor: '#6c757d' }}>View All Bookings</button>
            <button className="book-btn" style={{ backgroundColor: '#6c757d' }}>Manage Rooms</button>
        </div>
      </div>
    </div>
  );
}