// Import the Prisma adapter to integrate NextAuth with Prisma
import { PrismaAdapter } from '@auth/prisma-adapter';
import { Adapter } from 'next-auth/adapters';

// Define the type for NextAuth options
import type { NextAuthOptions } from 'next-auth';

// Import authentication providers
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

// Import Prisma client instance
import prisma from '@/lib/prisma';

// Import custom sign-in logic for credentials-based authentication
import { signInWithCredentials } from '@/auth/actions/auth-actions';

// Export the NextAuth configuration options
export const authOptions: NextAuthOptions = {
  // Configure the Prisma adapter for session and user management
  adapter: PrismaAdapter(prisma) as Adapter,

  // Define the authentication providers
  providers: [
    // Google OAuth provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),

    // GitHub OAuth provider
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),

    // Credentials-based authentication provider (email and password)
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      // Custom logic to validate user credentials
      async authorize(credentials) {
        const user = await signInWithCredentials(
          credentials!.email,
          credentials!.password
        );
        return user ?? null;
      },
    }),
  ],

  // Use JWT strategy for session handling
  session: { strategy: 'jwt' },

  // Callback functions to customize token/session behavior
  callbacks: {
    // Always allow sign in (can be extended with logic if needed)
    async signIn() {
      return true;
    },

    // Custom JWT callback
    async jwt({ token }) {
      const dbUser = token.email
        ? await prisma.user.findUnique({ where: { email: token.email } })
        : null;

      if (!dbUser) throw new Error('User not found');
      if (!dbUser.isActive) throw new Error('User is inactive');

      token.roles = dbUser.roles ?? ['user'];
      token.id = dbUser.id ?? 'unknown';
      return token;
    },

    // Custom session callback: attach roles and ID from token to session
    async session({ session, token }) {
      if (session.user) {
        session.user.roles = token.roles;
        session.user.id = token.id;
      }
      return session;
    },
  },
};
