export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import {
  CreateTaskButtonServerActions,
  DeleteCompletedTasksButtonServerActions,
  TasksGridServerActions,
} from '@/tasks';

export const metadata: Metadata = {
  title: 'Task List - Server Actions',
  description:
    'Explore and manage tasks efficiently using our Server Actions. View tasks sorted by creation date, with real-time data handling and an intuitive interface.',
};

export default async function ServerTasksPage() {
  const tasks = await prisma.task.findMany({ orderBy: { createdAt: 'desc' } });

  if (!tasks) {
    return (
      <p className='mt-3 text-slate-500 text-lg sm:text-xl'>
        No tasks found, please create a new task.
      </p>
    );
  }

  return (
    <div className='px-6 pt-6'>
      <div className='flex flex-col sm:flex-row gap-4 items-center justify-end'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 items-end w-full sm:w-auto'>
          {/* Create task button */}
          <CreateTaskButtonServerActions />
          {/* Delete completed tasks button */}
          <DeleteCompletedTasksButtonServerActions />
        </div>
      </div>
      <h1 className='text-2xl mt-8 sm:mt-0'>Task List - Server Actions</h1>
      <TasksGridServerActions tasks={tasks} />
    </div>
  );
}
