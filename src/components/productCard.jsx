import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addToCart } from "../utils/cart";

export default function ProductCard(props) {
    const { product, imageIndex = 0 } = props; 
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user") || "null");
    const userEmail = user?.email;
    
    const getFormattedPrice = (price) => {
        return "Rs. " + price.toLocaleString();
    };

    return (
        <div className="w-[320px] bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden relative flex flex-col m-4 border border-gray-100 group">
            
            <div className="absolute top-4 left-0 bg-accent text-white px-4 py-1.5 rounded-r-full font-bold text-sm z-10 shadow-md">
                {product.category || "Category"}
            </div>

            <Link to={"/overview/" + product.productId} className="flex flex-col flex-grow">
                
                <div className="w-full h-[240px] overflow-hidden bg-gray-50 relative">
                    <img 
                        src={product.image[imageIndex] || "https://placehold.co/400x400?text=No+Image"} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                </div>

                <div className="h-[3px] w-full bg-gradient-to-r from-[#E30B6F] to-[#8a00c4]"></div>

                <div className="p-4 flex flex-col gap-1">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        {product.brand || "Brand"} {product.model && `· ${product.model}`}
                    </span>

                    <h1 className="font-semibold text-xl text-secondary truncate mt-1">
                        {product.name}
                    </h1>
                    
                    <div className="mt-2 flex items-center gap-2">
                        <span className="text-2xl font-bold text-accent">
                            {getFormattedPrice(product.labeledPrice || product.price)}
                        </span>

                        {product.labeledPrice < product.price && (
                            <span className="text-md text-red-600 line-through font-bold">
                                {getFormattedPrice(product.price)}
                            </span>
                        )}
                    </div>
                </div>
            </Link>

            <div className="p-4 pt-0 mt-auto flex gap-3">
                <button 
                    onClick={(e) => {
                        e.preventDefault();
                        addToCart(product, 1, userEmail); 
                        toast.success(product.name + " Added to cart");
                    }}
                    className="flex-1 bg-white border-1 cursor-pointer border-accent rounded-xl py-2 font-bold hover:brightness-80 transition-all flex justify-center items-center"
                >
                    <span className="bg-accent bg-clip-text text-transparent">
                        Add to Cart
                    </span>
                </button>

                <button 
                    onClick={(e) => {
                        e.preventDefault(); 
                        navigate("/checkout", { 
                            state: { 
                                items: [{ 
                                    product: product,
                                    qty: 1 
                                }] 
                            } 
                        });
                    }}
                    className="flex-1 bg-accent text-white cursor-pointer font-bold py-2 rounded-xl hover:brightness-80 transition-all shadow-md active:scale-95"
                >
                    Buy Now
                </button>
            </div>
            
        </div>
    );
}