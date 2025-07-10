import { useMutation } from 'react-query'
import { joinTeamApi } from '../../services/teams/apiTeamJoin.js'
import { useNavigate } from 'react-router-dom'
import { setLobby, setTeamCode } from '../../redux/userSlice.js'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

function useTeamJoin() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { mutate: joinTeam, isLoading } = useMutation({
    mutationFn: ({ teamCode }) => joinTeamApi(teamCode),
    onMutate: () => navigate('/loading', { replace: true }),
    onSuccess: variables => {
      dispatch(setLobby(true))
      dispatch(setTeamCode(variables.teamCode))
      navigate('/profile/lobby', {
        replace: true,
      })
    },
    onError: (error, variables) => {
      const { teamCode } = variables
      switch (error.message) {
        case 'You have already joined this team':
          dispatch(setLobby(true))
          dispatch(setTeamCode(teamCode))
          navigate('/profile/lobby', {
            replace: true,
          })
          break
        case 'Team is full':
          navigate('/error', {
            replace: true,
            state: { errorMessage: 'Team is full' },
          })
          break
        default:
          navigate('/error', {
            replace: true,
            state: { errorMessage: error.message },
          })
      }
    },
  })
  return { joinTeam, isLoading }
}

export { useTeamJoin }
