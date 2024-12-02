import { AiOutlineCheckCircle, AiOutlineClockCircle } from 'react-icons/ai';

export const WidgetItem = () => {
  return (
    <div className='md:col-span-2 lg:col-span-1'>
      <div className='h-full p-4 space-y-4 rounded-xl border border-slate-200 bg-white'>
        {/* Title */}
        <h5 className='text-2xl text-center'>Task Overview</h5>
        {/* General Summary */}
        <div className='flex flex-col items-center space-y-4'>
          {/* Total Tasks */}
          <div className='text-center'>
            <h5 className='text-5xl font-extrabold text-slate-700 mb-2'>0</h5>
            <span className='text-lg font-medium'>Total Tasks</span>
          </div>
          <div className='w-full border-t border-slate-300'></div>
          {/* Task Details */}
          <div className='grid grid-cols-2 gap-8 w-full'>
            {/* Completed Tasks */}
            <div className='flex flex-col items-center'>
              <div className='w-12 h-12 flex items-center justify-center'>
                <AiOutlineCheckCircle size={40} className='text-green-500' />
              </div>
              <h5 className='text-2xl'>0</h5>
              <span className='text-sm'>Completed</span>
            </div>
            {/* Pending Tasks */}
            <div className='flex flex-col items-center'>
              <div className='w-12 h-12 flex items-center justify-center'>
                <AiOutlineClockCircle size={40} className='text-red-500' />
              </div>
              <h5 className='text-2xl'>0</h5>
              <span className='text-sm'>Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
