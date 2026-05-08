import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

export default function CheckOutDetailsModal(props) {
	const [isVisible, setIsVisible] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [addressLine1, setAddress] = useState("");
	const [addressLine2, setAddressLine2] = useState("");
	const [city, setCity] = useState("");
	const [postalCode, setPostalCode] = useState("");
	const [phone, setPhone] = useState("");

	const [navigate, setNavigate] = useState("");

	useEffect(() => {
        const token = localStorage.getItem("token");

        if (token == null) {
            toast.error("Please login to continue checkout");
            navigate("/login");
            return; 
        }

        axios.get(import.meta.env.VITE_API_URL + "/users/profile", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response.data);
			setFirstName(response.data.firstName)
			setLastName(response.data.lastName)
        }).catch(
            ()=>{
            localStorage.removeItem("token")
            window.location.href="/login"
        });

    }, []);

	const cart = props.cart;

	async function placeOrder() {
		console.log("Token from storage:", token);
		const token = localStorage.getItem("token");

		if (token == null) {
			toast.error("You must be logged in to place an order");
			window.location.href = "/login";
			return;
		}

		const order = {
			items: [],
			firstName: firstName,
			lastName: lastName,
			email: email,
			addressLine1: addressLine1,
			addressLine2: addressLine2,
			city: city,
			postalCode: postalCode,
			phone: phone,
		};
		cart.forEach((item) => {
			order.items.push({
				productId: item.product.productId,
				qty: item.qty,
			});
		});

		

		try {
			await axios.post(import.meta.env.VITE_API_URL + "/orders", order, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			toast.success("Order placed successfully");
			window.location.href = "/";
		} catch (err) {
			toast.error(err?.response?.data?.message || "Failed to place the order. Please try again.");
			return;
		}
	}

	return (
		<>
			<button
				className="bg-accent text-white px-4 py-2 rounded ml-5 hover:bg-accent/80 cursor-pointer"
				onClick={() => {
					setIsVisible(true);
				}}
			>
				Buy now
			</button>
			{isVisible && (
				<div className="fixed inset-0 w-full h-screen bg-black/50 flex justify-center items-center z-50 p-4">
					<div className="w-full max-w-[400px] max-h-[90vh] overflow-y-auto bg-white rounded-lg p-5 relative">
						<button
							onClick={() => {
								setIsVisible(false);
							}}
							className="w-[40px] h-[40px]  text-red-600 absolute top-0 right-0 text-xl font-bold hover:bg-red-600 hover:text-white cursor-pointer flex justify-center items-center"
						>
							<RxCross2/>
						</button>
						<h1 className="text-lg font-semibold text-secondary mb-5">
							Enter your details
						</h1>
						<div className="flex flex-col gap-3">
							<input
								value={props.firstName}
								onChange={(e) => {
									props.setFirstName(e.target.value);
								}}
								className="w-full border border-secondary/20 rounded px-3 py-2"
								type="text"
								placeholder="First Name"
							/>
							<input
								value={props.lastName}
								onChange={(e) => {
									props.setLastName(e.target.value);
								}}
								className="w-full border border-secondary/20 rounded px-3 py-2"
								type="text"
								placeholder="Last Name"
							/>
							<input
								value={props.email}
								onChange={(e) => {
									props.setEmail(e.target.value);
								}}
								className="w-full border border-secondary/20 rounded px-3 py-2"
								type="text"
								placeholder="Email"
							/>
							<input
								value={props.addressLine1}
								onChange={(e) => {
									props.setAddressLine1(e.target.value);
								}}
								className="w-full border border-secondary/20 rounded px-3 py-2"
								type="text"
								placeholder="Address Line 1"
							/>
							<input
								value={props.addressLine2}
								onChange={(e) => {
									props.setAddressLine2(e.target.value);
								}}
								className="w-full border border-secondary/20 rounded px-3 py-2"
								type="text"
								placeholder="Address Line 2"
							/>
							<input
								value={props.city}
								onChange={(e) => {
									props.setCity(e.target.value);
								}}
								className="w-full border border-secondary/20 rounded px-3 py-2"
								type="text"
								placeholder="City"
							/>
							<input
								value={props.postalCode}
								onChange={(e) => {
									props.setPostalCode(e.target.value);
								}}
								className="w-full border border-secondary/20 rounded px-3 py-2"
								type="text"
								placeholder="Postal Code"
							/>
							<input
								value={props.phone}
								onChange={(e) => {
									props.setPhone(e.target.value);
								}}
								className="w-full border border-secondary/20 rounded px-3 py-2"
								type="text"
								placeholder="Phone Number"
							/>
							<button
								onClick={props.placeOrder}
								className="bg-accent text-white px-4 py-2 rounded hover:bg-accent/80 mt-3 cursor-pointer"
							>
								Confirm
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}