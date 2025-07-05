import Role from '../../Role.jsx'
import UserInput from '../../UserInput.jsx'
import Vote from '../../Vote.jsx'
import ErrorPage from '../../../../ui/ErrorPage.jsx'
import { useSelector } from 'react-redux'

const DeveloperTwo = () => {
  const round = useSelector(state => state.user.round)
  const showWelcomeScreen = useSelector(state => state.user.showWelcomeScreen)
  const response = {
    payload: {
      id: 1,
      question: 'What is your name?',
      description: 'This is a description',
    },
  }
  switch (round) {
    case 1:
      if (showWelcomeScreen) {
        return <Role />
      }
      return (
        <UserInput
          questionIndex={response.payload.id}
          question={response.payload.question}
          description={response.payload.description}
        />
      )

    case 2:
    case 3:
      return (
        <UserInput
          questionIndex={response.payload.id}
          question={response.payload.question}
          description={response.payload.description}
        />
      )
    case 4:
      return <Vote />
    default:
      return <ErrorPage message={"Round doesn't exist"} />
  }
}

export default DeveloperTwo
