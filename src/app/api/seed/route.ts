import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Delete all existing todos
    await prisma.task.deleteMany();
    // Create new todo items
   const tasks = await prisma.task.createMany({
     data: [
       {
         title: 'Next.js Fundamentals',
         description:
           'Master routing, pages, and rendering in Next.js for efficient development.',
       },
       {
         title: 'TypeScript Proficiency',
         description:
           'Enhance your coding skills with strong typing, interfaces, and classes.',
         complete: true,
       },
       {
         title: 'UI Design with Tailwind CSS',
         description:
           'Build responsive, mobile-first user interfaces using Tailwind CSS.',
       },
       {
         title: 'Database Managemetn with Prisma',
         description:
           'Integrate Prisma ORM for robust and type-safe database operations.',
       },
       {
         title: 'PostgreSQL with Docker',
         description:
           'Set up and run PostgreSQL databases using Docker for local development.',
       },
       {
         title: 'Full-Stack Development',
         description:
           'Build a full-stack application connecting Next.js with a PostgreSQL database.',
       },
     ],
   });
    console.log(tasks);
    return NextResponse.json({ message: 'Seed executed successfully' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: 'Error executing seed', error: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json({ message: 'Unknown error occurred' }, { status: 500 });
    }
  }
}
