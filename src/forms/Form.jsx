import { useFormContext } from 'react-hook-form'
import { Username } from './fields/Username.jsx'
import { Password } from './fields/Password.jsx'
import { Email } from './fields/Email.jsx'
import { ConfirmPassword } from './fields/ConfirmPassword.jsx'
import { Name } from './fields/Name.jsx'
import { Submit } from './fields/Submit.jsx'
import { TextBox } from './fields/TextBox.jsx'
import { SelectOptions } from './fields/SelectOptions.jsx'
import { LabeledSelect } from './LabeledSelect.jsx'

function Form({ children, onSubmit, onError = () => {} }) {
  const { handleSubmit } = useFormContext()
  return <form onSubmit={handleSubmit(onSubmit, onError)}>{children}</form>
}

Form.Username = Username
Form.Password = Password
Form.Email = Email
Form.ConfirmPassword = ConfirmPassword
Form.Name = Name
Form.TextBox = TextBox
Form.Submit = Submit
Form.SelectOptions = SelectOptions
Form.LabeledSelect = LabeledSelect

export default Form
