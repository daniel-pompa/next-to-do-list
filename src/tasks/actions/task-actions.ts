'use server';
import prisma from '@/lib/prisma';
import { Task } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const toggleTask = async (id: string, complete: boolean): Promise<Task> => {
  const task = await prisma.task.findFirst({ where: { id } });
  if (!task) {
    throw new Error('Task not found');
  }

  const updatedTask = await prisma.task.update({
    where: { id },
    data: { complete },
  });
  revalidatePath('/dashboard/server-tasks');
  return updatedTask;
};

export const createTask = async (title: string, description: string): Promise<Task> => {
  const task = await prisma.task.create({
    data: { title, description },
  });
  revalidatePath('/dashboard/server-tasks');
  return task;
};

export const editTask = async (
  id: string,
  title: string,
  description: string
): Promise<Task> => {
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) {
    throw new Error('Task not found');
  }

  const updatedTask = await prisma.task.update({
    where: { id },
    data: { title, description },
  });
  revalidatePath('/dashboard/server-tasks');
  return updatedTask;
};

export const deleteTask = async (id: string): Promise<void> => {
  await prisma.task.delete({ where: { id } });
  revalidatePath('/dashboard/server-tasks');
};

export const deleteCompletedTasks = async (): Promise<void> => {
  await prisma.task.deleteMany({ where: { complete: true } });
  revalidatePath('/dashboard/server-tasks');
};
