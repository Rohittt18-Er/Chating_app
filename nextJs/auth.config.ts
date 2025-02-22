import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./schemas";
import { db } from "./lib/db";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

const nextAuthConfig = {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const userFound = await db.user.findFirst({ where: { email } });

          if (!userFound) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(
            password,
            userFound.password
          );

          if (passwordMatch) {
            return userFound; // Return the user object if password matches
          } else {
            return null; // Return null if password does not match
          }
        } else {
          return null; // Return null if credentials validation fails
        }
      },
    }),
  ],
};

export default nextAuthConfig;
