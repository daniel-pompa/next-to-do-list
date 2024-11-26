import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { createTaskSchema } from '@/schemas/task';

// Fetch all tasks with pagination - GET /api/tasks
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get('take') || '6');
  const skip = Number(searchParams.get('skip') || '0');
  // Validate query parameters
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
  // Retrieve tasks from the database
  const tasks = await prisma.task.findMany({ take, skip });
  return NextResponse.json(tasks);
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
