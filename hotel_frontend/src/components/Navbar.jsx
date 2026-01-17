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

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    navigate('/profile');    
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const avatarInitial = userRole === 'staff' ? 'A' : 'U';

  return (
    <nav className="navbar">
      <h1 className="navbar-logo">
        <Link to={userRole === 'staff' ? "/admin" : "/"} style={{color: 'white', textDecoration: 'none'}}>
          🏨 Grand Hotel
        </Link>
      </h1>

      <ul className="navbar-menu">
        
        {!userRole && (
          <li>
             <Link to="/login" className="navbar-link" style={{ fontWeight: 'bold' }}>Login</Link>
          </li>
        )}

        {userRole && (
          <>
            {userRole === 'guest' && (
              <>
                <li><Link to="/" className="navbar-link">Home</Link></li>
                <li><Link to="/reservations" className="navbar-link">Book a Room</Link></li>
                <li><Link to="/orders" className="navbar-link">Services</Link></li>
              </>
            )}

            {userRole === 'staff' && (
              <>
                <li><Link to="/admin" className="navbar-link">Home</Link></li>
                <li><Link to="/admin/rooms" className="navbar-link">Room Management</Link></li>
                <li><Link to="/admin/services" className="navbar-link">Services Management</Link></li>
                <li><Link to="/admin/orders" className="navbar-link">Orders</Link></li>
              </>
            )}
            
            <li className="user-menu-container">
                <button className="avatar-btn" onClick={toggleDropdown}>
                  {avatarInitial}
                </button>

                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    
                    {userRole === 'guest' && (
                        <button onClick={handleProfileClick} className="dropdown-item">
                            👤 My Profile
                        </button>
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