'use client';
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';
import { Task } from '@prisma/client';
import styles from './TodoItem.module.css';
import { format } from 'date-fns';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string, complete: boolean) => Promise<Task | void>;
}

export const TaskItem = ({ task, onToggleComplete }: TaskItemProps) => {
  // Format date
  const formattedDate = format(new Date(task.createdAt), 'yyyy-MM-dd HH:mm');

  return (
    <div
      className={`${styles['task-item']} ${
        task.complete ? styles['task-done'] : styles['task-pending']
      } mt-5`}
    >
      <div
        onClick={() => onToggleComplete(task.id, !task.complete)}
        className={`${styles['task-icon']} ${
          task.complete ? styles['task-icon-done'] : styles['task-icon-pending']
        } cursor-pointer`}
      >
        {task.complete ? <IoCheckboxOutline size={25} /> : <IoSquareOutline size={25} />}
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
