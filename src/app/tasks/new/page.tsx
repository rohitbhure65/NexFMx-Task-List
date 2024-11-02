import { Metadata } from "next"
import { Suspense } from "react"
import { New__ModelName } from "../components/NewTask"

export const metadata: Metadata = {
  title: "NexFMx Task List",
  description: "i was created this website for task list assigment",
}

export default function Page() {
  return (
    <div>
      <h1>Create New Task</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <New__ModelName />
      </Suspense>
    </div>
  )
}
