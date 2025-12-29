import HomePage from "../pages/home";
import AdminPage from "../pages/admin";
import LoginPage from "../pages/login";
import { Routes, Route } from "react-router-dom";

function App() {
  
  return (
    <div className="w-full h-screen bg-red-600">
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/admin/*" element={<AdminPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        
      </Routes>
    </div>
  );
}

export default App
