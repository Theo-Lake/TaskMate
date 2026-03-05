import express from "express";
const router = express.Router(); // Creating a different router for every route, so circular dependency does not occur
import { conversationController } from "../controllers/conversations";

// CONVERSATION GET all conversations ENDPOINT
router.get("/conversations", conversationController.getAllConversations);

// MESSAGES GET ENDPOINT
router.get("/conversation/messages", conversationController.getAllMessages);

// MESSAGES POST
router.post("/conversation/messages", conversationController.createMessage);

export default router;
