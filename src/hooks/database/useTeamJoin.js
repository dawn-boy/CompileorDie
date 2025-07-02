import { useMutation } from 'react-query'
import { apiJoinTeam } from '../../services/database_functions/apiJoinTeam.js'
import { useNavigate } from 'react-router-dom'

function useTeamJoin() {
  const navigate = useNavigate()
  const { mutate: joinTeam, isLoading } = useMutation({
    mutationFn: ({ teamCode }) => apiJoinTeam(teamCode),
    onMutate: () => navigate('/loading', { replace: true }),
    onSuccess: ({ data }) => {
      navigate('/profile/lobby', { replace: true })
    },
    onError: error => {
      navigate('/error', {
        replace: true,
        state: { errorMessage: error.message },
      })
    },
  })
  return { joinTeam, isLoading }
}

export { useTeamJoin }
