import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Reservations.css';

export default function Reservations() {
  const navigate = useNavigate();

  // 1. State to hold form data
  const [formData, setFormData] = useState({
    guestName: '',
    roomType: 'Standard', // Default value
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1,
  });

  // 2. Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // 3. Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop page from reloading

    // Simple price calculation (Mock logic for now)
    // In a real app, the backend should calculate this to prevent tampering
    const pricePerNight = formData.roomType === 'Deluxe' ? 200 : 100; 
    const start = new Date(formData.checkInDate);
    const end = new Date(formData.checkOutDate);
    const nights = (end - start) / (1000 * 60 * 60 * 24);
    
    // Safety check for invalid dates
    if (nights <= 0) {
      alert("Check-out date must be after check-in date!");
      return;
    }

    const payload = {
      ...formData,
      totalPrice: nights * pricePerNight
    };

    try {
      // The proxy in vite.config.js forwards '/api' to 'http://localhost:8080'
      const response = await axios.post('/api/reservations', payload);
      alert('Reservation Successful! ID: ' + response.data.id);
      navigate('/'); // Redirect to Home
    } catch (error) {
      console.error('Error booking room:', error);
      alert('Failed to book room. Is the Backend running?');
    }
  };

  return (
    <div className="reservation-container page-animation">
      <h2>📅 Book a Room</h2>
      <form onSubmit={handleSubmit} className="reservation-form">
        
        <div className="form-group">
          <label>Guest Name:</label>
          <input 
            type="text" 
            name="guestName" 
            value={formData.guestName} 
            onChange={handleChange} 
            required 
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Room Type:</label>
          <select 
            name="roomType" 
            value={formData.roomType} 
            onChange={handleChange}
            className="form-input"
          >
            <option value="Standard">Standard ($100/night)</option>
            <option value="Deluxe">Deluxe ($200/night)</option>
            <option value="Suite">Suite ($500/night)</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Check-in:</label>
            <input 
              type="date" 
              name="checkInDate" 
              value={formData.checkInDate} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Check-out:</label>
            <input 
              type="date" 
              name="checkOutDate" 
              value={formData.checkOutDate} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Guests:</label>
          <input 
            type="number" 
            name="numberOfGuests" 
            min="1" 
            value={formData.numberOfGuests} 
            onChange={handleChange} 
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-btn">Confirm Booking</button>
      </form>
    </div>
  );
}

