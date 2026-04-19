import { supabase } from "./supabase";

export async function uploadProfilePicture(uri: string, userId: string): Promise<string> {
    const response = await fetch(uri);
    const blob = await response.blob();

    const filePath = `avatars/${userId}-${Date.now()}.jpg`;

    const { error } = await supabase.storage
        .from("profile-pictures")
        .upload(filePath, blob, { contentType: "image/jpeg", upsert: true });

    if (error) throw new Error(error.message);

    const { data } = supabase.storage.from("profile-pictures").getPublicUrl(filePath);
    return data.publicUrl;
}
