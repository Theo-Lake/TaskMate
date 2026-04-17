import { z } from "zod";
import { Rating } from "../../../generated/prisma/enums";

//validate if empty and bad words

export const ReviewSchema = z.object({
    name: z
        .string()
        .min(5, "Title is too short!")
        .max(100, "Title is too long!"),
    comment: z
        .string()
        .max(500, "Description is too long!"),
    rating: z.enum(Object.values(Rating) as [string, ...string[]]),
});

export const ReviewUpdateSchema = ReviewSchema.partial();

export type Review = z.infer<typeof ReviewSchema>;