import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Orders.css';

export default function Orders() {
  const [reservationId, setReservationId] = useState('');
  const [activeReservation, setActiveReservation] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);

  // Hardcoded Menu for the MVP (In a real app, this comes from the database)
  const menuItems = [
    { name: 'Room Service: Breakfast', price: 20.00 },
    { name: 'Room Service: Pizza', price: 15.00 },
    { name: 'Spa: Full Body Massage', price: 80.00 },
    { name: 'Laundry: Express', price: 25.00 },
    { name: 'Minibar: Champagne', price: 50.00 },
  ];

  // 1. "Log in" to the room
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Check if reservation exists
      const res = await axios.get(`/api/reservations/${reservationId}`);
      setActiveReservation(res.data);
      
      // Load previous orders for this room
      fetchOrders(reservationId);
    } catch (error) {
      alert('Reservation not found! Please check ID.');
      setActiveReservation(null);
    }
  };

  const fetchOrders = async (id) => {
    try {
      const res = await axios.get(`/api/orders/reservation/${id}`);
      setOrderHistory(res.data);
    } catch (error) {
      console.error("Could not load orders");
    }
  };

  // 2. Place a new Order
  const handleOrder = async (item) => {
    if (!confirm(`Order ${item.name} for $${item.price}?`)) return;

    try {
      const payload = {
        serviceName: item.name,
        price: item.price
      };

      // POST /api/orders?reservationId=1
      await axios.post(`/api/orders?reservationId=${reservationId}`, payload);
      
      alert('Order Placed!');
      // Refresh the list to show the new item
      fetchOrders(reservationId);
    } catch (error) {
      alert('Failed to place order.');
    }
  };

  return (
    <div className="orders-container page-animation">
      <h2>🍽️ Hotel Services & Ordering</h2>

      {!activeReservation ? (
        <div className="login-box">
          <p>Please enter your Reservation ID to access room services.</p>
          <form onSubmit={handleLogin} className="login-form">
            <input 
              type="number" 
              placeholder="Enter ID (e.g., 1)" 
              value={reservationId}
              onChange={(e) => setReservationId(e.target.value)}
              className="login-input"
              required
            />
            <button type="submit" className="login-btn">Access Room</button>
          </form>
        </div>
      ) : (
        <div>
          <div className="dashboard-header">
            <h3>Welcome, {activeReservation.guestName}</h3>
            <span className="room-badge">Room: {activeReservation.roomType}</span>
            <button onClick={() => setActiveReservation(null)} className="logout-btn">Exit</button>
          </div>

          <div className="orders-grid">
            {/* LEFT: MENU */}
            <div className="card">
              <h3>🛎️ Service Menu</h3>
              <ul className="menu-list">
                {menuItems.map((item, index) => (
                  <li key={index} className="menu-item">
                    <span>{item.name}</span>
                    <div>
                      <span className="item-price">${item.price}</span>
                      <button onClick={() => handleOrder(item)} className="order-btn">
                        Order
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT: BILL */}
            <div className="card">
              <h3>🧾 Current Bill</h3>
              {orderHistory.length === 0 ? (
                <p>No extra services ordered yet.</p>
              ) : (
                <ul className="history-list">
                  {orderHistory.map(order => (
                    <li key={order.id} className="history-item">
                      <span>{order.serviceName}</span>
                      <span>${order.price.toFixed(2)}</span>
                    </li>
                  ))}
                  <li className="total-row">
                    <strong>Total Extras:</strong>
                    <strong>
                      ${orderHistory.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                    </strong>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
