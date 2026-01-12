import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home-container page-animation">
      <div className="hero-section">
        <h1>Welcome to The Grand Hotel</h1>
        <p>Experience luxury and comfort in the heart of the city.</p>
        
        <Link to="/reservations">
          <button className="book-btn">Book Your Stay Now</button>
        </Link>
      </div>
    </div>
  );
}