import * as z from "zod";

export const SignUpSchema = z.object({
  fullname: z.string().min(3).max(100),
});
