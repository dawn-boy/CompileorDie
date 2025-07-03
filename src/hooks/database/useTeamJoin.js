import { useMutation } from 'react-query'
import { joinTeamApi } from '../../services/teams/apiTeamJoin.js'
import { useNavigate } from 'react-router-dom'
import { setLobby, setTeamCode } from '../../redux/userSlice.js'
import { useDispatch } from 'react-redux'

function useTeamJoin() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { mutate: joinTeam, isLoading } = useMutation({
    mutationFn: ({ teamCode }) => joinTeamApi(teamCode),
    onMutate: () => navigate('/loading', { replace: true }),
    onSuccess: ({ data, variables }) => {
      dispatch(setLobby(true))
      dispatch(setTeamCode(variables.teamCode))
      navigate('/profile/lobby', {
        replace: true,
      })
    },
    onError: (error, variables) => {
      const { teamCode } = variables
      if (error.message === 'Team not found')
        navigate('/error', {
          replace: true,
          state: { errorMessage: 'Team not found' },
        })
      if (error.message === 'You have already joined this team') {
        dispatch(setLobby(true))
        dispatch(setTeamCode(teamCode))
        navigate('/profile/lobby', {
          replace: true,
        })
      }
    },
  })
  return { joinTeam, isLoading }
}

export { useTeamJoin }
