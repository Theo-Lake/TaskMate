import { z } from "zod";

// Validate if hashtag is empty, using bad words, recommended/hot hashtags.

export const HashtagSchema = z.object({
    name: z
        .string()
        .min(1, "Hashtag name is required!")
        .max(30, "Hashtagname is too long!"),
});

export type Hashtag = z.infer<typeof HashtagSchema>;