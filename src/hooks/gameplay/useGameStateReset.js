import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  setChosenOne,
  setRole,
  setRound,
  setShowWelcomeScreen,
} from '../../redux/userSlice.js'

function useGameStateReset() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setRole(null))
    dispatch(setShowWelcomeScreen(true))
    dispatch(setRound(1))
    dispatch(setChosenOne(null))
  }, [dispatch])
}

export default useGameStateReset
