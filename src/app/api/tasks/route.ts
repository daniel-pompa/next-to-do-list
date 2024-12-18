import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { createTaskSchema } from '@/schemas/task';
import { getUserServerSession } from '@/auth/actions/auth-actions';

// Fetch tasks with optional pagination - GET /api/tasks
export async function GET(request: Request) {
  const user = await getUserServerSession();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);

    // Parse pagination parameters
    const take = parseInt(searchParams.get('take') || '10', 10);
    const skip = parseInt(searchParams.get('skip') || '0', 10);

    if (isNaN(take) || take < 0 || isNaN(skip) || skip < 0) {
      return NextResponse.json(
        { error: 'Invalid pagination parameters.' },
        { status: 400 }
      );
    }

    // Fetch tasks filtered by userId
    const tasks = await prisma.task.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: take > 0 ? take : undefined,
      skip,
    });

    // Fetch task statistics filtered by userId
    const [totalTasks, completedCount] = await prisma.$transaction([
      prisma.task.count({ where: { userId: user.id } }),
      prisma.task.count({ where: { userId: user.id, complete: true } }),
    ]);
    const pendingCount = totalTasks - completedCount;

    // Return user-specific task data
    return NextResponse.json({
      tasks,
      totalTasks,
      completedCount,
      pendingCount,
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while fetching tasks.' },
      { status: 500 }
    );
  }
}

// Create a new task - POST /api/tasks
export async function POST(request: Request) {
  const user = await getUserServerSession();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Validate request body against the schema
    const { title, description, complete } = await createTaskSchema.validate(
      await request.json()
    );

    // Create the new task
    const task = await prisma.task.create({
      data: { title, description, complete, userId: user.id },
    });

    // Respond with the created task
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);

    // Handle validation or unexpected errors
    return NextResponse.json(
      { error: 'Failed to create task. Check your input and try again.' },
      { status: 400 }
    );
  }
}

// Delete completed tasks - DELETE /api/tasks
export async function DELETE() {
  const user = await getUserServerSession();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Delete all tasks
    await prisma.task.deleteMany({ where: { complete: true, userId: user.id } });
    // Respond with success message
    return NextResponse.json({ message: 'All completed tasks deleted successfully' });
  } catch (error) {
    console.error('Error deleting tasks:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while deleting tasks.' },
      { status: 500 }
    );
  }
}
