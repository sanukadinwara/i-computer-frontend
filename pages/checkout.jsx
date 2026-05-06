import { useState } from "react"
import { BiMinus, BiPlus } from "react-icons/bi"
import { useLocation, useNavigate } from "react-router-dom" 
import getFormattedPrice from "../src/utils/price-format";
import axios from "axios"
import { getCartTotal, getCart, addToCart } from "../src/utils/cart";
import CheckOutDetailsModal from "../src/components/checkoutDetailsModal";
import toast from "react-hot-toast";

export default function Checkout(){
    const location = useLocation();
    const [cart, setCart] = useState(location.state?.cart || location.state?.items || []);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phone, setPhone] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));
    const loggedInEmail = user?.email;

    const navigate = useNavigate();

    if(location.state == null){
        navigate("/products");
    }

    async function placeOrder(){
        const token = localStorage.getItem("token");

        const order = {
            items: [],
            firstName: firstName,
            lastName: lastName,
            email: email,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            city: city,
            postalCode: postalCode,
            phone: phone,
        }
        cart.forEach(
            (item)=>{
                order.items.push({
                    productId : item.product.productId,
                    qty : item.qty,
                    name : item.product.name,
                    price : item.product.price,
                    image : Array.isArray(item.product.image) ? item.product.image[0] : item.product.image 
                })
            }
        )

        console.log(order)

        try{
            await axios.post(import.meta.env.VITE_API_URL + "/orders" , order,
            {
                headers: { 
                    Authorization: `Bearer ${token}` 
                }
            })

        toast.success("Order placed successfully!"); 
        setCart([]); 
        localStorage.removeItem(`cart_${loggedInEmail}`);

        navigate("/");
        console.log("Order success!");
        }catch(err){
            console.log("Full Error:", err.response?.data); 
    alert(err.response?.data?.message || "Check Console for Errors");
        }
    }

    return(
        <div className="w-full h-[calc(100vh-100px)]">
            <div className="w-full flex justify-center items-center flex-col gap-4 p-5">
                
                {cart.map((cartItem, index) => {
                    console.log("Product Data:", cartItem.product);
                    return(
                        <div key={index} className="lg:w-[600px] w-full lg:h-[150px] bg-white flex flex-row rounded-lg shadow overflow-hidden mb-4">
                        <img className="h-[150px] aspect-square object-cover" src={Array.isArray(cartItem.product.image) ? cartItem.product.image[0] : cartItem.product.image} alt={cartItem.product.name}/>
                            
                            <div className="flex-1 flex flex-col justify-center text-left ml-3">
                                <p className="text-sm text-gray-500 font-medium mt-2">
                                    {(cartItem.product.brand || "Generic")} | {(cartItem.product.model || "Standard")}
                                </p>
                                <h2 className="text-xl font-bold leading-tight mt-1">{cartItem.product.name}</h2>
                                
                                <div className="lg:w-[210px] h-[50px] border border-accent rounded-full flex overflow-hidden justify-center mt-auto mb-2">
                                    <button 
                                        onClick={() => {
                                            addToCart(cartItem.product, -1, loggedInEmail); 
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
                                            addToCart(cartItem.product, 1, loggedInEmail);
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

                            <div className="w-[170px] h-full flex flex-col justify-center items-end pr-2">
                                {
                                    cartItem.product.labelledPrice > cartItem.product.price && (
                                        <span className="text-sm text-gray-500 line-through">
                                            {getFormattedPrice(cartItem.product.labelledPrice)}
                                        </span>
                                    )
                                }
                                <span className="text-sm text-secondary font-semibold">
                                    {getFormattedPrice(cartItem.product.price)}
                                </span>
                                <span className="text-lg text-secondary font-bold">
                                    {getFormattedPrice(cartItem.product.price * cartItem.qty)}
                                </span>
                            </div>
                        </div>
                    )
                })}

                <div className="bg-white lg:w-[600px] w-full h-[100px] sticky bottom-0 rounded-xl shadow flex items-center">
                    <CheckOutDetailsModal 
                        cart={cart} 
                        placeOrder={placeOrder}
                        firstName={firstName} lastName={lastName} email={email}
                        addressLine1={addressLine1} addressLine2={addressLine2}
                        city={city} postalCode={postalCode} phone={phone}
                        setFirstName={setFirstName} setLastName={setLastName} setEmail={setEmail}
                        setAddressLine1={setAddressLine1} setAddressLine2={setAddressLine2}
                        setCity={setCity} setPostalCode={setPostalCode} setPhone={setPhone}
                    />
                    <span className="text-2xl font-bold text-secondary absolute right-5 ">
                        {getFormattedPrice(getCartTotal(cart))}
                    </span>
                </div>
                
            </div>
        </div>
    )
}