import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const LobbyProtectedRoutes = () => {
  const inLobby = useSelector(state => state.user.joinedLobby)
  if (inLobby === null) return <div>Checking Lobby status...</div>
  else if (inLobby) return <Outlet />
  else return <div>You must be in a lobby to access this page.</div>
}

export default LobbyProtectedRoutes
