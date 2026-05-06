import axios from "axios";
import { useEffect, useState } from "react";
import uploadFile from "../src/utils/mediaUpload";
import toast from "react-hot-toast";

export default function SettingsPage(){

    const [firstName , setFirstName] = useState("")
    const [lastName , setLastName] = useState("")
    const [existingImageUrl , setExistingImageUrl] = useState("")
    const [file , setFile] = useState(null)
    const [password , setPassword] = useState("")
    const [confirmPassword , setConfirmPassword] = useState("")

    useEffect(
        ()=>{
            const token = localStorage.getItem("token")
            if(token != null){
                axios.get(import.meta.env.VITE_API_URL+"/users/profile" ,{
                    headers : {
                        "Authorization" : `Bearer ${token}`
                    }
                }).then(
                    (response)=>{
                        console.log(response.data)
                        setFirstName(response.data.firstName)
                        setLastName(response.data.lastName)
                        setExistingImageUrl(response.data.image)
                    }
                ).catch(
                    ()=>{
                        localStorage.removeItem("token")
                        window.location.href="/login"
                    }
                )
            }else{
                window.location.href="/login"
            }
        },[]
    );

    async function updateProfile() {
        const token = localStorage.getItem("token");

        const updatedInfo = {
            firstName: firstName,
            lastName: lastName,
            image : existingImageUrl
        }

        if (file != null) {
            updatedInfo.image = await uploadFile(file)
        }

        const response = await axios.put(import.meta.env.VITE_API_URL + "/users/", updatedInfo, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }

        toast.success("Profile updated successfully")
        window.location.reload()
    }

    async function changePassword() {
        if(password != confirmPassword){
            toast.error("Passwords do not match")
            return
        }
        const token = localStorage.getItem("token");
        await axios.post(import.meta.env.VITE_API_URL + "/users/update-password", {
            password : password
        } , {
            headers : {
                Authorization: `Bearer ${token}`,
            },
        })

        toast.success("Password changed successfully")

        window.location.reload()
    }

    return(
        <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center flex-col gap-4">
            
            <div className="w-[400px] h-[350px] rounded-lg overflow-hidden bg-white flex flex-col gap-2 pb-5">
                <h1 className="text-2xl font-bold p-5 text-accent">Account Settings</h1>
                
                <input value={firstName} onChange={(e)=>{
                    setFirstName(e.target.value)
                }} className="w-[90%] h-[50px] p-3 border border-secondary rounded-lg mx-auto" placeholder="First Name"/>
                
                <input value={lastName} onChange={(e)=>{
                    setLastName(e.target.value)
                }} className="w-[90%] h-[50px] p-3 border border-secondary rounded-lg mx-auto" placeholder="Last Name"/>
                
                <input type="file" onChange={(e)=>{
                    setFile(e.target.files[0])
                }} className="w-[90%] h-[50px] p-3 border border-secondary rounded-lg mx-auto cursor-pointer" placeholder="Profile Picture"/>

                <button onClick={updateProfile} className="w-[90%] h-[50px] bg-accent cursor-pointer text-white rounded-lg mx-auto font-bold">
                    Change Settings
                </button>
            </div>

            <div className="w-[400px] h-[250px] rounded-lg overflow-hidden bg-white flex flex-col gap-2 pb-5">
                <h1 className="text-2xl font-bold p-5 text-accent">Change Password</h1>
                
                <input type="password" value={password} onChange={(e)=>{
                    setPassword(e.target.value)
                }} className="w-[90%] h-[50px] p-3 border border-secondary rounded-lg mx-auto" placeholder="New Password"/>
                
                <input type="password" value={confirmPassword} onChange={(e)=>{
                    setConfirmPassword(e.target.value)
                }} className="w-[90%] h-[50px] p-3 border border-secondary rounded-lg mx-auto" placeholder="Confirm New Password"/>

                <button onClick={changePassword} className="w-[90%] h-[50px] bg-accent cursor-pointer text-white rounded-lg mx-auto font-bold">
                    Update Password
                </button>
            </div>

        </div>
    )
}