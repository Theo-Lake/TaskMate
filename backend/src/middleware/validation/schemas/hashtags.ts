import { z } from "zod";

// Validate if hashtag is empty, using bad words, recommended/hot hashtags.

export const HashtagSchema = z.object({
    hashtagID: z.never(),
    name: z
        .string()
        .min(1, "Hashtag name is required!")
        .max(30, "Hashtagname is too long!"),
    created_at: z.never(),
});

export type Hashtag = z.infer<typeof HashtagSchema>;