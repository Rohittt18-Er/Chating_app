import { db } from "@/lib/db";

export const getUser = async (email: string) => {
  try {
    const user = await db.user.findFirst({
      where: { email },
    });
    if (!user) {
      return { error: "User not found" };
    }
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: any) => {
  try {
    const user = await db.user.findFirst({
      where: { id },
    });
    if (!user) {
      return { error: "User not found" };
    }
    return user;
  } catch {
    return null;
  }
};
