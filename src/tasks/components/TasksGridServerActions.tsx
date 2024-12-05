'use client';
import { useState } from 'react';
import { Task } from '@prisma/client';
import { TaskItem } from '@/tasks';
import { deleteTask, toggleTask } from '../actions/task-actions';
import { EditTaskModalServerActions } from './EditTaskModalServerActions';

interface TasksGridServerActionsProps {
  tasks?: Task[];
}

export const TasksGridServerActions = ({ tasks = [] }: TasksGridServerActionsProps) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleEdit = (task: Task) => {
    setSelectedTask(task); // Set the selected task for editing
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
            onToggleComplete={toggleTask}
            onEdit={handleEdit}
            onDelete={deleteTask}
          />
        ))}
      </div>

      {selectedTask && (
        <EditTaskModalServerActions
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </>
  );
};
