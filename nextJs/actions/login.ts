"use server";

import * as z from "zod";
import { loginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFeilds = loginSchema.safeParse(values);

  if (!validatedFeilds.success) {
    return { error: "Invalid input feilds" };
  }
  const { email, password } = validatedFeilds.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {}
  return { success: "Login succcess" };
};
