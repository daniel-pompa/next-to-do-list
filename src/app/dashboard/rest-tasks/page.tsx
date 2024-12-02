import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { TasksGrid } from '@/tasks';

export const metadata: Metadata = {
  title: 'Task List - REST API',
  description:
    'Explore and manage tasks efficiently using our REST API. View tasks sorted by creation date, with real-time data handling and an intuitive interface.',
};

export default async function RestTasksPage() {
  const tasks = await prisma.task.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className='px-6 pt-6'>
      {/* TODO: Add form to create a new task */}
      <h1 className='text-2xl'>Task List - REST API</h1>
      <TasksGrid tasks={tasks} />
    </div>
  );
}
