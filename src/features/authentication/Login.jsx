import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin.js'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading } = useLogin()

  function handleSubmit(e) {
    e.preventDefault()

    if (!email || !password) return alert('Please fill in all fields')
    login({ email, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
        disabled={isLoading}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
        disabled={isLoading}
      />
      <button disabled={isLoading}>{isLoading ? 'Loading..' : 'Login'}</button>
    </form>
  )
}

export default Login
