import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Reservations.css';

export default function Reservations() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    roomType: 'Standard',
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loggedInName = localStorage.getItem('userName') || "Valued Guest";

    let pricePerNight = 100;
    if (formData.roomType === 'Deluxe') pricePerNight = 200;
    if (formData.roomType === 'Suite') pricePerNight = 500;

    const start = new Date(formData.checkInDate);
    const end = new Date(formData.checkOutDate);
    const nights = (end - start) / (1000 * 60 * 60 * 24);
    
    if (nights <= 0) {
      alert("Check-out date must be after check-in date!");
      return;
    }

    const payload = {
      ...formData,
      guestName: loggedInName,
      totalPrice: nights * pricePerNight
    };

    try {
      const response = await axios.post('/api/reservations', payload);
      alert('Reservation Confirmed! ID: ' + response.data.id);
      navigate('/'); 
    } catch (error) {
      console.error('Error booking room:', error);
      alert('Failed to book room. Is the Backend running?');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="reservation-container page-animation">
      <div className="reservation-card">
        <h2>📅 Book a Room</h2>
        
        <p style={{textAlign: 'center', color: '#666', marginBottom: '20px'}}>
          Booking as: <strong>{localStorage.getItem('userName')}</strong>
        </p>

        <form onSubmit={handleSubmit} className="reservation-form">
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
                min={today}
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
                min={formData.checkInDate || today} 
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
              max="5"
              value={formData.numberOfGuests} 
              onChange={handleChange} 
              className="form-input"
            />
          </div>

          <button type="submit" className="submit-btn">Confirm Booking</button>
        </form>
      </div>
    </div>
  );
}