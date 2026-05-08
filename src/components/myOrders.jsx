import { useState, useEffect } from "react";
import axios from "axios"; 
import getFormattedDate from "../../src/utils/date-format";
import LoadingAnimation from "../../src/components/LoadingAnimation";
import CustomerViewOrderInfoModal from "./customerViewOrderInfoModal";
import getFormattedPrice from "../utils/price-format";

export default function MyOrdersPage(){

    const [orders , setOrders] = useState([]);
    const [pageNumber , setPageNumber] = useState(1);
    const [pageSize , setPageSize] = useState(10);
    const [totalPages , setTotalPages] = useState(0); 

    const [isLoaded , setIsLoaded] = useState(false);

    useEffect( () => {
        if(!isLoaded){
            const token = localStorage.getItem("token");
            
            axios.get(import.meta.env.VITE_API_URL + "/orders/my-orders/" + pageSize + "/" + pageNumber, {
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
    }, [isLoaded]); 

    return(
        <div className="w-full min-h-[calc(100vh-100px)] relative pb-20">

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
                <div className="w-full overflow-x-auto">

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
                                <tr key={order.orderId} className="border-b border-secondary/10 hover:bg-gray-200">
                                    <td className="px-5 py-3 text-center">{order.orderId}</td>
                                    <td className="px-5 py-3 text-center">{order.firstName + " " + order.lastName}</td>
                                    <td className="px-5 py-3 text-center">{order.email}</td>
                                    <td className="px-5 py-3 text-center">{new Date(order.date).toLocaleString()}</td>
                                    <td className="px-5 py-3 text-center">{getFormattedPrice(order.total)}</td>
                                    <td className="px-5 py-3 text-center">{order.status}</td>
                                    <td className="px-5 py-3 text-center">
                                        <CustomerViewOrderInfoModal order={order}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="w-full absolute bottom-5 left-0 h-[50px] flex justify-center items-center">
                <div className="w-[420px] h-full bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.3)] rounded-full flex items-center justify-center px-2">
                    
            <button className="bg-accent w-[90px] text-white p-2 rounded-full cursor-pointer hover:brightness-125 transition-all">
                Previous
            </button>

            <span className="text-sm text-secondary w-[100px] text-center font-semibold">
                Page {pageNumber} of {totalPages}
            </span>

            <button className="bg-accent text-white w-[70px] p-2 rounded-full cursor-pointer hover:brightness-125 transition-all">
                Next
            </button>

                    <select 
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(parseInt(e.target.value));
                            setPageNumber(1); 
                            setIsLoaded(false); 
                        }}
                        className="ml-3 border border-secondary/20 rounded px-3 py-2 text-sm cursor-pointer">
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