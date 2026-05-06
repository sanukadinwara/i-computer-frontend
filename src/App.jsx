import HomePage from "../pages/home";
import AdminPage from "../pages/admin";
import LoginPage from "../pages/login";
import Test from "../pages/test";
import { Routes, Route, Navigate } from "react-router-dom"; 
import { Toaster } from "react-hot-toast";
import RegisterPage from "../pages/register";
import ForgetPassword from "../pages/forgetPassword";
import { GoogleOAuthProvider } from '@react-oauth/google';
import BlockedPage from "../pages/blockedPage";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function AdminGuard({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {

  const location = useLocation();
  const [loading, setLoading] = useState(true); 
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const checkStatus = async () => {
      if (user && user.token) { 
        try {
          const res = await axios.get("http://localhost:5000/api/users/profile", {
            headers: { Authorization: `Bearer ${user.token}` }
          });

          if (user.isBlocked) {
              const updatedUser = { ...user, isBlocked: false };
              localStorage.setItem("user", JSON.stringify(updatedUser));
              setUser(updatedUser);
          }
        } catch (error) {
          if (error.response && error.response.status === 403 && error.response.data.message === "User is blocked") {
            const updatedUser = { 
              ...user, 
              isBlocked: true, 
              blockedUntil: error.response.data.blockedUntil 
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
          }
        }
      }
      setLoading(false);
    };

    checkStatus();
  }, [location.pathname]);

  if (loading) return null;

  if (user && user.isBlocked) {
    return <BlockedPage until={user.blockedUntil} setUser={setUser} />;
  } 

  return (
    <GoogleOAuthProvider clientId="117473923905-ng8k7dlvtjrtf2rvlp3mi1khiaeebd6k.apps.googleusercontent.com">
      <div className="w-full h-screen">
        <Toaster position="top-center"/>
        <Routes>
          <Route path="/*" element={<HomePage/>} />
          
          <Route path="/admin/*" element={
            <AdminGuard>
              <AdminPage/>
            </AdminGuard>
          } />
          
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/password-reset" element={<ForgetPassword/>} />
          <Route path="/test" element={<Test/>} />
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;