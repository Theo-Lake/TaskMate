import express from "express";
import { hashtagController } from "../controllers/hashtags";
const router = express.Router();

//GET hashtag by ID
router.get("/:hashtagID", hashtagController.getHashtagByID);

// GET all hashtags
router.get("/", hashtagController.getAllHashtags);

// GET all hashtags from single task
router.get("/task/:taskID", hashtagController.getHashtagsFromTask);

// GET all tasks with single hashtag
router.get("/:hashtagID", hashtagController.getTasksFromHashtag);

// CREATE hashtag
router.post("/", hashtagController.createHashtag);

// DELETE hashtag
router.delete("/:hashtagID", hashtagController.deleteHashtag);

// ADD hashtag
router.post("/task/:taskID/:hashtagID", hashtagController.addHashtagToTask);

// REMOVE hashtag
router.delete("/task/:taskID/:hashtagID", hashtagController.removeHashtagFromTask);


export default router;