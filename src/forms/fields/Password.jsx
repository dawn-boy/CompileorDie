import { LabeledInput } from '../LabeledField.jsx'

export function Password() {
  return (
    <LabeledInput
      name="password"
      type="password"
      rules={{
        required: 'Password is a required field',
        minLength: {
          value: 6,
          message: 'Password must be at least 6 characters long',
        },
      }}
    />
  )
}
