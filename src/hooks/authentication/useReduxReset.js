import { useDispatch } from 'react-redux'
import {
  setLobby,
  setProfileUser,
  setRole,
  setRound,
  setSessionUser,
  setShowWelcomeScreen,
  setTeamCode,
} from '../../redux/userSlice.js'

function useResetRedux() {
  const dispatch = useDispatch()

  const resetRedux = () => {
    dispatch(setSessionUser(null))
    dispatch(setLobby(false))
    dispatch(setTeamCode(null))
    dispatch(setProfileUser(null))
    dispatch(setRole(null))
    dispatch(setShowWelcomeScreen(false))
    dispatch(setRound(0))
  }
  return resetRedux
}

export default useResetRedux
