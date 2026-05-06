import { Link , Routes , Route } from "react-router-dom";
import logo from '/logo.png';
import { FaHome } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { IoMdPricetag } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import AdminProductsPage from "./admin/adminProductsPage.jsx";
import AddProductPage from "./admin/adminAddProductPage.jsx";
import AdminUpdateProductPage from "./admin/adminUpdateProductPage.jsx";
import AdminAddProductPage from "./admin/adminAddProductPage.jsx";
import AdminOrdersPage from "./admin/adminOrdersPage";
import { FaSignOutAlt } from "react-icons/fa";
import AdminUsersPage from "./admin/adminUsersPage.jsx";

export default function AdminPage(){

    function signout(){
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
    }

    return(
        <div className="w-full h-screen flex bg-accent overflow-hidden">
            <svg width="0" height="0" className="absolute">
                <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop stopColor="#E30B6F" offset="0%" />
                    <stop stopColor="#8a00c4" offset="100%" />
                </linearGradient>
            </svg>
            <div className="w-[300px] h-screen flex flex-col bg-accent text-secondary">
    
                <Link to="/" className="flex items-center gap-3 mt-4 ml-3 mb-2">
                    <img src={logo} alt="Admin Panel Logo" className="w-[60px] h-[60px] object-contain"/>
                    <span className="text-2xl font-bold text-white">Dawe Computers</span>
                </Link>

                <h1 className="text-3xl font-bold mb-4 border-b-4 p-3 border-white text-secondary">Admin Panel</h1>

                <Link className="group flex w-full text-xl font-bold p-[12px] text-secondary hover:bg-white transition-all gap-4 items-center" to="/">
                    <FaHome className="text-white group-hover:!fill-[url(#neonGradient)] transition-all duration-300" /> Home
                </Link>

                <Link className="group flex w-full text-xl font-bold p-[12px] text-secondary hover:bg-white transition-all gap-4 items-center" to="/admin/">
                    <FaShoppingBag className="text-white group-hover:!fill-[url(#neonGradient)] transition-all duration-300" /> Orders
                </Link>

                <Link className="group flex w-full text-xl font-bold p-[12px] text-secondary hover:bg-white transition-all gap-4 items-center" to="/admin/products">
                    <IoMdPricetag className="text-white group-hover:!fill-[url(#neonGradient)] transition-all duration-300" /> Products
                </Link>

                <Link className="group flex w-full text-xl font-bold p-[12px] text-secondary hover:bg-white transition-all gap-4 items-center" to="/admin/users">
                    <FaUser className="text-white group-hover:!fill-[url(#neonGradient)] transition-all duration-300" /> Users
                </Link>

                <div className="mt-auto mb-5">
                <Link onClick={signout} className="group flex w-full text-xl font-bold p-[12px] text-black hover:bg-white transition-all gap-4 items-center mt-auto mb-5" to="/login">
                    <FaSignOutAlt className="text-white group-hover:!fill-[url(#neonGradient)] transition-all duration-300" /> Sign Out
                </Link>
                </div>

            </div>
            <div className="w-[calc(100%-300px)] h-full border-accent border-6 rounded-2xl bg-secondary p-4 overflow-hidden">
                <Routes>
                    <Route path="/" element={<AdminOrdersPage/>}/>
                    <Route path="/products" element={<AdminProductsPage/>}/>
                    <Route path="/users" element={<AdminUsersPage/>}/>
                    <Route path="/add-product" element={<AdminAddProductPage/>}/>
                    <Route path="/update-product" element={<AdminUpdateProductPage/>}/>
                    
                </Routes>
            </div>
        </div>
    )
}