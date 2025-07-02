import Form from '../../forms/Form.jsx'
import { FormProvider, useForm } from 'react-hook-form'
import { useLogin } from '../../hooks/authentication/useLogin.js'

function Login() {
  const { login } = useLogin()
  const methods = useForm()

  function onSubmit(resp) {
    login(resp)
  }
  return (
    <div>
      <FormProvider {...methods}>
        <Form onSubmit={onSubmit}>
          <Form.Email />
          <Form.Password />
          <Form.Submit label="Access" />
        </Form>
      </FormProvider>
    </div>
  )
}

export default Login
