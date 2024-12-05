'use client';
import { useState } from 'react';
import { Task } from '@prisma/client';
import { editTask } from '../actions/task-actions';

interface EditTaskModalServerActionsProps {
  task: Task;
  onClose: () => void;
}

export const EditTaskModalServerActions = ({
  task,
  onClose,
}: EditTaskModalServerActionsProps) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await editTask(task.id, title, description); // Call edit task action
    onClose(); // Close modal after update
  };

  return (
    <div className='fixed inset-0 bg-slate-500 bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-6 rounded-lg w-11/12 md:w-1/3'>
        <h3 className='text-2xl mb-4'>Edit Task</h3>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='title' className='block text-lg mb-2'>
              Title
            </label>
            <input
              id='title'
              type='text'
              value={title}
              onChange={e => setTitle(e.target.value)}
              className='w-full p-2 border border-slate-300 rounded'
              placeholder='Enter task title'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='description' className='block text-lg mb-2'>
              Description
            </label>
            <textarea
              id='description'
              value={description}
              onChange={e => setDescription(e.target.value)}
              className='w-full p-2 border border-slate-300 rounded'
              placeholder='Enter task description'
              rows={4}
              required
            />
          </div>
          <div className='flex justify-end space-x-2'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 bg-slate-200 text-slate-700 rounded'
            >
              Cancel
            </button>
            <button type='submit' className='px-4 py-2 bg-blue-500 text-white rounded'>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
