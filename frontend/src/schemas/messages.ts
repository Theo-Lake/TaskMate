import { z } from "zod";
import Filter  from "bad-words";
const filter = new Filter()

//Validate if message is empty, not saying any bad words etc
// validate that message is being sent to correct person

//Validate all endpoints

// TODO also maybe use AI to create description and hashtag suggestions, or title suggestions if description written first, or description if title written first.

export const MessageSchema = z.object({
    messageID: z.never(),
    conversationID: z.never(),
    senderID: z.never(),
    content: z
        .string()
        .trim()
        .min(1, "Message can't be empty!")
        .max(10000, "Message is too large!")
        .refine((text) => !filter.isProfane(text), {
            message:"Don't use bad words!"
        }),
    created_at: z.never(),
});

export type Message = z.infer<typeof MessageSchema>;
