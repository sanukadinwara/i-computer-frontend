import { useState } from "react";
import getFormattedDate from "../utils/date-format";
import getFormattedPrice from "../utils/price-format";
import { CgClose } from "react-icons/cg";

export default function CustomerViewOrderInfoModal(props) {
    const [isVisible, setIsVisible] = useState(false);
    const order = props.order;

    return (
        <>
            <button className="bg-accent text-white px-3 py-1 rounded hover:bg-accent/60 cursor-pointer" onClick={() => setIsVisible(true)}>
                View Details
            </button>

            {isVisible && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="w-full max-w-[600px] max-h-[70vh] bg-white rounded-md relative flex flex-col">
                        <button className="absolute z-10 w-8 h-8 bg-white text-red-600 shadow-md text-xl rounded-full hover:bg-red-600 hover:text-white cursor-pointer flex justify-center items-center -right-2 -top-3" 
                        onClick={() => setIsVisible(false)}
                        >
                            <CgClose/>
                        </button>

                        <div className="w-full h-full overflow-y-auto overflow-x-hidden rounded-md pb-[20px] custom-scrollbar">

                            <div className="w-full h-auto p-6 bg-accent rounded-t-md flex flex-col gap-5"> 
                                
                                <div className="flex justify-between items-start border-b border-white/20 pb-4">
                                    <div className="flex flex-col items-start">
                                        <p className="text-white/60 text-xs uppercase tracking-wider font-semibold mb-1">Order ID</p>
                                        <h1 className="text-2xl font-bold text-white tracking-wide">{order.orderId}</h1>
                                    </div>
                                    <div className="text-right flex flex-col items-end">
                                        <h2 className="text-sm font-medium text-white/90">
                                            {new Date(order.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                                        </h2>
                                        <h2 className="text-xs text-white/70 mt-1">
                                            {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </h2>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/10 p-4 rounded-lg flex flex-col items-center text-center">
                                        <p className="text-white/60 text-xs uppercase tracking-wider font-semibold mb-2">Customer Details</p>
                                        <h1 className="text-base font-semibold text-white mb-1">{order.firstName + " " + order.lastName}</h1>
                                        <p className="text-sm text-white/80 flex items-center justify-center gap-2 mt-1">
                                            <span className="text-lg"></span> {order.email}
                                        </p>
                                        <p className="text-sm text-white/80 flex items-center justify-center gap-2 mt-1">
                                            <span className="text-lg"></span> {order.phone}
                                        </p>
                                    </div>
                                    <div className="bg-white/10 p-4 rounded-lg flex flex-col items-center text-center">
                                        <p className="text-white/60 text-xs uppercase tracking-wider font-semibold mb-2">Shipping Address</p>
                                        <p className="text-sm text-white/90 leading-relaxed mb-2">
                                            {[order.addressLine1, order.addressLine2, order.city].filter(Boolean).join(", ")}
                                        </p>
                                        <p className="text-sm text-white/80 font-medium bg-white/10 inline-block px-3 py-1.5 rounded">
                                            Postal Code: {order.postalCode}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 items-center bg-white/10 p-4 rounded-lg">
                                    <div className="flex flex-col items-start w-full">
                                        <p className="text-white/60 text-xs uppercase tracking-wider font-semibold mb-1">Total Amount</p>
                                        <h1 className="text-lg font-bold text-white whitespace-nowrap">
                                            {getFormattedPrice(order.total)}
                                        </h1>
                                    </div>
                                    <div className="flex flex-col items-center justify-center w-full border-l border-white/20 pl-4">
                                        <p className="text-white/60 text-xs uppercase tracking-wider font-semibold mb-2">Current Status</p>
                                        <span className="text-sm font-medium text-white bg-black/20 px-4 py-1.5 rounded-full">
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                                
                                {order.notes && (
                                    <div className="w-full flex flex-col mt-2">
                                        <label className="text-white/60 text-xs uppercase tracking-wider font-semibold mb-2">
                                            Order Notes
                                        </label>
                                        
                                        <div className="w-full bg-white/5 p-4 rounded-lg border border-white/10 text-left">
                                            <p className="text-sm text-white/90 leading-relaxed">
                                                {order.notes}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="w-full h-auto p-5">
                                {
                                    order.items.map(
                                        (item, index) => {
                                            return(
                                                <div key={item.productId || index} className="w-full h-auto flex items-center justify-between mb-3">
                                                    <div className="flex items-center gap-3">
                                                        <img src={item.image} alt={item.name} className="h-[60px] w-[60px] object-cover rounded"/>
                                                        <div className="flex flex-col items-start">
                                                            <span className="text-sm font-semibold text-secondary">{item.name}</span>
                                                            <span className="text-xs text-secondary/70">Qty: {item.qty}</span>
                                                        </div>
                                                    </div>
                                                    <span className="text-sm font-semibold text-secondary">{getFormattedPrice(item.price)}</span>
                                                </div>
                                            )
                                        }
                                    )
                                }
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}