import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import apiSupabase from '../../services/apiSupabase.js'
import { useSelector, useDispatch } from 'react-redux'
import { setUser, setIsLoading } from '../../redux/userSlice.js'
import Loading from '../Loading.jsx'

const AuthProtectedRoutes = () => {
  const user = useSelector(state => state.user.userData)
  const isLoading = useSelector(state => state.user.isLoading)
  const dispatch = useDispatch()

  useEffect(() => {
    const { data: user } = apiSupabase.auth.getUser()
    dispatch(setUser(user))
    dispatch(setIsLoading(false))

    const { data } = apiSupabase.auth.onAuthStateChange((event, session) =>
      dispatch(setUser(session?.user ?? null))
    )

    return () => data.subscription.unsubscribe()
  }, [dispatch])

  if (isLoading) return <Loading />
  if (!isLoading && !user)
    return <div>You must be logged in to access this page.</div>

  if (user) return <Outlet />
}

export default AuthProtectedRoutes
