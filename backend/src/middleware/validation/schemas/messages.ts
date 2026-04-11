import { z } from "zod";

//Validate if message is empty, not saying any bad words etc
// validate that message is being sent to correct person

//Validate all endpoints

//TODO validate everythig written by user so it isnt a bad word or something not permitted
// TODO also maybe use AI to create description and hashtag suggestions, or title suggestions if description written first, or description if title written first.

export const MessageSchema = z.object({
    content: z
        .string()
        .min(1, "Message can't be empty!")
        .max(100000, "Message is too large!"),
});

export type Message = z.infer<typeof MessageSchema>;
