import { LabeledInput } from '../LabeledField.jsx'

export function TextBox({ name, label }) {
  return <LabeledInput name={name} label={label} type="text" />
}
