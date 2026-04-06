import { Request, Response } from "express";
import { userServices } from "../services/users"; // Abstraction so that db and business logic is managed by services.
import { authServices } from "../services/auth";
import { emailServices } from "../services/email";
// Get users function
async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await userServices.getAllUsers(); // calling user service to get all users

        if (!users) {
            res.status(404).json({ error: "Users not found" });
            return;
        }

        console.log("Users GET all accepted.");
        res.status(200).json({ users: users });
    } catch (error) {
        console.log(`An error occured while trying to get User data: ${error}`);
        res.status(500).json({ error: { error } });
    }
}

// Get user by id function
async function getUserById(req: Request, res: Response) {
    try {
        const userID = Number(req.params.userId);
        const user = await userServices.getUserById(userID);

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        console.log("User by id GET accepted.");
        res.status(200).json({ users: { user } });
    } catch (error) {
        console.log(`An error occured while trying to get User data: ${error}`);
        res.status(500).json({ error: { error } });
    }
}

async function createUser(req: Request, res: Response) {
    try {
        const existing = await userServices.getUserByEmailOrUsername(
            req.body.email,
            req.body.username
        );
        if (existing) {
            res.status(409).json({ error: "Username or email already in use" });
            return;
        }

        const newUser = await userServices.createUser(req.body);

        const token = await authServices.generateEmailVerificationToken(
            newUser.userID
        );

        await emailServices.sendVerificationEmail(
            newUser.email,
            newUser.username,
            token
        );

        console.log("User data POST accepted.");
        res.status(201).json({
            message: "Account created. Please verify your email.",
            userID: newUser.userID,
        });
    } catch (error) {
        console.log(`An error occured while posting the user data: ${error}`);
        res.status(500).json({ error: String(error) });
    }
}

async function updateUser(req: Request, res: Response) {
    try {
        const userID = Number(req.params.userId);

        if (isNaN(userID)) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        if (userID !== req.user!.userID) {
            res.status(403).json({
                error: "Request userID does not match authenticated user",
            });
            return;
        }

        if (req.body.password) {
            res.status(400).json({
                error: "To change your password, use the password reset flow.",
            });
            return;
        }

        await userServices.updateUser(userID, req.body); // Calling user service to create update with req.body
        console.log("User data PUT accepted.");
        res.status(200).json({ Message: "User data successfully updated" });
    } catch (error) {
        console.log(`An error occured while putting the user data: ${error}`);
        res.status(500).json({ error: error });
    }
}

async function deleteUser(req: Request, res: Response) {
    try {
        const userID = Number(req.params.userId);

        if (!userID || isNaN(userID)) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        if (userID !== req.user!.userID) {
            res.status(403).json({
                error: "Request userID does not match authenticated user",
            });
            return;
        }

        await userServices.deleteUser(userID); // Calling user service to create delete with req.body
        console.log("User DELETE accepted.");
        res.status(200).json({ Message: `User successfully deleted` });
    } catch (error) {
        console.log(`An error occured while deleting the user data: ${error}`);
        res.status(500).json({ error: error });
    }
}

export const userController = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
