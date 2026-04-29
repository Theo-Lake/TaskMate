import AsyncStorage from "@react-native-async-storage/async-storage";

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

async function uploadToSupabase(bucket: string, filePath: string, uri: string): Promise<string> {
    const formData = new FormData();
    formData.append("file", { uri, name: "photo.jpg", type: "image/jpeg" } as any);

    const response = await fetch(
        `${SUPABASE_URL}/storage/v1/object/${bucket}/${filePath}`,
        {
            method: "POST",
            headers: { Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
            body: formData,
        }
    );

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message ?? `Upload failed (${response.status})`);
    }

    return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${filePath}`;
}

export async function uploadProfilePicture(uri: string, userId: string): Promise<string> {
    return uploadToSupabase("profile-pictures", `avatars/${userId}-${Date.now()}.jpg`, uri);
}

export async function uploadTaskImage(uri: string): Promise<string> {
    const userId = await AsyncStorage.getItem("userId") ?? "unknown";
    return uploadToSupabase("task-images", `tasks/${userId}-${Date.now()}.jpg`, uri);
}

export async function uploadEventImage(uri: string): Promise<string> {
    const userId = await AsyncStorage.getItem("userId") ?? "unknown";
    return uploadToSupabase("event-images", `events/${userId}-${Date.now()}.jpg`, uri);
}
