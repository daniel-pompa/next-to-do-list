'use client';
import { useSession, signOut, signIn } from 'next-auth/react';
import { RiLogoutCircleLine, RiLogoutCircleRLine } from 'react-icons/ri';
import { FaSpinner } from 'react-icons/fa';

export const LogoutButton = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <button className='px-4 py-3 flex items-center space-x-4 rounded-md text-slate-600 group'>
        <FaSpinner size={20} className='animate-spin' />
        <span className='group-hover:text-slate-700'>Loading...</span>
      </button>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <button
        className='px-4 py-3 flex items-center space-x-2 rounded-md text-slate-600 group'
        onClick={() => signIn()}
      >
        <RiLogoutCircleRLine size={24} />
        <span className='group-hover:text-slate-700'>Sign in</span>
      </button>
    );
  }

  return (
    <button
      className='px-4 py-3 flex items-center space-x-2 rounded-md text-slate-600 group'
      onClick={() => signOut()}
    >
      <RiLogoutCircleLine size={24} />
      <span className='group-hover:text-slate-700'>Sign out</span>
    </button>
  );
};
