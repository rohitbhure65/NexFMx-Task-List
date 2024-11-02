import { forwardRef, PropsWithoutRef } from "react"
import { useField } from "react-final-form"

export interface LabeledCheckboxProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Checkbox label. */
  label: string
}

export const LabeledCheckbox = forwardRef<HTMLInputElement, LabeledCheckboxProps>(
  ({ name, label, ...props }, ref) => {
    const {
      input,
      meta: { touched, error },
    } = useField(name)

    return (
      <div className="flex items-center mt-2">
        <input type="checkbox" {...input} {...props} ref={ref} />
        <label className="ml-2">{label}</label>
        {touched && error && (
          <div role="alert" style={{ color: "red" }}>
            {error}
          </div>
        )}
      </div>
    )
  }
)

LabeledCheckbox.displayName = "LabeledCheckbox"

export default LabeledCheckbox
