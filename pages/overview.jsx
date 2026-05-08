import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom"
import axios from "axios";
import LoadingAnimation from "../src/components/LoadingAnimation";
import ImageSlideShow from "../src/components/imageSlideShow";
import { Link } from "react-router-dom";
import ProductReviews from "../src/components/productReviews";
import { addToCart } from "../src/utils/cart";

export default function Overview(){
    const params = useParams();
    console.log(params);

    const [product , setProduct] = useState(null);
    const [user, setUser] = useState(null);

    const getFormattedPrice = (price) => {
        if (!price) return "Rs. 0"; 
        return "Rs. " + price.toLocaleString();
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user"); 
        
        if (savedUser) {
            setUser(JSON.parse(savedUser)); 
        } else if (token) {
            setUser({ role: "customer" });
        }

        axios.get( import.meta.env.VITE_API_URL + "/products/" + params.productId ).then(
            (response)=>{
                setProduct(response.data);
            }).catch((err) => {
                console.log("Error fetching product:", err);
            });

    }, [params.productId]);

    return(
        <div className="w-full lg:min-h-[calc(100vh-100px)] flex justify-center items-start pt-5 lg:pt-10">
            {
                product==null?<LoadingAnimation/>:
                <div className="w-full flex flex-col lg:flex-row bg-primary relative z-0">
                    <h1 className="text-3xl hidden lg:block font-bold mb-4 p-4 lg:hidden">{product.name}
                            <span>
                                {
                                    product.altNames.map((altName, index)=>{
                                        return(
                                            <span key={index} className=" text-gray-500 font-medium">| {altName} </span>
                                        )
                                    })
                                }
                            </span>
                        </h1>
                    <div className="w-full p-4 lg:p-0 lg:w-[50%] lg:h-full flex justify-center items-center">
                        <ImageSlideShow images={product.image}/>
                    </div>
                    <div className="w-full lg:w-[50%] h-full p-5 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-8">
                            <h1 className="text-5xl font-medium">
                                <span>{product.brand || ""}</span>
                                <span> - </span>
                                <span>{product.model || ""}</span>
                            </h1>

                            <span className="text-3xl font-bold text-secondary/70">
                                {product.name}
                            </span>
                        </div>

                        {product.altNames && product.altNames.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-8">
                                {product.altNames.map((altName, index) => (
                                    <span 
                                        key={index} 
                                        className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full border border-gray-200"
                                    >
                                        {altName}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="mb-6 flex items-center gap-4">
                            
                            <span className="text-4xl font-bold text-accent">
                                {getFormattedPrice(product.labeledPrice || product.price)}
                            </span>

                            {product.labeledPrice < product.price && (
                                <span className="text-xl text-red-600 line-through font-bold">
                                    {getFormattedPrice(product.price)}
                                </span>
                            )}
                            
                        </div>

                        <p className="text-lg mb-4">{product.description}</p>
                        <div className="w-full h-[100px] flex justify-start items-center text-white font-bold text-xl">
                            <button className="w-[150px] font-bold px-4 py-2 border-1 border-secondary text-secondary bg-primary rounded hover:brightness-80 cursor-pointer" onClick={
                                ()=>{
                                    addToCart(product , 1, user?.email)
                                    toast.success(product.name + " Added to cart")
                                }
                            }>Add to Cart</button>

                            <Link to="/checkout" state={{
                                cart: [
                                    {
                                        product: {
                                            name: product.name,
                                            price: product.price,
                                            labeledPrice: product.labeledPrice,
                                            image: product?.image?.[0] || "",
                                            productId: product.productId,
                                            brand: product.brand || "HP",  
                                            model: product.model || "Office Series"
                                        },
                                        qty: 1
                                    }
                                ]
                            }} className="px-8 w-[150px] py-2 bg-accent rounded hover:brightness-80 ml-4 cursor-pointer items-center">
                                Buy Now
                            </Link>

                        </div>
                        <div className="w-full mt-10 border-t border-gray-200 pt-8">
                            <ProductReviews productId={product.productId} user={user} />
                        </div>
                    </div>    
                </div>   
            }
        </div>
    )
}