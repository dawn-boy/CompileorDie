import { loginApi } from '../../services/apiAuth.js'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function useLogin() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutateAsync: login, isLoading } = useMutation({
    mutationFn: loginApi,
    onMutate: () => navigate('/loading', { replace: true }),
    onSuccess: user => {
      queryClient.setQueryData(['user'], user.user)
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
