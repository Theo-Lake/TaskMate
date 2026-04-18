import client from "./client";

export async function getAllConversations() {
    const res = await client.get("/conversations");
    return res.data;
}

export async function getConversationById(convoId: number) {
    const res = await client.get(`/conversations/${convoId}`);
    return res.data;
}

export async function getAllMessages(convoId: number) {
    const res = await client.get(`/conversations/${convoId}/messages`);
    return res.data;
}

export async function getMessageById(convoId: number, messageId: number) {
    const res = await client.get(`/conversations/${convoId}/messages/${messageId}`);
    return res.data;
}

export async function createMessage(convoId: number, data: unknown) {
    const res = await client.post(`/conversations/${convoId}/messages`, data);
    return res.data;
}

export async function deleteMessage(convoId: number, messageId: number) {
    const res = await client.delete(`/conversations/${convoId}/messages/${messageId}`);
    return res.data;
}
