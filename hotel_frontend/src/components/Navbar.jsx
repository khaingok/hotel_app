import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar({ userRole, onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/'); 
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-logo">🏨 Hotel Manager</h1>
      <ul className="navbar-menu">
        
        {/* --- GUEST LINKS (Only show if role is guest) --- */}
        {userRole === 'guest' && (
          <>
            <li><Link to="/" className="navbar-link">Home</Link></li>
            <li><Link to="/reservations" className="navbar-link">Book a Room</Link></li>
            <li><Link to="/orders" className="navbar-link">Services</Link></li>
            <li>
                <Link to="/login" className="navbar-link" style={{ fontWeight: 'bold' }}>
                    Staff Login
                </Link>
            </li>
          </>
        )}

        {/* --- STAFF LINKS (Only show if role is staff) --- */}
        {userRole === 'staff' && (
          <>
            <li><Link to="/admin" className="navbar-link">Dashboard</Link></li>
            <li><Link to="/admin/reservations" className="navbar-link">All Reservations</Link></li>
            <li>
                <button 
                    onClick={handleLogoutClick} 
                    className="navbar-link" 
                    style={{ background: 'none', border: '1px solid white', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer' }}
                >
                    Logout
                </button>
            </li>
          </>
        )}

      </ul>
    </nav>
  );
}