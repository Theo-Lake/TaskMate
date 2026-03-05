import { Request, Response } from "express";
import { conversationServices } from "../services/conversations";

async function getAllConversations(req: Request, res: Response) {
    try {
        const { taskID } = req.body; //Getting taskID

        const conversation = await conversationServices.getAllConversations();
        console.log("Conversation get request accepted.");
        res.status(200).json(conversation);
    } catch (error) {
        console.log(
            `An error occured while trying to get conversation: ${error}`
        );
        res.status(500).json({ error: error });
    }
}

async function getAllMessages(req: Request, res: Response) {
    try {
        const messages = await conversationServices.getAllMessages(req.body);

        console.log("Messages request accepted.");
        res.status(200).json(messages);
    } catch (error) {
        console.log(`An error occured while trying to get messages: ${error}`);
        res.status(500).json({ error: error });
    }
}

async function createMessage(req: Request, res: Response) {
    try {
        await conversationServices.createMessage(req.body);

        console.log("Message creation accepted.");
        res.status(200).json({ Message: "Message created" });
    } catch (error) {
        console.log(
            `An error occured while trying to create message: ${error}`
        );
        res.status(500).json({ error: error });
    }
}

export const conversationController = {
    getAllConversations,
    getAllMessages,
    createMessage,
};
