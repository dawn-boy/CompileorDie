import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import apiCheckLobby from '../../services/teams/apiCheckLobby.js'

const LobbyProtectedRoutes = () => {
  const [inLobby, setInLobby] = useState(null)
  useEffect(() => {
    async function updateLobby() {
      const isFound = await apiCheckLobby()
      setInLobby(isFound)
    }
    updateLobby()
  }, [])

  if (inLobby === null) return <div>Checking Lobby status...</div>
  else if (inLobby) return <Outlet />
  else return <div>You must be in a lobby to access this page.</div>
}

export default LobbyProtectedRoutes
