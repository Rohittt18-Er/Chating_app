"use server";

import { db } from "@/lib/db";
import { registerSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";

export const registerApi = async (values: z.infer<typeof registerSchema>) => {
  const validatedFeilds = registerSchema.safeParse(values);

  if (!validatedFeilds.success) {
    return { error: "Invalid input feilds" };
  }
  const { email, name, password } = validatedFeilds.data;
  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) {
    return { error: "User already exists" };
  }
  // hashed password
  const hashedPassword: any = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return { success: "User created successfully" };
};
