'use server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth.config';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export const getUserServerSession = async () => {
  const session = await getServerSession(authOptions);
  return session?.user;
};

export const signInWithCredentials = async (email: string, password: string) => {
  if (!email || !password) return null;

  let user = await prisma.user.findUnique({ where: { email } });

  // Automatically create user if not found
  if (!user) {
    const hashedPassword = bcrypt.hashSync(password, 10);

    user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: email.split('@')[0],
        roles: ['user'],
        isActive: true,
      },
    });
  }

  if (!user || !user.password) {
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ User not found');
    }
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ Invalid password');
    }
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    roles: user.roles,
  };
};
