import { db } from "../db";
import { JsonObject } from "../generated/prisma/internal/prismaNamespace";
// CONVERSATIONS SHOULD NOT BE CREATED OR DELETED SINCE TASK AUTO CREATES AND DELETES!

export async function getAllConversations() {
    //This will get all conversations
    return await db.conversation.findMany();
}

export async function getConversationByID(conversationID: number) {
    return await db.conversation.findUnique({
        where: { conversationID: conversationID },
    });
}

export async function createMessage(conversationID: Number, body: JsonObject) {
    // Should this have their seperate folder? messages? idk
    //TODO create
}

export async function getAllMessages(conversationID: Number) {
    //TODO create (This will be specific to a conversation)
}

export async function getMessageByID(
    conversationID: Number,
    messageID: Number
) {
    //TODO
}

export async function deleteMessage(conversationID: Number, messageID: Number) {
    //TODO
}

// I dont think conversations should be putted? like it should not update with manual input.

// Is a delete needed? i dont think so since it cascades with the deletion of the task.

// editing a message, and deleting a message should be implemented way later i think.

export const conversationServices = {
    getAllConversations,
    createMessage,
    getConversationByID,
    getAllMessages,
    getMessageByID,
    deleteMessage,
};
