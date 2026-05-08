import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import getFormattedPrice from "../src/utils/price-format";
import { BiMinus, BiPlus } from "react-icons/bi"
import { getCart, getCartTotal, addToCart } from "../src/utils/cart";

export default function Cart(){
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const token = localStorage.getItem("token");
    const userEmail = user?.email;
    const [cart, setCart] = useState(getCart(userEmail));

    useEffect(() => {
        if (userEmail) {
            setCart(getCart(userEmail));
        }
    }, [userEmail]);

    if (!token || !userEmail) {
        return (
            <div className="p-10 text-center text-lg"><p>Please login to view your cart.</p>
                <Link to="/login" className="text-accent underline">Login</Link>
            </div>
        )
    }

    return(
        <div className="w-full h-[calc(100vh-100px)]">
            
            <div className="w-full flex justify-center items-center flex-col gap-4 p-5">
                {cart.map((cartItem, index) => {
                    return (
                        <div key={index} className="w-full lg:w-[600px] lg:h-[150px] bg-white flex flex-row rounded-lg shadow overflow-hidden items-center">
                            <img className="h-[150px] aspect-square object-cover" src={cartItem.product.image[0]} alt={cartItem.product.name} />

                            <div className="flex-1 h-[150px] flex flex-col justify-between py-4 pr-4 ml-3 min-w-0">
                                <div>
                                    <h1 className="text-md text-gray-500 font-medium whitespace-nowrap">{cartItem.product.brand} {cartItem.product.model}</h1>
                                    <h2 className="text-xl font-bold leading-tight mt-1 whitespace-nowrap">{cartItem.product.name}</h2>
                                
                                <div className="lg:w-[210px] h-[50px] border border-accent rounded-full flex overflow-hidden hidden justify-center lg:justify-between">
                                    <button 
                                        onClick={() => {
                                            addToCart(cartItem.product, -1, userEmail)
                                            setCart(cart.map(item => 
                                                item.product.productId === cartItem.product.productId 
                                                ? { ...item, qty: item.qty - 1 } 
                                                : item
                                            ).filter(item => item.qty > 0));
                                        }}
                                        className="lg:w-[70px] h-full flex justify-center items-center text-2xl font-bold text-gray-700 hover:bg-accent cursor-pointer">
                                        <BiMinus />
                                    </button>
                                    <span className="lg:w-[70px] h-full flex justify-center items-center text-lg font-bold text-gray-700">
                                        {cartItem.qty}
                                    </span>
                                    <button 
                                        onClick={() => {
                                            addToCart(cartItem.product, 1, userEmail)
                                            setCart(cart.map(item => 
                                            item.product.productId === cartItem.product.productId 
                                            ? { ...item, qty: item.qty + 1 } 
                                            : item
                                        ));
                                        }}
                                        className="lg:w-[70px] h-full flex justify-center items-center text-2xl font-bold text-gray-700 hover:bg-accent cursor-pointer">
                                        <BiPlus />
                                    </button>
                                </div>
                                </div>
                            </div>

                            <div className="w-[170px] h-full flex flex-col justify-end items-end pr-4 pt-22">
                                {
                                    cartItem.product.labelledPrice > cartItem.product.price && (
                                        <span className="text-sm text-gray-500 line-through">
                                            {getFormattedPrice(cartItem.product.labelledPrice)}
                                        </span>
                                    )
                                }
                                <span className="text-lg text-secondary font-bold">
                                    {getFormattedPrice(cartItem.product.price * cartItem.qty)}
                                </span>
                            </div>
                        </div>
                    )
                })}

                <div className="bg-white lg:w-[600px] w-full h-[100px] sticky bottom-0 rounded-xl shadow flex items-center">
                    <Link state={{cart}} to="/checkout" className="bg-accent text-white px-4 py-2 rounded ml-5 hover:bg-accent/80">
                        Checkout
                    </Link>
                    
                    <span className="text-2xl font-bold text-secondary absolute right-5">
                        {getFormattedPrice(getCartTotal(cart))}
                    </span>
                </div>
            </div>
        </div>
    )
}