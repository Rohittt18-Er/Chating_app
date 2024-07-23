"use server";

import * as z from "zod";
import { loginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUser } from "@/data/user";
import { genrateVerificationToken } from "@/lib/tokens";

export const loginApi = async (values: z.infer<typeof loginSchema>) => {
  const validatedFeilds = loginSchema.safeParse(values);

  if (!validatedFeilds.success) {
    return { error: "Invalid input feilds" };
  }
  const { email, password } = validatedFeilds.data;
  const existingUser: any = await getUser(email);
  console.log(existingUser);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid credentials" };
  }
  if (!existingUser.emailVerified) {
    const verificationToken = await genrateVerificationToken(
      existingUser.email
    );
    return { success: "Email confirmation has been sent" };
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Authentication failed" };
      }
    }
  }
  return { success: "Login succcess" };
};
