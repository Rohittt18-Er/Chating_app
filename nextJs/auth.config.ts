import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./schemas";
import { db } from "./lib/db";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFeilds = loginSchema.safeParse(credentials);
        if (validatedFeilds.success) {
          const { email, password } = validatedFeilds.data;
          const userFound = await db.user.findUnique({ where: { email } });

          if (!userFound) {
            return null;
          }
          const passwordMatch = await bcrypt.compare(
            password,
            userFound.password
          );
          if (passwordMatch) return userFound;
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
