import NextAuth from "next-auth";

declare module "next-auth" {

  interface User{
    id: string;
    firstName: string;
    lastName: string;
    userName: string | undefined;
    email: string;
    emailVerified: Date | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    accessToken: string;
  }


  interface Session {
    user: User;
    expires: string;
    error: string;
  }
}