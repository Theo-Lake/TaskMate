import { z } from "zod";
import { Rating } from "../../../generated/prisma/enums";

//validate if empty and bad words

export const ReviewSchema = z.object({
    reviewID: z.never(),
    name: z
        .string()
        .min(5, "Title is too short!")
        .max(100, "Title is too long!"),
    comment: z
        .string()
        .max(500, "Description is too long!"),
    reviewPublisherID: z.never(),
    reviewAssigneeID: z.never(),
    created_at: z.never(),
    updated_at: z.never(),
    rating: z.enum(Rating),
});

export type Review = z.infer<typeof ReviewSchema>;