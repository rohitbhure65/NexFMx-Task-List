import { Metadata } from "next"
import { Suspense } from "react"
import { TasksList } from "./components/TasksList"

export const metadata: Metadata = {
  title: "Tasks",
  description: "List of tasks",
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TasksList />
    </Suspense>
  )
}
