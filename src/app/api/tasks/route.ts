import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { createTaskSchema } from '@/schemas/task';

// Fetch all tasks with or without pagination - GET /api/tasks
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const take = Number(searchParams.get('take') || '0'); // 0 to get all
    const skip = Number(searchParams.get('skip') || '0');

    if (isNaN(take)) {
      return NextResponse.json(
        { error: 'Invalid take parameter value. It must be a number.' },
        { status: 400 }
      );
    }

    if (isNaN(skip)) {
      return NextResponse.json(
        { error: 'Invalid skip parameter value. It must be a number.' },
        { status: 400 }
      );
    }

    // Fetch all tasks to get counts
    const tasks = await prisma.task.findMany();
    const totalTasks = tasks.length;
    const completedCount = tasks.filter(task => task.complete).length;
    const pendingCount = tasks.filter(task => !task.complete).length;

    return NextResponse.json({ totalTasks, completedCount, pendingCount });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Error fetching tasks' }, { status: 500 });
  }
}

// Create a new task - POST /api/tasks
export async function POST(request: Request) {
  try {
    // Validate the request body against the schema
    const { title, description, complete } = await createTaskSchema.validate(
      await request.json()
    );
    // Create a new task in the database
    const task = await prisma.task.create({ data: { title, description, complete } });
    return NextResponse.json(task);
  } catch (error) {
    // Handle validation errors or unexpected exceptions
    return NextResponse.json(error, { status: 400 });
  }
}
