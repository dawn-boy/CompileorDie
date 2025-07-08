import Role from '../../Role.jsx'
import UserInput from '../../UserInput.jsx'
import PlayerChoice from '../../PlayerChoice.jsx'
import Vote from '../../Vote.jsx'
import ErrorPage from '../../../../ui/ErrorPage.jsx'
import { useSelector } from 'react-redux'

const CyberGuardian = () => {
  const round = useSelector(state => state.user.round)
  const chosenOne = useSelector(state => state.user.chosenOne?.choice)
  const showWelcomeScreen = useSelector(state => state.user.showWelcomeScreen)
  switch (round) {
    case 1:
      if (showWelcomeScreen) {
        return <Role />
      }
      if (!chosenOne) {
        return <PlayerChoice />
      }
      return <UserInput />
    case 2:
    case 3:
      return <UserInput />
    case 4:
      return <Vote />
    default:
      return <ErrorPage message={"Round doesn't exist"} />
  }
}

export default CyberGuardian
