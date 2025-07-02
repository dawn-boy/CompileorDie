import { useRegister } from '../../hooks/authentication/useRegister.js'
import { FormProvider, useForm } from 'react-hook-form'
import Form from '../../forms/Form.jsx'

const Register = () => {
  const { register } = useRegister()

  function onSubmit(resp) {
    register(resp)
  }
  const methods = useForm()
  return (
    <div>
      <FormProvider {...methods}>
        <Form onSubmit={onSubmit}>
          <Form.Name />
          <Form.Email />
          <Form.Password />
          <Form.ConfirmPassword />
          <Form.Submit label="Get Started!" />
        </Form>
      </FormProvider>
    </div>
  )
}

export default Register
