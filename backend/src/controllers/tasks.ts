import { Request, Response } from "express";
import { taskServices } from "../services/tasks";

// Get users function
async function getAllTasks(req: Request, res: Response) {
    try {
        const tasks = await taskServices.getAllTasks(); // calling user service to get all users
        console.log("Tasks GET accepted.");
        res.status(200).json({ tasks: tasks });
    } catch (error) {
        console.log(
            `An error occured while trying to get Tasks data: ${error}`
        );
        res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
    }
}

async function getTaskByID(req: Request, res: Response) {
    try {
        const taskID = Number(req.params.taskId);
        const task = await taskServices.getTaskByID(taskID); // calling user service to get all users
        console.log("Tasks GET accepted.");
        res.status(200).json({ tasks: task });
    } catch (error) {
        console.log(
            `An error occured while trying to get Tasks data: ${error}`
        );
        res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
    }
}

async function getAllTasksByUserID(req: Request, res: Response) {
    try {
        const userID = Number(req.params.userId);
        const tasks = await taskServices.getAllTasksByUserID(userID);
        console.log("Tasks by user GET accepted.");
        res.status(200).json({ tasks: tasks });
    } catch (error) {
        console.log(
            `An error occured while trying to get Tasks data by user: ${error}`
        );
        res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
    }
}

async function getTaskAllTaskAssignments(req: Request, res: Response) {
    try {
        const taskAssignments = await taskServices.getTaskAllTaskAssignments();
        console.log("Tasks Assignment GET ALL accepted.");
        res.status(200).json({ taskAssignments: taskAssignments });
    } catch (error) {
        console.log(
            `An error occured while trying to GET ALL Task Assignments: ${error}`
        );
        res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
    }
}

async function getTaskAssignmentByTaskID(req: Request, res: Response) {
    try {
        const taskID = Number(req.params.taskId);
        const taskAssignment =
            await taskServices.getTaskAssignmentsByTaskID(taskID);
        console.log("Task assignment GET by taskID accepted.");
        res.status(200).json({ taskAssignment: taskAssignment });
    } catch (error) {
        console.log(
            `An error occured while trying to GET Task Assignments by taskID: ${error}`
        );
        res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
    }
}

async function getTaskAssignmentByUserID(req: Request, res: Response) {
    try {
        const userID = Number(req.params.userId);
        const taskAssignment =
            await taskServices.getTaskAssignmentsByUserID(userID);
        console.log("Task Assignments by userID GET accepted.");
        res.status(200).json({ taskAssignment: taskAssignment });
    } catch (error) {
        console.log(
            `An error occured while trying to get Task Assignments by userID: ${error}`
        );
        res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
    }
}

async function postTask(req: Request, res: Response) {
    try {
        const publisherID = Number(req.params.publisherId);

        if (publisherID !== req.user!.userID) {
            res.status(403).json({
                error: "Request userID does not match authenticated user",
            });
            return;
        }

        await taskServices.createTask(publisherID, req.body); // Calling user service to create user with req.body
        console.log("Task data POST accepted.");
        res.status(200).json({ Message: "Task data successfully posted" });
    } catch (error) {
        console.log(`An error occured while posting the Task data: ${error}`);
        res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
    }
}

async function assignTask(req: Request, res: Response) {
    try {
        const taskID = Number(req.params.taskId);
        const userID = Number(req.params.userId);
        await taskServices.assignTask(taskID, userID);
        console.log("Task ASSIGN accepted.");
        res.status(200).json({ Message: "Task successfully assigned" });
    } catch (error) {
        console.log(`An error occured while assigning the Task: ${error}`);
        res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
    }
}

async function unAssignTask(req: Request, res: Response) {
    try {
        const taskID = Number(req.params.taskId);
        const userID = Number(req.params.userId);
        await taskServices.unAssignTask(taskID, userID);
        console.log("Task UNASSIGN accepted.");
        res.status(200).json({ Message: "Task successfully unassigned" });
    } catch (error) {
        console.log(`An error occured while unassigning the Task: ${error}`);
        res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
    }
}

async function putTask(req: Request, res: Response) {
    try {
        const taskID = Number(req.params.taskId);
        await taskServices.updateTask(taskID, req.body); // Calling user service to create update with req.body
        console.log("Task data PUT accepted.");
        res.status(200).json({ Message: "Task data successfully updated" });
    } catch (error) {
        console.log(`An error occured while putting the Task data: ${error}`);
        res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
    }
}

async function deleteTask(req: Request, res: Response) {
    try {
        const taskID = Number(req.params.taskId);
        const task = await taskServices.deleteTask(taskID); // Calling user service to create delete with req.body
        console.log("Task DELETE accepted.");
        res.status(200).json({ Message: `Task ${task} successfully deleted` });
    } catch (error) {
        console.log(`An error occured while deleting the user data: ${error}`);
        res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
    }
}

export const taskController = {
    getAllTasks,
    getTaskByID,
    getAllTasksByUserID,
    getTaskAllTaskAssignments,
    getTaskAssignmentByTaskID,
    getTaskAssignmentByUserID,
    assignTask,
    unAssignTask,
    postTask,
    putTask,
    deleteTask,
};
