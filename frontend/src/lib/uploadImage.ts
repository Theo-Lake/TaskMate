import * as FileSystem from "expo-file-system";

async function uriToBase64DataUri(uri: string): Promise<string> {
    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: "base64" });
    return `data:image/jpeg;base64,${base64}`;
}

export async function uploadProfilePicture(uri: string, _userId: string): Promise<string> {
    return uriToBase64DataUri(uri);
}

export async function uploadTaskImage(uri: string): Promise<string> {
    return uriToBase64DataUri(uri);
}

export async function uploadEventImage(uri: string): Promise<string> {
    return uriToBase64DataUri(uri);
}
