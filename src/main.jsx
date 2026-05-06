import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios' 

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403 && error.response.data.message === "User is blocked") {
      
      const user = JSON.parse(localStorage.getItem("user"));
      
      if (user) {
        user.isBlocked = true;
        user.blockedUntil = error.response.data.blockedUntil;
        
        localStorage.setItem("user", JSON.stringify(user));
        
        window.location.reload(); 
      }
    }
    return Promise.reject(error);
  }
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)