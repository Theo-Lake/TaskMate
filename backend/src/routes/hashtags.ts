import express from "express";
import { hashtagController } from "../controllers/hashtags";
import { validate } from "../middleware/validation/validate";
import { HashtagSchema } from "../middleware/validation/schemas/hashtags";
import { auth } from "../middleware/authentication/auth";
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
router.post(
    "/",
    auth.withAuth,
    validate(HashtagSchema),
    hashtagController.createHashtag
);

// DELETE hashtag
router.delete("/:hashtagId", auth.withAuth, hashtagController.deleteHashtag);

// ADD hashtag
router.patch(
    "/:taskId/add/:hashtagId",
    auth.withAuth,
    hashtagController.addHashtagToTask
);

// REMOVE hashtag
router.patch(
    "/:taskId/remove/:hashtagId",
    auth.withAuth,
    hashtagController.removeHashtagFromTask
);

export default router;
