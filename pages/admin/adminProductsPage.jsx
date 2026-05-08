import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus , FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import DeleteModal from "../../src/components/deleteModal";

export default function AdminProductsPage(){
    const [products , setProducts] = useState([]);
    const [loading , setLoading] = useState(true); 
    
    useEffect(()=> {
        const token = localStorage.getItem("token");
        axios.get(import.meta.env.VITE_API_URL + "/products", {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        }).then((response)=>{
            setProducts(response.data);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        });
    }, []); 

    return(
        <div className="w-full h-full overflow-hidden pb-20">
            <div className="w-full bg-[var(--color-primary)] p-4 rounded-xl shadow-sm bg-white">
                <div className="overflow-auto max-h-[calc(122vh-250px)] bg-white rounded-xl">
                    <table className="min-w-[1100px] w-full relative">
                        <thead className="z-10 bg-accent/80 sticky top-0 bg-primary">
                        <tr className="border-b border-secondary/10">
                                    <th className="px-4 py-3 text-left text-sm font-semibold border-0">Product ID</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold border-0">Name</th>
                                    <th className="px-15 py-3 text-left text-sm font-semibold border-0">Description</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold border-0">Price</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold border-0">Labeled Price</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold border-0">Category</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold border-0">Image</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold border-0">Brand</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold border-0">Model</th>
                                    <th className="px-4 py-3 text-center text-sm font-semibold border-0">Visibility</th>
                                    <th className="px-4 py-3 text-center text-sm font-semibold border-0">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="border-0">
                                {loading ? (
                                    <tr>
                                        <td colSpan="11" className="text-center py-10 text-xl font-bold">Loading Products...</td>
                                    </tr>
                                ) : products.length === 0 ? (
                                    <tr>
                                        <td colSpan="11" className="text-center py-10 text-gray-500">No products found.</td>
                                    </tr>
                                ) : (
                                    products.map((item) => (
                                        <tr
                                            key={item._id} 
                                            className="border-0 odd:bg-secondary/20 even:bg-accent/20 shadow-2xl hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-4 py-3 text-xs border-0">{item.productId}</td>
                                            <td className="px-4 py-3 text-xs border-0 whitespace-nowrap">{item.name}</td>
                                            <td className="px-4 py-3 text-xs border-0 flex-wrap">{item.description}</td>
                                            <td className="px-4 py-3 text-xs font-semibold text-accent border-0">Rs. {(item.price || 0).toFixed(2)}</td>
                                            <td className="px-4 py-3 text-xs text-gray-600 border-0">Rs. {(item.labeledPrice || 0).toFixed(2)}</td>
                                            <td className="px-4 py-3 text-xs border-0 whitespace-nowrap">
                                                <span className="px-3 py-1 rounded-full bg-gray-100 text-secondary text-xs font-medium">
                                                    {item.category || "Uncategorized"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 border-0">
                                                <img
                                                    src={item.image && item.image.length > 0 ? item.image[0] : "https://picsum.photos/200"}
                                                    alt={item.name}
                                                    className="h-12 w-12 rounded-lg object-cover"
                                                />
                                            </td>
                                            <td className="px-4 py-3 text-xs border-0">{item.brand}</td>
                                            <td className="px-4 py-3 text-xs border-0">{item.model}</td>
                                            <td className="px-4 py-3 text-center border-0">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.isVisible ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                                    {item.isVisible ? "Visible" : "Hidden"}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 border-0">
                                                <div className="flex justify-center items-center gap-2 text-xl">
                                                    <Link to="/admin/update-product" state={item} className="hover:text-accent">
                                                        <FaEdit />
                                                    </Link>
                                                    <DeleteModal product={item} setLoading={setLoading} products={products} setProducts={setProducts}/>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                            </table>
                    <div className="px-5 py-3 bg-white border-t border-secondary/10 text-xs text-secondary/60">
                        Tip: Scroll horizontally on small screens to view all columns.
                    </div>
                </div>
            </div>
            <Link to="/admin/add-product" className="text-white bg-accent w-[50px] h-[50px] flex justify-center items-center text-2xl rounded-full hover:brightness-125 hover:shadow-2xl transition-all duration-300 fixed bottom-10 right-15">    
                <FaPlus />
            </Link>
        </div>
    )
}