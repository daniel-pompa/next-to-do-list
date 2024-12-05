'use client';
import { useState } from 'react';
import {
  AiOutlineAppstore,
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
} from 'react-icons/ai';
import { FiMenu, FiX } from 'react-icons/fi';

interface TopMenuProps {
  totalTasks: number;
  completedCount: number;
  pendingCount: number;
}

export const TopMenu = ({ totalTasks, completedCount, pendingCount }: TopMenuProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    const sidebarElement = document.getElementById('sidebar');
    if (sidebarElement) {
      sidebarElement.classList.toggle('-translate-x-full', isSidebarOpen);
      sidebarElement.classList.toggle('translate-x-0', !isSidebarOpen);
    }
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className='sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5'>
      <div className='px-6 flex items-center justify-between space-x-4'>
        <h5 hidden className='text-2xl text-slate-500 font-medium lg:block'>
          Dashboard
        </h5>
        <button
          onClick={toggleSidebar}
          className='w-12 h-16 -mr-2 border-r lg:hidden'
          aria-label='Toggle Sidebar'
        >
          {isSidebarOpen ? <FiX size={30} /> : <FiMenu size={30} />}
        </button>
        <div className='flex space-x-2'>
          {/* Tasks Total */}
          <button className='relative flex items-center justify-center w-10 h-10 rounded-lg border bg-slate-50 focus:bg-slate-100 active:bg-slate-200'>
            <AiOutlineAppstore size={25} className='text-blue-500' />
            {totalTasks > 0 && (
              <span className='absolute top-0 right-0 bg-blue-500 text-slate-50 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center transform translate-x-1 -translate-y-1'>
                {totalTasks}
              </span>
            )}
          </button>
          {/* Tasks Completed */}
          <button className='relative flex items-center justify-center w-10 h-10 rounded-lg border bg-slate-50 focus:bg-slate-100 active:bg-slate-200'>
            <AiOutlineCheckCircle size={25} className='text-green-500' />
            {completedCount > 0 && (
              <span className='absolute top-0 right-0 bg-green-500 text-slate-50 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center transform translate-x-1 -translate-y-1'>
                {completedCount}
              </span>
            )}
          </button>
          {/* Pending Tasks */}
          <button className='relative flex items-center justify-center w-10 h-10 rounded-lg border bg-slate-50 focus:bg-slate-100 active:bg-slate-200'>
            <AiOutlineClockCircle size={25} className='text-red-500' />
            {pendingCount > 0 && (
              <span className='absolute top-0 right-0 bg-red-500 text-slate-50 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center transform translate-x-1 -translate-y-1'>
                {pendingCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
