import capitalize from '../helpers/capitalize.js'
import { useFormContext } from 'react-hook-form'
import hyphenize from '../helpers/hyphenize.js'

function LabeledSelect({
  name,
  label = capitalize(name),
  rules = { required: `${label} is a required field ` },
  options = [{ label: 'Select', value: '' }],
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
      <select id={elementId} {...register(elementId, rules)}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span>{error?.message}</span>}
    </div>
  )
}

export { LabeledSelect }
