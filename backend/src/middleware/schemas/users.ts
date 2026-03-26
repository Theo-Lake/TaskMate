import { z } from "zod";

// Validate user input
// Use usersServices.getUserByID() to validate login and signup if already exists, username etc

//Validate all endpoints

//TODO

const UserSchema = z.object({
    username: z
        .string()
        .min(3, "Username is too small!")
        .max(50, "Username is too Large!"),

    testing: z.string().optional().default("true"),
    other: z.enum(["hello", "goodbye"]), //import type from types
    userID: z.never(),
});

export type User = z.infer<typeof UserSchema>;

// This is how to validae:
// const user = { username: "Theo" };
// userSchema.parse(user);ex
