import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios';

axios.interceptors.request.use(request => {
  const token = localStorage.getItem('token');
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && (error.response.status === 403 || error.response.status === 401)) {
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)