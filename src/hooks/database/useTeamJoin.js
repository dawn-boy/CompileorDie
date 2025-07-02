import { useMutation } from 'react-query'
import { joinTeamApi } from '../../services/teams/apiTeamJoin.js'
import { useNavigate } from 'react-router-dom'

function useTeamJoin() {
  const navigate = useNavigate()
  const { mutate: joinTeam, isLoading } = useMutation({
    mutationFn: ({ teamCode }) => joinTeamApi(teamCode),
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
