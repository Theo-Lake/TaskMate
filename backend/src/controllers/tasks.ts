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
        const publisherID = req.user!.userID;

        await taskServices.createTask(publisherID, req.body);
        console.log("Task data POST accepted.");
        res.status(200).json({ Message: "Task data successfully posted" });
    } catch (error) {
        console.log(`An error occured while posting the Task data: ${error}`);
        res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
    }
}

async function applyForTask(req: Request, res: Response) {
    try {
        const taskID = Number(req.params.taskId);
        const userID = req.user!.userID;

        await taskServices.applyForTask(taskID, userID);
        console.log("Task APPLICATION accepted.");
        res.status(200).json({ Message: "Successfully applied for task" });
    } catch (error) {
        console.log(`An error occured while applying for the Task: ${error}`);
        res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
    }
}

async function acceptApplication(req: Request, res: Response) {
    try {
        const taskID = Number(req.params.taskId);
        const userID = Number(req.params.userId);

        const task = await taskServices.getTaskByID(taskID);
        if (!task) {
            res.status(404).json({ error: "Task not found" });
            return;
        }
        if (task.publisherID !== req.user!.userID) {
            res.status(403).json({ error: "Not authorized to accept applications for this task" });
            return;
        }

        await taskServices.acceptApplication(taskID, userID);
        console.log("Task APPLICATION accepted by publisher.");
        res.status(200).json({ Message: "Application successfully accepted" });
    } catch (error) {
        console.log(`An error occured while accepting the application: ${error}`);
        res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
    }
}

async function rejectApplication(req: Request, res: Response) {
    try {
        const taskID = Number(req.params.taskId);
        const userID = Number(req.params.userId);

        const task = await taskServices.getTaskByID(taskID);
        if (!task) {
            res.status(404).json({ error: "Task not found" });
            return;
        }
        if (task.publisherID !== req.user!.userID) {
            res.status(403).json({ error: "Not authorized to reject applications for this task" });
            return;
        }

        await taskServices.rejectApplication(taskID, userID);
        console.log("Task APPLICATION rejected by publisher.");
        res.status(200).json({ Message: "Application successfully rejected" });
    } catch (error) {
        console.log(`An error occured while rejecting the application: ${error}`);
        res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
    }
}

async function unAssignTask(req: Request, res: Response) {
    try {
        const taskID = Number(req.params.taskId);
        const userID = Number(req.params.userId);

        const task = await taskServices.getTaskByID(taskID);
        if (!task) {
            res.status(404).json({ error: "Task not found" });
            return;
        }
        if (task.publisherID !== req.user!.userID && userID !== req.user!.userID) {
            res.status(403).json({ error: "Not authorized to unassign from this task" });
            return;
        }

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

        const task = await taskServices.getTaskByID(taskID);
        if (!task) {
            res.status(404).json({ error: "Task not found" });
            return;
        }
        if (task.publisherID !== req.user!.userID) {
            res.status(403).json({ error: "Not authorized to update this task" });
            return;
        }

        await taskServices.updateTask(taskID, req.body);
        console.log("Task data PUT accepted.");
        res.status(200).json({ Message: `Task ${taskID} successfully updated.` });
    } catch (error) {
        console.log(`An error occured while putting the Task data: ${error}`);
        res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
    }
}

async function patchTaskStatus(req: Request, res: Response) {
    try {
        const taskID = Number(req.params.taskId);
        const { status } = req.body;

        const task = await taskServices.getTaskByID(taskID);
        if (!task) {
            res.status(404).json({ error: "Task not found" });
            return;
        }
        if (task.publisherID !== req.user!.userID) {
            res.status(403).json({ error: "Not authorized to update this task's status" });
            return;
        }

        await taskServices.updateTaskStatus(taskID, status);
        console.log("Task status PATCH accepted.");
        res.status(200).json({ Message: "Task status successfully updated" });
    } catch (error) {
        console.log(`An error occured while patching the Task status: ${error}`);
        res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
    }
}

async function deleteTask(req: Request, res: Response) {
    try {
        const taskID = Number(req.params.taskId);

        const task = await taskServices.getTaskByID(taskID);
        if (!task) {
            res.status(404).json({ error: "Task not found" });
            return;
        }
        if (task.publisherID !== req.user!.userID) {
            res.status(403).json({ error: "Not authorized to delete this task" });
            return;
        }

        await taskServices.deleteTask(taskID);
        console.log("Task DELETE accepted.");
        res.status(200).json({ Message: `Task ${taskID} successfully deleted` });
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
    applyForTask,
    acceptApplication,
    rejectApplication,
    unAssignTask,
    postTask,
    putTask,
    patchTaskStatus,
    deleteTask,
};
