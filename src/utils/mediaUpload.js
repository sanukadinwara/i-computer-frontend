import { createClient } from "@supabase/supabase-js";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;


const supabase = createClient(supabaseUrl, supabaseKey)

export default async function uploadFile(file, folderName = "general") {
    try {
        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

        const filePath = `${folderName}/${fileName}`;
        
        const { data, error } = await supabase.storage
            .from('images')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            throw error;
        }

        const { data: publicUrlData } = supabase.storage
            .from('images')
            .getPublicUrl(filePath);

        return publicUrlData.publicUrl;

    } catch (error) {
        console.error("Error uploading file:", error);
        return null;
    }
}