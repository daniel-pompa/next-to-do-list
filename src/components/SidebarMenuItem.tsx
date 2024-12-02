'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import { BsBookmark } from 'react-icons/bs';

interface SidebarMenuItemProps {
  path: string;
  title: string;
}

export const SidebarMenuItem = ({ path, title }: SidebarMenuItemProps) => {
  const currentPath = usePathname();

  return (
    <Link
      href={path}
      className={`
            px-4 py-3 flex items-center space-x-4 rounded-md hover:bg-slate-800 hover:text-white
            ${
              currentPath === path
                ? 'text-white bg-slate-800'
                : 'text-slate-800 border border-slate-200'
            }
          `}
    >
      <div className='flex items-center'>
        {currentPath === path ? (
          <BsFillBookmarkCheckFill size={20} />
        ) : (
          <BsBookmark size={20} />
        )}
        <span className='ml-2'>{title}</span>
      </div>
    </Link>
  );
};
