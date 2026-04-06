import express from "express";
const router = express.Router(); // Creating a different router for every route, so circular dependency does not occur
import { conversationController } from "../controllers/conversations";
import { validate } from "../middleware/validation/validate";
import { MessageSchema } from "../middleware/validation/schemas/messages";
import { auth } from "../middleware/authentication/auth";

// CONVERSATION GET all conversations ENDPOINT
router.get("/", conversationController.getAllConversations);

// CONVERSATION GET conversation by ID ENDPOINT
router.get("/:convoId", conversationController.getConversationById);

// MESSAGES GET all messages ENDPOINT
router.get("/:convoId/messages", conversationController.getAllMessages);

// MESSAGES GET messages by ID ENDPOINT
router.get(
    "/:convoId/messages/:messageId",
    conversationController.getMessageById
);

// MESSAGES POST ENDPOINT
router.post(
    "/:convoId/messages/:senderId",
    auth.withAuth,
    validate(MessageSchema),
    conversationController.createMessage
);

// MESSAGES delete (by ID) ENDPOINT
router.delete(
    "/:convoId/messages/:messageId",
    auth.withAuth,
    conversationController.deleteMessage
);

export default router;
