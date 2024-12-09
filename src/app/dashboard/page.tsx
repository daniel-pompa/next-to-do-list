import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { WidgetItem } from '@/components';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name || 'John Doe';

  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <div className='px-6 pt-6'>
      <div className='w-full max-w-xl'>
        <WidgetItem userName={userName} />
      </div>
    </div>
  );
}
