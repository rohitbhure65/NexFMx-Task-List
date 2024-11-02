import React from "react"
import { Form, FormProps } from "src/app/components/Form"
import { LabeledTextField } from "src/app/components/LabeledTextField"
import LabeledCheckbox from "./LabeledCheckbox" // Import the new checkbox component
import { z } from "zod"

export { FORM_ERROR } from "src/app/components/Form"

export function TaskForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const statusOptions = [
    { value: "Backlog", label: "Backlog" },
    { value: "In Progress", label: "In Progress" },
    { value: "Completed", label: "Completed" },
  ]
  const TypeOptions = [
    { value: "Bug", label: "Bug" },
    { value: "Enhancement", label: "Enhancement" },
    { value: "Feature", label: "Feature" },
  ]
  return (
    <div className="flex justify-center">
      <Form<S> {...props}>
        <LabeledTextField name="name" label="Name" placeholder="Enter Task Name" type="text" />
        <LabeledTextField name="type" label="Type" isSelect={true} options={TypeOptions} />
        <LabeledTextField
          name="description"
          label="Description"
          placeholder="Enter Task Description"
          type="text"
        />
        <LabeledTextField name="status" label="Status" isSelect={true} options={statusOptions} />
        <LabeledCheckbox name="isActive" label="Is Active" defaultChecked={true} />
      </Form>
    </div>
  )
}
