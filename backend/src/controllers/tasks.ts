import { Request, Response } from "express";
import { taskServices } from "../services/tasks";

// TODO Import validation on all endpoints.

//TODO

// Get users function
export async function getAllTasks(req: Request, res: Response) {
    try {
        const tasks = await taskServices.getAllTasks(); // calling user service to get all users
        console.log("Tasks get accepted.");
        res.status(200).json({ tasks: tasks });
    } catch (error) {
        console.log(
            `An error occured while trying to get Tasks data: ${error}`
        );
        res.status(500).json({ error: { error } });
    }
}

export async function getTaskByID(req: Request, res: Response) {
    try {
        const taskID = Number(req.params.taskId);
        const tasks = await taskServices.getTaskByID(taskID); // calling user service to get all users
        console.log("Tasks get accepted.");
        res.status(200).json({ tasks: tasks });
    } catch (error) {
        console.log(
            `An error occured while trying to get Tasks data: ${error}`
        );
        res.status(500).json({ error: { error } });
    }
}
//TODO include ID in all id needed requests by fetching it from backend URL and make all services take id as input too.
export async function postTask(req: Request, res: Response) {
    try {
        await taskServices.createTask(req.body); // Calling user service to create user with req.body
        console.log("Task data post accepted.");
        res.status(200).json({ Message: "Task data successfully posted" });
    } catch (error) {
        console.log("An error occured while posting the Task data");
        res.status(500).json({ error: error });
    }
}

export async function putTask(req: Request, res: Response) {
    try {
        const taskID = Number(req.params.taskId);
        await taskServices.updateTask(taskID, req.body); // Calling user service to create update with req.body
        console.log("Task data put accepted.");
        res.status(200).json({ Message: "Task data successfully updated" });
    } catch (error) {
        console.log("An error occured while putting the Task data");
        res.status(500).json({ error: error });
    }
}

export async function deleteTask(req: Request, res: Response) {
    try {
        const taskID = Number(req.params.taskId);
        const task = await taskServices.deleteTask(taskID); // Calling user service to create delete with req.body
        console.log("Task delete accepted.");
        res.status(200).json({ Message: `Task ${task} successfully deleted` });
    } catch (error) {
        console.log("An error occured while deleting the user data");
        res.status(500).json({ error: error });
    }
}

export const taskController = {
    getAllTasks,
    getTaskByID,
    postTask,
    putTask,
    deleteTask,
    //TODO
};
