import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
 
async function getUser(email: string): Promise<User | undefined> {
  try {
    // const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    // return user.rows[0];
    const user = {firstName: 'Elijah', lastName: 'Kilonzi', userName: '', email: 'test@example.com'}
    return user;
  } catch (error) {
    //console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials: any) {

          if (credentials) {
              if (!credentials.first_name) return null;
              const user = {
                firstName: credentials.first_name,
                lastName: credentials.last_name,
                userName: credentials.user_name,
                email: credentials.email,
                accessToken: credentials.token
              };
              return user;
          }
          return null;
      },
    }),
  ],
});