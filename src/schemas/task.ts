import * as yup from 'yup';

// Schema for creating tasks
export const createTaskSchema = yup.object({
  title: yup.string().required('Title is required.'),
  description: yup.string().required('Description is required.'),
  complete: yup.boolean().optional().default(false),
});

// Schema for updating tasks
export const updateTaskSchema = yup.object({
  title: yup.string().optional(),
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
});
