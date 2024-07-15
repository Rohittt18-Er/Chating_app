import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({
      message: "Email is required",
    }),
  password: z.string().min(1, { message: "Password is required" }),
});

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const registerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({
      message: "Email is required",
    }),
  password: z
    .string()
    .min(6, { message: "Password is required" })
    .regex(passwordValidation, {
      message: "Password must contain symbol(!@#) char(abS) and digit(23)",
    }),
});
