import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  export type ExtendedUser = DefaultSession["user"] & {
    role: any;
  };

  interface Session {
    user: {
      /** The user's postal address. */
      address: string;
      role: "ADMIN" | "USER";
    } & DefaultSession["user"];
  }
}
