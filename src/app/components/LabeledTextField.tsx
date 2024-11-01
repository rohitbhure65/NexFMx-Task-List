import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Can include checkbox now */
  type?: "text" | "password" | "email" | "number" | "checkbox"
  /** Flag to determine if the field is a select dropdown */
  isSelect?: boolean
  /** Options for select dropdown (if applicable) */
  options?: { value: string; label: string }[]
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>
}

export const LabeledTextField = forwardRef<
  HTMLInputElement | HTMLSelectElement,
  LabeledTextFieldProps
>(({ name, label, isSelect, options, outerProps, fieldProps, labelProps, type, ...props }, ref) => {
  const {
    input,
    meta: { touched, error, submitError, submitting },
  } = useField(name, {
    parse: type === "number" ? (Number as any) : (v) => (v === "" ? null : v),
    ...fieldProps,
  })

  const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

  return (
    <div {...outerProps}>
      <label {...labelProps}>
        {label}
        {type === "checkbox" ? (
          <div className="flex items-center">
            <input type="checkbox" {...input} disabled={submitting} ref={ref} {...props} />
            <span className="ml-2">{label}</span>
          </div>
        ) : isSelect ? (
          <select {...input} disabled={submitting} ref={ref} {...props}>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input {...input} disabled={submitting} {...props} ref={ref} />
        )}
      </label>

      {touched && normalizedError && (
        <div role="alert" style={{ color: "red" }}>
          {normalizedError}
        </div>
      )}

      <style jsx>{`
        label {
          display: flex;
          flex-direction: column;
          align-items: start;
          font-size: 1rem;
        }
        input,
        select {
          font-size: 1rem;
          padding: 0.25rem 0.5rem;
          border-radius: 3px;
          border: 1px solid purple;
          appearance: none;
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  )
})

LabeledTextField.displayName = "LabeledTextField"

export default LabeledTextField
