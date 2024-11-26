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
          title: 'Master Next.js Basics',
          description: 'Learn routing, pages, and server-side rendering.',
        },
        {
          title: 'Get Proficient in TypeScript',
          description:
            'Understand types, interfaces, and classes to improve code safety.',
          complete: false,
        },
        {
          title: 'Build UIs with Tailwind CSS',
          description: "Create responsive designs with Tailwind's utility classes.",
        },
        {
          title: 'Work with Prisma ORM',
          description: 'Use Prisma for type-safe database interactions.',
        },
        {
          title: 'Set Up PostgreSQL with Docker',
          description: 'Run PostgreSQL locally using Docker containers.',
        },
        {
          title: 'Build Full-Stack with Next.js and PostgreSQL',
          description: 'Develop full-stack an app integrating Next.js and PostgreSQL.',
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
