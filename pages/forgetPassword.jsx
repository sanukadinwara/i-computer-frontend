import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function ForgetPassword(){

    const [email , setEmail] = useState("")
    const [step , setStep] = useState(1)
    const [otp , setOtp] = useState("")
    const [newPassword , setNewPassword] = useState("")
    const [confirmPassword , setConfirmPassword] = useState("")
    const navigate = useNavigate()

    async function sendOtp(){
        try{
            await axios.post(import.meta.env.VITE_API_URL + "/users/send-otp" , {email : email})
            toast.success("OTP sent to your email. Please check your inbox.")
            setStep(2) 
        }catch(err){
            toast.error(err?.response?.data?.message || "Failed to send OTP. Please try again.")
        }
    }

    function handleVerifyOtpStep() {
        if(otp.trim() === ""){
            toast.error("Please enter the OTP.");
            return;
        }
        setStep(3) 
    }

    async function resetPassword(){
        if(newPassword !== confirmPassword){
            toast.error("Passwords do not match. Please try again.")
            return
        }

        try{
            await axios.post(import.meta.env.VITE_API_URL + "/users/verify-otp" , {email : email , otp : otp , newPassword : newPassword})
            toast.success("Password reset successful. You can now log in with your new password.")
            navigate("/login")
            
        }catch(err){
            toast.error(err?.response?.data?.message || "Failed to reset password. Please try again.")
        }
    }

    return(
        <div className="flex justify-center items-center h-screen bg-primary">
            {step === 1 && (
                <div className="w-[400px] h-[300px] backdrop-blur-3xl rounded-lg shadow-2xl flex flex-col justify-center items-center">
                    <h1 className="text-xl font-semibold mb-5 text-secondary">Reset Password</h1>
                    <p className="text-md text-secondary/70 pb-7">Enter your email to receive a code.</p>
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="w-[80%] p-3 rounded-lg border border-secondary outline-none mb-5"
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                    <button onClick={sendOtp} className="w-[80%] p-3 bg-accent hover:bg-accent/70 rounded-lg text-white font-bold">
                        Send OTP
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="w-[400px] h-[300px] backdrop-blur-3xl rounded-lg shadow-2xl flex flex-col justify-center items-center">
                    <h1 className="text-xl font-semibold mb-5 text-secondary">Enter OTP</h1>
                    <p className="text-md text-secondary/70 pb-7">Enter your 6-digit OTP code.</p>
                    <input 
                        type="text" 
                        placeholder="Enter OTP" 
                        className="w-[80%] p-3 rounded-lg border border-secondary outline-none mb-5"
                        onChange={(e)=> setOtp(e.target.value)}
                    />
                    <button onClick={handleVerifyOtpStep} className="w-[80%] p-3 bg-accent hover:bg-accent/70 rounded-lg text-white font-bold">
                        Next
                    </button>
                </div>
            )}

            {step === 3 && (
                <div className="w-[400px] h-[350px] backdrop-blur-3xl rounded-lg shadow-2xl flex flex-col justify-center items-center">
                    <h1 className="text-xl font-semibold mb-5 text-secondary">Reset Password</h1>
                    <input 
                        type="password" 
                        placeholder="Enter new password" 
                        className="w-[80%] p-3 rounded-lg border border-secondary outline-none mb-5"
                        onChange={(e)=> setNewPassword(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm new password" 
                        className="w-[80%] p-3 rounded-lg border border-secondary outline-none mb-5"
                        onChange={(e)=> setConfirmPassword(e.target.value)}
                    />
                    <button onClick={resetPassword} className="w-[80%] p-3 bg-accent hover:bg-accent/70 rounded-lg text-white font-bold">
                        Reset Password
                    </button>
                </div>
            )}
        </div>
    )
}