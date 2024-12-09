'use client';
import { useEffect, useState } from 'react';
import { AiOutlineCheckCircle, AiOutlineClockCircle } from 'react-icons/ai';

interface WidgetItemProps {
  userName?: string;
}

export const WidgetItem = ({ userName }: WidgetItemProps) => {
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTaskCounts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/tasks');
      if (response.ok) {
        const data = await response.json();
        setTotalTasks(data.totalTasks);
        setCompletedCount(data.completedCount);
        setPendingCount(data.pendingCount);
      } else {
        setError('Error fetching task counts');
      }
    } catch (error) {
      console.error('Error fetching task counts:', error);
      setError('An error occurred while fetching task counts.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskCounts();
  }, []);

  return (
    <div className='md:col-span-2 lg:col-span-1'>
      <div className='h-full px-6 py-8 space-y-6 rounded-lg border border-slate-300 shadow-lg'>
        {/* Header Section */}
        <div className='text-center'>
          <h2 className='text-2xl mb-2'>Welcome, {userName}</h2>
          <h3 className='text-xl text-slate-500'>Task Overview</h3>
        </div>
        {/* Content Section */}
        <div className='flex flex-col items-center space-y-6'>
          {isLoading ? (
            <div className='text-slate-500 text-lg'>Loading tasks...</div>
          ) : error ? (
            <div className='text-red-600'>{error}</div>
          ) : (
            <>
              <div className='text-center'>
                <h4 className='text-6xl font-extrabold mb-2'>{totalTasks}</h4>
                <p className='text-lg font-medium text-slate-500'>Total Tasks</p>
              </div>
              <div className='w-full border-t border-slate-300'></div>
              <div className='grid grid-cols-2 gap-8 w-full'>
                {/* Completed Tasks */}
                <div className='flex flex-col items-center'>
                  <div className='w-16 h-16 rounded-full bg-green-100 flex items-center justify-center shadow-md'>
                    <AiOutlineCheckCircle size={40} className='text-green-500' />
                  </div>
                  <h5 className='text-3xl font-semibold text-slate-700 mt-3'>
                    {completedCount}
                  </h5>
                  <span className='text-sm text-slate-500'>Completed</span>
                </div>
                {/* Pending Tasks */}
                <div className='flex flex-col items-center'>
                  <div className='w-16 h-16 rounded-full bg-red-100 flex items-center justify-center shadow-md'>
                    <AiOutlineClockCircle size={40} className='text-red-500' />
                  </div>
                  <h5 className='text-3xl font-semibold text-slate-700 mt-3'>
                    {pendingCount}
                  </h5>
                  <span className='text-sm text-slate-500'>Pending</span>
                </div>
              </div>
            </>
          )}
        </div>
        {/* Footer Section */}
        <div className='text-center text-sm text-slate-400'>
          Stay productive and keep track of your tasks efficiently.
        </div>
      </div>
    </div>
  );
};
