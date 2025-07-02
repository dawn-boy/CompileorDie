import UserInput from './UserInput.jsx'
import PlayerChoice from './PlayerChoice.jsx'
import { useSelector } from 'react-redux'
import ErrorPage from '../../ui/ErrorPage.jsx'

const GamePlay = () => {
  const response = useSelector(state => state.api)

  function handleRender() {
    switch (response.action) {
      case 'user/showQuestion':
        return (
          <UserInput
            questionIndex={response.payload.id}
            question={response.payload.question}
            description={response.payload.description}
          />
        )
      case 'user/showPlayers':
        return <PlayerChoice />

      default:
        return <ErrorPage />
    }
  }

  return <div>{handleRender()}</div>
}

export default GamePlay
