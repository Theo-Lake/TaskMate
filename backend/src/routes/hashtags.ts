import express from "express";
import { hashtagController } from "../controllers/hashtags";
const router = express.Router();

// GET all hashtags
router.get("/", hashtagController.getAllHashtags);

//GET hashtag by ID
router.get("/id/:hashtagId", hashtagController.getHashtagByID);

// GET all hashtags from single task
router.get("/allByTaskId/:taskId", hashtagController.getAllHashtagsFromTask);

// GET all tasks with single hashtag
router.get(
    "/allByHashtagId/:hashtagId",
    hashtagController.getAllTasksFromHashtag
);

// CREATE hashtag
router.post("/create/", hashtagController.createHashtag);

// DELETE hashtag
router.delete("/delete/:hashtagId", hashtagController.deleteHashtag);

// ADD hashtag
router.put("/:taskId/add/:hashtagId", hashtagController.addHashtagToTask);

// REMOVE hashtag
router.put(
    "/:taskId/remove/:hashtagId",
    hashtagController.removeHashtagFromTask
);

export default router;
