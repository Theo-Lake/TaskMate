import { Request, Response } from "express";
import { userServices } from "../services/users"; // Abstraction so that db and business logic is managed by services.
import { auth } from "../middleware/authentication/auth";
import { authServices } from "../services/auth";

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
        const accessToken = await auth.generateAccessToken(newUser.userID);
        const refreshToken = await authServices.createRefreshToken(
            newUser.userID
        );

        res.cookie("refreshToken", refreshToken.token, {
            httpOnly: true,
            secure: true,
        });

        console.log("User data POST accepted.");
        res.status(201).json({
            Message: "User successfully created",
            accessToken,
        });
    } catch (error) {
        console.log(`An error occured while posting the user data: ${error}`);
        res.status(500).json({ error: error });
    }
}

async function updateUser(req: Request, res: Response) {
    try {
        const userID = Number(req.params.userId);

        if (isNaN(userID)) {
            res.status(404).json({ error: "User not found" });
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

        if (!userID) {
            res.status(404).json({ error: "User not found" });
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
