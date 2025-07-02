import { Outlet } from 'react-router-dom'
import apiCheckLobby from '../services/teams/apiCheckLobby.js'

function AppLayout() {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default AppLayout
