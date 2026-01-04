import { useState } from "react"

export default function AddProductPage(){

    const [productId , setProductId] = useState("");
    const [productName , setProductName] = useState("");
    const [description , setDescription] = useState("");
    const [altNames , setAltNames] = useState("");
    const [price , setPrice] = useState(""); 
    const [labeledPrice , setLabeledPrice] = useState("");
    const [category , setCategory] = useState("Others");   
    const [productBrand , setProductBrand] = useState("Standard");
    const [productModel , setProductModel] = useState("");
    const [isVisible , setIsVisible] = useState("true");

    return(
        <div className="w-full max-h-full flex flex-wrap items-start">
            <div className="w-[35%] h-[50%] flex flex-col">
                <label className="font-bold text-white ml-2">Product ID</label>
                <input value={productId} onChange={(e)=>{setProductId(e.target.value)}} placeholder="Ex: ID0001" className="border-4 border-accent text-primary rounded-[10px] h-[50px] p-2 m-2 flex-1 outline-none"/>
            </div>
            <div className="w-[65%] h-[50%] flex flex-col">
                <label className="font-bold text-white ml-2">Product Name</label>
                <input value={productName} onChange={(e)=>{setProductName(e.target.value)}} placeholder="Ex: Laptop" className="border-4 border-accent text-primary rounded-[10px] h-[50px] p-2 m-2 flex-1 outline-none"/>
            </div>
            <div className="w-full h-[250px] flex flex-col">
                <label className="font-bold text-white ml-2">Description</label>
                <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder="Ex: Laptop" className="border-4 border-accent text-primary rounded-[10px] h-[50px] p-2 m-2 flex-1 outline-none"/>
            </div>
            <div className="w-[40%] h-[40%] flex flex-col">
                <label className="font-bold text-white ml-2">Alternative Names (Comma Seperated)</label>
                <input value={altNames} onChange={(e)=>{setAltNames(e.target.value)}} placeholder="Ex: Laptop, Macbook, Vivobook etc." className="border-4 border-accent text-primary rounded-[10px] h-[50px] p-2 m-2 flex-1 outline-none"/>
            </div>
            <div className="w-[30%] h-[50%] flex flex-col">
                <label className="font-bold text-white ml-2">Price</label>
                <input value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder="Ex: LKR 25,000" className="border-4 border-accent text-primary rounded-[10px] h-[50px] p-2 m-2 flex-1 outline-none"/>
            </div>
            <div className="w-[30%] h-[50%] flex flex-col">
                <label className="font-bold text-white ml-2">Labeled Price</label>
                <input value={labeledPrice} onChange={(e)=>{setLabeledPrice(e.target.value)}} placeholder="Ex: LKR 25,000" className="border-4 border-accent text-primary rounded-[10px] h-[50px] p-2 m-2 flex-1 outline-none"/>
            </div>
            <div className="w-[40%] h-[50%] flex flex-col">
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
            <div className="w-[30%] h-[50%] flex flex-col">
                <label className="font-bold text-white ml-2">Product Brand</label>
                <input value={productBrand} onChange={(e)=>{setProductBrand(e.target.value)}} placeholder="Ex: HP" className="border-4 border-accent text-primary rounded-[10px] h-[50px] p-2 m-2 flex-1 outline-none"/>
            </div>
            <div className="w-[30%] h-[50%] flex flex-col">
                <label className="font-bold text-white ml-2">Product Model</label>
                <input value={productModel} onChange={(e)=>{setProductModel(e.target.value)}} placeholder="Ex: Victus" className="border-4 border-accent text-primary rounded-[10px] h-[50px] p-2 m-2 flex-1 outline-none"/>
            </div>
            <div className="w-[30%] h-[50%] flex flex-col">
                <label className="font-bold text-white ml-2">Is Visible</label>
                <select value={isVisible} onChange={(e)=>{setIsVisible(e.target.value)}} placeholder="Ex: Yes" className="border-4 border-accent bg-secondary text-primary rounded-[10px] h-[50px] p-2 m-2 flex-1 outline-none">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>
        </div>
    )
}