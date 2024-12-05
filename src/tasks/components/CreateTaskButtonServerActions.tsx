'use client';
import { useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { CreateTaskModalServerActions } from './CreateTaskModalServerActions';

export const CreateTaskButtonServerActions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <button
        type='button'
        onClick={handleOpenModal}
        className='w-full px-4 py-3 mt-4 sm-mt-0 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all text-sm sm:text-base flex items-center justify-center'
      >
        <IoAddCircleOutline size={20} className='mr-2' />
        Create task
      </button>

      {/* Mostrar el modal cuando isModalOpen sea true */}
      {isModalOpen && <CreateTaskModalServerActions onClose={handleCloseModal} />}
    </div>
  );
};
