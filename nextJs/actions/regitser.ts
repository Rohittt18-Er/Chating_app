"use server";

import { db } from "@/lib/db";
import { registerSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { genrateVerificationToken } from "@/lib/tokens";
import { sendVerification } from "@/lib/mail";

export const registerApi = async (values: z.infer<typeof registerSchema>) => {
  const validatedFeilds = registerSchema.safeParse(values);

  if (!validatedFeilds.success) {
    return { error: "Invalid input feilds" };
  }
  const { email, name, password } = validatedFeilds.data;
  const existingUser: any = await db.user.findFirst({
    where: {
      email,
    },
  });
  if (existingUser) {
    return { error: "User already exists" };
  }
  // hashed password
  const hashedPassword: any = await bcrypt.hash(password, 10);

  const userData: any = await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  const verificationToken: any = await genrateVerificationToken(email);

  await sendVerification(userData.email, userData.token);

  return { success: "Verification has been sent" };
};
