import { z } from "zod"

// Schema for creating a task
export const CreateTaskSchema = z.object({
  name: z.string().min(1, "Task name is required"),
  type: z.string().min(1, "Task type is required"),
  description: z.string().optional(),
  status: z.enum(["Backlog", "In Progress", "Completed"]).default("Backlog"),
  isActive: z.boolean().default(true),
  createdBy: z.string().default("sysadmin"),
  updatedBy: z.string().default("sysadmin"),
})

// Schema for updating a task, including the task `id`
export const UpdateTaskSchema = CreateTaskSchema.merge(
  z.object({
    id: z.string(),
  })
)

// Schema for deleting a task, requiring only the task `id`
export const DeleteTaskSchema = z.object({
  id: z.string(),
})
