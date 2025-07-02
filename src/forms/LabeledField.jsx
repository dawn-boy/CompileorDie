import capitalize from '../helpers/capitalize.js'
import { useFormContext } from 'react-hook-form'
import hyphenize from '../helpers/hyphenize.js'

function LabeledInput({
  name,
  label = capitalize(name),
  type,
  rules = { required: `${label} is a required field ` },
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const elementId = hyphenize(name)
  const error = errors?.[elementId]

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input type={type} id={elementId} {...register(elementId, rules)} />
      {error && <span>{error?.message}</span>}
    </div>
  )
}

export { LabeledInput }
