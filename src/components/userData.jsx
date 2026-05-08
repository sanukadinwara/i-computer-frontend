import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserData() {
    const [user, setUser] = useState(null);
    const [state, setState] = useState("me");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    let isAdmin = false;
    const rawToken = localStorage.getItem("token");
    
    if (rawToken) {
        try {
            const tokenData = JSON.parse(atob(rawToken.split('.')[1]));
            isAdmin = tokenData.role === "admin";
        } catch (e) {
            console.error("Token decode error", e);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        
        if (token != null) {
            axios.get(import.meta.env.VITE_API_URL + "/users/profile", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then((response) => {
                console.log(response.data);
                setUser(response.data); 
            }).catch((error) => {
                console.log("Profile Fetch Error:", error);
            });
        }
    }, []);

    return (
        <>
            {user == null ? (
                    <div className="w-[150px] h-[50px] flex justify-center items-center">
                        <Link to="/login" className="text-white hover:border-b-2 mr-1">Login</Link>
                        <span className="text-white">|</span>
                        <Link to="/register" className="text-white hover:border-b-2 ml-1">Register</Link>
                    </div>
                ) : (
                    <div className="relative flex items-center justify-center">
                        
                        <button 
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                            className="flex items-center gap-2 cursor-pointer focus:outline-none bg-primary/20 px-3 py-1 rounded-full hover:bg-primary/40 transition-all"
                        >
                            <img referrerPolicy="no-referrer" src={user.image} className="w-[40px] h-[40px] object-cover rounded-full border-accent"/>
                            <span className="text-white font-semibold">{user.firstName}</span>
                            <svg className={`w-4 h-4 text-white transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute bottom-full mb-2 lg:bottom-auto lg:top-full lg:mb-0 lg:mt-2 center-0 w-[180px] bg-white rounded-xl shadow-2xl overflow-hidden z-50 flex flex-col border border-gray-200">
                                {isAdmin && (
                                    <button onClick={() => window.location.href="/admin"} className="px-4 py-3 text-left text-secondary font-medium hover:bg-accent hover:text-white transition-colors cursor-pointer">
                                        Admin Panel
                                    </button>
                                )}
                                <button onClick={() => window.location.href="/my-orders"} className="px-4 py-3 text-left text-secondary font-medium hover:bg-accent hover:text-white transition-colors cursor-pointer">
                                    My Orders
                                </button>
                                <button onClick={() => window.location.href="/settings"} className="px-4 py-3 text-left text-secondary font-medium hover:bg-accent hover:text-white transition-colors cursor-pointer">
                                    Settings
                                </button>
                                <div className="w-full h-[1px] bg-gray-200"></div>
                                <button onClick={() => {
                                    localStorage.removeItem("token");
                                    window.location.href="/login";
                                }} className="px-4 py-3 text-left text-red-500 font-bold hover:bg-red-600 hover:text-white transition-colors cursor-pointer">
                                    Logout
                                </button>
                            </div>
                        )}
                        
                    </div>
                )
            }
        </>
    );
}