import { Link } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";
import UserData from "./userData";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuPanelLeftClose } from "react-icons/lu";

export default function Header(){

    const [isOpen, setIsOpen] = useState(false)

    return(
        <header className="w-full sticky top-0 bg-accent h-[100px] flex justify-center items-center relative z-[100]">
            <div className="h-full w-full lg:w-auto flex items-center absolute lg:left-5">
                <GiHamburgerMenu onClick={()=> {setIsOpen(true)}} size={30} color="white" className="mr-8 lg:hidden cursor-pointer ml-3"/>
                <img src="/logo.png" alt="logo" className="h-[100px] lg:h-[140px] object-contain" />
                <h1 className="text-white text-md lg:text-3xl font-bold ml-1">Dawe Computers</h1>
            </div>
            
            <div className="h-full lg:flex items-center text-xl font-semibold hidden">
                <Link to="/" className="text-white mx-5 hover:border-b-2 hover:border-white pb-1 transition-all">Home</Link>
                <Link to="/about" className="text-white mx-5 hover:border-b-2 hover:border-white pb-1 transition-all">About</Link>
                <Link to="/products" className="text-white mx-5 hover:border-b-2 hover:border-white pb-1 transition-all">Products</Link>
                <Link to="/contact" className="text-white mx-5 hover:border-b-2 hover:border-white pb-1 transition-all">Contact</Link>
            </div>
            <div className="absolute right-10 hidden lg:flex h-full items-center gap-2 text-lg">
                <Link to="/cart" className="cursor-pointer hover:scale-110 transition-transform"><BiShoppingBag size={35} color="white"/></Link>
                <UserData/>
            </div>
            {isOpen&&<div className="fixed bg-black/50 w-full h-screen top-0 left-0">
                <div className="w-[300px] h-full bg-white flex flex-col">
                    <div className="h-[100px] bg-accent w-full flex justify-start items-center px-5">
                        <img src="/logo.png" alt="Logo" className="h-[80px] lg:h-[100px]" />
                        <h1 className="text-white text-md lg:text-2xl font-bold ml-2">Dawe Computers</h1>
                        <LuPanelLeftClose onClick={()=> {setIsOpen(false)}} size={20} color="white" className="ml-auto cursor-pointer"/>
                    </div>
                    <div className="flex flex-col mt-5">
                        <a href="/" className="text-secondary font-semibold py-3 px-5 hover:bg-secondary/10">Home</a>
                        <a href="/about" className="text-secondary font-semibold py-3 px-5 hover:bg-secondary/10">About</a>
                        <a href="/products" className="text-secondary font-semibold py-3 px-5 hover:bg-secondary/10">Products</a>
                        <a href="/contact" className="text-secondary font-semibold py-3 px-5 hover:bg-secondary/10">Contact</a>
                        <a href="/cart" className="text-secondary font-semibold py-3 px-5 hover:bg-secondary/10">Cart</a>
                        <div className="border-t border-secondary/20 my-5 bg-accent absolute bottom-0 w-[300px]">
                            <UserData/>
                        </div>
                    </div>
                </div>
            </div>}

        </header>
    )
}