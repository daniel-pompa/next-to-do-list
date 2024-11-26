import prisma from '@/lib/prisma';
import { Task } from '@prisma/client';

// Fetches a single task by ID from the database using Prisma ORM
export const getTask = async (id: string): Promise<Task | null> => {
  return prisma.task.findFirst({ where: { id } });
};
