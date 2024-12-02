'use client';
import { useState } from 'react';
import { AiOutlineCheckCircle, AiOutlineClockCircle } from 'react-icons/ai';
import { FiMenu, FiX } from 'react-icons/fi';

export const TopMenu = () => {
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
          {/* Tasks Completed */}
          <button className='flex items-center justify-center w-10 h-10 rounded-lg border bg-slate-50 focus:bg-slate-100 active:bg-slate-200'>
            <AiOutlineCheckCircle size={25} className='text-green-500' />
          </button>
          {/* Pending Tasks */}
          <button className='flex items-center justify-center w-10 h-10 rounded-lg border bg-slate-50 focus:bg-slate-100 active:bg-slate-200'>
            <AiOutlineClockCircle size={25} className='text-red-500' />
          </button>
        </div>
      </div>
    </div>
  );
};
