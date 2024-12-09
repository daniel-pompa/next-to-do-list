import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { WidgetItem } from '@/components';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <div className='flex flex-col p-6 mt-5'>
      <div className='w-full max-w-xl'>
        <div className='shadow-lg rounded-md p-6 mb-8 border border-slate-200'>
          <h2 className='text-2xl mb-2'>Welcome, {session.user?.name}</h2>
          <p className='text-lg text-slate-500'>{session.user?.email}</p>
        </div>
        <WidgetItem />
      </div>
    </div>
  );
}
