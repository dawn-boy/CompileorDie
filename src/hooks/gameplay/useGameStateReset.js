import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  clearEliminatedPlayers,
  clearEliminationList,
  setAnswer,
  setChosenOne,
  setCycle,
  setIsEliminated,
  setQuestion,
  setQuestionNumber,
  setQuestions,
  setRole,
  setRound,
  setShowWelcomeScreen,
  setTeamInfo,
} from '../../redux/userSlice.js'

function useGameStateReset() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setRole(null))
    dispatch(setShowWelcomeScreen(true))
    dispatch(setRound(1))
    dispatch(setCycle(1))
    dispatch(setChosenOne(null))
    dispatch(setTeamInfo({}))
    dispatch(setQuestionNumber(0))
    dispatch(setQuestions([]))
    dispatch(setAnswer(null))
    dispatch(setQuestion(null))
    dispatch(clearEliminationList())
    dispatch(clearEliminatedPlayers())
    dispatch(setIsEliminated(false))
  }, [dispatch])
}

export default useGameStateReset
