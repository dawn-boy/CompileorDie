import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setShowWelcomeScreen } from '../../redux/userSlice.js'

const Role = () => {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const role = useSelector(state => state.user.role)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      dispatch(setShowWelcomeScreen(false))
    }, 2000)
    return () => clearTimeout(timer)
  }, [dispatch])

  if (!isLoading) navigate('/gameplay', { replace: true, state: { role } })

  return <h1>Your are the {role}</h1>
}

export default Role
