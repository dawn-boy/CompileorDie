import apiFetchTeam from '../teams/apiFetchTeam.js'
import { useEffect, useState } from 'react'

async function apiTeamStatus(teamCode) {
  const [players, setPlayers] = useState([])
  const [allReady, setAllReady] = useState(false)

  useEffect(() => {
    ;(async () => {
      const team = await apiFetchTeam(teamCode)
      setPlayers(team)
    })()
  })
}
