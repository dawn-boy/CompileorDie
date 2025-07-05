import CyberGuardian from './players/cyberguardian/CyberGuardian.jsx'
import DeveloperOne from './players/developerOne/DeveloperOne.jsx'
import DeveloperTwo from './players/developerTwo/DeveloperTwo.jsx'
import { setRole } from '../../redux/userSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import Hacker from './players/hacker/Hacker.jsx'
import Debugger from './players/debugger/Debugger.jsx'

const GamePlay = () => {
  const dispatch = useDispatch()
  const roleCheck = useSelector(state => state.user.role)
  // const role = location?.state?.role || roleCheck
  const role = 'developerOne'
  if (!roleCheck) dispatch(setRole(role))

  function handleRender() {
    switch (role) {
      case 'hacker':
        return <Hacker />
      case 'debugger':
        return <Debugger />
      case 'cyberguardian':
        return <CyberGuardian />
      case 'developerOne':
        return <DeveloperOne />
      case 'developerTwo':
        return <DeveloperTwo />
    }
  }
  return <div>{handleRender()}</div>
}

export default GamePlay
