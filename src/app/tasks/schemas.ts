import { z } from "zod"

// Schema for creating a task
export const CreateTaskSchema = z.object({
  name: z.string(),
  type: z.string(),
  description: z.string().optional(),
  // Define `template` with the appropriate type, e.g., z.string(), z.number(), etc.
})

// Schema for updating a task, including the task `id`
export const UpdateTaskSchema = CreateTaskSchema.merge(
  z.object({
    id: z.number(),
  })
)

// Schema for deleting a task, requiring only the task `id`
export const DeleteTaskSchema = z.object({
  id: z.number(),
})
