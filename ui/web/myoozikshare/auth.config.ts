import type { NextAuthConfig, Session } from 'next-auth';
import { User } from './app/lib/definitions';
 
export const authConfig = {
  pages: {
    signIn: '/auth/sign-in',
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isLoggingIn = nextUrl.pathname === '/auth/sign-in';
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const callbackUrl = nextUrl.searchParams.get('callbackUrl');

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
      else if (isLoggingIn && isLoggedIn) {
        if (callbackUrl != null) {
          return Response.redirect(callbackUrl, 308);
        }
        return Response.redirect(new URL('/dashboard', nextUrl), 308);
      }
      return true;
    },
    async jwt({token, user, trigger, session}){
      if (user) {
        token.user = user;
      }
      if (trigger === "update" && session) {
        token = {...token, user : session}
        return token;
      };
      return token;
    },
    async session ({ session, token, trigger}) {
      // const {accessToken, ...rest} = token.user as User;
      session.user = token.user as User;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  providers: [],
} satisfies NextAuthConfig;
