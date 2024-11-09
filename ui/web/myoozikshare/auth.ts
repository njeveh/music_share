import NextAuth, { AuthError } from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import type { User } from '@/app/lib/definitions';
  
export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const data = {
          email: credentials.email,
          password: credentials.password
        }

        const response = await fetch(`${process.env.BACKEND_API_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();

        if (response.status == 400) {
          return null;
        }else if (response.status == 200) {
          //console.log(result);
          const userName = result.data.user.user_name == null? undefined : result.data.user.user_name;
          const user = {
            id: result.data.user.id,
            firstName: result.data.user.first_name,
            lastName: result.data.user.last_name,
            userName: userName,
            email: result.data.user.email,
            emailVerified: result.data.user.email_verified_at,
            isActive: result.data.user.is_active,
            createdAt: result.data.user.created_at,
            updatedAt: result.data.user.updated_at,
            accessToken: result.data.user.access_token,
          } as User
          return user
        }
        else {
          throw new AuthError("");
        }
      },
    }),
  ],
});