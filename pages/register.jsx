import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

export default function RegisterPage() {
    const [firstName , setFirstName] = useState("")
    const [lastName , setLastName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()
        const googleLogin = useGoogleLogin(
    {
        onSuccess: (response)=>{
            axios.post(import.meta.env.VITE_API_URL + "/users/google-login" , {token : response.access_token}).then(
                (response)=>{
                    toast.success("Login Successful")
                    localStorage.setItem("token" , response.data.token)
                    if(response.data.role == "admin"){
                        navigate("/admin/")
                    }else{
                        navigate("/")
                    }
                }
            ).catch(
                (err)=>{
                    toast.error(err?.response?.data?.message || "Google login failed. Please try again.")
                }
            )
        }
    }
    )

    async function signup(){
        if(password != confirmPassword){
            toast.error("Passwords do not match")
            return
        }
        try{
            const response = await axios.post(import.meta.env.VITE_API_URL + "/users/",
            {
                firstName : firstName,
                lastName : lastName,
                email : email,
                password : password
            })
            console.log(response)
            toast.success("Signed Up Successfully")
            localStorage.setItem("token" , response.data.token)
            localStorage.setItem("role" , response.data.role)

                navigate("/login/")
        }catch(error){
            toast.error("Sign Up Failed")
            console.log(error)
        }
    }

    return(
        <div className="w-full min-h-screen bg-[url('/signup-background.jpg')] bg-cover bg-center no-repeat flex justify-center items-center py-10">
            <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="relative backdrop-blur-md w-[450px] h-[540px] shadow-2xl rounded-2xl flex flex-col justify-center">
                    <div className="flex w-[90%] ml-5 mt-5 mb-5 gap-4">
                        <input 
                            value={firstName} 
                            onChange={(e) => setFirstName(e.target.value)}
                            className="p-3 w-1/2 rounded-lg border border-primary outline-none text-primary"
                            type="text"
                            placeholder="First Name"
                        />
                        <input 
                            value={lastName} 
                            onChange={(e) => setLastName(e.target.value)}
                            className="p-3 w-1/2 rounded-lg border border-primary outline-none text-primary"
                            type="text"
                            placeholder="Last Name"
                        />
                    </div>
                    <input type="email" placeholder="Email" onChange={
                        (e)=>{
                            setEmail(e.target.value)
                        }
                    } className="m-5 p-3 w-[90%] rounded-lg border border-primary outline-none text-primary"/>
                    <input type="password" placeholder="Password" onChange={
                        (e)=>{
                            setPassword(e.target.value)
                        }
                    } className="m-5 p-3 w-[90%] rounded-lg border border-primary outline-none text-primary"/>
                    <input type="password" placeholder="Re-Enter Password" onChange={
                        (e)=>{
                            setConfirmPassword(e.target.value)
                        }
                    } className="m-5 p-3 w-[90%] rounded-lg border border-primary outline-none text-primary"/>
                    <button onClick={signup} className="m-5 p-3 w-[90%] h-[50px] cursor-pointer rounded-lg bg-accent text-primary font-bold hover:brightness-125 transition-all duration-300">Sign Up</button>
                    
                    <div className="flex w-[90%] ml-5 mb-5 gap-4">
                        <div className="w-1/2 h-[50px] rounded-lg bg-accent p-[1px]">
                            <button onClick={googleLogin} className="w-full h-full rounded-[7px] bg-[#0a0a0a] text-primary text-[14px] font-medium whitespace-nowrap cursor-pointer hover:bg-black/50 transition-all">Sign Up with Google</button>
                        </div>

                        <div className="w-1/2 h-[50px] rounded-lg bg-accent p-[1px]">
                            <button className="w-full h-full rounded-[7px] bg-[#0a0a0a] text-primary text-[14px] font-medium whitespace-nowrap cursor-pointer hover:bg-black/50 transition-all">Sign Up with Facebook</button>
                        </div>
                    </div>
                    <p className="w-full text-center text-primary pb-5">
                        Already have an account? <Link to="/login" className="bg-accent bg-clip-text text-transparent font-bold ml-1">Sign In</Link>
                    </p>
                </div>
                
        </div>
    )
}