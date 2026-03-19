import { Request, Response } from "express";
import { conversationServices } from "../services/conversations";
// TODO Import validation on all endpoints.

async function getAllConversations(req: Request, res: Response) {
    try {
        const conversations = await conversationServices.getAllConversations();
        console.log("Conversation get all request accepted.");
        res.status(200).json(conversations);
    } catch (error) {
        console.log(
            `An error occured while trying to get conversation: ${error}`
        );
        res.status(500).json({ error: String(error) });
    }
}

async function getConversationById(req: Request, res: Response) {
    try {
        const conversationID = Number(req.params.convoId);
        const conversation =
            await conversationServices.getConversationByID(conversationID);
        console.log("Conversation by ID get request accepted.");
        res.status(200).json(conversation);
    } catch (error) {
        console.log(
            `An error occured while trying to get conversation by ID: ${error}`
        );
        res.status(500).json({ error: String(error) });
    }
}

async function getAllMessages(req: Request, res: Response) {
    try {
        const conversationID = Number(req.params.convoId);
        const messages =
            await conversationServices.getAllMessages(conversationID);

        console.log("Messages get all request accepted.");
        res.status(200).json(messages);
    } catch (error) {
        console.log(`An error occured while trying to get messages: ${error}`);
        res.status(500).json({ error: String(error) });
    }
}

async function getMessageById(req: Request, res: Response) {
    try {
        const conversationID = Number(req.params.convoId);
        const messageID = Number(req.params.messageId);

        const message = await conversationServices.getMessageByID(
            conversationID,
            messageID
        );

        console.log("Message get request accepted.");
        res.status(200).json(message);
    } catch (error) {
        console.log(
            `An error occured while trying to get the message: ${error}`
        );
        res.status(500).json({ error: String(error) });
    }
}

async function createMessage(req: Request, res: Response) {
    try {
        const conversationID = Number(req.params.convoId);
        await conversationServices.createMessage(conversationID, req.body);

        console.log("Message creation accepted.");
        res.status(201).json({ message: "Message created" });
    } catch (error) {
        console.log(
            `An error occured while trying to create message: ${error}`
        );
        res.status(500).json({ error: String(error) });
    }
}

async function deleteMessage(req: Request, res: Response) {
    try {
        const conversationID = Number(req.params.convoId);
        const messageID = Number(req.params.messageId);

        await conversationServices.deleteMessage(conversationID, messageID);

        console.log("Message delete request accepted.");
        res.status(200).json("Succesful deletion");
    } catch (error) {
        console.log(
            `An error occured while trying to delete the message: ${error}`
        );
        res.status(500).json({ error: String(error) });
    }
}

export const conversationController = {
    getAllConversations,
    getConversationById,
    getAllMessages,
    getMessageById,
    createMessage,
    deleteMessage,
};
