import express from "express";
const router = express.Router(); // Creating a different router for every route, so circular dependency does not occur
import { conversationController } from "../controllers/conversations";

// CONVERSATION GET all conversations ENDPOINT
router.get("/", conversationController.getAllConversations);

// GET all messages ENDPOINT
router.get("/messages", conversationController.getAllMessages);

// MESSAGES POST
router.post("/messages", conversationController.createMessage);

export default router;
