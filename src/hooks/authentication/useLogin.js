import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import apiUpdateUserPresence from '../../services/users/apiUpdateUserPresence.js'
import apiLogin from '../../services/authentication/apiLogin.js'

function useLogin() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutateAsync: login, isLoading } = useMutation({
    mutationFn: apiLogin,
    onMutate: () => navigate('/loading', { replace: true }),
    onSuccess: user => {
      queryClient.setQueryData(['user'], user.user)
      apiUpdateUserPresence('online')

      toast.success('Login successful')
      navigate('/profile', { replace: true })
    },
    onError: () => {
      toast.error('Login failed')
      navigate('/login', { replace: true })
    },
  })

  return { login, isLoading }
}

export { useLogin }
