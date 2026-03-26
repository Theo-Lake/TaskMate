import { db } from "../db";
import { JsonObject } from "../generated/prisma/internal/prismaNamespace";
// CONVERSATIONS SHOULD NOT BE CREATED OR DELETED SINCE TASK AUTO CREATES AND DELETES!

export async function getAllConversations() {
    //This will get all conversations
    return await db.conversation.findMany();
}

export async function getConversationByID(conversationID: Number) {
    return await db.conversation.findUnique({
        where: { conversationID: Number(conversationID) },
    });
}

export async function createMessage(conversationID: Number, body: JsonObject) {
    const { senderID, content } = body;
    if (!senderID || !content)
        throw new Error("senderID or content is missing");
    return await db.message.create({
        data: {
            conversationID: Number(conversationID),
            senderID: Number(senderID),
            content: String(content),
        },
    });
}

export async function getAllMessages(conversationID: Number) {
    return await db.message.findMany({
        where: {
            conversationID: Number(conversationID),
        },
    });
}

export async function getMessageByID(
    conversationID: Number,
    messageID: Number
) {
    return await db.message.findUnique({
        where: {
            messageID: Number(messageID),
            AND: {
                conversationID: Number(conversationID),
            },
        },
    });
}

export async function deleteMessage(conversationID: Number, messageID: Number) {
    return await db.message.delete({
        where: {
            messageID: Number(messageID),
            AND: { conversationID: Number(conversationID) },
        },
    });
}

// I dont think conversations should be putted? like it should not update with manual input.

// editing a message should be implemented way later i think.

export const conversationServices = {
    getAllConversations,
    createMessage,
    getConversationByID,
    getAllMessages,
    getMessageByID,
    deleteMessage,
};
