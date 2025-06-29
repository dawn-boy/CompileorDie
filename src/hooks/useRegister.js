import { useMutation, useQueryClient } from 'react-query'
import { registerApi } from '../services/apiAuth.js'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function useRegister() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate: register, isLoading } = useMutation({
    mutationFn: registerApi,
    onSuccess: data => {
      queryClient.setQueryData(['user'], data.user)
      toast.success('Registeration successful')
      navigate('/profile', { replace: true })
    },
    onError: () => {
      toast.error('Registeration failed')
    },
  })

  return { register, isLoading }
}

export { useRegister }
