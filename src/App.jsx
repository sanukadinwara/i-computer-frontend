import HomePage from "../pages/home";
import AdminPage from "../pages/admin";
import LoginPage from "../pages/login";
import Test from "../pages/test";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  
  return (
    <div className="w-full h-screen bg-red-600">
      <Toaster position="top-center"/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/admin/*" element={<AdminPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/test" element={<Test/>} />
        
      </Routes>
    </div>
  );
}

export default App
