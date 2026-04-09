import { z } from "zod";
import Filter  from "bad-words";
const filter = new Filter()

// Validate if hashtag is empty,  recommended/hot hashtags.

export const HashtagSchema = z.object({
    hashtagID: z.never(),
    name: z
        .string()
        .trim()
        .min(1, "Hashtag name is required!")
        .max(30, "Hashtagname is too long!")
        .refine((text) => !filter.isProfane(text), {
            message:"Don't use bad words!"
        }),
    created_at: z.never(),
});

export type Hashtag = z.infer<typeof HashtagSchema>;