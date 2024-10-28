import type { NextAuthConfig } from 'next-auth';
 
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
    async jwt({token, user}){
      return {...token, ...user}
    },
    async session ({ session, token}) {
      session.user = token as any ;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
