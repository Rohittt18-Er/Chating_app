"use server";

import { getUser } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return { error: "Token does not exist" };
  }
  // const today= new Date().toISOString;
  //   const hasExpiredToken :any= today>existingToken.expiresIn
  //   if (hasExpiredToken) {
  //     return { error: "Token expired" };
  //   }

  const existingUser: any = await getUser(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist" };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email verified !" };
};
