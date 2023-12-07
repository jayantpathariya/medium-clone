import * as z from "zod";

export const SignUpSchema = z.object({
  fullname: z
    .string()
    .min(3, {
      message: "Full name must be at least 3 characters long.",
    })
    .max(100),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100)
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    ),
});

export const SignInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(100)
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    ),
});
