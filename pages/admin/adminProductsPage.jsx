import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AdminProductsPage(){
    const [products , setProducts] = useState([
        {
            productId: "IT001",
            name: "Apple MacBook Pro 14” M2",
            price: 625000,
            labeledPrice: 680000,
            category: "Laptops",
            image: ["https://via.placeholder.com/300x200"],
            brand: "Apple",
            model: "M2 Pro 2023",
            isVisible: true
        },
        {
            productId: "IT002",
            name: "Dell XPS 13 Plus",
            price: 485000,
            labeledPrice: 520000,
            category: "Laptops",
            image: ["https://via.placeholder.com/300x200"],
            brand: "Dell",
            model: "9320",
            isVisible: true
        },
        {
            productId: "IT003",
            name: "Samsung Galaxy S23 Ultra",
            price: 410000,
            labeledPrice: 450000,
            category: "Smartphones",
            image: ["https://via.placeholder.com/300x200"],
            brand: "Samsung",
            model: "SM-S918B",
            isVisible: true
        },
        {
            productId: "IT004",
            name: "Apple iPhone 14 Pro",
            price: 395000,
            labeledPrice: 430000,
            category: "Smartphones",
            image: ["https://via.placeholder.com/300x200"],
            brand: "Apple",
            model: "A2890",
            isVisible: false
        },
        {
            productId: "IT005",
            name: "Logitech MX Master 3S Mouse",
            price: 42000,
            labeledPrice: 48000,
            category: "Accessories",
            image: ["https://via.placeholder.com/300x200"],
            brand: "Logitech",
            model: "MX Master 3S",
            isVisible: true
        },
        {
            productId: "IT006",
            name: "Keychron K8 Pro Mechanical Keyboard",
            price: 68000,
            labeledPrice: 75000,
            category: "Accessories",
            image: ["https://via.placeholder.com/300x200"],
            brand: "Keychron",
            model: "K8 Pro",
            isVisible: true
        },
        {
            productId: "IT007",
            name: "ASUS TUF Gaming RTX 4070",
            price: 315000,
            labeledPrice: 345000,
            category: "Computer Components",
            image: ["https://via.placeholder.com/300x200"],
            brand: "ASUS",
            model: "RTX 4070 OC",
            isVisible: false
        },
        {
            productId: "IT008",
            name: "Samsung 970 EVO Plus 1TB SSD",
            price: 52000,
            labeledPrice: 58000,
            category: "Storage",
            image: ["https://via.placeholder.com/300x200"],
            brand: "Samsung",
            model: "MZ-V7S1T0",
            isVisible: true
        }
    ]);
    
    return(
        <div className="w-full h-full overflow-visible">
                          
        <div className="w-full bg-[var(--color-primary)] p-4 rounded-xl shadow-sm bg-white">
    <div className="overflow-x-auto bg-white rounded-xl">
    <table className="min-w-[1100px] w-full relative">
        <thead className="sticky top-0 z-10 bg-accent/80">
        <tr className="border-b border-secondary/10">
            <th className="px-4 py-3 text-left text-sm font-semibold border-0">
            Product ID
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold border-0">
            Name
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
            </tr>
        ))}
        </tbody>
    </table>
</div>

    </div>
            <Link to="/admin/add-product" className="text-white bg-accent w-[50px] h-[50px] flex justify-center items-center text-2xl rounded-full hover:text-accent hover:bg-white hover:shadow-2xl fixed bottom-10 right-15">    
                <FaPlus />
            </Link>
            
        </div>
    )
}
