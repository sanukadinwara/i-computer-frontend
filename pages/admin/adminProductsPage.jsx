import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AdminProductsPage(){
    return(
        <div className="w-full h-full overflow-y-scroll">
            
            <Link to="/admin/add-product" className="text-white bg-accent w-[50px] h-[50px] flex justify-center items-center text-2xl rounded-full hover:text-accent hover:bg-white hover:shadow-2xl fixed bottom-10 right-15">
                <FaPlus />
            </Link>
            
        </div>
    )
}
