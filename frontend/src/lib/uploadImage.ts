import AsyncStorage from "@react-native-async-storage/async-storage";
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

export async function uploadTaskImage(uri: string): Promise<string> {
    const userId = await AsyncStorage.getItem("userId") ?? "unknown";
    const response = await fetch(uri);
    const blob = await response.blob();

    const filePath = `tasks/${userId}-${Date.now()}.jpg`;

    const { error } = await supabase.storage
        .from("task-images")
        .upload(filePath, blob, { contentType: "image/jpeg", upsert: true });

    if (error) throw new Error(error.message);

    const { data } = supabase.storage.from("task-images").getPublicUrl(filePath);
    return data.publicUrl;
}

export async function uploadEventImage(uri: string): Promise<string> {
    const userId = await AsyncStorage.getItem("userId") ?? "unknown";
    const response = await fetch(uri);
    const blob = await response.blob();

    const filePath = `events/${userId}-${Date.now()}.jpg`;

    const { error } = await supabase.storage
        .from("event-images")
        .upload(filePath, blob, { contentType: "image/jpeg", upsert: true });

    if (error) throw new Error(error.message);

    const { data } = supabase.storage.from("event-images").getPublicUrl(filePath);
    return data.publicUrl;
}
