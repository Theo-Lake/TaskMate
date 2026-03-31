import express from "express";
import { hashtagController } from "../controllers/hashtags";
const router = express.Router();

// GET all hashtags
router.get("/", hashtagController.getAllHashtags);

//GET hashtag by ID
router.get("/id/:hashtagId", hashtagController.getHashtagByID);

// GET all hashtags from single task
router.get("/viaTask/:taskId", hashtagController.getHashtagsFromTask);

// GET all tasks with single hashtag
router.get("/viaHashtag/:hashtagId", hashtagController.getTasksFromHashtag);

// CREATE hashtag
router.post("/create/", hashtagController.createHashtag);

// DELETE hashtag
router.delete("/delete/:hashtagId", hashtagController.deleteHashtag);

// ADD hashtag
router.put("/add/:taskId/:hashtagId", hashtagController.addHashtagToTask);

// REMOVE hashtag
router.put("/remove/:taskId/:hashtagId", hashtagController.removeHashtagFromTask);


export default router;