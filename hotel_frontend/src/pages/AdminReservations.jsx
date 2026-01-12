import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminReservations.css';

export default function AdminReservations() {
  const [reservations, setReservations] = useState([]);

  // 1. Fetch Data on Page Load
  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      const result = await axios.get('/api/reservations');
      setReservations(result.data);
    } catch (error) {
      console.error("Error loading reservations:", error);
    }
  };

  // 2. Handle Delete (Cancel Reservation)
  const handleDelete = async (id) => {
    if(window.confirm(`Are you sure you want to cancel reservation #${id}?`)) {
        try {
            await axios.delete(`/api/reservations/${id}`);
            loadReservations(); // Refresh list after delete
        } catch (error) {
            alert("Failed to delete reservation.");
        }
    }
  };

  return (
    <div className="admin-container page-animation">
      <h2>📋 All Reservations</h2>
      
      {reservations.length === 0 ? (
        <p>No reservations found in the database.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Guest Name</th>
              <th>Room</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res) => (
              <tr key={res.id}>
                <td>#{res.id}</td>
                <td>{res.guestName}</td>
                <td>{res.roomType}</td>
                <td>{res.checkInDate}</td>
                <td>{res.checkOutDate}</td>
                <td>${res.totalPrice}</td>
                <td>
                  <button 
                    className="action-btn"
                    onClick={() => handleDelete(res.id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}