import { Task } from '@prisma/client';

export const toggleComplete = async (id: string, complete: boolean): Promise<Task> => {
  const body = { complete };
  const task = await fetch(`/api/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json());
  return task;
};

export const createTask = async (title: string, description: string): Promise<Task> => {
  const body = { title, description };

  const task = await fetch('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json());
  return task;
};

export const editTask = async (
  id: string,
  title: string,
  description: string
): Promise<Task> => {
  const body = { title, description };
  const task = await fetch(`/api/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json());
  return task;
};

export const deleteTask = async (id: string): Promise<void> => {
  await fetch(`/api/tasks/${id}`, { method: 'DELETE' }).then(res => res.json);
};

export const deleteCompletdTasks = async (): Promise<boolean> => {
  await fetch('/api/tasks', { method: 'DELETE' }).then(res => res.json());
  return true;
};
