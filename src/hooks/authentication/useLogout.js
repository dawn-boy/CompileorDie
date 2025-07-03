import { useMutation, useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import apiLogout from '../../services/authentication/apiLogout.js'
import {
  setLobby,
  setTeamCode,
  setSessionUser,
  setProfileUser,
} from '../../redux/userSlice.js'
import { useDispatch } from 'react-redux'

function useLogout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isLoading, mutate: logout } = useMutation({
    mutationFn: apiLogout,
    onMutate: () => navigate('/loading', { replace: true }),
    onSuccess: () => {
      queryClient.removeQueries('user')
      dispatch(setSessionUser(null))
      dispatch(setLobby(false))
      dispatch(setTeamCode(null))
      dispatch(setProfileUser(null))
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
