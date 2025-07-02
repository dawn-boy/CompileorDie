import { LabeledInput } from '../LabeledField.jsx'
import { useFormContext } from 'react-hook-form'

export function ConfirmPassword() {
  const { watch } = useFormContext()
  return (
    <LabeledInput
      name="confirmPassword"
      type="password"
      rules={{
        required: 'Confirm password is a required field',
        validate: value =>
          watch('password') === value || 'Passwords do not match',
      }}
    />
  )
}
