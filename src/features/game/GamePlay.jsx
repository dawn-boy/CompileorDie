import CyberGuardian from './players/cyberguardian/CyberGuardian.jsx'
import DeveloperOne from './players/developerOne/DeveloperOne.jsx'
import DeveloperTwo from './players/developerTwo/DeveloperTwo.jsx'
import { setPlayerId, setRole } from '../../redux/userSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import Hacker from './players/hacker/Hacker.jsx'
import Debugger from './players/debugger/Debugger.jsx'
import { useEffect } from 'react'
import apiGetPlayerId from '../../services/users/apiGetPlayerId.js'
import insertTable from '../../services/database/operations/insertTable.js'

const GamePlay = () => {
  const dispatch = useDispatch()
  const roleCheck = useSelector(state => state.user.role)
  // const role = location?.state?.role || roleCheck
  const role = 'hacker'
  if (!roleCheck) dispatch(setRole(role))
  const round = useSelector(state => state.user.round)
  const teamCode = useSelector(state => state.user.teamCode)
  const cycle = useSelector(state => state.user.cycle)

  useEffect(() => {
    ;(async () => {
      const playerId = await apiGetPlayerId()
      dispatch(setPlayerId(playerId))
      await insertTable('rounds_report', {
        player_id: playerId,
        round_num: round,
        role: role,
        cycle_num: cycle,
        team_code: teamCode,
      })
    })()
  }, [round, teamCode])

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
