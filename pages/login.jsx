import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage(){
    const [email,setEmail] = useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate()
    const googleLogin = useGoogleLogin(
    {
        onSuccess: (response)=>{
            axios.post(import.meta.env.VITE_API_URL + "/users/google-login" , {token : response.access_token}).then(
                (response)=>{
                    toast.success("Login Successful")
                    localStorage.setItem("token" , response.data.token)
                    localStorage.setItem("user", JSON.stringify(response.data.user));
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

    async function login(){
        try{
            const response = await axios.post(import.meta.env.VITE_API_URL + "/users/login", 
                {
                    email : email,
                    password : password
                }
            )
            console.log(response)
            toast.success("Login Successful")
            localStorage.setItem("token" , response.data.token)
            localStorage.setItem("role" , response.data.role)
            localStorage.setItem("user", JSON.stringify({ email: email }));
            
            if(response.data.role == "admin"){
                navigate("/admin/")
            }else{
                navigate("/")
            }
        }catch(error){
            toast.error("Invalid Email or Password")
            console.log(error)
        }
    }

    return(
        <div className="w-full h-full bg-[url('/background.jpg')] bg-[length:100%_120%] bg-no-repeat bg-85%] flex justify-center items-center">
            <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="relative backdrop-blur-md w-[450px] h-[450px] shadow-2xl rounded-2xl flex flex-col justify-center">
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
                    <button onClick={login} className="m-5 p-3 w-[90%] h-[50px] cursor-pointer rounded-lg bg-accent text-primary font-bold hover:brightness-125 transition-all duration-300">Login</button>
                    <p className="w-full text-center"><Link to="/password-reset" className="text-primary">Forget Password</Link></p>
                    
                    <div className="flex">
                        <div className="m-5 w-[90%] h-[50px] rounded-lg bg-accent p-[1px]">
                            <button onClick={googleLogin} className="w-full h-full rounded-[7px] bg-[#0a0a0a] text-primary cursor-pointer hover:bg-black/50 transition-all">Login with Google</button>
                        </div>

                        <div className="m-5 w-[90%] h-[50px] rounded-lg bg-accent p-[1px]">
                            <button className="w-full h-full rounded-[7px] bg-[#0a0a0a] text-primary cursor-pointer hover:bg-black/50 transition-all">Login with Facebook</button>
                        </div>
                    </div>
                    <p className="w-full text-center text-primary">
                        Don't have an account? <Link to="/register" className="bg-accent bg-clip-text text-transparent font-bold ml-1">Sign Up</Link>
                    </p>
                </div>
                
        </div>
    )
}