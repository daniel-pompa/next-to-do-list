'use client';
import { IoTrashOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import * as taskUtils from '@/tasks/utils/tasks';

export const DeleteCompletedTasksButton = () => {
  const router = useRouter();

  const deleteCompleted = async () => {
    await taskUtils.deleteCompletdTasks();
    router.refresh();
  };

  return (
    <div>
      <button
        type='button'
        onClick={() => deleteCompleted()}
        className='w-full sm:w-auto px-4 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition-all text-sm sm:text-base flex items-center justify-center'
      >
        <IoTrashOutline size={20} className='mr-2' />
        Delete completed
      </button>
    </div>
  );
};
