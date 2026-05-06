import { Route, Routes } from "react-router-dom";
import Header from "../src/components/header";
import ProductPage from "./productPage";
import Overview from "./overview";
import Checkout from "./checkout";
import Cart from "./cart";
import MyOrdersPage from "../src/components/myOrders";
import SettingsPage from "./settings";
import AboutPage from "./aboutPage";
import ContactPage from "./contactPage";

export default function HomePage(){
    return(
        <div className="w-full h-screen overflow-y-scroll">
            <Header/>
            <Routes>
                <Route path="/" element={<div>Home Page Content</div>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/contact" element={<ContactPage/>}/>
                <Route path="/products" element={<ProductPage/>}/>
                <Route path="/cart" element={<Cart/>} />
                <Route path="/overview/:productId" element={<Overview/>}/>
                <Route path="/checkout" element={<Checkout/>} />
                <Route path="/my-orders" element={<MyOrdersPage/>} />
                <Route path="/settings" element={<SettingsPage/>} />
                <Route path="/*" element={<div>404 Not Found</div>}/>
            </Routes>
        </div>
    )
}