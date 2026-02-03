import { useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function AdminUpdateProductPage(){

    const location = useLocation()
    const [productId , setProductId] = useState(location.state?.productId);
    const [productName , setProductName] = useState(location.state?.name);
    const [description , setDescription] = useState(location.state?.description);
    const [altNames , setAltNames] = useState(location.state?.altNames?.join(","))||"";
    const [price , setPrice] = useState(location.state?.price); 
    const [labeledPrice , setLabeledPrice] = useState(location.state?.labeledPrice);
    const [category , setCategory] = useState(location.state?.category);   
    const [productBrand , setProductBrand] = useState(location.state?.productBrand);
    const [productModel , setProductModel] = useState(location.state?.productModel);
    const [isVisible , setIsVisible] = useState(location.state?.isVisible);
    const [files , setFiles] = useState([]);
    const navigate = useNavigate();

    async function handleUpdateProduct(){
        try{

            const token = localStorage.getItem("token");

            if(token == null){
                toast.error("You must be logged in to add a product");
                window.location.href = "/login";
                return;
            }

            const fileUploadPromises = [];

            for(let i=0; i<files.length; i++){
                fileUploadPromises[i] = uploadFile(file[i])
            }

            let imageURLs = await Promise.all(fileUploadPromises);
            console.log(results); 

            if(imageURLs.length == null){
                imageURLs = location.state.images
            }

            await axios.put(import.meta.env.VITE_API_URL + "/products" + productId , {
                productName : productName,
                description : description,
                price : price,
                labeledPrice : labeledPrice,
                altNames : altNames.split(", "),
                images : imageURLs,
                category : category,
                productBrand : productBrand,
                productModel : productModel,
                isVisible : isVisible
            },{
                headers: {
                    Authorization : "Bearer"+token
                }
            })

            toast.success("Product updated successfully");
            navigate("/admin/products");
        }catch(err){
            toast.error(err?.response?.data?.message || "Failed to update product");
            return;
        }
    }

    return(
        <div className="w-full h-full flex flex-wrap items-start gap-y-[20px] overflow-y-scroll hide-scroll-track">
            <h1 className="w-full h-[45px] text-3xl font-bold mb-4 text-accent sticky top-0 bg-secondary">Edit Product</h1>
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
                <input value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder="Ex: LKR 25,000" className="border-4 border-accent text-primary rounded-[10px] h-[50px] p-2 m-2 flex-1 outline-none"/>
            </div>
            <div className="w-[30%] h-[10%] flex flex-col">
                <label className="font-bold text-white ml-2">Labeled Price</label>
                <input value={labeledPrice} onChange={(e)=>{setLabeledPrice(e.target.value)}} placeholder="Ex: LKR 25,000" className="border-4 border-accent text-primary rounded-[10px] h-[50px] p-2 m-2 flex-1 outline-none"/>
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
                <input multiple type="file" onChange={(e)=>{setFiles(e.target.files)}} className="border-4 border-accent text-white text-primary rounded-[10px] h-[50px] p-2 m-2 outline-none">
                </input>
            </div>
            <div className="w-full h-[80px] sticky bottom-0 bg-secondary flex justify-end items-center p-4 gap-4 shadow-2xl">
                <button onClick={() => navigate("/admin")} className="bg-gray-400 text-white font-bold px-6 py-3 rounded-[10px] hover:bg-gray-500">Cancel</button>
                <button onClick={handleUpdateProduct} className="bg-accent text-white font-bold px-6 py-3 rounded-[10px] hover:bg-secondary">Update Product</button>
                
            </div>
        </div>
    )
}