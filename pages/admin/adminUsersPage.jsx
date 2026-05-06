import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBan, FaTrashAlt, FaUnlock } from "react-icons/fa";
import { Link } from "react-router-dom";
import DeleteModal from "../../src/components/deleteModal";

export default function AdminUsersPage(){
    const [users , setUsers] = useState([]);
    const [loading , setLoading] = useState(true); 
    const [blockModalOpen, setBlockModalOpen] = useState(false);
    const [selectedUserForBlock, setSelectedUserForBlock] = useState(null);
    const [blockDuration, setBlockDuration] = useState(7); 
    
    useEffect(()=> {
        const token = localStorage.getItem("token");
        axios.get(import.meta.env.VITE_API_URL + "/users", {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        }).then((response)=>{
            setUsers(response.data);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        });
    }, []);

    const handleBlockSubmit = async () => {
        try {
            const token = localStorage.getItem("token");
            
            await axios.put(`${import.meta.env.VITE_API_URL}/users/${selectedUserForBlock._id}/block`, {
                durationInDays: blockDuration
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success(`User blocked for ${blockDuration === 9999 ? 'ever' : blockDuration + ' days'}`);
            setBlockModalOpen(false); 

            setUsers(users.map(user => 
                user._id === selectedUserForBlock._id ? { ...user, isBlocked: true } : user
            ));
            
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error blocking user");
        }
    };

    const handleUnblockUser = async (userId) => {
        if (!window.confirm("Are you sure you want to unblock this user?")) return;

        try {
            const token = localStorage.getItem("token");
            
            await axios.put(`${import.meta.env.VITE_API_URL}/users/${userId}/unblock`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success("User unblocked successfully!");
            
            setUsers(users.map(user => 
                user._id === userId ? { ...user, isBlocked: false } : user
            ));
            
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error unblocking user");
            console.log(error);
        }
    };

    const handleDeleteUser = async (userId) => {

        if (!window.confirm("Are you sure you want to delete this user? They will have to create a new account.")) return;

        try {
            const token = localStorage.getItem("token");

            await axios.delete(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            toast.success("User deleted successfully!");
            
            setUsers(users.filter(user => user._id !== userId)); 
            
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error deleting user");
        }
    };

    return(
        <div className="w-full h-full overflow-y-auto pb-20">
            <div className="w-full bg-[var(--color-primary)] p-4 rounded-xl shadow-sm bg-white">
                <div className="overflow-x-auto bg-white rounded-xl">
                    <table className="min-w-[1100px] w-full relative">
                        <thead className="sticky top-0 z-10 bg-accent/80">
                        <tr className="border-b border-secondary/10">
                                    <th className="px-4 py-3 text-left text-sm font-semibold border-0">User ID</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold border-0">First Name</th>
                                    <th className="px-15 py-3 text-left text-sm font-semibold border-0">Last Name</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold border-0">Email</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold border-0">Role</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold border-0">Profile Picture</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold border-0">Is Blocked</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold border-0">Is Email Verified</th>
                                    <th className="px-4 py-3 text-center text-sm font-semibold border-0">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="border-0">
                                {loading ? (
                                    <tr>
                                        <td colSpan="9" className="text-center py-10 text-xl font-bold">Loading Users...</td>
                                    </tr>
                                ) : users.length === 0 ? (
                                    <tr>
                                        <td colSpan="9" className="text-center py-10 text-gray-500">No users found.</td>
                                    </tr>
                                ) : (
                                    users.map((item) => (
                                        <tr
                                            key={item._id} 
                                            className="border-0 odd:bg-secondary/20 even:bg-accent/20 shadow-2xl hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-4 py-3 text-xs border-0 text-gray-600 font-mono">{item._id}</td>
                                            
                                            <td className="px-7 py-3 text-xs border-0 whitespace-nowrap">{item.firstName}</td>
                                            
                                            <td className="px-17 py-3 text-xs border-0 whitespace-nowrap">{item.lastName}</td>

                                            <td className="px-4 py-3 text-xs border-0">{item.email}</td>

                                            <td className="px-0 py-3 text-xs border-0 whitespace-nowrap">
                                                <span className={`px-3 py-1 rounded-full font-bold text-xs ${item.role === 'admin' ? 'bg-purple-200 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                                                    {item.role ? item.role.toUpperCase() : "CUSTOMER"}
                                                </span>
                                            </td>

                                            <td className="px-4 py-3 border-0 flex justify-center">
                                                <img 
                                                    src={item.image || "/default-profile.png"} 
                                                    alt={item.firstName || "User Profile"} 
                                                    className="h-10 w-10 rounded-full object-cover border-2 border-accent bg-white" 
                                                />
                                            </td>

                                            <td className="px-4 py-3 text-center border-0 whitespace-nowrap">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.isBlocked ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                                                    {item.isBlocked ? "Yes" : "No"}
                                                </span>
                                            </td>

                                            <td className="px-4 py-3 text-center border-0 whitespace-nowrap">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.isEmailVerified ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                                                    {item.isEmailVerified ? "Yes" : "No"}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4 border-0">
                                                <div className="flex justify-center items-center gap-4 text-xl">
                                                    
                                                    {item.isBlocked ? (
                                                        <button 
                                                            title="Unblock User"
                                                            onClick={() => handleUnblockUser(item._id)} 
                                                            className="text-green-500 hover:text-green-700 hover:scale-110 transition-transform cursor-pointer"
                                                        >
                                                            <FaUnlock />
                                                        </button>
                                                    ) : (
                                                        <button 
                                                            title="Block User"
                                                            onClick={() => {
                                                                setSelectedUserForBlock(item);
                                                                setBlockModalOpen(true);
                                                            }}
                                                            className="text-orange-500 hover:text-orange-700 cursor-pointer hover:scale-110 transition-transform disabled:opacity-20 disabled:cursor-not-allowed"
                                                            disabled={item.role === 'admin'} 
                                                        >
                                                            <FaBan />
                                                        </button>
                                                    )}

                                                    <button 
                                                        title="Delete User"
                                                        onClick={() => handleDeleteUser(item._id)} 
                                                        className="text-red-500 hover:text-red-700 hover:scale-110 cursor-pointer transition-transform disabled:opacity-20 disabled:cursor-not-allowed"
                                                        disabled={item.role === 'admin'} 
                                                    >
                                                        <FaTrashAlt />
                                                    </button>

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
                    {blockModalOpen && (
                        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center backdrop-blur-sm">
                            <div className="bg-white p-6 rounded-2xl shadow-2xl w-[400px] flex flex-col">
                                <h2 className="text-2xl font-bold text-secondary mb-2">Block User</h2>
                                <p className="text-sm text-gray-500 mb-5">
                                    Select the duration to block <span className="font-bold text-accent">{selectedUserForBlock?.firstName}</span>.
                                </p>

                                <label className="text-sm font-semibold text-secondary mb-1">Block Duration</label>
                                <select 
                                    value={blockDuration} 
                                    onChange={(e) => setBlockDuration(Number(e.target.value))}
                                    className="w-full border-2 border-gray-200 rounded-lg p-2 outline-none focus:border-accent mb-6"
                                >
                                    <option value={1}>1 Day</option>
                                    <option value={7}>7 Days</option>
                                    <option value={30}>30 Days</option>
                                    <option value={9999}>Permanently (Forever)</option>
                                </select>

                                <div className="flex justify-end gap-3 mt-auto">
                                    <button 
                                        onClick={() => setBlockModalOpen(false)}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 cursor-pointer font-bold rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={handleBlockSubmit}
                                        className="px-4 py-2 bg-gradient-to-r from-[#E30B6F] to-[#8a00c4] text-white cursor-pointer font-bold rounded-lg hover:opacity-90 transition-opacity shadow-md"
                                    >
                                        Confirm Block
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    )
}