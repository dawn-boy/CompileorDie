import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loading from '../Loading.jsx'
import useAuthCheck from '../../hooks/authentication/useAuthCheck.js'

const AuthProtectedRoutes = () => {
  const user = useSelector(state => state.user.sessionUserData)
  const isLoading = useSelector(state => state.user.isLoading)

  useAuthCheck()

  if (!isLoading && !user)
    return <div>You must be logged in to access this page.</div>
  if (isLoading) return <Loading />

  if (user) return <Outlet />
}

export default AuthProtectedRoutes
