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

export async function createMessage(
    conversationID: Number,
    senderID: Number,
    body: JsonObject
) {
    const { content } = body;
    if (!senderID || !content)
        throw new Error("senderID or content is missing");

    const conversation = await getConversationByID(conversationID);

    if (!conversation)
        throw new Error(
            `Conversation ${conversationID} doesn't exist or could not be found.`
        );

    if (
        senderID !== Number(conversation.user1ID) &&
        senderID !== Number(conversation.user2ID)
    )
        throw new Error(
            `Sender ${senderID} is not in conversation ${conversationID}`
        );

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
    return await db.message.findFirst({
        where: {
            messageID: Number(messageID),
            conversationID: Number(conversationID),
        },
    });
}

export async function deleteMessage(conversationID: Number, messageID: Number) {
    return await db.message.delete({
        where: {
            messageID: Number(messageID),
            conversationID: Number(conversationID),
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
