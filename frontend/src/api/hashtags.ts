import client from "./client";

export async function getAllHashtags() {
    const res = await client.get("/hashtags");
    return res.data;
}

export async function getHashtagById(hashtagId: number) {
    const res = await client.get(`/hashtags/id/${hashtagId}`);
    return res.data;
}

export async function getAllHashtagsFromTask(taskId: number) {
    const res = await client.get(`/hashtags/allByTaskId/${taskId}`);
    return res.data;
}

export async function getAllTasksFromHashtag(hashtagId: number) {
    const res = await client.get(`/hashtags/allByHashtagId/${hashtagId}`);
    return res.data;
}

export async function createHashtag(data: unknown) {
    const res = await client.post("/hashtags", data);
    return res.data;
}

export async function deleteHashtag(hashtagId: number) {
    const res = await client.delete(`/hashtags/${hashtagId}`);
    return res.data;
}

export async function addHashtagToTask(taskId: number, hashtagId: number) {
    const res = await client.patch(`/hashtags/${taskId}/add/${hashtagId}`);
    return res.data;
}

export async function removeHashtagFromTask(taskId: number, hashtagId: number) {
    const res = await client.patch(`/hashtags/${taskId}/remove/${hashtagId}`);
    return res.data;
}
