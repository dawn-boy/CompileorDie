import { useMutation, useQueryClient } from 'react-query'
import { registerApi } from '../../services/apiAuth.js'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { updateTable } from '../../services/apiDatabaseOps.js'

function useRegister() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate: register, isLoading } = useMutation({
    mutationFn: registerApi,
    onMutate: () => navigate('/loading', { replace: true }),
    onSuccess: ({ data, registerData }) => {
      queryClient.setQueryData(['user'], data.user)
      updateTable('users_table', 'id', data.user.id, {
        name: registerData.name,
      })
      toast.success('Registeration successful')
      navigate('/profile', { replace: true })
    },
    onError: () => {
      toast.error('Registeration failed')
      navigate('/error', {
        replace: true,
        state: { errorMessage: "User already exists. You're cooked bruh" },
      })
    },
  })

  return { register, isLoading }
}

export { useRegister }
