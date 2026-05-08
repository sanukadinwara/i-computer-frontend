import { useState, useEffect } from "react";
import axios from "axios"; 
import getFormattedDate from "../../src/utils/date-format";
import getFormattedPrice from "../../src/utils/price-format";
import LoadingAnimation from "../../src/components/LoadingAnimation";
import ViewOrderInfoModal from "../../src/components/viewOrderInfoModal";

export default function AdminOrdersPage(){

    const [orders , setOrders] = useState([]);
    const [pageNumber , setPageNumber] = useState(1);
    const [pageSize , setPageSize] = useState(10);
    const [totalPages , setTotalPages] = useState(0); 

    const [isLoaded , setIsLoaded] = useState(false);

    useEffect( () => {
        if(!isLoaded){
            const token = localStorage.getItem("token");
            
            axios.get(import.meta.env.VITE_API_URL + "/orders/" + pageSize + "/" + pageNumber, {
                headers : {
                    Authorization : "Bearer " + token
                }
            }).then(
                (response) => {
                    setOrders(response.data.orders);
                    setTotalPages(response.data.totalPages);
                    
                    setIsLoaded(true);
                }
            ).catch(
                (error) => {
                    console.log(error);
                }
            )
        }
    }, [isLoaded, pageNumber, pageSize]);

    return(
        <div className="w-full h-full overflow-y-scroll pt-8 lg:pt-0">

            <div className="flex items-center justify-between gap-3 px-5 py-4 bg-primary/60 border-b border-secondary/10">
                <div>
                    <h2 className="text-lg font-semibold text-secondary">Orders</h2>
                    <p className="text-sm text-secondary/70">
                        Manage your orders at a glance
                    </p>
                </div>
            </div>

            {!isLoaded ? (
                <div className="w-full h-full flex justify-center items-center">
                    <LoadingAnimation />
                </div>
            ) : (
                <table className="min-w-[1100px] w-full text-sm relative">
                    <thead className="sticky top-0 z-10 bg-white">
                        <tr className="border-b border-secondary/10">
                            <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-secondary/70">Order ID</th>
                            <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-secondary/70">Customer Name</th>
                            <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-secondary/70">Email</th>
                            <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-secondary/70">Date</th>
                            <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-secondary/70">Total Amount</th>
                            <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-secondary/70">Status</th>
                            <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-secondary/70">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.orderId} className="border-b border-secondary/10 bg-primary hover:bg-gray-200">
                                <td className="px-5 py-3 text-center">{order.orderId}</td>
                                <td className="px-5 py-3 text-center">{order.firstName + " " + order.lastName}</td>
                                <td className="px-5 py-3 text-center">{order.email}</td>
                                <td className="px-5 py-3 text-center">{new Date(order.date).toLocaleString()}</td>
                                <td className="px-5 py-3 text-center">{getFormattedPrice(order.total)}</td>
                                <td className="px-5 py-3 text-center">{order.status}</td>
                                <td className="px-5 py-3 text-center">
                                    <ViewOrderInfoModal order={order}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div className="w-full absolute bottom-5 left-0 h-[50px] flex justify-center items-center">
                <div className="w-[420px] h-full bg-white shadow-2xl rounded-full flex items-center justify-center px-2">
                    
                    <button className="bg-accent text-white w-[90px] p-2 rounded-full cursor-pointer hover:bg-accent/80">
                        Previous
                    </button>
                    
                    <span className="text-sm text-secondary w-[100px] text-center">
                        Page {pageNumber} of {totalPages}
                    </span>
                    
                    <button className="bg-accent text-white w-[70px] p-2 rounded-full cursor-pointer hover:bg-accent/80">
                        Next
                    </button>

                    <select 
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(parseInt(e.target.value));
                            setPageNumber(1); 
                            setIsLoaded(false); 
                        }}
                        className="ml-2 border border-secondary/20 rounded px-3 py-2 text-sm cursor-pointer">
                        <option value={5}>5 per page</option>
                        <option value={10}>10 per page</option>
                        <option value={20}>20 per page</option>
                        <option value={50}>50 per page</option>
                    </select>

                </div>
            </div>

        </div>
    )
}