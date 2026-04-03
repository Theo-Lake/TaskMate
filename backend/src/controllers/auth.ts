import { Request, Response } from "express";
import { userServices } from "../services/users";
import { auth } from "../middleware/authentication/auth";

export async function login(req: Request, res: Response) {
    try {
        const { email, username, password } = req.body;

        //TODO generate token

        const user = await userServices.getUserByEmailOrUsername(
            email,
            username
        );

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const valid = await auth.comparePassword(password, user.password_hash);

        if (!valid) {
            res.status(401).json({ error: "Invalid Credentials" });
            return;
        }

        console.log("User Authentication accepted.");
        res.status(200).json({ Message: `User successfully Authenticated` });
    } catch (error) {
        console.log(`An error occured while authenticating the user: ${error}`);
        res.status(500).json({ error: error });
    }
}

export async function logOut(req: Request, res: Response) {
    //TODO
}

export async function refresh(req: Request, res: Response) {
    //TODO
}

export const authController = {
    login,
    logOut,
    refresh,
};
