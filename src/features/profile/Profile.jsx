import { Link, Outlet } from 'react-router-dom'
import { useLogout } from '../../hooks/authentication/useLogout.js'
import Loading from '../../ui/Loading.jsx'

const Profile = () => {
  const { isLoading, logout } = useLogout()
  if (isLoading) return <Loading />

  return (
    <div>
      <Link to="/profile/joinTeam">Join A Team</Link>
      <br />
      <Link to="/profile/createTeam">Create A Team</Link>
      <br />
      This is the Profile page.
      <button onClick={logout}>Logout</button>
      <Outlet />
    </div>
  )
}

export default Profile
