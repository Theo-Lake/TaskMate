import { db } from "../db";
import { JsonObject } from "../generated/prisma/internal/prismaNamespace";

export async function getAllConversations() {
    //This will get all conversations
    return db.conversation.findMany();
}

//TODO get conversationById

// CONVERSATIONS SHOULD NOT BE CREATED SINCE TASK AUTO CREATES ONE!

export async function createMessage(body: JsonObject) {
    // Should this have their seperate folder? messages? idk
    //TODO create
}

export async function getAllMessages(body: JsonObject) {
    //TODO create (This will be specific to a conversation)
}

// I dont think conversations should be putted? like it should not update with manual input.

// Is a delete needed? i dont think so since it cascades with the deletion of the task.

// editing a message, and deleting a message should be implemented way later i think.

export const conversationServices = {
    getAllConversations,
    createMessage, //TODO THIS MIGHT BE WRONG AND SHOULD BE IN SEPERATE FOLDER
    getAllMessages,
};
