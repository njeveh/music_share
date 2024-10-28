import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    expiresOn: number;
    exp:number;
    iat:number;
    jti:string;
  }

  interface Session {
    user: User;
    expires: string;
    error: string;
  }
}