import Role from '../../Role.jsx'
import UserInput from '../../UserInput.jsx'
import PlayerChoice from '../../PlayerChoice.jsx'
import Vote from '../../Vote.jsx'
import ErrorPage from '../../../../ui/ErrorPage.jsx'
import { useSelector } from 'react-redux'

const Debugger = () => {
  const round = useSelector(state => state.user.round)
  const chosenOne = useSelector(state => state.user.chosenOne)
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
      if (!chosenOne) {
        return <PlayerChoice />
      }
      return (
        <UserInput
          questionIndex={response.payload.id}
          question={response.payload.question}
          description={response.payload.description}
        />
      )
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

export default Debugger
