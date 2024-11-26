import prisma from '@/lib/prisma';
import { getTask } from '@/lib/task';
import { updateTaskSchema } from '@/schemas/task';
import { NextResponse } from 'next/server';

interface Segments {
  params: {
    id: string;
  };
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
  // Try to get the task using the provided ID
  const task = await getTask(params.id);
  // If no task is found, return a 404 response
  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }
  // If task exists, return the task
  return NextResponse.json(task);
};

// Update a task by ID - PUT /api/tasks/:id
export const PUT = async (request: Request, { params }: Segments) => {
  const task = await getTask(params.id); // Retrieve the task using the provided ID
  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 }); // If task is not found, return 404
  }
  try {
    // Validate the request body using the updateTaskSchema
    const { title, description } = await updateTaskSchema.validate(await request.json());
    // Update the task in the database
    const updatedTask = await prisma.task.update({
      where: { id: params.id },
      data: { title, description },
    });
    return NextResponse.json(updatedTask); // Return the updated task
  } catch (error) {
    return NextResponse.json(handleError(error), { status: 400 }); // If validation fails, return 400
  }
};

// Delete a task by ID - DELETE /api/tasks/:id
export const DELETE = async (request: Request, { params }: Segments) => {
  const task = await getTask(params.id); // Ensure the task exists
  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 }); // If task is not found, return 404
  }
  try {
    // Delete the task from the database
    await prisma.task.delete({ where: { id: params.id } });
    return NextResponse.json({ message: 'Task deleted successfully' }); // Confirm the task was deleted
  } catch (error) {
    return NextResponse.json(handleError(error), { status: 500 }); // If an error occurs during deletion, return 500
  }
};
