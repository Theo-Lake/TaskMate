import { z } from "zod";
import { Rating } from "../../../generated/prisma/enums";
import Filter  from "bad-words";
const filter = new Filter()


export const ReviewSchema = z.object({
    reviewID: z.never(),
    name: z
        .string()
        .trim()
        .min(5, "Title is too short!")
        .max(100, "Title is too long!")
        .refine((text) => !filter.isProfane(text), {
            message:"Don't use bad words!"
        }),
    comment: z
        .string()
        .trim()
        .max(500, "Description is too long!")
        .refine((text) => !filter.isProfane(text), {
            message:"Don't use bad words!"
        }),
    reviewPublisherID: z.never(),
    reviewAssigneeID: z.never(),
    created_at: z.never(),
    updated_at: z.never(),
    rating: z.enum(Rating),
});

export type Review = z.infer<typeof ReviewSchema>;