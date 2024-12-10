'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function ProfilePage() {
  const { data: session } = useSession();

  useEffect(() => {
    console.log('Profile page loaded');
  }, []);

  return (
    <div className='px-6 pt-6 text-center'>
      <div className='max-w-xl shadow-xl rounded-lg p-8 border border-slate-200'>
        <h1 className='text-2xl mb-6'>Profile Page</h1>
        <hr className='mb-6 border-t-2 border-slate-200' />
        <div className='mt-4 space-y-2'>
          <div className='flex-shrink-0'>
            <Image
              src={session?.user?.image ?? '/avatar.png'}
              alt='User Avatar'
              width={100}
              height={100}
              className='w-24 h-24 rounded-full object-cover mx-auto'
              priority
            />
          </div>
          <h3 className='text-xl'>Account Information</h3>
          <div className='space-y-1'>
            <div className='space-x-1'>
              <span>Username:</span>
              <span className='text-slate-500'>{session?.user?.name ?? 'John Doe'}</span>
            </div>
            <div className='space-x-1'>
              <span>Roles:</span>
              <span className='text-slate-500'>
                {session?.user?.roles && session.user.roles.length > 0
                  ? session.user.roles.join(', ')
                  : 'user'}
              </span>
            </div>
            <div className='space-x-1'>
              <span>Email:</span>
              <span className='text-slate-500'>
                {session?.user?.email ?? 'john.doe@example.com'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
