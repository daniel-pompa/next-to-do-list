import prisma from '@/lib/prisma';
import { getTask } from '@/lib/task';
import { updateTaskSchema } from '@/schemas/task';
import { NextResponse } from 'next/server';

interface Segments {
  params: Promise<{
    id: string;
  }>;
}

// Centralized error handling function
const handleError = (error: unknown) => {
  if (error instanceof Error) {
    return { error: error.message }; // Return the error message
  }
  return { error: 'An unexpected error occurred.' }; // Return a generic error message for unforeseen errors
};

// Fetch a single task by ID - GET /api/tasks/:id
export const GET = async (request: Request, { params }: Segments) => {
  const urlParams = await params; // Await the promise to get the parameters
  const task = await getTask(urlParams.id); // Use urlParams.id to fetch the task
  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }
  return NextResponse.json(task);
};

// Update a task by ID - PUT /api/tasks/:id
export const PUT = async (request: Request, { params }: Segments) => {
  const urlParams = await params; // Await the promise to get the parameters
  const task = await getTask(urlParams.id); // Use urlParams.id to fetch the task
  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }
  try {
    const { title, description, complete } = await updateTaskSchema.validate(
      await request.json()
    );
    const updatedTask = await prisma.task.update({
      where: { id: urlParams.id },
      data: { title, description, complete },
    });
    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json(handleError(error), { status: 400 });
  }
};

// Delete a task by ID - DELETE /api/tasks/:id
export const DELETE = async (request: Request, { params }: Segments) => {
  const urlParams = await params; // Await the promise to get the parameters
  const task = await getTask(urlParams.id); // Ensure the task exists
  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }
  try {
    await prisma.task.delete({ where: { id: urlParams.id } });
    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error) {
    return NextResponse.json(handleError(error), { status: 500 });
  }
};
