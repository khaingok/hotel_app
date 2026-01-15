import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminReservations.css'; // Re-use the table styles

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="admin-container page-animation">
      <h2>🛎️ Service Orders</h2>
      
      {orders.length === 0 ? (
        <p>No active orders.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Reservation ID</th>
              <th>Guest Name</th> {/* We can see this because Order is linked to Reservation! */}
              <th>Service</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
                <tr key={order.id || index}>
                <td>#{order.id}</td>
                <td>#{order.reservation?.id || 'N/A'}</td> 
                <td><strong>{order.reservation?.guestName || 'Unknown'}</strong></td>
                <td>{order.serviceName}</td>
                <td>${order.price}</td>
    
                <td>
                    <span style={{
                        backgroundColor: order.status === 'Pending' ? '#ffc107' : '#28a745',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.9em'
                        }}>
                    {order.status || 'Ordered'}
                    </span>
                </td>
            </tr>
))}
          </tbody>
        </table>
      )}
    </div>
  );
}