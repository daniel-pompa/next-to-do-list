import { Sidebar, TopMenu } from '@/components';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getTaskCountsByUserId } from '@/lib/task';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/api/auth/signin');

  if (!session.user) redirect('/api/auth/signin');

  const { totalTasks, completedCount, pendingCount } = await getTaskCountsByUserId(
    session.user.id
  );

  return (
    <>
      <Sidebar session={session} />
      <div className='ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen'>
        <TopMenu
          totalTasks={totalTasks}
          completedCount={completedCount}
          pendingCount={pendingCount}
        />
        <div>{children}</div>
      </div>
    </>
  );
}
