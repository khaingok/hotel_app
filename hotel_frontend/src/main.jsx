import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios';

// 1. SETUP AXIOS INTERCEPTORS (Define these BEFORE rendering the App)

// Request Interceptor: Attach the token if it exists
axios.interceptors.request.use(request => {
  const token = localStorage.getItem('token');
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

// Response Interceptor: Catch errors
axios.interceptors.response.use(
  response => response,
  error => {
    // Check for BOTH 401 (Expired/Unauthorized) and 403 (Forbidden)
    if (error.response && (error.response.status === 403 || error.response.status === 401)) {
      
      // Optional: Only alert if it's not the login page itself (to avoid loops)
      if (window.location.pathname !== '/login') {
          alert("Session expired. Please login again.");
          
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          
          window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// 2. RENDER THE APP
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)