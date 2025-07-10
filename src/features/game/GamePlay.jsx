import CyberGuardian from './players/cyberguardian/CyberGuardian.jsx'
import DeveloperOne from './players/developerOne/DeveloperOne.jsx'
import DeveloperTwo from './players/developerTwo/DeveloperTwo.jsx'
import {
  setPlayerId,
  setRole,
  updateEliminatedPlayers,
} from '../../redux/userSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import Hacker from './players/hacker/Hacker.jsx'
import Debugger from './players/debugger/Debugger.jsx'
import { useEffect, useState } from 'react'
import apiGetPlayerId from '../../services/users/apiGetPlayerId.js'
import insertTable from '../../services/database/operations/insertTable.js'
import getRecord from '../../services/database/operations/getRecord.js'
import End from '../end/End.jsx'
import updateRecord from '../../services/database/operations/updateRecord.js'
import ApiSupabase from '../../services/database/apiSupabase.js'
import FloatAround from './FloatAround.jsx'
import { useLocation } from 'react-router-dom'

const GamePlay = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const roleCheck = useSelector(state => state.user.role)
  const role = location?.state?.role || roleCheck
  // const role = 'debugger'
  if (!roleCheck) dispatch(setRole(role))
  const round = useSelector(state => state.user.round)
  const teamCode = useSelector(state => state.user.teamCode)
  const cycle = useSelector(state => state.user.cycle)
  const eliminationList = useSelector(state => state.user.eliminationList)
  const [gameStatus, setGameStatus] = useState(null)
  const isEliminated = useSelector(state => state.user.isEliminated)

  const eliminatedCount = Object.entries(eliminationList).reduce(
    (acc, [key, val]) => {
      if (val in acc) acc[val] += 1
      else acc[val] = 1
      return acc
    },
    {}
  )

  useEffect(() => {
    const eliminatedPlayersName = Object.entries(eliminationList).reduce(
      (acc, [key, val]) => {
        if (val) acc.push(key)
        return acc
      },
      []
    )

    dispatch(updateEliminatedPlayers(eliminatedPlayersName))
  }, [eliminationList])

  useEffect(() => {
    async function getStatus() {
      const { data, error } = await getRecord(
        'teams_table',
        'team_code',
        teamCode
      )
      const status = data[0]?.team_status
      if (status === 'finished') {
        setGameStatus(false)
      } else if (status === 'in-game') {
        setGameStatus(true)
      }
    }
    getStatus()
  }, [])

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

  useEffect(() => {
    if (gameStatus === false) {
      ApiSupabase.rpc('increment_dev_wins', {
        teamcode: teamCode,
        delta: 1,
      })
    }
    if (gameStatus === true && eliminatedCount[false] < 3) {
      ApiSupabase.rpc('increment_hacker_wins', {
        teamcode: teamCode,
        delta: 1,
      })
    }
  }, [gameStatus, eliminatedCount, teamCode])

  function handleRender() {
    console.log(gameStatus, eliminatedCount[false])
    if (gameStatus === null && cycle !== 1)
      return <div>Calculating the Results...</div>
    if (gameStatus === false) {
      return <End message="The Developers have won the game!" />
    }
    if (gameStatus === true && eliminatedCount[false] < 3) {
      return <End message="The Hacker got you all!" />
    }
    if (isEliminated) return <FloatAround />

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
