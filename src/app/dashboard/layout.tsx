import { ReactNode } from 'react';
import { Sidebar, TopMenu } from '@/components';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Sidebar />
      {/* Main Content */}
      <div className='ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen'>
        <TopMenu />
        <div>{children}</div>
      </div>
    </>
  );
}
