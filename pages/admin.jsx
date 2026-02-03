import { Link , Routes , Route } from "react-router-dom";
import logo from '/logo2.png';
import { FaHome } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { IoMdPricetag } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import AdminProductsPage from "./admin/adminProductsPage.jsx";
import AddProductPage from "./admin/adminAddProductPage.jsx";
import AdminUpdateProductPage from "./admin/adminUpdateProductPage.jsx";
import AdminAddProductPage from "./admin/adminAddProductPage.jsx";

export default function AdminPage(){
    return(
        <div className="w-full h-screen flex bg-accent overflow-y-scroll">
            <div className="w-[300px] h-screen flex flex-col bg-accent text-secondary">
                <Link to="/">
                <img src={logo} alt="Admin Panel Logo" className="w-25 h-25 my-0 "/>
                </Link>
                <h1 className="text-3xl font-bold b-5 border-b-5 p-2 border-white">Admin Panel</h1>
                <Link className="flex w-full text-xl p-[7px] hover:bg-white hover:shadow-3xl gap-3 items-center" to="/"><FaHome />Home</Link>
                <Link className="flex w-full text-xl p-[7px] hover:bg-white hover:shadow-3xl gap-3 items-center" to="/admin/"><FaShoppingBag />Orders</Link>
                <Link className="flex w-full text-xl p-[7px] hover:bg-white hover:shadow-3xl gap-3 items-center" to="/admin/products"><IoMdPricetag />Products</Link>
                <Link className="flex w-full text-xl p-[7px] hover:bg-white hover:shadow-3xl gap-3 items-center" to="/admin/users"><FaUser />Users</Link>
            </div>
            <div className="w-[calc(100%-300px)] h-full border-accent border-6 rounded-2xl bg-secondary p-4">
                <Routes>
                    <Route path="/" element={<h1>Orders Page</h1>}/>
                    <Route path="/products" element={<AdminProductsPage/>}/>
                    <Route path="/users" element={<h1>Users Page</h1>}/>
                    <Route path="/add-product" element={<AdminAddProductPage/>}/>
                    <Route path="/update-product" element={<AdminUpdateProductPage/>}/>
                    
                </Routes>
            </div>
        </div>
    )
}