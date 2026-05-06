import { useEffect, useState } from "react";
import ProductCard from "../src/components/productCard";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingAnimation from "../src/components/LoadingAnimation";
import { addToCart } from "../src/utils/cart";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        let url = import.meta.env.VITE_API_URL + "/products"
        if(searchQuery!=""){
            url = import.meta.env.VITE_API_URL + "/products/search/" + searchQuery 
        }
        axios.get(url)
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            }).catch((error) => {
                toast.error("Failed to fetch products.");
                setLoading(false);
            });
    }, [loading]);

    return (
        <div className="w-full min-h-screen bg-primary p-10 flex flex-wrap justify-center items-start gap-8 relative p-[0px]">
            <div className="w-full h-[60px] backdrop-blur-lg sticky top-[100px] z-50 flex justify-center items-center relative">
                <input type="text" placeholder="Search for products...." className="w-[400px] h-[40px] rounded-full px-4 border-2 border-secondary/40 focus:border-secondary outline-none transition-colors bg-white text-secondary"
                onChange={
                    (e)=>{
                        setSearchQuery(e.target.value)
                        setLoading(true)
                    }
                }/>
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-accent"/>
            </div>
            {
                loading ? (
                    <div className="w-full h-[50vh] flex justify-center items-center">
                        <LoadingAnimation />
                    </div>
                ) : (
                    products.length > 0 ? (
                        products.map((item) => (
                            <ProductCard product={item} key={item.productId} />
                        ))
                    ) : (
                        <h2 className="text-secondary text-xl">No products found.</h2>
                    )
                )
            }
        </div>
    )
}