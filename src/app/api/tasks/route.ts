import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { createTaskSchema } from '@/schemas/task';
import { getUserServerSession } from '@/auth/actions/auth-actions';

// Fetch tasks with optional pagination - GET /api/tasks
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse pagination parameters
    const take = parseInt(searchParams.get('take') || '10', 10); // Default: 10 items
    const skip = parseInt(searchParams.get('skip') || '0', 10); // Default: 0 offset

    if (isNaN(take) || take < 0) {
      return NextResponse.json(
        { error: 'Invalid "take" parameter. It must be a positive number.' },
        { status: 400 }
      );
    }

    if (isNaN(skip) || skip < 0) {
      return NextResponse.json(
        { error: 'Invalid "skip" parameter. It must be a positive number.' },
        { status: 400 }
      );
    }

    // Fetch paginated tasks
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
      take: take > 0 ? take : undefined, // Take only if greater than 0
      skip,
    });

    // Fetch task statistics
    const [totalTasks, completedCount] = await prisma.$transaction([
      prisma.task.count(), // Total tasks
      prisma.task.count({ where: { complete: true } }), // Completed tasks
    ]);
    const pendingCount = totalTasks - completedCount;

    // Responds with tasks data and counts
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
