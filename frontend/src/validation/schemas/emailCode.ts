import {z} from 'zod';
export const EmailVerificcationSchema = z.object({
    token: z.string()
        .length(8, "There should be 8 symbols in code")
        .regex(
            /^[0-9a-f]+$/i,
            "Code must contain only numbers (0-9) and letters (a-f)"
        ),
    userId: z.number({
        message: "invalid ID",
    }).positive("invalid ID")
});