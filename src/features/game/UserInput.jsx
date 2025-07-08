import Question from './Question.jsx'
import Answer from './Answer.jsx'
import { useSelector } from 'react-redux'

const UserInput = ({ inputCode = '' }) => {
  const questions = useSelector(state => state.user.questions)
  const questionNumber = useSelector(state => state.user.questionNumber)

  return (
    <div>
      <Question
        {...questions[questionNumber]}
        questionNumber={questionNumber}
      />
      <Answer {...questions[questionNumber]} inputCode={inputCode} />
    </div>
  )
}

export default UserInput
