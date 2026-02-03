import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus , FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import DeleteModal from "../../src/components/deleteModal";

export default function AdminProductsPage(){
    const [products , setProducts] = useState([]);
    const [loading , setLoading] = useState(false);

    useEffect(()=> {
    
    if(loading){
    const token = localStorage.getItem("token");
    axios.get(import.meta.env.VITE_API_URL + "/products", {
    headers: {
        Authorization: "Bearer "+token
    }
    }).then((response)=>{
        setProducts(response.data);
        setLoading(false)
    });
    }
    }, [loading]);   
    
    
    return(
        <div className="w-full h-full overflow-visible">
                          
        <div className="w-full bg-[var(--color-primary)] p-4 rounded-xl shadow-sm bg-white">
        <div className="overflow-x-auto bg-white rounded-xl">
            {loading?<h1>Loading....</h1>:
                <table className="min-w-[1100px] w-full relative">
        <thead className="sticky top-0 z-10 bg-accent/80">
        <tr className="border-b border-secondary/10">
            <th className="px-4 py-3 text-left text-sm font-semibold border-0">
            Product ID
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold border-0">
            Name
            </th>
            <th className="px-15 py-3 text-left text-sm font-semibold border-0">
            Description
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold border-0">
            Price
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold border-0">
            Labeled Price
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold border-0">
            Category
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold border-0">
            Image
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold border-0">
            Brand
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold border-0">
            Model
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold border-0">
            Visibility
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold border-0">
                Actions
            </th>
        </tr>
        </thead>

        <tbody className="border-0">
        {products.map((item) => (
            <tr
            key={item.productId}
            className="border-0 odd:bg-secondary/20 even:bg-accent/20 shadow-2xl hover:bg-gray-50 transition-colors"
            >
            <td className="px-4 py-3 text-xs border-0">
                {item.productId}
            </td>

            <td className="px-4 py-3 text-xs border-0 whitespace-nowrap">
                {item.name}
            </td>

            <td className="px-4 py-3 text-xs border-0 flex-wrap">
                {item.description}
            </td>

            <td className="px-4 py-3 text-xs font-semibold text-accent border-0">
                LKR {item.price.toFixed(2)}
            </td>

            <td className="px-4 py-3 text-xs text-gray-600 border-0">
                LKR {item.labeledPrice.toFixed(2)}
            </td>

            <td className="px-4 py-3 text-xs border-0">
                <span className="px-3 py-1 rounded-full bg-gray-100 text-secondary text-xs font-medium">
                {item.category || "Uncategorized"}
                </span>
            </td>

            <td className="px-4 py-3 border-0">
                <img
                src={item.image[0]}
                alt={item.name}
                className="h-12 w-12 rounded-lg object-cover"
                />
            </td>

            <td className="px-4 py-3 text-xs border-0">
                {item.brand}
            </td>

            <td className="px-4 py-3 text-xs border-0">
                {item.model}
            </td>

            <td className="px-4 py-3 text-center border-0">
                <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.isVisible
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
                >
                {item.isVisible ? "Visible" : "Hidden"}
                </span>
            </td>
                <td className="px-5 py-4">
                    <div className="flex justify-center items-center gap-2 text-xl">
                        <Link
                        to="/admin/update-product" state={item} className="hover:text-accent">
                            <FaEdit />
                        </Link>
                        <DeleteModal products={item} setLoading={setLoading}/>
                    </div>
                </td>
            </tr>
        ))}
        </tbody>
                </table>
            }
            <div className="px-5 py-3 bg-white border-t border-secondary/10 text-xs text-secondary/60">
                Tip: Scroll horizontally on small screens to view all columns.
            </div>
</div>

    </div>
            <Link to="/admin/add-product" className="text-white bg-accent w-[50px] h-[50px] flex justify-center items-center text-2xl rounded-full hover:text-accent hover:bg-white hover:shadow-2xl fixed bottom-10 right-15">    
                <FaPlus />
            </Link>
            
        </div>
    )
}
