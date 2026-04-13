import { z } from "zod";

export const UserSchema = z.object({
	username: z
		.string()
		.min(3, "Username is too small!")
		.max(50, "Username is too Large!"),
	firstName: z
		.string()
		.min(1, "First name is required!")
		.max(50, "First name is too long!")
		.regex(
			/^[a-zA-Z\s\-']+$/,
			"First name can only contain letters, hyphens, and apostrophes!",
		)
		.trim(),
	lastName: z
		.string()
		.min(1, "Last name is required!")
		.max(50, "Last name is too long!")
		.regex(
			/^[a-zA-Z\s\-']+$/,
			"Last name can only contain letters, hyphens, and apostrophes!",
		)
		.trim(),
	universityID: z
		.int("Must be a whole number!")
		.positive("Must be a positive number!"),
	email: z
		.email("Invalid email address!")
		.max(100, "Email is too long!")
		.trim(),
	password: z
		.string()
		.min(8, "Password must be between 8 and 20 characters!")
		.max(20, "Password must be between 8 and 20 characters!")
		.regex(/[A-Z]/, "Password must contain at least one uppercase letter!")
		.regex(/[a-z]/, "Password must contain at least one lowercase letter!")
		.regex(/[0-9]/, "Password must contain at least one number!")
		.regex(
			/[^a-zA-Z0-9]/,
			"Password must contain at least one special character, i.e. !-?.'",
		),
	occupation: z.string(),
	profilePicture: z.string(),
});
//schema for settings page
export const UserUpdateSchema = UserSchema.partial();

export const SignUpSchema = UserSchema.pick({
	firstName: true,
	lastName: true,
	email: true,
	password: true,
	username: true,
	universityID: true,
	occupation: true,
})
export const LoginSchema = UserSchema.pick({

	email: true,
	password: true,

})

export type User = z.infer<typeof UserSchema>;
export type SignUpU = z.infer<typeof SignUpSchema>;