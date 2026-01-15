import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminReservations.css';

export default function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  
  // State to track which row is being edited
  const [editingId, setEditingId] = useState(null);
  
  // State to hold the temporary data while editing
  const [editFormData, setEditFormData] = useState({
    guestName: '',
    roomType: '',
    checkInDate: '',
    checkOutDate: '',
    totalPrice: 0
  });

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

  // --- 🧠 NEW: Helper function to calculate price ---
  const calculatePrice = (roomType, checkIn, checkOut) => {
    // 1. Define Rates (Must match your booking logic)
    let rate = 100; // Standard
    if (roomType === 'Deluxe') rate = 200;
    if (roomType === 'Suite') rate = 500;

    // 2. Parse Dates
    const start = new Date(checkIn);
    const end = new Date(checkOut);

    // 3. Calculate Nights
    if (!checkIn || !checkOut || isNaN(start) || isNaN(end)) return 0;
    
    const timeDiff = end - start;
    const nights = timeDiff / (1000 * 60 * 60 * 24);

    // 4. Return Total (ensure non-negative)
    return nights > 0 ? nights * rate : 0;
  };

  // 1. Start Editing: Turn the row into input boxes
  const handleEditClick = (reservation) => {
    setEditingId(reservation.id);
    setEditFormData({ ...reservation }); // Copy current data to form
  };

  // 2. Handle Input Changes & Auto-Update Price
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    
    // Create a temporary copy of the form with the new value applied
    const nextFormData = {
      ...editFormData,
      [name]: value
    };

    // If the changed field affects price, recalculate immediately
    if (name === 'roomType' || name === 'checkInDate' || name === 'checkOutDate') {
        const newPrice = calculatePrice(
            nextFormData.roomType, 
            nextFormData.checkInDate, 
            nextFormData.checkOutDate
        );
        nextFormData.totalPrice = newPrice;
    }

    // Update state
    setEditFormData(nextFormData);
  };

  // 3. Save Changes: Send PUT request
  const handleSave = async (id) => {
    try {
      await axios.put(`/api/reservations/${id}`, editFormData);
      
      setEditingId(null); // Exit edit mode
      loadReservations(); // Refresh data
      alert("Reservation updated successfully!");
    } catch (error) {
      alert("Failed to update reservation.");
    }
  };

  // 4. Cancel Editing
  const handleCancel = () => {
    setEditingId(null);
  };

  // 5. Handle Delete
  const handleDelete = async (id) => {
    if(window.confirm(`Are you sure you want to cancel reservation #${id}?`)) {
        try {
            await axios.delete(`/api/reservations/${id}`);
            loadReservations();
        } catch (error) {
            alert("Failed to delete reservation.");
        }
    }
  };

  return (
    <div className="admin-container page-animation">
      <h2>📋 All Reservations</h2>
      
      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Guest Name</th>
              <th>Room</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res) => (
              <tr key={res.id}>
                
                {/* === CONDITIONAL RENDERING === */}
                
                {editingId === res.id ? (
                  // --- EDIT MODE ---
                  <>
                    <td>#{res.id}</td>
                    <td>
                      <input 
                        type="text" 
                        name="guestName" 
                        value={editFormData.guestName} 
                        onChange={handleEditChange}
                        className="edit-input"
                      />
                    </td>
                    <td>
                      <select 
                        name="roomType" 
                        value={editFormData.roomType} 
                        onChange={handleEditChange}
                        className="edit-input"
                      >
                         <option value="Standard">Standard</option>
                         <option value="Deluxe">Deluxe</option>
                         <option value="Suite">Suite</option>
                      </select>
                    </td>
                    <td>
                      <input 
                        type="date" 
                        name="checkInDate" 
                        value={editFormData.checkInDate} 
                        onChange={handleEditChange}
                        className="edit-input"
                      />
                    </td>
                    <td>
                      <input 
                        type="date" 
                        name="checkOutDate" 
                        value={editFormData.checkOutDate} 
                        onChange={handleEditChange}
                        className="edit-input"
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        name="totalPrice" 
                        value={editFormData.totalPrice} 
                        onChange={handleEditChange}
                        className="edit-input"
                        style={{width: '70px', backgroundColor: '#eee'}}
                        readOnly // Optional: Prevent manual price editing to force auto-calc
                      />
                    </td>
                    <td>
                      <button onClick={() => handleSave(res.id)} className="save-btn">💾 Save</button>
                      <button onClick={handleCancel} className="cancel-btn">❌</button>
                    </td>
                  </>
                ) : (
                  // --- VIEW MODE ---
                  <>
                    <td>#{res.id}</td>
                    <td><strong>{res.guestName}</strong></td>
                    <td>{res.roomType}</td>
                    <td>{res.checkInDate}</td>
                    <td>{res.checkOutDate}</td>
                    <td>${res.totalPrice}</td>
                    <td>
                      <button 
                        onClick={() => handleEditClick(res)} 
                        className="edit-btn"
                        style={{marginRight: '5px', backgroundColor: '#ffc107', border: 'none', padding: '5px', cursor: 'pointer', borderRadius: '4px'}}
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDelete(res.id)}
                        className="delete-btn"
                        style={{backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px', cursor: 'pointer', borderRadius: '4px'}}
                      >
                        🗑️
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}