import { useFormContext } from 'react-hook-form'
import capitalize from '../../helpers/capitalize.js'

function SelectOptions({
  value,
  label = capitalize(value),
  normalText = 'Select',
  onActiveText = 'Selected',
}) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext()

  const selected = watch('choice')
  const error = errors?.choice

  return (
    <div>
      <label>{label}</label>
      <input type="hidden" {...register('choice', { required: true })} />
      <button onClick={() => setValue('choice', value)}>
        {selected === value ? onActiveText : normalText}
      </button>
      {error && <span>{error?.message}</span>}
    </div>
  )
}

export { SelectOptions }
