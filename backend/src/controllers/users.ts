import { Request, Response } from "express";
import { userServices } from "../services/users"; // Abstraction so that db and business logic is managed by services.
//TODO Use req to check for validation (called from middleware)

// Get users function
export async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await userServices.getAllUsers(); // calling user service to get all users
        console.log("Users get accepted.");
        res.status(200).json({ users: users });
    } catch (error) {
        console.log(`An error occured while trying to get User data: ${error}`);
        res.status(500).json({ error: { error } });
    }
}
//TODO include ID in all id needed requests by fetching it from backend URL and make all services take id as input too.
export async function postUser(req: Request, res: Response) {
    try {
        await userServices.createUser(req.body); // Calling user service to create user with req.body
        console.log("User data post accepted.");
        res.status(200).json({ Message: "User data successfully posted" });
    } catch (error) {
        console.log("An error occured while posting the user data");
        res.status(500).json({ error: error });
    }
}

export async function putUser(req: Request, res: Response) {
    try {
        await userServices.updateUser(req.body); // Calling user service to create update with req.body
        console.log("User data put accepted.");
        res.status(200).json({ Message: "User data successfully updated" });
    } catch (error) {
        console.log("An error occured while putting the user data");
        res.status(500).json({ error: error });
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const user = await userServices.deleteUser(req.body); // Calling user service to create delete with req.body
        console.log("User delete accepted.");
        res.status(200).json({ Message: `User ${user} successfully deleted` });
    } catch (error) {
        console.log("An error occured while deleting the user data");
        res.status(500).json({ error: error });
    }
}

export const userController = {
    getAllUsers,
    postUser,
    putUser,
    deleteUser,
};
