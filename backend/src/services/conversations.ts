import { db } from "../db";
import { JsonObject } from "../generated/prisma/internal/prismaNamespace";
// CONVERSATIONS SHOULD NOT BE CREATED OR DELETED SINCE TASK AUTO CREATES AND DELETES!

export async function getAllConversations() {
    //This will get all conversations
    return await db.conversation.findMany();
}

export async function getConversationByID(conversationID: number) {
    return await db.conversation.findUnique({
        where: { conversationID: conversationID }, //TODO why does this one not need to be Number() ??
    });
}

export async function createMessage(conversationID: Number, body: JsonObject) {
    let { senderID, content } = body;
    let message = await db.message.create({
        data: {
            conversationID: Number(conversationID),
            senderID: Number(senderID),
            content: String(content),
        },
    });

    //TODO Do i need to insert this message into the conversation Message list? or can i just use a query to find it via query convoID?
    //TODO create
    return;
}

export async function getAllMessages(conversationID: Number) {
    return await db.message.findMany({
        where: {
            conversationID: Number(conversationID), //TODO Why
        },
    });
    //TODO create (This will be specific to a conversation)
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

//TODO why does everything need to be Number() if their type is already declared as Number?

export async function deleteMessage(conversationID: Number, messageID: Number) {
    await db.message.delete({
        where: {
            messageID: Number(messageID),
            AND: { conversationID: Number(conversationID) },
        },
    });
    return;
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
