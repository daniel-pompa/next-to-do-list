import prisma from '@/lib/prisma';
import { getUserServerSession } from '@/auth/actions/auth-actions';
import { Task } from '@prisma/client';

// Fetches a single task by ID from the database using Prisma ORM
export const getTask = async (id: string): Promise<Task | null> => {
  const user = await getUserServerSession();

  if (!user) {
    return null;
  }

  const task = await prisma.task.findFirst({ where: { id } });

  if (task?.userId !== user.id) {
    return null;
  }

  return task;
};
