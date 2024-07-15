import { db } from "@/lib/db";

export const getUser = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    console.log(user);

    if (!user) {
      return { error: "User not found" };
    }
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
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
