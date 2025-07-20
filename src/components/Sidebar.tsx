import Image from 'next/image';
import Link from 'next/link';
import { Session } from 'next-auth';
import { SiNextdotjs } from 'react-icons/si';
import { SidebarMenuItem } from './SidebarMenuItem';
import { LogoutButton } from './LogoutButton';

const menuItems = [
  {
    path: '/dashboard',
    title: 'Dashboard',
  },
  {
    path: '/dashboard/rest-tasks',
    title: 'REST API',
  },
  {
    path: '/dashboard/server-tasks',
    title: 'Server Actions',
  },
  {
    path: '/dashboard/profile',
    title: 'Profile',
  },
];

interface SidebarProps {
  session: Session | null;
}

export const Sidebar = ({ session }: SidebarProps) => {
  const avatarUrl = session?.user?.image ? session?.user?.image : '/avatar.png';
  const userName = session?.user?.name || 'John Doe';
  const userRoles = session?.user?.roles || ['user'];

  return (
    <aside
      id='sidebar'
      className='fixed z-10 top-0 left-0 pb-3 px-4 w-full flex flex-col justify-between h-screen border-r bg-white transition-transform duration-300 -translate-x-full lg:translate-x-0 md:w-4/12 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]'
    >
      <div>
        <div className='py-3 text-center'>
          <Link href='/dashboard' className='inline-flex space-x-2 items-center'>
            <SiNextdotjs size={40} />
            <h5 className='text-lg md:text-2xl ml-2'>Task Management</h5>
          </Link>
        </div>
        <div className='mt-6 text-center'>
          <Image
            src={avatarUrl}
            alt='avatar'
            width={100}
            height={100}
            priority
            className='w-28 h-28 m-auto rounded-full object-cover'
          />
          <h5 className='mt-4 text-xl lg:block capitalize'>{userName}</h5>
          <span className='text-slate-500 lg:block'>{userRoles.join(', ')}</span>
        </div>
        <nav className='mt-8 space-y-3'>
          {menuItems.map(item => (
            <SidebarMenuItem key={item.path} {...item} />
          ))}
        </nav>
      </div>
      <div className='px-6 -mx-6 pt-4 flex justify-between items-center border-t'>
        <LogoutButton />
      </div>
    </aside>
  );
};
