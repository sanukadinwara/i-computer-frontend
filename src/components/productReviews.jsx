import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import axios from "axios";
import toast from "react-hot-toast";
import { Star, Trash2, Pencil, Image as ImageIcon, X } from "lucide-react";
import uploadFile from "../utils/mediaUpload.js"; 

export default function ProductReviews({ productId, user }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [imageFiles, setImageFiles] = useState([]); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editComment, setEditComment] = useState("");
    const [editRating, setEditRating] = useState(5);

    const fetchReviews = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/reviews/product/${productId}`)
            .then((res) => {
                setReviews(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log("Error fetching reviews:", err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchReviews();
    }, [productId]);

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length + imageFiles.length > 5) {
            toast.error("You can only upload up to 5 images.");
            return;
        }
        setImageFiles([...imageFiles, ...selectedFiles]);
    };

    const removeSelectedImage = (index) => {
        setImageFiles(imageFiles.filter((_, i) => i !== index));
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return toast.error("Please write your experience!");

        const token = localStorage.getItem("token")?.replace(/['"]+/g, '').trim();
        if (!token) return toast.error("Your session has expired. Please login again.");

        setIsSubmitting(true);
        try {
            const imageUrls = await Promise.all(
                imageFiles.map(file => uploadFile(file, "reviews")) 
            );

            await axios.post(`${import.meta.env.VITE_API_URL}/reviews`, {
                reviewId: "REV" + Math.floor(Math.random() * 1000000), 
                productId: productId,
                rating: rating,
                message: comment,
                images: imageUrls
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success("Review posted successfully!");
            setComment("");
            setRating(5);
            setImageFiles([]);
            fetchReviews();
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdateReview = async (reviewId) => {
        if (!editComment.trim()) return toast.error("Review cannot be empty!");
        const token = localStorage.getItem("token")?.replace(/['"]+/g, '').trim();

        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/reviews/${reviewId}`, {
                rating: editRating,
                message: editComment
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success("Review updated successfully!");
            setEditingId(null); 
            fetchReviews(); 
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update review.");
        }
    };

    const handleDelete = async (reviewId) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;
        const token = localStorage.getItem("token")?.replace(/['"]+/g, '').trim();
        
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/reviews/${reviewId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Review deleted!");
            fetchReviews();
        } catch (error) {
            toast.error("You don't have permission to delete this.");
        }
    };

    return (
        <div className="w-full mt-12 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-primary">Product Reviews</h2>

            {!user ? (
                <div className="bg-blue-50 text-blue-700 p-4 rounded-xl text-center mb-8 font-medium">
                    Please <Link to="/login" className="font-bold underline hover:text-blue-900 transition-all">log in</Link> to write a review.
                </div>
            ) : (
                <div className="mb-10 p-5 bg-gray-50 rounded-2xl border border-gray-200">
                    <p className="font-semibold mb-3">Rate this product</p>
                    <div className="flex gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map(s => (
                            <Star 
                                key={s} 
                                className={`w-7 h-7 cursor-pointer transition-all ${s <= rating ? "fill-yellow-400 text-yellow-400 scale-110" : "text-gray-300"}`} 
                                onClick={() => setRating(s)} 
                            />
                        ))}
                    </div>

                    <textarea 
                        value={comment} 
                        onChange={e => setComment(e.target.value)} 
                        className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-accent outline-none transition-all" 
                        placeholder="Write your honest review here..."
                        rows="3"
                    ></textarea>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                        {imageFiles.map((file, i) => (
                            <div key={i} className="relative w-16 h-16 bg-gray-200 rounded-lg overflow-hidden border">
                                <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" alt="preview" />
                                <button onClick={() => removeSelectedImage(i)} className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl-lg">
                                    <X size={12} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <label className="cursor-pointer flex items-center gap-2 text-gray-600 hover:text-accent transition-colors">
                            <ImageIcon size={22} /> 
                            <span className="text-sm font-medium">Attach Images (Max 5)</span>
                            <input type="file" multiple className="hidden" onChange={handleImageChange} accept="image/*" />
                        </label>
                        <button 
                            onClick={handleSubmitReview} 
                            disabled={isSubmitting} 
                            className="w-full sm:w-auto bg-accent text-white cursor-pointer px-8 py-2.5 rounded-xl font-bold hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
                        >
                            {isSubmitting ? "Posting..." : "Submit Review"}
                        </button>
                    </div>
                </div>
            )}

            <div className="space-y-8">
                {loading ? (
                    <p className="text-center text-gray-400">Loading amazing reviews...</p>
                ) : reviews.length === 0 ? (
                    <p className="text-center text-gray-400">No reviews yet. Be the first to share your thoughts!</p>
                ) : (
                    reviews.map((rev) => {
                        const rawToken = localStorage.getItem("token");
                        let isAdmin = false;
                        let isOwner = false;

                        if (rawToken) {
                            try {
                                const tokenData = JSON.parse(atob(rawToken.split('.')[1]));
                                isAdmin = tokenData.role === "admin";
                                isOwner = tokenData.email === rev.email;
                            } catch (e) {
                                console.error("Token decode error", e);
                            }
                        }

                        return (
                            <div key={rev.reviewId} className="group border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-4">
                                        <img 
                                            src={rev.profilePicture || "/images/default-profile.png"} 
                                            className="w-12 h-12 rounded-full object-cover border-2 border-accent" 
                                            alt="user" 
                                        />
                                        <div>
                                            <p className="font-bold text-gray-800 text-lg">{rev.name}</p>
                                            <div className="flex items-center gap-1 text-yellow-500">
                                                {[...Array(rev.rating)].map((_, i) => (
                                                    <Star key={i} size={14} className="fill-current" />
                                                ))}
                                                <span className="text-gray-400 text-xs ml-2">
                                                    {new Date(rev.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                        
                                    <div className="flex items-center gap-4">
                
                                    {isOwner && (
                                        <Pencil 
                                            size={18} 
                                            className="text-gray-300 hover:text-secondary cursor-pointer transition-colors" 
                                            onClick={() => {
                                                setEditingId(rev.reviewId);
                                                setEditComment(rev.message);
                                                setEditRating(rev.rating);
                                            }}
                                        />
                                    )}
                                    
                                    {(isOwner || isAdmin) && (
                                        <Trash2 
                                            size={20} 
                                            className="text-gray-300 hover:text-red-500 cursor-pointer transition-colors" 
                                            onClick={() => handleDelete(rev.reviewId)} 
                                        />
                                    )}
                                </div>
                            </div>

                                                {editingId === rev.reviewId ? (
                                                    <div className="mt-4 p-4 border border-blue-200 rounded-xl bg-blue-50">
                                                        <div className="flex gap-1 mb-3">
                                                            {[1, 2, 3, 4, 5].map(s => (
                                                                <Star 
                                                                    key={s} 
                                                                    size={22} 
                                                                    className={`cursor-pointer transition-colors ${s <= editRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                                                                    onClick={() => setEditRating(s)} 
                                                                />
                                                            ))}
                                                        </div>
                                                        <textarea 
                                                            value={editComment} 
                                                            onChange={(e) => setEditComment(e.target.value)} 
                                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                            rows="3"
                                                        ></textarea>
                                                        <div className="flex gap-3 mt-3">
                                                            <button 
                                                                onClick={() => handleUpdateReview(rev.reviewId)} 
                                                                className="bg-accent cursor-pointer text-white px-5 py-1.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                                            >
                                                                Save Changes
                                                            </button>
                                                            <button 
                                                                onClick={() => setEditingId(null)} 
                                                                className="bg-gray-300 text-gray-700 px-5 py-1.5 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <p className="mt-4 text-gray-600 leading-relaxed italic">"{rev.message}"</p>
                                                )}
                                                
                                                {rev.images && rev.images.length > 0 && (
                                                    <div className="flex gap-3 mt-4 overflow-x-auto pb-2 custom-scrollbar">
                                                        {rev.images.map((img, i) => (
                                                            <img 
                                                                key={i} 
                                                                src={img} 
                                                                className="w-24 h-24 object-cover rounded-xl border border-gray-100 hover:scale-105 transition-transform" 
                                                                alt="review attachment" 
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })
                                )}
                        </div>
        </div>
    );
}