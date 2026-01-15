import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar({ userRole, onLogout }) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    onLogout();
    navigate('/login'); 
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Helper to determine the initial in the avatar (G for Guest, A for Admin)
  const avatarInitial = userRole === 'staff' ? 'A' : 'U';

  return (
    <nav className="navbar">
      {/* Logo redirects based on Role */}
      <h1 className="navbar-logo">
        <Link to={userRole === 'staff' ? "/admin" : "/"} style={{color: 'white', textDecoration: 'none'}}>
          🏨 Grand Hotel
        </Link>
      </h1>

      <ul className="navbar-menu">
        
        {/* === 1. VISITOR VIEW (Not Logged In) === */}
        {!userRole && (
          <li>
             <Link to="/login" className="navbar-link" style={{ fontWeight: 'bold' }}>Login</Link>
          </li>
        )}

        {/* === 2. LOGGED IN VIEWS (Both Guest & Staff) === */}
        {userRole && (
          <>
            {/* Links for NORMAL GUESTS */}
            {userRole === 'guest' && (
              <>
                <li><Link to="/" className="navbar-link">Home</Link></li>
                <li><Link to="/reservations" className="navbar-link">Book a Room</Link></li>
                <li><Link to="/orders" className="navbar-link">Services</Link></li>
              </>
            )}

            {/* Links for STAFF */}
            {userRole === 'staff' && (
              <>
                <li><Link to="/admin" className="navbar-link">Home</Link></li>
                <li><Link to="/admin/rooms" className="navbar-link">Room Management</Link></li>
                <li><Link to="/admin/services" className="navbar-link">Services Management</Link></li>
              </>
            )}
            
            {/* SHARED AVATAR DROPDOWN (For both roles) */}
            <li className="user-menu-container">
                <button className="avatar-btn" onClick={toggleDropdown}>
                  {avatarInitial}
                </button>

                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    
                    {userRole === 'guest' && (
                       <button className="dropdown-item">👤 My Profile</button>
                    )}

                    <button onClick={handleLogoutClick} className="dropdown-item">
                      🚪 Logout
                    </button>
                  </div>
                )}
            </li>
          </>
        )}

      </ul>
    </nav>
  );
}