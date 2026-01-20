import { createClient } from "@supabase/supabase-js";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkZ3V3dWVmcG5iZHhzd3R6cGlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4MTQyNzYsImV4cCI6MjA4NDM5MDI3Nn0._bjjnm_cdAEkr4JYDUQ9qVxzzoPsU_La-RJVuhh36s0"
const supabaseUrl = "https://rdguwuefpnbdxswtzpir.supabase.co"


const supabase = createClient(supabaseUrl, supabaseKey)

export default function uploadFile(file){
    return new Promise(
        (resolve, reject)=>{
            if(file == null){
                reject ("No file provided")
                return
            }

            const timeStamp = new Date().getTime()
            const fileName = timeStamp + "-"+file.name

            supabase.storage.from("images").upload(fileName, file, {
                upsert : false,
                cacheControl : 3600
            }).then(
                ()=>{
                    const url = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl
                    resolve(url)
                }
            ).catch(
                ()=>{
                    reject("Failed to upload file")
                }
            )
            
        }
    )
}