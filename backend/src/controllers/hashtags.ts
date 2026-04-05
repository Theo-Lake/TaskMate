import { Request, Response } from "express";
import { hashtagServices } from "../services/hashtags";

async function getHashtagByID(req: Request, res: Response) {
    try {
        const hashtagID = Number(req.params.hashtagId);
        const hashtag = await hashtagServices.getHashtagByID(hashtagID);

        if (!hashtag) {
            res.status(404).json({ error: "Hashtag not found " });
            return;
        }

        console.log("Hashtag GET by ID request accepted");
        res.status(200).json({ hashtag: hashtag });
    } catch (error) {
        console.log(
            `An error occured while trying to get hashtag by ID: ${error}`
        );
        res.status(500).json({ error: String(error) });
    }
}

async function getAllHashtags(req: Request, res: Response) {
    try {
        const hashtags = await hashtagServices.getAllHashtags();

        if (!hashtags) {
            res.status(404).json({ error: "Hashtags not found " });
            return;
        }

        console.log("Hashtags GET request accepted.");
        res.status(200).json({ hashtags: hashtags });
    } catch (error) {
        console.log(
            `An error occured while trying to get all hashtags: ${error}`
        );
        res.status(500).json({ error: String(error) });
    }
}

async function getAllHashtagsFromTask(req: Request, res: Response) {
    try {
        const taskID = Number(req.params.taskId);
        const hashtags = await hashtagServices.getAllHashtagsFromTask(taskID);

        if (!hashtags) {
            res.status(404).json({ error: "Hashtags not found " });
            return;
        }

        console.log("Hashtags GET hashtags from task request accepted.");
        res.status(200).json({ hashtags: hashtags });
    } catch (error) {
        console.log(
            `An error occured while trying to get all hashtags from single task: ${error}`
        );
        res.status(500).json({ error: String(error) });
    }
}

async function getAllTasksFromHashtag(req: Request, res: Response) {
    try {
        const hashtagID = Number(req.params.hashtagId);
        const tasks = await hashtagServices.getAllTasksFromHashtag(hashtagID);

        if (!tasks) {
            res.status(404).json({ error: "Tasks not found " });
            return;
        }

        console.log("Hashtags GET tasks from hashtag request accepted.");
        res.status(200).json({ tasks: tasks });
    } catch (error) {
        console.log(
            `An error occured while trying to get all hashtags: ${error}`
        );
        res.status(500).json({ error: String(error) });
    }
}

async function createHashtag(req: Request, res: Response) {
    try {
        const existing = await hashtagServices.getHashtagByName(req.body.name);
        if (existing) {
            res.status(409).json({ error: "Hashtag already exists" });
            return;
        }

        const hashtag = await hashtagServices.createHashtag(req.body);

        if (!hashtag) {
            res.status(404).json({ error: "Hashtag not found " });
            return;
        }

        console.log("Hashtags CREATE request accepted.");
        res.status(201).json({ hashtag: hashtag });
    } catch (error) {
        console.log(
            `An error occured while trying to get all hashtags: ${error}`
        );
        res.status(500).json({ error: String(error) });
    }
}

async function deleteHashtag(req: Request, res: Response) {
    try {
        const hashtagID = Number(req.params.hashtagId);
        const hashtag = await hashtagServices.deleteHashtag(hashtagID);

        if (!hashtag) {
            res.status(404).json({ error: "Hashtag not found " });
            return;
        }

        console.log("Hashtags DELETE request accepted.");
        res.status(200).json({ hashtahs: hashtag });
    } catch (error) {
        console.log(
            `An error occured while trying to get all hashtags: ${error}`
        );
        res.status(500).json({ error: String(error) });
    }
}

async function addHashtagToTask(req: Request, res: Response) {
    try {
        const taskID = Number(req.params.taskId);
        const hashtagID = Number(req.params.hashtagId);
        const hashtag = await hashtagServices.addHashtagToTask(
            taskID,
            hashtagID
        );

        if (!hashtag) {
            res.status(404).json({ error: "Hashtag not found " });
            return;
        }

        console.log("Hashtags ADD to task request accepted.");
        res.status(200).json({ hashtags: hashtag });
    } catch (error) {
        console.log(
            `An error occured while trying to get all hashtags: ${error}`
        );
        res.status(500).json({ error: String(error) });
    }
}

async function removeHashtagFromTask(req: Request, res: Response) {
    try {
        const taskID = Number(req.params.taskId);
        const hashtagID = Number(req.params.hashtagId);
        const hashtag = await hashtagServices.removeHashtagFromTask(
            taskID,
            hashtagID
        );

        if (!hashtag) {
            res.status(404).json({ error: "Hashtag not found " });
            return;
        }

        console.log("Hashtags REMOVE from task request accepted.");
        res.status(200).json({ hashtags: hashtag });
    } catch (error) {
        console.log(
            `An error occured while trying to get all hashtags: ${error}`
        );
        res.status(500).json({ error: String(error) });
    }
}

export const hashtagController = {
    getHashtagByID,
    getAllHashtags,
    getAllHashtagsFromTask,
    getAllTasksFromHashtag,
    createHashtag,
    deleteHashtag,
    addHashtagToTask,
    removeHashtagFromTask,
};
