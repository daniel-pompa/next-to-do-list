import prisma from '@/lib/prisma';
import { getUserServerSession } from '@/auth/actions/auth-actions';
import { Task } from '@prisma/client';

// Retrieves a task by its ID from the database using Prisma ORM
// Ensures the task belongs to the currently authenticated user
export const getTask = async (id: string): Promise<Task | null> => {
  const user = await getUserServerSession();

  // If no user is authenticated, return null
  if (!user) {
    return null;
  }

  // Retrieve the task by ID
  const task = await prisma.task.findFirst({ where: { id } });

  // If the task does not belong to the authenticated user, return null
  if (task?.userId !== user.id) {
    return null;
  }

  // Return the task if it belongs to the authenticated user
  return task;
};

// Fetches the task statistics (total, completed, and pending) for a specific user
export async function getTaskCountsByUserId(userId: string) {
  // Aggregate total number of tasks for the user by counting task IDs
  const { _count } = await prisma.task.aggregate({
    where: { userId },
    _count: { id: true }, // Count all tasks
  });

  // Count the number of completed tasks for the user
  const completedCount = await prisma.task.count({
    where: { userId, complete: true }, // Only count completed tasks
  });

  // Calculate the number of pending tasks (total tasks - completed tasks)
  const pendingCount = _count.id - completedCount;

  // Return the total tasks, completed tasks, and pending tasks counts
  return { totalTasks: _count.id, completedCount, pendingCount };
}
