import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const LobbyProtectedRoutes = () => {
  const joinedLobby = useSelector(state => state.user.joinedLobby)
  const navigate = useNavigate()

  useEffect(() => {
    if (!joinedLobby)
      navigate('/error', {
        replace: true,
        state: { errorMessage: 'You must join a lobby first' },
      })
  })
  if (joinedLobby) return <Outlet />
}

export default LobbyProtectedRoutes
