import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Login.css';

export default function Profile() {
  const [user, setUser] = useState({
    id: null,
    username: '',
    name: '',
    role: ''
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUsername = localStorage.getItem('uid');
    
    if (!currentUsername) {
      alert("Please log in to view profile.");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/users/search?username=${currentUsername}`);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!user.id) {
        alert("Cannot save: User profile not found.");
        return;
    }

    try {
      await axios.put(`/api/users/${user.id}`, { name: user.name });
      
      localStorage.setItem('userName', user.name);
      
      alert("✅ Name updated successfully!");
      window.location.reload(); 
    } catch (error) {
      alert("Failed to update profile.");
    }
  };

  if (loading) return <div className="login-container" style={{color:'white'}}>Loading...</div>;

  return (
    <div className="login-container page-animation">
      <div className="login-card">
        <h2>My Profile</h2>
        <form onSubmit={handleUpdate} className="login-form">
          
          <div className="input-group">
            <label>Username (Locked)</label>
            <input 
              type="text" 
              value={user.username} 
              disabled 
              className="login-input"
              style={{ backgroundColor: '#e9ecef', cursor: 'not-allowed' }}
            />
          </div>

          <div className="input-group">
            <label>Role</label>
            <input 
              type="text" 
              value={user.role} 
              disabled 
              className="login-input"
              style={{ backgroundColor: '#e9ecef', cursor: 'not-allowed' }}
            />
          </div>

          <div className="input-group">
            <label>Full Name</label>
            <input 
              type="text" 
              value={user.name} 
              onChange={(e) => setUser({...user, name: e.target.value})}
              className="login-input"
              required 
            />
          </div>

          <button type="submit" className="login-btn">Save Changes</button>
        </form>
      </div>
    </div>
  );
}