'use client';
import { IoCheckboxOutline, IoSquareOutline, IoTrashOutline } from 'react-icons/io5';
import { Task } from '@prisma/client';
import styles from './TaskItem.module.css';
import { format } from 'date-fns';
import { FiEdit } from 'react-icons/fi';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string, complete: boolean) => Promise<Task | void>; // Handler for toggling completion
  onEdit: (task: Task) => void; // Handler for editing
  onDelete: (id: string) => void; // Handler for deleting
}

export const TaskItem = ({ task, onToggleComplete, onEdit, onDelete }: TaskItemProps) => {
  // Format date
  const formattedDate = format(new Date(task.createdAt), 'yyyy-MM-dd HH:mm');

  return (
    <div
      className={`${styles['task-item']} ${
        task.complete ? styles['task-done'] : styles['task-pending']
      } mt-5`}
    >
      <div className='flex md:flex-col items-center gap-2'>
        {/* Checkbox */}
        <div
          onClick={() => onToggleComplete(task.id, !task.complete)}
          className={`${styles['task-icon']} ${
            task.complete ? styles['task-icon-done'] : styles['task-icon-pending']
          } cursor-pointer`}
        >
          {task.complete ? (
            <IoCheckboxOutline size={25} />
          ) : (
            <IoSquareOutline size={25} />
          )}
        </div>
        {/* Actions: Edit and Delete buttons */}
        <div className='flex md:flex-col items-center gap-2'>
          <button
            onClick={() => onEdit(task)}
            className={`${styles['task-icon']} ${
              task.complete ? styles['task-icon-done'] : styles['task-icon-pending']
            } p-2 rounded-full`}
            aria-label='Edit task'
          >
            <FiEdit size={25} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className={`${styles['task-icon']} ${
              task.complete ? styles['task-icon-done'] : styles['task-icon-pending']
            } p-2 rounded-full`}
            aria-label='Delete task'
          >
            <IoTrashOutline size={25} />
          </button>
        </div>
      </div>

      <div>
        <h5
          className={`${
            task.complete ? styles['task-title-done'] : styles['task-title-pending']
          }`}
        >
          {task.title}
        </h5>
        <p
          className={`${
            task.complete
              ? styles['task-description-done']
              : styles['task-description-pending']
          }`}
        >
          {task.description}
        </p>
        <p className='text-xs md:text-sm mt-2'>Created: {formattedDate}</p>
      </div>
    </div>
  );
};
