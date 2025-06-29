import { Outlet } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout.js'
import Loading from '../../ui/Loading.jsx'

const Profile = () => {
  const { isLoading, logout } = useLogout()
  if (isLoading) return <Loading />

  return (
    <div>
      This is the Profile page.
      <button onClick={logout}>Logout</button>
      <Outlet />
    </div>
  )
}

export default Profile
