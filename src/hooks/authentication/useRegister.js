import { useMutation, useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import apiUpdateUserPresence from '../../services/users/apiUpdateUserPresence.js'
import updateTable from '../../services/database/operations/updateTable.js'
import apiRegister from '../../services/authentication/apiRegister.js'

function useRegister() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate: register, isLoading } = useMutation({
    mutationFn: apiRegister,
    onMutate: () => navigate('/loading', { replace: true }),
    onSuccess: ({ data, registerData }) => {
      apiUpdateUserPresence('online')
      queryClient.setQueryData(['user'], data.user)
      updateTable('users_table', 'id', data.user.id, {
        name: registerData.name,
      })
      toast.success('Registration successful')
      navigate('/profile', { replace: true })
    },
    onError: () => {
      toast.error('Registration failed')
      navigate('/error', {
        replace: true,
        state: { errorMessage: "User already exists. You're cooked bruh" },
      })
    },
  })

  return { register, isLoading }
}

export { useRegister }
