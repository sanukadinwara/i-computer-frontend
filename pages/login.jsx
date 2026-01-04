import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage(){
    const [email,setEmail] = useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate()

    function login(){

        try{
        
        axios.post(import.meta.env.VITE_API_URL + "/users/login", 
            {
                email : email,
                password : password
            }
        )
        console.log(response)
        toast.success("Login Successful")
        localStorage.setItem("token" , response.data.token)
            if(response.data.role == "admin"){
                navigate("/admin/")
            }else{
                navigate("/")
            }
        }catch(error){
                toast.error("Login Failed")
                console.log(error)
            }
    }

    return(
        <div className="w-full h-full bg-[url('/background.jpg')] bg-cover no-repeat flex justify-center items-center">
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
                    <button onClick={login} className="m-5 p-3 w-[90%] h-[50px] rounded-lg bg-accent text-secondary font-bold">Login</button>
                    <p className="w-full text-center"><Link to="/password-reset" className="text-primary">Forget Password</Link></p>
                    
                    <div className="flex">
                        <button className="m-5 p-3 w-[90%] h-[50px] rounded-lg border border-accent text-primary">Login with Google</button>
                        <button className="m-5 p-3 w-[90%] h-[50px] rounded-lg border border-accent text-primary">Login with Facebook</button>
                    </div>
                    <p className="w-full text-center text-primary">Don't have an account? <Link to="/register" className="text-accent">Register</Link></p>
                </div>
                
        </div>
    )
}