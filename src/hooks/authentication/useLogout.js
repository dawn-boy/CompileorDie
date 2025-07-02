import { useMutation, useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import apiLogout from '../../services/authentication/apiLogout.js'

function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isLoading, mutate: logout } = useMutation({
    mutationFn: apiLogout,
    onMutate: () => navigate('/loading', { replace: true }),
    onSuccess: () => {
      queryClient.removeQueries('user')
      toast.success('Logout successful')
      navigate('/', { replace: true })
    },
    onError: error => {
      toast.error(`Logout failed ${error.message}`)
    },
  })

  return { isLoading, logout }
}

export { useLogout }
