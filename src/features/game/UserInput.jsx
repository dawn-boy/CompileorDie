import Question from './Question.jsx'
import Answer from './Answer.jsx'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { incrementQuestionNumber } from '../../redux/userSlice.js'

const UserInput = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const questions = useSelector(state => state.user.questions)
  const questionNumber = useSelector(state => state.user.questionNumber)

  function handleNext() {
    navigate('/waiting', { replace: true })
    dispatch(incrementQuestionNumber())
  }
  return (
    <div>
      <Question
        {...questions[questionNumber]}
        questionNumber={questionNumber}
      />
      <Answer handleNext={handleNext} />
    </div>
  )
}

export default UserInput
