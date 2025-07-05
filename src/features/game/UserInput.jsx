import Question from './Question.jsx'
import Answer from './Answer.jsx'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import apiGetPlayerId from '../../services/users/apiGetPlayerId.js'
import { useEffect } from 'react'
import insertTable from '../../services/database/operations/insertTable.js'

const UserInput = ({ questionIndex, question, description }) => {
  const navigate = useNavigate()
  const teamCode = useSelector(state => state.user.teamCode)
  const round = useSelector(state => state.user.round)

  useEffect(() => {
    ;(async () => {
      const playerId = await apiGetPlayerId()
      await insertTable('rounds_report', {
        player_id: playerId,
        round_num: round,
        team_code: teamCode,
      })
    })()
  }, [round, teamCode])
  function handleNext() {
    navigate('/waiting', { replace: true })
  }
  return (
    <div>
      <Question
        questionIndex={questionIndex}
        question={question}
        description={description}
      />
      <Answer handleNext={handleNext} />
    </div>
  )
}

export default UserInput
