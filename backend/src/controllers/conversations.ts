import { Request, Response } from "express";
import { conversationServices } from "../services/conversations";

async function getAllConversations(req: Request, res: Response) {
    try {
        const conversations = await conversationServices.getAllConversations();
        console.log("Conversation GET all request accepted.");
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
        if (!conversation) {
            res.status(404).json({ error: "Conversation not found" });
            return;
        }
        console.log("Conversation by ID GET request accepted.");
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

        console.log("Messages GET all request accepted.");
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
        if (!message) {
            res.status(404).json({ error: "Message not found" });
            return;
        }
        console.log("Message GET request accepted.");
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
        const senderID = req.user!.userID;

        const message = await conversationServices.createMessage(
            conversationID,
            senderID,
            req.body
        );

        console.log("Message CREATE accepted.");
        res.status(201).json(message);
    } catch (error) {
        if (
            error instanceof Error &&
            error.message === "senderID or content is missing"
        ) {
            res.status(400).json({ error: error.message });
        } else {
            console.log(
                `An error occured while trying to create message: ${error}`
            );
            res.status(500).json({ error: String(error) });
        }
    }
}

async function deleteMessage(req: Request, res: Response) {
    try {
        const conversationID = Number(req.params.convoId);
        const messageID = Number(req.params.messageId);

        const message = await conversationServices.getMessageByID(
            conversationID,
            messageID
        );
        if (!message) {
            res.status(404).json({ error: "Message not found" });
            return;
        }

        if (message.senderID !== req.user!.userID) {
            res.status(403).json({
                error: "Forbidden: Request userID does not match authenticated user",
            });
            return;
        }

        await conversationServices.deleteMessage(conversationID, messageID);

        console.log("Message DELETE request accepted.");
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
