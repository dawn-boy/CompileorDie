import { useRegister } from '../../hooks/useRegister.js'

const SignUp = () => {
  const { register } = useRegister()

  return (
    <div>
      This is the SignUp page.
      <button
        onClick={() =>
          register({ email: 'ad@gmak.com', password: 'adfdfdf34343f@' })
        }
      >
        Register
      </button>
    </div>
  )
}

export default SignUp
