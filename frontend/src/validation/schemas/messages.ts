import { z } from "zod";

export const MessageSchema = z.object({
	content: z
		.string()
		.min(1, "Message can't be empty!")
		.max(100000, "Message is too large!"),
});

export type Message = z.infer<typeof MessageSchema>;
