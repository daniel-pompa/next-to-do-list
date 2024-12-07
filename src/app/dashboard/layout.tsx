import { Sidebar, TopMenu } from '@/components';
import prisma from '@/lib/prisma';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetches task data from the database
  async function getTaskData() {
    try {
      const tasks = await prisma.task.findMany({
        orderBy: { updatedAt: 'desc' },
        select: {
          id: true,
          complete: true,
        },
      });

      // Calculate task counts
      const totalTasks = tasks.length;
      const completedCount = tasks.filter(task => task.complete).length;
      const pendingCount = totalTasks - completedCount;

      return { totalTasks, completedCount, pendingCount };
    } catch (error) {
      // Log the error and return fallback data to prevent UI crashes
      console.error('Error fetching tasks:', error);
      return { totalTasks: 0, completedCount: 0, pendingCount: 0 };
    }
  }

  // Fetch task data before rendering the layout
  const { totalTasks, completedCount, pendingCount } = await getTaskData();

  return (
    <>
      <Sidebar />
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
