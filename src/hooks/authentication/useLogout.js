import { useMutation, useQueryClient } from 'react-query'
import { logoutApi } from '../../services/apiAuth.js'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isLoading, mutate: logout } = useMutation({
    mutationFn: logoutApi,
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
