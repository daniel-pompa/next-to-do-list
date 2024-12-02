'use client';
import { Task } from '@prisma/client';
import { TaskItem } from './TaskItem';

interface TasksGridProps {
  tasks?: Task[];
}

export const TasksGrid = ({ tasks = [] }: TasksGridProps) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};
