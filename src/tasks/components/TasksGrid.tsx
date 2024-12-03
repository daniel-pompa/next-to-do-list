'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Task } from '@prisma/client';
import { TaskItem, EditTaskModal } from '@/tasks';
import * as taskUtils from '@/tasks/utils/tasks';

interface TasksGridProps {
  tasks?: Task[];
}

export const TasksGrid = ({ tasks = [] }: TasksGridProps) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const router = useRouter();

  const toggleTaskComplete = async (id: string, complete: boolean) => {
    const task = await taskUtils.toggleComplete(id, complete);
    router.refresh();
    return task;
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task); // Set the selected task for editing
  };

  const handleDelete = async (id: string) => {
    await taskUtils.deleteTask(id); // Call the delete task function
    router.refresh(); // Refresh to update the task list
  };

  if (!tasks.length) {
    return (
      <div className='mt-3'>
        <p className='text-xl'>No tasks found.</p>
        <p className='text-sm md:text-base text-slate-500 mt-1'>
          Get started by adding your first task!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={toggleTaskComplete}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {selectedTask && (
        <EditTaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)} // Close the modal
        />
      )}
    </>
  );
};
