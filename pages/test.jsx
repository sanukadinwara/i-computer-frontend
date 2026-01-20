import { useState } from "react";
import uploadFile from "../src/utils/mediaUpload";

export default function App() {

  const [file, setFile] = useState(null)

  async function upload(){
    try{
      const url = await uploadFile(file)
      console.log(url)
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="w-full h-full bg-white flex justify-center items-center">
      
      <input type="file" onChange={
        (e)=>{
          setFile(e.target.files[0])
        }} />
        <button onClick={upload} className="w-[100px] h-[40px] bg-blue-500 text-white rounded-lg">Upload</button>

    </div>
  );
}
