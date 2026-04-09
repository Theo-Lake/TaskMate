import { z } from "zod";

export const HashtagSchema = z.object({
	name: z
		.string()
		.min(1, "Hashtag name is required!")
		.max(30, "Hashtagname is too long!"),
});

export type Hashtag = z.infer<typeof HashtagSchema>;
