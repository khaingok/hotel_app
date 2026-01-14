import { jwtDecode } from "jwt-decode";

export const isTokenValid = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds

    // Check if token is expired
    if (decoded.exp < currentTime) {
      // Token is expired! Clean up.
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      return false;
    }
    
    return true; // Token is valid
  } catch (error) {
    return false; // Token is garbage
  }
};