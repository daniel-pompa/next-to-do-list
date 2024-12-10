import { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    roles?: string[];
  }

  interface Session {
    user?: User; // The session includes the augmented user
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultUser {
    roles?: string[]; // JWT also includes roles
  }
}
