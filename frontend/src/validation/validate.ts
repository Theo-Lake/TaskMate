import { z, ZodType } from "zod";

export function validate<T>(schema: ZodType<T>, data: unknown) {
	const result = schema.safeParse(data);
	if (!result.success) {
		return {
			success: false as const,
			errors: z.flattenError(result.error),
		};
	}
	return { success: true as const, data: result.data };
}
