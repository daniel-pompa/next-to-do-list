import { WidgetItem } from '@/components';

export default function DashboardPage() {
  return (
    <div className='px-6 pt-6'>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        <WidgetItem />
      </div>
    </div>
  );
}
