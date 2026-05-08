import { useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import uploadFile from "../../src/utils/mediaUpload.js";

export default function AdminUpdateProductPage(){

    const location = useLocation()
    const [productId , setProductId] = useState(location.state?.productId);
    const [productName , setProductName] = useState(location.state?.name);
    const [description , setDescription] = useState(location.state?.description);
    const [altNames , setAltNames] = useState(location.state?.altNames?.join(",") || "");
    const [price , setPrice] = useState(location.state?.price); 
    const [labeledPrice , setLabeledPrice] = useState(location.state?.labeledPrice);
    const [category , setCategory] = useState(location.state?.category);   
    const [productBrand , setProductBrand] = useState(location.state?.brand || "");
    const [productModel , setProductModel] = useState(location.state?.model || ""); 
    const [isVisible , setIsVisible] = useState(location.state?.isVisible ? "Yes" : "No"); 
    const [files , setFiles] = useState([]);
    const navigate = useNavigate();

    async function handleUpdateProduct(){
        try{
            const token = localStorage.getItem("token");

            if(token == null){
                toast.error("You must be logged in to update a product");
                window.location.href = "/login";
                return;
            }

            let imageURLs = [];

            if (files.length > 0) {
                const fileUploadPromises = [];
                for(let i = 0; i < files.length; i++){
                    fileUploadPromises[i] = uploadFile(files[i]); 
                }
                imageURLs = await Promise.all(fileUploadPromises);
            } else {
                imageURLs = location.state?.image || []; 
            }

            console.log("Images array:", imageURLs);

            const cleanPrice = String(price).replace(/,/g, "");
            const cleanLabeledPrice = String(labeledPrice).replace(/,/g, "");

            await axios.put(import.meta.env.VITE_API_URL + "/products/" + productId , {
                name : productName,
                description : description,
                price : Number(cleanPrice), 
                labeledPrice : Number(cleanLabeledPrice), 
                altNames : altNames.split(",").map(name => name.trim()),
                image : imageURLs, 
                category : category,
                brand : productBrand,
                model : productModel,
                isVisible : isVisible === "Yes" ? true : false 
            },{
                headers: {
                    Authorization : `Bearer ${token}` 
                }
            })

            toast.success("Product updated successfully");
            navigate("/admin/products");
        }catch(err){
            toast.error(err?.response?.data?.message || "Failed to update product");
            console.log("Error from Backend:", err);
            return;
        }
    }

    return(
        <div className="w-full h-full bg-secondary text-primary rounded-3xl flex flex-wrap items-start gap-y-[20px] overflow-y-scroll pt-10 lg:pt-5 hide-scroll-track">
            <h1 className="w-full h-[45px] text-3xl font-bold mb-4 pl-4 pt-3 bg-accent bg-clip-text text-transparent sticky top-0">Edit Product</h1>
            <div className="w-[35%] h-[10%] flex flex-col">
                <label className="font-bold text-white ml-2">Product ID</label>
                <input value={productId} disabled onChange={(e)=>{setProductId(e.target.value)}} placeholder="Ex: ID0001" className="border-4 border-accent text-primary rounded-[10px] h-[50px] p-2 m-2 flex-1 outline-none"/>
            </div>
            <div className="w-[65%] h-[10%] flex flex-col">
                <label className="font-bold text-white ml-2">Product Name</label>
                <input value={productName} onChange={(e)=>{setProductName(e.target.value)}} placeholder="Ex: Laptop" className="border-4 border-accent text-primary rounded-[10px] h-[50px] p-2 m-2 flex-1 outline-none"/>
            </div>
            <div className="w-full h-[250px] flex flex-col">
                <label className="font-bold text-white ml-2">Description</label>
                <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder="Ex: Laptop" className="border-4 border-accent text-primary rounded-[10px] h-[50px] p-2 m-2 flex-1 outline-none"/>
            </div>
            <div className="w-[40%] h-[10%] flex flex-col">
                <label className="font-bold text-white ml-2">Alternative Names (Comma Seperated)</label>
                <input value={altNames} onChange={(e)=>{setAltNames(e.target.value)}} placeholder="Ex: Laptop, Macbook, Vivobook etc." className="border-4 border-accent text-primary rounded-[10px] h-[50px] p-2 m-2 flex-1 outline-none"/>
            </div>
            <div className="w-[30%] h-[10%] flex flex-col">
                <label className="font-bold text-white ml-2">Price</label>
                <input value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder="Ex: Rs. 25,000" className="border-4 border-accent text-primary rounded-[10px] h-[50px] p-2 m-2 flex-1 outline-none"/>
            </div>
            <div className="w-[30%] h-[10%] flex flex-col">
                <label className="font-bold text-white ml-2">Labeled Price</label>
                <input value={labeledPrice} onChange={(e)=>{setLabeledPrice(e.target.value)}} placeholder="Ex: Rs. 25,000" className="border-4 border-accent text-primary rounded-[10px] h-[50px] p-2 m-2 flex-1 outline-none"/>
            </div>
            <div className="w-[40%] h-[10%] flex flex-col">
                <label className="font-bold text-white ml-2">Category</label>
                <select value={category} onChange={(e)=>{setCategory(e.target.value)}} placeholder="Ex: Laptops" className="border-4 border-accent bg-secondary text-primary rounded-[10px] h-[50px] p-2 m-2 flex-1 outline-none">
                    <option value="Laptops">Laptops</option>
                    <option value="Monitors">Monitors</option>
                    <option value="Processors">Processors</option>
                    <option value="Graphic Cards">Graphic Cards</option>
                    <option value="Memory & Storage">Memory & Storage</option>
                    <option value="Motherboards">Motherboards</option>
                    <option value="Power Supply">Power Supply</option>
                    <option value="Coolers">Coolers</option>
                    <option value="PC Cases">PC Cases</option>
                    <option value="Cables">Cables</option>
                    <option value="Chairs & Tables">Chairs & Tables</option>
                    <option value="Keyboard, Mouse & Mouse Pad">Keyboard, Mouse & Mouse Pad</option>
                    <option value="Expansion Cards">Expansion Cards</option>
                    <option value="UPS">UPS</option>
                    <option value="Headset, Speaker & Console">Headset, Speaker & Console</option>
                    <option value="Adapters">Adapters</option>
                    <option value="Printers">Printers</option>
                    <option value="Streaming">Streaming</option>
                    <option value="Others">Others</option>
                </select>
            </div> 
            <div className="w-[30%] h-[10%] flex flex-col">
                <label className="font-bold text-white ml-2">Product Brand</label>
                <input value={productBrand} onChange={(e)=>{setProductBrand(e.target.value)}} placeholder="Ex: HP" className="border-4 border-accent text-primary rounded-[10px] h-[50px] p-2 m-2 flex-1 outline-none"/>
            </div>
            <div className="w-[30%] h-[10%] flex flex-col">
                <label className="font-bold text-white ml-2">Product Model</label>
                <input value={productModel} onChange={(e)=>{setProductModel(e.target.value)}} placeholder="Ex: Victus" className="border-4 border-accent text-primary rounded-[10px] h-[50px] p-2 m-2 flex-1 outline-none"/>
            </div>
            <div className="w-[30%] h-[10%] flex flex-col">
                <label className="font-bold text-white ml-2">Is Visible</label>
                <select value={isVisible} onChange={(e)=>{setIsVisible(e.target.value)}} placeholder="Ex: Yes" className="border-4 border-accent bg-secondary text-primary rounded-[10px] h-[50px] p-2 m-2 flex-1 outline-none">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>
            <div className="w-[40%] h-[10%] flex flex-col">
                <label className="font-bold ml-2 text-white">Images</label>
                <input multiple type="file" onChange={(e)=>{setFiles(Array.from(e.target.files))}} className="border-4 border-accent text-white text-primary rounded-[10px] h-[50px] p-2 m-2 outline-none cursor-pointer">
                </input>
            </div>
            <div className="w-full h-[80px] sticky bottom-0 bg-secondary flex justify-end items-center p-4 gap-4 shadow-2xl">
                <button onClick={() => navigate("/admin")} className="bg-gray-400 text-white font-bold px-6 py-3 rounded-[10px] hover:bg-gray-500 cursor-pointer">Cancel</button>
                <button onClick={handleUpdateProduct}className="bg-accent text-white font-bold px-6 py-3 rounded-[10px] hover:brightness-70 transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg cursor-pointer">Update Product</button>
                
            </div>
        </div>
    )
}