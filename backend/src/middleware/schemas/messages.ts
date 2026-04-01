import { z } from "zod";

//Validate if message is empty, not saying any bad words etc
// validate that message is being sent to correct person

//Validate all endpoints

export const MessageSchema = z.object({
    messageID: z.never(),
    conversationID: z.never(),
    senderID: z.never(),
    content: z
        .string()
        .min(1, "Message can't be empty!")
        .max(100000, "Message is too large!"),
    created_at: z.never(),
});

export type Message = z.infer<typeof MessageSchema>;
