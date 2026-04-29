import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "./supabase";

function buildFormData(uri: string, fileName: string): FormData {
    const formData = new FormData();
    formData.append("file", { uri, name: fileName, type: "image/jpeg" } as any);
    return formData;
}

export async function uploadProfilePicture(uri: string, userId: string): Promise<string> {
    const filePath = `avatars/${userId}-${Date.now()}.jpg`;

    const { error } = await supabase.storage
        .from("profile-pictures")
        .upload(filePath, buildFormData(uri, filePath), { contentType: "image/jpeg", upsert: true });

    if (error) throw new Error(error.message);

    const { data } = supabase.storage.from("profile-pictures").getPublicUrl(filePath);
    return data.publicUrl;
}

export async function uploadTaskImage(uri: string): Promise<string> {
    const userId = await AsyncStorage.getItem("userId") ?? "unknown";
    const filePath = `tasks/${userId}-${Date.now()}.jpg`;

    const { error } = await supabase.storage
        .from("task-images")
        .upload(filePath, buildFormData(uri, filePath), { contentType: "image/jpeg", upsert: true });

    if (error) throw new Error(error.message);

    const { data } = supabase.storage.from("task-images").getPublicUrl(filePath);
    return data.publicUrl;
}

export async function uploadEventImage(uri: string): Promise<string> {
    const userId = await AsyncStorage.getItem("userId") ?? "unknown";
    const filePath = `events/${userId}-${Date.now()}.jpg`;

    const { error } = await supabase.storage
        .from("event-images")
        .upload(filePath, buildFormData(uri, filePath), { contentType: "image/jpeg", upsert: true });

    if (error) throw new Error(error.message);

    const { data } = supabase.storage.from("event-images").getPublicUrl(filePath);
    return data.publicUrl;
}
